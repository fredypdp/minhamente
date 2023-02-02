<template>
    <div>
        <AppNavBar/>
        <div class="container">
            <div class="publicar-container">
                <AppLateralBar/>
                <AppApontamentoPublicar/>
            </div>
        </div>
    </div>
</template>

<script>
import AppNavBar from "@/components/shared/AppNavBar.vue";
import AppLateralBar from "@/components/shared/AppLateralBar.vue";
import AppApontamentoPublicar from "@/components/AppApontamentoPublicar.vue";
export default {
    components: {
        AppNavBar,
        AppLateralBar,
        AppApontamentoPublicar
    }
}
</script>

<style scoped>
.publicar-container {
    display: flex;
}
</style>