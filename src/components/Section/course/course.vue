<template>
  <div id="course">
    <!--红包-->
    <div class="shareRedPacket-pop" v-show="$store.state.shareRedPacket" @click="shareLayer">
      <p class="shareArrow">立即分享</p>
      <img src="/statics/img/redPacketPic.png"/>
      <div class="activityRules">
        <h1>活动规则</h1>
        <ul>
          <li>示例1：A用户将【c课程】分享给好友，用户B通过A的链接进入到家策微课堂，并成功购买A分享的【c课程】，则A获得邀请奖励（微信现金红包，奖励金额为课程价格的10%，但最多不超过15元。）</li>
          <li>示例2：倘若用户B通过用户A的链接进入到家策微课堂，但并非购买A分享的【c课程】，而是购买了【d课程】，则A无法享受邀请奖励。</li>
          <li>不能使用自己的邀请码购买</li>
          <li>本次活动最终解释权归上海家策教育科技有限公司所有</li>
        </ul>
      </div>
    </div>
    <div class="courseImg" ref="abc">
      <img src="/statics/img/courseImg.jpg"/>
    </div>
    <div class="courseVideo" id="courseVideo">
    </div>
    <div class="cd-tab">
      <a v-for="(item,index) in list" :class="{'cdt_on':(selected==index)}" @click.stop.prevent="change(index)"
         :key="item.id">{{item.text}}</a>
    </div>
    <keep-alive>
      <component :is="currentView" :courseId="courseId" :isOwn="isOwn" :top="top"></component>
    </keep-alive>
    <!--底部购买-->
    <div class="courseFoot" v-show="isOwn<=0">
      <div class="cf-btn clearfix">
        <a class="cfb-left" @click="shareLayer">分享好友赢红包</a>
        <a class="cfb-right" id="buy" @click="showLayer">购买：￥<span id="price">{{price}}</span>/永久</a>
      </div>
    </div>
    <!--遮罩层-->
    <div class="mask" v-show="isLayer" @click.self="closeLayer">
      <div class="popup" id="orderCourse">
        <span id="close" @click="closeLayer"></span>
        <div class="popupText">
          <h3>您将购买本课程的内容</h3>
          <p>购买后不支持退订、转让，请再次确认</p>
          <div class="codeBox">
            <label for="invitationCode">邀请码:</label>
            <input type="text" placeholder="(选填)" id="invitationCode" ref="abc" v-model="inviterCode">
          </div>
        </div>
        <div class="button">
          <a id="cancel" @click="closeLayer">取消</a><a id="confirm" @click="prepay">确定</a>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<script>
  import "../../../assets/less/schoolShare.less";
  import item0 from './video.vue'
  import item1 from './answer.vue'
  import item2 from './records.vue'
  export default{
    data(){
      return {
        selected: 0,
        currentView: 'item0',
        isOwn: 0,
        courseId: '',
        price: '',
        list: [
          {text: '在线视频'},
          {text: '模拟答题'},
          {text: '学习记录'},
        ],
        top: "217",
        type: '',
        isLayer: false,
        inviterCode: "",
//        isShare:false,
      }
    },
    beforeCreate(){
      console.log("1:beforeCreate")
    },
    created(){
      console.log("2:created")
      this.fetchParams()
    },
    beforeMount(){
      console.log("3:beforeMount")
    },
    mounted(){
      let _this = this;
      this.$nextTick(() => {
        _this.setCourseTop();

      })


    },
    updated(){
      console.log("4:updated")
      console.log(this.top)
    },
    activated(){
      console.log("5:activated")
      console.log(this.top)
    },
    beforeDestory(){
      console.log("6:beforeDestory")
      console.log(this.top)
    },
    methods: {
      change(index){
        this.selected = index;
        this.currentView = 'item' + index;
      },
      setCourseTop(){
//        获取课程高度
        var headH = $('#headerView').height();
        var imgH = $('.courseImg').height();
        var tabH = $('.cd-tab').height();
        var _top = headH + imgH + tabH;
        this.top = _top;
        console.log(this.top)
        $('.courseContent').css("top", this.top + 'px');
      },
      fetchParams(){
        var params = {}
        var str = '';
        str = sessionStorage.obj;
        params = JSON.parse(str);
        console.log(params)
        this.isOwn = params.isOwn;
        this.courseId = params.courseId;
        this.price = params.price;
        this.type = params.courseType;
        this.$store.state.headerTitle = params.courseName;
      },
      showLayer(){
        let _this = this;
        if (isEmpty(paramsUrl.wxid) || $.trim(paramsUrl.wxid) == "null") {
          $.toast('预览版不支持购买，请用微信进行购买')
          return;
        }
        let req = {
          url: '/data/userInfo.json',//window.global_config.userInfo,
          methods: 'get',
          headers,
          withCredentials: true,
        }
        _this.$http(req).then(function (res) {
          let data = res.data;
          if (data.success) {
            _this.isLayer = true;
            if (!isEmpty(paramsUrl.inviterCode) && paramsUrl.inid !== paramsUrl.inviterCode) {
              console.log(_this.$refs.abc);
//              $("#invitationCode").val(paramsUrl.inviterCode)
              _this.inviterCode=paramsUrl.inviterCode
            }
            console.log(data.msg);
          } else if (data.code == 20004) {
            $.toast('您未绑定账号，请先登录');
            timedMsg(2000, '/register');
            return;
          }
        }).catch((err) => console.log(err))
      },
      closeLayer(){
        this.isLayer = false;
      },
      prepay(){
        let _this = this;
        console.log(_this.inviterCode)
//        _this.inviterCode = $('#invitationCode').val();
        let req = {
          url: window.global_config.prepay,
          methods: 'post',
          headers: {
            'wx-openid': paramsUrl.wxid,
            'invite-code': paramsUrl.inid,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data: {
            courseId: _this.courseId,
            inviterCode: _this.inviterCode
          },
          withCredentials: true,
        }
        _this.$http(req).then(function (res) {
          let data = res.data;
          if (data.success) {
            $.toast(data.msg);
            _this.weChatPay(data)
          } else {
            $.toast(data.msg);
          }
        }).catch((err) => console.log(err))
      },
      weChatPay(res){
        WeixinJSBridge.invoke('getBrandWCPayRequest', {
          "appId": res.jsonData.appId, //公众号名称，由商户传入
          "timeStamp": res.jsonData.timeStamp, //时间戳，自1970 年以来的秒数
          "nonceStr": res.jsonData.nonceStr, //随机串
          "package": res.jsonData.package,
          "signType": res.jsonData.signType, //微信签名方式:
          "paySign": res.jsonData.paySign //微信签名
        }, function (res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            console.log('OK')
          }
        })
      },
      shareLayer(){
        this.$store.dispatch('shareLayer')
      }
    },
    components: {
      item0, item1, item2
    },
    computed: {
      ftop: function () {

      }
    },
  }
</script>