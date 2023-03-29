<template>
  <div class="small-bd">
    <ul>
      <li v-for="img in bdList" :key="img.id">
        <a>
          <img :src="img.url" alt="" />
          <div class="cnt">
            <h1>{{ img.title }}</h1>
            <span>{{ img.desc }}</span>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
defineProps(['bdList'])
</script>

<style lang="less" scoped>
.small-bd {
  width: 100%;
  background-color: #fff;
  ul {
    display: flex;
    justify-content: space-between;
    padding: 0 0.15rem 0.15rem;
    li {
      width: 50%;
      padding: 0.1rem;
      overflow: hidden;

      a {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          border-radius: 0.2133rem;
        }
        .cnt {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 0.3rem 0 0 0.3rem;
          h1 {
            font-size: 0.4rem;
            color: #333333;
            font-weight: bold;
            display: block;
          }
          span {
            font-size: 0.32rem;
            color: #999999;
            display: block;
          }
        }
      }
    }
  }
}
</style>
