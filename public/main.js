/* main */
require(["model/friends","view/contact","router"],function(friends,contact,router) {
  friends.fetch({name:"godrin",add:true,
    success:function(){console.log("success");},
  error:function(){console.log("ERR");}
  });
});
