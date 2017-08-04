/**
 * Created by hasee on 2017/7/24.
 */
import {
  FOOTER_HIDE,
  FOOTER_SHOW
} from './types'

export default {
  /*footer*/
  [FOOTER_HIDE](state){
    state.footerShow = false;
  },
  [FOOTER_SHOW](state){
    state.footerShow = true;
  },
  headCtn(state, payload){
    state.headerTitle = payload.name;
    // console.log(state)
    // console.log(payload)
    if(payload.isShare==true){
      state.isShare=payload.isShare;
    }else {
      state.isShare=false;
    }
    if(payload.isBack==false){
      state.isBack=payload.isBack;
    }else {
      state.isBack=true;
    }
    if(payload.isLogo==true){
      state.isLogo=payload.isLogo;
    }else {
      state.isLogo=false;
    }
  },
  shareLayer(state){
    state.shareRedPacket=!state.shareRedPacket;
  },
  isLogin(state){
    state.isLogin=1;
  }
}