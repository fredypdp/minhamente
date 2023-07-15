<template>
<div class="apontamentos" :style="{'flex-direction': column}">
    <Apontamento v-for="apontamento in apontamentos" :key="apontamento.id" :apontamento="apontamento">
        <slot :apontamento="apontamento"></slot>
    </Apontamento>
</div>
</template>

<script setup>
import { ref, computed } from "vue";
import Apontamento from "@/components/Apontamento.vue";
const props = defineProps({
    FlexColumn: Boolean,
    apontamentos: {
        type: Array,
        required: true
    }
})

const column = computed(() => {
    return props.FlexColumn ? "column" : "row"
})
</script>

<style src="@vueform/multiselect/themes/default.css"></style> // Estilo do multiselect
<style scoped>
.apontamentos {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
}
</style>