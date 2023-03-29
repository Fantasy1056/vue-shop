<template>
  <div class="home-card">
    <h1><slot> 火爆推荐</slot></h1>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.home-card {
  width: 100%;
  text-align: center;
  padding: 0.2667rem 0;
  background-color: #fff;
  h1 {
    position: relative;
    font-size: 0.5867rem;
    &::after,
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      right: 3.2rem;
      transform: translateY(-50%);
      width: 0.2133rem;
      height: 0.2133rem;
      background-color: #ac4440;
      border-radius: 50%;
    }
    &::before {
      left: 3.2rem;
    }
  }
}
</style>
