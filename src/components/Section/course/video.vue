<template>
  <div class="courseContent" id="videoList">
    <ul class="vl-district">
      <li v-for="(item,index) in itemList">
        <!--<h1></h1>-->
        <ul class="vl-subdivision" :class="'spli'+index">
          <li :data-id="item.id" @click="watchVideo($event)" :data-nowatch="item.isGuestWatch">
            <p>{{item.videoDesc}}</p>
            <a href="#" v-if="item.isGuestWatch==1">试看</a>
            <a v-else="item.isGuestWatch==0" class="play" href="#"></a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<script>
  import * as cm from  '../../../assets/js/utils/common'

  export default{
    data(){
      return {
        itemList: [],
        isPlay:true
      }
    },
    mounted(){
      $('.courseContent').css("top",this.top + 'px');
      this.fetchVideo()
    },
    methods: {
      fetchVideo(){
        let _this = this;
        var req = {
          url: '/data/video.json?courseId=' + this.courseId,
          methods: 'get',
          headers: {
            'wx-openid': cm.params.wxid,
            'invite-code': cm.params.inid,
          },
          withCredentials:true,
        }
        this.$http(req).then(function (res) {
          _this.itemList=res.data.jsonData;
        }).catch((err)=> console.log(err))
      },
      initSPPage(data){
        console.log(data)
        var i = 0;
        $('.vl-district li').html('hahahha')
      },
      watchVideo(e){
        var el=e.currentTarget;
        if (cm.isEmpty(cm.params.wxid)||$.trim(cm.params.wxid)=="null"){
          $.toast('请在微信中观看')
          return;
        }
        else if ($(el).data('nowatch')==0){
          $.toast('本视频需购买后才能正常观看')
          return;
        }
        $(".courseImg").hide();
        $(".courseVideo").show();
        let play={};
        var id=$(el).data('id');
        console.log(id)
        var player = new qcVideo.Player("courseVideo", {
          "file_id": id,
          "app_id": "1254037450",
          "width":'375',
          "height":'178'
        });
      },
    },
    props: ['courseId', 'isOwn','top']
  }
</script>