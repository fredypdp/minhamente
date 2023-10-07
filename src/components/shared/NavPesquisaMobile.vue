<template>
<div>
    <div class="pesquisa-area">
        <i class="fa-solid fa-magnifying-glass" @click="toggle"></i>
        <div class="pesquisa" v-show="abrirPesquisa">
            <i class="fa-solid fa-arrow-left" @click="toggle"></i>
            <form class="pesquisa-form-area" @submit.prevent="pesquisar">
                <input type="search" v-model="pesquisa" ref="pesquisaRef" name="search" class="pesquisa-input" autocomplete="off" placeholder="Pesquisar" @keyup.enter="pesquisar">
                <button type="submit" @click="pesquisar"><i class="fa-solid fa-magnifying-glass"></i></button>
            </form>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onBeforeUnmount, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";

const instance = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const pesquisa = ref<string>(route.query.pesquisa as string)
const abrirPesquisa = ref(false)
const pesquisaRef = ref()
            
onMounted(() => {
    document.addEventListener("click", clickOutPesquisaMobileListener)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', clickOutPesquisaMobileListener);
})

watch(abrirPesquisa, (novo, antigo) => {
    nextTick(() => {
        pesquisaRef.value.focus()
    })
    // Por causa do condicional
    // O focus estava sendo chamado antes da nova renderização da mundaça do condicional
    // Daí estava limpando o focus quando acontecia
    // Com $nextTick tu chama uma função quando o próxima renderização (tick) termina de acontecer
})
    
function toggle(){
    abrirPesquisa.value = !abrirPesquisa.value
}

function pesquisar() {
    if(pesquisa.value == undefined) {
        return
    }

    if(pesquisa.value != undefined && pesquisa.value.trim().length == 0) {
        return
    }

    router.push({name: "pesquisa", query: {pesquisa: pesquisa.value}})
}

function close(){
    abrirPesquisa.value = false
}

function clickOutPesquisaMobileListener(evt: any){
    if (!instance!.proxy!.$el.contains(evt.target)) { // Se clicar no mesmo elemento, não fechar, mas se sim, fechar
        close()
    }
}
</script>

<style scoped>
i {
    cursor: pointer;
    font-size: 24px;
    margin-right: 10px;
}

.pesquisa {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 5px;
    z-index: 1000;
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: space-between;
    background-color: white;
}

.pesquisa-form-area{
    width: 95%;
    display: flex;
    padding: 5px 15px;
    align-items: center;
    border-radius: 50px;
    background-color: #ddd;
}

.pesquisa-input {
    width: 100%;
    height: 100%;
    font-size: 16px;
    margin-right: 5px;
    outline: none;
    background: transparent;
}

.pesquisa-input::-webkit-search-cancel-button {
    display: none;
}
.pesquisa-input::placeholder {
    color: black;
}

button {
    outline: none;
}
</style>