<template>
  <div class="cart">
    <Header></Header>
    <CartList></CartList>
    <FooterBar></FooterBar>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/cart/Header.vue'
import CartList from '@/components/cart/CartList.vue'
import FooterBar from '@/components/cart/FooterBar.vue'
</script>

<style lang="less" scoped>
.cart {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
</style>
