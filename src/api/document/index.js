import request from '@/utils/request'

export function getTypes(rol,branch) {
  return request({
    url: '/document/getTypes/'+ rol +'/'+branch,
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
