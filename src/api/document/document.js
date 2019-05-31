import request from '@/utils/request'

export function save(data) {
  return request({
    url: 'api/document/save',
    method: 'post',
    data
  })
}

export function update(data, id) {
  return request({
    url: 'api/document/update/' + id,
    method: 'put',
    data
  })
}

export function savePaymentMethod(data) {
  return request({
    url: 'api/document/savePaymentMethod',
    method: 'post',
    data
  })
}

export function getProductByCode(data) {
  return request({
    url: 'api/getProductByCode',
    method: 'post',
    data
  })
}

export function getCupon(data) {
  return request({
    url: 'api/document/getCupon/' + data,
    method: 'get'
  })
}

export function searchThird(data, type) {
  return request({
    url: 'api/terceros/terceroSearch/' + data + '/' + type,
    method: 'get'
  })
}

export function documentById(id) {
  return request({
    url: 'api/document/documentById/' + id,
    method: 'get'
  })
}

export function validateCashRegister() {
  return request({
    url: 'api/document/validateCashRegister',
    method: 'get'
  })
}

export function saveCashRegister(data) {
  return request({
    url: 'api/document/saveCashRegister',
    method: 'post',
    data
  })
}
