define(function(){
  var ContactView=Backbone.View.extend({
    show:function(){
      $(this.el).html(ich.contact());
    }
  });
  return ContactView;
});
