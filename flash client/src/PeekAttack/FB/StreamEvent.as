package PeekAttack.FB
{
	import flash.events.Event;

	public class StreamEvent extends Event
	{
		
		//This message is used by the NetConnection.client. 
		//PartneristTyping Notifications sent via 
		//NetStreams are handled by the Userinterface and do not have to be 
		//thrown as StreamEvents
		//public static const PARTNER_IS_TYPING:String		=	"PARTNER_IS_TYPING";
		//This message is used by the NetConnection.client. Messages sent via 
		//NetStreams are handled by the Userinterface and do not have to be 
		//thrown as StreamEvents
		//public static const RECIEVE_CHAT_MESSAGE:String="RECIEVE_CHAT_MESSAGE";
		
//###########      CALL EVENTS   ################		
		public static const PARTNER_ACTION		:String	=	"PARTNER_ACTION";
		public static const CALL_INVITATION		:String	=	"CALL_INVITATION";
		public static const RTMP_FALLBACK		:String	=	"RTMP_FALLBACK";
		public static const CALL_PEER_CONNECT	:String	=	"CALL_PEER_CONNECT";

//###########     NET CONNECTION EVENTS   ################	
		public static const STRATUS_CONNECTION_REJECTED		:String	=	"STRATUS_CONNECTION_REJECTED";	
		public static const STRATUS_CONNECTION_ESTABLISHED	:String	=	"STRATUS_CONNECTION_ESTABLISHED";
		
		public static const RED5_CONNECTION_REJECTED	:String	=	"RED5_CONNECTION_REJECTED";
		public static const RED5_CONNECTION_TRY_AGAIN	:String	=	"RED5_CONNECTION_TRY_AGAIN";	
		public static const RED5_CONNECTION_ESTABLISHED	:String	=	"RED5_CONNECTION_ESTABLISHED";
		public static const RED5_CONNECTION_CLOSED	:String	=	"RED5_CONNECTION_CLOSED";
		
//###########     STATUS MESSAGE EVENT     ################
		public static const STATUS_MESSAGE					:String	=	"STATUS_MESSAGE";
		public static const USER_STATUS_MESSAGE				:String	=	"USER_STATUS_MESSAGE";
		
		
//###########     CLIENT INFORMATION EVENTS   ################
		public static const PARTNER_CAMERA_STATE_CHANGED	:String	=	"PARTNER_CAMERA_STATE_CHANGED";
		
//###########     ADOBE STREAM EVENTS     ################
		public static const NETSTREAM_CONNECT_CLOSED		:String	=	"NetStream.Connect.Closed";
		public static const NETSTREAM_CONNECT_FAILED		:String	=	"NetStream.Connect.Failed";
		public static const NETSTREAM_CONNECT_SUCCESS		:String	=	"NetStream.Connect.Success";
		public static const NETSTREAM_CONNECT_REJECTED		:String	=	"NetStream.Connect.Rejected";
		public static const NETSTREAM_PLAY_UNPUBLISHNOTIFY	:String	=	"NetStream.Play.UnpublishNotify";
		
		
		
		
		public var infoCode:String
		public var msg:Object;
		public var msg2:Object;
		
		public static const EVENT:String="StreamEvent";
		
		public function StreamEvent(infoCode:String,msg:Object="",msg2:Object="")
		{
			this.msg2=msg2;
			this.msg=msg;
			this.infoCode=infoCode;
			super(EVENT);			
		}
		
	}
}