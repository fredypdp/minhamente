<template>
<div id="TemaEditarView">
    <AppNavBar/>
    <div class="editar-tema-area">
        <form class="editar-tema-form" @submit.prevent="editar">
            <label for="titulo" class="titulo-label">Editar título do tema:</label>
            <input type="text" name="titulo" class="titulo-input" id="titulo" placeholder="Título do tema" autocomplete="off" v-model.trim.lazy="titulo">
            <span class="assuntos-label">Assuntos:</span>
            <Multiselect
                v-model="AssuntoSelecionado"
                :close-on-select="true"
                :searchable="true"
                :options="assuntosLista"
                placeholder="Selecionar assunto"
                noOptionsText="Sem assuntos"
                noResultsText="Sem resultados"
            />
            <span id="erro">{{ erro }}</span>
            <button :disabled="botaoDesativado" type="submit" class="botao-editar">
                <div role="status" v-if="loading">
                    <svg aria-hidden="true" class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Carregando...</span>
                </div>
                <span v-else>Editar tema</span>
            </button>
        </form>
    </div>
</div>
</template>

<script>
import axios from "axios";
import Multiselect from '@vueform/multiselect'
import { LoginStore } from "@/stores/LoginStore.js";
import AppNavBar from "@/components/shared/AppNavBar.vue";
export default {
    components: {
        AppNavBar,
        Multiselect,
    },
    data(){
        return {
            erro: "",
            loading: false,
            botaoDesativado: false,
            titulo: "",
            AssuntoSelecionado: "",
            assuntosLista: [],
        }
    },
    beforeRouteEnter(to, from, next) {
        next(async vm => {

            let config = {
                method: 'get',
                url: 'https://apiminhamente.onrender.com/tema/'+to.params.id
            };

            try {
                let tema = await axios(config)

                if(tema == undefined) {
                    vm.$route.push({name: "PainelTemas"})
                    return
                }

                vm.titulo = tema.data.tema.titulo
            } catch (erro) {
                console.log(erro);
                vm.$router.go(-1)
            }
        })
    },
    mounted() {
        this.pegarAssuntos()
    },
    methods: {
        async editar(){
            this.loading = true

            let id = this.$route.params.id
            let titulo
            let AssuntoSelecionado
            
            if (this.titulo != undefined) {
                titulo = this.titulo
            }
            
            if (this.AssuntoSelecionado != undefined) {
                AssuntoSelecionado = this.AssuntoSelecionado
            }

            let config = {
                method: 'put',
                url: 'https://apiminhamente.onrender.com/tema',
                headers: {
                    'authorization': `Bearer ${LoginStore().token}`
                },
                data: {
                    id: id,
                    titulo: titulo,
                    AssuntoSelecionado: AssuntoSelecionado
                }
            };

            try {
                let tema = await axios(config)
                
                
                this.loading = false
                this.botaoDesativado = false
                this.$router.push({name: "PainelTemas"})
            } catch (erro) {
                console.log(erro);
                this.erro = erro.response.data.erro
                document.getElementById("erro").style.display = "flex"
                
                this.loading = false
                this.botaoDesativado = false
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
                this.$router.push({name: "PainelTemas"})
            }
        }
    }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
span {
    font-size: 1.6rem;
}

#erro {
    display: none;
    color: red;
    margin-bottom: 5px;
}

#TemaEditarView {
    height: 100vh;
}

.editar-tema-area {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0px 20px;
    align-items: center;
    justify-content: center;
}

.editar-tema-form {
    width: 500px;
    padding: 10px;
    display: flex;
    max-width: 500px;
    border-radius: 5px;
    flex-direction: column;
    align-items: flex-start;
    background-color: #e7e7e7;
}

.editar-tema-area label, .assuntos-label {
    color: black;
    font-size: 2.6rem;
    font-weight: 700;
    margin-bottom: 10px;
}

.editar-tema-area input {
    width: 100%;
    padding: 5px;
    color: black;
    font-size: 2rem;
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