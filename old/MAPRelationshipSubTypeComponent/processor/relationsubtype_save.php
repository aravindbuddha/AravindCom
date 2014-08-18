<?php
require_once("../../../userhome/\$ettings.php");
require_once($path["serloc"]."set_link.php");
require_once($path["serloc"]."admin/session.php");
require_once($path["serloc"]."admin/command.php");
require_once($path["serloc"]."users/phpfunctions.php");
require_once($path["serloc"]."airs/webservice/services.php");
if(!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId'];

$c_account_key  = get_c_acc_key($agencyid);

$logClassObj->setModule("Masterdata");
$logClassObj->setSubmodule("RelationshipSubType");

$logClassObj->commonWriteLogInOne("\n##****************************ADD/EDIT/DELETE RelationshipSubType********************##","INFO");
$ids = explode(',',$_POST['ids']);



function insertProgram($id)
    {
    global $logClassObj,$dbname,$c_account_key;

    $rel_name       =   $_POST[$id.'_c0'];  
    $abbreviation   =   substr($_POST[$id.'_c1'],0,6);
    $assocProgramId =   $_POST[$id.'_c2'];
    if($assocProgramId=='')
        $assocProgramId = '-999';
    $isProgram      =   $_POST[$id.'_c3'];
    $sequence       =   $_POST[$id.'_c4'];
    $showhide       =   $_POST[$id.'_c5'];
    $isMultiConnect =   $_POST[$id.'_c6'];
    $hideInHome     =   $_POST[$id.'_c8'];
	

    $qry_subtype_add    ="EXEC SP_Rel_lkp_RelationshipSubType '$c_account_key','Insert',0,'$rel_name',1,'$sequence','$showhide','$isProgram','$isMultiConnect','$abbreviation','$assocProgramId','$hideInHome'";
    mssql_query($qry_subtype_add);    

    $logClassObj->commonWriteLogInOne("Insert Query","INFO");
    $logClassObj->commonWriteLogInOne($qry_subtype_add,"INFO");   

    return "insert";  
    }

function updateProgram($id)
    {
    global $logClassObj,$dbname,$c_account_key;

    $rel_name       =   $_POST[$id.'_c0'];
    $abbreviation   =   substr($_POST[$id.'_c1'],0,6);
    $assocProgramId =   $_POST[$id.'_c2'];
    $isProgram      =   $_POST[$id.'_c3'];
    $sequence       =   $_POST[$id.'_c4'];
    $showhide       =   $_POST[$id.'_c5'];
    $subtypeid      =   $_POST[$id.'_c7'];
    $isMultiConnect =   $_POST[$id.'_c6'];
    $hideInHome     =   $_POST[$id.'_c8'];

    $qry_update_subtype =   "EXEC SP_Rel_lkp_RelationshipSubType '$c_account_key','Update',$subtypeid,'$rel_name',0,$sequence,$showhide,$isProgram,$isMultiConnect,'$abbreviation','$assocProgramId','$hideInHome'";    
    mssql_query($qry_update_subtype);
   
    $logClassObj->commonWriteLogInOne("Update Query","INFO");
    $logClassObj->commonWriteLogInOne($qry_update_subtype,"INFO");  

    return "update";
    }

header("Content-type: text/xml");
echo('<?xml version="1.0" encoding="iso-8859-1"?>');                                                                                                                                                    ?>
<data>                                                                                                                                                                                                  <?php
    foreach ($ids as $id) 
    {
        $mode = $_POST[$id."_!nativeeditor_status"];
        switch($mode)
        {
            case "inserted":$newId = insertProgram($id);
                            $action = 'insert';
                            break;
            case "updated": $newId =  updateProgram($id);
                            $action = 'update';
                            break;
            default:        $newId = updateProgram($id);
                            break;
        }                                                                                                                                                                                               ?>
        <action type='<?=$action?>' sid='<?=$id?>' tid='<?=$newId?>' />                                                                                                                                 <?php
    }                                                                                                                                                                                                   ?>
</data>                                                                                                                                                                                                 <?php
?>
