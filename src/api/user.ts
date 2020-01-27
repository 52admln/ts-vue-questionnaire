import request from '@/utils/request'
import { IApiUserInfo, IApiClassItem } from '@/api/types'

/**
 * 查找用户
 * @param data
 */
export const getId = (data: {
  n_id: string,
  name: string,
  identity: string
}) => {
  return request.post<IApiUserInfo>('/user/getId', data, {
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
  u_class: string,
  u_number: string,
  u_birthday: string,
  u_nation: string,
  u_tel: string,
  u_email: string,
  u_identity: string,
  u_sex: string
}) => {
  return request.post<any>('/user/addUser', data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

/**
 * 添加用户
 * @param data
 */
export const updateUser = (data: {
  u_id: string,
  u_name: string,
  u_class: string,
  u_number: string,
  u_birthday: string,
  u_nation: string,
  u_tel: string,
  u_email: string,
  u_identity: string,
  u_sex: string
}) => {
  return request.post<any>('/user/updateUser', data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

/**
 * 获取部门信息
 */
export const getClass = () => {
  return request.get<IApiClassItem[]>('/user/getClass')
}

/**
 * 用户列表
 * @param data
 */
export const list = (data: {
  keyword: string,
  value: string,
  current: number,
  page_size: number
}) => {
  return request.get<any>('/user', data)
}

/**
 * 删除用户
 * @param data
 */
export const del = (data: {
  u_id: string
}) => {
  return request.post<any>('/user/del', data)
}

/**
 * 清空用户
 */
export const clear = () => {
  return request.post<any>('/user/clear')
}
