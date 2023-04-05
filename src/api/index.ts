import { $http } from './axios'
interface SearchQuery {
  id?: number
  word?: string
  type?: string
  sift?: string
}
interface Login {
  tel?: string
  pwd?: string
  token?: string
  code?: string
}
interface GoodsData {
  userid: number
  goods_name: string
  goods_id: number
  goods_imgUrl: string
  goods_price: number
  goods_num: number
  state: number
  // tip: string
  // type: string
  // keywords: string
  // desc: string
}
interface AddressInfo {
  add_id?: number
  userid?: number
  consignee: string
  moblie: string
  area: string
  address: string
  isDefault: boolean | number
}
export const reqGetTabBar = () => $http.get('/tabbar-list')

export const reqGetSwiperList = () => $http.get('/swiper-list')

export const reqGetIconList = () => $http.get('/icon-list')

export const reqGetXiaoqi = () => $http.get('/xiaoqi')

export const reqGetBannerSwiper = () => $http.get('/bannerswiper')

export const reqGetHotList = () => $http.get('/hot')

export const reqGetTea = () => $http.get('/tea')

export const reqGetLike = () => $http.get('/like')

export const reqGetSearchHot = () => $http.get('/search/hot')

export const reqGetSearchRecommend = () => $http.get('/search/recommend')

export const reqGetSearchRes = (query: SearchQuery) => $http.get('/search', { params: query })

export const reqGetListData = () => $http.get('/list')

export const reqGetUserOptions = () => $http.get('/user-options')

export const reqPostLogin = (data: Login) => $http.post('/login', data)

export const reqPostLoginByCode = (data: Login) => $http.post('/loginbycode', data)

export const reqPostSendCode = (tel: string) => $http.post('/sendcode', { tel })

export const reqPostRegister = (data: Login) => $http.post('/register', data)

export const reqPostChangePwd = (data: Login) => $http.post('/changepwd', data)

export const reqPostFindUser = (data: Login) => $http.post('/finduser', data)

export const reqPostAddtoCart = (data: GoodsData) => $http.post('/addtocart', data)

export const reqGetCartlist = (userid: number) => $http.get('/cartlist', { params: { userid } })

export const reqPostUpdateCartList = (data: GoodsData) => $http.post('/updatecartlist', data)

export const reqDeleteCartItem = (data: GoodsData) => $http.delete('/deletecartitem', { data })

export const reqPostAddNewAdd = (data: AddressInfo) => $http.post('/addnewaddress', data)

export const reqGetAddList = (userid: number) => $http.get('/addresslist', { params: { userid } })

export const reqGetAddressById = (id: number) => $http.get('/getaddress?id=' + id)

export const reqPostEditAddress = (data: AddressInfo) => $http.post('/editaddress', data)

export const reqDeleteAddress = (id: number) => $http.delete('/deleteaddress', { data: { id } })

export const reqPostChangeDefaultAdd = (data: AddressInfo) => $http.post('/changedefaultAdd', data)
