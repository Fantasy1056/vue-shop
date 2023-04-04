<template>
  <div class="cart-header">
    <a @click="router.go(-1)" class="back">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
    </a>
    <h2><slot>购物车</slot></h2>
    <a v-if="isEdit" @click="isEdit = !isEdit"> 完成 </a>
    <a v-else @click="isEdit = !isEdit"> 编辑 </a>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
import { ref } from 'vue'

const isEdit = ref(false)
</script>

<style lang="less" scoped>
.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1.0667rem;
  background-color: #b0352f;
  h2 {
    flex: 1;
    text-align: center;
    line-height: 1.0667rem;
    color: #fff;
    font-weight: normal;
  }
  .back {
    width: 0.9333rem;
    height: 0.9333rem;
    font-size: 0.5rem;
    text-align: center;
    line-height: 0.9333rem;
    border-radius: 50%;
    color: #fff;
    margin-left: 0.2667rem;
  }
  a {
    height: 100%;
    line-height: 1.0667rem;
    color: #fff;
    font-size: 0.3733rem;
    padding-right: 0.2667rem;
  }
}
</style>
