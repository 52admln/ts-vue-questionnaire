declare namespace Request {
  /**
   * 接口返回格式
   */
  export interface IAxiosResponse<T> {
    success: boolean
    data?: T
    msg: string
  }
}
