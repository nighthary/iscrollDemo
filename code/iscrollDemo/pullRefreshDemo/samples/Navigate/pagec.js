define([
		'butterfly/view',
		'butterfly'
	],
	function(View, Butterfly) {
	return View.extend({
		events: {
			"click .back": "goBack",
			"click .content .btn[action=back]": "back",
		},
		onShow: function(options) {
			if(options) {
				console.log('page c onShow, from: ' + options.from);
				$(this.el).find(".content .from").html(options.from === undefined ? "":"from:&nbsp"+ options.from);
			}
			View.prototype.onShow.apply(this, arguments);
		},
		back: function(evt) {
			var el = $(evt.currentTarget);
			var dest = el.attr('dest');

			if(!isNaN(dest)) {
				// or butterfly.back(.....)
				window.history.go(parseInt(dest), { from: 'pagec.html'});
			}else {
				// or butterfly.back(.....)
				window.history.go('samples/Navigate/'+ dest, { from: 'pagec.html'});
			}
		},
	}); //view define
});
