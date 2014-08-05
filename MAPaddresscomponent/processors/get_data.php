<?php

include 'connector-php/codebase/data_connector.php';
include 'connector-php/codebase/db_mssql.php';
include 'connector-php/codebase/mixed_connector.php';

 
$res=mssql_connect('.\ARAVIND',"sa","Passw0rd",false);
mssql_select_db("MAPTEST");
$json = new JSONDataConnector($res,"MsSQL");

if($_GET['get']=="grid"){
	$contactID=$_GET['contactID'];
	$sp_airsAddress = "EXEC SP_AddEditAddressInfo '$c_account_key', $contactID, default,'Get'";
 //	$json->render_complex_sql(sp_airsAddress,$id,$text,$extra,$relation_id);
}

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
	//$json->sort("CountyText","ASC");
	//$json->render_complex_sql("SELECT * FROM lkpCounty ORDER BY CountyText","CountyID","StateId","CountyText");
	//$json->render_table("lkpCounty","CountyID","StateId,CountyText");

	$json->render_sql("SELECT lkpState.StateID as StateID,lkpState.StateName as StateName,lkpCountyZip.CountyID as CountryID,lkpCountry.CountryText as CountryName FROM lkpState,lkpCountyZip WHERE lkpState.StateAbbreviation = lkpCountyZip.State AND lkpCountyZip.CountryID=lkpCountry.CountryID AND lkpCountyZip.Zip =".$zip,"StateID","StateID,CountryID");
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
