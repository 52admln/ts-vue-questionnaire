type storageType = 'localStorage' | 'sessionStorage'

const storage = {
  /**
   * 获取缓存
   */
  getStorage (key: string, type: storageType) {
    try {
      const jsonData = window[type].getItem(key)
      return jsonData !== null ? JSON.parse(jsonData) : ''
    } catch (e) {
      return ''
    }
  },
  /**
 * 设置缓存
 */
  setStorage (key: string, value: any, type: storageType) {
    return window[type].setItem(key, JSON.stringify(value))
  },
  /**
 * 删除
 */
  removeStorage (key: string, type: storageType) {
    return window[type].removeItem(key)
  }
}

/**
 * LocalStorage 操作
 */
export function getLocalStorage (key: string) {
  return storage.getStorage(key, 'localStorage')
}
export function setLocalStorage (key: string, value: any) {
  storage.setStorage(key, value, 'localStorage')
}
export function removeLocalStorage (key: string) {
  storage.removeStorage(key, 'localStorage')
}

/**
 * SessionStorage 操作
 */
export function getSessionStorage (key: string) {
  return storage.getStorage(key, 'sessionStorage')
}
export function setSessionStorage (key: string, value: any) {
  storage.setStorage(key, value, 'sessionStorage')
}
export function removeSessionStorage (key: string) {
  storage.removeStorage(key, 'sessionStorage')
}
