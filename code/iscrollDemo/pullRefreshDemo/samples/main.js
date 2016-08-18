define([
		'butterfly/view',
		'butterfly'
	],
	function(View, Butterfly) {
		return View.extend({
			events: {
				"click .sample": "onSample"
			},
			render: function() {

			},
			onShow: function() {
				
			},
			onSample: function(evt) {
				var path = $(evt.currentTarget).attr('data-path');
				if(path !== undefined) {
					butterfly.navigate(path, { from: 'main.html' });
				}
			}
		}); //view define
	});