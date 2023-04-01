<template>
  <div class="user">
    <Header></Header>
    <UserOptions></UserOptions>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/user/Header.vue'
import UserOptions from '@/components/user/UserOptions.vue'
</script>

<style lang="less" scoped>
.user {
  background-color: #f5f5f5;
  height: 100%;
  width: 100%;
}
</style>
