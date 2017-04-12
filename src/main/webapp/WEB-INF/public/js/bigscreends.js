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
	var t2 = new CarouseTable($('.carouse-table-2 .row'),6,{'height':'45px'},{'height':0});
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
	  var timeline = echarts.init(document.getElementById('timeline'));
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

	  var option6 = {
	        color: ['#ffdb6d', '#89c9e1', '#ce77b6', '#f29e29','#726dd1','#ffdec9','#04dd98'],
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b}: {c} ({d}%)"
			},
			legend: {
                align:'left',
				data:['处方药','非处方药','医疗器械','消毒用品','妆特字化装品','其他'],
				textStyle:{color:'#fff'}
			},
			series: [
				{
					name:'访问来源',
					type:'pie',
					radius: ['50%', '80%'],
					center:['50%','60%'],
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
	  var color = ['#a3159a','#8aabf2','#ff7438','#fc9c12','#c3e332','#50c5c3','#029ed9'];
	  var option2 = {
      		   color:color,
      		   title:{
      		     text:''
      		   },
      		   tooltip:{
      			   trigger: 'axis',
      			   axisPointer: { // 坐标轴指示器，坐标轴触发有效
      				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      			   }
                 },
      		   toolbox:{
      		   },
      		   grid:{
      		     top:70,
      		     left:60,
      		     right:10,
      		     bottom:20
      		   },
      		   legend:{
      		     data: ['处方药', '非处方药', '医疗器械', '保健品', '妆特字化妆品', '消毒用品','其他'],
      		     textStyle:{
      		      color:'#fff'
      		     }
      		   },
      		   xAxis:[{
      			type: 'category',
      			axisTick:{
      				show:false
      			 },
      			axisLine:{
      				lineStyle:{
      					color:"#fff"
      				}
      			},
      			data:[2004,2005,2006,2007,2008,2009]
      		   }],
      		   yAxis:[{
      		    type:'value',
      			name:'平均金额(元)',
      			axisTick:{
                  show:false
      			},
      			axisLine:{
      				lineStyle:{
      					color:"#fff"
      				}
      			},
      			splitLine:{
      				lineStyle:{
      					color:"#fff"
      				}
      			}
      		   }],
      		   series:[
      		     {
      			   name:'处方药',
                     type:'line',
                     itemStyle:{
      				  normal:{
      					  barBorderRadius:5
      				  }
                     },
                     data:[190,200,300,500,6000,7000]
      			 },
      			 {
      			   name:'非处方药',
                     type:'line',
                     itemStyle:{
      				  normal:{
      					  barBorderRadius:5
      				  }
                     },
                     data:[568,900,678,2899,3888,2344]
      			 },
      			 {
      			   name:'医疗器械',
                     type:'line',
                     itemStyle:{
      				  normal:{
      					  barBorderRadius:5
      				  }
                     },
                     data:[2333,3489,2389,3944,233,4566]
      			 },
      			 {
      			   name:'保健品',
                     type:'line',
                     itemStyle:{
      				  normal:{
      					  barBorderRadius:5
      				  }
                     },
                     data:[2333,456,7999,323,4567,2323]
      			 },
      			 {
      			   name:'妆特字化妆品',
                     type:'line',
                     itemStyle:{
      				  normal:{
      					  barBorderRadius:5
      				  }
                     },
                     data:[2123,3467,3432,4455,4560,7892]
      			 },
      		     {
      			   name:'消毒用品',
                     type:'line',
                     itemStyle:{
      				  normal:{
      					  barBorderRadius:5
      				  }
                     },
                     data:[1212,3348,3898,4788,2900,3900]
      			 },
      			 {
      			   name:'其他',
                     type:'line',
                     itemStyle:{
      				  normal:{
      					  barBorderRadius:5
      				  }
                     },
                     data:[2123,3930,4900,3290,3890,3340]
      			 }
      		   ]
      	};
	  var option4 = {
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
      var option5 = {
	    color:['#03a9f4','#44d3e4'],
	    legend: {
	        data: ['购药次数>3的人数','购药次数<=2的人数'],
	        textStyle:{
	         color:'#fff'
	        }
	    },
	    series : [
	        {
	            name: '购药次数人数比例',
	            type: 'pie',
	            radius : '80%',
	            center: ['50%', '60%'],
	            label:{
	              normal:{
	               show:false
	              }
	            },
	            data:[
	                {value:335, name:'购药次数>3的人数'},
	                {value:310, name:'购药次数<=2的人数'},
	            ]
	        }
	    ]
	};
    var option3 = {
        color:color,
		title: {
		},
		tooltip: {
			 trigger: 'axis',
			axisPointer: {
				lineStyle: {
					color: '#57617B'
				}
			}
		},
		legend: {
			icon: 'rect',
			itemWidth: 14,
			itemHeight: 5,
			itemGap: 13,
			right: '4%',
			textStyle: {
				fontSize: 12,
				color: '#fff'
			},
			data:['处方药','非处方药','医疗器械','保健品','“妆特字”化妆品','消毒用品','其他'],
			textStyle:{
			 color:'#fff'
			}
		},
		grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
        },
		toolbox: {
			show: false
		},
		xAxis:  {
        type: 'category',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        data: [2010,2011,2012,2013,2014,2015]
        },
		yAxis:
		 [{
			type: 'value',
			axisTick: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: '#fff'
				}
			},
			axisLabel: {
				margin: 10,
				textStyle: {
					fontSize: 14
				},
				formatter: '{value}人次'
			},
			splitLine: {
				lineStyle: {
					color: '#fff'
				}
			},
			min:'dataMin'
		}],
		series: [
			{
				name:'处方药',
				type:'line',
				smooth: true,
				symbol: 'circle',
				symbolSize: 5,
				showSymbol: false,
				lineStyle: {
					normal: {
						width: 2
					}
				},
				itemStyle: {
					normal: {
						color: 'rgb(137,189,27)',
						borderColor: 'rgba(137,189,2,0.27)',
						borderWidth: 12

					}
				},
				data:[1000,2000,3000,4000,5000],
			},
			{
				name:'非处方药',
				type: 'line',
				smooth: true,
				symbol: 'circle',
				symbolSize: 5,
				showSymbol: false,
				lineStyle: {
					normal: {
						width: 2
					}
				},
				itemStyle: {
					normal: {
						color: 'rgb(0,136,212)',
						borderColor: 'rgba(0,136,212,0.2)',
						borderWidth: 12

					}
				},
				data:[1200,3000,2300,4000,2700,3600]
			},
			{
				name:'医疗器械',
				type:'line',
				smooth: true,
				symbol: 'circle',
				symbolSize: 5,
				showSymbol: false,
				lineStyle: {
					normal: {
						width: 2
					}
				},
				itemStyle: {
					normal: {

						color: 'rgb(219,50,51)',
						borderColor: 'rgba(219,50,51,0.2)',
						borderWidth: 12
					}
				},
				data:[800,3200,4300,2600,1200,3000]
			},
			{
				name:'保健品',
				type:'line',
				 smooth: true,
				symbol: 'circle',
				symbolSize: 5,
				showSymbol: false,
				lineStyle: {
					normal: {
						width: 2
					}
				},
				itemStyle: {
					normal: {
						borderWidth: 12
					}
				},
				data:[1500,2300,1700,4800,5400,3500]
			},
			{
				name:'“妆特字”化妆品',
				type:'line',
				 smooth: true,
				symbol: 'circle',
				symbolSize: 5,
				showSymbol: false,
				lineStyle: {
					normal: {
						width: 2
					}
				},
				itemStyle: {
					normal: {
						borderWidth: 12
					}
				},
				data:[3000,2400,3500,1900,3400,2800]
			},
			{
				name:'消毒用品',
				type:'line',
				 smooth: true,
				symbol: 'circle',
				symbolSize: 5,
				showSymbol: false,
				lineStyle: {
					normal: {
						width: 2
					}
				},
				itemStyle: {
					normal: {
						borderWidth: 12
					}
				},
				data:[2700,4300,2800,1800,3400,1600]
			},
			{
				name:'其他',
				type:'line',
				 smooth: true,
				symbol: 'circle',
				symbolSize: 5,
				showSymbol: false,
				lineStyle: {
					normal: {
						width:2
					}
				},
				itemStyle: {
					normal: {
						borderWidth: 12
					}
				},
				data:[3000,2000,2600,3700,4300,1800]
			}
		]
      }
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
    var option1 = {

        grid:{
            left:10,
            top:40,
            bottom:0,
            right:40,
            containLabel:true
        },
        tooltip:{
            show:true,
            backgroundColor:'#384157',
            borderColor:'#384157',
            borderWidth:1,
            formatter:'{b}:{c}',
            extraCssText:'box-shadow: 0 0 5px rgba(0, 0, 0, 1)'
        },
        legend:{
            right:20,
            top:0,
            data:['金额(元)'],
             textStyle:{
                color :'#fff'
            }
        },
        xAxis: {
            data: [2010,2011,2012,2013,2014,2015,2016],
            boundaryGap:false,
            axisLine:{
                show:false
            },
             axisLabel: {
                textStyle: {
                    color: '#fff'
                }
            },
            axisTick:{
                show:false
            }
        },
        yAxis: {
            ayisLine:{
                show:false
            },
             axisLabel: {
                textStyle: {
                    color: '#fff'
                }
            },
            splitLine:{
                show:true,
                lineStyle:{
                    color:'#fff'
                }
            },
            axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
        },

        series: [
            {
                type: 'bar',
                name:'linedemo',


                tooltip:{
                    show:false
                },
                animation:false,
                barWidth:1.4,
                hoverAnimation:false,
                data:[1000,1200,2000,3000,800,2000,300,8000],
                itemStyle:{
                    normal:{
                        color:'#f17a52',
                        opacity:0.6,
                        label:{
                            show:false
                        }
                    }
                }
            },
            {
                type: 'line',
                name:'金额(元)',
                smooth:true,
                symbolSize:10,
                animation:false,
                lineWidth:1.2,
                hoverAnimation:false,
                data:[1000,1200,2000,3000,800,2000,300,8000],
                symbol:'circle',
                itemStyle:{
                    normal:{
                        color:'#f17a52',
                        shadowBlur: 40,
                        label:{
                            show:true,
                            position:'top',
                            textStyle:{
                                color:'#f17a52',

                            }
                        }
                    }
                },
               areaStyle:{
                    normal:{
                        color:'#f17a52',
                        opacity:0.08
                    }
                }

            }
        ]
    };
    var timelineoption =  {
       timeline:{
         show:true,
         data:[2010,2011,2012,2013,2014],
         left:20,
         right:20,
         autoPlay:true,
         checkpointStyle:{
           color:'#0f7fec',
           borderWidth:2,
           borderColor:'#03a9f8'
         },
         label : {
           formatter : function(s) {
              return s;
           },
           normal:{
             textStyle:{
              color:'#fff'
             }
           }
         }
       }
    }
       chart1.setOption(option1);
	   chart2.setOption(option2);
	   chart3.setOption(option3);
	   chart4.setOption(option4);
	   chart6.setOption(option6);
	   chart5.setOption(option5);
	   timeline.setOption(timelineoption);
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