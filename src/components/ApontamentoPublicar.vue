<template>
    <section>
        <form class="publicar-area">
            <label for="titulo">Título:</label>
            <input type="text" name="titulo" id="titulo" placeholder="Título do apontamento" autocomplete="off" autofocus>
            <label for="apontamento-conteudo">Conteúdo:</label>
            <div class="apontamento-conteudo-area">
                <Editor
                    v-model="conteudo"
                    api-key="w8mi5xtp813615niwmrswpjffnbzalbn1oi1dfjrhc827fdf"
                    :init="{
                        min_height: 500,
                        language: 'pt_BR',
                        placeholder: 'Escreva os apontamentos aqui',
                        plugins: 'advlist autolink link image lists preview searchreplace wordcount insertdatetime media save table emoticons code help print hr paste autoresize',
                    }"
                />
            </div>
            <span style="display: none;color: red; margin-bottom: 5px;" id="publicar-erro">Verifique se todos os campos foram preenchidos</span>
            <div class="botoes-area">
                <div class="botoes">
                    <div class="botoes-top">
                        <div class="multi-select-area">
                            <Multiselect
                                v-model="apontamento.AssuntosSelecionados"
                                mode="tags"
                                :close-on-select="false"
                                :searchable="true"
                                :options="assuntosLista"
                                placeholder="Selecionar assunto"
                                noOptionsText="Sem assuntos"
                                noResultsText="Sem resultados"
                            />
                            <Multiselect
                                v-model="apontamento.TemasSelecionados"
                                mode="tags"
                                :close-on-select="false"
                                :searchable="true"
                                :options="temasLista"
                                placeholder="Selecionar tema"
                                noOptionsText="Sem temas"
                                noResultsText="Sem resultados"
                            />
                        </div>
                    </div>
                    <div class="botoes-bottom">
                        <AppDropdownVisibilidade/>
                        <BotaoMiniatura/>
                    </div>
                </div>
                <div>
                    <BotaoPublicar/>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import Multiselect from '@vueform/multiselect'
import BotaoPublicar from "@/components/shared/BotaoPublicar.vue";
import BotaoMiniatura from "@/components/shared/BotaoMiniatura.vue";
import AppDropdownVisibilidade from "@/components/shared/AppDropdownVisibilidade.vue";
export default {
    components: {
        Editor,
        Multiselect,
        BotaoPublicar,
        BotaoMiniatura,
        AppDropdownVisibilidade,
    },
    data(){
        return {
            apontamento: {
                titulo: "",
                conteudo: "",
                miniatura: {},
                TemasSelecionados: [],
                AssuntosSelecionados: [],

            },
            temasLista: [],
            assuntosLista: [],
        }
    }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
section {
    width: 85%;
    max-width: 900px;
    margin-left: 60px;
    padding-bottom: 20px;
}

.publicar-area {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
}

.publicar-area label[for="titulo"], .publicar-area label[for="miniatura"], .publicar-area label[for="apontamento-conteudo"] {
    color: black;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 15px;
}

.publicar-area input {
    width: 100%;
    height: 40px;
    color: black;
    font-size: 20px;
    font-weight: 500;
    padding: 15px 15px;
    border-radius: 5px;
    border: 1px solid black;
    margin-bottom: 30px;
}

.apontamento-conteudo-area {
    width: 100%;
}

.botoes-area {
    width: 100%;
    display: flex;
    margin: 10px 0px;
    flex-direction: row;
    justify-content: space-between;
}

.botoes {
    width: 80%;
    display: flex;
    flex-direction: column;
}

.botoes-top {
    margin-bottom: 10px;
}

.multi-select-area {
    width: 100%;
    display: flex;
}

.multi-select-area .multiselect:last-child {
    margin-left: 10px;
}

.botoes-bottom {
    display: flex;
}

.botoes-bottom div:first-child {
    margin-right: 10px;
}
</style>