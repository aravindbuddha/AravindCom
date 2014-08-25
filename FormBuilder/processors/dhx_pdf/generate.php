<?php

require_once 'gridPdfGenerator.php';
require_once 'tcpdf/tcpdf.php';
require_once 'gridPdfWrapper.php';

$debug = false;
$error_handler = set_error_handler("PDFErrorHandler");

if (get_magic_quotes_gpc()) {
	$xmlString = stripslashes($_POST['grid_xml']);
} else {
	$xmlString = $_POST['grid_xml'];
}
$xmlString = urldecode($xmlString);
if ($debug == true) {
	error_log($xmlString, 3, 'debug_'.date("Y_m_d__H_i_s").'.xml');
}

preg_match_all("/<head>(.*?)<\/head>/", $xmlString, $head);
preg_match_all("/<row>(.*?)<\/row>/", $xmlString, $row);

$header = str_ireplace('rowspan="2"', "rowspan='1'", $head[1][0]);

$result = "<rows profile='color'><head>" . $header . "</head>";

foreach($row[1] as $r){
    preg_match_all("/<cell>(.*?)<\/cell>/", $r, $cell);
    $v = "<row>";
    $v .= "<cell>" . $cell[1][0] . "</cell>";
    $v .= "<cell>" . $cell[1][1] . "</cell>";
    $v .= "<cell>" . $cell[1][14] . "</cell>";
    $v .= "</row>";
    $result .= $v;
}

$result .= "</rows>";

$xml = simplexml_load_string($result);

$pdf = new gridPdfGenerator();


//page offsets
$pdf->minOffsetTop = 10;
$pdf->minOffsetBottom = 10;
$pdf->minOffsetLeft = 10;
$pdf->minOffsetRight = 10;
//element sizes
$pdf->headerHeight = 7;
$pdf->rowHeight = 5;
$pdf->minColumnWidth = 13;
$pdf->pageNumberHeight = 10;
//font settings
$pdf->fontSize = 8;
//image settings
$pdf->dpi = 96;
$pdf->footerImgHeight = 50;
$pdf->headerImgHeight = 50;

//main bg color of grid
$pdf->bgColor = 'D1E5FE';
//color of border lines
$pdf->lineColor = 'A4BED4';
//color of text in grid's header
$pdf->headerTextColor = '000000';
//color of alter-css - even row
$pdf->scaleOneColor = 'FFFFFF';
//color of alter-css - odd row
$pdf->scaleTwoColor = 'E3EFFF';
//color of text in the data part
$pdf->gridTextColor = '000000';
//color of the text on a page ( page number, etc. )
$pdf->pageTextColor = '000000';

//control processing of html tags
$pdf->strip_tags = true;

$pdf->printGrid($xml);

function PDFErrorHandler ($errno, $errstr, $errfile, $errline) {
	global $xmlString;
	if ($errno < 1024) {
		error_log($xmlString, 3, 'error_report_'.date("Y_m_d__H_i_s").'.xml');
		echo $errfile." at ".$errline." : ".$errstr;
		exit(1);
	}

}

?>