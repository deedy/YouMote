<?php

function addKVtoFile($key,$value) {
	$command = "sed -i '' -E 's/(\"".$key."\": \")[^\"]{1,}/\\1".$value."/g' settings";
	$output = shell_exec($command);
	echo $command;
}

foreach ($_POST as $key=>$value) {
    addKVtoFile($key,$value);
}
?>

