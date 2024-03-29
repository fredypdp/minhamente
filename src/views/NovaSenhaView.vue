<template>
    <div class="page-container">
        <div class="mudar-senha-area">
            <form class="mudar-senha-form" @submit.prevent="mudarSenha">
                <label for="login-email" class="mudar-senha-label">Nova Senha:</label>
                <SenhaInput @senha="definirSenha"/>
                <span style="display: none;color: green; margin-bottom: 5px;" id="sucesso">Senha alterada com sucesso</span>
                <span style="display: none;color: red; margin-bottom: 5px;" id="senha-erro">A senha precisa ter no mínimo 8 caracteres</span>
                <span style="display: none;color: red; margin-bottom: 5px;" id="token-erro">Token inválido ou inexistente!</span>
                <button :disabled="botaoDesativado" type="submit" class="botao-mudar-senha">
                    <div role="status" v-if="loading">
                        <svg aria-hidden="true" class="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                    <span v-else>Mudar senha</span>
                </button>
                <span id="response-erro">{{ responseErro }}</span>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { Login } from "@/stores/Login";
import { useRoute, useRouter } from "vue-router";
import SenhaInput from "@/components/shared/SenhaInput.vue";

const storeLogin = Login()
const route = useRoute()
const router = useRouter()

const loading = ref<boolean>(false)
const senha = ref<string | undefined>(undefined)
const botaoDesativado = ref<boolean>(false)
const responseErro = ref<string | undefined>(undefined)

function definirSenha(novaSenha: string): void {
    senha.value = novaSenha
}

async function mudarSenha(): Promise<void> {
    loading.value = true
    botaoDesativado.value = true
    document.getElementById("response-erro")!.style.display = "none"
    
    let config = {
        method: 'post',
        url: `https://apiminhamente.onrender.com/mudarsenha/${route.params.token}`,
        data: {
            senha: senha.value
        }
    };

    try {
        let usuario = await axios(config)

        // Terminando a sessão no servidor
        if(storeLogin.usuario != undefined) {
            // Terminando a sessão no servidor
            await logout()
        }
        
        // Fazendo login
        await login(usuario.data.usuario.email, senha.value)
        

        loading.value = false
        botaoDesativado.value = false
        router.push({name: "home"})
    } catch (error: any) {
        console.log(error);
        loading.value = false
        botaoDesativado.value = false
        
        responseErro.value = error.response.data.erro
        document.getElementById("response-erro")!.style.display = "flex"
    }
}

async function login(email: any, senha: any): Promise<void> {
    try {
        let { data } = await axios.post("https://apiminhamente.onrender.com/login", {email: email, senha: senha})
                            
        localStorage.setItem("token", JSON.stringify(data.token))
        localStorage.setItem("usuario", JSON.stringify(data.usuario))
        localStorage.setItem("_links", JSON.stringify(data._links))
    } catch (error: any) {
        console.log(error);
        loading.value = false
        botaoDesativado.value = false

        responseErro.value = error.response.data.erro
        document.getElementById("response-erro")!.style.display = "flex"
    }
}

async function logout(): Promise<void> {
    try {
        await axios({
            method: 'post',
            url: 'https://apiminhamente.onrender.com/logout',
            headers: {
                'authorization': `Bearer ${storeLogin.token}`
            }
        })

        localStorage.removeItem("token")
        localStorage.removeItem("usuario")
        localStorage.removeItem("_links")
    } catch (error: any) {
        console.log(error);
        loading.value = false
        botaoDesativado.value = false

        responseErro.value = error.response.data.erro
        document.getElementById("response-erro")!.style.display = "flex"
    }
}
</script>

<style scoped>
#response-erro {
    display: none;
    color: red;
    margin-top: 5px;
}

.page-container {
    padding: 50px;
}

.mudar-senha-area {
    margin: auto;
    display: flex;
    padding: 20px;
    max-width: 500px;
    border-radius: 5px;
    align-items: center;
    flex-direction: column;
    background-color: #F5F5F5;
    box-shadow: 2px 2px 5px black;
}

.mudar-senha-form {
    width: 100%;
    text-align: left;
}

.mudar-senha-label {
    color: black;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
}

.senha-area {
    margin-bottom: 20px;
}

.botao-mudar-senha {
    width: 100%;
    padding: 5px;
    border: none;
    outline: none;
    color: white;
    cursor: pointer;
    font-size: 18px;
    font-weight: 700;
    border-radius: 5px;
    background-color: var(--verde);
}

.botao-mudar-senha:hover {
    background-color: #129b35;
}
</style>