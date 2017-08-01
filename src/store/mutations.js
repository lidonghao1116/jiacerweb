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
    state.footerShow=false;
    console.log(state.footerShow)
  },
  [FOOTER_SHOW](state){
    state.footerShow=true;
    console.log(state.footerShow)
  },
  headCtn(state,payload){
    state.headerTitle=payload.name;
    console.log(payload.name);
  }
}