<?php
include "connection.php";
header("Content-Type: application/json", true);
function get_c_acc_key($agencyID){

    $data_fetch          = "SELECT c_account_key FROM  user_agencies WHERE agency_id=$agencyID";
    $res_fetch           = mssql_query($data_fetch);
    $c_acc_key           = mssql_fetch_array($res_fetch);
    $c_account_keyDrop   = $c_acc_key['c_account_key'];
    return $c_account_keyDrop;
}

    $agencyid       =   $_POST['agencyid']; 

$c_account_key   = get_c_acc_key($agencyid);

$contactID       = intval($_POST['contact_ID_email']);
$emailID         = intval($_POST['email_ID_hidden']);
$emailTypeStr    = intval($_POST['emailTypeStr']);
$contactEmailStr = $_POST['contactEmailStr'];
$Emailmailing    = intval($_POST['Emailmailing']);
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
        'response' => 'data stored'.$sp_Email,
        'addid' => $emailids
    ));
} else {
    echo json_encode(array(
        'status' => 'err',
        'response' => 'Could not read the data' . $sp_Email
    ));
}