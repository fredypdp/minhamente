<template>
    <slot>
        <div class="apontamento">
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
    display: flex;
    width: 24%;
	max-width: 360px;
    max-height: 280px;
    margin: 0px 6.5px 30px;
    flex-direction: column;
}

.miniatura-area {
    width: 100%;
    height: 80%;
}

.apontamento-miniatura {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: var(--azul);
}

.titulo-area {
    height: 20%;
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
    font-size: 2rem;
    font-weight: 500;
}

@media (max-width: 1392px) {
.apontamento {
    width: 32%;
    max-width: 374px;
    max-height: 300px;
}
}

@media (max-width: 1025px) {
.apontamento {
    width: 48%;
    max-width: 460px;
    max-height: 360px;
}
}

@media (max-width: 1025px) {
.apontamento {
    width: 48%;
    max-width: none;
}
}

@media (max-width: 700px) {
.apontamento {
    width: 100%;
    max-width: 635px;
    max-height: 390px;
}

.apontamento-titulo {
    font-size: 2.5rem;
}
}
</style>