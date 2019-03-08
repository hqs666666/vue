import request from '@/utils/request'

export function login(loginForm){
    return request({
        url: '/account/login',
        method: 'post',
        data: loginForm
      })
}

export function refreshToken(loginForm){
    return request({
        url: '/account/refreshtoken',
        method: 'post',
        data: loginForm
      })
}

export function getLogs(params){
  return request({
    url: '/log',
    method: 'get',
    params
  })
}

