import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/rest',
      name: 'request',
      component: () => import('../views/RequestView.vue')
    },
    {
      path: '/base',
      name: 'base',
      component: () => import('../views/BasePageView.vue')
    },
    {
      path: '/img',
      name: 'img',
      component: () => import('../views/ImgView.vue')
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('../views/EditorView.vue')
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('../views/FileUploadView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/goods/add',
      name: 'goods-add',
      component: () => import('../views/GoodsFormView.vue')
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('../views/TableView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
