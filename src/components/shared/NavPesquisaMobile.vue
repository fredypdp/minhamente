<template>
<div>
    <div class="pesquisa-area">
        <i class="fa-solid fa-magnifying-glass" @click="toggle"></i>
        <div class="pesquisa" v-show="abrirPesquisa">
            <i class="fa-solid fa-arrow-left" @click="toggle"></i>
            <form class="pesquisa-form-area" @submit.prevent="pesquisar">
                <input type="search" v-model="pesquisa" name="search" class="pesquisa-input" autocomplete="off" placeholder="Pesquisar" @keyup.enter="pesquisar">
                <button type="submit" @click="pesquisar"><i class="fa-solid fa-magnifying-glass"></i></button>
            </form>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
       return {
            pesquisa: this.$route.query.pesquisa,
            abrirPesquisa: false
        }
    },
    methods: {
        toggle(){
            this.abrirPesquisa = !this.abrirPesquisa
        },
        pesquisar() {
            this.$router.push({name: "pesquisa", query: {pesquisa: this.pesquisa}})
        }
    }
}
</script>

<style scoped>
i {
    cursor: pointer;
    font-size: 1.5rem;
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
    font-size: 1rem;
    margin-right: 5px;
    outline: none;
    background: transparent;
}

.pesquisa-input::-webkit-search-cancel-button {
    display: none;
}
.pesquisa-input::placeholder {
    color: black;
    font-size: 16px;
}

button {
    outline: none;
}
</style>