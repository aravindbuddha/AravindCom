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

// require_once("../../../userhome/\$ettings.php");
// require_once($path["serloc"]."header.php");

// $connection = $Data->db;

include '../../../../../../userhome/$ettings.php';


include '../../../../../codebase3.6/connector-php/codebase/data_connector.php';
include '../../../../../codebase3.6/connector-php/codebase/db_mssql.php';
include '../../../../../codebase3.6/connector-php/codebase/mixed_connector.php';

//print_r($Data->db);
//sleep(10);
 
//$res=mssql_connect('.\DIMPU',"sa","abc123",false);
//$res=mssql_connect('.\ARAVIND',"sa","Passw0rd",false);
//print_r($db);
$res=mssql_connect($db["hostname"],$db["username"],$db["password"],false);


// mssql_select_db("MAPTEST");
$json = new JSONDataConnector($res,"MsSQL");



?>