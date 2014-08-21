<?php
include "connection.php";
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
$data = json_decode($_REQUEST['data'],true);
$agencyid       =   $data['agency_id'];    
$contactemailId = $data['contact_email_id'];
$contactID      = $data['contact_id'];
$c_account_key  = get_c_acc_key($agencyid);

$sp_airsEmaildelete = "EXEC SP_AddEditEMailInfo '$c_account_key', $contactID, '$contactemailId','Delete'";
$getAirsemail       = mssql_query($sp_airsEmaildelete);

$cmdtuples = mssql_rows_affected($connection);

echo json_encode(array(
    'status' => 'success',
    'response' => 'record(s) was deleted',
    'records' => $contactemailId
));


?>
