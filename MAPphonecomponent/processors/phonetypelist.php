<?php
include "connection.php";
/*ini_set('error_reporting',E_ALL);
ini_set('display_errors', 'On');*/
function get_c_acc_key($agencyID){

    $data_fetch          = "SELECT c_account_key FROM  user_agencies WHERE agency_id=$agencyID";
    $res_fetch           = mssql_query($data_fetch);
    $c_acc_key           = mssql_fetch_array($res_fetch);
    $c_account_keyDrop   = $c_acc_key['c_account_key'];
    return $c_account_keyDrop;
}

header("content-type: text/xml");
echo '<?xml version="1.0" encoding="iso-8859-1"?><complete>';

    $agencyid       =   $_GET['agencyId']; 
	
$c_account_key = get_c_acc_key($agencyid);

$qrylkpPhoneType     = "EXEC SP_lkpPhoneType $c_account_key,'List'";
$reslkpPhoneType     = mssql_query($qrylkpPhoneType);
$count_PhoneType_rec = mssql_num_rows($reslkpPhoneType);
$i                   = 0;
$id= $_REQUEST['id'];
while ($rowPhone = mssql_fetch_array($reslkpPhoneType)) {
if($id == $rowPhone['PhoneType']){
$select = 'selected="selected"';
}else{
$select ='';
}
?>
<option value="<?php echo $rowPhone['PhoneTypeID'];?>" <?php echo $select;?> ><?php    echo $rowPhone['PhoneType'];?></option>
<?php
}
?>
</complete>