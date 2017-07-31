/**
 * Created by hzp on 2016/12/1.
 */

var wx_openid = localStorage.getItem('wx-openid');
var invite_code = localStorage.getItem('invite-code');

//初始化课程详细操作页面
function initCourseCtrl(courseId) {
  $.ajax({
    url: window.global_config.courseInfo + "?courseId=" + courseId,
    type: "get",
    headers: {
      'wx-openid': wx_openid,
      'invite-code': invite_code
    },
    async: false,
    dataType: "json",
    success: function success(data) {
      if (data.success) {
        if (data.jsonData == null || data.jsonData == '') {
          return;
        } else {
          $(".title").html(data.jsonData.courseName);
          $(".info").html("").append(
              div("div", "cover").append(
                  div("img").attr("src", getCourseBigImg(courseId)).attr("width", "100%")
                      .attr("height", "auto")
              )
          );
          if (data.jsonData.options != null && data.jsonData.options.length > 0) {
            $(".info").append(
                div('div', 'videobigbox').append(
                ),
                div("div", "buttons-tab courses").append()
            );
            initCourseDetails(data.jsonData);
          } else {
            $(".cover").append(
                div('div', '').html('<div class="center" style="font-size:16px">敬请期待！</div>')
            );
          }
        }
      }
      else {
        $.toast(data.msg);
      }
    }
  });
}

$(".courseImg img").load(function () {
  var imgW = $(".cover img").height();
  $(".videobigbox").css("height", imgW + 'px');
  $(".courses").css("top", imgW + 44 + 'px');
  $(".content").css("top", imgW + 88 + 'px');
  setVideoListHeight();
});

function initCourseDetails(data) {
  /*$(".info").append(
   div("div", "content-block").html("").append(
   div("div", "list-block content native-scroll")
   )
   );
   $.each(data.options, function (index, item) {
   $(".courses").append(
   div("a", "tab-link button").attr("code", item.code).html(item.name)
   )
   });*/

  // initSP(data.courseId);

  /*$(".courses a").on("click", function () {
   if ($(this).attr("code") == "SP") {
   initSP(data.courseId);
   } else if ($(this).attr("code") == "DT") {
   initDT(data.courseId)
   }
   })*/
}

//初始化视频类别信息
function initSP(courseId, isOwn) {
  var req = new Request(window.global_config.courseInfo + "?courseId=" + courseId, {
    method: 'GET',
    headers: { // headers: fetch事实标准中可以通过Header相关api进行设置
      'wx-openid': wx_openid,
      'invite-code': invite_code,
      // 'test-mobile': '15026856424'//
    }
  })
  fetch(req).then((res) => {
    return res.json()
  })
      .then((data) => {
        if (data.success) {
          if (data.jsonData == null || data.jsonData == '') {
            return;
          } else {
            initSPPage(data.jsonData, isOwn);
          }
        } else {
          console.log('err')
        }
      }).catch((err) => console.log(err))
}

//初始化答题信息
/*function initDT(courseId) {
  var req = new Request(window.global_config.test + "?courseId=" + courseId, {
    method: 'GET',
    headers: { // headers: fetch事实标准中可以通过Header相关api进行设置
      'wx-openid': wx_openid,
      'invite-code': invite_code
    }
  })
  fetch(req).then((res) => {
    return res.json()
  })
      .then((data) => {
        if (data.success) {
          if (data.jsonData == null || data.jsonData == '') {
            return;
          } else {
            initDTPage(data.jsonData);
          }
        } else {
          console.log('err')
        }
      }).catch((err) => console.log(err))
  $(".videobigbox").hide();
}*/

//初始化答题页面内容
function initDTPage(courseId) {
  $(".content").html("").append(
      div("div", "card").append(
          div("div", "card-content").append(
              div("div", "list-block media-list").append(
                  div("ul", "").append(
                      div("li", "item-content").append(
                          div("div", "item-media").append(
                              div("img", "list-cover").attr("src", getCourseImg(courseId))
                          ),
                          div("div", "item-inner").attr("style", "padding-top: 1.5rem").append(
                              div("div", "item-title-row").attr("style", "float: right;").append(
                                  div("a", "button").attr("href", "/pages/questions.html?courseId=" + courseId + "").text("开始答题")
                              )
                          )
                      )
                  )
              )
          )
      )
  )
}

//初始化视频页面内容
function initSPPage(data, isOwn) {
  $(".videobigbox").hide();
  var i = 0;
  $.each(data, function (index, item) {
    var i = item.chapterNo;
    var $ul = $(".spli" + i)
    switch (i) {
      case 1:
        insertList(i, index, item, isOwn);
        break;
      case 2:
        insertList(i, index, item, isOwn);
        break;
      case 3:
        insertList(i, index, item, isOwn);
        break;
      default:
        break;
    }
  })
}

function insertList(i, index, item, isOwn) {
  var html = '';
  if (isOwn == 0) {
    if (item.isGuestWatch == 1) {
      html += `
          <li data-videourl="${item.videoUrl}" data-id="${item.id}">
            <p>${item.videoDesc}</p>
            <a class="shikan" href="#">试看</a>
      </li>
 `
    } else if (item.isGuestWatch == 0) {
      html += `
   <li data-id="${item.id}" onclick="toast()">
      <p>${item.videoDesc}</p>
      <a class="play" href="#"></a>
   </li>
 `
    }
  } else if (isOwn == 1) {
    html += `
          <li data-videourl="${item.videoUrl}" data-id="${item.id}">${item.videoDesc}
          <a class="noplay" href="#"></a>
      </li>
      `
  }
  $(".spli" + i).append(html);
}
//提示框
function toast() {
  $.toast('本视频需购买后才能正常观看')
}
function setVideoListHeight(vh) {
  var headH = $('header').height();
  var imgH = $('.courseImg').height();
  var tabH = $('.cd-tab').height();
  // if (isEmpty(vh)) {
  $('.courseContent').css("top", headH + imgH + tabH + 'px');
  // } else {
  //   $('.courseContent').css("top", headH + vh + tabH + 'px');
  // }
}

function initPlay(self) {
  var id=self.data('id');
  var player = new qcVideo.Player("courseVideo", {
    "file_id": id,
    "app_id": "1254037450",
//     'definition':220,
    "width":375,
    "height":130
  });
     /* function getParams(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
          return decodeURIComponent(r[2]);
        }
        return null;
      }

    var rtmp = getParams('rtmp'),
        flv  = getParams('flv'),
        m3u8 = getParams('m3u8'),
        mp4  = getParams('mp4'),
        live = (getParams('live') == 'true' ? true : false),
        coverpic = getParams('coverpic'),
        width = getParams('width'),
        height = getParams('height'),
        autoplay = (getParams('autoplay') == 'true' ? true : false);
    /!**
     * 视频类型播放优先级
     * mobile ：m3u8>mp4
     * PC ：RTMP>flv>m3u8>mp4
     *!/
    var options = {
      rtmp: rtmp,
      flv: flv  ,
      flv_hd: flv ,
      flv_sd: flv ,
      // mp4 : mp4 || 'http://1251132611.vod2.myqcloud.com/4126dd3evodtransgzp1251132611/8a592f8b9031868222950257296/f0.f40.mp4',
      m3u8: m3u8 || 'http://1254037450.vod2.myqcloud.com/25c320c6vodtransgzp1254037450/869eb5679031868223050994733/SLxNd0EmxB8A.f220.m3u8',
      coverpic: coverpic ,
      autoplay: autoplay ? true : false,
      live: live,
      width : width || '375',
      height : height || '130'
    };
    var player = new TcPlayer('courseVideo', options);
    window.tcplayer  = player;*/
}



//购买课程
function prepay(params) {
  console.log(params.courseId, params.inviteC)
  if (params.inviteC == "") {
    $.toast('邀请码不存在')
  }
  $.ajax({
    url: window.global_config.prepay,
    type: "post",
    data: {courseId: params.courseId, inviterCode: params.inviteC},
    dataType: "json",
    headers: {
      'wx-openid': wx_openid,
      'invite-code': invite_code,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    success: function success(data) {
      if (data.success) {
        $.toast(data.msg);
        weChatPay(data, params.isOwn)
      } else if (data.code == 20004) {
        $.toast(data.msg);
        window.location.href = "/pages/register.html";
      } else {
        $.toast(data.msg);
      }
    }
  });
}
function weChatPay(response, isOwn) {
  WeixinJSBridge.invoke('getBrandWCPayRequest', {
    "appId": response.jsonData.appId, //公众号名称，由商户传入
    "timeStamp": response.jsonData.timeStamp, //时间戳，自1970 年以来的秒数
    "nonceStr": response.jsonData.nonceStr, //随机串
    "package": response.jsonData.package,
    "signType": response.jsonData.signType, //微信签名方式:
    "paySign": response.jsonData.paySign //微信签名
  }, function (res) {
    if (res.err_msg == "get_brand_wcpay_request:ok") {
      isOwn = 1;
      // redEnvelope(inviteC)
      $('.mask,.popup,.courseFoot').hide()
    }
  });
}

function initScore(courseId, isOwn) {
  if (isOwn == 0) {
    $('#learningRecords').html(initNothing());
    return;
  }
  var req = new Request(window.global_config.getAllScore + "?courseId=" + courseId, {
    method: 'GET',
    headers: { // headers: fetch事实标准中可以通过Header相关api进行设置
      'wx-openid': wx_openid,
      'invite-code': invite_code,
      // 'test-mobile': '15026856424'//
    }
  })
  fetch(req).then((res) => {
    return res.json()
  }).then((data) => {
    if (data.success) {
      initScorePage(data);
    }
    else {
      $.toast(data.msg);
    }
  }).catch((err) => {
    console.log(err)
  });
}

function initScorePage(data) {
  if (data.jsonData == null || data.jsonData == '') {
    $('#learningRecords ul').append(initNothing());
  } else {
    var html = '';
    $.each(data.jsonData, function (index, item) {
      // var date=new Date;
      // var s=item.startTime.getSeconds();
      // console.log(s);
      console.log(item.startTime);
      var s = item.startTime.split(' ');
      console.log(s);
      html += `
        <li>
            <span class="date">${s[0]}<span>&nbsp;${s[1]}</span></span>
            <span class="score">${item.score}分</span>
            <span class="time">${item.useTime}</span>
        </li>

`
    })
    $('#learningRecords ul').append(html)
  }
}

function initCourseType(ct) {
  switch (ct) {
    case '01':
      $('.cd-tab a:eq(1),.cd-tab a:eq(2)').hide();
      $('#examination,#learningRecords').hide();
      break;
    case '02':
      $('.cd-tab a:eq(0),#videoList').hide();
      $('#examination').show();
      $('.cd-tab a:eq(1)').addClass('cdt_on');
      break;
    case '03':
      break;
    default:
      break;
  }
}
function initExam(courseId) {
  var req = new Request(window.global_config.examInfo + "?courseId=" + courseId, {
    method: 'GET',
    headers: { // headers: fetch事实标准中可以通过Header相关api进行设置
      'wx-openid': wx_openid,
      'invite-code': invite_code,
      // 'test-mobile': '15026856424'//
    }
  })
  fetch(req).then((res) => {
    return res.json()
  }).then((data) => {
    if (data.success) {
      initExamPage(data.jsonData);
    }
    else {
      $.toast(data.msg);
    }
  }).catch((err) => {
    console.log(err)
  });
}
function initExamPage(item) {
  console.log(item);
  var str1 = isEmpty(item.judgeScore) ? null : item.judgeScore.indexOf('.') == -1 ? item.judgeScore.replace(/0/, "") + ".0" : item.judgeScore;
  var str2 = isEmpty(item.singleScore) ? null : item.singleScore.indexOf('.') == -1 ? item.singleScore.replace(/0/, "") + ".0" : item.singleScore;
  var str3 = isEmpty(item.multiScore) ? null : item.multiScore.indexOf('.') == -1 ? item.multiScore.replace(/0/, "") + ".0" : item.multiScore;
  console.log(str1, str2, str3);
  var html = `
    <h1>答题时间：${item.courseTime}分钟</h1>
                <p class="judgeScore">判断题：${str1}分/题，${item.judgeCount}题</p>
                <p class="singleScore">单选题：${str2}分/题，${item.singleCount}题</p>
                <p class="multiScore">多选题：${str3}分/题，${item.multiCount}题</p>

`
  $('#examination .examInfo').html(html)
  for (var i in item) {
    if (item[i] == null) {
      $('.' + i).hide();
    }

  }
}
function initBottom(params) {
  if (params.isOwn == 0) {
    var html = `
  <div class="courseFoot">
    <div class="cf-btn clearfix">
        <a class="cfb-left">分享好友赢红包</a>
        <a class="cfb-right" id="buy">购买：￥<span id="price">${params.price}</span>/永久</a>
    </div>
</div>
`
    $('body').append(html);
  } else if (params.isOwn == 1) {
    $('.courseFoot').remove();
  }
}
$(function () {
  // $.ajax({
  //   url: window.global_config.wechat,
  //   type: "get",
  //   headers: {
  //     'wx-openid': wx_openid
  //   },
  //   dataType: "json",
  //   success: function success(data) {
  //     if (data.success) {
  //       //$("#wechatID").val(data.jsonData.nick);
  //       $("#wechatID").val("小聪明");
  //     }
  //     else {
  //       $.toast(data.msg);
  //     }
  //   }
  // })
  $("#wechatID").val("小聪明");
  var params = {}
  var str = '';
  str = sessionStorage.obj;
  params = JSON.parse(str);
  var courseId = params.courseId;
  var isOwn = params.isOwn;
  var price = params.price;
  var courseType = params.courseType;


  $('.startAnswer a').click(function () {
    if (isOwn == 1) {
      window.location.href = '/pages/questions.html?courseId=' + courseId
    }
    else {
      $.toast('本模拟题需购买后才能答题');
      $('#learningRecords').hide();
    }
  })

  menu.initJsonData(params);
  //初始化底部
  initBottom(params)
  initCourseType(courseType);
  // initCourseCtrl(courseId);
  initSP(courseId, isOwn);
  //初始化答题
  // initDT(courseId, isOwn)
  //初始化学习记录
  initScore(courseId, isOwn);
  //初始化答题卡
  initExam(courseId);

  $('body #buy').on('touchend', (e) => {
    e.preventDefault();
    $('.mask,.popup').show()
    $('#invitationCode').val(invite_code);
  });
  $('#confirm').on('click', function (e) {
    e.preventDefault();
    params.inviteC = $('#invitationCode').val();
    // console.log();
    prepay(params);
  })
  $('#cancel').on('touchend', (e) => {
    e.preventDefault();
    $('.mask,.popup').hide();
  });

  $(".cd-tab").on("click", "a", function () {
    $(".cd-tab a").removeClass("cdt_on");
    $(".courseContent").hide();
    $(this).addClass("cdt_on");
    var i = $(this).index();
    switch (i) {
      case 0:
        $("#videoList").show();
        break;
      case 1:
        $("#examination").show();
        break;
      case 2:
        $("#learningRecords").show();
        break;
      default:
        break;
    }
  })

//			    播放视频
  $(".courseContent").on("click", ".vl-subdivision li", function () {
    // var vUrl = $(this).data("videourl");
    // if (vUrl) {
    if (isEmpty(wx_openid)){
      $.toast('请在微信中观看')
      return;
    }
    $(".courseImg").hide();
    $(".courseVideo").show();
    play={};
    initPlay($(this));
    // $(".courseVideo").html("<video controls='controls' src='" + vUrl + "' poster='img/cover_photo.png'></video>")
    // var video = $('#trump_main_unique_1');
    var vh = 375//$('#trump_main_unique_1').height();
    console.log(vh);
    // console.log(video);
    setVideoListHeight(vh);
    // }
  })
//			    红包分享
  $(".shareRedPacket,.courseFoot .cfb-left").click(function () {
    $(".shareRedPacket-pop").show();
  })
  $(".shareRedPacket-pop").click(function () {
    $(this).hide();
  })
  //开始答题跳转链接

  setVideoListHeight();

  var imgurl ="http://" +window.location.host+"/img/courses/jzfw.png";
  var courseName = $("#courseName").text();
  var courseSummary = $("#courseSummary").val();
  var wechatID = $("#wechatID").val();
  shareWechat.init_share_params={'onMenuShareTimeline.title':'好友'+wechatID+'邀请你开通'+courseName+'在线学习课程','onMenuShareTimeline.imgUrl':imgurl,'onMenuShareAppMessage.title':'好友'+wechatID+'邀请你开通'+courseName+'在线学习课程','onMenuShareAppMessage.imgUrl':imgurl,'onMenuShareAppMessage.desc':courseSummary};
  shareWechat.sharePage();
});

// $.init();
var menu = {
  initJsonData: function (params) {
    $('#courseName').html(params.courseName);
    $('#courseSummary').val(params.summary);
  }
}
