import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import '@/css/index.css'
import { Tabs, Tab, Swipe, SwipeItem } from 'vant'
import 'vant/lib/index.css'
const pinia = createPinia()
const app = createApp(App)
app.use(router).use(pinia)
app.use(Tabs)
app.use(Tab).use(Swipe).use(SwipeItem)
app.mount('#app')
