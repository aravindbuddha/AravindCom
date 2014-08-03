var mapbackground_Model = {
    "text_labels": {
        "main_window_title": "Background Component"
    },
    "globalSkin": "dhx_skyblue",
    "conf_window": {
        "image_path": "",
        "viewport": "body",
        "left": 400,
        "top": 5,
        "width": 880,
        "height": 550,
		"model_edit_winHeight": 600,
		"model_edit_winWidth": 450,
        "enableAutoViewport": true,
        "icon": "background.png",
        "icon_dis": "background.png"
    },
    "conf_grid": {
        "headers": "Race,Citizenship,Ethnicity,Language,#cspan,Religion,Ancestry,#cspan,Raceiid,Racerecordid,Citizenshipid,Citizenshiprecrdid,Ethnicityid,Ethnicityrecorid,Languageid,Languagerecordid,SecondaryLanguageid,SecondaryLanguagerecordid,Religionid,Religionrecordid,Ancestryid,Ancestryrecordid,SecondaryAncestryid,SecondaryAncestryrecordid",
		"attachheader": "#rspan,#rspan,#rspan,Primary,Secondary,#rspan,Primary,Secondary,Raceiid,Racerecordid,Citizenshipid,Citizenshiprecrdid,Ethnicityid,Ethnicityrecorid,Languageid,Languagerecordid,SecondaryLanguageid,SecondaryLanguagerecordid,Religionid,Religionrecordid,Ancestryid,Ancestryrecordid,SecondaryAncestryid,SecondaryAncestryrecordid",
        "ids": "Race,Citizenship,Ethnicity,Primary,Secondary,Religion,Ancestry,AncestrySecondary,Raceiid,Racerecordid,Citizenshipid,Citizenshiprecrdid,Ethnicityid,Ethnicityrecorid,Languageid,Languagerecordid,SecondaryLanguageid,SecondaryLanguagerecordid,Religionid,Religionrecordid,Ancestryid,Ancestryrecordid,SecondaryAncestryid,SecondaryAncestryrecordid",
        "widths": "140,100,*,100,90,90,90,100,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5",
        "colaligns": "left,left,left,left,left,left,left,left,left,left,left,left,left,left,left,left,left,left,left,left,left,left,left,left",
        "coltypes": "ed,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed",
        "colsorting": "str,str,str,str,str,str,str,str,str,str,str,str,str,str,str,str,str,str,str,str,str,str,str,str"
    },
    "conf_toolbar": {
        "icon_path": "",
        "items": [
            {
                "type": "button",
                "id": "new",
                "text": "New",
                "img": "new.png",
                "img_disabled": "new.png"
            },{
                "type": "button",
                "id": "edit",
                "text": "Edit",
                "img": "edit.png",
                "img_disabled": "edit.png"
            },{
                "type": "button",
                "id": "delete",
                "text": "Delete",
                "img": "delete.png",
                "img_disabled": "delete.png"
            },{
                "type": "button",
                "id": "help",
                "text": "Help",
                "img": "Help.png",
                "img_disabled": "Help.png"
            },{
                "type": "button",
                "id": "close",
                "text": "Close",
                "img": "cancel.png",
                "img_disabled": "cancel.png"
            }
        ]
    },    
	"edit_toolbar": {
        "icon_path": "",
        "items": [{
            "type": "button",
            "id": "save",
            "text": "Save",
            "img": "save.png",
            "img_disabled": "save.png"
        }, {
            "type": "button",
            "id": "close",
            "text": "Close",
            "img": "cancel.png",
            "img_disabled": "cancel.png"
        }]
    },
    "conf_layout": {
        "pattern": "1C"
    },
    "conf_form": {
        "template": [{type: "settings", position: "label-left" , labelWidth: 150, inputWidth: 130},
			        {type: "hidden", name: "sectionname",value: "background"},
					 {type: "hidden", name: "contact_ID",value: ""},
				{type:"combo" , name:"combo_1", label:"Race", width:175, labelWidth:"80", labelHeight:"21", inputWidth:"95", inputHeight:"21", labelLeft:"15", labelTop:"15", inputLeft:"95", inputTop:"15", position:"absolute",
                                  options: [{text: "Pick Race",value: ""}
								  ]
                                 },{type:"label" , name:"form_label_1", label:"Citizenship",className:"myTest", width:75, labelWidth:"75", labelHeight:"21", inputWidth:"75", inputHeight:"21", labelLeft:"15", labelTop:"65", inputLeft:"15", inputTop:"86", position:"absolute"
                                 },{type:"multiselect" , name:"multiselect_1", width:175, labelWidth:"80", labelHeight:"81", inputWidth:"95", inputHeight:"81", labelLeft:"185", labelTop:"65", inputLeft:"90", inputTop:"65", position:"absolute",
                                 options:[]
								 },{ type:"label" , label:"Primary Language", className:"myTest", width:75, labelWidth:"75", labelHeight:"21", inputWidth:"75", inputHeight:"21", labelLeft:"15", labelTop:"165", inputLeft:"15", inputTop:"186", position:"absolute"
                                },{ type:"combo" , name:"combo_2", width:175, labelWidth:"80", labelHeight:"21", inputWidth:"95", inputHeight:"21", labelLeft:"185", labelTop:"165", inputLeft:"90", inputTop:"165", position:"absolute",
                                     options: [{text: "Pick Language",value: "Pick Language"}]
								},{ type:"label" , label:"Secondary Language", className:"myTest", width:75, labelWidth:"75", labelHeight:"21", inputWidth:"75", inputHeight:"21", labelLeft:"15", labelTop:"215", inputLeft:"15", inputTop:"236", position:"absolute"  },
                                {type:"multiselect" , name:"multiselect_2", width:175, labelWidth:"80", labelHeight:"21", inputWidth:"95", inputHeight:"81", labelLeft:"185", labelTop:"215", inputLeft:"90", inputTop:"215", position:"absolute",
                                 options:[]
								 }
								 ,{type:"combo" , name:"combo_3", label:"Religion", width:175, labelWidth:"80", labelHeight:"21", inputWidth:"95", inputHeight:"21", labelLeft:"315", labelTop:"15", inputLeft:"395", inputTop:"15", position:"absolute",
                                      options: [{text: "Pick Religion",value: "Pick Religion"}]
								 },{ type:"label" , label:"Ethnicity",className:"myTest", width:75, labelWidth:"75", labelHeight:"21", inputWidth:"75", inputHeight:"21", labelLeft:"315", labelTop:"65", inputLeft:"315", inputTop:"86", position:"absolute"
                                 },{ type:"multiselect" , name:"multiselect_3", width:175, labelWidth:"80", labelHeight:"21", inputWidth:"95", inputHeight:"81", labelLeft:"485", labelTop:"65", inputLeft:"390", inputTop:"65", position:"absolute",
                                  options:[]
								 },{type:"label" , label:"Primary Ancestry",className:"myTest", width:75, labelWidth:"75", labelHeight:"21", inputWidth:"75", inputHeight:"21", labelLeft:"315", labelTop:"165", inputLeft:"315", inputTop:"186", position:"absolute"
                                },{ type:"combo" , name:"combo_4", width:175, labelWidth:"80", labelHeight:"21", inputWidth:"95", inputHeight:"21", labelLeft:"485", labelTop:"165", inputLeft:"390", inputTop:"186", position:"absolute",
                                 options: [{text: "Pick Ancestry",value: "Pick Ancestry"}]
								},{type:"label" , label:"Secondary Ancestry", className:"myTest", width:75, labelWidth:"75", labelHeight:"21", inputWidth:"75", inputHeight:"21", labelLeft:"315", labelTop:"215", inputLeft:"315", inputTop:"236", position:"absolute"
                                },{type:"multiselect" , name:"multiselect_4", width:175, labelWidth:"80", labelHeight:"21", inputWidth:"95", inputHeight:"81", labelLeft:"485", labelTop:"215", inputLeft:"390", inputTop:"215", position:"absolute",
                                 options:[]
								 }
				]
    }
}