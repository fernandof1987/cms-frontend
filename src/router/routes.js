
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },

      { path: '/usuarios', component: () => import('src/pages/usuarios/Grid.vue') },
      //{ path: '/usuarios/create', component: () => import('pages/usuarios/Cadastro.vue') },

      { path: '/grupos', component: () => import('src/pages/grupos/Grid.vue') },
      //{ path: '/grupos/create', component: () => import('pages/grupos/Cadastro.vue') },
      //{ path: '/grupos/edit', component: () => import('pages/grupos/Cadastro.vue'), props: true },

      { path: '/embedded', component: () => import('pages/embedded/Index.vue') },

      { path: '/login', component: () => import('pages/login/Index.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
