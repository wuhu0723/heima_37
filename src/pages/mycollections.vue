<template>
  <div class="collections">
    <myheader title="我的收藏">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <articalblock v-for='item in collectionsList' :key='item.id' :post='item'></articalblock>
  </div>
</template>

<script>
import articalblock from '@/components/articalBlock.vue'
import myheader from '@/components/myheader.vue'
import { getPersonalCollections } from '@/api/users.js'
export default {
  data () {
    return {
      collectionsList: []
    }
  },
  components: {
    articalblock, myheader
  },
  mounted () {
    getPersonalCollections()
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          this.collectionsList = res.data.data
        }
      })
  }
}
</script>

<style>

</style>
