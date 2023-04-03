import { defineStore } from 'pinia'
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
      loginState: false
    }
  },
  actions: {

  }
})
