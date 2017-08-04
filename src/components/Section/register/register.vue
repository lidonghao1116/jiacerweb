<template>
  <div id="register">
    <div class="register_info_box">
      <div class="register_info">
        <label>手机号</label>
        <div class="phone">
          <input type="text" name="phone" v-model="params.phone" placeholder="请输入手机号" id="phone" maxlength="11"
                 @blur="registerConfirm" @keyup="getValue">
        </div>
      </div>
      <div class="register_info">
        <label>图形码</label>
        <div class="img_code">
          <input type="text" name="imgCode" v-model="params.imgCode" placeholder="请输入右侧图形码" id="iptImgCode" maxlength="16"
                 @blur="registerConfirm" @keyup="getValue">
          <img src="" alt="" id="imgCode" @click="getImgCode">
        </div>
      </div>
      <div class="register_info">
        <label>验证码</label>
        <div class="message_code">
          <input type="text" name="sms" v-model="params.sms" placeholder="请输入短信验证码" maxlength="6" id="message"
                 @blur="registerConfirm" @keyup="getValue" @paste="getValue">
          <button type="button" name="button" :class={clickable:!disabled} :disabled="disabled" id="captcha"
                  @click="getCaptchaCode">{{smsTxt}}
          </button>
        </div>
      </div>
    </div>
    <div class="register_bt">
      <input type="button" name="" value="开始" :disabled="disabledSt" :class={clickable:!disabledSt} id="btnStart"
             @click="bindInfo">
      <p>点击开始，即表示已阅读并同意
        <router-link class="read" to="agreement">《用户服务协议》</router-link>
      </p>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  @import '../../../assets/less/register.less';
</style>
<script>
  import * as cm from '../../../assets/js/utils/common'
  export default{
    data(){
      return {
        phone_state: false,
        img_state: false,
        sms_state: false,
        disabled: true,
        disabledSt: true,
        smsTxt: '获取验证码',
        countDown: 5,
        params: {
          sms: null,
          phone: null,
          imgCode:null
        }
      }
    },
    mounted(){
      this.initInfo();
      this.getImgCode();
    },
    methods: {
      initInfo(){
        var req = {
          url: window.global_config.userInfo,
          methods: 'get',
          headers: {
            'wx-openid': cm.params.wxid,
            'invite-code': cm.params.inid,
          },
          withCredentials: true,
        }
        this.$http(req).then(function (res) {
          console.log(res)
        }).catch((err) => console.log(err))
      },
//      获取图形码
      getImgCode(){
        var req = {
          url: window.global_config.getCaptchaCode,
          methods: 'get',
          headers: {
            'wx-openid': cm.params.wxid,
            'invite-code': cm.params.inid,
          },
          withCredentials: true,
        }
        this.$http(req).then(function (res) {
          console.log(res)
          var img = "data:image/jpeg;base64," + res.data.jsonData.captcha;
          $("#imgCode").attr("src", img);
        }).catch((err) => console.log(err))
      },
//      获取短信码
      getCaptchaCode(){
        let phoneNum = $('#phone').val();
        var req = new Request(window.global_config.registerSmsCode + "?mobile=" + phoneNum, {
          method: 'GET',
          headers: { // headers: fetch事实标准中可以通过Header相关api进行设置
            'Content-Type': 'application/x-www-form-urlencoded', // default: 'application/json'
            'wx-openid': cm.params.wxid,
            'invite-code': cm.params.inid
          }
        })
        this.$http(req).then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        });
        this.sendCode()
      },
      sendCode(){
        let self = this;
        if (self.countDown <= 1) {
          self.disabled = false;
          self.smsTxt = "重获验证码";
          self.countDown = 5;
        }
        else {
          self.disabled = true;
          self.countDown--;
          self.smsTxt = self.countDown + "秒"
          console.log(self.countDown)
          setTimeout(() => {
            self.sendCode()
          }, 1000)
        }
      },
      registerConfirm(e){
        let self = $(e.target)
        let params = {
          name: self.attr('name'),
          value: self.val()
        };
        const reg = {
          regExp: /^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/,
          regNum: /^[0-9]*$/,
          regCode: /^[A-Za-z0-9]+$/
        }
        switch (params.name) {
          case 'phone':
            if (isEmpty(params.value)) {
              $.toast('请输入手机号')
              this.phone_state = false;
            }
            else if (!reg.regExp.test(params.value)) {
              $.toast('请填写正确的手机号码')
              this.phone_state = false;
            }
            else {
              this.phone_state = true;
              this.disabled = false;
            }
            break;
          case 'imgCode':
            if (isEmpty(params.value)) {
              $.toast('请填图片验证码')
              this.img_state = false;
            }
            else if (!reg.regCode.test(params.value)) {
              $.toast('图形码不正确')
              this.img_state = false;
            }
            else {
              this.img_state = true;
            }
            break;
          case 'sms':
            if (isEmpty(params.value)) {
              $.toast('请填写验证码')
              this.sms_state = false;
            }
            else if (!reg.regNum.test(params.value)) {
              $.toast('验证码不正确')
            }
            else {
              this.sms_state = true;
//              this.onSuccess(self)
            }
        }
      },
//      案件获取值
      getValue(){
        if (this.phone_state && this.img_state && !isEmpty(this.params.sms) && !isEmpty(this.params.phone) && !isEmpty(this.params.imgCode)) {
          this.disabledSt = false;
        } else {
          this.disabledSt = true;
          if (isEmpty(this.params.phone)) {
            this.disabled = true;
          }
        }
      },
//      开始绑定信息
      bindInfo(){
        console.log('start')
        var req = {
          url: window.global_config.registerBind,
          methods: 'post',
          headers: {
            'wx-openid': cm.params.wxid,
            'invite-code': cm.params.inid,
          },
          data:this.params,
          withCredentials: true,
        }
        this.$http(req).then(function (res) {
          console.log(res)
        }).catch((err) => console.log(err))
      }
    }
  }
</script>