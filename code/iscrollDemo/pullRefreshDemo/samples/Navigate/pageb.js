define([
		'butterfly/view',
		'butterfly'
	],
	function(View, Butterfly) {
	return View.extend({
		events: {
			"click .back": "goBack",
			"click .content .btn[action=go]": "go",
			"click .content .btn[action=back]": "back",
		},
		onShow: function(options) {
			if(options) {
				console.log('page b onShow, from: ' + options.from);
				$(this.el).find(".content .from").html(options.from === undefined ? "":"from:&nbsp"+ options.from);
			}
			View.prototype.onShow.apply(this, arguments);
		},
		go: function(evt) {
			var el = $(evt.currentTarget);
			var dest = el.attr('dest');
			var popup = el.attr('popup');

			butterfly.navigate('samples/Navigate/'+dest, { isPopupView: popup==="true" ? true:false, from: 'pageb.html'});
		},
		back: function(evt) {
			var el = $(evt.currentTarget);
			var dest = el.attr('dest');

			if(!isNaN(dest)) {
				// or butterfly.back(.....)
				window.history.go(parseInt(dest), { from: 'pageb.html'});
			}else {
				// or butterfly.back(.....)
				window.history.go('samples/Navigate/'+ dest, { from: 'pageb.html'});
			}
		},
	}); //view define
});
