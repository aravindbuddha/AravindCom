<?php
include "connection.php";
ini_set('error_reporting',E_ALL);
ini_set('display_errors', 'On');
header("Content-Type: application/json", true);

    $agencyid       =   $_POST['agencyid'];
	$data_fetch1="SELECT c_account_key FROM  user_agencies WHERE agency_id=$agencyid";
	$res_fetch1=mssql_query($data_fetch1);
	$c_acc_key1=mssql_fetch_array($res_fetch1);
	$c_account_key=$c_acc_key1['c_account_key'];
		
		
    $contactID         =   $_POST['contactid'];
    $sp_airsRace       =   "EXEC SP_AddEditRaceInfo '$c_account_key', $contactID, '0','Get'";
    $getAirsRace       =   mssql_query ($sp_airsRace);

    if(mssql_num_rows($getAirsRace) > 0){
        $i=0;
        while($rowRace = mssql_fetch_array($getAirsRace)){
            $getAirsRace1[$i] = $rowRace;
        $i++;
        }
    }



    $sp_airsethencity  = "EXEC SP_AddEditEthnicityInfo '$c_account_key', $contactID, '0','Get'";
    $getAirsEthencity  =   mssql_query ($sp_airsethencity);

    if(mssql_num_rows($getAirsEthencity) > 0){
        $i=0;
        while($rowEthencity = mssql_fetch_array($getAirsEthencity)){
            $getAirsEthencity1[$i] = $rowEthencity;
        $i++;
    
        }
    }


    $sp_airsReligion = "EXEC SP_AddEditReligionInfo '$c_account_key', $contactID, '0','Get'";

    $getAirsReligion            =   mssql_query ($sp_airsReligion);

    if(mssql_num_rows($getAirsReligion) > 0){
        $i=0;
        while($rowReligion = mssql_fetch_array($getAirsReligion)){
            $getAirsReligion1[$i] = $rowReligion;
        $i++;
     // print_r($getAirsEthencity1);
        }
    }


    $sp_airsNationality = "EXEC SP_AddEditNationalityInfo '$c_account_key', $contactID, '0','Get'";

    $getAirsNationality            =   mssql_query ($sp_airsNationality);

    if(mssql_num_rows($getAirsNationality) > 0){
        $i=0;
        while($rowNationality = mssql_fetch_array($getAirsNationality)){
            $getAirsNationality1[$i] = $rowNationality;


        $i++;

        }

    }



    $sp_airsEthncity = "EXEC SP_AddEditEthnicityInfo '$c_account_key', $contactID, '0','Get'";

    $get_airsEthncity            =   mssql_query ($sp_airsEthncity);

    if(mssql_num_rows($get_airsEthncity) > 0){
        $i=0;
        while($rowEthncity = mssql_fetch_array($get_airsEthncity)){
            $getAirsEthncity1[$i] = $rowEthncity;


        $i++;

        }

    }




  $sp_airsLanguage = "EXEC SP_AddEditLanguageInfo '$c_account_key', $contactID, '0','Get'";

    $get_airsLanguage            =   mssql_query ($sp_airsLanguage);

    if(mssql_num_rows($get_airsLanguage) > 0){
        $i=0;
        while($rowLanguage = mssql_fetch_array($get_airsLanguage)){
            $getAirsLanguage1[$i]= $rowLanguage;


        $i++;

        }

    }


  $sp_airsAncestry = "EXEC SP_AddEditCultureInfo '$c_account_key', $contactID, '0','Get'";

    $get_airsAncestry            =   mssql_query ($sp_airsAncestry);

    if(mssql_num_rows($get_airsAncestry) > 0){
        $i=0;
        while($rowAncestry = mssql_fetch_array($get_airsAncestry)){
            $getAirsAncestry1[$i]= $rowAncestry;


        $i++;

        }

    }

   $Ethnicity = "";
   $Language = "";
   $LanguagePrim = "";
   $Religion = "";
   $Ancestry = "";
   $AncestryPrim = "";
   $race = "";
   $CitizenShip = "";
   ///if($result[ROOT][BACKGROUND_INFO])
   // {
       // Race
        if(is_array($getAirsRace1) && $contactID != 0){
             foreach($getAirsRace1 as $raceinfo){
               $race = $raceinfo[RaceText];
                break;
             }
        }else{
            $race = "";
        }

      
            if(is_array($getAirsEthencity1) && $contactID != 0){
                foreach($getAirsEthencity1 as $ethencityinfo){
                    $Ethnicity = $raceinfo[EthnicityTypeText];
                break;
                }
            }else{
                $Ethnicity = "";
            }

  if(is_array($getAirsReligion1) && $contactID != 0){
        foreach($getAirsReligion1 as $religioninfo){
                    $Religion = $religioninfo[ReligionText];
                break;
      
  }
  }else{
      $Religion="";
  }


        // Language

         if(is_array($getAirsLanguage1) && $contactID != 0){
             foreach($getAirsLanguage1 as $languageinfo){
                    $Language = $languageinfo[LanguageText];
                break;

            }
         }

        // Ancestry or culture
        if(is_array($result[ROOT][BACKGROUND_INFO][CONTACT_CULTURE][0]))
        {
            foreach($result[ROOT][BACKGROUND_INFO][CONTACT_CULTURE] as $backgroundInfoAns)
            {
                 $Ancestry = $backgroundInfoAns[CULTURE_TEXT];
                 $AncestryPrim = $backgroundInfoAns[CULTURE_IS_PRIMARY];
                 $AncestryPrim = ($AncestryPrim == "1")?'Yes':'No';
                 break;
            }
        }
        else
        {
            $Ancestry = $result[ROOT][BACKGROUND_INFO][CONTACT_CULTURE][CULTURE_TEXT];
            $AncestryPrim = $result[ROOT][BACKGROUND_INFO][CONTACT_CULTURE][CULTURE_IS_PRIMARY];
            $AncestryPrim = ($AncestryPrim == "1")?'Yes':'No';
        }

      
           if(is_array($getAirsNationality1) && $contactID != 0){
                foreach($getAirsNationality1 as $nationalityinfo){
                   // //$Nationality = $nationalityinfo[EthnicityTypeText];
                break;
                }
            }else{
                $Ethnicity = "";
            }


 
        if(trim($race) =="" && trim($Ethnicity)=="" && $Religion=="" ){
		//echo $sp_airsRace."==".$sp_airsethencity."==".$sp_airsReligion."==".$sp_airsNationality."==".$sp_airsEthncity."==".$sp_airsLanguage."==".$sp_airsAncestry;
		}else{
			  $getCount = count($getAirsNationality1);
                                             for($j=0; $j<$getCount; $j++){
                                            if($j=="0"){
                                                $CitizenShip = $getAirsNationality1[$j]['NationalityText'];
                                            }else{
                                               $CitizenShip.= ", ".$getAirsNationality1[$j]['NationalityText'];
                                            } }
                                          
	    $getEthncityCount = count($getAirsEthncity1);										
         for($j=0; $j<$getEthncityCount; $j++){
                                            if($j=="0"){
                                                $Ethnicity = $getAirsEthncity1[$j]['EthnicityTypeText'];
                                            }else{
                                               $Ethnicity.= ", ".$getAirsEthncity1[$j]['EthnicityTypeText'];
                                            } }
	
        $getLanguageCount = count($getAirsLanguage1);
            $varPrimaryLanguageFlag ='0';
        for($j=0; $j<$getLanguageCount; $j++){ 
            $primaryLan  = $getAirsLanguage1[$j]['PrimaryLanguage'];
            if($primaryLan=="1"){ $varPrimaryLanguageFlag='1'; 
$getAirsLanguage1_text =  $getAirsLanguage1[$j][LanguageText];
$getAirsLanguage1_recordID=$getAirsLanguage1[$j][ContactLanguageID]; 
$getAirsLanguage1_typeid=$getAirsLanguage1[$j][LanguageId];
  }
        }
        if($varPrimaryLanguageFlag =='0'){
			$getAirsLanguage1_text =  '';
        }
          $tempFlag =0;
        for($j=0; $j<$getLanguageCount; $j++){
          $primaryLan  = $getAirsLanguage1[$j]['PrimaryLanguage'];
           if($primaryLan !="1"){
              if($tempFlag=="0"){
                $secondarRecordID = $getAirsLanguage1[$j][ContactLanguageID];
                $secondarTypeID = $getAirsLanguage1[$j][LanguageId];
                $secondarLanguage = $getAirsLanguage1[$j][LanguageText];
              }else{
                 $secondarRecordID .=",". $getAirsLanguage1[$j][ContactLanguageID];
                  $secondarTypeID .=",". $getAirsLanguage1[$j][LanguageId];
                   $secondarLanguage .=", ". $getAirsLanguage1[$j][LanguageText];
              }
               $tempFlag =1;
           }
        }
		
		
                $primayValue = '0';
                $getAnsetryCount = count($getAirsAncestry1);
              for($j=0; $j<$getAnsetryCount; $j++){
                        $primaryAnce  = $getAirsAncestry1[$j]['IsPrimary'];

            
            if($primaryAnce=="1"){    $primayValue = '1';
$getAirsAncestry1_text =  $getAirsAncestry1[$j][CultureText];
$getAirsAncestry1_recordID=$getAirsAncestry1[$j][ContactCultureID]; 
$getAirsAncestry1_typeid=$getAirsAncestry1[$j][CultureId];

          }
        }


      if($primayValue == '0'){
			$getAirsAncestry1_text =  '';
      }		

		
$getCount = count($getAirsNationality1);		
for($j=0; $j<$getCount; $j++){
	if($j=="0"){
		$contactNationalityID = $getAirsNationality1[$j]['ContactNationalityID'];
	}else{
		$contactNationalityID.= ",".$getAirsNationality1[$j]['ContactNationalityID'];
	} 
}

for($j=0; $j<$getCount; $j++){
	if($j=="0"){
		$NationalityId = $getAirsNationality1[$j]['NationalityId'];
	}else{
		$NationalityId.= ",".$getAirsNationality1[$j]['NationalityId'];
	} 
}

for($j=0; $j<$getCount; $j++){
	if($j=="0"){
		$CitizenShip = $getAirsNationality1[$j]['NationalityText'];
	}else{
		$CitizenShip.= ", ".$getAirsNationality1[$j]['NationalityText'];
	} 
}											

$getEthncityCount = count($getAirsEthncity1);

 for($j=0; $j<$getEthncityCount; $j++){
                                if($j=="0"){
                                       $contactEthncityID = $getAirsEthncity1[$j]['ContactEthnicityID'];
                                }else{
                                   $contactEthncityID.= ",".$getAirsEthncity1[$j]['ContactEthnicityID'];
                                } 
        }



                                            for($j=0; $j<$getEthncityCount; $j++){
                                            if($j=="0"){
                                                $EthnicityId = $getAirsEthncity1[$j]['EthnicityId'];
                                            }else{
                                               $EthnicityId.= ",".$getAirsEthncity1[$j]['EthnicityId'];
                                            } }
        

         for($j=0; $j<$getEthncityCount; $j++){
                                            if($j=="0"){
                                                $Ethnicity = $getAirsEthncity1[$j]['EthnicityTypeText'];
                                            }else{
                                               $Ethnicity.= ", ".$getAirsEthncity1[$j]['EthnicityTypeText'];
                                            } }
                                           



		
	                    $tempFlag1 =0;
            for($j=0; $j<$getAnsetryCount; $j++){
                $primaryAnce  = $getAirsAncestry1[$j]['IsPrimary'];
           if($primaryAnce !="1"){
              if($tempFlag1=="0"){
                $secondarRecordID1 = $getAirsAncestry1[$j][ContactCultureID];
                $secondarTypeID1 = $getAirsAncestry1[$j][CultureId];
                $secondarLanguage1 = $getAirsAncestry1[$j][CultureText];
              }else{
                 $secondarRecordID1 .=",". $getAirsAncestry1[$j][ContactCultureID];
                  $secondarTypeID1 .=",". $getAirsAncestry1[$j][CultureId];
                   $secondarLanguage1 .=", ". $getAirsAncestry1[$j][CultureText];
              }
               $tempFlag1 =1;
           }
        }		
$arrRows = array();																												
$arrValues = array();

    array_push($arrValues, $race);
    array_push($arrValues, $CitizenShip );
    array_push($arrValues, $Ethnicity );
    array_push($arrValues, $getAirsLanguage1_text );
    array_push($arrValues, $secondarLanguage);	
    array_push($arrValues, $Religion );
    array_push($arrValues, $getAirsAncestry1_text );
    array_push($arrValues, $secondarLanguage1);	


array_push($arrValues, $raceinfo[RaceId]);
array_push($arrValues, $raceinfo[ContactRaceID]);	
array_push($arrValues, $NationalityId);
array_push($arrValues, $contactNationalityID);
array_push($arrValues, $EthnicityId);
array_push($arrValues, $contactEthncityID);	
array_push($arrValues, $getAirsLanguage1_typeid);
array_push($arrValues, $getAirsLanguage1_recordID);	
array_push($arrValues, $secondarTypeID);
array_push($arrValues, $secondarRecordID);
array_push($arrValues, $religioninfo[ReligionId]);
array_push($arrValues, $religioninfo[ContactReligionID]);	
array_push($arrValues, $getAirsAncestry1_typeid);
array_push($arrValues, $getAirsAncestry1_recordID);	
array_push($arrValues, $secondarTypeID1);
array_push($arrValues, $secondarRecordID1);
    if ($contactID != ' ') {
        array_push($arrRows, array(
            'id' => $contactID,
            'data' => $arrValues
        ));
        
    }		
			
			
		    echo json_encode(array(
        'status' => 'success',
        'response' => 'data readed',
        'backbroundlist' => array(
            'rows' => $arrRows
        )
    ));	
	
	
			
		}



?>

