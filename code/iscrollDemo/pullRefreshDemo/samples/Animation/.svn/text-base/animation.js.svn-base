define([
		'butterfly/view',
		'butterfly',
		'css!samples/Animation/css/magic.css'
	], function(View, Butterfly) {

	function getTransitionEvent() {
		var el = document.body;
		var transitions = {
		 'transition':'transitionend',
		 'OTransition':'oTransitionEnd',
		 'MozTransition':'transitionend',
		 'WebkitTransition':'webkitTransitionEnd'
		}
		for(t in transitions){
		   if( el.style[t] !== undefined ){
		       return transitions[t];
		   }
		}
	}

	function getAnimationEvent() {
		var el = document.body;
		var animations = {
		 'animation':'animationend',
		 'OAnimation':'oAnimationEnd',
		 'MozAnimation':'animationend',
		 'WebkitAnimation':'webkitAnimationEnd'
		}
		for(t in animations){
		   if( el.style[t] !== undefined ){
		       return animations[t];
		   }
		}
	}

	var transitionEvent = getTransitionEvent();
	var animationEvent = getAnimationEvent();

	return View.extend({
		events: {
			"click .back": "goBack",
			"click .content li": "onAnimation"
		},
		onShow: function() {
			
		},
		onAnimation: function(evt) {
			var anim = $(evt.currentTarget).attr('data-animation');
			if(anim === undefined )
				return;
			if(anim === "Custom") {
				butterfly.navigate('samples/Animation/demo1.html',{ 
					effect: { 
						go: function(currentView, nextView, finishCallback) {
							// 注意必须在动画完成后调用finishCallback
							$(nextView.el).one(animationEvent, finishCallback);
							$(nextView.el).addClass('magictime foolishIn');
						},
						back: function(currentView, nextView, finishCallback) {
							// 注意必须在动画完成后调用finishCallback
							$(currentView.el).one(animationEvent, finishCallback);
							$(currentView.el).removeClass('foolishIn').addClass('foolishOut');
						}
					}
				});
			}else {
				butterfly.navigate('samples/Animation/demo.html',{ effect:anim });
			}
		}
	}); //view define
});