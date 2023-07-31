<template>
    <div>
        <NavBar/>
        <div class="container-box">
            <div class="editar-container">
                <LateralBar/>
                <ApontamentoEditar/>
            </div>
        </div>
    </div>
</template>

<script setup>
import NavBar from "@/components/shared/NavBar.vue";
import LateralBar from "@/components/shared/LateralBar.vue";
import ApontamentoEditar from "@/components/Apontamento/ApontamentoEditar.vue";
</script>

<style scoped>
.editar-container {
    display: flex;
}

@media (max-width: 1235px) {
    aside {
        display: none;
    }
    
    .editar-container {
        justify-content: center;
    }
}
</style>