import request from '@/utils/request'
import { IApiNaireSourceData, IApiNaireStatisticResult, IApiNaireItem } from './types'

/**
 * 问卷列表
 */
export const list = () => {
  return request.get<IApiNaireItem[]>('/naire', {})
}

/**
 * 创建问卷
 * @param data
 */
export const create = (data: {
  naire: Questionnaire.INaire,
  status: string
}) => {
  return request.post<any>('/naire/save', data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

/**
 * 问卷统计
 * @param data
 */
export const statis = (data: {
  n_id: string
}) => {
  return request.post<IApiNaireStatisticResult>('/naire/statis', data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

/**
 * 样本数据
 * @param data
 */

export const sourceData = (data: {
  n_id: string
  current: number,
    page_size: number
}) => {
  return request.get<IApiNaireSourceData>('/naire/sourcedata', data)
}

/**
 * 交叉分析
 * @param data
 */

export const crossanalysis = (data: {
  n_id: string
  x_id: number | string,
  y_id: number | string
}) => {
  return request.post<any>('/naire/crossanalysis', data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

/**
 * 交叉分析
 * @param data
 */
export const questions = (data: {
  n_id: string
}) => {
  return request.post<any>('/naire/questions', data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

/**
 * 问卷详情
 * @param data
 */
export const detail = (data: {
  n_id: string
  type: 'normal'
}) => {
  return request.post<any>('/naire/detail', data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

/**
 * 提交问卷
 * @param data
 */
export const submit = (data: {
  nId: string,
  result: any,
  userId: string
}) => {
  return request.post<any>('/naire/submit', data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

/**
 * 发布/停止发布
 * @param data
 */
export const changeStatus = (data: {
  n_id: string
}) => {
  return request.get<any>('/naire/changeStatus', data)
}

/**
 * 回收情况
 * @param data
 */
export const submitStatistic = (data: {
  n_id: string,
  current: number,
  page_size: number,
  status: number,
  u_class:string
}) => {
  return request.get<any>('/naire/submitStatis', data)
}

/**
 * 修改截止时间
 * @param data
 */
export const changeTime = (data: {
  n_id: string
  n_deadline: number
}) => {
  return request.post<any>('/naire/changeTime', data)
}

/**
 * 删除问卷
 * @param data
 */
export const del = (data: {
  n_id: string
}) => {
  return request.get<any>('/naire/del', data)
}
