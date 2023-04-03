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
