<?php
include "connection.php";
 if(!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId'];

echo $contactID     = $_GET['contactID'];
$json_con->render_complex_sql("exec SP_AddEditAddressInfo '$c_account_key', $contactID, default,'Get'");

?>