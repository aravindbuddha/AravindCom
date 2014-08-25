var FormBuilder_Model = {
    "text_labels": {
        "main_window_title": "CAIRS FormBuilder"
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
	}
	
	,conf_window_rules : {
		image_path: ""
        ,viewport : "body"
		,left: 400
		,top: 5
		,width: 800
		,height: 500
		,title : "Rules manager"
		,enableAutoViewport : true
		,icon : "rules.png"
		,icon_dis : "rules_dis.png"
	},
	
	// form_id,formlabel,formtext,formname,formindex,redirecturl,adminalert,autorespond,tiplocation,display,preview,nomultiple,captcha,key_id,form_agency_id,submissionmsg,displaycolumns,numofrecords,formtype,formdisplaytype
	
    "conf_grid": {
        "headers": "ID,Form label,Form name,Form text,formindex,redirecturl,adminalert,autorespond,tiplocation,display,preview,nomultiple,captcha,key_id,Owner name,submissionmsg,displaycolumns,numofrecords,formtype,formdisplaytype,skin,Pregenerated Form",
        "ids": "form_id,formlabel,formname,formtext,formindex,redirecturl,adminalert,autorespond,tiplocation,display,preview,nomultiple,captcha,key_id,form_agency_id,submissionmsg,displaycolumns,numofrecords,formtype,formdisplaytype,skin,has_json",
        "widths": "90,*,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,120",
        "colaligns": "right,left,left,left,left,left,left,left,left,left,left,left,left,left,left,left,left,left,left,left,left,left",
        "coltypes": "ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,coro,ro,ro,ro,ro,ro,ro,ro",
        "colsorting": "int,str,str,str,str,str,str,str,str,str,str,str,str,str,str,str,str,str,str,str,str,str",
        "bind_library_field": "false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false"
    },
	
	
	
	
	"conf_form_context_menu": { menu: [
            { item : { id: "form_builder", text : "build form", img : "builder.png", imgdis : "builder.png"}}
            ,{ item : { id: "view_entries", text : "view entries", img : "entries.png", imgdis : "entries.png"} }
            ,{ item : { id: "delete_form", text : "delete selected", img : "excluir.png", imgdis : "excluir.png"} }
			,{ item : { id: "file_sep_1", type : "separator"} }
			,{ item : { id: "reload", text : "reload", img : "atualizar.png", imgdis : "atualizar.png"}}
     ] },
	 
    "conf_toolbar": {
        "icon_path": "",
        "items": [
            {
                "type": "button",
                "id": "new_form",
                "text": "create new form",
                "img": "add_form.png",
                "img_disabled": "add_form_dis.png"
				,disabled : true
            },{
                id: "new_s1",
                type: "separator"
            },
			{
                "type": "button",
                "id": "form_builder",
                "text": "build form",
                "img": "builder.png",
                "img_disabled": "builder_dis.png"
				,disabled : true
            },{
                "type": "button",
                "id": "view_entries",
                "text": "view entries",
                "img": "entries.png",
                "img_disabled": "entries_dis.png"
				,disabled : true
            },
			{
                "type": "button",
                "id": "delete_form",
                "text": "delete selected form",
                "img": "delete.png",
                "img_disabled": "delete_dis.png"
				,disabled : true
            },{
                id: "new_s2",
                type: "separator"
            },
			{
                "type": "button",
                "id": "print_form_list",
                "text": "print list of form",
                "img": "print.png",
                "img_disabled": "print_dis.png"
				,disabled : true
            },{
                id: "new_s3",
                type: "separator"
            },
			{
                "type": "button",
                "id": "library_field_maker",
                "text": "library field maker",
                "img": "library_field_maker.png",
                "img_disabled": "library_field_maker.png"
				//,disabled : true
            }
        ]
    },
	
	
	"conf_toolbar_taskbar": {
		"parent": "toolbar_taskbar_FormBuilder",
        "icon_path": "",
        "items": [
            
        ]
    },
	
	"conf_toolbar_grid_library_fields": {
        "icon_path": "",
        "items": [
            {
                "type": "button",
                "id": "add_as_field",
                "text": "add to the selected page as a field",
                 "img": "add_field.png",
                "img_disabled": "add_field_dis.png"
				,disabled : true
            },{
                id: "new_s1",
                type: "separator"
            },
			{
                "type": "button",
                "id": "add_as_option",
                "text": "add to the selected field as a child field",
                "img": "add_option.png",
                "img_disabled": "add_option_dis.png"
				,disabled : true
            }
        ]
    },
    "conf_layout": {
        "pattern": "1C"
    },
    "conf_form": {
        "template": [
			{
				type: "settings",
				position: "label-left",
				labelWidth: 120,
				inputWidth: 160
			}
			,{
				type: 'block',
				inputWidth: 'auto',
				inputHeight :'auto',
				name : "fake",
				list: [
					
				]
			}
			,{
				type: 'block',
				inputWidth: 'auto',
				inputHeight :'auto',
				name : "formroot",
				list: [
					
				]
			}
		]
    }
	
	
	
	
	
	,"conf_window_form": {
		title : "Add new form",
		"image_path": "",
        "viewport": "body",
        "left": 20,
        "top": 5,
        "width": 1300,
        "height": 630,
        "enableAutoViewport": true,
        "icon": "builder.png",
        "icon_dis": "builder_dis.png"
    },
    "conf_grid_form": {
        "headers": "ID",
        "ids": "id",
        "widths": "90",
        "colaligns": "right",
        "coltypes": "ro",
        "colsorting": "int",
        "bind_library_field": "false"
    },
    "conf_toolbar_form": {
        "icon_path": "",
        "items": [
            {
                "type": "button",
                "id": "save_form",
                "text": "save and sync form",
                "img": "save_and_sync.png",
                "img_disabled": "save_and_sync_dis.png",
				disabled : false
            }
        ]
    },
    "conf_layout_form": {
        "pattern": "1C"
    },
	"conf_layout_form_preview": {
        "pattern": "1C"
    },
	conf_tabbar_form : {
		//parent: "a_tabbar",
		image_path: "",
		skin: "dhx_skyblue",
		tabs: []
    },
	conf_tabbar_rules : {
		//parent: "a_tabbar",
		image_path: "",
		skin: "dhx_skyblue",
		tabs: []
    },
    "conf_form_properties": {
        "template": [
			{
				type: "settings",
				position: "label-left",
				labelWidth: 160,
				inputWidth: 230
			}
			

			,{name: "form_id", type: 'hidden', label: 'form_id:', value : -1, tooltip : ""}
			,{type: "hidden", name: 'formname', label: 'Form name:', value : "", tooltip : "This field is automatically filled. Start on next field.", readonly : true, info : 1, required : 1}
			,{type: "input", name: 'formlabel', label: 'Form Label:', value : "", tooltip : "Provide the name/label of the form for displaying on screen", required: true, validate: 'NotEmpty', info : 1, required : 1}
					,{type: "input", name: 'formtext', label: 'Form text:', value : "", tooltip : "", rows:5}
					
					/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
					,{name: "captcha", type: 'hidden', label: 'captcha:', value : "", tooltip : ""}
					,{name: "key_id", type: 'hidden', label: 'key_id:', value : "", tooltip : ""}
					,{name: "form_agency_id", type: 'hidden', label: 'form_agency_id:', value : "", tooltip : ""}
					,{name: "numofrecords", type: 'hidden', label: 'numofrecords:', value : "", tooltip : ""}
					//,{name: "formtype", type: 'hidden', label: 'formtype:', value : "", tooltip : ""}
					//,{name: "formdisplaytype", type: 'hidden', label: 'formdisplaytype:', value : "", tooltip : ""}
					
					,{type: "input", name: 'submissionmsg', label: 'Submission Message:', value : "", tooltip : ""}
					
					,{type: "combo", name: 'formtype', label: 'Form Type:',  options:[
							{text: "Normal form", value: "1"}
						  ,{text: "Payment Form", value: "2"}
						  ,{text: "Parent Reporting Form", value: "3"}
						], tooltip : ""
					}
					
					,{type: "hidden", name: 'formdisplaytype', value : "1", label: 'Form Display Type(deprecated*):'}
					
					,{type: "label", label: "Type of Email Messages:", labelWidth: 400, list:[
							{
								type: "settings",
								position: "label-right",
								labelWidth: 290,
								inputWidth: 20
							},
							{type: "hidden", name: "adminalert", value: "", label: "Notify Admin"},
							{type: "checkbox", name: "adminalert_checkbox", value: "Y", label: "Notify Admin", trigger : "adminalert"},
							{type: "hidden", name: "autorespond", value: "", label: "Send Autoresponder"},
							{type: "checkbox", name: "autorespond_checkbox", value: "Y", label: "Send Autoresponder", trigger : "autorespond"},
					]}
					,{type: "hidden", value : "A", label: "Location of Tips (deprecated*):", labelWidth: 400}
					,{type: "combo", name: 'skin', label: 'Form skin:',  options:[
							{text: "skyblue", value: "dhx_skyblue"}
						  ,{text: "web", value: "dhx_web"}
						  ,{text: "terrace", value: "dhx_terrace"}
						], tooltip : ""
					}
					,{type:"newcolumn", offset:60}
					,{type: "label", label: "Form Columns:", labelWidth: 400, list:[
							{
								type: "settings",
								position: "label-right",
								labelWidth: 290,
								inputWidth: 20
							},
							{type: "radio", name: "displaycolumns", value: "S", label: "Single", checked : true},
							{type: "radio", name: "displaycolumns", value: "D", label: "Double"}
							
					]}
					,{type: "hidden", label: "Form Display:", value: "S", labelWidth: 400}
					
					,{type: "hidden", name: "preview", value: "", label: "Show Preview Button:"}
					,{type: "checkbox", name: "preview_checkbox", value: "Y", label: "Show Preview Button:", trigger: "preview"}
					
					,{type: "hidden", name: "nomultiple", value: "", label: "Submission Restriction:"}
					,{type: "checkbox", name: "nomultiple_checkbox", value: "Y", label: "Submission Restriction:", trigger : "nomultiple"}
					
					,{type: "label", label: "Upon Submission:", labelWidth: 400, list:[
							{
								type: "settings",
								position: "label-right",
								labelWidth: 290,
								inputWidth: 20
							},
							{type: "radio", name: "formindex", value: "D", label: "Direct user to Web Reply page (see Autoresponders)", checked : true},
							{type: "radio", name: "formindex", value: "R", label: "Redirect user to", list:[
								{
									type: "settings",
									position: "label-right",
									labelWidth: 0,
									inputWidth: 280
								},
								{type: "input", name: 'redirecturl', label : "Redirect user to URL", value : "", tooltip : ""}
							]},
					]}
					
					
		]
    },
	
	conf_layout_form_layout: {
        "pattern": "2U"
    },
	
	conf_layout_form_layout_left: {
        "pattern": "2E"
    },
	
	conf_layout_form_layout_right: {
        "pattern": "1C"
    },
	
	"conf_grid_pages": {
        "headers": "Page name,Layout,Tab width,Order,rule action,rule match,rule enable",
        "ids": "pagename,page_layout,tab_width,index,rule_action,rule_match,rule_enable",
        "widths": "300,120,90,90,0,0,0",
        "colaligns": "left,right,right,right,right,right,right",
        "coltypes": "ed,coro,ro,ro,ro,ro,ro",
        "colsorting": "str,str,int,int,str,str,str",
        "bind_library_field": "false,false,false,false,false,false,false"
    },
	
	//	field_id, page_id, type, label, caption, name, tooltip, required, verification, size, textareacolumn, textarearow, index, text_size, value, mailsendercopy, key_id, use_library, library_field_id, library_field_name, section_id, field_group_id,  use_as_label, MultiRecord, className, sequence, mask_to_use, 
	
	conf_grid_fields : { 
		headers : "Field Type,type_standard,Input name,Display name,Caption,Default text,Tips,Text size,Required,Is Library Field,Lib field ID,Custom CSS,Mask,Order,Validation rules,rule action,rule match,rule enable"
		,ids : "type,type_standard,name,label,caption,value,tooltip,text_size,required,use_library,library_field_id,className,mask_to_use,index,validate,rule_action,rule_match,rule_enable"

		,widths : "80,0,0,150,0,0,0,0,60,60,60,0,60,60,0,0,0,0"
	//	,widths : "80,60,150,60,60,60,60,60,60,60,60,60,60,60,60"
		,colaligns : "left,left,left,left,left,left,left,left,center,center,right,right,left,right,left,left,left,left"
		,coltypes : "coro,ro,ed,ed,ed,ed,ro,ro,coro,coro,ro,ro,coro,ro,ro,ro,ro,ro"
		,colsorting : "str,str,str,str,str,str,str,str,str,str,str,str,str,int,str,str,str,str"
		,dateFormat : "%m-%d-%Y"
		,"bind_library_field": "false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false"
	},
	
	conf_grid_library_fields : { 
		headers : "&nbsp;,Field Type,type_standard,Input name,Display name,Caption,Default text,User Tips,Text size,Required,Is Library Field,Lib field ID,Custom CSS,Mask"
		//,extra_header : "#rspan,#rspan,#rspan,#rspan,<div style='padding-right:3px'><input type='text' type='text' style='width: 99%; border:1px solid gray;' onClick='(arguments[0]||window.event).cancelBubble=true;' onKeyUp='FormBuilder._feedGrid( \"" + uid + "\" )' id='search_label'></div>,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan"
		,ids : "sub_row,type,type_standard,name,label,caption,value,tooltip,text_size,required,use_library,library_field_id,className,mask_to_use"
		,widths : "30,80,0,50,150,100,80,0,0,0,0,0,0,0"
		,colaligns : "right,left,left,left,left,left,left,left,left,left,left,left,left,left"
		,coltypes : "sub_row,coro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro"
		,colsorting : "na,str,str,str,str,str,str,str,str,str,str,str,str,str"
		,dateFormat : "%m-%d-%Y"
		,"bind_library_field": "false,false,false,false,false,false,false,false,false,false,false,false,false"
	},
	
	conf_dataView_pre_defined_fields : { 
		settings : {
			type: {
				template: "#img# #text#",
				padding: 5,
				height: 34,
				width: 130
			},
			drag: true,
			select: true
		}, 
		
		data : [
			//type,name,label,caption,value,tooltip,text_size,required,use_library,className,mask_to_use,index
			{
				"id": "B",
				"img": "<img src='" + FormBuilder.application_path + "assets/checkbox.png'>",
				"text": "<div class='span_field_selector'>checkbox</div>",
				"name": "My checkbox",
				"type" : "B",
				"label" : "My checkbox",
				"caption" : "My checkbox",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			}
			,{
				"id": "q",
				"img": "<img src='" + FormBuilder.application_path + "assets/checkbox.png'>",
				"text": "<div class='span_field_selector'>Checkbox group</div>",
				"name": "My checkbox group",
				"type" : "q",
				"label" : "My checkbox group",
				"caption" : "My checkbox group",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			}
			,{
				"id": "Z",
				"img": "<img src='" + FormBuilder.application_path + "assets/checkbox.png'>",
				"text": "<div class='span_field_selector'>checkbox nested fields</div>",
				"name": "My checkbox nested fields",
				"type" : "Z",
				"label" : "My checkbox nested fields",
				"caption" : "My checkbox nested fields",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			}
			,{
				"id": "E",
				"img": "<img src='" + FormBuilder.application_path + "assets/date.png'>",
				"text": "<div class='span_field_selector'>date</div>",
				"name": "My date",
				"type" : "E",
				"label" : "My date",
				"caption" : "My date",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "date",
				"validate" : ""
			},{
				"id": "D",
				"img": "<img src='" + FormBuilder.application_path + "assets/dropdown.png'>",
				"text": "<div class='span_field_selector'>dropdown</div>",
				"name": "My dropdown",
				"type" : "D",
				"label" : "My dropdown",
				"caption" : "My dropdown",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			},
			{
				"id": "e",
				"img": "<img src='" + FormBuilder.application_path + "assets/placeholder.png'>",
				"text": "<div class='span_field_selector'>Empty placeholder</div>",
				"name": "Empty placeholder",
				"type" : "e",
				"label" : "Empty placeholder",
				"caption" : "Empty placeholder",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			}
			,{
				"id": "email",
				"img": "<img src='" + FormBuilder.application_path + "assets/email.png'>",
				"text": "<div class='span_field_selector'>email</div>",
				"name": "My email",
				"type" : "T",
				"label" : "My email",
				"caption" : "My email",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			},{
				"id": "file_upload",
				"img": "<img src='" + FormBuilder.application_path + "assets/file_upload.png'>",
				"text": "<div class='span_field_selector'>file upload</div>",
				"name": "My file upload",
				"type" : "F",
				"label" : "My file upload",
				"caption" : "My file upload",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			},{
				"id": "G",
				"img": "<img src='" + FormBuilder.application_path + "assets/section_break.png'>",
				"text": "<div class='span_field_selector'>grey bar-section heading</div>",
				"name": "My grey bar-section heading",
				"type" : "G",
				"label" : "My grey bar-section heading",
				"caption" : "My grey bar-section heading",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			}
			,{
				"id": "imageupload",
				"img": "<img src='" + FormBuilder.application_path + "assets/file_upload.png'>",
				"text": "<div class='span_field_selector'>image upload</div>",
				"name": "My image upload",
				"type" : "F",
				"label" : "My image upload",
				"caption" : "My image upload",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			},{
				"id": "integer",
				"img": "<img src='" + FormBuilder.application_path + "assets/number.png'>",
				"text": "<div class='span_field_selector'>integer</div>",
				"name": "My integer",
				"type" : "T",
				"label" : "My integer",
				"caption" : "My integer",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "integer",
				"validate" : ""
			}
			,{
				"id": "M",
				"img": "<img src='" + FormBuilder.application_path + "assets/multiple_choice.png'>",
				"text": "<div class='span_field_selector'>multiple choice</div>",
				"name": "My multiple choice",
				"type" : "M",
				"label" : "My multiple choice",
				"caption" : "My multiple choice",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			}
			/*,{
				"id": "7",
				"img": "<img src='" + FormBuilder.application_path + "assets/name.png'>",
				"text": "<div class='span_field_selector'>name</div>",
				"name": "My name",
				"type" : "",
				"label" : "My name",
				"caption" : "My name",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			}*/
			
			/*,{
				"id": "3",
				"img": "<img src='" + FormBuilder.application_path + "assets/paragraph.png'>",
				"text": "<div class='span_field_selector'>paragraph text</div>",
				"name": "My paragraph text",
				"type" : "",
				"label" : "My paragraph text",
				"caption" : "My paragraph text",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			}*/,{
				"id": "W",
				"img": "<img src='" + FormBuilder.application_path + "assets/nested.png'>",
				"text": "<div class='span_field_selector'>nested group fields</div>",
				"name": "My checkbox",
				"type" : "W",
				"label" : "My nested group fields",
				"caption" : "My nested group fields",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			}
			,{
				"id": "r",
				"img": "<img src='" + FormBuilder.application_path + "assets/radio.png'>",
				"text": "<div class='span_field_selector'>Radio group</div>",
				"name": "My radio group",
				"type" : "r",
				"label" : "My radio group",
				"caption" : "My radio group",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			}
			,{
				"id": "phone",
				"img": "<img src='" + FormBuilder.application_path + "assets/usphone.png'>",
				"text": "<div class='span_field_selector'>US phone</div>",
				"name": "My US phone",
				"type" : "T",
				"label" : "My US phone",
				"caption" : "My US phone",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "us_phone",
				"validate" : ""
			},{
				"id": "can_phone",
				"img": "<img src='" + FormBuilder.application_path + "assets/canphone.png'>",
				"text": "<div class='span_field_selector'>Canada phone</div>",
				"name": "My Canada phone",
				"type" : "T",
				"label" : "My Canada phone",
				"caption" : "My Canada phone",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "can_phone",
				"validate" : ""
			},{
				"id": "currency",
				"img": "<img src='" + FormBuilder.application_path + "assets/uscurrency.png'>",
				"text": "<div class='span_field_selector'>US currency</div>",
				"name": "My US currency",
				"type" : "I",
				"label" : "My US currency",
				"caption" : "My US currency",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "currency",
				"validate" : ""
			},{
				"id": "can_currency",
				"img": "<img src='" + FormBuilder.application_path + "assets/cancurrency.png'>",
				"text": "<div class='span_field_selector'>Canada currency</div>",
				"name": "My Canada currency",
				"type" : "T",
				"label" : "My Canada currency",
				"caption" : "My Canada currency",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "can_currency",
				"validate" : ""
			}
			,{
				"id": "price",
				"img": "<img src='" + FormBuilder.application_path + "assets/payment_options.png'>",
				"text": "<div class='span_field_selector'>Price</div>",
				"name": "My price",
				"type" : "I",
				"label" : "My price",
				"caption" : "My price",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "currency",
				"validate" : ""
			}
			,{
				"id": "P",
				"img": "<img src='" + FormBuilder.application_path + "assets/payment_options.png'>",
				"text": "<div class='span_field_selector'>My Payment options</div>",
				"name": "My Payment options",
				"type" : "P",
				"label" : "My Payment options",
				"caption" : "My Payment options",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			}
			,{
				"id": "R",
				"img": "<img src='" + FormBuilder.application_path + "assets/radio.png'>",
				"text": "<div class='span_field_selector'>radiobutton</div>",
				"name": "My radiobutton",
				"type" : "R",
				"label" : "My radiobutton",
				"caption" : "My radiobutton",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			}/*,{
				"id": "RG",
				"img": "<img src='" + FormBuilder.application_path + "assets/checkbox.png'>",
				"text": "<div class='span_field_selector'>radio matrix</div>",
				"name": "My radio matrix",
				"type" : "RG",
				"label" : "My radio matrix",
				"caption" : "My radio matrix",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			}*/,{
				"id": "S",
				"img": "<img src='" + FormBuilder.application_path + "assets/multiple_choice.png'>",
				"text": "<div class='span_field_selector'>select choice</div>",
				"name": "My multiple choice",
				"type" : "S",
				"label" : "My select",
				"caption" : "My select",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			},{
				"id": "SSN",
				"img": "<img src='" + FormBuilder.application_path + "assets/number.png'>",
				"text": "<div class='span_field_selector'>SSN</div>",
				"name": "My SSN",
				"type" : "T",
				"label" : "My SSN",
				"caption" : "My SSN",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "SSN",
				"validate" : ""
			},{
				"id": "T",
				"img": "<img src='" + FormBuilder.application_path + "assets/single_line_text.png'>",
				"text": "<div class='span_field_selector'>text (one row)</div>",
				"name": "My text (one row)",
				"type" : "T",
				"label" : "My text (one row)",
				"caption" : "My text (one row)",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			},{
				"id": "A",
				"img": "<img src='" + FormBuilder.application_path + "assets/single_line_text.png'>",
				"text": "<div class='span_field_selector'>text area</div>",
				"name": "My text area",
				"type" : "A",
				"label" : "My text area",
				"caption" : "My text area",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			}
			,{
				"id": "L",
				"img": "<img src='" + FormBuilder.application_path + "assets/page_break.png'>",
				"text": "<div class='span_field_selector'>text for display only</div>",
				"name": "My text for display only",
				"type" : "L",
				"label" : "My text for display only",
				"caption" : "My text for display only",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			}
			,{
				"id": "time",
				"img": "<img src='" + FormBuilder.application_path + "assets/time.png'>",
				"text": "<div class='span_field_selector'>time</div>",
				"name": "My time",
				"type" : "T",
				"label" : "My time",
				"caption" : "My time",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "time",
				"validate" : ""
			}
			
			
			
			,{
				"id": "website",
				"img": "<img src='" + FormBuilder.application_path + "assets/website.png'>",
				"text": "<div class='span_field_selector'>website</div>",
				"name": "My website",
				"type" : "T",
				"label" : "My website",
				"caption" : "My website",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "website",
				"validate" : ""
			}/*
			,{
				"id": "14",
				"img": "<img src='" + FormBuilder.application_path + "assets/address.png'>",
				"text": "<div class='span_field_selector'>address</div>",
				"name": "My address",
				"type" : "",
				"label" : "My address",
				"caption" : "My address",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			}*/
			
			/*,{
				"id": "16",
				"img": "<img src='" + FormBuilder.application_path + "assets/matrix.png'>",
				"text": "<div class='span_field_selector'>matrix choice</div>",
				"name": "My matrix choice",
				"type" : "",
				"label" : "My matrix choice",
				"caption" : "My matrix choice",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			}*/
			
			
			/*,{
				"id": "19",
				"img": "<img src='" + FormBuilder.application_path + "assets/signature.png'>",
				"text": "<div class='span_field_selector'>signature</div>",
				"name": "My signature",
				"type" : "",
				"label" : "My signature",
				"caption" : "My signature",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			}*/
			
			,{
				"id": "Y",
				"img": "<img src='" + FormBuilder.application_path + "assets/signature.png'>",
				"text": "<div class='span_field_selector'>Agency signature field</div>",
				"name": "Agency signature field",
				"type" : "Y",
				"label" : "Agency signature field",
				"caption" : "Agency signature field",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			},{
				"id": "X",
				"img": "<img src='" + FormBuilder.application_path + "assets/signature.png'>",
				"text": "<div class='span_field_selector'>Caseworker signature field</div>",
				"name": "Caseworker signature field",
				"type" : "X",
				"label" : "Caseworker signature field",
				"caption" : "Caseworker signature field",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			},{
				"id": "U",
				"img": "<img src='" + FormBuilder.application_path + "assets/signature.png'>",
				"text": "<div class='span_field_selector'>Client 1 signature field</div>",
				"name": "Client 1 signature field",
				"type" : "U",
				"label" : "Client 1 signature field",
				"caption" : "Client 1 signature field",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			},{
				"id": "V",
				"img": "<img src='" + FormBuilder.application_path + "assets/signature.png'>",
				"text": "<div class='span_field_selector'>Client 2 signature field</div>",
				"name": "Client 2 signature field",
				"type" : "V",
				"label" : "Client 2 signature field",
				"caption" : "Client 2 signature field",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			},{
				"id": "PhB",
				"img": "<img src='" + FormBuilder.application_path + "assets/phone_book.png'>",
				"text": "<div class='span_field_selector'>Phone book</div>",
				"name": "My Phone book",
				"type" : "PhB",
				"label" : "My Phone book",
				"caption" : "My Phone book",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			},{
				"id": "BG",
				"img": "<img src='" + FormBuilder.application_path + "assets/background.png'>",
				"text": "<div class='span_field_selector'>Background</div>",
				"name": "My Background",
				"type" : "BG",
				"label" : "My Background",
				"caption" : "My Background",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			},{
				"id": "EC",
				"img": "<img src='" + FormBuilder.application_path + "assets/email_component.png'>",
				"text": "<div class='span_field_selector'>Email Component</div>",
				"name": "My Email Component",
				"type" : "EC",
				"label" : "My Email Component",
				"caption" : "My Email Component",
				"value" : "",
				"tooltip" : "",
				"text_size" : 200,
				
				"required" : "0",
				"use_library" : "0",
				"className" : "",
				"index" : 0,
				"mask_to_use" : "",
				"validate" : ""
			},
			{
                "id": "AddB",
                "img": "<img src='" + FormBuilder.application_path + "assets/address_book.png'>",
                "text": "<div class='span_field_selector'>Address book</div>",
                "name": "My Address book",
                "type" : "AddB",
                "label" : "My Address book",
                "caption" : "My Address book",
                "value" : "",
                "tooltip" : "",
                "text_size" : 200,
                
                "required" : "0",
                "use_library" : "0",
                "className" : "",
                "index" : 0,
                "mask_to_use" : "",
                "validate" : ""
    		}

	]},
	
	
	
	conf_grid_group_fields : { 
		headers : "Group name,Tip,Label,Tags,FieldIDSeqList"
		,ids : "GroupName,Tip,Label,FieldTagId,FieldIDSeqList"
		,widths : "200,180,180,0,0"
		,colaligns : "left,left,left,left,right"
		,coltypes : "ed,ed,ed,ro,ro"
		,colsorting : "str,str,str,str,int"
		,"bind_library_field": "false,false,false,false,false"
		,dateFormat : "%m-%d-%Y"
	},
	
	
	conf_toolbar_form_pages : {
        "icon_path": "",
        "items": [
            {
                "type": "button",
                "id": "add_page",
                "text": "add new page",
                "img": "add_page.png",
                "img_disabled": "add_page.png"
            },{
                "type": "button",
                "id": "edit_page",
                "text": "edit page",
                "img": "add_page.png",
                "img_disabled": "add_page.png",
				disabled : true
            },
			{
                "type": "button",
                "id": "delete_page",
                "text": "delete selected page",
                "img": "excluir.png",
                "img_disabled": "excluir_dis.png",
				disabled : true
            },{
                id: "new_s1",
                type: "separator"
            },{
                "type": "button",
                "id": "rules_manager",
                "text": "rules manager",
                "img": "rules.png",
                "img_disabled": "rules_dis.png",
				disabled : true
            },{
                id: "new_s2",
                type: "separator"
            },{
                "type": "button",
                "id": "undock_form_preview",
                "text": "undock form preview",
                "img": "dock.gif",
                "img_disabled": "dock.gif",
				disabled : false
            },{
				type: "text",
				id: "info",
				text: ""
			}
        ]
    },
	
	
	conf_toolbar_form_fields : {
        "icon_path": "",
        "items": [
            {
                "type": "button",
                "id": "edit_field",
                "text": "edit field",
                "img": "add_page.png",
                "img_disabled": "add_page.png",
				disabled : true
            },
			{
                "type": "button",
                "id": "delete_field",
                "text": "delete selected field",
                "img": "excluir.png",
                "img_disabled": "excluir_dis.png",
				disabled : true
            },{
                id: "new_s1",
                type: "separator"
            },{
                id: "new_s2",
                type: "separator"
            },{
                "type": "button",
                "id": "reorder_fields",
                "text": "reorder fields",
                "img": "sorting.png",
                "img_disabled": "sorting.png",
				disabled : false
            },{
                "type": "button",
                "id": "restart_reorder_fields",
                "text": "restart fields order",
                "img": "sorting.png",
                "img_disabled": "sorting.png",
				disabled : false
            },{
                id: "new_s3",
                type: "separator"
            },{
				type: "text",
				id: "info",
				text: ""
			}
        ]
    },
	
	
	conf_toolbar_field_propertie : {
        "icon_path": "",
        "items": [
            {
                "type": "button",
                "id": "save_field",
                "text": "save field",
                "img": "save.png",
                "img_disabled": "save_dis.png"
				//disabled : true
            }
        ]
    },
	
	"conf_form_custom_field": {
        "template": [
			{
				type: "settings",
				position: "label-left",
				labelWidth: 140,
				inputWidth: 140,
				inputLeft : 10
			}
			
			
			
			,{type: "hidden", name: 'field_id', value : "0"}
			,{type: "hidden", name: 'rule_enable', value : "0"}
			,{type: "hidden", name: 'rule_action', value : "show"}
			,{type: "hidden", name: 'rule_match', value : "all"}
			,{type: "combo", name: 'type', label: 'Type:',  options:[{
					text: "select one",
					value: ""}
					,{text: "text (one row)", value: "T"}
				  ,{text: "date", value: "E"} 
				   ,{text: "empty placeholder", value: "e"} 
				  ,{text: "checkbox", value: "B"}
				   ,{text: "checkbox group", value: "q"}
				  ,{text: "nested group fields", value: "W"}
				 
				  ,{text: "checkbox nested fields", value: "Z"}
				  ,{text: "multiple selections", value: "M"}
				  ,{text: "select", value: "S"}
				  ,{text: "radiobutton", value: "R"}
				   ,{text: "radio group", value: "r"}
				  //,{text: "radio matrix", value: "RG"}
				  ,{text: "text area", value: "A"}
				  ,{text: "drop-down menu", value: "D"}
				  ,{text: "text for display only", value: "L"}
				  ,{text: "file upload", value: "F"}
				  ,{text: "grey bar-section heading", value: "G"}
				  ,{text: "price", value: "I"}
				  ,{text: "payment options", value: "P"}
				  
				  ,{text: "Agency signature field", value: "Y"}
				   ,{text: "Caseworker signature field", value: "X"}
				   ,{text: "Client 1 signature field", value: "U"}
				   ,{text: "Client 2 signature field", value: "V"}
				   
				   /* components */
				   ,{text: "Phone book", value: "PhB"}
				   ,{text: "Background", value: "BG"}
				   ,{text: "Email Component", value: "EC"}
				   ,{text: "Address book", value: "AddB"}
				  
				], tooltip : "", required: true, validate: 'NotEmpty', trigger : "type_standard"
			}
			
			,{type: "hidden", name: 'type_standard', label: 'type_standard'}
			
			
			
			,{
				type: 'block',
				inputWidth: 'auto',
				inputHeight :'auto',
				name : "price_aux",
				id : "price_aux",
				list: [
					{type: "hidden", name: "priceToCairs", value: "", label: "Pay to CAIRS"}
					,{type: "checkbox", name: "priceToCairs_ckeck", value: "Y", label: "Pay to CAIRS:", trigger: "priceToCairs"}
					,{type: "input", name: 'defaultPrice', label: 'Default Price:', value : "", tooltip : "",  mask_to_use:"currency"}
					,{type: "hidden", name: "priceAllowUser", value: "", label: "Allow user to Enter value"}
					,{type: "checkbox", name: "priceAllowUser_ckeck", value: "Y", label: "Allow user to Enter value:", trigger: "priceToCairs"}
					,{type: "combo", name: "category", label: 'Category:',  options:[
							{text: "Adoption Fee", value: "198", selected : true}
						  
						]
					}
					,{type: "combo", name: "subCategory", label: 'Sub-Category:',  options:[
							{ text: "select one", value: "" }
							,{ value : "200", text : "Application/Online Case Mgmt" }
							,{ value : "201", text : "Home Study" }
							,{ value : "202", text : "Agency Fee" }
							,{ value : "203", text : "Orphanage Donation" }
							,{ value : "204", text : "Extended Travel Fee" }
							,{ value : "205", text : "Visa Fee" }
							,{ value : "622", text : "Online Case Management Fee" }
							,{ value : "623", text : "Waiting Children Process Fee" }
							,{ value : "625", text : "Home Study Review" }
							,{ value : "626", text : "Pre-Adoption Education" }
							,{ value : "634", text : "Dossier Fee" }
							,{ value : "733", text : "Consultation " }
							,{ value : "874", text : "Profile Preparation" }
							,{ value : "891", text : "Escrow Payment" }
							,{ value : "892", text : "Profile Activation" }
							,{ value : "893", text : "Post Adoption Report Services" }
							,{ value : "894", text : "HS Review/Pre-Plm Consulting" }
							,{ value : "895", text : "Home Study/Online Case Mgmt" }
							,{ value : "896", text : "Home Study Update" }
							,{ value : "897", text : "App/Online Case Mgt/Agency Fee" }
							,{ value : "898", text : "Case Mgmt/Risk/Home Study Fee" }
							,{ value : "899", text : "Home Study Addendum" }
							,{ value : "900", text : "Agency/Dossier Service Fees" }
							,{ value : "901", text : "Agency/Int Prog/Dossier Fees" }
							,{ value : "902", text : "Agency/Int Prog/Human Aid Fees" }
							,{ value : "903", text : "Agency/Int Program Fees" }
							,{ value : "904", text : "Agency/Int Prog/Orphanage Fees" }
							,{ value : "905", text : "PAR Services/Registration Fee" }
							,{ value : "906", text : "Online Case Mgmt/Risk Training" }
							,{ value : "907", text : "Placement Services" }
							,{ value : "908", text : "International Program Fee" }
							,{ value : "909", text : "Dossier Translation" }
							,{ value : "910", text : "Application Fee" }
							,{ value : "911", text : "BLAS Update Fee" }
							,{ value : "912", text : "Humanitarian Aid" }
						]//, required: true, validate: 'NotEmpty'
					}
				]
			}
			
			
			,{type: "hidden", name: 'name', label: 'Input Name:', value : "", tooltip : "This field is automatically filled. Start on next field.", readonly : true, info : true}
			,{type: "input", name: 'label', label: 'Display Name:', value : "", tooltip : "Provide the name/label of the field for displaying on screen", required: true, validate: 'NotEmpty', info : true}
			,{type: "hidden", name: 'caption', label: 'Caption (legacy):', value : "", tooltip : ""}
			,{type: "input", name: 'value', label: 'Default text:', value : "", tooltip : "Default text for this input. Works only for text input elements.", info : true}
			
			,{type: "input", name: 'tooltip', label: 'User Tips:', value : "", tooltip : "", rows : 3, tooltip : "This info text will be displayed bellow of this field.", info : true}
			,{type: "input", name: 'className', label: 'Custom CSS:', value : "", tooltip : ""}
			,{type: "btn2state", name: 'required', label: 'Required:',  tooltip : ""}
			,{type: "hidden", name: 'use_library', value : 0, label: 'Make It In Library:',  tooltip : ""}
			,{type: "hidden", name: 'text_size', label: 'Text size (*legacy):', value : "200",tooltip : "", required: true, validate: 'NotEmpty,ValidInteger', mask_to_use: "integer"}
			
			,{type: "combo", name: "mask_to_use", label: 'Mask:',  options:[
					{ text: "none", value: "" }
				  ,{text: "SSN", value: "SSN"}
				  ,{text: "time", value: "time"}
				  ,{text: "date", value: "date"}
				  ,{text: "credit card", value: "credit_card"}
				  ,{text: "cvv", value: "cvv"}
				  ,{text: "expiration date", value: "expiration_date"}
				  ,{text: "us phone", value: "us_phone"}
				  ,{text: "can phone", value: "can_phone"}
				  ,{text: "integer", value: "integer"}
				  ,{text: "currency", value: "currency"}
				  ,{text: "can currency", value: "can_currency"}
				], tooltip : "The mask effect will be applied when user types on the field. This works for text input elements only.", info : true
			}
			
			,{type:"newcolumn", offset:20}
			
			,{type: "label", label: 'Validation rules:', list:[
			
				{
					type: "settings",
					position: "label-right",
					labelWidth: 90,
					inputWidth: 30,
					inputLeft : 10
				}
				,{type: "hidden", name: 'validate', value : "", label: 'Validation rules:'}
				,{type: "checkbox", name: 'NotEmpty', label: 'Not Empty', value : "NotEmpty", trigger : "validate"}
				,{type: "checkbox", name: 'ValidEmail', label: 'Valid Email', value : "ValidEmail", trigger : "validate"}
				,{type: "checkbox", name: 'ValidInteger', label: 'Valid Integer', value : "ValidInteger", trigger : "validate"}
				,{type: "checkbox", name: 'ValidFloat', label: 'Valid Float', value : "ValidFloat", trigger : "validate"}
				,{type: "checkbox", name: 'ValidNumeric', label: 'Valid Numeric', value : "ValidNumeric", trigger : "validate"}
				,{type: "checkbox", name: 'ValidAplhaNumeric', label: 'Valid AplhaNumeric', value : "ValidAplhaNumeric", trigger : "validate"}
				,{type:"newcolumn", offset:5}
				,{type: "checkbox", name: 'ValidDatetime', label: 'Valid Datetime', value : "ValidDatetime", trigger : "validate"}
				,{type: "checkbox", name: 'ValidDate', label: 'Valid Date', value : "ValidDate", trigger : "validate"}
				,{type: "checkbox", name: 'ValidTime', label: 'Valid Time', value : "ValidTime", trigger : "validate"}
				,{type: "checkbox", name: 'Valid Currency', label: 'Valid Currency', value : "ValidCurrency", trigger : "validate"}
				,{type: "checkbox", name: 'ValidSSN', label: 'Valid SSN', value : "ValidSSN", trigger : "validate"}
				,{type: "checkbox", name: 'ValidExpirationdate', label: 'Valid Expiration date', value : "ValidExpirationdate", trigger : "validate"}
			]}
			
		]
    },
	
	"conf_form_field_propertie": {
        "template": [
			{
				type: "settings",
				position: "label-left",
				labelWidth: 140,
				inputWidth: 140,
				inputLeft : 10
			}
			
			
			
			,{type: "hidden", name: 'field_id', value : "0"}
			
			,{type: "combo", name: 'type', label: 'Type:',  options:[{
					text: "select one",
					value: ""}
					,{text: "text (one row)", value: "T"}
				  ,{text: "date", value: "E"}
				  ,{text: "empty placeholder", value: "e"} 
				  ,{text: "checkbox", value: "B"}
				   ,{text: "checkbox group", value: "q"}
				  ,{text: "nested group fields", value: "W"}
				  ,{text: "checkbox nested fields", value: "Z"}
				  ,{text: "multiple selections", value: "M"}
				  ,{text: "select", value: "S"}
				  ,{text: "radiobutton", value: "R"}
				   ,{text: "radio group", value: "r"}
				  //,{text: "radio matrix", value: "RG"}
				  ,{text: "text area", value: "A"}
				  ,{text: "drop-down menu", value: "D"}
				  ,{text: "text for display only", value: "L"}
				  ,{text: "file upload", value: "F"}
				  ,{text: "grey bar-section heading", value: "G"}
				  ,{text: "price", value: "I"}
				  ,{text: "payment options", value: "P"}
				  
				   ,{text: "Agency signature field", value: "Y"}
				   ,{text: "Caseworker signature field", value: "X"}
				   ,{text: "Client 1 signature field", value: "U"}
				   ,{text: "Client 2 signature field", value: "V"}
				  
				  
				 	/* components */
				   ,{text: "Phone book", value: "PhB"}
				   ,{text: "Background", value: "BG"}
				   ,{text: "Email Component", value: "EC"}
				   ,{text: "Address book", value: "AddB"}
				   
				], tooltip : "", required: true, validate: 'NotEmpty', trigger : "type_standard"
			}
			
			,{type: "hidden", name: 'type_standard', label: 'type_standard'}
			
			,{
				type: 'block',
				inputWidth: 'auto',
				inputHeight :'auto',
				name : "price_aux",
				id : "price_aux",
				list: [
					{type: "hidden", name: "priceToCairs", value: "", label: "Pay to CAIRS"}
					,{type: "checkbox", name: "priceToCairs_ckeck", value: "Y", label: "Pay to CAIRS:", trigger: "priceToCairs"}
					,{type: "input", name: 'defaultPrice', label: 'Default Price:', value : "", tooltip : "",  mask_to_use:"currency"}
					,{type: "hidden", name: "priceAllowUser", value: "", label: "Allow user to Enter value"}
					,{type: "checkbox", name: "priceAllowUser_ckeck", value: "Y", label: "Allow user to Enter value:", trigger: "priceToCairs"}
					,{type: "combo", name: "category", label: 'Category:',  options:[
							{text: "Adoption Fee", value: "198", selected : true}
						  
						]
					}
					,{type: "combo", name: "subCategory", label: 'Sub-Category:',  options:[
							{ text: "select one", value: "" }
							,{ value : "200", text : "Application/Online Case Mgmt" }
							,{ value : "201", text : "Home Study" }
							,{ value : "202", text : "Agency Fee" }
							,{ value : "203", text : "Orphanage Donation" }
							,{ value : "204", text : "Extended Travel Fee" }
							,{ value : "205", text : "Visa Fee" }
							,{ value : "622", text : "Online Case Management Fee" }
							,{ value : "623", text : "Waiting Children Process Fee" }
							,{ value : "625", text : "Home Study Review" }
							,{ value : "626", text : "Pre-Adoption Education" }
							,{ value : "634", text : "Dossier Fee" }
							,{ value : "733", text : "Consultation " }
							,{ value : "874", text : "Profile Preparation" }
							,{ value : "891", text : "Escrow Payment" }
							,{ value : "892", text : "Profile Activation" }
							,{ value : "893", text : "Post Adoption Report Services" }
							,{ value : "894", text : "HS Review/Pre-Plm Consulting" }
							,{ value : "895", text : "Home Study/Online Case Mgmt" }
							,{ value : "896", text : "Home Study Update" }
							,{ value : "897", text : "App/Online Case Mgt/Agency Fee" }
							,{ value : "898", text : "Case Mgmt/Risk/Home Study Fee" }
							,{ value : "899", text : "Home Study Addendum" }
							,{ value : "900", text : "Agency/Dossier Service Fees" }
							,{ value : "901", text : "Agency/Int Prog/Dossier Fees" }
							,{ value : "902", text : "Agency/Int Prog/Human Aid Fees" }
							,{ value : "903", text : "Agency/Int Program Fees" }
							,{ value : "904", text : "Agency/Int Prog/Orphanage Fees" }
							,{ value : "905", text : "PAR Services/Registration Fee" }
							,{ value : "906", text : "Online Case Mgmt/Risk Training" }
							,{ value : "907", text : "Placement Services" }
							,{ value : "908", text : "International Program Fee" }
							,{ value : "909", text : "Dossier Translation" }
							,{ value : "910", text : "Application Fee" }
							,{ value : "911", text : "BLAS Update Fee" }
							,{ value : "912", text : "Humanitarian Aid" }
						]//, required: true, validate: 'NotEmpty'
					}
				]
			}
			
			,{type: "hidden", name: 'name', label: 'Input Name:', value : "", tooltip : "This field is automatically filled. Start on next field.", readonly : true, info : true}
			,{type: "input", name: 'label', label: 'Display Name:', value : "", tooltip : "Provide the name/label of the field for displaying on screen", required: true, validate: 'NotEmpty', info : true}
			,{type: "hidden", name: 'caption', label: 'Caption (legacy):', value : "", tooltip : ""}
			,{type: "input", name: 'value', label: 'Default text:', value : "", tooltip : "Default text for this input. Works only for text input elements.", info : true}
			
			,{type: "input", name: 'tooltip', label: 'User Tips:', value : "", tooltip : "", rows : 3, tooltip : "This info text will be displayed bellow of this field.", info : true}
			,{type: "input", name: 'className', label: 'Custom CSS:', value : "", tooltip : ""}
			,{type: "btn2state", name: 'required', label: 'Required:',  tooltip : ""}
			,{type : "hidden", name: 'use_library', label: 'Is Library Field:',  tooltip : ""}
			,{type: "hidden", name: 'text_size', label: 'Text size (*legacy):', value : "200",tooltip : "", required: true, validate: 'NotEmpty,ValidInteger', mask_to_use: "integer"}
			
			
			,{type: "combo", name: "mask_to_use", label: 'Mask:',  options:[{
					text: "none",
					value: ""},
					{text: "SSN", value: "SSN"}
				  ,{text: "time", value: "time"}
				  ,{text: "date", value: "date"}
				  ,{text: "credit card", value: "credit_card"}
				  ,{text: "cvv", value: "cvv"}
				  ,{text: "expiration date", value: "expiration_date"}
				  ,{text: "us phone", value: "us_phone"}
				  ,{text: "can phone", value: "can_phone"}
				  ,{text: "integer", value: "integer"}
				  ,{text: "currency", value: "currency"}
				  ,{text: "can currency", value: "can_currency"}
				], tooltip : "The mask effect will be applied when user types on the field. This works for text input elements only.", info : true
			},
			

			{type: "container", name: "label_html_editor", id : "label_html_editor", inputWidth: 600, inputHeight: 300, style :"clear:both; position:absolute; background:#ccc; left:0px; top:25px; z-index:500; display:none;"}

			
			
			,{type:"newcolumn", offset:20}
			
			
			
			,{type: "label", label: 'Validation rules:', list:[
			
				{
					type: "settings",
					position: "label-right",
					labelWidth: 90,
					inputWidth: 30,
					inputLeft : 10
				}
				,{type: "hidden", name: 'validate', value : "", label: 'Validation rules:'}
				,{type: "checkbox", name: 'NotEmpty', label: 'Not Empty', value : "NotEmpty", trigger : "validate"}
				,{type: "checkbox", name: 'ValidEmail', label: 'Valid Email', value : "ValidEmail", trigger : "validate"}
				,{type: "checkbox", name: 'ValidInteger', label: 'Valid Integer', value : "ValidInteger", trigger : "validate"}
				,{type: "checkbox", name: 'ValidFloat', label: 'Valid Float', value : "ValidFloat", trigger : "validate"}
				,{type: "checkbox", name: 'ValidNumeric', label: 'Valid Numeric', value : "ValidNumeric", trigger : "validate"}
				,{type: "checkbox", name: 'ValidAplhaNumeric', label: 'Valid AplhaNumeric', value : "ValidAplhaNumeric", trigger : "validate"}
				,{type:"newcolumn", offset:5}
				,{type: "checkbox", name: 'ValidDatetime', label: 'Valid Datetime', value : "ValidDatetime", trigger : "validate"}
				,{type: "checkbox", name: 'ValidDate', label: 'Valid Date', value : "ValidDate", trigger : "validate"}
				,{type: "checkbox", name: 'ValidTime', label: 'Valid Time', value : "ValidTime", trigger : "validate"}
				,{type: "checkbox", name: 'ValidCurrency', label: 'Valid Currency', value : "ValidCurrency", trigger : "validate"}
				,{type: "checkbox", name: 'ValidSSN', label: 'Valid SSN', value : "ValidSSN", trigger : "validate"}
				,{type: "checkbox", name: 'ValidExpirationdate', label: 'Valid Expiration date', value : "ValidExpirationdate", trigger : "validate"}
			]},
			
			
			
			
			
		]
    },
	
	"conf_toolbar_grid_field_propertie_options": {
        "icon_path": "",
        "items": [
			{
				id: "add",
				text: "add",
				"type": "button",
				"img": "add.gif",
                "img_disabled": "add_dis.gif",
				disabled : false
			},{
				id: "edit",
				text: "edit",
				"type": "button",
				"img": "edit.png",
                "img_disabled": "edit_dis.png",
				disabled : true
			}
			,{
				id: "delete",
				text: "delete",
				"type": "button",
				"img": "excluir.png",
                "img_disabled": "excluir_dis.png",
				disabled : true
			}
        ]
    },
	
	/*conf_grid_field_propertie_options : { 
		headers : "Option,Default Selected,Sequence"
		,ids : "optionname,asdefault,FieldOptionSeq"
		,widths : "180,110,90"
		,colaligns : "left,center,right"
		,coltypes : "ed,ch,ro"
		,colsorting : "str,str,int"
		,"bind_library_field": "false,false,false"
		,dateFormat : "%m-%d-%Y"
	},*/
	
	//option_id,field_id,
	
	//type,name,label,asdefault(checked for radio and checkbox - N and Y),caption,tooltip,text_size,required,use_library,library_field_id,className,mask_to_use,value,info,note,index(FieldOptionSeq)
	
	//
	
	//type,text(optionname),asdefault(N and Y),index(FieldOptionSeq)
	
	//type,name,label,value,text,asdefault,caption,tooltip,text_size,required,className,mask_to_use,index
	
	conf_grid_field_propertie_options : { 
		headers : "Type,type_standard,Field name,Display name,Default text,Option text,checked / selected,caption,tooltip,text_size,className,Mask,Order"
		,ids : "type,type_standard,name,label,value,text,asdefault,caption,tooltip,text_size,className,mask_to_use,index"
		,widths : "*"
		,colaligns : "left,left,left,left,left,left,center,left,left,left,left,left,right"
		,coltypes : "coro,ro,ro,ro,ro,ro,coro,ro,ro,ro,ro,ro,ro"
		,colsorting : "str,str,str,str,str,str,str,str,str,str,str,str,int"
		,dateFormat : "%m-%d-%Y"
		,"bind_library_field": "false,false,false,false,false,false,false,false,false,false,false,false"
	},
	
	"conf_form_tags": {
        "template": [
			{
				type: "settings",
				position: "label-right",
				labelWidth: 140,
				inputWidth: 140
			}
		]
    },
	
	"conf_tree_form_library_field_category" : {id:'0', item:[ {id:'manage',  text:"Select categories for listing", open : 1, select : 1, item:[ ]}]},
	
	conf_toolbar_tags : {
        "icon_path": "",
        "items": [
            {
                "type": "button",
                "id": "search",
                "text": "search fields",
                "img": "view.png",
                "img_disabled": "view_dis.png"
				//disabled : true
            }
        ]
    },
	
	conf_form_preview : {
        "template": [
			{
				type: "settings",
				position: "label-left",
				labelWidth: 140,
				inputWidth: 140,
				inputLeft : 10,
				index : -1
			}
			
			
		],
		"signature_controls": []
		,defaultRootProperties : {
				type: "settings",
				position: "label-left",
				labelWidth: 140,
				inputWidth: 140,
				inputLeft : 10,
				index : -1
		}
    },
	
	conf_form_grid_field_propertie_options_option : {
        "template": [
			{
				type: "settings",
				position: "label-left",
				labelWidth: 110,
				inputWidth: 130
			}
			,{type: "hidden", name: 'type', label: 'type'}
			,{type: "hidden", name: 'field_id', value : "-1"}
			,{type: "hidden", name: 'option_id', value : "-1"}
			,{
				type: "input",
				label: "Option text",
				name: "text",
				tooltip : "", required: true, validate: 'NotEmpty'
			},{
				type : "btn2state", 
				label : "default selected", 
				checked : false,
				name : "asdefault",
				info : true,
				tooltip : "Will this option be default selected?"
			}
		]
    },
	
	
	conf_form_grid_field_propertie_options_field : {
        "template": [
			{
				type: "settings",
				position: "label-left",
				labelWidth: 110,
				inputWidth: 130
			}
			,{type: "hidden", name: 'field_id', value : "-1"}
			,{type: "hidden", name: 'option_id', value : "-1"}
			
			,{type: "combo", name: 'type', label: 'Type:',  options:
			[
				  {text: "text (one row)", value: "T"}
				  ,{text: "date", value: "E"} 
				  ,{text: "empty placeholder", value: "e"} 
				  ,{text: "checkbox", value: "B"}
				   ,{text: "checkbox group", value: "q"}
				  //,{text: "nested group fields", value: "W"}
				  
				  ,{text: "checkbox nested fields", value: "Z"}
				 // ,{text: "multiple selections", value: "M"}
				  //,{text: "select", value: "S"}
				  ,{text: "radiobutton", value: "R"}
				   ,{text: "radio group", value: "r"}
				  //,{text: "radio matrix", value: "RG"}
				  ,{text: "text area", value: "A"}
				  //,{text: "drop-down menu", value: "D"}
				  ,{text: "text for display only", value: "L"}
				  ,{text: "file upload", value: "F"}
				  ,{text: "grey bar-section heading", value: "G"}
				  //,{text: "price", value: "I"}
				  //,{text: "payment options", value: "P"}
				  
				  
				], tooltip : "", required: true, validate: 'NotEmpty', trigger : "type_standard"
			}
			
			,{type: "hidden", name: 'type_standard', label: 'type_standard', required: true, validate: 'NotEmpty'}
			,{type: "hidden", name: 'text_size', label: 'text_size', value : "200"}

			
			
			,{type: "hidden", name: 'name', label: 'Input Name:', value : "", info : true, tooltip : "This field is automatically filled. Start on next field.", readonly : true, info : true}
			,{type: "input", name: 'label', label: 'Display Name:', value : "", info : true, tooltip : "Provide the name/label of the field for displaying on screen", required: true, validate: 'NotEmpty', info : true}
			,{type: "hidden", name: 'caption', label: 'Caption (legacy):', value : "", tooltip : ""}
			
			,{type: "input", name: 'tooltip', label: 'User Tips:', value : "", tooltip : "", rows : 3, tooltip : "This info text will be displayed bellow of this field.", info : true}
			
			,{type:"newcolumn", offset:20}
			,{type: "input", name: 'value', label: 'Default text:', value : "", tooltip : "Default text for this input. Works only for text input elements.", info : true}
			,{type: "hidden", name: 'text_size', label: 'Text size (*legacy):', value : "200",tooltip : "", required: true, validate: 'NotEmpty,ValidInteger', mask_to_use: "integer"}
			,{type: "combo", name: "mask_to_use", label: 'Mask:',  options:[{
					text: "none",
					value: ""},
					{text: "SSN", value: "SSN"}
				  ,{text: "time", value: "time"}
				  ,{text: "date", value: "date"}
				  ,{text: "credit card", value: "credit_card"}
				  ,{text: "cvv", value: "cvv"}
				  ,{text: "expiration date", value: "expiration_date"}
				  ,{text: "us phone", value: "us_phone"}
				  ,{text: "can phone", value: "can_phone"}
				  ,{text: "integer", value: "integer"}
				  ,{text: "currency", value: "currency"}
				  ,{text: "can currency", value: "can_currency"}
				], tooltip : "The mask effect will be applied when user types on the field. This works for text input elements only.", info : true
			}
			,{type: "input", name: 'className', label: 'Custom CSS:', value : "", tooltip : ""}
		
			
			

			
		]
    },
	
	conf_form_grid_field_propertie_options_radio_group : {
        "template": [
			{
				type: "settings",
				position: "label-left",
				labelWidth: 110,
				inputWidth: 130
			}
			,{type: "hidden", name: 'field_id', value : "-1"}
			,{type: "hidden", name: 'option_id', value : "-1"}
			
			,{type: "combo", name: 'type', label: 'Type:',  options:
			[
				   {text: "radiobutton", value: "R"}
				], tooltip : "", required: true, validate: 'NotEmpty', trigger : "type_standard"
			}
			
			,{type: "hidden", name: 'type_standard', label: 'type_standard', required: true, validate: 'NotEmpty'}
			,{type: "hidden", name: 'text_size', label: 'text_size', value : "200"}

			
			
			,{type: "hidden", name: 'name', label: 'Input Name:', value : "", info : true, tooltip : "This field is automatically filled. Start on next field.", readonly : true, info : true}
			,{type: "input", name: 'label', label: 'Display Name:', value : "", info : true, tooltip : "Provide the name/label of the field for displaying on screen", required: true, validate: 'NotEmpty', info : true}
			,{type: "hidden", name: 'caption', label: 'Caption (legacy):', value : "", tooltip : ""}
			
			,{type: "input", name: 'tooltip', label: 'User Tips:', value : "", tooltip : "", rows : 3, tooltip : "This info text will be displayed bellow of this field.", info : true}
			
			,{type:"newcolumn", offset:20}
			,{type: "input", name: 'value', label: 'Default text:', value : "", tooltip : "Default text for this input. Works only for text input elements.", info : true}
			,{type: "hidden", name: 'text_size', label: 'Text size (*legacy):', value : "200",tooltip : "", required: true, validate: 'NotEmpty,ValidInteger', mask_to_use: "integer"}
			,{type: "combo", name: "mask_to_use", label: 'Mask:',  options:[{
					text: "none",
					value: ""},
					{text: "SSN", value: "SSN"}
				  ,{text: "time", value: "time"}
				  ,{text: "date", value: "date"}
				  ,{text: "credit card", value: "credit_card"}
				  ,{text: "cvv", value: "cvv"}
				  ,{text: "expiration date", value: "expiration_date"}
				  ,{text: "us phone", value: "us_phone"}
				  ,{text: "can phone", value: "can_phone"}
				  ,{text: "integer", value: "integer"}
				  ,{text: "currency", value: "currency"}
				  ,{text: "can currency", value: "can_currency"}
				], tooltip : "The mask effect will be applied when user types on the field. This works for text input elements only.", info : true
			}
			,{type: "input", name: 'className', label: 'Custom CSS:', value : "", tooltip : ""}
		
			
			

			
		]
    },
	
	conf_form_grid_field_propertie_options_checkbox_group : {
        "template": [
			{
				type: "settings",
				position: "label-left",
				labelWidth: 110,
				inputWidth: 130
			}
			,{type: "hidden", name: 'field_id', value : "-1"}
			,{type: "hidden", name: 'option_id', value : "-1"}
			
			,{type: "combo", name: 'type', label: 'Type:',  options:
			[
				{text: "checkbox", value: "B"}
				], tooltip : "", required: true, validate: 'NotEmpty', trigger : "type_standard"
			}
			
			,{type: "hidden", name: 'type_standard', label: 'type_standard', required: true, validate: 'NotEmpty'}
			,{type: "hidden", name: 'text_size', label: 'text_size', value : "200"}

			
			
			,{type: "hidden", name: 'name', label: 'Input Name:', value : "", info : true, tooltip : "This field is automatically filled. Start on next field.", readonly : true, info : true}
			,{type: "input", name: 'label', label: 'Display Name:', value : "", info : true, tooltip : "Provide the name/label of the field for displaying on screen", required: true, validate: 'NotEmpty', info : true}
			,{type: "hidden", name: 'caption', label: 'Caption (legacy):', value : "", tooltip : ""}
			
			,{type: "input", name: 'tooltip', label: 'User Tips:', value : "", tooltip : "", rows : 3, tooltip : "This info text will be displayed bellow of this field.", info : true}
			
			,{type:"newcolumn", offset:20}
			,{type: "input", name: 'value', label: 'Default text:', value : "", tooltip : "Default text for this input. Works only for text input elements.", info : true}
			,{type: "hidden", name: 'text_size', label: 'Text size (*legacy):', value : "200",tooltip : "", required: true, validate: 'NotEmpty,ValidInteger', mask_to_use: "integer"}
			,{type: "combo", name: "mask_to_use", label: 'Mask:',  options:[{
					text: "none",
					value: ""},
					{text: "SSN", value: "SSN"}
				  ,{text: "time", value: "time"}
				  ,{text: "date", value: "date"}
				  ,{text: "credit card", value: "credit_card"}
				  ,{text: "cvv", value: "cvv"}
				  ,{text: "expiration date", value: "expiration_date"}
				  ,{text: "us phone", value: "us_phone"}
				  ,{text: "can phone", value: "can_phone"}
				  ,{text: "integer", value: "integer"}
				  ,{text: "currency", value: "currency"}
				  ,{text: "can currency", value: "can_currency"}
				], tooltip : "The mask effect will be applied when user types on the field. This works for text input elements only.", info : true
			}
			,{type: "input", name: 'className', label: 'Custom CSS:', value : "", tooltip : ""}
		
			
			

			
		]
    },
	
	"conf_form_form_pages": {
        "template": [
			{
				type: "settings",
				position: "label-left",
				labelWidth: 140,
				inputWidth: 140,
				inputLeft : 10
			}

			,{type: "input", name: 'pagename', label: 'Page name:', value : "", tooltip : "Provide the page name.", info : "Provide the page name.", required: true, validate: 'NotEmpty'}
			,{type: "combo", name: 'page_layout', label: 'Layout type:',  options:
			[
				{
					text: "select one",
					value: ""
				}
				,{value: "D", text: "double"}
				,{value: "S", text: "single"}
			], tooltip : "Select the layout type.", info : "Select the layout type.", required: true, validate: 'NotEmpty'}
			,{type: "input", name: 'tab_width', label: 'Tab width:', value : "100", tooltip : "Provide the tab width on form.", info : "Provide the tab width on form.", mask_to_use : "integer", required: true, validate: 'NotEmpty'}
		]
    },
	
	"conf_toolbar_form_preview": {
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
                "id": "print_form",
                "text": "print form",
                "img": "print.png",
                "img_disabled": "print_dis.png"
				,disabled : false
            }
        ]
    },
    conf_window_entries: {
        title: "View Entries",
        viewport: "body",
        left: 20,
        top: 5,
        width: 800,
        height: 500,
        enableAutoViewport: true,
        "icon": "form.png",
        "icon_dis": "form.png",
		"image_path": ""
    },
    conf_window_entries_tabbar: {
		image_path: '',
		skin: "dhx_skyblue"
    },
    conf_window_entries_toolbar: {
        icon_path: "",
        items: [
            {
                type: "button",
                id: "edit_entries",
                text: "Edit Entries",
                img: "edit.png",
                img_disabled: "edit_dis.png",
		disabled: true
            },
            {
                type: "button",
                id: "delete_entries",
                text: "Delete Entries",
                img: "delete.png",
                img_disabled: "delete_dis.png",
		disabled: true
            }
        ]
    },
    conf_window_entries_grid: {
        headers: "ID,connId,connectionID,User",
        ids: "id,connid,connectionid,user",
        widths: "90,90,90,480",
        colaligns: "right,left,left,left",
        coltypes: "ro,ro,ro,ro",
        colsorting: "int,str,str,str",
        bind_library_field: "false,false,false,false"
    },
    conf_window_edit_entries: {
        title_saved: "Edit Entries",
        viewport: "body",
        left: 20,
        top: 20,
        width: 800,
        height: 500,
        enableAutoViewport: true,
    },
    conf_window_edit_entries_toolbar: {
        icon_path: "icons/32px/",
        items: [
            {
                type: "button",
                id: "save_form",
                text: "Save Form",
                img: "save.png",
                img_disabled: "save_dis.png",
		disabled: true
            }
        ]
    },
    conf_window_edit_entries_form : {
	"template": [
	    {
		type: "settings",
		position: "label-left",
		labelWidth: 140,
		inputWidth: 140,
		inputLeft : 10,
		index : -1
	    }
	],
	"signature_controls": [
	
	],
	defaultRootProperties : {
	    type: "settings",
	    position: "label-left",
	    labelWidth: 140,
	    inputWidth: 140,
	    inputLeft : 10,
	    index : -1
	}
    },
};
FormBuilder.init(FormBuilder_Model);