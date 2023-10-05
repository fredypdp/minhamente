<template>
    <div id="PainelUsuarios">
        <div class="table w-full p-2">
            <table class="w-full border">
                <thead>
                    <tr class="bg-gray-50 border-b">
                        <th class="w-32 p-2 text-lg font-bold text-gray-500">Avatar</th>
                        <th class="w-32 p-2 text-lg font-bold text-gray-500">Nome</th>
                        <th class="w-32 p-2 text-lg font-bold text-gray-500">Sobrenome</th>
                        <th class="w-32 p-2 text-lg font-bold text-gray-500">Email</th>
                        <th class="w-32 p-2 text-lg font-bold text-gray-500">Função</th>
                        <th class="w-32 p-2 text-lg font-bold text-gray-500">Data de criação</th>
                        <th class="w-32 p-2 text-lg font-bold text-gray-500">Data de edição</th>
                        <th class="w-32 p-2 text-lg font-bold text-gray-500">Ações</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr class="bg-gray-50 text-center">
                        <td class="p-2" colspan="2">
                            <input type="search" name="nome" class="input-pesquisar" autocomplete="off" placeholder="Nome do usuário" @keyup.enter="usuarioPeloNome" ref="nome">
                        </td>
                        <td class="p-2">
                            <input type="search" name="sobrenome" class="input-pesquisar" autocomplete="off" placeholder="Sobrenome do usuário" @keyup.enter="usuarioPeloSobrenome" ref="sobrenome">
                        </td>
                        <td class="p-2">
                            <input type="search" name="email" class="input-pesquisar" autocomplete="off" placeholder="Email do usuário" @keyup.enter="usuarioPeloEmail" ref="email">
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <Multiselect
                                    v-model="funcao"
                                    :close-on-select="true"
                                    :searchable="true"
                                    :options="[{value: 1, label: 'Normal'}, {value: 0, label: 'Administrador'}]"
                                    placeholder="Selecionar função"
                                    noOptionsText="Sem opções de função"
                                    noResultsText="Sem resultados"
                                />
                            </div>
                        </td>
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
                        <td class="p-2 font-bold text-lg text-black">-</td>
                    </tr>
                    <tr class="max-h-20 h-20 bg-gray-100 hover:bg-gray-200" v-if="usuariosTotal == 0 && !loading">
                        <td colspan="8">
                            <div class="flex justify-center items-center">
                                <span class="text-black texto-limite">Nenhum usuário encontrado</span>
                            </div>
                        </td>
                    </tr>
                    <tr class="max-h-20 h-20 bg-gray-100 hover:bg-gray-200" v-if="loading">
                        <td colspan="8">
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
                    <tr class="max-h-20 h-20 bg-gray-100 hover:bg-gray-200 text-justify border-b font-medium" v-else v-for="usuario in usuariosMostrar" :key="usuario.id">
                        <td class="p-2">
                            <div class="avatar-area">
                                <img :src="usuario.avatar" class="avatar" alt="Avatar" draggable="false">
                            </div>
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <span class="text-black texto-limite">{{ usuario.nome }}</span>
                            </div>
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <span class="text-black texto-limite">{{ usuario.sobrenome }}</span>
                            </div>
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <span class="text-black texto-limite">{{ usuario.email }}</span>
                            </div>
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <span class="text-black texto-limite">{{ usuario.role }}</span>
                            </div>
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <span class="text-black texto-limite">{{ formatarData(usuario.created_at) }}</span>
                            </div>
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">
                                <span class="text-black texto-limite" v-if="usuario.edited_at != undefined">{{ formatarData(usuario.edited_at) }}</span>
                                <span class="text-black texto-limite" v-else>-</span>
                            </div>
                        </td>
                        <td class="p-2">
                            <div class="flex justify-center items-center">    
                                <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xl px-2 py-2 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" @click="deletarUsuario(usuario)">Deletar</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="paginas-area" v-if="usuariosTotal > 0">
            <vue-awesome-paginate
            :total-items="usuariosTotal"
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
import Multiselect from '@vueform/multiselect'
import { ref, watch, computed, onMounted } from "vue";
import { Login } from "@/stores/Login";
import DropdownEdit from "@/components/shared/DataEdicao.vue";
import DataCriacao from "@/components/shared/DataCriacao.vue";

const storeLogin = Login()
const email = ref()
const nome = ref()
const sobrenome = ref()
const funcao = ref(undefined)
const usuarios = ref([])
const loading = ref(false)
const currentPage = ref(1)
const PaginaAtual = ref(1)
const ItensPorPagina = ref(20)
const criacaoCrescente = ref(true)
const usuariosTotal = computed(() => {
    return usuarios.value.length
})

const usuariosMostrar = computed(() => {
    let inicio = (PaginaAtual.value - 1) * ItensPorPagina.value
    let fim = inicio + ItensPorPagina.value
    return usuarios.value.slice(inicio, fim)
})

watch(funcao, (novoRole, antigoRole) => {
    if (novoRole == null || undefined) {
        pegarUsuarios()
        return
    }
    
    if (novoRole != null || undefined) {
        usuarioPeloRole(novoRole)
        return
    }
})
        
onMounted(() => {
    pegarUsuarios()
})

function paginar(pagina) {
    paginaAtual.value = pagina
}

function formatarData(data) {
    let opcoes = { month: 'long' };
    let mesFormatado = new Intl.DateTimeFormat('pt-BR', opcoes).format(new Date(data));
    let dataFormatada = `${new Date(data).getDate()} de ${mesFormatado} de ${new Date(data).getFullYear()}, às ${formatarNumero(new Date(data).getHours())}:${formatarNumero(new Date(data).getMinutes())}`
    
    return dataFormatada
}

function formatarNumero(numero) {
    if (numero < 10) {
        return "0"+numero
    }

    return numero
}

async function ordenar() {
    if(!criacaoCrescente.value) {
        const arrayOrdenado = [];

        while (usuarios.value.length > 0) { // Enquanto o array ter pelo menos um item
            let MaisNovoIndex = 0; // Index do item mais recente encontrado

            for (let i = 1; i < usuarios.value.length; i++) { // Verificar cada item do array
                // Procurando o index do item mais recente
                if (usuarios.value[i].created_at > usuarios.value[MaisNovoIndex].created_at) {
                    MaisNovoIndex = i;
                }
            }

            arrayOrdenado.push(usuarios.value[MaisNovoIndex]); // Adicionar o item encontrado ao novo array
            usuarios.value.splice(MaisNovoIndex, 1); // Deletar o item encontrado do array antigo
        }

        usuarios.value = arrayOrdenado;
        criacaoCrescente.value = true // definindo que tá em ordem crescente
    } else {
        const arrayOrdenado = [];

        while (usuarios.value.length > 0) { // Enquanto o array ter pelo menos um item
            let MaisAntigoIndex = 0; // Index do item mais antigo encontrado

            for (let i = 1; i < usuarios.value.length; i++) { // Verificar cada item do array
                // Procurando o index do item mais antigo
                if (usuarios.value[i].created_at < usuarios.value[MaisAntigoIndex].created_at) {
                    MaisAntigoIndex = i;
                }
            }

            arrayOrdenado.push(usuarios.value[MaisAntigoIndex]); // Adicionar o item encontrado ao novo array
            usuarios.value.splice(MaisAntigoIndex, 1); // Deletar o item encontrado do array antigo
        }

        usuarios.value = arrayOrdenado;
        criacaoCrescente.value = false // definindo que tá em ordem decrescente
    }
}

async function EditMaisRecente(){
    const arrayOrdenado = [];

    while (usuarios.value.length > 0) { // Enquanto o array ter pelo menos um item
        let MaisNovoIndex = 0; // Index do item mais recente encontrado

        for (let i = 1; i < usuarios.value.length; i++) { // Verificar cada item do array
            // Procurando o index do item mais recente
            if (usuarios.value[i].edited_at > usuarios.value[MaisNovoIndex].edited_at) {
                MaisNovoIndex = i;
            }
        }
        
        arrayOrdenado.push(usuarios.value[MaisNovoIndex]); // Adicionar o item encontrado ao novo array
        usuarios.value.splice(MaisNovoIndex, 1); // Deletar o item encontrado do array antigo
    }

    usuarios.value = arrayOrdenado;
}

async function EditMaisAntiga(){
    const arrayOrdenado = [];

    while (usuarios.value.length > 0) { // Enquanto o array ter pelo menos um item
        let MaisAntigoIndex = 0; // Index do item mais antigo encontrado

        for (let i = 1; i < usuarios.value.length; i++) {
            // Procurando o index do item mais antigo
            if (usuarios.value[i].edited_at < usuarios.value[MaisAntigoIndex].edited_at) {
                MaisAntigoIndex = i;
            }
        }

        arrayOrdenado.push(usuarios.value[MaisAntigoIndex]); // Adicionar o item encontrado ao novo array
        usuarios.value.splice(MaisAntigoIndex, 1); // Deletar o item encontrado do array antigo
    }

    usuarios.value = arrayOrdenado;
}

async function pegarUsuarios() {
    loading.value = true
    nome.value.value = ""
    sobrenome.value.value = ""
    email.value.value = ""
    // this.funcao = ""
    
    let config = {
        method: 'get',
        url: 'https://apiminhamente.onrender.com/usuarios',
        headers: {
            'authorization': `Bearer ${storeLogin.token}`
        }
    };

    try {
        let { data } = await axios(config)
        usuarios.value = data.usuarios
        loading.value = false
    } catch (error) {
        console.log(error);
        loading.value = false
    }
}

async function usuarioPeloNome(event) {
    loading.value = true
    sobrenome.value.value = ""
    email.value.value = ""

    if (nome.value.value.trim().length == 0 || nome.value.value == undefined) {
        loading.value = false
        pegarUsuarios()
        return
    }

    let config = {
        method: 'get',
        url: 'https://apiminhamente.onrender.com/usuario/nome/'+nome.value.value,
        headers: {
            'authorization': `Bearer ${storeLogin.token}`
        }
    };

    try {
        let { data } = await axios(config)
        usuarios.value = data.usuarios
        loading.value = false
    } catch (error) {
        console.log(error);
        loading.value = false
    }
}

async function usuarioPeloSobrenome(event) {
    loading.value = true
    nome.value.value = ""
    email.value.value = ""

    if (sobrenome.value.value.trim().length == 0 || sobrenome.value.value == undefined) {
        loading.value = false
        pegarUsuarios()
        return
    }

    let config = {
        method: 'get',
        url: 'https://apiminhamente.onrender.com/usuario/sobrenome/'+sobrenome.value.value,
        headers: {
            'authorization': `Bearer ${storeLogin.token}`
        }
    };

    try {
        let { data } = await axios(config)
        usuarios.value = data.usuarios
        loading.value = false
    } catch (error) {
        console.log(error);
        loading.value = false
    }
}

async function usuarioPeloEmail(event) {
    loading.value = true
    nome.value.value = ""
    sobrenome.value.value = ""

    if (email.value.value.trim().length == 0 || email.value.value == undefined) {
        loading.value = false
        pegarUsuarios()
        return
    }

    let config = {
        method: 'get',
        url: 'https://apiminhamente.onrender.com/usuario/email/'+email.value.value,
        headers: {
            'authorization': `Bearer ${storeLogin.token}`
        }
    };

    try {
        let { data } = await axios(config)

        if(data.usuario == undefined) {
            usuarios.value = []
            loading.value = false
            return
        }

        usuarios.value = []
        usuarios.value.push(data.usuario)
        loading.value = false
    } catch (error) {
        console.log(error);
        loading.value = false
    }
}

async function usuarioPeloRole(role) {
    loading.value = true
    nome.value.value = ""
    sobrenome.value.value = ""
    email.value.value = ""

    let config = {
        method: 'get',
        url: 'https://apiminhamente.onrender.com/usuario/role/'+role,
        headers: {
            'authorization': `Bearer ${storeLogin.token}`
        }
    };
    
    try {
        let { data } = await axios(config)
        usuarios.value = []
        usuarios.value = data.usuarios
        loading.value = false
    } catch (error) {
        console.log(error);
        loading.value = false
    }
}

async function deletarUsuario(usuario) {
    let deletar = confirm("Você tem certeza que deseja deletar essa conta?")
    if(deletar) {
        let config = {
            method: 'delete',
            url: 'https://apiminhamente.onrender.com/usuario/'+usuario.id,
            headers: {
                'authorization': `Bearer ${storeLogin.token}`
            }
        };

        try {
            await axios(config)
            usuarios.value.splice(usuario.id, 1)
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

.avatar-area {
    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar {
    width: 50px;
    height: 50px;
    border-radius: 100%;
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