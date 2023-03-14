<template>
    <div class="assunto">
        <i :class="assunto.icone"></i>
        <span class="assunto-nome">{{ assunto.nome }}</span>
    </div>
</template>

<script>
export default {
    props: {
        assunto: {
            type: Object,
            require: true
        }
    }
}
</script>

<style scoped>
.assunto {
    width: 100%;
    height: 40px;
    padding: 5px;
    display: flex;
    cursor: pointer;
    border-radius: 5px;
    margin-bottom: 15px;
    align-items: center;
    background-color: var(--azul);
}

.assunto:last-child {
    margin-bottom: 0px;
}

.assunto:hover {
    background-color: var(--azul-escuro);
}

.assunto i, .assunto-nome {
    font-size: 20px;
    font-weight: 700;
}

.assunto i {
    color: var(--verde);
}

.assunto-nome {
    color: white;
    overflow: hidden;
    text-align: left;
    margin-left: 10px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; 
    -webkit-box-orient: vertical;
}
</style>