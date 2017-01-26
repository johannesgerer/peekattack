/*
HTTP Host: connect.facebook.net
Generated: June 3rd 2010 8:59:30 AM PDT
Machine: 10.27.51.113
Location: JIT Construction: v252744
Locale: en_US
 */

if (!window.FB)
	FB = {
		_apiKey : null,
		_session : null,
		_userStatus : 'unknown',
		_logging : true,
		_inCanvas : ((window.location.search.indexOf('fb_sig_in_iframe=1') > -1) || (window.location.search
				.indexOf('session=') > -1)),
		_domain : {
			api : 'https://api.facebook.com/',
			api_read : 'https://api-read.facebook.com/',
			cdn : (window.location.protocol == 'https:' ? 'https://s-static.ak.fbcdn.net/'
					: 'http://static.ak.fbcdn.net/'),
			graph : 'https://graph.facebook.com/',
			staticfb : 'http://static.ak.facebook.com/',
			www : window.location.protocol + '//www.facebook.com/'
		},
		_locale : null,
		_localeIsRtl : false,
		copy : function(d, c, b, e) {
			for ( var a in c)
				if (b || typeof d[a] === 'undefined')
					d[a] = e ? e(c[a]) : c[a];
			return d;
		},
		create : function(c, h) {
			var e = window.FB, d = c ? c.split('.') : [], a = d.length;
			for ( var b = 0; b < a; b++) {
				var g = d[b];
				var f = e[g];
				if (!f) {
					f = (h && b + 1 == a) ? h : {};
					e[g] = f;
				}
				e = f;
			}
			return e;
		},
		provide : function(c, b, a) {
			return FB.copy(typeof c == 'string' ? FB.create(c) : c, b, a);
		},
		guid : function() {
			return 'f' + (Math.random() * (1 << 30)).toString(16).replace('.',
					'');
		},
		log : function(a) {
			if (FB._logging)
				if (window.Debug && window.Debug.writeln) {
					window.Debug.writeln(a);
				} else if (window.console)
					window.console.log(a);
			if (FB.Event)
				FB.Event.fire('fb.log', a);
		},
		$ : function(a) {
			return document.getElementById(a);
		}
	};
FB.provide('Array', {
	indexOf : function(a, c) {
		if (a.indexOf)
			return a.indexOf(c);
		var d = a.length;
		if (d)
			for ( var b = 0; b < d; b++)
				if (a[b] === c)
					return b;
		return -1;
	},
	merge : function(c, b) {
		for ( var a = 0; a < b.length; a++)
			if (FB.Array.indexOf(c, b[a]) < 0)
				c.push(b[a]);
		return c;
	},
	filter : function(a, c) {
		var b = [];
		for ( var d = 0; d < a.length; d++)
			if (c(a[d]))
				b.push(a[d]);
		return b;
	},
	keys : function(c, d) {
		var a = [];
		for ( var b in c)
			if (d || c.hasOwnProperty(b))
				a.push(b);
		return a;
	},
	map : function(a, d) {
		var c = [];
		for ( var b = 0; b < a.length; b++)
			c.push(d(a[b]));
		return c;
	},
	forEach : function(c, a, f) {
		if (!c)
			return;
		if (Object.prototype.toString.apply(c) === '[object Array]'
				|| (!(c instanceof Function) && typeof c.length == 'number')) {
			if (c.forEach) {
				c.forEach(a);
			} else
				for ( var b = 0, e = c.length; b < e; b++)
					a(c[b], b, c);
		} else
			for ( var d in c)
				if (f || c.hasOwnProperty(d))
					a(c[d], d, c);
	}
});
FB.provide('QS', {
	encode : function(c, d, a) {
		d = d === undefined ? '&' : d;
		a = a === false ? function(e) {
			return e;
		} : encodeURIComponent;
		var b = [];
		FB.Array.forEach(c, function(f, e) {
			if (f !== null && typeof f != 'undefined')
				b.push(a(e) + '=' + a(f));
		});
		b.sort();
		return b.join(d);
	},
	decode : function(f) {
		var a = decodeURIComponent, d = {}, e = f.split('&'), b, c;
		for (b = 0; b < e.length; b++) {
			c = e[b].split('=', 2);
			if (c && c[0])
				d[a(c[0])] = a(c[1]);
		}
		return d;
	}
});
FB
		.provide(
				'Content',
				{
					_root : null,
					_hiddenRoot : null,
					_callbacks : {},
					append : function(a, c) {
						if (!c)
							if (!FB.Content._root) {
								FB.Content._root = c = FB.$('fb-root');
								if (!c) {
									FB
											.log('The "fb-root" div has not been created.');
									return;
								} else
									c.className += ' fb_reset';
							} else
								c = FB.Content._root;
						if (typeof a == 'string') {
							var b = document.createElement('div');
							c.appendChild(b).innerHTML = a;
							return b;
						} else
							return c.appendChild(a);
					},
					appendHidden : function(a) {
						if (!FB.Content._hiddenRoot) {
							var b = document.createElement('div'), c = b.style;
							c.position = 'absolute';
							c.top = '-10000px';
							c.width = c.height = 0;
							FB.Content._hiddenRoot = FB.Content.append(b);
						}
						return FB.Content.append(a, FB.Content._hiddenRoot);
					},
					insertIframe : function(e) {
						e.id = e.id || FB.guid();
						e.name = e.name || FB.guid();
						var a = FB.guid(), f = false, d = false;
						FB.Content._callbacks[a] = function() {
							if (f && !d) {
								d = true;
								e.onload && e.onload(e.root.firstChild);
							}
						};
						if (document.attachEvent) {
							var b = ('<iframe'
									+ ' id="'
									+ e.id
									+ '"'
									+ ' name="'
									+ e.name
									+ '"'
									+ (e.className ? ' class="' + e.className + '"'
											: '')
									+ ' style="border:none;'
									+ (e.width ? 'width:' + e.width + 'px;'
											: '')
									+ (e.height ? 'height:' + e.height + 'px;'
											: '') + '"' + ' src="' + e.url
									+ '"' + ' frameborder="0"'
									+ ' scrolling="no"'
									+ ' allowtransparency="true"'
									+ ' onload="FB.Content._callbacks.' + a
									+ '()"' + '></iframe>');
							e.root.innerHTML = '<iframe src="javascript:false"' + ' frameborder="0"' + ' scrolling="no"' + ' style="height:1px"></iframe>';
							f = true;
							window.setTimeout(function() {
								e.root.innerHTML = b;
							}, 0);
						} else {
							var c = document.createElement('iframe');
							c.id = e.id;
							c.name = e.name;
							c.onload = FB.Content._callbacks[a];
							c.style.border = 'none';
							c.style.overflow = 'hidden';
							if (e.className)
								c.className = e.className;
							if (e.height)
								c.style.height = e.height + 'px';
							if (e.width)
								c.style.width = e.width + 'px';
							e.root.appendChild(c);
							f = true;
							c.src = e.url;
						}
					},
					postTarget : function(b) {
						var a = document.createElement('form');
						a.action = b.url;
						a.target = b.target;
						a.method = 'POST';
						FB.Content.appendHidden(a);
						FB.Array.forEach(b.params, function(e, d) {
							if (e !== null && e !== undefined) {
								var c = document.createElement('input');
								c.name = d;
								c.value = e;
								a.appendChild(c);
							}
						});
						a.submit();
						a.parentNode.removeChild(a);
					}
				});
FB
		.provide(
				'Flash',
				{
					_minVersions : [ [ 9, 0, 159, 0 ], [ 10, 0, 22, 87 ] ],
					_swfPath : 'swf/XdComm.swf',
					_callbacks : [],
					init : function() {
						if (FB.Flash._init)
							return;
						FB.Flash._init = true;
						window.FB_OnFlashXdCommReady = function() {
							FB.Flash._ready = true;
							for ( var d = 0, e = FB.Flash._callbacks.length; d < e; d++)
								FB.Flash._callbacks[d]();
							FB.Flash._callbacks = [];
						};
						var a = !!document.attachEvent, c = FB._domain.cdn
								+ FB.Flash._swfPath, b = ('<object '
								+ 'type="application/x-shockwave-flash" '
								+ 'id="XdComm" '
								+ (a ? 'name="XdComm" ' : '')
								+ (a ? '' : 'data="' + c + '" ')
								+ (a ? 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '
										: '')
								+ 'allowscriptaccess="always">'
								+ '<param name="movie" value="'
								+ c
								+ '"></param>'
								+ '<param name="allowscriptaccess" value="always"></param>' + '</object>');
						FB.Content.appendHidden(b);
					},
					hasMinVersion : function() {
						if (typeof FB.Flash._hasMinVersion === 'undefined') {
							var k, a, b, j = [];
							try {
								k = new ActiveXObject(
										'ShockwaveFlash.ShockwaveFlash')
										.GetVariable('$version');
							} catch (x) {
								if (navigator.mimeTypes.length > 0) {
									var d = 'application/x-shockwave-flash';
									if (navigator.mimeTypes[d].enabledPlugin) {
										var f = 'Shockwave Flash';
										k = (navigator.plugins[f + ' 2.0'] || navigator.plugins[f]).description;
									}
								}
							}
							if (k) {
								var h = k.replace(/\D+/g, ',').match(
										/^,?(.+),?$/)[1].split(',');
								for (a = 0, b = h.length; a < b; a++)
									j.push(parseInt(h[a], 10));
							}
							FB.Flash._hasMinVersion = false;
							majorVersion: for (a = 0, b = FB.Flash._minVersions.length; a < b; a++) {
								var i = FB.Flash._minVersions[a];
								if (i[0] != j[0])
									continue;
								for ( var c = 1, e = i.length, g = j.length; (c < e && c < g); c++)
									if (j[c] < i[c]) {
										FB.Flash._hasMinVersion = false;
										continue majorVersion;
									} else {
										FB.Flash._hasMinVersion = true;
										if (j[c] > i[c])
											break majorVersion;
									}
							}
							;
						}
						return FB.Flash._hasMinVersion;
					},
					onReady : function(a) {
						FB.Flash.init();
						if (FB.Flash._ready) {
							window.setTimeout(a, 0);
						} else
							FB.Flash._callbacks.push(a);
					}
				});
if (!this.JSON)
	this.JSON = {};
(function() {
	function f(n) {
		return n < 10 ? '0' + n : n;
	}
	if (typeof Date.prototype.toJSON !== 'function') {
		Date.prototype.toJSON = function(key) {
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-'
					+ f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate())
					+ 'T' + f(this.getUTCHours()) + ':'
					+ f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds())
					+ 'Z' : null;
		};
		String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(
				key) {
			return this.valueOf();
		};
	}
	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
		'\b' : '\\b',
		'\t' : '\\t',
		'\n' : '\\n',
		'\f' : '\\f',
		'\r' : '\\r',
		'"' : '\\"',
		'\\' : '\\\\'
	}, rep;
	function quote(string) {
		escapable.lastIndex = 0;
		return escapable.test(string) ? '"' + string.replace(escapable,
				function(a) {
					var c = meta[a];
					return typeof c === 'string' ? c : '\\u' + ('0000' + a
							.charCodeAt(0).toString(16)).slice(-4);
				}) + '"' : '"' + string + '"';
	}
	function str(key, holder) {
		var i, k, v, length, mind = gap, partial, value = holder[key];
		if (value && typeof value === 'object'
				&& typeof value.toJSON === 'function')
			value = value.toJSON(key);
		if (typeof rep === 'function')
			value = rep.call(holder, key, value);
		switch (typeof value) {
		case 'string':
			return quote(value);
		case 'number':
			return isFinite(value) ? String(value) : 'null';
		case 'boolean':
		case 'null':
			return String(value);
		case 'object':
			if (!value)
				return 'null';
			gap += indent;
			partial = [];
			if (Object.prototype.toString.apply(value) === '[object Array]') {
				length = value.length;
				for (i = 0; i < length; i += 1)
					partial[i] = str(i, value) || 'null';
				v = partial.length === 0 ? '[]' : gap ? '[\n' + gap
						+ partial.join(',\n' + gap) + '\n' + mind + ']'
						: '[' + partial.join(',') + ']';
				gap = mind;
				return v;
			}
			if (rep && typeof rep === 'object') {
				length = rep.length;
				for (i = 0; i < length; i += 1) {
					k = rep[i];
					if (typeof k === 'string') {
						v = str(k, value);
						if (v)
							partial.push(quote(k) + (gap ? ': ' : ':') + v);
					}
				}
			} else
				for (k in value)
					if (Object.hasOwnProperty.call(value, k)) {
						v = str(k, value);
						if (v)
							partial.push(quote(k) + (gap ? ': ' : ':') + v);
					}
			v = partial.length === 0 ? '{}' : gap ? '{\n' + gap
					+ partial.join(',\n' + gap) + '\n' + mind + '}'
					: '{' + partial.join(',') + '}';
			gap = mind;
			return v;
		}
	}
	if (typeof JSON.stringify !== 'function')
		JSON.stringify = function(value, replacer, space) {
			var i;
			gap = '';
			indent = '';
			if (typeof space === 'number') {
				for (i = 0; i < space; i += 1)
					indent += ' ';
			} else if (typeof space === 'string')
				indent = space;
			rep = replacer;
			if (replacer
					&& typeof replacer !== 'function'
					&& (typeof replacer !== 'object' || typeof replacer.length !== 'number'))
				throw new Error('JSON.stringify');
			return str('', {
				'' : value
			});
		};
	if (typeof JSON.parse !== 'function')
		JSON.parse = function(text, reviver) {
			var j;
			function walk(holder, key) {
				var k, v, value = holder[key];
				if (value && typeof value === 'object')
					for (k in value)
						if (Object.hasOwnProperty.call(value, k)) {
							v = walk(value, k);
							if (v !== undefined) {
								value[k] = v;
							} else
								delete value[k];
						}
				return reviver.call(holder, key, value);
			}
			cx.lastIndex = 0;
			if (cx.test(text))
				text = text.replace(cx, function(a) {
					return '\\u' + ('0000' + a.charCodeAt(0).toString(16))
							.slice(-4);
				});
			if (/^[\],:{}\s]*$/
					.test(text
							.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
							.replace(
									/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
									']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
				j = eval('(' + text + ')');
				return typeof reviver === 'function' ? walk( {
					'' : j
				}, '') : j;
			}
			throw new SyntaxError('JSON.parse');
		};
}());
FB.provide('JSON', {
	stringify : function(a) {
		if (window.Prototype && Object.toJSON) {
			return Object.toJSON(a);
		} else
			return JSON.stringify(a);
	},
	//JOHANNES
	parse : function(a){if($chk(a))return JSON.parse(a); else return a;}
	,
	flatten : function(c) {
		var a = {};
		for ( var b in c)
			if (c.hasOwnProperty(b)) {
				var d = c[b];
				if (null === d || undefined === d) {
					continue;
				} else if (typeof d == 'string') {
					a[b] = d;
				} else
					a[b] = FB.JSON.stringify(d);
			}
		return a;
	}
});
FB.provide('', {
	api : function() {
		if (typeof arguments[0] === 'string') {
			FB.ApiServer.graph.apply(FB.ApiServer, arguments);
		} else
			FB.ApiServer.rest.apply(FB.ApiServer, arguments);
	}
});
FB.provide('ApiServer', {
	METHODS : [ 'get', 'post', 'delete', 'put' ],
	_callbacks : {},
	_readOnlyCalls : {
		fql_query : true,
		fql_multiquery : true,
		friends_get : true,
		notifications_get : true,
		stream_get : true,
		users_getinfo : true
	},
	graph : function() {
		var a = Array.prototype.slice.call(arguments), f = a.shift(), d = a
				.shift(), c, e, b;
		while (d) {
			var g = typeof d;
			if (g === 'string' && !c) {
				c = d.toLowerCase();
			} else if (g === 'function' && !b) {
				b = d;
			} else if (g === 'object' && !e) {
				e = d;
			} else {
				FB.log('Invalid argument passed to FB.api(): ' + d);
				return;
			}
			d = a.shift();
		}
		c = c || 'get';
		e = e || {};
		if (f[0] === '/')
			f = f.substr(1);
		if (FB.Array.indexOf(FB.ApiServer.METHODS, c) < 0) {
			FB.log('Invalid method passed to FB.api(): ' + c);
			return;
		}
		FB.ApiServer.oauthRequest('graph', f, c, e, b);
	},
	rest : function(e, a) {
		var c = e.method.toLowerCase().replace('.', '_');
		if (FB.Auth && c === 'auth_revokeauthorization') {
			var d = a;
			a = function(f) {
				if (f === true)
					FB.Auth.setSession(null, 'notConnected');
				d && d(f);
			};
		}
		e.format = 'json-strings';
		e.api_key = FB._apiKey;
		var b = FB.ApiServer._readOnlyCalls[c] ? 'api_read' : 'api';
		FB.ApiServer.oauthRequest(b, 'restserver.php', 'get', e, a);
	},
	oauthRequest : function(b, e, c, d, a) {
		if (FB._session && FB._session.access_token && !d.access_token)
			d.access_token = FB._session.access_token;
		d.sdk = 'joey';
		try {
			FB.ApiServer.jsonp(b, e, c, FB.JSON.flatten(d), a);
		} catch (x) {
			if (FB.Flash.hasMinVersion()) {
				FB.ApiServer.flash(b, e, c, FB.JSON.flatten(d), a);
			} else
				throw new Error('Flash is required for this API call.');
		}
	},
	jsonp : function(b, f, d, e, a) {
		var c = FB.guid(), g = document.createElement('script');
		if (b === 'graph' && d !== 'get')
			e.method = d;
		e.callback = 'FB.ApiServer._callbacks.' + c;
		var h = (FB._domain[b] + f + (f.indexOf('?') > -1 ? '&' : '?') + FB.QS
				.encode(e));
		if (h.length > 2000)
			throw new Error(
					'JSONP only support a maximum of 2000 bytes of input.');
		FB.ApiServer._callbacks[c] = function(i) {
			a && a(i);
			delete FB.ApiServer._callbacks[c];
			g.parentNode.removeChild(g);
		};
		g.src = h;
		document.getElementsByTagName('head')[0].appendChild(g);
	},
	flash : function(b, e, c, d, a) {
		if (!window.FB_OnXdHttpResult)
			window.FB_OnXdHttpResult = function(g, f) {
				FB.ApiServer._callbacks[g](decodeURIComponent(f));
			};
		FB.Flash.onReady(function() {
			var h = FB._domain[b] + e, f = FB.QS.encode(d);
			if (c === 'get') {
				if (h.length + f.length > 2000) {
					if (b === 'graph')
						d.method = 'get';
					c = 'post';
					f = FB.QS.encode(d);
				} else {
					h += (h.indexOf('?') > -1 ? '&' : '?') + f;
					f = '';
				}
			} else if (c !== 'post') {
				if (b === 'graph')
					d.method = c;
				c = 'post';
				f = FB.QS.encode(d);
			}
			var g = document.XdComm.sendXdHttpRequest(c.toUpperCase(), h, f,
					null);
			FB.ApiServer._callbacks[g] = function(i) {
				a && a(FB.JSON.parse(i));
				delete FB.ApiServer._callbacks[g];
			};
		});
	}
});
FB.provide('EventProvider', {
	subscribers : function() {
		if (!this._subscribersMap)
			this._subscribersMap = {};
		return this._subscribersMap;
	},
	subscribe : function(b, a) {
		var c = this.subscribers();
		if (!c[b]) {
			c[b] = [ a ];
		} else
			c[b].push(a);
	},
	unsubscribe : function(b, a) {
		var c = this.subscribers()[b];
		FB.Array.forEach(c, function(e, d) {
			if (e == a)
				c[d] = null;
		});
	},
	monitor : function(d, a) {
		if (!a()) {
			var b = this, c = function() {
				if (a.apply(a, arguments))
					b.unsubscribe(d, c);
			};
			this.subscribe(d, c);
		}
	},
	clear : function(a) {
		delete this.subscribers()[a];
	},
	fire : function() {
		var a = Array.prototype.slice.call(arguments), b = a.shift();
		FB.Array.forEach(this.subscribers()[b], function(c) {
			if (c)
				c.apply(this, a);
		});
	}
});
FB.provide('Event', FB.EventProvider);
FB
		.provide(
				'Intl',
				{
					_punctCharClass : ('[' + '.!?' + '\u3002' + '\uFF01'
							+ '\uFF1F' + '\u0964' + '\u2026' + '\u0EAF'
							+ '\u1801' + '\u0E2F' + '\uFF0E' + ']'),
					_endsInPunct : function(a) {
						if (typeof a != 'string')
							return false;
						return a.match(new RegExp(FB.Intl._punctCharClass + '['
								+ ')"' + "'" + '\u00BB' + '\u0F3B' + '\u0F3D'
								+ '\u2019' + '\u201D' + '\u203A' + '\u3009'
								+ '\u300B' + '\u300D' + '\u300F' + '\u3011'
								+ '\u3015' + '\u3017' + '\u3019' + '\u301B'
								+ '\u301E' + '\u301F' + '\uFD3F' + '\uFF07'
								+ '\uFF09' + '\uFF3D' + '\s' + ']*$'));
					},
					_tx : function(d, a) {
						if (a !== undefined)
							if (typeof a != 'object') {
								FB
										.log('The second arg to FB.Intl._tx() must be an Object for ' + 'tx(' + d + ', ...)');
							} else {
								var c;
								for ( var b in a)
									if (a.hasOwnProperty(b)) {
										if (FB.Intl._endsInPunct(a[b])) {
											c = new RegExp('\{' + b + '\}'
													+ FB.Intl._punctCharClass
													+ '*', 'g');
										} else
											c = new RegExp('\{' + b + '\}', 'g');
										d = d.replace(c, a[b]);
									}
							}
						return d;
					},
					tx : function(b, a) {
						function c(e, d) {
							void (0);
						}
						if (!FB.Intl._stringTable)
							return null;
						return FBIntern.Intl._tx(FB.Intl._stringTable[b], a);
					}
				});
FB.provide('String', {
	trim : function(a) {
		return a.replace(/^\s*|\s*$/g, '');
	},
	format : function(a) {
		if (!FB.String.format._formatRE)
			FB.String.format._formatRE = /(\{[^\}^\{]+\})/g;
		var b = arguments;
		return a.replace(FB.String.format._formatRE, function(e, d) {
			var c = parseInt(d.substr(1), 10), f = b[c + 1];
			if (f === null || f === undefined)
				return '';
			return f.toString();
		});
	},
	quote : function(c) {
		var a = /["\\\x00-\x1f\x7f-\x9f]/g, b = {
			'\b' : '\\b',
			'\t' : '\\t',
			'\n' : '\\n',
			'\f' : '\\f',
			'\r' : '\\r',
			'"' : '\\"',
			'\\' : '\\\\'
		};
		return a.test(c) ? '"' + c.replace(a, function(d) {
			var e = b[d];
			if (e)
				return e;
			e = d.charCodeAt();
			return '\\u00' + Math.floor(e / 16).toString(16)
					+ (e % 16).toString(16);
		}) + '"' : '"' + c + '"';
	}
});
FB
		.provide(
				'Dom',
				{
					containsCss : function(c, a) {
						var b = ' ' + c.className + ' ';
						return b.indexOf(' ' + a + ' ') >= 0;
					},
					addCss : function(b, a) {
						if (!FB.Dom.containsCss(b, a))
							b.className = b.className + ' ' + a;
					},
					removeCss : function(b, a) {
						if (FB.Dom.containsCss(b, a)) {
							b.className = b.className.replace(a, '');
							FB.Dom.removeCss(b, a);
						}
					},
					getStyle : function(a, c) {
						var d = false, b = a.style;
						if (c == 'opacity') {
							if (b.opacity)
								return b.opacity * 100;
							if (b.MozOpacity)
								return b.MozOpacity * 100;
							if (b.KhtmlOpacity)
								return b.KhtmlOpacity * 100;
							if (b.filters)
								return b.filters.alpha.opacity;
							return 0;
						} else if (a.currentStyle) {
							FB.Array.forEach(c.match(/\-([a-z])/g),
									function(e) {
										c = c.replace(e, e.substr(1, 1)
												.toUpperCase());
									});
							d = a.currentStyle[c];
						} else {
							FB.Array.forEach(c.match(/[A-Z]/g), function(e) {
								c = c.replace(e, '-' + e.toLowerCase());
							});
							if (window.getComputedStyle) {
								d = document.defaultView.getComputedStyle(a,
										null).getPropertyValue(c);
								if (c == 'background-position-y'
										|| c == 'background-position-x')
									if (d == 'top' || d == 'left')
										d = '0px';
							}
						}
						return d;
					},
					setStyle : function(a, c, d) {
						var b = a.style;
						if (c == 'opacity') {
							if (d >= 100)
								d = 99.999;
							if (d < 0)
								d = 0;
							b.opacity = d / 100;
							b.MozOpacity = d / 100;
							b.KhtmlOpacity = d / 100;
							if (b.filters)
								b.filters.alpha.opacity = d;
						} else
							b[c] = d;
					},
					addScript : function(b) {
						var a = document.createElement('script');
						a.type = "text/javascript";
						a.src = b;
						return document.getElementsByTagName('HEAD')[0]
								.appendChild(a);
					},
					addCssRules : function(d, b) {
						if (!FB.Dom._cssRules)
							FB.Dom._cssRules = {};
						var a = true;
						FB.Array.forEach(b, function(e) {
							if (!(e in FB.Dom._cssRules)) {
								a = false;
								FB.Dom._cssRules[e] = true;
							}
						});
						if (a)
							return;
						if (FB.Dom.getBrowserType() != 'ie') {
							var c = document.createElement('style');
							c.type = 'text/css';
							c.textContent = d;
							document.getElementsByTagName('HEAD')[0]
									.appendChild(c);
						} else
							try {
								document.createStyleSheet().cssText = d;
							} catch (exc) {
								if (document.styleSheets[0])
									document.styleSheets[0].cssText += d;
							}
					},
					getBrowserType : function() {
						if (!FB.Dom._browserType) {
							var d = window.navigator.userAgent.toLowerCase(), b = [
									'msie', 'firefox', 'safari', 'gecko' ], c = [
									'ie', 'mozilla', 'safari', 'mozilla' ];
							for ( var a = 0; a < b.length; a++)
								if (d.indexOf(b[a]) >= 0) {
									FB.Dom._browserType = c[a];
									break;
								}
						}
						return FB.Dom._browserType;
					},
					getViewportInfo : function() {
						var a = (document.documentElement && document.compatMode == 'CSS1Compat') ? document.documentElement
								: document.body;
						return {
							scrollTop : a.scrollTop,
							scrollLeft : a.scrollLeft,
							width : self.innerWidth ? self.innerWidth
									: a.clientWidth,
							height : self.innerHeight ? self.innerHeight
									: a.clientHeight
						};
					},
					ready : function(a) {
						if (FB.Dom._isReady) {
							a();
						} else
							FB.Event.subscribe('dom.ready', a);
					}
				});
(function() {
	function domReady() {
		FB.Dom._isReady = true;
		FB.Event.fire('dom.ready');
		FB.Event.clear('dom.ready');
	}
	if (FB.Dom._isReady || document.readyState == 'complete')
		return domReady();
	if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', domReady, false);
	} else if (document.attachEvent)
		document.attachEvent('onreadystatechange', domReady);
	if (FB.Dom.getBrowserType() == 'ie' && window === top)
		(function() {
			try {
				document.documentElement.doScroll('left');
			} catch (error) {
				setTimeout(arguments.callee, 0);
				return;
			}
			domReady();
		})();
	var oldonload = window.onload;
	window.onload = function() {
		domReady();
		if (oldonload)
			if (typeof oldonload == 'string') {
				eval(oldonload);
			} else
				oldonload();
	};
})();
FB
		.provide(
				'Dialog',
				{
					_loaderEl : null,
					_stack : [],
					_active : null,
					_findRoot : function(a) {
						while (a) {
							if (FB.Dom.containsCss(a, 'fb_dialog'))
								return a;
							a = a.parentNode;
						}
					},
					_showLoader : function(a) {
						if (!FB.Dialog._loaderEl)
							FB.Dialog._loaderEl = FB.Dialog
									._findRoot(FB.Dialog
											.create( {
												content : ('<div class="fb_dialog_loader">' + FB.Intl
														._tx("Loading...") + '<a id="fb_dialog_loader_close"></a>' + '</div>')
											}));
						var b = FB.$('fb_dialog_loader_close');
						if (a) {
							FB.Dom.removeCss(b, 'fb_hidden');
							b.onclick = function() {
								FB.Dialog._hideLoader();
								a();
							};
						} else {
							FB.Dom.addCss(b, 'fb_hidden');
							b.onclick = null;
						}
						FB.Dialog._makeActive(FB.Dialog._loaderEl);
					},
					_hideLoader : function() {
						if (FB.Dialog._loaderEl
								&& FB.Dialog._loaderEl == FB.Dialog._active)
							FB.Dialog._loaderEl.style.top = '-10000px';
					},
					_makeActive : function(b) {
						FB.Dialog._lowerActive();
						var a = {
							width : parseInt(b.offsetWidth, 10),
							height : parseInt(b.offsetHeight, 10)
						}, e = FB.Dom.getViewportInfo(), c = (e.scrollLeft + (e.width - a.width) / 2), d = (e.scrollTop + (e.height - a.height) / 2.5);
						b.style.left = (c > 0 ? c : 0) + 'px';
						b.style.top = (d > 0 ? d : 0) + 'px';
						FB.Dialog._active = b;
					},
					_lowerActive : function() {
						if (!FB.Dialog._active)
							return;
						FB.Dialog._active.style.top = '-10000px';
						FB.Dialog._active = null;
					},
					_removeStacked : function(a) {
						FB.Dialog._stack = FB.Array.filter(FB.Dialog._stack,
								function(b) {
									return b != a;
								});
					},
					create : function(e) {
						e = e || {};
						if (e.loader)
							FB.Dialog._showLoader(e.onClose);
						var d = document.createElement('div'), c = document
								.createElement('div'), a = 'fb_dialog';
						if (e.closeIcon && e.onClose) {
							var b = document.createElement('a');
							b.className = 'fb_dialog_close_icon';
							b.onclick = e.onClose;
							d.appendChild(b);
						}
						if (FB.Dom.getBrowserType() == 'ie') {
							a += ' fb_dialog_legacy';
							FB.Array.forEach(
									[ 'vert_left', 'vert_right', 'horiz_top',
											'horiz_bottom', 'top_left',
											'top_right', 'bottom_left',
											'bottom_right' ], function(f) {
										var g = document.createElement('span');
										g.className = 'fb_dialog_' + f;
										d.appendChild(g);
									});
						} else
							a += ' fb_dialog_advanced';
						if (e.content)
							FB.Content.append(e.content, c);
						d.className = a;
						c.className = 'fb_dialog_content';
						d.appendChild(c);
						FB.Content.append(d);
						if (e.visible)
							FB.Dialog.show(d);
						return c;
					},
					show : function(a) {
						a = FB.Dialog._findRoot(a);
						if (a) {
							FB.Dialog._removeStacked(a);
							FB.Dialog._hideLoader();
							FB.Dialog._makeActive(a);
							FB.Dialog._stack.push(a);
						}
					},
					remove : function(a) {
						a = FB.Dialog._findRoot(a);
						if (a) {
							var b = FB.Dialog._active == a;
							FB.Dialog._removeStacked(a);
							if (b)
								if (FB.Dialog._stack.length > 0) {
									FB.Dialog.show(FB.Dialog._stack.pop());
								} else
									FB.Dialog._lowerActive();
							window.setTimeout(function() {
								a.parentNode.removeChild(a);
							}, 3000);
						}
					}
				});
FB
		.provide(
				'XD',
				{
					_origin : null,
					_transport : null,
					_callbacks : {},
					_forever : {},
					init : function(a) {
						if (FB.XD._origin)
							return;
						if (window.addEventListener && window.postMessage) {
							FB.XD._origin = (window.location.protocol + '//'
									+ window.location.host + '/' + FB.guid());
							FB.XD.PostMessage.init();
							FB.XD._transport = 'postmessage';
						} else if (!a && FB.Flash.hasMinVersion()) {
							FB.XD._origin = (window.location.protocol + '//'
									+ document.domain + '/' + FB.guid());
							FB.XD.Flash.init();
							FB.XD._transport = 'flash';
						} else {
							FB.XD._transport = 'fragment';
							FB.XD.Fragment._channelUrl = a
									|| window.location.toString();
						}
					},
					resolveRelation : function(b) {
						var g, d, f = b.split('.'), e = window;
						for ( var a = 0, c = f.length; a < c; a++) {
							g = f[a];
							if (g === 'opener' || g === 'parent' || g === 'top') {
								e = e[g];
							} else if (d = /^frames\[['"]?([a-zA-Z0-9-_]+)['"]?\]$/
									.exec(g)) {
								e = e.frames[d[1]];
							} else
								throw new SyntaxError(
										'Malformed id to resolve: ' + b
												+ ', pt: ' + g);
						}
						return e;
					},
					handler : function(a, e, b) {
						if (window.location.toString().indexOf(
								FB.XD.Fragment._magic) > 0)
							return 'javascript:false;//';
						var f = FB._domain.cdn + 'connect/xd_proxy.php#?=&', c = FB
								.guid();
						if (FB.XD._transport == 'fragment') {
							f = FB.XD.Fragment._channelUrl;
							var d = f.indexOf('#');
							if (d > 0)
								f = f.substr(0, d);
							f += ((f.indexOf('?') < 0 ? '?' : '&')
									+ FB.XD.Fragment._magic + '#?=&');
						}
						if (b)
							FB.XD._forever[c] = true;
						FB.XD._callbacks[c] = a;
						return f + FB.QS.encode( {
							cb : c,
							origin : FB.XD._origin,
							relation : e || 'opener',
							transport : FB.XD._transport
						});
					},
					recv : function(b) {
						if (typeof b == 'string')
							b = FB.QS.decode(b);
						var a = FB.XD._callbacks[b.cb];
						if (!FB.XD._forever[b.cb])
							delete FB.XD._callbacks[b.cb];
						a && a(b);
					},
					PostMessage : {
						init : function() {
							var a = FB.XD.PostMessage.onMessage;
							window.addEventListener ? window.addEventListener(
									'message', a, false) : window.attachEvent(
									'onmessage', a);
						},
						onMessage : function(event) {
							FB.XD.recv(event.data);
						}
					},
					Flash : {
						init : function() {
							FB.Flash
									.onReady(function() {
										document.XdComm.postMessage_init(
												'FB.XD.Flash.onMessage',
												FB.XD._origin);
									});
						},
						onMessage : function(a) {
							FB.XD.recv(decodeURIComponent(a));
						}
					},
					Fragment : {
						_magic : 'fb_xd_fragment',
						checkAndDispatch : function() {
							var b = window.location.toString(), a = b.substr(b
									.indexOf('#') + 1), c = b
									.indexOf(FB.XD.Fragment._magic);
							if (c > 0) {
								FB.init = FB.getLoginStatus = FB.api = function() {
								};
								document.documentElement.style.display = 'none';
								FB.XD.resolveRelation(FB.QS.decode(a).relation).FB.XD
										.recv(a);
							}
						}
					}
				});
FB.XD.Fragment.checkAndDispatch();
FB.provide('', {
	ui : function(e, b) {
		if (!e.method) {
			FB.log('"method" is a required parameter for FB.ui().');
			return;
		}
		var a = FB.UIServer.prepareCall(e, b);
		if (!a)
			return;
		var d = a.params.display;
		if (d == 'dialog')
			d = 'iframe';
		var c = FB.UIServer[d];
		if (!c) {
			FB.log('"display" must be one of "popup", "iframe" or "hidden".');
			return;
		}
		c(a);
	}
});
FB
		.provide(
				'UIServer',
				{
					Methods : {},
					_active : {},
					_defaultCb : {},
					_resultToken : '"xxRESULTTOKENxx"',
					genericTransform : function(a) {
						if (a.params.display == 'dialog') {
							a.params.display = 'iframe';
							a.params.channel = FB.UIServer._xdChannelHandler(
									a.id, 'parent.parent');
						}
						return a;
					},
					prepareCall : function(f, b) {
						var e = FB.UIServer.Methods[f.method.toLowerCase()], d = FB
								.guid();
						if (!e) {
							FB.log('"' + f.method + '" is an unknown method.');
							return;
						}
						FB.copy(f, {
							api_key : FB._apiKey,
							display : FB._session ? 'dialog' : 'popup',
							locale : FB._locale,
							sdk : 'joey',
							session_key : FB._session
									&& FB._session.session_key
						});
						if (!FB._session && f.display == 'dialog'
								&& !e.loggedOutIframe) {
							FB
									.log('"dialog" mode can only be used when the user is connected.');
							f.display = 'popup';
						}
						var a = {
							cb : b,
							id : d,
							size : e.size || {},
							url : FB._domain.www + e.url,
							params : f
						};
						if (e.transform) {
							a = e.transform(a);
							if (!a)
								return;
						}
						var g = a.params.display == 'popup' ? 'opener'
								: 'parent';
						if (!(a.id in FB.UIServer._defaultCb)
								&& !('next' in a.params))
							a.params.next = FB.UIServer._xdResult(a.cb, a.id,
									g, true);
						if (g === 'parent')
							a.params.channel_url = FB.UIServer
									._xdChannelHandler(d, 'parent.parent');
						var c = FB.QS.encode(FB.JSON.flatten(a.params));
						if ((a.url + c).length > 2000) {
							a.post = true;
						} else if (c)
							a.url += '?' + c;
						return a;
					},
					popup : function(a) {
						var g = typeof window.screenX != 'undefined' ? window.screenX
								: window.screenLeft, h = typeof window.screenY != 'undefined' ? window.screenY
								: window.screenTop, f = typeof window.outerWidth != 'undefined' ? window.outerWidth
								: document.documentElement.clientWidth, e = typeof window.outerHeight != 'undefined' ? window.outerHeight
								: (document.documentElement.clientHeight - 22), j = a.size.width, c = a.size.height, d = parseInt(
								g + ((f - j) / 2), 10), i = parseInt(h
								+ ((e - c) / 2.5), 10), b = ('width=' + j
								+ ',height=' + c + ',left=' + d + ',top=' + i);
						if (a.post) {
							FB.UIServer._active[a.id] = window.open(
									'about:blank', a.id, b);
							FB.Content.postTarget( {
								url : a.url,
								target : a.id,
								params : a.params
							});
						} else
							FB.UIServer._active[a.id] = window.open(a.url,
									a.id, b);
						if (a.id in FB.UIServer._defaultCb)
							FB.UIServer._popupMonitor();
					},
					hidden : function(a) {
						a.className = 'FB_UI_Hidden';
						a.root = FB.Content.appendHidden('');
						FB.UIServer._insertIframe(a);
					},
					iframe : function(a) {
						a.className = 'FB_UI_Dialog';
						a.root = FB.Dialog.create( {
							onClose : function() {
								FB.UIServer._triggerDefault(a.id);
							},
							loader : true,
							closeIcon : true
						});
						FB.Dom.addCss(a.root, 'fb_dialog_iframe');
						FB.UIServer._insertIframe(a);
					},
					_insertIframe : function(a) {
						if (a.post) {
							FB.Content.insertIframe( {
								url : 'about:blank',
								root : a.root,
								className : a.className,
								width : a.size.width,
								height : a.size.height,
								onload : function(b) {
									FB.UIServer._active[a.id] = b;
									FB.Content.postTarget( {
										url : a.url,
										target : b.name,
										params : a.params
									});
								}
							});
						} else
							FB.Content.insertIframe( {
								url : a.url,
								root : a.root,
								className : a.className,
								width : a.size.width,
								height : a.size.height,
								onload : function(b) {
									FB.UIServer._active[a.id] = b;
								}
							});
					},
					_triggerDefault : function(a) {
						FB.UIServer._xdRecv( {
							frame : a
						}, FB.UIServer._defaultCb[a] || function() {
						});
					},
					_popupMonitor : function() {
						var a;
						for ( var b in FB.UIServer._active)
							if (FB.UIServer._active.hasOwnProperty(b)
									&& b in FB.UIServer._defaultCb) {
								var c = FB.UIServer._active[b];
								try {
									//Johannes
									//if (c.tagName)
									//	continue;
								} catch (x) {
								}
								try {
									if (c.closed) {
										FB.UIServer._triggerDefault(b);
									} else
										a = true;
								} catch (y) {
								}
							}
						if (a && !FB.UIServer._popupInterval) {
							FB.UIServer._popupInterval = window.setInterval(
									FB.UIServer._popupMonitor, 100);
						} else if (!a && FB.UIServer._popupInterval) {
							window.clearInterval(FB.UIServer._popupInterval);
							FB.UIServer._popupInterval = null;
						}
					},
					_xdChannelHandler : function(a, b) {
						return FB.XD.handler(function(c) {
							var d = FB.UIServer._active[a];
							if (!d)
								return;
							if (c.type == 'resize') {
								if (c.height)
									d.style.height = c.height + 'px';
								if (c.width)
									d.style.width = c.width + 'px';
								FB.Dialog.show(d);
							}
						}, b, true);
					},
					_xdNextHandler : function(a, b, d, c) {
						if (c)
							FB.UIServer._defaultCb[b] = a;
						return FB.XD.handler(function(e) {
							FB.UIServer._xdRecv(e, a);
						}, d) + '&frame=' + b;
					},
					_xdRecv : function(b, a) {
						var c = FB.UIServer._active[b.frame];
						try {
							if (FB.Dom.containsCss(c, 'FB_UI_Hidden')) {
								window.setTimeout(function() {
									c.parentNode.parentNode
											.removeChild(c.parentNode);
								}, 3000);
							} else if (FB.Dom.containsCss(c, 'FB_UI_Dialog'))
								FB.Dialog.remove(c);
						} catch (x) {
						}
						try {
							if (c.close) {
								c.close();
								FB.UIServer._popupCount--;
							}
						} catch (y) {
						}
						delete FB.UIServer._active[b.frame];
						delete FB.UIServer._defaultCb[b.frame];
						a(b);
					},
					_xdResult : function(a, b, d, c) {
						return (FB.UIServer
								._xdNextHandler(
										function(e) {
											a
													&& a(e.result
															&& e.result != FB.UIServer._resultToken
															&& JSON
																	.parse(e.result));
										}, b, d, c) + '&result=' + encodeURIComponent(FB.UIServer._resultToken));
					}
				});
FB.provide('', {
	getLoginStatus : function(a, b) {
		if (!FB._apiKey) {
			FB.log('FB.getLoginStatus() called before calling FB.init().');
			return;
		}
		if (a)
			if (!b && FB.Auth._loadState == 'loaded') {
				a( {
					status : FB._userStatus,
					session : FB._session
				});
				return;
			} else
				FB.Event.subscribe('FB.loginStatus', a);
		if (!b && FB.Auth._loadState == 'loading')
			return;
		FB.Auth._loadState = 'loading';
		var c = function(d) {
			FB.Auth._loadState = 'loaded';
			FB.Event.fire('FB.loginStatus', d);
			FB.Event.clear('FB.loginStatus');
		};
		FB.ui( {
			method : 'auth.status',
			display : 'hidden'
		}, c);
	},
	getSession : function() {
		return FB._session;
	},
	login : function(a, b) {
		b = FB.copy( {
			method : 'auth.login',
			display : 'popup'
		}, b || {});
		FB.ui(b, a);
	},
	logout : function(a) {
		FB.ui( {
			method : 'auth.logout',
			display : 'hidden'
		}, a);
	}
});
FB
		.provide(
				'Auth',
				{
					_callbacks : [],
					setSession : function(e, g) {
						var b = !FB._session && e, c = FB._session && !e, a = FB._session
								&& e && FB._session.uid != e.uid, f = b
								|| c
								|| (FB._session && e && FB._session.session_key != e.session_key), h = g != FB._userStatus;
						var d = {
							session : e,
							status : g
						};
						FB._session = e;
						FB._userStatus = g;
						if (f && FB.Cookie && FB.Cookie.getEnabled())
							FB.Cookie.set(e);
						if (h)
							FB.Event.fire('auth.statusChange', d);
						if (c || a)
							FB.Event.fire('auth.logout', d);
						if (b || a)
							FB.Event.fire('auth.login', d);
						if (f)
							FB.Event.fire('auth.sessionChange', d);
						return d;
					},
					xdHandler : function(a, b, f, c, e, d) {
						return FB.UIServer._xdNextHandler(function(g) {
							try {
								d = FB.JSON.parse(g.session);
							} catch (x) {
							}
							var h = FB.Auth.setSession(d || null, e);
							h.perms = (g.result != 'xxRESULTTOKENxx'
									&& g.result || '');
							a && a(h);
						}, b, f, c) + '&result=xxRESULTTOKENxx';
					}
				});
FB
		.provide(
				'UIServer.Methods',
				{
					'auth.login' : {
						size : {
							width : 627,
							height : 326
						},
						url : 'login.php',
						transform : function(a) {
							if (!FB._apiKey) {
								FB
										.log('FB.login() called before calling FB.init().');
								return;
							}
							if (FB._session && !a.params.perms) {
								FB
										.log('FB.login() called when user is already connected.');
								a.cb && a.cb( {
									status : FB._userStatus,
									session : FB._session
								});
								return;
							}
							var g = FB.Auth.xdHandler, c = a.cb, d = a.id, f = FB._session, b = g(
									c, d, 'opener', true, FB._userStatus, f), e = g(
									c, d, 'opener', false, 'connected', f);
							FB
									.copy(
											a.params,
											{
												cancel_url : b,
												channel_url : window.location
														.toString(),
												next : e,
												fbconnect : FB._inCanvas ? 0
														: 1,
												req_perms : a.params.perms,
												enable_profile_selector : a.params.enable_profile_selector,
												profile_selector_ids : a.params.profile_selector_ids,
												return_session : 1,
												session_version : 3,
												v : '1.0'
											});
							delete a.cb;
							delete a.params.perms;
							return a;
						}
					},
					'auth.logout' : {
						url : 'logout.php',
						transform : function(a) {
							if (!FB._apiKey) {
								FB
										.log('FB.logout() called before calling FB.init().');
							} else if (!FB._session) {
								FB.log('FB.logout() called without a session.');
							} else {
								a.params.next = FB.Auth.xdHandler(a.cb, a.id,
										'parent', false, 'unknown');
								return a;
							}
						}
					},
					'auth.status' : {
						url : 'extern/login_status.php',
						transform : function(a) {
							var b = a.cb, c = a.id, d = FB.Auth.xdHandler;
							delete a.cb;
							FB.copy(a.params, {
								no_session : d(b, c, 'parent', false,
										'notConnected'),
								no_user : d(b, c, 'parent', false, 'unknown'),
								ok_session : d(b, c, 'parent', false,
										'connected'),
								session_version : 3,
								extern : FB._inCanvas ? 0 : 2
							});
							return a;
						}
					}
				});
FB.provide('', {
	bind : function() {
		var a = Array.prototype.slice.call(arguments), c = a.shift(), b = a
				.shift();
		return function() {
			return c.apply(b, a.concat(Array.prototype.slice.call(arguments)));
		};
	},
	Class : function(b, a, d) {
		if (FB.CLASSES[b])
			return FB.CLASSES[b];
		var c = a || function() {
		};
		c.prototype = d;
		c.prototype.bind = function(e) {
			return FB.bind(e, this);
		};
		c.prototype.constructor = c;
		FB.create(b, c);
		FB.CLASSES[b] = c;
		return c;
	},
	subclass : function(d, b, c, e) {
		if (FB.CLASSES[d])
			return FB.CLASSES[d];
		var a = FB.create(b);
		FB.copy(e, a.prototype);
		e._base = a;
		e._callBase = function(g) {
			var f = Array.prototype.slice.call(arguments, 1);
			return a.prototype[g].apply(this, f);
		};
		return FB.Class(d, c ? c : function() {
			if (a.apply)
				a.apply(this, arguments);
		}, e);
	},
	CLASSES : {}
});
FB.provide('Type', {
	isType : function(a, b) {
		while (a)
			if (a.constructor === b || a === b) {
				return true;
			} else
				a = a._base;
		return false;
	}
});
FB.Class('Obj', null, FB.copy( {
	setProperty : function(a, b) {
		if (FB.JSON.stringify(b) != FB.JSON.stringify(this[a])) {
			this[a] = b;
			this.fire(a, b);
		}
	}
}, FB.EventProvider));
FB.subclass('Waitable', 'Obj', function() {
}, {
	set : function(a) {
		this.setProperty('value', a);
	},
	error : function(a) {
		this.fire("error", a);
	},
	wait : function(a, b) {
		if (b)
			this.subscribe('error', b);
		this.monitor('value', this.bind(function() {
			if (this.value !== undefined) {
				a(this.value);
				return true;
			}
		}));
	}
});
FB
		.subclass(
				'Data.Query',
				'Waitable',
				function() {
					if (!FB.Data.Query._c)
						FB.Data.Query._c = 1;
					this.name = 'v_' + FB.Data.Query._c++;
				},
				{
					parse : function(a) {
						var b = FB.String.format.apply(null, a), d = (/^select (.*?) from (\w+)\s+where (.*)$/i)
								.exec(b);
						this.fields = this._toFields(d[1]);
						this.table = d[2];
						this.where = this._parseWhere(d[3]);
						for ( var c = 1; c < a.length; c++)
							if (FB.Type.isType(a[c], FB.Data.Query))
								a[c].hasDependency = true;
						return this;
					},
					toFql : function() {
						var a = 'select ' + this.fields.join(',') + ' from '
								+ this.table + ' where ';
						switch (this.where.type) {
						case 'unknown':
							a += this.where.value;
							break;
						case 'index':
							a += this.where.key + '='
									+ this._encode(this.where.value);
							break;
						case 'in':
							if (this.where.value.length == 1) {
								a += this.where.key + '='
										+ this._encode(this.where.value[0]);
							} else
								a += this.where.key
										+ ' in ('
										+ FB.Array.map(this.where.value,
												this._encode).join(',') + ')';
							break;
						}
						return a;
					},
					_encode : function(a) {
						return typeof (a) == 'string' ? FB.String.quote(a) : a;
					},
					toString : function() {
						return '#' + this.name;
					},
					_toFields : function(a) {
						return FB.Array.map(a.split(','), FB.String.trim);
					},
					_parseWhere : function(s) {
						var re = (/^\s*(\w+)\s*=\s*(.*)\s*$/i).exec(s), result, value, type = 'unknown';
						if (re) {
							value = re[2];
							if (/^(["'])(?:\\?.)*?\1$/.test(value)) {
								value = eval(value);
								type = 'index';
							} else if (/^\d+\.?\d*$/.test(value))
								type = 'index';
						}
						if (type == 'index') {
							result = {
								type : 'index',
								key : re[1],
								value : value
							};
						} else
							result = {
								type : 'unknown',
								value : s
							};
						return result;
					}
				});
FB.provide('Data', {
	query : function(c, a) {
		var b = new FB.Data.Query().parse(arguments);
		FB.Data.queue.push(b);
		FB.Data._waitToProcess();
		return b;
	},
	waitOn : function(dependencies, callback) {
		var result = new FB.Waitable(), count = dependencies.length;
		if (typeof (callback) == 'string') {
			var s = callback;
			callback = function(args) {
				return eval(s);
			};
		}
		FB.Array.forEach(dependencies, function(item) {
			item.monitor('value', function() {
				var done = false;
				if (FB.Data._getValue(item) !== undefined) {
					count--;
					done = true;
				}
				if (count === 0) {
					var value = callback(FB.Array.map(dependencies,
							FB.Data._getValue));
					result.set(value !== undefined ? value : true);
				}
				return done;
			});
		});
		return result;
	},
	_getValue : function(a) {
		return FB.Type.isType(a, FB.Waitable) ? a.value : a;
	},
	_selectByIndex : function(a, d, b, e) {
		var c = new FB.Data.Query();
		c.fields = a;
		c.table = d;
		c.where = {
			type : 'index',
			key : b,
			value : e
		};
		FB.Data.queue.push(c);
		FB.Data._waitToProcess();
		return c;
	},
	_waitToProcess : function() {
		if (FB.Data.timer < 0)
			FB.Data.timer = setTimeout(FB.Data._process, 10);
	},
	_process : function() {
		FB.Data.timer = -1;
		var c = {}, e = FB.Data.queue;
		FB.Data.queue = [];
		for ( var a = 0; a < e.length; a++) {
			var b = e[a];
			if (b.where.type == 'index' && !b.hasDependency) {
				FB.Data._mergeIndexQuery(b, c);
			} else
				c[b.name] = b;
		}
		var d = {
			method : 'fql.multiquery',
			queries : {}
		};
		FB.copy(d.queries, c, true, function(f) {
			return f.toFql();
		});
		d.queries = FB.JSON.stringify(d.queries);
		FB.api(d, function(f) {
			if (f.error_msg) {
				FB.Array.forEach(c, function(g) {
					g.error(Error(f.error_msg));
				});
			} else
				FB.Array.forEach(f, function(g) {
					c[g.name].set(g.fql_result_set);
				});
		});
	},
	_mergeIndexQuery : function(a, d) {
		var b = a.where.key, f = a.where.value;
		var e = 'index_' + a.table + '_' + b;
		var c = d[e];
		if (!c) {
			c = d[e] = new FB.Data.Query();
			c.fields = [ b ];
			c.table = a.table;
			c.where = {
				type : 'in',
				key : b,
				value : []
			};
		}
		FB.Array.merge(c.fields, a.fields);
		FB.Array.merge(c.where.value, [ f ]);
		c.wait(function(g) {
			a.set(FB.Array.filter(g, function(h) {
				return h[b] == f;
			}));
		});
	},
	timer : -1,
	queue : []
});
FB.provide('Cookie',
		{
			_domain : null,
			_enabled : false,
			setEnabled : function(a) {
				FB.Cookie._enabled = a;
			},
			getEnabled : function() {
				return FB.Cookie._enabled;
			},
			load : function() {
				var a = document.cookie
						.match('\\bfbs_' + FB._apiKey + '="([^;]*)\\b'), b;
				if (a) {
					b = FB.QS.decode(a[1]);
					b.expires = parseInt(b.expires, 10);
					FB.Cookie._domain = b.base_domain;
				}
				return b;
			},
			setRaw : function(c, b, a) {
				document.cookie = 'fbs_'
						+ FB._apiKey
						+ '="'
						+ c
						+ '"'
						+ (c && b == 0 ? '' : '; expires=' + new Date(b * 1000)
								.toGMTString()) + '; path=/'
						+ (a ? '; domain=.' + a : '');
				FB.Cookie._domain = a;
			},
			set : function(a) {
				a ? FB.Cookie.setRaw(FB.QS.encode(a), a.expires, a.base_domain)
						: FB.Cookie.clear();
			},
			clear : function() {
				FB.Cookie.setRaw('', 0, FB.Cookie._domain);
			}
		});
FB.provide('', {
	init : function(a) {
		a = FB.copy(a || {}, {
			logging : true
		});
		FB._apiKey = a.appId || a.apiKey;
		if (!a.logging && window.location.toString().indexOf('fb_debug=1') < 0)
			FB._logging = false;
		FB.XD.init(a.channelUrl);
		if (FB._apiKey) {
			FB.Cookie.setEnabled(a.cookie);
			a.session = a.session || FB.Cookie.load();
			FB.Auth.setSession(a.session, a.session ? 'connected' : 'unknown');
			if (a.status)
				FB.getLoginStatus();
		}
		if (a.xfbml)
			window.setTimeout(function() {
				if (FB.XFBML)
					FB.Dom.ready(FB.XFBML.parse);
			}, 0);
	}
});
window.setTimeout(function() {
	if (window.fbAsyncInit)
		fbAsyncInit();
}, 0);
FB.provide('UIServer.Methods', {
	'friends.add' : {
		size : {
			width : 575,
			height : 240
		},
		url : 'connect/uiserver.php',
		transform : FB.UIServer.genericTransform
	},
	'stream.publish' : {
		size : {
			width : 575,
			height : 240
		},
		url : 'connect/prompt_feed.php',
		transform : function(a) {
			var b = a.cb;
			a.cb = function(c) {
				if (c)
					if (c.postId) {
						c = {
							post_id : c.postId
						};
					} else
						c = null;
				b && b(c);
			};
			a.params.callback = FB.UIServer._xdResult(a.cb, a.id,
					a.params.display == 'popup' ? 'opener' : 'parent', true);
			return a;
		}
	},
	'stream.share' : {
		size : {
			width : 575,
			height : 380
		},
		url : 'sharer.php',
		transform : function(a) {
			if (!a.params.u)
				a.params.u = window.location.toString();
			return a;
		}
	},
	'fbml.dialog' : {
		size : {
			width : 575,
			height : 300
		},
		url : 'render_fbml.php',
		loggedOutIframe : true
	},
	'bookmark.add' : {
		size : {
			width : 460,
			height : 226
		},
		url : 'connect/uiserver.php',
		transform : FB.UIServer.genericTransform
	},
	'profile.addtab' : {
		size : {
			width : 460,
			height : 226
		},
		url : 'connect/uiserver.php',
		transform : FB.UIServer.genericTransform
	}
});
FB
		.provide(
				'',
				{
					share : function(a) {
						FB
								.log('FB.share() has been deprecated. Please use FB.ui() instead.');
						FB.ui( {
							display : 'popup',
							method : 'stream.share',
							u : a
						});
					},
					publish : function(b, a) {
						FB
								.log('FB.publish() has been deprecated. Please use FB.ui() instead.');
						b = b || {};
						FB.ui(FB.copy( {
							display : 'popup',
							method : 'stream.publish',
							preview : 1
						}, b || {}), a);
					},
					addFriend : function(b, a) {
						FB
								.log('FB.addFriend() has been deprecated. Please use FB.ui() instead.');
						FB.ui( {
							display : 'popup',
							id : b,
							method : 'friend.add'
						}, a);
					}
				});
FB.provide('XFBML', {
	_renderTimeout : 30000,
	parse : function(c, a) {
		c = c || document.body;
		var b = 1, d = function() {
			b--;
			if (b === 0) {
				a && a();
				FB.Event.fire('xfbml.render');
			}
		};
		FB.Array.forEach(FB.XFBML._tagInfos, function(f) {
			if (!f.xmlns)
				f.xmlns = 'fb';
			var g = FB.XFBML._getDomElements(c, f.xmlns, f.localName);
			for ( var e = 0; e < g.length; e++) {
				b++;
				FB.XFBML._processElement(g[e], f, d);
			}
		});
		window.setTimeout(function() {
			if (b > 0)
				FB.log(b + ' XFBML tags failed to render in '
						+ FB.XFBML._renderTimeout + 'ms.');
		}, FB.XFBML._renderTimeout);
		d();
	},
	registerTag : function(a) {
		FB.XFBML._tagInfos.push(a);
	},
	_processElement : function(dom, tagInfo, cb) {
		var element = dom._element;
		if (element) {
			element.subscribe('render', cb);
			element.process();
		} else {
			var processor = function() {
				var fn = eval(tagInfo.className);
				if (tagInfo.className === 'FB.XFBML.LoginButton') {
					var attr = dom.getAttribute('show-faces');
					if (attr
							&& FB.Array.indexOf( [ 'true', '1', 'yes', 'on' ],
									attr.toLowerCase()) > -1)
						fn = FB.XFBML.Login;
				}
				element = dom._element = new fn(dom);
				element.subscribe('render', cb);
				element.process();
			};
			if (FB.CLASSES[tagInfo.className.substr(3)]) {
				processor();
			} else
				FB.log('Tag ' + tagInfo.className + ' was not found.');
		}
	},
	_getDomElements : function(b, e, d) {
		var c = e + ':' + d;
		switch (FB.Dom.getBrowserType()) {
		case 'mozilla':
			return b.getElementsByTagNameNS(document.body.namespaceURI, c);
		case 'ie':
			try {
				var a = document.namespaces;
				if (a && a[e])
					return b.getElementsByTagName(d);
			} catch (e) {
			}
			return b.getElementsByTagName(c);
		default:
			return b.getElementsByTagName(c);
		}
	},
	_tagInfos : [ {
		localName : 'activity',
		className : 'FB.XFBML.Activity'
	}, {
		localName : 'add-profile-tab',
		className : 'FB.XFBML.AddProfileTab'
	}, {
		localName : 'bookmark',
		className : 'FB.XFBML.Bookmark'
	}, {
		localName : 'comments',
		className : 'FB.XFBML.Comments'
	}, {
		localName : 'connect-bar',
		className : 'FB.XFBML.ConnectBar'
	}, {
		localName : 'fan',
		className : 'FB.XFBML.Fan'
	}, {
		localName : 'like',
		className : 'FB.XFBML.Like'
	}, {
		localName : 'like-box',
		className : 'FB.XFBML.LikeBox'
	}, {
		localName : 'live-stream',
		className : 'FB.XFBML.LiveStream'
	}, {
		localName : 'login',
		className : 'FB.XFBML.Login'
	}, {
		localName : 'login-button',
		className : 'FB.XFBML.LoginButton'
	}, {
		localName : 'facepile',
		className : 'FB.XFBML.Facepile'
	}, {
		localName : 'name',
		className : 'FB.XFBML.Name'
	}, {
		localName : 'profile-pic',
		className : 'FB.XFBML.ProfilePic'
	}, {
		localName : 'recommendations',
		className : 'FB.XFBML.Recommendations'
	}, {
		localName : 'serverfbml',
		className : 'FB.XFBML.ServerFbml'
	}, {
		localName : 'share-button',
		className : 'FB.XFBML.ShareButton'
	}, {
		localName : 'social-bar',
		className : 'FB.XFBML.SocialBar'
	} ]
});
(function() {
	try {
		if (document.namespaces && !document.namespaces.item.fb)
			document.namespaces.add('fb');
	} catch (e) {
	}
}());
FB.provide('XFBML', {
	set : function(b, c, a) {
		FB.log('FB.XFBML.set() has been deprecated.');
		b.innerHTML = c;
		FB.XFBML.parse(b, a);
	}
});
FB
		.provide(
				'Canvas',
				{
					_timer : null,
					setSize : function(a) {
						if (typeof a != "object")
							a = {};
						a = FB.copy(a || {}, FB.Canvas._computeContentSize());
						if (FB.Canvas._lastSize
								&& FB.Canvas._lastSize.width == a.width
								&& FB.Canvas._lastSize.height == a.height)
							return false;
						FB.Canvas._lastSize = a;
						FB.Canvas._sendMessageToFacebook( {
							method : 'setSize',
							params : a
						});
						return true;
					},
					setAutoResize : function(b, a) {
						if (a === undefined && typeof b == "number") {
							a = b;
							b = true;
						}
						if (b === undefined || b) {
							if (FB.Canvas._timer === null)
								FB.Canvas._timer = window.setInterval(
										FB.Canvas.setSize, a || 100);
							FB.Canvas.setSize();
						} else if (FB.Canvas._timer !== null) {
							window.clearInterval(FB.Canvas._timer);
							FB.Canvas._timer = null;
						}
					},
					_computeContentSize : function() {
						var a = document.body, c = document.documentElement, d = 0, b = Math
								.max(Math.max(a.offsetHeight, a.scrollHeight)
										+ a.offsetTop, Math.max(c.offsetHeight,
										c.scrollHeight)
										+ c.offsetTop);
						if (a.offsetWidth < a.scrollWidth) {
							d = a.scrollWidth + a.offsetLeft;
						} else
							FB.Array.forEach(a.childNodes, function(e) {
								var f = e.offsetWidth + e.offsetLeft;
								if (f > d)
									d = f;
							});
						if (c.clientLeft > 0)
							d += (c.clientLeft * 2);
						if (c.clientTop > 0)
							b += (c.clientTop * 2);
						return {
							height : b,
							width : d
						};
					},
					_sendMessageToFacebook : function(a) {
						var c = FB._domain.staticfb
								+ 'connect/canvas_proxy.php#' + FB.QS.encode( {
									method : a.method,
									params : FB.JSON.stringify(a.params)
								});
						var b = FB.Content.appendHidden('');
						FB.Content.insertIframe( {
							url : c,
							root : b,
							width : 1,
							height : 1,
							onload : function() {
								setTimeout(function() {
									b.parentNode.removeChild(b);
								}, 10);
							}
						});
					}
				});
FB.Class('XFBML.Element', function(a) {
	this.dom = a;
}, FB.copy( {
	getAttribute : function(b, a, c) {
		var d = (this.dom.getAttribute(b)
				|| this.dom.getAttribute(b.replace(/-/g, '_')) || this.dom
				.getAttribute(b.replace(/-/g, '')));
		return d ? (c ? c(d) : d) : a;
	},
	_getBoolAttribute : function(b, a) {
		return this.getAttribute(b, a, function(c) {
			c = c.toLowerCase();
			return c == 'true' || c == '1' || c == 'yes' || c == 'on';
		});
	},
	_getPxAttribute : function(b, a) {
		return this.getAttribute(b, a, function(c) {
			var d = parseInt(c.replace('px', ''), 10);
			if (isNaN(d)) {
				return a;
			} else
				return d;
		});
	},
	_getAttributeFromList : function(c, b, a) {
		return this.getAttribute(c, b, function(d) {
			d = d.toLowerCase();
			if (FB.Array.indexOf(a, d) > -1) {
				return d;
			} else
				return b;
		});
	},
	isValid : function() {
		for ( var a = this.dom; a; a = a.parentNode)
			if (a == document.body)
				return true;
	},
	clear : function() {
		this.dom.innerHTML = '';
	}
}, FB.EventProvider));
FB
		.subclass(
				'XFBML.IframeWidget',
				'XFBML.Element',
				null,
				{
					_showLoader : true,
					_refreshOnAuthChange : false,
					_allowReProcess : false,
					_visibleAfter : 'load',
					getUrlBits : function() {
						throw new Error(
								'Inheriting class needs to implement getUrlBits().');
					},
					setupAndValidate : function() {
						return true;
					},
					oneTimeSetup : function() {
					},
					getSize : function() {
					},
					getIframeName : function() {
					},
					getChannelUrl : function() {
						if (!this._channelUrl) {
							var a = this;
							this._channelUrl = FB.XD.handler(function(b) {
								a.fire('xd.' + b.type, b);
							}, 'parent.parent', true);
						}
						return this._channelUrl;
					},
					getIframeNode : function() {
						return this.dom.getElementsByTagName('iframe')[0];
					},
					process : function(a) {
						if (this._done) {
							if (!this._allowReProcess && !a)
								return;
							this.clear();
						} else
							this._oneTimeSetup();
						this._done = true;
						if (!this.setupAndValidate()) {
							this.fire('render');
							return;
						}
						if (this._showLoader)
							this._addLoader();
						FB.Dom.addCss(this.dom, 'fb_iframe_widget');
						if (this._visibleAfter != 'immediate') {
							FB.Dom.addCss(this.dom, 'fb_hide_iframes');
						} else
							this.subscribe('iframe.onload', FB.bind(this.fire,
									this, 'render'));
						var c = this.getSize() || {};
						var d = this._getURL() + '?'
								+ FB.QS.encode(this._getQS());
						if (d.length > 2000) {
							d = 'about:blank';
							var b = FB.bind(function() {
								this._postRequest();
								this.unsubscribe('iframe.onload', b);
							}, this);
							this.subscribe('iframe.onload', b);
						}
						FB.Content.insertIframe( {
							url : d,
							root : this.dom.appendChild(document
									.createElement('span')),
							name : this.getIframeName(),
							height : c.height,
							width : c.width,
							onload : FB.bind(this.fire, this, 'iframe.onload')
						});
					},
					_oneTimeSetup : function() {
						this.subscribe('xd.resize', FB.bind(
								this._handleResizeMsg, this));
						if (FB.getLoginStatus) {
							this.subscribe('xd.refreshLoginStatus', FB.bind(
									FB.getLoginStatus, FB, function() {
									}, true));
							this.subscribe('xd.logout', FB.bind(FB.logout, FB,
									function() {
									}));
						}
						if (this._refreshOnAuthChange)
							this._setupAuthRefresh();
						if (this._visibleAfter == 'load')
							this.subscribe('iframe.onload', FB.bind(
									this._makeVisible, this));
						this.oneTimeSetup();
					},
					_makeVisible : function() {
						this._removeLoader();
						FB.Dom.removeCss(this.dom, 'fb_hide_iframes');
						this.fire('render');
					},
					_setupAuthRefresh : function() {
						FB.getLoginStatus(FB.bind(function(b) {
							var a = b.status;
							FB.Event.subscribe('auth.statusChange', FB.bind(
									function(c) {
										if (!this.isValid())
											return;
										if (a == 'unknown'
												|| c.status == 'unknown')
											this.process(true);
										a = c.status;
									}, this));
						}, this));
					},
					_handleResizeMsg : function(b) {
						if (!this.isValid())
							return;
						var a = this.getIframeNode();
						a.style.height = b.height + 'px';
						if (b.width)
							a.style.width = b.width + 'px';
						a.style.border = 'none';
						this._makeVisible();
					},
					_addLoader : function() {
						if (!this._loaderDiv) {
							FB.Dom.addCss(this.dom, 'fb_iframe_widget_loader');
							this._loaderDiv = document.createElement('div');
							this._loaderDiv.className = 'FB_Loader';
							this.dom.appendChild(this._loaderDiv);
						}
					},
					_removeLoader : function() {
						if (this._loaderDiv) {
							FB.Dom.removeCss(this.dom,
									'fb_iframe_widget_loader');
							if (this._loaderDiv.parentNode)
								this._loaderDiv.parentNode
										.removeChild(this._loaderDiv);
							this._loaderDiv = null;
						}
					},
					_getQS : function() {
						return FB.copy( {
							api_key : FB._apiKey,
							locale : FB._locale,
							sdk : 'joey',
							session_key : FB._session
									&& FB._session.session_key
						}, this.getUrlBits().params);
					},
					_getURL : function() {
						return FB._domain.www + 'plugins/'
								+ this.getUrlBits().name + '.php';
					},
					_postRequest : function() {
						FB.Content.postTarget( {
							url : this._getURL(),
							target : this.getIframeNode().name,
							params : this._getQS()
						});
					}
				});
FB.subclass('XFBML.Activity', 'XFBML.IframeWidget', null, {
	_visibleAfter : 'load',
	_refreshOnAuthChange : true,
	setupAndValidate : function() {
		this._attr = {
			border_color : this.getAttribute('border-color'),
			colorscheme : this.getAttribute('color-scheme'),
			font : this.getAttribute('font'),
			header : this._getBoolAttribute('header'),
			height : this._getPxAttribute('height', 300),
			recommendations : this._getBoolAttribute('recommendations'),
			site : this.getAttribute('site', location.hostname),
			width : this._getPxAttribute('width', 300)
		};
		return true;
	},
	getSize : function() {
		return {
			width : this._attr.width,
			height : this._attr.height
		};
	},
	getUrlBits : function() {
		return {
			name : 'activity',
			params : this._attr
		};
	}
});
FB
		.subclass(
				'XFBML.ButtonElement',
				'XFBML.Element',
				null,
				{
					_allowedSizes : [ 'icon', 'small', 'medium', 'large',
							'xlarge' ],
					onClick : function() {
						throw new Error(
								'Inheriting class needs to implement onClick().');
					},
					setupAndValidate : function() {
						return true;
					},
					getButtonMarkup : function() {
						return this.getOriginalHTML();
					},
					getOriginalHTML : function() {
						return this._originalHTML;
					},
					process : function() {
						if (!('_originalHTML' in this))
							this._originalHTML = FB.String
									.trim(this.dom.innerHTML);
						if (!this.setupAndValidate()) {
							this.fire('render');
							return;
						}
						var d = this._getAttributeFromList('size', 'medium',
								this._allowedSizes), a = '', b = '';
						if (d == 'icon') {
							a = 'fb_button_simple';
						} else {
							var c = FB._localeIsRtl ? '_rtl' : '';
							b = this.getButtonMarkup();
							a = 'fb_button' + c + ' fb_button_' + d + c;
						}
						this.dom.innerHTML = ('<a class="' + a + '">'
								+ '<span class="fb_button_text">' + b
								+ '</span>' + '</a>');
						this.dom.firstChild.onclick = FB.bind(this.onClick,
								this);
						this.fire('render');
					}
				});
FB.provide('Helper', {
	isUser : function(a) {
		return a < 2.2e+09 || (a >= 1e+14 && a <= 100099999989999);
	},
	getLoggedInUser : function() {
		return FB._session ? FB._session.uid : null;
	},
	upperCaseFirstChar : function(a) {
		if (a.length > 0) {
			return a.substr(0, 1).toUpperCase() + a.substr(1);
		} else
			return a;
	},
	getProfileLink : function(c, b, a) {
		a = a || (c ? FB._domain.www + 'profile.php?id=' + c.uid : null);
		if (a)
			b = '<a class="fb_link" href="' + a + '">' + b + '</a>';
		return b;
	},
	invokeHandler : function(handler, scope, args) {
		if (handler)
			if (typeof handler === 'string') {
				eval(handler);
			} else if (handler.apply)
				handler.apply(scope, args || []);
	}
});
FB.subclass('XFBML.AddProfileTab', 'XFBML.ButtonElement', null, {
	getButtonMarkup : function() {
		return FB.Intl._tx("Add Profile Tab on Facebook");
	},
	onClick : function() {
		FB.ui( {
			method : 'profile.addtab'
		}, this.bind(function(a) {
			if (a.tab_added)
				FB.Helper.invokeHandler(this.getAttribute('on-add'), this);
		}));
	}
});
FB.subclass('XFBML.Bookmark', 'XFBML.ButtonElement', null, {
	getButtonMarkup : function() {
		return FB.Intl._tx("Bookmark on Facebook");
	},
	onClick : function() {
		FB.ui( {
			method : 'bookmark.add'
		}, this.bind(function(a) {
			if (a.bookmarked)
				FB.Helper.invokeHandler(this.getAttribute('on-add'), this);
		}));
	}
});
FB.subclass('XFBML.Comments', 'XFBML.IframeWidget', null, {
	_visibleAfter : 'resize',
	_refreshOnAuthChange : true,
	setupAndValidate : function() {
		var a = {
			channel_url : this.getChannelUrl(),
			css : this.getAttribute('css'),
			notify : this.getAttribute('notify'),
			numposts : this.getAttribute('num-posts', 10),
			quiet : this.getAttribute('quiet'),
			reverse : this.getAttribute('reverse'),
			simple : this.getAttribute('simple'),
			title : this.getAttribute('title', document.title),
			url : this.getAttribute('url', document.URL),
			width : this._getPxAttribute('width', 550),
			xid : this.getAttribute('xid')
		};
		if (!a.xid) {
			var b = document.URL.indexOf('#');
			if (b > 0) {
				a.xid = encodeURIComponent(document.URL.substring(0, b));
			} else
				a.xid = encodeURIComponent(document.URL);
		}
		this._attr = a;
		return true;
	},
	oneTimeSetup : function() {
		this.subscribe('xd.addComment', FB.bind(this._handleCommentMsg, this));
	},
	getSize : function() {
		return {
			width : this._attr.width,
			height : 200
		};
	},
	getUrlBits : function() {
		return {
			name : 'comments',
			params : this._attr
		};
	},
	_handleCommentMsg : function(a) {
		if (!this.isValid())
			return;
		FB.Event.fire('comments.add', {
			post : a.post,
			user : a.user,
			widget : this
		});
	}
});
FB.provide('Anim', {
	ate : function(c, g, d, b) {
		d = !isNaN(parseFloat(d)) && d >= 0 ? d : 750;
		var e = 40, f = {}, j = {}, a = null, h = c.style, i = setInterval(FB
				.bind(function() {
					if (!a)
						a = new Date().getTime();
					var k = 1;
					if (d != 0)
						k = Math.min((new Date().getTime() - a) / d, 1);
					FB.Array.forEach(g, FB.bind(function(o, m) {
						if (!f[m]) {
							var n = FB.Dom.getStyle(c, m);
							if (!n)
								return;
							f[m] = this._parseCSS(n);
						}
						if (!j[m])
							j[m] = this._parseCSS(o.toString());
						var l = '';
						FB.Array.forEach(f[m], function(q, p) {
							if (isNaN(j[m][p].numPart)
									&& j[m][p].textPart == '?') {
								l = q.numPart + q.textPart;
							} else if (isNaN(q.numPart)) {
								l = q.textPart;
							} else
								l += (q.numPart + Math
										.ceil((j[m][p].numPart - q.numPart)
												* Math.sin(Math.PI / 2 * k)))
										+ j[m][p].textPart + ' ';
						});
						FB.Dom.setStyle(c, m, l);
					}, this));
					if (k == 1) {
						clearInterval(i);
						if (b)
							b(c);
					}
				}, this), e);
	},
	_parseCSS : function(a) {
		var b = [];
		FB.Array.forEach(a.split(' '), function(d) {
			var c = parseInt(d, 10);
			b.push( {
				numPart : c,
				textPart : d.replace(c, '')
			});
		});
		return b;
	}
});
FB.provide('Insights',
		{
			impression : function(e, a) {
				var b = FB.guid(), g = "//ah8.facebook.com/impression.php/" + b
						+ "/", c = new Image(1, 1), f = [];
				if (!e.api_key && FB._apiKey)
					e.api_key = FB._apiKey;
				for ( var d in e)
					f.push(encodeURIComponent(d) + '='
							+ encodeURIComponent(e[d]));
				g += '?' + f.join('&');
				if (a)
					c.onload = a;
				c.src = g;
			}
		});
FB
		.subclass(
				'XFBML.ConnectBar',
				'XFBML.Element',
				null,
				{
					_initialHeight : null,
					_initTopMargin : 0,
					_picFieldName : 'pic_square',
					_page : null,
					_displayed : false,
					_notDisplayed : false,
					_container : null,
					_animationSpeed : 0,
					process : function() {
						FB
								.getLoginStatus(this
										.bind(function(a) {
											FB.Event
													.monitor(
															'auth.statusChange',
															this
																	.bind(function() {
																		if (this
																				.isValid()
																				&& FB._userStatus == 'connected') {
																			this._uid = FB.Helper
																					.getLoggedInUser();
																			FB
																					.api(
																							{
																								method : 'Connect.shouldShowConnectBar'
																							},
																							this
																									.bind(function(
																											b) {
																										if (b != 2) {
																											this._animationSpeed = (b == 0) ? 750
																													: 0;
																											this
																													._showBar();
																										} else
																											this
																													._noRender();
																									}));
																		} else
																			this
																					._noRender();
																		return false;
																	}));
										}));
					},
					_showBar : function() {
						var a = FB.Data._selectByIndex( [ 'first_name',
								'profile_url', this._picFieldName ], 'user',
								'uid', this._uid);
						var b = FB.Data._selectByIndex( [ 'display_name' ],
								'application', 'api_key', FB._apiKey);
						FB.Data.waitOn( [ a, b ], FB.bind(function(c) {
							c[0][0].site_name = c[1][0].display_name;
							if (!this._displayed) {
								this._displayed = true;
								this._notDisplayed = false;
								this._renderConnectBar(c[0][0]);
								this.fire('render');
								FB.Insights.impression( {
									lid : 104,
									name : 'widget_load'
								});
								this.fire('connectbar.ondisplay');
								FB.Event.fire('connectbar.ondisplay', this);
								FB.Helper.invokeHandler(this
										.getAttribute('on-display'), this);
							}
						}, this));
					},
					_noRender : function() {
						if (this._displayed) {
							this._displayed = false;
							this._closeConnectBar();
						}
						if (!this._notDisplayed) {
							this._notDisplayed = true;
							this.fire('render');
							this.fire('connectbar.onnotdisplay');
							FB.Event.fire('connectbar.onnotdisplay', this);
							FB.Helper.invokeHandler(this
									.getAttribute('on-not-display'), this);
						}
					},
					_renderConnectBar : function(d) {
						var b = document.createElement('div'), c = document
								.createElement('div');
						b.className = 'fb_connect_bar';
						c.className = 'fb_reset fb_connect_bar_container';
						c.appendChild(b);
						document.body.appendChild(c);
						this._container = c;
						this._initialHeight = Math.round(parseFloat(FB.Dom
								.getStyle(c, 'height'))
								+ parseFloat(FB.Dom.getStyle(c,
										'borderBottomWidth')));
						b.innerHTML = FB.String
								.format(
										'<div class="fb_buttons">'
												+ '<a href="#" class="fb_bar_close">'
												+ '<img src="{1}" alt="{2}" title="{2}"/>'
												+ '</a>'
												+ '</div>'
												+ '<a href="{7}" class="fb_profile" target="_blank">'
												+ '<img src="{3}" alt="{4}" title="{4}"/>'
												+ '</a>'
												+ '{5}'
												+ ' <span>'
												+ '<a href="{8}" class="fb_learn_more" target="_blank">{6}</a> &ndash; '
												+ '<a href="#" class="fb_no_thanks">{0}</a>'
												+ '</span>',
										FB.Intl._tx("No Thanks"),
										FB._domain.cdn
												+ FB.XFBML.ConnectBar.imgs.buttonUrl,
										FB.Intl._tx("Close"),
										d[this._picFieldName],
										d.first_name,
										FB.Intl
												._tx(
														"Hi {firstName}. <strong>{siteName}<\/strong> is using Facebook to personalize your experience.",
														{
															firstName : d.first_name,
															siteName : d.site_name
														}), FB.Intl
												._tx("Learn More"),
										d.profile_url,
										FB._domain.www + 'sitetour/connect.php');
						var a = this;
						FB.Array.forEach(b.getElementsByTagName('a'), function(
								g) {
							g.onclick = FB.bind(a._clickHandler, a);
						});
						this._page = document.body;
						var f = 0;
						if (this._page.parentNode) {
							f = Math
									.round((parseFloat(FB.Dom.getStyle(
											this._page.parentNode, 'height')) - parseFloat(FB.Dom
											.getStyle(this._page, 'height'))) / 2);
						} else
							f = parseInt(FB.Dom.getStyle(this._page,
									'marginTop'), 10);
						f = isNaN(f) ? 0 : f;
						this._initTopMargin = f;
						if (!window.XMLHttpRequest) {
							c.className += " fb_connect_bar_container_ie6";
						} else {
							c.style.top = (-1 * this._initialHeight) + 'px';
							FB.Anim.ate(c, {
								top : '0px'
							}, this._animationSpeed);
						}
						var e = {
							marginTop : this._initTopMargin
									+ this._initialHeight + 'px'
						};
						if (FB.Dom.getBrowserType() == 'ie') {
							e.backgroundPositionY = this._initialHeight + 'px';
						} else
							e.backgroundPosition = '? ' + this._initialHeight + 'px';
						FB.Anim.ate(this._page, e, this._animationSpeed);
					},
					_clickHandler : function(a) {
						a = a || window.event;
						var b = a.target || a.srcElement;
						while (b.nodeName != 'A')
							b = b.parentNode;
						switch (b.className) {
						case 'fb_bar_close':
							FB.api( {
								method : 'Connect.connectBarMarkAcknowledged'
							});
							FB.Insights.impression( {
								lid : 104,
								name : 'widget_user_closed'
							});
							this._closeConnectBar();
							break;
						case 'fb_learn_more':
						case 'fb_profile':
							window.open(b.href);
							break;
						case 'fb_no_thanks':
							this._closeConnectBar();
							FB.api( {
								method : 'Connect.connectBarMarkAcknowledged'
							});
							FB.Insights.impression( {
								lid : 104,
								name : 'widget_user_no_thanks'
							});
							FB.api( {
								method : 'auth.revokeAuthorization'
							}, this
									.bind(function() {
										this.fire('connectbar.ondeauth');
										FB.Event.fire('connectbar.ondeauth',
												this);
										FB.Helper.invokeHandler(this
												.getAttribute('on-deauth'),
												this);
										if (this._getBoolAttribute(
												'auto-refresh', true))
											window.location.reload();
									}));
							break;
						}
						return false;
					},
					_closeConnectBar : function() {
						this._notDisplayed = true;
						var a = {
							marginTop : this._initTopMargin + 'px'
						};
						if (FB.Dom.getBrowserType() == 'ie') {
							a.backgroundPositionY = '0px';
						} else
							a.backgroundPosition = '? 0px';
						var b = (this._animationSpeed == 0) ? 0 : 300;
						FB.Anim.ate(this._page, a, b);
						FB.Anim.ate(this._container, {
							top : (-1 * this._initialHeight) + 'px'
						}, b, function(c) {
							c.parentNode.removeChild(c);
						});
						this.fire('connectbar.onclose');
						FB.Event.fire('connectbar.onclose', this);
						FB.Helper.invokeHandler(this.getAttribute('on-close'),
								this);
					}
				});
FB.provide('XFBML.ConnectBar', {
	imgs : {
		buttonUrl : 'images/facebook-widgets/close_btn.png'
	}
});
FB.subclass('XFBML.Facepile', 'XFBML.IframeWidget', null, {
	_visibleAfter : 'load',
	setupAndValidate : function() {
		this._attr = {
			channel : this.getChannelUrl(),
			max_rows : this.getAttribute('max-rows'),
			width : this._getPxAttribute('width', 200)
		};
		return true;
	},
	oneTimeSetup : function() {
		var a = FB._userStatus;
		FB.Event.subscribe('auth.statusChange', FB.bind(function(b) {
			if (a == 'connected' || b.status == 'connected')
				this.process(true);
			a = b.status;
		}, this));
	},
	getSize : function() {
		return {
			width : this._attr.width,
			height : 70
		};
	},
	getUrlBits : function() {
		return {
			name : 'facepile',
			params : this._attr
		};
	}
});
FB.subclass('XFBML.Fan', 'XFBML.IframeWidget', null, {
	_visibleAfter : 'load',
	setupAndValidate : function() {
		this._attr = {
			api_key : FB._apiKey,
			connections : this.getAttribute('connections', '10'),
			css : this.getAttribute('css'),
			height : this._getPxAttribute('height'),
			id : this.getAttribute('profile-id'),
			logobar : this._getBoolAttribute('logo-bar'),
			name : this.getAttribute('name'),
			stream : this._getBoolAttribute('stream', true),
			width : this._getPxAttribute('width', 300)
		};
		if (!this._attr.id && !this._attr.name) {
			FB.log('<fb:fan> requires one of the "id" or "name" attributes.');
			return false;
		}
		var a = this._attr.height;
		if (!a)
			if ((!this._attr.connections || this._attr.connections === '0')
					&& !this._attr.stream) {
				a = 65;
			} else if (!this._attr.connections
					|| this._attr.connections === '0') {
				a = 375;
			} else if (!this._attr.stream) {
				a = 250;
			} else
				a = 550;
		if (this._attr.logobar)
			a += 25;
		this._attr.height = a;
		return true;
	},
	getSize : function() {
		return {
			width : this._attr.width,
			height : this._attr.height
		};
	},
	getUrlBits : function() {
		return {
			name : 'fan',
			params : this._attr
		};
	}
});
FB.subclass('XFBML.EdgeCommentWidget', 'XFBML.IframeWidget', function(a) {
	this._iframeWidth = a.width;
	this._iframeHeight = a.height;
	this._attr = {
		master_frame_name : a.masterFrameName
	};
	this.dom = a.commentNode;
	this.dom.style.top = a.relativeHeightOffset;
	this.dom.style.zIndex = FB.XFBML.EdgeCommentWidget.NextZIndex++;
	FB.Dom.addCss(this.dom, 'fb_edge_comment_widget');
}, {
	_visibleAfter : 'load',
	_showLoader : false,
	getSize : function() {
		return {
			width : this._iframeWidth,
			height : this._iframeHeight
		};
	},
	getUrlBits : function() {
		return {
			name : 'comment_widget_shell',
			params : this._attr
		};
	}
});
FB.provide('XFBML.EdgeCommentWidget', {
	NextZIndex : 10000
});
FB.subclass('XFBML.EdgeWidget', 'XFBML.IframeWidget', null, {
	_visibleAfter : 'immediate',
	_showLoader : false,
	setupAndValidate : function() {
		FB.Dom.addCss(this.dom, 'fb_edge_widget_with_comment');
		this._attr = {
			channel_url : this.getChannelUrl(),
			debug : this._getBoolAttribute('debug'),
			href : this.getAttribute('href', window.location.href),
			is_permalink : this._getBoolAttribute('is-permalink'),
			node_type : this.getAttribute('node-type', 'link'),
			width : this._getWidgetWidth(),
			font : this.getAttribute('font'),
			layout : this._getLayout(),
			colorscheme : this.getAttribute('color-scheme'),
			action : this.getAttribute('action'),
			show_faces : this._shouldShowFaces(),
			no_resize : this._getBoolAttribute('no_resize')
		};
		return true;
	},
	oneTimeSetup : function() {
		this.subscribe('xd.presentEdgeCommentDialog', FB.bind(
				this._onEdgeCreate, this));
		this.subscribe('xd.presentEdgeCommentDialog', FB.bind(
				this._handleEdgeCommentDialogPresentation, this));
		this.subscribe('xd.dismissEdgeCommentDialog', FB.bind(
				this._handleEdgeCommentDialogDismissal, this));
		this.subscribe('xd.hideEdgeCommentDialog', FB.bind(
				this._handleEdgeCommentDialogHide, this));
		this.subscribe('xd.showEdgeCommentDialog', FB.bind(
				this._handleEdgeCommentDialogShow, this));
	},
	getSize : function() {
		return {
			width : this._getWidgetWidth(),
			height : this._getWidgetHeight()
		};
	},
	_getWidgetHeight : function() {
		var a = this._getLayout();
		var c = this._shouldShowFaces() ? 'show' : 'hide';
		var b = {
			standard : {
				show : 80,
				hide : 35
			},
			bar : {
				show : 45,
				hide : 35
			},
			button_count : {
				show : 21,
				hide : 21
			}
		};
		return b[a][c];
	},
	_getWidgetWidth : function() {
		var d = this._getLayout();
		var f = this._shouldShowFaces() ? 'show' : 'hide';
		var b = this.getAttribute('action') === 'recommend' ? 130 : 90;
		var e = {
			standard : {
				show : 450,
				hide : 450
			},
			bar : {
				show : 700,
				hide : 450
			},
			button_count : {
				show : b,
				hide : b
			}
		};
		var c = e[d][f];
		var g = this._getPxAttribute('width', c);
		var a = {
			bar : {
				min : 600,
				max : 900
			},
			standard : {
				min : 225,
				max : 900
			},
			button_count : {
				min : b,
				max : 900
			}
		};
		if (g < a[d].min) {
			g = a[d].min;
		} else if (g > a[d].max)
			g = a[d].max;
		return g;
	},
	_getLayout : function() {
		return this._getAttributeFromList('layout', 'standard', [ 'standard',
				'bar', 'button_count' ]);
	},
	_shouldShowFaces : function() {
		return this._getLayout() !== 'button_count'
				&& this._getBoolAttribute('show-faces', true);
	},
	_handleEdgeCommentDialogPresentation : function(b) {
		if (!this.isValid())
			return;
		var a = document.createElement('span');
		var c = {
			commentNode : a,
			externalUrl : b.externalURL,
			width : 330,
			height : 200,
			masterFrameName : b.masterFrameName,
			relativeHeightOffset : '26px'
		};
		this._commentSlave = new FB.XFBML.EdgeCommentWidget(c);
		this.dom.appendChild(a);
		this._commentSlave.process();
		this._commentWidgetNode = a;
	},
	_handleEdgeCommentDialogDismissal : function(a) {
		if (this._commentWidgetNode) {
			this.dom.removeChild(this._commentWidgetNode);
			delete this._commentWidgetNode;
		}
	},
	_handleEdgeCommentDialogHide : function() {
		if (this._commentWidgetNode)
			this._commentWidgetNode.style.display = "none";
	},
	_handleEdgeCommentDialogShow : function() {
		if (this._commentWidgetNode)
			this._commentWidgetNode.style.display = "block";
	},
	_onEdgeCreate : function() {
		this.fire('edge.create', this._attr.href);
		FB.Event.fire('edge.create', this._attr.href, this);
		FB.Helper.invokeHandler(this.getAttribute('on-create'), this,
				[ this._attr.href ]);
	}
});
FB.subclass('XFBML.Like', 'XFBML.EdgeWidget', null, {
	getUrlBits : function() {
		return {
			name : 'like',
			params : this._attr
		};
	}
});
FB
		.subclass(
				'XFBML.LikeBox',
				'XFBML.IframeWidget',
				null,
				{
					_visibleAfter : 'load',
					setupAndValidate : function() {
						this._attr = {
							api_key : FB._apiKey,
							connections : this
									.getAttribute('connections', '10'),
							css : this.getAttribute('css'),
							height : this.getAttribute('height'),
							id : this.getAttribute('profile-id'),
							header : this._getBoolAttribute('header', true),
							name : this.getAttribute('name'),
							stream : this._getBoolAttribute('stream', true),
							width : this._getPxAttribute('width', 300)
						};
						if (!this._attr.id && !this._attr.name) {
							FB
									.log('<fb:like-box> requires one of the "id" or "name" attributes.');
							return false;
						}
						var a = this._attr.height;
						if (!a)
							if ((!this._attr.connections || this._attr.connections === '0')
									&& !this._attr.stream) {
								a = 62;
							} else {
								a = 95;
								if (this._attr.connections
										&& this._attr.connections !== '0')
									a += 160;
								if (this._attr.stream)
									a += 300;
								if (this._attr.header
										&& this._attr.header !== '0')
									a += 32;
							}
						this._attr.height = a;
						return true;
					},
					getSize : function() {
						return {
							width : this._attr.width,
							height : this._attr.height
						};
					},
					getUrlBits : function() {
						return {
							name : 'likebox',
							params : this._attr
						};
					}
				});
FB.subclass('XFBML.LiveStream', 'XFBML.IframeWidget', null, {
	_visibleAfter : 'load',
	setupAndValidate : function() {
		this._attr = {
			height : this._getPxAttribute('height', 500),
			hideFriendsTab : this.getAttribute('hide-friends-tab'),
			redesigned : this._getBoolAttribute('redesigned-stream'),
			width : this._getPxAttribute('width', 400),
			xid : this.getAttribute('xid', 'default'),
			always_post_to_friends : this._getBoolAttribute(
					'always-post-to-friends', false)
		};
		return true;
	},
	getSize : function() {
		return {
			width : this._attr.width,
			height : this._attr.height
		};
	},
	getUrlBits : function() {
		var a = this._attr.redesigned ? 'live_stream_box' : 'livefeed';
		return {
			name : a,
			params : this._attr
		};
	}
});
FB.subclass('XFBML.Login', 'XFBML.Facepile', null, {
	_visibleAfter : 'load',
	getSize : function() {
		return {
			width : this._attr.width,
			height : 94
		};
	},
	getUrlBits : function() {
		return {
			name : 'login',
			params : this._attr
		};
	}
});
FB.subclass('XFBML.LoginButton', 'XFBML.ButtonElement', null,
		{
			setupAndValidate : function() {
				this.autologoutlink = this
						._getBoolAttribute('auto-logout-link');
				this.onlogin = this.getAttribute('on-login');
				this.perms = this.getAttribute('perms');
				this.length = this._getAttributeFromList('length', 'short', [
						'long', 'short' ]);
				if (this.autologoutlink)
					FB.Event.subscribe('auth.statusChange', FB.bind(
							this.process, this));
				return true;
			},
			getButtonMarkup : function() {
				var a = this.getOriginalHTML();
				if (a === '') {
					if (FB.getSession() && this.autologoutlink) {
						return FB.Intl._tx("Facebook Logout");
					} else
						return this.length == 'short' ? FB.Intl._tx("Login")
								: FB.Intl._tx("Login with Facebook");
				} else
					return a;
			},
			onClick : function() {
				if (!FB.getSession() || !this.autologoutlink) {
					FB.login(FB.bind(this._authCallback, this), {
						perms : this.perms
					});
				} else
					FB.logout(FB.bind(this._authCallback, this));
			},
			_authCallback : function(a) {
				FB.Helper.invokeHandler(this.onlogin, this, [ a ]);
			}
		});
FB.subclass('XFBML.Name', 'XFBML.Element', null, {
	process : function() {
		FB.copy(this, {
			_uid : this.getAttribute('uid'),
			_firstnameonly : this._getBoolAttribute('first-name-only'),
			_lastnameonly : this._getBoolAttribute('last-name-only'),
			_possessive : this._getBoolAttribute('possessive'),
			_reflexive : this._getBoolAttribute('reflexive'),
			_objective : this._getBoolAttribute('objective'),
			_linked : this._getBoolAttribute('linked', true),
			_subjectId : this.getAttribute('subject-id')
		});
		if (!this._uid) {
			FB.log('"uid" is a required attribute for <fb:name>');
			this.fire('render');
			return;
		}
		var b = [];
		if (this._firstnameonly) {
			b.push('first_name');
		} else if (this._lastnameonly) {
			b.push('last_name');
		} else
			b.push('name');
		if (this._subjectId) {
			b.push('sex');
			if (this._subjectId == FB.Helper.getLoggedInUser())
				this._reflexive = true;
		}
		var a;
		FB.Event.monitor('auth.statusChange', this.bind(function() {
			if (!this.isValid()) {
				this.fire('render');
				return true;
			}
			if (FB._userStatus) {
				if (this._uid == 'loggedinuser')
					this._uid = FB.Helper.getLoggedInUser();
				if (FB.Helper.isUser(this._uid)) {
					a = FB.Data._selectByIndex(b, 'user', 'uid', this._uid);
				} else
					a = FB.Data._selectByIndex( [ 'name', 'id' ], 'profile',
							'id', this._uid);
				a.wait(this.bind(function(c) {
					if (this._uid)
						if (this._subjectId == this._uid) {
							this._renderPronoun(c[0]);
						} else
							this._renderOther(c[0]);
					this.fire('render');
				}));
			}
			return false;
		}));
	},
	_renderPronoun : function(b) {
		var c = '', a = this._objective;
		if (this._subjectId) {
			a = true;
			if (this._subjectId === this._uid)
				this._reflexive = true;
		}
		if (this._uid == FB.Connect.get_loggedInUser()
				&& this._getBoolAttribute('use-you', true)) {
			if (this._possessive) {
				if (this._reflexive) {
					c = 'your own';
				} else
					c = 'your';
			} else if (this._reflexive) {
				c = 'yourself';
			} else
				c = 'you';
		} else
			switch (b.sex) {
			case 'male':
				if (this._possessive) {
					c = this._reflexive ? 'his own' : 'his';
				} else if (this._reflexive) {
					c = 'himself';
				} else if (a) {
					c = 'him';
				} else
					c = 'he';
				break;
			case 'female':
				if (this._possessive) {
					c = this._reflexive ? 'her own' : 'her';
				} else if (this._reflexive) {
					c = 'herself';
				} else if (a) {
					c = 'her';
				} else
					c = 'she';
				break;
			default:
				if (this._getBoolAttribute('use-they', true)) {
					if (this._possessive) {
						if (this._reflexive) {
							c = 'their own';
						} else
							c = 'their';
					} else if (this._reflexive) {
						c = 'themselves';
					} else if (a) {
						c = 'them';
					} else
						c = 'they';
				} else if (this._possessive) {
					if (this._reflexive) {
						c = 'his/her own';
					} else
						c = 'his/her';
				} else if (this._reflexive) {
					c = 'himself/herself';
				} else if (a) {
					c = 'him/her';
				} else
					c = 'he/she';
				break;
			}
		if (this._getBoolAttribute('capitalize', false))
			c = FB.Helper.upperCaseFirstChar(c);
		this.dom.innerHTML = c;
	},
	_renderOther : function(c) {
		if (!c)
			return;
		var b = '', a = '';
		if (this._uid == FB.Helper.getLoggedInUser()
				&& this._getBoolAttribute('use-you', true)) {
			if (this._reflexive) {
				if (this._possessive) {
					b = 'your own';
				} else
					b = 'yourself';
			} else if (this._possessive) {
				b = 'your';
			} else
				b = 'you';
		} else {
			if (null === c.first_name)
				c.first_name = '';
			if (null === c.last_name)
				c.last_name = '';
			if (this._firstnameonly) {
				b = c.first_name;
			} else if (this._lastnameonly)
				b = c.last_name;
			if (!b)
				b = c.name;
			if (b !== '' && this._possessive)
				b += '\'s';
		}
		if (!b)
			b = this.getAttribute('if-cant-see', 'Facebook User');
		if (b) {
			if (this._getBoolAttribute('capitalize', false))
				b = FB.Helper.upperCaseFirstChar(b);
			if (this._linked) {
				a = FB.Helper.getProfileLink(c, b, this.getAttribute('href',
						null));
			} else
				a = b;
		}
		this.dom.innerHTML = a;
	}
});
FB
		.subclass(
				'XFBML.ProfilePic',
				'XFBML.Element',
				null,
				{
					process : function() {
						var d = this.getAttribute('size', 'thumb'), b = FB.XFBML.ProfilePic._sizeToPicFieldMap[d], g = this
								._getPxAttribute('width'), a = this
								._getPxAttribute('height'), e = this.dom.style, f = this
								.getAttribute('uid');
						if (this._getBoolAttribute('facebook-logo'))
							b += '_with_logo';
						if (g) {
							g = g + 'px';
							e.width = g;
						}
						if (a) {
							a = a + 'px';
							e.height = a;
						}
						var c = this
								.bind(function(j) {
									var l = j ? j[0] : null, i = l ? l[b]
											: null;
									if (!i)
										i = FB._domain.cdn
												+ FB.XFBML.ProfilePic._defPicMap[b];
									var k = ((g ? 'width:' + g + ';' : '') + (a ? 'height:' + g + ';'
											: '')), h = FB.String
											.format(
													'<img src="{0}" alt="{1}" title="{1}" style="{2}" class="{3}" />',
													i, l ? l.name : '', k,
													this.dom.className);
									if (this._getBoolAttribute('linked', true))
										h = FB.Helper.getProfileLink(l, h, this
												.getAttribute('href', null));
									this.dom.innerHTML = h;
									FB.Dom.addCss(this.dom,
											'fb_profile_pic_rendered');
									this.fire('render');
								});
						FB.Event
								.monitor(
										'auth.statusChange',
										this
												.bind(function() {
													if (!this.isValid()) {
														this.fire('render');
														return true;
													}
													if (this.getAttribute(
															'uid', null) == 'loggedinuser')
														f = FB.Helper
																.getLoggedInUser();
													if (FB._userStatus && f) {
														FB.Data
																._selectByIndex(
																		[
																				'name',
																				b ],
																		FB.Helper
																				.isUser(f) ? 'user'
																				: 'profile',
																		FB.Helper
																				.isUser(f) ? 'uid'
																				: 'id',
																		f)
																.wait(c);
													} else
														c();
												}));
					}
				});
FB.provide('XFBML.ProfilePic', {
	_defPicMap : {
		pic : 'pics/s_silhouette.jpg',
		pic_big : 'pics/d_silhouette.gif',
		pic_big_with_logo : 'pics/d_silhouette_logo.gif',
		pic_small : 'pics/t_silhouette.jpg',
		pic_small_with_logo : 'pics/t_silhouette_logo.gif',
		pic_square : 'pics/q_silhouette.gif',
		pic_square_with_logo : 'pics/q_silhouette_logo.gif',
		pic_with_logo : 'pics/s_silhouette_logo.gif'
	},
	_sizeToPicFieldMap : {
		n : 'pic_big',
		normal : 'pic_big',
		q : 'pic_square',
		s : 'pic',
		small : 'pic',
		square : 'pic_square',
		t : 'pic_small',
		thumb : 'pic_small'
	}
});
FB.subclass('XFBML.Recommendations', 'XFBML.IframeWidget', null, {
	_visibleAfter : 'load',
	_refreshOnAuthChange : true,
	setupAndValidate : function() {
		this._attr = {
			border_color : this.getAttribute('border-color'),
			colorscheme : this.getAttribute('color-scheme'),
			font : this.getAttribute('font'),
			header : this._getBoolAttribute('header'),
			height : this._getPxAttribute('height', 300),
			site : this.getAttribute('site', location.hostname),
			width : this._getPxAttribute('width', 300)
		};
		return true;
	},
	getSize : function() {
		return {
			width : this._attr.width,
			height : this._attr.height
		};
	},
	getUrlBits : function() {
		return {
			name : 'recommendations',
			params : this._attr
		};
	}
});
FB.subclass('XFBML.ServerFbml', 'XFBML.IframeWidget', null, {
	_visibleAfter : 'resize',
	setupAndValidate : function() {
		this._attr = {
			channel_url : this.getChannelUrl(),
			fbml : this.getAttribute('fbml'),
			width : this._getPxAttribute('width')
		};
		if (!this._attr.fbml) {
			var a = this.dom.getElementsByTagName('script')[0];
			if (a && a.type === 'text/fbml')
				this._attr.fbml = a.innerHTML;
		}
		if (!this._attr.fbml) {
			FB.log('<fb:serverfbml> requires the "fbml" attribute.');
			return false;
		}
		return true;
	},
	getSize : function() {
		return {
			width : this._attr.width,
			height : this._attr.height
		};
	},
	getUrlBits : function() {
		return {
			name : 'serverfbml',
			params : this._attr
		};
	}
});
FB
		.subclass(
				'XFBML.ShareButton',
				'XFBML.Element',
				null,
				{
					process : function() {
						this._href = this.getAttribute('href',
								window.location.href);
						this._type = this.getAttribute('type', 'icon_link');
						this._renderButton(true);
					},
					_renderButton : function(f) {
						if (!this.isValid()) {
							this.fire('render');
							return;
						}
						var b = '', c = '', d = '', a = '', e = FB.Intl
								._tx("Share"), g = '';
						switch (this._type) {
						case 'icon':
						case 'icon_link':
							a = 'fb_button_simple';
							b = ('<span class="fb_button_text">' + (this._type == 'icon_link' ? e
									: '&nbsp;') + '</span>');
							f = false;
							break;
						case 'link':
							b = FB.Intl._tx("Share on Facebook");
							f = false;
							break;
						case 'button':
							b = '<span class="fb_button_text">' + e + '</span>';
							a = 'fb_button fb_button_small';
							f = false;
							break;
						case 'button_count':
							b = '<span class="fb_button_text">' + e + '</span>';
							c = ('<span class="fb_share_count_nub_right">&nbsp;</span>' + '<span class="fb_share_count fb_share_count_right">' + this
									._getCounterMarkup() + '</span>');
							a = 'fb_button fb_button_small';
							break;
						default:
							b = '<span class="fb_button_text">' + e + '</span>';
							d = ('<span class="fb_share_count_nub_top">&nbsp;</span>' + '<span class="fb_share_count fb_share_count_top">' + this
									._getCounterMarkup() + '</span>');
							a = 'fb_button fb_button_small';
							g = 'fb_share_count_wrapper';
						}
						this.dom.innerHTML = FB.String
								.format(
										'<span class="{0}">{4}<a href="{1}" class="{2}" ' + 'onclick=\'FB.ui({6});return false;\'' + 'target="_blank">{3}</a>{5}</span>',
										g, this._href, a, b, d, c, FB.JSON
												.stringify( {
													method : 'stream.share',
													u : this._href
												}));
						if (!f)
							this.fire('render');
					},
					_getCounterMarkup : function() {
						if (!this._count)
							this._count = FB.Data._selectByIndex(
									[ 'total_count' ], 'link_stat', 'url',
									this._href);
						if (this._count.value !== undefined) {
							if (this._count.value.length > 0) {
								var a = this._count.value[0].total_count;
								if (a > 3) {
									var b = a >= 1e+07 ? Math.round(a / 1e+06) + 'M'
											: (a >= 10000 ? Math
													.round(a / 1000) + 'K' : a);
									return ('<span class="fb_share_count_inner">' + b + '</span>');
								}
							}
						} else
							this._count.wait(FB.bind(this._renderButton, this,
									false));
						return '';
					}
				});
FB
		.subclass(
				'XFBML.SocialBar',
				'XFBML.IframeWidget',
				null,
				{
					_showLoader : false,
					_initialWidth : 860,
					_initialHeight : 29,
					_barIframe : null,
					_currentZ : 0,
					_currentChildRight : 0,
					_refreshOnAuthChange : true,
					_visibleAfter : 'load',
					_minimizeToolbar : function(c) {
						var a = this._barIframe;
						c.resetWidth = false;
						if (c.width == '100%') {
							var d = parseInt(FB.Dom.getStyle(a.parentNode,
									'width'), 10);
							c.resetWidth = true;
							c.width = d;
						}
						FB.Anim.ate(a, {
							width : c.width + 'px'
						}, 300, function(e) {
							if (c.resetWidth)
								e.style.width = '100%';
						});
						var b = this.dom.getElementsByTagName('iframe');
						FB.Array
								.forEach(
										b,
										function(e) {
											if (e.parentNode.className == 'fb_social_bar_container')
												return;
											if (!e._isHidden) {
												e._origHeight = parseInt(FB.Dom
														.getStyle(e, 'height'),
														10);
												e._origWidth = parseInt(FB.Dom
														.getStyle(e, 'width'),
														10);
												FB.Anim.ate(e, {
													height : '0px',
													width : '0px',
													opacity : 0
												}, 300);
												e._isHidden = true;
											} else {
												FB.Anim
														.ate(
																e,
																{
																	height : e._origHeight + 'px',
																	width : e._origWidth + 'px',
																	opacity : 100
																});
												e._isHidden = false;
											}
										});
					},
					_spawnChild : function(c) {
						var b = this._barIframe, a = this;
						var e = document.createElement('span');
						var d = parseInt(FB.Dom.getStyle(b.parentNode,
								'padding-right'), 10)
								+ this._currentChildRight
								+ parseInt(c.minimizeWidth, 10);
						b.parentNode.appendChild(e);
						FB.Content
								.insertIframe( {
									root : e,
									name : c.name,
									url : c.src,
									className : 'fb_social_bar_iframe',
									width : c.width,
									height : 0,
									onload : function(f) {
										f.style.position = 'absolute';
										f.style[a._attr.position] = a._initialHeight + 'px';
										f.style.right = d + 'px';
										f.style.zIndex = ++a._currentZ;
										FB.Anim.ate(f, {
											height : c.height + 'px',
											opacity : 100
										});
									}
								});
						this._currentChildRight += parseInt(c.width, 10);
					},
					_removeChild : function(d) {
						var e = 0;
						var c = this.dom.getElementsByTagName('iframe');
						for ( var b = 1; b < c.length; b++) {
							var a = c[b];
							if (a.name == d.name) {
								var f = parseInt(FB.Dom.getStyle(a, 'width'),
										10);
								e += f;
								this._currentChildRight -= f;
								FB.Anim.ate(a, {
									height : '0px',
									opacity : 0
								}, 300, function(g) {
									g.parentNode.parentNode
											.removeChild(g.parentNode);
								});
							} else
								FB.Anim.ate(a, {
									right : parseInt(FB.Dom
											.getStyle(a, 'right'), 10)
											- e + 'px'
								}, 300);
						}
					},
					_iframeOnLoad : function() {
						var b = this._barIframe = this.getIframeNode(), a = b.parentNode;
						a.className = 'fb_social_bar_container';
						b.style.width = '100%';
						this._currentZ += parseInt(
								FB.Dom.getStyle(b, 'zIndex'), 10);
						var c = {
							opacity : 100
						};
						b.className = 'fb_social_bar_iframe';
						if (!window.XMLHttpRequest) {
							a.style.position = 'absolute';
							a.className += ' fb_social_bar_iframe' + this._attr.position + '_ie6';
						} else {
							FB.Anim.ate(b, c);
							a.style[this._attr.position] = (-1 * this._initialHeight) + 'px';
							c[this._attr.position] = '0px';
						}
						FB.Anim.ate(a, c);
					},
					oneTimeSetup : function() {
						this.subscribe('xd.minimizeToolbar', FB.bind(
								this._minimizeToolbar, this));
						this.subscribe('xd.spawnChild', FB.bind(
								this._spawnChild, this));
						this.subscribe('xd.removeChild', FB.bind(
								this._removeChild, this));
						this.subscribe('iframe.onload', FB.bind(
								this._iframeOnLoad, this));
					},
					getUrlBits : function() {
						return {
							name : 'social_bar',
							params : this._attr
						};
					},
					getSize : function() {
						return {
							width : this._initialWidth,
							height : this._initialHeight
						};
					},
					setupAndValidate : function() {
						this._attr = {
							like : this._getBoolAttribute('like'),
							send : this._getBoolAttribute('send'),
							activity : this._getBoolAttribute('activity'),
							chat : this._getBoolAttribute('chat'),
							position : this._getAttributeFromList('position',
									'bottom', [ 'top', 'bottom' ]),
							site : this.getAttribute('site', location.hostname),
							channel : this.getChannelUrl()
						};
						return true;
					}
				});
void (0);

FB.provide("", {
	"_domain" : {
		"api" : "https:\/\/api.facebook.com\/",
		"api_read" : "https:\/\/api-read.facebook.com\/",
		"cdn" : "http:\/\/static.ak.fbcdn.net\/",
		"graph" : "https:\/\/graph.facebook.com\/",
		"staticfb" : "http:\/\/static.ak.facebook.com\/",
		"www" : "http:\/\/www.facebook.com\/"
	},
	"_locale" : "en_US"
}, true);
FB.provide("Flash", {
	"_minVersions" : [ [ 9, 0, 159, 0 ], [ 10, 0, 22, 87 ] ],
	"_swfPath" : "rsrc.php\/z6D2S\/hash\/c729bxo3.swf"
}, true);
FB.provide("XFBML.ConnectBar", {
	"imgs" : {
		"buttonUrl" : "rsrc.php\/z6PMX\/hash\/3fjrfzwb.png"
	}
}, true);
FB.provide("XFBML.ProfilePic", {
	"_defPicMap" : {
		"pic" : "rsrc.php\/zCN9D\/hash\/8l4nfau6.jpg",
		"pic_big" : "rsrc.php\/zBPOE\/hash\/k9bm7yii.gif",
		"pic_big_with_logo" : "rsrc.php\/zNZOF\/hash\/f3zlirsm.gif",
		"pic_small" : "rsrc.php\/z3ZLQ\/hash\/16xbk6xz.jpg",
		"pic_small_with_logo" : "rsrc.php\/z1RLR\/hash\/c1lvcd6d.gif",
		"pic_square" : "rsrc.php\/z5HB7\/hash\/ecyu2wwn.gif",
		"pic_square_with_logo" : "rsrc.php\/z5R3Z\/hash\/d91h84jp.gif",
		"pic_with_logo" : "rsrc.php\/z2MBJ\/hash\/43j60xpm.gif"
	}
}, true);
if (FB.Dom && FB.Dom.addCssRules) {
	FB.Dom
			.addCssRules(
					".fb_hidden{position:absolute;top:-10000px;z-index:10001}\n.fb_reset{background:none;border-spacing:0;border:0;color:#000;cursor:auto;direction:ltr;font-family:\"lucida grande\", tahoma, verdana, arial, sans-serif;font-size:11px;font-style:normal;font-variant:normal;font-weight:normal;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal}\n.fb_link img{border:none}\n.fb_dialog{position:absolute;top:-10000px;z-index:10001}\n.fb_dialog_advanced{background:rgba(82, 82, 82, .7);padding:10px;-moz-border-radius:8px;-webkit-border-radius:8px}\n.fb_dialog_content{background:#fff;color:#333}\n.fb_dialog_close_icon{background:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/zA63Q\/hash\/8o4lssjn.gif) no-repeat scroll 3px 0 transparent;cursor:pointer;display:block;height:16px;position:absolute;right:19px;top:18px;width:14px;top:10px\\9;right:7px\\9}\n.fb_dialog_close_icon:hover{background:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/zA63Q\/hash\/8o4lssjn.gif) no-repeat scroll -10px 0 transparent}\n.fb_dialog_loader{background-color:#f2f2f2;border:1px solid #606060;font-size:24px;padding:20px}\n#fb_dialog_loader_close{background:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/z2APY\/hash\/41s5ptdj.gif) no-repeat scroll left top transparent;cursor:pointer;display:-moz-inline-block;display:inline-block;height:9px;margin-left:20px;position:relative;vertical-align:middle;width:9px}\n#fb_dialog_loader_close:hover{background-image:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/z7ZL1\/hash\/bf2f4q72.png)}\n.fb_dialog_top_left,\n.fb_dialog_top_right,\n.fb_dialog_bottom_left,\n.fb_dialog_bottom_right{height:10px;width:10px;overflow:hidden;position:absolute}\n.fb_dialog_top_left{background:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/zEYDZ\/hash\/4xk9rts8.png) no-repeat 0 0;left:-10px;top:-10px}\n.fb_dialog_top_right{background:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/zEYDZ\/hash\/4xk9rts8.png) no-repeat 0 -10px;right:-10px;top:-10px}\n.fb_dialog_bottom_left{background:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/zEYDZ\/hash\/4xk9rts8.png) no-repeat 0 -20px;bottom:-10px;left:-10px}\n.fb_dialog_bottom_right{background:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/zEYDZ\/hash\/4xk9rts8.png) no-repeat 0 -30px;right:-10px;bottom:-10px}\n.fb_dialog_vert_left,\n.fb_dialog_vert_right,\n.fb_dialog_horiz_top,\n.fb_dialog_horiz_bottom{position:absolute;background:#525252;filter:alpha(opacity=70);opacity:.7}\n.fb_dialog_vert_left,\n.fb_dialog_vert_right{width:10px;height:100%}\n.fb_dialog_vert_left{margin-left:-10px}\n.fb_dialog_vert_right{right:0;margin-right:-10px}\n.fb_dialog_horiz_top,\n.fb_dialog_horiz_bottom{width:100%;height:10px}\n.fb_dialog_horiz_top{margin-top:-10px}\n.fb_dialog_horiz_bottom{bottom:0;margin-bottom:-10px}\n.fb_dialog_iframe{line-height:0}\n.fb_iframe_widget{position:relative;display:-moz-inline-block;display:inline-block}\n.fb_iframe_widget iframe{position:relative;vertical-align:text-bottom}\n.fb_iframe_widget span{position:relative}\n.fb_hide_iframes iframe{position:relative;left:-10000px}\n.fb_iframe_widget_loader{position:relative;display:inline-block}\n.fb_iframe_widget_loader iframe{min-height:32px;z-index:2;zoom:1}\n.fb_iframe_widget_loader .FB_Loader{background:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/z5R48\/hash\/ejut8v2y.gif) no-repeat;height:32px;width:32px;margin-left:-16px;position:absolute;left:50%;z-index:4}\n.fb_button_simple,\n.fb_button_simple_rtl{background-image:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/z6IY3\/hash\/5gh7aaaq.png);background-repeat:no-repeat;cursor:pointer;outline:none;text-decoration:none}\n.fb_button_simple_rtl{background-position:right 0}\n.fb_button_simple .fb_button_text{margin:0 0 0 20px;padding-bottom:1px}\n.fb_button_simple_rtl .fb_button_text{margin:0 10px 0 0}\na.fb_button_simple:hover .fb_button_text,\na.fb_button_simple_rtl:hover .fb_button_text,\n.fb_button_simple:hover .fb_button_text,\n.fb_button_simple_rtl:hover .fb_button_text{text-decoration:underline}\n.fb_button,\n.fb_button_rtl{background:#29447e url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/zDYYQ\/hash\/deh9tyqv.png);background-repeat:no-repeat;cursor:pointer;display:inline-block;padding:0 0 0 1px;text-decoration:none;outline:none}\n.fb_button .fb_button_text,\n.fb_button_rtl .fb_button_text{background:#5f78ab url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/zDYYQ\/hash\/deh9tyqv.png);border-top:solid 1px #879ac0;border-bottom:solid 1px #1a356e;color:#fff;display:block;font-family:\"lucida grande\",tahoma,verdana,arial,sans-serif;font-weight:bold;padding:2px 6px 3px 6px;margin:1px 1px 0 21px;text-shadow:none}\na.fb_button,\na.fb_button_rtl,\n.fb_button,\n.fb_button_rtl{text-decoration:none}\na.fb_button:active .fb_button_text,\na.fb_button_rtl:active .fb_button_text,\n.fb_button:active .fb_button_text,\n.fb_button_rtl:active .fb_button_text{border-bottom:solid 1px #29447e;border-top:solid 1px #45619d;background:#4f6aa3;text-shadow:none}\n.fb_button_xlarge,\n.fb_button_xlarge_rtl{background-position:left -60px;font-size:24px;line-height:30px}\n.fb_button_xlarge .fb_button_text{padding:3px 8px 3px 12px;margin-left:38px}\na.fb_button_xlarge:active{background-position:left -99px}\n.fb_button_xlarge_rtl{background-position:right -268px}\n.fb_button_xlarge_rtl .fb_button_text{padding:3px 8px 3px 12px;margin-right:39px}\na.fb_button_xlarge_rtl:active{background-position:right -307px}\n.fb_button_large,\n.fb_button_large_rtl{background-position:left -138px;font-size:13px;line-height:16px}\n.fb_button_large .fb_button_text{margin-left:24px;padding:2px 6px 4px 6px}\na.fb_button_large:active{background-position:left -163px}\n.fb_button_large_rtl{background-position:right -346px}\n.fb_button_large_rtl .fb_button_text{margin-right:25px}\na.fb_button_large_rtl:active{background-position:right -371px}\n.fb_button_medium,\n.fb_button_medium_rtl{background-position:left -188px;font-size:11px;line-height:14px}\na.fb_button_medium:active{background-position:left -210px}\n.fb_button_medium_rtl{background-position:right -396px}\n.fb_button_text_rtl,\n.fb_button_medium_rtl .fb_button_text{padding:2px 6px 3px 6px;margin-right:22px}\na.fb_button_medium_rtl:active{background-position:right -418px}\n.fb_button_small,\n.fb_button_small_rtl{background-position:left -232px;font-size:10px;line-height:10px}\n.fb_button_small .fb_button_text{padding:2px 6px 3px;margin-left:17px}\na.fb_button_small:active,\n.fb_button_small:active{background-position:left -250px}\n.fb_button_small_rtl{background-position:right -440px}\n.fb_button_small_rtl .fb_button_text{padding:2px 6px;margin-right:18px}\na.fb_button_small_rtl:active{background-position:right -458px}\n.fb_connect_bar_container div,\n.fb_connect_bar_container span,\n.fb_connect_bar_container a,\n.fb_connect_bar_container img,\n.fb_connect_bar_container strong{background:none;border-spacing:0;border:0;direction:ltr;font-style:normal;font-variant:normal;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal;vertical-align:baseline}\n.fb_connect_bar_container{position:fixed;left:0 !important;right:0 !important;height:42px !important;padding:0 25px !important;margin:0 !important;vertical-align:middle !important;border-bottom:1px solid #333 !important;background:#3b5998 !important;z-index:99999999 !important;overflow:hidden !important}\n.fb_connect_bar_container_ie6{position:absolute;top:expression(document.compatMode==\"CSS1Compat\"? document.documentElement.scrollTop+\"px\":body.scrollTop+\"px\")}\n.fb_connect_bar{position:relative;margin:auto;height:100%;width:100%;padding:6px 0 0 0 !important;background:none;color:#fff !important;font-family:\"lucida grande\", tahoma, verdana, arial, sans-serif !important;font-size:13px !important;font-style:normal !important;font-variant:normal !important;font-weight:normal !important;letter-spacing:normal !important;line-height:1 !important;text-decoration:none !important;text-indent:0 !important;text-shadow:none !important;text-transform:none !important;white-space:normal !important;word-spacing:normal !important}\n.fb_connect_bar a:hover{color:#fff}\n.fb_connect_bar .fb_profile img{height:30px;width:30px;vertical-align:middle;margin:0 6px 5px 0}\n.fb_connect_bar div a,\n.fb_connect_bar span,\n.fb_connect_bar span a{color:#bac6da;font-size:11px;text-decoration:none}\n.fb_connect_bar .fb_buttons{float:right;margin-top:7px}\n.fb_edge_widget_with_comment{position:relative;*z-index:1000}\n.fb_edge_widget_with_comment span.fb_edge_comment_widget{left:-4px;position:absolute}\n.fb_share_count_wrapper{position:relative;float:left}\n.fb_share_count{background:#b0b9ec none repeat scroll 0 0;color:#333;font-family:\"lucida grande\", tahoma, verdana, arial, sans-serif;text-align:center}\n.fb_share_count_inner{background:#e8ebf2;display:block}\n.fb_share_count_right{margin-left:-1px;display:inline-block}\n.fb_share_count_right .fb_share_count_inner{border-top:solid 1px #e8ebf2;border-bottom:solid 1px #b0b9ec;margin:1px 1px 0 1px;font-size:10px;line-height:10px;padding:2px 6px 3px;font-weight:bold}\n.fb_share_count_top{display:block;letter-spacing:-1px;line-height:34px;margin-bottom:7px;font-size:22px;border:solid 1px #b0b9ec}\n.fb_share_count_nub_top{border:none;display:block;position:absolute;left:7px;top:35px;margin:0;padding:0;width:6px;height:7px;background-repeat:no-repeat;background-image:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/zCXBS\/hash\/89zgzk50.png)}\n.fb_share_count_nub_right{border:none;display:inline-block;padding:0;width:5px;height:10px;background-repeat:no-repeat;background-image:url(http:\/\/static.ak.fbcdn.net\/rsrc.php\/zAQB0\/hash\/1a8txe26.png);vertical-align:top;background-position:right 5px;z-index:10;left:2px;margin:0 2px 0 0;position:relative}\n.fb_share_no_count{display:none}\n.fb_share_size_Small .fb_share_count_right .fb_share_count_inner{font-size:10px}\n.fb_share_size_Medium .fb_share_count_right .fb_share_count_inner{font-size:11px;padding:2px 6px 3px;letter-spacing:-1px;line-height:14px}\n.fb_share_size_Large .fb_share_count_right .fb_share_count_inner{font-size:13px;line-height:16px;padding:2px 6px 4px;font-weight:normal;letter-spacing:-1px}\n.fb_social_bar_container{position:fixed;left:0;right:0;height:29px;padding:0 25px}\n.fb_social_bar_iframe{position:relative;float:right;opacity:0;-moz-opacity:0;filter:alpha(opacity=0)}\n.fb_social_bar_iframe_bottom_ie6{bottom:auto;top:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0)))}\n.fb_social_bar_iframe_top_ie6{bottom:auto;top:expression(eval(document.documentElement.scrollTop-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0)))}",
					[ "fb.css.base", "fb.css.dialog", "fb.css.iframewidget",
							"fb.css.button", "fb.css.connectbarwidget",
							"fb.css.edgecommentwidget", "fb.css.sharebutton",
							"fb.css.socialbarwidget" ]);
}