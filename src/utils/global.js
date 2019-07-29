const Item = 'BC'

export function getBC() {
  return sessionStorage.getItem(Item)
}

export function setBC(item) {
  return sessionStorage.setItem(Item, item)
}

export function removeBC() {
  return sessionStorage.removeItem(Item)
}
