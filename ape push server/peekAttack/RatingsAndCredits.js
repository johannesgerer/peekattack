
/*
 * Rate
 * (rating	)
 */
Ape.registerCmd("Rate",true,function(params,info){

	
	if(!info.user.partner || info.user.partner.alreadyRated)
	{
		Ape.log("VERSUCHTES mehrfach rating!");
		return;
	}
	
	Ape.log("Got rating: "+params.rating);
	
	info.user.partner.alreadyRated = 1;
	
	sqlStandardPool.query("INSERT INTO tRatings (fRating, fCallID, fRaterUserID, fRateeUserID) "+
		"VALUES ('"+Ape.MySQL.escape(params.rating)+"', "+info.user.partner.CallID+", "+info.user.UserID+", "+info.user.partner.UserID+")");		
	
	sqlStandardPool.query("UPDATE tUsers SET fSexual=fSexual+'"+Ape.MySQL.escape(params.rating)+"' WHERE fID="+info.user.partner.UserID);
	
});


var tCreditsUpdated = 0;
function pushCreditsToUsers(){
	
	sqlBackgroundPool.query("SELECT u.fID,fCredits,fTotalCredits, " +
						"UNIX_TIMESTAMP(tCreditsUpdated) as tCreditsUpdated " +
						"FROM tUsers u JOIN tClients c ON c.fUserID=u.fID "+
						"WHERE UNIX_TIMESTAMP(tCreditsUpdated) >= "+tCreditsUpdated +
						" GROUP BY u.fID ORDER BY tCreditsUpdated"
						
	, function(res){
		
		var l=res.length;
		
		if(res &&  l>0)
		{
			for(var i=0; i<l; i++)
				sendToUserChannel(res[i].fID,'onCreditsPush',
							{	'Credits'		: res[i].fCredits,
								'TotalCredits'	: res[i].fTotalCredits});

			if(tCreditsUpdated == res[l-1].tCreditsUpdated)
					tCreditsUpdated++;
			else
				tCreditsUpdated = res[l-1].tCreditsUpdated
		}
		
	});
	
}