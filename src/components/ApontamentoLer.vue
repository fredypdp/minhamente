<template>
    <section>
        <div class="apontamento-area">
            <div class="apontamento-titulo-area">
                <span class="apontamento-titulo">{{ apontamento.titulo }}</span>
            </div>
            <div class="apontamento-data-area">
                <span class="apontamento-data">Criado em: {{ formatarData(apontamento.created_at) }}</span>
                <span class="apontamento-data" v-if="apontamento.edited_at != undefined">Editado em: {{ formatarData(apontamento.edited_at) }}</span>
            </div>
            <div class="apontamento-conteudo-area" v-html="apontamento.conteudo"></div>
        </div>
        <span id="erro">{{ erro }}</span>
        <div class="botoes" v-if="LoginStore.usuario != undefined && LoginStore.usuario.role == 0">
            <BotaoApagar :loading="loadingApagar" @click="apagar(apontamento)"/>
            <BotaoEditar :loading="loadingEditar" @click="editar(apontamento)"/>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import { LoginStore } from "@/stores/LoginStore.js";
import BotaoApagar from "@/components/shared/BotaoApagar.vue";
import BotaoEditar from "@/components/shared/BotaoEditar.vue";
export default {
    components:{
        BotaoApagar,
        BotaoEditar
    },
    data() {
        return {
            apontamento: {},
            LoginStore: LoginStore(),
            loadingApagar: false,
            loadingEditar: false,
        }
    },
    beforeMount() {
        this.pegarApontamento()
    },
    methods: {
        formatarData(data) {
            if (data == undefined) {
                return
            }

            let opcoes = { month: 'long' };
            let mesFormatado = new Intl.DateTimeFormat('pt-BR', opcoes).format(new Date(data));
            let dataFormatada = `${new Date(data).getDate()} de ${mesFormatado} de ${new Date(data).getFullYear()}, às ${new Date(data).getHours()}:${new Date(data).getMinutes()}`
            
            return dataFormatada
        },
        async pegarApontamento() {
            let config = {
                method: 'get',
                url: 'https://apiminhamente.onrender.com/apontamento/'+this.$route.params.id
            };

            try {
                let apontamento = await axios(config)
                if(apontamento.data.apontamento != undefined) {
                    this.apontamento = apontamento.data.apontamento
                }
            } catch (erro) {
                console.log(erro);
                this.$router.push({name: "home"})
            }
        },
        async editar(apontamento) {
            this.loadingEditar = true
            this.$router.push({name: "ApontamentoEditar", params: {id: apontamento.id}})
        },
        async deletar(apontamento) {
            let deletar = confirm("Você tem certeza que deseja deletar esse apontamento?")
            this.loadingApagar = true

            if(deletar) {
                let config = {
                    method: 'delete',
                    url: 'https://apiminhamente.onrender.com/apontamento/'+apontamento.id,
                    headers: {
                        'authorization': `Bearer ${LoginStore().token}`
                    }
                };
    
                try {
                    await axios(config)
                    this.loadingApagar = false
                    this.$router.push({name: "home"})
                } catch (erro) {   
                    console.log(erro);
                    this.loadingApagar = false
                }
            }
        },
    },
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

@media (max-width: 1235px) {
    section {
        margin: 0px;
    }
}
</style>