let usuario = JSON.parse(localStorage.getItem("usuario"))
import { createRouter, createWebHistory } from "vue-router";

const HomeView = () => import(/*webpackChunckName: "home"*/"@/views/HomeView.vue");
const PesquisaView = () => import(/*webpackChunckName: "pesquisa"*/"@/views/PesquisaView.vue");
// Conta
const LoginView = () => import(/*webpackChunckName: "conta"*/"@/views/LoginView.vue");
const CriarContaView = () => import(/*webpackChunckName: "conta"*/"@/views/CriarContaView.vue");
const NovaSenhaView = () => import(/*webpackChunckName: "conta"*/"@/views/NovaSenhaView.vue");
const DeletarContaView = () => import(/*webpackChunckName: "conta"*/"@/views/DeletarContaView.vue");
const EsqueciSenhaView = () => import(/*webpackChunckName: "conta"*/"@/views/EsqueciSenhaView.vue");
// Perfil
const PerfilView = () => import(/*webpackChunckName: "perfil"*/"@/views/PerfilView.vue");
const PainelView = () => import(/*webpackChunckName: "perfil"*/"@/views/adm/PainelView.vue");
// Apontamento
const ApontamentoView = () => import(/*webpackChunckName: "apontamento"*/"@/views/ApontamentoView.vue");
const ApontamentoPublicarView = () => import(/*webpackChunckName: "apontamento"*/"@/views/adm/apontamentos/ApontamentoPublicarView.vue");
const ApontamentoEditarView = () => import(/*webpackChunckName: "apontamento"*/"@/views/adm/apontamentos/ApontamentoEditarView.vue");
// Assunto
const AssuntoCriarView = () => import(/*webpackChunckName: "assunto"*/"@/views/adm/assuntos/AssuntoCriarView.vue");
const AssuntoEditarView = () => import(/*webpackChunckName: "assunto"*/"@/views/adm/assuntos/AssuntoEditarView.vue");
// Tema
const TemaCriarView = () => import(/*webpackChunckName: "tema"*/"@/views/adm/temas/TemaCriarView.vue");
const TemaEditarView = () => import(/*webpackChunckName: "tema"*/"@/views/adm/temas/TemaEditarView.vue");
// Painel
const PainelTemas = () => import(/*webpackChunckName: "painel"*/"@/components/PainelTemas.vue");
const PainelAssuntos = () => import(/*webpackChunckName: "painel"*/"@/components/PainelAssuntos.vue");
const PainelUsuarios = () => import(/*webpackChunckName: "painel"*/"@/components/PainelUsuarios.vue");
const PainelApontamentos = () => import(/*webpackChunckName: "painel"*/"@/components/PainelApontamentos.vue");

function deslogado(to, from, next) {
  if (usuario != null || undefined) {
    next({name: "home"})
    return
  }

  next()
}

function logado(to, from, next) {
  if (usuario == null || undefined) {
    next({name: "home"})
    return
  }

  next()
}

function logadoAdm(to, from, next) {
  if (usuario == null || undefined) {
    next({name: "home"})
    return
  }
  
  if (usuario.role != 0) {
    next({name: "home"})
    return
  }

  next()
}

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
    meta: {title: 'Minha Conta'},
    component: PerfilView,
    beforeEnter(to, from, next) {
      logado(to, from, next)
    },
  },
  {
    path: "/painel", // Adm
    component: PainelView,
    beforeEnter(to, from, next) {
      logadoAdm(to, from, next)
    },
    children: [
      {path: "temas", name: "PainelTemas", component: PainelTemas, meta: {title:'Painel: Temas - MinhaMente'}},
      {path: "assuntos", name: "PainelAssuntos", component: PainelAssuntos, meta: {title: 'Painel: Assuntos - MinhaMente'}},
      {path: "usuarios", name: "PainelUsuarios", component: PainelUsuarios, meta: {title: 'Painel: Usuários - MinhaMente'}},
      {path: "apontamentos", name: "PainelApontamentos", component: PainelApontamentos, meta: {title: 'Painel: Apontamentos - MinhaMente'}},
      {path: "", name: "painel", component: PainelApontamentos, meta: {title: 'Painel - MinhaMente'}}
    ]
  },
  {
    path: "/ler/:id",
    meta: {title: ''},
    name: "ApontamentoLer",
    component: ApontamentoView
  },
  {
    path: "/apontamento", // Adm
    beforeEnter(to, from, next) {
      logadoAdm(to, from, next)
    },
    children: [
      {path: "publicar", name: "ApontamentoPublicar", component: ApontamentoPublicarView, meta: {title: 'Publicar Apontamento - MinhaMente'}},
      {path: "editar/:id", name: "ApontamentoEditar", component: ApontamentoEditarView, meta: {title: 'Editar Apontamento - MinhaMente'}},
    ]
  },
  {
    path: "/assunto", // Adm
    beforeEnter(to, from, next) {
      logadoAdm(to, from, next)
    },
    children: [
      {path: "criar", name: "AssuntoCriar", component: AssuntoCriarView, meta: {title: 'Criar assunto - MinhaMente'}},
      {path: "editar/:id", name: "AssuntoEditar", component: AssuntoEditarView, meta: {title: 'Editar assunto - MinhaMente'}},
    ]
  },
  {
    path: "/tema", // Adm
    beforeEnter(to, from, next) {
      logadoAdm(to, from, next)
    },
    children: [
        {path: "criar", name: "TemaCriar", component: TemaCriarView, meta: {title: 'Criar tema - MinhaMente'}},
        {path: "editar/:id", name: "TemaEditar", component: TemaEditarView, meta: {title: 'Editar tema - MinhaMente'}},
    ]
  },
  {
    path: "/auth",
    children: [
      {path: "login", name: "login", component: LoginView, meta: {title: 'Fazer login'},
      beforeEnter(to, from, next) {deslogado(to, from, next)}},
      {path: "criarconta", name: "CriarConta", component: CriarContaView, meta: {title: 'Criar Conta'}, beforeEnter(to, from, next) {deslogado(to, from, next)}},
      {path: "novasenha/:token", name: "NovaSenha", component: NovaSenhaView, meta: {title: 'Definir nova senha'}},
      {path: "esquecisenha", name: "EsqueciSenha", component: EsqueciSenhaView, meta: {title: 'Esqueci a senha'}},
      {path: "deletarconta/:token", name: "DeletarConta", component: DeletarContaView, meta: {title: 'Deletar minha conta'}, beforeEnter(to, from, next) { logado(to, from, next)}},
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
    component: HomeView,
    meta: {definirAssunto: false},
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
