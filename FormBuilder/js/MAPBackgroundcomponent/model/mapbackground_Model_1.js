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
        "headers": "Degree Type,Year Completed,Institution,Primary Study,Secondary Study,DegreeTypeID",
        "ids": "degreetype,YearCompleted,Institution,Primary,Secondary,DegreeTypeID",
        "widths": "140,100,*,200,200,5",
        "colaligns": "left,center,left,left,left,left",
        "coltypes": "ed,ed,ed,ed,ed,ed",
        "colsorting": "str,,str,str,,,"
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
			        {type: "hidden", name: "sectionname",value: "education"},
					 {type: "hidden", name: "education_ID",value: "0"},
				{type:"combo" , name:"combo_1", label:"Degree Type",validate:"NotEmpty", width:175, labelWidth:"100", labelHeight:"21", inputWidth:"95", inputHeight:"21", labelLeft:"15", labelTop:"15", inputLeft:"145", inputTop:"15", position:"absolute",required: true,
                                  options: [{text: "Pick degree type",value: ""}
								  ]
                                 },
								 {type: "input",name: "Institution",label: "Institution",value: "",width: 175,labelWidth: "80",labelHeight: "21",inputWidth: "95",inputHeight: "21",labelLeft: "15",labelTop: "65",inputLeft: "145",inputTop: "65",position: "absolute"
            }, {type:"combo" , name:"combo_2", label:"Degree Year", width:175, labelWidth:"80", labelHeight:"21", inputWidth:"95", inputHeight:"21", labelLeft:"15", labelTop:"115", inputLeft:"145", inputTop:"115", position:"absolute",
                    options: [{text: "Pick year completed",value: ""}
            ]
                },{type:"input" , name:"PrimaryStudy", label:"Primary Study", value: '', width:175, labelWidth:"85", labelHeight:"21", inputWidth:"95", inputHeight:"21", labelLeft:"15", labelTop:"165", inputLeft:"145", inputTop:"165", position:"absolute"
                },{type:"input" , name:"SecondaryStudy", label:"Secondary Study", value: '', width:175, labelWidth:"100", labelHeight:"21", inputWidth:"95", inputHeight:"21", labelLeft:"15", labelTop:"215", inputLeft:"145", inputTop:"215", position:"absolute"
								 }
				]
    }
}