<template>
  <div class="hot-search">
    <div class="hd">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-huo"></use>
      </svg>
      热门搜索
    </div>
    <div class="bd">
      <a
        v-for="content in searchHotList"
        :key="content.id"
        @click="searchByTag(content.content)"
        >{{ content.content }}</a
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { reqGetSearchHot } from '@/api'
import router from '@/router'
interface SearchHot {
  id: number
  content: string
}
const searchHotList = ref<SearchHot[]>([])
// 发起请求获取热门搜索数据
const getSearchHotList = async () => {
  const { data: res } = await reqGetSearchHot()

  if (res.code === 200) {
    searchHotList.value = res.data
  }
}
// 点击热门搜索tag跳转到搜素结果页
const searchByTag = (word: string) => {
  router.push({
    name: 'result',
    query: {
      q: word
    }
  })
}
getSearchHotList()
</script>

<style lang="less" scoped>
.hot-search {
  margin: 0.2667rem 0.5333rem 0.5333rem;
  .hd {
    font-size: 0.4267rem;
    margin-bottom: 0.4rem;
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
