<template>
    <div>
        <label for="miniatura" class="miniatura-label">Miniatura</label>
        <input type="file" name="miniatura" class="miniatura-input" id="miniatura" accept="image/png, image/jpeg,image/svg+xml" @change="ShowMiniatura" ref="miniaturaRef">
        <img :src="miniaturaPreview" class="miniatura-preview" draggable="false" v-if="miniaturaPreview">
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const miniaturaPreview = ref()
const miniaturaRef = ref()

const emit = defineEmits(["avatar","miniatura"])
    
function ShowMiniatura(){
    const img = miniaturaRef.value.files[0]
    emit("avatar", img)
    miniaturaPreview.value = URL.createObjectURL(img);

    emit("miniatura", img)
}
</script>

<style scoped>
div {
    display: flex;
    justify-content: space-between;
}

.miniatura-input {
    display: none;
}

.miniatura-label {
    outline: none;
    color: black;
    cursor: pointer;
    max-height: 30px;
    font-weight: 700;
    padding: 5px 15px;
    border-radius: 5px;
    text-align: center;
    background-color: var(--amarelo);
}

.miniatura-label:hover {
    background-color: var(--amarelo-escuro);
}

.miniatura-preview {
    width: 300px;
    height: 150px;
    margin-left: 10px;
    border-radius: 5px;
}
</style>