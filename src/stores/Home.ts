import { defineStore } from "pinia";
import { ref } from "vue";

export const Home = defineStore('home', () => {
  // State
  const assuntoAtual = ref(undefined)
  // Action
  const definirAssunto = (assunto) => {
    assuntoAtual.value = assunto._id
  }
  
  return {
    assuntoAtual,
    definirAssunto
  }
})