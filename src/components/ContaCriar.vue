<template>
    <div class="cadastro-area">
        <h1>Criar conta</h1>
        <div class="cadastro-form" >
            <div class="avatar-area">
                <label for="foto-cadastro" class="avatar-label">
                    <span v-if="!avatar">Escolha a sua foto de perfil</span>
                    <img :src="avatar" alt="" srcset="" class="avatar-label-img" draggable="false" v-else>
                </label>
                <input type="file" accept="image/png, image/jpeg" name="avatar" id="foto-cadastro" @change="ShowAvatar" ref="avatar" class="avatar-input">
            </div>
            <label for="cadastro-nome">Nome:</label>
            <input type="text" name="nome" id="cadastro-nome" autocomplete="off" placeholder="Digite o seu nome" required>
            <label for="cadastro-nome">Sobrenome:</label>
            <input type="text" name="sobrenome" id="cadastro-sobrenome" autocomplete="off" placeholder="Digite o seu sobrenome" required>
            <label for="cadastro-email">Email:</label>
            <span style="display: none;color: red; margin-bottom: 5px;" id="email-erro">O email já está cadastrado</span>
            <input type="email" name="email" id="cadastro-email" autocomplete="off" placeholder="Digite o seu email" required>
            <label for="cadastro-senha">Senha:</label>
            <input type="password" name="senha" minlength="8" id="cadastro-senha" autocomplete="off" placeholder="Digite a sua senha" required>
            <span style="display: none;color: red; margin-bottom: 5px;" id="senha-erro">A senha precisa ter no mínimo 8 caracteres</span>
            <div class="links-form">
                <router-link :to="{name: 'login'}"><span>Fazer login</span></router-link>
            </div>
            <button onclick="criar()" class="criar-conta-botao">Criar conta</button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            avatar: ""
        }
    },
    methods: {
        ShowAvatar(){
            const img = this.$refs.avatar.files[0]
            this.avatar = URL.createObjectURL(img);
        }
    }
}
</script>

<style scoped>
.cadastro-area {
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

.cadastro-area h1 {
    color: black;
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 20px;
}

.cadastro-form {
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

.avatar-label-img {
    width: 120px;
    height: 120px;    
    border-radius: 100%;
}

.cadastro-form label {
    color: black;
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 10px;
}

.cadastro-form input {
    width: 100%;
    padding: 5px;
    color: black;
    font-size: 20px;
    font-weight: 500;
    border-radius: 5px;
    border: 1px solid black;
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
}

.links-form span:hover {
    text-decoration: underline;
}

.cadastro-botoes {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.criar-conta-botao {
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

.criar-conta-botao:hover {
    background-color: #129b35;
}
</style>