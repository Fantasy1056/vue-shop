<template>
  <div class="home-swiper">
    <van-swipe autoplay="3000" indicator-color="#ac4440">
      <van-swipe-item v-for="img in swiperList" :key="img.id">
        <img :src="img.url" alt="" style="width: 100%"
      /></van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { reqGetSwiperList } from '@/api'
interface Swiper {
  id: number
  url: string
}
const swiperList = ref<Swiper[]>([])

const getSwiperList = async () => {
  const { data: res } = await reqGetSwiperList()

  if (res.code === 200) {
    swiperList.value = res.data
  }
}
getSwiperList()
</script>

<style lang="less" scoped>
.home-swiper {
  width: 100%;
  height: 4.2667rem;
  .van-swipe {
    height: 100%;
  }
}
</style>
