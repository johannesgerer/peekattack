package PeekAttack.FB
{
	import flash.events.NetStatusEvent;
	import flash.events.TimerEvent;
	import flash.net.NetConnection;
	import flash.net.NetStream;
	import flash.net.sendToURL;
	import flash.utils.Timer;
	import flash.utils.clearTimeout;
	import flash.utils.setTimeout;
	
	public class StratusConnection extends StreamEventDispatcher
	{
//###############    Private Fields     ##################

		private const	DeveloperKey				:String = "04e5d33437110ee0363288f5-91187653a6fc";
		private const	connectUrl					:String = "rtmfp://stratus.adobe.com";
		private var		NumberOfFailedConnections	:int	= 0;
		private const	connectionName				:String	= "StratusConnection";
		
		private var		outgoingStream				:NetStream;
		private var		incomingStream				:NetStream;

//''''''''''  Stream Messaging Functions  '''''''''''''''		
		private const 	ON_RECEIVE_DEFINITELY		:String	= "ON_RECEIVE_DEFINITELY";
		private const 	ON_RECEIVED					:String	= "ON_RECEIVED";
		
		private const 	RTMP_SAMPLE_ACCESS			:String	= "|RtmpSampleAccess";
		
		
//''''''''''   Messaging   '''''''''''''''
[Bindable]		public 	var		numberPendingMessages		:int	=	0;
				private var		pendingMessages				:Array;
//private	
[Bindable]		public 	var		currentMessageID			:int=0;
				public 	var		receivedMessageIDs			:Object;
				private var		sendingTimer				:Timer;
		
				private var timeoutId:uint;
			
//###############    Constructor     ##################				
		public function StratusConnection()
		{
			pendingMessages = new Array;			
			receivedMessageIDs = new Object;
			addEventListener(NetStatusEvent.NET_STATUS,netConnectionHandler);
			
			connectWithTimeout();
			
			sendingTimer = new Timer(500,0);
			sendingTimer.addEventListener(TimerEvent.TIMER,sendingTimerEventHandler);
			
		}	
		
		private function connectWithTimeout():void
		{
			if(timeoutId)
				clearTimeout(timeoutId);
			
			connect(connectUrl+"/"+DeveloperKey);			
			timeoutId = setTimeout(dispatchEvent,4000,
				new NetStatusEvent(NetStatusEvent.NET_STATUS,false,false,
					{'code':NETCONNECTION_CONNECT_FAILED}));
		}
		
//###############    METHODS     ##################	
        private function netConnectionHandler(event:NetStatusEvent):void
		{
			//Nicht einfach so den status zumüllen, sondern dafür sorgen, dass
			//Event eine sinnvolle message produziert
			//status("NetConnection event: " + event.info.code);
			
			switch (event.info.code)
        	{
			//#####################       CONNECT    ############################            		
            	case NETCONNECTION_CONNECT_SUCCESS:
					clearTimeout(timeoutId);
            		status("Successfully connected to "+ connectUrl);
            		dispatchStreamEvent(StreamEvent.STRATUS_CONNECTION_ESTABLISHED);
                	break;
                
				case NETCONNECTION_CONNECT_CLOSED:
				case NETCONNECTION_CONNECT_APPSHUTDOWN:
					break;
				
				
				case NETCONNECTION_CONNECT_REJECTED:                
                case NETCONNECTION_CONNECT_FAILED:
               		status(event.info.code);
               		status("Failed to register to " + connectUrl+ "NumberOfFailedConnections "+NumberOfFailedConnections);
					
               		if(NumberOfFailedConnections>3)
               		{
               			status("Abandoning stratus");
               			dispatchStreamEvent(StreamEvent.STRATUS_CONNECTION_REJECTED);
						close();
               		}else
               		{
               			status("Trying to register again ...");
               			NumberOfFailedConnections++;
               			setTimeout(connectWithTimeout,500);
               		}
                	break;
                	
                  
                //The specified application is shutting down.
                //TODO reconnect to both Stratus and rmtp?
					status(connectionName+ " Nicht behandeltes Event from:" +event.info.code);
					break;	
                
                	
				//#####################       CALL    ############################                    	
               case NETCONNECTION_CALL_FAILED:
                //The NetConnection.call method was not able to invoke the server-side method or command.
                		
                case NETCONNECTION_CALL_PROHIBITED:
                //An Action Message Format (AMF) operation is prevented for security reasons. Either the AMF URL is not in the same domain as the file containing the code calling the NetConnection.call() method, or the AMF server does not have a policy file that trusts the domain of the the file containing the code calling the NetConnection.call() method.
                    
                case NETCONNECTION_CALL_BADVERSION:
                //Packet encoded in an unidentified format.
                	status("Nicht behandeltes Event from "+connectUrl+":" +event.info.code);
                	break;
                	
			//#####################       SHARED OBJECTS    ############################     
			/*
			"SharedObject.Flush.Success"	"status"	The "pending" status is resolved and the SharedObject.flush() call succeeded.
			"SharedObject.Flush.Failed"	"error"	The "pending" status is resolved, but the SharedObject.flush() failed.
			"SharedObject.BadPersistence"	"error"	A request was made for a shared object with persistence flags, but the request cannot be granted because the object has already been created with different flags.
			"SharedObject.UriMismatch"	"error"	An attempt was made to connect to a NetConnection object that has a different URI (URL) than the shared object.
			*/
				default:
					dispatchStreamEvent(event.info.code,event.info.stream || "");
			}
		}
		
		public function sendDefinitely(handlerName:String, msg:Object ):void
		{
			//status(handlerName+"\n");
			
			//delete stop on new conection
			pendingMessages[currentMessageID]=[handlerName,msg];			
			outgoingStream.send(ON_RECEIVE_DEFINITELY,currentMessageID,handlerName,msg);
			currentMessageID++;
			
			numberPendingMessages++;
			
			
			if(!sendingTimer.running)
				sendingTimer.start();
		}
			
		private function sendingTimerEventHandler(e:TimerEvent=null):void
		{
			if(outgoingStream!=null)
			for (var ID:String in pendingMessages)
				if(pendingMessages[ID])
					outgoingStream.send(ON_RECEIVE_DEFINITELY,ID,pendingMessages[ID][0],pendingMessages[ID][1]);
		}
		
		public function rtmpSampleAccess(number:Number,delay:Number):void
		{
			if(number>0)
			{
				outgoingStream.send(RTMP_SAMPLE_ACCESS,true,true);
				setTimeout(rtmpSampleAccess,delay,number-1,delay);
			}
		}
		
		public function createStratusMessagingSystem(	incomingStream	:NetStream,
														outgoingStream	:NetStream):void
		{
			//Emtpy Array fo received messages
			receivedMessageIDs=new Object;
			
			pendingMessages = new Array;
			
			this.outgoingStream=outgoingStream;
			this.incomingStream=incomingStream;
			
			incomingStream.client = new Object();
			outgoingStream.client = new Object();
			
			incomingStream.client.ON_RECEIVE_DEFINITELY = function (	ID:String,
        												handlerName:String,
        												msg:Object)			:void{
        		if(receivedMessageIDs[ID]==null)
        		{
        			receivedMessageIDs[ID]="1";
        			incomingStream.client[handlerName](msg);
        		}
        		
        		outgoingStream.send(ON_RECEIVED,ID);
        	}
        	
        	incomingStream.client.ON_RECEIVED = function (ID:String):void{
        		
        		if(pendingMessages[ID])
        		{
        			pendingMessages[ID]=null;
        			numberPendingMessages--;
					if(numberPendingMessages==0)
						sendingTimer.stop();
        		}
        	}
        	
        	setTimeout(sendingTimerEventHandler,0);
        	
  		}			

	}
}