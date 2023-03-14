<template>
    <div>
        <label for="miniatura" class="miniatura-label">Miniatura</label>
        <input type="file" name="miniatura" class="miniatura-input" id="miniatura" accept="image/png, image/jpeg" @change="ShowMiniatura" ref="miniatura" required>
        <img :src="miniaturaPreview" class="miniatura-preview" draggable="false" v-if="miniaturaPreview">
    </div>
</template>

<script>
export default {
    props: {
        miniatura: {
            type: String,
        }
    },
    data(){
        return {
            miniaturaPreview: this.miniatura
        }
    },
    methods: {
        ShowMiniatura(){
            const img = this.$refs.miniatura.files[0]
            this.$emit("avatar", img)
            this.miniaturaPreview = URL.createObjectURL(img);
        }
    }
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
    font-size: 15px;
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