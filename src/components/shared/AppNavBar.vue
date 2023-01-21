<template>
    <div id="header">
        <header>
            <div class="header-area">
                <div class="logo-area">
                    <h1 class="logo"><a href="" class="text-decoration-none text-reset">MinhaMente</a></h1>
                </div>
                <div class="pesquisa-area">
                    <form action="" class="pesquisa-form">
                        <input type="search" name="search" class="pesquisa-input" autocomplete="off" placeholder="Pesquisar">
                        <button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                </div>
                <div class="perfil-area">
                    <a href=""><i class="fa-solid fa-arrow-up-from-bracket publicar"></i></a>
                    <img src="" draggable="false" class="perfil-icon" @click="abrirMenu()">
                    <a href="" class="login">Entrar</a>
                    <div class="perfil-icon" style="display: none;"></div>
                </div>
            </div>
            <div class="pesquisa-mobile-area">
                <form action="" class="pesquisa-form pesquisa-mobile">
                    <input type="search" name="search" class="pesquisa-input" autocomplete="off" placeholder="Pesquisar" >
                    <button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
                </form>
            </div>
        </header>
        <div class="nav-menu" v-if="mostrarMenu" @click="mostrarMenu = false">
            <div class="perfil-nav">
                <ul>
                    <a href=""><li>Conta</li></a>
                    <a href=""><li>Apontamentos</li></a>
                    <a href=""><li>Assuntos</li></a>
                    <a href=""><li>Usuarios</li></a>
                    <a href=""><li>Saír</li></a>
                </ul>
            </div>                
        </div>
    </div>
</template>
<script>
export default {
    data(){
       return {
            mostrarMenu: false
        }
    },
    methods: {
        abrirMenu: function (){
            this.mostrarMenu = !this.mostrarMenu
            console.log(this.mostrarMenu);
        }
    }
}
</script>
<style scoped>

header {
    width: 100%;
    height: 50px;
    top: 0;
    z-index: 2000;
    position: fixed;
    padding: 10px 50px;
    display: flex;
    flex-direction: column;
    background-color: var(--verde);
}

.header-area {
    display: flex;
    flex-direction: row;
}

.logo-area {
    flex: 1;
}

.logo {
    font-size: 24px;
    font-weight: 700;
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

input::-webkit-search-cancel-button {
    display: none;
}

.pesquisa-input {
    width: 90%;
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

.pesquisa-form button {
    width: 10%;
    border: none;
    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #B5B5B5;
    border-radius: 0px 5px 5px 0px;
}

.perfil-area {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
}

.login {
    display: flex;
    font-size: 20px;
    font-weight: 500;
}

.login:hover {
    color: #d3d3d3;
}

.publicar {
    font-size: 24px;
    cursor: pointer;
}

.perfil-icon {
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin-left: 25px;
    border-radius: 100%;
    background-color: var(--azul);
}

.nav-menu {
    display: flex;
    width: 100vw;
    height: 100vh;
    z-index: 2000;
    position: fixed;
    background-color: #cccccc00;
}

.perfil-nav {
    top: 50px;
    right: 50px;
    position: fixed;
    padding: 10px;
    border-radius: 5px;
    background-color: #eaeaea;
}

.perfil-nav a {
    text-decoration: none;
}

.perfil-nav ul {
    padding-left: 0px;
}

.perfil-active {
    display: flex;
}

.perfil-nav ul li {
    padding: 5px;
    border-radius: 5px;
    margin: 10px 0px;
}

.perfil-nav ul li:hover {
    background-color: #B5B5B5;
}

.perfil-nav ul li {
    font-size: 16px;
    color: black;
}
</style>