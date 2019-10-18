<template>
  <div class="comments">
    <myheader title="精彩评论">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="keeps">
      <div class="item" v-for="item in commentsList" :key="item.id">
        <div class="head">
          <img src="../assets/logo.png" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <!-- 下面这个组件的调用,是为了生成parent中的评论数据结构,一定要记得进行判断,判断是否有parent -->
        <commentItem v-if='item.parent' :comment='item.parent'></commentItem>
        <div class="text">{{item.content}}</div>
      </div>
    </div>
    <div style='width:100%;height:50px'></div>
    <commentfooter :post='artical'></commentfooter>
  </div>
</template>

<script>
import myheader from '@/components/myheader.vue'
import commentfooter from '@/components/commentfooter.vue'
import commentItem from '@/components/commentItem.vue'
import { getPostComments, getArticalById } from '@/api/articals.js'
export default {
  data () {
    return {
      commentsList: [],
      artical: {}
    }
  },
  components: {
    myheader, commentItem, commentfooter
  },
  mounted () {
    let id = this.$route.params.id
    getPostComments(id).then(res => {
      console.log(res)
      if (res.status === 200) {
        // res.data.data[6].parent.parent.parent = {
        //   content: '看看有没有',
        //   id: 22,
        //   parent: null,
        //   user: {
        //     nickname: 'jack'
        //   }
        // }
        this.commentsList = res.data.data

        // 根据id获取文章数据
        getArticalById(id)
          .then(res => {
            console.log(res)
            if (res.status === 200) {
              this.artical = res.data.data
            }
          })
      }
    })
  }
}
</script>

<style lang='less' scoped>
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  box-sizing: border-box;
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
    .sour {
      border: 1px solid #ddd;
      padding: 5px;
      color: #999;
      line-height: 25px;
      > p {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
      > div {
        font-size: 13px;
      }
    }
  }
}
</style>
