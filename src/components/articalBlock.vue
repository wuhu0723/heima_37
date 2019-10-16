<template>
  <div class="artical">
    <div class="left">
      <p>{{post.title}}</p>
      <div>
        <span>{{post.user.nickname}}</span>&nbsp;
        <span>{{post.comment_length}}跟帖</span>
      </div>
    </div>
    <img :src="post.cover[0].url" alt />
  </div>
</template>

<script>
export default {
  // post是指文章对象
  props: ['post']
}
</script>

<style lang='less' scoped>
.artical {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  > .left {
    flex: 1;
    overflow: hidden;
    > p {
      font-size: 14px;
      padding: 0px 5px;
      line-height: 24px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    > div {
      span {
        font-size: 12px;
        color: #999;
        line-height: 30px;
      }
    }
  }
  > img {
    display: block;
    width: 120/360 * 100vw;
    height: 75/360 * 100vw;
    // 为了避免图片变形，一般会显示图片的某个区域
    object-fit: cover;
  }
}
</style>
