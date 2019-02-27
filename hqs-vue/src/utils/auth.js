import cookies from 'js-cookie'
import {decrypt,encrypt} from '@/utils/secret'

const tokenKey = 'oauth-Token'

export function getToken() {
  var token = cookies.get(tokenKey);
  return token === undefined ? token : decrypt(token);
}

export function setToken(token) {
  var encryptToken = encrypt(token);
  return cookies.set(tokenKey, encryptToken)
}

export function removeToken() {
  return cookies.remove(tokenKey)
}