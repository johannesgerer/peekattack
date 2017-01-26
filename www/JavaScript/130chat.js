var userTypingState = 0;
var partnerTypingState = 0;
var TurboChatCheckBox;
var TurboChatTextMe;
var TurboChatTextPartner;
var TurboChatRowMe;
var TurboChatRowPartner;

var currentConversation;

var     callingStateDISCONNECTED= "callingStateDISCONNECTED";
var		callingStateCONNECTED   = "callingStateCONNECTED";
var     callingStateCALLING	= "callingStateCALLING";

var 	partnerTexInput		=	"";
var 	partnerTypedLast	=	-1;
var	STRANGER		=	"partner";
var	MYSELF			=	"me";
// const TYPING_ERASING = ["","(is typing)","(is erasing)"];
var     turboChatEnabled        =	true;
var     callingState            =      "startup";
var 	typingStateTimer=0;

var lastChatText = "";
var chatInitializied = false;

var lastMessageFrom="";

var myInput;

function initialize_chat()
{
	myInput = $("chat_input_container_textarea");
	
	myInput.onchange   =   updateTextInput;
	myInput.onkeyup    =   ChatKeyUpHandler;
	myInput.onkeydown  =   ChatKeyDownHandler;
	myInput.onkeydown  =   ChatKeyDownHandler; //TODO: warum zweimal, johannes? und, eigtl. besser mit mootools!


    TurboChatCheckBox       = $('TurboChat');

    TurboChatCheckBox.onclick = function() {turboChatEnabled = TurboChatCheckBox.checked;};

    // ######## TurboChat Rows ##############

     TurboChatRowMe = new Element('div',{
   		'class': ""
     });
     TurboChatRowPartner = new Element('div',{
  		'class': ""
      });
     
     var TurboChatFromMe = new Element('div',{
 		'class': "from_column "+MYSELF,
		'html': "*Me:"
     }).inject(TurboChatRowMe);
     var TurboChatFromPartner = new Element('div',{
  		'class': "from_column "+STRANGER,
 		'html': "*Partner:"
     }).inject(TurboChatRowPartner);

     var textMe = new Element('div',{
    	 'class': 'text_column'
     }).inject(TurboChatRowMe);
     var textPartner = new Element('div',{
    	 'class': 'text_column'
     }).inject(TurboChatRowPartner);
     
     TurboChatTextMe = new Element('div',{
     }).inject(textMe);
     TurboChatTextPartner = new Element('div',{
         }).inject(textPartner);


     chatInitializied = true;
}

function setCallingState2(cs)
{
	
	myInput.value="";
	
	callingState = cs;

    if(callingState==callingStateCONNECTED)
    {
    	
        appendConversation();
        
    }else if(currentConversation){
	
		TurboChatRowMe.dispose();
		TurboChatRowPartner.dispose();

        if(lastMessageFrom==""){
            currentConversation.dispose();
            currentConversation = null;
        }else{
            currentConversation.removeClass("current_conversation");
            currentConversation.inject($('old_conversations'));
            currentConversation = null;
            new Element('div',{'class':'hr'}).inject($('old_conversations'));
        }
        
    }

    redrawMessageContainer();
    
}
   
function redrawMessageContainer()
{

    var container_height = $("chat_message_container").offsetHeight;

    var height_of_all_messages = $('current_conversation_container').offsetHeight
    	+ $('old_conversations').offsetHeight;

    if(container_height > height_of_all_messages){
    	
        $('conversation_spacer').setStyle('height',container_height - height_of_all_messages);
        
    }else{
    	
        $('conversation_spacer').setStyle('height',null);
        
    }

    $("chat_message_container").scrollTop = $("chat_message_container").scrollHeight;
    
}


function appendConversation(){

    lastMessageFrom="";
    
	currentConversation = new Element('div',{
		'class': 'conversation current_conversation'
    }).inject($("current_conversation_container"));
    
}

function appendMessage(from,text){

	TurboChatRowMe.inject(currentConversation);
	TurboChatRowPartner.inject(currentConversation);

    if(lastMessageFrom!=from)
    {
    	var from_column = new Element('div',{
    		'class': 'from_column '+from,
    		'html': (from==STRANGER)?"Partner:":"Me:"
    	}).inject(currentConversation);
    }
    
    var currentMessage = new Element('div',{
		'class': 'text_column'    		
    }).inject(currentConversation);
    
    var currentMessageText = new Element('div',{
    	'html':getChatText(text)
    }).inject(currentMessage);
    
    lastMessageFrom=from;

    redrawMessageContainer();

}

function updateTextInput()
{
   if(callingState!=callingStateCONNECTED)
       return true;

        if(myInput.value=="" && partnerTexInput=="")
	partnerTypedLast=-1;
        else if(myInput.value=="")
	partnerTypedLast=0;
        else if(partnerTexInput=="")
	partnerTypedLast=1;
        else if(partnerTypedLast==-1)
	partnerTypedLast=1;


        setTimeout(updateTurboChat,0);
        if(turboChatEnabled){
            if( myInput.value != lastChatText ){
            	sendToPartner("TURBO_CHAT_MESSAGE", myInput.value,false);
            	lastChatText = myInput.value;
            }
        }

}


//ALLE! suboptimal
//http://regexlib.com/Search.aspx?k=URL&c=0&m=0&ps=20&p=2
//http://flanders.co.nz/2009/11/08/a-good-url-regular-expression-repost/
//https://wave.google.com/wave/?pli=1#restored:wave:googlewave.com!w%252BsFbGJUukA


//TODO: this only allows query string of the form ?variable=value&... and not just ?variable1&variable2...
var URLregex = /((http|ftp|https|ftps):\/\/)?[\w\-_\.]+\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|arpa|asia|coop|info|jobs|mobi|museum|name|travel))+(:[0-9]+)?\/?(([\w\-\.,@^%:/~\+#]*[\w\-\@^%/~\+#])((\?[a-zA-Z0-9\[\]\-\._+%\$#\=~',]*=[a-zA-Z0-9\[\]\-\._+%\$#\=~',]*)+(&[a-zA-Z0-9\[\]\-\._+%\$#\=~',]*=[a-zA-Z0-9\[\]\-\._+%\$#\=~',]*)*)?)?/g;

		
function getChatText(text){
	
	text = text.split(">").join("&gt;");
	text = text.split("<").join("&lt;");
	
	text=text.replace(URLregex,URLtoLink);
	
	text.split("&").join("&amp;");
	
	text = text.replace(/\n/g,"<br>");
	
	//###### Auto link URLs ########

	
	
	//##### Führt zu schlechtem wordwrap
	//text = text.replace(/ /g,"&nbsp;");
    	return text;
}

function URLtoLink(url,host)
{
	var link=url;
	if(url.indexOf("://") == -1)
		link = "http://"+url;
	
	return "<a target='_blank' href='"+link+"'>"+url+"</a>";
}
var i=0;

function updateTurboChat()
{
	
    if(myInput.value!="" && turboChatEnabled)
    {
    	TurboChatTextMe.innerHTML =getChatText(myInput.value);
    	TurboChatRowMe.style.display = "block";
    }
    else
    	TurboChatRowMe.style.display = "none";

    if(partnerTexInput!="")
    {
    	TurboChatTextPartner.innerHTML = partnerTexInput;
    	TurboChatRowPartner.style.display = "block";
    }
    else
    	TurboChatRowPartner.style.display = "none";
    
    TurboChatRowMe.inject(currentConversation);

    if(partnerTypedLast==1)
    	TurboChatRowPartner.inject(TurboChatRowMe,'after');
    else
    	TurboChatRowPartner.inject(TurboChatRowMe,'before');

    redrawMessageContainer();
    
}


function turboPartnerInput(msg)
{
		typingStateTimer = $clear(typingStateTimer);
		
        partnerTexInput=getChatText(msg);

        // SIEHE GEGENSTï¿½CK IN updateTextInput
        if(myInput.value=="" && partnerTexInput=="")
                partnerTypedLast=-1;
        else if(myInput.value=="")
                partnerTypedLast=0;
        else if(partnerTexInput=="")
                partnerTypedLast=1;
        else if(partnerTypedLast==-1)
                partnerTypedLast=0;

         updateTurboChat();
}


// http://msdn.microsoft.com/en-us/library/ms533927%28VS.85%29.aspx
function ChatKeyDownHandler(event)
{

    var e;
    if(event && event.keyCode)
        e=event;
    else
        e=window.event;
   
   switch(e.keyCode)
    {
            case 46:// DELETE:
            case 8: // BACKSPACE:
                    userTypingState = 2;
                    break;

            case 13: // ENTER:
                    if(!e.shiftKey)
                    {
                        onSendChatMessage();
                        return false;
                    }

                    break;

            default:
                    userTypingState = 1;
    }

    setTimeout(updateTextInput,10);

    if(callingState==callingStateCONNECTED &&  userTypingState!=0 && !turboChatEnabled)
            sendToPartner("SEND_TYPING_STATE",userTypingState,false);

    return true;

}

function onSendChatMessage()
{
		
        // SIEHE GEGENSTï¿½CK IN onReceiveChatMessage
        if(partnerTexInput=="")
                partnerTypedLast=-1;
        else
                partnerTypedLast=0;
        if(callingState==callingStateCONNECTED)
        {
            var msg = myInput.value;
            if (msg!="")
            {
                TurboChatRowMe.style.display = "none";
                appendMessage(MYSELF,myInput.value);
                
        		sendToPartner("SEND_CHAT_MESSAGE", myInput.value,true);
        		
        		myInput.value = "";
        		
            }
        }
        updateTextInput();
}

function onReceiveChatMessage(msg)
{	
        // SIEHE GEGENSTï¿½CK IN onSendChatMessage
        if(myInput.value=="")
                partnerTypedLast=-1;
        else
                partnerTypedLast=1;

        appendMessage(STRANGER,msg);
        partnerTexInput="";
        updateTurboChat();
}

function ChatKeyUpHandler(event)
{
    var e;
    if(event && event.keyCode)
        e=event;
    else
        e=window.event;

   switch(e.keyCode)
    {
            case 16:// SHIFT:
                    shiftEnterWasHit=false;

            default:
                    userTypingState = 0;
    }


        setTimeout(updateTextInput,10);
}


function setPartnerTypingState(pTS)
{
    switch(pTS)
    {
        case 1:
            turboPartnerInput("(is typing)");
            break;
        case 2:
            turboPartnerInput("(is erasing)");
            break;
        default:
            if(partnerTypingState!=0){
                turboPartnerInput("");
            }
    }

    partnerTypingState = pTS;
    
    if($chk(typingStateTimer)){
    	typingStateTimer = $clear(typingStateTimer);
    }
    // clear the "partner is typing"
    typingStateTimer = setPartnerTypingState.delay(700);
    
}


 function htmlentities (string) {// http://phpjs.org/functions/get_html_translation_table

    var entities={};
    entities["&"] = "&amp;";
    entities["<"] = "&lt;";
    entities[">"] = "&gt;";
    tmp_str = string.toString();

    for (symbol in entities) {
        
        tmp_str = tmp_str.split(symbol).join(entities[symbol]);
    }
    return tmp_str;
}

function htmlentities2 (string ) {
    // http://kevin.vanzonneveld.net
    // + original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // + revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // + improved by: nobbler
    // + tweaked by: Jack
    // + bugfixed by: Onno Marsman
    // + revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // + bugfixed by: Brett Zamir (http://brett-zamir.me)
    // + input by: Ratheous
    // - depends on: get_html_translation_table
    // * example 1: htmlentities('Kevin & van Zonneveld');
    // * returns 1: 'Kevin &amp; van Zonneveld'
    // * example 2: htmlentities("foo'bar","ENT_QUOTES");
    // * returns 2: 'foo&#039;bar'

quote_style = "ENT_QUOTES";

    var hash_map = {}, symbol = '', tmp_str = '', entity = '';
    tmp_str = string.toString();

    if (false === (hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style))) {
        return false;
    }
    hash_map["'"] = '&#039;';
    for (symbol in hash_map) {
        entity = hash_map[symbol];
        tmp_str = tmp_str.split(symbol).join(entity);
    }

    return tmp_str;
}

function focusAndScrolldown()
{
   
    if(!chatInitializied)
        return;
    
    var i=myInput.value.length;

     if ( myInput.createTextRange ) {

        /*
		 * IE calculates the end of selection range based from the starting
		 * point. Other browsers will calculate end of selection from the
		 * beginning of given text node.
		 */

        var selRange = myInput.createTextRange();
        selRange.collapse(true);
        selRange.moveStart("character", i);
        selRange.moveEnd("character", 0);
        selRange.select();
    }

    /* For the other browsers */

    else if( myInput.setSelectionRange ){

    	myInput.setSelectionRange(i, i);
    }

try {
	//myInput.focus();
  } catch (e) {
  }
}

function get_html_translation_table (table, quote_style) {
    // http://kevin.vanzonneveld.net
    // + original by: Philip Peterson
    // + revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // + bugfixed by: noname
    // + bugfixed by: Alex
    // + bugfixed by: Marco
    // + bugfixed by: madipta
    // + improved by: KELAN
    // + improved by: Brett Zamir (http://brett-zamir.me)
    // + bugfixed by: Brett Zamir (http://brett-zamir.me)
    // + input by: Frank Forte
    // + bugfixed by: T.Wild
    // + input by: Ratheous
    // % note: It has been decided that we're not going to add global
    // % note: dependencies to php.js, meaning the constants are not
    // % note: real constants, but strings instead. Integers are also supported
	// if someone
    // % note: chooses to create the constants themselves.
    // * example 1: get_html_translation_table('HTML_SPECIALCHARS');
    // * returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}

    var entities = {}, hash_map = {}, decimal = 0, symbol = '';
    var constMappingTable = {}, constMappingQuoteStyle = {};
    var useTable = {}, useQuoteStyle = {};

    // Translate arguments
    constMappingTable[0]      = 'HTML_SPECIALCHARS';
    constMappingTable[1]      = 'HTML_ENTITIES';
    constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
    constMappingQuoteStyle[2] = 'ENT_COMPAT';
    constMappingQuoteStyle[3] = 'ENT_QUOTES';

    useTable       = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
    useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';

    if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
        throw new Error("Table: "+useTable+' not supported');
        // return false;
    }

    entities['38'] = '&amp;';
    if (useTable === 'HTML_ENTITIES') {
        entities['160'] = '&nbsp;';
        entities['161'] = '&iexcl;';
        entities['162'] = '&cent;';
        entities['163'] = '&pound;';
        entities['164'] = '&curren;';
        entities['165'] = '&yen;';
        entities['166'] = '&brvbar;';
        entities['167'] = '&sect;';
        entities['168'] = '&uml;';
        entities['169'] = '&copy;';
        entities['170'] = '&ordf;';
        entities['171'] = '&laquo;';
        entities['172'] = '&not;';
        entities['173'] = '&shy;';
        entities['174'] = '&reg;';
        entities['175'] = '&macr;';
        entities['176'] = '&deg;';
        entities['177'] = '&plusmn;';
        entities['178'] = '&sup2;';
        entities['179'] = '&sup3;';
        entities['180'] = '&acute;';
        entities['181'] = '&micro;';
        entities['182'] = '&para;';
        entities['183'] = '&middot;';
        entities['184'] = '&cedil;';
        entities['185'] = '&sup1;';
        entities['186'] = '&ordm;';
        entities['187'] = '&raquo;';
        entities['188'] = '&frac14;';
        entities['189'] = '&frac12;';
        entities['190'] = '&frac34;';
        entities['191'] = '&iquest;';
        entities['192'] = '&Agrave;';
        entities['193'] = '&Aacute;';
        entities['194'] = '&Acirc;';
        entities['195'] = '&Atilde;';
        entities['196'] = '&Auml;';
        entities['197'] = '&Aring;';
        entities['198'] = '&AElig;';
        entities['199'] = '&Ccedil;';
        entities['200'] = '&Egrave;';
        entities['201'] = '&Eacute;';
        entities['202'] = '&Ecirc;';
        entities['203'] = '&Euml;';
        entities['204'] = '&Igrave;';
        entities['205'] = '&Iacute;';
        entities['206'] = '&Icirc;';
        entities['207'] = '&Iuml;';
        entities['208'] = '&ETH;';
        entities['209'] = '&Ntilde;';
        entities['210'] = '&Ograve;';
        entities['211'] = '&Oacute;';
        entities['212'] = '&Ocirc;';
        entities['213'] = '&Otilde;';
        entities['214'] = '&Ouml;';
        entities['215'] = '&times;';
        entities['216'] = '&Oslash;';
        entities['217'] = '&Ugrave;';
        entities['218'] = '&Uacute;';
        entities['219'] = '&Ucirc;';
        entities['220'] = '&Uuml;';
        entities['221'] = '&Yacute;';
        entities['222'] = '&THORN;';
        entities['223'] = '&szlig;';
        entities['224'] = '&agrave;';
        entities['225'] = '&aacute;';
        entities['226'] = '&acirc;';
        entities['227'] = '&atilde;';
        entities['228'] = '&auml;';
        entities['229'] = '&aring;';
        entities['230'] = '&aelig;';
        entities['231'] = '&ccedil;';
        entities['232'] = '&egrave;';
        entities['233'] = '&eacute;';
        entities['234'] = '&ecirc;';
        entities['235'] = '&euml;';
        entities['236'] = '&igrave;';
        entities['237'] = '&iacute;';
        entities['238'] = '&icirc;';
        entities['239'] = '&iuml;';
        entities['240'] = '&eth;';
        entities['241'] = '&ntilde;';
        entities['242'] = '&ograve;';
        entities['243'] = '&oacute;';
        entities['244'] = '&ocirc;';
        entities['245'] = '&otilde;';
        entities['246'] = '&ouml;';
        entities['247'] = '&divide;';
        entities['248'] = '&oslash;';
        entities['249'] = '&ugrave;';
        entities['250'] = '&uacute;';
        entities['251'] = '&ucirc;';
        entities['252'] = '&uuml;';
        entities['253'] = '&yacute;';
        entities['254'] = '&thorn;';
        entities['255'] = '&yuml;';
    }

    if (useQuoteStyle !== 'ENT_NOQUOTES') {
        entities['34'] = '&quot;';
    }
    if (useQuoteStyle === 'ENT_QUOTES') {
        entities['39'] = '&#39;';
    }
    entities['60'] = '&lt;';
    entities['62'] = '&gt;';


    // ascii decimals to real symbols
    for (decimal in entities) {
        symbol = String.fromCharCode(decimal);
        hash_map[symbol] = entities[decimal];
    }

    return hash_map;
}
