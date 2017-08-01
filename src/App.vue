<template>
  <div id="app">
    <HeaderView></HeaderView>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <FooterView v-show="footerShow"></FooterView>
  </div>
</template>

<script>
import HeaderView from './components/Head/HeaderView.vue'
import SectionView from './components/Section/home/Home.vue'
import FooterView from './components/Footer/FooterView.vue'
import {mapGetters,mapActions} from 'vuex'

export default {
 computed:mapGetters([
     'footerShow',
 ]),
  mounted(){
   let path=this.$route.path.substring(1);
   this.footerChange(path);
  },
  watch:{
    $route(to){
      let path=this.$route.path.substring(1);
      console.log(path)
      this.footerChange(path);
      this.headCtn(path)
    }
  },
  methods:{
    footerChange(path){
      if (path.indexOf('course')==-1){
        this.$store.dispatch('showFooter')
      }else{
        this.$store.dispatch('hideFooter')
      }
    },
    headCtn(path){
      if (path.indexOf('course') != -1) {
        this.$store.dispatch('headCtn', {name: "课程详情"})
      } else if (path.indexOf('mine') != -1) {
        this.$store.dispatch('headCtn', {name: '我的'})
      } else if (path.indexOf('home') != -1) {
        this.$store.dispatch('headCtn', {name: '在线学堂'})
      }else if (path.indexOf('studyList') != -1) {
        this.$store.dispatch('headCtn', {name: '家策商学院'})
      }else if (path.indexOf('trainRecord') != -1) {
        this.$store.dispatch('headCtn', {name: '培训记录'})
      }else if (path.indexOf('myCertificate') != -1) {
        this.$store.dispatch('headCtn', {name: '我的证书'})
      }
    }

  },
  components:{
    HeaderView,
    SectionView,
    FooterView
  }
}
</script>

<style>
  /*@import "./assets/less/schoolShare.less";*/
</style>
