<template>
<div>
    <div @click="toggle">
        <img src="" draggable="false" class="perfil-icon">
    </div>
    <div class="perfil-nav" v-show="isOpen">
        <ul>
            <li><router-link :to="{name: 'perfil'}"><span>Minha Conta</span></router-link></li>
            <li><router-link :to="{name: 'painel'}"><span>Painel</span></router-link></li>
            <li><router-link :to="{name: ''}"><span>Saír</span></router-link></li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
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
            console.log("oi");
            if (vm !== this) {
                this.close();
            }
        }
    }
}
</script>

<style scoped>
.perfil-icon {
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin-left: 25px;
    border-radius: 100%;
    background-color: var(--azul);
}

.perfil-nav {
    top: 50px;
    right: 6.4%;
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
    height: 30px;
    font-size: 16px;
    font-weight: 500;
}

.perfil-nav ul li:hover {
    background-color: #B5B5B5;
}

.perfil-nav ul li a {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
}

.perfil-nav ul li span {
    color: black;
}

@media (max-width: 1024px) {

    /* .perfil-nav {
        top: 50px;
        right: 10px;
        position: absolute;
        padding: 10px;
        border-radius: 5px;
        background-color: #eaeaea;
    } */
}
</style>