define([
		'jquery',
		'backbone',
		'butterfly/butterfly',
		'components/monitor',
		'./config',	
		'json!./server.json'
	],function($, Backbone, Butterfly, Monitor, Config, Server) {

	// 加载配置
	var loadConfig = function(app, callback) {
		app.config = $.extend({}, Config, Config.development ? Server.development:Server.production);

		// 通过cordova插件获取原生app的id,version,build
		if(navigator.appInfo && navigator.appInfo.getAppInfo) {
			navigator.appInfo.getAppInfo(function(appInfo){
				app.config.nativeVersion = appInfo.version;
				app.config.nativeId = appInfo.identifier;
				app.config.nativeBuild = appInfo.build;
				app.config.appRootPath = appInfo.appRootPath;
				app.config.appFolderName = appInfo.appFolderName;
				app.config.deviceId = appInfo.deviceId;

				// 向前兼容,早版本的getAppInfo并没有返回appRootPath和appFolderName
				if((!app.config.appRootPath || !app.config.appFolderName) && cordova.file) {
					if(window.device == "iOS") {
						app.config.appRootPath = cordova.file.documentsDirectory;
						app.config.appFolderName = "app";
					}else if(window.device == "Android") {
						app.config.appRootPath = "file:///data/data/" + app.config.identifier + "/files/";
						app.config.appFolderName = "app";
					}
				}
				callback();
			}, function(err) {
				console.log('getAppInfo error: ' + err);
				callback();
			});
		}else if(callback) {
			callback();
		}
	}; 

	var checkUpdate = function(app) {
		console.log('app: checkUpdate');
		require(['components/moduleManager/moduleManager'], function(ModuleManager) {
			new ModuleManager(app.config).checkUpdates(false, function() {},
				function(error) {
					console.log('check update error:%s', error);
				});
		});
	};

	var signInDevice = function(app) {
		var loginId = window.localStorage['loginId'];
		if(!app.config.pushEnabled || !app.config.deviceId || !loginId)
			return;
		$.ajax({
			url: app.config.chameleonUrl + "/pushModule/ms_plugin/push_api/ms_user_sign",
			method: 'POST',
			timeout: 30 * 1000,
			dataType: 'json',
			data: {
				loginId: loginId,
				loginName: loginId,
				appKey: app.config.pushAppKey,
				masterSecret: app.config.pushAppSecret,
				appName: app.config.appName,
				deviceId: app.config.deviceId,
				deviceOS: window.device.platform,
				OSType: window.device.platform == "iOS" ? 1 : 2
			},
			success: function() {
				console.log('设备签到成功');
			},
			error: function() {
				console.log('设备签到失败');
			}
		});
	};

	// 绑定事件并扩展View,为View类动态添加一个onBackButton,onResume函数
	var bindDeviceEvents = function(app) {
		Backbone.View.use({
			onBackButton: function() {
				console.log('onBackButton');
				window.history.go(-1);
			},
			onResume: function() {
				console.log('view: onResume');
			}
		});

		// 注册cordova事件
		document.addEventListener("backbutton", function() {
			app.onBackButton.apply(app, arguments);
		});
		document.addEventListener("resume", function() {
			setTimeout(function() {
				app.onResume.apply(app, arguments);
			}, 300);
		});
	};

	return Butterfly.Application.extend({
		fly: function() {
			// do some global initialize
			console.log('mobile app flying');

			var me = this;
			// 去掉启动页和h5页面显示之前的一段白屏
			if(navigator.ChameleonUtil && navigator.ChameleonUtil.closeStartupOverlay) {
				me.once('viewchanged', function() {
					console.log('first viewchanged');
					setTimeout(function() {
						navigator.ChameleonUtil.closeStartupOverlay(function() {
							console.log('remove overlay view ok');
						}, function() {
							console.log('remove overlay view fail');
						});
					}, 200);
				});
			}

			loadConfig(me, function(){
				if(me.config.appRootPath && me.config.appFolderName) {
					require(['components/loadforks']);	// 加载推送组件
					
					// 创建用户行为监控器
                    var options = { 
                    	appId: me.config.identifier, 
                    	url: 'http://m.changan.com.cn/mam/api/mam/behavior/insert',
                    	rootDir: me.config.appRootPath + me.config.appFolderName + '/'
                    };
                    window.monitor = Monitor.create(options);
                    // window.monitor.appData({ debug: true });		// 根据需要,添加应用自己的扩展数据
				}
			});
			bindDeviceEvents(me);

			Butterfly.Application.prototype.fly.apply(me, arguments);
		},
		onBackButton: function() {	// Android返回键处理
			var me = this;
			if(me.rootView && me.rootView.currentView()) {
				me.rootView.currentView().onBackButton();
			}
		},
		onResume: function() {		// 从后台恢复到前台的处理
			var me = this;
			if(me.rootView && me.rootView.currentView()) {
				me.rootView.currentView().onResume();
			}
			console.log('app: onResume');
			checkUpdate(this);
			signInDevice(this);
		},
		login: function(userId, password) {
			console.log('login..');

			window.localStorage['loginId'] = userId;
			window.localStorage['password'] = password;

			signInDevice(this);
		},
		logout: function() {
			console.log('logout...');
		}
	}); //view define 
});