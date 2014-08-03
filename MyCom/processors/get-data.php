<?php
include '../../codebase4.0/connector/data_connector.php';
include '../../codebase4.0/connector/db_mssql.php';
include '../../codebase4.0/connector/mixed_connector.php';

 
$res=mssql_connect('ARAVIND\DIMPU',"sa","abc123",false);
mssql_select_db("MAPTEST");
 
$json = new JSONDataConnector($res,"MsSQL");
// require("../../codebase4.0/connector/combo_connector.php");

// $comboConn = new ComboConnector($res,"MsSQL");
$city = new JSONDataConnector($res,"MsSQL");
$city->configure("City", "ID", "Name,CountryCode");


$country = new JSONDataConnector($res,"MsSQL");
$country->configure("Country", "Code", "Code,Name");
 

 $city->mix("CountryCode", $country, array(
    "Code" => "CountryCode"
));

$city->render_table("City","ID","Name,CountryCode");


// $conn = new MixedConnector($res,"MsSQL");
// $conn->add("countries", $country);
// $conn->add("cities", $city);
// $conn->render(); //retrieves configured data from the server


//$json->render_table("Country","Code","Code,Name");

//$json->render_sql("SELECT *  FROM City","id");
//print_r($josn->sql->query("SELECT * FROM contacts"));

?>