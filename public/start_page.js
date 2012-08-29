var StartPage={
  init:function(app) {
    $("#signIn,#signOn").submit(function(e) {
      //location.href="#user";
      var form=$(e.currentTarget).closest("form");
      $("#signIn").hide();
      var email=$("input[name='email']",form).val();
      var password=$("input[name='password']",form).val();
      console.log("data",email,password);

      app.navigate("user", true);

      return false;
    });

  }

};
