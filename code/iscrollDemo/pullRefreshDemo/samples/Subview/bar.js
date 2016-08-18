define([
		'butterfly/view',
		'butterfly'
	],
	function(View, Butterfly) {
	return View.extend({
		events: {
			"click .tab-item": "onClickTab"
		},
		render: function() {
			//this.showTab(0);
			View.prototype.render.apply(this, arguments);
		},
		onShow: function() {
			// todo show active tab
			View.prototype.onShow.apply(this, arguments);
		},
		onClickTab: function(evt) {
			this.showTab(this.$(".tab-item").index($(evt.currentTarget)));
		},
		showTab: function(idx) {
			var cnt = this.$(".tab-item").length;

			for (var i = cnt - 1; i >= 0; i--) {
				var subview = this.subviews[i];
				var show = idx === i;
				var item = this.$(".tab-item").eq(i);

				subview && show ? subview.show():subview.hide();
				show ? item.addClass('active') : item.removeClass('active');
			}
		}
	}); //view define
});