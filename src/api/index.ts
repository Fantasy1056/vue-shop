import { $http } from './axios'
interface SearchQuery {
  word?: string
  type?: string
  sift?: string
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
