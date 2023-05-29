<template>
<div>
    <div class="perfil-avatar-area" @click="toggle">
        <img :src="LoginStore.usuario.avatar" draggable="false" class="perfil-avatar">
    </div>
    <div class="perfil-nav" v-show="isOpen">
        <ul>
            <li @click="MinhaConta"><span>Minha Conta</span></li>
            <li @click="Painel" v-if="LoginStore.usuario.role == 0"><span>Painel</span></li>
            <li @click="logout"><span>Saír</span></li>
        </ul>
    </div>
</div>
</template>

<script>
import axios from "axios";
import { LoginStore } from "@/stores/LoginStore.js";
export default {
    data(){
        return {
            LoginStore: LoginStore(),
            isOpen: false
        }
    },

    watch: {
        isOpen(value) {
            if (value) {
                this.emitter.emit('MenuDropdownOpen', this);
            }
        },
    },
    created() {
        this.emitter.on('MenuDropdownOpen', this.rootCloseListener);
    },
    mounted(){
        document.addEventListener("click", this.clickOutListener)
    },    
    beforeUnmount() {
        document.removeEventListener('click', this.clickOutListener);
    },
    methods: {
        MinhaConta(){
            this.$router.push({name: "perfil"})
            this.close();
        },
        Painel(){
            this.$router.push({name: "painel"})
            this.close();
        },
        async logout(){
            this.close();

            let config = {
                method: 'post',
                url: 'https://apiminhamente.onrender.com/logout',
                headers: {
                    'authorization': `Bearer ${LoginStore().token}`
                }
            };
            
            try {
                await axios(config)

                localStorage.removeItem("token")
                localStorage.removeItem("usuario")
                localStorage.removeItem("_links")

                this.$router.go(0)
            } catch (erro) {
                console.log(erro);
            }

        },
        toggle(){
            this.isOpen = !this.isOpen
        },

        close(){
            this.isOpen = false
        },
        clickOutListener(evt){
            if (!this.$el.contains(evt.target)) { // Se clicar no mesmo elemento, não fechar, mas se sim, fechar
                this.close()
            }
        },      
        rootCloseListener(vm) {
            if (vm !== this) {
                this.close();
            }
        }
    }
}
</script>

<style scoped>
.perfil-avatar-area {
    width: 32px;
    height: 32px;
}

.perfil-avatar {
    width: 100%;
    height: 100%;
    min-width: 32px;
    min-height: 32px;
    cursor: pointer;
    border-radius: 100%;
    background-color: var(--azul);
}

.perfil-nav {
    top: 50px;
    right: 4%;
    position: fixed;
    min-width: 150px;
    border-radius: 5px;
    background-color: #eaeaea;
}

.perfil-nav ul {
    padding-left: 0px;
}

.perfil-active {
    display: flex;
}

.perfil-nav ul li {
    width: 100%;
    height: 35px;
    cursor: pointer;
    font-size: 2.6rem;
    font-weight: 500;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.perfil-nav ul li:hover {
    background-color: #B5B5B5;
}

.perfil-nav ul li span {
    color: black;
}

/* @media (max-width: 1024px) {

    .perfil-nav {
        top: 50px;
        right: 10px;
        position: absolute;
        padding: 10px;
        border-radius: 5px;
        background-color: #eaeaea;
    }
} */
</style>