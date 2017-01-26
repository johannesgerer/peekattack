var Facebook = new Waitable({
	
	name				: 'Facebook',
	
	appId				:  null, //LIVE key!
	
	session				: -1,
	perms				: "",
	
	load				: function()
	{
	
		FB.Event.subscribe('fb.log',function(a){konsole.log("FB: "+a);});
    	/*FB.Event.subscribe('auth.logout', function(a){konsole.log("FB: auth.logout "+a);});
    	FB.Event.subscribe('auth.sessionChange', function(a){konsole.log("FB: auth.sessionChange "+a);});
    	FB.Event.subscribe('auth.statusChange', function(a){konsole.log("FB: auth.statusChange "+a);});
    	FB.Event.subscribe('FB.loginStatus', function(a){konsole.log("FB: FB.loginStatus "+a);});
    	//Care full! This is also fired, if I am connected to peekattack as facebook user
    	// and logout of facebook and hit F5 on peekattack right after FB.init!
    	//SO DONT USE IT!
    	FB.Event.subscribe('auth.login', function(a){konsole.log("FB: auth.login "+a);});
    	 */	
    	
        FB.init({//ONLY ENABLE WHAT IS REALLY NEEDED!!!!!!!
          appId  : Facebook.appId,
          //status : true, // check login status //performs a getLoginStatus, but with no callback
          										//hack; use internal FB.loginStatus event
          status : false, //we chose fasle and then call getLoginStatus by hand with callback!
          cookie : true, // is needed for snapshot_to_facebook.php 
          xfbml  : false // parse XFBML
        });
        
		
        
        FB.getLoginStatus(Facebook.CheckLogin);
        
		//Try again every two seconds to get the Login Status
		Facebook.loginStatusPeriodical=(function()
		{
			konsole.log("Trying AGAIN: FB.getLoginStatus");
			
			//if flash player has to be installed, stop the loop
			if(SWF.noFlashSupport)
				return;
			
			//IF getLoginStatus does not succed, it's because the XD receiver 
			//failed to connect to the window (viePostmessage or Flash). 
			//And a retry of getLoginStatus is blocked because of: FB.Auth._loadState = 'loading';
			if(FB.Auth)
				FB.Auth._loadState = 'abort';

 			FB.getLoginStatus(Facebook.CheckLogin);

		}).periodical(2000);
		
	},
	
	CheckLogin : function (response)
	{
		$clear(Facebook.loginStatusPeriodical);
		
		if(!response.session)//Not connected
		{
			if(App.onFacebook){
				
				//Show FB Connect Button and hide LOADING BAR
				$('app_loading_bar').style.display = "none";
				$('app_retry_notice').style.display = "none";
				$("fb_connect_button").style.display = "block";
				
				App.stopAppDoesntStartTimer();
				
			}else{
				
				refreshGender();		
				Facebook.setSwitch("connect");
			}
			
		}else{
			
			App.stopAppDoesntStartTimer();
			
			Facebook.session = response.session;
			
			//Add the permissions
			if(response.perms)
				Facebook.perms += ","+response.perms;
					
			
			
			if(!Facebook.loggedIn)
				Facebook.loggedIn = true;
			else //If we are already loggedIn
				//this is the case e.g. if the permission to pusblish snapshots is granted
				//for an already loggin user
				return;
			
			
			
			$("fb_connect_button").style.display = "none";
			
			//Facebook Geschlecht, Sprache, Name, Photo und Link holen
			Facebook.getUserInformation();
			
			
			//If we already were connected to facebook 
			//(i.e. this is a late login on the external page 
			if(Facebook.getSwitch('connect')){
				
				genderAlready=false;
				
				var obj = {	'FBSession':response.session};
				
				if(callingState == callingStateCALLING)	//If the user is calling, 
														//The new tClient entry has to be set to available
					$extend(obj,Sets);
				
				Ape.core.request.cycledStack.add('FacebookConnect',obj);
				Ape.core.request.cycledStack.send();
				
			}else{
				
				App.startAppDoesntStartTimer();
				Facebook.setSwitch("connect");
				
			}
			
		}
	},
	
	getUserInformation : function(){
		//http://developers.facebook.com/docs/reference/fql/user
		var query = FB.Data.query('SELECT locale,sex,pic_square,pic_small FROM user WHERE uid={0}'
									,Facebook.session.uid);
                
		query.wait(function(rows) {

			if(rows.length == 1)
			{
				//####  Locale  #####
				addLanguage(rows[0].locale);
				
				$('user_languages').set('text',getLanguageString(Sets.Properties));
				
				//####  Pic  #####
				facebookUserInfo.pic = rows[0].pic_square;
				$('user_pic').src=rows[0].pic_square;
				
				
				facebookUserInfo.sex = rows[0].sex;
				
				//####  Gender #####
				switch(rows[0].sex)
				{
				case "male":
					Sets.Properties.Gender = 1;
					break;
				case "female":
					Sets.Properties.Gender = -1;
					break;
				default:
												
				}
				refreshGender();
					
					
					
			}
		});
		
		var query = FB.Data.query('SELECT name,url FROM profile WHERE id={0}'
				,Facebook.session.uid);

				query.wait(function(rows) {
				
					if(rows.length == 1){
						facebookUserInfo.name = rows[0].name;
						facebookUserInfo.url = rows[0].url;
						$('user_name_anon').style.display = "none";
						//####  Name #####	
						$('user_name').setProperties({
							'href' 	: rows[0].url,
							'text'	: rows[0].name,
							'style':{
								'display':'inline'
							}
						});
						$('user_pic_link').set('href',rows[0].url);
						$('user_pic_anon').style.display = "none";
						$('user_pic_link').style.display = "inline";
						$('profile_connect_button').style.display = "none";
						
						if($chk(partner)){
							$('share_profile_button').style.display = "inline";
						}
						
					}
					
				});
		
		var bookmarked_query = FB.Data.query('SELECT bookmarked FROM permissions WHERE uid={0}'
				,Facebook.session.uid);

			bookmarked_query.wait(function(rows) {
			
				if(rows.length == 1){
					if(rows[0].bookmarked==0)
						$('facebook_bookmark').setStyle('display','inline');
				}
				
			});
	},
	
	openBookmarkDialog : function (){
		FB.ui({'method':'bookmark.add'},
				function(response){
					if(response.bookmarked==1)
						$('facebook_bookmark').setStyle('display','none');
		});
	}
});
