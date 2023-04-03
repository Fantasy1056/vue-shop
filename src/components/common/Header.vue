<template>
  <div class="header">
    <a @click="router.go(-1)">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
    </a>
    <h2><slot>登录</slot></h2>
    <a @click="router.push('/')">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31shouye"></use>
      </svg>
    </a>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
</script>

<style lang="less" scoped>
.header {
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
  a {
    width: 0.9333rem;
    height: 0.9333rem;
    font-size: 0.5rem;
    text-align: center;
    line-height: 0.9333rem;
    border-radius: 50%;
    color: #fff;
  }
}
</style>
