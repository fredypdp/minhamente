<template>
    <div class="apontamento">
        <slot>
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
        </slot>
    </div>
</template>

<script>
export default {
    data(){
        return {
            apontamento: {id: 1,titulo: "Matou, matou, menino matou o preá", miniatura: "https://i.ytimg.com/vi/FCFJ9gOkqlA/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCR3225xJGrgkZtcr_6oqErzFHTXQ"}
        }
    }
    // props:{
    //     apontamento: {
    //         type: Object,
    //         require: true
    //     }
    // }
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
    width: 120px;
    height: 68px;
}

.apontamento-miniatura {
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
    background-color: var(--azul);
}

.titulo-area {
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