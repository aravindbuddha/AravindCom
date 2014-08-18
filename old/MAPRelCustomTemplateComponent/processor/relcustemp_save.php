<?php
require_once("../../../userhome/\$ettings.php");
require_once($path["serloc"]."set_link.php");
require_once($path["serloc"]."admin/session.php");
require_once($path["serloc"]."admin/command.php");
require_once($path["serloc"]."users/phpfunctions.php");

$dbname           = getdb();

$logClassObj->setModule("Masterdata");
$logClassObj->setSubmodule("RelCustomTemplate");

$logClassObj->commonWriteLogInOne("\n##****************************ADD/EDIT/DELETE RelationshipSubType********************##","INFO");
$ids = explode(',',$_POST['ids']);

function escapechar($str){
    return str_replace("'","''",$str);	
    }
    
function add_row($id){ //added 2 new field (isdate and isfastfacts) by salini on 18/12/2012
        
        global $logClassObj,$dbname;
    
        $IsDate         =  $_POST[$id.'_c7'];
        $IsfastFact     =  $_POST[$id.'_c8'];
        $IsClientData   =  $_POST[$id.'_c9'];
        $sub_rel_id     =  $_POST[$id.'_c5'];
        $rel_id         =  $_POST[$id.'_c6'];
        $sequence       =  $_POST[$id.'_c2'];
        $customlabel    =  escapechar($_POST[$id.'_c3']);
        if($sequence    ==  'Enter Sequence')
            {$sequence      =   '';}
        if($rel_id      ==  '')
             {$rel_id      =   'NULL';}
	$qry_subtype_add=   "INSERT INTO  [$dbname].[dbo].[Rel_CustomTemplates] (RelationshipSubTypeId, RelationshipTypeId, Rel_CustomTemplateSeq, Rel_CustomTemplateLabel,Isdate, IsFastFact, IsClientData) VALUES ('$sub_rel_id',".$rel_id.",'$sequence','$customlabel','$IsDate','$IsfastFact','$IsClientData');  SELECT SCOPE_IDENTITY() AS ID;";
	$result = mssql_query($qry_subtype_add);	
        $last_inserted_id = mssql_result( $result, 0, 'ID' );
        
        $logClassObj->commonWriteLogInOne("Insert Query","INFO");
        $logClassObj->commonWriteLogInOne($qry_subtype_add,"INFO");
        return "inserted_".$last_inserted_id;
	
        }
function update_row($id){
      
        global $logClassObj,$dbname;     
  
        $relcustemp_id  =  $id;
        
        $IsDate         =  $_POST[$id.'_c7'];
        $IsfastFact     =  $_POST[$id.'_c8'];
        $IsClientData   =  $_POST[$id.'_c9'];
        $sub_rel_id     =  $_POST[$id.'_c5'];
        $rel_id         =  $_POST[$id.'_c6'];
        $sequence       =  $_POST[$id.'_c2'];
        $customlabel    =  escapechar($_POST[$id.'_c3']);
        if($sequence    ==  'Enter Sequence')
            {$sequence      =   '';}
        if($rel_id      ==  '')
            {$rel_id      =   'NULL';}
      
       $qry_update_subtype =  "UPDATE [$dbname].[dbo].[Rel_CustomTemplates] SET Isdate = '$IsDate' ,IsFastFact = '$IsfastFact' , IsClientData = '$IsClientData', RelationshipSubTypeId = '$sub_rel_id', RelationshipTypeId = ".$rel_id.", Rel_CustomTemplateSeq = '$sequence', Rel_CustomTemplateLabel = '$customlabel' where Rel_CustomTemplateId ='$relcustemp_id'";
       mssql_query($qry_update_subtype);
  
       $logClassObj->commonWriteLogInOne("Insert Query","INFO");
       $logClassObj->commonWriteLogInOne($qry_update_subtype,"INFO"); 
   return "updated";
    } 
    
    
function delete_row($id)
    {
    global $logClassObj,$dbname; 
    $action = false;
    $relcustemp_id = $id;
    $del_relcustemplate_qry = "DELETE from [$dbname].[dbo].[Rel_CustomTemplates] where Rel_CustomTemplateId = '$relcustemp_id'";
    if(mssql_query($del_relcustemplate_qry))
        {
        $action = true;
        }

    $logClassObj->commonWriteLogInOne("Delete Query","INFO");
    $logClassObj->commonWriteLogInOne($del_relcustemplate_qry,"INFO");  
    
    if($action)
    return "deleted";
    }
    
header("Content-type: text/xml");
echo('<?xml version="1.0" encoding="iso-8859-1"?>'); 
?>
<data> 
<?php
$delete_custemp   =  $_REQUEST['do'];

if ($delete_custemp == 1) {
    $action = 'delete';
    $id = $_REQUEST['id'];
    $newId = delete_row($id);
    ?>
    <action type='<?= $action ?>' sid='<?= $id ?>' tid='<?= $newId ?>' />    
    <?php
        }

else {
    foreach ($ids as $id) {
        $mode = $_POST[$id . "_!nativeeditor_status"];
        switch ($mode) {
            case "inserted":$newId = add_row($id);
                $action = 'insert';
                break;
            case "updated": $newId = update_row($id);
                $action = 'update';
                break;
            default: $newId = update_row($id);
                break;
        }
        ?>
        <action type='<?= $action ?>' sid='<?= $id ?>' tid='<?= $newId ?>' />    
        <?php
    }
}
    ?>
</data> 