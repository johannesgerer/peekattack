var App = new Waitable({
	
	name  		: "App",
	
	TimeToDisplayAppDoenstStartMessage : 6000,
	
	onFacebook	: false,
	
	//########   Init  #################	
	init 		: function()
	{	
		
		var isOnAllowedHost = false;
		allowedHosts.each(function(host){
			var regexp = new RegExp(host.escapeRegExp()+'$','g')
			if(top.location.hostname.search(regexp))
				isOnAllowedHost = true;
		})
		if(allowedSites.contains(top.location.protocol+top.location.hostname+top.location.pathname))
			isOnAllowedHost = true;
		
		if(!isOnAllowedHost)
			document.location = "forbidden.html";
		
		
		if(!browserIsCompatible()){

                        $('ie6_notice').setStyle('display','block');
                        $('app_loading_bar').style.display = "none";
                        $('app_retry_notice').style.display = "none";
                        return;

                }

		if(queryStringMatch('fb=1'))
			App.onFacebook = true;
		
		window.addEvent('domready',App.DOMready);
		
		
		createKonsole();
		
		//Start the user interface, when Facebook status is known
		//and the SWF are accessable
		waitOn({'dom' 	: SWF,	'connect'	: Facebook	},UI.start);
		
		//Connect to Ape, when facebook is connected
		waitOn({'load2' : Ape,'connect' : Facebook},Ape.start);
		
		//Start the app when these are done!
		waitOn({	'stratus'	: SWF, 
					'load' 		: SWF, 
					'connect'	: Facebook,
					'connect'	: Ape
				},App.start);
	},
	
	//So viel wie möglich hier rein, um den browser zu entlasten
	DOMready : function()
	{

		Facebook.load();
		
		SWF.load();

		Ape.load();
		
		//Do Background stuff, while APE, Facebook, and SWF are loading
		setBrowserLanguages();
		findBase64Limit();
		
		// ###### Filter Cookie ######
		if($chk(Cookie.read('Filters')))
			Sets.Filters=JSON.parse(Cookie.read('Filters'));
		
		Sets.currentFilterID = currentFilterID();
		
		
		
		// ######   APE Loaded  ######
		// 2) Intercept 'load' event. This event is fired when the Core is loaded
		// and ready to connect to APE Server
		SWF.waitOn('auth_cookie',function(){
    		$('take_snapshot_button').addEvent('click',function(){
    			onSnapshotClick();
    		});
    	});
		
		
		createFilterDropDownBoxes();
		
		App.startAppDoesntStartTimer();
		
		//UI.init();
	},
	
	start : function()
	{
		App.setSwitch('start');
		
		$('next_button').addEvent('click',next);
		$('stop_button').addEvent('click',stop);
		
		$('snapshots_button').addEvent('click', function(){
			UI.navigateTo('history');return false;
			});
	},
	
	startAppDoesntStartTimer : function()
	{
		App.loadingRetryTimer = (function a(){
			$("app_retry_notice").style.display = "block";
		}).delay(App.TimeToDisplayAppDoenstStartMessage);
		
	},
	
	stopAppDoesntStartTimer : function()
	{
		$clear(App.loadingRetryTimer);
	}
	
	
});

function browserIsCompatible(){
	if(Browser.Engine.name+Browser.Engine.version=="trident4")
		return false;
	return true;
}
