<template>
    <div id="PainelApontamentos">
        <div class="table w-full p-2">
            <table class="w-full border">
                <thead>
                    <tr class="bg-gray-50 border-b">
                        <th class="w-96 p-2 text-base font-bold text-gray-500">Apontamento</th>
                        <th class="w-32 p-2 text-base font-bold text-gray-500">Visibilidade</th>
                        <th class="w-32 p-2 text-base font-bold text-gray-500">Assunto</th>
                        <th class="w-32 p-2 text-base font-bold text-gray-500">Data de criação</th>
                        <th class="w-32 p-2 text-base font-bold text-gray-500">Data de Edição</th>
                        <th class="w-32 p-2 text-base font-bold text-gray-500">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-gray-50 text-center">
                        <td class="p-2">
                            <input type="search" name="titulo" class="input-pesquisar" placeholder="Título do apontamento" autocomplete="off" @keyup.enter="pesquisarApontamento">
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <Multiselect
                                    v-model="visibilidade"
                                    :close-on-select="true"
                                    :searchable="true"
                                    :options="[{value: true, label: 'Público'}, {value: false, label: 'Privado'}]"
                                    placeholder="Selecionar visibilidade"
                                    noOptionsText="Sem opções de visibilidade"
                                    noResultsText="Sem resultados"
                                />
                            </div>
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <Multiselect
                                    v-model="AssuntoSelecionado"
                                    :close-on-select="true"
                                    :searchable="true"
                                    :options="assuntosLista"
                                    placeholder="Selecionar assunto"
                                    noOptionsText="Sem assuntos"
                                    noResultsText="Sem resultados"
                                />
                            </div>
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <AppDataCriacao @ordenar="ordenar"/>
                            </div>
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <AppDropdownEdit @maisRecente="EditMaisRecente" @maisAntigo="EditMaisAntiga"/>
                            </div>
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <router-link :to="{name: 'ApontamentoPublicar'}">
                                    <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">Novo apontamento</button>
                                </router-link>
                            </div>
                        </td>
                    </tr>
                    <tr class="max-h-20 h-20 bg-gray-100 hover:bg-gray-200" v-if="apontamentosTotal == 0 && !loading">
                        <td colspan="6">
                            <div class="flex justify-center items-center">
                                <span class="text-black text-base texto-limite">Nenhum apontamento encontrado</span>
                            </div>
                        </td>
                    </tr>
                    <tr class="max-h-20 h-20 bg-gray-100 hover:bg-gray-200" v-if="loading">
                        <td colspan="6">
                            <div class="spin-area">
                                <div role="status">
                                    <svg aria-hidden="true" class="inline w-7 h-7 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span class="sr-only">Carregando...</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="max-h-20 h-20 bg-gray-100 hover:bg-gray-300 text-justify border-b text-base font-medium" v-else v-for="apontamento in apontamentosMostrar" :key="apontamento.id">
                        <td class="w-96 p-2">
                            <PainelApontamento :apontamento="apontamento"/>
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <span class="text-black text-base texto-limite">{{ apontamento.visibilidade }}</span>
                            </div>
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <span class="text-black text-base texto-limite">-</span>
                            </div>
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <span class="text-black text-base texto-limite">{{ formatarData(apontamento.created_at) }}</span>
                            </div>
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <span class="text-black text-base texto-limite" v-if="apontamento.edited_at != undefined">{{ formatarData(apontamento.edited_at) }}</span>
                                <span class="text-black text-base texto-limite" v-else>-</span>
                            </div>
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900" @click="editar(apontamento)">Editar</button>
    
                                <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" @click="deletar(apontamento)">Deletar</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="paginas-area" v-if="apontamentosTotal > 0">
            <vue-awesome-paginate
            :total-items="apontamentosTotal"
            v-model="currentPage"
            :items-per-page="ItensPorPagina"
            :max-pages-shown="5"
            :on-click="paginar"
            :hide-prev-next="true"
            />
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Multiselect from '@vueform/multiselect'
import { LoginStore } from "@/stores/LoginStore.js";
import PainelApontamento from "@/components/PainelApontamento.vue";
import AppDataCriacao from "@/components/shared/AppDataCriacao.vue";
import AppDropdownEdit from "@/components/shared/AppDropdownEdit.vue";
export default {
    components: {
        Multiselect,
        AppDataCriacao,
        AppDropdownEdit,
        PainelApontamento,
    },
    data() {
        return {
            apontamentos: [],
            loading: false,
            currentPage: 1,
            PaginaAtual: 1,
            ItensPorPagina: 20,
            visibilidade: Boolean,
            assuntosLista: [],
            AssuntoSelecionado: "",
            criacaoCrescente: true,
        }
    },
    mounted(){
        this.pegarApontamentos()
        this.pegarAssuntos()
    },
    computed: {
        apontamentosTotal() {
            return this.apontamentos.length
        },
        apontamentosMostrar() {
            let inicio = (this.PaginaAtual - 1) * this.ItensPorPagina
            let fim = inicio + this.ItensPorPagina
            return this.apontamentos.slice(inicio, fim)
        },
    },
    watch: {
        visibilidade(novo, antigo){
            if(novo == undefined) {
                this.pegarApontamentos()
            }

            this.loading = true
            
            this.apontamentos = this.apontamentos.filter( apontamento => apontamento.visibilidade == novo)
            this.loading = false
        },
        async AssuntoSelecionado(novo, antigo) {
            if(novo == undefined) {
                this.pegarApontamentos()
            }

            this.loading = true

            let config = {
                method: 'get',
                url: 'https://apiminhamente.onrender.com/assunto/'+novo
            };

            try {
                let assunto = await axios(config)
                this.apontamentos = assunto.data.assunto.apontamentos
                this.loading = false
            } catch (erro) {
                console.log(erro);
                this.loading = false
            }
        },
    },
    methods: {
        paginar(pagina) {
            this.paginaAtual = pagina
        },
        formatarData(data) {
            let opcoes = { month: 'long' };
            let mesFormatado = new Intl.DateTimeFormat('pt-BR', opcoes).format(new Date(data));
            let dataFormatada = `${new Date(data).getDate()} de ${mesFormatado} de ${new Date(data).getFullYear()}, às ${new Date(data).getHours()}:${new Date(data).getMinutes()}`
            
            return dataFormatada
        },
        async ordenar() {
            if(!this.criacaoCrescente) {
                const arrayOrdenado = [];

                while (this.apontamentos.length > 0) { // Enquanto o array ter pelo menos um item
                    let MaisNovoIndex = 0; // Index do item mais recente encontrado

                    for (let i = 1; i < this.apontamentos.length; i++) { // Verificar cada item do array
                        // Procurando o index do item mais recente
                        if (this.apontamentos[i].titulo < this.apontamentos[MaisNovoIndex].titulo) {
                            MaisNovoIndex = i;
                        }
                    }

                    arrayOrdenado.push(this.apontamentos[MaisNovoIndex]); // Adicionar o item encontrado ao novo array
                    this.apontamentos.splice(MaisNovoIndex, 1); // Deletar o item encontrado do array antigo
                }
    
                this.apontamentos = arrayOrdenado;
                this.criacaoCrescente = true // definindo que tá em ordem crescente
            } else {
                const arrayOrdenado = [];

                while (this.apontamentos.length > 0) { // Enquanto o array ter pelo menos um item
                    let MaisAntigoIndex = 0; // Index do item mais antigo encontrado

                    for (let i = 1; i < this.apontamentos.length; i++) { // Verificar cada item do array
                        // Procurando o index do item mais antigo
                        if (this.apontamentos[i].titulo > this.apontamentos[MaisAntigoIndex].titulo) {
                            MaisAntigoIndex = i;
                        }
                    }

                    arrayOrdenado.push(this.apontamentos[MaisAntigoIndex]); // Adicionar o item encontrado ao novo array
                    this.apontamentos.splice(MaisAntigoIndex, 1); // Deletar o item encontrado do array antigo
                }
    
                this.apontamentos = arrayOrdenado;
                this.criacaoCrescente = false // definindo que tá em ordem decrescente
            }
        },
        async EditMaisRecente(){
            const arrayOrdenado = [];

            while (this.apontamentos.length > 0) { // Enquanto o array ter pelo menos um item
                let MaisNovoIndex = 0; // Index do item mais recente encontrado

                for (let i = 1; i < this.apontamentos.length; i++) { // Verificar cada item do array
                    // Procurando o index do item mais recente
                    if (this.apontamentos[i].edited_at > this.apontamentos[MaisNovoIndex].edited_at) {
                        MaisNovoIndex = i;
                    }
                }
                
                arrayOrdenado.push(this.apontamentos[MaisNovoIndex]); // Adicionar o item encontrado ao novo array
                this.apontamentos.splice(MaisNovoIndex, 1); // Deletar o item encontrado do array antigo
            }

            this.apontamentos = arrayOrdenado;
        },
        async EditMaisAntiga(){
            const arrayOrdenado = [];

            while (this.apontamentos.length > 0) { // Enquanto o array ter pelo menos um item
                let MaisAntigoIndex = 0; // Index do item mais antigo encontrado

                for (let i = 1; i < this.apontamentos.length; i++) {
                    // Procurando o index do item mais antigo
                    if (this.apontamentos[i].edited_at < this.apontamentos[MaisAntigoIndex].edited_at) {
                        MaisAntigoIndex = i;
                    }
                }

                arrayOrdenado.push(this.apontamentos[MaisAntigoIndex]); // Adicionar o item encontrado ao novo array
                this.apontamentos.splice(MaisAntigoIndex, 1); // Deletar o item encontrado do array antigo
            }

            this.apontamentos = arrayOrdenado;
        },
        async pegarApontamentos() {
            this.loading = true

            let config = {
                method: 'get',
                url: 'https://apiminhamente.onrender.com/apontamentos'
            };

            try {
                let apontamentos = await axios(config)
                this.apontamentos = apontamentos.data.apontamentos
                this.loading = false
            } catch (erro) {
                this.loading = false
                console.log(erro);
            }
        },
        async pesquisarApontamento(titulo){
            this.loading = true
            if (titulo.target.value.trim().length == 0 || titulo.target.value == undefined) {
                this.loading = false
                this.pegarApontamentos()
                return
            }

            let config = {
                method: 'get',
                url: 'https://apiminhamente.onrender.com/results',
                params: {
                    pesquisa: titulo
                }
            };

            try {
                let apontamentos = await axios(config)

                if(apontamentos.data.apontamentos == undefined) {
                    this.apontamentos = []
                    this.loading = false
                    return
                }
                
                this.apontamentos = []
                this.apontamentos = apontamentos.data.apontamentos
                this.loading = false
            } catch (erro) {
                this.loading = false
                console.log(erro);
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
        async editar(apontamento) {
            this.$router.push({name: "ApontamentoEditar", params: {id: apontamento.id}})
        },
        async deletar(apontamento) {
            let deletar = confirm("Você tem certeza que deseja deletar esse apontamento?")

            if(deletar) {
                let config = {
                    method: 'delete',
                    url: 'https://apiminhamente.onrender.com/apontamento/'+apontamento.id,
                    headers: {
                        'authorization': `Bearer ${LoginStore().token}`
                    }
                };
    
                try {
                    await axios(config)
                    this.apontamentos.splice(apontamento.id, 1)
                } catch (erro) {   
                    console.log(erro);
                }
            }
        },
    }
}
</script>
<style scoped>
.texto-limite {
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.input-pesquisar {
    width: 100%;
    outline: none;
    font-size: 1.2rem;
    border-bottom: 1px solid black;
}

.input-pesquisar::-webkit-search-cancel-button {
    display: none;
}

.spin-area {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.paginas-area {
    padding: 5px;
    display: flex;
    margin-top: 10px;
    justify-content: center;
}

.pagination-container {
    column-gap: 10px;
    align-items: center;
}

::v-deep .paginate-buttons {
    width: 35px;
    height: 35px;
    border: none;
    cursor: pointer;
    color: white;
    font-size: 1.6rem;
    border-radius: 5px;
    background-color: var(--azul);
}

::v-deep .paginate-buttons:hover {
    background-color: var(--azul-escuro);
}
::v-deep .active-page {
    background-color: var(--verde);
}


::v-deep .active-page:hover {
    background-color: var(--verde-escuro);
}
</style>