import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      isShowTabBar: true,
      tabBarIndex: 0
    }
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/List.vue'),
    meta: {
      isShowTabBar: true,
      tabBarIndex: 1
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/Cart.vue'),
    meta: {
      isShowTabBar: true,
      tabBarIndex: 2
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/User.vue'),
    meta: {
      isShowTabBar: true,
      tabBarIndex: 3
    }
  },
  {
    path: '/search',
    name: 'search',
    redirect: '/search/index',
    component: () => import('@/views/Search.vue'),
    meta: {
      isShowTabBar: true,
      tabBarIndex: -1
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/search/SearchIndex.vue')
      },
      {
        path: 'result',
        name: 'result',
        component: () => import('@/views/search/SearchRes.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
