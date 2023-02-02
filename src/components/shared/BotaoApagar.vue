<template>
    <button class="botao-apagar" type="submit">Deletar</button>
</template>

<script>
export default {

}
</script>

<style scoped>
.botao-apagar {
    width: 90px;
    height: 30px;
    color: white;
    font-size: 15px;
    font-weight: 700;
    padding: 5px 15px;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: red;
}

.botao-apagar:hover {
    background-color: rgb(185, 0, 0);
}

@media (max-width: 390px) {
    .botao-apagar {
        width: 100%;
        height: 30px;
        color: white;
        font-size: 15px;
        font-weight: 700;
        padding: 5px 15px;
        border: none;
        border-radius: 5px;
        background-color: red;
    }
}
</style>