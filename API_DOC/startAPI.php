

<?php
echo '<pre>';

// Mostra todo o resultado do comando do shell "ls", e retorna
// a última linha da saída em $last_line. Guarda o valor de retorno
// do comando shell em $retval.
$last_line = exec('plackup');

// Mostrando informação adicional
echo $last_line;
?>