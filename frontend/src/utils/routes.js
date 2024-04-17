import { createWebHistory, createRouter } from 'vue-router'

import Header from '../components/Header.vue'
import Home from '../pages/Home.vue'
import Clients from '../pages/Clients.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'

const routes = [
  { 
    path: '/',
    name: 'Header',
    component: Header,
    children: [
      { path: '/home', name: "Home", component: Home},
      { path: '/clients', name: "Clients", component: Clients}
    ]
  },
  { 
    path: '/login',
    name: "login",
    component: Login
  },
  { 
    path: '/register',
    name: "register",
    component: Register
  },
]

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes,
})

export default router


