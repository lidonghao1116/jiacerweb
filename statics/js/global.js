/**
 * 公用方法
 * Created by hzp on 2016/11/28.
 */
var div = function (e, classN) {
  return $(document.createElement(e)).addClass(classN);
};

var prevLink = document.referrer;
/**
 * 初始化分类
 */
var N = [
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
// 获取url参数
function getUrlParamSp (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

/*保存本地临时数据*/
function saveStorage(key, value) {
  sessionStorage.setItem(key, value);
  /*临时保存*/
}

/*获取本地临时数据*/
function loadStorage(key) {
  var value = sessionStorage.getItem(key);
  return value;
}

/*清除本地临时数据*/
function clearStorage() {
  sessionStorage.clear();
  sessionStorage.removeItem()
}
/*移除指定缓存数据*/
function removeStorage(key) {
  sessionStorage.removeItem(key)
}

//判断是否为空
function isEmpty(param) {
  if ($.trim(param) != "" && $.trim(param) != null) {
    return false;
  } else {
    return true;
  }
};
//响应等待时间
function timedMsg(s,href) {
  setTimeout(()=>{window.location.href=href},s);
}
//加载无数据
// function initNothing() {
//   return div("div", "no_info").html('暂无数据，请报名课程或等待审核');
// }
//获取当前产品的封面
function getProductImg(id) {
  var result = "../img/muying.jpg";
  switch (id) {
    case 3:
      result = "../img/jzfw.png";
      break;
    case 4:
      result = "../img/ysb.png";
      break;
    case 5:
      result = "../img/myhly.jpg";
      break;
    case 6:
      result = "../img/jtyys.jpg";
      break;
    case 7:
      result = "../img/yyyc.png";
      break;
    case 8:
      result = "../img/yyy.png";
      break;
    case 9:
      result = "../img/yyy.png";
      break;
    case 10:
      result = "../img/szb.png";
      break;
    case 11:
      result = "../img/jpys.jpg";
      break;
    case 12:
      result = "../img/gjcrs.png";
      break;
    case 13:
      result = "../img/myhly.jpg";
      break;
    case 14:
      result = "../img/jpystc.png";
      break;
    default:
      result = "../img/muying.jpg";
  }
  return result;
}

function getCourseImg(id) {
  id = parseInt(id);
  var result = "../img/muying.jpg";
  switch (id) {
    case 1:
      result = "../img/myhly.jpg";
      break;
    case 2:
      result = "../img/jzfw.png";
      break;
    case 3:
      result = "../img/jtyys.jpg";
      break;
    case 4:
      result = "../img/yyyc.png";
      break;
    case 5:
      result = "../img/yyy.png";
      break;
    case 6:
      result = "../img/yyy.png";
      break;

    case 8:
      result = "../img/myhly.jpg";
      break;
    case 9:
      result = "../img/gjcrs.png";
      break;
    case 10:
      result = "../img/jpys.jpg";
      break;
    default:
      result = "../img/muying.jpg";
  }
  return result;
}

function getCourseBigImg(id) {
  id = parseInt(id);
  var result = "../img/ysb_b.png";
  switch (id) {
    case 1:
      result = "../img/myhly_b.png";
      break;
    case 2:
      result = "../img/jzfw_b.png";
      break;
    case 3:
      result = "../img/jtyys_b.png";
      break;
    case 4:
      result = "../img/yyy_b.png";
      break;
    case 5:
      result = "../img/yyy_b.png";
      break;
    case 6:
      result = "../img/yyy_b.png";
      break;

    case 8:
      result = "../img/myhly_b.png";
      break;
    case 9:
      result = "../img/gjcrs_b.png";
      break;
    case 10:
      result = "../img/jpys_b.png";
      break;
    default:
      result = "../img/ysb_b.png";
  }
  return result;
}

function getCourseDesc(id) {
  id = parseInt(id);
  var result = {};
  switch (id) {
    case 43:
      result = {
        c2:'膳食',
        c3:'日常',
        t2:'家常菜烹饪',
        t3:'家居保洁、家用电器使用'
      };
      break;
    case 41:
      result = {
        c2:'膳食',
        c3:'日常',
        t2:'健康膳食、科学喂养',
        t3:'新生儿护理、常见病预防'
      };
      break;
    case 42:
      result = {
        c2:'生活护理',
        c3:'智能训练',
        t2:'生活照料、生长监测',
        t3:'潜能开发、行为培养'
      };
      break;
    case 46:
      result = {
        c2:'生活护理',
        c3:'智能训练',
        t2:'辅食制作、应急处理',
        t3:'潜能开发、行为培养、学前教育'
      };
      break;
    default:
      result = "";
  }
  return result;
}

function getJsonData(req, nick) {
  this.req = req;
  this.nick = nick;
}

getJsonData.prototype = {
  constructor: getJsonData,
  // teacher:"mike",
  fetch: function () {
    var nick = this.nick;
    console.log(nick);
    var req = this.req;
    console.log(req);
    fetch(req).then((res) => {
      return res.json()
    })
        .then((data) => {
          if (data.success) {
            saveStorage('isLogin', 1);
            responseData(data.jsonData, req.url);
          } else if (data.code == 20004) {
            saveStorage('isLogin', 0);
            if (prevLink.indexOf('myInformation.html') != -1||prevLink.indexOf('mine.html')!=-1) {
              responseFailData();
            }
            else {
              $.toast(data.msg);
              window.location.href = "/pages/register.html";
            }
          } else {
            $.toast(data.msg);
          }
        }).catch((err) => console.log(err))
  },
}
/*
$(document).ready(function(){
  alert(1);
  var lastY;//最后一次y坐标点
  $(document.body).on('touchstart', function(event) {
    lastY = event.originalEvent.changedTouches[0].clientY;//点击屏幕时记录最后一次Y度坐标。
  });
  $(document.body).on('touchmove', function(event) {
    var y = event.originalEvent.changedTouches[0].clientY;
    var st = $(this).scrollTop(); //滚动条高度
    if (y >= lastY && st <= 10) {//如果滚动条高度小于0，可以理解为到顶了，且是下拉情况下，阻止touchmove事件。
      lastY = y;
      event.preventDefault();
    }
    lastY = y;

  });
});
*/
