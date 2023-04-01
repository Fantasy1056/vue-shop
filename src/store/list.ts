import { defineStore } from 'pinia'
import { reqGetListData } from '@/api'
interface ListData {
  id: number
  title: string
  data: {
    id: number
    title: string,
    list: {
      id: number
      title: string
      img: string
    }[]
  }[]
}
export const list = defineStore('list', {
  state() {
    return {
      listData: <ListData[]>[],
      listIndex: 0
    }
  },
  actions: {

    async getListData () {
      const { data: res } = await reqGetListData()

      this.listData = res.data
    }
  }
})
