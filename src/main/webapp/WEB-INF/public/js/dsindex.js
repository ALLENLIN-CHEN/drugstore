$(function(){
  var url,role;
  var data = {
    'sum':null,
    'avg':null,
    'people':null,
    'times':null
  };
  var spinner = $('.spinner')[0];
  $(spinner).hide();
  $('.sub-item-wrap').on('click',clicklistener);
  function clicklistener(event){
         reset();
         var target = this;
         //console.log(target);
         $(target).addClass('active');
         $(spinner).show();
         url = $(target).attr('data-url');
         role = $(target).attr('data-role');
         console.log(role+' '+url);
         if(data[role]==null){
           getData(url);
         }else{
           update();
         }
  }
  function success(res){
    console.log(res);
    //alert('asd')
    data[role] = res;
    update();
  }
  function getData(url,fn){
    $.ajax({
      url:url,
      success:success
    });
  }
  function update(){
     $(spinner).hide();
     console.log('in updating...');
     draw();
  }
  function draw(){
    //console.log('in draw...');
    if(role=='people'){
      draw_people();
      console.log('people....');
    }else if(role=='times'){
       draw_times();
    }else if(role=='avg'){
      draw_avg();
    }else{
      draw_sum();
    }
  }
  function draw_avg(){
    //div for avg show
    $('#avg').show();
    //get chart div
    var pie = echarts.init($('#avg_top_left').get(0));
    var bar = echarts.init($('#avg_top_right').get(0));
    var line = echarts.init($('#avg_bottom_left').get(0));
        var avglist = data['avg'];
        var list1 = [];
        var list2 = [];
        var list3 = [];
        var list4 = [];
        var list5 = [];
        var list6 = [];
        var list7 = [];
        var years = [];
        var piedatas = [];
        var bardata = {};
        var tuple;
        for(key in avglist){
        	 tuple = avglist[key];
        	 years.push(key);
             list1.push(tuple['item1']);
             list2.push(tuple['item2']);
             list3.push(tuple['item3']);
             list4.push(tuple['item4']);
             list5.push(tuple['item5']);
             list6.push(tuple['item6']);
             list7.push(tuple['item7']);
             var baritem = [];
             baritem.push(tuple['item1']);
             baritem.push(tuple['item2']);
             baritem.push(tuple['item3']);
             baritem.push(tuple['item4']);
             baritem.push(tuple['item5']);
             baritem.push(tuple['item6']);
             baritem.push(tuple['item7']);
             bardata[key] = baritem;
             piedatas.push({
                                                      series: [
                                                        {data:[
                                                           {name: '处方药', value:tuple['item1']},
                                                           {name: '非处方药', value: tuple['item2']},
                                                           {name: '医疗器械', value: tuple['item3']},
                                                           {name: '保健品', value: tuple['item4']},
                                                           {name: '妆特字化妆品', value: tuple['item5']},
                                                           {name: '消毒用品', value: tuple['item6']},
                                                           {name: '其他', value: tuple['item7']}
                                                        ]}
                                                      ]
                                                   });
    }
    var color = ['#a3159a','#8aabf2','#ff7438','#fc9c12','#c3e332','#50c5c3','#029ed9'];
    var index = 0;
    var top_left_option = {
        baseOption :{
             color:color,
             timeline : {
                 data : years,
                 label : {
                 formatter : function(s) {
                    return s;
                 },
                 position:10,
                 },
                 orient:'vertical',
                 inverse:true,
                 top:30,
                 bottom:10,
                 right:40,
                 width:30,
                 checkpointStyle:{
                     color:'#fc9c12'
                 },
                 controlStyle:{
                  position:'top'
                 },
                 autoPlay:true
              },
                 title : {
                 },
                 tooltip : {
                     trigger: 'item',
                     formatter: "{c}"
                     },
                 legend: {
                     align:'left',
                     data:['处方药', '非处方药', '医疗器械', '保健品', '妆特字化妆品','消毒用品', '其他']
                     },
                 toolbox: {
                     show : false
                 },
                 series:[
                     {
                     name:'人次占比',
                     type:'pie',
                     center:['50%','50%'],
                     radius:'75%',
                     roseType:'angle'
                     }
                 ]
             },
             options:piedatas
    };
    var top_right_option = {
        tooltip : {
             trigger: 'axis',
             axisPointer : {            // 坐标轴指示器，坐标轴触发有效
             type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
             }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis : [
           {
           type : 'category',
           data : ['处方药', '非处方药', '医疗器械', '保健品', '妆特字化妆品','消毒用品', '其他'],
           axisTick: {
              alignWithLabel: true
           }
           }
        ],
         xAxis : [
           {
             type : 'value'
           }
         ],
         series : [
           {
           name:'直接访问',
           type:'bar',
           barWidth: '60%',
           itemStyle:{
             normal:{
              color:function(){
               c = color[index];
               index = (++index)%7;
               return c;
              }
             }
           },
           data:bardata['2010']
           }
         ]
       };
    var bottom_left_option = {
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
		   legend:{
		     data: ['处方药', '非处方药', '医疗器械', '保健品', '妆特字化妆品', '消毒用品','其他']
		   },
		   xAxis:[{
			type: 'category',
			axisTick:{
				show:false
			 },
			data:[2004,2005,2006,2007,2008,2009]
		   }],
		   yAxis:[{
		    type:'value',
			name:'平均金额(元)',
			axisTick:{
            show:false
			},
			splitLine:{
				lineStyle:{
					color:"#333333"
				}
			}
		   }
		   ],
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
    pie.setOption(top_left_option);
    bar.setOption(top_right_option);
    line.setOption(bottom_left_option);
  }
  function draw_sum(){
    $('#sum').show();
    //get chart div
    var datalist = data[role]['consum'];
    console.log(datalist);
    var years = [];
    var sums = [];
    var oneyear;
    for(var i=0;i<datalist.length;i++){
       oneyear = datalist[i];
       years.push(oneyear.year);
       sums.push(oneyear.sum);
    }
    var line = echarts.init($('#sum_top').get(0));
    var bar = echarts.init($('#sum_bottom').get(0));
    var top_option = {
        grid:{
            left:40,
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
            data:['总金额(元)'],
             textStyle:{
                color :'#5c6076'
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
                    color: '#5c6076'
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
            min:'dataMin',
             axisLabel: {
                textStyle: {
                    color: '#5c6076'
                }
            },
            splitLine:{
                show:true,
                lineStyle:{
                    color:'#2e3547'
                }
            },
            axisLine: {
                    lineStyle: {
                        color: '#384157'
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
                data:sums,
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
                name:'总金额(元)',
                smooth:true,
                symbolSize:10,
                animation:false,
                lineWidth:1.2,
                hoverAnimation:false,
                data:sums,
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
    var bottom_option = {
                           color: ['#f17a52'],
                           tooltip : {
                               trigger: 'axis',
                               axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                   type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                               }
                           },
                           grid: {
                              left:50,
                           },
                           grid:{
                           left:'100px'
                           },
                           xAxis : [
                                          {
                                          type: 'category',
                                          data: years,

                           }],
                           yAxis : [{
                              type: 'value',

                           }],
                           series : [
                               {
                                   name:'购药总额',
                                   type:'bar',
                                   barWidth: '50%',
                                   data:sums
                               }
                           ]
                       };
    line.setOption(top_option);
    bar.setOption(bottom_option);
  }
  function draw_times(){
   $('#times').show();
   //ready doms
    var pie = echarts.init($('#times_top_left').get(0));
    var bar = echarts.init($('#times_top_right').get(0));
    var line = echarts.init($('#times_bottom_left').get(0));
    //ready data
    var timeslist = data['times'];
    var list1 = [];
    var list2 = [];
    var list3 = [];
    var list4 = [];
    var list5 = [];
    var list6 = [];
    var list7 = [];
    var years = [];
    var piedatas = [];
    var bardata = {};
    var tuple;
    for(key in timeslist){
    	 tuple = timeslist[key];
    	 years.push(key);
         list1.push(tuple['item1']);
         list2.push(tuple['item2']);
         list3.push(tuple['item3']);
         list4.push(tuple['item4']);
         list5.push(tuple['item5']);
         list6.push(tuple['item6']);
         list7.push(tuple['item7']);
         var baritem = [];
         baritem.push(tuple['item1']);
         baritem.push(tuple['item2']);
         baritem.push(tuple['item3']);
         baritem.push(tuple['item4']);
         baritem.push(tuple['item5']);
         baritem.push(tuple['item6']);
         baritem.push(tuple['item7']);
         bardata[key] = baritem;
         piedatas.push({
                                                  series: [
                                                    {data:[
                                                       {name: '处方药', value:tuple['item1']},
                                                       {name: '非处方药', value: tuple['item2']},
                                                       {name: '医疗器械', value: tuple['item3']},
                                                       {name: '保健品', value: tuple['item4']},
                                                       {name: '妆特字化妆品', value: tuple['item5']},
                                                       {name: '消毒用品', value: tuple['item6']},
                                                       {name: '其他', value: tuple['item7']}
                                                    ]}
                                                  ]
                                               });
    }
    var top_left_option = {
        baseOption :{
             color: ['#ffdb6d', '#89c9e1', '#ce77b6', '#f29e29','#726dd1','#ffdec9','#04dd98'],
             timeline : {
                 data : years,
                 label : {
                 formatter : function(s) {
                    return s;
                 },
                 position:10,
                 },
                 orient:'vertical',
                 inverse:true,
                 top:30,
                 bottom:10,
                 right:40,
                 width:30,
                 checkpointStyle:{
                   color:'#f29e29'
                 },
                 controlStyle:{
                  position:'top'
                 },
                 autoPlay:true
              },
                 title : {
                 },
                 tooltip : {
                     trigger: 'item',
                     formatter: "{c}"
                     },
                 legend: {
                     align:'left',
                     data:['处方药', '非处方药', '医疗器械', '保健品', '妆特字化妆品','消毒用品', '其他']
                     },
                 toolbox: {
                     show : false
                 },
                 series:[
                     {
                     name:'人次占比',
                     type:'pie',
                     center:['50%','50%'],
                     radius:['50%','85%'],
                     label: {
                                 normal: {
                                     show: false,
                                     position: 'center'
                                 },
                                 emphasis: {
                                     show: true,
                                     formatter: function(param) {
                                         return param.percent.toFixed(0) + '%';
                                     },
                                     position:'center',
                                     textStyle: {
                                         fontSize: '30',
                                         fontWeight: 'bold'
                                     }
                                 }
                             },
                     labelLine: {
                             normal: {
                                 show: true
                              }
                      }
                     }
                 ]
             },
             options:piedatas
    };
    var color = ['#ffdb6d', '#89c9e1', '#ce77b6', '#f29e29','#726dd1','#ffdec9','#04dd98'];
    var index = 0;
    var top_right_option = {

    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    yAxis : [
        {
            type : 'category',
            data :['处方药', '非处方药', '医疗器械', '保健品', '妆特字化妆品','消毒用品', '其他'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    xAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'人次',
            type:'bar',
            barWidth: '60%',
            itemStyle:{
               normal:{
                color:function(){
                  c= color[index];
                  index = (++index)%color.length;
                  return c;
                }
               }
            },
            data:bardata['2010']
        }
    ]
    };
    var bottom_left_option = {
	       color: ['#ffdb6d', '#89c9e1', '#ce77b6', '#f29e29','#726dd1','#ffdec9','#04dd98'],
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
		   legend:{
		     data: ['处方药', '非处方药', '医疗器械', '保健品', '妆特字化妆品', '消毒用品','其他']
		   },
		   xAxis:[{
			type: 'category',
			axisTick:{
				show:false
			 },
			data:years
		   }],
		   yAxis:[{
		    type:'value',
			name:'人次(人)',
			min:'dataMin',
			axisTick:{
            show:false
			},
			splitLine:{
				lineStyle:{
					color:"#333333"
				}
			}
		   }
		   ],
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

    pie.setOption(top_left_option);
    bar.setOption(top_right_option);
    line.setOption(bottom_left_option);
  }
  function reset(){
    $('.sub-item-wrap').removeClass('active');
    $('.chart_container').hide();
  }
  //draw people charts
  function draw_people(){
     $('#people').show();
     var top = echarts.init($('#people_top').get(0));
     var peoplelist = data['people'];
     var tuple;
     var years = [];
     var freqs = [];
     var rares = [];
     var labels = [];
     var options = [];
     for(var i=0;i<peoplelist.length;i++){
      tuple = peoplelist[i];
      years.push(tuple['year']);
      labels.push(0);
      freqs.push(tuple['freq']);
      rares.push(tuple['rare']);
      options.push({
                        series:[{
                           data:[
                             {
                                name:'次数>3的人数',
                                value:tuple['freq']
                             },
                             {
                             name:'次数<=3的人数',
                             value:tuple['rare']
                             }
                           ]
                        }]
                      });
     }
 var option = {
             color:['#61af69','#58d2e8'],
             title:{
               textStyle:{
                     color:'#fff',
                     fontSize:16,
                 },

             },
             legend:{
                 data:['购药次数>3人数','购药次数<=3人数'],
                 top:4,
                 right:'10%',
                 textStyle:{
                     color:'#333',
                 },
             },
     	    tooltip: {
     	    	show:true,
     	        trigger:'item',
     	        formatter:'{b}<br/>{a}: {c}人',
     	        axisPointer: {
     	            type:'shadow',
     	        }
     	    },
     	    grid:[{
     		    	show:false,
     		        left:'4%',
     		        top:60,
     		        bottom:60,
     		        containLabel: true,
     		        width:'46%',
     		    },
     		      {
     		    	show:false,
     		        left:'50.5%',
     		        top:80,
     		        bottom:60,
     		        width:'4%',
     		    },
     		    {
     		    	show:false,
     		        right:'4%',
     		        top:60,
     		        bottom:60,
     		        containLabel: true,
     		        width:'46%',
     		    },
     		   ],

     	    xAxis:[{
     		        type: 'value',
     		        inverse:true,
     		        axisLine: {show:true,},
     		        axisTick: {show:false,},
     		        position:'top',
     		        axisLabel: {
     		        	show:true,
     		        	textStyle: {color:'#333',fontSize:12,},
     		        },
     		        splitLine: {
     		        	show:true,
     		        	lineStyle:{
     		        		color:'#ccc',width: 1,
     						type: 'solid',
     		        	},
     		        },
     		    },
     		     {
     		     	gridIndex: 1,
     		        show:false,
     		    },
     		     {
     		     	gridIndex: 2,
     		        type: 'value',
     		        axisLine: {show:true,},
     		        axisTick: {show:false,},
     		        position:'top',
     		        axisLabel: {
     		        	show:true,
     					textStyle: {color:'#333',fontSize:12,},		        },
     		        splitLine: {
     		        	show:true,
     		        	lineStyle:{
     		        		color:'#ccc',width: 1,
     						type: 'solid',
     		        	},
     		        },
     		    },
     		   ],
     	    yAxis:
     	    	[
     		    {
     		        type: 'category',
     		        inverse:true,
     		        position:'right',
     		        axisLine: {show:false},
     		        axisTick: {show:false},
     		        axisLabel: {
     		        	show:false,
     		        	margin:8,
     		        	textStyle: {
     						color:'#333',fontSize: 12,
     					},

     		        },
     		        data: years,
     		    },
     		    {
     		    	gridIndex: 1,
     		        type: 'category',
     		        inverse:true,
     		        position:'left',
     		        axisLine: {show:false},
     		        axisTick: {show:false},
     		        axisLabel: {
     		        	show:true,
     		        	textStyle: {
     						color:'#333',fontSize: 12,
     					},

     		        },
    		       data:years.map(function(value){

    		           return {

    		               value:value,
    		               textStyle:{
    		                   align:'center'
    		               }
    		           }
    		       })
     		    },
     		     {
     		    	gridIndex: 2,
     		        type: 'category',
     		        inverse:true,
     		        position:'left',
     		        axisLine: {show:false},
     		        axisTick: {show:false},
     		        axisLabel: {
     		        	show:false,
     		        	textStyle: {
     						color:'#333',fontSize: 12,
     					},

     		        },
     		        data:years,
     		    },
     		   ],
     	    series: [
     	    	        {
      	            name:'购药次数>3人数',
      	            type: 'bar',
      	            barGap: 20,
      	            barWidth: 20,
      	            label: {
      		            normal: {
      		            	show:false,
      		            },
      		            emphasis: {
      		                show:true,
      		            	position:'left',
      		                offset:[0,0],
      		                textStyle: {color: '#fff',fontSize: 14,},
      		            },
      	            },
      	            itemStyle: {
      					normal: {
      						color:'#58d2e8',
      					},
      					emphasis: {
      						color:'#0088cc',
      					},
      				},
      	            data: freqs,
      	        },
      	        {
                   type:'bar',
      	           xAxisIndex: 1,
                   yAxisIndex: 1,
                   label:{
                    normal:{
                     show:false
                    },
                    emphasis:{
                      show:false
                    }
                   },
                   data:labels

      	        },
      	        {
      	            name:'购药次数<=3人数',
      	            type: 'bar',
      	            barGap: 20,
      	            barWidth:20,
      	            xAxisIndex: 2,
                     yAxisIndex: 2,
      	            label: {
      		           normal: {
      		            	show:false,
      		            },
      		            emphasis: {
      		                show:true,
      		            	position:'right',
      		                offset:[0,0],
      		                textStyle: {color: '#fff',fontSize: 14,},
      		            },
      	            },
      	            itemStyle: {
      					normal: {
      						color:'#61af69',
      					},
      					emphasis: {
      						color:'#b8f788',
      					},
      				},
      	            data:rares,
      	        }

     	  ],

 	};


var pie = echarts.init($('#people_left').get(0));
var pieoption = {
        baseOption :{
           color:['#58d2e8','#61af69'],
           timeline : {
              data : years,
              autoPlay:true,
              checkpointStyle:{
                color:'#61ff69',
                borderColor:'#61af69'
              },
              itemStyle:{
                 emphasis:{
                    color:'#61af69'
                  }
              },
              label : {
                  formatter : function(s) {
                     return s;
                  }
              }
           },
           title : {
           },
           tooltip : {
              trigger: 'item',
              formatter: "{c}"
           },
           legend: {
               align:'left',
               data:['次数>3的人数','次数<=3的人数']
           },
           toolbox: {
               show : false
           },
           series:[
              {
                name:'人数占比',
                type:'pie',
                center:['50%','50%'],
                radius:'50%'
              }
           ]
        },
        options:options
     };
     pie.setOption(pieoption);
     top.setOption(option);
  }
 // draw_people();
})