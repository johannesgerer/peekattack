<?
	include_once "definitions.php";
	include_once "utils.php";
	
	if(isset($_GET['setmax']))
	{
		if($_POST['name-1']!="")
			$i=-1;
		else 
			$i=0;
			
		for(;$i<$_POST['count'];$i++)
			singedPushToApe(array(
					'cmd' => 'setApeStatus',
					'type'		=> 'StreamingServer',
					'server'	=> array(
									'name' => $_POST["name$i"],
									'info'=> array(	'max'=> $_POST["max$i"],
													'current'=>$_POST["current$i"])
									)
							));
			
		$a=explode("?",$_SERVER['REQUEST_URI']);
		header('Location: '.$a[0]);
	}
	
	
	$result = singedPushToApe(array('cmd' => 'getApeStatus'));
			
	$result=$result[0]['data'];
?>

<form method="post" action="?setmax">
<table>
<tr>
<td>Server</td>
<td>Max (-1 to delete server)</td>
<td>Current</td>		
		</tr>
<?php 
$i=0;

	foreach($result['StreamingServers'] as $key => $value)	
	{
		echo "<tr><td>".$key.":".
		"<input type='hidden' name='name$i' value='$key' /></td>".
		"<td><input type='text' name='max$i' value='{$value['max']}' /></td>".
		"<td><input type='text' name='current$i' value='{$value['current']}' /></td>".
		"</tr>\n";
		$i++;
	}
	
echo "<input type='hidden' name='count' value='$i' />";
?>
<tr>
<td><input type='text' name='name-1' value='' /></td>
<td><input type='text' name='max-1' value='' /></td>
<td><input type='text' name='current-1' value='' /></td>		
		</tr>
<tr><td>
<input type="submit" value="Change" />
</td></tr>
</table>
</form>
<?php 

	
	
	
	echo "<pre>".print_r($result,true)."</pre>";
?>
