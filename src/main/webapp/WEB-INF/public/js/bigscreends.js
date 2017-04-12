$(function(){
	var index = 0;
	var rows = $('.carouse-table-1 .row');
	var windowsize = 6;
	function scroll(){
	 if(index==6){
	  for(var i=0;i<6;i++){
		$(rows[i]).css({'height':'45px','margin-top':'10px'});
	  }
	  index = 0;
	 }
	 $(rows[index]).animate({'height':0,'margin':0},500);
	 index++;
	}
	function reset(list,wsize,before){
	  for(var i=0;i<list.length&&i<wsize;i++){
	    $(list[i]).css(before);
	  }
	}
	function CarouseTable(list,wsize,before,after){
		   this.list = list;
		   this.wsize = wsize;
		   this.after = after;
		   this.before = before;
		   this.index = 0;
		   var self = this;
		   this.start = function(){
			   console.log('start...');
			   console.log(self);
			   self.timer = setInterval(self.scroll,1000);
		   }
		   this.scroll = function(){
			   if(self.index==self.wsize){
				 self.reset();
				 return;
				}
			   var item = self.list[self.index];
			   $(item).animate(self.after,500);
			   self.index++;
		   }
		   this.reset = function(){
			  var list = self.list;
			  var before = self.before;
			  for(var i=0;i<self.wsize;i++)
			  {
				$(list[i]).css(before);
			  }
			  self.index = 0;
		   }
		   this.stop = function(){
			 if(self.timer){
			   clearInterval(self.timer);
			   self.timer = null;
			 }
		   }
	}
	var t2 = new CarouseTable($('.carouse-table-2 .row'),12,{'height':'45px'},{'height':0});
	t2.start();

	var t3 = new CarouseTable($('.carouse-table-3 .row'),10,{'height':'45px'},{'height':0});
	t3.start();
	var timer = setInterval(scroll,1500);
	function init(){

	}
	function chart()
	{
	  var chart1 = echarts.init(document.getElementById('chart-1'));
	  var chart2 = echarts.init(document.getElementById('chart-2'));
	  var chart3 = echarts.init(document.getElementById('chart-3'));
	  var chart4 = echarts.init(document.getElementById('chart-4'));
	  var chart5 = echarts.init(document.getElementById('chart-5'));
	  var chart6 = echarts.init(document.getElementById('chart-6'));
	  var option = {
			title: {
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data:['最高','最低']
			},
			toolbox: {
				show: false
			},
			xAxis:  {
				type: 'category',
				boundaryGap: false,
				data: ['2005','2006','2007','2007','2008','2009','2010'],
				axisLine:{lineStyle:{color:'#fff'}}
			},
			yAxis: {
				type: 'value',
				axisLabel: {
					formatter: '{value} 万元'
				},
				axisLine:{lineStyle:{color:'#fff'}}
			},
			series: [
				{
					name:'购药总额',
					type:'line',
					data:[12, 110, 150, 130, 102, 113, 100],
					markPoint: {
						data: [
							{type: 'max', name: '最大值'},
							{type: 'min', name: '最小值'}
						]
					},
					markLine: {
						data: [
							{type: 'average', name: '平均值'}
						]
					}
				}
			]
		};

	   var option1 = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b}: {c} ({d}%)"
			},
			legend: {
				orient: 'horizontial',
				x: 'top',
				data:['处方药','非处方药','医疗器械','消毒用品','妆特字化装品','其他'],
				textStyle:{color:'#fff'}
			},
			series: [
				{
					name:'访问来源',
					type:'pie',
					radius: ['50%', '70%'],
					avoidLabelOverlap: false,
					label: {
						normal: {
							show: false,
							position: 'center'
						},
						emphasis: {
							show: true,
							textStyle: {
								fontSize: '30',
								fontWeight: 'bold'
							}
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data:[
						{value:335, name:'处方药'},
						{value:310, name:'非处方药'},
						{value:234, name:'医疗器械'},
						{value:135, name:'消毒用品'},
						{value:1548, name:'妆特字化装品'},
						{value:48, name:'其他'}
					]
				}
			]
		};
	  var option2 = {
	        tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b}",
				textStyle:{color:'#fff'}
			},
			legend: {
				orient: 'vertical',
				x: 'left',
				data:['购药次数>3人数','购药次数<=3人数'],
			    textStyle:{color:'#fff'}
			},
			series:[{
			   name:'人数分析',
			   type:'pie',
			   radius : '55%',
               center: ['50%', '50%'],
			   data:[{value:28888,name:'购药次数>3人数'},{value:40000,name:'购药次数<=3人数'}]
			   }
			]

	  }
	  var  option4 = {
			title: {
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			legend: {
				data: ['2011年'],
				textStyle:{color:'#fff'}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'value',
				boundaryGap: [0, 0.01],
				axisLine:{lineStyle:{color:'#fff'}}
			},
			yAxis: {
				type: 'category',
				data: ['处方药','非处方药','医疗器械','消毒用品','妆特字化装品','其他'],
				axisLine:{lineStyle:{color:'#fff'}}
			},
			series: [
				{
					name: '2011年',
					type: 'bar',
					data: [18203, 23489, 29034, 104970, 131744, 630230]
				}
			]
		};
	var xAxisData = ['处方药','非处方药','医疗器械','消毒用品','妆特字化装品','保健品','其他'];
    var data = [];
    for (var i = 9; i < 16; i++) {
        //xAxisData.push('5月' + i + '日');
        data.push(Math.round(Math.random() * 500) + 200);
    }
    var option4 = {
        title: {
        },
        tooltip:{
          trigger:'item'
        },
        grid:{
          width:430,
          height:220,
          left:80,
          top:20
        },
        yAxis: [{
            data: xAxisData,
            axisLabel: {
                textStyle: {
                    color: '#fff'
                }
            },
            splitLine: {
                show: false
            },
            axisLine:{
                show:false
            },
            axisTick:{
                show:false
            }
        }, {
            // 辅助 x 轴
            show: false,
            data: xAxisData
        }],
        xAxis: {
            max: 1000,
            axisLine: {
                show: false
            },
            show:false
        },
        series: [{
            // 辅助系列
            type: 'bar',
            silent: true,
            yAxisIndex: 1,
            itemStyle: {
                normal: {
                    barBorderRadius: 20,
                    borderColor:'#fff',
                    borderWidth:2,
                    color: '#0e2a42'
                }
            },
            barWidth: 20,
            data: data.map(function (val) {
                return 1000;
            })
        }, {
            type: 'bar',
            data: data,
            barWidth: 16,
            itemStyle: {
                normal: {
                    barBorderRadius: 20,
                    color: '#03a9f4',
                    shadowColor: 'rgba(0, 0, 0, 0.4)',
                    shadowBlur: 20
                }
            }
        }]
    };
       chart1.setOption(option);
	   chart2.setOption(option);
	   chart3.setOption(option);
	   chart4.setOption(option4);
	   chart6.setOption(option1);
	   chart5.setOption(option2);
	}
	chart();
	//加载数据并初始化图表
	function init(){
	 $.ajax({
	 url:'drugstore/people',
	 success:showPeople
	 });
	 $.ajax({
	 url:'drugstore/sum',
	 success:showSum
	 });
	 $.ajax({
	 url:'drugstore/avg',
	 success:showAvg
	 });
	 $.ajax({
	 url:'drugstore/times',
	 success:showTimes
	 });
	}
	//记录数据渲染完成的计数，当==4时则更新界面使加载动画消失
	var finished = 0;
	function showPeople(data){
	  console.log(data);
	  finished++;
	  update();
	}
	//更新与购药次数相关图表的初始化
	function showTimes(data){
	  console.log(data);
	   finished++;
	  update();
	}
	//更新与购药总额相关图表的初始化
	function showSum(data){
	  console.log(data);
	  finished++;
	  update();
	}
	//更新与购药平均金额图表的初始化
	function showAvg(data){
	  console.log(data);
	  finished++;
	  update();
	}
    //更新界面，如判断是否撤销动画
	function update(){
	  if(finished==4){
	   console.log('all finished');
	   }
	}
	init();
});