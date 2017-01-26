package PeekAttack.FB
{
	import flash.external.ExternalInterface;
	
	//Diese Klasse wird erstellt, um die von der Applicatin zur StreamEngine
	//als Referenz übergeben zu können
	public class CallingState
	{
			private static 	const	callingStateDISCONNECTED:String		= "callingStateDISCONNECTED";
			private	static	const	callingStateCONNECTED	:String		= "callingStateCONNECTED";
			private static 	const	callingStateCALLING		:String		= "callingStateCALLING";
			private static 	const	STARTUP		:String		= "STARTUP";
[Bindable]	public	var				callingState			:String;
		
		public function CallingState()
		{
			callingState=STARTUP;
		}
		
		public function setConnected():void
		{
			callingState=callingStateCONNECTED;
		}
		
		public function setDisconnected():void
		{
			callingState=callingStateDISCONNECTED;
		}
		
		public function setCalling():void
		{
			callingState=callingStateCALLING;
		}
		
		public function get isConnected():Boolean
		{
			return (callingState==callingStateCONNECTED);
		}
		public function get isStartup():Boolean
		{
			return (callingState==STARTUP);
		}
		public function get isDisconnected():Boolean
		{
			return(callingState==callingStateDISCONNECTED);
		}
		
		public function get isCalling():Boolean
		{
			return(callingState==callingStateCALLING);
		}
		

	}
}