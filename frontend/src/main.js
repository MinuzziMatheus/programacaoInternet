import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import router from './utils/routes'
import App from './App.vue'

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
