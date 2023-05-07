<template>
<div class="apontamentos" :style="{'flex-direction': Column}">
    <AppApontamento v-for="apontamento in apontamentos" :key="apontamento.id" :apontamento="apontamento">
        <slot :apontamento="apontamento"></slot>
    </AppApontamento>
</div>
</template>

<script>
import AppApontamento from "@/components/AppApontamento.vue";
export default {
    props: {
        FlexColumn: Boolean,
        apontamentos: {
            type: Array,
            required: true
        }
    },
    components: {
        AppApontamento,
    },
    data(){
        return {
            selecionados: null,
            options: [
                { value: 'batman', label: 'Batman' },
                { value: 'robin', label: 'Robin' },
                { value: 'joker', label: 'Joker' },
            ],
        }
    },
    computed: {
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