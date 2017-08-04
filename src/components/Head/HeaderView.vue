<template>
  <div id="headerView">
    <header class="bar bar-nav">
      <a class="goBack" href="javascript:history.go(-1)" v-show="isBack"></a>
      <h1 class="title"><i v-show="isLogo"></i>{{$store.state.headerTitle}}</h1>
      <a class="shareRedPacket"  @click="shareLayer">分享<br>红包</a>
    </header>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<script>
  import '../../assets/less/common.less'
  import { mapState } from 'vuex'
  export default{
    data(){
      return {}
    },
    computed: mapState({
      isBack: state => state.isBack,
      isShare: state => state.isShare,
      isLogo: state => state.isLogo,
    }),
    methods:{
      shareLayer() {
        this.$store.dispatch('shareLayer')
      }
    }
  }
</script>