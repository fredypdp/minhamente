<template>
    <div>
        <AppNavBar/>
        <div class="container-box">
            <div class="apontamento-container">
                <AppLateralBar/>
                <ApontamentoLer/>
            </div>
        </div>
    </div>
</template>

<script>
import AppNavBar from '@/components/shared/AppNavBar.vue'
import ApontamentoLer from "@/components/ApontamentoLer.vue";
import AppLateralBar from "@/components/shared/AppLateralBar.vue";
export default {
    components: {
        AppNavBar,
        AppLateralBar,
        ApontamentoLer,
    }
}
</script>

<style scoped>
.apontamento-container {
    display: flex;
    margin-top: 30px;
}

@media (max-width: 390px) {
    .apontamento-container {
        justify-content: center;
    }
}
</style>
