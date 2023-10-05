<template>
<div>
    <div class="perfil-avatar-area" @click="toggle">
        <img :src="storeLogin.usuario.avatar" draggable="false" class="perfil-avatar">
    </div>
    <div class="perfil-nav" v-show="isOpen">
        <ul>
            <router-link :to="{name: 'perfil'}">
                <li @click="MinhaConta">
                    <span>Minha Conta</span>
                </li>
            </router-link>
            <router-link :to="{name: 'painel'}">
                <li @click="Painel" v-if="storeLogin.usuario.role == 0"><span>Painel</span></li>
            </router-link>
            <li @click="logout"><span>Saír</span></li>
        </ul>
    </div>
</div>
</template>

<script setup lang="ts">
import axios from "axios";
import Emitter from "../../Emitter.js";
import { ref, watch, inject, onMounted, onBeforeUnmount, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { Login } from "@/stores/Login";

const instance = getCurrentInstance()

const storeLogin = Login()
const router = useRouter()
const isOpen = ref(false)

Emitter.on('MenuDropdownOpen', rootClosePerfilDropdownListener);

watch(isOpen, (value) => {
    if (value) {
        Emitter.emit('MenuDropdownOpen', instance.proxy.$el);
    }
})

onMounted(() => {
    document.addEventListener("click", clickOutPerfilDropdownListener)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', clickOutPerfilDropdownListener);
})

function MinhaConta(){
    close();
}

function Painel(){
    close();
}

async function logout(){
    close();

    let config = {
        method: 'post',
        url: 'https://apiminhamente.onrender.com/logout',
        headers: {
            'authorization': `Bearer ${storeLogin.token}`
        }
    };
    
    try {
        await axios(config)

        localStorage.removeItem("token")
        localStorage.removeItem("usuario")
        localStorage.removeItem("_links")

        router.go(0)
    } catch (error) {
        console.log(error);
    }

}

function toggle(){
    console.log();
    isOpen.value = !isOpen.value
}


function close(){
    isOpen.value = false
}

function clickOutPerfilDropdownListener(evt){
    if (!instance.proxy.$el.contains(evt.target)) { // Se clicar no mesmo elemento, não fechar, mas se sim, fechar
        close()
    }
}
    
function rootClosePerfilDropdownListener(vm) {
    if (vm !== instance.proxy.$el) {
        close();
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
    font-size: 18px;
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