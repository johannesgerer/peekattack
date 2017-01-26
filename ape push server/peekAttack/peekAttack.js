include("peekAttack/Settings.js");
include("peekAttack/md5.js");
include("peekAttack/Quit.js");
include("peekAttack/Utils.js");
include("peekAttack/MySQL.js");
include("peekAttack/Authentication.js");
include("peekAttack/FindPartner.js");
include("peekAttack/Filters.js");
include("peekAttack/Snapshots.js");
include("peekAttack/StreamingServers.js");
include("peekAttack/RatingsAndCredits.js");
include("peekAttack/ApeStatus.js");
include("peekAttack/Http.js");
include("peekAttack/ErrorReporting.js");



var PushCreditsToUsersIntervalInSecs = 1;//LIVE not so often!


var ApeStartTime=$time();
Ape.log("ApeStartTime: "+ApeStartTime);

var sqlStandardPool				= new MySQLPool('peekAttackUsers',10,
				function(){	
					//Alte Clients archivieren und löschen
					archiveAndDeleteClient("ALL","startupCleanup");
				
					//Periodisches pushen von neuen Credits aktivieren
					Ape.setInterval(pushCreditsToUsers,1000*PushCreditsToUsersIntervalInSecs);
				});

var sqlBackgroundPool			= new MySQLPool('peekAttackWorker',3);

var sqlLocks = [];

var createLockConnection = function(onDone)
{
	sqlLocks.push(MySQLConnection('peekAttackLocker',onDone));
}

sequentialRepetitiveExecutor(createLockConnection,2,
function (){
		Ape.log("Two MySQL connections for lock functionality have been established");
         sqlLocks[1].querySuccess("SELECT GET_LOCK('"+ApeStartTime+"',0) " +
							"as getlock",MatchingLoop);
  });


//params:
//	für Facebook User:   	FacebookID und AccessToken  (hier führt ein nicht vorhender AccessToken zum Abbruch des Connects!)
//	für Anonyme User:		UserID und AccessToken		(hier führt ein nicht vorhender AccessToken dazu, dass ein neuer Anonymer User erstellt wird!)
//	für neue anonayme User:	keine parameter
Ape.registerHookCmd("connect", function(params, info2) {

	Ape.log("CMD connect");
	
	if(params.NeedCountryLookup)
		info2.user.Country = 0;//Mark the country to be looked up (in CreateClient())

	//Send back Language Header
	if(info2.http.hasOwnProperty('accept-language'))
		info2.sendResponse('acceptLanguage',{'acceptLanguage':info2.http['accept-language']});	

	sendSingleCounts(params.currentFilterID,info2);
	
	if(params)
	{		
		//################  FACEBOOK USER
		if(params.FBSession)
		{
			return validateFacebookUser(params,info2);
		}	//################  ANONYMOUS USER WITH COOKIE
		else if(params.authCookie && validateAnonymousUser(info2, params))
		{
			return 1;
		}
	}	
	
	//################ NEW ANONYMOUS USER
	info2.user.CreditInfo={	'Credits'		: 0,
							'TotalCredits'	: 0};
	NewAnonymousUser(info2,params);
	
	return 1;
});


Ape.registerCmd("stratusID",true, function(params, info2) {
	if(params.stratusID=="0")
		RTMPfallback(info2);
	else
		info2.user.RTMInfo=Ape.MySQL.escape(params.stratusID);
	return 1;
});

Ape.registerCmd("DEBUG",true, function(params, info2) {
	Ape.log(params.msg);
	return 1;
});


//###############   Channels ###############
Ape.addEvent("mkchan", function(channel) {
	channel.clientCount=0;
});


Ape.addEvent("afterJoin", function(user, channel) {
	channel.clientCount++;
});


//Is called, when a user leaves a channel
Ape.addEvent('left', function(user, channel) {
	if(channel.clientCount==1)
		Ape.rmChan(channel.getProperty('name'));
	else
		channel.clientCount--;
});


Ape.registerCmd("onGender",true, function(params, info) {
	sqlStandardPool.query("UPDATE tUsers SET  fGender='"+Ape.MySQL.escape(params.Gender)+"' "+
			' WHERE fID='+info.user.UserID); 
	return 1;
});

Ape.registerCmd("signedPush", false, function(params, infos) {
	
	if(AuthCookieSignature(params.Payload)!=params.Signature)
		return ["400", "BAD_SIGNATURE"];
	
	switch(params.Payload.cmd)
	{
	case 'newSnapshot':
		return newSnapshot(params.Payload);
		break;
		
	case 'snapshotToFacebook':
		return snapshotToFacebook(params.Payload);
		break;
		
	case 'getApeStatus':
		return getApeStatus(params.Payload);
		break;
	
	case 'setApeStatus':
		return setApeStatus(params.Payload);
		break;
	}
	
});

Ape.registerCmd("FacebookConnect", true, function(params, infos) {
	//SOFORT params
	validateFacebookUser(params,infos);
	
});
