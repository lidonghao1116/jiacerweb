/**
 * 公用方法
 * Created by hzp on 2016/11/28.*/


var div = function (e, classN) {
 return $(document.createElement(e)).addClass(classN);
 };

 var prevLink = document.referrer;
 /**
 * 初始化分类
 */
/* var N = [
 "一", "二", "三", "四", "五", "六", "七", "八", "九", "十",
 "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
 "二十一", "二十二", "二十三", "二十四", "二十五", "二十六", "二十七", "二十八", "二十九",
 "三十一", "三十二", "三十三", "三十四", "三十五", "三十六", "三十七", "三十八", "三十九"
 ];
 var examAreaName = [
 '孕产妇护理', '婴儿生活护理与意外事故预防急救', '营养与防病', '小儿神经系统发育与体格锻炼'
 ]
 var M = [
 "A", "B", "C", "D", "E", "F", "G", "H", "I"
 ];

 //创建标题
 function createTitleName(titleName) {
 $(".title").html("").html(titleName)
 }

 /!*保存本地临时数据*!/
 function saveStorage(key, value) {
 sessionStorage.setItem(key, value);
 /!*临时保存*!/
 }

 /!*获取本地临时数据*!/
 function loadStorage(key) {
 var value = sessionStorage.getItem(key);
 return value;
 }

 /!*清除本地临时数据*!/
 function clearStorage() {
 sessionStorage.clear();
 sessionStorage.removeItem()
 }
 /!*移除指定缓存数据*!/
 function removeStorage(key) {
 sessionStorage.removeItem(key)
 }*/

//判断是否为空
export function isEmpty(param) {
  if ($.trim(param) != "" && $.trim(param) != null) {
    return false;
  } else {
    return true;
  }
};
//参数
var params={
  wxid:localStorage.getItem('wx-openid'),
  inid:localStorage.getItem('invite-code')
};

export {params};
//加载无数据
 export function initNothing(txt) {
 return div("div", "no_info").html(txt);
 }


/*export function getJsonData(req, nick) {
  this.req = req;
  this.nick = nick;
}

getJsonData.prototype = {
  constructor: getJsonData,
  fetch: function () {
    var nick = this.nick;
    var req = this.req;
    console.log(req);
    this.$http(req).then((res) => {
      console.log(res)
    }).catch((err) => console.log(err))
  },
}*/
