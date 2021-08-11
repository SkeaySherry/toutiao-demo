import request from '@/utils/request'

export const getArticleList = params => {
  return request({
    method: 'GET',
    url: '/v1_1/articles',
    params
  })
}

export const getArticleById = id => {
  return request({
    url: '/v1_0/articles/' + id,
    method: 'GET'
  })
}
