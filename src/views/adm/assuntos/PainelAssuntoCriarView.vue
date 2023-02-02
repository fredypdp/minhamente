<template>
    <AppNavBar/>
    <div class="container">
        <div class="publicar-container">
        <form method="post" class="publicar-area criar-assunto-area">
            <label for="nome">Nome do assunto:</label>
            <input type="text" name="nome" id="nome" placeholder="Nome do assunto" autocomplete="off" autofocus required>
            <label for="icone">Ícone:</label>
            <input type="text" name="icone" id="icone" placeholder="Digite o código do ícone da logo" autocomplete="off" required>
            <button type="submit">Publicar</button>
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
    min-width: 500px;
    margin: auto;
    padding: 10px;
    border-radius: 5px;
    background-color: #e7e7e7;
}

.criar-assunto-area label {
    color: black;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 10px;
}

.criar-assunto-area button {
    width: 100%;
    height: 30px;
    padding: 5px 20px;
    border: none;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    background-color: var(--verde);
}

.criar-assunto-area button:hover {
    background-color: #129b35;
}
</style>