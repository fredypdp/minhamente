<template>
    <div class="editar-area">
        <h1>Editar conta</h1>
        <form @submit.prevent="editar" class="editar-form" ref="form">
            <div class="avatar-area">
                <label for="foto-editar" class="avatar-label">
                    <div class="avatar-label-container" v-if="!avatarUrl">
                        <span >Escolha a sua foto de perfil</span>
                    </div>
                    <img :src="avatarUrl" alt="" srcset="" class="avatar-label-img" draggable="false" v-else>
                </label>
                <input type="file" accept="image/png,image/jpg,image/jpeg+xml" name="avatar" id="foto-editar" @change="ShowAvatar" ref="avatarRef" class="avatar-input">
            </div>
            <label for="editar-nome">Novo nome:</label>
            <input type="text" name="nome" id="editar-nome" autocomplete="off" placeholder="Digite o seu nome" v-model.trim.lazy="nome">
            <label for="editar-sobrenome">Novo sobrenome:</label>
            <input type="text" name="sobrenome" id="editar-sobrenome" autocomplete="off" placeholder="Digite o seu sobrenome" v-model.trim.lazy="sobrenome">
            <label for="editar-email">Novo email:</label>
            <input type="email" name="email" id="editar-email" autocomplete="off" placeholder="Digite o seu email" v-model.trim.lazy="email">
            <label for="editar-senha">Senha:</label>
            <SenhaInput @senha="definirSenha"/>
            <span id="erroEditar">{{ erroEditar }}</span>
            <div class="links-form">
                <span @click="esqueciSenha">Nova senha</span>
            </div>
            <span id="sucessoEsqueciSenha">{{ sucessoEsqueciSenha }}</span>
            <span id="erroEsqueciSenha">{{ erroEsqueciSenha }}</span>
            <button class="editar-conta-botao" :disabled="botaoDesativado" type="submit">
                <div role="status" v-if="loading">
                    <svg aria-hidden="true" class="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Carregando...</span>
                </div>
                <span v-else>Editar conta</span>
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Login } from "@/stores/Login";
import SenhaInput from "@/components/shared/SenhaInput.vue";

const router = useRouter()
const storeLogin = Login()

const sucessoEsqueciSenha = ref<string>("")
const erroEsqueciSenha = ref<string>("")
const erroEditar = ref<string>("")
const avatar = ref<any>(undefined)
const avatarUrl = ref<string>("")
const avatarRef = ref<any>()
const nome = ref<string>("")
const sobrenome = ref<string>("")
const email = ref<string>("")
const senha = ref<string>("")
const loading = ref<boolean>(false)
const botaoDesativado = ref<boolean>(false)

function definirSenha(novaSenha: string): void {
    senha.value = novaSenha
}

function ShowAvatar(): void {
    const img = avatarRef.value.files[0]
    avatar.value = img;
    avatarUrl.value = URL.createObjectURL(img);
}

async function editar(): Promise<void> {
    loading.value = true
    botaoDesativado.value = true
    document.getElementById("erroEditar")!.style.display = "none"

    const formData = new FormData();
    let id
    if (storeLogin.usuario) id = storeLogin.usuario.id
    let avatarValue = avatar.value
    let nomeValue = nome.value
    let sobrenomeValue = sobrenome.value
    let emailValue = email.value
    let senhaValue = senha.value

    if(id) formData.append('id', id);

    if (avatarValue != undefined) {
        formData.append('avatar', avatarValue);
    }
    
    if (nomeValue != undefined && nome.toString().trim().length > 0) {
        formData.append('nome', nomeValue);
    }
    
    if (sobrenomeValue != undefined && sobrenomeValue.trim().length > 0) {
        formData.append('sobrenome', sobrenomeValue);
    }
    
    if (emailValue != undefined && emailValue.trim().length > 0) {
        formData.append('email', emailValue);
    }
    
    if (senhaValue != undefined && senhaValue.trim().length > 0) {
        formData.append('senha', senhaValue);
    }
    
    try {
        // Editando
        let usuarioEditado: any = await axios.put("https://apiminhamente.onrender.com/usuario", formData, {headers: {
            'authorization': `Bearer ${storeLogin.token}`
        }})
        
        if (usuarioEditado.response != undefined && usuarioEditado.response.data.status == 406) {
            return
        }
        
        // Terminando a sessão no servidor
        await logout()

        // Fazendo login
        await login(usuarioEditado.data.usuario.email, senha.value)

        loading.value = false
        botaoDesativado.value = false
        router.go(0)
    } catch (error: any) {
        console.log(error);
        loading.value = false
        botaoDesativado.value = false

        erroEditar.value = error.response.data.erro
        document.getElementById("erroEditar")!.style.display = "flex"
    }
}

async function login(email: string, senha: string): Promise<void> {
    try {
        let { data } = await axios.post("https://apiminhamente.onrender.com/login", {email: email, senha: senha})
                            
        localStorage.setItem("token", JSON.stringify(data.token))
        localStorage.setItem("usuario", JSON.stringify(data.usuario))
        localStorage.setItem("_links", JSON.stringify(data._links))
    } catch (error: any) {
        console.log(error);
        loading.value = false
        botaoDesativado.value = false

        erroEditar.value = error.response.data.erro
        document.getElementById("erroEditar")!.style.display = "flex"
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

        erroEditar.value = error.response.data.erro
        document.getElementById("erroEditar")!.style.display = "flex"
    }
}

async function esqueciSenha(): Promise<void> {
    if (storeLogin.usuario) {
        try {
            let config = {
                method: 'post',
                url: `https://apiminhamente.onrender.com/recuperarsenha/${storeLogin.usuario.email}`
            };
    
            let sucesso = await axios(config)
            sucessoEsqueciSenha.value = sucesso.data
            document.getElementById("sucessoEsqueciSenha")!.style.display = "flex"
        } catch (error: any) {
            console.log(error);
            
            erroEsqueciSenha.value = error.response.data.erro
            document.getElementById("erroEsqueciSenha")!.style.display = "flex"
        }
    }
}
</script>

<style scoped>
#sucessoEsqueciSenha {
    display: none;
    color: green;
    margin-bottom: 5px;
}

#erroEsqueciSenha {
    display: none;
    color: red;
    margin-bottom: 5px;
}

#erroEditar {
    display: none;
    color: red;
    margin-bottom: 5px;
}

.editar-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 500px;
    margin: auto;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 2px 2px 5px black;
    background-color: #F5F5F5;
}

.editar-area h1 {
    color: black;
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 20px;
}

.editar-form {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
}

.avatar-area {
    width: 100%;
    display: flex;
    justify-content: center;
}

.avatar-input {
    display: none;
}

.avatar-label {
    width: 120px;
    height: 120px;
    border: none;
    outline: none;
    cursor: pointer;
    text-align: center;
    border-radius: 100%;
    background-color: var(--azul);
}

.avatar-label span {
    color: white;
    font-size: 18px;
}

.avatar-label:hover {
    background-color: #124194;
}
.avatar-label-container {
    padding: 5px;
}

.avatar-label-img {
    width: 120px;
    height: 120px;    
    border-radius: 100%;
}

.editar-form label {
    color: black;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
}

.editar-form input {
    width: 100%;
    padding: 5px;
    color: black;
    font-size: 20px;
    font-weight: 500;
    border-radius: 5px;
    border: 1px solid black;
    margin-bottom: 20px;
}

.senha-area {
    margin-bottom: 20px;
}

.links-form {
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
}

.links-form span {
    color: blue;
    cursor: pointer;
}

.links-form span:hover {
    text-decoration: underline;
}

.cadastro-botoes {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.editar-conta-botao {
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

.editar-conta-botao:hover {
    background-color: #129b35;
}
</style>