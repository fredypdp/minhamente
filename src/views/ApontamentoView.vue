<template>
    <div>
        <NavBar/>
        <div class="container-box">
            <div class="apontamento-container">
                <LateralBar/>
                <ApontamentoLer/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { Home } from "@/stores/Home.js";
import NavBar from "@/components/shared/NavBar.vue";
import LateralBar from "@/components/shared/LateralBar.vue";
import ApontamentoLer from "@/components/Apontamento/ApontamentoLer.vue";

const storeHome = Home()

onBeforeMount(() => {
    storeHome.assuntoAtual = undefined
})
</script>

<style scoped>
.apontamento-container {
    display: flex;
    margin-top: 30px;
}

@media (max-width: 1235px) {
    aside {
        display: none;
    }
    
    .apontamento-container {
        justify-content: center;
    }
}
</style>
