<template>
    <div class="page-container">
        <ContaCriar/>
    </div>
</template>

<script setup>
import ContaCriar from "@/components/ContaCriar.vue";
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