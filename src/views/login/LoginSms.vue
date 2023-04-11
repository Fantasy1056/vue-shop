<template>
  <div class="loginsms">
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
          <button
            class="message-code"
            type="button"
            :disabled="btnState"
            :class="{ active: btnState }"
          >
            <span v-if="!btnState">获取短信验证码</span>
            <span v-else>再次发送{{ codeTime }}</span>
          </button>
        </div>
        <button href="" class="login-btn" type="submit">登 录</button>
        <div class="quick-nav">
          <a @click="router.push('/login/index')" class="findpwd">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-lock"></use>
            </svg>
            密码登录
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
import { reactive, ref } from 'vue'
import { showFailToast, showSuccessToast } from 'vant'
import { moblieTest, codeTest } from '@/utils/validata'
import { reqPostLoginByCode } from '@/api/index'
import { user } from '@/store/user'

const store = user()
// 表单绑定的数据
const formData = reactive({
  moblie: '',
  msgCode: '',
  imgCode: ''
})

const codeTime = ref(10)
const btnState = ref(false)
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

// 登陆方法
const login = async () => {
  try {
    // 发起请求携带表单数据登录
    const { data: res } = await reqPostLoginByCode({
      code: formData.msgCode,
      tel: formData.moblie
    })

    if (res.code === 200) {
      showSuccessToast(res.data.msg)
      // 仓库存储用户数据
      store.userData = res.data.data
      // 本地存储token
      localStorage.setItem('token', res.data.data.token)
      // 登陆状态为true
      store.loginState = true
      // 仓库存储token
      store.token = res.data.data.token
      // 跳转到用户页面
      router.push('/user')
    } else {
      store.loginState = false
      showFailToast(res.data.msg)
    }
  } catch (error) {
    return error
  }
}
// watch(
//   () => codeTime.value,
//   (newVal) => {
//     if (newVal <= 0) {
//       codeTime.value = 10
//       btnState.value = false
//       clearInterval(timer.value)
//     }
//   }
// )

// const sendCode = async () => {
//   if (moblieTest.test(formData.moblie)) {
//     btnState.value = true
//     timer.value = setInterval(() => {
//       codeTime.value--
//     }, 1000)
//     try {
//       const { data: res } = await reqPostSendCode(formData.moblie)
//     } catch (error) {
//       console.log(error)
//     }
//   } else {
//     showFailToast('手机号码格式不正确')
//   }
// }
</script>

<style lang="less" scoped>
.loginsms {
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
        .active {
          opacity: 0.5;
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
        border: none;
      }
      .quick-nav {
        width: 100%;
        margin-top: 0.5333rem;

        a {
          color: #333;
          display: inline-block;
          width: 50%;
          font-size: 0.4rem;
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
