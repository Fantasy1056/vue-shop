<template>
  <div class="search-result">
    <Header></Header>
    <section id="page">
      <div class="filter-tab">
        <ul>
          <li
            :class="{ active: filterIndex === index }"
            @click="changeTabIndex(index)"
            v-for="(item, index) in tabData"
            :key="index"
          >
            <div>{{ item.title }}</div>
            <div class="arrow" v-if="index !== 0">
              <svg
                class="icon"
                aria-hidden="true"
                :class="{
                  active: filterIndex === index && item.sift === 'asc'
                }"
              >
                <use xlink:href="#icon-shangjiantou"></use>
              </svg>
              <svg
                class="icon"
                aria-hidden="true"
                :class="{
                  active: filterIndex === index && item.sift === 'desc'
                }"
              >
                <use xlink:href="#icon-xiajiantou"></use>
              </svg>
            </div>
          </li>
        </ul>
      </div>
      <div class="product-list">
        <ul>
          <li v-for="item in searchList" :key="item.id">
            <a href="">
              <img v-lazy="item.imgUrl" alt="" />
              <p class="txt">{{ item.name }}</p>
              <div class="pb">
                <div class="price">
                  <span>￥{{ item.price }}</span>
                </div>
                <div class="btn"><span>立即购买</span></div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/search/Header.vue'
import { computed, ref } from 'vue'
import { search } from '@/store/search'
import { reqGetSearchRes } from '@/api'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = search()

const filterIndex = ref(0)

const tabData = ref([
  {
    type: 'id',
    sift: 'asc',
    title: '综合'
  },
  {
    type: 'price',
    sift: 'asc',
    title: '价格'
  },
  {
    type: 'sales',
    sift: 'asc',
    title: '销量'
  }
])

const queryData = ref({
  word: route.query.q as string,
  type: '',
  sift: ''
})

const getSearchRes = async () => {
  const { data: res } = await reqGetSearchRes(queryData.value)

  store.searchResList = res.data
}

const changeTabIndex = (index: number) => {
  if (index === 0) {
    queryData.value.type = ''
    queryData.value.sift = ''
    filterIndex.value = index
    return getSearchRes()
  }
  tabData.value[index].sift = 'asc'
  if (index === filterIndex.value) {
    if (tabData.value[index].sift === 'asc') {
      tabData.value[index].sift = 'desc'
    } else {
      tabData.value[index].sift = 'asc'
    }
  }
  queryData.value.type = tabData.value[index].type
  queryData.value.sift = tabData.value[index].sift
  filterIndex.value = index
  getSearchRes()
}

getSearchRes()
const searchList = computed(() => store.searchResList)
</script>

<style lang="less" scoped>
section {
  padding-top: 1.0667rem;
  padding-bottom: 1.0667rem;
}
.search-result {
  position: relative;
  width: 100%;
  padding-top: 1.0667rem;
  .filter-tab {
    position: absolute;
    top: 1.0667rem;
    left: 0;
    width: 100%;
    height: 1.0667rem;
    background-color: #fff;
    ul {
      display: flex;
      height: 100%;
      justify-content: space-around;
      li {
        display: flex;
        font-size: 16px;
        text-align: center;
        padding: 0px 0.2667rem;
        line-height: 1.0667rem;
        color: #666;
        .arrow {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-left: 0.1333rem;
          .icon {
            font-size: 0.32rem;
            color: #666;
          }
          .active {
            color: #b0352f;
          }
        }
      }
      .active {
        color: #b0352f;
      }
    }
  }
  .product-list {
    width: 100%;
    overflow: scroll;
    ul {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      li {
        position: relative;
        width: 50%;
        padding-bottom: 0.05rem;
        a {
          padding: 0.2rem 0.2rem 0.1rem;
          display: block;
          background-color: #fff;
          img {
            display: block;
            width: 100%;
          }
          .txt {
            font-size: 14px;
            color: #333;
            line-height: 0.6rem;
            padding: 0.1rem 0 0rem;
            height: 0.6rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .pb {
            display: flex;
            align-items: center;
            width: 100%;
            min-height: 1rem;
            .price {
              display: flex;
              align-items: center;
              min-height: 0.9rem;
              width: 60%;
              span {
                color: #b0352f;
                min-width: 2.1333rem;
              }
            }
            .btn {
              width: 40%;
              span {
                display: block;
                padding: 0.1rem 0.2rem;
                font-size: 100%;
                color: #fff;
                background-color: #b0352f;
                text-align: center;
                border-radius: 5px;
                font-size: 0.34rem;
                white-space: nowrap;
              }
            }
          }
        }
        &:nth-child(odd) {
          padding-right: 0.025rem;
        }
        &:nth-child(even) {
          padding-left: 0.025rem;
        }
      }
    }
  }
}
</style>
