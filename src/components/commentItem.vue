<template>
  <div class="comm">
    <div class="sour">
      <p>
        <span>{{comment.user && comment.user.nickname}} &nbsp;&nbsp;2小时前</span>
        <span>回复</span>
      </p>
      <div>{{comment.content}}</div>
    </div>

    <!-- 通过名称可以调用组件,调用的方式与使用标签无异 -->
    <mycomment v-if="comment.parent" :comment="comment.parent"></mycomment>
  </div>
</template>

<script>
export default {
  name: 'mycomment',
  props: ['comment'],
  mounted () {
    console.log(123)
  }
}
</script>

<style lang='less' scoped>
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
</style>
