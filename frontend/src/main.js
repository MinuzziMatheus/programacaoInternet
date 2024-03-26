import { createApp } from 'vue'
import './style.css'
import router from './utils/routes'
import App from './App.vue'

createApp(App).use(router).mount('#app')
