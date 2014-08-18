<?php
include "connection.php";
header("Content-Type: application/json", true);
 if(!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId'];
	
$c_account_key = get_c_acc_key($agencyid);
$contactID     = $_GET['contactID'];

echo $sp_airsAddress = "EXEC SP_AddEditAddressInfo '$c_account_key', $contactID, default,'Get'";
$getAirsAddress = mssql_query($sp_airsAddress);

$arrValues = array();
$arrRows   = array();
if (mssql_num_rows($getAirsAddress) > 0) {
    $i = 0;
    while ($row = mssql_fetch_array($getAirsAddress)) {
        $getAirsAddressResult[$i] = $row;
        $i++;
    }
}

foreach ($getAirsAddressResult as $phinfo) {
    $arrValues = array();
    if ($phinfo['MailingAddress'] == 1)
        $is_MailingAddress = 'Yes';
    else {
        $is_MailingAddress = 'No';
    }
    $startDate = "";
    if ($phinfo['addstartdate']) {
        $stDate = explode(' ', $phinfo['addstartdate']);
        // print_r($stDate);
        
        $sDateMonth = dateFormatConversion($stDate[0]);
        if ($stDate[1] == "") {
            if (strlen($stDate[2]) == "1") {
                $dateSt = "0" . $stDate[2];
            } else {
                $dateSt = $stDate[2];
            }
            
            $startDate = $sDateMonth . "-" . $dateSt . "-" . $stDate[3];
            
            
            
        } else {
            
            if (strlen($stDate[1]) == "1") {
                $dateSt = "0" . $stDate[1];
            } else {
                $dateSt = $stDate[1];
            }
            $startDate = $sDateMonth . "-" . $dateSt . "-" . $stDate[2];
            
            
        }
        
        
        $startDate = ($startDate == '01-01-1900') ? "" : $startDate;
        
    }
    $leaveDate = "";
    if ($phinfo['addleavedate']) {
        $lvDate         = explode(' ', $phinfo['addleavedate']);
        //print_r($lvDate); echo "herererererer";
        $dateLeaveMonth = dateFormatConversion($lvDate[0]);
        
        if ($lvDate[1] == "") {
            if (strlen($lvDate[2]) == "1") {
                $dateld = "0" . $lvDate[2];
            } else {
                $dateld = $lvDate[2];
            }
            
            $leaveDate = $dateLeaveMonth . "-" . $dateld . "-" . $lvDate[3];
            
        } else {
            if (strlen($lvDate[1]) == "1") {
                $dateld = "0" . $lvDate[1];
            } else {
                $dateld = $lvDate[1];
            }
            
            $leaveDate = $dateLeaveMonth . "-" . $dateld . "-" . $lvDate[2];
        }
        
        $leaveDate = ($leaveDate == '01-01-1900') ? "" : $leaveDate;
    }
    array_push($arrValues, $phinfo['AddressType']);
    array_push($arrValues, $phinfo['Address1']);
    array_push($arrValues, $phinfo['Address2']);
    array_push($arrValues, $phinfo['city']);
    array_push($arrValues, $phinfo['StateName']);
    array_push($arrValues, $phinfo['zip']);
    array_push($arrValues, $phinfo['countyText']);
    array_push($arrValues, $phinfo['CountryText']);
    array_push($arrValues, $phinfo['AddressProvinceText']);
    array_push($arrValues, $is_MailingAddress);
    array_push($arrValues, $startDate);
    array_push($arrValues, $leaveDate);
    if ($phinfo['ContactEMail'] != ' ') {
        array_push($arrRows, array(
            'id' => $phinfo['AddressID'],
            'data' => $arrValues
        ));
        
    }
}

if (count($getAirsAddressResult) >= 0) {
    echo json_encode(array(
        'status' => 'success',
        'response' => 'data readed',
        'sql_statement' => $sp_airsEmail,
        'address' => array(
            'rows' => $arrRows
        )
    ));
} else {
    echo json_encode(array(
        'status' => 'err',
        'response' => 'Could not read the data from:' . $sp_airsEmail
    ));
}
?>

