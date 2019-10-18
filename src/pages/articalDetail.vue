<template>
  <div class="articaldetail_37">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span :class="{active:artical.has_follow}" @click='followUser'>{{artical.has_follow?'已关注':'关注'}}</span>
    </div>
    <!-- 文章详情 -->
    <div class="detail">
      <div class="title">{{artical.title}}</div>
      <div class="desc">
        <span>{{artical.user.nickname}}</span> &nbsp;&nbsp;
        <span>2019-9-9</span>
      </div>
      <div id="content" class="articalcontent" v-html="artical.content"></div>
      <div class="opt">
        <span :class="{like:true,active:artical.has_like}" @click='likethisartical'>
          <van-icon name="good-job-o" />{{artical.like_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps" v-if="artical.comment_length > 0">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src="../assets/logo.png" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <div style="height:50px;width:100%"></div>
    <!-- 添加评论区域 -->
    <commentfooter :post='artical'></commentfooter>
  </div>
</template>

<script>
import { getArticalById, likeArtical } from '@/api/articals.js'
import { setPersonalFocu, cancelPersonalFocu } from '@/api/users.js'
import commentfooter from '@/components/commentfooter.vue'
export default {
  components: {
    commentfooter
  },
  data () {
    return {
      artical: {
        user: {}
      }
    }
  },
  methods: {
    // 文章点赞和取消点赞
    async likethisartical () {
      let res = await likeArtical(this.artical.id)
      console.log(res)
      if (res.data.message === '点赞成功') {
        // 让点赞的次数加1
        ++this.artical.like_length
        // 设置当前的点赞状态，以动态的设置样式
        this.artical.has_like = true
      } else {
        --this.artical.like_length
        this.artical.has_like = false
      }
    },
    // 用户的关注和取消
    followUser () {
      // 1.修改当前的关注状态
      this.artical.has_follow = !this.artical.has_follow
      if (this.artical.has_follow) { // 经过这一次单击之后，切换到已关注状态，那么我们同时需要修改数据库的数据存储--实现数据更新
        setPersonalFocu(this.artical.user.id)
          .then(res => {
            this.$toast.success(res.data.message)
          })
      } else {
        cancelPersonalFocu(this.artical.user.id)
          .then(res => {
            this.$toast.success(res.data.message)
          })
      }
    }
  },
  mounted () {
    // 根据id获取文章的详情，实现文章详情的动态渲染
    const id = this.$route.params.id
    getArticalById(id).then(res => {
      console.log(res)
      if (res.status === 200) {
        this.artical = res.data.data
      }
    })
  }
}
</script>

<style lang='less' scoped>
.articaldetail_37 {
  // 如果想要修改服务器返回页面结构中的元素的样式，则不要添加scoped标识，否则无法修改元素的样式
  .header {
    padding: 0px 10px;
    box-sizing: border-box;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > .left {
      height: 100%;
      vertical-align: middle;
      position: relative;
      .van-icon {
        position: absolute;
        top: 15px;
        left: 0;
      }
      > span {
        margin-left: 22px;
        font-size: 50px;
      }
    }
    // css:cascading style sheet
    > span {
      padding: 5px 15px;
      text-align: center;
      border-radius: 15px;
      font-size: 13px;
      border:1px solid #ccc;
      &.active{
        background-color: #f00;
        color: #fff;
        border:1px solid #f00;
      }
    }
  }
  .detail {
    padding: 15px;
    box-sizing: border-box;
    .title {
      font-size: 18px;
      font-weight: bold;
      padding: 10px 0;
    }
    .desc {
      line-height: 30px;
      color: #999;
      font-size: 13px;
    }
    .articalcontent {
      text-indent: 2em;
      line-height: 24px;
      font-size: 15px;
      padding-bottom: 30px;
      width: 100%;
      /deep/img {
        display: block;
        width: 100%;
        text-align: center;
      }
    }
  }
  .opt {
    display: flex;
    justify-content: space-around;
    .like,
    .chat {
      height: 25px;
      padding: 0 15px;
      font-size: 14px;
      line-height: 25px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 15px;
    }
    .like {
      &.active{
        color:red;
      }
    }
    .w {
      color: rgb(84, 163, 5);
    }
  }
  .keeps {
    border-top: 5px solid #ddd;
    padding: 0 15px;
    box-sizing: border-box;
    > h2 {
      line-height: 50px;
      text-align: center;
    }
    .item {
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        > img {
          width: 50/360 * 100vw;
          height: 50/360 * 100vw;
          display: block;
          border-radius: 50%;
        }
        > div {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          > span {
            font-size: 12px;
            color: #999;
            line-height: 25px;
          }
        }
        > span {
          color: #999;
          font-size: 13px;
        }
      }
      .text {
        font-size: 14px;
        color: #333;
        padding: 20px 0 10px 0;
      }
    }
    .more {
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 15px;
      margin: 20px auto;
      font-size: 13px;
    }
  }
}
</style>
