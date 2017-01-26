package PeekAttack.FB
{
	import flash.events.NetStatusEvent;
	import flash.events.StatusEvent;
	import flash.external.ExternalInterface;
	import flash.media.Camera;
	import flash.net.NetConnection;
	import flash.net.NetStream;
	import flash.profiler.showRedrawRegions;
	import flash.utils.clearTimeout;
	import flash.utils.setTimeout;
	
	import mx.controls.Alert;
	import mx.core.Application;
	import mx.core.FlexGlobals;
	import mx.utils.ObjectUtil;
	
	
	
	public class StreamEngine extends StreamEventDispatcher
	{
//##################    Public  Fields     #####################	

//''''''''''   Calling State   '''''''''''''''
		public var		callingState	:CallingState;
				
//''''''''''   Streams   '''''''''''''''							
		public var 		outgoingStream	:NetStream;
		public var		incomingStream	:NetStream;
		
		
//##################    Private Fields     #####################

		public var red5Connection		:Red5Connection;
		
		//private
[Bindable]		public var stratusConnection	:StratusConnection;
		

//''''''''''   Streaming State   '''''''''''''''
		
		
		//Is null if no connection is closed
		//private
[Bindable]		public var stratusID	:String;
				private var myPubid:String;
				public var partner		:Object	= 	{}	;//RTMInfo, CallID, pubid 
				
				//private
[Bindable]		public var UDPenabled		:int = 0;

		private var	changingServer	:Boolean = false;
	
//''''''''''     Red5 Server Functions/Responders  '''''''''''''''
		private const	ON_CALL_INVITATION			:String = "onCallInvitation";		
		private const	ON_NOT_AVAILABLE			:String = "onNotAvailable";
		private const	ON_PARTNER_FROM_OTHER_SERVER:String = "onPartnerFromOtherServer";
		private const	ON_INVITE_PARTNER			:String = "onInvitePartner";
		private const	ON_PAUSE					:String = "onPause";	
		
	private var RTMPFallbackTimeoutId	:uint;
	
//''''''''''   Stream to Stream Handles   '''''''''''''''		
		public static const ON_PEER_CONNECT		:String = "onPeerConnect";//Achtung das ist von Adobe vorgegeben
				
//#################    CONSTRUCTORS    #####################		

		public function StreamEngine()
		{
			callingState=new CallingState();
			
			stratusConnection = new StratusConnection();
			red5Connection = new Red5Connection();
			
			//Receive stream events from the connections
			stratusConnection.addEventListener(StreamEvent.EVENT,NetConnectionStreamEventHandler);
			red5Connection.addEventListener(StreamEvent.EVENT,NetConnectionStreamEventHandler);
			
			
			createRed5ConnectionClientHandler();
		}
		
		
        
//#################     METHODS    ####################
		public function attachCamera(camera:Camera):void
		{
			if (outgoingStream!=null)
				if(callingState.isConnected)
					outgoingStream.attachCamera(camera);
				else
					outgoingStream.attachCamera(null);
		}
		
		//TODO: 
		private function createRed5ConnectionClientHandler():void
		{
			var client:Object=new Object();
        
            
            red5Connection.client=client;
  		}	
  		
		public function onPartnerAction(data:Object):*{
			switch(data.type)
			{
				case "stop":
					data.userMsg="Partner left peekAttack.com";
					break;
				
				case "next":
					data.userMsg="Your partner nexted you.";
					break;
			}
			
			//Diese Actions könnten schon ein Unpublishnotifify ausgelöst haben,
			//deshalb der Aufwand
			applyPartnerAction(data);		
		}
		
		private function applyPartnerAction(data:Object):void
		{
			if(partner && partner.pubid && data.partnerPubid == partner.pubid)
			{
				userStatus("",data.userMsg);
				dispatchStreamEvent(StreamEvent.PARTNER_ACTION);					
			}else
				userStatus(data.userMsg,null);	
		}
		
		public function establishStreamsOnCallInvitation(partner2:Object, myPubid:String):void
		{
			if(RTMPFallbackTimeoutId)
			{
				clearTimeout(RTMPFallbackTimeoutId);
				RTMPFallbackTimeoutId = 0;
			}
				
			
			this.myPubid = myPubid;
			if(!partner2)
				status("SHIESSE");
			
			this.partner = partner2;

			userStatus("","Answering ...");
			
			status("Call invitation accepted from "+partner.pubid);
			
			if(UDPenabled==-1)
				if(!changeRTMPServer(partner2.RTMInfo))
				{
					status("waiting for red5 connection");
					return
				}
					
			status("establishStreams directly");
			establishStreams();
			
		}
		
		private function establishStreams():void
		{		
			if(!partner.hasOwnProperty("RTMInfo"))
				return;
			
			callingState.setConnected();
		
			if(UDPenabled>=0)
			{
				status("Establishing streams, waiting two seconds for "+ON_PEER_CONNECT);
			
				outgoingStream = new NetStream(stratusConnection,NetStream.DIRECT_CONNECTIONS);
				incomingStream = new NetStream(stratusConnection,partner.RTMInfo);
				
				status("Connection directly to peer "+partner.RTMInfo);
				stratusConnection.createStratusMessagingSystem(incomingStream,outgoingStream);
				
				outgoingStream.client[ON_PEER_CONNECT]=onPeerConnect;
				
				
				//wait two second and then determine the UDP possibility
				RTMPFallbackTimeoutId=setTimeout(rtmpFallback,6000);
				status("timeout id :"+RTMPFallbackTimeoutId);
				
				outgoingStream.publish(myPubid + partner.pubid);
				incomingStream.play(partner.pubid  +  myPubid);				
				
			}else{
								
				outgoingStream = new NetStream(red5Connection,NetStream.CONNECT_TO_FMS);
				incomingStream = new NetStream(red5Connection,NetStream.CONNECT_TO_FMS);
				incomingStream.client=new Object();
				
				outgoingStream.publish(partner.RTMInfo.token+":"+myPubid+":"+partner.pubid);
				incomingStream.play(partner.RTMInfo.token+":"+partner.pubid+":"+ myPubid);
				
			}
			
			
			dispatchStreamEvent(StreamEvent.CALL_INVITATION);
		}
		
		public function rtmpFallback():void
		{	
			RTMPFallbackTimeoutId = 0;
			
			//TODO FALLBACK TO RTMPT/S ?
			if(callingState.isConnected)
			{
				switch(UDPenabled)
				{	
				case 0:
					status("RTMP Fallback ...");
					userStatus("","Peer-to-peer connection failed");
					dispatchStreamEvent(StreamEvent.RTMP_FALLBACK);
					setUDPstate(-1);
					break;
				
				case -1: //TODO ? 
				case  1:
					userStatus("","Partner failed to connect");
					dispatchStreamEvent(StreamEvent.PARTNER_ACTION);
					
					break;
				}
				
				ExternalInterface.call("next",2);		
			}
			
		}
		
		private function onPeerConnect(arg1:NetStream):Boolean
		{
			clearTimeout(RTMPFallbackTimeoutId);
			RTMPFallbackTimeoutId = 0;
			
			dispatchStreamEvent(StreamEvent.CALL_PEER_CONNECT);
			
			switch(UDPenabled)
			{
				case 0:
					setUDPstate(1);
				case 1:
					stratusConnection.rtmpSampleAccess(5,500);//Send 5 RTMPSampleAcces Messages
					//every 500ms
					break;
				
			}
			
			status("Partner is connected");
			
			return true;
		}
		
		public function setUDPstate(i:int):void
		{
			UDPenabled=i;
			ExternalInterface.call("function(i){Sets.Properties.UDP=i;}",i);
		}
  		
		public function changeRTMPServer(newServer:Object):Boolean
		{
			if(stratusConnection.connected)
			{
				stratusConnection.close();
				stratusID=null;
			}
			
			return red5Connection.connectToServer(newServer);
		}
										  
		
		private function NetConnectionStreamEventHandler(e:StreamEvent):void
		{
			//status("NetConnectionStreamEventHandler: "+e.infoCode);
			switch(e.infoCode)
			{
				
				case StreamEvent.STRATUS_CONNECTION_ESTABLISHED:
					stratusID=stratusConnection.nearID;
					userStatus("","Click Next for new partner");
					ExternalInterface.call("SWF.setSwitch",'stratus',stratusID);
					
					//APE red5Connection.connectToRed5(numberOfSuccesslessConnections,stratusID,UDPenabled);
					break;
				
									
				case StreamEvent.STRATUS_CONNECTION_REJECTED:
					stratusID="0";
					userStatus("","Click Next for new partner");
					ExternalInterface.call("SWF.setSwitch",'stratus',stratusID);
					setUDPstate(-1);
					//APE red5Connection.connectToRed5(numberOfSuccesslessConnections,stratusID,UDPenabled);					
					break;
					
				case StreamEvent.RED5_CONNECTION_ESTABLISHED:
					status("RED5_CONNECTION_ESTABLISHED");
					establishStreams();
					dispatchStreamEvent(StreamEvent.RED5_CONNECTION_ESTABLISHED);//TODO		
					
					break;
					
				case StreamEvent.RED5_CONNECTION_TRY_AGAIN:
					//APE red5Connection.connectToRed5(numberOfSuccesslessConnections,stratusID,UDPenabled);
					break;
					
				case StreamEvent.RED5_CONNECTION_REJECTED:
				//TODO Andere Meldung?
					userStatus("Try again later","No connection to peekAttack.com");
					break;
				
				
				case StreamEvent.NETSTREAM_CONNECT_CLOSED:
					if(RTMPFallbackTimeoutId)
					{
						status("Fallback ("+e.infoCode+")");
						rtmpFallback();
						break;
					}
				case StreamEvent.NETSTREAM_CONNECT_SUCCESS:
				
					
					
					//Geht nicht
					/*if(e.msg === outgoingStream)
						var streamName:String = "outgoingStream";
					if(e.msg === incomingStream)
						streamName = "incomingStream";*/
									
					
					status(e.infoCode+" ( No. of peers: "+(e.msg as NetStream).peerStreams.length+")");
									
				default: //CALL_ENDED, CALL_ESTABLISHED,STATUS_MESSAGE
					dispatchStreamEvent(e.infoCode,e.msg);//TODO Warum throws dispatchEvent(e)
			}
		}
		
		public function receiveFromPartner(obj:Object):void
		{
			incomingStream.client[obj.handler](obj.msg||"");
		}
		
		
  		public function send(handlerName:String, msg:Object, definitly:Boolean=true):void
		{
			if(callingState.isConnected && outgoingStream)
				
				if(UDPenabled==-1)
					ExternalInterface.call("sendToPartner","SWF_PROXY",{'handler':handlerName,'msg':msg},definitly);
				else if(definitly)
					stratusConnection.sendDefinitely(handlerName, msg);
				else
					outgoingStream.send(handlerName,msg);
		}
	
        
  
	}
}