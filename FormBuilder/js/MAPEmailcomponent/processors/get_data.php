<?php
include "connection.php";
function get_c_acc_key($agencyID){

    $data_fetch          = "SELECT c_account_key FROM  user_agencies WHERE agency_id=$agencyID";
    $res_fetch           = mssql_query($data_fetch);
    $c_acc_key           = mssql_fetch_array($res_fetch);
    $c_account_keyDrop   = $c_acc_key['c_account_key'];
    return $c_account_keyDrop;
}

header("Content-Type: application/json", true);

    $agencyid       =   $_POST['agencyid'];
	
$c_account_key = get_c_acc_key($agencyid);
$contactID     = $_POST['contactID'];


$sp_airsEmail = "EXEC SP_AddEditEMailInfo @CAccountKey = '$c_account_key', @Contactid = '$contactID', @CAFunction = 'Get'";
$getAirsEmail = mssql_query($sp_airsEmail);
$arrValues    = array();
$arrRows      = array();
if (mssql_num_rows($getAirsEmail) > 0) {
    $i = 0;
    while ($row = mssql_fetch_array($getAirsEmail)) {
        $getAirsEmailResult[$i] = $row;
        $i++;
    }
}

foreach ($getAirsEmailResult as $phinfo) {
    $arrValues = array();
    if ($phinfo['PrimaryEMail'] == 1)
        $is_primary_phone = 'Yes';
    else {
        $is_primary_phone = 'No';
    }
    array_push($arrValues, $phinfo['ContactEMail']);
    array_push($arrValues, $is_primary_phone);
    array_push($arrValues, $phinfo['EMailType']);
    if ($phinfo['ContactEMail'] != ' ') {
        array_push($arrRows, array(
            'id' => $phinfo['ContactEMailID'],
            'data' => $arrValues
        ));
        
    }
}

if (count($getAirsEmailResult) >= 0) {
    echo json_encode(array(
        'status' => 'success',
        'response' => 'data readed',
        'sql_statement' => $sp_airsEmail,
        'email' => array(
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

