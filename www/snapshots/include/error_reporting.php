<? 

function myErrorHandler($code, $msg, $file="", $line=0, $context=array()) {
	
	$body = "Fehler $msg (No. $code) in Datei $file (Zeile $line), Uhrzeit:" . date ("d-M-Y h:i:s", mktime());
	$body .= "\n\$_REQUEST:\n" . print_r($_REQUEST, TRUE);
	
	mail ("root@localhost", "Error on ".$_SERVER['SERVER_NAME']." in ".basename($_SERVER['SCRIPT_NAME']), $body);
	if(($code == E_WARNING or $code == E_NOTICE) or $code == E_RECOVERABLE_ERROR){
		//if it is recoverable or standard warning then don't show anything.
		return true;
	}else{
		//Die standard error routine weiterlassen
		die();
	}

}

// eigenen Handler definieren
set_error_handler('myErrorHandler');

?>