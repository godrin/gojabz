$(function() {

  function initiate_geolocation() {
    navigator.geolocation.getCurrentPosition(handle_geolocation_query);
  }

  function initialize_maps(lat,lon) {
    var latlng = new google.maps.LatLng(lat,lon); //-34.397, 150.644);
    var myOptions = {
      zoom: 8,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),
	myOptions);
  }

  function handle_geolocation_query(position){
    initialize_maps(position.coords.latitude, position.coords.longitude);
  }
  function gmaps_loaded() {
    initiate_geolocation();
  }
  function load_gmap() {
    $.get("https://maps.google.com/maps/api/js?sensor=true",function(result) {
      $("script").attr("language","javascript").html(result).appendTo($("head"));
      gmaps_loaded();
    });
  }
  load_gmap();

  // get template, use mustache and put into el
  window.stich=function(el,file,model) {
    $.get(file,function(result) {
      if(result.match(/.*html.*/)) {
	result=$("#contentBody",$("<div>"+result+"</div>")).html();
      }
      $(el).html(Mustache.render(result,model));
    });
  };


});


