<template>
  <div class="goods" @scroll="changeHeader" ref="goods">
    <Header></Header>
    <section id="page" v-if="goodsData[0]">
      <div class="goods_img">
        <img :src="goodsData[0].imgUrl" alt="" />
      </div>
      <div class="goods_name">
        <h1>{{ goodsData[0].name }}</h1>
        <p class="desc">{{ goodsData[0].desc }}</p>
      </div>
      <div class="goods_price">
        <div class="present-price">
          <div class="price">{{ goodsData[0].price }}</div>
        </div>
      </div>
      <div class="goods_additional">
        <ul>
          <li>
            <div class="bd">
              <div class="col_l">服务</div>
              <div class="col_r">
                <div class="slist">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-duihao"></use>
                  </svg>
                  满99元包邮
                </div>
                <div class="slist">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-duihao"></use>
                  </svg>
                  48小时发货
                </div>
                <div class="slist">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-duihao"></use>
                  </svg>
                  7天无理由退货
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="goods_img">
        <img :src="goodsData[0].imgUrl" alt="" />
      </div>
      <div class="goods_img">
        <img :src="goodsData[0].imgUrl" alt="" />
      </div>
      <div class="goods_img">
        <img :src="goodsData[0].imgUrl" alt="" />
      </div>
      <div class="goods_img">
        <img :src="goodsData[0].imgUrl" alt="" />
      </div>
    </section>
    <ActionBar></ActionBar>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/goods/Header.vue'
import ActionBar from '@/components/goods/ActionBar.vue'
import { ref, getCurrentInstance, onActivated } from 'vue'
import { reqGetSearchRes } from '@/api'
import { useRoute } from 'vue-router'
interface GoodsData {
  id: number
  desc: string
  imgUrl: string
  name: string
  price: number
}
const goodsData = ref<GoodsData[]>([])
const route = useRoute()
const goods = ref()
const _this = getCurrentInstance()
const mitter = _this?.appContext.config.globalProperties.mitter
const id = ref(parseInt(route.query.id as any))

onActivated(() => {
  if (id.value !== (route.query.id as any)) {
    id.value = route.query.id as any
    getGoodsData()
  }
})

let opacity = 0
const getGoodsData = async () => {
  const { data: res } = await reqGetSearchRes({ id: id.value })
  goodsData.value = res.data
}

const changeHeader = () => {
  const scroll = goods.value.scrollTop
  opacity = scroll / 180 > 1 ? 1 : scroll / 180
  if (scroll >= 50) {
    mitter.emit('show', { state: false, pos: opacity })
  } else {
    mitter.emit('show', { state: true, pos: opacity })
  }
}
</script>

<style lang="less" scoped>
.goods {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  overflow-y: scroll;
  section {
    width: 100%;
    overflow: scroll;
    .goods_img {
      width: 100%;
      height: 100%;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .goods_name {
      position: relative;
      width: 100%;
      background-color: #fff;
      height: auto;
      padding: 0.3rem;
      h1 {
        font-size: 0.48rem;
        color: #333;
        line-height: 1.4;
        font-weight: normal;
      }
      .desc {
        font-size: 0.3733rem;
        color: #999;
        padding-top: 0.1rem;
      }
    }
    .goods_price {
      width: 100%;
      height: auto;
      background-color: #fff;
      line-height: 1;
      padding: 0 0.3rem 0.3rem;
      border-bottom: 1px solid #e1e1e1;
      .present-price {
        width: 100%;
        padding-top: 0.3rem;
        .price {
          font-size: 0.75rem;
          color: #d22531;
          &::before {
            content: '￥';
            display: inline-block;
            font-size: 0.42rem;
            text-indent: 0rem;
          }
        }
      }
    }
    .goods_additional {
      display: flex;
      width: 100%;
      margin: 0.2667rem 0;
      background-color: #fff;
      ul {
        display: flex;
        width: 100%;
        li {
          width: 100%;
          display: flex;
          margin-left: 0.3rem;
          .bd {
            display: flex;
            width: 100%;
            padding: 0.4rem 0;
            .col_l {
              min-width: 1.4rem;
              max-width: 60px;
              display: block;
              color: #999;
            }
            .col_r {
              flex: 1;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              .slist {
                display: inline-block;
                padding-right: 0.2rem;
                .icon {
                  color: #d22531;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
