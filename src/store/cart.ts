import { defineStore } from 'pinia'
import { reqGetCartlist } from '@/api'
interface CartList {
  goods_id: number
  goods_name: string
  goods_imgUrl: string
  goods_price: number
  state: number
  userid: number
  goods_num: number
}
export const cart = defineStore('cart', {
  state() {
    return {
      cartList: <CartList[]>[]
    }
  },
  actions: {
    async getCartList(id: number) {
      try {
        const { data: res } = await reqGetCartlist(id)

        if (res.code === 200) {
          this.cartList = res.data
        }
      } catch (err) {
        return err
      }
    },
    changeState(data: CartList) {
      this.cartList.forEach(item => {
        if (item.goods_id === data.goods_id) {
          item.state = item.state === 1 ? 0 : 1
        }
      })
    },
    setAllChecked() {
      this.cartList.forEach(item => {
        item.state = 1
      })
    },
    clearCartList() {
      this.cartList = []
    }
  },
  getters: {
    totalPrice (): number {
      let total = 0
      this.cartList.forEach(item => {
        if (item.state) {
          total += item.goods_price * item.goods_num
        }
      })

      return total
    },
    totalNum() :number {
      let count = 0
      this.cartList.forEach(item => {
        if (item.state) {
          count += item.goods_num
        }
      })
      return count
    },
    isAllChecked(): boolean {
      const res = this.cartList.every(item => {
        return item.state === 1
      })

      return res
    },
    checkedItems() {
      const resArr = <CartList[]>[]
      this.cartList.forEach((item: CartList) => {
        if (item.state) {
          resArr.push(item)
        }
      })
      return resArr
    }
  }
})
