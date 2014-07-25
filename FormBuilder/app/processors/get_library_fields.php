<?php

//ini_set('error_reporting',E_ALL);
//ini_set('display_errors', 'On');

include "connection.php";


$agency_id = $_POST['agency_id'];
//echo $agency_id;
$case_worker_id = str_replace("'", "''",$_POST['userID']);
$connid= str_replace("'", "''",$_POST['connID']);
//echo $connid;
$connectionid = str_replace("'", "''",$_POST['connectionID']);


/*=========  ========= */
$result = mssql_query( 'exec SP_CaseWorkerList' );

$SP_CaseWorkerList = array();
$SP_CaseWorkerListNames = array();
array_push($SP_CaseWorkerListNames, array( value => "", text => "Please select" )); 
while( ( $row = mssql_fetch_array( $result, MSSQL_BOTH) ) )
{
	array_push($SP_CaseWorkerList, array( id => $row["User_ID"], first_name => $row["first_name"], last_name => $row["last_name"], name => $row["first_name"] . " " .$row["last_name"] )); 
	array_push($SP_CaseWorkerListNames, array( value => $row["first_name"] . " " . $row["last_name"], text => $row["first_name"] . " " . $row["last_name"] )); 
}
//$SP_CaseWorkerList =  json_encode($SP_CaseWorkerList);

/*=========  ========= */
$result = mssql_query( "exec SP_LkpState @CAccountKey = ".$agency_id.", @TaskType = 'list', @IsUS = '1'" );

$SP_LkpState = array();
while( ( $row = mssql_fetch_array( $result, MSSQL_BOTH) ) )
{
	$SP_LkpState[$row["StateAbbreviation"]] = $row["StateName"];
}
//$SP_LkpState = json_encode($SP_LkpState);

/*=========  ========= */
$religionSP = "exec SP_lkpReligion @CAccountKey = ".$agency_id.", @TaskType = 'list'";
$result = mssql_query( $religionSP );

$SP_lkpReligion = array( array( value => "", text => "Please select" ));
while( ( $row = mssql_fetch_array( $result, MSSQL_BOTH) ) )
{
	array_push($SP_lkpReligion, array( value => $row["ReligionID"], text => $row["ReligionText"] )); 
}
//$SP_lkpReligion = json_encode($SP_lkpReligion);

/*=========  ========= */
$degreeSP = "exec SP_lkpDegree @CAccountKey = ".$agency_id.", @TaskType = 'list'";
$result = mssql_query( $degreeSP );

$SP_lkpDegree = array( array( value => "", text => "Please select" ));
while( ( $row = mssql_fetch_array( $result, MSSQL_BOTH) ) )
{
	array_push($SP_lkpDegree, array( value => $row["DegreeTypeId"], text => $row["DegreeText"] )); 
}
//$SP_lkpDegree = json_encode($SP_lkpDegree);



/*=========  ========= */
$languageSP = "exec SP_lkpLanguage @CAccountKey = ".$agency_id.", @TaskType = 'list'";
$result = mssql_query( $languageSP );

$SP_lkpLanguage = array( array( value => "", text => "Please select" ));
//$SP_lkpLanguage = array( array( value => "", text => "English" ));
//$SP_lkpLanguage = array();
while( ( $row = mssql_fetch_array( $result, MSSQL_BOTH) ) )
{
	if ($row["LanguageText"] == "English"){
		array_push($SP_lkpLanguage, array( value => $row["LanguageId"], text => $row["LanguageText"], selected => true )); 
	}else{
		array_push($SP_lkpLanguage, array( value => $row["LanguageId"], text => $row["LanguageText"] )); 
	}
}
//$SP_lkpLanguage = json_encode($SP_lkpLanguage);

/*=========  ========= */
$result = mssql_query( "exec SP_Rel_lkp_RelationshipType @CAccountKey = ".$agency_id.", @TaskType = 'list', @RelationshipSubTypeId = '1'" );

$SP_Rel_lkp_RelationshipType_family = array();
while( ( $row = mssql_fetch_array( $result, MSSQL_BOTH) ) )
{
	array_push($SP_Rel_lkp_RelationshipType_family, array( value => $row["RelationshipTypeId"], text => $row["RelationshipTypeText"] )); 
}
//$SP_Rel_lkp_RelationshipType_family = json_encode($SP_Rel_lkp_RelationshipType_family);


/*=========  ========= */
$result = mssql_query( "exec SP_Rel_lkp_RelationshipType @CAccountKey = ".$agency_id.", @TaskType = 'list', @RelationshipSubTypeId = '2'" );

$SP_Rel_lkp_RelationshipType_professional = array();
while( ( $row = mssql_fetch_array( $result, MSSQL_BOTH) ) )
{
	array_push($SP_Rel_lkp_RelationshipType_professional, array( value => $row["RelationshipTypeId"], text => $row["RelationshipTypeText"] )); 
}
//$SP_Rel_lkp_RelationshipType_professional = json_encode($SP_Rel_lkp_RelationshipType_professional);


/*=========  ========= */
$result = mssql_query( "SELECT * FROM tbl_safe_form_tribal_affiliation ORDER BY text ASC" );

$tribal_affiliation = array( array( value => "", text => "Please select" ));
while( ( $row = mssql_fetch_array( $result, MSSQL_BOTH) ) )
{
	array_push($tribal_affiliation, array( value => $row["id"], text => $row["text"] )); 
}

/*=========  ========= */
$result = mssql_query( "SELECT * FROM tbl_safe_form_report_type_school ORDER BY text ASC" );

$school_report = array();
while( ( $row = mssql_fetch_array( $result, MSSQL_BOTH) ) )
{
	array_push($school_report, array( value => $row["id"], text => $row["text"] )); 
}
/*=========  ========= */
$result = mssql_query( "SELECT * FROM tbl_safe_form_report_type_medical ORDER BY text ASC" );

$medical_report = array();
while( ( $row = mssql_fetch_array( $result, MSSQL_BOTH) ) )
{
	array_push($medical_report, array( value => $row["id"], text => $row["text"] )); 
}
/*=========  ========= */
$result = mssql_query( "SELECT * FROM tbl_safe_form_clearance_type ORDER BY text ASC" );

$clearance_type = array();
while( ( $row = mssql_fetch_array( $result, MSSQL_BOTH) ) )
{
	array_push($clearance_type, array( value => $row["id"], text => $row["text"] )); 
}

/*=========  ========= */


//$result = mssql_query( "select c_account_key from user_agencies where agency_id = '".$agency_id."';" );
//$row = mssql_fetch_array($result);
//$c_account_key = $row[0];
//echo 'c_account_key ' . $c_account_key ;
$c_account_key = $agency_id;


$result = mssql_query( "exec SP_ConnIdToUserId ".$agency_id." , ".$connid."" );
// exec SP_ConnIdToUserId 158 , -69135
//$result = mssql_query( "select user_id from user_accounts  where agency_id='".$agency_id."' and connid='".$connid."';" );
$row = mssql_fetch_array($result);
$user_id = $row["User_id"];
//echo 'sql ' . "exec SP_ConnIdToUserId ".$agency_id." , ".$connid."" ;
//echo 'user_id ' . $user_id ;
//$user_id = 10393;

// EXEC ViewMAPDataGroup '158', '4232', 'AP1Fname,AP1MName,AP1Lname,AP1Signature,AP1Email,AP1CellPhone,AP1DOB,AP1BirthState,AP1Gender,AP1Religion,AP1Degree,AP1Language2,AP1MarriageDate,AP1TerminationDate,AP1MarriageDate2,AP1TerminationDate2,Add1,Add2,City,State,Zip,AP1WorkPhone,HomePhone,Emp1Fname,Emp1Lname,AP2Fname,AP2Mname,AP2Lname,AP2Signature,AP2Email,AP2CellPhone,AP2DOB,AP2BirthState,AP2Gender,AP2Religion,AP2Degree,AP2Language2,AP2MarriageDate,AP2TerminationDate,AP2MarriageDate2,AP2TerminationDate2,Rel1Fname,Rel1Lname,Rel1DOB,Rel1Relationship,Rel1Add1,Rel1Add2,Rel1City,Rel1State,Rel1zip'

$fieldsList = "AP1Fname,AP1MName,AP1Lname,AP1Signature,AP1Email,AP1CellPhone,AP1DOB,AP1BirthState,AP1Gender,AP1Religion,AP1Degree,AP1Language2,AP1MarriageDate,AP1TerminationDate,AP1MarriageDate2,AP1TerminationDate2,Add1,Add2,City,State,Zip,AP1WorkPhone,HomePhone,Emp1Fname,Emp1Lname,Emp2Fname,Emp2Lname,AP2Fname,AP2Mname,AP2Lname,AP2Signature,AP2Email,AP2CellPhone,AP2DOB,AP2BirthState,AP2Gender,AP2Religion,AP2Degree,AP2Language2,AP2MarriageDate,AP2TerminationDate,AP2MarriageDate2,AP2TerminationDate2,Rel1Fname,Rel1Lname,Rel1DOB,Rel1Relationship,Rel1Add1,Rel1Add2,Rel1City,Rel1State,Rel1zip,AP1BirthName,AP2BirthName";


$stored_procedure = "EXEC ViewMAPDataGroup '".$agency_id."', '".$user_id."', '".$fieldsList."'";
$result = mssql_query( $stored_procedure );


$SP_ViewMAPDataGroup = array();
$family_data = array();
while( ( $row = mssql_fetch_array( $result, MSSQL_BOTH) ) )
{
	//print_r($row);
	//echo $row["FieldName"];
	if($row["FieldValue"] == " ")
	{
		$row["FieldValue"] = str_replace(" ", "",$row["FieldValue"]);
	}
	if($row["FieldValue"] == "01/01/1900")
	{
		$row["FieldValue"] = "";
	}
	
	$family_data[ $row["FieldName"] ] = str_replace("/", "-",$row["FieldValue"]);	 // /
}


$fieldsList = "agency_id,user_id,agency_name,address_line_1,address_line_2,city,state,zip,country,website,phone,fax,email_id,logo";

$stored_procedure2 = "Exec usp_GetAgencyDetails";
$result = mssql_query( $stored_procedure2 );
$row = mssql_fetch_array($result);

$agency_data = array();
$arrFields = explode(",", $fieldsList);
foreach ($arrFields as $field) 
{
	$agency_data[ $field ] = $row[ $field ];
}

//$agency_data[ "agency_name" ] = $row["agency_name"];

/*while( ( $row = mssql_fetch_array( $result, MSSQL_BOTH) ) )
{
	//print_r($row);
	//echo $row["FieldName"];
	if($row["FieldValue"] == " ")
	{
		$row["FieldValue"] = str_replace(" ", "",$row["FieldValue"]);
	}
	if($row["FieldValue"] == "01/01/1900")
	{
		$row["FieldValue"] = "";
	}
	
	$family_data[ $row["FieldName"] ] = str_replace("/", "-",$row["FieldValue"]);	 // /
}*/


echo json_encode(array(
	'status' => 'success', 
	'response' => 'Library fields loaded', 
	'religion' => $SP_lkpReligion,
	'degree' => $SP_lkpDegree,
	
	'language' => $SP_lkpLanguage,
	
	'religionSP' => $religionSP,
	'degreeSP' => $degreeSP,
	
	'languageSP' => $languageSP,
	
	'tribal_affiliation' => $tribal_affiliation,
	'relationship' => $SP_Rel_lkp_RelationshipType_family,
	'relationship_professional' => $SP_Rel_lkp_RelationshipType_professional,
	//'report_type' => array(),
	'medical_report' => $medical_report,
	'school_report' => $school_report,
	'clearance_type' => $clearance_type,
	'us_states' => $SP_LkpState,
	'case_workers' => $SP_CaseWorkerList,
	'case_workers_names' => $SP_CaseWorkerListNames,
	'family_data' => $family_data,
	'family_stored_procedure' => $stored_procedure,
	'agency_data' => $agency_data
));


?>