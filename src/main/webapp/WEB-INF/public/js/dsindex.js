$(function(){
  var url,role;
  var data = {
    'sum':null,
    'avg':null,
    'people':null,
    'times':1212
  };
  var spinner = $('.spinner')[0];
  $('.sub-item-wrap').on('click',function(event){
     reset();
     var target = this;
     //console.log(target);
     $(target).addClass('active');
     $(spinner).show();
     url = $(target).attr('data-url');
     role = $(target).attr('data-role');
     console.log(role+' '+url);
     data[role]||getData(url);
     //update(res);
  });
  function getData(url){
    $.ajax({
      url:url,
      success:function(res){
        console.log(res);
        update();
      }
    })
  }
  function update(){
     $(spinner).hide();
     draw();
  }
  function draw(){

  }
  function draw_people(){
      var top_left_chart = echarts.init($('#people_top_left').get(0));
      var option = {
          color: ["#cff7cd", "#6cf0da"],
          textStyle: {
              color: "#333"
          },
          legend: {
              right: 10,
              width: 500,
              itemWidth: 40,
              textStyle: {
                  color: "#d7d7d7"
              },
              data: ['预期人数', '实到人数']
          },
          xAxis: [{
              type: 'category',
              axisTick:{
                  show:true
              },
              axisLine:{
                show:true
              },
              data: ['2007', '2008', '2009', '2010', '2011','2012','2013','2014','2015']
          }],
          yAxis: [{
              type: 'value',
              name:"单位：人",
              axisTick:{
                  show:true
              },
              axisLine:{
                  show:true
              },
              splitLine:{
                  lineStyle:{
                      color:"#000"
                  }
              },
          }],
          tooltip: {
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          series: [{
              name: '预期人数',
              type: 'bar',
              itemStyle:{
                  normal:{
                      barBorderRadius:5
                  }
              },
              data: [120, 50, 60, 50, 15,50,30,50,20]
          }, {
              name: '实到人数',
              type: 'bar',
              itemStyle:{
                  normal:{
                      barBorderRadius:5
                  }
              },
              data: [66, 35, 58, 0,0,0,0,47,0]
          }, ]
      };
      top_left_chart.setOption(option);

  }
  draw_people();
  function reset(){
    $('.sub-item-wrap').removeClass('active');
    $('.chart_container').hide();
  }
})