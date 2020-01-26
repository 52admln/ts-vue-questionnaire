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

/**
 * 添加用户
 * @param data
 */
export const addUser = (data: {
  u_name: string,
  // u_major: '',
  u_class: string,
  u_number: string,
  u_birthday: string,
  u_nation: string,
  u_tel: string,
  u_email: string,
  u_identity: string,
  u_sex: string
}) => {
  return request.post('/user/addUser', data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}
