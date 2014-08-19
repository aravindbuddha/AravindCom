<?php
/**
 * @author Aravind Buddha <aravind.buddha@mediaus.com>
 * @package default
 * @desc    To get all lkp data required by component
 */


include "connection.php";

$data_base=$_REQUEST['data_base'];
mssql_select_db($data_base);


if ($_REQUEST['get']=="address_type") {
	$json->sort("AddressType", "ASC");


	$json->render_table("lkpAddressType", "AddressTypeID", "AddressType");
}

if ($_REQUEST['get']=="address_country") {
	$json->sort("CountryText", "ASC");
	$json->render_table("lkpcountry", "CountryID", "CountryText");
}

if ($_REQUEST['get']=="address_province") {
	$json->sort("AddressProvinceText", "ASC");
	$json->render_table("lkpAddressProvince", "AddressProvinceId", "CountryID,AddressProvinceText");
}

if ($_REQUEST['get']=="address_state") {
	$json->sort("StateName", "ASC");
	$json->render_table("lkpState", "StateID", "CountryID,StateAbbreviation,StateName");
}

if ($_REQUEST['get']=="address_county") {
	$json->sort("CountyText", "ASC");
	$json->render_table("lkpCounty", "CountyID", "StateId,CountyText");
}


if ($_REQUEST['get']=="address_by_zip") {
	$zip = $_REQUEST['zip'];
  //$json->render_sql("SELECT lkpState.StateID as StateID,lkpState.StateName as StateName,lkpCountyZip.CountyID as CountryID,lkpCountry.CountryText as CountryName FROM lkpState,lkpCountyZip WHERE lkpState.StateAbbreviation = lkpCountyZip.State AND lkpCountyZip.CountryID=lkpCountry.CountryID AND lkpCountyZip.Zip =".$zip, "StateID", "StateID,CountryID");
	$json->render_sql("SELECT s.StateID as StateID, s.StateName as StateName, c.CountyID as CountyID, c.CountyText as CountyText FROM lkpState s join lkpCounty c on s.StateId = c.StateId join lkpCountyZip cz on c.CountyID = cz.CountyID WHERE cz.Zip =".$zip, "StateID","StateID,StateName,CountyID,CountyText");
}


/**
 * To get souse contact id
 */

if ($_REQUEST['act']=="spouse_contact") {
	$data=json_decode($_REQUEST['data'], true);
	$contact_id=$data['contact_id'];
	$connid = $contact_id*-1;
	$res = $json->sql->query("select dbo.udf_CoupleContactId($connid,1) as contact_id");

	$result =  $json->sql->get_next($res);
  $result_contact_id_1=$result['contact_id'];

	$res = $json->sql->query("select dbo.udf_CoupleContactId($connid,2) as contact_id");
  $result =  $json->sql->get_next($res);
 	$result_contact_id_2=$result['contact_id'];

	if($result_contact_id_1 === $contact_id && $result_contact_id_2 === $contact_id  ){
			echo json_encode(array(
				"spouse_contact_id"=>0
			));
	}else if($result_contact_id_1 !== $contact_id){
			echo json_encode(array(
					"spouse_contact_id"=>$result_contact_id_1
				));
	}else {
		echo json_encode(array(
					"spouse_contact_id"=>$result_contact_id_2
				));
	}

}
