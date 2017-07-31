var wx_openid=localStorage.getItem('wx-openid');
$(function(){
  var params={};
  $.ajax({
      url: window.global_config.enrolled,
      type: "post",
      data: params,
      dataType: "json",
      headers:{
        "wx_openid":wx_openid
        // "test-mobile":"15026856424"
      },
      success: function success(data) {
          if(data.success){
              if(data.jsonData==null || data.jsonData==''){
                $('.record_box').html(initNothing());
              }else{
                  $.each(data.jsonData,function(index,item){
                    var date=item.issuingDate.split(' ')[0];
                    var  str=date.replace(/[-]/,'年');
                    var str2=str.replace(/[-]/,'月')+"日"
                    $(".record_box").append(
                      div("div","record").append(
                        div("h3","certificate_tt").append("<i></i>"+item.courseName).append(
                          div("span","")
                        ).attr("id","certificate"+index),
                        div("h4","").append(item.packageName),
                        div("div","record_info").append(
                          div("p","").append("<span>报名时间</span>"+str2),
                          div("p","").append("<span>学习周期</span>"+item.learnCycle),
                          div("p","").append("<span>考核形式</span>"+item.examForm),
                          div("p","").append("<span>培训学校</span>"+item.school)
                        )
                      )
                    )
                    var signStatus = $("#certificate"+index).find("span");
                    if(item.signStatus=="02"){
                      signStatus.append("已报名").addClass("baoming");
                    }else if(item.signStatus=="04"){
                    signStatus.append("已退学").addClass("tuixue");
                    }
                  })
              }

          }else{
              $.toast(data.msg);
          }
      }
  });
});
 $.init();
