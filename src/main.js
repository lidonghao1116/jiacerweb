import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './route.config'
import store from './store/store'
// import 'babel-polyfill'
import '../statics/css/base.css'
import '../statics/css/reset.css'
import '../statics/js/base'
import '../statics/js/jq.extend'
// import './assets/js/utils/common'
import './assets/js/utils/map'
import './assets/js/utils/mapping'

Vue.prototype.$http=axios;
axios.defaults.withCredentials = true;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
