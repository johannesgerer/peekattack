imagePreload(	'graphics/fb_loading.png',
				'graphics/x.png',
				'graphics/fb_top_bar.png',
				'graphics/swap_arrows.png',
				'graphics/standard_button.png',
				'graphics/share_plus.png',
				'graphics/fb_button_xfbml.png'
				);
				
				

function imagePreload()
{
	for(var i=0;i< arguments.length;i++)
		new Element('img',{'src':arguments[i]});
}