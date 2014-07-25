<?php	
    ob_start();
	
	$userid = $_POST['userID'];
	$connid= $_POST['connID'];
	$connectionid = $_POST['connectionID'];
	
	//========***************** DHTMLX Form fields
	$home_study_was_completed_by = $_POST['home_study_was_completed_by'];
	$name_of_family = $_POST['name_of_family'];
	$address = $_POST['address'];
	$city = $_POST['city'];
	$home_phone = $_POST['home_phone'];
	$work_phone = $_POST['work_phone'];
	$agency_phone = $_POST['agency_phone'];
	$state = $_POST['state'];
	$email_address1 = $_POST['email_address1'];
	$email_address2 = $_POST['email_address2'];
	$email_address3 = $_POST['email_address3'];
	$zip_code = $_POST['zip_code'];
	$home_cellphone = $_POST['home_cellphone'];
	$work_cellphone = $_POST['work_cellphone'];
	$agency_cellphone = $_POST['agency_cellphone'];
	$application_received_on = $_POST['application_received_on'];
	$home_study_approved_on = $_POST['home_study_approved_on'];
	$future_placement = $_POST['future_placement'];
	$child_specific_placement = $_POST['child_specific_placement'];
	$first_name1 = $_POST['first_name1'];
	$last_name1 = $_POST['last_name1'];
	$maiden_name1 = $_POST['maiden_name1'];
	$date_of_birth1 = $_POST['date_of_birth1'];
	$birthplace1 = $_POST['birthplace1'];
	$gender1 = $_POST['gender1'];
	$religion1 = $_POST['religion1'];
	$education1 = $_POST['education1'];
	$language1 = $_POST['language1'];
	$occupation1 = $_POST['occupation1'];
	$employer1 = $_POST['employer1'];
	$annual_gross_income1 = $_POST['annual_gross_income1'];
	$tribal_affiliation1 = $_POST['tribal_affiliation1'];
	$first_name2 = $_POST['first_name2'];
	$last_name2 = $_POST['last_name2'];
	$maiden_name2 = $_POST['maiden_name2'];
	$date_of_birth2 = $_POST['date_of_birth2'];
	$birthplace2 = $_POST['birthplace2'];
	$gender2 = $_POST['gender2'];
	$religion2 = $_POST['religion2'];
	$education2 = $_POST['education2'];
	$language2 = $_POST['language2'];
	$occupation2 = $_POST['occupation2'];
	$employer2 = $_POST['employer2'];
	$annual_gross_income2 = $_POST['annual_gross_income2'];
	$tribal_affiliation2 = $_POST['tribal_affiliation2'];
	$date_of_current_marriage = $_POST['date_of_current_marriage'];
	$location = $_POST['location'];
	$bate_begun1 = $_POST['bate_begun1'];
	$bate_begun2 = $_POST['bate_begun2'];
	$date_ended1 = $_POST['date_ended1'];
	$date_ended2 = $_POST['date_ended2'];
	$location1 = $_POST['location1'];
	$location2 = $_POST['location2'];
	$bate_begun3 = $_POST['bate_begun3'];
	$bate_begun4 = $_POST['bate_begun4'];
	$date_ended3 = $_POST['date_ended3'];
	$date_ended4 = $_POST['date_ended4'];
	$location3 = $_POST['location3'];
	$location4 = $_POST['location4'];
	$specialized_date1 = $_POST['specialized_date1'];
	$specialized_date2 = $_POST['specialized_date2'];
	$specialized_date3 = $_POST['specialized_date3'];
	$specialized_date4 = $_POST['specialized_date4'];
	$specialized_training1 = $_POST['specialized_training1'];
	$specialized_training2 = $_POST['specialized_training2'];
	$specialized_training3 = $_POST['specialized_training3'];
	$specialized_training4 = $_POST['specialized_training4'];
	$specialized_attendees1 = $_POST['specialized_attendees1'];
	$specialized_attendees2 = $_POST['specialized_attendees2'];
	$specialized_attendees3 = $_POST['specialized_attendees3'];
	$specialized_attendees4 = $_POST['specialized_attendees4'];
	$specialized_location1 = $_POST['specialized_location1'];
	$specialized_location2 = $_POST['specialized_location2'];
	$specialized_location3 = $_POST['specialized_location3'];
	$specialized_location4 = $_POST['specialized_location4'];
	$name_home_study_practitioner = $_POST['name_home_study_practitioner'];
	$title_home_study_practitioner = $_POST['title_home_study_practitioner'];
	$recommendation_date1 = $_POST['recommendation_date1'];
	$name_supervisor = $_POST['name_supervisor'];
	$title_supervisor = $_POST['title_supervisor'];
	$recommendation_date2 = $_POST['recommendation_date2'];
	$name_of_approving_authority = $_POST['name_of_approving_authority'];
	$title_of_approving_authority = $_POST['title_of_approving_authority'];
	$approving_date1 = $_POST['approving_date1'];
	$approving_date2 = $_POST['approving_date2'];
	$receipt_date1 = $_POST['receipt_date1'];
	$receipt_date2 = $_POST['receipt_date2'];
	$psychosocial_date1 = $_POST['psychosocial_date1'];
	$psychosocial_date2 = $_POST['psychosocial_date2']; 
	
	//========***************** CAIRS Dropdowns
	$childhood_family_adaptability_1 = $_POST['childhood_family_adaptability_1'];
	$childhood_family_adaptability_2 = $_POST['childhood_family_adaptability_2'];
	$childhood_family_cohesion_1 = $_POST['childhood_family_cohesion_1'];
	$childhood_family_cohesion_2 = $_POST['childhood_family_cohesion_2'];
	$childhood_history_deprivation_1 = $_POST['childhood_history_deprivation_1'];
	$childhood_history_deprivation_2 = $_POST['childhood_history_deprivation_2'];
	$childhood_history_victimization_1 = $_POST['childhood_history_victimization_1'];
	$childhood_history_victimization_2 = $_POST['childhood_history_victimization_2'];
	$adult_history_victimization_1 = $_POST['adult_history_victimization_1'];
	$adult_history_victimization_2 = $_POST['adult_history_victimization_2'];
	$history_child_abuse_1 = $_POST['history_child_abuse_1'];
	$history_child_abuse_2 = $_POST['history_child_abuse_2'];
	$history_alcohol_drug_1 = $_POST['history_alcohol_drug_1'];
	$history_alcohol_drug_2 = $_POST['history_alcohol_drug_2'];
	$crime_arrest_allegations_1 = $_POST['crime_arrest_allegations_1'];
	$crime_arrest_allegations_2 = $_POST['crime_arrest_allegations_2'];
	$psychiatric_history_1 = $_POST['psychiatric_history_1'];
	$psychiatric_history_2 = $_POST['psychiatric_history_2'];
	$occupational_history_1 = $_POST['occupational_history_1'];
	$occupational_history_2 = $_POST['occupational_history_2'];
	$marriage_domestic_partner_1 = $_POST['marriage_domestic_partner_1'];
	$marriage_domestic_partner_2 = $_POST['marriage_domestic_partner_2'];
	$communication_1 = $_POST['communication_1'];
	$communication_2 = $_POST['communication_2'];
	$commitment_responsibility_1 = $_POST['commitment_responsibility_1'];
	$commitment_responsibility_2 = $_POST['commitment_responsibility_2'];
	$problem_solving_1 = $_POST['problem_solving_1'];
	$problem_solving_2 = $_POST['problem_solving_2'];
	$interpersonal_relations_1 = $_POST['interpersonal_relations_1'];
	$interpersonal_relations_2 = $_POST['interpersonal_relations_2'];
	$health_physical_stamina_1 = $_POST['health_physical_stamina_1'];
	$health_physical_stamina_2 = $_POST['health_physical_stamina_2'];
	$self_esteem_1 = $_POST['self_esteem_1'];
	$self_esteem_2 = $_POST['self_esteem_2'];
	$acceptance_differences_1 = $_POST['acceptance_differences_1'];
	$acceptance_differences_2 = $_POST['acceptance_differences_2'];
	$coping_skills_1 = $_POST['coping_skills_1'];
	$coping_skills_2 = $_POST['coping_skills_2'];
	$impulse_control_1 = $_POST['impulse_control_1'];
	$impulse_control_2 = $_POST['impulse_control_2'];
	$mood_1 = $_POST['mood_1'];
	$mood_2 = $_POST['mood_2'];
	$anger_management_resolution_1 = $_POST['anger_management_resolution_1'];
	$anger_management_resolution_2 = $_POST['anger_management_resolution_2'];
	$judgment_1 = $_POST['judgment_1'];
	$judgment_2 = $_POST['judgment_2'];
	$adaptability_1 = $_POST['adaptability_1'];
	$adaptability_2 = $_POST['adaptability_2'];
	$conflict_resolution = $_POST['conflict_resolution'];
	$emotional_support = $_POST['emotional_support'];
	$attitude_toward_spouse = $_POST['attitude_toward_spouse'];
	$communication_between_couple = $_POST['communication_between_couple'];
	$balance_power = $_POST['balance_power'];
	$stability_marriage = $_POST['stability_marriage'];
	$sexual_compatibility = $_POST['sexual_compatibility'];
	$minor_sons_daughters = $_POST['minor_sons_daughters'];
	$minors_residing_frequently_home = $_POST['minors_residing_frequently_home'];
	$adult_sons_daughters = $_POST['adult_sons_daughters'];
	$adults_residing_frequently_home = $_POST['adults_residing_frequently_home'];
	$extended_family_cohesion_1 = $_POST['extended_family_cohesion_1'];
	$extended_family_cohesion_2 = $_POST['extended_family_cohesion_2'];
	$extended_family_adaptability_1 = $_POST['extended_family_adaptability_1'];
	$extended_family_adaptability_2 = $_POST['extended_family_adaptability_2'];
	$relationship_extended_family_1 = $_POST['relationship_extended_family_1'];
	$relationship_extended_family_2 = $_POST['relationship_extended_family_2'];
	$relationship_spouse_partner_family_1 = $_POST['relationship_spouse_partner_family_1'];
	$relationship_spouse_partner_family_2 = $_POST['relationship_spouse_partner_family_2'];
	$cleanliness_orderliness_maintenance = $_POST['cleanliness_orderliness_maintenance'];
	$safety = $_POST['safety'];
	$furnishings = $_POST['furnishings'];
	$play_area_equipment_clothing = $_POST['play_area_equipment_clothing'];
	$finances = $_POST['finances'];
	$support_system = $_POST['support_system'];
	$household_pets = $_POST['household_pets'];
	$child_development_1 = $_POST['child_development_1'];
	$child_development_2 = $_POST['child_development_2'];
	$parenting_style_1 = $_POST['parenting_style_1'];
	$parenting_style_2 = $_POST['parenting_style_2'];
	$disciplinary_methods_1 = $_POST['disciplinary_methods_1'];
	$disciplinary_methods_2 = $_POST['disciplinary_methods_2'];
	$child_supervision_1 = $_POST['child_supervision_1'];
	$child_supervision_2 = $_POST['child_supervision_2'];
	$learning_experiences_1 = $_POST['learning_experiences_1'];
	$learning_experiences_2 = $_POST['learning_experiences_2'];
	$parental_role_1 = $_POST['parental_role_1'];
	$parental_role_2 = $_POST['parental_role_2'];
	$child_interactions_1 = $_POST['child_interactions_1'];
	$child_interactions_2 = $_POST['child_interactions_2'];
	$communication_with_child_1 = $_POST['communication_with_child_1'];
	$communication_with_child_2 = $_POST['communication_with_child_2'];
	$basic_care_1 = $_POST['basic_care_1'];
	$basic_care_2 = $_POST['basic_care_2'];
	$child_play_1 = $_POST['child_play_1'];
	$child_play_2 = $_POST['child_play_2'];
	$expectations_1 = $_POST['expectations_1'];
	$expectations_2 = $_POST['expectations_2'];
	$effects_abuse_neglect_1 = $_POST['effects_abuse_neglect_1'];
	$effects_abuse_neglect_2 = $_POST['effects_abuse_neglect_2'];
	$effect_sexual_abuse_1 = $_POST['effect_sexual_abuse_1'];
	$effect_sexual_abuse_2 = $_POST['effect_sexual_abuse_2'];
	$effects_separation_loss_1 = $_POST['effects_separation_loss_1'];
	$effects_separation_loss_2 = $_POST['effects_separation_loss_2'];
	$structure_1 = $_POST['structure_1'];
	$structure_2 = $_POST['structure_2'];
	$therapeutic_educational_resources_1 = $_POST['therapeutic_educational_resources_1'];
	$therapeutic_educational_resources_2 = $_POST['therapeutic_educational_resources_2'];
	$birth_sibling_relationships_1 = $_POST['birth_sibling_relationships_1'];
	$birth_sibling_relationships_2 = $_POST['birth_sibling_relationships_2'];
	$child_background_information_1 = $_POST['child_background_information_1'];
	$child_background_information_2 = $_POST['child_background_information_2'];
	$birth_parent_issues_1 = $_POST['birth_parent_issues_1'];
	$birth_parent_issues_2 = $_POST['birth_parent_issues_2'];
	$infertility_1 = $_POST['infertility_1'];
	$infertility_2 = $_POST['infertility_2'];
	$telling_child_adoption_1 = $_POST['telling_child_adoption_1'];
	$telling_child_adoption_2 = $_POST['telling_child_adoption_2'];
	$openness_adoption_1 = $_POST['openness_adoption_1'];
	$openness_adoption_2 = $_POST['openness_adoption_2'];
	$adoptive_parent_status_1 = $_POST['adoptive_parent_status_1'];
	$adoptive_parent_status_2 = $_POST['adoptive_parent_status_2'];
	
	
	//========***************** TinyMCE Editors
	$motivation = $_POST['motivation'];
	$home_and_community = $_POST['home_and_community'];
	$applicant_profile_first1 = $_POST['applicant_profile_first1'];
	$applicant_profile_first2 = $_POST['applicant_profile_first2'];
	$family_lifestyle = $_POST['family_lifestyle'];
	$legal_financial_notifications = $_POST['legal_financial_notifications'];
	$psychosocial_evaluation_report = $_POST['psychosocial_evaluation_report'];
	$personal_characteristics_first = $_POST['personal_characteristics_first'];
	$history_first_name = $_POST['history_first_name'];
	$characteristics_first_name = $_POST['characteristics_first_name'];
	$marital_relationship = $_POST['marital_relationship'];
	$residing_frequently_home = $_POST['residing_frequently_home'];
	$relationships_first_name1 = $_POST['relationships_first_name1'];
	$relationships_first_name2 = $_POST['relationships_first_name2'];
	$physical_social_environment = $_POST['physical_social_environment'];
	$general_parenting = $_POST['general_parenting'];
	$specialized_parenting1 = $_POST['specialized_parenting1'];
	$specialized_parenting2 = $_POST['specialized_parenting2'];
	$adoption_issues = $_POST['adoption_issues'];
	$placement_considerations = $_POST['placement_considerations'];
	$recommendation1 = $_POST['recommendation1'];
	$home_study_practitioner = $_POST['home_study_practitioner'];
	$home_study_supervisor = $_POST['home_study_supervisor'];
	
	
	//========***************** DHTMLX GRID - expect JSON
	$grid_extended_family_members = $_POST['grid_extended_family_members'];
	$grid_extended_family_members_2 = $_POST['grid_extended_family_members_2'];
	$grid_others_residing_or_frequently_in_the_home = $_POST['grid_others_residing_or_frequently_in_the_home'];
	$grid_sons_and_daughters_of_applicants = $_POST['grid_sons_and_daughters_of_applicants'];
	$grid_references = $_POST['grid_references'];
	$grid_dates_of_home_study_face_to_face_contacts = $_POST['grid_dates_of_home_study_face_to_face_contacts'];
	$grid_school_reports = $_POST['grid_school_reports'];
	$grid_medical_reports = $_POST['grid_medical_reports'];
	$grid_applicant_other_criminal = $_POST['grid_applicant_other_criminal'];

	
	function render_table($grid)
	{
		$records = json_decode($grid, true);
		//$c = 1;
		$strTable = '';
		foreach ($records as $record) 
		{
			$strTable =  $strTable . '<tr>';
			
			foreach ($record as $column => $value) 
			{
				//$strTable =  $strTable . "<td>" . $value . "</td>";
				$strTable =  $strTable . "<td>" . wordwrap($value, 28,"<br>", true) . "</td>";
			}
			
			$strTable =  $strTable . '</tr>';
			//$c++;
		}
		//$strTable =  $strTable . '</table>';
		return $strTable;
	}
		
?>
<style type="text/css">
<!--
* {	border: none;font-family:Arial, Helvetica, sans-serif;font-size: 12px;}
table{width:  100%; page-break-after:always; clear:both;}
table.bordasimples {border-collapse: collapse;}
table.bordasimples tr td {border:1px solid #333;}
.wrap {border: solid 1px #333;margin: 10px 0 !important;}
th{text-align: center;border: solid 1px #333;background: #333;color: #fff;padding: 3px 0;}
td{text-align: left; word-wrap:break-word !important; word-break:break-all !important; display: block !important;}
p {text-align:justify;margin:5px;}
em {font-size: 10px;}
.header, .footer {text-align: right;color:#999; font-size:9px;}
-->
</style>

<page backtop="10mm" backbottom="10mm" backleft="10mm" backright="10mm">
    <page_header backleft="10mm" backright="10mm">
        <table>
        	<col style="width:100%" />
            <tr>
                <td class="header">SAFE Home Study Report</td>
            </tr>
        </table>
    </page_header>
    <page_footer backleft="10mm" backright="10mm">

          <table id="footer">
          <col style="width:75%" />
          <col style="width:25%" />
            <tr>
                <td style="text-align: left;" class="footer">Consortium for Children, &copy; 2013 all rights reserved – Structured Analysis Family Evaluation v03.09.2013</td>
                <td style="text-align: right;" class="footer">Page [[page_cu]] of [[page_nb]]</td>
            </tr>
        </table>
    </page_footer>
    <img src="logo.jpg" alt="logo" style="margin-top: 3mm; width:200px">

	<table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>SAFE HOME STUDY</th>
	        </tr>
    	</thead>
	    <tr>
    	    <td>
            	<table>
                	<col style="width:40%" />
                	<col style="width:60%" />
                	<tr>
						<td height="100" valign="top"><b>Home study was completed by:</b></td>
						<td><?php echo nl2br($home_study_was_completed_by);?></td>
					</tr>
                </table>
            </td>
	    </tr>
	    <tr>
    	    <td>
            	<table>
                	<col style="width:100%" />
					<tr>
						<td><b>Name of Family:</b> <?php echo $name_of_family; ?></td>
					</tr>
					<tr>
						<td><b>Address:</b> <?php echo $address; ?></td>
					</tr>
                </table>
            </td>
	    </tr>
	    <tr>
    	    <td>
            	<table>
                	<col style="width:30%" />
                	<col style="width:40%" />
                	<col style="width:30%" />
					<tr>
						<td><strong>City:</strong> <?php echo wordwrap($city, 20,"<br>", true); ?></td>
						<td><strong>State:</strong> <?php echo $state; ?></td>
						<td><strong>ZIP Code:</strong> <?php echo $zip_code; ?></td>
					</tr>
					<tr>
						<td><strong>Home Phone:</strong> <?php echo $home_phone; ?></td>
						<td><strong>Email Address:</strong> <?php echo $email_address1; ?></td>
						<td><strong>Home Cell Phone:</strong> <?php echo $home_cellphone; ?></td>
					</tr>    
					<tr>
						<td><strong>Work Phone:</strong> <?php echo $work_phone; ?></td>
						<td><strong>Email Address:</strong> <?php echo $email_address2; ?></td>
						<td><strong>Work Cell Phone:</strong> <?php echo $work_cellphone; ?></td>
					</tr>
                    <? if (!empty($agency_phone) || !empty($email_address3) || !empty($agency_cellphone)) { ?>
                    <tr>
						<td><strong>Agency Phone:</strong> <?php echo $agency_phone; ?></td>
						<td><strong>Email Address:</strong> <?php echo $email_address3; ?></td>
						<td><strong>Agency Cell Phone:</strong> <?php echo $agency_cellphone; ?></td>
					</tr>
                    <? } ?>
                </table>
            </td>
	    </tr>       
	</table>

	<table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>APPLICANT DISPOSITION</th>
	        </tr>
    	</thead>
	    <tr>
    	    <td>
            	<table>
	                <col style="width: 50%">
					<col style="width: 50%">
    				<tr>
						<td><strong>Application received on:</strong> <?php echo $application_received_on; ?></td>
					    <td><strong>Home study approved on:</strong> <?php echo $home_study_approved_on; ?></td>        
					</tr>
                    <tr>
						<td colspan="2">
							<h1><?php if( $future_placement  != "0" )echo "<img src='checked.png' /> ";?> Future Placement</h1>
							<p>The Applicant(s) have applied for adoption approval for placement of one  between the ages of Age and Age  The family is applying to adopt a child of race or ethnicity. They prefer that the child be basically healthy; however, they are accepting of unknown or undetected health concerns. The Applicant(s)  open to placement of  with the oldest child not being more than Age.  If open to a sibling group or unrelated children, the number of children is limited to Number.</p>
							<h1><?php if( $child_specific_placement != "0" )echo "<img src='checked.png' /> ";?> Child Specific Placement</h1>
							<p>The Applicant(s)  applied to become an adoptive family for Name(s), birthdate(s).</p>
						</td>
                    </tr>
                </table>
            </td>
	    </tr>
	</table>
    
	<table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>APPLICANT INFORMATION</th>
	        </tr>
    	</thead>
	    <tr>
    	    <td>
            	<table>
	                <col style="width: 50%">
	                <col style="width: 50%">
					<tr>
						<td width="50%"><strong>First Name:</strong> <?php echo wordwrap($first_name1, 30,"<br>", true); ?></td>
	        			<td><strong>First Name:</strong> <?php echo wordwrap($first_name2, 30,"<br>", true); ?></td>
			    	</tr>
				    <tr>
    					<td><strong>Last Name:</strong> <?php echo wordwrap($last_name1, 30,"<br>", true); ?></td>
		        		<td><strong>Last Name:</strong> <?php echo wordwrap($last_name2, 30,"<br>", true); ?></td>
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
		    			<td><strong>Birthplace:</strong> <?php echo $birthplace1; ?></td>
			        	<td><strong>Birthplace:</strong> <?php echo $birthplace2; ?></td>
			    	</tr>
				    <tr>
		    			<td><strong>Gender:</strong> <?php echo $gender1; ?></td>
		        		<td><strong>Gender:</strong> <?php echo $gender2; ?></td>
				    </tr>
		    		<tr>
			    		<td><strong>Religion:</strong> <?php echo $religion1; ?></td>
				        <td><strong>Religion:</strong> <?php echo $religion2; ?></td>
		    		</tr>
				    <tr>
		    			<td><strong>Education:</strong> <?php echo $education1; ?></td>
		        		<td><strong>Education:</strong> <?php echo $education2; ?></td>
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
		        		<td><strong>Tribal Affiliation:</strong> <?php echo $tribal_affiliation2; ?></td>
				    </tr>
				</table>
            </td>
	    </tr>
	</table>

	<table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>MARITAL INFORMATION</th>
	        </tr>
    	</thead>
	    <tr>
    	    <td>
            	<table>
	                <col style="width: 50%">
	                <col style="width: 50%">
					
		    		<tr>
		    			<td><strong>Date of Current Marriage:</strong> <?php echo $date_of_current_marriage; ?></td>
			        	<td><strong>Location:</strong> <?php echo $location; ?></td>
			    	</tr>
				</table>
            </td>
	    </tr>
		<tr>
    	    <td>
            	<table>
					<col style="width: 100%">
		    		<tr>		    			
			        	<td align="center"><strong>Past Marriage</strong></td>
			    	</tr>
				</table>
            </td>
	    </tr>
        <tr>
        	<td>
            	<table>
					<tr>
            			<td colspan="3"><strong>First Name:</strong>  <?php echo $first_name1; ?></td>
					</tr>
		            <tr>
		            	<td width="200" ><strong>Date Begun:</strong> <?php echo $bate_begun1; ?></td>
		                <td width="200"><strong>Date Ended:</strong> <?php echo $date_ended1; ?></td>
        		        <td><strong>Location:</strong> <?php echo wordwrap($location1, 30,"<br>", true); ?></td>
		            </tr>
        		    <tr>
            			<td width="200" ><strong>Date Begun:</strong> <?php echo $bate_begun2; ?></td>
		                <td width="200"><strong>Date Ended:</strong> <?php echo $date_ended2; ?></td>
        		        <td><strong>Location:</strong> <?php echo wordwrap($location2, 30,"<br>", true); ?></td>
		            </tr>
        		    <tr>
		            	<td colspan="3"><strong>First Name:</strong>  <?php echo $first_name2; ?></td>
        		    </tr>
		            <tr>
		            	<td width="200" ><strong>Date Begun:</strong> <?php echo $bate_begu3; ?></td>
		                <td width="200"><strong>Date Ended:</strong> <?php echo $date_ended3; ?></td>
		                <td><strong>Location:</strong> <?php echo wordwrap($location3, 30,"<br>", true); ?></td>
		            </tr>
		            <tr>
		            	<td width="200" ><strong>Date Begun:</strong> <?php echo $bate_begun4; ?></td>
		                <td width="200"><strong>Date Ended:</strong> <?php echo $date_ended4; ?></td>
		                <td><strong>Location:</strong> <?php echo $location4; ?></td>
		            </tr>
				</table>
            </td>
        </tr>
	</table>
    
	<table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>DATES OF HOME STUDY FACE-TO-FACE CONTACTS</th>
	        </tr>
    	</thead>
	    <tr>
    	    <td>
            	<table>
	                <col style="width: 20%">
					<col style="width: 40%">
                    <col style="width: 40%">
    				<tr align="center">
	            		<td><strong>Date</strong></td>
			            <td><strong>Person(s) Interviewed</strong></td>
			            <td><strong>Location</strong></td>
        		    </tr>
		            <?php echo render_table($grid_dates_of_home_study_face_to_face_contacts); ?>
                </table>
            </td>
	    </tr>
	</table> 
    
	<table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>SONS AND DAUGHTERS OF APPLICANT(S)</th>
	        </tr>
    	</thead>
	    <tr>
    	    <td>
            	<table>
	                <col style="width: 25%">
					<col style="width: 6%">
                    <col style="width: 40%">
    				<tr align="center">
	    		        <td><strong>First Name</strong></td>
			            <td><strong>Age</strong></td>
	    		        <td><strong>Occupation or School Situation</strong></td>
	            		<td><strong>Location and Living Situation</strong><br>(Date of death if deceased)</td>
		            </tr>

        		    <?php echo render_table($grid_sons_and_daughters_of_applicants); ?>
                </table>
            </td>
	    </tr>
	</table>

	<table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>EXTENDED FAMILY MEMBERS: <?php echo $first_name1; ?></th>
	        </tr>
            <tr>
            	<td align="center"><em>Include Applicant’s birth parents, adoptive parents, step parents, siblings and other prominent extended family members (living or deceased)</em>
                </td>
			</tr>
    	</thead>
	    <tr>
    	    <td>
            	<table>
	                <col style="width: 25%">
					<col style="width: 6%">
                    <col style="width: 20%">
                    <col style="width: 20%">
    				<tr align="center">
	            		<td><strong>First Name</strong></td>
			            <td><strong>Age</strong></td>
	    		        <td><strong>Relationship</strong></td>
			            <td><strong>Occupation</strong></td>
	    		        <td><strong>Location and Living Situation</strong><br>(Date of death if deceased)</td>
		            </tr>
        		    <?php echo render_table($grid_extended_family_members); ?>
                </table>
            </td>
	    </tr>
	</table>
    
	<table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>EXTENDED FAMILY MEMBERS: <?php echo $first_name2; ?></th>
	        </tr>
            <tr>
            	<td align="center"><em>Include Applicant’s birth parents, adoptive parents, step parents, siblings and other prominent extended family members (living or deceased)</em>
                </td>
			</tr>
    	</thead>
	    <tr>
    	    <td>
            	<table>
	                <col style="width: 25%">
					<col style="width: 6%">
                    <col style="width: 20%">
                    <col style="width: 20%">
    				<tr align="center">
	            		<td><strong>First Name</strong></td>
			            <td><strong>Age</strong></td>
	    		        <td><strong>Relationship</strong></td>
			            <td><strong>Occupation</strong></td>
	    		        <td><strong>Location and Living Situation</strong><br>(Date of death if deceased)</td>
		            </tr>
        		    <?php echo render_table($grid_extended_family_members_2); ?>
                </table>
            </td>
	    </tr>
	</table>
    
	<table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>OTHERS RESIDING OR FREQUENTLY IN THE HOME</th>
	        </tr>
    	</thead>
	    <tr>
    	    <td>
            	<table>
	                <col style="width: 25%">
					<col style="width: 6%">
                    <col style="width: 20%">
                    <col style="width: 20%">
    				<tr align="center">
	            		<td><strong>First Name</strong></td>
			            <td><strong>Age</strong></td>
	    		        <td><strong>Relationship</strong></td>
			            <td><strong>Occupation</strong></td>
	    		        <td><strong>Current Situation</strong></td>
		            </tr>
        		    <?php echo render_table($grid_others_residing_or_frequently_in_the_home); ?>
                </table>
            </td>
	    </tr>
	</table>    
 
	<table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>REFERENCES</th>
	        </tr>
    	</thead>
	    <tr>
    	    <td>
            	<table>
	                <col style="width: 30%">
					<col style="width: 35%">
                    <col style="width: 35%">
    				<tr align="center">
	            		<td><strong>First Name</strong></td>
	            		<td><strong>Relationship to Applicant(s)</strong></td>
			            <td><strong>Date Received</strong></td>
		            </tr>
        		    <?php echo render_table($grid_references); ?>
                </table>
            </td>
	    </tr>
	</table>

	<table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>MEDICAL/SCHOOL REPORTS</th>
	        </tr>
    	</thead>
	    <tr>
    	    <td>
            	<table>
	                <col style="width: 30%">
					<col style="width: 25%">
                    <col style="width: 25%">
					<col style="width: 20%">
                    <tr>
                    	<td colspan="4" align="center">Medical Reports</td>
					</tr>
    				<tr align="center">
	            		<td><strong>Name</strong></td>
	            		<td><strong>Repost type</strong></td>
			            <td><strong>Form name</strong></td>
			            <td><strong>Data</strong></td>
		            </tr>
        		    <?php echo render_table($grid_medical_reports); ?>
                    <tr>
                    	<td colspan="4" align="center">School Reports</td>
					</tr>
    				<tr align="center">
	            		<td><strong>Name</strong></td>
	            		<td><strong>Repost type</strong></td>
			            <td><strong>Form name</strong></td>
			            <td><strong>Data</strong></td>
		            </tr>
        		    <?php echo render_table($grid_school_reports); ?>
                </table>
            </td>
	    </tr>
	</table>
    
	<table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>APPLICANT’S/OTHER’S CRIMINAL/CPS RECORDS CHECK<</th>
	        </tr>
            <tr>
            	<td align="center"><em>The required criminal records and background checks were completed for each Applicant and any other adults in the home.  Any negative findings will be elaborated on the Psychosocial Evaluation History section of this report.</em>
                </td>
			</tr>
    	</thead>
	    <tr>
    	    <td>
            	<table>
	                <col style="width: 30%">
					<col style="width: 30%">
                    <col style="width: 25%">
                    <col style="width: 15%">
    				<tr align="center">
	            		<td><strong>Name</strong></td>
			            <td><strong>Clearance type</strong></td>
	    		        <td><strong>Findings</strong></td>
			            <td><strong>Date</strong></td>
		            </tr>
        		    <?php echo render_table($grid_applicant_other_criminal); ?>
                </table>
            </td>
	    </tr>
	</table>
    
    <table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>MOTIVATION</th>
	        </tr>
    	</thead>
	    <tr>
			<td><?php echo $motivation; ?></td>
	    </tr>
	</table>
    
    <table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>HOME AND COMMUNITY</th>
	        </tr>
    	</thead>
	    <tr>
			<td><?php echo $home_and_community; ?></td>
	    </tr>
	</table>
    
    <table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>APPLICANT PROFILE</th>
	        </tr>
    	</thead>
	    <tr>
			<td><?php echo $applicant_profile_first1; ?></td>
	    </tr>
	</table> 
    
    <table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>APPLICANT PROFILE</th>
	        </tr>
    	</thead>
	    <tr>
			<td><?php echo $applicant_profile_first2; ?></td>
	    </tr>
	</table>  
    
    <table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>FAMILY LIFESTYLE</th>
	        </tr>
    	</thead>
	    <tr>
			<td><?php echo $family_lifestyle; ?></td>
	    </tr>
	</table>  
    
    <table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>LEGAL/FINANCIAL NOTIFICATIONS AND ADVISEMENTS</th>
	        </tr>
    	</thead>
	    <tr>
			<td><?php echo $legal_financial_notifications; ?></td>
	    </tr>
	</table>  
    
    <table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>PSYCHOSOCIAL EVALUATION REPORT - HISTORY</th>
	        </tr>
    	</thead>
	    <tr>
			<td><?php echo $psychosocial_evaluation_report; ?></td>
	    </tr>
	</table>   
    
    <table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>PERSONAL CHARACTERISTICS</th>
	        </tr>
    	</thead>
	    <tr>
			<td><?php echo $personal_characteristics_first; ?></td>
	    </tr>
	</table>   
    
    <table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>HISTORY</th>
	        </tr>
    	</thead>
	    <tr>
			<td><?php echo $history_first_name; ?></td>
	    </tr>
	</table>   
    
    <table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>PERSONAL CHARACTERISTICS</th>
	        </tr>
    	</thead>
	    <tr>
			<td><?php echo $characteristics_first_name; ?></td>
	    </tr>
	</table>   
    
    <table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>MARITAL RELATIONSHIP</th>
	        </tr>
    	</thead>
	    <tr>
			<td><?php echo $marital_relationship; ?></td>
	    </tr>
	</table>    
    
    <table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>SONS/DAUGHTERS/ OTHERS RESIDING OR FREQUENTLY IN THE HOME</th>
	        </tr>
    	</thead>
	    <tr>
			<td><?php echo $residing_frequently_home; ?></td>
	    </tr>
	</table>     
    
    <table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>EXTENDED FAMILY RELATIONSHIPS</th>
	        </tr>
    	</thead>
	    <tr>
			<td><?php echo $relationships_first_name1; ?></td>
	    </tr>
	</table>    
    
    <table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>EXTENDED FAMILY RELATIONSHIPS</th>
	        </tr>
    	</thead>
	    <tr>
			<td><?php echo $relationships_first_name2; ?></td>
	    </tr>
	</table>     
    
    <table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>PHYSICAL/SOCIAL ENVIRONMENT</th>
	        </tr>
    	</thead>
	    <tr>
			<td><?php echo $physical_social_environment; ?></td>
	    </tr>
	</table>     
    
    <table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>GENERAL PARENTING</th>
	        </tr>
    	</thead>
	    <tr>
			<td><?php echo $general_parenting; ?></td>
	    </tr>
	</table>    
    
    <table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>SPECIALIZED PARENTING</th>
	        </tr>
    	</thead>
	    <tr>
			<td><?php echo $specialized_parenting1; ?></td>
	    </tr>
        <tr>
        	<td>
				<table>
                    <col style="width: 10%">
	                <col style="width: 30%">
					<col style="width: 30%">
                    <col style="width: 30%">
		            <tr>
    		        	<td><strong>Date</strong></td>
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
				</table>
			</td>
		</tr>
		<tr>
			<td colspan="4"><?php echo $specialized_parenting2; ?></td>
		</tr>
	</table>     
    
    <table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>ADOPTION ISSUES</th>
	        </tr>
    	</thead>
	    <tr>
			<td><?php echo $adoption_issues; ?></td>
	    </tr>
	</table>     
    
    <table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>PLACEMENT CONSIDERATIONS</th>
	        </tr>
    	</thead>
	    <tr>
			<td><?php echo $placement_considerations; ?></td>
	    </tr>
	</table>     
    
    <table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>RECOMMENDATION</th>
	        </tr>
    	</thead>
	    <tr>
			<td><?php echo $recommendation1; ?></td>
	    </tr>
        <tr>
        	<td>
            	<table>
                	<col style="width: 50%">
                	<col style="width: 50%">
                    <tr>
                    	<td valign="top" style="border: #000 1px solid; vertical-align: top">
	                        <p><strong>Home Study Practitioner:</strong></p>
		                	<?php echo $home_study_practitione; ?>
                		</td>
		            	<td style="border: #000 1px solid">
                        	<p><strong>Supervisor:</strong></p>
		                	<?php echo $home_study_supervisor; ?>
						</td>
                    </tr>
                    <tr>
                    	<td height="50" align="center" valign="top">(Signature)</td>
                        <td align="center" valign="top">(Signature)</td>
                    </tr>
                    <tr>
            			<td><strong>Name of the Home Study practitioner:</strong><br /> <?php echo $name_home_study_practitioner; ?></td>
		            	<td><strong>Name of supervisor:</strong><br /> <?php echo $name_supervisor; ?></td>
					</tr>
        		    <tr>
		            	<td><strong>Title:</strong> <?php echo $title_home_study_practitioner; ?></td>
        		    	<td><strong>Title:</strong> <?php echo $title_supervisor; ?></td>
					</tr>
        		    <tr>
		            	<td><strong>Date:</strong> <?php echo $recommendation_date1; ?></td>
        		    	<td><strong>Date:</strong> <?php echo $recommendation_date2; ?></td>
					</tr>
                </table>
            </td>
        </tr>
	</table>
    
    <table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>APPROVING AUTHORITY REVIEW (if applicable)</th>
	        </tr>
    	</thead>
        <tr>
           	  <td><p>Based on my review of this home study report and the recommendation cited above, the Applicants are <strong>Select One</strong> for adoption. </p></td>
		</tr>
        <tr align="center">
           	  <td height="50" align="center" valign="top">(Signature)</td>
		</tr>
		<tr>
			<td><strong>Name of Approving Authority:</strong> <?php echo $name_of_approving_authority; ?></td>
		</tr>
		<tr>
			<td><strong>Title:</strong> <?php echo $title_of_approving_authority; ?></td>
		</tr>
		<tr>
			<td><strong>Date:</strong> <?php echo $approving_date1; ?></td>
		</tr>
	</table>
    
    <table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>RECEIPT OF COPY OF HOME STUDY REPORT</th>
	        </tr>
    	</thead>
        <tr>
			<td><p>By signing below I acknowledge receiving a copy of this report and affirm that the factual statements in this home study are true and correct to the best of my knowledge.</p>
            </td>
		</tr>
        <tr>
        	<td>
	        	<table>
	                <col style="width: 50%">
                	<col style="width: 50%">
			        <tr align="center">
						<td height="50" align="center" valign="top">(Signature)</td>
                        <td align="center" valign="top">(Signature)</td>
					</tr>
					<tr>
						<td><strong>Date:</strong> <?php echo $receipt_date1; ?></td>
						<td><strong>Date:</strong> <?php echo $receipt_date1; ?></td>
					</tr>
                    </table>
			</td>
		</tr>
	</table>
    
    <table class="wrap">
    	<col style="width: 100%">
	    <thead>
    	    <tr>
        	    <th>PSYCHOSOCIAL INVENTORY RESULTS</th>
	        </tr>
    	</thead>
	    <tr>
    	    <td>
            	<table>
	                <col style="width: 50%">
					<col style="width: 50%">
    				<tr>
						<td><strong>Applicant #1:</strong></td>
                        <td><strong>Applicant #2:</strong></td>
					</tr>
                    <tr>
						<td valign="top">
                        	<table class="bordasimples">
	                            <col style="width: 10%">
								<col style="width: 10%">
   								<col style="width: 80%">
            	                <thead>
						    	    <tr>
					        	      <th>#1</th>
					    	    	    <th>#2</th>
					        		    <th>HISTORY</th>
						        	</tr>
						    	</thead>
    	                        <tr>
			                    	<td align="center"><?php echo $childhood_family_adaptability_1; ?></td>
		    	                    <td align="center"><?php echo $childhood_family_adaptability_2; ?></td>
        			                <td>Childhood Family Adaptability</td>
								</tr>
								<tr>
        		            		<td align="center"><?php echo $childhood_family_cohesion_1; ?></td>
		                        	<td align="center"><?php echo $childhood_family_cohesion_2; ?></td>
			                        <td>Childhood Family Cohesion</td>
								</tr>
								<tr>
            	        			<td align="center"><?php echo $childhood_history_deprivation_1; ?></td>
		        	                <td align="center"><?php echo $childhood_history_deprivation_2; ?></td>
        		    	            <td>Childhood History of Deprivation/Trauma</td>
								</tr>
								<tr>
        		            		<td align="center"><?php echo $childhood_history_victimization_1; ?></td>
			                        <td align="center"><?php echo $childhood_history_victimization_2; ?></td>
    	    		                <td>Childhood History of Victimization</td>
								</tr>
								<tr>
        			            	<td align="center"><?php echo $adult_history_victimization_1; ?></td>
		            	            <td align="center"><?php echo $adult_history_victimization_2; ?></td>
        		        	        <td>Adult History of Victimization/Trauma</td>
								</tr>
								<tr>
    	    		            	<td align="center"><?php echo $history_child_abuse_1; ?></td>
			                        <td align="center"><?php echo $history_child_abuse_2; ?></td>
		    	                    <td>History of Child Abuse/Neglect</td>
								</tr>
								<tr>
                    				<td align="center"><?php echo $history_alcohol_drug_1; ?>s</td>
		                    	    <td align="center"><?php echo $history_alcohol_drug_2; ?></td>
		                        	<td>History of Alcohol/Drug Use</td>
								</tr>
								<tr>
        	            			<td align="center"><?php echo $crime_arrest_allegations_1; ?></td>
		    	                    <td align="center"><?php echo $crime_arrest_allegations_2; ?>s</td>
        			                <td>Crime/Arrest/Allegations/Violence</td>
								</tr>
								<tr>
        		            		<td align="center"><?php echo $psychiatric_history_1; ?></td>
		                        	<td align="center"><?php echo $psychiatric_history_2; ?></td>
	        		                <td>Psychiatric History</td>
								</tr>
								<tr>
        			            	<td align="center"><?php echo $occupational_history_1; ?>s</td>
		        	                <td align="center"><?php echo $occupational_history_2; ?>s</td>
		            	            <td>Occupational History</td>
								</tr>
								<tr>
	                    			<td align="center"><?php echo $marriage_domestic_partner_1; ?></td>
			                        <td align="center"><?php echo $marriage_domestic_partner_2; ?></td>
        			                <td>Marriage/Domestic Partner History</td>
								</tr>
					    	    <tr>
				        	      <th>#1</th>
				    	    	    <th>#2</th>
				        		    <th>PERSONAL CHARACTERISTICS</th>
					        	</tr>
                                <tr>
	                    			<td align="center"><?php echo $communication_1; ?></td>
			                        <td align="center"><?php echo $communication_2; ?></td>
        			                <td>Communication</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $commitment_responsibility_1; ?></td>
			                        <td align="center"><?php echo $commitment_responsibility_2; ?></td>
        			                <td>Commitment and Responsibility</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $problem_solving_1; ?></td>
			                        <td align="center"><?php echo $problem_solving_2; ?></td>
        			                <td>Problem Solving</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $interpersonal_relations_1; ?></td>
			                        <td align="center"><?php echo $interpersonal_relations_2; ?></td>
        			                <td>Interpersonal Relations</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $health_physical_stamina_1; ?></td>
			                        <td align="center"><?php echo $health_physical_stamina_2; ?></td>
        			                <td>Health and Physical Stamina</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $self_esteem_1; ?></td>
			                        <td align="center"><?php echo $self_esteem_2; ?></td>
        			                <td>Self-esteem</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $acceptance_differences_1; ?></td>
			                        <td align="center"><?php echo $acceptance_differences_2; ?></td>
        			                <td>Acceptance of Differences</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $coping_skills_1; ?></td>
			                        <td align="center"><?php echo $coping_skills_2; ?></td>
        			                <td>Coping Skills</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $impulse_control_1; ?></td>
			                        <td align="center"><?php echo $impulse_control_2; ?></td>
        			                <td>Impulse Control</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $mood_1; ?></td>
			                        <td align="center"><?php echo $mood_2; ?></td>
        			                <td>Mood</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $anger_management_resolution_1; ?></td>
			                        <td align="center"><?php echo $anger_management_resolution_2; ?></td>
        			                <td>Anger Management and Resolution</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $judgment_1; ?></td>
			                        <td align="center"><?php echo $judgment_2; ?></td>
        			                <td>Judgment</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $adaptability_1; ?></td>
			                        <td align="center"><?php echo $adaptability_1; ?></td>
        			                <td>Adaptability</td>
								</tr>
                                <tr class="wrap">
                    				<th colspan="3">MARITAL RELATIONSHIP</th>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $conflict_resolution; ?></td>
       			                  <td colspan="2">Conflict Resolution</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $emotional_support; ?></td>
       			                  <td colspan="2">Emotional Support</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $attitude_toward_spouse; ?></td>
       			                  <td colspan="2">Attitude toward Spouse</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $communication_between_couple; ?></td>
       			                  <td colspan="2">Communication between Couple</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $balance_power; ?></td>
       			                  <td colspan="2">Balance of Power</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $stability_marriage; ?></td>
       			                  <td colspan="2">Stability of the Marriage</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $sexual_compatibility; ?></td>
       			                  <td colspan="2">Sexual Compatibility</td>
								</tr>
                              <tr class="wrap">
                    				<th colspan="3">SONS/DAUGHTERS/OTHERS RESIDING OR FREQUENTLY IN THE HOME</th>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $minor_sons_daughters; ?></td>
        			                <td colspan="2">Minor Sons and Daughters</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $minors_residing_frequently_home; ?></td>
        			                <td colspan="2">Minors Residing or Frequently in the Home</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $adult_sons_daughters; ?></td>
        			                <td colspan="2">Adult Sons and Daughters</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $adults_residing_frequently_home; ?></td>
        			                <td colspan="2">Adults Residing or Frequently in the Home</td>
								</tr>
							</table>
                   	  </td>
	                      <td valign="top">
    	                   	<table class="bordasimples">
        	                    <col style="width: 10%">
								<col style="width: 10%">
   								<col style="width: 80%">
                    	        <thead>
					    		    <tr>
				        		      	<th>#1</th>
					        		    <th>#2</th>
					        	    	<th>EXTENDED FAMILY RELATIONSHIPS</th>
							        </tr>
						    	</thead>
        	                    <tr>
		    	                	<td align="center"><?php echo $extended_family_cohesion_1; ?></td>
		        	                <td align="center"><?php echo $extended_family_cohesion_2; ?></td
	                	        	><td>Extended Family Cohesion</td>
								</tr>
								<tr>
		                    		<td align="center"><?php echo $extended_family_adaptability_1; ?></td>
			                        <td align="center"><?php echo $extended_family_adaptability_2; ?></td
									><td>Extended Family Adaptability</td>
								</tr>
								<tr>
  		        	            	<td align="center"><?php echo $relationship_extended_family_1; ?></td>
		            	            <td align="center"><?php echo $relationship_extended_family_2; ?></td
									><td>Relationship with own Extended Family</td>
								</tr>
								<tr>
			                    	<td align="center"><?php echo $relationship_spouse_partner_family_1; ?></td>
			                        <td align="center"><?php echo $relationship_spouse_partner_family_2; ?></td
		    	                    ><td>Relationship with Spouse/Partner Family</td>
								</tr>
								<tr class="wrap">
                    				<th colspan="3">PHYSICAL/SOCIAL ENVIRONMENT</th>
								</tr>
								<tr>
			                        <td align="center"><?php echo $cleanliness_orderliness_maintenance; ?></td>
                                  <td colspan="2">Cleanliness/Orderliness/Maintenance</td>
								</tr>
								<tr>
			                        <td align="center"><?php echo $safety; ?></td>
                                  <td colspan="2">Safety</td>
								</tr>
								<tr>
			                        <td align="center"><?php echo $furnishings; ?></td>
                                  <td colspan="2">Furnishings</td>
								</tr>
								<tr>
			                        <td align="center"><?php echo $play_area_equipment_clothing; ?></td>
                                  <td colspan="2">Play Area/Equipment/Clothing</td>
								</tr>
								<tr>
			                        <td align="center"><?php echo $finances; ?></td>
                                  <td colspan="2">Finances</td>
								</tr>
								<tr>
			                        <td align="center"><?php echo $support_system; ?></td>
                                  <td colspan="2">Support System</td>
								</tr>
								<tr>
			                        <td align="center"><?php echo $household_pets; ?></td>
                                    <td colspan="2">Household Pets</td>
								</tr>
								<tr>
									<th>#1</th>
				    	    	    <th>#2</th>
				        		    <th>GENERAL PARENTING</th>
					        	</tr>
                                <tr>
	                    			<td align="center"><?php echo $child_development_1; ?></td>
			                        <td align="center"><?php echo $child_development_2; ?>s</td>
        			                <td>Child Development</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $parenting_style_1; ?></td>
			                        <td align="center"><?php echo $parenting_style_2; ?></td>
        			                <td>Parenting Style</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $disciplinary_methods_1; ?></td>
			                        <td align="center"><?php echo $disciplinary_methods_2; ?></td>
        			                <td>Disciplinary Methods</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $child_supervision_1; ?></td>
			                        <td align="center"><?php echo $child_supervision_2; ?></td>
        			                <td>Child Supervision</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $learning_experiences_1; ?></td>
			                        <td align="center"><?php echo $learning_experiences_2; ?></td>
        			                <td>Learning Experiences</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $parental_role_1; ?></td>
			                        <td align="center"><?php echo $parental_role_2; ?></td>
        			                <td>Parental Role</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $child_interactions_1; ?></td>
			                        <td align="center"><?php echo $child_interactions_2; ?></td>
        			                <td>Child Interactions</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $communication_with_child_1; ?></td>
			                        <td align="center"><?php echo $communication_with_child_2; ?></td>
        			                <td>Communication with Child</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $basic_care_1; ?></td>
			                        <td align="center"><?php echo $basic_care_2; ?></td>
        			                <td>Basic Care</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $child_play_1; ?></td>
			                        <td align="center"><?php echo $child_play_2; ?></td>
        			                <td>Child’s Play</td>
								</tr>
                                <tr>
				        	      	<th>#1</th>
				    	    	    <th>#2</th>
				        		    <th>SPECIALIZED PARENTING</th>
					        	</tr>
                                <tr>
	                    			<td align="center"><?php echo $expectations_1; ?></td>
			                        <td align="center"><?php echo $expectations_2; ?></td>
        			                <td>Expectations</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $effects_abuse_neglect_1; ?></td>
			                        <td align="center"><?php echo $effects_abuse_neglect_2; ?></td>
        			                <td>Effects of Abuse/Neglect</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $effect_sexual_abuse_1; ?></td>
			                        <td align="center"><?php echo $effect_sexual_abuse_2; ?></td>
        			                <td>Effects of Sexual Abuse</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $effects_separation_loss_1; ?></td>
			                        <td align="center"><?php echo $effects_separation_loss_2; ?></td>
        			                <td>Effects of Separation and Loss</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $structure_1; ?></td>
			                        <td align="center"><?php echo $structure_2; ?></td>
        			                <td>Structure</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $therapeutic_educational_resources_1; ?></td>
			                        <td align="center"><?php echo $therapeutic_educational_resources_2; ?></td>
        			                <td>Therapeutic/Educational Resources</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $birth_sibling_relationships_1; ?></td>
			                        <td align="center"><?php echo $birth_sibling_relationships_2; ?></td>
        			                <td>Birth Sibling Relationships</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $child_background_information_1; ?></td>
			                        <td align="center"><?php echo $child_background_information_2; ?></td>
        			                <td>Child Background Information</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $birth_parent_issues_1; ?></td>
			                        <td align="center"><?php echo $birth_parent_issues_2; ?></td>
        			                <td>Birth Parent Issues</td>
								</tr>
                                <tr valign="middle">
					        	    <th height="13">#1</th>
				    	    	    <th height="13">#2</th>
				        		    <th height="13">ADOPTION ISSUES</th>
				        	  </tr>
                                <tr>
	                    			<td align="center"><?php echo $infertility_1; ?></td>
			                        <td align="center"><?php echo $infertility_2; ?></td>
        			                <td>Infertility</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $telling_child_adoption_1; ?></td>
			                        <td align="center"><?php echo $telling_child_adoption_2; ?></td>
        			                <td>Telling Child about Adoption</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $openness_adoption_1; ?></td>
			                        <td align="center"><?php echo $openness_adoption_2; ?></td>
        			                <td>Openness in Adoption</td>
								</tr>
                                <tr>
	                    			<td align="center"><?php echo $adoptive_parent_status_1; ?></td>
			                        <td align="center"><?php echo $adoptive_parent_status_1; ?></td>
        			                <td>Adoptive Parent Status</td>
								</tr>
							</table>
					  </td>
					</tr>
                </table>
          </td>
	    </tr>
        <tr>
        	<td><p>I affirm that each psychosocial factor listed above was considered and rated with due professional diligence on the SAFE Psychosocial Inventory during the course of this home study. The ratings above represent the Final Desk Guide Ratings and corresponding Mitigation Ratings for all Final Desk Guide Ratings of 3, 4 or 5.</p>
            </td>
        </tr>
        <tr>
        	<td>
            	<table>
                	<col style="width: 50%">
                	<col style="width: 50%">
                    <tr>
                    	<td height="50" align="center" valign="top">(Signature)</td>
                        <td align="center" valign="top">(Signature)</td>
                    </tr>
                    <tr>
            			<td><strong>Name of the Home Study practitioner:</strong><br /> <?php echo $name_home_study_practitioner; ?></td>
		            	<td><strong>Name of supervisor:</strong><br /> <?php echo $name_supervisor; ?></td>
					</tr>
        		    <tr>
		            	<td><strong>Title:</strong> <?php echo $title_home_study_practitioner; ?></td>
        		    	<td><strong>Title:</strong> <?php echo $title_supervisor; ?></td>
					</tr>
        		    <tr>
		            	<td><strong>Date:</strong> <?php echo $psychosocial_date1; ?></td>
        		    	<td><strong>Date:</strong> <?php echo $psychosocial_date2; ?></td>
					</tr>
                </table>
            </td>
        </tr>
	</table>
</page>
<?php

    $content = ob_get_clean();

    // convert to PDF
    require_once(dirname(__FILE__).'/../html2pdf.class.php');
    try
    {
		$html2pdf = new HTML2PDF('P', 'A4', 'en');
        $html2pdf->pdf->SetDisplayMode('fullpage');
        $html2pdf->writeHTML($content, isset($_GET['vuehtml']));
        $html2pdf->Output('PrintViewer.pdf', 'I');
    }
    catch(HTML2PDF_exception $e) {
        echo $e;
        exit;
    }

?>
