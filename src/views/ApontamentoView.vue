<template>
    <div class="container">
        <div class="apontamento-container">
            <AppLateralBar/>
            <AppApontamentoLer/>
        </div>
    </div>
</template>

<script>
import AppLateralBar from "@/components/shared/AppLateralBar.vue";
import AppApontamentoLer from "@/components/AppApontamentoLer.vue";
export default {
    components: {
        AppLateralBar,
        AppApontamentoLer
    }
}
</script>

<style scoped>
.apontamento-container {
    display: flex;
}
</style>
