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
import ApontamentoEditar from "@/components/ApontamentoEditar.vue";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { Login } from "@/stores/Login.js";

const storeLogin = Login()
const router = useRouter()

onBeforeMount(() => {
    if(storeLogin.usuario == undefined || storeLogin.usuario.role != 0){
        router.push({name: "home"})
        return
    }
})
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