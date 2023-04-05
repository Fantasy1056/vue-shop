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

const userStore = user()

const show = ref(false)

const route = useRoute()

const id = parseInt(route.params.id as string)

const isDefault = parseInt(route.query.isDefault as string)

const formData = reactive<AddressInfo>({
  userid: userStore.userData.id,
  consignee: '',
  moblie: '',
  area: '',
  address: '',
  isDefault: false,
  add_id: id
})

const customFieldName = {
  text: 'label',
  value: 'value',
  children: 'children'
}

const getAddressById = async () => {
  if (id !== 0) {
    try {
      const { data: res } = await reqGetAddressById(id)

      if (res.code === 200) {
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

const saveAddress = async () => {
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
    formData.isDefault = formData.isDefault ? 1 : 0
    const { data: res } = await reqPostAddNewAdd(formData)

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
    formData.isDefault = formData.isDefault ? 1 : 0
    const { data: res } = await reqPostEditAddress(formData)
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

const confirm = (val: any) => {
  show.value = false
  formData.area = val.selectedValues.join(' ')
}

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
