<?php
include "connection.php";

 if(!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId']; 
	
$c_account_key  =   get_c_acc_key($agencyid);


$relTypeId      =   $_REQUEST['primary_rel_id'];
$sp_relTypeAll  =   "EXEC SP_RelationshipTypeALL '$c_account_key', 'List', '','', $relTypeId,'','','','','','','','',0";
$getRelTypeAll  =   mssql_query ($sp_relTypeAll);

header ("content-type: text/xml");
echo '<?xml version="1.0" encoding="iso-8859-1"?>';
?>
<complete>
<?
if(mssql_num_rows($getRelTypeAll) > 0){ ?>         
         
          <?php      
          while($row = mssql_fetch_array($getRelTypeAll)){ // print_r($row);          
          ?>
            <option value="<?php echo $row['RelationshipTypeId'];?>"><?php echo $row['RelationshipTypeText']?> </option>
        <?php
         }
     }
?>
</complete>
