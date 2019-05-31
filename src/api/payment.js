import request from '@/utils/request'

export function save(data) {
  return request({
    url: 'api/payments/save',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: 'api/payments/update',
    method: 'put',
    data
  })
}

export function deleteRow(id) {
  return request({
    url: 'api/payments/delete',
    method: 'delete',
    data: id
  })
}

export function paymentById(id) {
  return request({
    url: 'api/payments/paymentById/' + id,
    method: 'get'
  })
}