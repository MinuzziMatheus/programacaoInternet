import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../App.vue'
import Login from '../pages/Login.vue'

const routes = [
  { 
    path: '/',
    name: 'home',
    component: () => import('../pages/Home.vue')
  },
  { 
    path: '/login',
    name: "login",
    component: () => import('../pages/Login.vue')
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router