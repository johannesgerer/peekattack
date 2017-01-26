var UI = new Waitable({

	// ########### Spacing & Margins ############### //
	full_width: 748,
	user_column_width: 250,
	partner_min_width: 142,
	user_min_width: 143,
	chat_input_height: 47,
	separator_width: 7,
							// get it dynamically
	swfAspectRatio: 4 / 3,

	display_height: 540,
	min_display_height: 400,
	max_display_height: 540,
	user_column_height: 520,
	user_column_height_offset: 105,
	question_height: 20,
	
	toolTips:null,
	toolTipsDelayed:null,

	
	// ########## Current State Variables ############## //
	state:{
		'information_scroll_position'	: 0,	// Hier wird die Scroll Position des
												// Information Containers hinterlegt

		'swapped'		: false,	// false means: user column right, partner left
		'single_view'	: false,	// true means: both videos are being displayed in
									// one swf in the user column
		'userWidth'		:  250		// left Column width while mouse down and
											//moving
	},
	
	
	
	// ########## Navigational Variables ############## //	
	current_info_element: null,	// element that is currently displayed in the
								// information container
	currentPage: null,
	
	olduserWidth: 0,
	maximizeInfo: function(width){
		
		if(!$chk(width))
			width = UI.full_width - UI.user_min_width;

		if(width!=UI.full_width-UI.state.userWidth)
			UI.olduserWidth = UI.state.userWidth;
		
		UI.setUserColumnWidth(UI.full_width - width);
		
	},
	restoreInfo: function(){
		if(UI.olduserWidth==0)
			return;
		
		UI.setUserColumnWidth(UI.olduserWidth);
		UI.olduserWidth = 0;
	},
	
	// ########## Temporary State Variables ############## //
	mouseIsDown: false,
		
	clickMouseX: null, // mouse Position at the time of mousedown
	clickWidth: null, // left Column width at the time of mousedown
	
	swapping: false,

	initialized: false,
	
	pressedKey: null,
	
	tooltipTimer: null,
	
	setSizeForFlashSecurityPanel : function()
	{
		UI.navigateTo('chat');		
		UI.setUserColumnWidth(250);		
	},
//#########################   start()    ###############	
	start: function()
	{
		//Get Cookie
		if($chk(Cookie.read('UIstate'))) 
			UI.state=JSON.parse(Cookie.read('UIstate'));
		
		UI.setUIstate();
		
		UI.initialized = true;

		$("chat_container").style.display = "block";
		$("information_container").style.display = "block";
		$("separator").style.display = "block";
		$("app_loading_bar").style.display = "none";
		$clear(loadingRetryTimer);
		$("app_retry_notice").style.display = "none";
		$("profile_top_bar").style.display = "block";
		
		
		UI.orderColumns();
		UI.setUserColumnWidth();
		
		SWF.showCameraSecurity();
		
		
		$("content").style.height = UI.display_height + "px";
	
		UI.current_info_element = $('profile_information');
		UI.currentPage = "chat";
		UI.navigateTo(UI.currentPage);// Startpage
	
		$("separator").addEvent("mousedown", UI.mouseDownHandler);
		$("separator").addEvent("mouseover", UI.separator_over);
		$("separator").addEvent("mouseout", UI.separator_out);
	
		//Country Flags
		//http://code.google.com/p/csscountrycodes/
		DropDownBoxes['Country'].list.setStyles({'width':'200px'});
		DropDownBoxes['Country'].input.setStyles({'width':'200px'});
		var CountryDivs=DropDownBoxes['Country'].entryDivs;
		for(var i=0;i<CountryDivs.length;i++) 
			flagIcon(Filters['Country'][1][i][0]).inject(CountryDivs[i],'top');	
		
		initialize_chat();
			
		//Fill CountriesNames and LanguageNames
		for ( var key in Names)
			for(var i=0;i<Filters[key][1].length;i++)
				Names[key][Filters[key][1][i][0]]=Filters[key][1][i][1];
		
		
		Ads.create('ad180x150').inject('usercol_ads_container');
		
		
		// ############# ToolTips 
		UI.toolTips = new Tips();
		UI.toolTips.options.showDelay = 0;
		UI.toolTips.options.hideDelay = 0;
		UI.toolTips.attach($$('.tooltip'));
		
		UI.toolTipsDelayed = new Tips();
		UI.toolTipsDelayed.options.showDelay = 0;
		UI.toolTipsDelayed.options.hideDelay = 0;
		
		UI.toolTipsDelayed.addEvent('show', function(tip, hovered){
			tip.setStyle('display', 'none');
			UI.tooltipTimer = (function(){ tip.setStyle('display', 'block'); }).delay(600);
		}); 
		
		UI.toolTipsDelayed.addEvent('hide', function(tip, el){
			$clear(UI.tooltipTimer);
		}); 
		
		UI.toolTipsDelayed.attach($$('.delayedtip'));
		
		// ############# Keyboard shortcuts
		document.addEvent('keydown',UI.keyDownHandler);
		document.addEvent('keyup',UI.keyUpHandler);
		
		initDocumentation();
		
		App.stopAppDoesntStartTimer();
		
	},
	
	keyDownHandler: function(event){
		
		if(UI.pressedKey == event.code) // prevent repeating
			return;
		
		UI.pressedKey = event.code;
		
		//siehe code.js ########  Key names ###########
		
		switch(event.key)
		{
		case "f8":
			onSnapshotClick();
			break;
		case "f2":
			stop();
			break;
		case "f9":
			next();
			break;
		}
	},
	
	keyUpHandler: function(event){
		
		if(UI.pressedKey == event.code) // prevent repeating
			UI.pressedKey = null;
	},

	// ################# Navigation #########################
	navigateTo: function(page) {
		UI.restoreInfo();

		if (page != UI.currentPage) {

			$("hidden_information_container").appendChild(UI.current_info_element);
			$(UI.currentPage + "_li").className = "";
			$(page + "_li").className = "selected";
		}

		switch (page) {
		case "history":
			UI.switchToSingleView();
			UI.current_info_element = $('history_container');
			initHistory();//TODO internet explorer problem
			break;
		case "chat":
			UI.switchToDoubleView();
			UI.current_info_element = $('chat_page_container');
			$("information_container").appendChild(UI.current_info_element);
			
			if(adsIFrame)
					adsIFrame.dispose();
				adsIFrame = Ads.create('pa366x280').inject('chat_ads_container');
			
			break;
		case "settings":
			UI.switchToSingleView();
			UI.current_info_element = $('settings_container');
			break;

		/* does not exist
		 case "invite":
			UI.switchToSingleView();
			UI.maximizeInfo(476);
			UI.current_info_element = $('invite_container');
			break;*/

		}
		
		if(page != "chat")
			$("information_container").grab(UI.current_info_element);
		
		UI.currentPage = page;
		if (page == "invite") {
			//FB.XFBML.Host.parseDomElement($("invite_container"));
		}
		focusAndScrolldown();
		return false;
	},
	
	// ######################################################
	// ################ Event Handling ######################
	// ######################################################
	
	windowSizeChangeHandler: function (a) {
		// var temp=a.scrollPos.y+a.window.h - UI.user_column_height_offset;
		var temp = a.window.h - UI.user_column_height_offset;

		if (temp < UI.display_height) {
			if (UI.user_column_height != temp) {
				UI.user_column_height = temp;
				UI.redraw_chat_container();
			}
		} else if (UI.user_column_height != UI.display_height) {
			UI.user_column_height = UI.display_height;
			UI.redraw_chat_container();
		}
	},
	
	mouseDownHandler: function(e) {
		if (UI.swapping)
			return true;

		UI.mouseIsDown = true;
		UI.clickMouseX = e.client.x;

		UI.clickWidth = UI.user_column_width;

		$("content").addEvent("mousemove", UI.mouseMoveHandler);
		$("content").addEvent("mouseup", UI.mouseUpHandler);

		UI.setUserColumnWidth();

		$("content").style.cursor = "e-resize";

		document.onmousedown = function() {
			return false;
		};
		document.onselectstart = function() {
			return false;
		};
		UI.separator_over();
		return false;
	},
	
	mouseUpHandler: function(e) {
		
		UI.mouseIsDown = false;
		$("content").removeEvent("mousemove", UI.mouseMoveHandler);
		document.onmousedown = "";
		document.onselectstart = "";
		$("content").style.cursor = "auto";
		UI.separator_out();
		
		UI.setUIstate();
	
	},
	setUIstate : function()
	{
		SWF.waitOn('partner_load',function(){
			$('partner_swf').setUIstate(UI.state);
		});		
		setNeverExpiringCookie('UIstate',JSON.stringify(UI.state));
	},
	mouseMoveHandler: function(e) {
		var i;
		i = e.client.x;

		if (UI.state.swapped != UI.state.single_view)
			UI.state.userWidth = i - UI.clickMouseX + UI.clickWidth;
		else
			UI.state.userWidth = -i + UI.clickMouseX + UI.clickWidth;

	},
	
	separator_over: function(e) {
		$("separator_line").className = "separator_line separator_line_hover";
		$("swap_symbol").style.display = "block";
	},
	separator_out: function() {
		if (!UI.mouseIsDown) {
			$("separator_line").className = "separator_line";
			$("swap_symbol").style.display = "none";
		}
	},
	
	// ######################################################
	// ################ Column Sizing/Swapping ##############
	// ######################################################
	
	setUserColumnWidth: function(optionalWidth) {

		if(optionalWidth)
			UI.state.userWidth = optionalWidth;
		
		if (UI.state.userWidth < UI.user_min_width)
			UI.state.userWidth = UI.user_min_width;
		else if (UI.state.userWidth > UI.full_width - UI.partner_min_width)
			UI.state.userWidth = Math.ceil(UI.full_width - UI.partner_min_width);

		UI.user_column_width = UI.state.userWidth;

		UI.redraw();

		if (UI.mouseIsDown)
			setTimeout(function() {
				UI.setUserColumnWidth();
			}, 50);
	},

	redraw_chat_container: function() {
		if (!UI.initialized)
			return;

		var temp1 = $('chat_input_container').getSize().y;
		$$('.question_box').each(function(e){temp1 += e.getSize().y;});
		
		var temp2;
		if(UI.state.single_view)
			temp2 = $('user_column').getSize().y - $('partner_container').getSize().y;
		else
			temp2 = $('user_column').getSize().y - $('user_container').getSize().y;

		if (temp2 - temp1 > 0) {
			$("chat_container").style.height = temp2 + 'px';
			$("chat_message_container").style.height = (temp2 - temp1) + 'px';
		} else {
			$("chat_container").style.height = temp1 + 'px';
			$("chat_message_container").style.height = '0px';
		}
		
		redrawMessageContainer();
		
	},
	
	redraw: function() {
		if (!UI.initialized)
			return;

		var user_swf_height, partner_swf_width, partner_swf_height;
		partner_swf_width = UI.full_width - UI.separator_width - UI.user_column_width;

		user_swf_height = Math.round(UI.user_column_width / UI.swfAspectRatio);
		partner_swf_height = Math.round(partner_swf_width / UI.swfAspectRatio);

		if (UI.state.single_view) {
			$("information_container").style.height = (UI.display_height) + 'px';
			$("user_swf").style.width = 0;
			$("user_swf").style.height = 0;
			$('partner_swf').style.width = UI.user_column_width + 'px';
			$('partner_swf').style.height = user_swf_height + 'px';
			$("partner_column").style.width = UI.user_column_width + 'px';
			$("user_column").style.width = partner_swf_width + 'px';
		} else {
			$("information_container").style.height = (UI.display_height - partner_swf_height) + 'px';
			$("user_swf").style.width = UI.user_column_width + 'px';
			$("user_swf").style.height = user_swf_height + 'px';
			$('partner_swf').style.width = partner_swf_width + 'px';
			$('partner_swf').style.height = partner_swf_height + 'px';
			$("user_column").style.width = UI.user_column_width + 'px';
			$("partner_column").style.width = partner_swf_width + 'px';
		}

		UI.redraw_chat_container();

		redrawMessageContainer();
		focusAndScrolldown();

	},

	
	swapColumns: function() { 

		UI.state.swapped = !UI.state.swapped;

		UI.orderColumns();
		
		UI.swapping = false;
		
		UI.setUIstate();
	},
	orderColumns: function(){
		if (UI.state.swapped) {
			$("user_column").className = "user_column_swapped";
			$("partner_column").className = "partner_column_swapped";
			$("separator").className = "separator_swapped";
		} else {
			$("user_column").className = "user_column";
			$("partner_column").className = "partner_column";
			$("separator").className = "separator";
		}
		focusAndScrolldown();
	},
	switchToSingleView: function() {
		if (!UI.state.single_view) {
			$("user_swf").style.visible = "hidden";
			UI.state.single_view = true;

			UI.swapColumns();
			
			$("partner_column").appendChild($("chat_container"));
			$("user_column").appendChild($("information_container"));
			UI.redraw();
		}
	},
	switchToDoubleView: function() {
		if (UI.state.single_view) {

			UI.state.single_view = false;
			
			$("user_column").appendChild($("chat_container"));
			$("partner_column").appendChild($("information_container"));
			UI.redraw();
			UI.swapColumns();

			$("user_swf").style.visible = "visible";
			
		}
	},
	
	showQuestion: function(question,highlight){
		
		$('question_box_'+question).style.display = 'block';
		UI.redraw_chat_container();
		if(highlight){
			var blink = function(i)
			{
				if(!$chk(i))
					i=5;
				
				$('question_box_'+question).toggleClass('highlight');

				if(i == 0)
					return;
				
				blink.delay(150,null,i-1);
			};
			
			blink.delay(150,null,5);
		}
		
	},
	
	hideQuestion: function(question){
		
		$('question_box_'+question).style.display = 'none';
		UI.redraw_chat_container();
		
	}
	
});

function documentationSection(n)
{
	var t=$(n).get('text');
	
	$(n).set('text',"");
	
	$(n+"_cont").setStyles({
		"height":"0px", "overflow":"hidden"
	});
	
	var a = new Element('a',{
		'href' : '#',
		'text':t
	}).inject(n);
	var t = new Fx.Tween($(n+"_cont"));
	t.addEvent('complete',function(){
		if($(n+"_cont").style.height!='0px')
			$(n+"_cont").setStyle('height',null);
	});

	a.addEvent('click',function(){
		if($(n+"_cont").style.height=='0px') 
			t.start('height',$(n+"_cont").scrollHeight); 
		else 
			t.start('height',0); 
		return false;
	});
}

function initDocumentation()
{
	if(App.onFacebook)
		$('external_page_link').setStyle("display", "block");
	
	
	var sections=['doc_p2p','doc_credits',
	              'doc_snapshots','doc_privacy',
	              'doc_lang','doc_gender',
	              'doc_swapcolumns','doc_videoaudio',
	              'doc_cam'
	              ];
	
	for(var i=0;i<sections.length;i++)
		documentationSection(sections[i]);
	
	$('user_gender').set('text',Sets.Properties.Gender == 1 ? 'male' :(Sets.Properties.Gender == -1 ? 'female' : 'unkown'));
	$('user_languages').set('text',getLanguageString(Sets.Properties));
}