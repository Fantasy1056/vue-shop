<template>
  <div class="search-recommend">
    <div class="hd">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tuijian"></use>
      </svg>
      推荐商品
    </div>
    <div class="bd">
      <ul>
        <li v-for="item in searchRecommendList" :key="item.id">
          <a @click="goToGoods(item.id)">
            <div class="pic">
              <img v-lazy="item.imgUrl" alt="" />
              <span class="tip">{{ item.tip }}</span>
            </div>
            <div class="txt">{{ item.name }}</div>
            <div class="price">
              <span>{{ item.price }}<i>元</i></span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { reqGetSearchRecommend } from '@/api/index'
import router from '@/router'
interface SearchRecommed {
  id: number
  imgUrl: string
  name: string
  tip: string
  price: number
}
const searchRecommendList = ref<SearchRecommed[]>([])

const getSearchRecommendList = async () => {
  const { data: res } = await reqGetSearchRecommend()

  if (res.code === 200) {
    searchRecommendList.value = res.data
  }
}
const goToGoods = (id: number) => {
  router.push({
    path: '/goods',
    query: {
      id
    }
  })
}
getSearchRecommendList()
</script>

<style lang="less" scoped>
.search-recommend {
  width: 100%;
  overflow: scroll;
  .hd {
    width: 100%;
    padding: 0.5333rem;
    color: #333;
    font-size: 0.4267rem;
    .icon {
      color: #ac4440;
      margin-right: 0.1333rem;
    }
  }
  .bd {
    width: 100%;
    ul {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      li {
        width: 50%;
        padding-bottom: 0.2rem;
        background-color: #fff;
        a {
          display: block;
          width: 100%;
          padding: 0.3rem;
          .pic {
            position: relative;
            width: 100%;
            img {
              width: 100%;
              display: block;
            }
            .tip {
              position: absolute;
              bottom: 0;
              width: 100%;
              padding: 5px;
              font-size: 0.32rem;
              color: #fff;
              background: rgba(0, 0, 0, 0.4);
            }
          }
          .txt {
            width: 100%;
            height: 1.2rem;
            line-height: 0.5rem;
            padding: 0.15rem 0rem 0.15rem;
            font-size: 0.3733rem;
            color: #333;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .price {
            padding-top: 0.1333rem;
            color: #ff6600;
            span {
              font-size: 0.48rem;
              i {
                font-style: normal;
                font-size: 0.3733rem;
              }
            }
          }
        }
        &:nth-child(even) {
          padding-left: 0.0133rem;
        }
        &:nth-child(odd) {
          padding-right: 0.0133rem;
        }
      }
    }
  }
}
</style>
