import request from '@/utils/request'

export function validateCashRegister(data) {
  return request({
    url: 'global/validateCashRegister/' + data.sucursal_id,
    method: 'get'
  })
}

export function saveCashRegister(data) {
  return request({
    url: 'global/saveCashRegister',
    method: 'post',
    data
  })
}
