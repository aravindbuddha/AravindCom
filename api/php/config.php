<?php
//define("BASE_DIR","E:/xampp/htdocs/learn/github/Chatter/rest");
$agency_database = "MAPTEST"; // MyAdoptionPortalT2
$servername = "MSIVIZAG-WRK28\ARAVIND"; 
$uid = "sa"; 
$pwd = "Passw0rd"; 
$connection = mssql_connect($servername, $uid, $pwd)
	or die(json_encode(array('status' => 'err', 'response' => "Couldn't connect to SQL Server on $servername")));
$selected = mssql_select_db($agency_database, $connection)
   or die(json_encode(array('status' => 'err', 'response' => "Couldn't open database $agency_database")));

if (!$connection) {
    die(json_encode(array('status' => 'err', 'response' => 'Something went wrong while connecting to MSSQL' . mssql_get_last_message() )));
}
// ===== PLACE YOUR DATABASE HANDLER HERE
?>