<template>
  <div id="HomeView">
    <AppNavBar/>
    <div class="assuntos-bar" v-if="loading">
      <div class="spin-area">
          <div role="status">
              <svg aria-hidden="true" class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Carregando...</span>
          </div>
      </div>
    </div>
    <HomeAssuntosBar :assuntos="assuntos" v-else/>
    <div class="container-box">
      <div class="home-apontamentos-top">
        <div class="assuntos-page-titulo-area">
            <h2 class="assunto-page-titulo" v-if="HomeStore.assuntoAtual == undefined || HomeStore.assuntoAtual == 'todos'">Todos apontamentos</h2>
            <h2 class="assunto-page-titulo" v-else>{{ assuntoPagina }}</h2>
            <div class="assunto-page-titulo-bar"></div>
        </div>
        <div class="apontamentos-filtros">
            <Multiselect
                v-model="TemaSelecionado"
                :close-on-select="true"
                :searchable="true"
                :options="temasLista"
                placeholder="Temas"
                noOptionsText="Sem temas"
                noResultsText="Sem resultados"
            />
            <AppDataCriacao @ordenar="ordenar"/>
        </div>
      </div>
      <div class="sem-apontamentos" v-if="!apontamentosSkeleton && apontamentosTotal == 0">
        <span>Nenhum apontamento encontrado</span>
      </div>
      <ApontamentosListSkeleton v-if="apontamentosSkeleton"/>
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
import axios from "axios";
import Multiselect from '@vueform/multiselect'
import { HomeStore } from "@/stores/HomeStore.js";
import { LoginStore } from "@/stores/LoginStore.js";
import AppNavBar from '@/components/shared/AppNavBar.vue'
import HomeAssuntosBar from '@/components/HomeAssuntosBar.vue'
import AppDataCriacao from "@/components/shared/AppDataCriacao.vue";
import ApontamentosList from '@/components/shared/ApontamentosList.vue'
import ApontamentosListSkeleton from '@/components/shared/ApontamentosListSkeleton.vue'
export default {
  components: {
    AppNavBar,
    Multiselect,
    AppDataCriacao,
    HomeAssuntosBar,
    ApontamentosList,
    ApontamentosListSkeleton,
  },
  data() {
    return {
      HomeStore: HomeStore(),
      loading: false,
      assuntos: [],
      apontamentos: [],
      PaginaAtual: 1,
      currentPage: 1,
      ItensPorPagina: 20,
      temasLista: [],
      TemaSelecionado: "",
      apontamentosSkeleton: false,
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
  watch: {
    "HomeStore.assuntoAtual": {
      handler(novaAssunto, antigaAssunto) {
        if (novaAssunto != undefined && novaAssunto != "todos") {
          this.pegarApontamentosDoAssunto(novaAssunto)
          this.pegarTemasDoAssunto(novaAssunto)
          return
        } 
        
        if(novaAssunto == undefined || novaAssunto == "todos") {
          this.pegarApontamentos()
          return
        }
      }
    },
    async TemaSelecionado(novo, antigo) {
      if(novo == undefined) {
        if (HomeStore().assuntoAtual != undefined && HomeStore().assuntoAtual != "todos") {
          this.pegarApontamentosDoAssunto(HomeStore().assuntoAtual)
          this.pegarTemasDoAssunto(HomeStore().assuntoAtual)
        } else {
          this.pegarApontamentos()
        }
      }
      
      this.apontamentosSkeleton = true

      let config = {
        method: 'get',
        url: 'https://apiminhamente.onrender.com/tema/'+novo
      };

      try {
        let { data } = await axios(config)
        this.apontamentos = data.tema.apontamentos.filter(apontamento => apontamento.visibilidade == true)
        this.apontamentosSkeleton = false
      } catch (erro) {
        console.log(erro);
        this.apontamentosSkeleton = false
      }
    },
  },
  mounted() {
    this.pegarAssuntos()

    if (this.HomeStore.assuntoAtual != undefined && this.HomeStore.assuntoAtual != "todos") {
      this.pegarApontamentosDoAssunto(this.HomeStore.assuntoAtual)
      this.pegarTemasDoAssunto(this.HomeStore.assuntoAtual)
      return
    } 
    
    if(this.HomeStore.assuntoAtual == undefined || this.HomeStore.assuntoAtual == "todos") {
      this.pegarApontamentos()
      return
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name != "ApontamentoLer") {
      HomeStore().assuntoAtual = undefined
      next()
      return
    }
    
    next()
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
    async pegarAssuntos() {
          this.loading = true

          let config = {
              method: 'get',
              url: 'https://apiminhamente.onrender.com/assuntos'
          };

          try {
              let assuntos = await axios(config)
              
              this.assuntos.push("Usado pra preencher o primeiro index (Todos os assuntos)")
              assuntos.data.assuntos.forEach( assunto => this.assuntos.push(assunto))
              this.assuntos.push("Usado pra preencher o último index (Criar assunto)")
              this.loading = false
          } catch (erro) {
              this.loading = false
              console.log(erro);
          }
    },
    async pegarApontamentos() {
        this.apontamentosSkeleton = true

        let config = {
            method: 'get',
            url: 'https://apiminhamente.onrender.com/apontamentos'
        };

        try {
            let apontamentos = await axios(config)
            
            if(LoginStore().usuario != undefined && LoginStore().usuario.role == 0) {
              this.apontamentos = apontamentos.data.apontamentos
              this.apontamentosSkeleton = false
              return
            } 
            
            if(LoginStore().usuario == undefined || LoginStore().usuario.role == 1){
              this.apontamentos = apontamentos.data.apontamentos.filter(apontamento => apontamento.visibilidade == true)
              this.apontamentosSkeleton = false
              return
            }
        } catch (erro) {
            this.apontamentosSkeleton = false
            console.log(erro);
        }
    },
    async pegarApontamentosDoAssunto(assunto) {
      this.apontamentosSkeleton = true

      let config = {
        method: 'get',
        url: 'https://apiminhamente.onrender.com/assunto/'+assunto
      };

      try {
        let assunto = await axios(config)

        if(LoginStore().usuario != undefined && LoginStore().usuario.role == 0) {
          this.apontamentos = assunto.data.assunto.apontamentos
          this.apontamentosSkeleton = false
          this.assuntoPagina = assunto.data.assunto.nome
          return
        } 
        
        if(LoginStore().usuario == undefined || LoginStore().usuario.role == 1){
          this.apontamentos = assunto.data.assunto.apontamentos.filter(apontamento => apontamento.visibilidade == true)
          this.apontamentosSkeleton = false
          this.assuntoPagina = assunto.data.assunto.nome
          return
        }

      } catch (erro) {
        console.log(erro);
        this.apontamentosSkeleton = false
      }
    },
    async pegarTemasDoAssunto(assunto) {
      this.apontamentosSkeleton = true

      let config = {
        method: 'get',
        url: 'https://apiminhamente.onrender.com/assunto/'+assunto
      };

      try {
        let assunto = await axios(config)
        this.temasLista = []
        assunto.data.assunto.temas.forEach( tema => this.temasLista.push({value: tema._id, label: tema.titulo}))
        this.apontamentosSkeleton = false
      } catch (erro) {
        console.log(erro);
        this.apontamentosSkeleton = false
      }
    },
  },
}
</script>
<style scoped>
#HomeView .contaner-box {
  padding-top: 50px;
  padding-bottom: 30px;
}

.assuntos-bar {
    padding: 10px 0px;
    margin-top: 50px;
    background-color: var(--amarelo);
}

.spin-area {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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
  font-size: 2.4rem;
}

.assuntos-page-titulo-area {
    display: flex;
    flex-direction: column;
}

.assunto-page-titulo {
    color: var(--azul);
    font-size: 2.4rem;
    font-weight: 500;
    text-align: justify;
}

.assunto-page-titulo-bar{
    width: 30%;
    min-width: 100px;
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
