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
          <span @click='wirtecomment(item)'>回复</span>
        </div>
        <!-- 下面这个组件的调用,是为了生成parent中的评论数据结构,一定要记得进行判断,判断是否有parent -->
        <commentItem
        v-if='item.parent'
        :comment='item.parent'
        @wirtecomment='wirtecomment'
        ></commentItem>
        <div class="text">{{item.content}}</div>
      </div>
    </div>
    <div style='width:100%;height:50px'></div>
    <!--
      :post='artical'为子组件中的props成员赋值：这个值是当前文章数据
      :replayobj='replayobj' 为子组件中的props成员赋值，这个值是当前评论数据对象
      @resetValue='resetValue' 重置子组件中的评论数据
      @refresh='init' 实现页面刷新
     -->
    <commentfooter
      :post='artical'
      :replayobj='replayobj'
      @resetValue='resetValue'
      @refresh='init'
    ></commentfooter>
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
      artical: {},
      replayobj: null // 当前的评论数据对象
    }
  },
  components: {
    myheader, commentItem, commentfooter
  },
  methods: {
    // 重置 当前的评论对象
    resetValue () {
      this.replayobj = null
    },
    // 写评论
    wirtecomment (item) {
      // console.log(this.artical)
      console.log(item)
      this.replayobj = item
    },
    // 数据初始化
    init () {
      let id = this.$route.params.id
      getPostComments(id).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.commentsList = res.data.data
          // 根据id获取文章数据
          getArticalById(id)
            .then(res => {
              console.log(res)
              if (res.status === 200) {
                this.artical = res.data.data
                window.scrollTo(0, 0)
              }
            })
        }
      })
    }
  },
  mounted () {
    this.init()
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
