<template>
<div>
    <button class="dropdown-button" @click="ordenar">
        <span>Ordenar por:</span>
        <i class="fa-solid fa-angle-up" v-if="isOpen"></i>
        <i class="fa-solid fa-angle-down" v-if="!isOpen"></i>
    </button>
</div>
</template>

<script>

export default {
    data(){
        return {
            isOpen: false
        }
    },
    methods: {
        toggle(){
            this.isOpen = !this.isOpen
        },
        ordenar(){
            this.$emit("ordenar")
            this.toggle()
        },
    }
}
</script>

<style scoped>
div {
    max-width: 150px;
}

.dropdown-button {
    /* width: 150px; */
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
}

.dropdown-button i {
    color: black;
    font-size: 20px;
    margin-left: 10px;
}
</style>