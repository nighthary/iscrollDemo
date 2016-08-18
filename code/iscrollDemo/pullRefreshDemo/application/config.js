define([], function() {
	return {
		// should manual set
		appName: "Sample App",

		appKey: "293633fa5468cc68fd23b1c4a2eec99b",					// chameleon app key
		appSecret: "a0f2bb78-56b3-4966-adcc-4f88c3d1099c",          // chameleon app scecret
		identifier: "com.foreveross.chameleon.sample",				// chameleon app identifier

		pushEnabled: true,
		pushAppKey: "b3d5423f2eb52e537428fb15",                     // app key for push library (like jpush app key)
		pushAppSecret: "5c7009c139545300a29eb463",                  // app secret for push library (like jpush app secret)

		version: "1.0.0",				// not ios or android, but h5 version, use this to check update of h5.

		development: false,				// production or development, for load  server config	
       
        // will be auto set while app started
		nativeId: "",                   // ios bundle id or android package
		nativeVersion: "",              // version of native app
		nativeBuild: "",                // build of ios or android. use this to check update of native app.
		appRootPath: "",                // h5 root path, only valid with cordova. for example: file:///.../Documents/
		appFolderName:"",               // h5 drictory name, only valid with cordova. for example: 'app'
		downloadFolder: "download",     // directory name of download files
	};
});