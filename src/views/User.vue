<template>
  <div class="user">
    <Header></Header>
    <UserOptions></UserOptions>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/user/Header.vue'
import UserOptions from '@/components/user/UserOptions.vue'
import { user } from '@/store/user'
// 如果用户数据仓库的登陆状态为false，则调用仓库的初始化用户方法
const store = user()
if (!store.loginState) {
  store.initUser()
}
</script>

<style lang="less" scoped>
.user {
  background-color: #f5f5f5;
  height: 100%;
  width: 100%;
}
</style>
