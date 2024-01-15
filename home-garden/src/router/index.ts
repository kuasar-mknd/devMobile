import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/home'
  },
  {
    path: '/welcome',
    component: () => import('@/views/WelcomePage.vue') // Ajouter la route de bienvenue
  },
  {
    path: '/login',
    component: () => import('@/views/LoginAuth.vue') // Ajouter la route de connexion
  },
  {
    path: '/register',
    component: () => import('@/views/RegisterAuth.vue') // Ajouter la route d'inscription
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      
      {
        path: 'home',
        component: () => import('@/views/HomePage.vue')
      },
      {
        path: 'jardin',
        component: () => import('@/views/JardinPage.vue')
      },
      {
        path: 'user',
        component: () => import('@/views/UserProfile.vue')
      },
      {
        path: 'map',
        component: () => import('@/views/ProxiMap.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/welcome'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    next('/welcome');
  } else {
    next();
  }
});

export default router
