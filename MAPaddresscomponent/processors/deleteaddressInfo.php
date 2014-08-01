<?php
include "connection.php";
 if(!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId'];
	

$contactaddressId                =   $_POST['contactaddressId'];
$contactID              =   $_POST['contactId'];
$c_account_key          =   get_c_acc_key($agencyid);

$sp_airsAddressDelete = "EXEC SP_AddEditAddressInfo '$c_account_key', $contactID, $contactaddressId,'Delete'";
$getAirsaddress          =  mssql_query ($sp_airsAddressDelete);


	echo json_encode(array(
		'status' => 'success', 
		'response' => 'record(s) was deleted', 
		'records' => $contactemailId
	));


?>
