<template>
  <div class="container">
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="inputs">
      <myinput
        placeholder="请输入手机号"
        :value='userdata.username'
        @input='getname'
        :rules='/^1\d{10}$/'
        err_msg='请输入11位手机号~~'
        />
      <myinput placeholder="密码" type="password" v-model="userdata.password" />
    </div>
    <p class="tips">
      没有账号？
      <a href="#/register" class>去注册</a>
    </p>
    <mybutton @click='login' text='登陆'></mybutton>
  </div>
</template>

<script>
import myinput from '@/components/myinput.vue'
import mybutton from '@/components/mybutton.vue'
import { login } from '@/api/users.js'
export default {
  data () {
    return {
      userdata: {
        username: '12345678987',
        password: ''
      }
    }
  },
  components: {
    myinput, mybutton
  },
  methods: {
    login () {
      console.log(this.userdata)
      login(this.userdata)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getname (value) {
      this.userdata.username = value
    }
  }
}
</script>

<style lang='less' scoped>
.container {
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
.tips{
    padding: 10px 0;
    text-align: right;
}
.inputs {
  input {
    margin-bottom: 20px;
  }
}
</style>
