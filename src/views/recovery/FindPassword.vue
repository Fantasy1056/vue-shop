<template>
  <div class="find-password">
    <HeaderVue>重置密码</HeaderVue>
    <Form :validation-schema="rules" @submit="resetPwd">
      <div class="form-wrap">
        <div class="input-container">
          <Field
            type="password"
            placeholder="请设置新密码"
            name="password"
            v-model="formData.password"
          ></Field>
          <ErrorMessage name="password" as="p" class="error-msg"></ErrorMessage>
        </div>
        <div class="input-container">
          <Field
            type="password"
            placeholder="请确认密码"
            name="confirmPwd"
            v-model="formData.confirmPwd"
          ></Field>
          <ErrorMessage
            name="confirmPwd"
            as="p"
            class="error-msg"
          ></ErrorMessage>
        </div>
        <button type="submit" class="register-btn">重 置 密 码</button>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import HeaderVue from '@/components/common/Header.vue'
import { reactive } from 'vue'
import { pwdTest } from '@/utils/validata'
import { showFailToast, showSuccessToast } from 'vant'
import { reqPostChangePwd } from '@/api'
import router from '@/router'
import { useRoute } from 'vue-router'

const route = useRoute()

const tel = route.query.tel as string

const formData = reactive({
  password: '',
  confirmPwd: ''
})
const rules = {
  password(value: string) {
    if (!pwdTest.test(value)) {
      return '请输入符合条件的密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)！'
    }
    return true
  },
  confirmPwd(value: string) {
    if (value !== formData.password) {
      return '两次密码不一致！'
    }
    return true
  }
}

const resetPwd = async () => {
  try {
    const { data: res } = await reqPostChangePwd({
      tel,
      pwd: formData.password
    })

    if (res.code === 200) {
      showSuccessToast(res.msg)
      router.push('/login/index')
    } else {
      showFailToast(res.msg)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="less" scoped>
.find-password {
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
