<template>
    <div class="table w-full p-2">
        <table class="w-full border">
            <thead>
                <tr class="bg-gray-50 border-b">
                    <th class="w-96 p-2 text-base font-bold text-gray-500">Ícone</th>
                    <th class="w-32 p-2 text-base font-bold text-gray-500">Nome</th>
                    <th class="w-32 p-2 text-base font-bold text-gray-500">Slug</th>
                    <th class="w-32 p-2 text-base font-bold text-gray-500">Data de criação</th>
                    <th class="w-32 p-2 text-base font-bold text-gray-500">Data de Edição</th>
                    <th class="w-32 p-2 text-base font-bold text-gray-500">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-gray-50 text-center">
                    <td class="p-2">
                        <input type="search" name="nome" class="input-pesquisar" placeholder="Nome do assunto">
                    </td>
                    <td class="p-2 font-bold text-lg text-black">-</td>
                    <td class="p-2 font-bold text-lg text-black">-</td>
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <AppDropdownPubli @maisRecente="PubliMaisRecente" @maisAntigo="PubliMaisAntigo"/>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <AppDropdownEdit @maisRecente="EditMaisRecente" @maisAntigo="EditMaisAntigo"/>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <router-link :to="{name: 'AssuntoCriar'}">
                            <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">Novo assunto</button>
                            </router-link>
                        </div>
                    </td>
                </tr>
                <tr class="max-h-20 h-20 bg-gray-100 hover:bg-gray-300 text-justify border-b text-base font-medium">
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <i class="fa-solid fa-sun"></i>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <span class="text-black text-base texto-limite">Nome do assunto</span>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <span class="text-black text-base texto-limite">nome-do-assunto</span>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <span class="text-black text-base texto-limite">Data de criação do assunto</span>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <span class="text-black text-base texto-limite">Data de edição do assunto</span>
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
import AppDropdownPubli from "@/components/shared/AppDropdownPubli.vue";
import AppDropdownEdit from "@/components/shared/AppDropdownEdit.vue";
export default {
    components: {
        AppDropdownPubli,
        AppDropdownEdit
    },
    methods: {
        PubliMaisRecente(){
            console.log("Publicação mais recente");
        },

        PubliMaisAntigo(){
            console.log("Publicação mais antiga");
        },

        EditMaisRecente(){
            console.log("Edição mais recente");
        },

        EditMaisAntigo(){
            console.log("Edição mais antiga");
        }
    }
}
</script>
<style scoped>
td i {
    color: black;
    font-size: 30px;
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