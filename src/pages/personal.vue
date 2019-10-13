<template>
<div class="personal">个人中心</div>
</template>

<script>
import { getPersonalInfo } from '@/api/users.js'
export default {
  mounted () {
    // 获取当前登陆用户的个人信息
    const id = localStorage.getItem('my_heimatoutiao_37_id')
    getPersonalInfo(id)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style>

</style>
