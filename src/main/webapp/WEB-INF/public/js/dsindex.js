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
    var top_left_option = {
        baseOption :{
             timeline : {
                 data : [2003,2004,2005,2008,2009,2010],
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
                     radius:'50%'
                     }
                 ]
             },
             options:[{
                 series: [
                 {data:[
                    {name: '处方药', value:1000},
                    {name: '非处方药', value: 2000},
                    {name: '医疗器械', value: 3000},
                    {name: '保健品', value: 4000},
                    {name: '妆特字化妆品', value: 5000},
                    {name: '消毒用品', value: 6000},
                    {name: '其他', value: 7000}
                 ]}
                 ]
             },
             {
                  series: [
                  {data:[
                     {name: '处方药', value:1000},
                     {name: '非处方药', value: 2000},
                     {name: '医疗器械', value: 3000},
                     {name: '保健品', value: 4000},
                     {name: '妆特字化妆品', value: 5000},
                     {name: '消毒用品', value: 6000},
                     {name: '其他', value: 7000}
                     ]}
                  ]
             }]
    };
    var top_right_option = {
        color: ['#3398DB'],
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
           data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
           data:[10, 52, 200, 334, 390, 330, 220]
           }
         ]
       };
    var bottom_left_option = {
		   color: ["#cff7cd", "#03c9a9", "#37adff", "#745afe", "#6cf0da", "#44d0ff", "#8b75fd", "#ffc272"],
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
    var line = echarts.init($('#sum_top').get(0));
    var bar = echarts.init($('#sum_bottom').get(0));
    var top_option = {
                                             			title:{
                                             			},
                                             			tooltip:{
                                             			  trigger: 'asix',
                                                           axisPointer: {
                                                           lineStyle: {
                                                             color: '#ddd'
                                                           }
                                                     },
                                                     backgroundColor: 'rgba(255,255,255,1)',

                                                     textStyle: {
                                                         color: '#7588E4',
                                                     },
                                                     extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
                                             			},
                                             			legend:{
                                             			   data:['总金额(元)']
                                             			},
                                             			xAxis:[
                                                          {
                                                             type: 'category',
                                                             data: [2005,2006,2007,2008,2009,2010],
                                                             boundaryGap: false,
                                                             splitLine: {
                                                                 show: true,
                                                                 interval: 'auto',
                                                                 lineStyle: {
                                                                     color: ['#D4DFF5']
                                                                 }
                                                             },
                                                             axisTick: {
                                                                 show: false
                                                             },
                                                             axisLine: {
                                                                 lineStyle: {
                                                                     color: '#609ee9'
                                                                 }
                                                             },
                                                             axisLabel: {
                                                                 margin: 10,
                                                                 textStyle: {
                                                                     fontSize: 14
                                                                 }
                                                             }
                                                         }
                                             			],
                                             			yAxis:{
                                             			min:'dataMin',
                                             			 type: 'value',
                                                         splitLine: {
                                                             lineStyle: {
                                                                 color: ['#D4DFF5']
                                                             }
                                                         },
                                                         axisTick: {
                                                             show: false
                                                         },
                                                         axisLine: {
                                                             lineStyle: {
                                                                 color: '#609ee9'
                                                             }
                                                         },
                                                         axisLabel: {
                                                             margin: 10,
                                                             textStyle: {
                                                                 fontSize: 14
                                                             }
                                                         }
                                             			},
                                             			series:[{
                                             			name:'总金额(元)',
                                             			type: 'line',
                                                         smooth: true,
                                                         showSymbol: false,
                                                         symbol: 'circle',
                                                         symbolSize: 6,
                                                         data: [100,2030,1256,38394,2999,30909],
                                                         areaStyle: {
                                                             normal: {
                                                                 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                                     offset: 0,
                                                                     color: 'rgba(199, 237, 250,0.5)'
                                                                 }, {
                                                                     offset: 1,
                                                                     color: 'rgba(199, 237, 250,0.2)'
                                                                 }], false)
                                                             }
                                                         },
                                                         itemStyle: {
                                                             normal: {
                                                                 color: '#f7b851'
                                                             }
                                                         },
                                                         lineStyle: {
                                                             normal: {
                                                                 width: 3
                                                             }
                                                         }
                                             			}]
                                             		  };
    var bottom_option = {
                           color: ['#3398DB'],
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
                           xAxis : [
                               {
                                   type : 'category',
                                   data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                   axisTick: {
                                       alignWithLabel: true
                                   }
                               }
                           ],
                           yAxis : [
                               {
                                   type : 'value'
                               }
                           ],
                           series : [
                               {
                                   name:'直接访问',
                                   type:'bar',
                                   barWidth: '60%',
                                   data:[10, 52, 200, 334, 390, 330, 220]
                               }
                           ]
                       };
    line.setOption(top_option);
    bar.setOption(bottom_option);
  }
  function draw_times(){
   $('#times').show();
    var pie = echarts.init($('#times_top_left').get(0));
    var bar = echarts.init($('#times_top_right').get(0));
    var line = echarts.init($('#times_bottom_left').get(0));
    var top_left_option = {
        baseOption :{
             timeline : {
                 data : [2003,2004,2005,2008,2009,2010],
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
                     center:['30%','50%'],
                     radius:'50%'
                     }
                 ]
             },
             options:[{
                 series: [
                 {data:[
                    {name: '处方药', value:1000},
                    {name: '非处方药', value: 2000},
                    {name: '医疗器械', value: 3000},
                    {name: '保健品', value: 4000},
                    {name: '妆特字化妆品', value: 5000},
                    {name: '消毒用品', value: 6000},
                    {name: '其他', value: 7000}
                 ]}
                 ]
             },
             {
                  series: [
                  {data:[
                     {name: '处方药', value:1000},
                     {name: '非处方药', value: 2000},
                     {name: '医疗器械', value: 3000},
                     {name: '保健品', value: 4000},
                     {name: '妆特字化妆品', value: 5000},
                     {name: '消毒用品', value: 6000},
                     {name: '其他', value: 7000}
                     ]}
                  ]
             }]
    };
    var top_right_option = {
        color: ['#3398DB'],
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
           data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
           data:[10, 52, 200, 334, 390, 330, 220]
           }
         ]
       };
    var bottom_left_option = {
		   color: ["#cff7cd", "#03c9a9", "#37adff", "#745afe", "#6cf0da", "#44d0ff", "#8b75fd", "#ffc272"],
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
			name:'人数(人)',
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
  function reset(){
    $('.sub-item-wrap').removeClass('active');
    $('.chart_container').hide();
  }
  //draw people charts
  function draw_people(){
     $('#people').show();
     var top = echarts.init($('#people_top').get(0));
     var myData=['大栅栏','天安门广场','故宫','景山','北海公园','后海','什刹海','西单','玉渊潭','中央电视塔','东单','王府井','南锣鼓巷','工体','潘家园','琉璃厂'];
     var option = {
             title:{
                text:'人数',
                textStyle:{
                     color:'#fff',
                     fontSize:16,
                 }
             },
             legend:{
                 data:['帅哥','美女'],
                 top:4,
                 right:'10%',
                 textStyle:{
                     color:'#fff',
                 },
             },
     	    tooltip: {
     	    	show:true,
     	        trigger:'axis',
     	        formatter:'{b}<br/>{a}: {c}人',
     	        axisPointer: {
     	            type:'shadow',
     	        }
     	    },
     	    toolbox: {
             feature: {
                 dataView: {
                     show: true,
                     readOnly: false
                 },
                 restore: {
                     show: true
                 },
                 saveAsImage: {
                     show: true
                 }
             }
         },
     	    grid:[{
     		    	show:false,
     		        left:'4%',
     		        top:60,
     		        bottom:30,
     		        containLabel: true,
     		        width:'46%',
     		    },
     		      {
     		    	show:false,
     		        left:'50.5%',
     		        top:80,
     		        bottom:30,
     		        width:'4%',
     		    },
     		    {
     		    	show:false,
     		        right:'4%',
     		        top:60,
     		        bottom:30,
     		        containLabel: true,
     		        width:'46%',
     		    },
     		   ],

     	    xAxis:[{
     		        type: 'value',
     		        inverse:true,
     		        axisLine: {show:false,},
     		        axisTick: {show:false,},
     		        position:'top',
     		        axisLabel: {
     		        	show:true,
     		        	textStyle: {color:'#B2B2B2',fontSize:12,},
     		        },
     		        splitLine: {
     		        	show:true,
     		        	lineStyle:{
     		        		color:'#1F2022',width: 1,
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
     		        axisLine: {show:false,},
     		        axisTick: {show:false,},
     		        position:'top',
     		        axisLabel: {
     		        	show:true,
     					textStyle: {color:'#B2B2B2',fontSize:12,},		        },
     		        splitLine: {
     		        	show:true,
     		        	lineStyle:{
     		        		color:'#1F2022',width: 1,
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
     						color:'#9D9EA0',fontSize: 12,
     					},

     		        },
     		        data: myData,
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
     						color:'#9D9EA0',fontSize: 12,
     					},

     		        },
     		       data:myData.map(function(value){
     		    		return {
     		    			value:value,
     		    			textStyle:{
     		    				align:'center',
     		    			}
     		    		}
     		    	}),
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
     						color:'#9D9EA0',fontSize: 12,
     					},

     		        },
     		        data:myData,
     		    },
     		   ],
     	    series: [
     	        {
     	            name:'帅哥',
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
     						color:'#659F83',
     					},
     					emphasis: {
     						color:'#08C7AE',
     					},
     				},
     	            data: [400, 350, 300, 250, 200, 150, 100, 150, 200, 250, 300, 350, 400, 350, 300, 250],
     	        },


     	        {
     	            name:'美女',
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
     						color:'#F68989',
     					},
     					emphasis: {
     						color:'#F94646',
     					},
     				},
     	            data:[380, 370, 350, 330, 300, 290, 280, 270, 260, 110, 120, 130, 140, 350, 300, 250],
     	        },
     	    ]
     	};
     var pie = echarts.init($('#people_left').get(0));
     var pieoption = {
                     	baseOption :{
                     				timeline : {
                     				 data : [2003,2004,2005],
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
                     				options:[{
                                                         series:[{
                                                           data:[{
                                                           name:'次数>3的人数',
                                                           value:1000
                                                           },
                                                           {
                                                            name:'次数<=3的人数',
                                                            value:200
                                                           }]
                                                           }]
                                             },
                                             {
                                                                                                      series:[{
                                                                                                        data:[{
                                                                                                        name:'次数>3的人数',
                                                                                                        value:1000
                                                                                                        },
                                                                                                        {
                                                                                                         name:'次数<=3的人数',
                                                                                                         value:200
                                                                                                        }]
                                                                                                        }]
                                                                                          },
                                                                                          {
                                                                                                                                                   series:[{
                                                                                                                                                     data:[{
                                                                                                                                                     name:'次数>3的人数',
                                                                                                                                                     value:1000
                                                                                                                                                     },
                                                                                                                                                     {
                                                                                                                                                      name:'次数<=3的人数',
                                                                                                                                                      value:200
                                                                                                                                                     }]
                                                                                                                                                     }]
                                                                                                                                       }

                                             ]
                     	};
                     	       pie.setOption(pieoption);
     top.setOption(option);
  }
 // draw_people();
})