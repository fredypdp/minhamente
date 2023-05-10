<template>
    <div class="table w-full p-2">
        <table class="w-full border">
            <thead>
                <tr class="bg-gray-50 border-b">
                    <th class="w-32 p-2 text-base font-bold text-gray-500">Avatar</th>
                    <th class="w-32 p-2 text-base font-bold text-gray-500">Nome</th>
                    <th class="w-32 p-2 text-base font-bold text-gray-500">Sobrenome</th>
                    <th class="w-32 p-2 text-base font-bold text-gray-500">Email</th>
                    <th class="w-32 p-2 text-base font-bold text-gray-500">Função</th>
                    <th class="w-32 p-2 text-base font-bold text-gray-500">Data de criação</th>
                    <th class="w-32 p-2 text-base font-bold text-gray-500">Data de edição</th>
                    <th class="w-32 p-2 text-base font-bold text-gray-500">Ações</th>
                </tr>
            </thead>
            <tbody class="text-center">
                <tr class="bg-gray-50 text-center">
                    <td class="p-2" colspan="2">
                        <input type="search" name="nome" class="input-pesquisar" autocomplete="off" placeholder="Nome do usuário" @keyup.enter="usuarioPeloNome">
                    </td>
                    <td class="p-2">
                        <input type="search" name="sobrenome" class="input-pesquisar" autocomplete="off" placeholder="Sobrenome do usuário" @keyup.enter="usuarioPeloSobrenome">
                    </td>
                    <td class="p-2">
                        <input type="search" name="email" class="input-pesquisar" autocomplete="off" placeholder="Email do usuário" @keyup.enter="usuarioPeloEmail">
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <Multiselect
                                v-model="funcao"
                                :close-on-select="false"
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
                            <AppDropdownPubli @maisRecente="PubliMaisRecente" @maisAntigo="PubliMaisAntiga"/>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <AppDropdownEdit @maisRecente="EditMaisRecente" @maisAntigo="EditMaisAntiga"/>
                        </div>
                    </td>
                    <td class="p-2 font-bold text-lg text-black">-</td>
                </tr>
                <tr class="max-h-20 h-20 bg-gray-100 hover:bg-gray-200" v-if="loading">
                    <td colspan="8">
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
                <tr class="max-h-20 h-20 bg-gray-100 hover:bg-gray-200 text-justify border-b text-base font-medium" v-else v-for="usuario in usuarios" :key="usuario.id">
                    <td class="p-2">
                        <div class="avatar-area">
                            <img :src="usuario.avatar" class="avatar" alt="Avatar" draggable="false">
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <span class="text-black text-base texto-limite">{{ usuario.nome }}</span>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <span class="text-black text-base texto-limite">{{ usuario.sobrenome }}</span>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <span class="text-black text-base texto-limite">{{ usuario.email }}</span>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <span class="text-black text-base texto-limite">{{ usuario.role }}</span>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <span class="text-black text-base texto-limite">{{ formatarData(usuario.created_at) }}</span>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <span class="text-black text-base texto-limite" v-if="usuario.edited_at != undefined">{{ formatarData(usuario.edited_at) }}</span>
                            <span class="text-black text-base texto-limite" v-else>-</span>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Editar</button>

                            <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Deletar</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from "axios";
import Multiselect from '@vueform/multiselect'
import AppDropdownEdit from "@/components/shared/AppDropdownEdit.vue";
import AppDropdownPubli from "@/components/shared/AppDropdownPubli.vue";
import { LoginStore } from "@/stores/LoginStore.js";
export default {
    components: {
        Multiselect,
        AppDropdownEdit,
        AppDropdownPubli,
    },
    data() {
        return {
            funcao: "",
            usuarios: [],
            loading: false,
        }
    },
    mounted(){
        this.pegarUsuarios()
    },
    methods: {
        formatarData(data) {
            let opcoes = { month: 'long' };
            let mesFormatado = new Intl.DateTimeFormat('pt-BR', opcoes).format(new Date(data));
            let dataFormatada = `${new Date(data).getDate()} de ${mesFormatado} de ${new Date(data).getFullYear()}, às ${new Date(data).getHours()}:${new Date(data).getMinutes()}`
            
            return dataFormatada
        },
        PubliMaisRecente() {
            this.usuarios.sort((primeiro, ultimo) => {
                let a = new Date(primeiro.created_at)
                let b = new Date(ultimo.created_at)
                
                if(a < b){
                    return -1
                }
            });
        },
        PubliMaisAntiga() {
            this.usuarios.sort((primeiro, ultimo) => {
                let a = new Date(primeiro.created_at)
                let b = new Date(ultimo.created_at)
                
                if(a > b){
                    return -1
                }
            });
        },
        EditMaisRecente(){
            this.usuarios.sort((primeiro, ultimo) => {
                let a = new Date(primeiro.edited_at)
                let b = new Date(ultimo.edited_at)
                
                if(a < b){
                    return -1
                }
            });
        },
        EditMaisAntiga(){
            this.usuarios.sort((primeiro, ultimo) => {
                let a = new Date(primeiro.edited_at)
                let b = new Date(ultimo.edited_at)
                
                if(a > b){
                    return -1
                }
            });
        },
        async pegarUsuarios() {
            this.loading = true

            let config = {
                method: 'get',
                url: 'https://apiminhamente.onrender.com/usuarios',
                headers: {
                    'authorization': `Bearer ${LoginStore().token}`
                }
            };

            try {
                let usuarios = await axios(config)
                this.usuarios = usuarios.data.usuarios
                this.loading = false
            } catch (erro) {
                this.loading = false
                console.log(erro);
            }
        },
        async usuarioPeloNome(nome) {
            this.loading = true
            if (nome.target.value.trim().length == 0 || nome.target.value == undefined) {
                this.loading = false
                this.pegarUsuarios()
                return
            }

            let config = {
                method: 'get',
                url: 'https://apiminhamente.onrender.com/usuario/nome/'+nome.target.value,
                headers: {
                    'authorization': `Bearer ${LoginStore().token}`
                }
            };

            try {
                let usuarios = await axios(config)
                this.usuarios = usuarios.data.usuarios
                this.loading = false
            } catch (erro) {
                this.loading = false
                console.log(erro);
            }
        },
        async usuarioPeloSobreNome(sobrenome) {
            this.loading = true
            if (sobrenome.target.value.trim().length == 0 || sobrenome.target.value == undefined) {
                this.loading = false
                this.pegarUsuarios()
                return
            }

            let config = {
                method: 'get',
                url: 'https://apiminhamente.onrender.com/usuario/sobrenome/'+sobrenome.target.value,
                headers: {
                    'authorization': `Bearer ${LoginStore().token}`
                }
            };

            try {
                let usuarios = await axios(config)
                this.usuarios = usuarios.data.usuarios
                this.loading = false
            } catch (erro) {
                this.loading = false
                console.log(erro);
            }
        },
        async usuarioPeloEmail(email) {
            this.loading = true
            if (email.target.value.trim().length == 0 || email.target.value == undefined) {
                this.loading = false
                this.pegarUsuarios()
                return
            }

            let config = {
                method: 'get',
                url: 'https://apiminhamente.onrender.com/usuario/email/'+email.target.value,
                headers: {
                    'authorization': `Bearer ${LoginStore().token}`
                }
            };

            try {
                let usuarios = await axios(config)
                this.usuarios = []
                this.usuarios.push(usuarios.data.usuario)
                this.loading = false
            } catch (erro) {
                this.loading = false
                console.log(erro);
            }
        },
    }
}
</script>
<style scoped>
.input-pesquisar {
    width: 100%;
    outline: none;
    font-size: 1.2rem;
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
</style>