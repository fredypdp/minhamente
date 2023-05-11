<template>
  <div>
    <AppNavBar/>
    <div class="container-box">
      <div class="pesquisa-area">
          <div class="pesquisa-filtros">
              <AppDataCriacao @maisRecente="PubliMaisRecente" @maisAntiga="PubliMaisAntiga"/>
          </div>
          <div class="apontamentos">
              <AppApontamento v-for="apontamento in apontamentos" :key="apontamento.id" :apontamento="apontamento">
                  <slot :apontamento="apontamento"></slot>
              </AppApontamento>
          </div>
      </div>
      <ApontamentosList :flexColumn="true" :apontamentos="apontamentos" v-slot="{apontamento}">
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
      </ApontamentosList>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AppNavBar from '@/components/shared/AppNavBar.vue'
import ApontamentosList from '@/components/shared/ApontamentosList.vue';
import AppDataCriacao from "@/components/shared/AppDataCriacao.vue";

export default {
  name: 'HomeView',
  components: {
    AppNavBar,
    AppDataCriacao,
    ApontamentosList,
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
  },
}
</script>

<style scoped>
.pesquisa-area {
  display: flex;
  flex-direction: column;
}

.pesquisa-filtros {
  width: 100%;
  padding: 5px 0px;
  border-bottom: 1px solid black;
}

.apontamento {
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  flex-direction: row;
}

.miniatura-area {
  width: 360px;
  height: 200px;
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
  font-size: 1.8rem;
  font-weight: 400;
}
</style>