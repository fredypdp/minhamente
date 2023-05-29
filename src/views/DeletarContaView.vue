<template>
    <div>
        <span>{{ erro }}</span>
    </div>
</template>

<script>
import axios from "axios"
import { LoginStore } from "@/stores/LoginStore.js";
export default {
    data(){
        return {
            erro: undefined
        }
    },
    async beforeRouteEnter(to, from, next) {
        let config = {
            method: 'delete',
            url: `https://apiminhamente.onrender.com/deletarconta/${to.params.token}`,
            headers: {
                'authorization': `Bearer ${LoginStore().token}`
            }
        };

        try {
            await axios(config)

            localStorage.removeItem("token")
            localStorage.removeItem("usuario")
            localStorage.removeItem("_links")

            next({name: "home"})
        } catch (erro) {
            console.log(erro)
            next(vm => vm.erro.erro.response.data.erro)
        }
    }
}
</script>