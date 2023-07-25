<template>
<div id="AssuntoCriarView">
    <NavBar/>
    <div class="criar-assunto-area">
        <form @submit.prevent="criar" class="criar-assunto-form">
            <div class="icone-area">
                <label for="icone" class="icone-label">
                    <div class="icone-label-container" v-if="!iconeUrl">
                        <span >Escolha o ícone do assunto</span>
                    </div>
                    <img :src="iconeUrl" alt="" srcset="" class="icone-label-img" draggable="false" v-else>
                </label>
                <input type="file" accept="image/png,image/jpg,image/jpeg,image/svg+xml" name="icone" id="icone" @change="Showicone" ref="iconeRef" class="icone-input">
            </div>
            <label for="nome" class="nome-label">Nome do assunto:</label>
            <input type="text" name="nome" class="nome-input" id="nome" placeholder="Nome do assunto" autocomplete="off" autofocus v-model.trim.lazy="nome">
            <span id="erro">{{ erro }}</span>
            <button :disabled="botaoDesativado" type="submit" class="botao-criar">
                <div role="status" v-if="loading">
                    <svg aria-hidden="true" class="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Carregando...</span>
                </div>
                <span v-else>Criar assunto</span>
            </button>
            <button @click="cancelar" type="button" class="botao-cancelar">
                <span>Cancelar</span>
            </button>
        </form>
    </div>
</div>
</template>

<script setup>
import { ref} from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { Login } from "@/stores/Login.js";
import NavBar from "@/components/shared/NavBar.vue";

const router = useRouter()
const storeLogin = Login()
const erro = ref("")
const nome = ref("")
const icone = ref(undefined)
const iconeUrl = ref(undefined)
const iconeRef = ref()
const loading = ref(false)
const botaoDesativado = ref(false)

function Showicone(){
    const img = iconeRef.value.files[0]
    icone.value = img;
    iconeUrl.value = URL.createObjectURL(img);
}

async function criar(){
    loading.value = true
    botaoDesativado.value = true
    document.getElementById("erro").style.display = "none"

    const formData = new FormData();
    let nomeUsar = nome.value
    let iconeUsar = icone.value

    formData.append('nome', nomeUsar);
    formData.append('icone', iconeUsar);

    try {
        let assunto = await axios.post('https://apiminhamente.onrender.com/assunto', formData, {headers: {'authorization': `Bearer ${storeLogin.token}`}})
        
        loading.value = false
        botaoDesativado.value = false
        router.push({name: "PainelAssuntos"})
    } catch (error) {
        console.log(erro);
        loading.value = false
        botaoDesativado.value = false
		
        erro.value = error.response.data.erro
        document.getElementById("erro").style.display = "flex"
    }
}

function cancelar() {
    if (nome.value.length > 0 || icone.value != undefined) {
        let confirmar = confirm("Deseja realmente saír?")
    
        if(confirmar) {
            router.push({name: "home"})
        }
    }
    
    router.push({name: "home"})
}
</script>

<style scoped>
#erro {
    display: none;
    color: red;
    margin-bottom: 5px;
}

#AssuntoCriarView {
    height: 100vh;
}

.criar-assunto-area {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0px 20px;
    align-items: center;
    justify-content: center;
}

.criar-assunto-form {
    width: 500px;
    padding: 10px;
    display: flex;
    max-width: 500px;
    border-radius: 5px;
    flex-direction: column;
    align-items: flex-start;
    background-color: #e7e7e7;
}

.criar-assunto-form label {
    color: black;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
}

.criar-assunto-form input {
    width: 100%;
    padding: 5px;
    color: black;
    font-size: 20px;
    font-weight: 500;
    border-radius: 5px;
    margin-bottom: 20px;
    border: 1px solid black;
}

.icone-area {
    width: 100%;
    display: flex;
    justify-content: center;
}

.icone-input {
    display: none;
}

.icone-label {
    width: 120px;
    height: 120px;
    border: none;
    outline: none;
    cursor: pointer;
    text-align: center;
    border-radius: 100%;
    background-color: var(--azul);
}

.icone-label span {
    color: white;
    font-size: 18px;
}

.icone-label:hover {
    background-color: #124194;
}
.icone-label-container {
    padding: 5px;
}

.icone-label-img {
    width: 120px;
    height: 120px;    
    border-radius: 100%;
}

.botao-criar {
    width: 100%;
    outline: none;
    color: white;
    cursor: pointer;
    font-weight: 700;
    padding: 5px 15px;
    border-radius: 5px;
    text-align: center;
    background-color: var(--verde);
}

.botao-criar:hover {
    background-color: var(--verde-escuro);
}

.botao-cancelar {
    width: 100%;
    outline: none;
    color: white;
    cursor: pointer;
    font-weight: 700;
    margin-top: 10px;
    padding: 5px 15px;
    border-radius: 5px;
    text-align: center;
    background-color: var(--amarelo);
}

.botao-cancelar:hover {
    background-color: var(--amarelo-escuro);
}
</style>