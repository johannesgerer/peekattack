import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.events.Event;
import flash.net.URLLoader;
import flash.net.URLLoaderDataFormat;
import flash.net.URLRequest;
import flash.utils.ByteArray;
import flash.utils.setTimeout;

import mx.containers.GridItem;
import mx.controls.Alert;
import mx.events.Request;
import mx.graphics.codec.JPEGEncoder;
import mx.graphics.codec.PNGEncoder;
import mx.utils.Base64Encoder;


private var bitmapData			:BitmapData	;
private var	userTexInput		:String		="";

private const snapshotURL:String="snapshots/new_snapshot.php";

private var b64			:Base64Encoder	;
private var snapshot	:BitmapData		;


private var png			:PNGEncoder		;
private var jpg			:JPEGEncoder	;
private var thumbnail	:Image			;
private var thumbnailData	:BitmapData	;
private var thumbnailBytes	:ByteArray	;
private var snapshotBytes	:ByteArray	;
private var takingSnapshot	:Boolean = false;


//Snapshot sizes:
private static const fullwidth:int = 758;		
private static const fullheight:int = 570;


protected function onSnapshotClick():void
{
	
	if(!takingSnapshot)
	{
		takingSnapshot==true;

		//If in single mode, always make the partner video the bigger one!
		if(userWebCamDisplay.visible && remoteVideoDisplay.width < fullwidth/2)
		{
			snapRemoteVideo.width=fullwidth-7-remoteVideoDisplay.width;
			snapRemoteVideo.height = Math.round(snapRemoteVideo.width /320*240);
			
			remoteVideo.width=snapRemoteVideo.width;
			remoteVideo.height=snapRemoteVideo.height;
			
		}else{
			snapRemoteVideo.width=remoteVideoDisplay.width;
			snapRemoteVideo.height=remoteVideoDisplay.height;
		}	
		
		//Swap:
		if (UIstate.swapped != UIstate.single_view)
		{
			snapshot_content.addElement(snapshot_user_column);
			snapshot_content.addElement(snapshot_separator_column);
			snapshot_content.addElement(snapshot_partner_column);
		}else{
			snapshot_content.addElement(snapshot_partner_column);
			snapshot_content.addElement(snapshot_separator_column);
			snapshot_content.addElement(snapshot_user_column);
			
		}
			
		snapshot_user_column.height = fullheight - 3 - 34;
		snapshot_user_video.height = Math.round((fullwidth - 7)/320*240) - snapRemoteVideo.height;
		snapshot_user_video.width = Math.round(snapshot_user_video.height/240*320);
		chat_message_grid.height = snapshot_user_column.height - 50 - snapshot_user_video.height;
		if(gridItem)
		{
			gridItem.width = fullwidth - 7 -55- snapRemoteVideo.width ;
			if(chat_message_grid.maxVerticalScrollPosition > 0)
				gridItem.width -= 15;
		}
		
		
		//Scroll down
		validateNow();		
		chat_message_grid.verticalScrollPosition = chat_message_grid.maxVerticalScrollPosition;
		
		setTimeout(takeSnapshot,30);
	}
}

private function takeSnapshot():void
{		
	//Prepare snapshot
	snapshot =new BitmapData(snapshot_target.width,snapshot_target.height);
	
	
	//Append videos streams (webcam and partner stream) to displays
	if(callingState.isConnected)
		snapRemoteVideo.addChild(remoteVideo);
	snapshot_user_video.addChild(userVideo);
	userVideo.height = snapshot_user_video.height;
	userVideo.width = snapshot_user_video.width;
	
	var rueckgaening=function():void{
		//Remove videos from displays
		remoteVideoDisplay.addChild(remoteVideo);
		userWebCamDisplay.addChild(userVideo);
		remoteVideoDisplayResizeEvent();
	};
	
	try{
		//Take snapshot
		snapshot.draw(snapshot_target);
		//this can fail, if the RMTPStreamAccess is not granted!
	}catch(e:*){
		rueckgaening();
		status(e.toString());
		takingSnapshot=false;
		setTimeout(onSnapshotClick,1000);	
		return;
	}
	
	rueckgaening();
	
	
	//Load snapshot in image
	thumbnail.load(new Bitmap(snapshot,"auto",true));
	//Scale it
	thumbnail.content.width=130;
	//Scale it
	thumbnail.content.height=Math.round(fullheight/fullwidth*130);
	
	//Produce new BitmapData 
	thumbnailData=new BitmapData(thumbnail.content.width,thumbnail.content.height);
	//from thumnail image
	thumbnailData.draw(thumbnail);
	
	
	thumbnailBytes = jpg.encode(thumbnailData);
	b64.encodeBytes(thumbnailBytes);
	var thumbnail64:String=b64.flush();
	
	snapshotBytes = png.encode(snapshot);
	b64.encodeBytes(snapshotBytes);
	
	var timestamp:Number=new Date().getTime();
	var pendingID:String=timestamp+""+Math.round(Math.random()*100);
	
	ExternalInterface.call("flashThumbnail",{
		'base64'	:thumbnail64+b64.flush(),
		'length'	:thumbnail64.length,
		'tCreated'	:timestamp 	,
		'pendingID'	:pendingID	});
	
	//Send it to server...
	var urlRequest	:URLRequest= new URLRequest();
	
	urlRequest.method 		= "POST";
	
	urlRequest.contentType 	= "application/octet-stream";
	
	urlRequest.url=snapshotURL+"?"+
		"cookie="+authCookie+
		"&thumbnailLength="+thumbnailBytes.length+
		"&timestamp="+timestamp+
		"&pendingID="+pendingID+
		"&callID="+(streamEngine.partner.callID || "0");
	
	
	//Add the snapshot bytes
	thumbnailBytes.position = thumbnailBytes.length;
	thumbnailBytes.writeBytes(snapshotBytes);
	
	urlRequest.data = thumbnailBytes;
	
	//Send it
	var urlLoader:URLLoader = new URLLoader();
	urlLoader.addEventListener(Event.COMPLETE,uploadPhotoHandler);
	urlLoader.dataFormat = URLLoaderDataFormat.TEXT;//This is the receiving format which hat nothing to do with the fact that we send binary data (octet-stream) (urlRequest.contentType)
	urlLoader.load(urlRequest);
	
	if(userWebCamDisplay.visible && remoteVideoDisplay.width < fullwidth/2)
		remoteVideoDisplayResizeEvent(null);
	
	
	takingSnapshot=false;
	
} 



private function init_snapshot():void
{
	snapshot_target.height = fullheight;
	
	png						= new PNGEncoder();
	jpg						= new JPEGEncoder(80);
	thumbnail				= new Image();
	b64						= new Base64Encoder();
}

private function uploadPhotoHandler(e:Event):void {
	if((e.target as URLLoader).data.indexOf("success")==-1)
		Alert.show((e.target as URLLoader).data);
	(e.target as URLLoader).removeEventListener(Event.COMPLETE,uploadPhotoHandler);
}