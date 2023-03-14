<template>
<div>
    <AppNavBar/>
    <div class="container-box">
        <form class="editar-tema-area">
            <label for="titulo" class="titulo-label">Editar título do tema:</label>
            <input type="text" name="titulo" class="titulo-input" id="titulo" placeholder="Título do tema" autocomplete="off" autofocus required>
            <span class="assuntos-label">Assuntos:</span>
            <Multiselect
                v-model="temas.AssuntosSelecionados"
                mode="tags"
                :close-on-select="false"
                :searchable="true"
                :options="assuntosLista"
                placeholder="Selecionar assunto"
                noOptionsText="Sem assuntos"
                noResultsText="Sem resultados"
            />
            <button type="submit" class="botao-editar">Editar tema</button>
        </form>
    </div>
</div>
</template>

<script>
import AppNavBar from "@/components/shared/AppNavBar.vue";
import Multiselect from '@vueform/multiselect'
export default {
    components: {
        AppNavBar,
        Multiselect,
    },
    data(){
        return {
            temas: {
                titulo: "",
                AssuntosSelecionados: [],

            },
            assuntosLista: [],
        }
    }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
.editar-tema-area {
    margin: auto;
    padding: 10px;
    display: flex;
    max-width: 500px;
    border-radius: 5px;
    align-items: flex-start;
    flex-direction: column;
    background-color: #e7e7e7;
}

.editar-tema-area label, .assuntos-label {
    color: black;
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 10px;
}

.editar-tema-area input {
    width: 100%;
    padding: 5px;
    color: black;
    font-size: 20px;
    font-weight: 500;
    border-radius: 5px;
    margin-bottom: 20px;
    border: 1px solid black;
}

.botao-editar {
    width: 100%;
    outline: none;
    color: white;
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;
    margin-top: 10px;
    padding: 5px 15px;
    border-radius: 5px;
    text-align: center;
    background-color: var(--verde);
}

.botao-editar:hover {
    background-color: var(--verde-escuro);
}
</style>