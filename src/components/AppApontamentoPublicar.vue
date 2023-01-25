<template>
    <section>
        <form class="publicar-area">
            <label for="titulo">Título:</label>
            <input type="text" name="titulo" id="titulo" placeholder="Título do apontamento" autocomplete="off" autofocus required>
            <label for="apontamento-conteudo">Conteúdo:</label>
            <textarea name="conteudo" id="apontamento-conteudo" placeholder="Digite o seu conteúdo" required></textarea>
            <span style="display: none;color: red; margin-bottom: 5px;" id="publicar-erro">Verifique se todos os campos foram preenchidos</span>
            <div class="botoes-area">
                <div class="botoes">
                    <BotaoSelecionar/>
                    <BotaoMiniatura/>
                </div>
                <button class="botao-publicar">Publicar</button>
            </div>
        </form>
    </section>
</template>

<script>
import BotaoSelecionar from "@/components/shared/BotaoSelecionar.vue";
import BotaoMiniatura from "@/components/shared/BotaoMiniatura.vue";
export default {
    components: {
        BotaoSelecionar,
        BotaoMiniatura,
    }
}
</script>

<style scoped>
section {
    width: 85%;
    max-width: 900px;
    margin-left: 60px;
}

.publicar-area {
    display: flex;
    flex-direction: column;
}

.publicar-area label[for="titulo"], .publicar-area label[for="miniatura"], .publicar-area label[for="apontamento-conteudo"] {
    color: black;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 15px;
}

.publicar-area input {
    width: 100%;
    height: 40px;
    color: black;
    font-size: 20px;
    font-weight: 500;
    padding: 15px 15px;
    border-radius: 5px;
    border: 1px solid black;
    margin-bottom: 30px;
}

.publicar-area .tox, .publicar-area #apontamento-conteudo {
    max-width: 900px;
    min-height: 500px;
    color: black;
    font-size: 20px;
    font-weight: 500;
    border-radius: 5px;
    resize: none;
    padding: 20px;
    margin-bottom: 25px;
}

.botoes-area {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.botoes {
    display: flex;
}

.botoes-publicar {
    width: 150px;
    height: 30px;
    padding: 5px 20px;
    border: none;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    background-color: var(--verde);
}

.botoes-publicar:hover {
    background-color: #129b35;
}
</style>