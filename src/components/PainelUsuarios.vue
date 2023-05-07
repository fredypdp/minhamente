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
                            <AppDropdownPubli @maisRecente="PubliMaisRecente" @maisAntigo="PubliMaisAntiga"/>
                        </div>
                    </td>
                    <td class="p-2 font-bold text-lg text-black">-</td>
                </tr>
                <tr class="max-h-20 h-20 bg-gray-100 hover:bg-gray-200 text-justify border-b text-base font-medium" v-for="usuario in usuarioComputado" :key="usuario.id">
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
                            <span class="text-black text-base texto-limite">{{ usuario.created_at }}</span>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <span class="text-black text-base texto-limite">{{ usuario.edited_at }}</span>
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
        }
    },
    computed: {
        usuarioComputado() {
            let usuarios = this.usuarios.map(usuario => {
                const opcoes = { month: 'long' };
                const mesCriacao = new Intl.DateTimeFormat('pt-BR', opcoes).format(new Date(usuario.created_at));
                usuario.created_at = `${new Date(usuario.created_at).getDate()} de ${mesCriacao} de ${new Date(usuario.created_at).getFullYear()}, às ${new Date(usuario.created_at).getHours()}:${new Date(usuario.created_at).getMinutes()}`
                
                if(usuario.edited_at) {
                    const mesEdicao = new Intl.DateTimeFormat('pt-BR', opcoes).format(new Date(usuario.edited_at));
                    usuario.edited_at = `${new Date(usuario.edited_at).getDate()} de ${mesEdicao} de ${new Date(usuario.edited_at).getFullYear()}, às ${new Date(usuario.edited_at).getHours()}:${new Date(usuario.edited_at).getMinutes()}`
                }

                return usuario
            })

            return usuarios
        }
    },
    mounted(){
        this.pegarUsuarios()
    },
    methods: {
        PubliMaisRecente(){
            console.log("Publicação mais recente");
        },
        PubliMaisAntiga(){
            console.log("Publicação mais antiga");
        },
        EditMaisRecente(){
            console.log("Edição mais recente");
        },
        EditMaisAntiga(){
            console.log("Edição mais antiga");
        },
        async pegarUsuarios() {
            let config = {
                method: 'get',
                url: 'https://apiminhamente.onrender.com/usuarios',
                headers: {
                    'authorization': `Bearer ${LoginStore().token}`
                }
            };

            let usuarios = await axios(config)
            this.usuarios = usuarios.data.usuarios
        },
        async usuarioPeloNome(nome) {
        },
        async usuarioPeloSobreNome(sobrenome) {
        },
        async usuarioPeloEmail(email) {
            if (email.target.value.trim().length == 0 || email.target.value == undefined) {
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
            } catch (erro) {
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
</style>