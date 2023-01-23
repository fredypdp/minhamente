import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ApontamentoView from '../views/ApontamentoView.vue'

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView
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
