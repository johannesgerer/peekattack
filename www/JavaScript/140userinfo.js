
function sendProfile(share){
	
	if(!share)
	{
		konsole.log("not sharing profile");
		sendToPartner("SEND_PROFILE",0,true);
	}
	else
	{
		konsole.log("sharing profile: "+Facebook.session.uid);
		sendToPartner("SEND_PROFILE",JSON.stringify(facebookUserInfo),true);

		$('share_profile_button').style.display = "none";
		$('share_profile_shared').style.display = "inline";
	}
}

function requestPartnerProfile(){
	
	konsole.log("requesting profile ");
	
	$('request_profile_button').setStyle('display',"none");
	$('request_profile_waiting').style.display = "inline";
	
	sendToPartner("REQUEST_PROFILE",null,true);
	
}

function onPartnerSendProfile(data){
	if(data==0)
	{
		$('request_profile_waiting').set('text',"Partner ignored request");
		$('request_profile_waiting').highlight('#c54343');
	}
	else
	{
		
		konsole.log("received profile: "+data);
		
		var partnerFacebookInfo = JSON.parse(data);
		
		$('partner_pic').set('src',partnerFacebookInfo.pic);
		
		
		$('request_profile_button').setStyle('display',"none");
		$('request_profile_waiting').style.display = "none";
		
		$('partner_name').set('text',partnerFacebookInfo.name);
		$('partner_name').set('href',partnerFacebookInfo.url);
		$('partner_pic_link').set('href',partnerFacebookInfo.url);

		$('partner_name_stranger').style.display = "none";
		$('partner_name').style.display = "inline";
		
		$('partner_pic_stranger').style.display = "none";
		$('partner_pic_link').style.display = "inline";
	
	}
}

function onPartnerRequestProfile(){
	
	UI.showQuestion('name', true);
	
}
