<template>
    <select name="assuntos" id="assuntos" multiple required size="2">
        <option value="" class="text-dark"></option>
    </select>
</template>

<script>
export default {

}
</script>

<style scoped>
.botoes select {
    width: max-content;
    min-height: 30px;
    color: black;
    font-size: 16px;
    font-weight: 500;
    padding: 5px 5px;
    border-radius: 5px;
}

.botoes select option {
    color: black;
    font-size: 20px;
    font-weight: 500;
}
</style>