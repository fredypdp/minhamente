import { defineStore } from 'pinia'
export const LoginStore = defineStore('login', {
// State
state(){
  return {
    token: JSON.parse(localStorage.getItem("token")),
    usuario: JSON.parse(localStorage.getItem("usuario")),
    _links: JSON.parse(localStorage.getItem("_links")),
  }
}
// Getters
})