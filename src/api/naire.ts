import request from '@/utils/request'

export interface ApiCreateParam {
  naire: Questionnaire.INaire,
  status: 'create'
}

export interface ApiNaireIdParam {
  n_id: string
}

export interface ApiSourceDataParam extends ApiNaireIdParam {
  current: number,
  page_size: number
}

export interface ApiCrossAnlysisParam extends ApiNaireIdParam {
  x_id: number | string,
  y_id: number | string
}

export interface ApiNaireSourceData {
  naire: Questionnaire.INaire,
  questions: Questionnaire.IQuestionItem
}

export interface ApiNaireItem {
  n_id: string,
  a_id: string,
  n_creattime: string,
  n_deadline: string,
  n_title: string,
  n_status: string
  n_intro: string
  n_options: string
}

export interface ApiNaireStatisticResult {
  naire: Questionnaire.INaire,
  questions: Questionnaire.IQuestionItem
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
  },

  /**
   * 问卷统计
   * @param data
   */
  statis (data: ApiNaireIdParam) {
    return request.post<any>('/naire/statis', data, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
  },

  /**
   * 样本数据
   * @param data
   */
  sourceData (data: ApiSourceDataParam) {
    return request.get<any>('/naire/sourcedata', data)
  },

  /**
   * 交叉分析
   * @param data
   */
  crossanalysis (data: ApiCrossAnlysisParam) {
    return request.post<any>('/naire/crossanalysis', data, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
  },

  /**
   * 交叉分析
   * @param data
   */
  questions (data: ApiNaireIdParam) {
    return request.post<any>('/naire/questions', data, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
  }
}
