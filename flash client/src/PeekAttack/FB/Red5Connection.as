package PeekAttack.FB
{
	import flash.events.NetStatusEvent;
	import flash.net.NetStream;
	import flash.utils.setTimeout;
	
	import mx.core.Application;
	import mx.core.FlexGlobals;
	
	public class Red5Connection extends StreamEventDispatcher
	{
//###############    Private Fields     ##################

		private var 	Server						:Object;
		private var 	NumberOfFailedConnections	:int=0;
		
		
		static public const SEND_TO_PARTNER			:String	= "onSendToPartner";
		static public const ON_RECEIVE				:String	= "onReceive";
		
		
//###############    Constructor     ##################	 
		public function Red5Connection()
		{
			addEventListener(NetStatusEvent.NET_STATUS,netConnectionHandler);
			client=new Object;
		}
		
		/*TODO implement somehow (shared Object, NetStream.Send or Call/invoke on Server
		public function createStratusMessagingSystem(	incomingStream	:NetStream):void
		{	
			incomingStream.client=new Object;
			
			this.incomingStream=incomingStream;
			
			
			client[ON_RECEIVE] = function (handlerName:String, msg:Object):void
			{
				incomingStream.client[handlerName](msg);
			}
		}
		*/
//###############    METHODS     ##################
		public function connectToServer( Server:Object ):Boolean
		{
			if(!connected || this.Server.uri != Server.uri)	
			{
				if(connected)
					close();
				
				this.Server = Server;
					
				super.connect(Server.uri,Server.token);
				
				return false;
				
			}else
				return true;
		}
					
		private function netConnectionHandler(event:NetStatusEvent):void
			{
				//Nicht einfach so den status zumüllen, sondern dafür sorgen, dass
				//Event eine sinnvolle message produziert
				//status("NetConnection event: " + event.info.code);
				
				switch (event.info.code)
            	{
					//#####################       CONNECT    ############################            		
                	case NETCONNECTION_CONNECT_SUCCESS:
                	
                		status("Successfully connected to "+ this.uri);
                		dispatchStreamEvent(StreamEvent.RED5_CONNECTION_ESTABLISHED);
                    	break;
                         
                    case NETCONNECTION_CONNECT_APPSHUTDOWN:
                    case NETCONNECTION_CONNECT_REJECTED:                	
                   	case NETCONNECTION_CONNECT_FAILED:
                   	
                    	status("Failed to register to " + event.info.code);
                   		if(NumberOfFailedConnections>3)
                   		{
                   			NumberOfFailedConnections=-1;
               				dispatchStreamEvent(StreamEvent.RED5_CONNECTION_REJECTED);
                   			
                   		}else if(NumberOfFailedConnections!=-1)
                   		{
                   			status("Trying to register again ...");
                   			NumberOfFailedConnections++;
                   			
               				setTimeout(dispatchStreamEvent,1000,StreamEvent.RED5_CONNECTION_TRY_AGAIN);	
                   		}
                    	break;
                    	
                   	
                    case NETCONNECTION_CONNECT_CLOSED: 
                    	break;
                   
                    	
					//#####################       CALL    ############################                    	
                   case NETCONNECTION_CALL_FAILED:
	                //The NetConnection.call method was not able to invoke the server-side method or command.
	                		
	                case NETCONNECTION_CALL_PROHIBITED:
	                //An Action Message Format (AMF) operation is prevented for security reasons. Either the AMF URL is not in the same domain as the file containing the code calling the NetConnection.call() method, or the AMF server does not have a policy file that trusts the domain of the the file containing the code calling the NetConnection.call() method.
	                    
	                case NETCONNECTION_CALL_BADVERSION:
	                //Packet encoded in an unidentified format.
	                	status("Nicht behandeltes Event: "+event.info.code);
	                	break;
	                	
				//#####################       SHARED OBJECTS    ############################     
				/*
				"SharedObject.Flush.Success"	"status"	The "pending" status is resolved and the SharedObject.flush() call succeeded.
				"SharedObject.Flush.Failed"	"error"	The "pending" status is resolved, but the SharedObject.flush() failed.
				"SharedObject.BadPersistence"	"error"	A request was made for a shared object with persistence flags, but the request cannot be granted because the object has already been created with different flags.
				"SharedObject.UriMismatch"	"error"	An attempt was made to connect to a NetConnection object that has a different URI (URL) than the shared object.
				*/
				   
				   default:
					   dispatchStreamEvent(event.info.code,event.info.stream);
             	}
			}
		
	}
}