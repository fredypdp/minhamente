<template>
<div class="apontamentos" :style="{'flex-direction': Column}">
    <AppApontamentoSkeleton v-for="(numero, index) in numeros" :key="index">
        <AppApontamentoSkeleton/>
    </AppApontamentoSkeleton>
</div>
</template>

<script>
import AppApontamentoSkeleton from "@/components/AppApontamentoSkeleton.vue";
export default {
    props: {
        FlexColumn: Boolean,
    },
    components: {
        AppApontamentoSkeleton,
    },
    computed: {
        numeros() {
            const numerosArray = [];
            for (let i = 0; i < 8; i++) {
                numerosArray.push(i);
            }
            return numerosArray;
        },
        column(){
            return this.FlexColumn ? "column" : "row"
        }
    }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style> // Estilo do multiselect
<style scoped>
.apontamentos {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
}
</style>