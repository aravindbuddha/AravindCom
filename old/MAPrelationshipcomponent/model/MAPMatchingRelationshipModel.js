//Model for add contact
var Model_MAPRelationshipComponentModel = {
     model_globalImgPath: ""
    , model_globalSkin: "dhx_skyblue"
    , model_conf_window: "contact_add_info.png"
    , model_winHeight: 682
    , model_winWidth: 560
    , model_winTop: 40
    , model_edit_winTop: 258
    , model_help_winTop: 308
    , model_edit_winHeight: 800
    , model_edit_winWidth: 330
    , model_rel_win_width: 505
    , model_rel_win_height: 285
    , model_conf_Toolbar_addcontact:
    {
        items: {toolbar: [
                {item: {id: "PersonalRelationships_new", type: "button", img: "add1.png", imgdis: "add1.png", text: "Add Contact"}}
		, {item: {id: "PersonalRelationships_edit", type: "button", img: "edit4.png", imgdis: "edit4.png", text: "Edit Contact"}}
                , {item: {id: "PersonalRelationships_update_add_info", type: "button", img: "update.png", imgdis: "update.png", text: "Update Additional Information"}}
                , {item: {id: "PersonalRelationships_delete", type: "button", img: "delete6.png", imgdis: "delete6.png", text: "Delete"}}
            ]
        }
    }

            
      , model_conf_toolbar_relinfo:
            {
                items: {toolbar: [
                        {item: {id: "relinfo_save", type: "button", img: "save.png", imgdis: "save.png", text: "Save"}}
                        ,{item: {id: "relinfo_close", type: "button", img: "close.png", imgdis: "close.png", text: "Close"}}
                    ]
                }
            }
    , model_Layout: {
        skin: '1C'
    }
       
    ,additional_info_form: {
    template: [
           { type:"block" , name:"form_block", list:[
            { type:"fieldset" , name:"form_fieldset", label:"Additional Information",inputWidth:"auto" , list:[
                { type:"hidden", name: "rel_contactid",value:""},
                { type:"hidden", name: "data_type",value:"rel_add_info"}, 
                { type:"hidden", name: "ethnicity_rec_id",value:"0"},
                { type:"hidden", name: "extra_info_rec_id",value:"0"},
                { type:"select" , name:"rel_type_of_child", label:"Type of Child",labelWidth: 130 , inputWidth: 250, options:[
                { value:"", text:"--Select option--" },
                { value:"Bio", text:"Bio" },
                { value:"Adopt", text:"Adopt" }
                ]},
                { type:"multiselect" , name:"rel_ethnicities", label:"Ethnicities", labelWidth: 130 , inputWidth: 250,inputHeight: 120  }                
            ]}
        ]}
    ]}
   
, //Chilst List
      conf_grid: {
        headers: "Name,DOB,Gender,Ethnicities,Bio-Adopt,RelConnId,RelConnectionId",
        ids: "Name,DOB,Gender,Ethnicity,TypeOfchild,ContactId,ConnectionId",
        widths: "170,115,115,140,110,*,0",
        filters: "#connector_text_filter,#connector_text_filter,#connector_text_filter,#connector_text_filter,#connector_text_filter,&nbsp;,&nbsp;",
        filters_disabled: "&nbsp;,&nbsp;,&nbsp;,&nbsp;,&nbsp;,&nbsp;,&nbsp;",
        colaligns: "center,center,center,center,left,center,center",
        coltypes: "ro,ro,ro,ro,ro,ro,ro",
        colsorting: "server,server,server,server,server,na,na"
    }
};