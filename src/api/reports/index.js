import request from '@/utils/request'

export function testDetail() {
  return request({
    url: '/document/testDetail',
    method: 'get'
  })
}
