import { defineStore } from 'pinia'
interface SearchResList {
  id: number
  imgUrl: string
  name: string
  price: number
}
export const search = defineStore('search', {
  state() {
    return {
      searchResList: <SearchResList[]>[]
    }
  },
  actions: {}
})
