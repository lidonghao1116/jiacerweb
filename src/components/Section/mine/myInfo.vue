<template>
  <div id="myInfo">
    <div class="my_info_box">
      <div class="img_info">
        <label>头像：</label>
        <div class="info_right">
          <img :src="avator" alt="">
        </div>
      </div>
    </div>
    <div class="my_info_box">
      <div class="my_info">
        <label>昵称：</label>
        <div class="info_right">
          <!--<p class="nickName">{{nick}}</p>-->
          <input type="text" name="nickName" value="" v-model.lazy="nick" v-focus="focusStatus" :readonly="!isRevise"
                 @blur="!focusStatus" ref="input">
          <a id="revised" @click="revise" v-if="!isRevise">{{nickTxt}}</a>
          <a id="save" @click="save" v-else>{{nickTxt}}</a>
        </div>
      </div>
      <div class="my_info border_n">
        <label>手机号：</label>
        <div class="info_right">
          <p id="mobile">{{mobile}}</p>
          <a id="register" @click="linkFun" v-show="!isRegister">注册</a>
        </div>
      </div>
    </div>
    <div class="my_info_box">
      <div class="my_info">
        <label>真实姓名：</label>
        <div class="info_right">
          <p id="username">{{username}}</p>
          <router-link to="/infoComplete" v-show="isComplete">完善个人信息</router-link>
        </div>
      </div>
      <div class="my_info border_n">
        <label>身份证号：</label>
        <div class="info_right">
          <p id="certNo">{{certNo}}</p>
        </div>
      </div>
    </div>
    <div class="my_info_box">
      <div class="my_info border_n">
        <label>邀请码：</label>
        <div class="info_right">
          <p class="code" id="inviteCode" :class="{inviteCode:intClass}">{{inviterCode}}</p>
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
  import {mapGetters, mapActions, mapState} from 'vuex'

  export default{
    data(){
      return {
        avator: '/statics/img/touxiang.png',
        nickTxt: '修改',
        isRevise: false,
        nick: null,
        certNo: null,
        education: null,
        username: null,
        focusStatus: false,
        isRegister: false,
        inviterCode: null,
        mobile: null,
        intClass: false,
        isComplete:false
      }
    },
    created: function () {
      this.initInfo()
//      this.linkFun();
    },
    methods: {
      linkFun(){
        console.log('注册');
        if (cm.isEmpty(cm.params.wxid) || $.trim(cm.params.wxid) == "null") {
          $.toast('请在微信中完成注册')
          return;
        } else {
          this.$router.push({path: 'register'})
        }
      },
      initInfo(){
        this.avator = localStorage.getItem('avator')
        let _this = this;
        console.log(111);
        let req = {
          url: '/data/userInfo.json',//window.global_config.userInfo
          methods: 'get',
          headers,
          withCredentials: true,
        }
        _this.$http(req).then(function (res) {
          let data = res.data;
          if (data.success) {
            data = data.jsonData;
            _this.$store.dispatch('isLogin');
            console.log(data);
            _this.avator = data.headImg;
            _this.nick = data.nickname;
            _this.username = data.username;
            _this.certNo = data.certNo;
            var tel = data.mobile;
            var reg = /^(\d{3})\d{4}(\d{4})$/;
            tel = tel.replace(reg, "$1 **** $2")
            _this.mobile = tel;
            if (isEmpty(data.inviteCode)) {
              _this.intClass = true;
              _this.inviterCode = '（注册后才有邀请码）'
            } else {
              _this.inviterCode = data.inviteCode;
            }
          }else {
            console.log(data)
          }
        }).then(() => {
          _this.isRegister = true;
          if (isEmpty(_this.username) || isEmpty(_this.certNo)) {
            _this.isComplete=true;
          }
        }).catch((err) => console.log(err))
      },
      revise(){
        let _this = this;
        if (isEmpty(paramsUrl.wxid) || $.trim(paramsUrl.wxid) == "null") {
          $.toast('请在微信中修改')
          return;
        } else {
          if ($.trim(_this.$store.state.isLogin) == 1) {
            _this.isRevise = true
            _this.nickTxt = "保存"
            _this.focusStatus = true
            this.$refs['input'].focus();
            console.log(2);
          }
          else if ($.trim(_this.$store.state.isLogin) == 0) {
            $.toast('您未绑定账号，请先登录')
            timedMsg(2000, '/register');
            return;
          }
        }
      },
      save(){
        let _this = this;
        _this.nickTxt = "修改";
        _this.isRevise = false;
        _this.focusStatus = false;
        _this.$refs['input'].blur();
        _this.update();
      },
      update(){
        console.log('update');
        let _this = this;
        let req = {
          url: window.global_config.update,
          methods: 'post',
          headers: { // headers: fetch事实标准中可以通过Header相关api进行设置
            'wx-openid': paramsUrl.wxid,//params.wx_openid,
            'invite-code': paramsUrl.inid,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
          data: {
            username: _this.username,
            nickname: _this.nick,
            certNo: _this.certNo,
            education: _this.education
          }
        };
        _this.$http(req).then(function (res) {
          console.log(res)
        }).catch((err) => console.log(err)
        )
      }
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus();
        }
      }
    },
  }
</script>