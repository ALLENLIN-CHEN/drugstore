$(function(){
	var index = 0;
	var color = ['#a3159a','#8aabf2','#ff7438','#fc9c12','#c3e332','#50c5c3','#029ed9'];
	var rows = $('.carouse-table-1 .row');
	function CarouseTable(list,wsize,before,after){
		   this.list = list;
		   this.wsize = wsize;
		   this.after = after;
		   this.before = before;
		   this.index = 0;
		   var self = this;
		   this.start = function(){
			   //console.log('start...');
			   //console.log(self);
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
	var labels = ['处方药','非处方药','医疗器械','保健品','妆特字化装品','消毒用品','其他'];
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
	//所有的数据对象
	var totaldata = {
	 'people':null,
	 'avg':null,
	 'sum':null,
	 'times':null
	}
	var years = [];
	//记录数据渲染完成的计数，当==4时则更新界面使加载动画消失
	var finished = 0;
	function showPeople(data){
	  var people = data;
	  totaldata.people = data;
      //填充滚动列表
      //对数据排序
	  people.map(function(a,b){
	     return (b.rare+b.freq)-(a.rare+a.freq);
	  });
      var table3 = '<div class="line header"><div class="index-list"></div><div class="column year">年份</div><div class="column gt">购药次数>3人数</div><div class="column lteq">购药次数<=3人数</div></div>';
      for(var i=0;i<Math.max(people.length,12);i++){
         var index = i%people.length;
         table3 += ' <div class="line row"><div class="column index"><div class="index-bg">'+(index+1)+'</div></div><div class="column cell-content">'+people[index].year+'</div><div class="column cell-content">'+people[index].freq+'</div><div class="column cell-content">'+people[index].rare+'</div></div>';
      }
      $('.carouse-table-3').html(table3);
      //填充完毕使其滚动
      var t3 = new CarouseTable($('.carouse-table-3 .row'),6,{'height':'45px'},{'height':0});
      t3.start();
	  finished++;
	  update();
	}
	//更新与购药次数相关图表的初始化
	function showTimes(data){
	  totaldata.times = data;
	  var list1 = [];
	  var list2 = [];
	  var list3 = [];
	  var list4 = [];
	  var list5 = [];
	  var list6 = [];
	  var list7 = [];
	  //准备数据
	  for(year in data){
	    years.push(year);
	    list1.push(data[year]['item1']);
	    list2.push(data[year]['item2']);
	    list3.push(data[year]['item3']);
	    list4.push(data[year]['item4']);
	    list5.push(data[year]['item5']);
	    list6.push(data[year]['item6']);
	    list7.push(data[year]['item7']);
	  }
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
              data: years
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
      				showSymbol: true,
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
      				data:list1,
      			},
      			{
      				name:'非处方药',
      				type: 'line',
      				smooth: true,
      				symbol: 'circle',
      				symbolSize: 5,
      				showSymbol: true,
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
      				data:list2
      			},
      			{
      				name:'医疗器械',
      				type:'line',
      				smooth: true,
      				symbol: 'circle',
      				symbolSize: 5,
      				showSymbol: true,
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
      				data:list3
      			},
      			{
      				name:'保健品',
      				type:'line',
      				 smooth: true,
      				symbol: 'circle',
      				symbolSize: 5,
      				showSymbol: true,
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
      				data:list4
      			},
      			{
      				name:'“妆特字”化妆品',
      				type:'line',
      				 smooth: true,
      				symbol: 'circle',
      				symbolSize: 5,
      				showSymbol: true,
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
      				data:list5
      			},
      			{
      				name:'消毒用品',
      				type:'line',
      				 smooth: true,
      				symbol: 'circle',
      				symbolSize: 5,
      				showSymbol: true,
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
      				data:list6
      			},
      			{
      				name:'其他',
      				type:'line',
      				 smooth: true,
      				symbol: 'circle',
      				symbolSize: 5,
      				showSymbol: true,
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
      				data:list7
      			}
      		]
            }
	  var chart3 = echarts.init(document.getElementById('chart-3'));
	  chart3.setOption(option3);
	  finished++;
	  update();
	}
	//更新与购药总额相关图表的初始化
	function showSum(data){
	  var sums = data.consum;
	  totaldata.sum = sums;
	  var years = [];
	  var sumlist = [];
	  //组织折线图数据
	  sums.map(function(value){
	     years.push(value.year);
	     sumlist.push(value.sum);
	  });
      var chart1 = echarts.init(document.getElementById('chart-1'));
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
                  data: years,
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
                  min:'dataMin',
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
                      data:sumlist,
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
                      data:sumlist,
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
      //画折线图
      chart1.setOption(option1);
      //填充滚动列表
      //对数据排序
      sums.sort(function(a,b){
        return b.sum-a.sum;
      });
      var table2 = '<div class="line header"><div class="index-list"></div><div class="column column-title">年份</div><div class="column column-title">购药总金额</div></div>';
      for(var i=0;i<Math.max(sums.length,12);i++){
         var index = i%sums.length;
         table2 += ' <div class="line row"><div class="column index"><div class="index-bg">'+(index+1)+'</div></div><div class="column cell-content">'+sums[index].year+'</div><div class="column cell-content">'+sums[index].sum+'</div></div>';
      }
      $('.carouse-table-2').html(table2);
      //填充完毕使其滚动
      var t2 = new CarouseTable($('.carouse-table-2 .row'),6,{'height':'45px'},{'height':0});
      t2.start();
	  finished++;
	  update();
	}
	//更新与购药平均金额图表的初始化
	function showAvg(data){
	  var chart2 = echarts.init(document.getElementById('chart-2'));
	  totaldata.avg = data;
	  var list1 = [];
	  var list2 = [];
	  var list3 = [];
	  var list4 = [];
	  var list5 = [];
	  var list6 = [];
	  var list7 = [];
	  var years = [];
	  //准备数据
	  for(year in data){
	    years.push(year);
	    list1.push(data[year]['item1']);
	    list2.push(data[year]['item2']);
	    list3.push(data[year]['item3']);
	    list4.push(data[year]['item4']);
	    list5.push(data[year]['item5']);
	    list6.push(data[year]['item6']);
	    list7.push(data[year]['item7']);
	  }
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
            			data:years
            		   }],
            		   yAxis:[{
            		    type:'value',
            			name:'平均金额(元)',
            		    min:'dataMin',
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
                           data:list1
            			 },
            			 {
            			   name:'非处方药',
                           type:'line',
                           itemStyle:{
            				  normal:{
            					  barBorderRadius:5
            				  }
                           },
                           data:list2
            			 },
            			 {
            			   name:'医疗器械',
                           type:'line',
                           itemStyle:{
            				  normal:{
            					  barBorderRadius:5
            				  }
                           },
                           data:list3
            			 },
            			 {
            			   name:'保健品',
                           type:'line',
                           itemStyle:{
            				  normal:{
            					  barBorderRadius:5
            				  }
                           },
                           data:list4
            			 },
            			 {
            			   name:'妆特字化妆品',
                           type:'line',
                           itemStyle:{
            				  normal:{
            					  barBorderRadius:5
            				  }
                           },
                           data:list5
            			 },
            		     {
            			   name:'消毒用品',
                           type:'line',
                           itemStyle:{
            				  normal:{
            					  barBorderRadius:5
            				  }
                           },
                           data:list6
            			 },
            			 {
            			   name:'其他',
                           type:'line',
                           itemStyle:{
            				  normal:{
            					  barBorderRadius:5
            				  }
                           },
                           data:list7
            			 }
            		   ]
            	};
      //为图填充数据
	  chart2.setOption(option2);
	  finished++;
	  update();
	}
    //更新界面，如判断是否撤销动画
	function update(){
	  if(finished==4){
	   showTimeline();
	   showResult();
	  // console.log('all finished');
	  }
	}
	var chart4 = echarts.init(document.getElementById('chart-4'));
    var chart5 = echarts.init(document.getElementById('chart-5'));
    var chart6 = echarts.init(document.getElementById('chart-6'));
    var t1;

	function showTimeline(){
	   var timeline = echarts.init(document.getElementById('timeline'));
	   var timelineoption =  {
              timeline:{
                show:true,
                data:years,
                left:20,
                right:20,
                autoPlay:true,
                playInterval:1500*7,
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
	   timeline.setOption(timelineoption);
	   var times = totaldata['times'][years[0]];
	   //购药人次第一年数据
	   var timedata = [];
	   var listdata = [];
       var maxtimes = 0;

       for(key in times){
          timedata.push(times[key]);
          if(times[key]>maxtimes){
            maxtimes = times[key];
          }
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
                   data: labels,
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
                   data: labels
               }],
               xAxis: {
                   max:(maxtimes*1.25),
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
                   data:[maxtimes*1.25,maxtimes*1.25,maxtimes*1.25,maxtimes*1.25,maxtimes*1.25,maxtimes*1.25,maxtimes*1.25]
               }, {
                   type: 'bar',
                   data: timedata,
                   barWidth: 18,
                   itemStyle: {
                       normal: {
                           barBorderRadius: 20,
                           color: '#03a9f4',
                           shadowColor: 'rgba(0, 0, 0, 0.4)',
                           shadowBlur: 20
                       }
                   },
                   label:{
                     normal:{
                       show:true,
                       position:'insideTopRight',
                       offset:[10,10]
                     }
                   }
               }]
           };
       //人数第一年数据
       var people1 = totaldata['people'][0];
       var option5 = {
       	    color:['#03a9f4','#44d3e4'],
       	    legend: {
       	        data: ['购药次数>3的人数','购药次数<=3的人数'],
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
       	               show:true,
       	               position:'inside',
       	               formatter:'{d}%'
       	              }
       	            },
       	            data:[
       	                {value:people1.freq, name:'购药次数>3的人数'},
       	                {value:people1.rare, name:'购药次数<=3的人数'},
       	            ]
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
       				data:labels,
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
       							show: true,
       							position: 'inside',
       							formatter:'{d}%'
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
       						{value:times['item1'], name:'处方药'},
       						{value:times['item2'], name:'非处方药'},
       						{value:times['item3'], name:'医疗器械'},
       						{value:times['item4'], name:'消毒用品'},
       						{value:times['item5'], name:'保健品'},
       						{value:times['item6'], name:'妆特字化装品'},
       						{value:times['item7'], name:'其他'}
       					]
       				}
       			]
       		};
	   chart4.setOption(option4);
       chart6.setOption(option6);
       chart5.setOption(option5);
       //为滚动列表准备数据
       var avgdata = totaldata['avg'][years[0]];
       var avglist = [];
       var i = 0;
       for(key in avgdata){
         avglist.push({'avg':avgdata[key],'i':i});
         i++;
       }
      // console.log(avglist);
       avglist.sort(function(a,b){
         return b.avg-a.avg;
       });
       var table1 ='<div class="line header"><div class="index-list"></div><div class="column column-title">类别</div><div class="column column-title">购买平均金额</div></div>';
       var k = 0;
       for(var j = 0;j<Math.max(avglist.length,14);j++){
         k = j%avglist.length;
         table1 += '<div class="line row"><div class="column index"><div class="index-bg">'+(k+1)+'</div></div><div class="column cell-content">'+labels[avglist[k]['i']]+'</div><div class="column cell-content">'+avglist[k]['avg']+'</div></div>';
       }
       $('.carouse-table-1').html(table1);
       //填充完毕使其滚动
       t1 = new CarouseTable($('.carouse-table-1 .row'),7,{'height':'45px'},{'height':0});
       t1.start();
	   timeline.on('timelinechanged',timechange);
	}
	function timechange(param){
	       var currIndex = param.currentIndex;
       	   var times = totaldata['times'][years[currIndex]];
       	   //购药人次第一年数据
       	   var timedata = [];
       	   var listdata = [];
           var maxtimes = 0;

           for(key in times){
                 timedata.push(times[key]);
                 if(times[key]>maxtimes){
                   maxtimes = times[key];
                 }
              }
           //人数当年数据
           var people1 = totaldata['people'][currIndex];
           //更新chart4的数据
           var option4 = chart4.getOption();
           option4.xAxis.max = maxtimes*1.15;
           option4.series[0].data = [maxtimes*1.15,maxtimes*1.15,maxtimes*1.15,maxtimes*1.15,maxtimes*1.15,maxtimes*1.15,maxtimes*1.15];
           option4.series[1].data = timedata;
           chart4.setOption(option4);
           //更新chart5数据
           var option5 = chart5.getOption();
           option5.series[0].data[0].value = people1.freq;
           option5.series[0].data[1].value = people1.rare;
           chart5.setOption(option5);
           //更新chart5数据
           var option6 = chart6.getOption();
           option6.series[0].data[0].value = times['item1'];
           option6.series[0].data[1].value = times['item2'];
           option6.series[0].data[2].value = times['item3'];
           option6.series[0].data[3].value = times['item4'];
           option6.series[0].data[4].value = times['item5']
           option6.series[0].data[5].value = times['item6']
           option6.series[0].data[6].value = times['item7']
           chart6.setOption(option6);
           //为滚动列表准备数据
           var avgdata = totaldata['avg'][years[0]];
           var avglist = [];
           var i = 0;
           for(key in avgdata){
             avglist.push({'avg':avgdata[key],'i':i});
             i++;
           }
           avglist.sort(function(a,b){
              return b.avg-a.avg;
           });
           var table1 ='<div class="line header"><div class="index-list"></div><div class="column column-title">类别</div><div class="column column-title">购买平均金额</div></div>';
           var k = 0;
           for(var j = 0;j<Math.max(avglist.length,14);j++){
               k = j%avglist.length;
               table1 += '<div class="line row"><div class="column index"><div class="index-bg">'+(k+1)+'</div></div><div class="column cell-content">'+labels[avglist[k]['i']]+'</div><div class="column cell-content">'+avglist[k]['avg']+'</div></div>';
           }
           t1.stop();
           $('.carouse-table-1').html(table1);
           //填充完毕使其滚动
           t1 = new CarouseTable($('.carouse-table-1 .row'),7,{'height':'45px'},{'height':0});
           t1.start();
	}
	function showResult(){
	//console.log('in result');
       $('.timelabel').html(years[0]+'-'+years[years.length-1]);
       //$('#numyear').html(years.length);
       counter($('#numyear'),0,years.length,1,0.5);
       //console.log(totaldata.times)
       //准备购药人次结论数据
       var sumcat = [0,0,0,0,0,0,0];
       var timeslist = totaldata.times;
       var year;
       for(var i=0;i<years.length;i++){
         year = years[i];
         sumcat[0] += timeslist[year]['item1'];
         sumcat[1] += timeslist[year]['item2'];
         sumcat[2] += timeslist[year]['item3'];
         sumcat[3] += timeslist[year]['item4'];
         sumcat[4] += timeslist[year]['item5'];
         sumcat[5] += timeslist[year]['item6'];
         sumcat[6] += timeslist[year]['item7'];
       }
       var index = 0;
       var m = 0;
       for(var i=0;i<sumcat.length;i++){
         if(m<sumcat[i]){
           index = i;
           m = sumcat[i];
         }
       }
       //购药人次结论展示
       $('#times_max_cat').html(labels[index]);
       //$('#times_max_amount').html(sumcat[index]);
       counter($('#times_max_amount'),0,sumcat[index],10,1.5);
       //准备购药平均金额数据
       var avglist = totaldata.avg;
       var cati = 0;
       var avgm = 0;
       var item;
       for(var i=0;i<years.length;i++){
         item = avglist[years[i]];
         for(var j=1;j<=7;j++){
           if(item['item'+j]>avgm){
            cati = j-1;
            avgm = item['item'+j];
           }
         }
       }
       $('#avg_max_cat').html(labels[cati]);
       //$('#avg_max_amount').html(avgm);
       counter($('#avg_max_amount'),0,avgm,10,1.5);
       //准备购药总金额趋势分析
       var sumlist = totaldata.sum;
       //console.log(sumlist);
       //斜率k
       var k = 0;
       var xb=0,yb=0,xy=0,sx=0,sy=0;
       for(var i=0;i<sumlist.length;i++){
         xb += sumlist[i]['year'];
         yb += sumlist[i]['sum'];
         xy += sumlist[i]['year']*sumlist[i]['sum'];
         sx += sumlist[i]['year']*sumlist[i]['year'];
       }
       xb = xb/sumlist.length;
       yb = yb/sumlist.length;

       k = (xy-sumlist*xb*yb)/(sx-sumlist.length*xb*xb);
       //用最小二乘法计算斜率，如果斜率>0则为增，否则为减
       if(Math.abs(k-0)<e-2){
         //$('#status').css({background:url('../images/smooth.png')});
         $('#trend').html("基本稳定");
       }else{
         if(k<0){
          $('#trend').html("下降");
         }
       }
	}
	function counter(dom,curr,target,speed,accurate){
           if(curr>=target){
             return;
           }
           step = target - curr;
           speed = Math.ceil(speed * accurate);
           if(speed>step){
              speed = step;
           }
           setTimeout(function(){
             $(dom).html(curr+speed);
             counter(dom,curr+speed,target,speed+accurate,accurate);
           },100);
    }
	init();
});