<template>
    <div class="page-container">
        <div class="esqueci-senha-area">
            <form class="esqueci-senha-form" @submit.prevent="esqueciSenha">
                <label for="login-email" class="esqueci-senha-label">Seu email:</label>
                <input type="email" name="senha" id="nova-senha" autocomplete="off" placeholder="Digite o seu email" class="esqueci-senha-input" v-model="email">
                <input type="hidden" name="token" id="token" value="">
                <span style="display: none;color: green; margin-bottom: 5px;" id="sucesso">Senha alterada com sucesso</span>
                <span style="display: none;color: red; margin-bottom: 5px;" id="senha-erro">A senha precisa ter no mínimo 8 caracteres</span>
                <span style="display: none;color: red; margin-bottom: 5px;" id="token-erro">Token inválido ou inexistente!</span>
                <div class="links-form">
                    <router-link :to="{name: 'login'}"><span>Fazer login</span></router-link>
                </div>
                <span id="sucessoEsqueciSenha">{{ sucessoEsqueciSenha }}</span>
                <span id="erroEsqueciSenha">{{ erroEsqueciSenha }}</span>
                <button :disabled="botaoDesativado" type="submit" class="botao-esqueci-senha">
                    <div role="status" v-if="loading">
                        <svg aria-hidden="true" class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                    <span v-else>Enviar</span>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data(){
        return {
            loading: false,
            email: "",
            botaoDesativado: false,
            erroEsqueciSenha: "",
            sucessoEsqueciSenha: "",
        }
    },
    methods: {
        async esqueciSenha() {
            this.loading = true
            this.botaoDesativado = true
            document.getElementById("erroEsqueciSenha").style.display = "none"

            try {
                let config = {
                    method: 'post',
                    url: `https://apiminhamente.onrender.com/recuperarsenha/${this.email}`
                };

               let sucesso = await axios(config)
               this.sucessoEsqueciSenha = sucesso.data
               document.getElementById("sucessoEsqueciSenha").style.display = "flex"
               this.loading = false
               this.botaoDesativado = false
            } catch (erro) {
                console.log(erro);
                this.loading = false
                this.botaoDesativado = false

                this.erroEsqueciSenha = erro.response.data.erro
                document.getElementById("erroEsqueciSenha").style.display = "flex"
            }
        }
    }
}
</script>

<style scoped>
span {
    font-size: 1.6rem;
}

#sucessoEsqueciSenha {
    display: none;
    color: green;
    margin-top: 5px;
}

#erroEsqueciSenha {
    display: none;
    color: red;
    margin-top: 5px;
}
.page-container {
    padding: 50px;
}
.esqueci-senha-area {
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

.esqueci-senha-form {
    width: 100%;
    text-align: left;
}

.esqueci-senha-label {
    color: black;
    font-size: 2.6rem;
    font-weight: 700;
    margin-bottom: 10px;
}

.esqueci-senha-input {
    width: 100%;
    padding: 5px;
    color: black;
    font-size: 2rem;
    font-weight: 500;
    border-radius: 5px;
    border: 1px solid black;
    margin-bottom: 20px;
}

.links-form span {
    color: blue;
}

.links-form span:hover {
    text-decoration: underline;
}

.botao-esqueci-senha {
    width: 100%;
    padding: 5px;
    border: none;
    outline: none;
    color: white;
    cursor: pointer;
    font-size: 1.8rem;
    font-weight: 700;
    margin-top: 10px;
    border-radius: 5px;
    background-color: var(--verde);
}

.botao-esqueci-senha:hover {
    background-color: #129b35;
}
</style>