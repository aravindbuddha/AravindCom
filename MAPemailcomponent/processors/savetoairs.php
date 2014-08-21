<?php
include "connection.php";
header("Content-Type: application/json", true);
 /*if(!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId']; */

 function get_c_acc_key($agencyID){

    $data_fetch          = "SELECT c_account_key FROM  user_agencies WHERE agency_id=$agencyID";
    $res_fetch           = mssql_query($data_fetch);
    $c_acc_key           = mssql_fetch_array($res_fetch);
    $c_account_keyDrop   = $c_acc_key['c_account_key'];
    return $c_account_keyDrop;
}
$data=json_decode($_REQUEST['data'],true);
    $agencyid       =   $data['agency_id'];    

$c_account_key   = get_c_acc_key($agencyid);

$contactID       = intval($data['contact_id_email']);
$emailID         = intval($data['email_id_hidden']);
$emailTypeStr    = intval($data['email_type']);
$contactEmailStr = $data['contact_email'];
$Emailmailing    = intval($data['email_mailing']);
$sp_Email        = "EXEC SP_AddEditEMailInfo '$c_account_key', $contactID, '$emailID','Save',$emailTypeStr, '$contactEmailStr',  '$Emailmailing'";
if ($contactID != '' && $c_account_key != '') {
    
    $emaiid = mssql_query($sp_Email);
    
    if ($emailID == 0) {
        $added_emailid = mssql_fetch_array($emaiid);
        $emailids      = $added_emailid['0'];
    } else {
        $emailids = $emailID;
    }
    echo json_encode(array(
        'status' => 'success',
        'response' => 'data stored',
        'sp' => $sp_Email,
        'addid' => $emailids
    ));
} else {
    echo json_encode(array(
        'status' => 'err',
        'response' => 'Could not read the data' . $sp_Email
    ));
}