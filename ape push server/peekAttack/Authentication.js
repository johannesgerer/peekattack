//##################### Constants  #############  
var Secret 	= "";  //(gibt es in JS nicht )


//#####################    validateFacebookUser      ##########################
function validateFacebookUser(params,info2)
{
	Ape.log("validateFacebookUser");
		
	if(verfiyFacebookSession(params.FBSession))
	{
		Ape.log("MD5 signaure of facebook cookie verified");
		
		var old_UserID = info2.user.UserID || 0;
		
		info2.user.Facebook=1;
		
		sqlStandardPool.query("SELECT 	fID," +
				"						fCredits," +
				"						fTotalCredits," +
				"						fGender," +
				"						fFBPermissions " +
				"FROM tUsers WHERE fFacebookID='"+Ape.MySQL.escape(params.FBSession.uid)+"' LIMIT 1",
				function(res){
			
					if(res.length==1){  //If facebook user exists in tUsers, 
										//ignore the locally saved authCookie
						
						//Define the goOn for later use
						function goOn()
						{
							
							
							info2.user.UserID=parseInt(res[0].fID);
							
							info2.user.Gender = parseInt(res[0].fGender);
							info2.user.FBPermissions = res[0].fFBPermissions;
						
							CreateClient(info2,params,function(){
								if(params.Properties)//If this Facebook login happened while the anonymous 
													//user was looking for a partner, update his bla
									updateClientsFiltersAndProperties(params,info2);
							});
						}
						
						if(info2.user.UserID ) //If the User was already connected as anonymous user
						{
							info2.user.left(info2.user.UserID);
							
							convertAnonymousUser(info2.user,res[0],function()
							{
								sendToUserChannel(res[0].fID,'refreshSnapshots');
								goOn();
							});
						}else
						{
							Ape.log("Facebook User "+res[0].fID+" possibly ignoring anonymous user");

							info2.user.CreditInfo={	'Credits'		: res[0].fCredits,
													'TotalCredits'	: res[0].fTotalCredits};
							
							goOn();
						}
						
						
						
					}else{//If Facebook user does not exist, use the anonymous user from authCookie (if exists)
						
						Ape.log("not existing FB user");
						
						function onNotExists()
						{
							sqlStandardPool.queryWithInsertId(
									"INSERT INTO tUsers SET "    +
									"fFacebookID    = '" + Ape.MySQL.escape(params.FBSession.uid) +  "' ",
									function(InsertId){
										info2.user.UserID = InsertId;
										Ape.log("Facebook User Inserted: "+info2.user.UserID);
										CreateClient(info2,params);
									});
						}
						
						if(params.authCookie  
								&& AuthCookieSignature(params.authCookie.Payload)==params.authCookie.Signature)
						{
							Ape.log("Overwriting anonymous user" + params.authCookie.Payload.UserID);
							
							info2.user.UserID = params.authCookie.Payload.UserID;
							getAnonymousUserInfo(info2,params,
									overwriteAnonymousUser,onNotExists);
							
						}else if($chk(info2.user.UserID))
							
							getAnonymousUserInfo(info2,params,
									overwriteAnonymousUser,onNotExists);
						
						else{
							
							onNotExists();
							
						}
						
						
					}
				});
		
		return 1;
		
	}else
		Ape.log("MD5 signaure of facebook cookie could not be verified");
	

	function overwriteAnonymousUser()
	{
		sqlStandardPool.query(
			"UPDATE tUsers SET "    +
			"fFacebookID    = '" + Ape.MySQL.escape(params.FBSession.uid) +  "' " +
			"WHERE fID    = '" + Ape.MySQL.escape(info2.user.UserID) +  "' ",
			function(){
				Ape.log("Facebook User Connected: "+info2.user.UserID);
				if(params.authCookie)//New Facebook user which over-
									//writes a User and creates
									// a new client for it
					CreateClient(info2,params);
				else//If this is a after startup facebook connect,
					//only create a new cookie and no client, 
					//as the client already exists
					CreateCookie(info2);
			});
	}
	
	
	return 0;
}

function getAnonymousUserInfo(info2,params,onExists,onNotExists)
{
	Ape.log("getAnonymousUserInfo" + info2.user.UserID);
	
	sqlStandardPool.query(
		"SELECT fCredits,fTotalCredits,fGender FROM tUsers " +
		"WHERE fID="+info2.user.UserID+" AND fFacebookID IS NULL LIMIT 1",
		
		function(res){
			if(res.length==1){
				Ape.log("Anonymous User authenticated: "+info2.user.UserID);
				
				info2.user.CreditInfo={	'Credits'		: res[0].fCredits,
										'TotalCredits'	: res[0].fTotalCredits};
				
				info2.user.Gender = parseInt(res[0].fGender);
				
				if(onExists)
					onExists();
				else
					CreateClient(info2,params);
			}else{
				
				Ape.log("getAnonymousUserInfo User does not exist" +info2.user.UserID);
				
				if(onNotExists)
					onNotExists();
				else
					NewAnonymousUser(info2,params);
			}
		});
}

//#####################    validateAnonymousUser      ##########################
function validateAnonymousUser(info2,params)
{
	Ape.log("validateAnonymousUser "+params.authCookie.Payload.UserID);
	
	if(AuthCookieSignature(params.authCookie.Payload)!=
		params.authCookie.Signature)
		return 0; //this will create a new user (and new authCookie)
	
	info2.user.UserID=params.authCookie.Payload.UserID;
	
	getAnonymousUserInfo(info2,params);
	
	return 1;
}



//#####################    NewAnonymousUser      ##########################
function NewAnonymousUser(info2,params)
{

	sqlStandardPool.queryWithInsertId("INSERT INTO tUsers SET tCreated=NOW()" ,
		function(InsertId){
			info2.user.UserID=InsertId;
			Ape.log("NewAnonymousUser: "+InsertId);
			CreateClient(info2,params);
		});
}

//#####################    AuthCookieHash      ##########################
function AuthCookieSignature(AuthCookiePayload)
{
	//HMAC-SHA1
	return Ape.sha1.str(JSON.stringify(AuthCookiePayload),Secret);
}

//#####################    CreateCookieAndClient   ##########################
function CreateCookie(info2)
{
	Ape.log("CreateCookie");
	
	var timestamp=$time();
	//Payload is everything we want to knwo about the user, that 
	//should not be manipulatable (e.g. UserID, ...)
	var AuthCookiePayload= {	"UserID":info2.user.UserID,
								"Timestamp":timestamp};

	info2.sendResponse('authCookie',{	'cookie' :
											{ 	"Payload" 	:	AuthCookiePayload	,
												"Signature"	:	AuthCookieSignature(AuthCookiePayload)},
										'FacebookUser' : info2.user.Facebook || 0
									});
}
 
//#####################    CreateClient      ##########################
function CreateClient(info2,params,callback)
{
	CreateCookie(info2);
	
	
	Ape.log("CreateClient");
	
	//Store properties for archivation on user disconnection
	info2.user.ip = IP2IPnum(info2.ip);
	
	// Create a User Channel
	var channelname="*"+info2.user.UserID;	
	if(!Ape.getChannelByName(channelname))
		Ape.mkChan(channelname);		
	info2.user.join(channelname);
	
	sqlStandardPool.queryWithInsertId(
			"INSERT INTO tClients SET "    +
			"fUserID 	= 	" + info2.user.UserID				+" , " +
			"fAPEpubid 	=  '" + info2.user.getProperty('pubid')	+"'  ",			
		function(InsertId){		
				
			sqlStandardPool.query("INSERT INTO tClientsPreArchive SET " +
				"fID 		= 	" + InsertId									+" , " +					
				"fLocation	=  '" + Ape.MySQL.escape(params.location)			+"' , " +
				"fIP 		= 	" + info2.user.ip								+" , " +
				"fUserID 	= 	" + info2.user.UserID							+" , " +
				"fUserAgent =  '" + Ape.MySQL.escape(info2.http['user-agent'])	+"'");
				
			info2.user.ClientID=InsertId;			
			sendLoginResponse();
		});
	
	if(info2.user.Country == 0)
		sqlStandardPool.query("SELECT LOWER(country) as country,end_num  FROM tGeoIP" +
				" WHERE begin_num <= "+info2.user.ip+
				" ORDER BY begin_num DESC LIMIT 1",
			 function(res) {
			
			if(res && info2.user.ip <= res[0].end_num)
				info2.user.Country = res[0].country;
			else
				info2.user.Country = "a1";//Anonymous proxy //TODO passt das?
			
			Ape.log("Google Unkown Country Identified: "+info2.user.Country);
			
			sendLoginResponse();
		});

	function sendLoginResponse()
	{
		//Check if both country and createClient have finished
		if(info2.user.hasOwnProperty('Country'))//This checks, if country lookup has to be performed at all
			if(info2.user.Country==0 || !info2.user.ClientID)//this checks if country lookup is finished
				return;
		
		 
		Ape.log("client inserted: "+info2.user.ClientID);
		info2.sendResponse('loginResponse',info2.user);

		if(callback)
			callback();
	}
}

function verfiyFacebookSession(session)
{
	
	var sortedPayloadKeys=[];
	
	for(var key in session)
		if(key!="sig")
			sortedPayloadKeys.push(key);
	
	sortedPayloadKeys.sort();
	var payload="";
	
	for(var i=0 ; i<sortedPayloadKeys.length ; i++)
		payload += sortedPayloadKeys[i] + "=" + decodeURIComponent(session[sortedPayloadKeys[i]]);

	Ape.log("Checking ");

	return (md5(payload+FBappApiSecret)==session.sig);
}



function convertAnonymousUser(user,newUser,goOn)
{
	var oldUserID = user.UserID;
	
	Ape.log("Absorbing anonymous user "+ oldUserID+ " into existing Facebook User "+newUser.fID);
	
	//Delete old client
	customQuit(user,"convertAnonym",true);
	
	//Get Credits and Sexual Value from old user:
	sqlStandardPool.query("SELECT fCredits, fTotalCredits, fSexual "+
			"FROM tUsers WHERE fID = "+ oldUserID,
		function(res)
		{
			user.CreditInfo={	
		'Credits'		: parseInt(res[0].fCredits) + parseInt(newUser.fCredits),
		'TotalCredits'	: parseInt(res[0].fTotalCredits) + parseInt(newUser.fTotalCredits)};
			
			sqlStandardPool.query("UPDATE tUsers SET" +
					" fCredits = "+user.CreditInfo.Credits+
					", fTotalCredits = "+user.CreditInfo.TotalCredits+
					", fSexual = fSexual+"+res[0].fSexual+
					" WHERE fID = "+ newUser.fID);
			
			goOn();
		});
	
	//Archive old user
	sqlStandardPool.query("INSERT INTO aUsers SELECT *,null " +
				"FROM tUsers WHERE fID = "+ oldUserID,
			function(){		
		//Delete old user
		sqlStandardPool.query("DELETE FROM tUsers " +
				"WHERE fID = "+oldUserID);
	});
	
	//Move Snapshots
	sqlStandardPool.query("UPDATE tSnapshots " +
			"SET fUserID = "+newUser.fID+" " +
					"WHERE fUserID = "+ oldUserID);
	
	
	//Move Credits
	sqlStandardPool.query("UPDATE tCredits " +
			"SET fUserID = "+newUser.fID+" " +
					"WHERE fUserID = "+ oldUserID);
	
	//Move Ratings
	sqlStandardPool.query("UPDATE tRatings SET "+
				"fRaterUserID = IF(fRaterUserID="+oldUserID+","+newUser.fID+",fRaterUserID), " +
				"fRateeUserID = IF(fRateeUserID="+oldUserID+","+newUser.fID+",fRateeUserID) " +
				" WHERE fRaterUserID = "+ oldUserID +
				" OR fRateeUserID = "+ oldUserID);
	
	//Move PendingRatings
	sqlStandardPool.query("UPDATE tPendingRatings " +
			"SET fRateeUserID = "+newUser.fID+" " +
					"WHERE fRateeUserID = "+ oldUserID);
}
