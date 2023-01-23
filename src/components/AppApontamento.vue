<template>
    <div class="apontamento">
        <a href="">
            <img :src="apontamento.miniatura" class="apontamento-miniatura">
        </a>
        
        <span class="apontamento-titulo">
            <a href="">{{ apontamento.titulo }}</a>
        </span>
    </div>
</template>

<script>
export default {
    props:{
        apontamento: {
            type: Object,
            require: true
        }
    }
}
</script>

<style scoped>
.apontamento {
    max-width: 300px;
    max-height: 230px;
    margin: 0px 7.5px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
}

.apontamento-miniatura {
    width: 300px;
    height: 170px;
    border-radius: 10px;
    background-color: var(--azul);
}

.apontamento a:last-child {
    margin-top: 5px;
}

.apontamento .apontamento-titulo {
    overflow: hidden;
    white-space: nowrap;
    text-align: justify;
    text-overflow: ellipsis;
}

.apontamento-titulo a {
    color: black;
    font-size: 20px;
    font-weight: 500;
}
</style>