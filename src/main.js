import Vue from 'vue'
import App from './App.vue'
// 引入全局样式
import '@/styles/reset.less'
import router from '@/router/index.js'
// import Vant from 'vant'
// import 'vant/lib/index.css'

// // 如果use了，那么就会在Vue原型上挂载vant所有组件成员
// Vue.use(Vant)
import { Toast } from 'vant'
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
