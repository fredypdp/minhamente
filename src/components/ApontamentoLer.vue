<template>
    <section>
        <div class="apontamento-area">
            <div class="apontamento-titulo-area">
                <span class="apontamento-titulo">Título do apontamento</span>
            </div>
            <div class="apontamento-data-area">
                <span class="apontamento-data">Publicado em: 2 de setembro de 2000</span>
                <span class="apontamento-data">Editado em: 2 de setembro de 2000</span>
            </div>
            <div class="apontamento-conteudo-area"></div>
        </div>
        <div class="botoes">
            <BotaoApagar/>
            <BotaoEditar/>
        </div>
    </section>
</template>

<script>
import BotaoApagar from "@/components/shared/BotaoApagar.vue";
import BotaoEditar from "@/components/shared/BotaoEditar.vue";
export default {
    components:{
        BotaoApagar,
        BotaoEditar
    }
}
</script>

<style scoped>
section {
    flex: 1;
    max-width: 1000px;
    margin-left: 60px;
}

.apontamento-area {
    display: flex;
    flex-direction: column;
}

.apontamento-titulo-area {
    text-align: justify;
}

.apontamento-titulo {
    color: black;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 5px;
}

.apontamento-data-area {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.apontamento-data {
    color: black;
    font-size: 16px;
    font-weight: 500;
}

.apontamento-conteudo-area {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 2px solid #ebf2f7;
}

/* .apontamento-conteudo * {
    color: black;
} */

.botoes {
    width: 165px;
    display: flex;
    margin-top: 15px;
    justify-content: space-between;
}

@media (max-width: 390px) {
    section {
        margin: 0px;
    }
}
</style>