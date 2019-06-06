import request from '@/utils/request'

export function getByCode(data) {
  return request({
    url: '/product/getByCode',
    method: 'post',
    data
  })
}
