/*!Extend touch.js*/
define(['zepto'], function(zepto) {
	(function(i) {
		var g = {},
			b, k, h, e = 750,
			a;

		function c(m) {
			return "tagName" in m ? m : m.parentNode
		}

		function j(n, m, p, o) {
			var r = Math.abs(n - m),
				q = Math.abs(p - o);
			return r >= q ? (n - m > 0 ? "Left" : "Right") : (p - o > 0 ? "Up" : "Down")
		}

		function l() {
			a = null;
			if (g.last) {
				g.el.trigger("longTap");
				g = {}
			}
		}

		function d() {
			if (a) {
				clearTimeout(a)
			}
			a = null
		}

		function f() {
			if (b) {
				clearTimeout(b)
			}
			if (k) {
				clearTimeout(k)
			}
			if (h) {
				clearTimeout(h)
			}
			if (a) {
				clearTimeout(a)
			}
			b = k = h = a = null;
			g = {}
		}
		i(document).ready(function() {
			var m, n;
			i(document.body).bind("touchstart", function(o) {
				m = Date.now();
				n = m - (g.last || m);
				g.el = i(c(o.touches[0].target));
				b && clearTimeout(b);
				g.x1 = o.touches[0].pageX;
				g.y1 = o.touches[0].pageY;
				if (n > 0 && n <= 250) {
					g.isDoubleTap = true
				}
				g.last = m;
				a = setTimeout(l, e)
			}).bind("touchmove", function(o) {
				d();
				g.x2 = o.touches[0].pageX;
				g.y2 = o.touches[0].pageY;
				if (Math.abs(g.x1 - g.x2) > 10) {
					o.preventDefault()
				}
			}).bind("touchend", function(o) {
				d();
				if ((g.x2 && Math.abs(g.x1 - g.x2) > 30) || (g.y2 && Math.abs(g.y1 - g.y2) > 30)) {
					h = setTimeout(function() {
						g.el.trigger("swipe");
						g.el.trigger("swipe" + (j(g.x1, g.x2, g.y1, g.y2)));
						g = {}
					}, 0)
				} else {
					if ("last" in g) {
						k = setTimeout(function() {
							var p = i.Event("tap");
							p.cancelTouch = f;
							g.el.trigger(p);
							if (g.isDoubleTap) {
								g.el.trigger("doubleTap");
								g = {}
							} else {
								b = setTimeout(function() {
									b = null;
									g.el.trigger("singleTap");
									g = {}
								}, 250)
							}
						}, 0)
					}
				}
			}).bind("touchcancel", f);
			i(window).bind("scroll", f)
		});
		["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(n) {
			i.fn[n] = function(m) {
				return this.bind(n, m)
			}
		})
	})(Zepto);
	/*!Extend zepto.extend.js*/
	(function(a) {
		a.extend(a, {
			contains: function(b, c) {
				return b.compareDocumentPosition ? !!(b.compareDocumentPosition(c) & 16) : b !== c && b.contains(c)
			}
		})
	})(Zepto);
	(function(a, c) {
		a.extend(a, {
			toString: function(d) {
				return Object.prototype.toString.call(d)
			},
			slice: function(e, d) {
				return Array.prototype.slice.call(e, d || 0)
			},
			later: function(f, d, h, e, g) {
				return window["set" + (h ? "Interval" : "Timeout")](function() {
					f.apply(e, g)
				}, d || 0)
			},
			parseTpl: function(g, f) {
				var d = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + g.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/<%=([\s\S]+?)%>/g, function(h, i) {
					return "'," + i.replace(/\\'/g, "'") + ",'"
				}).replace(/<%([\s\S]+?)%>/g, function(h, i) {
					return "');" + i.replace(/\\'/g, "'").replace(/[\r\n\t]/g, " ") + "__p.push('"
				}).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');";
				var e = new Function("obj", d);
				return f ? e(f) : e
			},
			throttle: function(d, e, i) {
				var g = 0,
					f;
				if (typeof e !== "function") {
					i = e;
					e = d;
					d = 250
				}

				function h() {
					var m = this,
						n = Date.now() - g,
						l = arguments;

					function k() {
						g = Date.now();
						e.apply(m, l)
					}

					function j() {
						f = c
					}
					if (i && !f) {
						k()
					}
					f && clearTimeout(f);
					if (i === c && n > d) {
						k()
					} else {
						f = setTimeout(i ? j : k, i === c ? d - n : d)
					}
				}
				h._zid = e._zid = e._zid || a.proxy(e)._zid;
				return h
			},
			debounce: function(d, f, e) {
				return f === c ? a.throttle(250, d, false) : a.throttle(d, f, e === c ? false : e !== false)
			}
		});
		a.each("String Boolean RegExp Number Date Object Null Undefined".split(" "), function(e, d) {
			var f;
			if ("is" + d in a) {
				return
			}
			switch (d) {
				case "Null":
					f = function(g) {
						return g === null
					};
					break;
				case "Undefined":
					f = function(g) {
						return g === c
					};
					break;
				default:
					f = function(g) {
						return new RegExp(d + "]", "i").test(b(g))
					}
			}
			a["is" + d] = f
		});
		var b = a.toString
	})(Zepto);
	(function(d, g) {
		var c = navigator.userAgent,
			a = navigator.appVersion,
			b = d.browser;
		d.extend(b, {
			qq: /qq/i.test(c),
			uc: /UC/i.test(c) || /UC/i.test(a)
		});
		b.uc = b.uc || !b.qq && !b.chrome && !b.firefox && !/safari/i.test(c);
		try {
			b.version = b.uc ? a.match(/UC(?:Browser)?\/([\d.]+)/)[1] : b.qq ? c.match(/MQQBrowser\/([\d.]+)/)[1] : b.version
		} catch (f) {}
		d.support = d.extend(d.support || {}, {
			orientation: !(b.uc || (parseFloat(d.os.version) < 5 && (b.qq || b.chrome))) && !(d.os.android && parseFloat(d.os.version) > 3) && "orientation" in window && "onorientationchange" in window,
			touch: "ontouchend" in document,
			cssTransitions: "WebKitTransitionEvent" in window,
			has3d: "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix()
		})
	})(Zepto);
	(function(b) {
		b.matchMedia = (function() {
			var g = 0,
				e = "gmu-media-detect",
				d = b.fx.transitionEnd,
				h = b.fx.cssPrefix,
				f = b("<style></style>").append("." + e + "{" + h + "transition: width 0.001ms; width: 0; position: absolute; top: -10000px;}\n").appendTo("head");
			return function(k) {
				var m = e + g++,
					l = b('<div class="' + e + '" id="' + m + '"></div>').appendTo("body"),
					j = [],
					i;
				f.append("@media " + k + " { #" + m + " { width: 1px; } }\n");
				if ("matchMedia" in window) {
					return window.matchMedia(k)
				}
				l.on(d, function() {
					i.matches = l.width() === 1;
					b.each(j, function(n, o) {
						b.isFunction(o) && o.call(i, i)
					})
				});
				i = {
					matches: l.width() === 1,
					media: k,
					addListener: function(n) {
						j.push(n);
						return this
					},
					removeListener: function(o) {
						var n = j.indexOf(o);
						~n && j.splice(n, 1);
						return this
					}
				};
				return i
			}
		}());
		b(function() {
			var d = function(e) {
				b(window).trigger("ortchange")
			};
			b.mediaQuery = {
				ortchange: "screen and (width: " + window.innerWidth + "px)"
			};
			b.matchMedia(b.mediaQuery.ortchange).addListener(d)
		});

		function a() {
			b(window).on("scroll", b.debounce(80, function() {
				b(document).trigger("scrollStop")
			}, false))
		}

		function c() {
			b(window).off("scroll");
			a()
		}
		a();
		b(window).on("pageshow", function(d) {
			if (d.persisted) {
				b(document).off("touchstart", c).one("touchstart", c)
			}
		})
	})(Zepto);
	/*!Extend zepto.highlight.js*/
	(function(e) {
		var d, a = false,
			f, c, b = function() {
				clearTimeout(f);
				if (d && (c = d.attr("highlight-cls"))) {
					d.removeClass(c).attr("highlight-cls", "");
					d = null
				}
			};
		e.extend(e.fn, {
			highlight: function(g) {
				a = a || !!e(document).on("touchend.highlight touchmove.highlight touchcancel.highlight", b);
				b();
				return this.each(function() {
					var h = e(this);
					h.css("-webkit-tap-highlight-color", "rgba(255,255,255,0)").off("touchstart.highlight");
					g && h.on("touchstart.highlight", function() {
						f = e.later(function() {
							d = h.attr("highlight-cls", g).addClass(g)
						}, 100)
					})
				})
			}
		})
	})(Zepto);
});