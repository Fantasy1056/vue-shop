import { $http } from './axios'

export const reqGetTabBar = () => $http.get('/tabbar-list')

export const reqGetSwiperList = () => $http.get('/swiper-list')

export const reqGetIconList = () => $http.get('/icon-list')

export const reqGetXiaoqi = () => $http.get('/xiaoqi')

export const reqGetBannerSwiper = () => $http.get('/bannerswiper')

export const reqGetHotList = () => $http.get('/hot')

export const reqGetTea = () => $http.get('/tea')

export const reqGetLike = () => $http.get('/like')
