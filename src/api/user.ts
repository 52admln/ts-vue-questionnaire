import request from '@/utils/request'

/**
 * 查找用户
 * @param data
 */
export const getId = (data: {
  n_id: string,
  name: string,
  identity: string
}) => {
  return request.post<any>('/user/getId', data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}
