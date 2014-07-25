<?php

/*
// ===== PLACE YOUR DATABASE HANDLER HERE
$agency_database = str_replace("'", "''",$_POST['agency_database']);
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
// ===== PLACE YOUR DATABASE HANDLER HERE
*/

include "connection.php";


/*=========  ========= */

$result = mssql_query( 'select username,user_id FROM user_accounts;' );
$recordset = array();
$count = 0;
while( ( $row = mssql_fetch_array( $result, MSSQL_ASSOC) ) )
{
	$username = $row["username"];
	$user_id = $row["user_id"];
	echo "$username  - > " . hash('sha256', $username);
	echo "<br>";
	//$result3 = mssql_query( 'UPDATE tbl_api_secret SET username = '.hash('sha256', $username).' WHERE user_id = '.$user_id.' ;' );
}
?>