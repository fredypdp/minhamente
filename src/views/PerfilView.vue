<template>
    <div>
        <AppNavBar/>
        <div class="container">
            <div class="perfil-container">
                <div class="cartao-usuario-mobile">
                    <img src="" draggable="false" class="foto-perfil">
                    <h1 class="nome-usuario"></h1>
                    <span class="email-usuario"></span>
                    <a href="">
                        <button>Saír</button>
                    </a>
                </div>
                <div class="editar">
                    <h1>Editar</h1>
                    <form action="">
                        <label for="nome">Nome:</label>
                        <input type="text" name="nome" id="nome" autocomplete="off">
                        <label for="email">Email:</label>
                        <input type="email" name="email" id="email" autocomplete="off">
                        <label for="avatar">Foto de perfil:</label>
                        <input type="url" name="avatar" id="avatar" placeholder="Link da foto de perfil" autocomplete="off" pattern=".*\.com/.*" required>
                        <div class="editar-botoes">
                            <label for="importar-foto-perfil">Foto de perfil</label>
                            <input type="file" name="avatar" id="avatar" accept="image/png, image/jpeg">
                            <button type="submit">Editar</button>
                        </div>
                    </form>
                </div>
                <div class="cartao-usuario">
                    <img src="" draggable="false" class="foto-perfil">
                    <h1 class="nome-usuario"></h1>
                    <span class="email-usuario"></span>
                    <a href="">
                        <button>Saír</button>
                    </a>
                    <a href="">
                        <button>Eliminar conta</button>
                    </a>
                    <input type="hidden" name="id" value="" id="id">
                    <input type="hidden" name="email" value="" id="del-email">
                    <span style="display: none;color: green; margin-bottom: 5px;" id="sucesso">Enviamos um email com o link de verificação para você</span>
                    <span style="display: none;color: red; margin-bottom: 5px;" id="email-erro">Não existe uma conta com esse email</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppNavBar from "@/components/shared/AppNavBar.vue";
export default {
    components: {
        AppNavBar
    }
}
</script>

<style scoped>
.perfil-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.perfil-container button {
    cursor: pointer;
}

.editar {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.editar h1 {
    color: black;
    font-weight: 700;
    margin-bottom: 30px;
}

.editar form {
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
}

.editar label {
    color: black;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
}

.editar input {
    width: 100%;
    color: black;
    font-size: 20px;
    font-weight: 500;
    padding: 5px;
    margin-bottom: 20px;
    border: 1px solid black;
    border-radius: 5px;
}

.editar-botoes {
    display: flex;
    justify-content: space-between;

}

.editar-botoes label {
    color: white;
    font-size: 15px;
    font-weight: 700;
    width: 200px;
    height: 30px;
    padding: 6px 50px;
    cursor: pointer;
    border-radius: 5px;
    background-color: var(--azul);
}

.editar-botoes label:hover {
    background-color: #124194;
}

.editar-botoes input[type="file"] {
    display: none;
}

.editar-botoes button {
    color: white;
    font-size: 15px;
    font-weight: 700;
    width: 200px;
    height: 30px;
    padding: 6px 50px;
    border: none;
    border-radius: 5px;
    outline: none;
    background-color: var(--verde);
}

.editar-botoes button:hover {
    background-color: #129b35;
}

.cartao-usuario-mobile {
    display: none;
}

.cartao-usuario{
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    padding: 30px;
    border-radius: 5px;
    box-shadow: 2px 2px 10px black;
}

.foto-perfil {
    width: 180px;
    height: 180px;
    margin-bottom: 20px;
    border-radius: 50%;
    background-color: var(--azul);
}

.nome-usuario {
    color: black;
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 20px;
}

.email-usuario {
    color: black;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 90px;   
}

.cartao-usuario button {
    font-size: 15px;
    font-weight: 700;
    width: 170px;
    height: 30px;
    border: none;
    border-radius: 5px;
    outline: none;
    margin-top: 5px;
    margin-bottom: 5px;
    background-color: red;
}

.cartao-usuario button:hover {
    background-color: rgb(185, 0, 0);
}

@media (max-width: 390px) {
    .perfil-container {
        display: flex;
        flex-direction: column;
    }

    .editar {
        width: 100%;
    }

    .editar-botoes {
        display: flex;
        flex-direction: column;
    }

    .editar-botoes label {
        color: white;
        font-size: 15px;
        font-weight: 700;
        text-align: center;
        width: 100%;
        height: 30px;
        padding: 6px 50px;
        cursor: pointer;
        border-radius: 5px;
        background-color: var(--azul);
    }

    .editar-botoes button {
        color: white;
        font-size: 15px;
        font-weight: 700;
        text-align: center;
        width: 100%;
        height: 30px;
        padding: 6px 50px;
        border: none;
        border-radius: 5px;
        background-color: var(--verde);
    }

    .cartao-usuario {
        display: none;
    }
    
    .cartao-usuario-mobile{
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 400px;
        padding: 30px;
        border-radius: 5px;
        margin-bottom: 30px;
        box-shadow: 2px 2px 10px black;
    }

    .cartao-usuario-mobile button {
        font-size: 15px;
        font-weight: 700;
        width: 170px;
        height: 30px;
        border: none;
        border-radius: 5px;
        background-color: red;
    }

    .cartao-usuario-mobile button:hover {
        background-color: rgb(185, 0, 0);
    }
}
</style>