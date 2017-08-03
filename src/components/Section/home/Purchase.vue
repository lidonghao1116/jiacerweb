<template>
  <div class="content-block">
    <div class="content native-scroll">
      <div class="card">
        <div class="card-content">
          <div class="list-block media-list courseList">
            <courseLists :url="url" :noenroll="noenroll"></courseLists>
          </div>
        </div>
      </div>
      <div id="modal"></div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<script>
  import courseLists from './courseLists.vue'

  export default{
    data(){
      return {
        url:'/data/enroll.json',
        noenroll:false
      }
    },
    methods: {},
    components: {
      courseLists
    }
  }
</script>