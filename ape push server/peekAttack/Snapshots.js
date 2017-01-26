Ape.registerCmd("getSnapshots",true,function(params,info)
{
	Ape.log("select from snapshots");
	
	var select_query = "SELECT fID,fFilename,tCreated,fFacebookID FROM tSnapshots ";
	select_query += " WHERE fUserID="+info.user.UserID;
	if(params.from>-1)
		select_query += " AND tCreated<'"+params.from+"'";
	select_query += " ORDER BY tCreated DESC";
	select_query += " LIMIT "+(params.n+1);
	sqlStandardPool.query(select_query, function(res) {
		var more = false;
		if(res.length>params.n){
			more = true;
			res.erase(res.getLast());
		}
		info.sendResponse('getSnapshotsResponse',{'Snapshots':res,'More':more});
		Ape.log("sending response");
	});
});

/*
Ape.registerCmd("getSnapshots",true,function(params,info)
{
	Ape.log("select from snapshots");
	
	sqlStandardPool.query("SELECT fID,fFilename,tCreated,fFacebookID FROM tSnapshots " +
							" WHERE fUserID="+info.user.UserID+
							( params.from > -1 ? " AND tCreated < '"+Ape.MySQL.escape(params.from)+"'" : " ")+
							" ORDER BY tCreated DESC" +
							" LIMIT "+(parseInt(params.n)+1),
		function(res) {
			var more = false;
			if(res.length>params.n){
				more = true;
				res.erase(res.getLast());
			}
			info.sendResponse('getSnapshotsResponse',{'Snapshots':res,'More':more});
			Ape.log("sending response");
		});
});
*/

function snapshotToFacebook(params)
{	
	//If permission had not been set the last time the user loggined in
	if(params.loginResponseFBPermissions==0)
	//then set it
		sqlStandardPool.query("UPDATE tUsers SET " +
				"fFBPermissions = 'photo_upload,user_photos' WHERE fID = '"+Ape.MySQL.escape(params.UserID)+"'");
	
	//Write the Facebook Graph ID of the Photo in the Snapshots table
	sqlStandardPool.query("UPDATE tSnapshots SET " +
			"fFacebookID = '"+Ape.MySQL.escape(params.FBSnapshotID)+"' WHERE fID = '"+Ape.MySQL.escape(params.SnapshotID)+"'");
	
}


//via signedPush (CMD)
function newSnapshot(params)
{
 	if(!$chk(params.filename))
 		return ["400", "BAD_FILENAME"];
 	
 	if(!$chk(params.userid))
 		return ["400", "BAD_USERID"];
 	
 	sqlStandardPool.queryWithInsertId("INSERT INTO tSnapshots " +
 										"( fFilename, fUserID, tCreated, fCallID ) "+
 										"VALUES  ( '"+Ape.MySQL.escape(params.filename)+
 										"', '"+Ape.MySQL.escape(params.userid)+
 										"', '"+Ape.MySQL.escape(params.timestamp)+
 										"', '"+Ape.MySQL.escape(params.callid)+"' )",
 	function(insertID){
 		
 		sendToUserChannel(params.userid,'getSnapshotsResponse',
 					{'Snapshots':[{	'fFilename'	:params.filename,
 									'tCreated'	:params.timestamp,
 									'pendingID'	:params.pendingID,
 									'fID'		:insertID
 								}]
 					});
 	});
}

Ape.registerCmd("deleteSnapshots",true,function(params,info)
		{
			Ape.log("delete snapshots");
			
			var archive_query = "INSERT INTO aSnapshots "+
				"( fID, fCallID, tCreated, fFilename, fAutomatic, fUserID, fFacebookID, fDeletedByUser ) "+
				"SELECT "+
				" fID, fCallID, tCreated, fFilename, fAutomatic, fUserID, fFacebookID, 1 "+
				"FROM tSnapshots "+
				"WHERE fUserID="+info.user.UserID+" ";

			var delete_query = "DELETE FROM tSnapshots "+
				"WHERE fUserID="+info.user.UserID+" ";
			
			var andUserID= (!params.all ? " AND fID='"+Ape.MySQL.escape(params.ID)+"'" : "");
			
			delete_query  += andUserID; 
			archive_query += andUserID;
			
			sqlStandardPool.queryDebug(archive_query, function() {
				Ape.log("snapshots archived.");
				sqlStandardPool.queryDebug(delete_query, function() {
					Ape.log("snapshots deleted.");
				});
			});
		});