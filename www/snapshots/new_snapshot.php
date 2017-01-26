<?
include_once "include/error_reporting.php";
include_once "include/settings.php";
include_once "include/definitions.php";
include_once "include/utils.php";

$cookie=verifyAuthCookie($_GET['cookie']);

if($cookie)
{
	$filename =sha256FilenameBase64($cookie['UserID'].$_GET['pendingID'],true);
	
	$contents=file_get_contents("php://input");
	
	file_put_contents($snapshot_thumbs_path.$filename.$snapshot_thumbs_extension, 
						substr($contents,0,$_GET['thumbnailLength']));
						
	file_put_contents($snapshot_path.$filename.$snapshot_extension, 
						substr($contents,$_GET['thumbnailLength']));

		singedPushToApe(array(
					'cmd' => 'newSnapshot',
					'filename' => $filename,
					'timestamp' => $_GET['timestamp'],
					'pendingID' => $_GET['pendingID'],	
					'userid' => $cookie['UserID'],
					'callid' => $_GET['callID']
				));
	echo "success";
	
	die();
					
}else
	echo "INVALID COOKIE";
?>