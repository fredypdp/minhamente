<template>
    <div class="table w-full p-2">
        <table class="w-full border">
            <thead>
                <tr class="bg-gray-50 border-b">
                    <th class="w-96 p-2 text-base font-bold text-gray-500">Apontamento</th>
                    <th class="w-32 p-2 text-base font-bold text-gray-500">Visibilidade</th>
                    <th class="w-32 p-2 text-base font-bold text-gray-500">Data de criação</th>
                    <th class="w-32 p-2 text-base font-bold text-gray-500">Data de Edição</th>
                    <th class="w-32 p-2 text-base font-bold text-gray-500">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-gray-50 text-center">
                    <td class="p-2">
                        <input type="search" name="titulo" class="input-pesquisar" placeholder="Título do apontamento">
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <Multiselect
                                v-model="visibilidade"
                                :close-on-select="false"
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
                            <AppDataCriacao @maisRecente="PubliMaisRecente" @maisAntiga="PubliMaisAntiga"/>
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
                <tr class="max-h-20 h-20 bg-gray-100 hover:bg-gray-300 text-justify border-b text-base font-medium">
                    <td class="w-96 p-2">
                        <PainelApontamento/>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <span class="text-black text-base texto-limite">Data de criação do apontamento</span>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <span class="text-black text-base texto-limite">Data de edição do apontamento</span>
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
import Multiselect from '@vueform/multiselect'
import PainelApontamento from "@/components/PainelApontamento.vue";
import AppDropdownEdit from "@/components/shared/AppDropdownEdit.vue";
import AppDataCriacao from "@/components/shared/AppDataCriacao.vue";
export default {
    components: {
        Multiselect,
        AppDropdownEdit,
        AppDataCriacao,
        PainelApontamento,
    },
    data() {
        return {
            visibilidade: ""
        }
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
        }
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
</style>