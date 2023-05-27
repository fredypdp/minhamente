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
    },
    beforeRouteLeave(to, fom, next) {
        let confirmar = confirm("Deseja realmente saír?")
        next(confirmar)
    }
}
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