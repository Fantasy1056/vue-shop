<template>
  <div class="nav-warp" ref="warp" @scroll="getNewTop">
    <!-- <div class="ad">
      <img
        src="http://img.tea7.com/0167148_0.jpeg?x-oss-process=image/resize,w_400"
        alt=""
      />
    </div> -->
    <div class="nav-menu" v-for="item in listData" :key="item.id" ref="menu">
      <div class="nav-item" v-for="list in item.data" :key="list.id">
        <span class="nav-hd">{{ list.title }}</span>
        <ul>
          <li v-for="goods in list.list" :key="goods.id">
            <img :src="goods.img" alt="" />
            <span>{{ goods.title }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="nav-menu">
      <div class="space"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, getCurrentInstance, nextTick } from 'vue'
import { list } from '@/store/list'
// 获取当前组件实例
const _this = getCurrentInstance()
// 全局事件总线
const mitter = _this?.appContext.config.globalProperties.mitter
// 列表数据
const listData = computed(() => store.listData)
// 每一个nav-item距离页面顶部的距离数组
const heightArr = ref<number[]>([])
// nav-item的父元素warp
const warp = ref()
/// 列表数据仓库
const store = list()
// nav-item元素数组
const menu = ref<HTMLElement[]>([])
// 监听页面滚动触发的方法
const getNewTop = () => {
  // 当前滚动的距离
  const scrollHeight = parseInt(warp.value.scrollTop)
  // 根据滚动距离查找距离顶部高度数组符合条件的高度的index
  const res = heightArr.value.findIndex((h, index, arr) => {
    // 如果当前下标的高度值小于滚动距离，并且当前下标+1大于滚动距离则返回当前下标
    return scrollHeight > h && scrollHeight < arr[index + 1]
  })
  if (res !== -1) {
    // 返回的下标不为-1时，将仓库listIndex修改为返回的下标
    // 列表侧边栏组件就会根据改变后的下标，给对应侧边栏列表对应下标的选项高亮显示
    store.listIndex = res
  }
}
// 仓库的获取列表数据方法
store.getListData()
// 组件全部挂在完毕
onMounted(() => {
  // 设置个定时器，不然有可能会获取不到元素
  setTimeout(() => {
    // 遍历nav-item的数组，获取每个nav-item距离顶部的高度
    menu.value.forEach((element: HTMLElement) => {
      // 因为header组件是fixed定位，所以距离顶部的高度要减去header组件的高度
      heightArr.value.push(element.offsetTop - 40)
    })
  }, 100)
  // 监听响应列表侧边栏组件的自定义事件
  mitter.on('index', async (val: number) => {
    nextTick(() => {
      // 当前组件元素存在时
      if (warp.value) {
        // 将页面滚动高度修改为：距离顶部高度数组【自定义事件发送来的下标】
        warp.value.scrollTop = heightArr.value[val]
      }
    })
  })
})
</script>

<style lang="less" scoped>
.nav-warp {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 2.5rem;
  overflow-y: scroll;
  .ad {
    width: 100%;
    padding: 0.2667rem;
    img {
      display: block;
      width: 100%;
    }
  }
  .nav-menu {
    display: flex;
    width: 100%;
    padding: 10px;
    .nav-item {
      width: 100%;
      margin-bottom: 0.2667rem;
      color: #333;
      .nav-hd {
        display: block;
        text-align: center;
        margin: 0.5333rem auto 0.2667rem;
        font-size: 0.48rem;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        width: 100%;
        li {
          width: 33.33%;
          padding: 0.2667rem;
          img {
            display: block;
            border-radius: 50%;
            width: 80%;
            margin: 0 auto;
          }
          span {
            display: block;
            font-size: 0.3733rem;
            text-align: center;
          }
        }
      }
    }
    .space {
      height: 400px;
    }
  }
}
</style>
