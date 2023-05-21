<template>
  <div id="PesquisaView">
    <AppNavBar/>
    <div class="container-box">
      <div class="pesquisa-area">
          <div class="pesquisa-filtros">
            <AppDataCriacao @ordenar="ordenar"/>
          </div>
          <div class="sem-apontamentos" v-if="!loading && apontamentosTotal == 0">
            <span>Nenhum apontamento encontrado</span>
          </div>
          <ApontamentosList :flexColumn="true" :apontamentos="apontamentos" v-slot="{apontamento}">
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
          </ApontamentosList>
      </div>
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
import axios from "axios";
import { LoginStore } from "@/stores/LoginStore.js";
import AppNavBar from '@/components/shared/AppNavBar.vue'
import AppDataCriacao from "@/components/shared/AppDataCriacao.vue";
import ApontamentosList from '@/components/shared/ApontamentosList.vue';

export default {
  components: {
    AppNavBar,
    AppDataCriacao,
    ApontamentosList,
  },
  data(){
    return {
      loading: false,
      apontamentos: [],
      PaginaAtual: 1,
      currentPage: 1,
      ItensPorPagina: 20,
    }
  },
  beforeRouteEnter(to, from, next) {
    if(to.query.pesquisa == undefined) {
      next({name: "home"})
      return
    }

    if(to.query.pesquisa != undefined && to.query.pesquisa.trim() == 0) {
      next({name: "home"})
      return
    }

    next()
  },
  watch: {
    "$route"(to, from) {
      if(to.query.pesquisa == undefined) {
        this.push({name: "home"})
        return
      }
  
      if(to.query.pesquisa != undefined && to.query.pesquisa.trim() == 0) {
        this.push({name: "home"})
        return
      }
  
      this.pesquisarApontamentos()
    },
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
  mounted() {
    this.pesquisarApontamentos()
  },
  methods: {
    paginar(pagina){
      this.paginaAtual = pagina
    },
    async ordenar() {
        if(!this.criacaoCrescente) {
            const arrayOrdenado = [];

            while (this.apontamentos.length > 0) { // Enquanto o array ter pelo menos um item
                let MaisNovoIndex = 0; // Index do item mais recente encontrado

                for (let i = 1; i < this.apontamentos.length; i++) { // Verificar cada item do array
                    // Procurando o index do item mais recente
                    if (this.apontamentos[i].titulo < this.apontamentos[MaisNovoIndex].titulo) {
                        MaisNovoIndex = i;
                    }
                }

                arrayOrdenado.push(this.apontamentos[MaisNovoIndex]); // Adicionar o item encontrado ao novo array
                this.apontamentos.splice(MaisNovoIndex, 1); // Deletar o item encontrado do array antigo
            }

            this.apontamentos = arrayOrdenado;
            this.criacaoCrescente = true // definindo que tá em ordem crescente
        } else {
            const arrayOrdenado = [];

            while (this.apontamentos.length > 0) { // Enquanto o array ter pelo menos um item
                let MaisAntigoIndex = 0; // Index do item mais antigo encontrado

                for (let i = 1; i < this.apontamentos.length; i++) { // Verificar cada item do array
                    // Procurando o index do item mais antigo
                    if (this.apontamentos[i].titulo > this.apontamentos[MaisAntigoIndex].titulo) {
                        MaisAntigoIndex = i;
                    }
                }

                arrayOrdenado.push(this.apontamentos[MaisAntigoIndex]); // Adicionar o item encontrado ao novo array
                this.apontamentos.splice(MaisAntigoIndex, 1); // Deletar o item encontrado do array antigo
            }

            this.apontamentos = arrayOrdenado;
            this.criacaoCrescente = false // definindo que tá em ordem decrescente
        }
    },
    async pesquisarApontamentos() {
      this.loading = true

        let config = {
          method: 'get',
          url: 'https://apiminhamente.onrender.com/results',
          params: {
            pesquisa: this.$route.query.pesquisa
          }
        };
        
        try {
            let apontamentos = await axios(config)
            this.apontamentos = apontamentos.data.apontamentos.filter(apontamento => apontamento.visibilidade == true)
            this.loading = false
        } catch (erro) {
          this.loading = false
            console.log(erro);
        }
    },
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
  min-width: 320px;
  margin-bottom: 10px;
}

.miniatura-area {
  min-width: 320px;
  height: 200px;
}

.apontamento-miniatura {
  width: 100%;
  height: 100%;
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

.sem-apontamentos {
  display: flex;
  padding: 10px;
  height: 100px;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.sem-apontamentos span {
  font-size: 1.5rem;
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
    color: white;
    font-size: 1.6rem;
    border-radius: 5px;
    background-color: var(--azul);
}

::v-deep .paginate-buttons:hover {
    background-color: var(--azul-escuro);
}
::v-deep .active-page {
    background-color: var(--verde);
}

::v-deep .active-page:hover {
    background-color: var(--verde-escuro);
}

@media (max-width: 320px) {
.apontamento {
  min-width: 270px;
  flex-direction: column;
}

.miniatura-area {
  min-width: 0px;
  height: 170px;
}
}
</style>