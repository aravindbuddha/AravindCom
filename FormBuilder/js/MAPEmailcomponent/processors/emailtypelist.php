<?php
include "connection.php";
function get_c_acc_key($agencyID){

    $data_fetch          = "SELECT c_account_key FROM  user_agencies WHERE agency_id=$agencyID";
    $res_fetch           = mssql_query($data_fetch);
    $c_acc_key           = mssql_fetch_array($res_fetch);
    $c_account_keyDrop   = $c_acc_key['c_account_key'];
    return $c_account_keyDrop;
}

header("content-type: text/xml");
echo '<?xml version="1.0" encoding="iso-8859-1"?><complete>';

    $agencyid       =   $_GET['agencyid']; 
	
$c_account_key = get_c_acc_key($agencyid);

$qrylkpemailType     = "EXEC SP_lkpEmailType $c_account_key,'List'";
$reslkpemailType     = mssql_query($qrylkpemailType);
$count_emailType_rec = mssql_num_rows($reslkpemailType);
$i                   = 0;
$id= $_REQUEST['id'];
while ($rowPhone = mssql_fetch_array($reslkpemailType)) {
if($id == $rowPhone['EmailType']){
$select = 'selected="selected"';
}else{
$select ='';
}
?>
<option value="<?php
    echo $rowPhone['EmailTypeID'];
?>"  <?php echo $select;?>  ><?php
    echo $rowPhone['EmailType'];
?></option>
<?php
}
?>
</complete>