<?php
include "connection.php";


if($_GET['type']==='address_type'){
   $sql = "SELECT
            AddressTypeID,
            AddressType,
            AddressSequence
            FROM lkpAddressType
            ORDER BY AddressType";
			
//$reslkpaddressType = mssql_query($sql);
	$json_con->render_table("lkpAddressType","AddressTypeID","AddressTypeID,AddressType");

}

?>