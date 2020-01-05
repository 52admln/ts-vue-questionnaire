import request from '@/utils/request'

export interface ApiNaireItem {
  n_state: string,
  n_creattime: string,
  n_status: string
}

export const NaireAction = {
  list () {
    return request.get<ApiNaireItem[]>('/naire', {})
  }
}
