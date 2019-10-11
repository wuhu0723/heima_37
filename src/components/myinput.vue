<template>
  <input
  class="input"
  :class="{success:status ==='success',error:status==='error'}"
  type="text"
  :placeholder="placeholder"
  :value="value"
  @input="handlerinput"
  @blur='handlerblur' />
</template>

<script>

export default {
  props: [
    'placeholder', // 占位文本
    'value', // 文本框展示数据
    'err_msg', // 用户提示
    'rules' // 验证规则
  ],
  data () {
    return {
      status: ''
    }
  },
  methods: {
    //   添加对文本框内容变化的监听
    handlerinput (event) {
      // 获取当前文本框的数据
      const { value } = event.target
      // 发射事件
      this.$emit('input', value)
      //   监听当前值的变化，动态的添加样式
      if (this.rules) {
        //   test:判断指定的字符串是否匹配当前的正则表达式
        if (this.rules.test(value)) {
          this.status = 'success'
        } else {
          this.status = 'error'
        }
      }
    },
    // 当失去焦点时触发
    handlerblur (event) {
      const { value } = event.target
      if (this.rules) {
        //   test:判断指定的字符串是否匹配当前的正则表达式
        if (!this.rules.test(value)) {
          // 给出用户提示
          this.$toast(this.err_msg || '输入错误')
        //   Toast(this.err_msg || '输入错误')
        }
      }
    }
  }
}
</script>

<style>
.input {
  width: 100%;
  height: 38 / 360 * 100vw;
  padding: 10px 0;
  box-sizing: border-box;
  background: #fff;
  border: none;
  border-bottom: 2px #666 solid;
  outline: none;
  font-size: 18px;
}

.success{
    border-bottom-color: green;
}

.error{
    border-bottom-color: red;
}
</style>
