<template>
  <div class="edit-address">
    <Header>编辑地址</Header>
    <Form @submit="id ? editAddress() : saveAddress()">
      <div class="container">
        <label for="consignee">收件人: </label>
        <Field
          type="text"
          name="consignee"
          id="consignee"
          v-model="formData.consignee"
        ></Field>
      </div>
      <div class="container">
        <label for="moblie">手机号: </label>
        <Field
          type="text"
          name="moblie"
          id="moblie"
          v-model="formData.moblie"
        ></Field>
      </div>
      <div class="container" @click="show = true">
        <label for="area">省市区: </label>
        <Field as="div" class="area" name="area" v-model="formData.area">
          {{ formData.area }}
        </Field>
      </div>
      <div class="container">
        <label for="address">详情地址: </label>
        <Field
          as="textarea"
          name="address"
          id="address"
          cols="20"
          rows="2"
          v-model="formData.address"
        >
        </Field>
      </div>
      <div
        class="container"
        @click="formData.isDefault = !formData.isDefault"
        v-if="!isDefault"
      >
        <label for="isDefault">是否默认：</label>
        <Field
          id="isDefault"
          name="isDefault"
          v-model="formData.isDefault"
          @click="formData.isDefault = !formData.isDefault"
        >
          <van-switch
            v-model="formData.isDefault"
            @click="formData.isDefault = !formData.isDefault"
          ></van-switch>
        </Field>
      </div>
      <button type="submit" class="saveBtn">保存</button>
      <button class="delete" v-if="id" @click="deleteAddress">删除</button>
    </Form>
    <van-popup
      v-model:show="show"
      :style="{ height: '40%' }"
      round
      position="bottom"
      @click-overlay="show = false"
    >
      <van-picker
        @confirm="confirm"
        :columns="area"
        :columns-field-names="customFieldName"
      ></van-picker>
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/common/Header.vue'
import { area } from '@/assets/city_data2017_element.js'
import { ref, reactive } from 'vue'
import { showToast } from 'vant'
import { moblieTest } from '@/utils/validata'
import {
  reqPostAddNewAdd,
  reqGetAddressById,
  reqPostEditAddress,
  reqDeleteAddress
} from '@/api'
import { user } from '@/store/user'
import { useRoute } from 'vue-router'
import router from '@/router'

interface AddressInfo {
  userid?: number
  consignee: string
  moblie: string
  area: string
  address: string
  isDefault: boolean | number
  add_id?: number
}
// 用户数据仓库
const userStore = user()
// 省市区选择弹出框状态
const show = ref(false)

const route = useRoute()
// 当前路由的params携带的id参数
const id = parseInt(route.params.id as string)
// 当前路由携带的query isDefault参数
const isDefault = parseInt(route.query.isDefault as string)
// 表单绑定数据
const formData = reactive<AddressInfo>({
  userid: userStore.userData.id,
  consignee: '',
  moblie: '',
  area: '',
  address: '',
  isDefault: false,
  add_id: id
})
// vant省市区选择器的option,修改key的指定
const customFieldName = {
  text: 'label',
  value: 'value',
  children: 'children'
}
// 根据id获取地址数据方法
const getAddressById = async () => {
  // 如果id不为0，则当前页面为编辑已存在的地址
  if (id !== 0) {
    try {
      // 发起请求获取地址数据
      const { data: res } = await reqGetAddressById(id)

      if (res.code === 200) {
        // 保存地址数据到formData
        formData.moblie = res.data.moblie
        formData.address = res.data.address
        formData.consignee = res.data.consignee
        formData.area = res.data.area
      } else {
        showToast({
          type: 'fail',
          message: res.msg
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
// 新增地址数据
const saveAddress = async () => {
  // 如果表单数据不完整，提示错误信息
  if (
    !formData.address ||
    !formData.area ||
    !formData.consignee ||
    !moblieTest.test(formData.moblie)
  ) {
    return showToast({
      type: 'fail',
      message: '请完整填写表单'
    })
  }
  try {
    // 把isDefault修改为number类型，因为mysql不认识boolean
    formData.isDefault = formData.isDefault ? 1 : 0
    // 发起请求新增地址数据
    const { data: res } = await reqPostAddNewAdd(formData)

    if (res.code === 200) {
      showToast({
        type: 'success',
        message: res.msg
      })
      // 保存成功跳转到地址展示页
      router.push('/address/show')
    } else {
      showToast({
        type: 'fail',
        message: res.msg
      })
    }
  } catch (error) {
    console.log(error)
  }
}
// 编辑地址数据
const editAddress = async () => {
  if (
    !formData.address ||
    !formData.area ||
    !formData.consignee ||
    !moblieTest.test(formData.moblie)
  ) {
    return showToast({
      type: 'fail',
      message: '请完整填写表单'
    })
  }
  try {
    // 把isDefault修改为number类型，因为mysql不认识boolean
    formData.isDefault = formData.isDefault ? 1 : 0
    // 发起请求保存地址数据
    const { data: res } = await reqPostEditAddress(formData)
    if (res.code === 200) {
      showToast({
        type: 'success',
        message: res.msg
      })
      // 保存成功跳转到地址展示页
      router.push('/address/show')
    } else {
      showToast({
        type: 'fail',
        message: res.msg
      })
    }
  } catch (error) {
    console.log(error)
  }
}
// 省市区选择框确认后的方法
const confirm = (val: any) => {
  // 关闭选择框
  show.value = false
  // 保存选择后的地址数据
  formData.area = val.selectedValues.join(' ')
}
// 根据id删除地址
const deleteAddress = async () => {
  try {
    const { data: res } = await reqDeleteAddress(id)
    if (res.code === 200) {
      showToast({
        type: 'success',
        message: res.msg
      })
      router.push('/address/show')
    } else {
      showToast({
        type: 'fail',
        message: res.msg
      })
    }
  } catch (error) {
    console.log(error)
  }
}

getAddressById()
</script>

<style lang="less" scoped>
.edit-address {
  width: 100%;
  overflow: hidden;
  padding-bottom: 2.0667rem;
  form {
    width: 100%;
    overflow: hidden;
    .container {
      display: flex;
      justify-content: space-between;
      padding: 0.2667rem;
      background: #fff;
      border-bottom: solid 1px #ddd;
      position: relative;
      input {
        flex: 1;
        width: 100%;
        height: 0.8533rem;
        line-height: 0.8533rem;
        border: none;
        outline: none;
        background-color: #fff;
        font-size: 0.4267rem;
      }
      label {
        font-size: 0.4267rem;
        line-height: 0.8533rem;
        word-spacing: 0.65rem;
        margin-right: 0.1333rem;
      }
      textarea {
        flex: 1;
        font-size: 100%;
        outline: 0;
        resize: none;
        border-radius: 0;
        padding: 5px 12px;
        font-size: 0.4267rem;
        border: 0;
      }
      .area {
        flex: 1;
        width: 100%;
        height: 0.8533rem;
        line-height: 0.8533rem;
        font-size: 0.4267rem;
      }
    }
    button {
      display: block;
      width: 5rem;
      height: 1.0667rem;
      text-align: center;
      line-height: 1.0667rem;
      color: #fff;
      border: 0;
      margin: 0.8rem auto 0;
      border-radius: 0.1333rem;
      font-size: 0.3733rem;
    }
    .saveBtn {
      background-color: #b0352f;
    }
    .delete {
      background-color: #333;
    }
  }
}
</style>
