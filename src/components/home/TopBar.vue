<template>
  <div class="home-topbar">
    <van-tabs color="#ac4440" v-model:active="active">
      <van-tab
        v-for="(item, index) in list"
        :key="index"
        :title="item.label"
      ></van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const active = ref(0)
const list = [
  { label: '推荐' },
  { label: '大红袍' },
  { label: '绿茶' },
  { label: '铁观音' },
  { label: '普洱' },
  { label: '茶具' },
  { label: '花茶' }
]
</script>

<style lang="less" scoped>
.home-topbar {
  position: fixed;
  top: 1.0667rem;
  left: 0;
  width: 100%;
  z-index: 999;
}
</style>
