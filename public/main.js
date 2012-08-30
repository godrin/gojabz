/* main */
require(["model/friends","view/contact","router"],function(friends,contact,router) {
  /*
     persons.bind("change",function(x) {
     console.log("CHANGE",x);
     });
     persons.bind("add",function(x) {
     console.log("add",x,x.location);
     });
     */
  friends.fetch({name:"godrin",add:true,
    success:function(){console.log("success");},
  error:function(){console.log("ERR");}
  });
});
