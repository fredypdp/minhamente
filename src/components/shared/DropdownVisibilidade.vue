<template>
<div>
    <button type="button" class="dropdown-button" @click="toggle">
        <span>Visibilidade</span>
        <i class="fa-solid fa-angle-up" v-if="isOpen"></i>
        <i class="fa-solid fa-angle-down" v-if="!isOpen"></i>
    </button>
    <div class="dropdown" v-show="isOpen">
        <span @click="publico">Público</span>
        <span @click="privado">Privado</span>
    </div>
</div>
</template>

<script setup lang="ts">
import Emitter from "../../Emitter.js";
import { ref, watch, onMounted, onBeforeUnmount, inject, getCurrentInstance } from "vue";

const instance = getCurrentInstance()
const isOpen = ref(false)

Emitter.on('dropdownOpen', rootCloseDropdownVisibilidadeListener);
const emit = defineEmits(["publico", "privado"])

watch(isOpen, (value) => {
    if (value) {
        Emitter.emit('dropdownOpen', instance.proxy.$el);
    }
})

onMounted(() => {
    document.addEventListener("click", clickOutDropdownVisibilidadeListener)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', clickOutDropdownVisibilidadeListener);
})

function toggle(){
    isOpen.value = !isOpen.value
}

function close(){
    isOpen.value = false
}

function clickOutDropdownVisibilidadeListener(evt){
    if (!instance.proxy.$el.contains(evt.target)) { // Se clicar no mesmo elemento, não fechar, mas se sim, fechar
        close()
    }
}

function rootCloseDropdownVisibilidadeListener(vm) {
    if (vm !== instance.proxy.$el) {
        close();
    }
}

function publico(){
    emit("publico")
    close();
}

function privado(){
    emit("privado")
    close();
}
</script>

<style scoped>
span {
    font-size: 16px;
}

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