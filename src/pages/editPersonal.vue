<template>
  <div class="editPersonal">
    <myheader title="个人信息修改">
      <!-- slot的作用就是指定当前的内容放置到那个名称的插槽中 -->
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="myimg">
      <img :src="userdata.head_img" alt class="userImg" />
      <!-- <van-uploader :after-read="afterRead" :before-read='beforeRead' /> -->
      <van-uploader :after-read="afterRead" />
    </div>
    <mycell title="昵称" :desc="userdata.nickname" @click="nickshow=!nickshow"></mycell>
    <van-dialog v-model="nickshow" title="修改昵称" show-cancel-button @confirm='upNickName'>
      <van-field :value="userdata.nickname" ref='nickname' placeholder="请输入用户名" label='昵称' required />
    </van-dialog>

    <mycell title="密码" :desc="userdata.password" @click="passshow=!passshow" type='password'></mycell>
    <van-dialog v-model="passshow" title="修改密码" show-cancel-button @confirm='upPassword' :before-close='beforeClose'>
      <van-field type='password' ref='password' placeholder="请输入原密码" label='原密码' required />
      <van-field type='password' ref='password2' placeholder="请输入新密码" label='新密码' required />
    </van-dialog>

    <mycell title="性别" :desc="userdata.gender===1?'男':'女'" @click="gendershow=!gendershow"></mycell>
    <van-dialog v-model="gendershow" title="修改性别" show-cancel-button @confirm='upGender' >
      <van-picker :columns="['女','男']"  @change="onChange" :default-index="userdata.gender"/>
    </van-dialog>
  </div>
</template>

<script>
import myheader from '@/components/myheader.vue'
import { getPersonalInfo, updataUserInfo } from '@/api/users.js'
import mycell from '@/components/mycell.vue'
import { uploadFile } from '@/api/uploadFile.js'
// import { Uploader } from 'vant'
export default {
  data () {
    return {
      nickshow: false,
      passshow: false,
      gendershow: false,
      userdata: {
        head_img: '',
        nickname: '',
        password: '',
        gender: ''
      },
      // 性别picker的被选中项的索引
      usergender: ''
    }
  },
  components: {
    myheader,
    mycell
  },
  mounted () {
    // 0.获取当前登陆用户的个人信息
    const id = localStorage.getItem('my_heimatoutiao_37_id')
    getPersonalInfo(id)
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          this.userdata.nickname = res.data.data.nickname
          this.userdata.password = res.data.data.password
          this.userdata.gender = res.data.data.gender
          this.userdata.head_img = res.data.data.head_img

          if (this.userdata.head_img) {
            // 是请求服务器资源，所以需要拼接完整的服务器路径
            this.userdata.head_img =
              localStorage.getItem('baseurl_37') + res.data.data.head_img
          } else {
            // 请求当前本地资源
            this.userdata.head_img = './avatar.jpg'
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    // 1.上传图片之前的回调函数--现在还有问题
    beforeRead (file) {
      console.log(file)
      if (!(file.type.indexOf('image') === 0)) {
        this.$toast.fail('请选择正确的图片格式')
        return false
      }
    },
    // 2.图片上传，要实现两个操作：a.图片上传+页面数据刷新   b.数据库中数据的更新
    async afterRead (file) {
      // 收集图片数据
      var formdata = new FormData()
      formdata.append('file', file.file)
      // 此时可以自行将文件上传至服务器
      //   调用接口方法传递文件数据
      let res = await uploadFile(formdata)
      if (res.status === 200) {
        // 刷新图片显示
        this.userdata.head_img =
          localStorage.getItem('baseurl_37') + res.data.data.url
        // 修改图片信息--修改用户数据在数据库中的存储
        let res2 = await updataUserInfo(
          localStorage.getItem('my_heimatoutiao_37_id'),
          { head_img: res.data.data.url }
        )
        if (res2.status === 200) {
          // 这里不用再进行页面刷新了，是因为之前已经重置了变量
          this.$toast.success(res2.data.message)
        }
      }
    },
    // 3.封装修改用户信息的方法,修改昵称，修改密码和修改性别可以调用，其实修改图片也可以调用，有兴趣的可以自己调用玩一下
    // data:修改时所需要的参数
    // callback修改成功之后的回调
    async updateUserInfo (data, callback) {
      let res = await updataUserInfo(localStorage.getItem('my_heimatoutiao_37_id'), data)
      if (res.status === 200) {
        callback && callback(res)
      }
    },
    // 4.修改昵称
    async upNickName () {
      // 为了页面效果，没有使用v-model进行双向数据的绑定，所以只能从元素中获取数据
      this.updateUserInfo({ nickname: this.$refs.nickname.$refs.input.value }, (res) => {
        this.$toast.success(res.data.message)
        // 将userdata中的数据进行修改，以便让页面中的展示发生变化
        this.userdata.nickname = res.data.data.nickname
      })
      // console.log(this.$refs.nickname.$refs.input.value)
      // let res = await updataUserInfo(localStorage.getItem('my_heimatoutiao_37_id'), {
      //   nickname: this.$refs.nickname.$refs.input.value })
      // if (res.status === 200) {
      //   // 弹出提示
      // this.$toast.success(res.data.message)
      // // 将userdata中的数据进行修改，以便让页面中的展示发生变化
      // this.userdata.nickname = res.data.data.nickname
      // }
    },
    // 5.修改密码前的判断：判断原密码否输入正确，如果原密码输入不正确，并不会关闭当前的dialog,有利于用户体验
    // action:当前的操作类型：cancel:取消   confirm:确认
    // done：是否进行下一步
    beforeClose (action, done) {
      // 当前你单击的确定，并且输入的原密码和用户密码不一致
      if (action === 'confirm' && this.$refs.password.$refs.input.value !== this.userdata.password) {
        // 给出提示
        this.$toast('原密码输入不正确')
        done(false)
      } else {
        done()
      }
    },
    // 6.修改密码
    upPassword () {
      // 获取用户输入的原密码，进行匹配，如果匹配成功则进行密码的修改，否则给出提示
      // 获取新密码
      let pwd = this.$refs.password2.$refs.input.value
      // 发起更新密码的请求
      this.updateUserInfo({ password: pwd }, (res) => {
        this.$toast.success(res.data.message)
        // 将userdata中的数据进行修改，以便让页面中的展示发生变化
        // 这里注意后台并没有返回密码
        this.userdata.password = pwd
      })
    },
    // 7.性别选项的变化，在这个方法中我们需要将当前用户所选择的性别索引存储到变量中，方便更新时的参数获取
    onChange (picker, value, index) {
      // this.$toast(`当前值：${value}, 当前索引：${index}`)
      this.usergender = index
    },
    // 8.修改性别
    upGender () {
      this.updateUserInfo({ gender: this.usergender }, (res) => {
        this.$toast.success(res.data.message)
        // 将userdata中的数据进行修改，以便让页面中的展示发生变化
        this.userdata.gender = res.data.data.gender
      })
    }
  }
}
</script>

<style lang='less' scoped>
// scoped是说明当前样式是局部样式，Scoped中添加的样式不能影响组件的样式
.myimg {
  position: relative;
  .userImg {
    display: block;
    width: 120/360 * 100vw;
    height: 120/360 * 100vw;
    border-radius: 50%;
    margin: 50px auto;
  }
  /deep/.van-uploader {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    opacity: 0;
  }
  // deep:可以影响子组件的样式
  /deep/.van-uploader__upload {
    width: 120/360 * 100vw;
    height: 120/360 * 100vw;
  }
}
</style>
