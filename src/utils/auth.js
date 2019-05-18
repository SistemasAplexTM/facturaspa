const Token = 'token'
const User = 'user'

export function getToken() {
  return sessionStorage.getItem(Token)
}

export function setToken(token) {
  return sessionStorage.setItem(Token, token)
}

export function removeToken() {
  return sessionStorage.removeItem(Token)
}

export function getUser() {
  var data = sessionStorage.getItem(User)
  return JSON.parse(data)
}

export function setUser(user) {
  sessionStorage.setItem(User, user)
}

export function removeUser() {
  return sessionStorage.removeItem(User)
}
