<template>
    <div>
        <label for="miniatura">Miniatura</label>
        <input type="file" name="miniatura" id="miniatura" accept="image/png, image/jpeg" required>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.botoes input[name = "miniatura"] {
    display: none;
}

.botoes label[for="miniatura"] {
    display: flex;
    width: 150px;
    max-width: 150px;
    height: 30px;
    color: black;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    justify-content: center;
    outline: none;
    cursor: pointer;
    padding: 5px 0px;
    border-radius: 5px;
    margin-left: 20px;
    background-color: var(--amarelo);
}

.botoes label[for="miniatura"]:hover {
    background-color: #d3ba1c;
}
</style>