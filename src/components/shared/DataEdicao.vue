<template>
<div>
    <button class="dropdown-button" @click="toggle">
        <span>Ordenar por:</span>
        <i class="fa-solid fa-angle-up" v-if="isOpen"></i>
        <i class="fa-solid fa-angle-down" v-if="!isOpen"></i>
    </button>
    <div class="dropdown" v-show="isOpen">
        <span @click="maisRecente">Edição mais recente</span>
        <span @click="maisAntigo">Edição mais antiga</span>
    </div>
</div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, inject, getCurrentInstance } from "vue";

const instance = getCurrentInstance()
const emitter = inject('emitter')
const isOpen = ref(false)

emitter.on('dropdownOpen', rootCloseDataEdicaoListener);
const emit = defineEmits(["maisRecente", "maisAntigo"])

watch(isOpen, (value) => {
        if (value) {
            emitter.emit('dropdownOpen', instance.proxy.$el);
        }
    }
)

onMounted(() => {
    document.addEventListener("click", clickOutDataEdicaoListener)
})
    
onBeforeUnmount(() => {
    document.removeEventListener('click', clickOutDataEdicaoListener);
})

function toggle(){
    isOpen.value = !isOpen.value
}

function close(){
    isOpen.value = false
}

function clickOutDataEdicaoListener(evt){
    if (!instance.proxy.$el.contains(evt.target)) { // Se clicar no mesmo elemento, não fechar, mas se sim, fechar
        close()
    }
}

function rootCloseDataEdicaoListener(vm) {
    if (vm !== instance.proxy.$el) {
        close();
    }
}

function maisRecente(){
    emit("maisRecente")
    close();
}

function maisAntigo(){
    emit("maisAntigo")
    close();
}
</script>

<style scoped>
div {
    max-width: 150px;
}

.dropdown-button {
    width: 150px;
    display: flex;
    outline: none;
    padding: 4px 12px;
    border-radius: 3px;
    border: 1px solid #ccc;
    align-items: center;
    justify-content: space-between;
}

.dropdown-button span {
    color: black;
    font-weight: bold;
    font-size: 16px;
}

.dropdown-button i {
    color: black;
    font-size: 20px;
}

.dropdown {
    width: 150px;
    display: flex;
    margin-top: 5px;
    border-radius: 3px;
    position: absolute;
    align-items: center;
    flex-direction: column;
    border: 1px solid #ccc;
    background-color: white;
}

.dropdown span {
    width: 100%;
    padding: 5px 0px;
    color: black;
    font-weight: bold;
    text-align: center;
}

.dropdown span:hover {
    cursor: pointer;
    background-color: #ccc;
}
</style>