/* Copyright (C) 2009 Weelya & Gasquez Florian <f.gasquez@weelya.com> */

/*
Exemple 1:
	// URL to call
	var request = new Http('http://www.google.fr/');
	request.getContent(function(result) {
		Ape.log(result);
	});

Example 2:
	var request = new Http('http://twitter.com:80/statuses/update.json');
	request.set('method', 'POST');
	
	// GET or POST data
	request.writeData('status', 'Hello!');
	
	// HTTP Auth
	request.set('auth', 'user:password');
	
	request.getContent(function (result) {
		Ape.log(result);
	});
	
Example 3:
	// URL to call
	var request = new Http('http://www.google.fr/');
	request.finish(function(result) {
		// {status:Integer, headers:Array, body:String}
	});
*/

var Http = new Class({
	method:		'GET',
	headers:	[],
	body:		[],
	url:		null,
	
	initialize: function(url, host,port) {
		this.url 			= url;
		this.port			= port;
		this.tcp_host		= host;
		this.parseURL();
	},
	
	parseURL: function() {
		var result  = this.url.match("^.*?://(.*?)(:([0-9]+))?((/.*)|)$");
		this.host   = result[1];
		this.tcp_host = this.tcp_host  || this.host;
		this.port   = this.port || result[3] || 80;
		this.query  = result[4];
	},
	
	set: function(key, value) {
		if (key == 'auth') {
			this.auth	= 'Basic ' +  Ape.base64.encode(value);
			this.setHeader('Authorization', this.auth);
		} else {
			this[key] = value;
		}
	},
	
	setHeader: function(key, value) {
		this.headers[key] = value;
	},
	
	setHeaders: function(object) {
		this.headers = object;
	},
	
	write: function(data) {
		this.body.push(data);
	},
	
	writeData: function(key, value) {
		var tmpData = {};
		tmpData[key] = value;
		this.write(Hash.toQueryString(tmpData));
	},
	
	writeObject: function(data) {
		this.write(Hash.toQueryString(data));
	},
	
	getContentSize: function() {
		return this.response.length-this.responseHeadersLength-4;
	},
	
	connect: function() {		
		if (this.method == 'POST') {
			this.setHeader('Content-length', this.body.join('&').length);
			this.setHeader('Content-Type', 'application/x-www-form-urlencoded');
		}

		this.setHeader('User-Agent', 'APE JS Client');
		this.setHeader('Accept', '*/*');
		
		//JOHANNES sonst gibts 400 BAD REQUEST bei api.facebook.com/query
		//this.setHeader('Connection', 'keep-alive');

		this.socket = new Ape.sockClient(this.port, this.tcp_host, { flushlf: false });
		
		this.sockConnect();
		this.sockRead();
	},
	
	sockConnect: function() {
		this.socket.onConnect = function() {
			if (this.body.length != 0 && this.method == 'GET') {
				var getData = '';
			
				if (this.method == 'GET') {
					getData = '?' + this.body.join('&');
				}
			}

			var toWrite = this.method + " " + this.query + " HTTP/1.0\r\nHost: " + this.host + "\r\n";
			
			for (var i in this.headers) {
				if (this.headers.hasOwnProperty(i)) {
					toWrite += i + ': ' + this.headers[i] + "\r\n";
				}
			}

			//Ape.log("towrite: "+toWrite);
			
			this.socket.write(toWrite + "\r\n");
			this.socket.write(this.body.join('&'));
		}.bind(this);
	},
	
	
//	GET /method/fql.query?query=SELECT%20locale,sex,name%20from%20user%20where%20uid=710425252&access_token=106654652697509%7C2.Ik02ht1mEk__vslO9Z88WA__.3600.1273705200-710425252%7CsOltdnRmgSVxr8Kz06A5qP_EzNY.&format=JSON&locale=de_DE HTTP/1.1
//			Host: api.facebook.com
//			User-Agent: Mozilla/5.0 (Windows; U; Windows NT 6.1; de-DE; rv:1.9.2) Gecko/20100115 Firefox/3.6 ( .NET CLR 3.5.30729; .NET4.0E)
//			Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
//			Accept-Encoding: gzip,deflate
//			Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
//			Keep-Alive: 115
//			Connection: keep-alive
//			Cookie: datr=1273624526-1e5b79bba0eb22664a9b77e985de48f0961db78456006fccd33ff; locale=de_DE; lsd=ellUq; c_user=710425252; lo=wtIIhzflQAwIst6u1uZQjg; lxe=faceboo_jo%40gerer.name; lxs=1; sct=1273692679; xs=68e4339ffb715e7ea20fb8d91b908267; __utma=87286159.996341950.1273692677.1273692677.1273700595.2; __utmc=87286159; __utmz=87286159.1273704002.2.3.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=fql%20how%20to%20facebook; x-referer=http%3A%2F%2Fwww.facebook.com%2Fleedsmetfbl%23%2Fleedsmetfbl; presence=DJ273703857G05H0L710425252MF273703855538WMblcMsndPBbloMbvtMctMsbPBtA_7bQBfAnullBuctMsA0QBblADacA5V273703843Z400K273697864QQQ; __utmb=87286159.56.10.1273700595; app_id=117040568314899; cur_max_lag=2; made_write_conn=1273704006


	sockRead: function() {
		this.response = '';
		this.socket.onRead = function(data) { 
			this.response += data;
			if (this.response.contains("\r\n\r\n")) {
				if (!$defined(this.responseHeaders)) {
					var tmp						= this.response.split("\r\n\r\n");
					this.responseHeadersLength 	= tmp[0].length;
					tmp 						= tmp[0].split("\r\n");
					this.responseHeaders 		= [];
					this.responseCode			= tmp[0].split(" ");
					this.responseCode			= this.responseCode[1].toInt();

					for (var i = 1; i < tmp.length; i++) {
						var tmpHeaders = tmp[i].split(": ");
						this.responseHeaders[tmpHeaders[0]] = tmpHeaders[1];
					}
				} else {
					if ($defined(this.responseHeaders['Content-Length']) && this.getContentSize() >= this.responseHeaders['Content-Length']) {
						this.socket.close();
					} 
					if ($defined(this.responseHeaders['Location'])) {
						socket.close();
					}
				}
			}				
		}.bind(this);
	},
	
	read: function(callback) {
		this.socket.onDisconnect = function(callback) {
			this.response	  	 = this.response.split("\r\n\r\n");
			this.response.shift();
			this.response	  	 = this.response.join();
			this.httpResponse 	 = {status:this.responseCode, headers:this.responseHeaders, body:this.response};
			
			if ($defined(this.responseHeaders)) {
				if ($defined(this.responseHeaders['Location'])) {
					var newRequest   = new Http(this.responseHeaders['Location']);
					newRequest.setHeaders(this.headers);
					newRequest.set('method', this.method);
					newRequest.write(this.body.join('&'));
					newRequest.finish(callback);
				} else {
					callback.run(this.httpResponse);
				}
			}
		}.bind(this, callback);
	},
	
	finish: function(callback) {
		this.connect();
		this.read(callback);
	},
	
	getContent: function (callback) {
		this.connect();
		this.read(function(result) {
			callback.run(result['body']);
		});
	}
});