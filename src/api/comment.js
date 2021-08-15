import request from '@/utils/request'

// 获取评论列表
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}

// 点赞评论或评论回复
export const addLike = target => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}
// 取消点赞评论或评论回复
export const delLike = target => {
  return request({
    method: 'DELETE',
    url: '/v1_0/comment/likings/' + target
  })
}

// 发表评论或评论回复
export const addComment = data => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
