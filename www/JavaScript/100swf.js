// Needs Mootools, Waitor.js and Code.js

var SWF = new Waitable({ 
	name : "SWF",
	load : function ()
	{
		flashvars = { phptime : $time() };
		var params = {
				wmode : 'opaque',
				bgcolor : '#ECEFF5',
				allowScriptAccess : "sameDomain"
				
			};
		var attributes = {};
		
		swfobject.embedSWF(	"swf/user.swf", 
							"user_swf", 
							"1", "1", "10.0.0", 
							"", 
				flashvars, params, attributes,function(a)
				{
					if(!a.success)
						noFlashSupportDetected();
					else
						SWF.setSwitch("user_dom");
			
			}
		);
		
		swfobject.embedSWF(	"swf/partner.swf",
							"partner_swf", 
							"1", "1", "10.0.0", 
							"swf/expressInstall.swf", 
							flashvars, params, attributes,
			function(a){
				if(!a.success)
					noFlashSupportDetected();
				else
					SWF.setSwitch("partner_dom");
			}
		);
		
		//Register the wait for both swfs to be accesible
		waitOn({'partner_dom' : SWF,'user_dom' : SWF},function(){
			SWF.setSwitch("dom");
		});
		
		//Register the wait for both swfs to be loaded
		waitOn({'partner_load' : SWF,'user_load' : SWF},function(){
			$('partner_container').addEvent('mouseout',function(){$('partner_swf').onMouseOut();});
			SWF.setSwitch("load");
		});
	},
	
	noFlashSupportDetected : function()
	{
		konsole.log("No flash detected!");
		App.stopAppDoesntStartTimer();
		$('partner_getFlashPlugin').setStyle('display','block');
		SWF.setSwitch("noFlashSupport");
	},
	
	showCameraSecurity: function(){
		SWF.waitOn("load",function(){
			$('partner_swf').showCameraSecurity();
			$('user_swf').showCameraSecurity();
		});
	},
	
	changeCameraState: function(state)
	{
		Sets.Properties.Camera = state;
	}
});


/* no longer used
 
function changeCameraState(state,eventCode)
{
	konsole.log("changeCameraState:" + state +" "+eventCode);
	
	if(eventCode == "Camera.Unmuted" )
	{
		$('user_container').dispose();
		
		new Element('div',{'id':'user_container'}).grab(
						new Element('div',{'id':'user_swf'})).inject('user_column','top');
		
		var params = {
				wmode : 'transparent',
				bgcolor : '#ECEFF5',
				allowScriptAccess : "sameDomain"
				
			};
		var attributes = {};
		
		swfobject.embedSWF(	"swf/user.swf", 
							"user_swf", 
							"1", "1", "10.0.0", 
							"expressInstall.swf", 
							flashvars, params, attributes,function()
							{
			UI.redraw();
			
								//onFlashInit('user');
							});
		
		}
	}*/