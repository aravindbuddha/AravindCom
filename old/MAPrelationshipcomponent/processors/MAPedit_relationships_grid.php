<?php
include "connection.php";
header("Content-Type: application/json", true);
/*ini_set('error_reporting',E_ALL);
ini_set('display_errors', 'On');*/
 if(!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId']; 
	

$c_account_key    =   get_c_acc_key($agencyid);

$contactid     = $_POST['contactid'];
$connection_id1 = $_POST['relConnectionId1'];
$ActualGrpId     = $_POST['ActualGrpId'];

$relConnId = $_POST['relConnId']*-1;
//$relConnId = $_POST['relConnId'];
$IndConnId = $_POST['IndConnId'];
$ConnId1      = ($contactid *-1);
$dbname           =  getdb();



        
   $qry    = "exec SP_RelationshipGridList '$c_account_key','$IndConnId',''";//,@strLName ='$q',@strFName = '$q'";

    $qry_obj  = mssql_query($qry);




$i=0;
$output='';
while($result = mssql_fetch_array($qry_obj))
    {  
    $RelConnId              = $result['ConnId'];
    $ConnectionId1          = $result['ConnectionId1'];

   
    $RelContactName         = getContactName($c_account_key, ($relConnId*-1), '0');
    $tabRelContactName      = "'".$RelContactName."'";
$i++;

$start_date1 = $result['RelStartDate1'] != '' ?  $result['RelStartDate1'] : '';
$end_date1 = $result['RelEndDate1'] != '' ?  $result['RelEndDate1'] : '';

$start_date1 = $start_date1 == '01-01-1900' ? 'NoDate' : $start_date1;
$end_date1 = ($end_date1 == '01-01-1900' || $end_date1 == '' )? 'NoDate' : $end_date1;
$matrix['details']['RelContactName'] = stripslashes($RelContactName);
$matrix['details']['RelationshipSubTypeText'] = $result['RelationshipSubTypeText'];
$matrix['details']['RelTypeText1'] = $result['RelTypeText1'];
$matrix['details']['RelationshipSubTypeId'] = $result['RelationshipSubTypeId'];
$matrix['details']['RelTypeid1'] = $result['RelTypeid1'];
$matrix['details']['RelConnId'] = $RelConnId;
$matrix['details']['ConnectionId1'] = $result['ConnectionId1'];
$matrix['details']['start_date1'] = $start_date1;
$matrix['details']['end_date1'] = $end_date1;


}

	echo json_encode($matrix);

?>


