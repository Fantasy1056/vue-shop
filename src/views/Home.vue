<template>
  <div class="home">
    <!-- 首页头部区域 -->
    <Header></Header>
    <TopBar></TopBar>
    <section ref="home">
      <!-- 首页轮播图 -->
      <Swiper></Swiper>
      <!-- 首页图标nav导航区域 -->
      <Icons></Icons>
      <!-- 首页头条区域 -->
      <HeadLine></HeadLine>
      <!-- 小七推荐区域 -->
      <div class="xiaoqi-tuijian">
        <!-- 组件预留插槽输入指定内容展示的组件 -->
        <Card>小七推荐</Card>
        <!-- 区域展示的内容根据传入的数据展示 -->
        <SmallBd :bdList="xiaoqi"></SmallBd>
      </div>
      <!-- 专题优选轮播图 -->
      <BannerSwiper></BannerSwiper>
      <!-- 火爆推荐区域 -->
      <Recommend></Recommend>
      <!-- 茶文化区域 -->
      <div class="tea">
        <!-- 组件预留插槽输入指定内容展示的组件 -->
        <Card>茶文化</Card>
        <!-- 区域展示的内容根据传入的数据展示 -->
        <SmallBd :bdList="tea"></SmallBd>
      </div>
      <!-- 猜你喜欢展示区域 -->
      <Like></Like>
    </section>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/home/Header.vue'
import TopBar from '@/components/home/TopBar.vue'
import Swiper from '@/components/home/Swiper.vue'
import Icons from '@/components/home/Icons.vue'
import HeadLine from '@/components/home/HeadLine.vue'
import Recommend from '@/components/home/Recommend.vue'
import Like from '@/components/home/Like.vue'
import Card from '@/components/home/Card.vue'
import SmallBd from '@/components/home/SmallBd.vue'
import BannerSwiper from '@/components/home/BannerSwiper.vue'
import { reqGetXiaoqi, reqGetTea } from '@/api/index'
import { ref } from 'vue'
import { user } from '@/store/user'
// 用户相关仓库
const store = user()
// 小七推荐的数据
const xiaoqi = ref([])
// 茶文化数据
const tea = ref([])
const home = ref()
// 如果用户数据仓库的登陆状态为false，则调用仓库的初始化用户方法
if (!store.loginState) {
  store.initUser()
}
// 获取小七推荐数据
const getXiaoqi = async () => {
  const { data: res } = await reqGetXiaoqi()

  if (res.code === 200) {
    xiaoqi.value = res.data
  }
}
// 获取小茶文化数据
const getTea = async () => {
  const { data: res } = await reqGetTea()

  if (res.code === 200) {
    tea.value = res.data
  }
}
getXiaoqi()
getTea()
</script>

<style lang="less" scoped>
.home {
  position: relative;
  display: flex;
  overflow: hidden;
  background-color: #f5f5f5;
  overflow: scroll;
}
section {
  width: 100%;
  margin-top: 2.3467rem;
  padding-bottom: 1.0667rem;
}
</style>
