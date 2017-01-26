//Send to tUser Channel
function sendToUserChannel(UserID,rawName,raw)
{
	var channel = Ape.getChannelByName("*"+UserID);
	if(channel)
		channel.pipe.sendRaw(rawName,raw || {});
	else
		Ape.log("channel not found");
}

//Rechnet IP in unsigned integer um
function IP2IPnum(ip)
{
	var splits=ip.split(".");
	return splits[0]*16777216+splits[1]*65536+splits[2]*256+splits[3]*1;
}


//This takes an array of functions toExecute=[func1,func2,...]
//that have as argument only an onDone callback: var func1=function(onDone){ //Do stuff; onDone()};
//If every function is done, onComlete is called
function asyncExecutor(toExecute,onComplete)
{
	var doneCount=0;
	
	for( var i = 0 ; i < toExecute.length ; i ++ )
		toExecute[i](onDone);
	
	function onDone()
	{
		doneCount++;
	
		if(doneCount == toExecute.length)
			if(onComplete)
				onComplete();
	}
}


//ACHTUNG, onDone argument must be called (also if there is an error), 
//			or otherwise the loop stops! 
//Executes func, and when its done its waits for delay milliseconds and executes it again
function asyncInterval(func, delay)
{
	func(function()
	{
		Ape.setTimeout(asyncInterval,delay,func,delay);
	});
}

//This takes an array of functions toExecute=[func1,func2,...]
//that have as argument only an onDone callback: var func1=function(onDone){ //Do stuff; onDone()};
//If every function is done, onComlete is called
function sequentialExecutor(toExecute,onComplete)
{
	var i=0;
	
	onDone();
	
	function onDone()
	{
		if(i==toExecute.length)
		{
			if(onComplete)
				onComplete();
		}else
			toExecute[i++](onDone);
	}
}

function sequentialRepetitiveExecutor(toExecute,number,onComplete)
{

	
	var i=0;
	
	onDone();
	
	function onDone()
	{
		i++;
		
		if(i>number)
		{
			if(onComplete)
				onComplete();
		}else
			toExecute(onDone);
	}
}