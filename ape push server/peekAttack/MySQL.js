var numberOfPools = 1;
//#######################    MySQL      #############
function MySQLPool(User,Size,onConnectCallback) {
	
	
	
	var sqlConnections = [];
	
	function createConnection(onDone)
	{
		sqlConnections.push(MySQLConnection(User,onDone));
	}
	
	sequentialRepetitiveExecutor(createConnection, Size , function()
			{
				Ape.log("A pool of "+Size+" MySQL connection for User "+User+" has been set up!")
				if(onConnectCallback)
					onConnectCallback();
			});
	
	var currConn=0;
	
	this.query = function(query,onSuccess){

		currConn=(currConn==Size)? currConn=1: currConn++;
		
		//This has to be thread safe!!! (Thats what the %Size is for)
		sqlConnections[currConn%Size].querySuccess(query,onSuccess);
	};
	
	
	//For debugging: log the query
	this.queryDebug = function(query,onSuccess){
		Ape.log(query);
		this.query(query, onSuccess);
	};
	
	this.queryWithInsertId = function(query,onSuccess){
		
		currConn=(currConn==Size)? currConn=1: currConn++;
		
		//This has to be thread safe!!! (Thats what the %Size is for)		
		sqlConnections[currConn%Size].queryWithInsertId(query, onSuccess);
	};
	
	  //Set up a pooller to send keep alive request each 2minutes
	//and crops the counter
	(function() {
		
		for(var i=0;i<Size;i++)
		{
			sqlConnections[i].query('SELECT 1', 
				function(res, errorNo)
				{
					if (errorNo == 8)
					{//Something went wrong, connection has been closed
						Ape.log("reconnecteing to MySQL");
						sqlConnections[i] =  MySQLConnection(User,Pass);
					}
				});
		}
	}).periodical(1000*2*60);

}

function MySQLConnection(User, onConnectCallback)
{	
	var Pass = {'peekAttackLocker'	: '',
				'peekAttackWorker' 	: '',
				'peekAttackUsers'	: '',
				'peekAttackBgrnd'	: ''};
	
	var sql = new Ape.MySQL(//"/var/run/mysqld/mysqld.sock",
							"127.0.0.1:3306",  	//IP? 
							User 		|| "", 		//User
							Pass[User] 	|| "", //Password
							databaseName);		//Database
	
	sql.onError = function(errorNo) {
        Ape.log("MySQL Connection Error" + errorNo +' '+ this.errorString());
   };
   
   sql.querySuccess=function(query,onSuccess){
	   sql.query(query, 
			function (res,errorNo)
		    {
		    	if (errorNo) 
		    		Ape.log('Request error : ' + errorNo + ' : '+ this.errorString()+"\nQuery:"+query);
		    	else if(onSuccess)
		    		onSuccess(res);
		    });
   };
   
   sql.queryWithInsertId=function(query,onSuccess){
	   sql.querySuccess(query,function(){
		   onSuccess(sql.getInsertId());
	   });
   };
   
 //For debugging: log the query
	sql.queryDebug = function(query,onSuccess){
		Ape.log(query);
		sql.querySuccess(query, onSuccess);
	};
	   
	if(onConnectCallback)
		sql.onConnect=onConnectCallback;
	
	return sql;
}


