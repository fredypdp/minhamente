import { ref } from "vue";
import { defineStore } from "pinia";
import type { Assunto } from "@/types/types";

export const Home = defineStore('home', () => {
  // State
  const assuntoAtual = ref<string | undefined>(undefined)
  // Action
  const definirAssunto = (assunto: Assunto | undefined): void => {
    assuntoAtual.value = assunto ? assunto._id : undefined
  }
  
  return {
    assuntoAtual,
    definirAssunto
  }
})