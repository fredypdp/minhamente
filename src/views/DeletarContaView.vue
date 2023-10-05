<template>
    <div>
        <span>{{ erro }}</span>
    </div>
</template>

<script setup lang="ts">
import axios from "axios"
import { Login } from "@/stores/Login.ts";
import { useRoute, useRouter } from "vue-router";

let erro = undefined
const storeLogin = Login()
const route = useRoute()
const router = useRouter()

deletarConta()

async function deletarConta() {
    let config = {
        method: 'delete',
        url: `https://apiminhamente.onrender.com/deletarconta/${route.params.token}`,
        headers: {
            'authorization': `Bearer ${storeLogin.token}`
        }
    };

    try {
        await axios(config)

        localStorage.removeItem("token")
        localStorage.removeItem("usuario")
        localStorage.removeItem("_links")

        router.push({name: "home"})
    } catch (error) {
        console.log(error)
        erro = error.response.data.erro
    }
}
</script>
