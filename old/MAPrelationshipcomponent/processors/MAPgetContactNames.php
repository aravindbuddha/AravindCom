<?php
include "connection.php";
header("Content-Type: application/json", true);


	 if(!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId']; 
	

$c_account_key  =   get_c_acc_key($agencyid);


$contactid     = $_REQUEST['contactid'];
$ConnId1      = ($contactid *-1);
$dbname           =  getdb();


	
	$Edit_getContacts = "EXEC SP_getAllContactInfo $c_account_key,$contactid,'ALL'";
$Edit_getContacts = mssql_query($Edit_getContacts);
$row_getContacts  = mssql_fetch_array($Edit_getContacts);
$editUserDataFName            = trim($row_getContacts['FName']);
$editUserDataLName            = trim($row_getContacts['LName']);
$editUserDataBusName          = trim($row_getContacts['BusName']);

if($editUserDataFName =='' && $editUserDataLName == ''){
$Contact1Name1 = $editUserDataBusName ;
}else{
$Contact1Name1 = $editUserDataFName.' '.$editUserDataLName;
}


	$matrix['contact']['1'] = $Contact1Name1;
	echo json_encode($matrix)
?>
