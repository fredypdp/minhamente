<template>
  <div>
    <AppNavBar/>
    <HomeAssuntosBar/>
    <div class="container-box">
      <div class="home-apontamentos-top">
        <div class="assuntos-page-titulo-area">
            <h2 class="assunto-page-titulo">Todos apontamentos</h2>
            <div class="assunto-page-titulo-bar"></div>
        </div>
        <div class="apontamentos-filtros">
            <Multiselect
                v-model="selecionados"
                mode="tags"
                :close-on-select="false"
                :searchable="true"
                :options="options"
                placeholder="Temas"
                noOptionsText="Sem temas"
                noResultsText="Sem resultados"
            />
            <AppDropdownPubli @maisRecente="PubliMaisRecente" @maisAntiga="PubliMaisAntiga"/>
        </div>
      </div>
      <ApontamentosList :apontamentos="apontamentos"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AppNavBar from '@/components/shared/AppNavBar.vue'
import HomeAssuntosBar from '@/components/HomeAssuntosBar.vue'
import ApontamentosList from '@/components/shared/ApontamentosList.vue'
import AppDropdownPubli from "@/components/shared/AppDropdownPubli.vue";
import Multiselect from '@vueform/multiselect' // https://github.com/vueform/multiselect#readme
export default {
  name: 'HomeView',
  components: {
    AppNavBar,
    Multiselect,
    HomeAssuntosBar,
    ApontamentosList,
    AppDropdownPubli,
  },
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
  }
}
</script>
<style scoped>
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


.home-apontamentos-top {
    display: flex;
    justify-content: space-between;
}

.apontamentos-filtros {
    width: 40%;
    display: flex;
    align-items: center;
}

.multiselect {
    margin-right: 10px;
}
</style>
