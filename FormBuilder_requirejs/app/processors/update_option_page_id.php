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

$result = mssql_query( 'select option_id,field_id FROM formmaker_fieldoptions;' );
$recordset = array();
$count = 0;
while( ( $row = mssql_fetch_array( $result, MSSQL_ASSOC) ) )
{
	$option_id = $row["option_id"];
	$field_id = $row["field_id"];
	$result2 = mssql_query( 'select field_id,page_id FROM Formmaker_Fields WHERE field_id = '.$field_id.';' );
	while( ( $row2 = mssql_fetch_array( $result2, MSSQL_ASSOC) ) )
	{
		$page_id = $row2["page_id"];
		echo "option $option_id  - > page_id $page_id <br>";
		$result3 = mssql_query( 'UPDATE formmaker_fieldoptions SET page_id = '.$page_id.' WHERE option_id = '.$option_id.' ;' );
	}
}
?>