<template>
<div>
    <AppNavBar/>
    <div class="container-box">
        <form method="post" class="criar-assunto-area">
            <label for="nome" class="nome-label">Nome do assunto:</label>
            <input type="text" name="nome" class="nome-input" id="nome" placeholder="Nome do assunto" autocomplete="off" autofocus required>
            <label for="icone" class="icone-label">Ícone:</label>
            <input type="text" name="icone" class="icone-input" id="icone" placeholder="Digite o código do ícone da logo" autocomplete="off" required>
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
.criar-assunto-area {
    margin: auto;
    padding: 10px;
    display: flex;
    max-width: 500px;
    border-radius: 5px;
    align-items: flex-start;
    flex-direction: column;
    background-color: #e7e7e7;
}

.criar-assunto-area label {
    color: black;
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 10px;
}

.criar-assunto-area input {
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