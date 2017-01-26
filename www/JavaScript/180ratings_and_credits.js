
function onNakedRate(naked){
	if(!partner)//SOFORT
		return;
	UI.hideQuestion('naked');
    var rating = -1;
    if(naked){
        rating = 1;
    }
    
	 Ape.core.request.cycledStack.add('Rate',{"rating":rating});
 	 Ape.core.request.cycledStack.send();
}
function displayCredits(o){
	
	var oldCredits = parseInt($('user_credits').innerHTML);
	
	var newCredits = parseInt(o.Credits);
	
	$('user_credits').innerHTML =o.Credits;
	
	if(oldCredits > newCredits)
		$('user_credits').highlight('#c54343');//red
	else if(oldCredits < newCredits)
		$('user_credits').highlight('#47970e');//green
}

