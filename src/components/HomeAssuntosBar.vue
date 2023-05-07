<template>
    <div class="assuntos-bar">
        <carousel v-bind="settings" :breakpoints="breakpoints">
            <slide v-for="(assunto, index) in assuntos" :key="assunto.id">
                <HomeTodosAssuntos v-if="index == 0"/>
                <HomeAssunto :assunto="assunto" v-else/>
            </slide>
            
            <template #addons>
                <navigation />
            </template>
        </carousel>
    </div>
</template>

<script>
import HomeAssunto from "@/components/HomeAssunto.vue";
import HomeTodosAssuntos from "@/components/HomeTodosAssuntos.vue";
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
// Documentação : https://ismail9k.github.io/vue3-carousel/getting-started.html
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
export default {
    components: {
        Slide,
        Carousel,
        Navigation,
        HomeAssunto,
        HomeTodosAssuntos
    },
    data(){
        return {
            settings: {
                itemsToScroll: 3
            },
            breakpoints: {
                // 1500px pra cima
                1500: {
                    itemsToShow: 7.5,
                },
                // 1235px pra cima
                1235: {
                    itemsToShow: 5.5,
                },
                // 1100px pra cima
                1100: {
                    itemsToShow: 10.5,
                },
                // 924px pra cima
                924: {
                    itemsToShow: 8.5,
                },
                // 700px pra cima
                700: {
                    itemsToShow: 6.5,
                },
                // 600px pra cima
                600: {
                    itemsToShow: 5.5,
                },
                // 480px pra cima
                480: {
                    itemsToShow: 4.5,
                },
                // 370px pra cima
                370: {
                    itemsToShow: 3.5,
                },
                // 200px pra cima
                200: {
                    itemsToShow: 2.5,
                },
            },
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
.assuntos-bar {
    padding: 10px 0px;
    /* height: 140px; */
    margin-top: 50px;
    align-items: center;
    background-color: var(--amarelo);
}
</style>