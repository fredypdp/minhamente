<template>
    <div class="table w-full p-2">
        <table class="w-full border">
            <thead>
                <tr class="bg-gray-50 border-b">
                    <th class="w-32 p-2 text-base font-bold text-gray-500">Avatar</th>
                    <th class="w-32 p-2 text-base font-bold text-gray-500">Nome</th>
                    <th class="w-32 p-2 text-base font-bold text-gray-500">Email</th>
                    <th class="w-32 p-2 text-base font-bold text-gray-500">Data de criação</th>
                    <th class="w-32 p-2 text-base font-bold text-gray-500">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-gray-50 text-center">
                    <td class="p-2">
                        <div class="max-w-2xl mx-auto">
                            <form class="flex items-center">   
                                <label for="simple-search" class="sr-only">Pesquisar usuário</label>
                                <div class="relative w-full">
                                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                    </div>
                                    <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nome do usuário" required>
                                </div>
                                <button type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
                            </form>
                        </div>
                    </td>
                    <td class="p-2 font-bold text-lg text-black">-</td>
                    <td class="p-2 font-bold text-lg text-black">
                        <div class="max-w-2xl mx-auto">
                            <form class="flex items-center">   
                                <label for="simple-search" class="sr-only">Pesquisar email do usuário</label>
                                <div class="relative w-full">
                                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                    </div>
                                    <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email do usuário" required>
                                </div>
                                <button type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
                            </form>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <AppDropdownPubli @maisRecente="PubliMaisRecente" @maisAntiga="PubliMaisAntiga"/>
                        </div>
                    </td>
                    <td class="p-2 font-bold text-lg text-black">-</td>
                </tr>
                <tr class="max-h-20 h-20 bg-gray-100 hover:bg-gray-300 text-justify border-b text-base font-medium">
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <span class="text-black text-base texto-limite">Avatar do usuário</span>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <span class="text-black text-base texto-limite">Nome do usuário</span>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <span class="text-black text-base texto-limite">Email do usuário</span>
                        </div>
                    </td>
                    <td class="p-2">
                        <div class="flex justify-center items-center">
                            <span class="text-black text-base texto-limite">Data de criação do usuário</span>
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
export default {
    components: {
        AppDropdownPubli
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
</style>