import axios, { AxiosRequestConfig } from 'axios'
import { UserModule } from '@/store/modules/user'
import router from '@/router'
import { Message } from 'element-ui'
import { getLocalStorage } from '@/utils/storage'

type IAxiosResponse<T> = Request.IAxiosResponse<T>

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  // withCredentials: true // send cookies when cross-domain requests
})

// http request 拦截器
service.interceptors.request.use(
  config => {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    const jwtToken = getLocalStorage('JWT_TOKEN')
    if (jwtToken) {
      config.headers.Authorization = `token ${jwtToken}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          UserModule.logout()
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
          Message.error('Token 失效，请重新登录。')
          break
        default:
          Message.error('服务器错误，请重试。')
          break
      }
    } else {
      Message.error('服务器错误，请重试。')
    }
    return Promise.reject(error) // 返回接口返回的错误信息
  })

service.defaults.transformResponse = (response) => {
  try {
    const res = JSON.parse(response)
    if (res.err === 0) {
      return {
        success: true,
        data: res.token || res.data, // login 接口返回 token
        msg: res.message || ''
      }
    } else {
      return {
        success: false,
        data: res.data,
        msg: res.message || res.data || ''
      }
    }
  } catch (e) {
    return {
      success: false,
      msg: '接口返回格式有误，请重试。'
    }
  }
}

export default {
  // T 表示API返回的 类型声明
  get<T> (url: string, params: any = {}, options: AxiosRequestConfig = {}): Promise<IAxiosResponse<T>> {
    return service.get(url, {
      ...options,
      params
    })
  },
  post<T> (url: string, data: any = {}, options: AxiosRequestConfig = {}): Promise<IAxiosResponse<T>> {
    return service.post(url, data, {
      ...options
    })
  }
}
