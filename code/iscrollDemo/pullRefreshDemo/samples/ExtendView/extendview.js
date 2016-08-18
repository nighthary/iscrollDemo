define([
		'butterfly/view',
		'butterfly',
		'notification'
	],
	function(View, Butterfly,Notification) {
	return View.extend({
		events: {
			"click .back": "goBack",
			"click #backbutton": "onClickBackButton",
		},
		onShow: function() {
			
		},
		onBackButton: function() {
			if(confirm('来自Extend View页面的提示,确实要回退吗?')) {
				window.history.go(-1);
			}
		},
		onClickBackButton: function() {
			document.dispatchEvent(new Event('backbutton'));
		}
	}); //view define
});