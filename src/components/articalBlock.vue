<template>
  <div class="artical" v-if='post.cover && post.cover.length<=2 && post.type === 1'>
    <div class="left">
      <p class="content">{{post.title}}</p>
      <div class="info">
        <span>{{post.user.nickname}}</span>&nbsp;
        <span>{{post.comment_length}}跟帖</span>
      </div>
    </div>
    <img class="single" :src="post.cover[0].url" alt  />
  </div>

  <div class="artical2"  v-else-if='post.cover&& post.cover.length>2 && post.type === 1'>
    <div class="left">
      <p class="content">{{post.title}}</p>
    </div>
    <div class="imgs">
      <img :src="item.url" alt="" v-for='item in post.cover' :key='item.id'>
    </div>
    <div class="info">
      <span>{{post.user.nickname}}</span>&nbsp;
      <span>{{post.comment_length}}跟帖</span>
    </div>
  </div>

  <div class="artical3"  v-else-if='post.type === 2'>
    <div class="left">
      <p class="content">{{post.title}}</p>
    </div>
    <div class="video">
      <img :src="post.cover[0].url" alt="">
      <i class="iconfont iconshipin"></i>
    </div>
    <div class="info">
      <span>{{post.user.nickname}}</span>&nbsp;
      <span>{{post.comment_length}}跟帖</span>
    </div>
  </div>
</template>

<script>
export default {
  // post是指文章对象
  props: ['post']
}
</script>

<style lang='less' scoped>
.left {
    flex: 1;
    overflow: hidden;
    .content {
      font-size: 14px;
      padding: 0px 5px;
      line-height: 26px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

.info {
  font-size: 12px;
  padding:5px;
  color: #999;
  > span:nth-of-type(1) {
    padding-right: 15px;
  }
}
.artical {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  img {
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
    object-fit: cover;
    padding-right: 5px;
  }
  .imgs {
    display: flex;
    padding: 10px 0 0 0;
    > img {
      flex: 1;
      padding: 0 5px;
      box-sizing: border-box;
      display: block;
    }
  }
  .video {
    width: 100%;
    height: 170/360 * 100vw;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    > img {
      width: 100%;
      height: 100%;
    }
    i {
        position: absolute;
        font-size: 46/360*100vw;
        color:#fff;
        border:1px solid #ccc;
        background-color: rgba(0,0,0,0.2);
        box-shadow: 0px 0px 10px #fff;
        border-radius: 50%;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
  }
}
.artical2{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  .imgs {
    display: flex;
    justify-content: space-around;
    width: 100%;
    > img {
      width: 32%;
      display: block;
    }
  }
}
.artical3{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  .video {
    width: 100%;
    position: relative;
    > img {
      width: 100%;
      display: block;
    }
    i {
      position: absolute;
      font-size: 60px;
      color:#fff;
      left:50%;
      top:50%;
      transform: translate(-50%,-50%);
      border-radius: 50%;
      border:1px solid #fff;
      box-shadow: 0px 0px 5px #fff;
    }
  }
}
</style>
