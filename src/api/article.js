import request from '@/utils/request'

export const getArticleList = params => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}

export const getArticleById = id => {
  return request({
    url: '/v1_0/articles/' + id,
    method: 'GET'
  })
}

// 收藏文章
export const addCollect = target => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target // 收藏的目标文章id
    }
  })
}
// 取消收藏文章
export const delCollect = target => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}
// 点赞文章
export const addLike = target => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target // 点赞的目标文章id
    }
  })
}
// 取消点赞文章
export const delLike = target => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}
