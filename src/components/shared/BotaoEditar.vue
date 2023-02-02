<template>
    <a href="" class="botao-editar">Editar</a>
</template>

<script>
export default {

}
</script>

<style scoped>
.botao-editar {
    width: 90px;
    height: 30px;
    color: white;
    font-size: 15px;
    font-weight: 700;
    padding: 5px 15px;
    margin-left: 30px;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: var(--azul);
}

.botao-editar:hover {
    background-color: #124194;
}

@media (max-width: 390px) {
    .botao-editar {
        width: 100%;
        height: 30px;
        color: white;
        font-size: 15px;
        font-weight: 700;
        padding: 5px 15px;
        margin-left: 0px;
        margin-top: 20px;
        border: none;
        border-radius: 5px;
        background-color: var(--azul);
    }
}
</style>