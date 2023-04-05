import { defineStore } from 'pinia'
import { user } from '@/store/user'
import { reqGetAddList } from '@/api'
import { showToast } from 'vant'
interface AddressList {
  add_id: number
  userid: number
  consignee: string
  moblie: string
  area: string
  address: string
  isDefault: boolean | number
}
const userStore = user()
export const address = defineStore('address', {
  state() {
    return {
      addressList: <AddressList[]>[]
    }
  },
  actions: {
    async getAddressList() {
      try {
        const { data: res } = await reqGetAddList(userStore.userData.id)

        if (res.code === 200) {
          this.addressList = res.data
          showToast({
            type: 'success',
            message: res.msg
          })
        } else {
          showToast({
            type: 'fail',
            message: res.msg
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})
