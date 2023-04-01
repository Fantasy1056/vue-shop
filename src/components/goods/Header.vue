<template>
  <div class="goods-header">
    <div class="bd" v-show="isShow">
      <a @click="router.push('/')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </a>
      <a @click="router.push('/')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-31shouye"></use>
        </svg>
      </a>
    </div>
    <div class="bg" v-show="!isShow" :style="{ opacity: opacity }">
      <a @click="router.go(-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </a>
      <div class="header-nav">
        <ul>
          <li>商品详情</li>
          <li>商品评价</li>
        </ul>
      </div>
      <a @click="router.push('/')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-31shouye"></use>
        </svg>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
import { ref, getCurrentInstance, onMounted } from 'vue'
const _this = getCurrentInstance()
const mitter = _this?.appContext.config.globalProperties.mitter
const isShow = ref(true)
const opacity = ref(0)

onMounted(() => {
  mitter.on('show', (val: { state: boolean; pos: number }) => {
    isShow.value = val.state
    opacity.value = val.pos
  })
})
</script>

<style lang="less" scoped>
.goods-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 1.1733rem;
  z-index: 999;
  .bd,
  .bg {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 0.2667rem;
    // animation: changeHeader 1s linear;
    a {
      width: 0.9333rem;
      height: 0.9333rem;
      font-size: 0.5rem;
      text-align: center;
      line-height: 0.9333rem;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      color: #fff;
    }
  }
  .bg {
    background-color: #fff;
    // animation: changeHeader 1s linear;
    a {
      background: none;
      color: #222;
    }
    .header-nav {
      flex: 1;
      height: 100%;
      ul {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        li {
          width: 2.6667rem;
          text-align: center;
          font-size: 0.4267rem;
          color: #333;
          .active {
            font-weight: 700;
            margin-bottom: 2px soild #d22531;
          }
        }
      }
    }
  }
}

@keyframes changeHeader {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
