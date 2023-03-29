<template>
  <div class="home-banner-swiper">
    <Card>专题优选</Card>
    <div class="swiper">
      <van-swipe :width="300" :loop="false" :show-indicators="false">
        <van-swipe-item v-for="item in bannerSwiper" :key="item.id">
          <div class="img">
            <img :src="item.url" alt="" />
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Card from './Card.vue'
import { ref } from 'vue'
import { reqGetBannerSwiper } from '@/api'
interface BannerSwiper {
  id: number
  url: string
}
const bannerSwiper = ref<BannerSwiper[]>([])

const getBannerSwiper = async () => {
  const { data: res } = await reqGetBannerSwiper()

  if (res.code === 200) {
    bannerSwiper.value = res.data
  }
}
getBannerSwiper()
</script>

<style lang="less" scoped>
.home-banner-swiper {
  background-color: #fff;
}
.img {
  width: 7.4rem;
  margin-left: 0.4rem;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
  }
}
</style>
