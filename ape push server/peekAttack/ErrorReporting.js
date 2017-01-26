function errorReport(obj){
	
	var request = new Http('http://fbtest.peekattack.com/error_reporting/error_reporting.php');//LIVE
	request.set('method', 'POST');

	// GET or POST data
	request.writeData('data', JSON.stringify(obj));
	
	request.getContent(function (result) {
		
	});
	
}

Ape.registerCmd("errorReport",true,function(params,info)
		{
			errorReport(params);
		});