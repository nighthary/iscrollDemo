define([
		'butterfly/view',
		'swipe'
	],
	function(View, Swipe) {

		var appVersion = 1;

		return View.extend({
			swipe: null,
			events: {
				"click .start-button": "onStartApp"
			},
			render: function() {
				var me = this;
				setTimeout(function() {
					me.open();
				}, 50);
			},
			open: function() {
				var me = this;
				this.swipe = this.$el.find('#whatsnew-slider').Swipe({
					startSlide: 0,
					speed: 100,
					auto: false,
					continuous: false,
					disableScroll: false,
					stopPropagation: false,
					closeEndMotion: true,
					transitionEnd: function(index, elem) {
						
					}
				});
			},
			close: function() {
				window.localStorage['whatsnew'] = JSON.stringify({
					version: appVersion
				});
				this.swipe = null;
				this.remove();
			},
			onStartApp: function() {
				butterfly.navigate('samples/main.html');
			}
		}); //view define
	});