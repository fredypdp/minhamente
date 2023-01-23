<template>
    <div class="assuntos-bar">
        <div class="assuntos-arrows assuntos-arrow-left" id="setaEsquerda" ref="setaEsquerda">
            <i class="fa-solid fa-angle-left"></i>
        </div>
        <div class="assuntos-bar-area" ref="assuntosBar">
            <AppAssunto v-for="assunto in assuntos" :key="assunto.id" :assunto="assunto"/>
        </div>
        <div class="assuntos-arrows assuntos-arrow-right" id="setaDireita" ref="setaDireita" @click="rolarDireita()">
            <i class="fa-solid fa-angle-right"></i>
        </div>
    </div>
</template>

<script>
import AppAssunto from "@/components/AppAssunto.vue";
export default {
    components: {
        AppAssunto
    },
    data(){
        return {
            assuntos: [
                {id: 1,icone: "fa-solid fa-sun",nome: "Assunto"},
                {id: 2,icone: "fa-solid fa-sun",nome: "Assunto"},
                {id: 3,icone: "fa-solid fa-sun",nome: "Assunto"},
                {id: 4,icone: "fa-solid fa-sun",nome: "Assunto"},
                {id: 5,icone: "fa-solid fa-sun",nome: "Assunto"},
                {id: 6,icone: "fa-solid fa-sun",nome: "Assunto"},
                {id: 7,icone: "fa-solid fa-sun",nome: "Assunto"},
                {id: 8,icone: "fa-solid fa-sun",nome: "Assunto"},
                {id: 9,icone: "fa-solid fa-sun",nome: "Assunto"},
                {id: 10,icone: "fa-solid fa-sun",nome: "Assunto"},
                {id: 11,icone: "fa-solid fa-sun",nome: "Assunto"},
                {id: 12,icone: "fa-solid fa-sun",nome: "Assunto"},
                {id: 13,icone: "fa-solid fa-sun",nome: "Assunto"},
                {id: 14,icone: "fa-solid fa-sun",nome: "Assunto"},
                {id: 15,icone: "fa-solid fa-sun",nome: "Assunto"},
            ]
        }
    },
    methods: {
        rolarDireita: function () {
            this.$refs.assuntosBar.scrollBy(-400, 0)
            console.log(this.$refs.assuntosBar);
        }
    }
}
</script>

<style scoped>
.assuntos-bar {
    display: flex;
    height: 140px;
    margin-top: 50px;
    align-items: center;
    background-color: var(--amarelo);
}

.assuntos-arrow-left i,.assuntos-arrow-right  {
    cursor: pointer;
}

.assuntos-arrow-left {
    display: flex;
    left: 25px;
    position: absolute;
    flex-direction: row;
    align-items: center;
}

.assuntos-arrow-right {
    display: flex;
    right: 25px;
    position: absolute;
    flex-direction: row;
    align-items: center;
}

.assuntos-arrows i {
    font-size: 40px;
}

.assuntos-arrows i:hover {
    color: #B5B5B5;
}

.assuntos-bar-area {
    width: 100%;
    padding: 0px 30px;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
}

.assuntos-bar-area::-webkit-scrollbar {
    display: none;
}

.assuntos-bar-area a {
    margin: 0px 5px;
}
</style>