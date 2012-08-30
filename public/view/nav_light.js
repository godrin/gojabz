define(function() {
  var NavHighlightView= {
    view:function(name) {
      $(".nav li").removeClass('active');
      $(".nav li[key='"+name+"']").addClass('active');
    }
  };
  return NavHighlightView;
});

