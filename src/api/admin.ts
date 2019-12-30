import request from '@/utils/request'

export interface IToken {
  token: string
}

interface loginParams {
  username: string,
  password: string
}

export function login (data: loginParams) {
  return request.post<IToken>('/admin/login', data)
}
