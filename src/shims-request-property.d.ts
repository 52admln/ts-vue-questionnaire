import { AxiosInstance } from 'axios'
declare module 'vue/types/vue' {
  interface Vue {
    $ajax: AxiosInstance
  }
}
