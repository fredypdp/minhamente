<template>
    <div class="container">
        <div class="assuntos-page-titulo-area">
            <h2 class="assunto-page-titulo">Todos apontamentos</h2>
            <div class="assunto-page-titulo-bar"></div>
        </div>
        <div class="apontamentos">
            <AppApontamento v-for="apontamento in apontamentos" :key="apontamento.id" :apontamento="apontamento"/>
        </div>
    </div>
</template>

<script>
import AppApontamento from "@/components/AppApontamento.vue";
export default {
    data(){
        return {
            apontamentos: [
                {id: 1,titulo: "Matou, matou, menino matou o preá",miniatura: "https://i.ytimg.com/vi/FCFJ9gOkqlA/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCR3225xJGrgkZtcr_6oqErzFHTXQ"},
                {id: 2,titulo: "Matou, matou, menino matou o preá",miniatura: "https://i.ytimg.com/vi/FCFJ9gOkqlA/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCR3225xJGrgkZtcr_6oqErzFHTXQ"},
                {id: 3,titulo: "Matou, matou, menino matou o preá",miniatura: "https://i.ytimg.com/vi/FCFJ9gOkqlA/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCR3225xJGrgkZtcr_6oqErzFHTXQ"},
                {id: 4,titulo: "Matou, matou, menino matou o preá",miniatura: "https://i.ytimg.com/vi/FCFJ9gOkqlA/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCR3225xJGrgkZtcr_6oqErzFHTXQ"},
                {id: 5,titulo: "Matou, matou, menino matou o preá",miniatura: "https://i.ytimg.com/vi/FCFJ9gOkqlA/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCR3225xJGrgkZtcr_6oqErzFHTXQ"},
                {id: 6,titulo: "Matou, matou, menino matou o preá",miniatura: "https://i.ytimg.com/vi/FCFJ9gOkqlA/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCR3225xJGrgkZtcr_6oqErzFHTXQ"},
                {id: 7,titulo: "Matou, matou, menino matou o preá",miniatura: "https://i.ytimg.com/vi/FCFJ9gOkqlA/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCR3225xJGrgkZtcr_6oqErzFHTXQ"},
                {id: 8,titulo: "Matou, matou, menino matou o preá",miniatura: "https://i.ytimg.com/vi/FCFJ9gOkqlA/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCR3225xJGrgkZtcr_6oqErzFHTXQ"}
            ]
        }
    },
    components: {
        AppApontamento
    }
}
</script>

<style scoped>
.container {
    padding: 100px 90px;
}

.assuntos-page-titulo-area {
    display: flex;
    flex-direction: column;
}

.assunto-page-titulo {
    color: var(--azul);
    font-size: 24px;
    font-weight: 500;
    text-align: justify;
}

.assunto-page-titulo-bar{
    width: 30%;
    height: 5px;
    margin-top: 5px;
    border-radius: 50px;
    background-color: var(--azul);
}

.apontamentos {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
}
</style>