function next(type)
{	
	konsole.log("CALLING FOR PARTNER...");
	setCallingState2(callingStateCALLING);
	
	hidePartnerProperties();
	
	 switch(type)
	 {
	 //Fallback
	 case 2:
		 $('notUDP2').setStyle('display','inline');
		 $('notUDP').setStyle('display','inline');
		 Ape.core.request.cycledStack.add('Fallback',Sets);
		 Ape.core.request.cycledStack.send();
		 partner=null;//SOFORT
		 break;
		 
	//Passive, due to user action received via Ape, or incomingStream.UNPUBLISH_NOTIFY
	//Where the "nexted" makes shure, that next is only perfomed once!
	 case 1:		 
		 if(partner && partner.nexted)//SOFORT
			 return;
		 
		 partner.nexted=true;
		 Ape.core.request.cycledStack.add('Next',$merge(Sets,{'passive':1}));
		 Ape.core.request.cycledStack.send();
		 break;
		 
	//default user triggered 'next':
	 default:
		 Ape.core.request.cycledStack.add('Next',Sets);
	 	 Ape.core.request.cycledStack.send();
	 	$('partner_swf').next_clickHandler();
	 	 
		 partner=null;//SOFORT
		 break;
	 }
	
	 
	//TODO focusAndScrolldown()
}

function onSnapshotClick()
{
	$('partner_swf').onSnapshotClick();
	//focusAndScrolldown()	
}

function stop()
{
	setCallingState2(callingStateDISCONNECTED);
	

	Sets.currentFilterID = currentFilterID();
	
	Ape.core.request.cycledStack.add("Stop",Sets);
	Ape.core.request.cycledStack.send();
	partner=null;//SOFORT
	
	hidePartnerProperties();
	
	$('partner_swf').onStopchat();
	//focusAndScrolldown();
}

function quitApe(type)
{
	//########    KRASS: #########
	//If this function is modified to be called only once on unload, it doesnt work anymore!
	
	if(Ape && Ape.core)
	{
		Ape.core.request.cycledStack.add("customQuit",{'code':type});
		Ape.core.request.cycledStack.send();
	}

	//TODO folgendes gibt manchmal ein error:
	//if(partner_swf && $chk($('partner_swf').onStopchat))
	//	$('partner_swf').onStopchat();
	
}

function onShareName(share)
{
	sendProfile(share);
	
	$('question_box_name').setStyle('display','none');
}
