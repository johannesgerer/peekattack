import PeekAttack.FB.*;

import flash.display.DisplayObject;
import flash.events.StatusEvent;
import flash.events.TimerEvent;
import flash.external.ExternalInterface;
import flash.geom.Rectangle;
import flash.media.Camera;
import flash.media.Microphone;
import flash.media.Video;
import flash.net.NetStream;
import flash.system.Capabilities;
import flash.system.System;
import flash.utils.Timer;
import flash.utils.flash_proxy;
import flash.utils.setTimeout;

import mx.containers.GridRow;
import mx.controls.Alert;
import mx.core.FlexGlobals;
import mx.events.ResizeEvent;
import mx.events.SliderEvent;
import mx.validators.Validator;

import spark.primitives.RectangularDropShadow;

private var streamEngine:StreamEngine;
private var outgoingStream:NetStream;
private var incomingStream:NetStream;


//''''''''''     Videos and Display  '''''''''''''''
private var remoteVideo			:Video;
private var userVideo			:Video;
private var remoteVideoAdded	:Boolean=false;

//''''''''''     Cameras and Mics  '''''''''''''''
			private var 	camera			:Camera;
[Bindable] 	private var 	cameraNames		:Array;
			private const 	defaultMacCamera:String	= "USB Video Class Video";
			private var 	mic			:Microphone;
[Bindable] 	private var 	micNames		:Array;

//''''''''''    local SharedObject  '''''''''''''''
private var localSOname : String = "peekAttackSettings7";//AUCH IN USER.SWF!!!!!!!!!!! 
private var localSO:SharedObject;


//''''''''''   Wird referenziert von StreamEvent   '''''''''''''''
private var		callingState			:CallingState;

//''''''''''   Camera State   '''''''''''''''
private const	cameraStateDENIED	:String	= "cameraStateDENIED";
private const	cameraStateDONTSENT	:String	= "cameraStateDONTSENT";
private const	cameraStateNOSIGNAL	:String	= "cameraStateNOSIGNAL";
private const	cameraStateWORKING	:String	= "cameraStateWORKING";
private const	cameraStateNOTFOUND	:String	= "cameraStateNOTFOUND";
private var		cameraState			:String = cameraStateDENIED;//[Bindable]
private var		partnerCameraState	:String	= "cameraStateNOTFOUND";

//''''''''''   Receive State   '''''''''''''''
private const	receiveStateAUDIOMUTED		:String	= "receiveAUDIOMUTED";
private const	receiveStateAUDIO_NOT_MUTED	:String	= "receiveAUDIO_NOT_MUTED";
private const	receiveStateVIDEOMUTED		:String	= "receiveVIDEOMUTED";
private const	receiveStateVIDEO_NOT_MUTED	:String	= "receiveVIDEO_NOT_MUTED";

//''''''''''   Stream to Stream Handles   '''''''''''''''
private static const SEND_TYPING_STATE			:String = "SEND_TYPING_STATE";
private static const SEND_CHAT_MESSAGE			:String = "SEND_CHAT_MESSAGE";
private static const RECEIVE_STATE_VIDEO_UPDATE	:String = "RECEIVE_STATE_UPDATE";
private static const RECEIVE_STATE_AUDIO_UPDATE	:String = "RECEIVE_STATE_AUDIO_UPDATE";
private static const TURBO_CHAT_MESSAGE			:String = "TURBO_CHAT_MESSAGE";
private static const SEND_CAMERA_STATE			:String = "CAMERA_STATE_UPDATE";
private static const SEND_VIDEO_QUALITY			:String	= "SEND_VIDEO_QUALITY";
private static const SEND_AUDIO_QUALITY			:String	= "SEND_AUDIO_QUALITY";


//''''''''''   Others    '''''''''''''''
private var timer						:Timer					;	
private var red5ConnectionEstablished	:Boolean	=	false	;	
private var ConnectionTime				:Number		=	0		;//[Bindable]	

private var mouseIsOut:Boolean = true;
private static const bitrateFactor:uint = 1000/8;//This changes from Byte to kbit
private static const RTMPkbitLimit:uint = 400;//kbits
private static const DefaultSettings:Object = {	'micVolume'		: 70,
												'speakerVolume'	: 90,
												'audioQuality'	: 6,
												'videoQuality'	: 300}; //kbits
												
//''''''''''   Typing State   '''''''''''''''
private var shiftEnterWasHit	:Boolean	= false;									
private var userWantsSendMessage:Boolean	= false;
   	
//##################       INIT      ################
//Calles at the beginning of the component initialization sequence
public function preinit():void
{	
	
	
	
	userVideo = new Video;
	
	
	setTimeout(init_snapshot,0);
    
	timer=new Timer(2000,0);
	timer.addEventListener(TimerEvent.TIMER,onTimer);
	remoteVideo=new Video();
	streamEngine=new StreamEngine();
	callingState	= streamEngine.callingState;
	streamEngine.addEventListener(StreamEvent.EVENT,StreamEngineEventHandler);
}

private var initDone:Boolean = false;
//Calles when the components has finished its construction 
//and has all initialization properties set.
public function init():void
{	
	remoteVideoDisplay.addEventListener(ResizeEvent.RESIZE,remoteVideoDisplayResizeEvent);	
	
	
	registerJSInterface();
	

	userWebCamDisplay.addChild(userVideo);
	remoteVideoDisplayResizeEvent();
	
	userStatus("","Connecting ...");
	controlPanel.visible=false;
	
	
	
	initDone = true;
	
	setDisplayState(false);
	
	
}



//Called when the component has finished its construction,
// property processing, measuring, layout, and drawing.
public function appStart():void
{

	InitAudioVideoSettings();
	
	ExternalInterface.call("SWF.setSwitch",'partner_load');
	
	timer.start();
	
	
}

public function appRollOver(event:MouseEvent):void{
	
	if(mouseIsOut){
		settingsButton.visible=true;
	}
	mouseIsOut = false;
	
}

//Is called by JS without arg!
public function appRollOut(event:MouseEvent=null):void{
	
	if(event)
	{
		var target:DisplayObject = DisplayObject(event.target);
	
		var rect:Rectangle= cameraSelection.getRect(target);
		rect.bottomRight = receiveVideoCheckbox.getRect(target).bottomRight;
	
		if(rect.contains(event.target.mouseX,event.target.mouseY))
			return;
	}
	
	settingsButton.visible=false;
	controlPanel.visible=false;
	mouseIsOut = true;
	
}


//##################       STREAMING      ##################

	
private function StreamEngineEventHandler(e:StreamEvent):void
{
	switch(e.infoCode)
	{
		case StreamEvent.STATUS_MESSAGE:
			status(e.msg.toString());
			break;
			
		case StreamEvent.USER_STATUS_MESSAGE:
			userStatus(e.msg,e.msg2);
			break;

		case StreamEvent.RTMP_FALLBACK:
			limitBandwidth();
			camera.setMode(320,240,15);//Reduce resolution for less abndwith usage
			
		case StreamEvent.PARTNER_ACTION:
			initiateCallForNextPartner();
			
			break;
			
			
			
		case StreamEvent.CALL_INVITATION:
			ConnectionTime = 0;
			//''''''''''''''''    Create References To Streams    ''''''''''''''''
			outgoingStream 	= streamEngine.outgoingStream;
			incomingStream	= streamEngine.incomingStream;
			
			//''''''''''''''''    Add Event Listener    ''''''''''''''''
			incomingStream.addEventListener(NetStatusEvent.NET_STATUS,streamEventHandler);
			outgoingStream.addEventListener(NetStatusEvent.NET_STATUS,streamEventHandler);
			
			//''''''''''''''''    Add Client Handler    ''''''''''''''''
			createStreamClientHandlers();
						
			reenableMic();
			reenableCamera(); 
			
			incomingStream.soundTransform = new SoundTransform(speakerVolumeSlider.value/100);
			incomingStream.receiveAudio(receiveAudioCheckbox.selected);
			incomingStream.receiveVideo(receiveVideoCheckbox.selected);
			remoteVideo.attachNetStream(incomingStream);
			
			
			onAudioMuted();
			onVideoPaused();
					
			break;
			
		case StreamEvent.RED5_CONNECTION_ESTABLISHED:
			red5ConnectionEstablished=true;
			break;
			
		case StreamEvent.RED5_CONNECTION_CLOSED:
			red5ConnectionEstablished=false;
			break;
			
		case StreamEvent.CALL_PEER_CONNECT:
			userStatus("","Call established.");
			setDisplayState(true);
			userTexInput="";
			//setTimeout(onSnapshotClick,500);
			streamEngine.send(SEND_CAMERA_STATE, cameraState);
			streamEngine.send(SEND_VIDEO_QUALITY,localSO.data.videoQuality);
			streamEngine.send(SEND_AUDIO_QUALITY,localSO.data.audioQuality);
			break;
			
		case StreamEvent.NETSTREAM_CONNECT_CLOSED:
		case StreamEvent.NETSTREAM_CONNECT_FAILED:
			OnConnectionClosed();
			break;
	}
	
}

private function OnConnectionClosed():void
{
	status("OnConnectionClosed");
	if(callingState.isConnected )
	{
		userStatus("","Connection Closed");
		
		ExternalInterface.call("next",1);
		initiateCallForNextPartner();
	}
}

private function limitBandwidth():void
{
	vidQual.maximum = RTMPkbitLimit;
	if(vidQual.value > RTMPkbitLimit)
		vidQual.dispatchEvent(new SliderEvent(SliderEvent.CHANGE,false,false,-1,RTMPkbitLimit));
			
}

private function initiateCallForNextPartner():void
{
	clearStreams();	
	chat_message_grid.removeAllChildren();
	
	callingState.setDisconnected();
	
	streamEngine.partner = {};
	
	
	updateCameraSituation();

	userStatus(statusAreaL1.text,"Calling next partner ...");
	
	callingState.setCalling();
}


private function setDisplayState(streaming:Boolean):void
{
	if(!initDone)
		return;
	
	statusArea.visible=!streaming;
	
	if(streaming)
	{
		whiteLayer.alpha=0;
		l1.styleName=l2.styleName=l3.styleName=l4.styleName=l5.styleName="buttonStyle";
		sendVideoCheckbox.styleName="buttonStyle";
		receiveVideoCheckbox.styleName="buttonStyle";
	}else{
		whiteLayer.alpha=1;
		l1.styleName=l2.styleName=l3.styleName=l4.styleName=l5.styleName="buttonStyleBlue";
		sendVideoCheckbox.styleName="buttonStyleBlue";
		receiveVideoCheckbox.styleName="buttonStyleBlue";
	}
	
	
	
	if(UIstate.hasOwnProperty('single_view') && UIstate.single_view)
	{
		statusAreaL1.styleName			=	"buttonStyleBlueSmall";
		statusAreaL2.styleName			=	"buttonStyleBlueSmallLight";			
		sendVideoCheckbox.styleName		=	"buttonStyle";
		receiveVideoCheckbox.styleName	=	"buttonStyle";
		userWebCamDisplay.visible		=	true;
	}
	else
	{	
		statusAreaL1.styleName			=	"buttonStyleBlue";
		statusAreaL2.styleName			=	"buttonStyleBlueLight";
		userWebCamDisplay.visible		=	false;
	}
	
	if(partnerCameraState==cameraStateDONTSENT || !receiveVideoCheckbox.selected)
			whiteLayer.alpha=0.75;	

}
	
private function streamEventHandler(e:NetStatusEvent):void
{	
	switch(e.info.code)
	{
		//case StreamEvent.NETSTREAM_CONNECT_CLOSED:
		case StreamEvent.NETSTREAM_PLAY_UNPUBLISHNOTIFY://TODO Auch bei abwesenheit von Keep Alive!
			status(e.info.code);
			OnConnectionClosed();
		break;
	default:
			status(e.info.code);
	}
}

private function createStreamClientHandlers():void
{       
 	incomingStream.client[SEND_CAMERA_STATE]	= function (cs:String):void
	{
		partnerCameraState=cs;
		
		switch(partnerCameraState)
		{
			case cameraStateDONTSENT:
				userStatus("","Partner paused video");
				setDisplayState(false);
				break;
				
			case cameraStateNOSIGNAL:
				userStatus("","No signal from partner's cam");				
				setDisplayState(false);
				break;
			
			case cameraStateDENIED:
				userStatus("","Partner cam access denied");				
				setDisplayState(false);
				break;

			case cameraStateNOTFOUND:
				userStatus("","Partner has no camera");				
				setDisplayState(false);
				break;
				
			case cameraStateWORKING:
				setDisplayState(true);
				break;		
		}		
		
	}
	incomingStream.client["JSProxy"]		= function(obj:Object):void
	{
		if(obj.cmd == "SEND_CHAT_MESSAGE")
			onIncomingChatMessage(obj.obj);
		
		ExternalInterface.call("receiveFromPartner",obj);
	};
	incomingStream.client[SEND_TYPING_STATE]		= function(pTS:int):void
	{
		ExternalInterface.call("setPartnerTypingState",pTS);
		timer.reset();
		timer.start();
	};
     
      incomingStream.client[SEND_CHAT_MESSAGE]	= function(msg:String):*{
      	
      ExternalInterface.call("onReceiveChatMessage",msg);
      };
      
    
   incomingStream.client[TURBO_CHAT_MESSAGE]	=  function(msg:String):*{
   	ExternalInterface.call("turboPartnerInput",msg);   
   };
    
    
     incomingStream.client[RECEIVE_STATE_VIDEO_UPDATE]= function(msg:String):void{
     //TODO receiveStateVIDEO.text=msg;
     status(msg)
     } 
     
    incomingStream.client[RECEIVE_STATE_AUDIO_UPDATE]= function(msg:String):void{
     //TODO function(msg:String):void{receiveStateAUDIO.text=msg;}
     status(msg)
     }
     
     
     incomingStream.client[SEND_AUDIO_QUALITY] = function (msg:Number):void{
     	status("audio quality selected by partner: "+msg.toString());
		if (mic)
	   		mic.encodeQuality = msg;
     }
     
     incomingStream.client[SEND_VIDEO_QUALITY] = function (msg:Number):void{
     	status("video quality selected by partner: "+msg.toString());
     	if (camera)
			camera.setQuality(msg*bitrateFactor,0);//TODO BANDWITH
     }
	
}  

private function clearStreams():void
{
	
	status("clearStreams");
	
	remoteVideo.attachNetStream(null);	

	if (incomingStream)
    {
		incomingStream.removeEventListener(NetStatusEvent.NET_STATUS,streamEventHandler);
		incomingStream.close();
		incomingStream = null;
    }
    if (outgoingStream)
    {
		outgoingStream.attachAudio(null);
		outgoingStream.attachCamera(null);
		outgoingStream.removeEventListener(NetStatusEvent.NET_STATUS,streamEventHandler);
		outgoingStream.close();
        outgoingStream = null;
    }

	System.gc();
	
    remoteVideo.clear();
    setDisplayState(false);
    
    /*if(remoteVideoAdded)
    {
    	remoteVideoAdded=false;
		remoteVideoDisplay.removeChild(remoteVideo);
    }*/
	
}


//##################       AUDIO VIDEO      ##################

private function remoteVideoDisplayResizeEvent(e:ResizeEvent=null):void
{
	statusAreaL1.width	=	Math.round(remoteVideoDisplay.width*0.9);
	statusAreaL2.width	=	Math.round(remoteVideoDisplay.width*0.9);
	statusAreaL1a.width	=	Math.round(remoteVideoDisplay.width*0.9);
	statusAreaL2a.width	=	Math.round(remoteVideoDisplay.width*0.9);
	remoteVideo.width	=	remoteVideoDisplay.width;
	remoteVideo.height	=	remoteVideoDisplay.height;
	
	userVideo.height = remoteVideoDisplay.height*0.32;
	userVideo.width = remoteVideoDisplay.width*0.32
	
}
private function reenableCamera():void
{
	status("send video: "+sendVideoCheckbox.selected.toString());
	
	if(outgoingStream)
		if(sendVideoCheckbox.selected)
		{
			if (camera)
				outgoingStream.attachCamera(camera);
		}else
			outgoingStream.attachCamera(null);
		
	updateCameraSituation();
}


private function micVolumeChanged(e:SliderEvent):void
{
	
	if (mic)
	{
		mic.gain = e.value;
		
		localSO.data.micVolume = mic.gain;
		localSO.flush();
		
		status("Setting mic volume to: " + mic.gain);
	}
	
	if(sendAudioCheckbox.selected)
	{
		sendAudioCheckbox.selected=false;
		reenableMic();
	}
	
}

private function reenableMic():void
{
	status("send audio: "+(!sendAudioCheckbox.selected).toString());
	
	
		if(!sendAudioCheckbox.selected)
		{
			micVolumeSlider.value = mic.gain;
			if (mic && outgoingStream)
				outgoingStream.attachAudio(mic);
		}else
		{
			if(outgoingStream)
				outgoingStream.attachAudio(null);
				micVolumeSlider.value=0;
				//micVolumeSlider.validateNow();
		}							
}

private function updateCameraSituation(e:StatusEvent=null):void
{	
	var oldCameraState	:String = cameraState;
	
	if (camera)
		if (sendVideoCheckbox.selected)
			if (camera.muted)
				cameraState=cameraStateDENIED;
			else 
		//		if (camera.currentFPS > 0)
					cameraState=cameraStateWORKING;
		//		else 
		//TODO abchecken: beim max war das einmal, obwohl seine cam ging!?
			//cameraState=cameraStateNOSIGNAL;
		else 
			cameraState=cameraStateDONTSENT;
	else
		cameraState=cameraStateNOTFOUND;	
	
	if (oldCameraState != cameraState)
	{
		ExternalInterface.call("SWF.changeCameraState",cameraStateWORKING == cameraState ? 1 : 0,(e ? e.code : 0));
		
		streamEngine.send(SEND_CAMERA_STATE, cameraState);
		
		if (oldCameraState==cameraStateNOTFOUND && cameraState!=cameraStateNOTFOUND)
			InitAudioVideoSettings();
	}
	
	
}

	
private function InitAudioVideoSettings():void
{
	status("Player: " + Capabilities.version);
	
	localSO = SharedObject.getLocal(localSOname,"/");
	
	
	micNames = Microphone.names;
	if (micNames.length==0)
		status("No microphone available.");

	cameraNames = Camera.names;
	if (cameraNames.length==0)
		status("No camera available.");

	
	// selected mic device
	if (localSO.data.hasOwnProperty("micIndex"))
		micSelection.selectedIndex = localSO.data.micIndex;

	// set Mac default camera
	if (Capabilities.os.search("Mac") != -1)
	{
		cameraSelection.selectedIndex=0;
		 
		while(cameraNames[cameraSelection.selectedIndex] != defaultMacCamera &&
				cameraSelection.selectedIndex < cameraNames.length)
			
			cameraSelection.selectedIndex++;
					
	}
	
	// selected camera device
	if (localSO.data.hasOwnProperty("cameraIndex"))
		cameraSelection.selectedIndex = localSO.data.cameraIndex;

	// mic volume
	if (!localSO.data.hasOwnProperty("micVolume"))
		localSO.data.micVolume = DefaultSettings.micVolume;
	micVolumeSlider.value = localSO.data.micVolume;
		
		// speaker volume
	if (!localSO.data.hasOwnProperty("speakerVolume"))
		localSO.data.speakerVolume = DefaultSettings.speakerVolume;
	speakerVolumeSlider.value = localSO.data.speakerVolume;


	// audio quality
	if (!localSO.data.hasOwnProperty("audioQuality"))
		localSO.data.audioQuality = DefaultSettings.audioQuality;
	micQual.value = localSO.data.audioQuality;
		
		
	// video quality
	
	if (!localSO.data.hasOwnProperty("videoQuality"))
		localSO.data.videoQuality = DefaultSettings.videoQuality;	
	
	vidQual.value = localSO.data.videoQuality;
		
		
	
	if(micNames.length>0)
		micIndexChanged();
	if(cameraNames.length>0)
		cameraIndexChanged();
	
	remoteVideo.height=remoteVideoDisplay.height;
	remoteVideo.width=remoteVideoDisplay.width;
	remoteVideoDisplay.addChild(remoteVideo);
	remoteVideoAdded=true;
		
}

private function cameraIndexChanged():void
{
	ExternalInterface.call('function(i){$("user_swf").selectCamera(i);}',cameraSelection.selectedIndex);
	
	if(camera)
		camera.removeEventListener(StatusEvent.STATUS,updateCameraSituation);
	
	camera = Camera.getCamera(cameraSelection.selectedIndex.toString());
	
	camera.addEventListener(StatusEvent.STATUS,updateCameraSituation);
	
	if(camera){
		showCamerSecurity();
		
		if(streamEngine.UDPenabled==-1)
			camera.setMode(320,240, 15);
		else
			camera.setMode(352,264, 15);//TODO: HD mode? 640, 480
			
		camera.setQuality(localSO.data.videoQuality*bitrateFactor,0);

		userVideo.attachCamera(camera);
		
		reenableCamera();
				
		localSO.data.cameraIndex = cameraSelection.selectedIndex;
		setTimeout(localSO.flush,2000);//Flush it after 2 seconds to prevent 
		//a broken camera that crashed the browser to be saved in cookie 
	}
	updateCameraSituation();
}



private function micIndexChanged():void
{
	if(!mic)
	{
		mic =  Microphone.getMicrophone(micSelection.selectedIndex);
		mic.codec = SoundCodec.SPEEX;
		mic.setSilenceLevel(0);
		mic.framesPerPacket = 1;
		mic.gain = micVolumeSlider.value;
		mic.encodeQuality = micQual.value;
	}else{
		var oldMic	:Microphone = mic;
		
		mic = Microphone.getMicrophone(micSelection.selectedIndex);
		
		mic.codec = oldMic.codec;
		mic.rate = oldMic.rate;
		mic.encodeQuality = oldMic.encodeQuality;
		mic.framesPerPacket = oldMic.framesPerPacket;
		mic.gain = oldMic.gain;
		mic.setSilenceLevel(oldMic.silenceLevel);
	}
	
	if(outgoingStream)
		if (callingState.isConnected && !sendAudioCheckbox.selected)
			outgoingStream.attachAudio(mic);
	
	localSO.data.micIndex = micSelection.selectedIndex;
	localSO.flush();
}



private function speakerVolumeChanged(e:SliderEvent):void
{
	status("Setting speaker volume to: " + e.value/100);
	
	if (incomingStream)
		incomingStream.soundTransform = new SoundTransform(e.value/100);
	
	localSO.data.speakerVolume = e.value;
	localSO.flush();
	
	
	if(receiveAudioCheckbox.selected)
	{
		receiveAudioCheckbox.selected=false;
		onAudioMuted();
	}
}

private function audioQuality(e:SliderEvent):void
{
   	localSO.data.audioQuality = e.value;
	localSO.flush();
	
	streamEngine.send(SEND_AUDIO_QUALITY,e.value);
}

private function videoQualityChanged(e:SliderEvent):void
{
	localSO.data.videoQuality = e.value;
	localSO.flush();
	
	streamEngine.send(SEND_VIDEO_QUALITY,localSO.data.videoQuality);
}

private function onVideoPaused():void
{
	userStatus("","Video paused");
	status("receive video: "+receiveVideoCheckbox.selected.toString());
	
	if (incomingStream)
	{
		//incomingStream.receiveVideo(receiveVideoCheckbox.selected);
		if(receiveVideoCheckbox.selected)
		{
			
			remoteVideo.attachNetStream(incomingStream);
			remoteVideo.clear();
			streamEngine.send(RECEIVE_STATE_VIDEO_UPDATE,receiveStateVIDEO_NOT_MUTED);
		
		    setDisplayState(true);
		    /*if(!remoteVideoAdded)
		    {
				remoteVideoDisplay.addChild(remoteVideo);
				remoteVideoAdded=true;
		    }*/	
		}
		else
		{	
			remoteVideo.attachNetStream(null);	
			setDisplayState(false);
			/*
		    if(remoteVideoAdded)
		    {
				remoteVideoDisplay.removeChild(remoteVideo);
				remoteVideoAdded=false;
		    }*/				
			streamEngine.send(RECEIVE_STATE_VIDEO_UPDATE,receiveStateVIDEOMUTED);
		}
		
	}
}


private function onAudioMuted():void
{
	status("receive audio: "+(!receiveAudioCheckbox.selected).toString());
	if (incomingStream)
	{
		incomingStream.receiveAudio(!receiveAudioCheckbox.selected);
		if(!receiveAudioCheckbox.selected)
			streamEngine.send(RECEIVE_STATE_AUDIO_UPDATE,receiveStateAUDIO_NOT_MUTED);
		else
			streamEngine.send(RECEIVE_STATE_AUDIO_UPDATE,receiveStateAUDIOMUTED);
	}
	
	if(receiveAudioCheckbox.selected)
		speakerVolumeSlider.value = 0;
	else
		speakerVolumeSlider.value = localSO.data.speakerVolume;
}

//##################       Utility      ##################

private function onTimer(e:Event=null):void
{
	updateCameraSituation();
}

private function status(msg:String):void
{
	//new Date().toLocaleTimeString().substr(0,8)+" "+
	//statusArea.text+ = msg+"\n";
	//statusArea.validateNow();
	//statusArea.verticalScrollPosition = statusArea.textHeight;
	trace("ScriptDebug: "+ msg);
	
	//LIVE: deactivate?
	ExternalInterface.call("function(msg){konsole.flash(msg);}",msg);
}

private function userStatus(msg:Object,msg2:Object):void
{
	if(msg!=null && msg!="0")
		statusAreaL2.text 	= msg.toString();
	if(msg2!=null && msg2!="0")
		statusAreaL1.text 	= msg2.toString();	
}