<template>
  <div class="register">
    <HeaderVue>注册</HeaderVue>
    <Form :validation-schema="rules" @submit="register">
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
        <!-- <div class="input-container">
          <Field
            type="text"
            placeholder="请输入图形验证码"
            name="imgCode"
            v-model="formData.imgCode"
          ></Field>
          <ErrorMessage name="imgCode" as="p" class="error-msg"></ErrorMessage>

          <span class="code-box"><img src="" alt="" /></span>
        </div> -->
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
        <div class="input-container">
          <Field
            type="password"
            placeholder="请设置密码"
            name="password"
            v-model="formData.password"
          ></Field>
          <ErrorMessage name="password" as="p" class="error-msg"></ErrorMessage>
        </div>
        <button type="submit" class="register-btn">注 册</button>
        <div class="reg-notice">注册即视为同意<a href="">《服务协议》</a></div>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import HeaderVue from '@/components/common/Header.vue'
import { reactive } from 'vue'
import { moblieTest, codeTest, pwdTest } from '@/utils/validata'
import { reqPostRegister } from '@/api'
import { showFailToast, showSuccessToast } from 'vant'
import router from '@/router'
const formData = reactive({
  moblie: '',
  password: '',
  msgCode: ''
})

const rules = {
  moblie(value: string) {
    if (!moblieTest.test(value)) {
      return '请输入正确的手机号！'
    }
    return true
  },
  password(value: string) {
    if (!pwdTest.test(value)) {
      return '请输入符合条件的密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)！'
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

const register = async () => {
  try {
    const { data: res } = await reqPostRegister({
      tel: formData.moblie,
      pwd: formData.password,
      code: formData.msgCode
    })
    if (res.code === 200) {
      showSuccessToast(res.msg)
      router.push('/login')
    } else {
      showFailToast(res.msg)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="less" scoped>
.register {
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
