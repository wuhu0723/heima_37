<template>
  <div class="search">
      <div class="header">
          <span class="iconfont iconjiantou2" @click="$router.back()"></span>
          <form>
              <input type="text" placeholder="请输入搜索关键字" v-model='userkey'>
              <van-icon name="search" class="big"/>
          </form>
          <span @click='getdata'>搜索</span>
      </div>
      <div class="history">
          <h3>历史记录</h3>
          <div class="list">
              <router-link :to='"/post_search?keyword="+item' v-for='(item,index) in historyList' :key='index'>{{item}}</router-link>
          </div>
      </div>
      <div class="hot">
          <h3>热门搜索</h3>
            <div class="list">
                <router-link to='/post_search?keyword=办公室'>办公室</router-link>
                <router-link to='/post_search?keyword=办公室'>办公室</router-link>
                <router-link to='/post_search?keyword=办公室'>办公室</router-link>
                <router-link to='/post_search?keyword=办公室'>办公室</router-link>
                <router-link to='/post_search?keyword=办公室'>办公室</router-link>
            </div>
      </div>
      <articalblock v-for='item in searchList' :key='item.id' :post='item'></articalblock>
  </div>
</template>

<script>
import { searchArtical } from '@/api/articals.js'
import articalblock from '@/components/articalBlock.vue'
export default {
  components: {
    articalblock
  },
  data () {
    return {
      userkey: '',
      searchList: [],
      historyList: []
    }
  },
  watch: {
    async userkey () {
      let res = await searchArtical(this.userkey)
      console.log(res)
      if (res.status === 200) {
        this.searchList = res.data.data
      }
    }
  },
  computed: {
    //   计算属性的特性
    // 1.计算属性中不要添加异步操作
    // 2.计算属性一定要返回数据
    // 3.需要手动调用
    // getresults () {
    //   var a = null
    //   searchArtical(this.userkey)
    //     .then(res => {
    //       console.log(res)
    //       a = res
    //     })
    //   return a
    // }
  },
  mounted () {
    //   页面加载时，立刻读取本地存储的历史记录，动态加载
    let arr = JSON.parse(localStorage.getItem('heima_local_37'))
    this.historyList = arr.reverse()
  },
  methods: {
    async getdata () {
      let res = await searchArtical(this.userkey)
      if (res.status === 200) {
        this.searchList = res.data.data
        // 将搜索结果存储到本地存储：对象数组
        // 1.本地存储只能存储字符串
        // 2.["美女","帅哥"]：这种必须是字符串格式
        // 3.我们最终需要存储是数组格式的字符串值
        // 4.操作方式：读取本地存储获取数组格式字符串 > 转换为数组 > 操作数组 > 将数组重新转换为字符串>本地存储
        // 5.约定本地存储的键： heima_local_37
        // a.读取本地存储
        let localStr = localStorage.getItem('heima_local_37') || '[]'
        // b.转换
        let arr = JSON.parse(localStr)
        // c.将关键字存储到数组
        if (arr.length >= 10) {
          arr.splice(0, 1)
        }
        let index = arr.indexOf(this.userkey)
        if (index !== -1) {
          arr.splice(index, 1)
        }
        arr.push(this.userkey)
        // d.将数组重新转换为字符串
        let finalStr = JSON.stringify(arr)
        // e:将数据重新存储到本地存储
        localStorage.setItem('heima_local_37', finalStr)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.search{
    padding: 0 10px;
    .header{
        display: flex;
        justify-content: space-between;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ccc;
        >span:nth-of-type(1){
            width: 50px;
            height: 100%;
            text-align: center;
        }
        form{
            flex: 1;
            position: relative;
            > input {
                height: 30px;
                width: 100%;
                margin-top: 10px;
                border:none;
                border:1px solid #ccc;
                border-radius: 30px;
                font-size: 14px;
                color:#888;
                padding-left: 34px;
                box-sizing: border-box;

            }
            .big{
                position: absolute;
                left: 18px;
                top: 18px;
            }
        }
        >span:nth-of-type(2){
            width: 50px;
            height: 100%;
            text-align: center;
        }
    }
    .history{
        padding: 15px 0;
        border-bottom: 1px solid #ccc;
        > h3{
            padding: 10px 0;
            font-weight: bold;
        }
        .list{
            font-size: 14px;
            > a{
                display: block;
                line-height: 24px;
                color:#666;
            }
        }
    }
    .hot{
        padding: 15px 0;
        > h3{
            padding: 10px 0;
            font-weight: bold;
        }
        .list {
            display: flex;
            flex-wrap: wrap;
            > a {
                width: 50%;
                line-height: 30px;
                color:#666;
                font-size: 14px;
            }
        }
    }
}
</style>
