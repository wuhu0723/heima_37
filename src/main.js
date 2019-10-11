import Vue from 'vue'
import App from './App.vue'
// 引入全局样式
import '@/styles/reset.less'
import router from '@/router/index.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
