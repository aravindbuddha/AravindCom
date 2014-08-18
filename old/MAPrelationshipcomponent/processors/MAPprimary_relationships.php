<?php
include "connection.php";
 if(!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId']; 
	

$c_account_key  =   get_c_acc_key($agencyid);

$npgrel = "EXEC SP_RelationshipSubTypeNPGM '$c_account_key',default,default,0";

$nprelob    = mssql_query($npgrel);
if(mssql_num_rows($nprelob)>0){
    while($nro  =  mssql_fetch_array($nprelob)){    
        $npgrelsubCouplarray[]=$nro;
        }
}

header ("content-type: text/xml");
echo '<?xml version="1.0" encoding="iso-8859-1"?>';
?>
<complete>
<?
if(sizeof($npgrelsubCouplarray)>0){    
foreach($npgrelsubCouplarray as $retptCoup){
        if($retptCoup['RelationshipSubTypeId'] !='-10'){
        ?>  
        <option value="<?php echo $retptCoup['RelationshipSubTypeId'] ?>"><?php echo $retptCoup['RelationshipSubTypeText'];?> </option>
        <?php   }
        }
    }

?>
</complete>