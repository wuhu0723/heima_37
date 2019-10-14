// 实现axios的封装
import axios from 'axios'
// import { Toast } from 'vant'

// 配置axios的基准路径，将来这个路径会被自动的拼接到路由之前
axios.defaults.baseURL = 'http://127.0.0.1:3000'
localStorage.setItem('baseurl_37', axios.defaults.baseURL)

// 还有一大坨代码

// 添加请求拦截器:每一个请求都会经过
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么:将token以请求头的方式传递给服务器，服务器可以根据当前的token进行处理
  console.log(config)
  const token = localStorage.getItem('my_heimatoutiao_37')
  if (token) {
    config.headers.Authorization = token
  }
  // 请求并不是拦截器来发送的，它只是发送过程中的一个插曲
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 1.处理所有状态码为401的错误信息
  let { message, statusCode } = response.data
  if (statusCode === 401) {
    // Toast.fail(message)
    this.$toast.fail(message)
  }
  // 单独再处理token无效的错误信息
  if (message === '用户信息验证失败') {
    // 重新跳转到登陆页
    window.location = '#/login'
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default axios
