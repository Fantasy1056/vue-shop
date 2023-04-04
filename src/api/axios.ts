import axios from 'axios'
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = token
  }

  return config
})

axios.interceptors.response.use((config) => {
  return config
})

export const $http = axios.create({
  baseURL: '/api',
  timeout: 10000
})
