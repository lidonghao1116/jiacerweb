<template>
  <div id="myInfo">
    <div class="my_info_box">
      <div class="img_info">
        <label>头像：</label>
        <div class="info_right">
          <img src="/statics/img/touxiang.png" alt="">
        </div>
      </div>
    </div>
    <div class="my_info_box">
      <div class="my_info">
        <label>昵称：</label>
        <div class="info_right">
          <p class="nickName"></p>
          <input type="text" name="nickName" value="">
          <a class="revise" id="revised">修改</a>
        </div>
      </div>
      <div class="my_info border_n">
        <label>手机号：</label>
        <div class="info_right">
          <p id="mobile"></p>
          <a id="register" @click="linkFun">注册</a>
        </div>
      </div>
    </div>
    <div class="my_info_box">
      <div class="my_info">
        <label>真实姓名：</label>
        <div class="info_right">
          <p id="username"></p>
          <!--<a href="/pages/infoComplete.html">完善个人信息</a>-->
        </div>
      </div>
      <div class="my_info border_n">
        <label>身份证号：</label>
        <div class="info_right">
          <p id="certNo"></p>
        </div>
      </div>
    </div>
    <div class="my_info_box">
      <div class="my_info border_n">
        <label>邀请码：</label>
        <div class="info_right">
          <p class="code" id="inviteCode">（注册后才有邀请码）</p><!--//（注册后才有邀请码）-->
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import '../../../assets/less/myInfo.less';
</style>
<script>
  import * as cm from  '../../../assets/js/utils/common'
//  import router from '../../../route.config'

  export default{
    methods:{
      linkFun(){
        console.log('注册');
        if (cm.isEmpty(cm.params.wxid)||$.trim(cm.params.wxid)=="null"){
          $.toast('请在微信中完成注册')
          return;
        }else {
          this.$router.push({ path: 'register' })
        }
      }
    },
    data(){
      return{
        href:'aaaa'
      }
    },
    created:function () {
//      this.linkFun();
    }
  }
</script>