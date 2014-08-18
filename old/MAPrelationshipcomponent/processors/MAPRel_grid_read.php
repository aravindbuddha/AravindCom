<?php
require_once("../../../userhome/\$ettings.php");
require_once($path["serloc"] . "set_link.php");
require_once($path["serloc"] . "admin/session.php");
require_once($path["serloc"] . "admin/command.php");
require_once($path["serloc"] . "users/phpfunctions.php");

 if(!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId']; 
	
$c_account_key  =   get_c_acc_key($agencyid);

$logClassObj->setModule("client");
$logClassObj->setSubmodule("matchingform_relationship");

$parent_connid  = $_REQUEST['parent_connid'];

function convertdate($date){
    $date = str_replace(' 12:00:00:000AM', '', $date);
    $date = str_replace(' 12:00AM', '', $date);
  
    if($date == 'Jan 1 1900' ||  $date == 'Jan  1 1900'){
        $date = ''; 
    }
    else{
        $date = strtotime($date);       
        $date = date('m-d-Y', $date);
    }
    return $date ; 
}

$setansi = 'SET ANSI_NULLS ON SET ANSI_PADDING ON SET QUOTED_IDENTIFIER ON SET ANSI_WARNINGS ON SET CONCAT_NULL_YIELDS_NULL ON SET ARITHABORT ON SET ANSI_NULL_DFLT_ON ON';     
$qry = "$setansi EXEC USP_ListChildInHome '$parent_connid'";
$qry_obj  = mssql_query($qry);
$count = mssql_num_rows($qry_obj);

if($count > 0){
    $attachHeader = "#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter";
}
else{
     $attachHeader = "#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan";
}
//$msg = mssql_get_last_message();
$logClassObj->commonWriteLogInOne(date('m/d/Y H:i:s')."##################### Matching Forms Relationships List (Personal - Chldren In home) ##########################","INFO");        
$logClassObj->commonWriteLogInOne(date('H:i:s')." List Query : $qry ","INFO");
$logClassObj->commonWriteLogInOne(date('H:i:s')." Error msg : $msg ","INFO");

header ("content-type: text/xml");
echo '<?xml version="1.0" encoding="iso-8859-1"?><rows>';
?><head> 
        <column width="195" type="ro" align="left" sort="str" cache="true"> Name</column> 
        <column width="115" type="ro" align="left" sort="str">DOB</column> 
        <column width="100" type="ro"  align="left" sort="str">Gender</column> 
        <column width="140" type="ro" align="left" sort="str" >Ethnicities</column>
        <column width="110" type="ro"  align="left" sort="str">Bio-Adopt</column>
        <column width="0" type="ro" align="center" sort="str" hidden="true">RelConnId </column>
        <column width="0" type="ro" align="center" sort="str" hidden="true">RelConnectionId </column>
        <column width="0" type="ro" align="center" sort="str" hidden="true">EthnicityId </column>
        <column width="0" type="ro" align="center" sort="str" hidden="true">ContactExtraId </column>
        <afterInit>
            <call command="attachHeader"><param><?php echo $attachHeader ?></param></call>
        </afterInit>
        <settings>
            <colwidth>px</colwidth>
        </settings>
    </head> 
<?php

if($count > 0){
while($result = mssql_fetch_array($qry_obj))
    { 
    $ethnicity_ids ='';
    $ethnicity_id_array = array();
    $rel_contactid    = $result['ContactId'] ;
   
    $dob = $result['DOB'];
    if($dob){
        $dob = convertdate($dob);       
        }
    //get the ethnicities
    $qry_ethnicity = " Exec SP_AddEditEthnicityInfo '$c_account_key','$rel_contactid','','Get'";
    $qry_ethnicity_obj  = mssql_query($qry_ethnicity);
    if($count > 0){
        while($qry_result = mssql_fetch_array($qry_ethnicity_obj))
        {  
            array_push($ethnicity_id_array, $qry_result['EthnicityId']);

        }       
    $ethnicity_ids = implode(',', $ethnicity_id_array);

    }
        
    ?>
    <row id="<?php echo $result['Id']?>" count="<?php echo $count ?>"> 
        <cell><![CDATA[<?=stripslashes($result['Name'])?>]]></cell>
        <cell><?php echo $dob ?></cell>
        <cell><?php echo $result['Gender'] ?></cell> 
        <cell><?php echo $result['Ethnicity'] ?></cell> 
        <cell><?php echo $result['TypeOfchild'] ?></cell> 
        <cell><?php echo $result['ContactId'] ?> </cell>
        <cell><?php echo $result['ConnectionId'] ?> </cell>
        <cell><?php echo $ethnicity_ids ?> </cell>
        <cell><?php echo $result['ContactExtraId'] ?> </cell>
        
    </row> 
<?php
    }
}
else{
    ?>          
    <row style="color:#00A9E1;height: 550px;" id="NoData"  count="0" > 
    <cell colspan="5" align="center"><![CDATA[<font size='4'>No records found.</font>]]></cell>
    </row>  
   <?php    
   }
?>
</rows> 