<?php 
require_once("../../../userhome/\$ettings.php");
require_once($path["serloc"]."set_link.php");
require_once($path["serloc"]."admin/session.php");
require_once($path["serloc"]."admin/command.php");
require_once($path["serloc"]."users/phpfunctions.php");

$logClassObj->setModule("MasterData");
$logClassObj->setSubmodule("RelationshipSubType");

if(!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId'];

$c_account_key  =   get_c_acc_key($agencyid);

$qry     =  "EXEC SP_Rel_lkp_RelationshipSubType ".$c_account_key.", 'List'";			
$res     =  mssql_query($qry);
$index   =  1;
$results =  array();
$programs_list .= '<option value=""></option>'; 
while($row = mssql_fetch_array($res))
    {
    if($row['RelationshipSubTypeText'] == 'Enter Group Name'){
        array_unshift($results,$row) ;
    } else{
        $results[$index] = $row; 
        $index++;
        }        
      
    /** Associate Programs **/
    
    if($row['AssociateProgramID'] == $row['RelationshipSubTypeId'])
        $programs_list .= '<option value="'.$row['RelationshipSubTypeId'].'" selected = "selected">'.$row['RelationshipSubTypeText'].'</option>'; 
    else
        $programs_list .= '<option value="'.$row['RelationshipSubTypeId'].'">'.$row['RelationshipSubTypeText'].'</option>';   
    }
    
header ("content-type: text/xml");
echo '<?xml version="1.0" encoding="UTF-8"?>';
echo '<rows>';
?><head>
<!--        <column width="50" type="ro" align="center" sort="str"></column>-->
        <column type="ed" width="160" align="left" sort="str">Relationship Group Name</column>
        <column type="ed" width="105" align="left"  sort="str">Abbreviation</column>
        <column type="coro" width="160" align="left" sort="str">Associate Program
           <?= $programs_list?></column>
        <column type="ch" width="100" align="center" sort="str">Is Program</column>
        <column type="ed" width="100" align="center" sort="str">Sequence</column>
        <column type="ch" width="80" align="center" sort="str">Active</column>
        <column type="ch" width="100" align="center" sort="str">Is Multiconnect</column>
        <column type="ro" hidden="true" width="0"> RelationshipSubtypeId</column>
        <column type="ch" width="80" align="center" sort="str">Hide In Client List Filter</column>
        <afterInit>
            <call command="attachHeader"><param>#text_filter,#text_filter,#select_filter,#rspan,#text_filter,#rspan,#rspan,#rspan,#rspan</param></call>
        </afterInit>
</head>
<?php
$i  =   0;
foreach($results as $result){
        $radioBut='<input type="checkbox" name="rel_sub_list_relationsubtype[]" id="'.$result['RelationshipSubTypeId'].'" class="chk_selected_users" >';
        if($result['AssociateProgramID']=='-999')
            $result['AssociateProgramID'] = '';
        ?>
            <row id="<?=$i?>">
<!--            <cell><?//=htmlentities($radioBut)?></cell>-->
            <cell><?="<![CDATA[".$result['RelationshipSubTypeText']."]]>"?></cell>
            <cell><?=$result['Rel_SubType_Abbrev'] ?></cell>
            <cell><?="<![CDATA[".$result['AssociateProgramID']."]]>"?></cell>
            <cell><?=$result['Rel_SubType_isProgram']?></cell>
            <cell><?=$result['Rel_SubType_Seq']?></cell>
            <cell><?=$result['Rel_SubType_ShowHide']?></cell>
            <cell><?=$result['isMultiConnect']?></cell>
            <cell><?=$result['RelationshipSubTypeId']?></cell> 
            <cell><?=$result['HideInHomeYN']?></cell>
            </row>
    <?php
        $i++;
        }
   ?>
</rows>