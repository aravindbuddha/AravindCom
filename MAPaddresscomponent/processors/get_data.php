<?php

include "connection.php";



if($_GET['get']=="address_type"){
		$json->sort("AddressType","ASC");
	$json->render_table("lkpAddressType","AddressTypeID","AddressType,AddressSequence");
}

if($_GET['get']=="address_country"){
		$json->sort("CountryText","ASC");
	$json->render_table("lkpcountry","CountryID","CountryText");
}

if($_GET['get']=="address_province"){
		$json->sort("AddressProvinceText","ASC");
	//$json->render_complex_sql("SELECT * FROM lkpAddressProvince  ORDER BY AddressProvinceText","AddressProvinceId","CountryID","AddressProvinceText");
	$json->render_table("lkpAddressProvince","AddressProvinceId","CountryID,AddressProvinceText");
}

if($_GET['get']=="address_state"){
		$json->sort("StateName","ASC");
//	$json->render_complex_sql("SELECT * FROM lkpState ORDER BY StateName","StateID","CountryID","StateAbbreviation, StateName");
	$json->render_table("lkpState","StateID","CountryID,StateAbbreviation,StateName");
}

if($_GET['get']=="address_county"){
		$json->sort("CountyText","ASC");
	//$json->render_complex_sql("SELECT * FROM lkpCounty ORDER BY CountyText","CountyID","StateId","CountyText");
	$json->render_table("lkpCounty","CountyID","StateId,CountyText");
}


if($_GET['get']=="address_by_zip"){
	$zip = $_GET['zip'];
	$json->render_sql("SELECT lkpState.StateID as StateID,lkpState.StateName as StateName,lkpCountyZip.CountyID as CountryID,lkpCountry.CountryText as CountryName FROM lkpState,lkpCountyZip WHERE lkpState.StateAbbreviation = lkpCountyZip.State AND lkpCountyZip.CountryID=lkpCountry.CountryID AND lkpCountyZip.Zip =".$zip,"StateID","StateID,CountryID");
}

if($_REQUEST['act']=="spouse_contact"){
	$data=json_decode($_REQUEST['data'],true);
    $contact_id=$data['contact_id']=1394;
	$connid = $contact_id*-1;
	$res = $json->sql->query("select dbo.udf_CoupleContactId($connid,1) as contact_id");
	$result =  $json->sql->get_next($res);
	$spouse_contact_id=$result['contact_id'];

	if($spouse_contact_id!=$contact_id){
	$res = $json->sql->query("EXEC USP_AddEditAddressInfo $contact_id,0,'Get'");
	$result1 =  $json->sql->get_next($res);

	$res = $json->sql->query("EXEC USP_AddEditAddressInfo $spouse_contact_id,0,'Get'");
	$result1 =  $json->sql->get_next($res);
		if($result1 && !$result2){
			echo json_encode(array(
			"spouse_contact_id"=>$spouse_contact_id
			));
		}
	}else{
		echo json_encode(array(
			"spouse_contact_id"=>0
			));

	}

}

// if($_GET['get']=="address_state"){
// 		$countryid=$_GET['country_id'];
// 	$json->render_complex_sql("SELECT * FROM lkpState WHERE CountryID =".$countryid." ORDER BY StateName","StateID","StateAbbreviation, StateName");
// }

// if($_GET['get']=="address_county"){
// 	$state_id = $_GET['state_id'];
// 	$json->render_complex_sql("SELECT * FROM lkpCounty WHERE StateId =".$countryid." ORDER BY CountyText","CountyID","CountyText");
// }

// if($_GET['get']=="address_province"){
// 	$countryid=$_GET['country_id'];
// 	$json->render_complex_sql("SELECT * FROM lkpAddressProvince WHERE CountryID =".$countryid." ORDER BY AddressProvinceText","AddressProvinceId","AddressProvinceText");
// }
