import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/pages/login.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: Login
    }
  ]
})

export default router
