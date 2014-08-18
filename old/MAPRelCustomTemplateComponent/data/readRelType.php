<?php
 /****************************************************************************************
 *      Name                        : readRelType                         *
 *      created by                  : Anju                                              *
 *      date                        : 03/13/2011                                        *
 *      purpose                     : run SP to get Relationship   Type based on Sub Types            *
 ****************************************************************************************/
require_once("../../../userhome/\$ettings.php");
require_once($path["serloc"]."admin/command.php");
require_once($path["serloc"]."set_link.php");
require_once($path["serloc"]."admin/session.php");
require_once($path["serloc"]."users/phpfunctions.php");


if(!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId'];

$c_account_key  = get_c_acc_key($agencyid);


$relationsubtypeid  = $_POST["relationsubtypeid"];
$reltypeqry         = "Exec SP_Rel_lkp_RelationshipType '$c_account_key','List','','','$relationsubtypeid'";
$reltyperes         = mssql_query($reltypeqry);
$rowMainRelationType['count'] = mssql_num_rows($reltyperes);
if(mssql_num_rows($reltyperes) > 0)
    {
    $i=1;
    while ($retyperow = mssql_fetch_array($reltyperes)) {
       $rowMainRelationType[$i]['value']  =  $retyperow["RelationshipTypeId"];
       $rowMainRelationType[$i]['text']   = $retyperow["RelationshipTypeText"];
       $i++;
    }
   
}
 echo json_encode($rowMainRelationType);?>