//#####################    Kill Client      ##########################

//Has to be called by the client: Ape.core.request.send("customQuit");
Ape.registerCmd("customQuit",true, function(params, info2) {

	//Call asyncronously to return 0 as fast as possible!
	Ape.setTimeout(customQuit, 5, info2.user, params.code);
	
	//Buggy (will be fixed): TODO
	//info2.user.quit(); //This fires the "deluser" event catched below
	
	return 0;
});


//Is fired when a timeout occurs or user.quit() is called
Ape.addEvent("deluser", function(user){
	customQuit(user,"deluser",0);
});


function customQuit(user, code,dontTell){

	Ape.log("Quit Client "+user.ClientID+" ("+code+")");
	
	if(user.customQuit)
	{
		Ape.log("User already deleted: "+user.ClientID);
		return;
	}
	
	
	if(!dontTell)
	{
		user.customQuit=true;
		terminateCall(user, 'stop');
	}
	
	archiveAndDeleteClient(user.ClientID, code );
}


function archiveAndDeleteClient(ClientID,quitCode)
{
	//Delete Client from tClients
	sqlStandardPool.query("DELETE FROM tClients "+
			(ClientID != "ALL" ? "where fID = "+ClientID+" LIMIT 1" : ""));
			
	sqlStandardPool.queryWithInsertId("INSERT INTO aClients SELECT fID, " +
			"fUserID, fUserAgent, fIP, tConnected, NULL, " +
			"'"+Ape.MySQL.escape(quitCode)+"',fLocation " +
			"FROM tClientsPreArchive " +
			(ClientID != "ALL" ? "where fID = "+ClientID+" LIMIT 1" : ""),
			
			function(InserID){
				//Delete Client from tClientPreArchive
				sqlStandardPool.query("DELETE FROM tClientsPreArchive "+
						(ClientID != "ALL" ? "where fID = "+ClientID+" LIMIT 1" : ""),
				function(){
					if(ClientID != "ALL")
						Ape.log("client: "+ClientID+" is deleted and archived");
					else
						Ape.log("Old tClient entries have been archived and deleted");
				});
	});
}

function terminateCall(user,action)
{
	if(user.partner)
	{
		if(user.Properties.UDP == -1)
			StreamingServers.removeCall(user.RTMInfo);
		
		if(action!='fallback')
		{	
			Ape.log("Telling partner "+user.partner.ClientID+" that I ("+user.ClientID+") stoped/nexted");
			user.partner.pipe.sendRaw("onPartnerAction",
					{'partnerPubid': user.pipe.getProperty('pubid') ,'type':action});
			
			//Delete my partners partner object (= myself)
			var partnerUser = Ape.getUserByPubid(user.partner.pipe.getProperty('pubid'));
			if(partnerUser)
				partnerUser.partner=null;
		}
		
		sqlStandardPool.query("INSERT INTO aCallTermination SET " +
				"fCallID 	=  " + user.partner.CallID 	+ ", "+
				"fUserID	=  " + user.UserID			+ ", "+
				"fClientID	=  " + user.ClientID		+ ", "+
				"fAction	= '" + action				+ "'");
		
		//Delte my partner object
		user.partner=null;
	}
	
}

Ape.registerCmd("Stop",true,function(params,info){
	//Reihenfolge ist wichtig wg. LastPartnerId:
	terminateCall(info.user,'stop');
	updateClientsFiltersAndProperties(params,info,1);

});

