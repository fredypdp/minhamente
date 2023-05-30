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
import axios from "axios"
import { HomeStore } from "@/stores/HomeStore.js";
import { LoginStore } from "@/stores/LoginStore.js";
import AppNavBar from '@/components/shared/AppNavBar.vue'
import ApontamentoLer from "@/components/ApontamentoLer.vue";
import AppLateralBar from "@/components/shared/AppLateralBar.vue";
export default {
    components: {
        AppNavBar,
        AppLateralBar,
        ApontamentoLer,
    },
    beforeMount() {
        HomeStore().assuntoAtual = undefined
    },
    async beforeRouteEnter(to, from, next) {
        let config = {
            method: 'get',
            url: 'https://apiminhamente.onrender.com/apontamento/'+to.params.id
        };

        try {
            let apontamento = await axios(config)
            
            if (apontamento.data.apontamento == undefined) {
                next({name: "home"})
                return
            }

            if (apontamento.data.apontamento.visibilidade == false && LoginStore().usuario.role == 1 || apontamento.data.apontamento.visibilidade == false && LoginStore().usuario == undefined) {
                next({name: "home"})
                return
            }

            next()
        } catch (erro) {
            console.log(erro);
            next({name: "home"})
        }
    },
}
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
