<template>
  <div class="home-recommend">
    <Card></Card>

    <ul>
      <li v-for="li in recommendList" :key="li.id">
        <div class="img">
          <img v-lazy="li.imgUrl" />
        </div>
        <div class="info">
          <h3 class="name">{{ li.name }}</h3>
          <p class="desc">{{ li.desc }}</p>
          <div class="price">
            <span>￥</span>
            {{ li.price }}
          </div>
        </div>
        <div class="status">{{ li.title }}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import Card from '@/components/home/Card.vue'
import { ref } from 'vue'
import { reqGetHotList } from '@/api'
interface Hot {
  id: number
  name: string
  imgUrl: string
  desc: string
  title: string
  price: number
}
const recommendList = ref<Hot[]>([])

const getHotList = async () => {
  const { data: res } = await reqGetHotList()

  if (res.code === 200) {
    recommendList.value = res.data
  }
}
getHotList()
</script>

<style lang="less" scoped>
.home-recommend {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  ul {
    display: flex;
    flex-direction: column;
    padding: 0.2187rem;
    li {
      position: relative;
      background-color: #f1f1f1;
      margin-bottom: 0.2rem;
      border-radius: 0.1333rem;
      overflow: hidden;
      .info {
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-right: 0.4rem;
        z-index: 998;
        height: 100%;
        .name {
          text-align: right;
          font-size: 0.33rem;
          margin-bottom: 0.1333rem;
          color: #666;
          font-weight: normal;
        }
        .desc {
          font-size: 0.43rem;
        }
        .price {
          text-align: right;
          font-size: 0.6rem;
          color: #ac4440;
          margin-top: 0.4rem;
          span {
            font-size: 0.32rem;
          }
        }
      }
      .img {
        display: flex;
        width: 100%;
        justify-self: center;
        align-items: center;
        img {
          width: 100%;
        }
      }
      .status {
        position: absolute;
        left: 0.4rem;
        top: 0;
        color: #fff;
        border-radius: 0 0 8px 8px;
        padding: 5px;
        background: #d4c0a7;
      }
    }
  }
  .title {
    width: 100%;
    text-align: center;
    padding: 0.2187rem;
    h1 {
      position: relative;
      font-size: 0.5867rem;
      &::after,
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        right: 3.2rem;
        transform: translateY(-50%);
        width: 0.2133rem;
        height: 0.2133rem;
        background-color: #ac4440;
        border-radius: 50%;
      }
      &::before {
        left: 3.2rem;
      }
    }
  }
}
</style>
