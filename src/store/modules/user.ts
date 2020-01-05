import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/utils/storage'

interface LoginPayload {
  username: string,
  token: string
}

export interface IUserState {
  isAdmin: boolean,
  userName: string
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public isAdmin: boolean = getLocalStorage('IS_ADMIN') || false
  public userName: string = getLocalStorage('USER_NAME') || 'admin'

  @Mutation
  private UPDATE_IS_ADMIN (isAdmin: boolean) {
    this.isAdmin = isAdmin
  }

  @Mutation
  private UPDATE_USER_NAME (userName: string) {
    this.userName = userName
  }

  // 用户退出登录
  @Action
  public logout () {
    removeLocalStorage('IS_ADMIN')
    removeLocalStorage('JWT_TOKEN')
    removeLocalStorage('USER_NAME')
    this.UPDATE_IS_ADMIN(false)
  }

  @Action
  public login (payload: LoginPayload) {
    const { username, token } = payload
    console.log(username, token)
    setLocalStorage('IS_ADMIN', true)// 是否为管理员
    setLocalStorage('USER_NAME', username)
    setLocalStorage('JWT_TOKEN', token)
    this.UPDATE_IS_ADMIN(true)
  }
}

export const UserModule = getModule(User)
