var express = require('express');
var app = express();
var path = require('path');
var httpProxy = require('http-proxy');

//代理到长安服务器
var proxy = new httpProxy.createProxyServer({
	target: {
		host: 'kdkc365.com',
		port: 80
	}
});



//代理中间件，只代理url包含/cameap的请求
app.use(function(req, res, next) {
	console.log(req.url);
	if (req.url.match(new RegExp('^(\/main\/|\/shoppingcart\/|\/cart\/|\/member\/|\/my\/|\/maintenance\/)'))) {
		console.log('proxy to: kdkc365.com');
		proxy.web(req, res);
	} else if(req.url.match(new RegExp('^(\/changanshop_pay\/)'))){
		console.log('proxy to: kdkc365.com');
		newProxy.web(req, res);
	}else {
		next();
	}
});

app.use(express.static(path.resolve('.')));

app.get('/', function(req, res) {
	res.redirect('demo2.html');
});


app.listen(process.env.PORT || 8003);
console.log('i am up at 8003');
