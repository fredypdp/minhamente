import { createRouter, createWebHistory } from 'vue-router'
import { LoginStore } from "@/stores/LoginStore.js";

import HomeView from '@/views/HomeView.vue'
import PesquisaView from '@/views/PesquisaView.vue'
// Conta
import LoginView from '@/views/LoginView.vue'
import CriarContaView from '@/views/CriarContaView.vue'
import NovaSenhaView from '@/views/NovaSenhaView.vue'
import DeletarContaView from '@/views/DeletarContaView.vue'
import EsqueciSenhaView from '@/views/EsqueciSenhaView.vue'
// Perfil
import PerfilView from '@/views/PerfilView.vue'
import PainelView from '@/views/adm/PainelView.vue'
// Apontamento
import ApontamentoView from '@/views/ApontamentoView.vue'
import ApontamentoPublicarView from '@/views/adm/apontamentos/ApontamentoPublicarView.vue'
import ApontamentoEditarView from '@/views/adm/apontamentos/ApontamentoEditarView.vue'
// Assunto
import AssuntoCriarView from '@/views/adm/assuntos/AssuntoCriarView.vue'
import AssuntoEditarView from '@/views/adm/assuntos/AssuntoEditarView.vue'
// Tema
import TemaCriarView from '@/views/adm/temas/TemaCriarView.vue'
import TemaEditarView from '@/views/adm/temas/TemaEditarView.vue'
// Painel
import PainelTemas from '@/components/PainelTemas.vue'
import PainelAssuntos from '@/components/PainelAssuntos.vue'
import PainelUsuarios from '@/components/PainelUsuarios.vue'
import PainelApontamentos from '@/components/PainelApontamentos.vue'

const routes = [
  {
    name: "pesquisa",
    meta: {title: ''},
    path: "/resultados",
    component: PesquisaView,
  },
  {
    name: "perfil",
    path: "/perfil",
    meta: {title: ''},
    component: PerfilView,
  },
  {
    path: "/painel", // Adm
    component: PainelView,
    children: [
      {path: "temas", name: "PainelTemas", component: PainelTemas, meta: {title:'Painel: Temas - MinhaMente'}},
      {path: "assuntos", name: "PainelAssuntos", component: PainelAssuntos, meta: {title: 'Painel: Assuntos - MinhaMente'}},
      {path: "usuarios", name: "PainelUsuarios", component: PainelUsuarios, meta: {title: 'Painel: Usuários - MinhaMente'}},
      {path: "apontamentos", name: "PainelApontamentos", component: PainelApontamentos, meta: {title: 'Painel: Apontamentos - MinhaMente'}},
      {path: "", name: "painel", component: PainelApontamentos, meta: {title: 'Painel - MinhaMente'}}
    ],
    beforeEnter(to, from, next) {
      if(LoginStore().usuario == undefined || LoginStore().usuario.role != 0){
        next({name: "home"})
        return
      }
      
      next()
    },
  },
  {
    path: "/ler/:id",
    meta: {title: ''},
    name: "ApontamentoLer",
    component: ApontamentoView,
  },
  {
    path: "/apontamento", // Adm
    children: [
      {path: "publicar", name: "ApontamentoPublicar", component: ApontamentoPublicarView, meta: {title: 'Publicar Apontamento - MinhaMente'}},
      {path: "editar/:id", name: "ApontamentoEditar", component: ApontamentoEditarView, meta: {title: 'Editar Apontamento - MinhaMente'}},
    ],
    beforeEnter(to, from, next) {
      if(LoginStore().usuario == undefined || LoginStore().usuario.role != 0){
        next({name: "home"})
        return
      }
      
      next()
    },
  },
  {
    path: "/assunto", // Adm
    children: [
      {path: "criar", name: "AssuntoCriar", component: AssuntoCriarView, meta: {title: 'Criar assunto - MinhaMente'}},
      {path: "editar/:id", name: "AssuntoEditar", component: AssuntoEditarView, meta: {title: 'Editar assunto - MinhaMente'}},
    ],
    beforeEnter(to, from, next) {
      if(LoginStore().usuario == undefined || LoginStore().usuario.role != 0){
        next({name: "home"})
        return
      }
      
      next()
    },
  },
  {
    path: "/tema", // Adm
    children: [
        {path: "criar", name: "TemaCriar", component: TemaCriarView, meta: {title: 'Criar tema - MinhaMente'}},
        {path: "editar/:id", name: "TemaEditar", component: TemaEditarView, meta: {title: 'Editar tema - MinhaMente'}},
    ],
    beforeEnter(to, from, next) {
      if(LoginStore().usuario == undefined || LoginStore().usuario.role != 0){
        next({name: "home"})
        return
      }
      
      next()
    },
  },
  {
    path: "/auth",
    children: [
        {path: "login", name: "login", component: LoginView, meta: {title: 'Fazer login'}},
        {path: "criarconta", name: "CriarConta", component: CriarContaView, meta: {title: 'Criar Conta'}},
        {path: "novasenha/:token", name: "NovaSenha", component: NovaSenhaView, meta: {title: 'Definir nova senha'}},
        {path: "esquecisenha", name: "EsqueciSenha", component: EsqueciSenhaView, meta: {title: 'Esqueci a senha'}},
        {path: "deletarconta/:token", name: "DeletarConta", component: DeletarContaView, meta: {title: 'Deletar minha conta'}},
        // Redirecionamentos
        {path: "/login", redirect: {name: "login"}},
        {path: "/signup", redirect: {name: "CriarConta"}},
        {path: "/criarconta", redirect: {name: "CriarConta"}},
        {path: "/novasenha/:token", redirect: {name: "NovaSenha"}},
        {path: "/esquecisenha", redirect: {name: "EsqueciSenha"}},
        {path: "/deletarconta/:token", redirect: {name: "DeletarConta"}},
      ]
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/"
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active-link",
  routes
})

export default router
