<template>
    <div class="page-container">
        <ContaLogin/>
    </div>
</template>

<script>
import ContaLogin from "@/components/ContaLogin.vue";
export default {
    components: {
        ContaLogin
    }
}
</script>

<style scoped>
.page-container {
    padding: 50px;
}
</style>