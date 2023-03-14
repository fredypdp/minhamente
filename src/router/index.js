import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PesquisaView from '@/views/PesquisaView.vue'
// Conta
import LoginView from '@/views/LoginView.vue'
import CriarView from '@/views/CriarView.vue'
import NovaSenhaView from '@/views/NovaSenhaView.vue'
import DeletarContaView from '@/views/DeletarContaView.vue'
import EsqueciSenhaView from '@/views/EsqueciSenhaView.vue'
// Perfil
import PerfilView from '@/views/PerfilView.vue'
import PainelView from '@/views/adm/PainelView'
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
    path: "/resultados",
    name: "pesquisa",
    component: PesquisaView
  },
  {
    path: "/perfil",
    name: "perfil",
    component: PerfilView
  },
  {
    path: "/painel", // Adm
    component: PainelView,
    children: [
      {path: "temas", name: "PainelTemas", component: PainelTemas},
      {path: "assuntos", name: "PainelAssuntos", component: PainelAssuntos},
      {path: "usuarios", name: "PainelUsuarios", component: PainelUsuarios},
      {path: "apontamentos", name: "PainelApontamentos", component: PainelApontamentos},
      {path: "", name: "painel", component: PainelApontamentos}
    ]
  },
  {
  path: "/apontamento", // Adm
  children: [
      {path: "ler", name: "ApontamentoLer", component: ApontamentoView},
      {path: "publicar", name: "ApontamentoPublicar", component: ApontamentoPublicarView},
      {path: "editar/:apontamento", name: "ApontamentoEditar", component: ApontamentoEditarView},
    ]
  },
  {
  path: "/assunto", // Adm
  children: [
      {path: "criar", name: "AssuntoCriar", component: AssuntoCriarView},
      {path: "editar/:assunto", name: "AssuntoEditar", component: AssuntoEditarView},
    ]
  },
  {
  path: "/tema", // Adm
  children: [
      {path: "criar", name: "TemaCriar", component: TemaCriarView},
      {path: "editar/:tema", name: "TemaEditar", component: TemaEditarView},
    ]
  },
  {
  path: "/auth",
  children: [
      {path: "login", name: "login", component: LoginView},
      {path: "criarconta", name: "CriarConta", component: CriarView},
      {path: "novasenha/:token", name: "NovaSenha", component: NovaSenhaView},
      {path: "esquecisenha", name: "EsqueciSenha", component: EsqueciSenhaView},
      {path: "deletarconta/:token", name: "DeletarConta", component: DeletarContaView},
      // Redirecionamentos
      {path: "/login", redirect: {name: "login"}},
      {path: "/signup", redirect: {name: "CriarConta"}},
      {path: "/criarconta", redirect: {name: "CriarConta"}},
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
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: "active-link",
  routes
})

export default router
