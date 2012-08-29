define([ "sha256" ], function(sha256) {
	var name = null, secret = null;
	var loggedIn = false;
	var inited = false;

	var digest = function(w) {
		return sha256_digest(w);
	};
	var makeSeed = function() {
		return digest(Math.random());
	};

	var user = {
		init : function() {
			if (inited)
				return;
			inited = true;
			user.tryOldLogin();
		},
		loginWith : function(data) {
			console.log("LOGINWITH");
			name = data.name;
			if (data.secret) {
				if (localStorage) {
					localStorage.setItem('user_secret', data.secret);
					localStorage.setItem('user_name', name);
				}
			}
		},
		tryOldLogin : function() {
			if (localStorage) {
				secret = localStorage.getItem('user_secret');
				name = localStorage.getItem('user_name');
			}
		},
		logOut : function() {
			if (localStorage) {
				localStorage.removeItem('user_secret');
				localStorage.removeItem('user_name');
			}
			name = secret = null;
			loggedIn = false;
		},
		secret : function() {
			if (!secret)
				return null;
			var seed = makeSeed();
			return {
				seed : seed,
				secret : digest(seed + secret)
			};
		},
		tryLogin : function(username, password) {
			$.get("/seed", function(seed) {
				console.log("SEED", seed);
				var mySeed = makeSeed();
				console.log("mySEED", mySeed);
				$.post("/login", {
					username : username,
					myseed : mySeed,
					password : digest(seed + mySeed + username)
				}, user.loginWith);
			});
		},
		name : function() {
			if (loggedIn)
				return name;
		}
	};
	return user;
});