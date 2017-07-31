/**
 * Created by hasee on 2017/7/19.
 */
var params = {
  wx_openid: localStorage.getItem('wx-openid'),
  invite_code: localStorage.getItem('invite-code'),
  isLogin:loadStorage('isLogin'),
  prevLink:document.referrer
}

var obj = {
  init: function () {
    obj.initMyInfo();
    console.log(params.prevLink);
    $('body').on('click', '.revise', () => {
      console.log(params.isLogin);
      if ($.trim(params.isLogin)==1){
      obj.mnickName = $('[name="nickName"]').val();
      obj.update()
      }
      else if ($.trim(params.isLogin)==0){
        window.location.href='/pages/register.html'
      }
    })
    $('#confirm').click(() => {
      obj.username = $('[name="username"]').val();
      obj.certNo = $('[name="certNo"]').val();
      obj.education=$('#degree input').val();
      if (obj.isCertNo(obj.certNo)&&!isEmpty(obj.username)&&!isEmpty(obj.username)) {
        obj.update();
        window.location.href = params.prevLink;
      }else {
        $.toast('输入信息不完整');
      }
    })
    $('#degree').click(function (e) {
      e.stopPropagation();
      $('.layer').show();
    })
    $('.education').on('click','div',function () {
      obj.education=$(this).data('id');
      $('.layer').hide();
      $('#degree input').val($(this).text());
    })
    $(document).click(function(e){
      var _con = $('.popup');
      // 设置目标区域
      if (_con.css('display')!="none"){
        console.log(_con.css("display"));
        if(!_con.is(e.target) && _con.has(e.target).length === 0){
          $('.layer').hide();
        }
      }
    });
  },
  myInfo: {
    nickName:null,
    mnickName: null,
    avator: null,
    username: null,
    certNo: null,
    inviteCode: null,
    mobile: null,
    degree:null
  },
  initMyInfo: function () {
    var req = new Request(window.global_config.userInfo, {
      method: 'GET',
      headers: { // headers: fetch事实标准中可以通过Header相关api进行设置
        'wx-openid': params.wx_openid,
        'invite-code': params.invite_code,
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'test-mobile': '15026856424'//
      }
    })
    var json = new getJsonData(req);
    json.fetch();
  },
  getInfo: function (data) {
    saveStorage('isLogin',1);
    params.isLogin=1;
    $('.info_right img').attr('src', data.headImg);
    $('.nickName').html(data.nickname);
    $('[name="nickName"]').val(data.nickname);
    $('#username').html(data.username);
    $('#certNo').html(data.certNo)
    $('#inviteCode').html(data.inviteCode)
    $('#register').remove();
    $('#mobile').html(data.mobile)
    if (data.inviteCode == null) {
      $('#inviteCode').html('（注册后才有邀请码）');
    }
    if (isEmpty(data.username)|| isEmpty(data.certNo)) {
      $('#username').after('<a href="/pages/infoComplete.html">完善个人信息</a>');
    }
    obj.nickName = data.nickname;
    obj.avator = data.headImg;
    obj.mnickName = data.nickname;
    obj.username = data.username;
    obj.certNo = data.certNo;
    obj.inviteCode = data.inviteCode;
    obj.mobile = data.mobile;
    obj.certNo="";
    obj.username="";
    obj.education="";
  },
  update: function (data) {
    var req = new Request(window.global_config.update, {
      method: 'post',
      headers: { // headers: fetch事实标准中可以通过Header相关api进行设置
        'wx-openid': params.wx_openid,//params.wx_openid,
        'invite-code': params.invite_code,
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'test-mobile': '15026856424'//
      },
      body: `username=${obj.username}&nickname=${obj.mnickName}&certNo=${obj.certNo}&education=${obj.education}`,
    })
    var json = new getJsonData(req,data);
    json.fetch();
  },
  updateInfo: function (data) {
    $.toast('保存成功');
  },
  isCertNo: function (card) {
    console.log(card);
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(card) === false) {
      $.toast("身份证输入不合法");
      return false;
    } else {
      return true;
    }
  },
}

function responseData(data, url) {
  switch (url) {
    case window.global_config.userInfo:
      obj.getInfo(data);
      break;
    case window.global_config.update:
      obj.updateInfo(data);
    default:
      break;
  }
}
function responseFailData() {
  obj.avator=loadStorage('avator')
  obj.nickName=loadStorage('nick')
  $('[name="nickName"]').val(obj.nickName);
  $('.nickName').html(obj.nickName);
  $('.info_right img').attr('src',obj.avator);
  saveStorage('isLogin',0)
}
$(function () {
  obj.init(params);
})