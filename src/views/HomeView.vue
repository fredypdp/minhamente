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
                v-model="TemasSelecionados"
                mode="tags"
                :close-on-select="false"
                :searchable="true"
                :options="temas"
                placeholder="Temas"
                noOptionsText="Sem temas"
                noResultsText="Sem resultados"
            />
            <AppDropdownPubli @maisRecente="PubliMaisRecente" @maisAntiga="PubliMaisAntiga"/>
        </div>
      </div>
      <ApontamentosList :apontamentos="ApontamentosMostrar"/>
      <div class="paginas-area" v-if="apontamentosTotal > 0">
        <vue-awesome-paginate
        :total-items="apontamentosTotal"
        v-model="currentPage"
        :items-per-page="ItensPorPagina"
        :max-pages-shown="5"
        :on-click="paginar"
        :hide-prev-next="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Multiselect from '@vueform/multiselect'
import AppNavBar from '@/components/shared/AppNavBar.vue'
import HomeAssuntosBar from '@/components/HomeAssuntosBar.vue'
import ApontamentosList from '@/components/shared/ApontamentosList.vue'
import AppDropdownPubli from "@/components/shared/AppDropdownPubli.vue";
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
      PaginaAtual: 1,
      ItensPorPagina: 20,
      currentPage: 1,
      // apontamentosTotal: this.apontamentos.length,
      apontamentos: [
        {id: 1,titulo: "Matou, matou, menino matou o preá",miniatura: "https://i.ytimg.com/vi/FCFJ9gOkqlA/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCR3225xJGrgkZtcr_6oqErzFHTXQ"},
        {id: 2,titulo: "Matou, matou, menino matou o preá",miniatura: "https://i.ytimg.com/vi/FCFJ9gOkqlA/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCR3225xJGrgkZtcr_6oqErzFHTXQ"},
        {id: 3,titulo: "Matou, matou, menino matou o preá",miniatura: "https://i.ytimg.com/vi/FCFJ9gOkqlA/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCR3225xJGrgkZtcr_6oqErzFHTXQ"},
        {id: 4,titulo: "Matou, matou, menino matou o preá",miniatura: "https://i.ytimg.com/vi/FCFJ9gOkqlA/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCR3225xJGrgkZtcr_6oqErzFHTXQ"},
        {id: 5,titulo: "Matou, matou, menino matou o preá",miniatura: "https://i.ytimg.com/vi/FCFJ9gOkqlA/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCR3225xJGrgkZtcr_6oqErzFHTXQ"},
        {id: 6,titulo: "Matou, matou, menino matou o preá",miniatura: "https://i.ytimg.com/vi/FCFJ9gOkqlA/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCR3225xJGrgkZtcr_6oqErzFHTXQ"},
        {id: 7,titulo: "Matou, matou, menino matou o preá",miniatura: "https://i.ytimg.com/vi/FCFJ9gOkqlA/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCR3225xJGrgkZtcr_6oqErzFHTXQ"},
        {id: 8,titulo: "Matou, matou, menino matou o preá",miniatura: "https://i.ytimg.com/vi/FCFJ9gOkqlA/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCR3225xJGrgkZtcr_6oqErzFHTXQ"}
      ],
      TemasSelecionados: [],
      temas: []
    }
  },
  computed: {
    apontamentosTotal() {
      return this.apontamentos.length
    },
    ApontamentosMostrar() {
      let inicio = (this.PaginaAtual - 1) * this.ItensPorPagina
      let fim = inicio + this.ItensPorPagina
      return this.apontamentos.slice(inicio, fim)
    },
  },
  methods: {
    paginar(pagina){
      this.paginaAtual = pagina
    }
  },
}
</script>
<style scoped>
.assuntos-page-titulo-area {
    display: flex;
    flex-direction: column;
}

.assunto-page-titulo {
    color: var(--azul);
    font-size: clamp(0.5rem, 1.5rem, 2rem);;
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
    flex-wrap: wrap;
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

.paginas-area {
    padding: 5px;
    display: flex;
    margin-top: 10px;
    justify-content: center;
}

.pagination-container {
    column-gap: 10px;
    align-items: center;
}

::v-deep .paginate-buttons {
    width: 35px;
    height: 35px;
    border: none;
    cursor: pointer;
    color: black;
    font-size: 1.6rem;
    border-radius: 5px;
    background-color: var(--azul);
}

::v-deep .paginate-buttons:hover {
    background-color: var(--azul-escuro);
}
::v-deep .active-page {
    background-color: #e5e5e5;
}


::v-deep .active-page:hover {
    background-color: #f5f5f5;
}

@media (max-width: 1235px) {
  .home-apontamentos-top {
    flex-direction: column;
  }

  .apontamentos-filtros {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    align-items: center;
    justify-content: space-between;
}

.multiselect {
  max-width: 80%;
  margin: 0px;
  margin-bottom: 5px;
}
}
</style>
