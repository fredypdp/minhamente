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

<script setup>
import NavBar from "@/components/shared/NavBar.vue";
import LateralBar from "@/components/shared/LateralBar.vue";
import ApontamentoPublicar from "@/components/ApontamentoPublicar.vue";
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