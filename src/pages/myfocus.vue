<template>
  <div class="focus">
      <myheader title='我的关注'>
          <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      </myheader>
      <div class="list">
          <div class="box" v-for='(item,index) in focusList' :key='index'>
              <img :src="item.head_img" alt="">
              <div class="center">
                  <p>{{item.nickname}}</p>
                  <span>2019-9-9</span>
              </div>
              <span @click='cancelfocus(item.id,index)'>取消关注</span>
          </div>
      </div>
  </div>
</template>

<script>
import myheader from '@/components/myheader.vue'
import { getPersonalFocus, cancelPersonalFocu } from '@/api/users.js'
export default {
  data () {
    return {
      focusList: []
    }
  },
  components: {
    myheader
  },
  methods: {
    async cancelfocus (id, index) {
      let res = await cancelPersonalFocu(id)
      if (res.status === 200) {
        this.$toast.success('取消关注成功')
        this.focusList.splice(index, 1)
      }
    }
  },
  mounted () {
    //   获取所有用户关注数据
    getPersonalFocus()
      .then(res => {
        if (res.status === 200) {
          // 将数据中的head_img进行服务器地址的拼接
          res.data.data.forEach(value => {
            value.head_img = localStorage.getItem('baseurl_37') + value.head_img
          })
          this.focusList = res.data.data
        }
      })
  }
}
</script>

<style lang='less' scoped>
.list{
    .box{
        display: flex;
        padding: 25px 10px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        > img{
            display: block;
            width: 50/360*100vw;
            height: 50/360*100vw;
            border-radius: 50%;
            padding: 0 10px;
        }
        > .center{
            flex: 1;
            > p {
                line-height: 30px;
                font-size: 14px;
            }
            > span {
                font-size: 12px;
                color:#999;
            }
        }
        > span {
            height: 30px;
            background-color: #eee;
            font-size: 13px;
            border-radius: 30px;
            line-height: 30px;
            padding: 0px 15px;
        }
    }
}
</style>
