<template>
  <div class="list">
    <!-- 列表组件头部 -->
    <Header></Header>
    <section id="page">
      <!-- 列表侧边栏 -->
      <NavList></NavList>
      <!-- 列表内容 -->
      <NavWarp></NavWarp>
    </section>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/list/Header.vue'
import NavList from '@/components/list/NavList.vue'
import NavWarp from '@/components/list/NavWarp.vue'
</script>

<style lang="less" scoped>
.list {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

section {
  display: flex;
  padding-top: 1.0667rem;
  padding-bottom: 1.0667rem;
  flex: 1;
  overflow-y: scroll;
}
</style>
