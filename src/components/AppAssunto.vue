<template>
    <a href="">
        <div class="assunto">
            <i :class="assunto.icone"></i>
            <span>{{assunto.nome}}</span>
        </div>                
    </a>
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
.assunto {
    min-width: 190px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    padding: 15px 20px;
    background-color: var(--azul);
}

.assunto:hover {
    background-color: #124194;
}

.assunto i {
    font-size: 30px;
}

.assunto span {
    font-size: 24px;
    font-weight: 700;
}
</style>