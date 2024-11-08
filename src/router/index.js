import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LayoutFull from '@/layouts/LayoutFull.vue';
import ServiceView from '@/views/ServiceView.vue';
import LoginView from '@/views/LoginView.vue';
import PrestadoresView from '@/views/PrestadoresView.vue'
import UpdateProfile from '@/components/ProfilePage/UpdateProfile.vue';
import JobView from '@/views/JobView.vue';
import CadastroUsuario from '@/components/auth/CadastroUsuario.vue';
import RecuperacaoSenha from '@/components/auth/RecuperacaoSenha.vue';
import ValidacaoSenha from '@/components/auth/ValidacaoSenha.vue';
import AdicaoProjeto from '@/components/ProjectAdd/AdicaoProjeto.vue';
import HomeLoggedView from '@/views/HomeLoggedView.vue';
import ProfileView from '@/views/ProfileView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: LayoutFull,
      children: [
        {
          path: '',
          name: 'HomeView',
          component: HomeView,
        },
      ],
    },
    {
      path: '/services-design',
      name: 'design',
      component: ServiceView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/prestadores',
      name: 'Prestadores',
      component: PrestadoresView,
    },
    {
      path: '/cadastro',
      name: 'Cadastro',
      component: CadastroUsuario
    },
    {
      path: '/recuperacao',
      name: 'RecuperaçaoSenha',
      component: RecuperacaoSenha
    },
    {
      path: '/validacao',
      name: 'Validacao',
      component: ValidacaoSenha
    },
    {
      path: '/update-profile',
      name: 'Update',
      component: UpdateProfile
    },
     {
      path: '/adicao-job',
      name: 'ProjetoAdicao',
      component: AdicaoProjeto,
     },
     {
      path: '/home-logged',
      name: 'HomeLogged',
      component: HomeLoggedView,
     },
     {
      path: '/profile-page',
      name: 'Profile',
      component: ProfileView,
     },
     {
      path: '/categorias/:categoriaId/projetos',
      name: 'categorias-projetos',
      component: JobView,
      props: true, 
    },
  ],
});

export default router;
