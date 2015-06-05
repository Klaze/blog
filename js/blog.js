$(function() {
	Parse.$ = jQuery;

	//Parse.js initialization call
	Parse.initialize("UtfCHl640uIAtdB3t3HJkLq3B07FI93xw767141J", "IjJdQuG0Uo3ZSn9gUa4lkA5pIitZhVT1iUc0uJR3");
	//Parse test code
	var Blog = Parse.Object.extend("Blog");

	var Blogs = Parse.Collection.extend({
		model: Blog
	});

	var blogs = new Blogs();

	blogs.fetch({
		success: function(blogs) {
			var blogsView = new BlogsView({collection: blogs });
			blogsView.render();
			$('.main-container').html(blogsView.el);
		},
		error: function(blogs, error) {
			console.log(error);
		}
	});

	var BlogsView = Parse.View.extend({
		template: Handlebars.compile($('#blogs-tpl').html()),
		render: function() {
			var collection = { blog: this.collection.toJSON() };
			this.$el.html(this.template(collection));
		}
	});
});





