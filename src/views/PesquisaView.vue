<template>
  <div id="PesquisaView">
    <NavBar/>
    <div class="container-box">
      <div class="pesquisa-area">
          <div class="pesquisa-filtros">
            <DataCriacao @ordenar="ordenar"/>
          </div>
          <div class="sem-apontamentos" v-if="!loading && apontamentosTotal == 0">
            <span>Nenhum apontamento encontrado</span>
          </div>
          <ApontamentosList :FlexColumn="true" :apontamentos="ApontamentosMostrar" v-slot="{apontamento}">
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

<script setup lang="ts">
import axios from "axios";
import type { Apontamento } from "@/types/types";
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Login } from "@/stores/Login";
import NavBar from "@/components/shared/NavBar.vue";
import DataCriacao from "@/components/shared/DataCriacao.vue";
import ApontamentosList from "@/components/Apontamento/ApontamentosList.vue";
import type { RouteLocationNormalizedLoaded } from "vue-router";

const route = useRoute();
const router = useRouter();
const storeLogin = Login();

const loading = ref<boolean>(false);
const apontamentos = ref<Apontamento[]>([]);
const PaginaAtual = ref<number>(1);
const currentPage = ref<number>(1);
const ItensPorPagina = ref<number>(20);
const criacaoCrescente = ref<boolean>(false);

const apontamentosTotal = computed((): number => apontamentos.value.length);
const ApontamentosMostrar = computed((): Apontamento[] => {
  const inicio = (PaginaAtual.value - 1) * ItensPorPagina.value;
  const fim = inicio + ItensPorPagina.value;
  return apontamentos.value.slice(inicio, fim);
});

onMounted(() => {
  pesquisarApontamentos();
});

watch(route, (to: RouteLocationNormalizedLoaded, from: RouteLocationNormalizedLoaded) => {
  if (typeof to.query.pesquisa === 'string') {
    if (to.query.pesquisa.trim() === "") {
      router.push({ name: "home" });
      return;
    }

    document.title = `${to.query.pesquisa} - MinhaMente`;
    pesquisarApontamentos();
  } else {
    router.push({ name: "home" });
  }
}, { deep: true });

function paginar(pagina: number): void {
  PaginaAtual.value = pagina;
}

async function ordenar(): Promise<void> {
  if (!criacaoCrescente.value) {
    const arrayOrdenado: Apontamento[] = [];

    while (apontamentos.value.length > 0) {
      let MaisNovoIndex = 0;

      for (let i = 1; i < apontamentos.value.length; i++) {
        if (apontamentos.value[i].created_at < apontamentos.value[MaisNovoIndex].created_at) {
          MaisNovoIndex = i;
        }
      }

      arrayOrdenado.push(apontamentos.value[MaisNovoIndex]);
      apontamentos.value.splice(MaisNovoIndex, 1);
    }

    apontamentos.value = arrayOrdenado;
    criacaoCrescente.value = true;
  } else {
    const arrayOrdenado: Apontamento[] = [];

    while (apontamentos.value.length > 0) {
      let MaisAntigoIndex = 0;

      for (let i = 1; i < apontamentos.value.length; i++) {
        if (apontamentos.value[i].created_at > apontamentos.value[MaisAntigoIndex].created_at) {
          MaisAntigoIndex = i;
        }
      }

      arrayOrdenado.push(apontamentos.value[MaisAntigoIndex]);
      apontamentos.value.splice(MaisAntigoIndex, 1);
    }

    apontamentos.value = arrayOrdenado;
    criacaoCrescente.value = false;
  }
}

async function pesquisarApontamentos(): Promise<void> {
  loading.value = true;
  
  const config = {
    method: 'get',
    url: 'https://apiminhamente.onrender.com/results',
    params: {
      pesquisa: route.query.pesquisa
    }
  };

  try {
    const { data } = await axios(config);
    
    if (storeLogin.usuario && storeLogin.usuario.role == 0) {
      apontamentos.value = data.apontamentos;
      loading.value = false;
      return;
    }

    if (storeLogin.usuario == undefined || storeLogin.usuario.role == 1) {
      apontamentos.value = data.apontamentos.filter((apontamento: Apontamento) => { 
        return apontamento.visibilidade == true;
      })
      
      loading.value = false;
      return;
    }

  } catch (error) {
    console.log(error);
    loading.value = false;
  }
}
</script>


<style scoped>
#PesquisaView {
  padding-bottom: 30px;
}

.apontamentos {
  flex-wrap: nowrap;
}

.pesquisa-area {
  display: flex;
  flex-direction: column;
}

.pesquisa-filtros {
  width: 100%;
  padding: 5px 0px;
  border-bottom: 1px solid black;
}

.apontamento-container {
    width: 100%;
    height: 100vh;
    max-height: 200px;
    margin-bottom: 20px;
    /* height: 100vh; */
    /* aspect-ratio: 16/9; */
}
.apontamento {
  width: 100%;
  height: 100%;
  display: flex;
  /* max-height: 200px; */
  /* margin-bottom: 10px; */
}

.miniatura-area {
  width: 100%;
  height: 100%;
  max-width: 360px;
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
  font-size: 20px;
  font-weight: 500;
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
  font-size: 20px;
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
@media (max-width: 700px) {
.apontamento-container {
  height: unset;
  max-height: unset;
}

.apontamento {
    width: 100%;
    height: unset;
    aspect-ratio: 16/9;
    flex-direction: column;
    /* max-height: 100%; */
    /* margin-bottom: 20px; */
}

.miniatura-area {
  width: 100%;
  height: 100%;
  max-width: none;
}

.apontamento-miniatura {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: var(--azul);
}

.titulo-area {
  margin-top: 5px;
  margin-left: 0px;
}

.apontamento-titulo {
  font-size: 3.8vw;
}
}
</style>