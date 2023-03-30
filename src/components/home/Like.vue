<template>
  <div class="home-like">
    <Card>猜你喜欢</Card>
    <ul>
      <li v-for="like in likeList" :key="like.id">
        <div class="img">
          <img :src="like.url" alt="" />
        </div>
        <div class="info">
          <div class="desc">{{ like.name }}</div>
          <div class="price">
            <span>￥</span>
            {{ like.price }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import Card from './Card.vue'
import { ref } from 'vue'
import { reqGetLike } from '@/api'
interface Like {
  id: number
  url: string
  name: string
  price: number
}

const likeList = ref<Like[]>([])

const getLike = async () => {
  const { data: res } = await reqGetLike()

  if (res.code === 200) {
    likeList.value = res.data
  }
}
getLike()
</script>

<style lang="less" scoped>
.home-like {
  width: 100%;
  background-color: #fff;
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 0.1333rem;
    li {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      width: 50%;
      padding: 0.1333rem;
      margin-bottom: 0.5333rem;
      .img {
        width: 100%;
        background-color: #f3f3f3;
        justify-self: center;
        align-self: center;
        img {
          width: 100%;
        }
      }
      .info {
        .desc {
          font-size: 0.4267rem;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          padding: 0.2133rem 0;
        }
        .price {
          color: #ac4440;
          font-size: 0.5333rem;
          span {
            font-size: 0.4rem;
          }
        }
      }
    }
  }
}
</style>
