<template>
    <div>
        <AppNavBar/>
        <div class="container-box">
            <div class="publicar-container">
                <AppLateralBar/>
                <ApontamentoPublicar/>
            </div>
        </div>
    </div>
</template>

<script>
import AppNavBar from "@/components/shared/AppNavBar.vue";
import AppLateralBar from "@/components/shared/AppLateralBar.vue";
import ApontamentoPublicar from "@/components/ApontamentoPublicar.vue";
export default {
    components: {
        AppNavBar,
        AppLateralBar,
        ApontamentoPublicar
    },
    beforeRouteLeave(to, fom, next) {
        let confirmar = confirm("Deseja realmente saír?")
        next(confirmar)
    }
}
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