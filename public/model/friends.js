define(function() {
  var Friend=Backbone.Model.extend({});
  var Friends=Backbone.Collection.extend({
    model:Friend,
      url:"friends"
  });
  return new Friends;
});
