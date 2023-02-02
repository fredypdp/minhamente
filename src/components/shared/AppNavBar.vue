<template>
    <div id="header">
        <header>
            <div class="header-area">
                <div class="logo-area">
                    <h1 class="logo"><a href="" class="text-decoration-none text-reset">MinhaMente</a></h1>
                </div>
                <div class="pesquisa-area">
                    <form class="pesquisa-form">
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
                <form class="pesquisa-form pesquisa-mobile">
                    <input type="search" name="search" class="pesquisa-input" autocomplete="off" placeholder="Pesquisar">
                    <button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
                </form>
            </div>
        </header>
        <div class="nav-menu" v-show="mostrarMenu" @click="mostrarMenu = false">
            <div class="perfil-nav">
                <ul>
                    <a href=""><li>Conta</li></a>
                    <a href=""><li>Painel</li></a>
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
    text-align: left;
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
    /* display: none; */
    border: 1px solid black;
    margin-left: 15px;
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
    top: 0;
    position: absolute;
    background-color: #cccccc00;
}

.perfil-nav {
    top: 50px;
    right: 50px;
    padding: 10px;
    position: fixed;
    min-width: 150px;
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
    font-size: 16px;
    font-weight: 500;
    color: black;
    padding: 5px;
    border-radius: 5px;
    margin: 5px 0px;
}

.perfil-nav ul li:hover {
    background-color: #B5B5B5;
}

@media (max-width: 390px) {
    
    header {
        height: auto;
        padding: 10px 10px;
    }

    .pesquisa-area {
        display: none;
    }

    .pesquisa-form {
        min-width: 100%;
    }

    .pesquisa-mobile-area {
        display: flex;
        margin-top: 10px;
    }

    .assuntos-arrow-left {
        left: 20px;
    }

    .assuntos-arrow-right {
        right: 20px;
    }

    .assuntos-arrows i {
        font-size: 30px;
    }

    .assuntos-bar-area {
        padding: 10px 15px;
    }
    
    .assuntos-bar-area a {
        margin: 0px 5px;
    }

    .container {
        padding: 25px;
    }

    .assunto-page-titulo {
        font-size: 20px;
    }
    
    .assunto-page-titulo-bar{
        width: 60%;
    }

    .perfil-nav {
        top: 50px;
        right: 10px;
        position: absolute;
        padding: 10px;
        border-radius: 5px;
        background-color: #eaeaea;
    }
}
</style>