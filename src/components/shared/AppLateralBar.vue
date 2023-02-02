<template>
    <aside>
        <nav class="assuntos-lateral-bar">
            <LateralBarAssunto v-for="assunto in assuntos" :key="assunto.id" :assunto="assunto"/>
        </nav>
    </aside>
</template>

<script>
import LateralBarAssunto from "@/components/LateralBarAssunto.vue";
export default {
    components: {
        LateralBarAssunto
    },
    data(){
        return {
            assuntos: [
                {id: 1,icone: "fa-solid fa-sun",nome: "Assunto 1"},
                {id: 2,icone: "fa-solid fa-sun",nome: "Assunto 2"},
                {id: 3,icone: "fa-solid fa-sun",nome: "Assunto 3"},
                {id: 4,icone: "fa-solid fa-sun",nome: "Assunto 4"},
                {id: 5,icone: "fa-solid fa-sun",nome: "Assunto 5"},
                {id: 6,icone: "fa-solid fa-sun",nome: "Assunto 6"},
                {id: 7,icone: "fa-solid fa-sun",nome: "Assunto 7"},
                {id: 8,icone: "fa-solid fa-sun",nome: "Assunto 8"},
                {id: 9,icone: "fa-solid fa-sun",nome: "Assunto 9"},
                {id: 10,icone: "fa-solid fa-sun",nome: "Assunto 10"},
                {id: 11,icone: "fa-solid fa-sun",nome: "Assunto 11"},
                {id: 12,icone: "fa-solid fa-sun",nome: "Assunto 12"},
                {id: 13,icone: "fa-solid fa-sun",nome: "Assunto 13"},
                {id: 14,icone: "fa-solid fa-sun",nome: "Assunto 14"},
                {id: 15,icone: "fa-solid fa-sun",nome: "Assunto 15"},
            ]
        }
    }
}
</script>

<style scoped>
aside {
    width: 15%;
    max-width: 200px;
    height: fit-content;
    padding: 30px 20px;
    border-radius: 5px;
    background-color: white;
    box-shadow: 2px 3px 7px black;
}

@media (max-width: 390px) {
aside {
    display: none;
}
}
</style>