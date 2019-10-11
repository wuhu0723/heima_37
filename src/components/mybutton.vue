<template>
  <div class="btn" @click='handlerclick'>{{text}}</div>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    handlerclick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang='less' scoped>
.btn {
  width: 100%;
  height: 48 / 360 * 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d81e06;
  color: #fff;
  border-radius: 50px;
  font-style: 20px;
}
</style>
