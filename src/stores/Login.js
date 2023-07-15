import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const Login = defineStore('login', () => {
// State
  const token = ref(undefined)

  token.value = JSON.parse(localStorage.getItem("token"))
  const usuario = JSON.parse(localStorage.getItem("usuario"))
  const _links = JSON.parse(localStorage.getItem("_links"))

return {
  token,
  usuario,
  _links,
}
})