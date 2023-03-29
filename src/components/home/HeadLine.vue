<template>
  <div class="home-headline">
    <div class="teanews">
      <div class="caption"></div>
      <div class="content">岩茶为何不提春茶概念？</div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.home-headline {
  width: 100%;
  background-color: #fff;
  .teanews {
    display: flex;
    width: 100%;
    padding: 0.3133rem 0.2rem;
    .caption {
      width: 2rem;
      height: 0.5rem;
      max-width: 120px;
      padding: 0px 5px 0px 0;
      margin-right: 0.4rem;
      box-sizing: border-box;
      position: relative;
      background: url(http://imgcon.tea7.com/6363726507138286614601463.png)
        center center no-repeat;
      background-size: contain;
      &::after {
        content: '';
        width: 1px;
        height: 100%;
        border-right: 1px solid #f3f3f3;
        position: absolute;
        top: 0;
        right: -0.2rem;
        transform: scaleX(0.5);
        z-index: 10;
      }
    }
    .content {
      flex: 1;
      line-height: 0.5rem;
    }
  }
}
</style>
