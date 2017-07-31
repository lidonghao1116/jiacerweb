import * as common from '../utils/common'

export function formateData(value) {
    value=common.isEmpty(value) ? null : value.indexOf('.') == -1 ? value.replace(/0/, "") + ".0" : value;
    return value;
}

/*
function isEmpty(param) {
  if ($.trim(param) != "" && $.trim(param) != null) {
    return false;
  } else {
    return true;
  }
};
*/
