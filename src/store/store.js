/**
 * Created by hasee on 2017/7/24.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import state from './state'
import getters from './getters'
Vue.use(Vuex);


export default new Vuex.Store({
  mutations,
  state,
  actions,
  getters
});