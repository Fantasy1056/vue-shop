import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import '@/css/index.css'
import lazyPlugin from 'vue3-lazy'
import { Tabs, Tab, Swipe, SwipeItem, ActionBar, ActionBarButton, ActionBarIcon, Icon, Empty, Popup, Picker, Switch } from 'vant'
import 'vant/lib/index.css'
import { Field, Form, ErrorMessage } from 'vee-validate'
import mitt from 'mitt'
const pinia = createPinia()
const mitter = mitt()
const app = createApp(App)
app.config.globalProperties.mitter = mitter
app.use(router).use(pinia)
app.use(Tabs)
app.component('Form', Form).component('Field', Field).component('ErrorMessage', ErrorMessage)
app.use(Tab).use(Swipe).use(SwipeItem).use(ActionBar).use(ActionBarButton).use(ActionBarIcon).use(Icon).use(Empty).use(Popup).use(Picker).use(Switch)
app.use(lazyPlugin, {
  loading: require('../public/005HSe78b613dea389e2d.gif'),
  error: require('../public/00WXHa048b500376e3103.gif')
})
app.mount('#app')
