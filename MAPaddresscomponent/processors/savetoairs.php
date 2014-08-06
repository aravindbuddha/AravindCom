<?php
/**
 * C:\Users\msi1308\AppData\Roaming\Sublime Text 2\Packages/PhpTidy/phptidy-sublime-buffer.php
 *
 * @author Aravind Buddha <aravind.buddha@mediaus.com>
 * @package default
 */


include "connection.php";
header("Content-Type: application/json", true);

$contactID          = intval($_POST['contact_ID']);
$AddressId          = intval($_POST['address_ID']);
$AddressTypeId      = intval($_POST['address_type']);
$Address1           = $_POST['address_address1'];
$Address2           = $_POST['address_address2'];
$City               = $_POST['address_city'];
$StateId            = intval($_POST['address_state']);
$Zip                = $_POST['address_zip'];
$CountryId          = intval($_POST['address_country']);
$Countyid           = intval($_POST['address_County']);
$AddStartDate       = $_POST['address_start'];
$mailingAddress     = $_POST['mailing'];
$AddLeaveDate       = $_POST['address_leave'];
$AddressProvinceId  = intval($_POST['address_province']);
if (!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId'];

$c_account_key=   get_c_acc_key($agencyid);

if ($AddStartDate != '' && $AddStartDate != 'undefined') {
    $st_dt_exploded = explode('-', $AddStartDate);
    $AddStartDate      = $st_dt_exploded[2].'-'.$st_dt_exploded[0].'-'.$st_dt_exploded[1];
}
else {
    $AddStartDate      = "1900-01-01";
}

if ($AddLeaveDate != '' && $AddLeaveDate != 'undefined') {
    $st_dt_exploded = explode('-', $AddLeaveDate);
    $AddLeaveDate      = $st_dt_exploded[2].'-'.$st_dt_exploded[0].'-'.$st_dt_exploded[1];
}
else {
    $AddLeaveDate      = "1900-01-01";
}


if ($_POST['isimport'] == 'import') {
    $contactIDp1 = $_POST['contact_import'];
    $contactID = $_POST['contactid'];
    if ($contactIDp1 != 'undefined') {
        $hasaddress = mssql_query("EXEC SP_AddEditAddressInfo $c_account_key, $contactIDp1,'0','get'");
        $hasaddressrslt = mssql_fetch_array($hasaddress);

        $person2address = mssql_query("EXEC SP_AddEditAddressInfo $c_account_key, $contactID,'0','get'");
        $person2addressRslt = mssql_fetch_array($person2address);
        if ($hasaddressrslt && !$person2addressRslt) {
            $hascouple = 'yes';
        }
        else {
            $hascouple = 'no';
        }
    }
    else {
        $contactID1 = $_POST['contactid'];
        $connid1 = $contactID1*-1;
        $getcoupleconnid = mssql_query("select dbo.udf_CoupleContactId($connid1,1)");
        $coupleconnidRslt = mssql_fetch_array($getcoupleconnid);
        $contactID12 = $coupleconnidRslt[0];
        //$contactID13 = $contactID12*-1;
        if ($contactID1 != $contactID12) {
            $hasaddress = mssql_query("EXEC SP_AddEditAddressInfo $c_account_key, $contactID12,'0','get'");
            $hasaddressrslt = mssql_fetch_array($hasaddress);

            $person2address = mssql_query("EXEC SP_AddEditAddressInfo $c_account_key, $contactID1,'0','get'");
            $person2addressRslt = mssql_fetch_array($person2address);
            if ($hasaddressrslt && !$person2addressRslt) {
                $hascouple = 'yes';
            }
            else
                $hascouple = 'no';
        }
        else
            $hascouple = 'no';

    }

    /*  $contactID1 = $_POST['contact_import'];
                        $connid1 = $contactID1*-1;
                        $getcoupleconnid = mssql_query("select dbo.udf_CoupleContactId($connid1,1)");
                        $coupleconnidRslt = mssql_fetch_array($getcoupleconnid);
                        $contactID12 = $coupleconnidRslt[0];
                        //$contactID13 = $contactID12*-1;
                        If($contactID1 == $contactID12){
                            $getcoupleconnidiscouple = mssql_query("select dbo.udf_CoupleContactId($connid1,2)");
                            $iscoupleconnidRslt = mssql_fetch_array($getcoupleconnidiscouple);
                            $hascouple = $iscoupleconnidRslt[0];
                        }
                        else
                            $hascouple = $contactID12;
                     */


}

if ($_POST['import'] == "import_address") {
    $connid = $contactID*-1;
    //echo "EXEC SP_CoupleIds '$connid'";
       $getcoupleconnid = mssql_query("select dbo.udf_CoupleContactId($connid,1)");
       $coupleconnidRslt = mssql_fetch_array($getcoupleconnid);
                    $contactID12 = $coupleconnidRslt[0];
                    if($contactID12 == $contactID){
                        $getcoupleconnid1 = mssql_query("select dbo.udf_CoupleContactId($connid,2)");
                        $coupleconnidRslt1 = mssql_fetch_array($getcoupleconnid1);
                        $contactID1 = $coupleconnidRslt1[0];
                        $contactID = $contactID1;
                    }
                    else
                        $contactID = $contactID12;

                    
    $contactID = $_POST['contactIdPerson1'];
    $sp_airsAddress1 = "EXEC SP_AddEditAddressInfo $c_account_key, $contactID,'0','get'";
}
else {
    /*$getaddresscount    = mssql_query("SELECT AddressId FROM ContactAddress WHERE contactid= $contactID ");
                    $addresscountRslt   = mssql_fetch_array($getaddresscount);
                    $addressID          = $addresscountRslt[0];
                    $addresscount       = mssql_num_rows($getaddresscount);
                    if($addresscount ==1 && $AddressId != $addressID)
                        $mailingAddress = 1;*/
    $sp_airsAddress = "EXEC SP_AddEditAddressInfo $c_account_key, $contactID, '$AddressId','Save',$AddressTypeId, '$Address1', '$Address2', '$City', $StateId, '$Zip', $CountryId, $Countyid, '$AddStartDate', '$AddLeaveDate' , $mailingAddress, $AddressProvinceId";

}


if ($contactID != ''&& $c_account_key != '' && $_POST['isimport'] != 'import') {

    $AddressId_qry =  mssql_query($sp_airsAddress);
    if ($AddressId) {
        $addressids = $AddressId;
    }else {
        $added_addressid = mssql_fetch_array($AddressId_qry);
        $addressids= $added_addressid['0'];
    }
    if ($_POST['import'] == "import_address") {
        $AddressId_qry1 =  mssql_query($sp_airsAddress1);
        $added_addressid1 = mssql_fetch_array($AddressId_qry1);
        $AddressType = $added_addressid1['AddressTypeID'];
        $Address1 = $added_addressid1['Address1'];
        $Address2 = $added_addressid1['Address2'];
        $city = $added_addressid1['city'];
        $StateName = $added_addressid1['stateId'];
        $CountryText = $added_addressid1['countryId'];
        $addstartdate = $added_addressid1['addstartdate'];
        $year = explode( ' ', $addstartdate );
        if ($year['2'] == '1900' || $year['3'] == '1900')
            $addstartdate = '';
        else
            $addstartdate = $added_addressid1['addstartdate'];
        $addleavedate = $added_addressid1['addleavedate'];
        $year = explode( ' ', $addleavedate );
        if ($year['2'] == '1900' || $year['3'] == '1900')
            $addleavedate = '';
        else
            $addleavedate = $added_addressid1['addleavedate'];
        $primary_address = $added_addressid1['16'];
        $county = $added_addressid1['countyId'];
        $province = $added_addressid1['AddressProvinceID'];
        $address_zip = $added_addressid1['zip'];
        echo json_encode(array(
                'status' => 'imported',
                'AddressType' => $AddressType,
                'Address1'=>$Address1,
                'Address2'=>$Address2,
                'city'=>$city,
                'StateName'=>$StateName,
                'addstartdate'=>$addstartdate,
                'addleavedate'=>$addleavedate,
                'county'=>$county,
                'province'=>$province,
                'CountryText'=>$CountryText,
                'primary_address'=>$primary_address,
                'address_zip'=>$address_zip
            ));

    }
    else {
        echo json_encode(array(
                'status' => 'success',
                'response' => 'data stored',
                'sql' => $sp_airsAddress,
                'addid'=>$addressids,
                'count'=>$addresscount
            ));

    }
}
else if ($hascouple=='no' && $_POST['isimport'] == 'import') {
        echo json_encode(array(
                'status' => 'no_couple'
            ));
    }
else if ($hascouple=='yes' && $_POST['isimport'] == 'import') {
        echo json_encode(array(
                'status' => 'has_couple'
            ));
    }
else {
    echo json_encode(array('status' => 'err', 'response' => 'Could not read the data'.$sp_airsAddress ));
}

?>
