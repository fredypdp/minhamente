<template>
  <div id="HomeView">
    <NavBar/>
    <div class="assuntos-bar" v-if="loading">
      <div class="spin-area">
          <div role="status">
              <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <h2 class="assunto-page-titulo" v-if="storeHome.assuntoAtual == undefined || storeHome.assuntoAtual == 'todos'">Todos apontamentos</h2>
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
          <DataCriacao @ordenar="ordenar"/>
        </div>
      </div>
      <div class="sem-apontamentos" v-if="!apontamentosSkeleton && apontamentosTotal == 0">
        <span>Nenhum apontamento encontrado</span>
      </div>
      <ApontamentosListSkeleton v-if="apontamentosSkeleton"/>
      <ApontamentosList v-if="!apontamentosSkeleton && apontamentosTotal > 0" :apontamentos="ApontamentosMostrar"/>
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

<script setup>
// @ is an alias to /src
import axios from "axios";
import Multiselect from "@vueform/multiselect";
import { Home } from "@/stores/Home.js";
import { Login } from "@/stores/Login.js";
import { useRoute } from "vue-router";
import { ref, watch, computed, onMounted, onBeforeMount} from "vue";
import NavBar from "@/components/shared/NavBar.vue";
import HomeAssuntosBar from "@/components/HomeAssuntosBar.vue";
import DataCriacao from "@/components/shared/DataCriacao.vue";
import ApontamentosList from "@/components/shared/ApontamentosList.vue";
import ApontamentosListSkeleton from "@/components/shared/ApontamentosListSkeleton.vue";

const route = useRoute()

onBeforeMount(() => {
  if(route.meta.definirAssunto) {
    storeHome.assuntoAtual = route.meta.assunto
  }
})

const storeHome = Home()
const storeLogin = Login()
const loading = ref(false)
const assuntos = ref([])
const assuntoPagina = ref("")
const apontamentos = ref([])
const PaginaAtual = ref(1)
const currentPage = ref(1)
const ItensPorPagina = ref(20)
const temasLista = ref([])
const TemaSelecionado = ref("")
const criacaoCrescente = ref(false)
const apontamentosSkeleton = ref(false)
const ApontamentosMostrar = computed(() => {
  let inicio = (PaginaAtual.value - 1) * ItensPorPagina.value
  let fim = inicio + ItensPorPagina.value
  return apontamentos.value.slice(inicio, fim)
})

const apontamentosTotal = computed(() => {
  return apontamentos.value.length
})

onMounted(() => {
  pegarAssuntos()
  
  if (storeHome.assuntoAtual != undefined && storeHome.assuntoAtual != "todos") {
    pegarApontamentosDoAssunto(storeHome.assuntoAtual)
    pegarTemasDoAssunto(storeHome.assuntoAtual)
    return
  } 
  
  if(storeHome.assuntoAtual == undefined || storeHome.assuntoAtual == "todos") {
    pegarApontamentos()
    return
  }
})

watch(() => storeHome.assuntoAtual, (novaAssunto, antigaAssunto) => {
    if (novaAssunto != undefined && novaAssunto != "todos") {
      pegarApontamentosDoAssunto(novaAssunto)
      pegarTemasDoAssunto(novaAssunto)
      return
    } 
    if(novaAssunto == undefined || novaAssunto == "todos") {
      pegarApontamentos()
      return
    }
  }
)

watch(TemaSelecionado.value, async (novo, antigo) => {
    if(novo == undefined) {
      if (storeHome.assuntoAtual != undefined && storeHome.assuntoAtual != "todos") {
        pegarApontamentosDoAssunto(storeHome.assuntoAtual)
        pegarTemasDoAssunto(storeHome.assuntoAtual)
      } else {
        pegarApontamentos()
      }
    }
    
    apontamentosSkeleton.value = true

    let config = {
      method: 'get',
      url: 'https://apiminhamente.onrender.com/tema/'+novo
    };

    try {
      let { data } = await axios(config)
      apontamentos.value = data.tema.apontamentos.filter(apontamento => apontamento.visibilidade == true)
      apontamentosSkeleton.value = false
    } catch (error) {
      console.log(error);
      apontamentosSkeleton.value = false
    }
  }
)

function paginar(pagina){
  paginaAtual.value = pagina
}

async function ordenar() {
  if(!criacaoCrescente.value) {
    const arrayOrdenado = [];

    while (apontamentos.value.length > 0) { // Enquanto o array ter pelo menos um item
      let MaisNovoIndex = 0; // Index do item mais recente encontrado

      for (let i = 1; i < apontamentos.value.length; i++) { // Verificar cada item do array
        // Procurando o index do item mais recente
        if (apontamentos.value[i].created_at < apontamentos.value[MaisNovoIndex].created_at) {
          MaisNovoIndex = i;
        }
      }

      arrayOrdenado.push(apontamentos.value[MaisNovoIndex]); // Adicionar o item encontrado ao novo array
      apontamentos.value.splice(MaisNovoIndex, 1); // Deletar o item encontrado do array antigo
    }

    apontamentos.value = arrayOrdenado;
    criacaoCrescente.value = true // definindo que tá em ordem crescente
  } else {
    const arrayOrdenado = [];

    while (apontamentos.value.length > 0) { // Enquanto o array ter pelo menos um item
      let MaisAntigoIndex = 0; // Index do item mais antigo encontrado

      for (let i = 1; i < apontamentos.value.length; i++) { // Verificar cada item do array
        // Procurando o index do item mais antigo
        if (apontamentos.value[i].created_at > apontamentos.value[MaisAntigoIndex].created_at) {
          MaisAntigoIndex = i;
        }
      }

      arrayOrdenado.push(apontamentos.value[MaisAntigoIndex]); // Adicionar o item encontrado ao novo array
      apontamentos.value.splice(MaisAntigoIndex, 1); // Deletar o item encontrado do array antigo
    }

    apontamentos.value = arrayOrdenado;
    criacaoCrescente.value = false // definindo que tá em ordem decrescente
  }
}

async function pegarAssuntos() {
loading.value = true

let config = {
    method: 'get',
    url: 'https://apiminhamente.onrender.com/assuntos'
};

try {
  let { data } = await axios(config)
    
  assuntos.value.push("Usado pra preencher o primeiro index (Todos os assuntos)")
  data.assuntos.forEach( assunto => assuntos.value.push(assunto))
  assuntos.value.push("Usado pra preencher o último index (Criar assunto)")
  loading.value = false
} catch (error) {
  console.log(error);
  loading.value = false
}
}

async function pegarApontamentos() {
  apontamentosSkeleton.value = true

  let config = {
    method: 'get',
    url: 'https://apiminhamente.onrender.com/apontamentos'
  };

  try {
    let { data } = await axios(config)
    
    if(storeLogin.usuario != undefined && storeLogin.usuario.role == 0) {
      apontamentos.value = data.apontamentos
      apontamentosSkeleton.value = false
      return
    } 
      
    if(storeLogin.usuario == undefined || storeLogin.usuario.role == 1){
      apontamentos.value = data.apontamentos.filter(apontamento => apontamento.visibilidade == true)
      apontamentosSkeleton.value = false
      return
    }
  } catch (error) {
    console.log(error);
    apontamentosSkeleton.value = false
  }
}

async function pegarApontamentosDoAssunto(assunto) {
  apontamentosSkeleton.value = true
  
  let config = {
    method: 'get',
    url: 'https://apiminhamente.onrender.com/assunto/'+assunto
  };

  try {
    let { data } = await axios(config)

    if(storeLogin.usuario != undefined && storeLogin.usuario.role == 0) {
      apontamentos.value = data.assunto.apontamentos.sort( (a,b) => {
        if(a.created_at < b.created_at) {
          return 1
        }
        
        if(a.created_at > b.created_at) {
          return -1
        }
      })
      apontamentosSkeleton.value = false
      assuntoPagina.value = data.assunto.nome
      return
    } 
    
    if(storeLogin.usuario == undefined || storeLogin.usuario.role == 1){
      apontamentos.value = data.assunto.apontamentos.filter(apontamento => apontamento.visibilidade == true).sort( (a,b) => {
        if(a.created_at < b.created_at) {
          return 1
        }
        
        if(a.created_at > b.created_at) {
          return -1
        }
      })
      apontamentosSkeleton.value = false
      assuntoPagina.value = data.assunto.nome
      return
    }

  } catch (error) {
    console.log(error);
    apontamentosSkeleton.value = false
  }
}

async function pegarTemasDoAssunto(assunto) {
  apontamentosSkeleton.value = true
  
  let config = {
    method: 'get',
    url: 'https://apiminhamente.onrender.com/assunto/'+assunto
  };

  try {
    let { data } = await axios(config)
    temasLista.value = []

    data.assunto.temas.forEach( tema => temasLista.value.push({value: tema._id, label: tema.titulo}))
    apontamentosSkeleton.value = false
  } catch (error) {
    console.log(error);
    apontamentosSkeleton.value = false
  }
}
</script>
<style scoped>
#HomeView {
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
  font-size: 24px;
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
    font-size: 16px;
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
