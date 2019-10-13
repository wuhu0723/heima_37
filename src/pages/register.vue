<template>
  <div class="register">
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="inputs">
      <myinput
        placeholder="请输入手机号"
        v-model="userdata.username"
        :rules="/^1\d{10}$/"
        err_msg="请输入11位手机号"
      />
      <myinput placeholder="请输入昵称" v-model="userdata.nickname" err_msg="请输入昵称" />
      <myinput
        placeholder="密码"
        type="password"
        :rules="/^\w{6,16}$/"
        v-model="userdata.password"
        err_msg="请输入密码"
      />
    </div>
    <p class="tips">
      没有账号？
      <a href="#/login" class>去登陆</a>
    </p>
    <mybutton @click="login" text="登陆"></mybutton>
  </div>
</template>

<script>
import myinput from '@/components/myinput.vue'
import mybutton from '@/components/mybutton.vue'
export default {
  data () {
    return {
      userdata: {
        username: '',
        nickanme: '',
        password: '123456'
      }
    }
  },
  components: {
    myinput, mybutton
  }
}
</script>

<style lang='less' scoped>
.register {
  padding: 20px;
}
.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}
.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}
.tips {
  padding: 10px 0;
  text-align: right;
}
.inputs {
  input {
    margin-bottom: 20px;
  }
}
</style>
