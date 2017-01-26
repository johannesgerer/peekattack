import flash.external.ExternalInterface;

import mx.containers.GridItem;
import mx.containers.GridRow;
import mx.controls.Text;
import mx.utils.ObjectUtil;

private var authCookie			:String	;
private var UIstate				:Object = {};


//##################       Init      ################
private function registerJSInterface():void
{
	
	ExternalInterface.addCallback("connectToPartner",streamEngine.establishStreamsOnCallInvitation );
	
	ExternalInterface.addCallback("onSnapshotClick",onSnapshotClick );
	
	ExternalInterface.addCallback("onMouseOut",appRollOut );
	
	ExternalInterface.addCallback("showCameraSecurity",showCamerSecurity);
	
	ExternalInterface.addCallback("receiveFromPartner",streamEngine.receiveFromPartner );
	
	ExternalInterface.addCallback("changeRTMPServer",streamEngine.changeRTMPServer );
	
	ExternalInterface.addCallback("next_clickHandler",next_clickHandler );
	
	ExternalInterface.addCallback("sendViaStreamEngine", sendViaStreamEngine);
	
	ExternalInterface.addCallback("onStopchat", onStopchat);
	
	ExternalInterface.addCallback("userStatus", userStatus);
	
	ExternalInterface.addCallback("CALL_NOT_AVAILABLE", onStopchat);
	
	ExternalInterface.addCallback("setUIstate", setUIstate);
	
	ExternalInterface.addCallback("setAuthCookie", 
			function(cookie:String):void{authCookie=encodeURIComponent(cookie);});
	
	ExternalInterface.addCallback("onPartnerAction", streamEngine.onPartnerAction);
}

private function showCamerSecurity():void
{
	if(camera && camera.muted)
	{
		Security.showSettings(SecurityPanel.PRIVACY);
		ExternalInterface.call('UI.setSizeForFlashSecurityPanel');
	}		
}


private function setUIstate(state:Object):void
{
	if(!UIstate.single_view || UIstate.single_view!=state.single_view)
	{
		UIstate = state;
		setDisplayState(!statusArea.visible);
	}
}

private function sendViaStreamEngine(obj:Object, definitly:Boolean):void
{
	if(obj.cmd == "SEND_CHAT_MESSAGE")
		onOutgoingChatMessage(obj.obj);
	
	// pass through JS commands
	streamEngine.send("JSProxy",obj,definitly);
	
}

private var gridItem:GridItem;

private function chatGridItem(text:String, color:String=null):GridItem
{
	var gi:GridItem = new GridItem();
	var t:Text = new Text();
	
	if(color)//if it is a Partner/Me column
	{
		gi.setStyle('color',color);
		gi.setStyle('textAlign','right');
		gi.setStyle('fontWeight','bold');
		t.width = 55;
	}else{
		
		gi.percentWidth= 100;
		t.percentWidth= 100;
	}
	
	
	gridItem = gi;
	//t.truncateToFit = true;
	t.htmlText = text;
	gi.addChild(t);
	
	return gi;
}

private function chatGridRow(partner:Boolean,text:String):GridRow
{
	var gr:GridRow = new GridRow();
	gr.addChild(chatGridItem(	partner ? 'Partner:' : 'Me:',
								partner ? '#3b5998' : '#666666'));
		
	gr.addChild(chatGridItem(text));
	return gr;
}

public function onOutgoingChatMessage(msg:*):void
{
	chat_message_grid.addChild(chatGridRow(true,msg));
}
public function onIncomingChatMessage(msg:*):void
{
	chat_message_grid.addChild(chatGridRow(false,msg));
}


private function htmlentities (s:String):String {// http://phpjs.org/functions/get_html_translation_table
	
	const entities:Object = [   ['&','&amp;'] , ['<','&lt;'] , ['>', '&gt;'] ];
	
	for (var i:String in entities)
		s = s.split(entities[i][0]).join(entities[i][1]);
	
	s=s.replace("\n","<br>");
	
	return s;
}





private function onStopchat():void
{
	
	chat_message_grid.removeAllChildren();
	
	userStatus("Video chat stopped.","Click Next for new partner");
	
	setTimeout(clearStreams,0);
	
	callingState.setDisconnected();
}

protected function next_clickHandler():void
{
	userStatus('','');
	initiateCallForNextPartner();
}