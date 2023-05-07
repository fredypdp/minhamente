<template>
    <div class="page-container">
        <ContaCriar/>
    </div>
</template>

<script>
import { LoginStore } from "@/stores/LoginStore.js";
import ContaCriar from "@/components/ContaCriar.vue";
export default {
    components: {
        ContaCriar
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