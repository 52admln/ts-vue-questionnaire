import Vue from 'vue'
import Vuex from 'vuex'
import { IUserState } from '@/store/modules/user'

Vue.use(Vuex)

export interface IRootState {
  user: IUserState
}

export default new Vuex.Store<IRootState>({})
