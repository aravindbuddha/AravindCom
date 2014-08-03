<?php
/* ===== PLACE YOUR DATABASE HANDLER HERE
$agency_database = "MyAdoptionPortalT2";
$servername = "192.168.1.15"; 
$uid = "ESCairs"; 
$pwd = "FishB8"; 
$connection = mssql_connect("192.168.1.15", $uid, $pwd)
	or die(json_encode(array('status' => 'err', 'response' => "Couldn't connect to SQL Server on $servername")));
$selected = mssql_select_db($agency_database, $connection)
   or die(json_encode(array('status' => 'err', 'response' => "Couldn't open database $agency_database")));

if (!$connection) {
    die(json_encode(array('status' => 'err', 'response' => 'Something went wrong while connecting to MSSQL' . mssql_get_last_message() )));
}
// ===== PLACE YOUR DATABASE HANDLER HERE */

require_once("../../../userhome/\$ettings.php");
require_once($path["serloc"]."header.php");
require_once($path["serloc"]."modules/codebase4.0/connectors/data_connector.php");
require_once($path["serloc"]."modules/codebase4.0/connectors/db_mssql.php");
$connection = $Data->db;
$json_con = new JSONDataConnector($connection,"MsSQL");

?>