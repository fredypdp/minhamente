<template>
    <div class="entrar-container">
        <div class="login-area">
            <h1>Entrar</h1>
            <div class="login-form">
                <label for="login-email">Email:</label>
                <input type="email" name="email" id="login-email" autocomplete="off" placeholder="Digite o seu email" required>
                <label for="login-senha">Senha:</label>
                <input type="password" name="senha" id="login-senha" minlength="8" autocomplete="off" placeholder="Digite a sua senha" required>
                <a href="/recuperarsenha" style="color: blue;margin-bottom: 10px;text-decoration: underline;">Esqueci a senha</a>
                <span style="display: none;color: red; margin-bottom: 5px;" id="login-erro-1">Senha ou email incorreto</span>
                <span style="display: none;color: red; margin-bottom: 5px;" id="login-erro-2">A senha precisa ter no mínimo 8 caracteres</span>
                <button onclick="login()">Entrar</button>
            </div>
        </div>
        <div class="cadastro-area">
            <h1>Criar conta</h1>
            <div class="cadastro-form" >
                <label for="cadastro-nome">Nome:</label>
                <input type="text" name="nome" id="cadastro-nome" autocomplete="off" placeholder="Digite o seu nome" required>
                <label for="cadastro-email">Email:</label>
                <span style="display: none;color: red; margin-bottom: 5px;" id="email-erro">O email já está cadastrado</span>
                <input type="email" name="email" id="cadastro-email" autocomplete="off" placeholder="Digite o seu email" required>
                <label for="cadastro-senha">Senha:</label>
                <input type="password" name="senha" minlength="8" id="cadastro-senha" autocomplete="off" placeholder="Digite a sua senha" required>
                <span style="display: none;color: red; margin-bottom: 5px;" id="senha-erro">A senha precisa ter no mínimo 8 caracteres</span>
                <div class="cadastro-botoes">
                    <label for="foto-cadastro">Foto de perfil</label>
                    <input type="file" accept="image/png, image/jpeg" name="avatar" id="foto-cadastro">
                    <button onclick="criar()">Criar conta</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.entrar-container {
        display: flex;
        flex-wrap: wrap;
        padding: 50px;
        align-items: center;
        justify-content: space-between;
    }

    .login-area {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        max-width: 500px;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 2px 2px 5px black;
        background-color: #F5F5F5;
    }

    .login-area h1 {
        color: black;
        font-size: 36px;
        font-weight: 700;
        margin-bottom: 20px;
    }

    .login-form {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .login-form label {
        color: black;
        font-size: 26px;
        font-weight: 700;
        margin-bottom: 10px;
    }

    .login-form input {
        width: 100%;
        padding: 5px;
        color: black;
        font-size: 20px;
        font-weight: 500;
        border-radius: 5px;
        border: 1px solid black;
        margin-bottom: 20px;
    }

    .login-form button {
        width: 100%;
        height: 30px;
        font-size: 15px;
        font-weight: 700;
        cursor: pointer;
        outline: none;
        border: none;
        border-radius: 5px;
        background-color: var(--verde);
    }

    .login-form button:hover {
        background-color: #129b35;
    }

    .cadastro-area {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        max-width: 500px;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 2px 2px 5px black;
        background-color: #F5F5F5;
    }

    .cadastro-area h1 {
        color: black;
        font-size: 36px;
        font-weight: 700;
        margin-bottom: 20px;
    }

    .cadastro-form {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .cadastro-form label {
        color: black;
        font-size: 26px;
        font-weight: 700;
        margin-bottom: 10px;
    }

    .cadastro-form input {
        width: 100%;
        padding: 5px;
        color: black;
        font-size: 20px;
        font-weight: 500;
        border-radius: 5px;
        border: 1px solid black;
        margin-bottom: 20px;
    }

    .cadastro-botoes{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .cadastro-botoes input {
        display: none;
    }

    .cadastro-botoes label {
        width: 100%;
        height: 30px;
        color: white;
        font-size: 15px;
        font-weight: 700;
        text-align: center;
        padding: 5px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: var(--azul);
    }

    .cadastro-botoes label:hover {
        background-color: #124194;
    }

    .cadastro-botoes button {
        width: 100%;
        height: 30px;
        color: white;
        font-size: 15px;
        font-weight: 700;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: var(--verde);
    }

    .cadastro-botoes button:hover {
        background-color: #129b35;
    }
</style>