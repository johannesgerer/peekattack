//#############    WWW Synchron with  "filterAndProperties.js"    ##################
//Achtung Änderungen müssen auch im APe gemacht werden!!!!!z
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

//END #############   END - WWW Synchron with  "filterAndProperties.js"    ##################

//returns: raw: {'FilterType':'Gender','results':res}
Ape.registerCmd("getFilterCounts",true,function(params,info2)
{	
	var Ids=[];
	var FilterStates=Filters[params.FilterType][1];
	var Filters1=params.Filters1 || [];
	var Filters2=params.Filters2 || [];
	
	for(var i=0;i<FilterStates.length;i++)
		Ids.push("'"+
				Ape.MySQL.escape(Filters1.concat([FilterStates[i][0]].concat(Filters2)).join(";"))
					+"'");
	
	sqlStandardPool.query("SELECT fID,fCount FROM tFilterCounts " +
				"WHERE fID IN ('0;0;0;0;0;0',"+Ids.join()+")"
			, function(res) {
		info2.sendResponse('FilterCounts',{'FilterType':params.FilterType,'results':res});
	});
	
	return 1;
	
});

Ape.registerCmd("getSingleFilterCounts",true,function(params,info)
{
	sendSingleCounts(params.currentFilterID,info)
	
});


function sendSingleCounts(filter, info)
{
	var filter= decodeURIComponent(filter);
	var custom= (filter!='0;0;0;0;0;0');
	
	sqlStandardPool.query("SELECT fID,fCount FROM tFilterCounts " +
			"WHERE fID IN ('0;0;0;0;0;0','"+Ape.MySQL.escape(filter)+"')"
		, function(res) {
			info.sendResponse('FilterCounts',{'results':res,'customFilter':custom});
	});
}