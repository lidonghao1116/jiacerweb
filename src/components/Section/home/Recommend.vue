<template>
  <div class="content-block">
    <div class="content native-scroll">
      <div class="card">
        <div class="card-content">
          <div class="list-block media-list courseList">
            <ul id="recommendC">
              <li v-for="(item,index) in arrList">
                <router-link :to="'/course/courseId='+item.courseId" @click.native="bindInfo(item)">
                  <img src="/statics/img/courses/jzfw.png">
                  <div class="cl-content">
                    <h1 class="clearfix">
                      <p>{{item.courseName}}</p>
                      <span>￥{{item.price}}/永久</span>
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
        </div>
      </div>
      <div id="modal"></div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
</style>
<script>
  var wx_openid = localStorage.getItem('wx-openid');
  var invite_code = localStorage.getItem('invite-code');

  export default{
    data(){
      return{
        arrList:[],
      }
    },
    mounted(){
      this.fetchData();
    },
    watch:{
      $route(to,from){
        var reg=/recommend/;
        if(reg.test((to.path))){
        }
      }
    },
    methods:{
      fetchData(){
        let _this=this;
        var req={
          url:'/src/data/recommend.json',
          methods:'get',
          headers: {
            'wx-openid': wx_openid,
            'invite-code': invite_code,
          },
        }
        this.$http(req).then(function (res) {
          console.log(res)
          _this.arrList=res.data.jsonData;

        }).catch((err)=>console.log(err))
      },
      bindInfo(item){
        console.log(item);
        this.$store.state.courseName = item.courseName;
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
    }
  }
</script>