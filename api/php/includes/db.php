<?php
// ===== PLACE YOUR DATABASE HANDLER HERE
define('DB_HOST', 'MSIVIZAG-WRK28\ARAVIND');
define('DB_USERNAME', 'sa');
define('DB_PASSWORD', 'Passw0rd');


$connection = mssql_connect(DB_HOST, DB_USERNAME, DB_PASSWORD)
	or die(json_encode(array('status' => 'err', 'response' => "Couldn't connect to SQL Server on".DB_HOST)));
$selected = mssql_select_db(DB_NAME, $connection)
   or die(json_encode(array('status' => 'err', 'response' => "Couldn't open database agency_database")));
if (!$connection) {
    die(json_encode(array('status' => 'err', 'response' => 'Something went wrong while connecting to MSSQL' . mssql_get_last_message() )));
}
// ===== PLACE YOUR DATABASE HANDLER HERE
?>