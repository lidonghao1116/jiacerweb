/**
 * Created by hasee on 2017/7/24.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Section/home/Home.vue'
import Mine from './components/Section/mine/mine.vue'
import Purchase from './components/Section/home/Purchase.vue'
import Recommend from './components/Section/home/Recommend.vue'
import Course from './components/Section/course/course.vue'
import myCertificate from './components/Section/mine/myCertificate.vue'
import myInfo from './components/Section/mine/myInfo.vue'
import studyList from './components/Section/mine/studyList.vue'
import trainRecord from './components/Section/mine/trainRecord.vue'
import completeInfo from './components/Section/mine/completeInfo.vue'
import Register from './components/Section/register/register.vue'
import Agreement from './components/Section/register/agreement.vue'

Vue.use(VueRouter)

const router = new VueRouter({
      mode: 'history',
      base: __dirname,
      // scrollBehavior:()=>({y:0}),
      routes: [
        {
          path: '/',
          redirect: '/home/recommend'
        },
        {
          path: '*',
          redirect: '/home/recommend'
        },
        {
          path: '/home', component: Home,
          children:[
            {
              path: 'purchase',
              component: Purchase,
            },
            {
              path: 'recommend',
              component: Recommend,
            },
          ]
        },
        {
          path: '/mine', component: Mine,
        },
        {
          path: '/myCertificate', component: myCertificate,
        },
        {
          path: '/myInfo', component: myInfo,
        },
        {
          path: '/studyList', component: studyList,
        },
        {
          path: '/trainRecord', component: trainRecord,
        },
        {
          path: '/register', component: Register,
        },
        {
          path: '/agreement', component: Agreement,
        },
        {
          path: '/course/courseId=:courseId', component: Course,
        },
      ]
    }
)

export default router