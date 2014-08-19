<?php
include "connection.php";

 /*if(!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId'];*/

    $agencyid       =   $_POST['agencyid']; 
$phoneID       = $_POST['contactPhoneId'];
$contactID     = $_POST['contactId'];
//$c_account_key = get_c_acc_key($agencyid);

//$sp_airsPhoneDelete = "EXEC SP_AddEditPhoneInfo '$c_account_key', $contactID, $phoneID,'Delete'";
$sp_airsPhoneDelete = "EXEC USP_ContactPhoneAddEdit  '$phoneID',$contactID,1,1,'','',3";
$getAirsPhone       = mssql_query($sp_airsPhoneDelete);


echo json_encode(array(
    'status' => 'success',
    'response' => 'record(s) was deleted',
    'records' => $phoneID
));


?>
