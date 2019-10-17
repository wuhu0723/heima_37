<template>
  <div class="index">
    <!--头部 -->
    <div class="header">
      <div class="logo iconfont iconnew logo"></div>
      <div class="search">
        <van-icon name="search" />&nbsp;
        <span>搜索新闻</span>
      </div>
      <div class="user" @click="$router.push('/personal')">
        <van-icon name="user-o" />
      </div>
    </div>
    <!-- 标签页 -->
    <!-- 标记当前栏目的索引，不管是单击还是滑动都可以让索引值发生变化 -->
    <van-tabs v-model="active" sticky swipeable>
      <!-- 生成栏目标签 -->
      <van-tab v-for="item in cateList" :title="item.name" :key="item.id">
        <!-- 添加上拉加载组件 -->
        <van-list
          :immediate-check="false"
          :offset="10"
          v-model="item.loading"
          :finished="item.finished"
          finished-text="没有更多了"
          @load="onLoad"
          loading-text="正在玩命加载中..."
        >
        <!-- 添加下拉刷新组件 -->
          <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
            <!-- 当前栏目的文章列表数据--动态生成，默认情况下显示头条数据 -->
            <articalblock v-for="(subitem,index) in item.articalList" :key="index" :post="subitem"></articalblock>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
    <!-- 新闻块 -->
  </div>
</template>

<script>
import { getCategoryList } from '@/api/categories.js'
import { getArticalList } from '@/api/articals.js'
import articalblock from '@/components/articalBlock.vue'
export default {
  components: {
    articalblock
  },
  data () {
    return {
      // 我们要求首页打开之后，默认展示是头条栏目
      // 但是如果当前用户登陆了，会多一个栏目：关注，造成头条的索引为1
      active: localStorage.getItem('my_heimatoutiao_37') ? 1 : 0,
      //   所以有栏目数据
      cateList: []
    }
  },
  watch: {
    // 不管是单击还是滑动都会让Active发生变化
    active (newv, oldv) {
      console.log(newv, oldv)
      //   获取当前栏目所对应的数据并生成动态结构
      // 判断当前栏目的数组中是否有数据，如果有数据，则不再进行自动的加载，而是需要后期用户手动加载更多数据
      if (this.cateList[newv].articalList.length === 0) {
        this.init()
      }
    }
  },
  methods: {
    // 下拉刷新
    onRefresh () {
      // 我们需要向服务器发起最新的数据请求
      this.cateList[this.active].pageIndex = 1
      // 重置数据
      this.cateList[this.active].articalList.length = 0
      // 发起数据请求
      setTimeout(() => {
        this.init()
      }, 2000)
    },
    // 上拉加载当前栏目的更多数据
    onLoad () {
      console.log(`当前栏目${this.active}正在加载更多数据`)
      // 修改页码
      this.cateList[this.active].pageIndex++
      setTimeout(() => {
        this.init()
      }, 2000)
    },
    // 获取栏目的文章列表数据
    init () {
      getArticalList({
        pageIndex: this.cateList[this.active].pageIndex,
        pageSize: this.cateList[this.active].pageSize,
        category: this.cateList[this.active].id
      }).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.cateList[this.active].articalList.push(...res.data.data)
          // 本次加载完毕之后，将本次的加载状态重置为false,不然”正在加载..."这几个字不消失
          this.cateList[this.active].loading = false
          // 将下拉刷新的标记重置为False
          this.cateList[this.active].isLoading = false
          // 如果本次加载的数据没有够一页，那么说明数据已经全部加载完毕了
          if (res.data.data.length < this.cateList[this.active].pageSize) {
            this.cateList[this.active].finished = true
          }
        }
      })
    }
  },
  mounted () {
    getCategoryList().then(res => {
      console.log(res)
      if (res.status === 200) {
        //   this.cateList = res.data.data
        //   基于后期的业务需求，我们需要在里面添加新的6个成员
        this.cateList = res.data.data.map(value => {
          return {
            ...value,
            articalList: [], // 当前栏目的文章列表数据
            pageIndex: 1, // 当前栏目 的当前页码
            pageSize: 5, // 当前栏目每页所显示的文章数量
            isLoading: false, // 下拉刷新的标识
            loading: false, // 正在上拉加载的标识
            finished: false // 当前栏目上拉加载数据完毕的标识
          }
        })
        console.log(this.cateList)
        //   加载这个栏目的新闻数据--头条的数据
        this.init()
      }
    })
  }
}
</script>

<style lang='less' scoped>
.index {
  .header {
    width: 100%;
    height: 54/360 * 100vw;
    background-color: #e92322;
    display: flex;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    color: #fff;
    .logo {
      width: 54/360 * 100vw;
      height: 54/360 * 100vw;
      font-size: 50px;
    }
    .search {
      flex: 1;
      height: 34/360 * 100vw;
      border-radius: 17px;
      background-color: rgba(255, 255, 255, 0.3);
      line-height: 34/360 * 100vw;
      text-align: center;
      color: #fff;
    }
    .user {
      width: 54/360 * 100vw;
      font-size: 26px;
      text-align: center;
    }
  }
}
</style>
