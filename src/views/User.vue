<template>
  <div class="user">
    <Header></Header>
    <UserOptions></UserOptions>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Header from '@/components/user/Header.vue'
import UserOptions from '@/components/user/UserOptions.vue'
import { user } from '@/store/user'
import { reqPostLogin } from '@/api/index'
const store = user()

const token: string = computed(
  (): string => localStorage.getItem('token') as string
).value

const login = async () => {
  try {
    if (token) {
      const { data: res } = await reqPostLogin({
        token
      })

      if (res.code === 200) {
        store.userData = res.data.data
      }
    }
  } catch (error) {
    console.log(error)
  }
}

login()
</script>

<style lang="less" scoped>
.user {
  background-color: #f5f5f5;
  height: 100%;
  width: 100%;
}
</style>
