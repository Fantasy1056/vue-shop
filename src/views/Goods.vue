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
import { ref, getCurrentInstance, onActivated, onMounted } from 'vue'
import { reqGetSearchRes, reqPostAddtoCart } from '@/api'
import { useRoute } from 'vue-router'
import { user } from '@/store/user'
import { cart } from '@/store/cart'
import router from '@/router'
import { showFailToast, showSuccessToast } from 'vant'
interface GoodsData {
  id: number
  desc: string
  imgUrl: string
  name: string
  price: number
  tip: string
  type: string
  keywords: string
  sales: number
}

const route = useRoute()
// 当前组件最外层的dom实例
const goods = ref()
// 用户数据store
const store = user()
// 商品数据
const goodsData = ref<GoodsData[]>([])
// 当前组件实例
const _this = getCurrentInstance()
// 全局事件总线
const mitter = _this?.appContext.config.globalProperties.mitter
// 路由携带的id值
const id = ref(parseInt(route.query.id as any))
// 当keepalive组件进入时触发的方法
onActivated(() => {
  // 如果当前存储的id不等于再次进入携带的路由参数id
  if (id.value !== (route.query.id as any)) {
    // 保存新的id
    id.value = route.query.id as any
    // 重新获取商品数据
    getGoodsData()
  }
})

// 根据路由参数id获取当前商品数据
const getGoodsData = async () => {
  const { data: res } = await reqGetSearchRes({ id: id.value })
  goodsData.value = res.data
}
let opacity = 0
// 当前页面滚动触发的方法
const changeHeader = () => {
  // 获取滚动距离
  const scroll = goods.value.scrollTop
  // 透明度等于滚动距离/180 如果大于1结果只等于1
  opacity = scroll / 180 > 1 ? 1 : scroll / 180
  // 滚动距离大于50,发送自定义事件通知header改变展示的内容和切换的透明度
  if (scroll >= 50) {
    mitter.emit('show', { state: false, pos: opacity })
  } else {
    mitter.emit('show', { state: true, pos: opacity })
  }
}
// 页面挂载完毕触发的方法
onMounted(() => {
  // 当底部栏添加购物车的自定义事件触发后
  mitter.on('add', async () => {
    // 整理添加到购物车的商品的数据
    const itemData = {
      userid: store.userData.id,
      goods_name: goodsData.value[0].name,
      goods_imgUrl: goodsData.value[0].imgUrl,
      goods_num: 1,
      goods_price: goodsData.value[0].price,
      goods_id: goodsData.value[0].id,
      state: 1
    }
    // 如果没登陆跳转到登陆页面
    if (!store.loginState) {
      return router.push('/login/loginsms')
    }

    try {
      // 发起请求添加到购物车
      const { data: res } = await reqPostAddtoCart(itemData)

      if (res.code === 200) {
        showSuccessToast('添加成功！')
        // 添加成功后,调用获取购物车方法,更新购物车数据
        cart().getCartList(store.userData.id)
      } else {
        showFailToast('添加失败！')
      }
    } catch (error) {
      console.log(error)
    }
  })
})
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
