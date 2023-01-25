import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import PerfilView from '../views/PerfilView.vue'
import ApontamentoView from '../views/ApontamentoView.vue'
import ApontamentoPublicarView from '../views/adm/apontamentos/ApontamentoPublicarView.vue'

const routes = [
  {
    path: "/perfil",
    name: "perfil",
    component: PerfilView
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
  {
    path: "/apontamento/publicar",
    name: "ApontamentoPublicar",
    component: ApontamentoPublicarView
  },
  {
    path: "/apontamento/:id/:slug",
    name: "apontamento",
    component: ApontamentoView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
