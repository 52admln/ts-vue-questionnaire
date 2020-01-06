import request from '@/utils/request'

export interface ApiNaireItem {
  n_state: string,
  n_creattime: string,
  n_status: string
}

export interface ApiCreateParam {
  naire: Questionnaire.INaire,
  status: 'create'
}

export const NaireAction = {
  /**
   * 问卷列表
   */
  list () {
    return request.get<ApiNaireItem[]>('/naire', {})
  },

  /**
   * 创建问卷
   * @param data
   */
  create (data: ApiCreateParam) {
    return request.post<any>('/naire/save', data, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
  }
}
