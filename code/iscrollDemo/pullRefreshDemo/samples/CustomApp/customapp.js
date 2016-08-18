define([
		'butterfly/view',
		'butterfly'
	],
	function(View, Butterfly) {
	return View.extend({
		events: {
			"click .back": "goBack",
		},
		onShow: function() {
			
		}
	}); //view define
});