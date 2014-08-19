<?php
require_once("../../../userhome/\$ettings.php");
require_once($path["serloc"]."admin/command.php");
require_once($path["serloc"]."set_link.php");
require_once($path["serloc"]."admin/session.php");
require_once($path["serloc"]."users/phpfunctions.php");

$checkpermission = -1;
if(isset($_SESSION)){
    if(getCurrentUserType() == 'agency_user'){
    $caseWorkerSecurityVal = getCaseWorkerSecurityVal($login_social_user_id);
    if($caseWorkerSecurityVal == 5)
        $checkpermission = 1;
    }

    if($caseWorkerSecurityVal == 5){
    //$query  = "SELECT MenuName,HideYN from sysMenuSettings";    
        $query  = "Exec usp_sysMenuSettingsList";
        $result = mssql_query($query);
        if(mssql_num_rows($result) > 0){
            while($row = mssql_fetch_array($result))
                {
                $array['menusettings'][$row['MenuName']] = $row['HideYN'];
                }

            }

        $array['permissions'] = getAccessPermission() ;
        }
  }
$array['checkpermission'] = $checkpermission;
echo json_encode($array);
?>
