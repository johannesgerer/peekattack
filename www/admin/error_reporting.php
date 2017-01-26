<?

if($_SERVER["REMOTE_ADDR"] != "89.149.217.111")
	die("Not authorized.");

	$data=json_decode($_REQUEST['data']);
	
	$title="Report";
	if(isset($data->title))
		$title = $data->title;
	
mail("root@localhost", "peekAttack ".$title, print_r($data,true));

?>