<template>
    <div class="assunto" v-if="assunto" @click="apontamentosDoAssunto(assunto)">
        <div class="icone-area">
            <img :src="assunto.icone" draggable="false" alt="Ícone do assunto" class="icone">
        </div>
        <span class="assunto-nome">{{ assunto.nome }}</span>
    </div>
</template>

<script setup lang="ts">
import { Home } from "@/stores/Home";
import type { Assunto } from "@/types/types";
import { useRouter } from "vue-router";

const storeHome = Home()
const router = useRouter()

const props = defineProps({
    assunto: {
        type: Object as () => Assunto,
        require: true
    }
})

function apontamentosDoAssunto(assunto?: Assunto) {
    storeHome.definirAssunto(assunto)
    router.push({name: "home", meta: { assunto, definirAssunto: true }} as any)
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
	overflow: hidden;
}

.icone {
    width: 100%;
    height: 100%;
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