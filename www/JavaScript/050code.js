//document.domain = "fbtest.peekattack.com";



var numberOfSnapshots = 3;//LIVE!


var facebookUserInfo = {};

var partner;//Partner object conatins all the info and the pipe

var initialized = {};

var loadingDialog;

var saveSnapshotUrl = "snapshots/snapshot_to_facebook.php";//LIVE

	
var snapshotPath = "http://sn.peekattack.com/snapshots/";
var snapshotThumbsPath = "http://sn.peekattack.com/thumbs/";

//Extensions are dictated by the chosen encoder in Flash Snapshots.as
var snapshotExtension 		= "png";
var snapshotThumbsExtension = "jpg";

var loadingRetryTimer;

var adsIFrame;


var allowedHosts = ["peekattack.com"]; 
var allowedSites = ["http://apps.facebook.com/peekattackmax/","http://apps.facebook.com/peekattack/","http://apps.facebook.com/peekattacktest/"]; 


// ################# Date #########################
var DateFormat = {
	weekDaysLong: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
	weekDaysShort: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
	monthNamesLong: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
	monthNamesShort:[ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
	getDate: function(timestamp){
		var d = new Date();
		d.setTime(timestamp);
		return d;
	},
	getTime12: function(date){
		var h;
		var m;
		var am;
		if(date.getHours() == 0){
			h = 12;
			am = true;
		}else if(date.getHours() < 12){
			h = date.getHours();
			am = true;
		}else if(date.getHours() == 12){
			h = 12;
			am = false;
		}else if(date.getHours() > 12){
			h = date.getHours()-12;
			am = false;
		}
		m = date.getMinutes();
		return h + ":" + ((m<10)?"0":"") + m + "" + ((am)?"am":"pm");
	},
	getLongDateString: function(timestamp){
		var d = this.getDate(timestamp);
		var str = this.weekDaysLong[d.getDay()] + ", ";
		str += d.getDate() + " ";
		str += this.monthNamesLong[d.getMonth()] + " ";
		str += d.getFullYear() + ", ";
		str += this.getTime12(d);
		return str;
	},
	getShortDateString: function(timestamp){
		var d = this.getDate(timestamp);
		var now = new Date();
		var str;
		if( now.getTime() - d.getTime() < 86400000 && now.getDate() == d.getDate() ){
			str = this.getTime12(d);
		}else{
			str = d.getDate() + " ";
			str += this.monthNamesShort[d.getMonth()] + " ";
			str += d.getFullYear();
		}
		return str;
	}
}



//################ Language #######################

function setBrowserLanguages() {
	// Das sind die Betriebssystem- und Browser-Sprachen (für alle Browsertypen)
	addLanguage(navigator.language);// Firefox
	addLanguage(navigator.browserLanguage);// IE
	addLanguage(navigator.userLanguage);// IE
	addLanguage(navigator.systemLanguage);// IE
}



// Extracts ISO 639 alpha code out of an
// arbitrary locale string and adds them to userLanguages
// en_US, en, en-US
function addLanguage(lang) {
	if ($chk(lang)) {
		lang = lang.split("-", 1)[0].split("_", 1)[0].toLowerCase();

		for ( var i = 1; i <= 4; i++)
			// Language allready added
			if (Sets.Properties['Language' + i] == lang)
				return;

		// Language does not exist -> put in the first free slot
		for ( var i = 1; i <= 4; i++)
			if (Sets.Properties['Language' + i] == 0) {
				Sets.Properties['Language' + i] = lang;
				return;
			}

	}
}

// ################## Utilities ###################
// ######### Emulate native JSON functions using mootools JSON functions
// (encode/decode)
if (!$defined(JSON) || !$defined(JSON.parse)) {//LIVE
	JSON.parse = JSON.decode;
	JSON.stringify = JSON.encode;
};


function queryStringMatch(b)
{
	return window.location.toString().match(eval("/(\\?|&)"+b+"/")) != null ;
}

//TODO: replace by ? http://mootools.net/docs/more/Native/String.QueryString#String:parseQueryString
/*
function $get(key){
	var url = window.location;
	if(arguments.length < 2) url =location.href;
	if(arguments.length > 0 && key != ""){
		if(key == "#"){
			var regex = new RegExp("[#]([^$]*)");
		} else if(key == "?"){
			var regex = new RegExp("[?]([^#$]*)");
		} else {
			var regex = new RegExp("[?&]"+key+"=([^&#]*)");
		}
		var results = regex.exec(url);
		return (results == null )? "" : results[1];
	} else {
		url = url.split("?");
		var results = {};
			if(url.length > 1){
				url = url[1].split("#");
				if(url.length > 1) results["hash"] = url[1];
				url[0].split("&").each(function(item,index){
					item = item.split("=");
					results[item[0]] = item[1];
				});
			}
		return results;
	}
}
*/


// ######### data URI (base64) support   ############
// IE6 no, IE7 no, IE8 up to 32kb
// Opera < 7.2 no, ab 7.2: 4kb, ab 7.5 yes
// Firefox, Chrome, Safari, Konqueror yes
var base64Limit;
function findBase64Limit()
{
	switch(Browser.Engine.name)
	{
	case 'trident': //IE
		if(Browser.Engine.version >= 6 )//IE 8 (needs MOOTOOLS 1.2.4!!!)
			base64Limit=32000;
		else
			base64Limit=0;
		break;
	case 'gecko'://Firefox
	case 'webkit': //Chrome, Safari, Konqueror
	case 'presto'://Opera !!!version detection via mootols not possible!!!
		base64Limit = -1;
		break;	
	}
}
//check if base64 URI of length l is supported
function base64(l)
{
	return base64Limit == -1 || base64Limit >= l;
}


var spacerGif = base64(100) ? "data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw=="
										:"graphics/spacer.gif";

// ######### Provide a console dummy if non exists
var konsole;//LIVE alle vewendungen von console umschreiben
function createKonsole()
{
	konsole = {
		'log':function(a)
				{
					if($('bla'))
						$('bla').innerHTML=JSON.stringify(a)+"<br>"+$('bla').innerHTML;
					if(window.console)
						console.log(a);
				},
		'flash':function(a)
				{
					if($('bla'))
						$('bla').innerHTML="Flash: "+JSON.stringify(a)+"<br>"+$('bla').innerHTML;
					if(window.console)
						console.log("Flash: "+a);
				},
		'error':function(a)
			{
					if($('bla'))
						$('bla').innerHTML="ERROR: "+JSON.stringify(a)+"<br>"+$('bla').innerHTML;
					if(window.console)
						console.error(a);
				}
		};
}

	
function setNeverExpiringCookie(c_name, value) { // Ende der Unix Epoche
	document.cookie = c_name + "=" + value
			+ ";expires=Mon, 01 Feb 2038 21:41:15 GMT;";//path=/
}

// Use: var B=new clone(A);
function clone(source) {// mootools' function $A() can only clone Arrays!
	for (i in source) {
		if (typeof source[i] == 'source') {
			this[i] = new clone(source[i]);
		} else {
			this[i] = source[i];
		}
	}
}

// ################# AJAX #########################
// TODO: Replace by Mootools
function sendAJAXRequest(url, callback) {
	var req = createXMLHTTPObject();
	req.open('GET', url, true);
	req.onreadystatechange = function(aEvt) {
		if (req.readyState == 4) {
			if (req.status == 200)
				callback(req);
			else
				alert("Error loading page\n");
		}
	};
	req.send(null);
}
function createXMLHTTPObject() {

	var XMLHttpFactories = [ function() {
		return new XMLHttpRequest()
	}, function() {
		return new ActiveXObject("Msxml2.XMLHTTP")
	}, function() {
		return new ActiveXObject("Msxml3.XMLHTTP")
	}, function() {
		return new ActiveXObject("Microsoft.XMLHTTP")
	} ];
	var xmlhttp = false;

	for ( var i = 0; i < XMLHttpFactories.length; i++) {
		try {
			xmlhttp = XMLHttpFactories[i]();
		} catch (e) {
			continue;
		}
		break;
	}
	return xmlhttp;
}

// ################ Debug ######################
function bla(msg) {
	$("bla").innerHTML = msg;
}
function bla2(msg) {
	$("bla2").innerHTML = msg;
}
function testfunc() {
	sendAJAXRequest("AJAX/ajaxtest.php", function(data) {
		try {
			eval(data.responseText);
		} catch (e) {
			alert(e);
		}
	});
}
function dotest() {
}
function dotest2() {
}

//This takes an array of functions toExecute=[func1,func2,...]
//that have as argument only an onDone callback: var func1=function(onDone){ //Do stuff; onDone()};
//If every function is done, onComlete is called
function asyncExecutor(toExecute,onComplete)
{
	var doneCount=0;
	
	for( var i = 0 ; i < toExecute.length ; i ++ )
		toExecute[i](onDone);
	
	function onDone()
	{
		doneCount++;
	
		if(doneCount == toExecute.length)
			onComplete();
	}
}

function openURLblank(url){
	window.open(url, '_blank').focus();
	return false;
}

//######   Key names ###########
//Add keys so that they appear in evet.key. (e.g. event.key == "shift")
$extend(Event.Keys,{'shift' :	16,
					'f1'	:	112,
					'f2'	:	113,
					'f3'	:	114,
					'f4'	:	115,
					'f5'	:	116,
					'f6'	:	117,
					'f7'	:	118,
					'f8'	:	119,
					'f9'	:	120,
					'f10'	:	121,
					'f11'	:	122,
					'f12'	:	123,
					'f13'	:	124,
					'f14'	:	125,
					'f15'	:	126
		});