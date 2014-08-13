<?php


include "connection.php";

$data_base=$_REQUEST['data_base'];
mssql_select_db($data_base);


//print_r($_REQUEST);
if($_GET['act']=="get"){
	$contactID=$_GET['contact_id'];
	$sp_airsAddress = "EXEC USP_AddEditAddressInfo $contactID";
  	$json->render_complex_sql($sp_airsAddress,"AddressID","AddressTypeID,AddressType,Address1,Address2,city,stateId,StateName,zip,countyId,countyText,countryId,CountryText,AddressProvinceID,AddressProvenceText,MailingAddress,addstartdate,addleavedate");
	

}

if($_REQUEST['act']=="save"){
 $data=json_decode($_REQUEST['data'],true);
 $contact_id=$data['contact_id'];
 $address_id=isset($data['address_id'])?$data['address_id']:0;
 $address_type_id=$data['address_type_id'];
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
 echo $sp_airsAddress = "EXEC USP_AddEditAddressInfo  $contact_id,$address_id,'Save',$address_type_id, '$address_1', '$address_2', '$city', $state_id, '$zip', $country_id, $county_id, '$start_date', '$leave_date' , $is_mailing, $province_id";
 $json->render_complex_sql($sp_airsAddress);
}

if($_REQUEST['act']=="del"){
 $data=json_decode($_REQUEST['data'],true);

 $contact_id=$data['contact_id'];
 $address_id=$data['address_id'];

 $sp_airsAddress = "EXEC USP_AddEditAddressInfo  $contact_id,$address_id,'Delete'";

 // $json->sql->query($sp_airsAddress);
 // echo $id = $json->sql->get_new_id();
 //echo $sp_airsAddress;
 $json->render_complex_sql($sp_airsAddress);
}


