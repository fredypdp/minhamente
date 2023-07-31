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
                        <DropdownVisibilidade @publico="visibilidadePublico" @privado="visibilidadePrivado"/>
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

<script setup>
import axios from "axios";
import { Login } from "@/stores/Login.js";
import TinyMCE from '@tinymce/tinymce-vue';
import Multiselect from '@vueform/multiselect';
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted , onBeforeMount, watch} from "vue";
import BotaoEditar from "@/components/shared/BotaoEditar.vue";
import BotaoCancelar from "@/components/shared/BotaoCancelar.vue";
import BotaoMiniatura from "@/components/shared/BotaoMiniatura.vue";
import DropdownVisibilidade from "@/components/shared/DropdownVisibilidade.vue";

const route = useRoute()
const router = useRouter()
const storeLogin = Login()
const loading = ref(false)
const erro = ref("")
const botaoDesativado = ref(false)
const titulo = ref("")
const conteudo = ref("")
const miniatura = ref(undefined)
const visibilidade = ref(undefined)
const TemasSelecionados = ref([])
const AssuntosSelecionados = ref([])
const temasLista = ref([])
const assuntosLista = ref([])

onBeforeMount(async () => {

    let config = {
        method: 'get',
        url: 'https://apiminhamente.onrender.com/apontamento/'+route.params.id
    };

    try {
        let { data } = await axios(config)
        
        titulo.value = data.apontamento.titulo
        conteudo.value = data.apontamento.conteudo
        miniatura.value = data.apontamento.miniatura
        visibilidade.value = data.apontamento.visibilidade
    } catch (error) {
        console.log(error);
        route.go(-1)
    }
})

onMounted(() => {
    pegarAssuntos()
})

watch(AssuntosSelecionados, (novos, antigos) => {
    temasLista.value = []
    TemasSelecionados.value = []

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
            // temasLista.value = []
            data.assunto.temas.forEach( tema => temasLista.value.push({value: tema._id, label: tema.titulo}))
        } catch (error) {
            console.log(error);
        }
    })
})

function visibilidadePublico() {
    visibilidade.value = true
}

function visibilidadePrivado() {
    visibilidade.value = false
}

async function editar() {
    loading.value = true
    botaoDesativado.value = true
    document.getElementById("erro").style.display = "none"

    const formData = new FormData();
    let tituloValue = titulo.value
    let conteudoValue = conteudo.value
    let assuntos = AssuntosSelecionados.value
    let temas = TemasSelecionados.value
    let visibilidadeValue = visibilidade.value
    let miniaturaValue = miniatura.value
    
    formData.append('id', route.params.id);

    if(tituloValue != undefined && tituloValue.trim().length > 0) {
        formData.append('titulo', tituloValue);
    }

    if(conteudoValue != undefined && conteudoValue.trim().length > 0) {
        formData.append('conteudo', conteudoValue);
    }
    
    if(assuntos != undefined && assuntos.length != 0) {
        formData.append("assuntos", JSON.stringify(assuntos))
    }

    if(temas != undefined && temas.length != 0) {
        formData.append("temas", JSON.stringify(temas));
    }

    if(visibilidadeValue != undefined) {
        formData.append('visibilidade', visibilidadeValue);
    }
    
    if(miniaturaValue != undefined) {
        formData.append('miniatura', miniaturaValue);
    }
    
    try {
        let apontamento = await axios.put("https://apiminhamente.onrender.com/apontamento", formData, {headers: {'authorization': `Bearer ${storeLogin.token}`}})
        
        loading.value = false
        botaoDesativado.value = false
        router.push({name: "home"})
    } catch (error) {
        console.log(error);
        loading.value = false
        botaoDesativado.value = false
        
        erro.value = error.response.data.erro
        document.getElementById("erro").style.display = "flex"
    }
}

async function pegarAssuntos() {
    let config = {
        method: 'get',
        url: 'https://apiminhamente.onrender.com/assuntos'
    };

    try {
        let { data } = await axios(config)

        data.assuntos.forEach( assunto => {
            assuntosLista.value.push({value: assunto._id, label: assunto.nome})
        })
    } catch (error) {
        console.log(error);
    }
}

function cancelar() {
    if (titulo.value.length > 0 || conteudo.value.length > 0 || miniatura.value != undefined || visibilidade.value != undefined || TemasSelecionados.value.length > 0 || AssuntosSelecionados.value.length > 0) {
        let confirmar = confirm("Deseja realmente saír?")
    
        if(confirmar) {
            router.push({name: "home"})
        }
    }

    router.push({name: "home"})
}
</script>
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
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 15px;
}

.editar-area input {
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