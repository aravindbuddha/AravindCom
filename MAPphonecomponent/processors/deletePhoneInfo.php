<?php
include "connection.php";

$agencyid       =   $_POST['agencyId'];
$phoneID       = $_POST['contactPhoneId'];
$contactID     = $_POST['contactId'];

//$sp_airsPhoneDelete = "EXEC SP_AddEditPhoneInfo '$c_account_key', $contactID, $phoneID,'Delete'";
$sp_airsPhoneDelete = "EXEC USP_ContactPhoneAddEdit  '$phoneID',$contactID,1,1,'','',3";
$getAirsPhone       = mssql_query($sp_airsPhoneDelete);


echo json_encode(array(
    'status' => 'success',
    'response' => 'record(s) was deleted',
    'records' => $phoneID
));


?>
