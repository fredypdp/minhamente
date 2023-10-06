<template>
    <div>
        <span>{{ erro }}</span>
    </div>
</template>

<script setup lang="ts">
import axios from "axios"
import { ref } from "vue";
import { Login } from "@/stores/Login";
import { useRoute, useRouter } from "vue-router";

let erro = ref<string | undefined>(undefined)
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
    } catch (error: any) {
        console.log(error)
        erro.value = error.response.data.erro
    }
}
</script>
