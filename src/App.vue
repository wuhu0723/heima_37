<template>
  <div id="app">
    <div class="box"></div>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="less">
#app{
  background-color: #f00;
  width:100vw;
  height: 100vh;
  .box{
    width: 126 / 360 * 100vw;
    height: 126 / 360 * 100vw;
    background-color: #00f;
  }
}
</style>
