<template>
  <div id="course">
    <div class="courseImg">
      <img src="/statics/img/courseImg.jpg"/>
    </div>
    <div class="courseVideo" id="courseVideo">
    </div>
    <div class="cd-tab">
      <a v-for="(item,index) in list" :class="{'cdt_on':(selected==index)}" @click.stop.prevent="change(index)"
         :key="item.id">{{item.text}}</a>
    </div>
    <keep-alive>
      <component :is="currentView" :courseId="courseId" :isOwn="isOwn"></component>
    </keep-alive>
    <!--底部购买-->
    <div class="courseFoot" v-show="isOwn<=0">
      <div class="cf-btn clearfix">
        <a class="cfb-left">分享好友赢红包</a>
        <a class="cfb-right" id="buy" @click="buyLayer">购买：￥<span id="price">{{price}}</span>/永久</a>
      </div>
    </div>
    <!--遮罩层-->
    <div class="mask">
      <div class="popup" id="orderCourse">
        <div class="popupText">
          <h3>您将购买本课程的内容</h3>
          <p>购买后不支持退订、转让，请再次确认</p>
          <div class="codeBox">
            <label for="invitationCode">邀请码:</label>
            <input type="text" placeholder="(选填)" id="invitationCode">
          </div>
        </div>
        <div class="button">
          <a id="cancel">取消</a><a id="confirm">确定</a>
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
        courseTop: '',
        type: ''
      }
    },
    mounted(){
      var headH = $('#headerView').height();
      var imgH = $('.courseImg').height();
      var tabH = $('.cd-tab').height();
      $('.courseContent').css("top", 300 + 'px');
      console.log(headH, imgH, tabH)
//      this.setVideoListHeight();
      this.fetchParams()
    },
    methods: {
      change(index){
        this.selected = index;
        this.currentView = 'item' + index;
      },
      fetchParams(){
        var params = {}
        var str = '';
        str = sessionStorage.obj;
        params = JSON.parse(str);
        this.isOwn = params.isOwn;
        this.courseId = params.courseId;
        this.price = params.price;
        console.log(this.price);
        this.type = params.courseType;
//        this.initCourseType(this.type)
      },
      buyLayer(){
        console.log('buy')
      }
      /* initCourseType(ct){
       console.log("type:"+ct)
       var list=this.list;
       switch (ct){
       case '01':
       console.log(this.list)
       delete list[1].text
       delete list[2].text
       //            this.list.text.remove('模拟答题')
       //            this.list.text.remove('学习记录')
       break;
       case '02':
       console.log(this.list)
       delete list[0].text
       //            this.list.text.remove('在线视频')
       break;
       case '03':
       console.log(this.list)
       break;
       default:
       break;
       }
       }*/
    },
    components: {
      item0, item1, item2
    },
    computed: {}
  }
</script>