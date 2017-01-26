
// ################ Filters #######################
var FilterCounts;

// Standard Filter und Properties
var Sets = {
	'Properties' : {
		'Gender' 	: 0,
		'Camera' 	: 0,
		'UDP' 		: 0,
		'Language1' : '0',
		'Language2' : '0',	
		'Language3' : '0',
		'Language4' : '0',
		'Country'	: (google.loader.ClientLocation)?google.loader.ClientLocation.address.country_code.toLowerCase():'0'
	},
	'Filters' : {
		'Facebook' : 0,
		'Camera' : 0,
		'Language' : '0',
		'Country' : '0',
		'Sexual' : 0,
		'Gender' : 0
	}
};


//#############    APE Synchron with  "Filters.js"    ##################
//Achtung Änderungen müssen auch im APe gemacht werden!!!!!

var Filters = {
	'Camera' : [ 'Webcam',
			[ [ 0, '(not filtered)' ], [ 1, 'with Webcam' ], [ -1 , 'without Webcam' ] ] ],
	'Facebook' : [ 'Facebook',
			[ [ 0, '(not filtered)' ], [ 1, 'Facebook User' ] ] ],
	'Gender' : [ 'Gender',
			[ [ 0, '(not filtered)' ], [ -1, 'Female' ], [ 1, 'Male' ] ] ],
	'Sexual' : [ 'Nudity',
			[ [ 0, '(not filtered)' ], [ -1, 'Clothed' ], [ 1, 'Naked' ] ] ],
	'Language' : [
			'Language',
			[ [ '0', '(not filtered)' ], 
			  	['ab',"Abkhazian"],['aa',"Afar"],['af',"Afrikaans"],['ak',"Akan"],['sq',"Albanian"],['am',"Amharic"],['ar',"Arabic"],['an',"Aragonese"],['hy',"Armenian"],['as',"Assamese"],['av',"Avaric"],['ay',"Aymara"],['az',"Azerbaijani"],['bm',"Bambara"],['ba',"Bashkir"],['eu',"Basque"],['be',"Belarusian"],['bn',"Bengali"],['bi',"Bislama"],['bs',"Bosnian"],['br',"Breton"],['bg',"Bulgarian"],['my',"Burmese"],['ca',"Catalan"],['km',"Central Khmer"],['ch',"Chamorro"],['ce',"Chechen"],['zh',"Chinese"],['cv',"Chuvash"],['kw',"Cornish"],['co',"Corsican"],['cr',"Cree"],['hr',"Croatian"],['cs',"Czech"],['da',"Danish"],['dv',"Dhivehi"],['nl',"Dutch"],['dz',"Dzongkha"],['en',"English"],['et',"Estonian"],['ee',"Ewe"],['fo',"Faroese"],['fj',"Fijian"],['fi',"Finnish"],['fr',"French"],['ff',"Fulah"],['gl',"Galician"],['lg',"Ganda"],['ka',"Georgian"],['de',"German"],['el',"Greek"],['gn',"Guarani"],['gu',"Gujarati"],['ht',"Haitian"],['ha',"Hausa"],['he',"Hebrew"],['hz',"Herero"],['hi',"Hindi"],['ho',"Hiri Motu"],['hu',"Hungarian"],['is',"Icelandic"],['ig',"Igbo"],['id',"Indonesian"],['iu',"Inuktitut"],['ik',"Inupiaq"],['ga',"Irish"],['it',"Italian"],['ja',"Japanese"],['jv',"Javanese"],['kl',"Kalaallisut"],['kn',"Kannada"],['kr',"Kanuri"],['ks',"Kashmiri"],['kk',"Kazakh"],['ki',"Kikuyu"],['rw',"Kinyarwanda"],['ky',"Kirghiz"],['kv',"Komi"],['kg',"Kongo"],['ko',"Korean"],['kj',"Kuanyama"],['ku',"Kurdish"],['lo',"Lao"],['lv',"Latvian"],['li',"Limburgan"],['ln',"Lingala"],['lt',"Lithuanian"],['lu',"Luba-Katanga"],['lb',"Luxembourgish"],['mk',"Macedonian"],['mg',"Malagasy"],['ms',"Malay"],['ml',"Malayalam"],['mt',"Maltese"],['gv',"Manx"],['mi',"Maori"],['mr',"Marathi"],['mh',"Marshallese"],['mn',"Mongolian"],['na',"Nauru"],['nv',"Navajo"],['ng',"Ndonga"],['ne',"Nepali"],['nd',"North Ndebele"],['se',"Northern Sami"],['no',"Norwegian"],['nb',"Norwegian Bokmal"],['nn',"Norwegian Nynorsk"],['ny',"Nyanja"],['oc',"Occitan"],['oj',"Ojibwa"],['or',"Oriya"],['om',"Oromo"],['os',"Ossetian"],['pa',"Panjabi"],['fa',"Persian"],['pl',"Polish"],['pt',"Portuguese"],['ps',"Pushto"],['qu',"Quechua"],['ro',"Romanian"],['rm',"Romansh"],['rn',"Rundi"],['ru',"Russian"],['sm',"Samoan"],['sg',"Sango"],['sc',"Sardinian"],['gd',"Scottish Gaelic"],['sr',"Serbian"],['sh',"Serbo-Croatian"],['sn',"Shona"],['ii',"Sichuan Yi"],['sd',"Sindhi"],['si',"Sinhala"],['sk',"Slovak"],['sl',"Slovenian"],['so',"Somali"],['nr',"South Ndebele"],['st',"Southern Sotho"],['es',"Spanish"],['su',"Sundanese"],['sw',"Swahili"],['ss',"Swati"],['sv',"Swedish"],['tl',"Tagalog"],['ty',"Tahitian"],['tg',"Tajik"],['ta',"Tamil"],['tt',"Tatar"],['te',"Telugu"],['th',"Thai"],['bo',"Tibetan"],['ti',"Tigrinya"],['to',"Tonga"],['ts',"Tsonga"],['tn',"Tswana"],['tr',"Turkish"],['tk',"Turkmen"],['tw',"Twi"],['ug',"Uighur"],['uk',"Ukrainian"],['ur',"Urdu"],['uz',"Uzbek"],['ve',"Venda"],['vi',"Vietnamese"],['wa',"Walloon"],['cy',"Welsh"],['fy',"Western Frisian"],['wo',"Wolof"],['xh',"Xhosa"],['yi',"Yiddish"],['yo',"Yoruba"],['za',"Zhuang"],['zu',"Zulu"]//generated 2010-05-30 13:33:15
             ] ],
	'Country' : [
			'Country',
			[ [ '0', '(not filtered)' ], 
			  ['af',"Afghanistan"],['ax',"Aland Islands"],['al',"Albania"],['dz',"Algeria"],['as',"American Samoa"],['ad',"Andorra"],['ao',"Angola"],['ai',"Anguilla"],['a1',"Anonymous Proxy"],['aq',"Antarctica"],['ag',"Antigua and Barbuda"],['ar',"Argentina"],['am',"Armenia"],['aw',"Aruba"],['ap',"Asia/Pacific Region"],['au',"Australia"],['at',"Austria"],['az',"Azerbaijan"],['bs',"Bahamas"],['bh',"Bahrain"],['bd',"Bangladesh"],['bb',"Barbados"],['by',"Belarus"],['be',"Belgium"],['bz',"Belize"],['bj',"Benin"],['bm',"Bermuda"],['bt',"Bhutan"],['bo',"Bolivia"],['ba',"Bosnia and Herzegovina"],['bw',"Botswana"],['bv',"Bouvet Island"],['br',"Brazil"],['io',"British Indian Ocean Terr."],['bn',"Brunei Darussalam"],['bg',"Bulgaria"],['bf',"Burkina Faso"],['bi',"Burundi"],['kh',"Cambodia"],['cm',"Cameroon"],['ca',"Canada"],['cv',"Cape Verde"],['ky',"Cayman Islands"],['cf',"Central African Republic"],['td',"Chad"],['cl',"Chile"],['cn',"China"],['co',"Colombia"],['km',"Comoros"],['cg',"Congo"],['cd',"Congo, Dem. Rep."],['ck',"Cook Islands"],['cr',"Costa Rica"],['ci',"Cote D'Ivoire"],['hr',"Croatia"],['cu',"Cuba"],['cy',"Cyprus"],['cz',"Czech Republic"],['dk',"Denmark"],['dj',"Djibouti"],['dm',"Dominica"],['do',"Dominican Republic"],['ec',"Ecuador"],['eg',"Egypt"],['sv',"El Salvador"],['gq',"Equatorial Guinea"],['er',"Eritrea"],['ee',"Estonia"],['et',"Ethiopia"],['eu',"Europe"],['fk',"Falkland Islands"],['fo',"Faroe Islands"],['fj',"Fiji"],['fi',"Finland"],['fr',"France"],['gf',"French Guiana"],['pf',"French Polynesia"],['ga',"Gabon"],['gm',"Gambia"],['ge',"Georgia"],['de',"Germany"],['gh',"Ghana"],['gi',"Gibraltar"],['gr',"Greece"],['gl',"Greenland"],['gd',"Grenada"],['gp',"Guadeloupe"],['gu',"Guam"],['gt',"Guatemala"],['gg',"Guernsey"],['gn',"Guinea"],['gw',"Guinea-Bissau"],['gy',"Guyana"],['ht',"Haiti"],['hn',"Honduras"],['hk',"Hong Kong"],['hu',"Hungary"],['is',"Iceland"],['in',"India"],['id',"Indonesia"],['ir',"Iran"],['iq',"Iraq"],['ie',"Ireland"],['im',"Isle of Man"],['il',"Israel"],['it',"Italy"],['jm',"Jamaica"],['jp',"Japan"],['je',"Jersey"],['jo',"Jordan"],['kz',"Kazakhstan"],['ke',"Kenya"],['ki',"Kiribati"],['kp',"Korea, North"],['kr',"Korea, South"],['kw',"Kuwait"],['kg',"Kyrgyzstan"],['la',"Lao"],['lv',"Latvia"],['lb',"Lebanon"],['ls',"Lesotho"],['lr',"Liberia"],['ly',"Libyan"],['li',"Liechtenstein"],['lt',"Lithuania"],['lu',"Luxembourg"],['mo',"Macau"],['mk',"Macedonia"],['mg',"Madagascar"],['mw',"Malawi"],['my',"Malaysia"],['mv',"Maldives"],['ml',"Mali"],['mt',"Malta"],['mh',"Marshall Islands"],['mq',"Martinique"],['mr',"Mauritania"],['mu',"Mauritius"],['yt',"Mayotte"],['mx',"Mexico"],['fm',"Micronesia"],['md',"Moldova"],['mc',"Monaco"],['mn',"Mongolia"],['me',"Montenegro"],['ms',"Montserrat"],['ma',"Morocco"],['mz',"Mozambique"],['mm',"Myanmar"],['na',"Namibia"],['nr',"Nauru"],['np',"Nepal"],['nl',"Netherlands"],['an',"Netherlands Antilles"],['nc',"New Caledonia"],['nz',"New Zealand"],['ni',"Nicaragua"],['ne',"Niger"],['ng',"Nigeria"],['nu',"Niue"],['nf',"Norfolk Island"],['mp',"Northern Mariana Islands"],['no',"Norway"],['om',"Oman"],['pk',"Pakistan"],['pw',"Palau"],['ps',"Palestine"],['pa',"Panama"],['pg',"Papua New Guinea"],['py',"Paraguay"],['pe',"Peru"],['ph',"Philippines"],['pn',"Pitcairn Islands"],['pl',"Poland"],['pt',"Portugal"],['pr',"Puerto Rico"],['qa',"Qatar"],['re',"Reunion"],['ro',"Romania"],['ru',"Russian Federation"],['rw',"Rwanda"],['kn',"Saint Kitts and Nevis"],['lc',"Saint Lucia"],['mf',"Saint Martin"],['pm',"Saint Pierre and Miquelon"],['vc',"Saint Vincent/ Grenadines"],['ws',"Samoa"],['sm',"San Marino"],['st',"Sao Tome and Principe"],['a2',"Satellite Provider"],['sa',"Saudi Arabia"],['sn',"Senegal"],['rs',"Serbia"],['sc',"Seychelles"],['sl',"Sierra Leone"],['sg',"Singapore"],['sk',"Slovakia"],['si',"Slovenia"],['sb',"Solomon Islands"],['so',"Somalia"],['za',"South Africa"],['es',"Spain"],['lk',"Sri Lanka"],['sd',"Sudan"],['sr',"Suriname"],['sz',"Swaziland"],['se',"Sweden"],['ch',"Switzerland"],['sy',"Syria"],['tw',"Taiwan"],['tj',"Tajikistan"],['tz',"Tanzania"],['th',"Thailand"],['tl',"Timor-Leste"],['tg',"Togo"],['tk',"Tokelau"],['to',"Tonga"],['tt',"Trinidad and Tobago"],['tn',"Tunisia"],['tr',"Turkey"],['tm',"Turkmenistan"],['tc',"Turks and Caicos Islands"],['tv',"Tuvalu"],['ug',"Uganda"],['ua',"Ukraine"],['ae',"United Arab Emirates"],['gb',"United Kingdom"],['us',"United States"],['uy',"Uruguay"],['um',"US Minor Outlying Islands"],['uz',"Uzbekistan"],['vu',"Vanuatu"],['va',"Vatican"],['ve',"Venezuela"],['vn',"Vietnam"],['vg',"Virgin Islands, British"],['vi',"Virgin Islands, U.S."],['wf',"Wallis and Futuna"],['ye',"Yemen"],['zm',"Zambia"],['zw',"Zimbabwe"]//generated 2010-05-30 13:33:15
			] ]
};

//END #############   END - APE Synchron with  "Filters.js"    ##################



var Names = {	'Language':{},//Will be filled with 'de':'German'
				'Country': {} //Will be filled with 'de':'Germany'
};

function getLanguageString(p)
{
	var Languages ="";
	for(var i=1;i<=4;i++)
		if(p['Language'+i] != "0")
			Languages += ", "+
				Names['Language'][p['Language'+i]];
	
	return Languages.substring(2);
}



function displayPartnerProperties()
{
	if(!$chk(partner)){
		hidePartnerProperties();
		return;
	}
	 
	
	
	UI.showQuestion('naked');
	
	
	$('partner_languages').set('text',getLanguageString(partner.Properties));
	
	$('partner_country').getChildren().destroy();

	$('partner_country').set('text',
		Names['Country'][partner.Properties.Country]);

	$('partner_credits').set('text',partner.Credits);
	
	flagIcon(partner.Properties.Country)
		.inject($('partner_country'),'top');

	$('partner_profile').style.display = "block";

		
	if(partner.Facebook)
	{
		$('request_profile_button').style.display = "inline";
		$('partner_name_stranger').set('text',"Facebook User");
	}else
		$('request_profile_button').setStyle('display',"none");
			
	resetPartnerProfile();
}

function resetPartnerProfile(){
	
	$('request_profile_waiting').set('text',"Waiting for response...");
	$('request_profile_waiting').style.display = "none";

	$('partner_name_stranger').style.display = "inline";
	$('partner_name').style.display = "none";
	$('partner_name').set('text',"");
	$('partner_name').set('href',"#");

	$('partner_pic_stranger').style.display = "inline";
	$('partner_pic_link').style.display = "none";
	$('partner_pic').set('src',"");
	$('partner_pic_link').set('href',"#");
	
	$('share_profile_shared').style.display = "none";
	if(Facebook.session != -1){
		$('share_profile_button').style.display = "inline";
	}
	
}

function hidePartnerProperties(){
	
	UI.hideQuestion('naked');
	
	$('request_profile_waiting').set('text',"Waiting for response...");
	$('request_profile_waiting').style.display = "none";
	$('partner_profile').style.display = "none";
	$('share_profile_button').style.display = "none";
	$('share_profile_shared').style.display = "none";
	UI.hideQuestion('name');
	
}

function createFilterDropDownBoxes() {
	
	filterBoxes.createBoxes(Filters,$("filters_container"));
	 
}

function flagIcon(country)
{
	return new Element('i',{
		 'class':'flag '+country
		  ,'text':  ' '                                     
	 }).inject(new Element('span',{
				'class':'drop_down_img_wrapper'
	}));
}

var alsoOtherFilters;

function onfilterBoxOpen(filterType) {
	konsole.log("onfilterBoxOpen: "+filterType);

	// Loop through all possible filter states and clear the drop down entries
	for ( var i = 0; i < Filters[filterType][1].length; i++) {
		var filterState = Filters[filterType][1][i][0];

		// Reset (remove) counts and neighbouring infos:
		$('dropDown_' + filterType + "_count_" + filterState).set('text', "");
		$('dropDown_' + filterType + "_entry_" + i).removeProperty('prev');
		$('dropDown_' + filterType + "_entry_" + i).removeProperty('next');
	}

	alsoOtherFilters = false;
	
	// Produce filter information
	var Filters1 = [], Filters2 = [];
	for ( var i = 0; i < FilterOrderDefinition.indexOf(filterType); i++)
	{
		var value=Sets.Filters[FilterOrderDefinition[i]];
		if(value!=0 && value!="0")
			alsoOtherFilters=true;
		
		Filters1.push(value);
	}
	
	i++;
	
	for (; i < FilterOrderDefinition.length; i++)
	{
		var value=Sets.Filters[FilterOrderDefinition[i]];
		if(value!=0 && value!="0")
			alsoOtherFilters = true;
		
		Filters2.push(value);
	}

		// Send them to ape
	Ape.core.request.cycledStack.add('getFilterCounts',{ 
		'FilterType' : filterType,
		'Filters1' : Filters1,
		'Filters2' : Filters2
	});
	Ape.core.request.cycledStack.send();
	return false;
}

function showInitialFilterCounts(data)
{
	if(data.results==0)
	{
		$('selected_user_count').set("text","0");
		$('total_user_count').set("text","0");
	}
	else if(data.results.length==1)
	{
		if(data.customFilter)
			$('selected_user_count').set("text",0);
		else
			$('selected_user_count').set("text",data.results[0].fCount);
		
		$('total_user_count').set("text",data.results[0].fCount);
	}
	else
	{
		for(var i=0; i<data.results.length;i++)
			switch(data.results[i].fID)
			{
			case '0;0;0;0;0;0':
				$('total_user_count').set("text",data.results[i].fCount);
				break;
			default:
				$('selected_user_count').set("text",data.results[i].fCount);
			}
	}
}

// Add result function for getFilterCounts from above
function showFilterCounts(results, filterType) {
	konsole.log(JSON.stringify(results));
	var index = FilterOrderDefinition.indexOf(filterType);
	
	var currentFilterCount = false;
	
	// Add new counts
	for ( var i = 0; i < results.length; i++)
	{
		if(results[i].fID == '0;0;0;0;0;0')
		{
			$('total_user_count').set("text",results[i].fCount);
			if(alsoOtherFilters)
				continue;
		}
		
		var value = results[i].fID.split(";")[index];
		
		if(value == Sets.Filters[filterType])
		{
			$('selected_user_count').set("text",results[i].fCount);
			currentFilterCount = true;
		}

			
		$('dropDown_'+filterType+"_count_"+value).set(
				'text', " (" + results[i].fCount + ")");
	}
	
	if($('dropDown_'+filterType+"_count_0").get('text') == "")
		$('dropDown_'+filterType+"_count_0").set(
				'text', " (0)");
	
	if(!currentFilterCount)
		$('selected_user_count').set("text",0);		

	var prev = 0;
	$('dropDown_' + filterType + "_entry_0").setStyle('display','block');
	
	// remove entries with count=0:
	// Loop through all possible filter states
	for ( var i = 1; i < Filters[filterType][1].length; i++) {
		if ($('dropDown_' + filterType + "_count_"
						+ Filters[filterType][1][i][0]).get('text') != "")
		{
			$('dropDown_' + filterType + "_entry_" + i).setStyle('display',
					'block');
			$('dropDown_' + filterType + "_entry_" + prev).setProperty('next', i);
			$('dropDown_' + filterType + "_entry_" + i).setProperty('prev', prev);
			prev = i;
		}
	}
	$('dropDown_' + filterType + "_entry_" + prev).setProperty('next', prev);
}

function onFilterChange(type, value) {
	
	var count=$('dropDown_' + type + "_count_" + value).get('text');
	
	if(count && count!="")
		$('selected_user_count').set('text',count.substring(2).replace(")",""));
	
	//IF filter has really changed
	if(Sets.Filters[type] != value)
	{
		Sets.Filters[type] = value;
		if(callingState == callingStateCALLING)
			next();
	}
	
	Sets.currentFilterID = currentFilterID();
	setNeverExpiringCookie('Filters', JSON.stringify(Sets.Filters));
	konsole.log(JSON.stringify(Sets.Filters));

	filterBoxes.boxes[type].blur();
}

function currentFilterID()
{
	var res="";
	for ( var i = 0; i < FilterOrderDefinition.length; i++)
		res += ";"+Sets.Filters[FilterOrderDefinition[i]];
	
	return res.substring(1);
}

//Muss syncron sein mit MySQL View vFilterCounts!
//Wird benutzt zur erstellung der
//FilterId-Strings für die FilterCounts
var FilterOrderDefinition = [ 'Facebook', 'Camera', 'Language', 'Country',
		'Sexual', 'Gender' ];

var filterBoxes = {
		
	boxes: {},
	
	createBoxes:function(filtersArray,container){
		
		for ( var key in filtersArray) {
			
			this.boxes[key] = {
				blur:function(){
						this.dropDownContainer.style.display = "none";
						if(Sets.Filters[this.key]==0)
							this.deactivate();
						else
							this.activate();
					},
				key:key,
				activate:function(){
						this.label.setProperty('html',this.dropDownInput.value);
						if(this.key=='Country')
							flagIcon(Sets.Filters[this.key]).inject(this.label,'top');						
						this.filterBox.removeClass("inactive");
					},
				deactivate:function(){
						this.label.setProperty('html',filtersArray[this.key][0]);
						this.filterBox.addClass("inactive");
					}
			};
			
			var clickHandler = function(){
				if(this.justClosed){
					this.justClosed = false;
					return;
				}
				
				this.dropDownContainer.style.display = "block";
				this.dropDownContainer.style.left = this.filterBox.getCoordinates($('body')).left+"px";
				this.dropDownContainer.style.top = this.filterBox.getCoordinates($('body')).top+"px";
				this.dropDownInput.focus();
			};
			var hover = function(){
				this.addClass('hover');
			}
			var unhover = function(){
				this.removeClass('hover');
			}
			var close = function(event){
				if(Sets.Filters[this.key]!=0){
					onFilterChange(this.key,0);
				}
				
				Ape.core.request.cycledStack.add("getSingleFilterCounts",{'currentFilterID'	:	currentFilterID()});
				Ape.core.request.cycledStack.send();
				
				this.justClosed = true;
				this.deactivate();
			}
			boundClickHandler = clickHandler.bind(this.boxes[key]);
			
			var gemeinsamerContainer = new Element('div',{
				'class': 'filter_box_container',
				'styles':{	'float'	:'left'}
				//'display': 'block',
		        //			'position':'relative'}
		        	}).inject(container);
			
			
//#############    dropDownContainer   ###########			
			
			this.boxes[key].dropDownContainer = new Element('div',{
			    'styles': {
					'display': 'none',
			        'position':'absolute',
			        'z-index':1
			    },
			    'class': 'filter_box '
			}).inject($('body'));
			
			InsertDropDownBox(
					filtersArray[key][1], 
					Sets.Filters[key],
					this.boxes[key].dropDownContainer, 
					onFilterChange, 
					key, 
					onfilterBoxOpen);
			
// #############    filterBox   ###########
			
			this.boxes[key].filterBox = new Element('div',{
				'class':'filter_box',
			    'events':{
					'mouseover':hover,
					'mouseout':unhover,
					'click': boundClickHandler
				}
			}).inject(gemeinsamerContainer);
			
			this.boxes[key].label = new Element('div',{
			    'html': key,
			    'class': 'filter_box_label'
			}).inject(this.boxes[key].filterBox);
			
			this.boxes[key].closeButton = new Element('span',{
				'class': 'close_button',
				'html': '&nbsp;',
				'events':{
						'mouseover':hover,
						'mouseout':unhover,
						'click':close.bind(this.boxes[key])
					}
			}).inject(this.boxes[key].filterBox,'bottom');
			
			

			this.boxes[key].dropDownInput = $("dropDown_"+key);
			this.boxes[key].dropDownList = $("dropDown_"+key+"_list");
			
			if(Sets.Filters[key]==0)
				this.boxes[key].deactivate();
			else
				this.boxes[key].blur();
			
			
		}
		
	}

}

var genderAlready=false;

function refreshGender()
{
	
	if(Sets.Properties.Gender != 0)
	{
		$('user_gender').set('text',Sets.Properties.Gender == 1 ? 'male' :(Sets.Properties.Gender == -1 ? 'female' : 'unkown'));
		UI.hideQuestion('gender');
	}
	else{
		if(!genderAlready)
			genderAlready = true;
		else
			UI.showQuestion('gender');
	}
	
	
}

function onGender(gender)
{
	Sets.Properties.Gender = gender;
	Ape.core.request.cycledStack.add("onGender",{'Gender':gender});
	
	refreshGender();
}
