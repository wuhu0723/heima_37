<template>
<div class="editPersonal">
    <myheader title='个人信息修改'>
        <!-- slot的作用就是指定当前的内容放置到那个名称的插槽中 -->
        <span slot='left' class="iconfont iconjiantou2" @click='$router.back()'></span>
        <!-- <span slot='left' @click='$router.back()'>后退</span> -->
        <!-- <span slot='right'>想放什么</span> -->
    </myheader>
    <div class="myimg">
        <img :src="userdata.head_img" alt="" class="userImg">
        <van-uploader :after-read="afterRead" />
    </div>
    <mycell title='昵称' :desc='userdata.nickname' @click='showNickDialog'></mycell>
    <mycell title='密码' :desc='userdata.password' @click='showNPassDialog'></mycell>
    <mycell title='性别' :desc='userdata.gender' @click='showGenderDialog'></mycell>
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
      userdata: {
        head_img: '',
        nickname: '',
        password: '',
        gender: ''
      }
    }
  },
  components: {
    myheader,
    mycell
    // 'van-uploader': Uploader
  },
  mounted () {
    // 获取当前登陆用户的个人信息
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
            this.userdata.head_img = localStorage.getItem('baseurl_37') + res.data.data.head_img
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
    showNickDialog () {},
    showNPassDialog () {},
    showGenderDialog () {},
    async afterRead (file) {
      // 收集图片数据
      var formdata = new FormData()
      formdata.append('file', file.file)
      // 此时可以自行将文件上传至服务器
      //   调用接口方法传递文件数据
      let res = await uploadFile(formdata)
      if (res.status === 200) {
        // 刷新图片显示
        this.userdata.head_img = localStorage.getItem('baseurl_37') + res.data.data.url
        // 修改图片信息--修改用户数据在数据库中的存储
        let res2 = await updataUserInfo(localStorage.getItem('my_heimatoutiao_37_id'), { head_img: res.data.data.url })
        if (res2.status === 200) {
          this.$toast.success(res2.data.message)
        }
      }
    }
  }
}
</script>

<style lang='less' scoped>
// scoped是说明当前样式是局部样式，Scoped中添加的样式不能影响组件的样式
.myimg{
    position: relative;
    .userImg{
        display: block;
        width:120/360*100vw;
        height:120/360*100vw;
        border-radius: 50%;
        margin:50px auto;
    }
    /deep/.van-uploader{
        position: absolute;
        left:50%;
        top:0;
        transform:translate(-50%,0);
        opacity: 0;
    }
    // deep:可以影响子组件的样式
    /deep/.van-uploader__upload{
        width: 120/360*100vw;
        height: 120/360*100vw;
    }
}
</style>
