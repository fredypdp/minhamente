<template>
<div>
    <AppNavBar/>
    <div class="container-box">
        <div class="perfil-container">
            <div class="cartao-usuario-mobile">
                <img src="" draggable="false" class="foto-perfil">
                <h1 class="nome-usuario">Nome do usuário</h1>
                <span class="email-usuario">emaildousuario@???.com</span>
                <button class="botao-sair">Terminar sessão</button>
                <button class="botao-deletar-conta">Eliminar conta</button>
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
                    <img src="" draggable="false" class="foto-perfil">
                    <h1 class="nome-usuario">Nome do usuário</h1>
                    <span class="email-usuario">emaildousuario@???.com</span>
                    <button class="botao-sair">Terminar sessão</button>
                    <button class="botao-deletar-conta">Eliminar conta</button>
                    <input type="hidden" name="id" value="" id="id">
                    <input type="hidden" name="email" value="" id="del-email">
                    <span style="display: none;color: green; margin-bottom: 5px;" id="sucesso">Enviamos um email com o link de verificação para você</span>
                    <span style="display: none;color: red; margin-bottom: 5px;" id="email-erro">Não existe uma conta com esse email</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import AppNavBar from "@/components/shared/AppNavBar.vue";
import ContaEditar from "@/components/ContaEditar.vue";
export default {
    components: {
        AppNavBar,
        ContaEditar,
    }
}
</script>

<style scoped>
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
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 20px;
}

.email-usuario {
    color: black;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 90px;   
}

.botao-sair {
    padding: 5px;
    outline: none;
    color: white;
    font-size: 15px;
    font-weight: 700;
    border-radius: 5px;
    background-color: var(--azul);
}

.botao-sair:hover {
    background-color: #124194;
}

.botao-deletar-conta {
    padding: 5px;
    outline: none;
    color: white;
    margin-top: 10px;
    font-size: 15px;
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