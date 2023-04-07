<template>
  <div class="user-opitons">
    <div class="option" v-for="option in userOptions" :key="option.id">
      <h1>{{ option.title }}</h1>
      <ul>
        <li v-for="li in option.data" :key="li.id">
          <a @click="li.title === '地址管理' && $router.push('/address/show')">
            <svg
              class="icon"
              aria-hidden="true"
              :style="{ color: li.iconColor }"
            >
              <use :xlink:href="'#icon-' + li.icon"></use>
            </svg>
            <span>{{ li.title }}</span>
            <van-icon name="arrow"></van-icon>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { reqGetUserOptions } from '@/api'
interface UserOptions {
  id: number
  title: string
  data: {
    id: number
    title: string
    icon: string
    iconColor: string
  }[]
}
const userOptions = ref<UserOptions[]>([])
// 获取用户页面的选项数据
const getUserOptions = async () => {
  const { data: res } = await reqGetUserOptions()

  userOptions.value = res.data
}

getUserOptions()
</script>

<style lang="less" scoped>
.user-opitons {
  width: 100%;
  padding-bottom: 1.0667rem;
  .option {
    margin-bottom: 0.2667rem;
    background-color: #fff;
    h1 {
      height: 1.1733rem;
      line-height: 1.1733rem;
      font-size: 0.3733rem;
      padding: 0 0.2667rem;
      color: #9e9e9e;
      border-bottom: 1px solid #e3e5e9;
    }
    ul {
      width: 100%;
      overflow: hidden;
      li {
        width: 100%;
        height: 1.1733rem;
        line-height: 1.1733rem;

        a {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
          margin-left: 0.2667rem;
          color: #333;
          font-size: 0.3733rem;
          .icon {
            font-size: 0.7rem;
            padding-right: 0.2667rem;
          }
          span {
            flex: 1;
            border-bottom: 1px solid #e3e5e9;
          }
          .van-icon {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
          }
        }
        &:last-child {
          a {
            span {
              border-bottom: none;
            }
          }
        }
      }
    }
  }
}
</style>
