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
    update();
  }
  function getData(url){
    $.ajax({
      url:url,
      success:success
    });
  }
  function update(){
     $(spinner).hide();
     list();
  }
  function list(){

  }
  function pagelistener(event)
  {

  }
  function updatepage()
  {

  }
  function reset(){
    $('.sub-item-wrap').removeClass('active');
    $('.table-container').hide();
  }
})