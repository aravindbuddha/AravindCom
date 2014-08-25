<?php
include "connection.php";
header("Content-Type: application/json", true);
/*ini_set('error_reporting',E_ALL);
ini_set('display_errors', 'On');*/
function get_c_acc_key($agencyID){

    $data_fetch          = "SELECT c_account_key FROM  user_agencies WHERE agency_id=$agencyID";
    $res_fetch           = mssql_query($data_fetch);
    $c_acc_key           = mssql_fetch_array($res_fetch);
    $c_account_keyDrop   = $c_acc_key['c_account_key'];
    return $c_account_keyDrop;
}



    $agencyid       =   $_POST['agencyid'];
	
$c_account_key = get_c_acc_key($agencyid);
$contactID     = $_POST['contactID'];


$sp_airsPhone = "EXEC SP_AddEditPhoneInfo '$c_account_key', $contactID, default,'Get'";
$getAirsPhone = mssql_query($sp_airsPhone);
$arrValues    = array();
$arrRows      = array();
if (mssql_num_rows($getAirsPhone) > 0) {
    $i = 0;
    while ($row = mssql_fetch_array($getAirsPhone)) {
        $getAirsPhoneResult[$i] = $row;
        $i++;
    }
}

foreach ($getAirsPhoneResult as $phinfo) {
    $arrValues = array();
    if ($phinfo[PrimaryPhone] == 1)
        $is_primary_phone = 'Yes';
    else {
        $is_primary_phone = 'No';
    }
	if($phinfo[Ext] == 0 or $phinfo[Ext] == ''){
	$phinfo[Ext] = '';
	}else{
	$phinfo[Ext] = $phinfo[Ext];
	}
    array_push($arrValues, $phinfo[PhoneType]);
    array_push($arrValues, $phinfo[PhoneNumber]);
    array_push($arrValues, $phinfo[Ext]);
    array_push($arrValues, $is_primary_phone);
    if ($phinfo[PhoneNumber] != ' ') {
        array_push($arrRows, array(
            'id' => $phinfo[ContactPhoneID],
            'data' => $arrValues
        ));
        
    }
}

if (count($getAirsPhoneResult) >= 0) {
    echo json_encode(array(
        'status' => 'success',
        'response' => 'data readed',
        'sql_statement' => $sp_airsPhone,
        'phone' => array(
            'rows' => $arrRows
        )
    ));
} else {
    echo json_encode(array(
        'status' => 'err',
        'response' => 'Could not read the data from:' . $sp_airsPhone
    ));
}
?>

