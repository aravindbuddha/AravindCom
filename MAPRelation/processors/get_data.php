<?php
/**
 * @author Aravind Buddha <aravind.buddha@mediaus.com>
 * @package default
 * @desc    To get all lkp data required by component
 */


include "connection.php";

$data_base=$_REQUEST['data_base'];
mssql_select_db($data_base);

if($_REQUEST['act']=="get_coup_name"){
	$conn_id = $_REQUEST['conn_id'];
	$res = $json->sql->query("SELECT dbo.udf_CoupleName($conn_id,0,1,'UnKnow',0,0) as coup_names");
  $result =  $json->sql->get_next($res);
  echo json_encode(array(
  	"coup_names" => $result['coup_names']
  	));
}



if ($_REQUEST['act']=="relation_primary") {
	$json->sort("RelationshipSubTypeText", "ASC");
	$json->render_table("Rel_lkp_RelationshipSubType", "RelationshipSubTypeId", "RelationshipSubTypeText");
}

if ($_REQUEST['act']=="relation_sub") {
	$json->sort("RelationshipTypeText", "ASC");
	$json->render_table("Rel_lkp_RelationshipType", "RelationshipTypeId", "RelationshipTypeText,RelationshipSubTypeId");
}

