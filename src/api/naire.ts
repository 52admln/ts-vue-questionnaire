import request from '@/utils/request'
import { IApiNaireSourceData, ApiNaireStatisticResult, IApiNaireItem } from './types'

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
  return request.post<ApiNaireStatisticResult>('/naire/statis', data, {
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
