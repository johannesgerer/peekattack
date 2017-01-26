var Ads = {
		
	'peekAttack_small' : {'width': 450, 'height':300},
	'pa366x280' : {'width': 336, 'height':280},
	'pa120x240' : {'width': 120, 'height':240},
	'ad180x150' : {'width': 180, 'height':150}
	
	
	
};

Ads.create = function (ad_name)
{
	/*var cont = new Element('div').grab(new Element('div',{
		'styles' : $extend({'position'	:'absolute',
							'z-index'	:10},Ads[ad_name])
	}));
		*/
	return new Element('div',{'text':''});
	
	return (new Element('iframe',{
		 'src': 'adscontent.html?'+ad_name,
		 'frameborder' : "0",
		 'styles': $extend(Ads[ad_name])
	}));		
};
