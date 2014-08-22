<?php
/**
 * @author Aravind Buddha <aravind.buddha@mediaus.com>
 * @package default
 * @desc    To get all lkp data required by component
 */


include "connection.php";

$data_base=$_REQUEST['data_base'];
mssql_select_db($data_base);


if ($_REQUEST['get']=="email_type") {
	$json->sort("EmailType", "ASC");
	$json->render_table("lkpEmailType", "EmailTypeID", "EmailType");
}