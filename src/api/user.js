import request from '@/utils/request'

export function getUsers() {
  return request({
    url: '/algo',
    method: 'get'
  })
}
