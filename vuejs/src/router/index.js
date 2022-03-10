import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../views/IndexView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminIndex.vue')
    },
    {
      path: '/admin/article/add',
      name: 'article-add',
      component: () => import('../views/admin/Article.vue')
    },
    {
      path: '/admin/emplist',
      name: 'emp-list',
      component: () => import('../views/admin/EmpList.vue')
    },
  ]
})

export default router
