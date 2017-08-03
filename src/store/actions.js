/**
 * Created by hasee on 2017/7/24.
 */
import * as types from './types'

export default {
  /*底部条*/
  hideFooter: ({commit}) => {
    commit(types.FOOTER_HIDE);
  },
  showFooter: ({commit}) => {
    commit(types.FOOTER_SHOW)
  },
//  修改头部内容
  headCtn: ({commit}, payload) => {
    // console.log(payload)
    commit('headCtn',payload)
  }
}