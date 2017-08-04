<template>
  <div id="mine">
    <div class="top_link">
      <p><router-link to="/myInfo"><img :src="avator"><br/><span>查看个人详情</span></router-link></p>
    </div>
    <div class="mine_list">
      <router-link to="/studyList"><p><span><img src="/statics/img/iconxuexi.png"></span>学习登记</p></router-link>
      <router-link to="/trainRecord"><p><span><img src="/statics/img/iconpeixun.png" class="record"></span>培训记录</p></router-link>
      <router-link class="border_n" to="/myCertificate"><p><span><img src="/statics/img/iconzhengshu.png"></span>我的证书</p></router-link>
    </div>
    <!--<div class="mine_list">
      <a href=""><p><span><img src="/statics/img/iconjiedan.png"></span>接单记录</p></a>
      <a class="border_n" href=""><p><span><img src="/statics/img/iconpingjia.png"></span>评价记录</p></a>
    </div>
    <div class="mine_list last_list">
      <a class="border_n" href=""><p><span><img src="/statics/img/iconxiaoxi.png"></span>消息中心</p></a>
    </div>-->
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import '../../../assets/less/mine.less';
</style>
<script>
  export default{
    data(){
      return{
        avator:'/statics/img/touxiang.png',
        nick:null
      }
    },
    mounted(){
      this.initWechat()
    },
    methods:{
      initWechat(){
        let _this = this;
        console.log(111);
        let req = {
          url: '/data/wechatInfo.json',//window.global_config.wechat,
          methods: 'get',
          headers,
          withCredentials: true,
        }
        _this.$http(req).then(function (res) {
          let data = res.data.jsonData;
            _this.avator=data.headImgUrl;
            _this.nick=data.nick;
            console.log(_this.avator,_this.nick)
          localStorage.setItem('avator',_this.avator)
          localStorage.setItem('nick',_this.nick)
        }).catch((err) => console.log(err))
      }
    }
  }
</script>