<template>
    <button class="botao-editar">Editar</button>
</template>

<script>
export default {

}
</script>

<style scoped>
.botao-editar {
    outline: none;
    color: white;
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;
    padding: 5px 15px;
    border-radius: 5px;
    text-align: center;
    background-color: var(--azul);
}

.botao-editar:hover {
    background-color: var(--azul-escuro);
}
</style>