<template>
  <div class="home-icons">
    <ul class="icons">
      <li v-for="icon in iconList" :key="icon.id">
        <i class="icon">
          <img :src="icon.icon" alt="" />
        </i>
        {{ icon.text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { reqGetIconList } from '@/api'

const iconList = ref([
  {
    id: 1,
    icon: '#icon-chabei',
    text: '自饮茶'
  },
  {
    id: 2,
    icon: '#icon-chahu',
    text: '茶具'
  },
  {
    id: 3,
    icon: '#icon-lihe',
    text: '茶礼盒'
  },
  {
    id: 4,
    icon: '#icon-daishouhuolihe',
    text: '领福利'
  },
  {
    id: 5,
    icon: '#icon-wode',
    text: '官方验证'
  }
])

const getIconList = async () => {
  const { data: res } = await reqGetIconList()

  if (res.code === 200) {
    iconList.value = res.data
  }
}
getIconList()
</script>

<style lang="less" scoped>
.home-icons {
  display: flex;
  width: 100%;
  padding: 0.4rem 0;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  .icons {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .icon {
      width: 1rem;
      height: 1rem;
      padding: 0 15px 11.5px;
      box-sizing: content-box;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
