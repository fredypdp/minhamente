<template>
    <div class="page-container">
        <ContaLogin/>
    </div>
</template>

<script>
import { LoginStore } from "@/stores/LoginStore.js";
import ContaLogin from "@/components/ContaLogin.vue";
export default {
    components: {
        ContaLogin
    },
    beforeRouteEnter(to, from, next){
        if(LoginStore().usuario != undefined){
            next({name: "home"})
            return
        }
        
        next()
    }
}
</script>

<style scoped>
.page-container {
    padding: 50px;
}
</style>