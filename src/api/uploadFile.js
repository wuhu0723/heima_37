// 这个文件专门用来处理与users相关的请求
import axios from '@/utils/myaxios.js'

// data就是一个formdata对象
export const uploadFile = (data) => {
  return axios({
    method: 'post',
    url: '/upload',
    data
  })
}
