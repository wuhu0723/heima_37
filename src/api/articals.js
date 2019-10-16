// 这个文件专门用来处理与users相关的请求
import axios from '@/utils/myaxios.js'

// 获取指定栏目的文章列表数据
export const getArticalList = (params) => {
  return axios({
    url: '/post',
    params
  })
}
