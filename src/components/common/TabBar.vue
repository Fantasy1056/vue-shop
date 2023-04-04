<template>
  <div class="tabbar-container">
    <ul class="tabbar">
      <li
        :class="{ active: active === tab.active }"
        v-for="(tab, index) in routerList"
        :key="index"
      >
        <router-link :to="tab.path">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="tab.icon"></use>
          </svg>
          {{ tab.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { reqGetTabBar } from '@/api/index'
interface TabBar {
  active: number
  icon: string
  path: string
  title: string
}
const props = defineProps(['index'])
const active = computed(() => props.index)
const routerList = ref<TabBar[]>([])
const getTabBar = async () => {
  const { data: res } = await reqGetTabBar()

  if (res.code === 200) {
    routerList.value = res.data
  }
}
getTabBar()
</script>

<style lang="less" scoped>
.tabbar-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.0667rem;
  z-index: 999;
  background-color: #fff;
  border-top: 1px solid #efefef;
  .tabbar {
    display: flex;
    width: 100%;
    height: 100%;
    li {
      flex: 1;
      a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 0.3733rem;
        color: #333;
        .icon {
          font-size: 0.5333rem;
          font-weight: 600;
        }
      }
    }
    .active {
      a {
        color: #ac4440;
        .icon {
          color: #ac4440 !important;
        }
      }
    }
  }
}
</style>
