<template>
    <div id="PainelAssuntos">
        <div class="table w-full p-2">
            <table class="w-full border">
                <thead>
                    <tr class="bg-gray-50 border-b">
                        <th class="w-96 p-2 text-lg font-bold text-gray-500">Ícone</th>
                        <th class="w-32 p-2 text-lg font-bold text-gray-500">Nome</th>
                        <th class="w-32 p-2 text-lg font-bold text-gray-500">Slug</th>
                        <th class="w-32 p-2 text-lg font-bold text-gray-500">Data de criação</th>
                        <th class="w-32 p-2 text-lg font-bold text-gray-500">Data de Edição</th>
                        <th class="w-32 p-2 text-lg font-bold text-gray-500">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-gray-50 text-center">
                        <td class="p-2">
                            <input type="search" name="nome" class="input-pesquisar" placeholder="Nome do assunto" autocomplete="off" @keyup.enter="assuntoPeloNome" ref="nome">
                        </td>
                        <td class="p-2 font-bold text-lg text-black">-</td>
                        <td class="p-2 font-bold text-lg text-black">-</td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <DataCriacao @ordenar="ordenar"/>
                            </div>
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <DropdownEdit @maisRecente="EditMaisRecente" @maisAntigo="EditMaisAntiga"/>
                            </div>
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <router-link :to="{name: 'AssuntoCriar'}">
                                <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-2 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">Novo assunto</button>
                                </router-link>
                            </div>
                        </td>
                    </tr>
                    <tr class="max-h-20 h-20 bg-gray-100 hover:bg-gray-200" v-if="assuntosTotal == 0 && !loading">
                        <td colspan="6">
                            <div class="flex justify-center items-center">
                                <span class="text-black texto-limite">Nenhum assunto encontrado</span>
                            </div>
                        </td>
                    </tr>
                    <tr class="max-h-20 h-20 bg-gray-100 hover:bg-gray-200" v-if="loading">
                        <td colspan="6">
                            <div class="spin-area">
                                <div role="status">
                                    <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span class="sr-only">Carregando...</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="max-h-20 h-20 bg-gray-100 hover:bg-gray-300 text-justify border-b font-medium" v-else v-for="assunto in assuntosMostrar" :key="assunto._id">
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <div class="icone-area">
                                    <img :src="assunto.icone" draggable="false" alt="Ícone do assunto" class="icone">
                                </div>
                            </div>
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <span class="text-black texto-limite">{{ assunto.nome }}</span>
                            </div>
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <span class="text-black texto-limite">{{ assunto.slug }}</span>
                            </div>
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <span class="text-black texto-limite">{{ formatarData(assunto.created_at) }}</span>
                            </div>
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <span class="text-black texto-limite" v-if="assunto.edited_at != undefined">{{ formatarData(assunto.edited_at) }}</span>
                                <span class="text-black texto-limite" v-else>-</span>
                            </div>
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-xl px-2 py-2 mr-2 mb-2 dark:focus:ring-yellow-900" @click="editar(assunto)">Editar</button>
    
                                <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xl px-2 py-2 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" @click="deletar(assunto)">Deletar</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="paginas-area" v-if="assuntosTotal > 0">
            <vue-awesome-paginate
            :total-items="assuntosTotal"
            v-model="currentPage"
            :items-per-page="ItensPorPagina"
            :max-pages-shown="5"
            :on-click="paginar"
            :hide-prev-next="true"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Login } from "@/stores/Login";
import type { Assunto } from "@/types/types";
import DataCriacao from "@/components/shared/DataCriacao.vue";
import DropdownEdit from "@/components/shared/DataEdicao.vue";

const storeLogin = Login()
const router = useRouter()

const nome = ref()
const assuntos = ref<Assunto[]>([])
const loading = ref<boolean>(false)
const currentPage = ref<number>(1)
const PaginaAtual = ref<number>(1)
const ItensPorPagina = ref<number>(20)
const criacaoCrescente = ref<boolean>(false)
const assuntosTotal = computed(() => assuntos.value.length)
const assuntosMostrar = computed(() => {
    let inicio = (PaginaAtual.value - 1) * ItensPorPagina.value
    let fim = inicio + ItensPorPagina.value
    return assuntos.value.slice(inicio, fim)
})
            
onMounted(() => {
    pegarAssuntos()
})

function paginar(pagina: number): void {
    PaginaAtual.value = pagina
}

function formatarData(data:string):string {
    let mesFormatado = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date(data));
    let dataFormatada = `${new Date(data).getDate()} de ${mesFormatado} de ${new Date(data).getFullYear()}, às ${formatarNumero(new Date(data).getHours())}:${formatarNumero(new Date(data).getMinutes())}`
    
    return dataFormatada
}

function formatarNumero(numero: number): string | number {
    if (numero < 10) {
        return "0"+numero
    }

    return numero
}

async function ordenar(): Promise<void> {
    if(!criacaoCrescente.value) {
        const arrayOrdenado = [];

        while (assuntos.value.length > 0) { // Enquanto o array ter pelo menos um item
            let MaisNovoIndex = 0; // Index do item mais recente encontrado

            for (let i = 1; i < assuntos.value.length; i++) { // Verificar cada item do array
                // Procurando o index do item mais recente
                if (assuntos.value[i].created_at < assuntos.value[MaisNovoIndex].created_at) {
                    MaisNovoIndex = i;
                }
            }

            arrayOrdenado.push(assuntos.value[MaisNovoIndex]); // Adicionar o item encontrado ao novo array
            assuntos.value.splice(MaisNovoIndex, 1); // Deletar o item encontrado do array antigo
        }

        assuntos.value = arrayOrdenado;
        criacaoCrescente.value = true // definindo que tá em ordem crescente
    } else {
        const arrayOrdenado = [];

        while (assuntos.value.length > 0) { // Enquanto o array ter pelo menos um item
            let MaisAntigoIndex = 0; // Index do item mais antigo encontrado

            for (let i = 1; i < assuntos.value.length; i++) { // Verificar cada item do array
                // Procurando o index do item mais antigo
                if (assuntos.value[i].created_at > assuntos.value[MaisAntigoIndex].created_at) {
                    MaisAntigoIndex = i;
                }
            }

            arrayOrdenado.push(assuntos.value[MaisAntigoIndex]); // Adicionar o item encontrado ao novo array
            assuntos.value.splice(MaisAntigoIndex, 1); // Deletar o item encontrado do array antigo
        }

        assuntos.value = arrayOrdenado;
        criacaoCrescente.value = false // definindo que tá em ordem decrescente
    }
}

async function EditMaisRecente(): Promise<void> {
    const arrayOrdenado = [];

    while (assuntos.value.length > 0) { // Enquanto o array ter pelo menos um item
        let MaisNovoIndex = 0; // Index do item mais recente encontrado

        for (let i = 1; i < assuntos.value.length; i++) { // Verificar cada item do array
            // Procurando o index do item mais recente
            if (assuntos.value[i].edited_at > assuntos.value[MaisNovoIndex].edited_at) {
                MaisNovoIndex = i;
            }
        }
        
        arrayOrdenado.push(assuntos.value[MaisNovoIndex]); // Adicionar o item encontrado ao novo array
        assuntos.value.splice(MaisNovoIndex, 1); // Deletar o item encontrado do array antigo
    }

    assuntos.value = arrayOrdenado;
}

async function EditMaisAntiga(): Promise<void> {
    const arrayOrdenado = [];

    while (assuntos.value.length > 0) { // Enquanto o array ter pelo menos um item
        let MaisAntigoIndex = 0; // Index do item mais antigo encontrado

        for (let i = 1; i < assuntos.value.length; i++) {
            // Procurando o index do item mais antigo
            if (assuntos.value[i].edited_at < assuntos.value[MaisAntigoIndex].edited_at) {
                MaisAntigoIndex = i;
            }
        }

        arrayOrdenado.push(assuntos.value[MaisAntigoIndex]); // Adicionar o item encontrado ao novo array
        assuntos.value.splice(MaisAntigoIndex, 1); // Deletar o item encontrado do array antigo
    }

    assuntos.value = arrayOrdenado;
}

async function pegarAssuntos(): Promise<void> {
    loading.value = true
    nome.value.value = ""

    let config = {
        method: 'get',
        url: 'https://apiminhamente.onrender.com/assuntos'
    };

    try {
        let { data } = await axios(config)
        
        assuntos.value = data.assuntos
        loading.value = false
    } catch (error) {
        console.log(error);
        loading.value = false
    }
}

async function assuntoPeloNome(): Promise<void> {
    loading.value = true
    if (nome.value.value.trim().length == 0 || nome.value.value == undefined) {
        loading.value = false
        pegarAssuntos()
        return
    }

    let config = {
        method: 'get',
        url: 'https://apiminhamente.onrender.com/assunto/nome/'+nome.value.value
    };

    try {
        let { data } = await axios(config)

        if(data.assunto == undefined) {
            assuntos.value = []
            loading.value = false
            return
        }
        
        assuntos.value = []
        assuntos.value.push(data.assunto)
        loading.value = false
    } catch (error) {
        console.log(error);
        loading.value = false
    }
}

async function editar(assunto: Assunto): Promise<void> {
    router.push({name: "AssuntoEditar", params: {id: assunto._id}})
}

async function deletar(assunto: Assunto): Promise<void> {
    let deletar = confirm("Você tem certeza que deseja deletar esse assunto?")

    if(deletar) {
        let config = {
            method: 'delete',
            url: 'https://apiminhamente.onrender.com/assunto/'+assunto._id,
            headers: {
                'authorization': `Bearer ${storeLogin.token}`
            }
        };

        try {
            await axios(config)
            assuntos.value.splice(assunto._id as any, 1)
        } catch (error) {   
            console.log(error);
        }
    }
}
</script>
<style scoped>
.input-pesquisar {
    width: 100%;
    outline: none;
    font-size: 18px;
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

.icone-area {
    max-width: 60px;
    max-height: 60px;
	overflow: hidden;
}
.icone {
    width: 100%;
    height: 100%;
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
    font-size: 16px;
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