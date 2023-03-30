import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import '@/css/index.css'
import lazyPlugin from 'vue3-lazy'
import { Tabs, Tab, Swipe, SwipeItem } from 'vant'
import 'vant/lib/index.css'
const pinia = createPinia()
const app = createApp(App)
app.use(router).use(pinia)
app.use(Tabs)
app.use(Tab).use(Swipe).use(SwipeItem)
app.use(lazyPlugin, {
  loading: require('../public/005HSe78b613dea389e2d.gif'),
  error: require('../public/00WXHa048b500376e3103.gif')
})
app.mount('#app')
