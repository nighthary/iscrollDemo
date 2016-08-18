define([
		'butterfly/view',
		'butterfly'
	],
	function(View, Butterfly) {
	return View.extend({
		events: {
			"click .back": "goBack",
			"click .content .btn[action=go]": "go",
		},
		onShow: function(options) {
			if(options) {
				console.log('page a onShow, from: ' + options.from);
				$(this.el).find(".content .from").html(options.from === undefined ? "": "from:&nbsp"+ options.from);
			}
			View.prototype.onShow.apply(this, arguments);
		},
		go: function(evt) {
			var el = $(evt.currentTarget);
			var dest = el.attr('dest');
			var popup = el.attr('popup');

			butterfly.navigate('samples/Navigate/'+dest, { isPopupView: popup==="true" ? true:false, from: 'pagea.html'});
		},
	}); //view define
});
