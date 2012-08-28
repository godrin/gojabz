$(function() {



  $("#signIn").submit(function() {
    location.href="/user.html";
    $("#signIn").hide();
    return false;
  });

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
  var NavHighlightView= {
    view:function(name) {
      $(".nav li").removeClass('active');
      $(".nav li[key='"+name+"']").addClass('active');
    }
  };



  var Workspace = Backbone.Router.extend({

    routes : {
      "" : "index",
      "about" : "about", // #help
      "contact" : "contact",
      "user" : "user",
      "app/*xy" : "hi",
      "search/:query" : "search", // #search/kiwis
      "search/:query/p:page" : "search" // #search/kiwis/p7
    },
      hi : function() {
	console.log("HI", arguments);
	// alert("HI");
      },

      help : function() {
	console.log("help func");
      },

      search : function(query, page) {
	console.log("search");
      },
      index : function() {
	NavHighlightView.view("index");
      },
      about : function() {
	NavHighlightView.view("about");
      },
      contact : function() {
	NavHighlightView.view("contact");
      },
      user:function() 
      {
	this.frame();
	NavHighlightView.view("index");
	$.get("user.html",function(result){
	  $("#contentBody").html(result);});
      },
      frame:function() {

      }
  });
  new Workspace();
  Backbone.history.start();




});


