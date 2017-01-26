<?php 
include_once "include/settings.php";

//############  Cool: 
function filenameBase64($s)
{
	return strtr(base64_encode($s),"/+","_-");
}

//43 zeichen!
function sha256FilenameBase64($s)
{
	return substr(filenameBase64(hash('sha256',$s,true)),0,-1);
}

//Ported from APE scripts: Authentication.js
function AuthCookieSignature($AuthCookiePayload)
{
	//HMAC-SHA1
	//from APE: var Secret
	//TODO das replacen von \/ muss mna nur machen, solange der bug in json:encode existiert
	return hash_hmac("sha1",str_replace('\/',"/",json_encode($AuthCookiePayload)),"bl41ssd23");
}


//PHP stuff to prepare for the APE-ported  AuthCookieSignature(p)
function verifyAuthCookie($cookie)
{		
	$cookie=json_decode(stripslashes($cookie),true);
	
	if($cookie && AuthCookieSignature($cookie['Payload'])==$cookie['Signature'])
		return $cookie['Payload'];
	else	
		return false;
			
}

function singedPushToApe($params)
{
	$cmd = array(array(
			'cmd' => 'signedPush',
			'params' => array(
				"Signature"	=>	AuthCookieSignature($params),
				'Payload' => $params
			)
	));
	
	$url = APE_URL."/?".json_encode($cmd);
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$curl_result = curl_exec($ch);
	curl_close($ch);
	
	return json_decode(stripslashes($curl_result),true);
}


//http://developers.facebook.com/docs/authentication/
function verifyFBCookie()
{
	
	$args = array();
	
  	parse_str(trim($_COOKIE['fbs_' . APP_ID], '\\"'), $args);
  	
  	ksort($args);
  	
  	$payload = '';
  	
  	foreach ($args as $key => $value)
	    if ($key != 'sig')
      		$payload .= $key . '=' . $value;
      		
  	if (md5($payload . APP_SECRET) != $args['sig'])
    	return false;
    	
  	return $args;		
}

?>