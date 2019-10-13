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
    <mybutton @click="register" text="注册"></mybutton>
  </div>
</template>

<script>
import myinput from '@/components/myinput.vue'
import mybutton from '@/components/mybutton.vue'
import { register } from '@/api/users.js'
import { Toast } from 'vant'
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
  methods: {
    //   async:标记这个方法中会执行异步操作
    async register () {
      // 我希望register方法执行完毕再进行赋值，之后再对返回结果进行处理
    //   await:等待：它会等待后面的方法执行完毕之后接收它的返回值，它会帮助我们自动的执行promise并获取它的返回结果
    // 它可以实现  只有执行完了当前标记了await的方法，才会继续执行后续代码
      const res = await register(this.userdata) // 返回了then获取的res
      if (res.status === 200) {
        Toast(res.data.message)
      } else {
        Toast('注册失败')
      }
    }
    // register () {
    //   register(this.userdata)
    //     .then(res => {
    //       console.log(res)
    //       if (res.status === 200) {
    //         Toast(res.data.message)
    //       } else {
    //         Toast('注册失败')
    //       }
    //     })
    // }
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
