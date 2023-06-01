<template>
    <section>
        <form @submit.prevent="editar" class="editar-area">
            <label for="titulo">Editar título:</label>
            <input type="text" name="titulo" id="titulo" placeholder="Título do apontamento" autocomplete="off" autofocus v-model="titulo">
            <label for="apontamento-conteudo">Editar conteúdo:</label>
            <div class="apontamento-conteudo-area">
                <TinyMCE
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
            <span id="erro">{{ erro }}</span>
            <div class="botoes-area">
                <div class="botoes-left">
                    <div class="botoes-left-top">
                        <div class="multi-select-area">
                            <Multiselect
                                v-model="AssuntosSelecionados"
                                mode="tags"
                                :close-on-select="true"
                                :searchable="true"
                                :options="assuntosLista"
                                placeholder="Selecionar assunto"
                                noOptionsText="Sem assuntos"
                                noResultsText="Sem resultados"
                            />
                            <Multiselect
                                v-model="TemasSelecionados"
                                mode="tags"
                                :close-on-select="true"
                                :searchable="true"
                                :options="temasLista"
                                placeholder="Selecionar tema"
                                noOptionsText="Sem temas"
                                noResultsText="Sem resultados"
                            />
                        </div>
                    </div>
                    <div class="botoes-left-bottom">
                        <AppDropdownVisibilidade @publico="visibilidadePublico" @privado="visibilidadePrivado"/>
                        <BotaoMiniatura @miniatura="miniatura = $event"/>
                    </div>
                </div>
                <div class="botoes-right">
                    <BotaoCancelar @click="cancelar"/>
                    <BotaoEditar :botaoDesativado="botaoDesativado" :loading="loading"/>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import axios from "axios";
import TinyMCE from '@tinymce/tinymce-vue';
import Multiselect from '@vueform/multiselect';
import { LoginStore } from "@/stores/LoginStore.js";
import BotaoEditar from "@/components/shared/BotaoEditar.vue";
import BotaoCancelar from "@/components/shared/BotaoCancelar.vue";
import BotaoMiniatura from "@/components/shared/BotaoMiniatura.vue";
import AppDropdownVisibilidade from "@/components/shared/AppDropdownVisibilidade.vue";
export default {
    components: {
        TinyMCE,
        Multiselect,
        BotaoEditar,
        BotaoCancelar,
        BotaoMiniatura,
        AppDropdownVisibilidade,
    },
    data(){
        return {
            loading: false,
            erro: "",
            botaoDesativado: false,
            titulo: "",
            conteudo: "",
            miniatura: undefined,
            visibilidade: undefined,
            TemasSelecionados: [],
            AssuntosSelecionados: [],
            temasLista: [],
            assuntosLista: [],
        }
    },
    async beforeMount() {

        let config = {
            method: 'get',
            url: 'https://apiminhamente.onrender.com/apontamento/'+this.$route.params.id
        };

        try {
            let apontamento = await axios(config)
            
            this.titulo = apontamento.data.apontamento.titulo
            this.conteudo = apontamento.data.apontamento.conteudo
            this.miniatura = apontamento.data.apontamento.miniatura
            this.visibilidade = apontamento.data.apontamento.visibilidade
        } catch (erro) {
            console.log(erro);
            vm.$route.go(-1)
        }
    },
    mounted() {
        this.pegarAssuntos()
    },
    watch: {
        AssuntosSelecionados(novos, antigos) {
            this.temasLista = []
            this.TemasSelecionados = []

            if(novos == undefined) {
                return
            }
            
            novos.forEach( async assunto => {

                let config = {
                    method: 'get',
                    url: 'https://apiminhamente.onrender.com/assunto/'+assunto
                };

                try {
                    let { data } = await axios(config)
                    // this.temasLista = []
                    data.assunto.temas.forEach( tema => this.temasLista.push({value: tema._id, label: tema.titulo}))
                } catch (erro) {
                    console.log(erro);
                }
            })
        }
    },
    methods: {
        visibilidadePublico() {
            this.visibilidade = true
        },
        visibilidadePrivado() {
            this.visibilidade = false
        },
        async editar() {
            this.loading = true
            this.botaoDesativado = true
            document.getElementById("erro").style.display = "none"

            const formData = new FormData();
            let titulo = this.titulo
            let conteudo = this.conteudo
            let assuntos = this.AssuntosSelecionados
            let temas = this.TemasSelecionados
            let visibilidade = this.visibilidade
            let miniatura = this.miniatura
            
            formData.append('id', this.$route.params.id);

            if(titulo != undefined && titulo.trim().length > 0) {
                formData.append('titulo', titulo);
            }

            if(conteudo != undefined && conteudo.trim().length > 0) {
                formData.append('conteudo', conteudo);
            }
            
            if(assuntos != undefined && assuntos.length != 0) {
                formData.append("assuntos", JSON.stringify(assuntos))
            }

            if(temas != undefined && temas.length != 0) {
                formData.append("temas", JSON.stringify(temas));
            }

            if(visibilidade != undefined) {
                formData.append('visibilidade', visibilidade);
            }
            
            if(miniatura != undefined) {
                formData.append('miniatura', miniatura);
            }
            
            try {
                let apontamento = await axios.put("https://apiminhamente.onrender.com/apontamento", formData, {headers: {'authorization': `Bearer ${LoginStore().token}`}})
                
                this.loading = false
                this.botaoDesativado = false
                this.$router.push({name: "home"})
            } catch (erro) {
                console.log(erro);
                this.loading = false
                this.botaoDesativado = false
                
                this.erro = erro.response.data.erro
                document.getElementById("erro").style.display = "flex"
            }
        },
        async pegarAssuntos() {
            let config = {
                method: 'get',
                url: 'https://apiminhamente.onrender.com/assuntos'
            };

            try {
                let { data } = await axios(config)

                data.assuntos.forEach( assunto => {
                    this.assuntosLista.push({value: assunto._id, label: assunto.nome})
                })
            } catch (erro) {
                console.log(erro);
            }
        },
        cancelar() {
            let confirmar = confirm("Deseja realmente saír?")

            if(confirmar) {
                this.$router.push({name: "PainelApontamentos"})
            }
        }
    }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
#erro {
    display: none;
    color: red;
    margin-bottom: 5px;
}

section {
    width: 85%;
    width: 100%;
    margin-left: 60px;
    padding-bottom: 80px;
}

.editar-area {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
}

.editar-area label[for="titulo"], .editar-area label[for="miniatura"], .editar-area label[for="apontamento-conteudo"] {
    color: black;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 15px;
}

.editar-area input {
    width: 100%;
    height: 40px;
    color: black;
    font-size: 2rem;
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

.botoes-left {
    width: 80%;
    display: flex;
    margin-right: 10px;
    flex-direction: column;
}

.botoes-left-top {
    margin-bottom: 10px;
}

.multi-select-area {
    width: 100%;
    display: flex;
}

.multi-select-area .multiselect:last-child {
    margin-left: 10px;
}

.botoes-left-bottom {
    display: flex;
}

.botoes-left-bottom div:first-child {
    margin-right: 10px;
}

.botoes-right {
    display: flex;
    height: fit-content;
}

.botoes-right button:first-child {
    margin-right: 10px;
}

@media (max-width: 1235px) {
section {
    margin: 0px;
}

.botoes-area {
    flex-wrap: wrap;
}

.botoes-left {
    width: 100%;
    /* margin: 0px; */
}

.botoes-left-bottom {
    flex-wrap: wrap;
}

.botoes-left-bottom div:first-child {
    margin-bottom: 10px;
}

.botoes-right {
    width: 100%;
    display: flex;
	margin-top: 15px;
    justify-content: flex-end;
}
}
</style>