<template>
    <div>
        <NavBar/>
        <div class="container-box">
            <div class="publicar-container">
                <LateralBar/>
                <ApontamentoPublicar/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/shared/NavBar.vue";
import LateralBar from "@/components/Assunto/LateralBar.vue";
import ApontamentoPublicar from "@/components/Apontamento/ApontamentoPublicar.vue";
</script>

<style scoped>
.publicar-container {
    display: flex;
}

@media (max-width: 1235px) {
    aside {
        display: none;
    }
    
    .publicar-container {
        justify-content: center;
    }
}
</style>