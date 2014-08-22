<?php


include "connection.php";

echo $data_base=$_REQUEST['data_base'];
mssql_select_db($data_base);


//print_r($_REQUEST);
if($_REQUEST['act']=="get"){

	$contactID = $_REQUEST['contact_id'];
	echo $sp_airsEmail = "EXEC USP_AddEditEMailInfo $contactID";
    //try{
  	$json->render_complex_sql($sp_airsEmail,"ContactEMailID");
    
	

}

if($_REQUEST['act']=="save"){
 $data=json_decode($_REQUEST['data'],true);
 $contact_id  = $data['contact_id'];
 $contactID       = intval($data['contact_id_email']);
 $emailID         = intval($data['email_id_hidden']);
$emailTypeStr    = intval($data['email_type']);
$contactEmailStr = $data['contact_email'];
$Emailmailing    = intval($data['email_mailing']);
 $sp_Email        = "EXEC USP_AddEditEMailInfo $contactID, '$emailID','Save',$emailTypeStr, '$contactEmailStr',  '$Emailmailing'";
 $json->render_complex_sql($sp_Email);
}

if($_REQUEST['act']=="del"){
 $data=json_decode($_REQUEST['data'],true);   
$contactemailId = $data['contact_email_id'];
$contactID      = $data['contact_id'];
$sp_airsEmaildelete = "EXEC USP_AddEditEMailInfo $contactID, '$contactemailId','Delete'";
 // $json->sql->query($sp_airsAddress);
 // echo $id = $json->sql->get_new_id();
 //echo $sp_airsAddress;
 $json->render_complex_sql($sp_airsEmaildelete);
}

 
 ?>