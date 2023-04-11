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
      // 当前登录用户的数据
      userData: <UserData> {},
      // 登陆状态
      loginState: false,
      // 当前用户的token
      token: localStorage.getItem('token') || ''
    }
  },
  actions: {
    // 页面加载时初始化用户
    async initUser() {
      // 本地存储存在token时，并且登录状态为false
      if (this.token && !this.loginState) {
        try {
          // 发起请求登录
          const { data: res } = await reqPostLogin({
            token: this.token
          })

          if (res.code === 200) {
            // 保存用户数据，改变登陆状态
            this.userData = res.data.data
            this.loginState = true
          }
        } catch (err) {
          return err
        }
      }
    }
  }
})
