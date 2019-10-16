// 这个文件专门用来处理与users相关的请求
import axios from '@/utils/myaxios.js'

// 登陆
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
// 注册
export const register = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}

// 获取当前登陆用户的个人信息
export const getPersonalInfo = (id) => {
  return axios({
    // 将token以请求头的方式传递给服务器，服务器可以根据当前的token进行处理
    // headers: {
    //   // Authorization不能随意，得由后台来决定
    //   'Authorization': localStorage.getItem('my_heimatoutiao_37')
    // },
    url: `/user/${id}`
  })
}

// 修改用户信息
export const updataUserInfo = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}

// 获取我的关注
export const getPersonalFocus = (id) => {
  return axios({
    url: `/user_follows`
  })
}

// 取消我的关注
export const cancelPersonalFocu = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}

// 获取我的跟帖
export const getPersonalKeeps = (id) => {
  return axios({
    url: `/user_comments`
  })
}
