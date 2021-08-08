// 用户频道相关

import request from '@/utils/request'
// 获取全部频道
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
// 在线添加频道
export const addUserChannels = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [data] // data 表示要添加的频道对象 { id, seq }
    }
  })
}
// 在线删除频道
export const delUserChannels = id => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${id}`
  })
}
