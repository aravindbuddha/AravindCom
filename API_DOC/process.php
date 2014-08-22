<?php
$output = shell_exec('netstat -lnptu');
echo "<pre>$output</pre>";
?>