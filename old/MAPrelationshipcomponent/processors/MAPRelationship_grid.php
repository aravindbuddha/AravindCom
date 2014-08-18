<?php
include "connection.php";
 if(!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId']; 
	


$c_account_key  =   get_c_acc_key($agencyid);

$contactid          = $_REQUEST['contactid'];
$ActualGrpId        = $_REQUEST['ActualGrpId'];
$connectionid     = $_REQUEST['connectionid'];
$parent_component = $_REQUEST['parent_component'];
$dbname           =  getdb();


$ConnId1    = ($contactid*-1);
$conid = $contactid*-1;


$Edit_getContacts = "EXEC SP_getAllContactInfo $c_account_key,$contactid,'ALL'";
$Edit_getContacts = mssql_query($Edit_getContacts);
$row_getContacts  = mssql_fetch_array($Edit_getContacts);
$editUserDataFName            = trim($row_getContacts['FName']);
$editUserDataLName            = trim($row_getContacts['LName']);
$editUserDataBusName          = trim($row_getContacts['BusName']);

if($editUserDataFName =='' && $editUserDataLName == ''){
$Contact1Name = $editUserDataBusName ;
}else{
$Contact1Name = $editUserDataFName.' '.$editUserDataLName;
}




    $qry    = "exec SP_RelationshipGridList '$c_account_key','$ConnId1',''";//,@strLName ='$q',@strFName = '$q'";
    $qry_obj  = mssql_query($qry);


if($parent_component == 'MAPMatchingSystem'){
header ("content-type: text/xml");
echo '<?xml version="1.0" encoding="iso-8859-1"?><rows>';
?><head> 
        <column width="170" type="combo" align="left" editable="true" sort="str" cache="true"> Name</column> 
        <column width="115" type="combo" editable="false"  align="left" sort="str">DOB</column> 
        <column width="115" type="combo" editable="false"  align="left" sort="str">Gender</column> 
        <column width="140" type="combo" align="left" editable="false" sort="str" >Ethnicities</column>
        <column width="110" type="combo" editable="false"  align="left" sort="str">Bio-Adopt</column>
        <column width="0" type="ro" align="center" sort="str" hidden="true">PrimaryRelationshipId </column>
        <column width="0" type="ro" align="center" sort="str" hidden="true">SecRelationshipId1</column> 
        <column width="0" type="ro" align="center" sort="str" hidden="true">RelConnId </column>
        <column width="0" type="ro" align="center" sort="str" hidden="true">RelConnectionID1 </column>
        <settings> <colwidth>px</colwidth> </settings> 
    </head> 
<?php
}
else{   

header ("content-type: text/xml");
echo '<?xml version="1.0" encoding="iso-8859-1"?><rows>';
?><head> 
        <column width="224" type="combo" align="left" editable="true" sort="str" cache="true"> Contact</column> 
        <column width="155" type="combo" align="left" editable="false" sort="str" >Primary Relationship</column> 
        <column width="*" type="combo" editable="false"  align="left" sort="str"><?php echo $Contact1Name; ?> </column> 
        <!-- <column width="100" type="link" align="left" >Link</column> 
        <column width="120" type="ro" align="center" sort="na">Link</column> --> 
        <column width="120" type="ro" align="center" sort="str" hidden="true">PrimaryRelationshipId </column>
        <column width="120" type="ro" align="center" sort="str" hidden="true">SecRelationshipId1</column> 
        <column width="120" type="ro" align="center" sort="str" hidden="true">RelConnId </column>
        <column width="120" type="ro" align="center" sort="str" hidden="true">RelConnectionID1 </column>
        <column width="120" type="ro" align="center" sort="str" hidden="true">IndConnId </column>
        <settings> <colwidth>px</colwidth> </settings> 
    </head> 
    
    
<?php 

}
$i=0;
while($result = mssql_fetch_array($qry_obj))
    {  
    $RelConnId              = $result['ConnId'];
    /* Need the fix from Vince 
       The following query is returning the ContactId instead of Connid in MyAdoptionPortalT2.
       exec SP_RelationshipGridList 158,-76188, -76189
        */
    if($RelConnId>0)
        $RelConnId          = $RelConnId *-1;
    $RelContactName         = getContactName($c_account_key, $RelConnId, '0');
    //$RelContactName         = str_replace("'","\'",$RelContactName);
    $tabRelContactName      = "'".$RelContactName."'";
     $rel_casenotelink       = '<a href="#"  onClick="parent.openCasenoteWindow('.$RelConnId.',0,\'\','.$ActualGrpId.')"  alt="Create Casenote" class="tipz" id="Create Casenote" title="Create Casenote"><img border="0" src="images/case_note_icon.gif"  width="16" height="16"/></a>';
    $rel_fastfactslink      = '<a href="javascript:void(0)" onclick="parent.clientFastFacts('.$RelConnId.',event)" alt="Client Fast Facts" title="client fast facts"><img border="0" src="images/fastfacts.png"  width="16" height="16"/></a>';
    $rel_airstsklistlink    = '<a href="javascript:void(0)" onclick="sixpanel_nexttab('.$RelConnId.','.$tabRelContactName.')" alt="View Client\'s Detailed Information" class="tipz" id="View Clients Detailed Information" title="View Client\'s Detailed Information"><img border="0" src="images/airs_task_list_icon.gif" width="16" height="16"/></a>';
    $relation_links         = $rel_casenotelink."  ".$rel_fastfactslink."  ".$rel_airstsklistlink;
    
    
    ?>
    <row id="<?php echo $i."*".$result['ConnId']?>"> 
        <cell><![CDATA[<?=stripslashes($RelContactName)?>]]></cell>
        <cell><?php echo $result['RelationshipSubTypeText']?></cell>
        <cell><?php echo $result['RelationshipSubTypeText']?></cell> 
        <cell><?php echo $result['RelTypeText1']?></cell> 
        <!-- <cell><![CDATA[<?=($relation_links)?>]]></cell> -->
        <cell><?php echo $result['RelationshipSubTypeId']?></cell> 
        <cell><?php echo $result['RelTypeid1']?> </cell>
        <cell><?php echo $RelConnId; ?> </cell>
        <cell><?php echo $result['ConnectionId1']?> </cell>
        <cell><?php echo $result['IndConnId']; ?> </cell>
    </row> 
<?php

$i++;
}
    ?>

</rows> 