import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import RecipeInfo from '../views/RecipeInfo.vue'
import Signup from '../views/Signup.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/recipe/:id',
    name: 'recipe-info',
    component: RecipeInfo
  },
  {
    path: '/signin',
    name: 'signin',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
