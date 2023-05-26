<template>
    <button class="botao-cancelar" type="button">
        <span>Cancelar</span>
    </button>
</template>
<style scoped>
.botao-cancelar {
    outline: none;
    color: white;
    cursor: pointer;
    font-weight: 700;
    padding: 5px 15px;
    border-radius: 5px;
    text-align: center;
    background-color: var(--amarelo);
}

.botao-cancelar:hover {
    background-color: var(--amarelo-escuro);
}
</style>