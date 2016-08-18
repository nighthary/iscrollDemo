define([
		'butterfly/view',
		'butterfly',
		'underscore',
		'text!./page.html'
	],
	function(View, Butterfly, _, ViewTemplate) {
	return View.extend({
		events: {
			"click .back": "goBack",
		},
		render: function() {
			var container = $('<div></div>').append(ViewTemplate);
			var template = _.template(container.find('#tab-page-template').html());
			$(this.el).append(template({img: $(this.el).attr('data-img') }));

			View.prototype.render.apply(this, arguments);
		},
		onShow: function() {
			console.log('sub page onShow');
		}
	}); //view define
});