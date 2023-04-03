<template>
  <div class="nav-list">
    <ul>
      <li
        :class="{ active: index === store.listIndex }"
        v-for="(title, index) in listData"
        :key="title.id"
      >
        <a @click="changeIndex(index)">{{ title.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, onBeforeUnmount, onActivated } from 'vue'
import { list } from '@/store/list'

const store = list()

const _this = getCurrentInstance()
const mitter = _this?.appContext.config.globalProperties.mitter

const listData = computed(() => store.listData)

const changeIndex = (index: number) => {
  store.listIndex = index
  mitter.emit('index', index)
}
onActivated(() => {
  store.listIndex = 0
})
onBeforeUnmount(() => {
  store.listIndex = 0
})
</script>

<style lang="less" scoped>
.nav-list {
  position: fixed;
  top: 1.0667rem;
  left: 0;
  height: 100%;
  width: 2.5rem;
  z-index: 90;
  border-right: 1px solid #efefef;
  overflow: hidden;
  ul {
    z-index: 90;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    overflow-y: auto;
    overflow-x: hidden;
    li {
      float: left;
      width: 100%;
      height: 0.8rem;
      line-height: 0.8rem;
      margin-top: 0.4rem;
      font-size: 0.3733rem;
      text-align: center;
      a {
        color: #222;
      }
    }

    .active {
      color: #ac4440;
      border-left: 3px solid #ac4440;
      a {
        color: #ac4440;
      }
    }
  }
}
</style>
