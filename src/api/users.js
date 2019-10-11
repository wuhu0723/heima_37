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
