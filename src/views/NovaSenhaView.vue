<template>
    <div style="display: flex;align-items: center; justify-content: center;height: 100vh;">
        <div class="login-area">
            <form class="login-form">
                <label for="login-email">Nova Senha:</label>
                <input type="password" name="senha" id="nova-senha" autocomplete="off" placeholder="Digite a sua nova senha" required>
                <input type="hidden" name="token" id="token" value="<%= token %>">
                <span style="display: none;color: green; margin-bottom: 5px;" id="sucesso">Senha alterada com sucesso</span>
                <span style="display: none;color: red; margin-bottom: 5px;" id="senha-erro">A senha precisa ter no mínimo 8 caracteres</span>
                <span style="display: none;color: red; margin-bottom: 5px;" id="token-erro">Token inválido ou inexistente!</span>
                <button type="submit">Enviar</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>