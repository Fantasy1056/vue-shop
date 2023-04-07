<template>
  <div class="search-history" v-if="historyList.length !== 0">
    <div class="hd">
      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-lishi"></use>
        </svg>
        历史搜索
      </div>
      <div class="right" @click="clearHistory">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shanchu"></use>
        </svg>
        删除记录
      </div>
    </div>
    <div class="bd">
      <a
        v-for="(word, index) in historyList"
        :key="index"
        @click="searchByTag(word)"
        >{{ word }}</a
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import router from '@/router'
import { showConfirmDialog, showToast } from 'vant'
// 获取本地存储的历史数据
const historyList = ref<string[]>(
  JSON.parse(localStorage.getItem('history') as string) || []
)
// 清除搜素记录方法
const clearHistory = () => {
  showConfirmDialog({
    title: '警告',
    message: '确定要清除历史记录吗？'
  })
    .then(() => {
      historyList.value = []
      localStorage.removeItem('history')
    })
    .catch(() => {
      showToast('删除取消')
    })
}
// 点击历史搜素的tag,跳转到搜素结果页,携带tag的内容
const searchByTag = (word: string) => {
  router.push({
    name: 'result',
    query: {
      q: word
    }
  })
}
</script>

<style lang="less" scoped>
.search-history {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.2667rem 0.5333rem 0.5333rem;
  .hd {
    font-size: 0.4267rem;
    margin-bottom: 0.4rem;
    width: 100%;
    .left {
      float: left;
    }
    .right {
      float: right;
    }
    .icon {
      color: #ac4440;
      margin-right: 0.1333rem;
    }
  }
  .bd {
    width: 100%;
    a {
      display: inline-block;
      border: 1px solid #eee;
      color: #666;
      padding: 0.1333rem;
      margin: 0 0.4rem 0.4rem 0;
    }
  }
}
</style>
