// 这个文件专门用来处理与users相关的请求
import axios from '@/utils/myaxios.js'

// 获取所有栏目数据
export const getCategoryList = () => {
  return axios({
    url: '/category'
  })
}
