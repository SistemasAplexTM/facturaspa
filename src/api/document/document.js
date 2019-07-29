import request from '@/utils/request'

export function save(data) {
  return request({
    url: 'document/save',
    method: 'post',
    data
  })
}

export function update(data, id) {
  return request({
    url: 'document/update/' + id,
    method: 'put',
    data
  })
}

export function savePaymentMethod(data) {
  return request({
    url: 'document/savePaymentMethod',
    method: 'post',
    data
  })
}

export function getCupon(data) {
  return request({
    url: 'document/getCupon/' + data,
    method: 'get'
  })
}

export function searchThird(data, type) {
  return request({
    url: 'terceros/terceroSearch/' + data + '/' + type,
    method: 'get'
  })
}

export function documentById(id) {
  return request({
    url: 'document/documentById/' + id,
    method: 'get'
  })
}

export function getInventory(branch, data) {
  return request({
    url: 'document/getInventory/' + branch,
    method: 'post',
    data
  })
}
