import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      isShowTabBar: true
    }
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/List.vue'),
    meta: {
      isShowTabBar: true
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/Cart.vue'),
    meta: {
      isShowTabBar: true
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/User.vue'),
    meta: {
      isShowTabBar: true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search.vue'),
    meta: {
      isShowTabBar: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
