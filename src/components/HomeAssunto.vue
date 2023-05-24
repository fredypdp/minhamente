<template>
<div>
    <div class="assunto-area" @click="apontamentosDoAssunto(assunto)">
        <div class="assunto">
            <div class="icone-area">
                <img :src="assunto.icone" draggable="false" alt="Ícone do assunto" class="icone">
            </div>
            <span>{{assunto.nome}}</span>
        </div>
    </div>
    <div class="assunto-mobile-area" @click="apontamentosDoAssunto(assunto)">
        <div class="assunto-mobile">
            <span>{{assunto.nome}}</span>
        </div>
    </div>
</div>
</template>

<script>
import { HomeStore } from "@/stores/HomeStore.js";
export default {
    props: {
        assunto: {
            type: Object,
            require: true
        }
    },
    data() {
        return {
            HomeStore: HomeStore(),
        }
    },
    methods: {
        async apontamentosDoAssunto(assunto) {
            this.HomeStore.assuntoAtual = assunto._id
        }
    }
}
</script>

<style scoped>
.assunto-area {
    /* width: 100%; */
    /* height: 100%; */
    width: 190px;
    height: 100px;
    margin-left: 5px;
    margin-right: 5px;
}

.assunto {
    width: 100%;
    height: 100%;
    display: flex;
    cursor: pointer;
    padding: 5px 20px;
    border-radius: 10px;
    align-items: center;
    flex-direction: column;
    background-color: var(--azul);
    justify-content: space-between;
}

.assunto:hover {
    background-color: var(--azul-escuro);
}

.icone-area {
    color: white;
    max-width: 60px;
    max-height: 60px;
}

.icone {
    width: 100%;
    height: 100%;
}

.assunto span {
    color: white;
    font-size: 2rem;
    font-weight: 700;
}

.assunto-mobile span {
    color: white;
    font-size: 1.6rem;
    font-weight: 700;
}

.assunto span, .assunto-mobile span {
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; 
    -webkit-box-orient: vertical;
}

.assunto-mobile-area {
    display: none;
    max-width: 200px;
    margin-left: 5px;
    margin-right: 5px;
 }
 .assunto-mobile {
    color: white;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 8px;
    background-color: var(--azul);
}

.assunto-mobile:hover {
    background-color: var(--azul-escuro);
}

@media (max-width: 1235px) {
 .assunto-area {
    display: none;
 }
 .assunto-mobile-area {
    display: flex;
 }
}
</style>