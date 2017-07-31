<template>
    <footer>
      <router-link to="/home/recommend" class="school" @click.native="homeSel" :class="{schoolActive:isHome}">在线学堂</router-link>
      <router-link to="/mine" class="mine" @click.native="mineSel" :class="{mineActive:isMine}">我的</router-link>
    </footer>
</template>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<script>
  export default{
    data(){
      return{
        isHome:true,
        isMine:false
      }
    },
    methods:{
      homeSel:function () {
        this.isHome=true;
        this.isMine=false;
      },
      mineSel:function () {
        this.isHome=false;
        this.isMine=true;
      }
    }
  }
</script>