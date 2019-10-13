// 实现axios的封装
import axios from 'axios'
import { Toast } from 'vant'

// 配置axios的基准路径，将来这个路径会被自动的拼接到路由之前
axios.defaults.baseURL = 'http://127.0.0.1:3000'

// 还有一大坨代码

// 添加请求拦截器:每一个请求都会经过
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么:将token以请求头的方式传递给服务器，服务器可以根据当前的token进行处理
  console.log(config)
  const token = localStorage.getItem('my_heimatoutiao_37')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data && response.data.message === '用户信息验证失败') {
    Toast.fail(response.data.message)
    setTimeout(() => {
      // 通过浏览器的方式实现重定向
      window.location = '#/login'
    }, 1000)
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default axios
