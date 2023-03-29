<template>
  <router-view />
  <TabBar v-if="isShowTabBar"></TabBar>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import TabBar from './components/common/TabBar.vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const isShowTabBar = computed(() => route.meta.isShowTabBar)
</script>

<style lang="less"></style>
