$(function() {

	Parse.$ = jQuery;

	//Parse.js initialization call
	Parse.initialize("UtfCHl640uIAtdB3t3HJkLq3B07FI93xw767141J", "IjJdQuG0Uo3ZSn9gUa4lkA5pIitZhVT1iUc0uJR3");

	$('.form-signin').on('submit', function(e) {

		//Prevent Default Submit Event
		e.preventDefault();

		//Get data from the form and put them into variables
		var data = $(this).serializeArray(),
			username = data[0].value,
			password = data[1].value;
		//Call Parse Login function with those variables
		Parse.User.logIn(username, password, {
			//If the username and password matches
			success: function(user) {
				alert('Welcome yo!');
			},
			//If there is an error
			error: function(user, error) {
				console.log(error);
			}
		});
	});

	var LoginView = Parse.View.extend({
			template: Handlebars.compile($('#login-tpl').html()),
			render: function() {
				this.$el.html(this.template());
			},
			login: function(e) {
				//Prevent Default Submit Event
				e.preventDefault();

				//Get data from the form and put them into variables
				var data = $(e.target).serializeArray(),
					username = data[0].value,
					password = data[1].value;
				//Call Parse Login function with those variables
				Parse.User.logIn(username, password, {
					//If the username and password matches
					success: function(user) {
						var welcomeView = new WelcomeView({model: user});
						welcomeView.render();
						$('.main-container').html(welcomeView.el);
					},
					//If there is an error
					error: function(user, error) {
						console.log(error);
					}
				});
			},
			events: {
				'submit .form-signin': 'login'
			}
	}),
	WelcomeView = Parse.View.extend({
		template: Handlebars.compile($('#welcome-tpl').html()),
		render: function() {
			var attributes = this.model.toJSON();
			this.$el.html(this.template(attributes));
		}
	});

	var loginView = new LoginView();
	loginView.render();
	$('.main-container').html(loginView.el);
});





