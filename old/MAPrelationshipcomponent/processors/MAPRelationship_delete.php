<?php
include "connection.php";
 if(!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId']; 
	

$c_account_key  =   get_c_acc_key($agencyid);
//@RelTypeID1 = '0' and @ConnID1 = 0 and @ConnID2 = 0 and @ConnectionId <> 0
    
    $relConnectionId   = $_POST["relConnectionId"];
    if(($relConnectionId) && ($relConnectionId !="") && ($relConnectionId !=0)){

     $sp_relSimpleDel1 = "EXEC SP_EditConnection '$c_account_key' ,$relConnectionId,'0','0','0'";//, '$dateFormatted'";
     mssql_query($sp_relSimpleDel1);  
    }
    

    
   
?>
