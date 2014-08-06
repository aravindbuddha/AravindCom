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

if($_REQUEST['act']=="save"){
 $data=json_decode($_REQUEST['data'],true);
 $contact_id=$data['contact_id'];
 $address_type_id=$data['type_id'];
 $address_1=$data['address_1'];
 $address_2=$data['address_2'];
 $city=$data['city'];
 $state_id=intval($data['state_id']);
 $zip=$data['zip'];
 $country_id=intval($data['country_id']);
 $county_id=intval($data['county_id']);
 $start_date=$data['start_date'];
 $leave_date=$data['leave_date'];
 $is_mailing=$data['is_mailing'];
 $province_id=intval($data['province_id']);
 $sp_airsAddress = "EXEC SP_AddEditAddressInfo  $contact_id, '$AddressId','Save',$address_type_id, '$address_1', '$address_2', '$city', $state_id, '$zip', $country_id, $county_id, '$start_date', '$leave_date' , $is_mailing, $province_id";
//$json->render_complex_sql($sp_airsAddress,"AddressID","AddressTypeID,AddressType,Address1,Address2,City,StateId,SateName,zip,CountyId,CountyText,CountryId,CountryText,AddressProvinceID,AddressProvenceText,MailingAddress,addstartdate,addleavedate");

 print_r($sp_airsAddress);

}

