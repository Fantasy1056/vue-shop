<template>
  <div class="address-show">
    <Header>我的地址</Header>

    <div class="address-container" v-if="addressList.length > 0">
      <ul>
        <li v-for="add in addressList" :key="add.add_id">
          <a @click="editAddress(add.add_id, add.isDefault as number)">
            <p>
              <em>{{ add.consignee }}</em> <em>{{ add.moblie }}</em>
            </p>
            <p>
              <span class="default" v-if="add.isDefault">[默认]</span>
              {{ add.area }} {{ add.address }}
            </p>
            <van-icon name="arrow"></van-icon>
          </a>
        </li>
      </ul>
    </div>
    <van-empty
      image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
      image-size="80"
      description="空空如也"
      v-else
    />
    <button class="add-address" @click="router.push('/address/edit/0')">
      添加新地址
    </button>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
import Header from '@/components/common/Header.vue'
import { address } from '@/store/address'
import { computed } from 'vue'
// 地址数据仓库
const store = address()
// 地址列表数据
const addressList = computed(() => store.addressList)
// 编辑地址跳转方法,根据地址是否为默认地址,决定是否携带参数
const editAddress = (id: number, isDefault: number) => {
  if (isDefault) {
    router.push({
      path: '/address/edit/' + id,
      query: {
        isDefault
      }
    })
  } else {
    router.push({
      path: '/address/edit/' + id
    })
  }
}

store.getAddressList()
</script>

<style lang="less" scoped>
.address-show {
  width: 100%;
  overflow: hidden;
  padding-bottom: 2.0667rem;
  .add-address {
    display: block;
    width: 3.2rem;
    height: 1.0667rem;
    text-align: center;
    line-height: 1.0667rem;
    color: #fff;
    background-color: #b0352f;
    border: 0;
    margin: 0.8rem auto 0;
    border-radius: 0.1333rem;
    font-size: 0.3733rem;
  }
  .address-container {
    width: 100%;
    overflow: hidden;
    ul {
      width: 100%;
      li {
        position: relative;
        width: 100%;
        height: 2.1333rem;
        margin-top: 0.2667rem;
        a {
          display: block;
          width: 100%;
          height: 100%;
          padding: 0.2667rem 1.5467rem 0.2667rem 0.32rem;
          color: #222;
          font-size: 0.3733rem;
          background-color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          p {
            padding: 5px;
            em {
              font-weight: 700;
              font-style: normal;
            }
            .default {
              color: #b0352f;
            }
          }
          .van-icon {
            position: absolute;
            right: 10px;
            width: 20px;
            height: 20px;
            top: 50%;
            color: #9e9e9e;
            margin-top: -10px;
            font-weight: 700;
            line-height: 20px;
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>
