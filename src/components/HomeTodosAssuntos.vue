<template>
<div>
    <div class="assunto-area" @click="apontamentosDoAssunto">
        <div class="assunto">
            <span>Todos apontamentos</span>
        </div>
    </div>
    <div class="assunto-mobile-area" @click="apontamentosDoAssunto">
        <div class="assunto-mobile">
            <span>Todos apontamentos</span>
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
        async apontamentosDoAssunto() {
            this.HomeStore.assuntoAtual = "todos"
        }
    }
}
</script>

<style scoped>
.assunto-area {
    width: 190px;
    height: 100px;
    margin-right: 5px;
}

.assunto {
    width: 100%;
    height: 100%;
    display: flex;
    cursor: pointer;
    padding: 15px 20px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    background-color: var(--azul);
}

.assunto:hover {
    background-color: var(--azul-escuro);
}

.assunto span {
    color: white;
    font-size: 24px;
    font-weight: 700;
}

.assunto-mobile span {
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