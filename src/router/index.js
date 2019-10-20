import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/pages/login.vue'
import Personal from '@/pages/personal.vue'
import Register from '@/pages/register.vue'
import EditPersonal from '@/pages/editPersonal.vue'
import Myfocus from '@/pages/myfocus.vue'
import Mykeeps from '@/pages/mykeeps.vue'
import Mycollections from '@/pages/mycollections.vue'
import Index from '@/pages/index.vue'
import ArticalDetail from '@/pages/articalDetail.vue'
import Comments from '@/pages/comments.vue'
import Search from '@/pages/search.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      name: 'Index',
      path: '/',
      component: Index
    },
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
    },
    {
      name: 'EditPersonal',
      path: '/editProfile',
      component: EditPersonal
    },
    {
      name: 'Myfocus',
      path: '/myfocus',
      component: Myfocus
    },
    {
      name: 'Mykeeps',
      path: '/mykeeps',
      component: Mykeeps
    },
    {
      name: 'Mycollections',
      path: '/mycollections',
      component: Mycollections
    },
    {
      name: 'ArticalDetail',
      path: '/articalDetail/:id',
      component: ArticalDetail
    },
    {
      name: 'Comments',
      path: '/comments/:id',
      component: Comments
    },
    {
      name: 'Search',
      path: '/search',
      component: Search
    }
  ]
})

// 添加导航守卫
// to:到那里去
// from:从那里来
// next:我下一步要做什么：跳转/重定向
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
