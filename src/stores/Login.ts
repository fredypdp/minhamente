import { ref } from "vue";
import { defineStore } from "pinia";
import type { Usuario2 } from "@/types/types";

export const Login = defineStore('login', () => {
// State
  const token = ref(undefined)

  token.value = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null;
  let usuario: Usuario2["usuario"] | null = localStorage.getItem("usuario") ? JSON.parse(localStorage.getItem("usuario")!) : null;
  let _links: Usuario2["_links"] | null = localStorage.getItem("_links") ? JSON.parse(localStorage.getItem("_links")!) : null;

  return { token, usuario, _links}
})