<?php 
require_once("../../../userhome/\$ettings.php");
require_once($path["serloc"]."set_link.php");
require_once($path["serloc"]."admin/session.php");
require_once($path["serloc"]."admin/command.php");
require_once($path["serloc"]."users/phpfunctions.php");

$logClassObj->setModule("MasterData");
$logClassObj->setSubmodule("RelationshipCustomTemplate");

if(!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId'];

$c_account_key  =   get_c_acc_key($agencyid);

$subrelations   =   "Exec SP_Rel_lkp_RelationshipSubType '$c_account_key','List'";
$data_sub_relations =   mssql_query($subrelations);
$optionSubrel   =   '<option value=""></option>';
while($res_sub_relations = mssql_fetch_array($data_sub_relations))
	{
	$optionSubrel.='<option value="'.$res_sub_relations['RelationshipSubTypeId'].'">'.$res_sub_relations['RelationshipSubTypeText'].'</option>';
	}

//Relationship Type
$relations  =   "Exec SP_Rel_lkp_RelationshipType '$c_account_key','List'";
$data_relations =   mssql_query($relations);
$optionMainrel  =   '<option value=""></option>';
while($res_relations = mssql_fetch_array($data_relations))
	{
	$optionMainrel.='<option value="'.$res_relations['RelationshipTypeId'].'">'.$res_relations['RelationshipTypeText'].'</option>';
	}

header ("content-type: text/xml");
echo '<?xml version="1.0" encoding="UTF-8"?>';
    echo '<rows>';
    ?><head>
        <column type="coro" width="155" align="left" sort="str">Relationship Group
            <?= $optionSubrel?>
        </column>
        <column type="coro" width="155" align="left" sort="str">Relationship Type
            <?= $optionMainrel?>
        </column>
            <column type="ed" width="100" align="center" sort="str">Sequence</column>
            <column type="ed" width="155" align="left" sort="str">Custom Label</column>
            <column type="ro" hidden="true" width="0">Relation Custom Template Id</column>
            <column type="ro" hidden="true" width="0">Relation Sub Type Id</column>
            <column type="ro" hidden="true" width="0">Relation Type Id</column>
            <column type="ch" width="70" align="center" >Is Date</column>
            <column type="ch" width="85" align="center" >Is Fast Facts</column>
            <column type="ch" width="85" align="center" >Is Client Data</column>
            <afterInit>
                    <call command="attachHeader"><param>#select_filter,#select_filter,#text_filter,#text_filter,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan</param></call>
            </afterInit>
    </head>
<?php
$myDB       =     getdb();
$sqlrel     =     "SELECT rc.*,rs.RelationshipSubTypeText,rt.RelationshipTypeText,rc.IsDate,rc.IsFastFact,rc.IsClientData from [$myDB].[dbo].[Rel_CustomTemplates] rc
                    LEFT JOIN [$myDB].[dbo].[Rel_lkp_RelationshipSubType] rs ON rc.RelationshipSubTypeId = rs.RelationshipSubTypeId
                    LEFT JOIN [$myDB].[dbo].[Rel_lkp_RelationshipType] rt ON rc.RelationshipTypeId = rt.RelationshipTypeId"; 
$resultrel  =     mssql_query($sqlrel);

while($myrowrel = mssql_fetch_array($resultrel))
   { 
    ?>
        <row id="<?php echo $myrowrel['Rel_CustomTemplateId']?>">
            <cell><![CDATA[<?php echo $myrowrel['RelationshipSubTypeId']?>]]></cell>
            <cell><![CDATA[<?php echo $myrowrel['RelationshipTypeId']?>]]></cell>
            <cell><![CDATA[<?php echo $myrowrel['Rel_CustomTemplateSeq'] ?>]]></cell>
            <cell><![CDATA[<?php echo $myrowrel['Rel_CustomTemplateLabel']?>]]></cell>
            <cell><?php echo $myrowrel['Rel_CustomTemplateId']?></cell>
            <cell><?php echo $myrowrel['RelationshipSubTypeId']?></cell>
            <cell><?php echo $myrowrel['RelationshipTypeId']?></cell>
            <cell><?php echo $myrowrel['IsDate']?></cell>
            <cell><?php echo $myrowrel['IsFastFact']?></cell>
            <cell><?php echo $myrowrel['IsClientData']?></cell>
        </row>
   <?php   		 
    }
   ?>
</rows>        	