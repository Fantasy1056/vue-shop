<template>
  <div class="home">
    <Header></Header>
    <TopBar></TopBar>
    <section>
      <Swiper></Swiper>
      <Icons></Icons>
      <HeadLine></HeadLine>
      <div class="xiaoqi-tuijian">
        <Card>小七推荐</Card>
        <SmallBd :bdList="xiaoqi"></SmallBd>
      </div>
      <BannerSwiper></BannerSwiper>
      <Recommend></Recommend>
      <div class="tea">
        <Card>茶文化</Card>
        <SmallBd :bdList="tea"></SmallBd>
      </div>
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
const xiaoqi = ref([])
const tea = ref([])
const getXiaoqi = async () => {
  const { data: res } = await reqGetXiaoqi()

  if (res.code === 200) {
    xiaoqi.value = res.data
  }
}
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
}
section {
  flex: 1;
  margin-top: 2.3467rem;
  padding-bottom: 1.0667rem;
  overflow: scroll;
}
</style>
