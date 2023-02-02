<template>
    <section>
        <div class="apontamento-area">
            <div class="apontamento-titulo"></div>
            <span class="apontamento-data">Publicado em</span>
            <div class="apontamento-conteudo" ></div>

            <div style="display: inline;">
                <BotaoApagar/>
                <input type="hidden" name="id" id="id" value="">
                <BotaoEditar/>
            </div>
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

@media (max-width: 390px) {
    section {
        margin: 0px;
    }
}
</style>