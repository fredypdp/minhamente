<template>
    <slot>
        <div class="apontamento-container">
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
.apontamento-container {
    width: 24%;
    height: 100%;
    max-width: 360px;
    max-height: 280px;
    margin: 0px 6.5px 30px;
}

.apontamento {
    width: 100%;
    display: flex;
    flex-direction: column;
    aspect-ratio: 16/11.455;
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
.apontamento-container {
    width: 32%;
    height: 100%;
    max-width: unset;
    max-height: 300px;
}

.apontamento {
    width: 100%;
    display: flex;
    aspect-ratio: 16/11.848;
    flex-direction: column;
}

.apontamento-titulo {
    font-size: 1.5vw;
}
}

@media (max-width: 1025px) {
.apontamento-container {
    width: 48%;
    height: 100%;
    max-width: 460px;
    max-height: 360px;
}

.apontamento {
    width: 100%;
    display: flex;
    aspect-ratio: 16/11.848;
    flex-direction: column;
}

.apontamento-titulo {
    font-size: 2vw;
}

}

@media (max-width: 700px) {

.apontamento-container {
    width: 100%;
    height: unset;
    max-width: unset;
    max-height: 390px;
    margin: 0px 0px 30px 0px;
}

.apontamento {
    width: 100%;
    height: unset;
    aspect-ratio: 16/10;
    flex-direction: column;
}

.apontamento-titulo {
    font-size: 4vw;
}
}
</style>