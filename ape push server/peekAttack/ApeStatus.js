function getApeStatus(params){

	return {'name':'status','data': {
		'StreamingServers' 	: StreamingServers.getServers(),
		'Other stuff '		: 'add it to ApeStatus.js'
	}};
}


function setApeStatus(params){
	
	switch(params.type)
	{
	case "StreamingServer":
		StreamingServers.setServer(params.server);
		return {'name':'ok','data': {}};
		break;
	}
	
}