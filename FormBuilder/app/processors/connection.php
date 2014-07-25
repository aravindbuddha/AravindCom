<?php
// ===== PLACE YOUR DATABASE HANDLER HERE
$agency_database = "MAPTEST"; // MyAdoptionPortalT2
$servername = "192.168.1.19"; 
$uid = "ESCairs"; 
$pwd = "FishB8"; 
$connection = mssql_connect("192.168.1.19", $uid, $pwd)
	or die(json_encode(array('status' => 'err', 'response' => "Couldn't connect to SQL Server on $servername")));
$selected = mssql_select_db($agency_database, $connection)
   or die(json_encode(array('status' => 'err', 'response' => "Couldn't open database $agency_database")));

if (!$connection) {
    die(json_encode(array('status' => 'err', 'response' => 'Something went wrong while connecting to MSSQL' . mssql_get_last_message() )));
}
// ===== PLACE YOUR DATABASE HANDLER HERE
?>