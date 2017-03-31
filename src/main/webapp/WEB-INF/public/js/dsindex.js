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
     update();
  });
  function getData(url){
    console.log(url+'getting....');
    data[role]=1
  }
  function update(){
     $(spinner).hide();
     draw();
  }
  function draw(){

  }
  function reset(){
    $('.sub-item-wrap').removeClass('active');
    $('.chart_container').hide();
  }
})