<template>
<div id="PainelView">
    <NavBar/>
    <div class="container-box">
        <div class="painel">
            <div class="painel-titulo">
                <h1 class="titulo" v-if="isPainel">Painel</h1>
                <h1 class="titulo" v-if="!isPainel">Painel: {{ nomePagina }}</h1>
            </div>
            <section class="painel-menu">
                <div class="painel-menu-items">
                    <div class="painel-menu-item">
                        <router-link :to="{name: 'PainelApontamentos'}" exact>
                            <span class="painel-menu-item-titulo">Apontamentos</span>
                        </router-link>
                    </div>
                    <div class="painel-menu-item">
                        <router-link :to="{name: 'PainelAssuntos'}" exact>
                            <span class="painel-menu-item-titulo">Assuntos</span>
                        </router-link>
                    </div>
                    <div class="painel-menu-item">
                        <router-link :to="{name: 'PainelTemas'}" exact>
                            <span class="painel-menu-item-titulo">Temas</span>
                        </router-link>
                    </div>
                    <div class="painel-menu-item">
                        <router-link :to="{name: 'PainelUsuarios'}" exact>
                            <span class="painel-menu-item-titulo">Usuários</span>
                        </router-link>
                    </div>
                </div>
                <div class="painel-menu-table">
                    <router-view/>
                </div>
            </section>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import NavBar from "@/components/shared/NavBar.vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

const route = useRoute()

const PaginaAtual = ref<string>("")
PaginaAtual.value = route.name as string
const isPainel = computed(() => {
    return PaginaAtual.value === "painel"
})

const nomePagina = computed(() => {
    let pagina
    switch (PaginaAtual.value) {
        case "PainelTemas":
            pagina = "Temas"
            break;
        case "PainelUsuarios":
            pagina = "Usuários"
            break;
        case "PainelAssuntos":
            pagina = "Assuntos"
            break;
        case "PainelApontamentos":
            pagina = "Apontamentos"
            break;
        default:
            break;
    }

    return pagina
})

onBeforeRouteUpdate(
    (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
        if (PaginaAtual) {
            // Nome da página atual
            PaginaAtual.value = to.name as string
            next()
        }
    }
)
</script>
<style scoped>
#PainelView {
    padding-bottom: 50px;
}

.painel {
    padding-top: 30px;
}

.active-link {
    border-bottom: 5px solid var(--verde);
}

.painel-titulo {
    text-align: left;
}

.titulo {
    color: black;
    font-size: 26px;
    font-weight: 500;
}
.painel-menu-items {
    display: flex;
    height: 50px;
    flex-wrap: wrap;
    margin-top: 20px;
    flex-direction: row;
}

.painel-menu-item {
    flex: 1;
}

.painel-menu-item:hover {
    background-color: #cccccc73;
}

.painel-menu-item-active {
    border-bottom: 3px solid var(--azul);
}

.painel-menu-item a {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
}

.painel-menu-item-titulo {
    color: black;
    font-size: 26px;
    font-weight: 500;
}
</style>