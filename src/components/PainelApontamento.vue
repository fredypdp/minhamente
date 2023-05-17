<template>
    <div class="apontamento">
        <slot>
            <div class="miniatura-area">
                <router-link :to="{name: 'ApontamentoLer', params: {id: apontamento.id}}">
                    <img :src="apontamento.miniatura" class="apontamento-miniatura">
                </router-link>
            </div>
            <div class="titulo-area">
                <router-link :to="{name: 'ApontamentoLer', params: {id: apontamento.id}}">
                    <span class="apontamento-titulo">{{ apontamento.titulo }}</span>
                </router-link>
            </div>
        </slot>
    </div>
</template>

<script>
export default {
    props: {
        apontamento: {
            type: Object,
            require: true
        }
    }
}
</script>

<style scoped>
.apontamento {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}

.miniatura-area {
    flex: 1;
    width: 120px;
    height: 68px;
    max-width: 120px;
    max-height: 68px;
}

.apontamento-miniatura {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: var(--azul);
}

.titulo-area {
    flex: 1;
    margin-left: 5px;
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

.apontamento-titulo:hover {
    text-decoration: underline;
}
</style>