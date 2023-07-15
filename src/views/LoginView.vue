<template>
    <div class="page-container">
        <ContaLogin/>
    </div>
</template>

<script setup>
import ContaLogin from "@/components/ContaLogin.vue";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { Login } from "@/stores/Login.js";

const router = useRouter()
const storeLogin = Login()

onBeforeMount(() => {
    if(storeLogin.usuario != undefined){
        router.push({name: "home"})
        return
    }
})
</script>

<style scoped>
.page-container {
    padding: 50px;
}
</style>