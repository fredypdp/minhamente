<template>
    <div class="assunto" @click="apontamentosDoAssunto(assunto)">
        <div class="icone-area">
            <img :src="assunto.icone" alt="Ícone do assunto" class="icone">
        </div>
        <span class="assunto-nome">{{ assunto.nome }}</span>
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
    methods: {
        async apontamentosDoAssunto(assunto) {
            HomeStore().assuntoAtual = assunto._id
            this.$router.push({name: "home"})
        }
    }
}
</script>

<style scoped>
.assunto {
    width: 100%;
    height: 40px;
    padding: 5px;
    display: flex;
    cursor: pointer;
    border-radius: 5px;
    margin-bottom: 15px;
    align-items: center;
    background-color: var(--azul);
}

.assunto:last-child {
    margin-bottom: 0px;
}

.assunto:hover {
    background-color: var(--azul-escuro);
}

.icone-area {
    max-width: 30px;
    max-height: 30px;
}

.icone {
    width: 100%;
    height: 100%;
	overflow: hidden;
}

.assunto-nome {
    font-size: 20px;
    font-weight: 700;
}
.assunto-nome {
    color: white;
    overflow: hidden;
    text-align: left;
    margin-left: 10px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; 
    -webkit-box-orient: vertical;
}
</style>