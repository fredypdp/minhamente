<template>
    <div class="assuntos-bar">
        <carousel v-bind="settings" :breakpoints="breakpoints" v-if="assuntos != undefined && assuntos.length > 0">
            <slide  v-for="(assunto, index) in assuntos" :key="assunto._id">
                <HomeTodosAssuntos v-if="index == 0"/>
                <HomeAssunto :assunto="assunto" v-else/>
            </slide>
            <template #addons>
                <navigation />
            </template>
        </carousel>
        <div class="sem-assuntos" v-else>
            <span>Nenhum assunto encontrado</span>
        </div>
    </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import HomeAssunto from "@/components/HomeAssunto.vue";
import HomeTodosAssuntos from "@/components/HomeTodosAssuntos.vue";
import { Carousel, Slide, Navigation } from 'vue3-carousel'
export default {
    components: {
        Slide,
        Carousel,
        Navigation,
        HomeAssunto,
        HomeTodosAssuntos
    },
    props: {
        assuntos: {
            type: Array,
        }
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
        }
    }
}
</script>

<style scoped>
.assuntos-bar {
    padding: 10px 0px;
    /* height: 140px; */
    margin-top: 50px;
    background-color: var(--amarelo);
}

.sem-assuntos {
    display: flex;
    align-items: center;
    justify-content: center;
}

.sem-assuntos span {
    font-weight: 500;
    font-size: 1.8rem;
}
</style>