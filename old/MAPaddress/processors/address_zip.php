<?php
include "connection.php";
header("Content-Type: application/json", true);
$zip = $_POST['zip'];
$logClassObj->setModule("Addresscomponent");
$logClassObj->setSubmodule("queries");
if($zip){
    $sql = "SELECT Zip FROM lkpCountyZip WHERE Zip ='".$zip."'";
    $zipsql = mssql_query($sql);
    $rowzip = mssql_fetch_array($zipsql);
    $logClassObj->commonWriteLogInOne("Select zip Query : $sql ","INFO");
}
if(!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId'];
 
if($rowzip){
$sql = "  SELECT
                S.StateID,
                 S.StateName
          FROM lkpState S JOIN lkpCountyZip C
          ON S.StateAbbreviation = C.State
          WHERE C.Zip = '".$zip."'";
  
$resstatezip = mssql_query($sql);
$rowstatezip=mssql_fetch_array($resstatezip);

$countySql = "SELECT
              County,
              CountyID
        FROM lkpCountyZip 
        WHERE Zip = '".$zip."'";

$rescountyzip = mssql_query($countySql);
$rowcountyzip=mssql_fetch_array($rescountyzip);

$logClassObj->commonWriteLogInOne("State based on zip Query : $sql ","INFO");
$logClassObj->commonWriteLogInOne("County based on zip Query : $countySql ","INFO");

echo json_encode(array(
        'status' => 'success',
        'stateName' => $rowstatezip['StateName'],
        'stateId' => $rowstatezip['StateID'],
        'countyName' => $rowcountyzip['County'],
        'countyId' => $rowcountyzip['CountyID']
    ));

}
else
    echo json_encode(array(
        'status' => 'fail'
    ));
?>
