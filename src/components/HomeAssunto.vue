<template>
<div class="assunto-area">
    <div class="assunto">
        <i :class="assunto.icone"></i>
        <span>{{assunto.nome}}</span>
    </div>
</div>
</template>

<script>
export default {
    props: {
        assunto: {
            type: Object,
            require: true
        }
    }
}
</script>

<style scoped>
.assunto-area {
    width: 100%;
    height: 100%;
    max-width: 190px;
    max-height: 100px;
}

.assunto {
    width: 100%;
    height: 100%;
    display: flex;
    cursor: pointer;
    padding: 15px 20px;
    border-radius: 10px;
    align-items: center;
    flex-direction: column;
    background-color: var(--azul);
    justify-content: space-between;
}

.assunto:hover {
    background-color: #124194;
}

.assunto i {
    color: white;
    font-size: 30px;
}

.assunto span {
    color: white;
    font-size: 24px;
    font-weight: 700;
}
</style>