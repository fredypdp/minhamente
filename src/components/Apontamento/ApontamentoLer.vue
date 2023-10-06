<template>
    <section v-if="apontamento">
        <div class="apontamento-area">
            <div class="apontamento-titulo-area">
                <span class="apontamento-titulo">{{ apontamento.titulo }}</span>
            </div>
            <div class="apontamento-data-area">
                <span class="apontamento-data" v-if="apontamento.created_at">Criado em: {{ formatarData(apontamento.created_at) }}</span>
                <span class="apontamento-data" v-if="apontamento.edited_at">Editado em: {{ formatarData(apontamento.edited_at) }}</span>
            </div>
            <div class="apontamento-conteudo-area" v-html="apontamento.conteudo"></div>
        </div>
        <!-- <span id="erro">{{ erro }}</span> -->
        <div class="botoes" v-if="storeLogin.usuario != undefined && storeLogin.usuario.role == 0">
            <BotaoApagar :botaoDesativado="botaoDesativado" :loading="loadingApagar" @click="deletar(apontamento)"/>
            <BotaoEditar :loading="loadingEditar" @click="editar(apontamento)"/>
        </div>
    </section>
</template>
  
<script setup lang="ts">
import axios from "axios";
import { Login } from "@/stores/Login";
import { ref, onBeforeMount } from "vue";
import type { Apontamento } from "@/types/types";
import { useRoute, useRouter } from "vue-router";
import BotaoApagar from "@/components/shared/BotaoApagar.vue";
import BotaoEditar from "@/components/shared/BotaoEditar.vue";

const route = useRoute();
const router = useRouter();
let apontamento = ref<Apontamento>();
const storeLogin = Login();
const loadingApagar = ref(false);
const loadingEditar = ref(false);
const botaoDesativado = ref(false);

onBeforeMount(async (): Promise<void> => {
    await pegarApontamento();
});

function formatarData(data: string | undefined): string | undefined {
    if (data == undefined) {
        return;
    }

    let mesFormatado = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date(data));
    let dataFormatada = `${new Date(data).getDate()} de ${mesFormatado} de ${new Date(data).getFullYear()}, às ${formatarNumero(new Date(data).getHours())}:${formatarNumero(new Date(data).getMinutes())}`;

    return dataFormatada;
}

function formatarNumero(numero: number): string {
    if (numero < 10) {
        return "0" + numero;
    }

    return numero.toString();
}

async function pegarApontamento() {
    let config = {
        method: 'get',
        url: 'https://apiminhamente.onrender.com/apontamento/' + route.params.id
    };

    try {
        let { data } = await axios(config);

        apontamento.value = data.apontamento;
        document.title = `${data.apontamento.titulo} - MinhaMente`;
    } catch (error) {
        console.log(error);
        router.push({ name: "home" });
    }
}

async function editar(apontamento: any) {
    loadingEditar.value = true;
    router.push({ name: "ApontamentoEditar", params: { id: apontamento.id } });
}

async function deletar(apontamento: any) {
    let deletar = confirm("Você tem certeza que deseja deletar esse apontamento?");

    if (deletar) {
        loadingApagar.value = true;
        botaoDesativado.value = true;

        let config = {
            method: 'delete',
            url: 'https://apiminhamente.onrender.com/apontamento/' + apontamento.id,
            headers: {
                'authorization': `Bearer ${storeLogin.token}`
            }
        };

        try {
            await axios(config);
            loadingApagar.value = false;
            botaoDesativado.value = false;
            router.push({ name: "home" });
        } catch (error) {
            console.log(error);
            loadingApagar.value = false;
            botaoDesativado.value = false;
        }
    }
}
</script>
  

<style scoped>
#erro {
    display: none;
    color: red;
    margin-bottom: 5px;
}

section {
    flex: 1;
    width: 100%;
    margin-left: 60px;
    padding-bottom: 50px;
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
    word-break: break-word;
    border: 2px solid #ebf2f7;
}

.botoes {
    width: 165px;
    display: flex;
    margin-top: 15px;
    justify-content: space-between;
}

@media (max-width: 1235px) {
    section {
        margin: 0px;
    }
}
</style>