// 这个文件专门用来处理与users相关的请求
import axios from '@/utils/myaxios.js'

// 获取指定栏目的文章列表数据
export const getArticalList = (params) => {
  return axios({
    url: '/post',
    params
  })
}

// 获取文章详情
export const getArticalById = (id) => {
  return axios({
    url: `/post/${id}`
  })
}

// 文章点赞
export const likeArtical = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}

// 文章收藏
export const starArtical = (id) => {
  return axios({
    url: `/post_star/${id}`
  })
}

// 获取文章评论列表
export const getPostComments = (id) => {
  return axios({
    url: `/post_comment/${id}`
  })
}

// 发表评论
export const sendComment = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}
