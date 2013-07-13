<?php
$pause = $_POST['play'];
$json = "{\\\"play\\\": \\\"".$pause."\\\"}";
$command = "echo \"".$json."\" > settings";
$output = shell_exec($command);
echo $command;
?>