
var snapshots = Array();
var pendingSnapshots = {};
var oldestSnapshotTime = -1;

var moreSnapshots = true;
var waitingForPrevious = false;

var old_leftwidth=0;
var information_scroll_position = 0;

var currentSnapshot = null;

var snapshot_initialized = false;

function initHistory(){
	hideSnapshot();
	if(snapshot_initialized)
		return;
	getSnapshots();
	snapshot_initialized = true;
    $("snapshot").addEvent("load",function(){
    		//konsole.log("Snapshot IMG load Event");
		}
	);
}

function refreshSnapshots()
{
	//Remove the snapshots and get a new set from the combined table)
	oldestSnapshotTime = -1;
	
	for(snap in pendingSnapshots)
			if(pendingSnapshots[snap])
				pendingSnapshots[snap].thumb.dispose();
	
	pendingSnapshots = {};
	
	if(currentSnapshot)
		hideSnapshot();
	
	getSnapshots();
}
    	
function getSnapshots(){
	
	var n = numberOfSnapshots;
	
	Ape.core.request.cycledStack.add('getSnapshots',{"n":n,"from":oldestSnapshotTime});
	Ape.core.request.cycledStack.send();
	
	$("loading_thumb").inject($("delete_all_snapshots"),'before');
	$("loading_thumb").style.display = "block";

    $("snapshot_empty").style.display = "none";
    $("more_snapshots_button").style.display = "none";
    
}
function getSnapshotsResponse(result){
	//https://graph.facebook.com/?ids=100000930948145,98423808305&access_token=2227470867|2.eB67Gv3F_jKt1hKgizkgVQ__.3600.1275652800-100000930948145|HIGRRy9TkXBJmSz0qbb9-UfCY1M.
	
	var FacebookSnapshots={};//Array not Object!
	var FacebookIDs=[];
		
	$("loading_thumb").style.display = "none";
	
	var newSnapshots = false; // wird true, falls Snapshots kommen, die noch nicht da (und pending) sind
	var number = result.Snapshots.length;
	
	if(number>0)
	{
		setOldestSnapshotTime(result.Snapshots[number-1].tCreated.toInt());			
	
		for(var i=0;i<number;i++){
			
			var item=result.Snapshots[i];
			
			item.tCreated = item.tCreated.toInt();
			
			if($chk(item.pendingID)){ // Snapshot ist neu, soll vorne eingefügt werden
				
				if($chk(pendingSnapshots[item.pendingID])){ // snapshot, der bereits per Base64 angezeigt wird, 
															// wurde von APE in DB inserted und wird jetzt überschrieben
					var snapshot = pendingSnapshots[item.pendingID];
					
					//Add the server side information: filename and ID
					$extend(snapshot,item);
					pendingSnapshots[item.pendingID]=null;
					
					snapshot.share_button.setStyle('visibility','visible');
					
					//Browser does not support display of long data URI
					if(!base64(snapshot.base64.length-snapshot.length))
					{
						snapshot.base64 = null;
						
						//If the snapshot is currently displayed (which will be spacer)						
						if(currentSnapshot == snapshot)
							//Display it again and load the file
							displaySnapshot(currentSnapshot);
						
						//Browser does not support display of short data URI
						if(!base64(snapshot.length))
						{
							new Element('img',{ 
							    	'src': snapshotThumbsPath + snapshot.fFilename + "." + snapshotThumbsExtension
							    }).replaces(snapshot.thumb_img);
						}
					}
						
				}else{ // snapshot war noch nicht da, sondern kommt direkt von APE
	
					newSnapshots = true;	
					insertThumb(item);
				}
				
			}else if(item.fFacebookID != 0){  // Snapshot ist auf Facebook
			
				FacebookSnapshots[item.fFacebookID] = item;
				FacebookIDs.push(item.fFacebookID);
			
			}else{ // Snapshot ist alt
				
				if(waitingForPrevious){ // im displaySnapshot Modus wurde per "previous" ein 
										// noch nicht geladener snapshot angefordert
					waitingForPrevious = false;
					displaySnapshot(item);
					
				}
				
				insertThumb(item);			
			}		
		}
		
		// es gibt noch mehr snapshots in der DB
		moreSnapshots = result.More;
		if(moreSnapshots){
		    $("more_snapshots_button").style.display = "block";
		    $("more_snapshots_button").inject($("delete_all_snapshots"),'before');
		}
		
		// Blinken des Buttons
		if(UI.currentPage!='history' && newSnapshots)
			toggleHistoryOverState(5);
		

		if(FacebookIDs.length > 0)
		{
			FB.api('/?ids='+FacebookIDs.join(), function(photos) {
				
				if($type(photos)=="object")
					for(var id in photos)
					{
						FacebookSnapshots[id].facebook=photos[id];
						
						if(waitingForPrevious){ // im displaySnapshot Modus wurde per "previous" ein 
							// noch nicht geladener snapshot angefordert
							waitingForPrevious = false;
							displaySnapshot(FacebookSnapshots[id]);
						}
						
						insertThumb(FacebookSnapshots[id]);
					}
			});
		}
	}else if(snapshots.length==0 ){	// User hat noch keine Snapshots
		$("snapshot_empty").style.display = "block";	
		$("delete_all_snapshots").style.display = "none";
	}
}

function setOldestSnapshotTime(time)
{
	// Setzen des Zeitpunktes, ab dem weitere Snapshots selected werden
	if(time < oldestSnapshotTime || oldestSnapshotTime==-1)
		oldestSnapshotTime = time;
}

function flashThumbnail(snapshot)
{
	setOldestSnapshotTime(snapshot.tCreated);
	
	// snapshot is pending until overwritten by APE
	pendingSnapshots[snapshot.pendingID] = snapshot;
	
	insertThumb(snapshot);
	
	// Blinken des Buttons (wenn man entweder nicht in der hisotry ist, oder
	//gerade einen snapshot anschaut)
	if(UI.currentPage!='history' || currentSnapshot)
		toggleHistoryOverState(5);

    $("snapshot_empty").style.display = "none";
    $("delete_all_snapshots").style.display = "block";
    
}

function sortTCreated(a,b)
{
return b.tCreated - a.tCreated;
}

function insertThumb(snapshot){

	if(!snapshot.base64)
		for(var i=0;i<snapshots.length;i++)
			if(snapshots[i].fID ==  snapshot.fID)
				return;
	
	//Prepend the new Snapshot to the exsting snapshots array
	snapshots.unshift(snapshot);
	
	createThumb(snapshot);

	snapshots.sort(sortTCreated);
	
	var i=snapshots.indexOf(snapshot)+1;
	
	if(snapshots.length==i){
		snapshot.thumb.inject($("more_snapshots_button"),'before');
		
	}else{
		snapshot.thumb.inject(snapshots[i].thumb,'before');
	}

	if(snapshots.length > 0)
		$("delete_all_snapshots").style.display = "block";
	
	
	
}

function removeThumb(snapshot){
	
	snapshot.thumb.dispose();
	
	if(snapshots.length == 0){

	    $("snapshot_empty").style.display = "block";
	    $("delete_all_snapshots").style.display = "none";
	    
	}
	
}

function createThumb(snapshot){
	
	var src;
	
	snapshot.tCreated = snapshot.tCreated.toInt();
	
	if(snapshot.base64)
	{
		if(base64(snapshot.length))
			src = "data:image/"+snapshotThumbsExtension+";base64,"+snapshot.base64.substr(0,snapshot.length);
		else
			src=spacerGif;
	}
	else if(snapshot.facebook)
		src = snapshot.facebook.picture;
	else
		src = snapshotThumbsPath + snapshot.fFilename + "." + snapshotThumbsExtension;
	
	var snapshotDate = DateFormat.getShortDateString(snapshot.tCreated);
	
	var history_thumb = new Element('div',{
	 	'class'	: 'history_thumb'
	});

    var history_thumb_a = new Element('a',{ 
    	'href':"#",
    	'events': { 'click'	:	function(){
							        displaySnapshot(snapshot);
							        return false;
							    }
			}
	});

    var history_thumb_img = new Element('img',{ 
    	'src': src,
    	'events': { 'load'	:	function(){
									//konsole.log("Thumb IMG load Event");
							    }
			}
    });
    history_thumb_img.inject(history_thumb_a);

    var share_container = document.createElement("div");
    share_container.className = "share_container";

    var share_button = new Element('div',{ 
    	'class': "share",
    	'text'	: (snapshot.facebook ? "Open" : "Save"),
    	'rel' : (snapshot.facebook ? "Open snapshot in Facebook album" : "Save snapshot to Facebook album"),
    	'events': { 'click'	:	(snapshot.facebook ? 
    								openURLblank.bind(this,snapshot.facebook.link)
    												: shareSnapshot.bind(snapshot)),
					'mouseover': function(){
									share_button.addClass('share_hover');
								},
					'mouseout': function(){
									share_button.removeClass('share_hover');
								}

			},
		'styles': (snapshot.base64 ? {'visibility'	:'hidden'} : {} )
    }).inject( new Element('div',{ 'class': "share_container" } ).inject(history_thumb_a));
    
    UI.toolTipsDelayed.attach(share_button);
    
    var caption_date = new Element('div',{
    	'class': "date"
    }).inject(history_thumb_a);
    caption_date.appendText(snapshotDate);

    history_thumb_a.inject(history_thumb);
    
    snapshot.thumb = history_thumb;
    snapshot.thumb_img = history_thumb_img;
    snapshot.share_button = share_button;
    
    return history_thumb;
}

function shareCurrentSnapshot()
{
	$('save_to_facebook').removeEvents('click');
	$('save_to_facebook').set('text','Saving ...');
	shareSnapshot.apply(currentSnapshot);
	return false;
}

function shareSnapshot()
{
	this.share_button.removeEvents('click');
	this.share_button.addEvent('click',function(){return false;});
	
	if(Facebook.perms.indexOf('photo_upload') == -1 || Facebook.perms.indexOf('user_photos') == -1 || !Facebook.loggedIn)
		FB.login((function(response) {
			
		  if (!response.session) 
			  ;//user is not logged in TODO
		  else
		  {
			  Facebook.CheckLogin(response); 
			  if(Facebook.perms.indexOf('photo_upload') != -1 && Facebook.perms.indexOf('user_photos') != -1 )
			  {
				  shareSnapshotFinally(this);
				  return;
			  }
		  }
		  
		  this.share_button.addEvent('click',shareSnapshot.bind(this));
			  
		}).bind(this), {'perms':'photo_upload,user_photos'});
	else
		shareSnapshotFinally(this);
	
	return false;
}


function shareSnapshotFinally(snapshot)
{
	snapshot.share_button.set('text','Saving...');
	
	var request = new Request( {	'url'		: saveSnapshotUrl,
									'noCache'	: true});
	
	request.send(	"fID="+snapshot.fID+
					"&authCookie="+Ape.authCookie+
					"&fFilename="+encodeURIComponent(snapshot.fFilename)+
					"&loginResponseFBPermissions="+(Ape.loginResponse.FBPermissions ? "1" : "0"));
	
	request.onSuccess=function(result)
	{
		result=JSON.parse(result);
		if(result['id'])
			FB.api('/?ids='+result['id'], function(photos) {
				for(var id in photos)
					if(parseInt(id)>0)
					{
						
						snapshot.facebook = photos[id];
						
						
						snapshot.share_button.addEvent('click',openURLblank.bind(this,photos[id].link));
						
						snapshot.share_button.set('text','Open');
						
						if(snapshot == currentSnapshot)
						{
							$('open_in_facebook').setStyle('display','inline');
					    	$('open_in_facebook').set('href',snapshot.facebook.link);
					    	$('save_to_facebook').setStyle('display','none');
						}
											
						break;//Only one snapshot expected :-)
					}
			});
	};
	
}


function displaySnapshot(snapshot){

	if(!$chk(snapshot))
		return;
	
	//spacer.gif:
	$("snapshot").src = spacerGif;
	
	var src;
	
	if(snapshot.base64)
	{
		if(!base64(snapshot.base64.length-snapshot.length))
			src=spacerGif;
		else
			src = "data:image/"+snapshotExtension+";base64,"+snapshot.base64.substring(snapshot.length);
	}
	else if(snapshot.facebook)
		src = snapshot.facebook.source;
	else
    	src = snapshotPath + snapshot.fFilename + "." + snapshotExtension;
	
	var snapshotDate = DateFormat.getLongDateString(snapshot.tCreated);

    UI.maximizeInfo();

    information_scroll_position = $("information_container").scrollTop;
    
    if(snapshot.facebook)
    {
    	$('open_in_facebook').setStyle('display','inline');
    	$('open_in_facebook').set('href',snapshot.facebook.link);
    	$('save_to_facebook').setStyle('display','none');
    }
    else
    {
    	$('save_to_facebook').addEvent('click',shareCurrentSnapshot);
    	$('save_to_facebook').set('text','Save to Facebook Album');
    	$('open_in_facebook').setStyle('display','none');
    	$('save_to_facebook').setStyle('display','inline');
    }
    
    currentSnapshot = snapshot;
    $("snapshot_caption_date").innerHTML = snapshotDate;
    $("snapshot_container").style.display = "block";
    $("thumbs_container").style.display = "none";

    if(snapshots.indexOf(snapshot)==0){
    	$("caption_next_snapshot_button").style.display = "none";
    }else{
    	$("caption_next_snapshot_button").style.display = "inline";
    }
    if(snapshot==snapshots.getLast() && !moreSnapshots){
    	$("caption_previous_snapshot_button").style.display = "none";
    	$("snapshot").setStyle('cursor','auto');
    }else{
    	$("caption_previous_snapshot_button").style.display = "inline";
    	$("snapshot").setStyle('cursor','pointer');
    }
    

    $("snapshot").src = src;

    focusAndScrolldown();
}
function getNextSnapshot(snapshot,shift){
	
	if(!snapshots.contains(snapshot))
		return false;
	
	if(!$chk(shift))
		shift = 1;
	
	var index = snapshots.indexOf(snapshot)-shift;
	
	if(index>=snapshots.length)
		
		if(moreSnapshots){
			$("snapshot").src = spacerGif;
			waitingForPrevious = true;
			getSnapshots();
		}	
		else
			return snapshot;
		
	return snapshots[index];
}
function displayPreviousSnapshot(){
	displaySnapshot(getNextSnapshot(currentSnapshot,-1));
}
function displayNextSnapshot(){
	displaySnapshot(getNextSnapshot(currentSnapshot,1));
}
function hideSnapshot(){
    UI.restoreInfo();

    currentSnapshot = null;

    $("snapshot").src = spacerGif;
    $("snapshot_container").style.display = "none";
    $("thumbs_container").style.display = "block";
    $("information_container").scrollTop = information_scroll_position;
    
    focusAndScrolldown();
}

var toggleHistoryOverState = function(count) {
	if (count < 0)
		return;

	$("history_li").toggleClass("hover");
	
	count--;
	toggleHistoryOverState.delay(150,null,count);
};


function FBSharePhoto()
{
	if(!currentSnapshot.facebook)
	{
		alert('To share a snapshot, you have to save it first. Click "Save to Facebook Album"');
	}else
		FB.ui({
			method: 'stream.share',
			u: snapshotRedirectURL+'?picture='+
				encodeURIComponent(currentSnapshot.facebook.picture)+"&link="+
				encodeURIComponent(currentSnapshot.facebook.link)
		});
}

function deleteAllSnapshots(){
	
	if(confirm("Are you sure you want to delete all Snapshots?")){
		Ape.core.request.cycledStack.add('deleteSnapshots',{ 'all': true });
		Ape.core.request.cycledStack.send();
		
		var s;
		while(s = snapshots.pop())
			removeThumb(s);
	}
	
}
function deleteSnapshot(){
	
	if(confirm("Are you sure you want to delete this Snapshot?")){
		
		Ape.core.request.cycledStack.add('deleteSnapshots',{ 'ID': currentSnapshot.fID });
		Ape.core.request.cycledStack.send();
		
		var snapshotToRemove = currentSnapshot;
		
		displayPreviousSnapshot();
		
		removeThumb(snapshotToRemove);
		snapshots.erase(snapshotToRemove);
		
	}
	
}