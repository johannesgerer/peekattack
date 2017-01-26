//#####################    FindPartner      ##########################
//params={ 'Properties':{},'Filters':{}}
var LockLifted=0; 

Ape.registerCmd("Next",true,function(params,info){
	if(params && params.passive)
		info.user.partner=null;

	//Reihenfolge ist wichtig wg. LastPartnerId:
	updateClientsFiltersAndProperties(params,info);
	terminateCall(info.user, 'next');
});

Ape.registerCmd("Fallback",true,function(params,info){
	
	if(params.Properties.UDP == -1)
		RTMPfallback(info);
	
	//Reihenfolge ist wichtig wg. LastPartnerId:	
	terminateCall(info.user, 'fallback');
	updateClientsFiltersAndProperties(params,info);	
});

function updateClientsFiltersAndProperties(params,info,notAvailable)
{
	info.user.Properties=params.Properties;
	
	sqlStandardPool.query("UPDATE tClients SET "+  
			"FilterSexual		= '"+Ape.MySQL.escape(params.Filters.Sexual)				+"',"+
			"FilterGender		= '"+Ape.MySQL.escape(params.Filters.Gender)				+"',"+
			"FilterFacebook		= '"+Ape.MySQL.escape(params.Filters.Facebook)				+"',"+
			"FilterCountry		= '"+Ape.MySQL.escape(params.Filters.Country)				+"',"+
			"FilterLanguage		= '"+Ape.MySQL.escape(params.Filters.Language)				+"',"+
			"FilterCamera		= '"+Ape.MySQL.escape(params.Filters.Camera)				+"',"+
			"fUDP				= '"+Ape.MySQL.escape(params.Properties.UDP)				+"',"+
			"fAvailable			=  "+(notAvailable ? 0 : 2)									+" ,"+
			"tLastNext			=    NOW()"													+" ,"+
			"fLastPartnerId		= "+(info.user.partner ? info.user.partner.ClientID : "0" ) +" ,"+
			"fRTMInfo			= '"+info.user.RTMInfo 										+"',"+//TODO Only update when changed
			"PropertyGender		= '"+Ape.MySQL.escape(params.Properties.Gender)				+"',"+
			"PropertyFacebook	=  "+(info.user.Facebook || 0)								+" ,"+
			"PropertyCountry	= '"+Ape.MySQL.escape(params.Properties. Country)			+"',"+
			"PropertyLanguage1	= '"+Ape.MySQL.escape(params.Properties.Language1)			+"',"+
			"PropertyLanguage2	= '"+Ape.MySQL.escape(params.Properties.Language2)			+"',"+
			"PropertyLanguage3	= '"+Ape.MySQL.escape(params.Properties.Language3)			+"',"+
			"PropertyLanguage4	= '"+Ape.MySQL.escape(params.Properties.Language4)			+"',"+
			"PropertyCamera		= '"+Ape.MySQL.escape(params.Properties.Camera)				+"'"+
			" WHERE fID			= "+info.user.ClientID+" LIMIT 1"
	 ,	function(){
		
		//Lift the lock for the MatchingLoop to start the MatchingRun
		if(!LockLifted && !notAvailable)
		{
			LockLifted=1;
			//NEVER SELECT NULL!
			sqlLocks[1].querySuccess("SELECT RELEASE_LOCK('"+ApeStartTime+"') IS NULL");
		}
		
	});
	
	sendSingleCounts(params.currentFilterID,info);
}

//This function is running all the time and trying to get the lock
function MatchingLoop()
{
	
	//Tries to get the lock with timeout 1min
	sqlLocks[0].query("SELECT GET_LOCK('"+ApeStartTime+"',60) as getlock",
	function(res,errorNo){
		
		//If it didn't get it, try again
		if(!res || errorNo || res[0].getlock==0)
			MatchingLoop();
		else 		
			//The locking connection is now locking again, to prevent
			//this function to execute more than one time
			sqlLocks[1].querySuccess("SELECT GET_LOCK('"+ApeStartTime+"',60) as getlock",
				function(res){
					if(res[0].getlock==1)
					{
						LockLifted=0;
						PerformMatchingRun();
					}else{
						Ape.log("error getting lock, skipping MatchingRun");
						MatchingLoop();
					}
			});
		
	});
	
	//Release the lock immideatly after you get it,
	//so that the locking connection can lock it again
	sqlLocks[0].querySuccess("SELECT RELEASE_LOCK('"+ApeStartTime+"') IS NULL");
}

var ti=0;



//This function has to call StartMatchingRun() when its done!
function PerformMatchingRun()
{
	var freshClients = "";
	var start=$time();
	
	//Find all available Clients
	var func1=function(onDone){
		sqlBackgroundPool.query("SELECT fID FROM tClients c WHERE c.fAvailable = 2 ",
		function(res)
		{
			for( var i=0 ; i<res.length ; i++ )
				freshClients += "," + res[i].fID;
			onDone();
		});
	};
	
	var func2=function(onDone){
		//Create temoporary all the Call possibilies
		sqlBackgroundPool.query( 
		"INSERT INTO tPossibleCalls SELECT SQL_NO_CACHE " +
		"m1.fID, m2.fID, NULL, m1.fAPEpubid, m2.fAPEpubid, m1.fCredits, m2.fCredits " +//Reihenfolge ist wichtig 
		"FROM vMatches m1 JOIN vMatches m2 "+
		"ON  m1.fCID = m2.fID AND m2.fCID = m1.fID  AND m2.fID > m1.fID " +//The client who provided the filter for the first match provides the property for the second mathc and vice versa
		"AND m1.fAvailable <> 0 AND m2.fAvailable <> 0 " +//Only call available  (this is two times slower: "WHERE m1.fID IN ("+args.availableClients+") AND m2.fID IN ("+args.availableClients+") "+
		"AND (m1.fAvailable = 2 ||  m2.fAvailable = 2)" +			//And dont compare waiting user as they shure dont match
		"AND m1.fLastPartnerId <> m1.fCID AND m2.fLastPartnerId <> m2.fCID "+//Dont call your last partner
		"AND ( 	(m1.fUDP = -1  && m2.fUDP = -1) ||" +			//TCP with TCP 
		"		(m1.fUDP <> -1  && m2.fUDP <> -1)) " + 			//UDP with UDP
		"ORDER BY IF(m1.fUDP = 0 && m2.fUDP = 0,1,0)," + //Perform matches with two users that just try UDP for the first time last
		" IF(m1.fCredits < m2.fCredits," +  		//The pararmeter can be adjusted between 0 and 1
		"			m2.fCredits + 0.4 * m1.fCredits," +		//0 means the user with the highest Credit will get the first match
		"			m1.fCredits + 0.4 * m2.fCredits) DESC",	//1 means both users have to have high credits, as their sum determins the order (this means choosing two medium partners is as good as satisfying one super user and a bad one!)
		//TODO evtl. limit, sodass es nicht zu divergenzen kommen kann
		onDone);
	};
	
	asyncExecutor([func1,func2],retrieveAndMatch);
	
	function retrieveAndMatch()
	{	
		var matchedClients	={};
		var matchedCalls	=[];
		var matchedClientsIDs ="";

		var chunks=0;
		var n=3000;
		
		//Retrieve the possible calls in chunks of n rows:
		retrieveAndMatchChunk();
		
		function retrieveAndMatchChunk(res)
		{
			//Select calls to esatblish		
			if(res)
			for(var i=0;i<res.length;i++)
				if(!matchedClients.hasOwnProperty(res[i].Apubid) && !matchedClients.hasOwnProperty(res[i].Bpubid))
				{
					//Get Ape User objects
					var userA	= Ape.getUserByPubid(res[i].Apubid);
					var userB	= Ape.getUserByPubid(res[i].Bpubid);
					
					if(userA && userB) //If they sill exist
					{	
						var RTMInfoA, RTMInfoB;
					
						if(userA.Properties.UDP==-1)
						{
							Ape.log("found non udp match");
							var betterServer = 
								StreamingServers.getBetterServer(userA.RTMInfo,userB.RTMInfo);
							Ape.log("betterServer: "+betterServer);
							
							if(!betterServer)
							{				
								Ape.log("sending serversFull raw");
								userA.pipe.sendRaw("serversFull",{});
								userB.pipe.sendRaw("serversFull",{});
								continue;// with next match
							}else
							{
								userB.RTMInfo = betterServer;
								userA.RTMInfo = betterServer;
								RTMInfoA = StreamingServers.getToken(betterServer);
								RTMInfoB = RTMInfoA;
							}
						}else{
							RTMInfoA = userA.RTMInfo;
							RTMInfoB = userB.RTMInfo;
						}
							
						
						 //Mark the two clients as matched
						matchedClients[res[i].Apubid]=1;
						matchedClients[res[i].Bpubid]=1;
						
						matchedClientsIDs=","+userA.ClientID+","+userB.ClientID;
						
						//Tell the clients who their partner is
						userA.partner={	"ClientID"	:userB.ClientID,
										"pipe"		:userB.pipe,
										'CallID'	:res[i].fID,
										'UserID'	:userB.UserID};
						
						userB.partner={	"ClientID"	:userA.ClientID,
										"pipe"		:userA.pipe,
										'CallID'	:res[i].fID,
										'UserID'	:userA.UserID};
						
						userA.pipe.sendRaw(	"partnerFound",{
							"pipe"		:userB.pipe.toObject(),
							"partner"	:{	"RTMInfo"	:RTMInfoB,
											"CallID"	:res[i].fID,
											'Properties':userB.Properties,
											'Facebook'	:userB.Facebook || 0,
											'Credits'	:res[i].BCredits}
						});
						 
						userB.pipe.sendRaw(	"partnerFound",{
							"pipe"		:userA.pipe.toObject(),
							"partner"	:{	"RTMInfo"	:RTMInfoA,
											"CallID"	:res[i].fID,
											'Properties':userA.Properties,
											'Facebook'	:userA.Facebook || 0,
											'Credits'	:res[i].ACredits}
						}); 
						  
						//Register callId
						matchedCalls.push(res[i].fID);
					}
					else //if User objects to not exist
					{
						matchedClients[res[i].Apubid]=null;
						matchedClients[res[i].Bpubid]=null;
					}
				}
			
			if(!res || i>0)//If the result didnt exist (first call) or If the result was not empty, get a new chunk
				
				sqlBackgroundPool.query("SELECT fID, Apubid, Bpubid, ACredits, BCredits FROM tPossibleCalls " +
						"LIMIT "+n+" OFFSET "+(n*chunks++),retrieveAndMatchChunk);
			
			else//Recieve and Matching done: #################################
				updateClientsAndCalls();
		}
		
		function updateClientsAndCalls()
		{
			asyncExecutor([
			        //#################   1.  #########
		            function(onDone){
		            	
		            	function clientsFields(C)
		            	{
		            		return "c"+C+".fID, u"+C+".fID, c"+C+".tLastNext, c"+C+".fAvailable, " +
		            		"c"+C+".FilterSexual, c"+C+".FilterGender, c"+C+".FilterFacebook, " +
		            		"c"+C+".FilterCountry, c"+C+".FilterLanguage, c"+C+".FilterCamera, " +
		            		"c"+C+".PropertyGender, c"+C+".PropertyFacebook, c"+C+".PropertyCountry, " +
		            		"c"+C+".PropertyLanguage1, c"+C+".PropertyLanguage2, c"+C+".PropertyLanguage3, " +
		            		"c"+C+".PropertyLanguage4, c"+C+".PropertyCamera, c"+C+".fUDP, " +
		            		"c"+C+".fLastPartnerId, u"+C+".fSexual, u"+C+".fCredits";
		            	}
		            	
		            	//1.a) Transfer the matched calls into the calls Archive table
						if(matchedCalls.length>0)
							sqlBackgroundPool.query("INSERT INTO aCalls SELECT t.fID," +
									clientsFields("A")+", "+clientsFields("B")+", NULL " +
								"FROM tPossibleCalls t " +
								"JOIN tClients cA ON cA.fID = t.AID " +
								"JOIN tUsers   uA ON uA.fID = cA.fUserID " +
								"JOIN tClients cB ON cB.fID = t.BID " +
								"JOIN tUsers   uB ON uB.fID = cB.fUserID " +
								"WHERE t.fID IN ("+matchedCalls.join()+")",
								function(){einsB(onDone);});
						else
							einsB(onDone);
		            },

			        //#################   2.  #########
		            //2.a) Update the newly matched users: tag them as not available
		            function(onDone){
		            	if(matchedCalls.length>0)
		            	{		
	            			sqlBackgroundPool.query("UPDATE tClients " +
	            					"SET fAvailable = 0 WHERE fID IN("+matchedClientsIDs.substring(1)+")",
	            			function(){zweiB(onDone);});
		            	}else
		            		zweiB(onDone);
		            	
		      }],   //When both are done:
		            MatchingFinished);
			
		}
		
		function MatchingFinished()
		{
			Ape.log("Done in "+($time()-start)/1000+"s. Matched calls: "+matchedCalls.length);
			MatchingLoop();		
		}
	}//End recieve and match
	
	
	//1.b) Delete all possible Calls
	function einsB(onDone)
	{
		sqlBackgroundPool.query("DELETE FROM tPossibleCalls",onDone);
	}
	
	//2.b) And update the unmatched: tag them as waiting
	function zweiB(onDone)
	{	
		
		if(freshClients!="")
			sqlBackgroundPool.query("UPDATE tClients SET fAvailable = 1 " +
				" WHERE fAvailable = 2 AND fID IN("+freshClients.substring(1)+")",onDone);
		else
			onDone();
   	}
}
