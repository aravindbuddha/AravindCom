<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>RelationShip Component</title>
<style type="text/css" media="screen">
html, body{
	 width:100%;
	 height:100%;
	 margin:0px;
	 padding:0px;
	 font-family:Tahoma, Geneva, sans-serif;
	 font-size:11px;
	 background:#CCC;
	 -webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
.dhxform_obj_dhx_skyblue .customCss div.dhxform_txt_label2 {
    color: #000000;
    font-size: 13px;
    font-weight: normal;
    margin-left: -23px;
    text-align: left;
}
.dhxform_obj_dhx_skyblue .fieldSetClass fieldset.dhxform_fs {
    height: 720px;
}
        </style>
<!-- DHTMLX Framework -->
<link rel="stylesheet" type="text/css" href="../../auxiliary/dhtmlxfull3.5/dhtmlx.css" />
<script type="text/javascript" src="../../auxiliary/dhtmlxfull3.5/dhtmlx.js" charset="ISO-8859-1"></script>
<!-- DHTMLX Framework -->
<!-- CAIRS Framework -->
<script type="text/javascript" src="../../auxiliary/js/CAIRS_fw.js"></script>
<!-- CAIRS Framework -->
<!-- relationship component -->
<script type="text/javascript" src="model/MAPrelationshipmodel.js"></script>
<script type="text/javascript" src="controller/MAPrelationshipcontroller.js"></script>
<!-- relationship component -->
<!-- -Autto Complete Jquery Start-->
<script type="text/javascript" src="../../auxiliary/js/jquery-1.4.2.min.js"></script>
<script type='text/javascript' src='../../auxiliary/js/jquery.autocomplete.js'></script>
<script type='text/javascript' src='../../auxiliary/js/jquery.autocomplete_message.js'></script>
<link rel="stylesheet" type="text/css" href="../../auxiliary/js/jquery.autocomplete.css" />
<!-- -Autto Complete Jquery End-->
</head>
<body>

</body>
<script type="text/javascript" language="javascript">
			window.onload = function (e) 
            {
			
			//relationship_function(84780,271439,822);
			relationship_function(86081,276425,'');
			}
			
function relationship_function(contactid,connectionid,groupid){
				    var values = {	
                    contactid 			    : contactid,
					connectionid 			: connectionid,
					groupid                 : groupid,
					useWindow : true,
     				parentDIVId : '',
					application_path : "http://devroleslocal.myadoptionportal.com/modules/MAPrelationshipcomponent/" ,
                    dhtmlx_codebase_path : "http://devroleslocal.myadoptionportal.com/auxiliary/dhtmlxfull3.5/" 
                 };
				MAPRelationshipComponent.loadValues(values);
				MAPRelationshipComponent.initComponent();
}			
</script>
</html>