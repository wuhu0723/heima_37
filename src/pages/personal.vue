<template>
  <div class="personal">
    <router-link to="/edit_profile">
      <div class="profile">
        <img :src="currentUser.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>{{currentUser.nickname}}
          </div>
          <div class="time">{{currentUser.currentDate | timeformat}}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <div class="list">
      <router-link to='/myfocus'>
        <mycell title='我的关注' desc='关注的用户'></mycell>
      </router-link>
      <router-link to='/mykeeps'>
        <mycell title='我的跟帖' desc='跟帖/回复'></mycell>
      </router-link>
      <router-link to='/mycollections'>
        <mycell title='我的收藏' desc='文章/视频'></mycell>
      </router-link>
      <router-link to='/mysettings'>
        <mycell title='设置'></mycell>
      </router-link>
    </div>
  </div>
</template>

<script>
import { getPersonalInfo } from '@/api/users.js'
import { timeformat } from '@/utils/myfilters.js'
import mycell from '@/components/mycell.vue'
export default {
  data () {
    return {
      currentUser: {
        head_img: '',
        nickname: '',
        currentDate: Date.now() // ms数
      }
    }
  },
  components: {
    mycell
  },
  filters: {
    timeformat
  },
  mounted () {
    // 获取当前登陆用户的个人信息
    const id = localStorage.getItem('my_heimatoutiao_37_id')
    getPersonalInfo(id)
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          this.currentUser.nickname = res.data.data.nickname
          this.currentUser.head_img = res.data.data.head_img

          if (this.currentUser.head_img) {
            // 是请求服务器资源，所以需要拼接完整的服务器路径
            this.currentUser.head_img = localStorage.getItem('baseurl_37') + res.data.data.head_img
          } else {
            // 请求当前本地资源
            this.currentUser.head_img = './avatar.jpg'
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang='less' scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>
