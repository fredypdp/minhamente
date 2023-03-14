<template>
    <button class="botao-publicar" type="submit">Publicar</button>
</template>

<script>
export default {

}
</script>

<style scoped>
.botao-publicar {
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

.botao-publicar:hover {
    background-color: var(--verde-escuro);
}
</style>