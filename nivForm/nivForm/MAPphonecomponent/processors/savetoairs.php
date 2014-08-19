<?php
include "connection.php";
header("Content-Type: application/json", true);
 /*if(!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId'];*/

 function get_c_acc_key($agencyID){

    $data_fetch          = "SELECT c_account_key FROM  user_agencies WHERE agency_id=$agencyID";
    $res_fetch           = mssql_query($data_fetch);
    $c_acc_key           = mssql_fetch_array($res_fetch);
    $c_account_keyDrop   = $c_acc_key['c_account_key'];
    return $c_account_keyDrop;
}

    $agencyid       =   $_POST['agencyid'];    
	
$c_account_key1  = get_c_acc_key($agencyid);
$contactID_ph    = intval($_POST['contact_ID']);
$phone_ID        = intval($_POST['phone_ID']);
$phoneType       = intval($_POST['phoneType']);
$phoneNum        = $_POST['phoneNum'];
$phoneNumexten = $_POST['phoneNumexten'];
$primaryPhoneNum = intval($_POST['PrimaryPhoneNum']);

if ($contactID_ph != '' && $c_account_key1 != '') {
    
	
	if($phone_ID == '' ){
   // $sp_airsPhoneInfo = "EXEC SP_AddEditPhoneInfo '$c_account_key1', $contactID_ph, '$phone_ID','Save',$phoneType, '$phoneNum', '$primaryPhoneNum'";
	$sp_airsPhoneInfo = "EXEC USP_ContactPhoneAddEdit  '$phone_ID',$contactID_ph,$phoneType,$primaryPhoneNum,'$phoneNum','$phoneNumexten',1";
	}else{
    //$sp_airsPhoneInfo = "EXEC SP_AddEditPhoneInfo '$c_account_key1', $contactID_ph, '$phone_ID','Save',$phoneType, '$phoneNum', '$primaryPhoneNum'";
	$sp_airsPhoneInfo = "EXEC USP_ContactPhoneAddEdit  '$phone_ID',$contactID_ph,$phoneType,$primaryPhoneNum,'$phoneNum','$phoneNumexten',2";
	}	
    $phoneid          = mssql_query($sp_airsPhoneInfo);
    if ($phone_ID == 0) {
        $added_phoneid = mssql_fetch_array($phoneid);
        $phoneids      = $added_phoneid['ContactPhoneID'];
    } else {
        $phoneids = $phone_ID;
    }
    echo json_encode(array(
        'status' => 'success',
        'response' => 'data stored',
        'addid' => $phoneids,
		'sql' => $sp_airsPhoneInfo
    ));
} else {
$sp_airsPhoneInfo = "EXEC USP_ContactPhoneAddEdit  '$phone_ID',$contactID_ph,phoneType,primaryPhoneNum,'$phoneNum','$phoneNumexten',2";	
    echo json_encode(array(
        'status' => 'err',
        'response' => 'Could not read the data' . $sp_airsPhoneInfo
    ));
}
