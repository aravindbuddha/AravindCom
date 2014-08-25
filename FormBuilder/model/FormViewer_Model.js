var FormViewer_Model = {
    "text_labels": {
        "main_window_title": "FormViewer"
    },
    "globalSkin": "dhx_skyblue",
	"globalImgPath" : "",
    "conf_window": {
        "image_path": "",
        "viewport": "body",
        "left": 100,
        "top": 5,
        "width": 1100,
        "height": 550,
        "enableAutoViewport": true,
        "icon": "form.png",
        "icon_dis": "form.png"
    }
	
	,conf_window_print : {
		image_path: ""
        ,viewport : "body"
		,left: 400
		,top: 5
		,width: 750
		,height: 500
		,title : "Print view"
		,enableAutoViewport : true
		,icon : "form.gif"
		,icon_dis : "form.gif"
	},
	
	
	
	conf_form : {
        "template": [
			{
				type: "settings",
				position: "label-left",
				labelWidth: 140,
				inputWidth: 140,
				inputLeft : 10,
				index : -1
			}
			
			
		]
		,"signature_controls": [
		
		]
		,defaultRootProperties : {
				type: "settings",
				position: "label-left",
				labelWidth: 140,
				inputWidth: 140,
				inputLeft : 10,
				index : -1
			}
    },
	
	"conf_toolbar": {
        "icon_path": "",
        "items": [
            {
                "type": "button",
                "id": "save_form",
                "text": "save form",
                "img": "save.png",
                "img_disabled": "save_dis.png",
				disabled : false
            },{
                "type": "button",
                "id": "submit_form",
                "text": "submit form",
                "img": "submit.png",
                "img_disabled": "submit_dis.png",
				disabled : false
            },{
                "type": "button",
                "id": "print_form",
                "text": "print form",
                "img": "print.png",
                "img_disabled": "print_dis.png"
				,disabled : false
            }
        ]
    }
	
	,"conf_layout": {
        "pattern": "1C"
    }
	
	,conf_tabbar : {
		//parent: "a_tabbar",
		image_path: "",
		skin: "dhx_skyblue",
		tabs: []
    }
};
FormViewer.model = FormViewer_Model;