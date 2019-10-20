<template>
  <div class="comm">
    <div class="sour">
      <!-- 通过名称可以调用组件,调用的方式与使用标签无异 -->
      <!-- v-if="comment.parent":这就是递归退出的条件 -->
      <!-- @wirtecomment='sendcomment':说明以后这个组件会发起这样的事件，相当于一个事件注册 -->
      <mycomment
      v-if="comment.parent"
      :comment="comment.parent"
      @wirtecomment='sendcomment'>
      </mycomment>
      <p>
        <span>{{comment.user && comment.user.nickname}} &nbsp;&nbsp;2小时前</span>
        <span @click="sendcomment(comment)">回复</span>
      </p>
      <div>{{comment.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mycomment',
  props: ['comment'],
  mounted () {
    console.log(123)
  },
  methods: {
    sendcomment (comment) {
      this.$emit('wirtecomment', comment)
    }
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
