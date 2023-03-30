import axios from 'axios'
import { showLoadingToast, closeToast } from 'vant'

axios.interceptors.request.use((config) => {
  showLoadingToast({
    message: '加载中...',
    duration: 0
  })
  return config
})

axios.interceptors.response.use((config) => {
  closeToast()
  return config
})

export const $http = axios.create({
  baseURL: '/api',
  timeout: 10000
})
