$(function(){
  var url,role;
  var data = {
    'sum':null,
    'avg':null,
    'people':null,
    'times':null
  };
  var flash = {
    'people':false,
    'times':false,
    'sum':false,
    'avg':false
  }
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
    console.log(res);
    data[role] = res;
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
     var tbhtml = '';
     if(role=='people'){
        showpeople();
     }else if(role=='times'){
       showtimes();
     }else if(role=='avg'){
       showavg();
     }else{
       showsum();
     }
  }
  function showpeople(){
        if(!flash[role]){
           var tbhtml = "";
           var item = null;
           var peoplelist = data[role]
           for(var i=0;i<peoplelist.length;i++){
             item = peoplelist[i];
             tbhtml = tbhtml + "<tr><td>"+item.year+"</td><td>"+item.freq+"</td><td>"+item.rare+"</td></tr>"
           }
           $('#people .table tbody').html(tbhtml);
        }
        $('#people').show();
  }
  function showtimes(){
     if(!flash[role]){
            var tuple = null;
            var tbhtml = "";
            var times = data[role]
            for(key in times){
                tuple = times[key];
                tbhtml = tbhtml+"<tr><td>"+key+"</td><td>"+tuple['item1']+"</td><td>"+tuple['item2']+"</td><td>"+tuple['item3']+"</td><td>"+tuple['item4']+"</td><td>"+tuple['item5']+"</td><td>"+tuple['item6']+"</td><td>"+tuple['item7']+"</td></tr>"
            }
            $('#times .table tbody').html(tbhtml);
            flash[role] = true;
       }
      $('#times').show();
  }
  function showavg(){
     if(!flash[role]){
         var tbhtml = "";
         var tuple = null;
         var avglist = data[role]
         for(key in avglist){
             tuple = avglist[key];
             tbhtml = tbhtml+"<tr><td>"+key+"</td><td>"+tuple['item1']+"</td><td>"+tuple['item2']+"</td><td>"+tuple['item3']+"</td><td>"+tuple['item4']+"</td><td>"+tuple['item5']+"</td><td>"+tuple['item6']+"</td><td>"+tuple['item7']+"</td></tr>"
         }
          // console.log(tbhtml);
         $('#avg .table tbody').html(tbhtml);
         flash[role] = true;
      }
     $('#avg').show();
  }
  function showsum(){
     if(!flash[role]){
       var tbhtml = "";
       var sumlist = data[role]['consum'];
       for(var i=0;i<sumlist.length;i++){
           tbhtml = tbhtml + "<tr><td>"+sumlist[i].year+"</td>"+"<td>"+sumlist[i].sum+"</td></tr>";
       }
      $('#sum .table tbody').html(tbhtml);
      flash[role] = true;
     }
     $('#sum').show();
  }
  function pagelistener(event)
  {
     $('#people').show();
  }
  function updatepage()
  {

  }
  function reset(){
    $('.sub-item-wrap').removeClass('active');
    $('.table-container').hide();
  }
})