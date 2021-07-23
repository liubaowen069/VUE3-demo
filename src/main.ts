import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/index.scss' // global css

import router from './router/index'
import store from './store/index'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import labelSet from './components/labelSet/labelSet.vue'


const app = createApp(App)

app.component('labelSet', labelSet)

app.use(router).use(store).use(ElementPlus).mount('#app')

