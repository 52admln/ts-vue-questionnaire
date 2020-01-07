import request from '@/utils/request'
import qs from 'querystring'

export interface IToken {
  token: string
}

interface loginParams {
  username: string,
  password: string
}

export function login (data: loginParams) {
  const params = qs.stringify({
    ...data
  })
  return request.post<IToken>('/admin/login', params)
}
