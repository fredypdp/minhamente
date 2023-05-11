<template>
<div id="AssuntoCriarView">
    <AppNavBar/>
    <div class="criar-assunto-area">
        <form method="post" class="criar-assunto-form">
            <label for="nome" class="nome-label">Nome do assunto:</label>
            <input type="text" name="nome" class="nome-input" id="nome" placeholder="Nome do assunto" autocomplete="off" autofocus>
            <label for="icone" class="icone-label">Ícone:</label>
            <input type="text" name="icone" class="icone-input" id="icone" placeholder="Digite o código do ícone da logo" autocomplete="off">
            <button type="submit" class="botao-criar">Criar assunto</button>
        </form>
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
#AssuntoCriarView {
    height: 100vh;
}

.criar-assunto-area {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0px 20px;
    align-items: center;
    justify-content: center;
}

.criar-assunto-form {
    width: 500px;
    padding: 10px;
    display: flex;
    max-width: 500px;
    border-radius: 5px;
    flex-direction: column;
    align-items: flex-start;
    background-color: #e7e7e7;
}

.criar-assunto-form label {
    color: black;
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 10px;
}

.criar-assunto-form input {
    width: 100%;
    padding: 5px;
    color: black;
    font-size: 20px;
    font-weight: 500;
    border-radius: 5px;
    margin-bottom: 20px;
    border: 1px solid black;
}

.botao-criar {
    width: 100%;
    outline: none;
    color: white;
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;
    padding: 5px 15px;
    border-radius: 5px;
    text-align: center;
    background-color: var(--verde);
}

.botao-criar:hover {
    background-color: var(--verde-escuro);
}
</style>