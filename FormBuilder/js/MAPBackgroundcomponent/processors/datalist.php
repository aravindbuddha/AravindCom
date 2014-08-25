<?php
include "connection.php";
header("Content-Type: application/json", true);
	$agencyid       =   $_POST['agencyid']; 
	$data_fetch1="SELECT c_account_key FROM  user_agencies WHERE agency_id=$agencyId";
	$res_fetch1=mssql_query($data_fetch1);
	$c_acc_key1=mssql_fetch_array($res_fetch1);
	$c_account_key=$c_acc_key1['c_account_key'];
		
		
	$getrace            = getRace1($agencyid );
	$getCitizenShip     = getCitizenShip1($agencyid ); 
	$getLanguages       = getLanguages1($agencyid );
	$getReligion        = getReligion1($agencyid );      
	$getethnicity       = getEthnicity1($agencyid );
	$getculture         = getCulture1($agencyid );
function getRace1($agencyid)
{
    $data_fetch1                        =   "SELECT c_account_key FROM  user_agencies WHERE agency_id=$agencyid";
    $res_fetch1                         =   mssql_query($data_fetch1);
    $c_acc_key1                         =   mssql_fetch_array($res_fetch1);
    $c_account_key1                     =   $c_acc_key1['c_account_key'];

    $result                             =   mssql_query("EXEC SP_lkpRace '$c_account_key1', 'List'");
    if(mssql_num_rows($result) > 0)
    {
        while($row = mssql_fetch_array($result))
        {
            $getRace[] = $row;
        }

        mssql_free_result($result);
    }
    return $getRace;
}	
function getCitizenShip1($agencyid)
{
    $ret = array();
    $agencyId                               =  $agencyid;
    $data_fetch1                            =   "SELECT c_account_key FROM  user_agencies  WHERE agency_id=$agencyId";
    $res_fetch1                             =   mssql_query($data_fetch1);
    $c_acc_key1                             =   mssql_fetch_array($res_fetch1);
    $c_account_key1                         =   $c_acc_key1['c_account_key'];

    $result = mssql_query("EXEC SP_lkpCitizenship '$c_account_key1', 'List'");

     if(mssql_num_rows($result) > 0)
    {
        while($row = mssql_fetch_array($result))
        {
            $ctznship[] = $row;
        }
        mssql_free_result($result);
    }

    return $ctznship;
}
function getLanguages1($agencyid)
{
    $ret = array();

        $agencyId                               =   $agencyid;
    $data_fetch1                            =   "SELECT c_account_key FROM  user_agencies
                                                 WHERE agency_id=$agencyId";
    $res_fetch1                             =   mssql_query($data_fetch1);
    $c_acc_key1                             =   mssql_fetch_array($res_fetch1);
    $c_account_key1                         =   $c_acc_key1['c_account_key'];

    $result = mssql_query("EXEC SP_lkpLanguage '$c_account_key1', 'List'");

     if(mssql_num_rows($result) > 0)
    {
        while($row = mssql_fetch_array($result))
        {
            $lng[] = $row;
        }
        mssql_free_result($result);
    }

    return $lng;
}
function getReligion1($agencyid)
{
    $agencyId                           =  $agencyid;
    $data_fetch1                        =   "SELECT c_account_key FROM  user_agencies WHERE agency_id=$agencyId";
    $res_fetch1                         =   mssql_query($data_fetch1);
    $c_acc_key1                         =   mssql_fetch_array($res_fetch1);
    $c_account_key1                     =   $c_acc_key1['c_account_key'];
    $result                             =   mssql_query("EXEC SP_lkpReligion '$c_account_key1', 'List'");
    if(mssql_num_rows($result) > 0)
    {
        while($row = mssql_fetch_array($result))
        {
            $Religion[] = $row;
        }

        mssql_free_result($result);
    }
    return $Religion;
}
function getEthnicity1($agencyid)
{
            $agencyId                               =  $agencyid;
    $data_fetch1                            =   "SELECT c_account_key FROM  user_agencies WHERE agency_id=$agencyId";
    $res_fetch1                             =   mssql_query($data_fetch1);
    $c_acc_key1                             =   mssql_fetch_array($res_fetch1);
    $c_account_key1                         =   $c_acc_key1['c_account_key'];

    $result = mssql_query("EXEC SP_lkpEthnicity '$c_account_key1', 'List'");

     if(mssql_num_rows($result) > 0)
    {
        while($row = mssql_fetch_array($result))
        {
            $Ethnicity[] = $row;
        }
        mssql_free_result($result);
    }

    return $Ethnicity;
}
function getCulture1($agencyid)
{
    $agencyId                               =   $agencyid;
    $data_fetch1                            =   "SELECT c_account_key FROM  user_agencies
                                                 WHERE agency_id=$agencyId";
    $res_fetch1                             =   mssql_query($data_fetch1);
    $c_acc_key1                             =   mssql_fetch_array($res_fetch1);
    $c_account_key1                         =   $c_acc_key1['c_account_key'];

    $result = mssql_query("EXEC SP_lkpCulture '$c_account_key1', 'List'");

     if(mssql_num_rows($result) > 0)
    {
        while($row = mssql_fetch_array($result))
        {
            $cul[] = $row;
        }
        mssql_free_result($result);
    }
    return $cul;
}

	$i  = 0;
foreach ($getrace as $getRace){
								$matrix['Race'][$i]['RaceID']   = $getRace["RaceID"];
								$matrix['Race'][$i]['RaceText'] = $getRace["RaceText"];
								$i++;
}
$matrix['Racecount'] = $i;
$j= 0;	
foreach ($getCitizenShip as $ctznshp){
								$matrix['Nationality'][$j]['NationalityID']   = $ctznshp["NationalityID"];
								$matrix['Nationality'][$j]['NationalityText'] = $ctznshp["NationalityText"];
								$j++;
}
$matrix['Nationalitycount'] = $j;
$k= 0;
foreach ($getLanguages as $lng){

								$matrix['Language'][$k]['LanguageId']   = $lng["LanguageId"];
								$matrix['Language'][$k]['LanguageText'] = $lng["LanguageText"];
								$k++;
}
$matrix['Languagecount'] = $k;
$l = 0;
foreach ($getReligion as $Religion){
								$matrix['Religion'][$l]['ReligionID']   = $Religion["ReligionID"];
								$matrix['Religion'][$l]['ReligionText'] = $Religion["ReligionText"];
								$l++;
}
$matrix['Religioncount'] = $l;
$m =0;
foreach ($getethnicity as $ety){

								$matrix['Ethnicity'][$m]['EthnicityId']   = $ety["EthnicityId"];
								$matrix['Ethnicity'][$m]['EthnicityTypeText'] = $ety["EthnicityTypeText"];
								$m++;
}
$matrix['Ethnicitycount'] = $m;
$n =0;
foreach ($getculture as $cul){
								$matrix['Culture'][$n]['CultureID']   = $ety["CultureID"];
								$matrix['Culture'][$n]['CultureText'] = $ety["CultureText"];
								$n++;
}
$matrix['Culturecount'] = $n;
echo json_encode($matrix);
