<?php
require_once("../../../userhome/\$ettings.php");
require_once($path["serloc"] . "set_link.php");
require_once($path["serloc"] . "admin/session.php");
require_once($path["serloc"] . "admin/command.php");
require_once($path["serloc"] . "users/phpfunctions.php");

if(!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId']; 	

$c_account_key  =   get_c_acc_key($agencyid);

$logClassObj->setModule("client");
$logClassObj->setSubmodule("matchingform_relationship");

if($_POST['data_type'] == 'rel_add_info'){
  
   
   $rel_contactid = $_POST['rel_contactid'];
   
   if($_POST['rel_type_of_child'] ){  
    $extra_info_rec_id = $_POST['extra_info_rec_id'];
    $rel_type_of_child = $_POST['rel_type_of_child'];
   
    $qry_rel_add_info = " EXEC USP_AddEditContactExtra '$rel_contactid','$extra_info_rec_id','$rel_type_of_child',0";                
    $qryobj_rel_add_info = mssql_query($qry_rel_add_info);  
    
  //  $msg = mssql_get_last_message();

    $logClassObj->commonWriteLogInOne(date('m/d/Y H:i:s')."##################### Matching Forms Relationships -Add/Edit (Personal - Chldren In home) Additional Info -Type of Child ##########################","INFO");        
    $logClassObj->commonWriteLogInOne(date('H:i:s')." List Query : $qry_rel_add_info ","INFO");
    $logClassObj->commonWriteLogInOne(date('H:i:s')." Error Msg : $msg ","INFO");
  
   }
   
  if($_POST['rel_ethnicities'])
        {
        $ethnicity_rec_id = $_POST['ethnicity_rec_id'];
        $rel_ethnicities = $_POST['rel_ethnicities'] ;
        $rel_ethnicity_ids = explode(",",$rel_ethnicities);
        //delete existing ethnicites
        $qry_del_ethnicity    =   "delete from ContactEthnicity where ContactId = '$rel_contactid'";                    
        mssql_query($qry_del_ethnicity);

        //insert
        foreach ($rel_ethnicity_ids as $ethnicity_id) {
                $qry_ethnicity    =   "EXEC SP_AddEditEthnicityInfo '$c_account_key', '$rel_contactid', '$ethnicity_rec_id','Save', '$ethnicity_id'";                    
                mssql_query($qry_ethnicity);
             //   $msg = mssql_get_last_message();
                $logClassObj->commonWriteLogInOne(date('m/d/Y H:i:s')."##################### Matching Forms Relationships -Add/Edit (Personal - Chldren In home) Additional Info -Ethnicities ##########################","INFO");        
                $logClassObj->commonWriteLogInOne(date('H:i:s')." List Query : $qry_ethnicity ","INFO");
                $logClassObj->commonWriteLogInOne(date('H:i:s')." Error Msg : $msg ","INFO");
                } 
        }
     
}
else{ 
    $rel_sub_type_id = $_POST['rel_sub_type_id'];
    $rel_type_id =  $_POST['rel_type_id'];
    $start_date = $_POST['start_date'];
    $parent_connid = $_POST['parent_connid'];
    $rel_connid = $_POST['rel_connid'];
    $rel_contactid = $rel_connid * -1;
    $old_rel_connid = $_POST['old_rel_connid'];
    $rel_connectionid = $_POST['rel_connectionid'];
//    $extra_info_rec_id = $_POST['extra_info_rec_id'];
//    $ethnicity_rec_id = $_POST['ethnicity_rec_id'];
    $action = $_POST['action'];


    switch($action){
        case 'insert':

            if(($rel_connid)&&($rel_connid !="") &&($rel_connid !="0") && ($parent_connid)&&($parent_connid !="")&&($parent_connid !="0") &&($rel_type_id)&&($rel_type_id !=""))
                {
                $qry_rel_simple_add = "EXEC SP_ReltionshipSimpleAdd '$c_account_key', '$parent_connid', '$rel_connid','$rel_type_id','$start_date','$end_date'";//, '$dateFormatted'";                
                $qryobj_relsimpleadd = mssql_query($qry_rel_simple_add);  

                $logClassObj->commonWriteLogInOne(date('m/d/Y H:i:s')."##################### Matching Forms Relationships -Insert (Personal - Chldren In home) ##########################","INFO");        
                $logClassObj->commonWriteLogInOne(date('H:i:s')." List Query : $qry_rel_simple_add ","INFO");


                $res_relsimpleadd = mssql_fetch_array($qryobj_relsimpleadd);
                $return_connectionId =  $res_relsimpleadd['ConnectionIdOut'];
                mssql_free_result($qryobj_relsimpleadd);
                }

            break;

        case 'update':

            //update relationship  if there is a connection id 
            if(($rel_connid)&&($rel_connid !="") &&($rel_connid !="0") && ($rel_connid != $old_rel_connid) && ($parent_connid)&&($parent_connid !="") && ($parent_connid !="0") &&($rel_type_id)&&($rel_type_id !="")&& ($rel_connectionid) && ($rel_connectionid !="") && ($rel_connectionid !=0)){
                $sp_rel_simple_edit = "EXEC SP_EditConnection '$c_account_key',$rel_connectionid,$rel_connid,$rel_type_id,$parent_connid,'$start_date','$end_date'";//, '$dateFormatted'";
                mssql_query($sp_rel_simple_edit); 


                $sp_rel_simple_del = "EXEC SP_EditConnection '$c_account_key' ,$rel_connectionid,'0','0','0'";
                mssql_query($sp_rel_simple_del);  

                $logClassObj->commonWriteLogInOne(date('m/d/Y H:i:s')."##################### Matching Forms Relationships -Update (& Delete) (Personal - Chldren In home) ##########################","INFO");        
                $logClassObj->commonWriteLogInOne(date('H:i:s')." List Query : $sp_rel_simple_edit ","INFO");
                $logClassObj->commonWriteLogInOne(date('H:i:s')." List Query : $sp_rel_simple_del ","INFO");
                }  
            break;

        case 'delete' :

                $sp_rel_simple_del = "EXEC SP_EditConnection '$c_account_key' ,$rel_connectionid,'0','0','0'";
                mssql_query($sp_rel_simple_del);  

                $logClassObj->commonWriteLogInOne(date('m/d/Y H:i:s')."##################### Matching Forms Relationships - Delete (Personal - Chldren In home) ##########################","INFO");               
                $logClassObj->commonWriteLogInOne(date('H:i:s')." List Query : $sp_rel_simple_del ","INFO");
                
//                $qry_rel_add_info = " EXEC USP_AddEditContactExtra '$rel_contactid','$extra_info_rec_id','',1";                
//                $qryobj_rel_add_info = mssql_query($qry_rel_add_info); 
//                
//                $qry_ethnicity    =   "EXEC SP_AddEditEthnicityInfo '$c_account_key', $rel_contactid, '$ethnicity_rec_id','Delete'";                    
//                mssql_query($qry_ethnicity);

            break;

    }
}


if ($mssql_msg) 
{ 
    echo json_encode(array('status' => 'err', 'response' => 'Error message: ' . $mssql_msg));
    
}
else
{
    echo json_encode(array(
                    'status' => 'success', 
                    'response' => 'Saved Successfully'
            )); 
}
?>