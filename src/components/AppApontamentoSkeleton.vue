<template>
    <div class="apontamento">
        <div class="miniatura-area skeleton">
            <img lass="apontamento-miniatura">
        </div>
        <div class="titulo-area skeleton">
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.apontamento {
    display: flex;
    width: 24%;
	max-width: 340px;
    min-width: 340px;
    margin: 0px 6.5px;
    margin-bottom: 30px;
    flex-direction: column;
}

.miniatura-area {
    width: 100%;
    height: calc(225px * 0.84);
    border-radius: 10px;
}

.apontamento-miniatura {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: var(--azul);
}

/* .titulo-area {
    height: 30px;
    margin-top: 5px;
    border-radius: 5px;
} */
.apontamento-titulo {
    color: black;
    font-size: 20px;
    font-weight: 500;
}

.skeleton {
  animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(0, 0%, 60%);
  }
  100% {
    background-color: hsl(0, 0%, 45%);
  }
}

@media (max-width: 375px) {
.apontamento {
  min-width: 270px;
  flex-direction: column;
  margin: 0px 0px 30px 0px;
}

.miniatura-area {
  height: 170px;
}
}
</style>