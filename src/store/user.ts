import { defineStore } from 'pinia'
import { reqPostLogin } from '@/api/index'
interface UserData {
  id: number
  tel: string
  pwd: string
  avatarUrl: string
  nickname: string
  token: string
  code: string
}

export const user = defineStore('user', {
  state() {
    return {
      userData: <UserData> {},
      loginState: false,
      token: localStorage.getItem('token') || ''
    }
  },
  actions: {
    async initUser() {
      if (this.token && !this.loginState) {
        try {
          const { data: res } = await reqPostLogin({
            token: this.token
          })

          if (res.code === 200) {
            this.userData = res.data.data
            this.loginState = true
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
})
