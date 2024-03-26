import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../App.vue'
import Login from '../pages/Login.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login',
   name: "login",
   component: Login },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router