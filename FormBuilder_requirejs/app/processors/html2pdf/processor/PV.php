<?php
ob_start();

// capture posts
$userid = $_POST['userID'];
$connid= $_POST['connID'];
$connectionid = $_POST['connectionID'];
$template = $_POST['template'];
$form_name = $_POST['form_name'];
$agency_name = $_POST['agency_name'];

// variable global
$domain = 'http://cdmap01.myadoptionportal.com';

// function array order by
function array_orderby(){
    $args = func_get_args();
    $data = array_shift($args);
    foreach ($args as $n => $field) {
        if (is_string($field)) {
            $tmp = array();
            foreach ($data as $key => $row)
                $tmp[$key] = $row[$field];
            $args[$n] = $tmp;
            }
    }
    $args[] = &$data;
    call_user_func_array('array_multisort', $args);
    return array_pop($args);
}

// function Combo
function Combo($ref){
    $text = isset($ref['text']) ? $ref['text'] : $ref['label'];
    $value = "";
    foreach($ref['options'] as $v){
	if($v['value'] == $ref['value']){
	    $value = $v['text'];
	}
    }
    $result = "<td><strong>$text:</strong> $value</td>";
    return $result;
}

// function Signature
function Signature($ref){
    $image = str_replace(' ', '%20', $ref["value"]);
    $result = "<td><strong>$ref[label]:</strong><br /><br />";
    $result .= "<img src='$image' style='width:100px; height:50px;'></td>";
    return $result;
}

// function Calendar
function Calendar($ref){
    $result = "<td><strong>$ref[label]:</strong> $ref[value]</td>";
    return $result;
}

// function single
function Single($field){
    if( $field["type"] == "fieldset" ) // if is a signature container
    {
	if($field["type_standard"] == "Y" OR
	   $field["type_standard"] == "U" OR
	   $field["type_standard"] == "V" OR
	   $field["type_standard"] == "X" OR
	   $field["type_standard"] == "r")
	{
	    echo '<tr>
		    <td>
			<table class="bordasimples">
			    <col style="width: 100%">
				<thead>
				    <tr>
					<th>'.$field["label"].'</th>
				    </tr>
				</thead>
	    ';
	    
	    $array = array_orderby($field["list"], 'index', SORT_ASC);
	    
	    foreach ($array as $childfield)
	    {
		if( isset($childfield["label"]) ) // not a settings item
		{
		    if( $childfield["type_standard"] == "h" && $childfield["type"] == "hidden" ) // if is hidden element which stores signature image name
		    {
			if(strlen($childfield["value"]) > 4){
			    echo '<tr>'.Signature($childfield).'</tr>';
			}
		    }else{
			Single($childfield);
		    }
		}
	    }
	    
	    echo '
			</table>
		    </td>
		</tr>
	    ';
	}
	if( $field["type_standard"] == "W" ) // nested group of fields
	{
	    echo '<tr>
		    <td>
			<table class="bordasimples">
			    <col style="width: 100%">
				<thead>
				    <tr>
					<th>'.$field["label"].'</th>
				    </tr>
				</thead>
	    ';
	    
	    // itearate over list of child fields
	    foreach ($field["list"] as $childfield)
	    {
		    if( isset($childfield["label"]) ) // not a settings item
		    {
			    echo "
				<tr>
				    <td><strong>$childfield[label]:</strong>
				    $childfield[value]</td>
				</tr>
			    ";
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
    }
    elseif( $field["type"] == "radio" ) // iterate with input radio
    {
	$select = "<tr>";
	$select .= "<td><strong>$field[label]:</strong> $field[value]</td>";
	$select .= "</tr>";
	if($field[value]){
	    echo $select;
	}
    }
    elseif( $field["type"] == "combo" ) // iterate with input combo
    {
	echo "<tr>".Combo($field)."</tr>";
    }
    elseif( $field["type"] == "label" ) // iterate with input label
    {
	$select = "<tr>";
	$select .= "<td><strong>$field[label]</strong></td>";
	$select .= "</tr>";
	if($field[value]){
	    echo $select;
	}   
    }
    elseif( $field["type"] == "calendar" )
    {
	echo '<tr>'.Calendar($field).'</tr>';
    }
    elseif( $field["type"] == "checkbox" )
    {
	$select = "<tr><td><strong>$field[label]:</strong> $field[value]</td></tr>";
	echo $select;
    }
    elseif( $field["type"] == "input" ){
	$select = "<tr><td><strong>$field[label]:</strong> $field[value]</td></tr>";
	echo $select;
    }
}
?>

<link type="text/css" rel="stylesheet" href="<?=$domain?>/modules/FormBuilder/css/FormBuilder_PDF.css" />

<page backtop="10mm" backbottom="10mm" backleft="10mm" backright="10mm">
    <page_header backleft="10mm" backright="10mm">
        <table>
            <col style="width:100%" />
            <tr>
                <td class="header"><?=$form_name?></td>
            </tr>
        </table>
    </page_header>
    <page_footer backleft="10mm" backright="10mm">

          <table id="footer">
            <col style="width:75%" />
            <col style="width:25%" />
            <tr>
                <td style="text-align: left;" class="footer"><?=$agency_name?></td>
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
                    <span style="font-size:10mm;"><b style="font-size:10mm;"><?=$agency_name?></b></span>
                    <br /><br />
                </div>
            </td>
        </tr>
        <tr>
            <td style="width: 100%">
                <div class="zone" style="height: 18mm;position: relative;font-size: 14mm; text-align:center;color:#333;">
                    <span style="font-size:14mm;"><b style="font-size:14mm;"><?=$form_name?></b></span>
                </div>
            </td>
        </tr>
    </table>
</page>

<?php
$pages = json_decode($template, true);

foreach ($pages as $page) 
{
    if( isset($page["label"]) && isset($page["page_id"]) )
    {
        $label = $page["label"];
        $page_id = $page["page_id"];
        $pagename = $page["pagename"];
        $page_layout = $page["page_layout"];
        $list = $page["list"];
?>

<page backtop="10mm" backbottom="10mm" backleft="10mm" backright="10mm">
    <page_header backleft="10mm" backright="14mm">
        <table>
            <col style="width:95%" />
            <tr>
                <td class="header"><?=$form_name?></td>
            </tr>
        </table>
    </page_header>
    
    <page_footer backleft="10mm" backright="10mm">
        <table id="footer">
            <col style="width:75%" />
            <col style="width:22%" />
            <tr>
                <td style="text-align: left;" class="footer"><?=$form_name?> - <?=$agency_name?></td>
                <td style="text-align: right;" class="footer">Page [[page_cu]] of [[page_nb]]</td>
            </tr>
        </table>
    </page_footer>
    
    <div class="powered">
        Powered by CAIRS technology
    </div>
    <table class="wrap">
        <col style="width: 100%">
        <thead>
            <tr>
                <th><?=$label?></th>
            </tr>
        </thead>
        <tr>
            <td>

            <?php 
            if( $page_layout == "D" )
            {                
                $first = array();
                $second = array();
                
                foreach ($page["list"] as $column) // foreach column on the page
                {
                    if( isset($column["name"]) ) // if is a column
                    {
                        foreach ($column["list"] as $field)
                        {
                            if($field['index'] % 2 == 0)
                            {
                                $first[] = $field;
                            }
                            else
                            {
                                $second[] = $field;
                            }
                        }
                    }
                }
		
		echo '<table>';
		echo '<col style="width: 50%">';
		echo '<col style="width: 50%">';
    
		echo '<tr><td valign="top"><div class="first">';
		    echo '<table>';
		    $f = array_orderby($first, 'index', SORT_ASC);
		    foreach($f as $v){
			Single($v);
		    }
		    echo '</table>';
		echo '</div></td>';
		
		echo '
		
		';
		
		echo '<td valign="top"><div class="second">';
		    echo '<table>';
		    $s = array_orderby($second, 'index', SORT_ASC);
		    foreach($s as $v){
			Single($v);
		    }
		    echo '</table>';
		echo '</div></td></tr>';
		
		echo '</table>';
            }
            else
            {
                foreach ($page["list"] as $column) // foreach column on the page
                {
                    if( isset($column["name"]) ) // if is a column
                    {
                        // set column dimensions
                        echo '
                            <table>
                                <col style="width: 100%">
                        ';
                        foreach ($column["list"] as $field)
                        {
                            Single($field);
                        }
			echo '
			    </table>
			';
                    }
                }
            }
            ?>
        
            </td>
        </tr>
    </table>
</page>
<?php
    }
}

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