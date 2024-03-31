import { createWebHistory, createRouter } from 'vue-router'

import Header from '../components/Header.vue'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'

const routes = [
  { 
    path: '/',
    name: 'Header',
    component: Header,
    children: [
      { path: '/', name: "Home", component: Home}
    ]
  },
  { 
    path: '/login',
    name: "login",
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes,
})

export default router


