<template>
  <div class="user-header">
    <div class="bd">
      <a @click="router.go(-1)">
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
    <div class="my-info" v-if="loginState">
      <a>
        <img
          src="http://tea7content.oss-cn-shenzhen.aliyuncs.com/logos/tea7_logo.png"
          alt=""
        />
      </a>
      <div class="info">
        <p class="nickname">{{ userData.tel }}</p>
      </div>
      <a class="logout" @click="logout">退出登录</a>
    </div>
    <div class="no-login" v-else>
      <a @click="router.push('/login/loginsms')">登录 / 注册</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
import { user } from '@/store/user'
import { computed } from '@vue/reactivity'
import { showConfirmDialog, showSuccessToast } from 'vant'

const store = user()

const userData = computed(() => store.userData)

const loginState = computed(() => store.loginState)

const logout = () => {
  showConfirmDialog({
    title: '退出登录',
    message: '确定退出登录吗？'
  })
    .then(() => {
      showSuccessToast('退出成功！')
      localStorage.removeItem('token')
      store.loginState = false
      router.push('/login/loginsms')
    })
    .catch(() => {
      return false
    })
}
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
  .my-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.5333rem;
    a {
      border-radius: 50%;
      overflow: hidden;
      img {
        display: block;
        width: 2.6667rem;
        height: 2.6667rem;
      }
    }
    .info {
      font-size: 0.4267rem;
      color: #fff;
      margin-left: 0.2666rem;
    }
    .logout {
      flex: 1;
      font-size: 0.3733rem;
      color: #fff;
      border-radius: 0;
      text-align: right;
    }
  }
}
</style>
