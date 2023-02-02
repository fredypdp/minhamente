<template>
    <div>
        <AppNavBar/>
        <div class="container">
            <div class="publicar-container">
                <AppLateralBar/>
                <AppApontamentoEditar/>
            </div>
        </div>
    </div>
</template>

<script>
import AppNavBar from "@/components/shared/AppNavBar.vue";
import AppLateralBar from "@/components/shared/AppLateralBar.vue";
import AppApontamentoEditar from "@/components/AppApontamentoEditar.vue";
export default {
    components: {
        AppNavBar,
        AppLateralBar,
        AppApontamentoEditar
    }
}
</script>

<style scoped>
.publicar-container {
    display: flex;
}
</style>