<template>
  <div class="search-header">
    <div class="back" @click="router.go(-1)">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
    </div>
    <div class="search-input">
      <input type="text" placeholder="搜索您喜欢的产品..." v-model="keyWord" />
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
    <a class="search-btn" @click="searchTea">搜索</a>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'

const route = useRoute()
// 如果当前路由存在q属性则说明当前路由是主页搜索跳转来的，则输入框默认展示搜索的内容，否则为空
const keyWord = ref((route.query.q as string) || '')
// 获取本地存储的历史数据
const historyList = ref<string[]>(
  JSON.parse(localStorage.getItem('history') as string) || []
)
// 搜索方法
const searchTea = () => {
  // keyWord关键字不为空时
  if (keyWord.value !== '') {
    // 向历史数据数组头部添加搜索的关键字
    historyList.value.unshift(keyWord.value)
    // 去重
    const newArr = new Set(historyList.value)
    // 再把新的历史数据数组保存到本地存储
    localStorage.setItem('history', JSON.stringify(Array.from(newArr)))
  }
  // 跳转到搜索结果页，携带搜索关键字
  router.push({
    path: '/search/result',
    query: {
      q: keyWord.value
    }
  })
}
</script>

<style lang="less" scoped>
.search-header {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 1.0667rem;
  background-color: #ac4440;
  padding: 0 0.2667rem;
  z-index: 999;
  .back {
    color: #fff;
    font-size: 0.5333rem;
  }
  .search-input {
    position: relative;
    flex: 1;
    height: 0.6667rem;
    margin: 0 0.2667rem;
    input {
      width: 100%;
      height: 100%;
      background-color: #fff;
      border-radius: 0.5333rem;
      padding-left: 0.7rem;
      color: #666;
      border: 0;
      outline: none;
    }
    .icon {
      position: absolute;
      top: 50%;
      left: 0.133rem;
      transform: translateY(-50%);
      font-size: 0.5333rem;
      color: #666;
    }
    span {
      position: absolute;
      top: 50%;
      left: 0.8rem;
      transform: translateY(-50%);
    }
  }
  .search-btn {
    width: 1.0667rem;
    height: 1.0667rem;
    text-align: center;
    line-height: 1.0667rem;
    font-size: 0.4267rem;
    color: #fff;
  }
}
</style>
