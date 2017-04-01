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
    alert('asd')
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
    console.log('in draw...');
    if(role=='people'){
      draw_people();
      console.log('people....');
    }
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
             backgroundColor:'#000',
             title:{
                text:'大北京景点帅哥美女统计',
                textStyle:{
                     color:'#fff',
                     fontSize:16,
                 },
                 subtext: '作者:花自飘凌水自流',
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
     	top.setOption(option);
  }
  draw_people();
})