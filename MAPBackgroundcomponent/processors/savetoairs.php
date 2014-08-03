<?php
include "connection.php";
header("Content-Type: application/json", true);

    $agencyid       =   $_POST['agencyid']; 
	$contactID = $_POST['contact_ID'];

        $data_fetch1="SELECT c_account_key FROM  user_agencies WHERE agency_id=$agencyid";
        $res_fetch1=mssql_query($data_fetch1);
        $c_acc_key1=mssql_fetch_array($res_fetch1);
        $c_account_key1=$c_acc_key1['c_account_key'];
		
        for($bgcount= 1; $bgcount<9 ;$bgcount++)
        {
            switch ($bgcount)
            {
                case 1;
                    $bgvar       = "race";
                    $bginfo      = "race";

                    $postrcrdid    = 'bg_recordID_'.$bgvar;
                    $postinfoid    = 'bg_'.$bgvar;
                    if($_POST[$postinfoid])
                    {    $postinfoid= $_POST['bg_race'];

                    $contactRaceID = $_POST['bg_recordID_race'];

                        $InfoType           = $bginfo;
                        $RecordID           = 0;
                        $InfoID             = intval($_POST[$postinfoid]);
                        //$InfoIsPrimary      = $primaryset;
                //$return             = savebackground($InfoType,$RecordID,$InfoID,$InfoIsPrimary);

                         $sp_airsRace            =   "EXEC SP_AddEditRaceInfo '$c_account_key1', $contactID, '$contactRaceID','Save', $postinfoid";
                         //echo $sp_airsRace;
                         mssql_query($sp_airsRace);
                        }

                   // $bg_return   = setbackgroundtype($bgvar,$bginfo);
                    break;
                case 2;
                    $bgvar       = "ctzn";
                    $bginfo      = "nationality";
                    //$bg_return   = setbackgroundtype($bgvar,$bginfo);
                        $postrcrdid    = 'bg_recordID_'.$bgvar;
                    $postinfoid    = 'bg_'.$bgvar;




                  $sp_get_airsRace            =   "EXEC SP_AddEditNationalityInfo '$c_account_key1', $contactID, '0','Get', '0'";



                  $getAirsRcae =  mssql_query ($sp_get_airsRace);

                  if(mssql_num_rows($getAirsRcae) > 0){
                    $i=0;
                        while($row = mssql_fetch_array($getAirsRcae)){
                            $contactNationalityId = $row['ContactNationalityID'];

                            $deleteRace  = "EXEC SP_AddEditNationalityInfo '$c_account_key1', $contactID, '$contactNationalityId','Delete'";
                            mssql_query($deleteRace);

                            $i++;
                        // print_r($result);
                        }}



                     if($_POST[$postinfoid])
                    {

                        $contactCitizenID = $_POST['bg_recordID_ctzn'];


                       $contactCitizenID = explode(",",$contactCitizenID);


                        $InfoType           = $bginfo;
                        $RecordID           = 0;
                        $InfoID             = intval($_POST[$postinfoid]);

                            $arrayCount = count($_POST['bg_ctzn']);

                            for($i=0; $i < $arrayCount; $i++){
                                $postinfoid= $_POST['bg_ctzn'][$i];
                               $sp_airsRace            =   "EXEC SP_AddEditNationalityInfo '$c_account_key1', $contactID, '0','Save', $postinfoid";
                              //  echo $sp_airsRace;
                                mssql_query($sp_airsRace);
                            }                        

                        }


                    break;
                case 3;
                    $bgvar          = "ethn";
                    $bginfo         = "ethnicity"; 
                    $postrcrdid     = 'bg_recordID_'.$bgvar;
                    $postinfoid     = 'bg_'.$bgvar;

                    $sp_get_airsEthnicity            =   "EXEC SP_AddEditEthnicityInfo '$c_account_key1', $contactID, '0','Get', '0'";

               
                    $getAirsEthnicity =  mssql_query ($sp_get_airsEthnicity);

                    if(mssql_num_rows($getAirsEthnicity) > 0){
                    $i=0;
                        while($row = mssql_fetch_array($getAirsEthnicity)){
                            $contactEthnicityId = $row['ContactEthnicityID'];

                            $deleteEthnicity  = "EXEC SP_AddEditEthnicityInfo '$c_account_key1', $contactID, '$contactEthnicityId','Delete'";
                            mssql_query($deleteEthnicity);

                            $i++;
                    
                        }}



          if($_POST[$postinfoid])
                    {

                        $contactEthncityId = $_POST['bg_recordID_ethn'];


                       $contactEthncityId = explode(",",$contactEthncityId);


                        $InfoType           = $bginfo;
                        $RecordID           = 0;
                        $InfoID             = intval($_POST[$postinfoid]);

                            $arrayCount = count($_POST['bg_ethn']);

                            for($i=0; $i < $arrayCount; $i++){
                                $postinfoid= $_POST['bg_ethn'][$i];
                               $sp_airsEthencity            =   "EXEC SP_AddEditEthnicityInfo '$c_account_key1', $contactID, '0','Save', $postinfoid";
                               // echo $sp_airsEthencity;
                                mssql_query($sp_airsEthencity);
                            }                         

                        }

                    break;
                case 4;
                    $bgvar       = "lang";
                    $bginfo      = "language";

                    $postrcrdid    = 'bg_recordID_'.$bgvar;
                    $postinfoid    = 'bg_'.$bgvar;
                     if($_POST[$postinfoid])
                    {

                        $contactLanguageId = $_POST['bg_recordID_lang'];


                      // $contactLanguageId = explode(",",$contactEthncityId);


                        $InfoType           = $bginfo;
                        $RecordID           = 0;
                        $InfoID             = intval($_POST[$postinfoid]);

                           // $arrayCount = count($_POST['bg_lang']);

                          //  for($i=0; $i < $arrayCount; $i++){
                                $postinfoid= $_POST['bg_lang'];
                               $sp_airsLanguage            =   "EXEC SP_AddEditLanguageInfo '$c_account_key1', $contactID, '$contactLanguageId','Save',$postinfoid,1";
                                //echo $sp_airsLanguage;
                                mssql_query($sp_airsLanguage);
                           // }
                           // echo $arrayCount;

                           // print_r($_POST['bg_ctzn']); exit();

                         //$sp_airsRace            =   "EXEC SP_AddEditNationalityInfo '$c_account_key1', $contactID, '$contactCitizenID','Save', $postinfoid";
                         //echo $sp_airsRace;

                        }
                   // $bg_return   = setbackgroundtype($bgvar,$bginfo);
                    break;
                case 5;
                    $bgvar       = "relg";
                    $bginfo      = "religion";


                    //$bg_return   = setbackgroundtype($bgvar,$bginfo);

                     $postrcrdid    = 'bg_recordID_'.$bgvar;
                    $postinfoid    = 'bg_'.$bgvar;
                    if($_POST[$postinfoid])
                    {    $postinfoid= $_POST['bg_relg'];

                    $contactReligionID = $_POST['bg_recordID_relg'];

                        $InfoType           = $bginfo;
                        $RecordID           = 0;
                        $InfoID             = intval($_POST[$postinfoid]);
                        //$InfoIsPrimary      = $primaryset;
                //$return             = savebackground($InfoType,$RecordID,$InfoID,$InfoIsPrimary);

                         $sp_airsReligion            =   "EXEC SP_AddEditReligionInfo '$c_account_key1', $contactID, '$contactReligionID','Save', $postinfoid";
                        // echo $sp_airsReligion;
                         mssql_query($sp_airsReligion);
                        }


                    break;
                case 6;
                    $bgvar       = "ancs";
                    $bginfo      = "culture";

                    $postrcrdid    = 'bg_recordID_'.$bgvar;
                    $postinfoid    = 'bg_ancs';


                    //print_r($_POST);
                     if($_POST[$postinfoid])
                    {

                        $contactAncestryId = $_POST['bg_recordID_ancs'];


                      // $contactLanguageId = explode(",",$contactEthncityId);


                        $InfoType           = $bginfo;
                        $RecordID           = 0;
                        $InfoID             = intval($_POST[$postinfoid]);

                           // $arrayCount = count($_POST['bg_lang']);

                          //  for($i=0; $i < $arrayCount; $i++){
                                $postinfoid= $_POST['bg_ancs'];
                               $sp_airsAncestry            =   "EXEC SP_AddEditCultureInfo '$c_account_key1', $contactID, '$contactAncestryId','Save',$postinfoid,1";
                               echo $sp_airsAncestry;
                                mssql_query($sp_airsAncestry);
                     

                        }


                    //$bg_return   = setbackgroundtype($bgvar,$bginfo);
                    break;


                 case 7;
                    $bgvar       = "lang1";
                    $bginfo      = "language";

                    $postrcrdid    = 'bg_recordID_'.$bgvar;
                    $postinfoid    = 'bg_'.$bgvar;




                    $sp_get_airsSecondaryLanguage            =   "EXEC SP_AddEditLanguageInfo '$c_account_key1', $contactID, '0','Get', '0'";

                    //echo $sp_get_airsRace;



                    $getAirsSecondaryLanguage =  mssql_query ($sp_get_airsSecondaryLanguage);

                    if(mssql_num_rows($getAirsSecondaryLanguage) > 0){
                    $i=0;
                        while($row = mssql_fetch_array($getAirsSecondaryLanguage)){
                            $contactSecondaryLanguage = $row['ContactLanguageID'];
                            $secondarID             = $row['PrimaryLanguage'];

                            if($secondarID !="1"){

                            $deleteSeconadryLanguage  = "EXEC SP_AddEditLanguageInfo '$c_account_key1', $contactID, '$contactSecondaryLanguage','Delete'";
                            mssql_query($deleteSeconadryLanguage);
                            }

                            $i++;
                        // print_r($result);
                        }}



                    if($_POST[$postinfoid])
                    {

                        $contactLanguageId = $_POST['bg_recordID_lang1'];


                      $contactLanguageId = explode(",",$contactLanguageId);


                        $InfoType           = $bginfo;
                        $RecordID           = 0;
                        $InfoID             = intval($_POST[$postinfoid]);

                            $arrayCount = count($_POST['bg_lang1']);

                            for($i=0; $i < $arrayCount; $i++){
                                $postinfoid= $_POST['bg_lang1'][$i];
                               $sp_airsLanguage            =   "EXEC SP_AddEditLanguageInfo '$c_account_key1', $contactID, '0','Save',$postinfoid,0";
                               // echo $sp_airsLanguage;
                                mssql_query($sp_airsLanguage);
                            }
                    

                        }
                   // $bg_return   = setbackgroundtype($bgvar,$bginfo);
                    break;



                    case 8;
                    $bgvar       = "ancs1";
                    $bginfo      = "culture";

                    $postrcrdid    = 'bg_recordID_'.$bgvar;
                    $postinfoid    = 'bg_ancs1';





                $sp_get_airsSecondaryAncestry            =   "EXEC SP_AddEditCultureInfo '$c_account_key1', $contactID, '0','Get', '0'";

                    //echo $sp_get_airsRace;



                    $getAirsSecondaryAncestry =  mssql_query ($sp_get_airsSecondaryAncestry);

                    if(mssql_num_rows($getAirsSecondaryAncestry) > 0){
                            $i=0;
                        while($row = mssql_fetch_array($getAirsSecondaryAncestry)){
                            $contactSecondaryAncestry = $row['ContactCultureID'];
                            $secondarID             = $row['IsPrimary'];

                            if($secondarID !="1"){

                            $deleteSeconadryAncestry  = "EXEC SP_AddEditCultureInfo '$c_account_key1', $contactID, '$contactSecondaryAncestry','Delete'";
                            mssql_query($deleteSeconadryAncestry);
                            }

                            $i++;
                        // print_r($result);
                        }

                        }

                    if($_POST[$postinfoid])
                    {

                        //$contactAncestryId = $_POST['bg_recordID_ancs1'];


                      // $contactLanguageId = explode(",",$contactEthncityId);


                        $InfoType           = $bginfo;
                        $RecordID           = 0;
                        $InfoID             = intval($_POST[$postinfoid]);

                            $arrayCount = count($_POST['bg_ancs1']);

                           for($i=0; $i < $arrayCount; $i++){
                                $postinfoid= $_POST['bg_ancs1'][$i];
                               $sp_airsAncestry            =   "EXEC SP_AddEditCultureInfo '$c_account_key1', $contactID, '0','Save',$postinfoid";
                               echo $sp_airsAncestry;
                                mssql_query($sp_airsAncestry);
                            }
                      

                        }



                    break;


            }

        }
        //print_r($bg_return);
        if($bg_return[ROOT][STATUS] == 'SUCCESS')
        {
            echo $bg_return[ROOT][MESSAGE];
        }
        else
        {
            print_r($bg_return[ROOT][MESSAGE]);
        }