define([
		'butterfly/view',
		'butterfly',
		'css!samples/Animation/css/magic.css'
	], function(View, Butterfly) {
	return View.extend({
		events: {
			"click .back": "goBack",
			"click .content li": "onComponents"
		},
		onShow: function() {
			
		},
		onComponents: function(evt) {
			var comp = $(evt.currentTarget).attr('data-component');
		}
	}); //view define
});