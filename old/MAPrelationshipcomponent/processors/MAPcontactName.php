<?php
include "connection.php";
 if(!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId']; 
	
$c_account_key  =   get_c_acc_key($agencyid);


$q = strtolower($_GET["q"]);
$q = str_replace("'","`",$q);
if (!$q) return;
$sql_get = "execute SP_DuplicateContactCheck @CAccountKey='$c_account_key',@strLName ='$q',@strFName = '$q'";
$resultfee = mssql_query($sql_get);
$x = 0;
if(mssql_num_rows($resultfee) == 0){
 echo "No Data|0|0|0|0|0\n";
}
while($datafee = mssql_fetch_array($resultfee))
    {
    $user_id    = "";
    $connid     = $datafee['ContactId']*-1;
    $userid_qry = "select user_id from user_accounts where Connid = '$connid'";
    $result     = mssql_query($userid_qry);
    if(mssql_num_rows($result) > 0)
        {
        $row        = mssql_fetch_array($result);
        $user_id    = $row['user_id'];
        }
    $fname = (trim($datafee['LName']))?$datafee['FName'].' '.$datafee['LName']:$datafee['FName'];
    $fname .= trim($datafee['SSN'])?' (ssn: '.substr($datafee['SSN'],-4,4) .')':'';
    $fname .= trim($datafee['PhoneNumber'])?' ('.$datafee['PhoneNumber'] .')':'';
    echo $fname."|".$datafee['ContactId']."|".$datafee['FName']."|".$datafee['LName']."|".$datafee['Gender']."|".$user_id."\n";
    }
?>