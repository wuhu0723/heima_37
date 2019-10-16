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

    <van-tabs v-model="active" sticky swipeable>
      <!-- 生成栏目标签 -->
      <van-tab v-for="item in cateList" :title="item.name" :key="item.id">
        <!-- 当前栏目的文章列表数据--动态生成，默认情况下显示头条数据 -->
        <articalblock v-for='(subitem,index) in item.articalList' :key='index' :post='subitem'></articalblock>
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
      this.init()
    }
  },
  methods: {
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
        }
      })
    }
  },
  mounted () {
    getCategoryList().then(res => {
      console.log(res)
      if (res.status === 200) {
        //   this.cateList = res.data.data
        //   基于后期的业务需求，我们需要在里面添加新的5个成员
        this.cateList = res.data.data.map(value => {
          return {
            ...value,
            articalList: [], // 当前栏目的文章列表数据
            pageIndex: 1, // 当前栏目 的当前页码
            pageSize: 10, // 当前栏目每页所显示的文章数量
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
