<template>
  <div class="user-header">
    <div class="bd">
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
    <div class="no-login">
      <a href="">登录 / 注册</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
</script>

<style lang="less" scoped>
.user-header {
  background-image: url(https://m.tea7.com/Themes/Mobile/images/IntegralShop/cbtopbg.jpg);
  background-size: cover;
  .bd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1.0667rem;
    padding: 0 0.2667rem;
    // animation: changeHeader 1s linear;
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
  .no-login {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 3rem;
    a {
      background: rgba(255, 181, 0, 0.9);
      padding: 5px 20px;
      color: #fff;
      border-radius: 5px;
      font-size: 0.4rem;
    }
  }
}
</style>
