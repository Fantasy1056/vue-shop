<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-if="route.meta.keepalive" />
    </keep-alive>
    <component :is="Component" v-if="!route.meta.keepalive" />
  </router-view>
  <!-- <router-view></router-view> -->
  <TabBar v-show="isShowTabBar" :index="route.meta.tabBarIndex"></TabBar>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import TabBar from './components/common/TabBar.vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const isShowTabBar = computed(() => route.meta.isShowTabBar)
</script>

<style lang="less"></style>
