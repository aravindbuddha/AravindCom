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

$result = mssql_query( 'select * FROM user_accounts;' );

$recordset = array();
$count = 0;
while( ( $row = mssql_fetch_array( $result, MSSQL_ASSOC) ) )
{
	//array_push($programs, array( value => $row["RelationshipSubTypeId"], text => $row["RelationshipSubTypeText"] ));
	
	
	$record = array(); 
	$count_col = 0;
	
	foreach ($row as $key => $col) 
	{
		echo $key . ",";
	}
	
	echo "<br>";
	  
	$count++;  
	
}



?>