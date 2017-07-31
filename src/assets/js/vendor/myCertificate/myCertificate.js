var wx_openid=localStorage.getItem('wx-openid');
$(function(){
  var params={};
  $.ajax({
      url: window.global_config.myCertificate,
      type: "get",
      data: params,
      dataType: "json",
      headers:{
        "wx_openid":wx_openid
        // "test-mobile":"15026856424"
      },
      success: function success(data) {
          if(data.success){
              if(data.jsonData==null || data.jsonData==''){
                $('.content').html(initNothing());
              }else{
                  $.each(data.jsonData,function(index,item){
                    var date=item.issuingDate.split(' ')[0];
                     // var str=date.replace(/[-][-]]/,"$1")
                    var  str=date.replace(/[-]/,'年');
                    var str2=str.replace(/[-]/,'月')+"日"
                    console.log(str2);
                    $(".content").append(
                      div("div","certificate").append(
                        div("h3","certificate_tt").append( "<i></i>"+item.certName),
                        div("table","result_t").append(
                          div("tbody","").append(
                            div("tr","").append(
                              div("td","grey").append("鉴定等级"),
                              div("td","").append("&nbsp;&nbsp;"+item.authenticateGrade),
                              div("td","grey").append("综合成绩"),
                              div("td","").append("&nbsp;&nbsp;"+item.comprehensiveScores)
                            ),
                            div("tr","").append(
                              div("td","grey").append("理论成绩"),
                              div("td","").append("&nbsp;&nbsp;"+item.theoryScores),
                              div("td","grey").append("能力成绩"),
                              div("td","").append("&nbsp;&nbsp;"+item.abilityScores)
                            ),
                            div("tr","").append(
                              div("td","grey").append("技能成绩"),
                              div("td","").append("&nbsp;&nbsp;"+item.poScores),
                              div("td","grey").append("评定结果"),
                              div("td","").append("&nbsp;&nbsp;"+item.examResult)
                            ),
                            div("tr","").append(
                              div("td","grey").append("发证日期"),
                              div("td","").append("&nbsp;&nbsp;"+str2).attr("colspan","3")
                            ),
                            div("tr","").append(
                              div("td","grey").append("证书编号"),
                              div("td","").append("&nbsp;&nbsp;"+item.certificateNo).attr("colspan","3")
                            ),
                            div("tr","").append(
                              div("td","grey").append("发证机构"),
                              div("td","").append("&nbsp;&nbsp;"+item.certAuthorityId).attr("colspan","3")
                            )
                          )
                        )
                      )
                    )
                  })

              }

          }else{
              $.toast(data.msg);
          }
      }
  });
});
 $.init();
