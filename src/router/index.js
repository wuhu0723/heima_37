import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/pages/login.vue'
import Personal from '@/pages/personal.vue'
import Register from '@/pages/register.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Personal',
      path: '/personal',
      component: Personal
    },
    {
      name: 'Register',
      path: '/register',
      component: Register
    }
  ]
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
  // 如果是访问需要登陆的页面，如下面是访问个人中心页，它需要先登陆
  if (to.path === '/personal') {
    // 判断是否登陆过
    const token = localStorage.getItem('my_heimatoutiao_37')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else { // 访问其它页面，不需要登陆
    next()
  }
})

export default router
