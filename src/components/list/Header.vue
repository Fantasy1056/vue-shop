<template>
  <div class="list-header">
    <div class="back" @click="router.go(-1)">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
    </div>
    <div class="search-input" @click="goToSearch">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <span>搜素您喜欢的...</span>
    </div>
    <a class="search-btn" @click="goToHome">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31shouye"></use>
      </svg>
    </a>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'

const goToSearch = () => {
  router.push('/search')
}
const goToHome = () => {
  router.push('/')
}
</script>

<style lang="less" scoped>
.list-header {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 1.0667rem;
  background-color: #ac4440;
  padding: 0 0.2667rem;
  z-index: 999;
  .back {
    color: #fff;
    font-size: 0.5333rem;
  }
  .search-input {
    position: relative;
    flex: 1;
    height: 0.6667rem;
    background-color: #fff;
    border-radius: 0.5333rem;
    margin: 0 0.2667rem;
    color: #333;
    .icon {
      position: absolute;
      top: 50%;
      left: 0.133rem;
      transform: translateY(-50%);
      font-size: 0.5333rem;
    }
    span {
      position: absolute;
      top: 50%;
      left: 0.8rem;
      transform: translateY(-50%);
    }
  }
  .search-btn {
    text-align: center;
    line-height: 1.0667rem;
    font-size: 0.6rem;
    color: #fff;
  }
}
</style>
