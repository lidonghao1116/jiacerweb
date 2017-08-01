<template>
  <div id="headerView">
    <header class="bar bar-nav">
      <a class="goBack" href="javascript:history.go(-1)" v-show="isBack"></a>
      <h1 class="title">{{$store.state.headerTitle}}</h1>
    </header>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<script>
  import '../../assets/less/common.less'
  export default{

  }
</script>