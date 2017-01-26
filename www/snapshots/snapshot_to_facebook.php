<?
include_once "include/error_reporting.php";
include_once "include/settings.php";
include_once "include/definitions.php";
include_once "include/utils.php";


$fbcookie = verifyFBCookie();

if($fbcookie)//if Facebook cookie could be verified
{
	$authCookie=verifyAuthCookie($_POST['authCookie']);
	
	if($authCookie)//if verifyAuthCookie could be verified
	{
		$file_location = $snapshot_path.$_POST['fFilename'].$snapshot_extension;
		
		$url = "https://graph.facebook.com/me/photos";
		
		$data = array(
	    	basename($file_location) => "@".realpath($file_location),
	    	"message" => "",
	    	"access_token" => $fbcookie['access_token']
		);
		
		$ch = curl_init();
		
	    curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		
		$op = curl_exec($ch);
		
	    curl_close($ch);
	    
	    
	    $result = json_decode($op,true);
	    
	    if(!isset($result['error']))
	    {
	    	
	   		echo json_encode(array('id' => $result['id']));
	    
	    	singedPushToApe(array(
					'cmd' 			=> 'snapshotToFacebook',
					'SnapshotID'	=> $_POST['fID'],
	    			'UserID' 		=> $authCookie['UserID'],
	    			'loginResponseFBPermissions'  =>  $_POST['loginResponseFBPermissions'],
					'FBSnapshotID' 	=> $result['id']
				));
	    }
	}
}
?>