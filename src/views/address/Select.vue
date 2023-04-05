<template>
  <div class="address-select">
    <Header>我的地址</Header>

    <div class="address-container" v-if="addressList.length > 0">
      <ul>
        <li v-for="(add, index) in addressList" :key="add.add_id">
          <a
            class="address-item"
            @click=";(activeIndex = index), changeDefaultAddress(add)"
          >
            <svg
              class="icon"
              aria-hidden="true"
              :style="{ color: activeIndex === index ? '#b0352f' : '' }"
            >
              <use xlink:href="#icon-duihao"></use>
            </svg>
            <p>
              <em>{{ add.consignee }}</em> <em>{{ add.moblie }}</em>
            </p>
            <p>
              <span class="default" v-if="add.isDefault">[默认]</span>
              {{ add.area }} {{ add.address }}
            </p>
            <van-icon
              name="arrow"
              @click="editAddress(add.add_id, add.isDefault as number)"
            ></van-icon>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/common/Header.vue'
import { address } from '@/store/address'
import { computed, ref } from 'vue'
import { reqPostChangeDefaultAdd } from '@/api/'
import router from '@/router'
import { closeToast, showLoadingToast } from 'vant'
interface AddressInfo {
  add_id?: number
  userid?: number
  consignee: string
  moblie: string
  area: string
  address: string
  isDefault: boolean | number
}
const store = address()

const addressList = computed(() => store.addressList)

const activeIndex = ref(-1)

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

const changeDefaultAddress = async (data: AddressInfo) => {
  try {
    const { data: res } = await reqPostChangeDefaultAdd(data)

    if (res.code === 200) {
      store.getAddressList()
      showLoadingToast({
        message: '修改中',
        duration: 0
      })
      setTimeout(() => {
        closeToast()
        router.push('/checkout')
      }, 1000)
    }
  } catch (error) {}
}

store.getAddressList()
</script>

<style lang="less" scoped>
.address-select {
  width: 100%;
  overflow: hidden;
  padding-bottom: 2.0667rem;
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
        .address-item {
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
          padding-left: 1.2rem;
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
          .icon {
            position: absolute;
            left: 0.2667rem;
            top: 50%;
            transform: translateY(-50%);
            color: #d9d9d9;
            font-weight: 400;
            font-size: 0.8533rem;
            cursor: pointer;
            width: 0.8533rem;
            height: 0.8533rem;
            line-height: 0.8533rem;
          }
        }
      }
    }
  }
}
</style>
