<template>
  <div id="courseLists">
    <ul>
      <li v-for="(item,index) in arrList">
        <router-link :to="'/course/courseId='+item.courseId" @click.native="bindInfo(item)">
          <img src="/statics/img/courses/jzfw.png">
          <div class="cl-content">
            <h1 class="clearfix">
              <p>{{item.courseName}}</p>
              <span v-show="noenroll" v-if="item.isOwn==0">￥{{item.price}}/永久</span>
              <span v-show="noenroll" v-else>已购买</span>
            </h1>
            <p class="clc1">适合工种：{{item.fitService}}</p>
            <p class="clc2">
              <label>膳食</label>
              <span>健康膳食、起居护理</span>
            </p>
            <p class="clc3">
              <label>日常</label>
              <span>身体护理、健康喂养</span>
            </p>
          </div>
        </router-link>
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
        arrList: [],
        isOwn:'',
      }
    },
    mounted(){
      this.fetchData();
    },
    watch: {
 /*     $route(to, from){
        var reg = /recommend/;
        if (reg.test((to.path))) {
        }
      }*/
    },
    methods: {
      fetchData(){
        let _this = this;
        var req = {
          url: _this.url,
          methods: 'get',
          headers: {
            'wx-openid': cm.params.wxid,
            'invite-code': cm.params.inid,
          },
        }
        this.$http(req).then(function (res) {
          console.log(res)
          _this.arrList = res.data.jsonData;
        }).catch((err) => console.log(err))
      },
      bindInfo(item){
        this.$store.state.headerTitle = item.courseName;
        let params = {
          price: item.price,
          courseId: item.courseId,
          isOwn: item.isOwn,
          courseType: item.courseType,
          courseName: item.courseName
        };
        let str = JSON.stringify(params);
        sessionStorage.obj = str;
      }
    },
    props:['url','noenroll']
  }
</script>