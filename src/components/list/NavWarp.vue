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

const _this = getCurrentInstance()
const mitter = _this?.appContext.config.globalProperties.mitter
const listData = computed(() => store.listData)

let height = 0

const heightArr = ref<number[]>([])

const warp = ref()

const menu = ref<HTMLElement[]>([])

const store = list()

// const throttle = (fn: any, delay: number) => {
//   let valid = true
//   return function () {
//     if (!valid) return false

//     valid = true
//     setTimeout(() => {
//       fn()
//       valid = true
//     }, delay)
//   }
// }

const getNewTop = () => {
  const scrollHeight = parseInt(warp.value.scrollTop)
  const res = heightArr.value.findIndex((h, index, arr) => {
    return scrollHeight > h && scrollHeight < arr[index + 1]
  })
  if (res !== -1) {
    store.listIndex = res
  }
}

store.getListData()
onMounted(() => {
  setTimeout(() => {
    heightArr.value.push(height)
    menu.value.forEach((element: HTMLElement) => {
      height += element.clientHeight
      heightArr.value.push(height)
    })
  }, 100)

  mitter.on('index', async (val: number) => {
    nextTick(() => {
      if (warp.value) {
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
