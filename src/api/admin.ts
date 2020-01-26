import request from '@/utils/request'
import qs from 'querystring'

export interface IToken {
  token: string
}

export function login (data: {
  username: string,
  password: string
}) {
  const params = qs.stringify({
    ...data
  })
  return request.post<IToken>('/admin/login', params)
}
