function processRatings(onDone){
	
	//Ape.log("processRatings");
	
	var timeFrom = Math.round(new Date().getTime()/1000 - RatingsToCreditsTimeframeinMinutes*60);
	
	// ##### Schreibe Ratings in die "pending" table, aus der sie gelöscht werden,
	//wenn sie vom user abgezogen werden .
	var ratingToPendingQuery = "INSERT INTO tPendingRatings "+
		"(fRating, tCreated, fRateeUserID ) "+
		"SELECT "+
		"fRating, tCreated, fRateeUserID "+
		"FROM tRatings "+
		"WHERE unix_timestamp(tCreated) <= "+timeFrom;
	
	// ##### Schreibe alte Ratings ins Archiv.
	var ratingToArchiveQuery = "INSERT INTO aRatings "+
		"(fID, fRating, tCreated, fCallID, fRaterUserID, fRateeUserID ) "+
		"SELECT "+
		"fID, fRating, tCreated, fCallID, fRaterUserID, fRateeUserID "+
		"FROM tRatings "+
		"WHERE unix_timestamp(tCreated) <= "+timeFrom;
	
	
	// ##### Wandle alte Ratings in Credits um
	var ratingToCreditsQuery = "INSERT INTO tCredits " +
			"(fRatingID, fRating, fUserID, fMean, fCount, fCredits) "+
		"SELECT "+
		"r.fID, " +
		"r.fRating, "+
		"r.fRaterUserID, "+
		"SUM(s.fRating), "+
		"COUNT(s.fRating), "+
		"SIGN(r.fRating) * AVG(s.fRating) * ABS(AVG(s.fRating)) * "+maxCreditsPerRating+
		" FROM tRatings r "+
		"JOIN tRatings s "+
		"ON r.fRateeUserID=s.fRateeUserID AND r.fID<=s.fID "+
		"AND ( s.fRaterUserID != r.fRaterUserID || s.fID = r.fID ) "+
		"WHERE unix_timestamp(r.tCreated) <= "+timeFrom + " "+
		"GROUP BY r.fID";
		
	// ##### Lösche alte Ratings
	var ratingDeleteQuery = "DELETE FROM tRatings "+
		"WHERE unix_timestamp(tCreated) <= "+timeFrom + " ";
	
	mysqlRatings.querySuccess(ratingToPendingQuery, function(){
		
		//Ape.log("ratingToPendingQuery");
		
		mysqlRatings.querySuccess(ratingToArchiveQuery, function(){
			
			//Ape.log("ratings archive insert ");

			mysqlRatings.queryWithInsertId(ratingToCreditsQuery, function(firstInsertedCreditID){
				
				//Ape.log("Ratings to credits, first insert id: "+firstInsertedCreditID);
				
				if(firstInsertedCreditID>0){
					
					// ##### Füge dem User die neuen Credits hinzu
					var updateUserCreditsQuery = "UPDATE tUsers u JOIN "+
					"(SELECT fUserID,SUM(fCredits) as CreditsSum FROM tCredits " +
					"WHERE fID>="+firstInsertedCreditID+" GROUP BY fUserID) c "+
						"ON u.fID=c.fUserID "+
						"SET u.fCredits = u.fCredits+c.CreditsSum," +
						"	 u.fTotalCredits = u.fTotalCredits+c.CreditsSum, tCreditsUpdated=NOW()";
				
					mysqlRatings.querySuccess(updateUserCreditsQuery,function(){
						//Ape.log("update user credits ");
						
						deleteRatings();
						
					});
					
				}else
					deleteRatings();
				
				function deleteRatings()
				{
					mysqlRatings.querySuccess(ratingDeleteQuery,function(){
						//Ape.log("ratings deleted");
						onDone();
					});
				}
				
			});
			
		});
		
	});
	
}

function processPendingRatings(onDone)
{
	var deleteTime 	= Math.round(new Date().getTime()/1000 - RatingsTTLinMinutes*60);
	
	// ##### Ziehe dem User die alten pending Ratings ab
	var updateUserSexualQuery = "UPDATE tUsers u JOIN "+
		"(SELECT fRateeUserID as fUserID,SUM(fRating) as RatingsSum FROM tPendingRatings" +
		" WHERE unix_timestamp(tCreated)<="+deleteTime+" GROUP BY fUserID ) c "+
		"ON u.fID=c.fUserID "+
		"SET u.fSexual = u.fSexual-c.RatingsSum";

	// ##### Lösche alte Ratings
	var pendingRatingDeleteQuery = "DELETE FROM tPendingRatings "+
		"WHERE unix_timestamp(tCreated) <= "+deleteTime + " ";
	
	mysqlRatings.querySuccess(updateUserSexualQuery,function(){
		//Ape.log("updateUserSexualQuery");

		mysqlRatings.querySuccess(pendingRatingDeleteQuery,function(){
			//Ape.log("pendingRatingDeleteQuery");
			onDone();
		});
		
	});
	
}

function processCredits(onDone){

	var timeFrom = Math.round(new Date().getTime()/1000 - CreditsTTLinDays*24*60*60);
	
	// ##### Ziehe dem User die alten Credits ab
	var updateUserCreditsQuery = "UPDATE tUsers u JOIN "+
		"(SELECT fUserID,SUM(fCredits) as CreditsSum FROM tCredits WHERE unix_timestamp(tCreated)<="+timeFrom+" GROUP BY fUserID ) c "+
		"ON u.fID=c.fUserID "+
		"SET u.fCredits = u.fCredits-c.CreditsSum, tCreditsUpdated=NOW()";
	
	// ##### Schreibe alte credits ins Archiv
	var creditsToArchiveQuery = "INSERT INTO aCredits "+
		"SELECT * FROM tCredits "+
		"WHERE unix_timestamp(tCreated) <= "+timeFrom ;
	
	// ##### Lösche alte credits
	var creditsDeleteQuery = "DELETE FROM tCredits "+
		"WHERE unix_timestamp(tCredits.tCreated) <= "+timeFrom + " ";
	
	mysqlRatings.querySuccess(updateUserCreditsQuery, function(){
		//Ape.log("update user credits ");
		
		mysqlRatings.querySuccess(creditsToArchiveQuery, function(){
			//Ape.log("ratings archive insert ");
			
			mysqlRatings.querySuccess(creditsDeleteQuery,function(){
				//Ape.log("credits deleted");
				onDone();
			});
			
		});
		
	});
	
}