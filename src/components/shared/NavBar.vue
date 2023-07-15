<template>
    <div id="header">
        <header class="navbar-pc">
            <div class="header-area">
                <div class="logo-area">
                    <h1 class="logo"><router-link :to="{name: 'home'}" @click="apontamentosDoAssunto">MinhaMente</router-link></h1>
                </div>
                <div class="pesquisa-area">
                    <form class="pesquisa-form" @submit.prevent="pesquisar">
                        <input type="search" v-model="pesquisa" name="search" class="pesquisa-input" autocomplete="off" placeholder="Pesquisar" @keyup.enter="pesquisar">
                        <button type="submit" @click="pesquisar"><i class="fa-solid fa-magnifying-glass pesquisar-icone"></i></button>
                    </form>
                </div>
                <div class="perfil-area">
                    <span v-if="storeLogin.usuario != undefined && storeLogin.usuario.role == 0">
                        <router-link :to="{name: 'ApontamentoPublicar'}">
                            <i class="fa-solid fa-arrow-up-from-bracket publicar"></i>
                        </router-link>
                    </span>
                    <PerfilDropdown v-if="storeLogin.usuario != undefined"/>
                    <span class="login" v-if="storeLogin.usuario == undefined"><router-link :to="{name: 'login'}">Entrar</router-link></span>
                </div>
            </div>
        </header>
        <header class="navbar-mobile">
            <div class="header-area">
                <div class="logo-area">
                    <h1 class="logo"><router-link :to="{name: 'home'}" @click="apontamentosDoAssunto">MinhaMente</router-link></h1>
                </div>
                <div class="nav-right-side">
                    <NavPesquisaMobile/>
                    <div class="perfil-area">
                        <PerfilDropdown v-if="storeLogin.usuario != undefined"/>
                        <span class="login" v-if="storeLogin.usuario == undefined"><router-link :to="{name: 'login'}">Entrar</router-link></span>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>
<script setup>
import { Home } from "@/stores/Home.js";
import { Login } from "@/stores/Login.js";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import PerfilDropdown from "./PerfilDropdown.vue";
import NavPesquisaMobile from "@/components/shared/NavPesquisaMobile.vue";

const route = useRoute()
const router = useRouter()
const pesquisa = ref(route.query.pesquisa)
const storeHome = Home()
const storeLogin = Login()

function pesquisar() {
    if(pesquisa.value == undefined) {
        return
    }

    if(pesquisa.value != undefined && pesquisa.value.trim() == 0) {
        return
    }

    router.push({name: "pesquisa", query: {pesquisa: pesquisa.value}})
}

function apontamentosDoAssunto() {
    storeHome.assuntoAtual = undefined
}
</script>
<style scoped>
span {
    font-size: 16px;
}

header {
    display: flex;
    width: 100%;
    height: 50px;
    top: 0;
    left: 0;
    z-index: 2000;
    position: fixed;
    padding: 10px 4%;
    background-color: var(--verde);
}

.navbar-mobile {
    display: none;
}

.header-area {
    display: flex;
    width: 100%;
}

.logo-area {
    flex: 1;
}

.logo {
    display: flex;
    outline: none;
    color: white;
    text-align: left;
    font-weight: 700;
    font-size: 24px;
    align-items: center;
}

.pesquisa-mobile-area {
    display: none;
}

.pesquisa-area {
    flex: 1;
}

.pesquisa-form {
    min-width: 600px;
    height: 30px;
    display: flex;
    flex-direction: row;
}

.pesquisa-input::-webkit-search-cancel-button {
    display: none;
}

.pesquisa-input {
    width: 100%;
    color:  black;
    font-size: 16px;
    padding: 5px 30px;
    outline: none;
    border: none;
    border-radius: 5px 0px 0px 5px;
}

.pesquisa-input::placeholder {
    color: #ccc;
    font-size: 16px;
}

.pesquisa-input:focus {
    outline: 2px solid var(--azul);
}

.pesquisa-form button {
    width: 10%;
    border: none;
    outline: none;
    display: flex;
    font-size: 24px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    background-color: #B5B5B5;
    border-radius: 0px 5px 5px 0px;
}

.nav-right-side {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.perfil-area {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
}

.perfil-area div:last-child {
    margin-left: 20px;
}

.login {
    color: white;
    display: flex;
    cursor: pointer;
    font-size: 24px;
    font-weight: 500;
}

.login:hover {
    color: #d3d3d3;
}

.publicar {
    color: white;
    font-size: 24px;
    cursor: pointer;
}

.nav-menu {
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 2000;
    top: 0;
    position: absolute;
    background-color: #cccccc00;
}

@media (max-width: 1235px) {
.navbar-pc {
    display: none;
}

.navbar-mobile {
    display: flex;
}

.pesquisa-area {
    display: none;
}

.pesquisa-form {
    min-width: 100%;
}

.assunto-page-titulo {
    font-size: 20px;
}

.assunto-page-titulo-bar{
    width: 60%;
}

.perfil-area {
    flex: 0;
}
}
</style>