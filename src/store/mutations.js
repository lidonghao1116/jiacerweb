/**
 * Created by hasee on 2017/7/24.
 */
import {
  FOOTER_HIDE,
  FOOTER_SHOW
} from './types'

const state={
  footerShow:true,
  courseName:"在线学堂"
};

const mutations={
  /*footer*/
  [FOOTER_HIDE](state){
    state.footerShow=false;
    console.log(state.footerShow)
  },
  [FOOTER_SHOW](state){
    state.footerShow=true;
    console.log(state.footerShow)
  },
  changeHead(state){
    alert(state.courseName);
  }
}

const getters={
  footerShow(state){
    return state.footerShow;
  }
}

export default {
  state,
  mutations,
  getters
}