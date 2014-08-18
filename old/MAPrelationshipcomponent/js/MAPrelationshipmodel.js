//Model for add contact
var Model_MAPRelationshipComponentModel = {
	

	 model_globalImgPath : "../../auxiliary/dhtmlxfull3.5/imgs/dhtmlxtoolbar_imgs/"
	,model_globalSkin : "dhx_skyblue" 
	,model_conf_window :  "Actions-view-pim-contacts-icon.png"
	,model_winHeight :  682  
	,model_winWidth :  600
	,model_edit_winHeight :  800
	,model_edit_winWidth :  500
	,model_conf_Toolbar_addcontact : 
			{
				items :  { toolbar: [
				{ item : { id:"PersonalRelationships_new", type: "button", img: "new48.png", imgdis: "new48.png", text: "New" } }
				,{ item : { id:"PersonalRelationships_casenotes", type: "button", img: "case_note_icon.gif", imgdis: "case_note_icon.gif",   text: "Case Notes" } }
				,{ item : { id:"PersonalRelationships_fastfact", type: "button", img: "fastfacts.png", imgdis: "fastfacts.png",   text: "Fast Fact" } }
				,{ item : { id:"PersonalRelationships_airstasklist", type: "button", img: "airs_task_list_icon.gif", imgdis: "airs_task_list_icon.gif",   text: "Airs Task List" } }
				,{ item : { id:"PersonalRelationships_delete", type: "button", img: "delete_icons.gif", imgdis: "delete_icons.gif",   text: "Delete" } }
				,{ item : { id:"PersonalRelationships_help", type: "button", img: "help.png", imgdis: "help.png", text: "Help" } }
				,{ item : { id:"PersonalRelationships_close", type: "button", img: "cancel.png", imgdis: "closewindow.png", text: "Close" } }
				] } 
			}
	,model_conf_Toolbar_editcontact : 
			{
				items :  { toolbar: [
				{ item : { id:"edit_new", type: "button", img: "save.gif", imgdis: "save.gif", text: "Save" } }
				,{ item : { id:"edit_help", type: "button", img: "help.png", imgdis: "help.png", text: "Help" } }
				,{ item : { id:"edit_close", type: "button", img: "cancel.png", imgdis: "closewindow.png", text: "Close" } }
				] } 
			}			
	,model_Layout: {
        skin: '1C'
	}
	,Form :{
		template : [
			{
				type: "block", width : 650,  offsetLeft: 0, 
				inputWidth: "auto",
				tab_width : "100px",
				//id: "tab_family_detail",
				label : "Family detail",
				
				list: [
					{type: "settings", position: "label-left"},
			
		{ type:"input" , name:"contact_name", label:"Contact", position:"absolute",inputWidth:"200", labelLeft:"20", labelTop:"10", inputLeft:"20", inputTop:"30"  },
                { type:"label" , name:"processingWheel1", label:'<img alt="Processing wheel" id="processingWheel1" style="display:none;" src="images/bigrotation.gif" width="20px"; height="20px" />',  labelWidth: "16", labelHeight:"16",labelLeft:"200", labelTop:"35",position:"absolute",hidden:false},
                { type:"label" , name:"p1plusicon", label:'<img alt="Add Contact" id="plusicon" src="../../auxiliary/dhtmlxfull3.5/icons/add.png" onclick="add_contact_func(\'0\',\'add\',\'\', \'\', \'p1plusicon\',\'\',\'6thpanel\')"/>', labelWidth: "20", labelHeight:"20",labelLeft:"230", labelTop:"27",position:"absolute",hidden:false},
                { type:"combo" , name:"primaryRelationship", label:"Primary&nbsp;Relationship", inputWidth:"200", labelLeft:"20", labelTop:"70", inputLeft:"20", inputTop:"90", position:"absolute"  },
		{ type:"combo" , name:"relationTypeId1", labelWidth:"140",label:"Person1", inputWidth:"180", labelLeft:"20", labelTop:"163", inputLeft:"155", inputTop:"160", position:"absolute"  },
		{ type:"combo" , name:"relationTypeId2", labelWidth:"140",label:"Person2", inputWidth:"180", labelLeft:"20", labelTop:"212", inputLeft:"155", inputTop:"210", position:"absolute"  },
		{ type:"calendar" , name:"startdate_1", label:"Start&nbsp;Date&nbsp;(mm-dd-yyyy)", labelWidth:"200",dateFormat:"%m-%d-%Y", enableTime: false,value:"",options:{		}, labelLeft:"350", labelTop:"140", inputLeft:"350", inputTop:"161", position:"absolute",inputWidth:"150"  ,readonly:1},
		{ type:"calendar" , name:"enddate_1", label:"End&nbsp;Date&nbsp;(mm-dd-yyyy)", labelWidth:"200",dateFormat:"%m-%d-%Y", options:{
		}, labelLeft:"520", labelTop:"140", inputLeft:"520", inputTop:"161", position:"absolute" ,inputWidth:"150",readonly:1 },
		{ type:"calendar" , name:"startdate_2", label:"Start&nbsp;Date&nbsp;(mm-dd-yyyy)", labelWidth:"200",dateFormat:"%m-%d-%Y", value:'',options:{
		}, labelLeft:"350", labelTop:"190", inputLeft:"350", inputTop:"210", position:"absolute" ,inputWidth:"150",readonly:1 },
		{ type:"calendar" , name:"enddate_2", label:"End&nbsp;Date&nbsp;(mm-dd-yyyy)", labelWidth:"200",dateFormat:"%m-%d-%Y", options:{
		}, labelLeft:"520", labelTop:"190", inputLeft:"520", inputTop:"210", position:"absolute",inputWidth:"150",readonly:1  },
		{ type:"label" , name:"form_label_3", label:"Relationship", labelLeft:"20",labelTop:"125", inputLeft:"60", inputTop:"0", position:"absolute" },
                { type:"input", hidden: true, name:"connectionId",value:""},
                { type:"input", hidden: true, name:"relConnId",value:""},
                { type:"input", hidden: true, name:"relAction",value:'inserted'},
                { type:"input", hidden: true, name:"relConnectionId1",value:""},
                { type:"input", hidden: true, name:"relConnectionId2",value:""},
                { type:"input", hidden: true, name:"hRelationTypeId1",value:''},
                { type:"input", hidden: true, name:"hRelationTypeId2",value:''},
                { type:"input", hidden: true, name:"combo1value",value:''}
                
																												   
																															   
	]
	}
	]}
};