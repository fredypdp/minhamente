<template>
    <div>
        <AppNavBar/>
        <div class="container-box">
            <div class="editar-container">
                <AppLateralBar/>
                <ApontamentoEditar/>
            </div>
        </div>
    </div>
</template>

<script>
import AppNavBar from "@/components/shared/AppNavBar.vue";
import AppLateralBar from "@/components/shared/AppLateralBar.vue";
import ApontamentoEditar from "@/components/ApontamentoEditar.vue";
export default {
    components: {
        AppNavBar,
        AppLateralBar,
        ApontamentoEditar
    }
}
</script>

<style scoped>
.editar-container {
    display: flex;
}
</style>