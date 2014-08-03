<?php
include "connection.php";
header ("content-type: text/xml");
echo '<?xml version="1.0" encoding="iso-8859-1"?><complete>';
$type = $_GET['type'];
$country_id = $_GET['country_id'];
$logClassObj->setModule("Addresscomponent");
$logClassObj->setSubmodule("queries");
if($country_id == "USA"){
    $rslt = mssql_query("select CountryID from lkpcountry where countryText ='USA'");
    $rowaddresstype1 = mssql_fetch_array($rslt);
    $country_id = $rowaddresstype1['CountryID'];   
}

 if(!isset($_SESSION['agencyId']))
    $agencyid       =   getCurrentAgencyID();
else
    $agencyid       =   $_SESSION['agencyId'];
	
	
if($type == 'address_type'){
    $sql = "SELECT
            AddressTypeID,
            AddressType,
            AddressSequence
            FROM lkpAddressType
            ORDER BY AddressType";
			
$reslkpaddressType = mssql_query($sql);
$i=0;
if(!$_REQUEST['address_type']){?>
 <option value="0" selected="">-- Select Address Type --</option>   
<?php }
while($rowaddresstype=mssql_fetch_array($reslkpaddressType))
{   
if(($_REQUEST['address_type'] == $rowaddresstype['AddressType']) || ($_REQUEST['address_type'] == $rowaddresstype['AddressTypeID'])){ 
?>
<option value="<?php echo $rowaddresstype['AddressTypeID']; ?>" selected="selected" ><?php echo $rowaddresstype['AddressType'];?></option>
<?php } else{ ?>
<option value="<?php echo $rowaddresstype['AddressTypeID']; ?>"  ><?php echo $rowaddresstype['AddressType'];?></option>

<?php }
}
$logClassObj->commonWriteLogInOne("Address Type Query : $sql ","INFO");					  
}
if($type == 'address_state'){
    
    $sql = "SELECT
            StateID,
            StateAbbreviation,
            StateName
            FROM lkpState 
            WHERE CountryID = '".$country_id."'
            ORDER BY StateName
            ";
    
	$reslkpstateType = mssql_query($sql);
        $state_id = $_GET['state_id'];           
$i=0;
if((!$_REQUEST['address_state']) || ($_REQUEST['isCountryChange'] === 'true')){ 
    ?>
 <option value="0" selected="">-- Select State --</option>   
<?php }

while($rowstate=mssql_fetch_array($reslkpstateType))
{
    if($state_id == $rowstate['StateID']){
        $selected = 'selected="selected"';
    }
        
    else
        $selected ='';
if($_REQUEST['address_state'] == $rowstate['StateName']){
    $selected = 'selected="selected"';
    ?>
<option value="<?php echo $rowstate['StateID']; ?>" <?php echo $selected; ?>><?php echo $rowstate['StateName'];?></option>
<?php }
else{?>
<option value="<?php echo $rowstate['StateID']; ?>" <?php echo $selected; ?>><?php echo $rowstate['StateName'];?></option>
<?php }
}
$logClassObj->commonWriteLogInOne("Address State Query : $sql ","INFO");	
}                         

if($type == 'address_County'){
    $state_id = $_GET['state_id'];
     
    $sql = "SELECT
            CountyID,
            CountyText
            FROM lkpCounty
            WHERE StateId = '".$state_id."'
            ORDER BY CountyText";
	$reslkpcountyType = mssql_query($sql);
$i=0;
if((!$_REQUEST['address_County']) || ($_REQUEST['isStateChange'] === 'true')) { 
    ?>
 <option value="0" selected="">-- Select County --</option>   
<?php }
while($rowcounty=mssql_fetch_array($reslkpcountyType))
{
if(($_REQUEST['address_County'] == $rowcounty['CountyText']) || ($_REQUEST['address_County'] == $rowcounty['CountyID'])){?>
<option value="<?php echo $rowcounty['CountyID']; ?>" selected="selected"><?php echo $rowcounty['CountyText'];?></option>
<?php }else{?>
<option value="<?php echo $rowcounty['CountyID']; ?>" ><?php echo $rowcounty['CountyText'];?></option>
<?php  }}	
$logClassObj->commonWriteLogInOne("Address County Query : $sql ","INFO");
}
if($type == 'address_country'){
    $sql = "SELECT
            CountryID,
            CountryText
            FROM lkpCountry
            ORDER BY CountryText
            ";
	$reslkpcountryType = mssql_query($sql);
$i=0;
if($_REQUEST['address_country'] == '')
    $_REQUEST['address_country'] = 'USA';
while($rowcountry=mssql_fetch_array($reslkpcountryType))
{
if(($_REQUEST['address_country'] == $rowcountry['CountryText']) || ($_REQUEST['address_country'] == $rowcountry['CountryID'])){?>
<option value="<?php echo $rowcountry['CountryID']; ?>" selected="selected"><?php echo $rowcountry['CountryText'];?></option>
<?php }else{?>
<option value="<?php echo $rowcountry['CountryID']; ?>" ><?php echo $rowcountry['CountryText'];?></option>
<?php }}	
}
if($type == 'address_province'){
    $sql = "SELECT
                  AddressProvinceId
                , AddressProvinceText
                , CountryID
            FROM lkpAddressProvince
            WHERE CountryID = '".$country_id."'
            ORDER BY AddressProvinceText";
	$reslkpprovinceType = mssql_query($sql);
$i=0;
if((!$_REQUEST['address_province']) || ($_REQUEST['isCountryChange'] === 'true')){ 
    ?>
 <option value="0" selected="">-- Select Province --</option>   
<?php }
while($rowprovince=mssql_fetch_array($reslkpprovinceType))
{
if(($_REQUEST['address_province'] == $rowprovince['AddressProvinceText']) || ($_REQUEST['address_province'] == $rowprovince['AddressProvinceId'])){?>
<option value="<?php echo $rowprovince['AddressProvinceId']; ?>" selected="selected"><?php echo $rowprovince['AddressProvinceText'];?></option>
<?php }else{?>
<option value="<?php echo $rowprovince['AddressProvinceId']; ?>" ><?php echo $rowprovince['AddressProvinceText'];?></option>
<?php } }
$logClassObj->commonWriteLogInOne("Address Province Query : $sql ","INFO");
}
?>
</complete>