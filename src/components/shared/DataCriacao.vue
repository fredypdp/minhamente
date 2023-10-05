<template>
<div>
    <button class="dropdown-button" @click="ordenar">
        <span>Ordenar por:</span>
        <i class="fa-solid fa-angle-up" v-if="isOpen"></i>
        <i class="fa-solid fa-angle-down" v-if="!isOpen"></i>
    </button>
</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const isOpen = ref(false)

const emit = defineEmits(["ordenar"])

function toggle(){
    isOpen.value = !isOpen.value
}

function ordenar(){
    emit("ordenar")
    toggle()
}
</script>

<style scoped>
.dropdown-button {
    width: 140px;
    display: flex;
    outline: none;
    padding: 4px 12px;
    border-radius: 3px;
    border: 1px solid #ccc;
    align-content: center;
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
</style>