define(["view/nav_light","view/contact"],function(NavHighlightView,ContactView) {
  var body="#contentBody";

  var page=function() {
    var pagesLoaded={};
    return function(name,callback) {
      if(pagesLoaded[name]) {
	return callback();
      }
      $.get("/templates/"+name+".html",function(result) {
	$(result).appendTo($("head"));
	ich.refresh();
	callback();
      });
    };
  }();

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
	stich(body,"index.html");
      },
      contact : function() {
	page("contact",function() {
	  NavHighlightView.view("contact");
	  var v=new ContactView({el:body});
	  v.show();
	});
      },
      user:function(name) {
	stich(body,"user.html",{name:name,img:"images/pic.jpg"});
      },

      group:function(name) {
	stich(body,"group.html",{name:"GameDev",location:"Wuppertal"});
      },
      home:function()
      {
	this.frame();
	NavHighlightView.view("index");
	stich(body,"home.html",{friends:[{name:"Purple",img:"photo.jpg"},{name:"Godrin",img:"pic.jpg"}],
	  groups:[{name:"Gamedev",location:"Wuppertal"},{name:"GoJabz",location:"Germany"}]});
      },
      frame:function() {

      }
  });
  window.Workspace=new Workspace();
  Backbone.history.start();
  return Workspace;
});
