<template>
  <div class="keeps">
    <!-- 头部 -->
    <myheader title="我的跟帖">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="commentItem" v-for='item in commentsList' :key='item.id'>
      <div class="answer">
        <div class="time">2019-9-9 10:09</div>
        <div class="sour" v-if='item.parent'>
          <p>回复：{{item.parent.user.nickname}}</p>
          <div>{{item.parent.content}}</div>
        </div>
        <div class="myanswer">{{item.content}}</div>
        <div
          class="content"
        >
        <router-link class="postlink" :to='"/post?id="+item.post.id'>
          原文：{{item.post.title}}如果文章数据比较多
        </router-link></div>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from '@/components/myheader.vue'
import { getPersonalKeeps } from '@/api/users.js'
export default {
  data () {
    return {
      commentsList: []
    }
  },
  components: {
    myheader
  },
  mounted () {
    getPersonalKeeps()
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          this.commentsList = res.data.data
        }
      })
  }
}
</script>

<style lang='less' scoped>
.commentItem {
  padding: 10px;
  > .source {
    > .time {
      color: #999;
      font-size: 13px;
    }
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
    .title {
      font-size: 14px;
      padding: 20px 0;
    }
    .content {
      font-size: 12px;
      color: #999;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  > .answer {
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
     > .time {
      color: #999;
      font-size: 13px;
      line-height: 30px;
    }
    .sour{
      background-color: #eee;
      padding: 10px;
      color:#999;
      line-height: 25px;
      > p {
        font-size: 12px;
      }
      > div{
        font-size: 13px;
      }
    }
    .myanswer{
      font-weight: bold;
      line-height: 40px;
    }
    .content{
      font-size: 12px;
      color: #999;
      // 让文本单选显示，超出部分忽略
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .postlink{
    color:#999;
  }
}
</style>
