<template>
  <div class="goods-action-bar">
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon
        icon="cart-o"
        text="购物车"
        @click="router.push('/cart')"
      />
      <van-action-bar-icon icon="star-o" text="店铺" />
      <van-action-bar-button
        type="warning"
        text="加入购物车"
        @click="addToCart"
      />
      <van-action-bar-button type="danger" text="立即购买" />
    </van-action-bar>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue'
import router from '@/router'
const _this = getCurrentInstance()

const mitter = _this?.appContext.config.globalProperties.mitter

const addToCart = () => {
  mitter.emit('add')
}
</script>

<style lang="less" scoped></style>
