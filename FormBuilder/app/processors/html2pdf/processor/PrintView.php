<?php
// variable global
$num = 0;

// function single
function Single($field){
    if( $field["type"] == "fieldset" ) // if is a signature container
    {
	if( $field["type_standard"] == "Y" ) // if is a signature container
	{
	    foreach ($field["list"] as $childfield)
	    {
		if( isset($childfield["label"]) ) // not a settings item
		{
		    if( $childfield["type_standard"] == "h" && $childfield["type"] == "hidden" ) // if is hidden element which stores signature image name
		    {
			if( strlen( $childfield["value"] ) > 4 )
			{
			    echo '
				<tr>
				    <td><strong>'.$field["label"].':</strong> <br><br> <img src="'.$childfield["value"].'" style="width:100px; height:50px;"></td>
				</tr>
			    ';
			}
		    }
		}
	    }
	}
	if( $field["type_standard"] == "W" ) // nested group of fields
	{
	    echo '
		<tr>
		    <td>
			<table class="bordasimples">
			    <col style="width: 50%">
			    <col style="width: 50%">
				<thead>
				    <tr>
					<th>'.$field["label"].'</th>
					<th></th>
				    </tr>
				</thead>
	    ';
	    
	    // itearate over list of child fields
	    foreach ($field["list"] as $childfield)
	    {
		    if( isset($childfield["label"]) ) // not a settings item
		    {
			    echo '
				<tr>
				    <td><strong>'.$childfield["label"].':</strong></td>
				    <td>'.$childfield["value"].'</td>
				</tr>
			    ';
		    }
	    }
	    echo '
			</table>
		    </td>
		</tr>
	    ';
	}	
    }
    elseif( $field["type"] == "multiselect" ) // iterate with input multiselect
    {
	$multiselect = "<tr>";
	$multiselect .= "<td><strong>$field[label]:</strong>";
	$num = 0;
	foreach($field["value"] as $row){
	    if($num){
		$multiselect .= ", $row";
	    }else{
		$multiselect .= " $row";
		$num = 1;
	    }
	}
	$multiselect .= "</td>";
	$multiselect .= "</tr>";
	echo $multiselect;
    }
    elseif( $field["type"] == "select" ) // iterate with input select
    {
	$select = "<tr>";
	$select .= "<td><strong>$field[label]:</strong> $field[value]</td>";
	$select .= "</tr>";
	echo $select;
    }elseif( $field["type"] == "input" ) // iterate with input simple
    {
	$select = "<tr>";
	$select .= "<td><strong>$field[label]:</strong> $field[text]</td>";
	$select .= "</tr>";
	echo $select;
    }elseif( $field["type"] == "radio" ) // iterate with input radio
    {
	$select = "<tr>";
	$select .= "<td><strong>$field[label]:</strong> $field[value]</td>";
	$select .= "</tr>";
	if($field[value]){
	    echo $select;
	}
    }elseif( $field["type"] == "calendar" ) // iterate with input calendar
    {
	$select = "<tr>";
	$select .= "<td><strong>$field[label]:</strong> $field[value]</td>";
	$select .= "</tr>";
	if($field[value]){
	    echo $select;
	} 
    }elseif( $field["type"] == "combo" ) // iterate with input combo
    {
	$select = "<tr>";
	$select .= "<td><strong>$field[label]:</strong> $field[value]</td>";
	$select .= "</tr>";
	if($field[value]){
	    echo $select;
	} 
    }elseif( $field["type"] == "label" ) // iterate with input label
    {
	$select = "<tr>";
	$select .= "<td><strong>$field[value]</strong></td>";
	$select .= "</tr>";
	if($field[value]){
	    echo $select;
	}   
    }
    else
    {
	$select = "<tr>";
	$select .= "<td><strong>$field[label]:</strong> $field[value]</td>";
	$select .= "</tr>";
	echo $select;
    }
}

// function double
function Double($field){
    if( $field["type"] == "multiselect" ) // iterate with input multiselect
    {
	$multiselect .= "<td><strong>$field[label]:</strong>";
	$num = 0;
	foreach($field["value"] as $row){
	    if($num){
		$multiselect .= ", $row";
	    }else{
		$multiselect .= " $row";
		$num = 1;
	    }
	}
	$multiselect .= "</td>";
	echo $multiselect;
    }
}

    ob_start();
	
	$userid = $_POST['userID'];
	$connid= $_POST['connID'];
	$connectionid = $_POST['connectionID'];
	
	
	//========***************** DHTMLX GRID - expect JSON
	$template = $_POST['template'];
	$form_name = $_POST['form_name'];
	$agency_name = $_POST['agency_name'];
	
	
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

<page backtop="10mm" backbottom="10mm" backleft="10mm" backright="10mm">
    <page_header backleft="10mm" backright="10mm">
        <table>
        	<col style="width:100%" />
            <tr>
                <td class="header"><?php echo $form_name;?></td>
            </tr>
        </table>
    </page_header>
    <page_footer backleft="10mm" backright="10mm">

          <table id="footer">
          <col style="width:75%" />
          <col style="width:25%" />
            <tr>
                <td style="text-align: left;" class="footer"><?php echo $agency_name;?></td>
                <td style="text-align: right;" class="footer"></td>
            </tr>
        </table>
    </page_footer>
    <img src="logo.jpg" alt="logo" style="margin-top: 3mm; width:200px">
    <table style="width: 99%;border: none;" cellspacing="4mm" cellpadding="0">
        <tr>
            <td style="width: 100%">
                <div class="zone" style="height: 18mm;position: relative;font-size: 10mm; text-align:center; color:#ccc;">
                    <br /><br /><br /><br /><br />
                    <span style="font-size:10mm;"><b style="font-size:10mm;"><?php echo $agency_name; ?></b></span>
                    <br /><br />
                </div>
            </td>
        </tr>
        <tr>
            <td style="width: 100%">
                <div class="zone" style="height: 18mm;position: relative;font-size: 14mm; text-align:center;color:#333;">
                    <span style="font-size:14mm;"><b style="font-size:14mm;"><?php echo $form_name;?></b></span>
                </div>
            </td>
        </tr>
    </table>
</page>
	<?php 



		$pages = json_decode($template, true);
		
		
		#echo var_dump($pages);
		
		//echo "<br><br>";
		//echo "<br><br>";
		
		
		foreach ($pages as $page) 
		{
			if( isset($page["label"]) && isset($page["page_id"]) )
			{
				$label = $page["label"];
				$page_id = $page["page_id"];
				$pagename = $page["pagename"];
				$page_layout = $page["page_layout"];
				$list = $page["list"];
				

				//echo $page["label"];
				//echo var_dump($page);
				
?>
					<page backtop="10mm" backbottom="10mm" backleft="10mm" backright="10mm">
					<page_header backleft="10mm" backright="14mm">
						<table>
							<col style="width:95%" />
							<tr>
								<td class="header"><?php echo $form_name;?></td>
							</tr>
						</table>
					</page_header>
					<page_footer backleft="10mm" backright="10mm">
				
						  <table id="footer">
						  <col style="width:75%" />
						  <col style="width:22%" />
							<tr>
								<td style="text-align: left;" class="footer"><?php echo $form_name;?> - <?php echo $agency_name;?></td>
                				<td style="text-align: right;" class="footer">Page [[page_cu]] of [[page_nb]]</td>
							</tr>
						</table>
					</page_footer>
					<div style="rotate: 90; position: absolute; width: 100mm; height: 4mm; left: 190mm; top: 0; font-style: italic; font-weight: normal; text-align: center; font-size: 2.5mm;">
						Powered by CAIRS technology
					</div>
					<table class="wrap">
					  <col style="width: 100%">
						<thead>
							<tr>
								<th><?php echo $label;?></th>
							</tr>
						</thead>
						<tr>
							  <td>
                                <?php 
								
								if( $page_layout == "D" )
                                {
									    echo '
										    <table>
										    <col style="width: 50%">
										    <col style="width: 50%">
										    <tr>
									    ';
									foreach ($page["list"] as $column) // foreach column on the page
									{
										if( isset($column["name"]) ) // if is a column
										{
											foreach ($column["list"] as $field)
											{
												if( $field["type"] == "fieldset" ) // if is a signature container
												{
													if( $field["type_standard"] == "Y" ) // if is a signature container
													{
														foreach ($field["list"] as $childfield)
														{
															if( isset($childfield["label"]) ) // not a settings item
															{
																if( $childfield["type_standard"] == "h" && $childfield["type"] == "hidden" ) // if is hidden element which stores signature image name
																{
																	if( strlen( $childfield["value"] ) > 4 )
																	{
																		echo '
																				<tr>
																					<td><strong>'.$field["label"].':</strong> <br><br> <img src="'.$childfield["value"].'" style="width:100px; height:50px;"></td>
																					<td><strong>'.$field["label"].':</strong> <br><br> <img src="'.$childfield["value"].'" style="width:100px; height:50px;"></td>
																				</tr>
																		';
																	}
																	
																}
															}
														}
													}	
												}
												else
												{
												    Double($field);
												}
											}
										}
									}
                                }
                                else
                                {
                                	foreach ($page["list"] as $column) // foreach column on the page
									{
										if( isset($column["name"]) ) // if is a column
										{
											// set column dimensions
											echo '
													<col style="width: 100%">
											';
											foreach ($column["list"] as $field)
											{
											    Single($field);
											}
										}
									}
                                }
								
								echo '
								    </tr>	
								    </table>
								';
                                ?>
							  </td>
						</tr>
						
					</table>
					</page>
<?php
			}
		}

?>

     
    
	


