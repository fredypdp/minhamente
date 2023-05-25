<template>
<div class="criar-assunto-area" @click="criarAssunto">
    <div class="assunto">
        <div class="icone-area">
            <img src="../assets/img/plus-svgrepo-com.svg" alt="Criar assunto" class="icone">
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
        async criarAssunto() {
            this.$router.push({name: "AssuntoCriar"})
        }
    }
}
</script>

<style scoped>
.criar-assunto-area {
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

.icone-area {
    max-width: 80px;
    max-height: 80px;
}

.icone {
    width: 100%;
    height: 100%;
}

@media (max-width: 1235px) {
.criar-assunto-area {
    width: 150px;
    height: 35px;
    margin-right: 5px;
}

.assunto {
    width: 100%;
    height: 100%;
}

.icone {
    width: 30px;
    height: 30px;
}
}
</style>