<template>
  <div class="cart-list">
    <div class="cart-items">
      <!-- <div class="item-hd">
        <span class="checkbox active">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-duihao"></use>
          </svg>
          <input type="checkbox" name="" id="" />
        </span>
        <b>商品</b>
      </div> -->
      <div class="item-bd" v-for="item in cartList" :key="item.goods_id">
        <!-- 点击选择框的时候，将当前商品的state取反，再发起请求更新当前商品状态 -->
        <div
          class="item-checkbox"
          :class="{ active: item.state }"
          @click="
            ;(item.state = item.state === 1 ? 0 : 1), updataCartList(item)
          "
        >
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-duihao"></use>
          </svg>
          <input type="checkbox" v-model="item.state" />
        </div>
        <div class="item-img">
          <img :src="item.goods_imgUrl" alt="" />
        </div>
        <div class="item-info">
          <div class="item-title">
            <a> {{ item.goods_name }} </a>
          </div>
          <div class="item-price">
            <b>¥{{ item.goods_price }}.00</b>
          </div>
          <a @click="deleteCartItem(item)" class="item-delete">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shanchu"></use>
            </svg>
          </a>
          <!-- 点击数量加减的时候，将当前商品的数量加减，再发起请求更新当前商品状态 -->
          <!-- 使用pinia时，直接修改数据时仓库对应的数据也会一并修改 -->
          <div class="item-num">
            <!-- 当前商品数量为1时禁用减数量按钮 -->
            <button
              @click="item.goods_num--, updataCartList(item)"
              :disabled="item.goods_num === 1"
              :class="{ disabled: item.goods_num === 1 }"
            >
              -
            </button>
            <input type="text" v-model="item.goods_num" />
            <button @click="item.goods_num++, updataCartList(item)">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { user } from '@/store/user'
import { cart } from '@/store/cart'
import { computed, ref } from 'vue'
import { reqPostUpdateCartList, reqDeleteCartItem } from '@/api'
import {
  showLoadingToast,
  closeToast,
  showSuccessToast,
  showFailToast,
  showConfirmDialog
} from 'vant'
interface GoodsData {
  userid: number
  goods_name: string
  goods_id: number
  goods_imgUrl: string
  goods_price: number
  goods_num: number
  state: number
}
// 获取本地存储的token
const token = ref(localStorage.getItem('token') as string)
// 获取当前用户id
const userId = computed(() => user().userData.id)
// 购物车数据仓库
const cartStore = cart()
// 购物车列表数据
const cartList = computed(() => cartStore.cartList)
// 改变商品属性的方法
const updataCartList = async (data: GoodsData) => {
  try {
    showLoadingToast({
      message: '更改中',
      duration: 0,
      forbidClick: true
    })
    // 发起请求携带修改后的对象修改数据库里的数据
    const { data: res } = await reqPostUpdateCartList(data)

    if (res.code === 200) {
      closeToast(true)
    }
  } catch (error) {
    console.log(error)
  }
}
// 根据商品id删除对应商品方法
const deleteCartItem = (id: GoodsData) => {
  showConfirmDialog({
    title: '删除商品',
    message: '确定要删除该商品吗？'
  })
    .then(async () => {
      try {
        const { data: res } = await reqDeleteCartItem(id)

        if (res.code === 200) {
          // 删除完成重新调用获取购物车数据方法，更新页面
          showSuccessToast('删除成功！')
          cartStore.getCartList(userId.value)
        } else {
          showFailToast('删除失败！')
        }
      } catch (error) {
        console.log(error)
      }
    })
    .catch(() => {
      showFailToast('取消删除')
    })
}
// 如果token存在但是购物车数据为空，从新发起请求获取数据
if (token.value && cartStore.cartList.length === 0) {
  cartStore.getCartList(userId.value)
}
</script>

<style lang="less" scoped>
.cart-list {
  width: 100%;
  overflow: hidden;
  .cart-items {
    width: 100%;
    margin-bottom: 4rem;
    background-color: #fff;
    overflow: hidden;
    .item-hd {
      display: flex;
      width: 100%;
      padding: 10px 5px;
      border-bottom: 1px solid #e8e8e8;
      line-height: 1.3333rem;
      background-color: #f5f5f5;
      .checkbox {
        width: 0.8rem;
        height: 0.8rem;
        line-height: 1.0667rem;
        text-align: center;
        .icon {
          font-size: 0.48rem;
        }

        input {
          display: none;
        }
      }
      .active {
        color: #b0352f;
      }
      b {
        margin-left: 0.2667rem;
        font-size: 0.4267rem;
        line-height: 1.0667rem;
      }
    }
    .item-bd {
      display: flex;
      width: 100%;
      padding: 10px 5px;
      .item-checkbox {
        width: 0.8rem;
        padding-top: 0.5333rem;
        font-size: 0.4267rem;
        text-align: center;
        input {
          display: none;
        }
      }
      .active {
        color: #b0352f;
      }
      .item-img {
        position: relative;
        width: 1.9733rem;
        height: 1.9733rem;
        border: 1px solid #eee;
        margin-left: 0.2667rem;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .item-info {
        flex: 1;
        font-size: 12px;
        padding: 0 45px 0 10px;
        position: relative;
        height: 76px;
        .item-title {
          line-height: 0.4267rem;
          height: 0.9067rem;
          overflow: hidden;
        }
        .item-price {
          color: #b0352f;
          font-size: 0.3733rem;
          margin-top: 0.2667rem;
        }
        .item-delete {
          position: absolute;
          top: 5px;
          right: 5px;
          color: #333;
          font-size: 0.4267rem;
        }
      }
      .item-num {
        position: absolute;
        display: flex;
        bottom: 0.1333rem;
        right: 5px;
        height: 0.6933rem;
        button {
          width: 0.6933rem;
          height: 100%;
          font-size: 0.48rem;
          font-weight: 500;
          border: 1px solid #ccc;
          text-align: center;
          line-height: 0.6933rem;
        }
        .disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        input {
          width: 0.6933rem;
          height: 100%;
          outline: none;
          border: 0;
          border-top: 1px solid #ccc;
          border-bottom: 1px solid #ccc;
          text-align: center;
        }
      }
    }
  }
}
</style>
