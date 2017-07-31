<template>
  <div id="sectionView">
    <div class="courseTab">
      <router-link to="/home/purchase" id="purchase">已购课程</router-link>
      <router-link to="/home/recommend" id="recommend" exact>推荐课程</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .router-link-active{
    font-size: .32rem !important;
    color: #ff7f3a;
    font-weight: bold;
  }
</style>
<script>
  import '../../../assets/less/school.less'
  export default{
    data(){
      return{
        isActive:true
      }
    },
    methods:{

    }
  }
</script>