<template>
<div id="perfil-view">
    <AppNavBar/>
    <div class="container-box">
        <div class="perfil-container">
            <div class="cartao-usuario-mobile">
                <img :src="LoginStoreUsar.usuario.avatar" draggable="false" class="foto-perfil">
                <h1 class="nome-usuario">{{ LoginStoreUsar.usuario.nome }} {{ LoginStoreUsar.usuario.sobrenome }}</h1>
                <span class="email-usuario">{{ LoginStoreUsar.usuario.email }}</span>
                <button class="botao-sair" :disabled="botaoSairDesativado" type="button" @click="logout">Terminar sessão</button>
                <button class="botao-deletar-conta" :disabled="botaoDeletarDesativado" type="button" @click="eliminarConta">Eliminar conta</button>
                <input type="hidden" name="id" value="" id="id">
                <input type="hidden" name="email" value="" id="del-email">
                <span style="display: none;color: green; margin-bottom: 5px;" id="sucesso">Enviamos um email com o link de verificação para você</span>
                <span style="display: none;color: red; margin-bottom: 5px;" id="email-erro">Não existe uma conta com esse email</span>
            </div>
            <div class="editar">
                <ContaEditar/>
            </div>
            <div class="cartao-area">
                <div class="cartao-usuario">
                    <img :src="LoginStoreUsar.usuario.avatar" draggable="false" class="foto-perfil">
                    <h1 class="nome-usuario">{{ LoginStoreUsar.usuario.nome }} {{ LoginStoreUsar.usuario.sobrenome }}</h1>
                    <span class="email-usuario">{{ LoginStoreUsar.usuario.email }}</span>
                    <button class="botao-sair" :disabled="botaoSairDesativado" type="button" @click="logout">
                        <div role="status" v-if="loadingLogout">
                            <svg aria-hidden="true" class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Carregando...</span>
                        </div>
                        <span v-else>Terminar sessão</span>
                    </button>
                    <button class="botao-deletar-conta" :disabled="botaoDeletarDesativado" type="button" @click="eliminarContaEmail">
                        <div role="status" v-if="loadingEliminarConta">
                            <svg aria-hidden="true" class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Carregando...</span>
                        </div>
                        <span v-else>Eliminar conta</span>
                    </button>
                    <input type="hidden" name="id" value="" id="id">
                    <input type="hidden" name="email" value="" id="del-email">
                    <span id="response-sucesso">{{ responseSucesso}}</span>
                    <span id="response-erro">{{ responseErro }}</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import { LoginStore } from "@/stores/LoginStore.js";
import ContaEditar from "@/components/ContaEditar.vue";
import AppNavBar from "@/components/shared/AppNavBar.vue";
export default {
    components: {
        AppNavBar,
        ContaEditar,
    },
    data(){
        return {
            loadingLogout: false,
            botaoSairDesativado: false,
            botaoDeletarDesativado: false,
            loadingEliminarConta: false,
            responseErro: "",
            responseSucesso: "",
            LoginStoreUsar: LoginStore(),
        }
    },
    beforeCreate() {
        document.title = `${LoginStore().usuario.nome} ${LoginStore().usuario.sobrenome} - MinhaMente`
    },
    methods: {
        async logout(){
            this.loadingLogout = true
            this.botaoSairDesativado = true

            let config = {
                method: 'post',
                url: 'https://apiminhamente.onrender.com/logout',
                headers: {
                    'authorization': `Bearer ${LoginStore().token}`
                }
            };
    
            try {
                await axios(config)

                localStorage.removeItem("token")
                localStorage.removeItem("usuario")
                localStorage.removeItem("_links")

                this.loadingLogout = false
                this.botaoSairDesativado = false
                this.$router.go(0)
            } catch (erro) {
                console.log(erro);
                
                this.responseErro = erro.response.data.erro
                document.getElementById("response-erro").style.display = "flex"
                
                this.loadingLogout = false
                this.botaoSairDesativado = false
            }
        },
        async eliminarContaEmail(){
            let eliminar = confirm("Enviar email de deleção de conta?")
            
            if(eliminar) {
                this.loadingEliminarConta = true
                this.botaoDeletarDesativado = true

                let config = {
                    method: 'post',
                    url: `https://apiminhamente.onrender.com/usuario/${LoginStore().usuario.id}/${LoginStore().usuario.email}`,
                    headers: {
                        'authorization': `Bearer ${LoginStore().token}`
                    }
                };

                try {
                    let sucesso = await axios(config)
                    this.responseSucesso = sucesso.data
                    document.getElementById("response-sucesso").style.display = "flex"
                    this.loadingEliminarConta = false
                    this.botaoDeletarDesativado = false
                } catch (erro) {
                    console.log(erro);
                    this.loadingEliminarConta = false
                    this.botaoDeletarDesativado = false
                    
                    this.responseErro = erro.response.data.erro
                    document.getElementById("response-erro").style.display = "flex"
                    
                }
            }
        }
    },
    beforeRouteEnter(to, from, next){
        if(LoginStore().usuario == undefined){
            next({name: "home"})
            return
        }
        
        next()
    }
}
</script>

<style scoped>
#perfil-view {
    padding-bottom: 50px;
}

#response-sucesso {
    display: none;
    color: green;
    margin-top: 5px;
}

#response-erro {
    display: none;
    color: red;
    margin-top: 5px;
}

.perfil-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.perfil-container button {
    cursor: pointer;
}

.editar {
    flex: 1;
}

.cartao-usuario-mobile {
    display: none;
}

.cartao-area {
    flex: 1;
}

.cartao-usuario{
    margin: auto;
    display: flex;
    padding: 30px;
    max-width: 400px;
    border-radius: 5px;
    align-items: center;
    flex-direction: column;
    box-shadow: 2px 2px 10px black;
}

.cartao-usuario-mobile{
    display: none;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    padding: 30px;
    border-radius: 5px;
    margin-bottom: 30px;
    box-shadow: 2px 2px 10px black;
}

.foto-perfil {
    width: 180px;
    height: 180px;
    margin-bottom: 20px;
    border-radius: 50%;
    background-color: var(--azul);
}

.nome-usuario {
    color: black;
    font-size: 3.2rem;
    font-weight: 700;
    margin-bottom: 20px;
}

.email-usuario {
    color: black;
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 90px;   
}

.botao-sair {
    width: 100%;
    padding: 5px;
    outline: none;
    color: white;
    font-size: 2rem;
    font-weight: 700;
    border-radius: 5px;
    background-color: var(--azul);
}

.botao-sair:hover {
    background-color: #124194;
}

.botao-deletar-conta {
    width: 100%;
    padding: 5px;
    outline: none;
    color: white;
    margin-top: 10px;
    font-size: 2rem;
    font-weight: 700;
    border-radius: 5px;
    background-color: red;
}

.botao-deletar-conta:hover {
    background-color: rgb(185, 0, 0);
}

@media (max-width: 390px) {
    .perfil-container {
        display: flex;
        flex-direction: column;
    }

    .cartao-usuario {
        display: none;
    }
    
    .cartao-usuario-mobile{
        display: flex;
    }
}
</style>