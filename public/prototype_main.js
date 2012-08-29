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
  var NavHighlightView= {
    view:function(name) {
      $(".nav li").removeClass('active');
      $(".nav li[key='"+name+"']").addClass('active');
    }
  };

  // get template, use mustache and put into el
  window.stich=function(el,file,model) {
    $.get(file,function(result) {
      if(result.match(/.*html.*/)) {
	result=$("#contentBody",$("<div>"+result+"</div>")).html();
      }
      $(el).html(Mustache.render(result,model));
    });
  };

  var Workspace = Backbone.Router.extend({

    routes : {
      "" : "index",
      "about" : "about", // #help
      "contact" : "contact",
      "user" : "home",
      "user/:username" : "user",
      "group/:groupname" : "group",
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
	StartPage.init(this);
      },
      about : function() {
	NavHighlightView.view("about");
	stich("#contentBody","index.html");
      },
      contact : function() {
	NavHighlightView.view("contact");
      },
      user:function(name) {
	stich("#contentBody","user.html",{name:name,img:"images/pic.jpg"});
      },
      group:function(name) {
	stich("#contentBody","group.html",{name:"GameDev",location:"Wuppertal"});
      },
      home:function() 
      {
	this.frame();
	NavHighlightView.view("index");
	stich("#contentBody","home.html",{friends:[{name:"Purple",img:"photo.jpg"},{name:"Godrin",img:"pic.jpg"}],
	  groups:[{name:"Gamedev",location:"Wuppertal"},{name:"GoJabz",location:"Germany"}]});
      },
      frame:function() {

      }
  });
  window.Workspace=new Workspace();
  Backbone.history.start();




});


