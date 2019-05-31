import request from '@/utils/request'

export function save(data) {
  return request({
    url: 'people/save',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: 'people/update',
    method: 'put',
    data
  })
}

export function deleteRow(id) {
  return request({
    url: 'people/delete',
    method: 'delete',
    data: id
  })
}

export function getById(id) {
  return request({
    url: 'people/getById/' + id,
    method: 'get'
  })
}

export function search(data, type) {
 return request({
   url: 'people/search/' + data + '/' + type,
   method: 'get'
 })
}
