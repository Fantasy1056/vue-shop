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
      isShowTabBar: false,
      tabBarIndex: 2,
      keepalive: false
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
  },
  {
    path: '/goods',
    name: 'goods',
    component: () => import('@/views/Goods.vue'),
    meta: {
      keepalive: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: {
      isShowTabBar: true,
      tabBarIndex: 3
    },
    children: [
      {
        path: 'index',
        name: 'login-index',
        component: () => import('@/views/login/Login.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/login/Register.vue')
      },
      {
        path: 'loginsms',
        name: 'loginsms',
        component: () => import('@/views/login/LoginSms.vue')
      }
    ]
  },
  {
    path: '/recovery',
    name: 'recovery',
    component: () => import('@/views/Recovery.vue'),
    meta: {
      isShowTabBar: true,
      tabBarIndex: 3
    },
    children: [
      {
        path: 'finduser',
        name: 'finduser',
        component: () => import('@/views/recovery/FindUser.vue')
      },
      {
        path: 'findpwd',
        name: 'findpwd',
        component: () => import('@/views/recovery/FindPassword.vue')

      }
    ]
  },
  {
    path: '/address',
    name: 'address',
    component: () => import('@/views/Address.vue'),
    children: [
      {
        path: 'show',
        name: 'show',
        component: () => import('@/views/address/Show.vue')
      },
      {
        path: 'edit/:id',
        name: 'edit',
        component: () => import('@/views/address/Edit.vue')
      },
      {
        path: 'select',
        name: 'select',
        component: () => import('@/views/address/Select.vue')
      }
    ],
    meta: {
      keepalive: false,
      isShowTabBar: true,
      tabBarIndex: -1
    },
    redirect: '/address/show'
  },
  {
    path: '/checkout',
    name: 'checktout',
    component: () => import('@/views/Checkout.vue'),
    meta: {
      keepalive: false,
      isShowTabBar: false,
      tabBarIndex: -1
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const pathArr = ['/cart', '/checkout', '/address/show', '/address/edit', '/address/select']
  const token = localStorage.getItem('token')
  if (pathArr.indexOf(to.path) !== -1) {
    if (token) {
      next()
    } else {
      next('/login/loginsms')
    }
  } else {
    next()
  }
})
export default router
