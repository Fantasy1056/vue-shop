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
let baseURL = ''

if (process.env.VUE_APP_ENV === 'dev') {
  baseURL = '/api'
} else {
  baseURL = process.env.VUE_APP_BASE_URL
}
export const $http = axios.create({
  baseURL,
  timeout: 10000
})
