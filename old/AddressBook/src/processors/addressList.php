<?php
include 'connection.php';
mssql_select_db("MAPTEST");
$contactID=21594;
$agencyid=25;
$c_account_key=get_c_acc_key($agencyid);
$res=mssql_connect('MSIVIZAG-WRK28\ARAVIND',"sa","Passw0rd");
mssql_select_db("MAPTEST");
	$connector = new JSONDataConnector($res,"MsSQL");
					$connector->render_complex_sql("exec SP_AddEditAddressInfo '$c_account_key', $contactID","AddressID","AddressType,Address1,Address2,city,StateName,zip,CountyText,CountyText,AddressProvinceText,MailingAddress,addstartdate,addleavedate");


/**
* Addresss Class
*/
// class Address{
// 	var $conector="";
// 	function __construct($res){

// 	}
// 	// function list(){

// 	// }
// }


// $adrs=new Address($res);
// if($_GET['action']=='list'){
		
// }



