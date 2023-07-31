<template>
    <div class="apontamento">
        <div class="miniatura-area skeleton">
            <img class="apontamento-miniatura">
        </div>
        <div class="titulo-area skeleton">
        </div>
    </div>
</template>
<style scoped>
.apontamento {
    display: flex;
    width: 24%;
    height: 100vh;
    max-width: 360px;
    max-height: 245px;
    margin: 0px 6.5px 30px;
    flex-direction: column;
}

.miniatura-area {
    width: 100%;
    height: 80%;
    border-radius: 10px;
}

.apontamento-miniatura {
    width: 100%;
    height: 100%;
    border-radius: 10px;
}

.titulo-area {
  height: 20%;
  margin-top: 5px;
  border-radius: 5px;
}
.apontamento-titulo {
    color: black;
    font-size: 2rem;
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

@media (max-width: 1392px) {
.apontamento {
    width: 32%;
    max-width: 374px;
    max-height: 300px;
}
}

@media (max-width: 1025px) {
.apontamento {
    width: 48%;
    max-width: 460px;
    max-height: 360px;
}
}

@media (max-width: 1025px) {
.apontamento {
    width: 48%;
    max-width: none;
}
}

@media (max-width: 700px) {
.apontamento {
    width: 100%;
    max-width: 635px;
    max-height: 390px;
}
}
</style>