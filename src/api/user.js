import request from '@/utils/request'

export function getUsers() {
  return request({
    url: '/algo',
    method: 'get'
  })
}

export function createRol(){
  return request({
    url: '/security/createRol',
    method: 'get'
  })
}

export function createPermission(){
  return request({
    url: '/security/createPermission',
    method: 'get'
  })
}

export function assignRoleToPermission(){
  return request({
    url: '/security/assignRoleToPermission',
    method: 'get'
  })
}

export function deleteRoleToPermission(){
  return request({
    url: '/security/deleteRoleToPermission',
    method: 'get'
  })
}

export function assignRoleToUser(){
  return request({
    url: '/security/assignRoleToUser',
    method: 'get'
  })
}
