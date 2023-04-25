
const routes = [
  {
    path: '',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'homeDefault', component: () => import('pages/home.vue') },
      { path: 'home', name: 'home', component: () => import('pages/home.vue') },
      { path: 'login', name: 'login', component: () => import('pages/Login.vue') },
      { path: 'register', name: 'register', component: () => import('pages/Register.vue') },
      { path: 'email-confirmation', name: 'email-confirmation', component: () => import('pages/EmailConfirmation.vue') },
      { path: 'confirm-signup', name: 'confirm-signup', component: () => import('pages/confirm-signup.vue') },
      { path: 'reset-password', name: 'reset-password', component: () => import('pages/resetPassword.vue') },
      { path: 'reset-password-confirmation', name: 'reset-password-confirmation', component: () => import('pages/resetPasswordConfirmation.vue') },
      { path: 'update-password', name: 'update-password', component: () => import('pages/updatePassword.vue') },
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'me', name: 'me', component: () => import('pages/user.vue') },
      { path: 'dashboard', name: 'dashboard', component: () => import('pages/dashboard.vue') },
      { path: 'home', name: 'home', component: () => import('pages/home.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
    ],
    meta: {
      requiresAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
