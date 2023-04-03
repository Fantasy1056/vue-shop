<template>
  <div class="login">
    <HeaderVue></HeaderVue>
    <Form :validation-schema="rules" @submit="login">
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
        <div class="input-container">
          <Field
            type="password"
            placeholder="请输入密码"
            name="password"
            v-model="formData.password"
          ></Field>
          <ErrorMessage name="password" as="p" class="error-msg"></ErrorMessage>
        </div>
        <button class="login-btn" type="submit">登 录</button>
        <div class="quick-nav">
          <a @click="router.push('/login/loginsms')" class="findpwd">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-lock"></use>
            </svg>
            短信登录
          </a>
          <a @click="router.push('/recovery/finduser')">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-lock"></use>
            </svg>
            找回密码
          </a>
          <a @click="router.push('/login/register')" class="quickReg">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-mobile-phone"></use>
            </svg>
            快速注册
          </a>
        </div>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import HeaderVue from '@/components/common/Header.vue'
import router from '@/router'
import { reactive } from 'vue'
import { reqPostLogin } from '@/api/index'
import { showSuccessToast, showFailToast } from 'vant'
import { moblieTest, pwdTest } from '@/utils/validata'
import { user } from '@/store/user'

const store = user()

const formData = reactive({
  moblie: '',
  password: ''
})
const login = async () => {
  try {
    const { data: res } = await reqPostLogin({
      tel: formData.moblie,
      pwd: formData.password
    })

    if (res.code === 200) {
      showSuccessToast(res.data.msg)
      store.userData = res.data.data
      localStorage.setItem('token', res.data.data.token)
      store.loginState = true
      router.push('/user')
    } else {
      store.loginState = false
      showFailToast(res.data.msg)
    }
  } catch (error) {
    console.log(error)
  }
}
// 表单验证规则
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
  }
}
</script>

<style lang="less" scoped>
.login {
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

      .login-btn {
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
        border: 0;
      }
      .quick-nav {
        width: 100%;
        margin-top: 0.5333rem;

        a {
          color: #333;
          display: inline-block;
          width: 33.33%;
          font-size: 0.4rem;
          text-align: center;
          .icon {
            font-size: 0.4267rem;
          }
        }
        .findpwd {
          text-align: left;
        }
        .quickReg {
          text-align: right;
        }
      }
    }
  }
}
</style>
