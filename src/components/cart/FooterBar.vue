<template>
  <div class="cart-footer">
    <div class="checkbox">
      <div
        class="check-all"
        :class="{ active: isAllCheck }"
        @click="cartStore.setAllChecked"
      >
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-duihao"></use>
        </svg>
        <input type="text" v-model="isAllCheck" />
      </div>
    </div>
    <div class="total-count">
      共有 <em> {{ totalNum }} </em> 件商品
      <p>
        总计: <span class="red">￥{{ totalPrice }}.00</span>
      </p>
    </div>
    <div class="topay">
      <router-link to="/checkout">去结算</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { cart } from '@/store/cart'
import { computed } from 'vue'
// 购物车数据仓库
const cartStore = cart()
// 购物车选中商品的总价格
const totalPrice = computed(() => cartStore.totalPrice)
// 购物车选中商品的总数量
const totalNum = computed(() => cartStore.totalNum)
// 当前购物车商品是否全选
const isAllCheck = computed(() => cartStore.isAllChecked)
</script>

<style lang="less" scoped>
.cart-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 1.08rem;
  background-color: #fff;
  border-top: 1px solid #eee;
  .checkbox {
    padding: 5px 5px 0;
    .check-all {
      display: block;
      width: 0.8rem;
      height: 0.8rem;
      font-size: 0.48rem;
      color: #666;
      text-align: center;
      line-height: 0.8rem;
      input {
        display: none;
      }
    }
    .active {
      color: #b0352f;
    }
  }
  .total-count {
    flex: 1;
    font-size: 14px;
    line-height: 0.4267rem;
    padding-top: 3px;
    em {
      font-style: normal;
    }
    p {
      font-size: 0.3733rem;
      .red {
        color: #b0352f;
      }
    }
  }
  .topay {
    width: 32%;
    height: 100%;
    background-color: #b0352f;
    text-align: center;
    line-height: 1.0667rem;
    a {
      text-align: center;
      font-size: 0.5333rem;
      color: #fff;
    }
  }
}
</style>
