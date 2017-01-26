package PeekAttack.FB
{
	import flash.net.NetConnection;

	public class StreamEventDispatcher extends NetConnection
	{
		public static const NETCONNECTION_CONNECT_FAILED		:String	= "NetConnection.Connect.Failed";
		public static const NETCONNECTION_CONNECT_CLOSED		:String	= "NetConnection.Connect.Closed";
		public static const NETCONNECTION_CONNECT_REJECTED		:String	= "NetConnection.Connect.Rejected";
		public static const NETCONNECTION_CONNECT_APPSHUTDOWN	:String	= "NetConnection.Connect.AppShutdown";
		public static const NETCONNECTION_CONNECT_SUCCESS		:String	= "NetConnection.Connect.Success";
		public static const NETCONNECTION_CALL_FAILED			:String	= "NetConnection.Call.Failed";
		public static const NETCONNECTION_CALL_PROHIBITED		:String	= "NetConnection.Call.Prohibited";
		public static const NETCONNECTION_CALL_BADVERSION		:String	= "NetConnection.Call.BadVersion";
		
		public function StreamEventDispatcher()
		{
			
		}
		
		protected function dispatchStreamEvent(infoCode:String,msg:Object="",msg2:Object=""):void
		{
			dispatchEvent(new StreamEvent(infoCode,msg,msg2));
		}	
		
		
		//print status message
		protected function status(msg:Object):void
		{
			dispatchStreamEvent(StreamEvent.STATUS_MESSAGE,msg);
		}
		
				//print status message
		protected function userStatus(msg:Object,msg2:Object):void
		{
			dispatchStreamEvent(StreamEvent.USER_STATUS_MESSAGE,msg,msg2);
		}
		
	}
}