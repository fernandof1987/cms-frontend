
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },

      { path: '/usuarios', component: () => import('pages/usuarios/Index.vue') },
      { path: '/usuarios/create', component: () => import('pages/usuarios/Cadastro.vue') },

      { path: '/grupos', component: () => import('pages/grupos/Index.vue') },
      { path: '/grupos/create', component: () => import('pages/grupos/Cadastro.vue') },

      { path: '/embedded', component: () => import('pages/embedded/Index.vue') },
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
