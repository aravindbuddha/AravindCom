<?php

include 'connector-php/codebase/data_connector.php';
include 'connector-php/codebase/db_mssql.php';
include 'connector-php/codebase/mixed_connector.php';

 
$res=mssql_connect('.\ARAVIND',"sa","Passw0rd",false);
mssql_select_db("MAPTEST");
$json = new JSONDataConnector($res,"MsSQL");

if($_GET['get']=="grid_address"){
	$contactID=$_GET['contactID'];
	$sp_airsAddress = "EXEC USP_AddEditAddressInfo $contactID";
  $json->render_complex_sql($sp_airsAddress,"AddressID","AddressTypeID,AddressType,Address1,Address2,City,StateId,SateName,zip,CountyId,CountyText,CountryId,CountryText,AddressProvinceID,AddressProvenceText,MailingAddress,addstartdate,addleavedate");
}


