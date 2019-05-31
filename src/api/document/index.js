import request from '@/utils/request'

export function getTypes() {
  return request({
    url: '/document/getTypes',
    method: 'get'
  })
}

export function getDocuments(id, data) {
  return request({
    url: '/document/getDocuments/'+id,
    method: 'post',
    data
  })
}
