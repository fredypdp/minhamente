<template>
    <slot>
        <div class="apontamento">
                <div class="miniatura-area">
                    <router-link to="">
                        <img :src="apontamento.miniatura" class="apontamento-miniatura">
                    </router-link>
                </div>
                <div class="titulo-area">
                    <router-link to="">
                        <span class="apontamento-titulo">{{ apontamento.titulo }}</span>
                    </router-link>
                </div>
        </div>
    </slot>
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
    max-width: 340px;
    margin: 0px 7.5px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
}

.apontamento-miniatura {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: var(--azul);
}

.titulo-area {
    margin-top: 5px;
}

.titulo-area * {
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
}

.apontamento-titulo {
    color: black;
    font-size: 20px;
    font-weight: 500;
}
</style>