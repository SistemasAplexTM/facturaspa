import request from '@/utils/request'

export function getBranchs(data, type) {
 return request({
   url: 'branch/get',
   method: 'get'
 })
}
