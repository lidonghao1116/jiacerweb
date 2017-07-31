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
import {mapGetters} from 'vuex'

export default {
 computed:mapGetters([
     'footerShow',
     'changeHead'
 ]),
  mounted(){
   let path=this.$route.path.substring(1);
   this.footerChange(path);
  },
  watch:{
    $route(to){
      console.log(to.path);
      let path=this.$route.path.substring(1);
      this.footerChange(path);
      this.headCtn(path);
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
      if (path.indexOf('course')!=-1){
        this.$store.dispatch('changeHead')
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
