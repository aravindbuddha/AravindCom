<?php
include "connection.php";
 if(!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId'];

$c_account_key  = get_c_acc_key($agencyid);


echo json_encode(array(
    'status' => 'success',
    'response' => 'record(s) was deleted',
    'records' => "sucess"
));


?>
