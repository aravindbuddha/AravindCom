<?php

include 'connector-php/codebase/data_connector.php';
include 'connector-php/codebase/db_mssql.php';
include 'connector-php/codebase/mixed_connector.php';

 
$res=mssql_connect('.\ARAVIND',"sa","Passw0rd",false);
mssql_select_db("MAPTEST");
$json = new JSONDataConnector($res,"MsSQL");

if($_GET['get']=="grid"){
	$contactID=$_GET['contactID'];
	$sp_airsAddress = "EXEC SP_AddEditAddressInfo '$c_account_key', $contactID, default,'Get'";
 //	$json->render_complex_sql(sp_airsAddress,$id,$text,$extra,$relation_id);
}

if($_GET['get']=="address_type"){
	$json->render_table("lkpAddressType","AddressTypeID","AddressType,AddressSequence");
}

if($_GET['get']=="address_state"){
	$json->render_table("lkpAddressType","AddressTypeID","AddressType,AddressSequence");
}
