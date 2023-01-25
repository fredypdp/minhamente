<template>
    <section>
        <div class="apontamento-area">
            <div class="apontamento-titulo"></div>
            <span class="apontamento-data">Publicado em</span>
            <div class="apontamento-conteudo" ></div>

            <div style="display: inline;">
                <button class="botao-apagar" type="submit">Deletar</button>
                <input type="hidden" name="id" id="id" value="">
                <a href="" class="botao-editar">Editar</a>
            </div>
        </div>
    </section>
</template>

<script>
export default {

}
</script>

<style scoped>
section {
    width: 85%;
    max-width: 900px;
    margin-left: 60px;
}

.apontamento-area {
    display: flex;
    flex-direction: column;
}

.apontamento-titulo {
    color: black;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 5px;
}

.apontamento-data {
    color: black;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 15px;
}

.apontamento-conteudo {
    max-width: 900px;
    min-height: 500px;
    padding: 10px;
    border: 2px solid black;
    border-radius: 5px;
    margin-bottom: 50px;
    overflow-wrap: break-word;
}

.apontamento-conteudo * {
    color: black;
}

.botao-apagar {
    width: 90px;
    height: 30px;
    color: white;
    font-size: 15px;
    font-weight: 700;
    padding: 5px 15px;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: red;
}

.botao-apagar:hover {
    background-color: rgb(185, 0, 0);
}

.botao-editar {
    width: 90px;
    height: 30px;
    color: white;
    font-size: 15px;
    font-weight: 700;
    padding: 5px 15px;
    margin-left: 30px;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: var(--azul);
}

.botao-editar:hover {
    background-color: #124194;
}
</style>