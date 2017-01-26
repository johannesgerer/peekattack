var StreamingServers = new function(){
	
	var Red5Secret = "";
	
	var servers = {	'rtmp://fbtest.peekattack.com/peekAttack':
										{'max':1,'current':0},
					'rtmp://gerer.name/peekAttack':
										{'max':1,'current':0}
				};	
		
	this.getServers = function(){
		return servers;
	}
	
	this.setServer = function(server)
	{
	
		
		if(server.info.max==-1)
			delete servers[server.name];
		else
			servers[server.name]=server.info;
	}
	
	this.removeCall = function(s)
	{
		if(s && servers.hasOwnProperty(s))
			servers[s].current--;
	}
	
	this.getBetterServer = function(sA,sB){
		
			var lA=relativeLoad(sA), lB=relativeLoad(sB);
			var better;
			
			if(lA==1 && lB==1)//if both are full
				better = this.getBestServer();
			else
				better = lA > lB ? sB : sA;
			
			//Add one call to the counter
			if(better)
					servers[better].current++;
			
			return better; 		
	};
		
	this.getBestServer = function(){
			
			var minimum=1;
			var best = null;
			
			for(var server in servers)
				if(minimum>relativeLoad(server))
				{
					best=server;
					minimum=relativeLoad(server);
				}
	
			return best;			
	};
				
	function relativeLoad(s){
		if(!s || !servers.hasOwnProperty(s) || servers[s].max==0)
			return 1;
		else
			return servers[s].current/servers[s].max;
	}
	
	this.getToken=function(s){
			var time=$time();
			return {'uri':s, 'token':time+":"+Ape.sha1.str(time,Red5Secret)};
	};


};


function RTMPfallback(info)
{
	Ape.log("RTMPfallback");
	info.user.RTMInfo = StreamingServers.getBestServer();
	Ape.log(info.user.RTMInfo);
	if(info.user.RTMInfo)
		info.sendResponse('assignStreamingServer',StreamingServers.getToken(info.user.RTMInfo));
			
	
}
