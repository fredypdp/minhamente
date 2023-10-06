<template>
<div class="apontamentos" :style="(flexDirectionStyle as StyleValue)">
    <ApontamentoSkeleton v-for="(numero, index) in numeros" :key="index"/>
</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ApontamentoSkeleton from "@/components/Apontamento/ApontamentoSkeleton.vue";
import type { StyleValue } from "vue";

const props = defineProps({
    FlexColumn: Boolean,
})

const numeros = computed(() => {
    const numerosArray = [];
    for (let i = 0; i < 8; i++) {
        numerosArray.push(i);
    }
    return numerosArray;
})

const flexDirectionStyle = computed(() => {
    return { flexDirection: props.FlexColumn ? "column" : "row" };
});
</script>

<style src="@vueform/multiselect/themes/default.css"></style> // Estilo do multiselect
<style scoped>
.apontamentos {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
}
</style>