<?php
include "connection.php";
header("Content-Type: application/json", true);

 if(!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId']; 
	
	

$c_account_key  =   get_c_acc_key($agencyid);
                    if((string)$agencyIDs == '')
                    {
                        if($current_user_type == 'agency')
                        {
                                $agencyId = $login_social_user_id;

                        }
                        else
                        {
                                $agselectquery = "SELECT agency_group FROM user_accounts WHERE user_id = $login_social_user_id";
                                $agresult = mssql_query($agselectquery);
                                while($rowag = mssql_fetch_array($agresult))
                                {
                                        $agencyId = $rowag[0];
                                }

                        }
                    }

    
function add_row($c_account_key,$rowId='',$ConnId1,$ConnId2){
    $return_arr         = array();
    $connId1            = $ConnId1;
    $connId2            = $ConnId2;
$session_logged_user_id = $_SESSION['session_logged_user_id'];    
    $relconnId          = $_POST['relConnId'];
    $relationTypeId1    = $_POST['relationTypeId1'];
    if($relconnId < 0 )
        $relcontactid = $relconnId * -1;
    else
        $relcontactid = $relconnId;   
    
    $start_date_str1 = split("-",$_POST['startdate_1']);
    $end_date_str1 = split("-",$_POST['enddate_1']);
    
    $start_date1 = $start_date_str1[2]."-".$start_date_str1[0]."-".$start_date_str1[1];
    $end_date1 = $end_date_str1[2]."-".$end_date_str1[0]."-".$end_date_str1[1];
      
     if( $end_date1 == '--'){ // no date value
        $end_date1 = '';
    }
if( $_POST['contacttype'] == 1){
   echo  $sql = "EXEC usp_AddPrimaryContacts ".($_POST['connectionId']*-1).",".($relcontactid).",$relationTypeId1 ,".$_POST['defaultrelation'].",$session_logged_user_id";
	mssql_query($sql);
	}
	
    if(($relconnId)&&($relconnId !="") &&($relconnId !="0"))
        {
    
        if(($connId1)&&($connId1 !="")&&($connId1 !="0")&&($relationTypeId1)&&($relationTypeId1 !="")&&($relationTypeId1 !="None")){
            

        echo    $sp_relSimpleAdd1 = "EXEC SP_ReltionshipSimpleAdd '$c_account_key', $connId1, $relconnId,$relationTypeId1,'$start_date1','$end_date1'";//, '$dateFormatted'";
            //$sp_relSimpleAdd1 = "EXEC SP_ReltionshipSimpleAdd '$c_account_key', $connId1, $relconnId,$relationTypeId1";
            $qryobj = mssql_query($sp_relSimpleAdd1);  
            $qryres = mssql_fetch_array($qryobj);
            $connectionId1 =  $qryres['ConnectionIdOut'];
            mssql_free_result($qryobj);
            }


        } 
     
    $return_arr[0] =  "inserted";   
    $return_arr[1] =  $connectionId1;   
    

  
return $return_arr;
    
}
function update_row($c_account_key,$rowId='',$ConnId1,$ConnId2){ 
    global $path,$logClassObjRelData;
    
    $connId1            = $ConnId1;   
    
    $session_logged_user_id = $_SESSION['session_logged_user_id']; 
    $relConnectionId1   = $_POST['relConnectionId1'];    
   
    $relconnId          = $_POST['relConnId'];    
    
     if($relconnId < 0 )
        $relcontactid = $relconnId * -1;
    else
        $relcontactid = $relconnId;
    
    $relationTypeId1    = is_numeric($_POST['relationTypeId1']) ? $_POST['relationTypeId1'] : $_POST['hRelationTypeId1']; 
    
    
    
    $start_date_str1 = split("-",$_POST['startdate_1']);
    $end_date_str1 = split("-",$_POST['enddate_1']);
    
    
    
    $start_date1 = $start_date_str1[2]."-".$start_date_str1[0]."-".$start_date_str1[1];
    
    $end_date1 = $end_date_str1[2]."-".$end_date_str1[0]."-".$end_date_str1[1];
    
    if( $end_date1 == '--'){ // no date value
        $end_date1 = '';
    }

  if( $_POST['contacttype'] == 1){
   echo $sql = "EXEC usp_AddPrimaryContacts ".($_POST['connectionId']*-1).",".($relcontactid).",$relationTypeId1 ,".$_POST['defaultrelation'].",$session_logged_user_id";
	mssql_query($sql);
	}  
    
    if($relConnectionId1 == "0") $relConnectionId1 = '';
    
    if(($relconnId)&&($relconnId !="") &&($relconnId !="0"))
        { 
         //update relationship  if there is a connection id 
        if(($connId1)&&($connId1 !="") && ($connId1 !="0") &&($relationTypeId1)&&($relationTypeId1 !="")&&($relationTypeId1 !="None")&& ($relConnectionId1) && ($relConnectionId1 !="") && ($relConnectionId1 !=0)){
            $sp_relSimpleUpdate1 = "EXEC SP_EditConnection '$c_account_key',$relConnectionId1,$relconnId,$relationTypeId1,$connId1,'$start_date1','$end_date1'";//, '$dateFormatted'";
            mssql_query($sp_relSimpleUpdate1);  echo $sp_relSimpleUpdate1;
            }


            
            
        //add relationship if a secondary relationship type had never been created before for one of the couple ;because then there wouldn't be a connection id to update  
        if(($connId1)&&($connId1 !="") && ($connId1 !="0") &&($relationTypeId1)&&($relationTypeId1 !="")&&($relationTypeId1 !="None")  && !($relConnectionId1) && ($relConnectionId1 =="")){

            $sp_relSimpleAdd1 = "EXEC SP_ReltionshipSimpleAdd '$c_account_key', $connId1, $relconnId,$relationTypeId1,'$start_date1','$end_date1'";//, '$dateFormatted'";
            mssql_query($sp_relSimpleAdd1);  echo $sp_relSimpleAdd1;
            }
        
              
        }    
        
        
    //delete relationship
    
    if(($connId1)&&($connId1 !="") &&($relconnId)&&($relconnId !="")  && ($relationTypeId1 =="None") && ($relConnectionId1) && ($relConnectionId1 !="") && ($relConnectionId1 !=0)){

        $sp_relSimpleDel1 = "EXEC SP_EditConnection '$c_account_key' ,$relConnectionId1,'0','0','0'";//, '$dateFormatted'";
        mssql_query($sp_relSimpleDel1);   
        }
    
  
    return "updated";
  
}
header("Content-type: text/xml");
//encoding may differ in your case
echo('<?xml version="1.0" encoding="iso-8859-1"?>'); 
echo "<data>";
$id     = $_POST['ids'];
if($id) 
    $id = $id."_";
//$mode   = $_POST[$id."!nativeeditor_status"]; //get request mode
$mode = $_POST['relAction'];
$rowId  = $id ; //id or row which was updated 
$action = array();


 if(!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId']; 
	

$c_account_key  =   get_c_acc_key($agencyid);

$connectionId     = $_REQUEST['connectionId'];

$dbname           =  getdb();

$qry    = "Select ([$dbname].dbo.udf_CoupleConnId('$connectionId','1'))  as  ConnId1";

    
$qry_obj  = mssql_query($qry);
$result    = mssql_fetch_array($qry_obj);
$ConnId1    = $result['ConnId1'];


$qry    = "Select ([$dbname].dbo.udf_CoupleConnId('$connectionId','2'))  as  ConnId2";

$qry_obj  = mssql_query($qry);
$result    = mssql_fetch_array($qry_obj);
$ConnId2    = $result['ConnId2'];

//$mode = "inserted";

switch($mode){
	    
      case "inserted":
		//row adding request
            $action = add_row($c_account_key,$rowId,$_REQUEST['connectionId'],$ConnId2);
		
       break;
    
       case "updated":
            
            $action = update_row($c_account_key,$rowId,$_REQUEST['connectionId'],$ConnId2);
       
       break;
     
       default:
		//insert request
                if((($ConnId1)&&($ConnId1 !="")&& ($ConnId1 !="0")) ||  (($ConnId2)&&($ConnId2 !="")&& ($ConnId2 !="0")))
		$action = add_row($c_account_key,$rowId,$ConnId1,$ConnId2);
       break;
       }

//output update results
if(!$rowId ) $rowId = $_POST['gr_id'];
echo "<action type='".$action[0]."' sid='".$rowId."' returnConnectionId1 ='".$action[1]."' returnConnectionId2 ='".$action[2]."' />";
echo "</data>";

    
?>