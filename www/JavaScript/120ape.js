//APE.Client.implement(new Waitable()); geht nicht, da dann ready event nicht kommt!
		
var Ape=new Waitable({
	
	name 			: 'Ape',	
	loginResponse 	: {},
	ape  			: new APE.Client(),	
	
	onReady : function()
	{
		Ape.setSwitch('connect');
	
		window.addEvent('unload',quitApe.bind(this,'unload'));
		window.addEvent('beforeunload',quitApe.bind(this,'beforeload'));
		
		
		SWF.waitOn('stratus',function()
		{
			Ape.core.request.cycledStack.add("stratusID",{"stratusID":SWF.getSwitch('stratus')});
		});
		
		Ape.ape.onRaw('refreshSnapshots', refreshSnapshots);
		
		//store the authetication cookie
	    //(this is only sent to anonymous users)               
	    Ape.ape.onRaw('authCookie',function(raw){
	    	
	    	//If there is already an authookie
	    	//and the UserID defers
	    	if(Ape.authCookie && 
	    			JSON.parse(Ape.authCookie).Payload.UserID != raw.data.cookie.Payload.UserID)
	    		//Remove the snapshots and get a new set from the combined table)
	    		refreshSnapshots();
	    		
	    	Ape.authCookie = JSON.stringify(raw.data.cookie); 
	    	
	    	if(!raw.data.FacebookUser)
	    		setNeverExpiringCookie('authCookie',Ape.authCookie);
	    	
	        //Hand the cookie over to flash
	    	SWF.waitOn('partner_load',function(){
	    		$('partner_swf').setAuthCookie(Ape.authCookie);
	    		SWF.setSwitch('auth_cookie');
	    	});
	    	
	    });
	    
	    Ape.ape.onRaw('IDENT', function(raw) {
	    	$extend(Ape.loginResponse,{'pubid':raw.data.user.pubid});
	    });
	  
	    Ape.ape.onRaw('loginResponse', function(raw) {
	    	$extend(Ape.loginResponse,raw.data);
	    	
	    	if(Ape.loginResponse.FBPermissions && Ape.loginResponse.FBPermissions!="")
	    		Facebook.perms += ","+Ape.loginResponse.FBPermissions;
	    	
	    	if(Ape.loginResponse.Gender)
	    		Sets.Properties.Gender = Ape.loginResponse.Gender;
	    	
	    	refreshGender();
	    		
	        if(raw.data.error)
	        	konsole.log(Ape.loginResponse.error);
	        else{
	        	if(Ape.loginResponse.Country)
	        		Sets.Properties.Country = Ape.loginResponse.Country;
	        	if(Ape.loginResponse.CreditInfo)
	        		displayCredits(Ape.loginResponse.CreditInfo);
	        	konsole.log(JSON.stringify(raw.data));
	        }
	    });
	    
	    //Write directly to user status
	    Ape.ape.onRaw('serversFull', function(raw) {
	    	$('partner_swf').userStatus("Streaming Server is full. Please Wait.","0");
	    });
	
	    Ape.ape.onRaw('acceptLanguage', function(raw) {
	    	//Das sind die im Browser eingestellten
	    	//"Bevorzugten Sprachen für die Darstellung von Websites":
	    	var langs=(raw.data.acceptLanguage.split(";",1)[0]).split(",");
	    	//eingstellt werden künnen mehrere, im Header übergeben werden nur 2
	    	//Firefox: Extras->Einstellungen->Inhalt->Sprachen
	    	//IE: Internetoptionen -> Allgemein -> Sprachen
	    	 
	    	for(var i in langs)
	    		if(langs.hasOwnProperty(i)) 
	    			addLanguage(langs[i]);
	    	
	    	$('user_languages').set('text',getLanguageString(Sets.Properties));
	    });
	    
	    Ape.ape.onRaw('onPartnerAction', function(raw) {
	    	//If this action comes from my current parnter
	    	if(partner && raw.data.partnerPubid == partner.pipe.getPubid())//SOFORT
	    	{	
	    		hidePartnerProperties();
	    		$('partner_swf').onPartnerAction(raw.data);			
				next(1);			
				partner=null;//SOFORT
	    	}    		 
	    });
	    
	    Ape.ape.onRaw('assignStreamingServer', function(raw) {
	    	$('partner_swf').changeRTMPServer(raw.data);	
	    });
	    
	    Ape.ape.onRaw('partnerFound', function(raw) {
	    		
	    		setCallingState2(callingStateCONNECTED);
	    	
	    		konsole.log('YOU ARE CONNECTED TO: '+raw.data.pipe.pubid);       	
	        	
	    		 
	    		partner = raw.data.partner;
	    		partner.pubid = raw.data.pipe.pubid;       	
	        	
	    		$('partner_swf').connectToPartner(partner, Ape.loginResponse.pubid);
	    		
	    		partner.pipe = Ape.core.getPipe(partner.pubid );
	        	
	        	//Send direct test chat message:
	        	sendToPartner("SEND_CHAT_MESSAGE","Grüß dich! Ich bin "+Ape.loginResponse.ClientID,true);
	        	
	        	displayPartnerProperties();
	    });
	    
	   //Catch message reception
		Ape.ape.onRaw('data',function(raw,pipe){//Nur bei diesem gibt es ein pipe object
			var obj = JSON.parse(decodeURIComponent(raw.data.msg));
			receiveFromPartner(obj);
		});
		
		Ape.ape.onRaw('ERR',function(raw){
			konsole.log("ERR ("+raw.data.code+"): "+ raw.data.value);
			switch(raw.data.code)
			{
			case "003": //BAD CMD
			case "004": //BAD SESSID
				//Reload app
				window.location.href = unescape(window.location.href);
				break;
			}
		});
	
		Ape.ape.onRaw('FilterCounts', function(raw){
			
			if(!$chk(raw.data.FilterType))
				showInitialFilterCounts(raw.data);
			else
				showFilterCounts(raw.data.results, raw.data.FilterType);
		});
	
	    Ape.ape.onRaw('getSnapshotsResponse', function(raw) {
	    	getSnapshotsResponse(raw.data);
	     });
	    
	    Ape.ape.onRaw('onCreditsPush', function(raw) {
	    	displayCredits(raw.data);
	    });   
	    
	},
	
	
	load: function(){
		
		Ape.ape.addEvent('load',function()
				{konsole.log("APE LOAD");
				Ape.setSwitch('load2');
				});
		
		Ape.ape.addEvent('ready',Ape.onReady);
		

		
		Ape.ape.load();
	},
	
	start : function()
	{
		Ape.core = Ape.ape.core;
		
		var obj = {
				'NeedCountryLookup'	:	Sets.Properties.Country=='0',
				'currentFilterID'	:	currentFilterID(),
				'location'			:   ( App.onFacebook ? "facebook" : "peekattack.com" )
		};
		
		if(App.onFacebook){
			
			konsole.log("ape start with facebook on facebook.com");
			
			obj.FBSession = Facebook.session;
			
			if(Cookie.read('authCookie'))
				obj.authCookie = JSON.parse(Cookie.read('authCookie'));
			
		}else if(Facebook.session != -1){//Facebook user on external
			
			konsole.log("ape start with facebook but extern");
			obj.FBSession = Facebook.session;
			
		}else{
			
			konsole.log("ape start without facebook");
			
			if(Cookie.read('authCookie'))
				obj.authCookie = JSON.parse(Cookie.read('authCookie'));
			
		}
		
		Ape.core.start(obj);		
	}
	
});

 function receiveFromPartner(req){
	switch(req.cmd){
	
	case "SWF_PROXY":
		$('partner_swf').receiveFromPartner(req.obj);
		break;
		
	case "SEND_CHAT_MESSAGE":
		onReceiveChatMessage(req.obj);
		break;
		
	case "TURBO_CHAT_MESSAGE":
		turboPartnerInput(req.obj);
		break;
		
	case "SEND_TYPING_STATE":
		setPartnerTypingState(req.obj);
		break;
		
	case "SEND_PROFILE":
		onPartnerSendProfile(req.obj);
		break;
		
	case "REQUEST_PROFILE":
		onPartnerRequestProfile(req.obj);
		break;
		
	case "DEBUG":
		konsole.log(req);
		break;
	}
}


function sendToPartner(cmd,msgObj,definitly){
	
	var obj = { 'cmd':cmd, 'obj':msgObj };
	
	if(callingState!=callingStateCONNECTED)
        return;
	
	if(Sets.Properties.UDP >= 0){ // connected via rtmfp SOFORT
		
		$('partner_swf').sendViaStreamEngine(obj, definitly);
    	
	}else{
		
		partner.pipe.request.cycledStack.add('SEND',{'msg':JSON.stringify(obj)});
		if(definitly)
			Ape.core.request.cycledStack.send();
	}
}


APE.Config.identifier = "peekattackape";
//http://www.ape-project.org/wiki/index.php/Tutorial:Use_different_transport_method_%28JSONP,_XHRStreaming%29#Use_different_transport_methods
APE.Config.transport = 1; //0 long polling // 1 is XHRStreaming  // 6 WebSocket
/*This transport method is similar to long polling, 
but instead of closing connection when new data arrives,
 the server keeps the connection open. This only works 
 in browsers based on Gecko or Webkit (e.g. Safari, Chrome, Firefox).
APE.Config.transport = 1;  // 1 is XHRStreaming
If the browser doesn't support XHRStreaming, APE JSF falls back to long polling.*/

