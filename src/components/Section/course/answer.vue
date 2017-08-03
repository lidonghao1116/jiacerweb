<template>
  <div class="courseContent" id="examination">
    <div class="examinationCard">
      <div class="ec-rules">
        <img src="/statics/img/rules.png"/>
        <div class="examInfo">
          <h1>答题时间：{{arrList.courseTime}}分钟</h1>
          <p>判断题：{{arrList.judgeScore|formateData}}分/题，{{arrList.judgeCount}}题</p>
          <p>单选题：{{arrList.singleScore|formateData}}分/题，{{arrList.singleCount}}题</p>
          <p>多选题：{{arrList.multiScore|formateData}}分/题，{{arrList.multiCount}}题</p>
        </div>
      </div>
      <div class="startAnswer clearfix">
        <a>开始答题</a>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<script>
  import {formateData} from '../../../assets/js/filters/formateData'
  import * as cm from  '../../../assets/js/utils/common'

  export default{
    data(){
      return {
        arrList: [],
      }
    },
    mounted(){
      $('.courseContent').css("top", 300 + 'px');
      this.fetchData()
    },
    methods: {
      fetchData(){
        let _this = this;
        var req = {
          url: '/data/info.json',
          methods: 'get',
          headers: {
            'wx-openid': cm.params.wxid,
          },
        }
        this.$http(req).then(function (res) {
          _this.arrList = res.data.jsonData;
          console.log(_this.arrList)

        }).catch((err) => console.log(err))
      },
    },
    filters: {
      formateData(value){
        return formateData(value);
      }
    }
  }
</script>