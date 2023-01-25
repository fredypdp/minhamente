<template>
    <a href="">
        <div>
            <i :class="assunto.icone"></i>
            <span>{{ assunto.nome }}</span>
        </div>
    </a>
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
a {
    text-decoration: none;
}

a div i, a div span {
    font-size: 20px;
    font-weight: 700;
}

a div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px;
    border-radius: 5px;
    margin-bottom: 15px;
}

a div i {
    color: var(--verde);
}

a div span {
    color: black;
}

a div:hover {
    background-color: #ccc;
}
</style>