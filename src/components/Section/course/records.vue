<template>
  <div class="courseContent" id="learningRecords">
    <ul>
      <li class="title">
        <span class="date">时间</span>
        <span class="score">分数</span>
        <span class="time">用时</span>
      </li>
    </ul>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<script>
  import * as common from  '../../../assets/js/utils/common'

  export default{
    data(){
      return{
        scoreList:[]
      }
    },
    mounted(){
      $('.courseContent').css("top", this.top + 'px');
      this.fetchScore()
    },
    methods:{
      fetchScore(){
        console.log("cid:"+this.courseId)
        console.log("isOwn:"+this.isOwn)
        if(this.isOwn==0){
          let txt="暂无答题记录"
          $('#learningRecords').html(common.initNothing(txt));
          return;
        }else {
          var req = new Request(window.global_config.getAllScore + "?courseId=" + this.courseId, {
            method: 'GET',
            headers: { // headers: fetch事实标准中可以通过Header相关api进行设置
              'wx-openid': wx_openid,
              'invite-code': invite_code,
              // 'test-mobile': '15026856424'//
            }
          })
          this.$http(req).then(function (res) {
            _this.itemList=res.data.jsonData;
            console.log(_this.itemList)
          }).catch((err) => console.log(err))
        }
      }
    },
    props: ['courseId', 'isOwn','top']
  }
</script>