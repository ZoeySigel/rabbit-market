import axios from 'axios'
import { useUserStore } from '@/stores/user'

const http = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 205000,
})

http.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const token = userStore.userInfo.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default http
