<template>
    <div class="senha-area">
        <div class="senha-input-area">
            <input type="password" name="senha" class="login-senha" id="login-senha" minlength="8" autocomplete="off" placeholder="Digite a sua senha" v-if="!ocultarSenha" v-model.trim="senha">
            <input type="text" name="senha" class="login-senha" minlength="8" autocomplete="off" placeholder="Digite a sua senha" v-if="ocultarSenha" v-model.trim="senha">
        </div>
        <div class="mostrar-senha-icon">
            <img v-if="!ocultarSenha" src="../../assets/img/view-eye-svgrepo-com.svg" alt="Mostrar senhasenha" @click="mostrarSenha">
            <img v-if="ocultarSenha" src="../../assets/img/eye-closed-svgrepo-com.svg" alt="Ocultar senha" @click="mostrarSenha">
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
const senha = ref("")
const ocultarSenha = ref(false)

const emit = defineEmits(["senha"])

watch(senha, (nova, antiga) => {
    emit("senha", nova)
})

function mostrarSenha() {
    ocultarSenha.value = !ocultarSenha.value
}
</script>

<style scoped>
.senha-area {
    width: 100%;
    display: flex;
    border-radius: 5px;
    align-items: center;
    border: 1px solid black;
    background-color: white;
}

.senha-input-area {
    width: 100%;
}

.login-senha {
    width: 100%;
    padding: 5px;
    outline: none;
    color: black;
    font-size: 20px;
    font-weight: 500;
    border-radius: 5px 0px 0px 5px;
}

.mostrar-senha-icon {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.mostrar-senha-icon img {
    width: 35px;
    padding: 5px;
    cursor: pointer;
    border-radius: 50px;
}

.mostrar-senha-icon img:hover {
    background-color: #a3a3a3;
}
</style>