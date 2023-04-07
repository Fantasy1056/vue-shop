<template>
  <div class="find-user">
    <HeaderVue>重置密码</HeaderVue>
    <Form :validation-schema="rules" @submit="findUser">
      <div class="form-wrap">
        <div class="input-container">
          <Field
            type="text"
            placeholder="请输入手机号"
            name="moblie"
            v-model="formData.moblie"
          ></Field>
          <ErrorMessage name="moblie" as="p" class="error-msg"></ErrorMessage>
        </div>
        <div class="input-box">
          <div class="input-container">
            <Field
              type="text"
              placeholder="请输入短信验证码"
              name="msgCode"
              v-model="formData.msgCode"
            ></Field>
            <ErrorMessage
              name="msgCode"
              as="p"
              class="error-msg"
            ></ErrorMessage>
          </div>
          <button class="message-code">获取短信验证码</button>
        </div>
        <button type="submit" class="register-btn">下 一 步</button>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import HeaderVue from '@/components/common/Header.vue'
import { reactive } from 'vue'
import { moblieTest, codeTest } from '@/utils/validata'
import { reqPostFindUser } from '@/api/index'
import { showFailToast } from 'vant'
import router from '@/router'
// 表单绑定的数据
const formData = reactive({
  moblie: '',
  msgCode: ''
})
// 表单验证规则
const rules = {
  moblie(value: string) {
    if (!moblieTest.test(value)) {
      return '请输入正确的手机号！'
    }
    return true
  },
  msgCode(value: string) {
    if (!codeTest.test(value)) {
      return '验证码格式不正确！'
    }
    return true
  }
}
// 查找是否存在当前用户方法
const findUser = async () => {
  try {
    const { data: res } = await reqPostFindUser({
      tel: formData.moblie
    })
    if (res.code === 200) {
      // 用户存在,跳转到重新设置密码页面,携带当前用户手机号
      router.push({
        name: 'findpwd',
        query: {
          tel: formData.moblie
        }
      })
    } else {
      showFailToast(res.msg)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="less" scoped>
.find-user {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  form {
    width: 100%;
    overflow: hidden;
    .form-wrap {
      padding: 0.5333rem;
      .input-container {
        position: relative;
        margin-top: 0.5333rem;
        width: 100%;
        height: 1.0667rem;
        input {
          width: 100%;
          height: 100%;
          padding: 0 0.2rem;
          border-radius: 0.1333rem;
          border: 1px solid #e5e5e5;
          display: inline-block;
        }
        .code-box {
          position: absolute;
          width: 3rem;
          height: 1.0133rem;
          text-align: center;
          line-height: 1.0667rem;
          right: 1px;
          top: 1px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .error-msg {
          color: #b0352f;
          font-size: 0.3733rem;
        }
      }
      .input-box {
        position: relative;
        width: 100%;
        height: 1.0667rem;
        .message-code {
          position: absolute;
          width: 3rem;
          height: 1.0133rem;
          text-align: center;
          line-height: 1.0667rem;
          right: 1px;
          top: 1px;
          background-color: #b0352f;
          color: #fff;
          font-size: 0.386rem;
          border: none;
          outline: 0;
          border-radius: 2px;
          box-shadow: 0 0 0 1px #b0352f;
        }
      }
      .register-btn {
        display: block;
        width: 100%;
        height: 1.0667rem;
        margin-top: 0.5333rem;
        text-align: center;
        line-height: 1.0667rem;
        background-color: #b0352f;
        border-radius: 0.1333rem;
        color: #fff;
        font-size: 0.4267rem;
        border: none;
      }
      .reg-notice {
        width: 100%;
        margin-top: 0.2667rem;
        font-size: 12px;
        color: #333;
        a {
          color: #b0352f;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
