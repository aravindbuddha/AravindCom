<?php

// get the HTML
	
    ob_start();
	
	$home_study_was_ompleted_by = $_GET["home_study_was_ompleted_by"];	
	$name_of_family = $_GET["name_of_family"];	
	$address = $_GET["address"];	
	$city = $_GET["city"];	
	$state = $_GET["state"];	
	$zip_code = $_GET["zip_code"];	
	$home_phone = $_GET["home_phone"];	
	$email_address1 = $_GET["email_address1"];	
	$cell_phone1 = $_GET["cell_phone1"];	
	$home_phone = $_GET["work_phone"];	
	$email_address1 = $_GET["email_address2"];	
	$cell_phone1 = $_GET["cell_phone2"];	

	$application_received_on = $_GET["application_received_on"];	
	$home_study_approved_on = $_GET["home_study_approved_on"];	
	$future_placement = $_GET["future_placement"];	
	$child_specific_placement = $_GET["child_specific_placement"];	
	
	$religion1 = $_GET["religion1"];	
	$religion2 = $_GET["religion2"];	
	$last_name1 = $_GET["last_name1"];	
	$last_name2 = $_GET["last_name2"];	
	$maiden_name1 = $_GET["maiden_name1"];	
	$maiden_name2 = $_GET["maiden_name2"];	
	$date_of_birth1 = $_GET["date_of_birth1"];	
	$date_of_birth2 = $_GET["date_of_birth2"];	
	$birthplace1 = $_GET["birthplace1"];	
	$birthplace2 = $_GET["birthplace2"];	
	$gender1 = $_GET["gender1"];	
	$gender2 = $_GET["gender2"];	
	$education1 = $_GET["education1"];	
	$education2 = $_GET["education2"];	
	$language1 = $_GET["language1"];	
	$language2 = $_GET["language2"];	
	$occupation1 = $_GET["occupation1"];	
	$occupation2 = $_GET["occupation2"];		
	$employer1 = $_GET["employer1"];	
	$employer2 = $_GET["employer2"];					
	$annual_gross_income1 = $_GET["annual_gross_income1"];	
	$annual_gross_income2 = $_GET["annual_gross_income2"];						
	$tribal_affiliation1 = $_GET["tribal_affiliation1"];	
	$tribal_affiliation2 = $_GET["tribal_affiliation2"];		
				
	$date_of_current_marriage = $_GET["date_of_current_marriage"];	
	$location = $_GET["location"];	
	$first_name1 = $_GET["first_name1"];					
	$first_name2 = $_GET["first_name2"];	
	$$bate_begun1 = $_GET["$bate_begun1"];	
	$$bate_begun2 = $_GET["$bate_begun2"];				
	$$bate_begun1 = $_GET["$bate_begun3"];	
	$$bate_begun2 = $_GET["$bate_begun4"];				
	$date_ended1 = $_GET["date_ended1"];	
	$date_ended2 = $_GET["date_ended2"];	
	$date_ended2 = $_GET["date_ended3"];	
	$date_ended2 = $_GET["date_ended4"];	
	$location1 = $_GET["location1"];					
	$location2 = $_GET["location2"];					
	$location3 = $_GET["location3"];					
	$location4 = $_GET["location4"];					

	$dates_location3 = $_GET["dates_location1"];	
	$dates_date_person3 = $_GET["dates_date_person1"];					
	$dates_date3 = $_GET["dates_date1"];	
	$dates_location3 = $_GET["dates_location2"];	
	$dates_date_person3 = $_GET["dates_date_person2"];					
	$dates_date3 = $_GET["dates_date2"];	
	$dates_location3 = $_GET["dates_location3"];	
	$dates_date_person3 = $_GET["dates_date_person3"];					
	$dates_date3 = $_GET["dates_date3"];	
	
	$sons_first_name1 = $_GET["sons_age1"];					
	$sons_age1 = $_GET["sons_age1"];	
	$sons_occupation_school1 = $_GET["sons_occupation_school1"];	
	$sons_location_and_living1 = $_GET["sons_location_and_living1"];					
	$sons_first_name2 = $_GET["sons_age2"];					
	$sons_age2 = $_GET["sons_age2"];	
	$sons_occupation_school2 = $_GET["sons_occupation_school2"];	
	$sons_location_and_living2 = $_GET["sons_location_and_living2"];	
	$sons_first_name3 = $_GET["sons_age3"];					
	$sons_age3 = $_GET["sons_age3"];	
	$sons_occupation_school3 = $_GET["sons_occupation_school3"];	
	$sons_location_and_living3 = $_GET["sons_location_and_living3"];	
	
	   
	$extended_first_name1 = $_GET["extended_first_name1"];					
	$extended_age1 = $_GET["extended_age1"];	
	$extended_relationship1 = $_GET["extended_relationship1"];					
	$extended_occupation1 = $_GET["extended_occupation1"];	
	$extended_location_and_living1 = $_GET["extended_location_and_living1"];					
	$extended_first_name2 = $_GET["extended_first_name2"];					
	$extended_age2 = $_GET["extended_age2"];	
	$extended_relationship2 = $_GET["extended_relationship2"];					
	$extended_occupation2 = $_GET["extended_occupation2"];	
	$extended_location_and_living2 = $_GET["extended_location_and_living2"];					
	$extended_first_name3 = $_GET["extended_first_name3"];					
	$extended_age3 = $_GET["extended_age3"];	
	$extended_relationship3 = $_GET["extended_relationship3"];					
	$extended_occupation3 = $_GET["extended_occupation3"];	
	$extended_location_and_living3 = $_GET["extended_location_and_living3"];					
	$extended_first_name4 = $_GET["extended_first_name4"];					
	$extended_age4 = $_GET["extended_age4"];	
	$extended_relationship4 = $_GET["extended_relationship4"];					
	$extended_occupation4 = $_GET["extended_occupation4"];	
	$extended_location_and_living4 = $_GET["extended_location_and_living4"];					
	
	   
	$others_first_name1 = $_GET["others_first_name1"];					
	$others_age1 = $_GET["others_age1"];	
	$others_relationship1 = $_GET["others_relationship1"];	
	$others_occupation1 = $_GET["others_occupation1"];					
	$others_current_situation1 = $_GET["others_current_situation1"];	
	$others_first_name2 = $_GET["others_first_name2"];					
	$others_age2 = $_GET["others_age2"];	
	$others_relationship2 = $_GET["others_relationship2"];	
	$others_occupation2 = $_GET["others_occupation2"];					
	$others_current_situation2 = $_GET["others_current_situation2"];	
	$others_first_name3 = $_GET["others_first_name3"];					
	$others_age3 = $_GET["others_age3"];	
	$others_relationship3 = $_GET["others_relationship3"];	
	$others_occupation3 = $_GET["others_occupation3"];					
	$others_current_situation3 = $_GET["others_current_situation3"];	

	 	
	$references_first_name1 = $_GET["references_first_name1"];					
	$references_relationship1 = $_GET["references_relationship1"];	
	$references_date_received1 = $_GET["references_date_received1"];	
	$references_first_name2 = $_GET["references_first_name2"];					
	$references_relationship2 = $_GET["references_relationship2"];	
	$references_date_received2 = $_GET["references_date_received2"];	
	$references_first_name3 = $_GET["references_first_name3"];					
	$references_relationship3 = $_GET["references_relationship3"];	
	$references_date_received3 = $_GET["references_date_received3"];	

	$medical_report1 = $_GET["medical_report1"];	
	$medical_report2 = $_GET["medical_report2"];	
	$medical_report3 = $_GET["medical_report3"];	
	$medical_report4 = $_GET["medical_report4"];		
	$school_report1 = $_GET["school_report1"];	
	$school_report1 = $_GET["school_report2"];	
	$school_report1 = $_GET["school_report3"];					
	
	$applicant_first_name1 = $_GET["applicant_first_name1"];	
	$applicant_first_name2 = $_GET["applicant_first_name2"];	
	$applicant_first_name3 = $_GET["applicant_first_name3"];					
	$applicant_first_name4 = $_GET["applicant_first_name4"];					
	$applicant_first_name5 = $_GET["applicant_first_name5"];					
	$applicant_first_name6 = $_GET["applicant_first_name6"];					
	$applicant_first_name7 = $_GET["applicant_first_name7"];					
	$applicant_first_name8 = $_GET["applicant_first_name8"];		
	
	$motivation = $_GET["motivation"];			
			
	$home_and_community = $_GET["home_and_community"];	
	
	$applicant_profile_first1 = $_GET["applicant_profile_first1"];	
	
	$applicant_profile_first2 = $_GET["applicant_profile_first2"];		
				
	$family_lifestyle = $_GET["family_lifestyle"];		
				
	$legal_financial_notifications = $_GET["legal_financial_notifications"];	
	
	$psychosocial_evaluation_report = $_GET["psychosocial_evaluation_report"];	
					
	$history_first_name = $_GET["history_first_name"];	
	
	$characteristics_first_name = $_GET["characteristics_first_name"];		
				
	$marital_relationship = $_GET["marital_relationship"];	
	
	$residing_frequently_home = $_GET["residing_frequently_home"];		
				
	$relationships_first_name1 = $_GET["relationships_first_name1"];	
	
	$relationships_first_name2 = $_GET["relationships_first_name2"];	
	
	$physical_social_environment = $_GET["physical_social_environment"];		
				
	$general_parenting = $_GET["general_parenting"];	
	
	$specialized_parenting1 = $_GET["specialized_parenting1"];						
	$specialized_date1 = $_GET["specialized_date1"];
	$specialized_date2 = $_GET["specialized_date1"];
	$specialized_date3 = $_GET["specialized_date1"];
	$specialized_date4 = $_GET["specialized_date1"];			
	$specialized_training1 = $_GET["specialized_training1"];					
	$specialized_training2 = $_GET["specialized_training1"];					
	$specialized_training3 = $_GET["specialized_training1"];					
	$specialized_training4 = $_GET["specialized_training1"];					
	$specialized_attendees1 = $_GET["specialized_attendees1"];					
	$specialized_attendees2 = $_GET["specialized_attendees1"];					
	$specialized_attendees3 = $_GET["specialized_attendees1"];					
	$specialized_attendees4 = $_GET["specialized_attendees1"];					
	$specialized_location1 = $_GET["specialized_location1"];					
	$specialized_location2 = $_GET["specialized_location1"];					
	$specialized_location3 = $_GET["specialized_location1"];					
	$specialized_location4 = $_GET["specialized_location1"];					
	$specialized_parenting2 = $_GET["specialized_parenting2"];		
				
	$adoption_issues = $_GET["adoption_issues"];	
					
	$placement_considerations = $_GET["placement_considerations"];	
					
	$recommendation1 = $_GET["recommendation1"];		
				
	$name_home_study_practitioner = $_GET["name_home_study_practitioner"];					
	$title_home_study_practitioner = $_GET["title_home_study_practitioner"];					
	$recommendation_date1 = $_GET["recommendation_date1"];					
	$name_supervisor = $_GET["name_supervisor"];					
	$title_supervisor = $_GET["title_supervisor"];
	$recommendation_date2 = $_GET["recommendation_date2"];
	
	$name_of_approving_authority = $_GET["name_of_approving_authority"];
	$title_of_approving_authority = $_GET["title_of_approving_authority"];
	$date_of_approving_authority = $_GET["title_of_approving_authority"];
	
	$receipt_name1 = $_GET["receipt_name1"];
	$receipt_name2 = $_GET["receipt_name2"];
	$receipt_date1 = $_GET["receipt_date1"];
	$receipt_date2 = $_GET["receipt_date2"];
	
	$title_supervisor = $_GET["title_supervisor"];
	$title_supervisor = $_GET["title_supervisor"];					

	
	
?>

        <style>
		* {
			/*margin: 0px;
			padding: 0px;*/
			border: none;
			font-family:Arial, Helvetica, sans-serif;
			font-size: 12px;
		}

		.header{
			background: #000;
			color: #fff;
			font-weight: bold;
			width: 700 !important;
		}

		table {
			width: 98%;
			border: 1px #000 solid;
			margin: 5px;
		}
		
		td {
			padding: 5px;
			vertical-align: top;
		}

		h1{
			padding: 5px;
		}

		h2 {
			font-weight: normal;
			font-size:10px;
		}

		h1 input {
			margin-right: 5px;
			vertical-align: middle;
		}

		p {
			margin:5px;
		}

		td span{
			padding-left: 150px;
		}
		#tb1{
			width:100% !important;
		}
		
		</style>
		
        <title>SAFE Home Study</title>
	</head>

	<body>
	

						<table cellspacing="2" cellpadding="0">
				    		<tr>
        						<td class="header" colspan="3" width="700px">SAFE HOME STUDY</td>
							</tr>
							<tr valign="top">
								<td width="200" height="109"><b>Home study was completed by:</b></td>
								<td colspan="2" width="500"><?php echo $customer_firstName; ?></td>
							</tr>
							<tr>
								<td colspan="3" width="100%"><b>Name of Family:</b> <?php echo $name_of_family; ?></td>
							</tr>
							<tr>
								<td colspan="3" width="100%"><b>Address:</b> <?php echo $address; ?></td>
							</tr>
							<tr>
								<td><strong>City:</strong> <?php echo $city; ?></td>
								<td><strong>State:</strong> <?php echo $state; ?></td>
								<td><strong>ZIP Code:</strong> <?php echo $zip_code; ?></td>
							</tr>
							<tr>
								<td><strong>Home Phone:</strong> <?php echo $home_phone; ?></td>
								<td><strong>Email Address:</strong> <?php echo $email_address1; ?></td>
								<td><strong>Cell Phone:</strong> <?php echo $cell_phone1; ?></td>
							</tr>    
							<tr>
								<td><strong>Work Phone:</strong> <?php echo $work_phone; ?></td>
								<td><strong>Email Address:</strong> <?php echo $email_address2; ?></td>
								<td><strong>Cell Phone:</strong> <?php echo $cell_phone2; ?></td>
							</tr>
						</table>

      
						<table cellspacing="2" cellpadding="0">
						    <tr>
								<td class="header" colspan="2" width="700">APPLICANT DISPOSITION</td>
							</tr>
				    		<tr>
    							<td><strong>Application received on:</strong> <?php echo $application_received_on; ?></td>
					    		<td><strong>Home study approved on:</strong> <?php echo $home_study_approved_on; ?></td>        
						    </tr>
				    		<tr>
				    			<td colspan="2">
									<h1><input type="checkbox" <?php if( $future_placement > 0 )echo "checked='checked'";?> />Future Placement</h1>
									<p>The Applicant(s) have applied for adoption approval for placement of one  between the ages of Age and Age  The family is applying to adopt a child of race or ethnicity. They prefer that the child be basically healthy; however, they are accepting of unknown or undetected health concerns. The Applicant(s)  open to placement of  with the oldest child not being more than Age.  If open to a sibling group or unrelated children, the number of children is limited to Number.</p>
									<h1><input type="checkbox" <?php if( $child_specific_placement > 0 )echo "checked='checked'";?> />Child Specific Placement</h1>
									<p>The Applicant(s)  applied to become an adoptive family for Name(s), birthdate(s).</p>
								</td>
							</tr>
						</table>



		<table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" colspan="2" width="700">APPLICANT INFORMATION</td>
			</tr>
    		<tr>
    			<td width="50%"><strong>First Name:</strong> <?php echo $first_name1; ?></td>
	        	<td><strong>First Name:</strong> <?php echo $first_name2; ?></td>
	    	</tr>
		    <tr>
    			<td><strong>Last Name:</strong> <?php echo $last_name1; ?></td>
        		<td><strong>Last Name:</strong> <?php echo $last_name1; ?></td>
		    </tr>
    		<tr>
    			<td><strong>Maiden Name (if applicable):</strong> <?php echo $maiden_name1; ?></td>
	        	<td><strong>Maiden Name (if applicable):</strong> <?php echo $maiden_name2; ?></td>
	    	</tr>
		    <tr>
    			<td><strong>Date of Birth:</strong> <?php echo $date_of_birth1; ?></td>
        		<td><strong>Date of Birth:</strong> <?php echo $date_of_birth2; ?></td>
		    </tr>
    		<tr>
    			<td><strong>Birthplace:</strong> <?php echo $date_of_birth1; ?></td>
	        	<td><strong>Birthplace:</strong> <?php echo $date_of_birth2; ?></td>
	    	</tr>
		    <tr>
    			<td><strong>Gender:</strong> <?php echo $gender1; ?></td>
        		<td><strong>Gender:</strong> <?php echo $gender2; ?></td>
		    </tr>
    		<tr>
	    		<td><strong>Religion:</strong> <?php echo $religion1; ?></td>
		        <td><strong>Religion:</strong> <?php echo $religion1; ?></td>
    		</tr>
		    <tr>
    			<td><strong>Education:</strong> <?php echo $education1; ?></td>
        		<td><strong>Education:</strong> <?php echo $education1; ?></td>
		    </tr>
    		<tr>
    			<td><strong>Language(s):</strong> <?php echo $language1; ?>s</td>
	        	<td><strong>Language(s):</strong> <?php echo $language2; ?></td>
	    	</tr>
		    <tr>
    			<td><strong>Occupation:</strong> <?php echo $occupation1; ?></td>
        		<td><strong>Occupation:</strong> <?php echo $occupation2; ?></td>
		    </tr>
    		<tr>
	    		<td><strong>Employer:</strong> <?php echo $employer1; ?></td>
    	    	<td><strong>Employer:</strong> <?php echo $employer2; ?></td>
		    </tr>
    		<tr>
    			<td><strong>Annual Gross Income:</strong> <?php echo $annual_gross_income1; ?></td>
	        	<td><strong>Annual Gross Income:</strong> <?php echo $annual_gross_income2; ?></td>
	    	</tr>
		    <tr>
    			<td><strong>Tribal Affiliation:</strong> <?php echo $tribal_affiliation1; ?></td>
        		<td><strong>Tribal Affiliation:</strong> <?php echo $tribal_affiliation1; ?></td>
		    </tr>
		</table>
        
   		<table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" colspan="3"  width="700">MARITAL INFORMATION</td>
			</tr>
            <tr>
            	<td colspan="3"><strong>Date of Current Marriage: <?php echo $date_of_current_marriage; ?></strong><span><strong>Location:</strong></span> <?php echo $location; ?></td>
            </tr>
            <tr>
            	<td colspan="3" align="center"><h1>Past Marriage</h1></td>
            </tr>
            <tr>
            	<td colspan="3"><strong>First Name:</strong>  <?php echo $first_name1; ?></td>
            </tr>
            <tr>
            	<td width="200" ><strong>Date Begun:</strong> <?php echo $bate_begun1; ?></td>
                <td width="200"><strong>Date Ended:</strong> <?php echo $date_ended1; ?></td>
                <td><strong>Location:</strong> <?php echo $location1; ?></td>
            </tr>
            <tr>
            	<td width="200" ><strong>Date Begun:</strong> <?php echo $bate_begun2; ?></td>
                <td width="200"><strong>Date Ended:</strong> <?php echo $date_ended2; ?></td>
                <td><strong>Location:</strong> <?php echo $location2; ?></td>
            </tr>
            <tr>
            	<td colspan="3"><strong>First Name:</strong>  <?php echo $first_name2; ?></td>
            </tr>
            <tr>
            	<td width="200" ><strong>Date Begun:</strong> <?php echo $bate_begu3; ?></td>
                <td width="200"><strong>Date Ended:</strong> <?php echo $date_ended3; ?></td>
                <td><strong>Location:</strong> <?php echo $location3; ?></td>
            </tr>
            <tr>
            	<td width="200" ><strong>Date Begun:</strong> <?php echo $bate_begun4; ?></td>
                <td width="200"><strong>Date Ended:</strong> <?php echo $date_ended4; ?></td>
                <td><strong>Location:</strong> <?php echo $location4; ?></td>
            </tr>
		</table>
        
        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" colspan="3" width="700">DATES OF HOME STUDY FACE-TO-FACE CONTACTS</td>
			</tr>
            <tr align="center">
	            <td width="150px"><strong>Date</strong></td>
	            <td width=""><strong>Person(s) Interviewed</strong></td>
	            <td width=""><strong>Location</strong></td>
            </tr>
            <tr align="center">
	            <td><?php echo $dates_date1; ?></td>
	            <td><?php echo $dates_date_person1; ?></td>
	            <td><?php echo $dates_location1; ?></td>
            </tr>
            <tr align="center">
	            <td><?php echo $dates_date2; ?></td>
	            <td><?php echo $dates_date_person2; ?></td>
	            <td><?php echo $dates_location2; ?></td>
            </tr>
            <tr align="center">
	            <td><?php echo $dates_date3; ?></td>
	            <td><?php echo $dates_date_person3; ?></td>
	            <td><?php echo $dates_location3; ?></td>
            </tr>
		</table>

        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" colspan="4" width="700">SONS AND DAUGHTERS OF APPLICANT(S)</td>
			</tr>
            <tr align="center">
	            <td width="300px"><strong>First Name</strong></td>
	            <td width="30"><strong>Age</strong></td>
	            <td><strong>Occupation or School Situation</strong></td>
	            <td><strong>Location and Living Situation</strong><br>(Date of death if deceased)</td>
            </tr>
            <tr align="center">
	            <td><?php echo $sons_first_name1; ?></td>
	            <td><?php echo $sons_age1; ?></td>
	            <td><?php echo $sons_occupation_school1; ?></td>
	            <td><?php echo $sons_location_and_living1; ?></td>
            </tr>
            <tr align="center">
	            <td><?php echo $sons_first_name2; ?></td>
	            <td><?php echo $sons_age2; ?></td>
	            <td><?php echo $sons_occupation_school2; ?></td>
	            <td><?php echo $sons_location_and_living2; ?></td>
            </tr>
            <tr align="center">
	            <td><?php echo $sons_first_name3; ?></td>
	            <td><?php echo $sons_age3; ?></td>
	            <td><?php echo $sons_occupation_school3; ?></td>
	            <td><?php echo $sons_location_and_living3; ?></td>
            </tr>    
		</table>
        
        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" colspan="5" width="700">EXTENDED FAMILY MEMBERS:</td>
			</tr>
            <tr>
				<td colspan="5" align="center"><h2>Include Applicant’s birth parents, adoptive parents, step parents, siblings and other prominent extended family members (living or deceased)</h2></td>
			</tr>            
            <tr align="center">
	            <td width="300px"><strong>First Name</strong></td>
	            <td width="30"><strong>Age</strong></td>
	            <td><strong>Relationship</strong></td>
	            <td><strong>Occupation</strong></td>
	            <td><strong>Location and Living Situation</strong><br>(Date of death if deceased)</td>
            </tr>
            <tr align="center">
	            <td><?php echo $extended_first_name1; ?></td>
	            <td><?php echo $extended_age1; ?></td>
	            <td><?php echo $extended_relationship1; ?></td>
	            <td><?php echo $extended_occupation1; ?></td>
	            <td><?php echo $extended_location_and_living1; ?></td>
            </tr>
            <tr align="center">
	            <td><?php echo $extended_first_name2; ?></td>
	            <td><?php echo $extended_age2; ?></td>
	            <td><?php echo $extended_relationship2; ?></td>
	            <td><?php echo $extended_occupation2; ?></td>
	            <td><?php echo $extended_location_and_living2; ?></td>
            </tr>
            <tr align="center">
	            <td><?php echo $extended_first_name3; ?></td>
	            <td><?php echo $extended_age3; ?></td>
	            <td><?php echo $extended_relationship3; ?></td>
	            <td><?php echo $extended_occupation3; ?></td>
	            <td><?php echo $extended_location_and_living3; ?></td>
            </tr>
            <tr align="center">
	            <td><?php echo $extended_first_name4; ?></td>
	            <td><?php echo $extended_age4; ?></td>
	            <td><?php echo $extended_relationship4; ?></td>
	            <td><?php echo $extended_occupation4; ?></td>
	            <td><?php echo $extended_location_and_living4; ?></td>
            </tr>
		</table>
        
        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" colspan="5" width="700">OTHERS RESIDING OR FREQUENTLY IN THE HOME</td>
			</tr>            
            <tr align="center">
	            <td width="300px"><strong>First Name</strong></td>
	            <td width="30"><strong>Age</strong></td>
	            <td><strong>Relationship</strong></td>
	            <td><strong>Occupation</strong></td>
	            <td><strong>Current Situation</strong></td>
            </tr>
            <tr align="center">
	            <td><?php echo $others_first_name1; ?></td>
	            <td><?php echo $others_age1; ?></td>
	            <td><?php echo $others_relationship1; ?></td>
	            <td><?php echo $others_occupation1; ?></td>
	            <td><?php echo $others_current_situation1; ?></td>
            </tr>
            <tr align="center">
	            <td><?php echo $others_first_name2; ?></td>
	            <td><?php echo $others_age2; ?></td>
	            <td><?php echo $others_relationship2; ?></td>
	            <td><?php echo $others_occupation2; ?></td>
	            <td><?php echo $others_current_situation2; ?></td>
            </tr>
            <tr align="center">
	            <td><?php echo $others_first_name3; ?></td>
	            <td><?php echo $others_age3; ?></td>
	            <td><?php echo $others_relationship3; ?></td>
	            <td><?php echo $others_occupation3; ?></td>
	            <td><?php echo $others_current_situation3; ?></td>
            </tr>
		</table>
        
		<table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" colspan="5" width="700">REFERENCES</td>
			</tr>            
            <tr align="center">
	            <td><strong>First Name</strong></td>
	            <td><strong>Relationship to Applicant(s)</strong></td>
	            <td><strong>Date Received</strong></td>
            </tr>
            <tr align="center">
	            <td><?php echo $references_first_name1; ?></td>
	            <td><?php echo $references_relationship1; ?></td>
	            <td><?php echo $references_date_received1; ?></td>
            </tr>
            <tr align="center">
	            <td><?php echo $references_first_name2; ?></td>
	            <td><?php echo $references_relationship2; ?></td>
	            <td><?php echo $references_date_received2; ?></td>
            </tr>
            <tr align="center">
	            <td><?php echo $references_first_name3; ?></td>
	            <td><?php echo $references_relationship3; ?></td>
	            <td><?php echo $references_date_received3; ?></td>
            </tr>
		</table>
		
        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" width="700">MEDICAL/SCHOOL REPORTS</td>
			</tr>
            <tr>
            	<td align="center"><h1>Medical Reports</h1></td>
            </tr> 
            <tr>
            	<td>Medical Report from [--name--] pertaining to <strong>First Name</strong> received on: <?php echo $medical_report1; ?></td>
			</tr>
            <tr>
            	<td>Medical Report from [--name--] pertaining to <strong>First Name</strong> received on: <?php echo $medical_report2; ?></td>
			</tr>
            <tr>
            	<td>Medical Report from [--name--] pertaining to [--first name--] received on: <?php echo $medical_report3; ?></td>
			</tr>
            <tr>
            	<td>Medical Report from [--name--] pertaining to [--first name--] received on: <?php echo $medical_report4; ?></td>
			</tr>
            <tr>
            	<td align="center"><h1>School Reports</h1></td>
            </tr> 
            <tr>
            	<td>School Report from [--first name--] pertaining to [--first name--] received on: <?php echo $school_report1; ?></td>
			</tr>
            <tr>
            	<td>School Report from [--first name--] pertaining to [--first name--] received on: <?php echo $school_report1; ?></td>
			</tr>
            <tr>
            	<td>School Report from [--first name--] pertaining to [--first name--] received on: <?php echo $school_report1; ?></td>
			</tr>
		</table>
        
        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" colspan="3" width="700">APPLICANT’S/OTHER’S CRIMINAL/CPS RECORDS CHECK</td>
			</tr>
            <tr>
				<td colspan="5" align="center"><h2>The required criminal records and background checks were completed for each Applicant and any other adults in the home.  Any negative findings will be elaborated on the Psychosocial Evaluation History section of this report.</h2></td>
			</tr>
            <tr>
            	<td><strong>First Name:</strong> <?php echo $applicant_first_name1; ?></td>
            	<td>MI Central Record Clearance</td>
            	<td>[--date &amp; findings either cleared or not cleared--]</td>
			</tr>
            <tr>
            	<td><?php echo $applicant_first_name2; ?></td>
            	<td>MI Conviction Clearance</td>
            	<td>[--date &amp; findings either cleared or not cleared--]</td>
			</tr>
            <tr>
            	<td><?php echo $applicant_first_name3; ?></td>
            	<td>FBI Criminal Check</td>
            	<td>[--date &amp; findings either cleared or not cleared--]</td>
			</tr>
            <tr>
            	<td><?php echo $applicant_first_name4; ?></td>
            	<td>Other State</td>
            	<td>[--date &amp; findings either cleared or not cleared--]</td>
			</tr>
            <tr>
            	<td><strong>First Name:</strong> <?php echo $applicant_first_name5; ?></td>
            	<td>MI Central Record Clearance</td>
            	<td>[--date &amp; findings either cleared or not cleared--]</td>
			</tr>
            <tr>
            	<td><?php echo $applicant_first_name6; ?></td>
            	<td>MI Conviction Clearance</td>
            	<td>[--date &amp; findings either cleared or not cleared--]</td>
			</tr>
            <tr>
            	<td><?php echo $applicant_first_name7; ?></td>
            	<td>FBI Criminal Check</td>
            	<td>[--date &amp; findings either cleared or not cleared--]</td>
			</tr>
            <tr>
            	<td><?php echo $applicant_first_name8; ?></td>
            	<td>Other State</td>
            	<td>[--date &amp; findings either cleared or not cleared--]</td>
			</tr>             
		</table>

        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" width="700">MOTIVATION</td>
			</tr>
            <tr>
            	<td><?php echo $motivation; ?></td>
			</tr>
		</table> 

        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" width="700">HOME AND COMMUNITY</td>
			</tr>
            <tr>
            	<td><?php echo $home_and_community; ?></td>
			</tr>
		</table> 

        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" width="700">APPLICANT PROFILE: FIRST NAME</td>
			</tr>
            <tr>
            	<td><?php echo $applicant_profile_first1; ?></td>
			</tr>
		</table>  

        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" width="700">APPLICANT PROFILE: FIRST NAME</td>
			</tr>
            <tr>
            	<td><?php echo $applicant_profile_first2; ?></td>
			</tr>
		</table>  

        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" width="700">FAMILY LIFESTYLE</td>
			</tr>
            <tr>
            	<td><?php echo $family_lifestyle; ?></td>
			</tr>
		</table>  

        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" width="700">LEGAL/FINANCIAL NOTIFICATIONS AND ADVISEMENTS</td>
			</tr>
            <tr>
            	<td><?php echo $legal_financial_notifications; ?></td>
			</tr>
		</table>          

        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" width="700">PSYCHOSOCIAL EVALUATION REPORT - HISTORY: FIRST NAME</td>
			</tr>
            <tr>
            	<td><?php echo $psychosocial_evaluation_report; ?></td>
			</tr>
		</table>          

        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" width="700">PERSONAL CHARACTERISTICS: FIRST NAME</td>
			</tr>
            <tr>
            	<td><?php echo $personal_characteristics_first; ?></td>
			</tr>
		</table>          

        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" width="700">HISTORY: FIRST NAME</td>
			</tr>
            <tr>
            	<td><?php echo $history_first_name; ?></td>
			</tr>
		</table>          

        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" width="700">PERSONAL CHARACTERISTICS: FIRST NAME</td>
			</tr>
            <tr>
            	<td><?php echo $characteristics_first_name; ?></td>
			</tr>
		</table>          

        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" width="700">MARITAL RELATIONSHIP</td>
			</tr>
            <tr>
            	<td><?php echo $marital_relationship; ?></td>
			</tr>
		</table>           

        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" width="700">SONS/DAUGHTERS/ OTHERS RESIDING OR FREQUENTLY IN THE HOME</td>
			</tr>
            <tr>
            	<td><?php echo $residing_frequently_home; ?></td>
			</tr>
		</table>           

        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" width="700">EXTENDED FAMILY RELATIONSHIPS: FIRST NAME</td>
			</tr>
            <tr>
            	<td><?php echo $relationships_first_name1; ?></td>
			</tr>
		</table>           

        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" width="700">EXTENDED FAMILY RELATIONSHIPS: FIRST NAME</td>
			</tr>
            <tr>
            	<td><?php echo $relationships_first_name2; ?></td>
			</tr>
		</table>           

        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" width="700">PHYSICAL/SOCIAL ENVIRONMENT</td>
			</tr>
            <tr>
            	<td><?php echo $physical_social_environment; ?></td>
			</tr>
		</table>           

        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" width="700">GENERAL PARENTING</td>
			</tr>
            <tr>
            	<td><?php echo $general_parenting; ?></td>
			</tr>
		</table>           

        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" colspan="4" width="700">SPECIALIZED PARENTING</td>
			</tr>
            <tr>
            	<td colspan="4"><?php echo $specialized_parenting1; ?></td>
			</tr>
            <tr>
            	<td width="150"><strong>Date</strong></td>
            	<td><strong>Training</strong></td>
            	<td><strong>Attendees</strong></td>
            	<td><strong>Location</strong></td>
           </tr>
           <tr>
            	<td><?php echo $specialized_date1; ?></td>
            	<td><?php echo $specialized_training1; ?></td>
            	<td><?php echo $specialized_attendees1; ?></td>
            	<td><?php echo $specialized_location1; ?></td>
           </tr>
           <tr>
            	<td><?php echo $specialized_date2; ?></td>
            	<td><?php echo $specialized_training2; ?></td>
            	<td><?php echo $specialized_attendees2; ?></td>
            	<td><?php echo $specialized_location2; ?></td>
           </tr>
           <tr>
            	<td><?php echo $specialized_date3; ?></td>
            	<td><?php echo $specialized_training3; ?></td>
            	<td><?php echo $specialized_attendees3; ?></td>
            	<td><?php echo $specialized_location3; ?></td>
           </tr>
           <tr>
            	<td><?php echo $specialized_date4; ?></td>
            	<td><?php echo $specialized_training4; ?></td>
            	<td><?php echo $specialized_attendees4; ?></td>
            	<td><?php echo $specialized_location4; ?></td>
           </tr>
           <tr>
            	<td colspan="4"><?php echo $specialized_parenting2; ?></td>
			</tr>
		</table>           

        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" width="700">ADOPTION ISSUES</td>
			</tr>
            <tr>
            	<td><?php echo $adoption_issues; ?></td>
			</tr>
		</table>           

        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" width="700">PLACEMENT CONSIDERATIONS</td>
			</tr>
            <tr>
            	<td><?php echo $placement_considerations; ?></td>
			</tr>
		</table>           

        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" width="700">RECOMMENDATION</td>
			</tr>
            <tr>
            	<td><?php echo $recommendation1; ?></td>
			</tr>
		</table>            

        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" width="700">RECOMMENDATION</td>
			</tr>
            <tr>
            	<td><?php echo $recommendation1; ?></td>
			</tr>
		</table>            

        <table cellspacing="2" cellpadding="0" width="70mm">
			<tr >
				<td class="header" colspan="2" style="width:70mm">RECOMMENDATION</td>
			</tr>
            <tr>
            	<td colspan="2"><?php echo $recommendation1; ?></td>
			</tr>
            <tr style="border: #000 1px solid" >
            	<td width="20mm" style="border: #000 1px solid">
                	<h1>Home Study Practitioner:</h1>
                	<p>I affirm that the factual statements in the home study are true and correct to the best of my knowledge and the home study recommendation was arrived at with professional due diligence and judgment.</p>
                    <p>I personally conducted all of the home study (interviews, home visits, and other necessary investigations) or if I did not the following identified individual partially or entirely did so:</p>
                    <p>Name<br>
                    Agency<br>
                    Address<br>
					City, State, Zip Code<br>
					Telephone Number<br>
					E-Mail<br>
					</p>
					<p>Nature of Contribution (please describe activities conducted by above named individual)</p>
                </td>
            	<td  style="border: #000 1px solid"><h1>Supervisor</h1>
                	<p>This home study was prepared in accordance with the requirements that apply to a domestic adoption in the State of Michigan, I this home study and certify that this is a true and accurate copy.</p>
				</td>                
			</tr>
            <tr align="center" width="700">
            	<td height="60px" width="200"><h2>(Signature)</h2></td>
            	<td width="200"><h2>(Signature)</h2></td>
			</tr>
            <tr>
            	<td><strong>Name of the Home Study practitioner:</strong> <?php echo $name_home_study_practitioner; ?></td>
            	<td><strong>Name of supervisor:</strong> <?php echo $name_supervisor; ?></td>
			</tr>
            <tr>
            	<td width="506"><strong>Title:</strong> <?php echo $title_home_study_practitioner; ?></td>
            	<td width="613"><strong>Title:</strong> <?php echo $title_supervisor; ?></td>
			</tr>
            <tr>
            	<td><strong>Date:</strong> <?php echo $recommendation_date1; ?></td>
            	<td><strong>Date:</strong> <?php echo $recommendation_date2; ?></td>
			</tr>
		</table>
        
		<table cellspacing="2" cellpadding="0">
			<tr>
			  <td class="header" width="700">APPROVING AUTHORITY REVIEW (if applicable)</td>
			</tr>
            <tr>
           	  <td><p>Based on my review of this home study report and the recommendation cited above, the Applicants are <strong>Select One</strong> for adoption. </p></td>
			</tr><tr align="center">
           	  <td height="60px" valign="bottom"><h2>(Signature)</h2></td>
			</tr>
            <tr>
            	<td><strong>Name of Approving Authority:</strong> <?php echo $name_of_approving_authority; ?></td>
			</tr>
            <tr>
            	<td><strong>Title:</strong> <?php echo $title_of_approving_authority; ?></td>
			</tr>
            <tr>
            	<td><strong>Date:</strong> <?php echo $date_of_approving_authority; ?></td>
			</tr>
        </table>
        
        <table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" colspan="2">RECEIPT OF COPY OF HOME STUDY REPORT</td>
			</tr>
            <tr>
            	<td colspan="2"><p>By signing below I acknowledge receiving a copy of this report and affirm that the factual statements in this home study are true and correct to the best of my knowledge.</p></td>
			</tr>
            <tr align="center">
            	<td height="60px" valign="bottom"><h2>(Signature)</h2></td>
            	<td height="60px" valign="bottom"><h2>(Signature)</h2></td>
			</tr>
            <tr>
            	<td><strong>First Name Last Name</strong> <?php echo $receipt_name1; ?></td>
            	<td><strong>First Name Last Name</strong> <?php echo $receipt_name1; ?></td>
			</tr>
            <tr>
            	<td><strong>Date:</strong> <?php echo $receipt_date1; ?></td>
            	<td><strong>Date:</strong> <?php echo $receipt_date1; ?></td>
			</tr>
        </table>
        
		<table cellspacing="2" cellpadding="0">
			<tr>
				<td class="header" colspan="2">PSYCHOSOCIAL INVENTORY RESULTS</td>
			</tr>
            <tr>
           	  <td width="50%"><strong>Applicant #1:</strong>
               	<table cellspacing="2" cellpadding="0">
                    <tr class="header">
                    	<td width="25px"># 1</td>
                        <td width="25px"># 2</td>
                        <td>HISTORY</td>
					</tr>
					<tr>
                    	<td></td>
                        <td></td>
                        <td>Childhood Family Adaptability</td>
					</tr>
					<tr>
                    	<td></td>
                        <td></td>
                        <td>Childhood Family Cohesion</td>
					</tr>
					<tr>
                    	<td></td>
                        <td></td>
                        <td>Childhood History of Deprivation/Trauma</td>
					</tr>
					<tr>
                    	<td></td>
                        <td></td>
                        <td>Childhood History of Victimization</td>
					</tr>
					<tr>
                    	<td></td>
                        <td></td>
                        <td>Adult History of Victimization/Trauma</td>
					</tr>
					<tr>
                    	<td></td>
                        <td></td>
                        <td>History of Child Abuse/Neglect</td>
					</tr>
					<tr>
                    	<td></td>
                        <td></td>
                        <td>History of Alcohol/Drug Use</td>
					</tr>
					<tr>
                    	<td></td>
                        <td></td>
                        <td>Crime/Arrest/Allegations/Violence</td>
					</tr>
					<tr>
                    	<td></td>
                        <td></td>
                        <td>Psychiatric History</td>
					</tr>
					<tr>
                    	<td></td>
                        <td></td>
                        <td>Occupational History</td>
					</tr>
					<tr>
                    	<td></td>
                        <td></td>
                        <td>Marriage/Domestic Partner History</td>
					</tr>
				</table>
              </td>
           	  <td><strong>Applicant #2:</strong>
              <table cellspacing="2" cellpadding="0">
                    <tr class="header">
                    	<td width="25px"># 1</td>
                        <td width="25px"># 2</td>
                        <td>EXTENDED FAMILY RELATIONSHIPS</td>
					</tr>
					<tr>
                    	<td></td>
                        <td></td>
                        <td>Extended Family Cohesion</td>
					</tr>
					<tr>
                    	<td></td>
                        <td></td>
                        <td>Extended Family Adaptability</td>
					</tr>
					<tr>
                    	<td></td>
                        <td></td>
                        <td>Relationship with own Extended Family</td>
					</tr>
					<tr>
                    	<td></td>
                        <td></td>
                        <td>Relationship with Spouse/Partner Family</td>
					</tr>
					<tr class="header">
                    	<td colspan="3">PHYSICAL/SOCIAL ENVIRONMENT</td>
					</tr>
					<tr>
                    	<td></td>
                        <td></td>
                        <td>History of Child Abuse/Neglect</td>
					</tr>
					<tr>
                    	<td></td>
                        <td></td>
                        <td>History of Alcohol/Drug Use</td>
					</tr>
					<tr>
                    	<td></td>
                        <td></td>
                        <td>Crime/Arrest/Allegations/Violence</td>
					</tr>
					<tr>
                    	<td></td>
                        <td></td>
                        <td>Psychiatric History</td>
					</tr>
					<tr>
                    	<td></td>
                        <td></td>
                        <td>Occupational History</td>
					</tr>
					<tr>
                    	<td></td>
                        <td></td>
                        <td>Marriage/Domestic Partner History</td>
					</tr>
				</table>
              
              </td>
              </tr>
		</table>



<?php
	//exit;
     $content = ob_get_clean();

    // convert
    require_once(dirname(__FILE__).'/../html2pdf.class.php');
    try
    {
        $html2pdf = new HTML2PDF('P', 'A4', 'en', false, 'UTF-8', 4);
        $html2pdf->pdf->SetDisplayMode('fullpage');
		//$html2pdf->pdf->IncludeJS("print(true);");
        $html2pdf->writeHTML($content, isset($_GET['vuehtml']));
        $html2pdf->Output('ticket.pdf');
    }
    catch(HTML2PDF_exception $e) {
        echo $e;
        exit;
    }