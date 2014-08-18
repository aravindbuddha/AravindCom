//Model for add contact
var Model_MAPRelationshipComponentModel = {
    model_globalImgPath: "../../auxiliary/dhtmlxfull3.5/imgs/dhtmlxtoolbar_imgs/"
    , model_globalSkin: "dhx_skyblue"
    , model_conf_window: "Actions-view-pim-contacts-icon.png"
    , model_winHeight: 682
    , model_winWidth: 580
    , model_winTop: 40
    , model_edit_winTop: 258
    , model_help_winTop: 308
    , model_edit_winHeight: 800
    , model_edit_winWidth: 330
    , model_conf_Toolbar_addcontact:
    {
        items: {toolbar: [
                {item: {id: "PersonalRelationships_new", type: "button", img: "new48.png", imgdis: "new48.png", text: "New"}}
				, {item: {id: "PersonalRelationships_edit", type: "button", img: "edit.png", imgdis: "edit.png", text: "Edit"}}
                , {item: {id: "PersonalRelationships_casenotes", type: "button", img: "case_note_icon.gif", imgdis: "case_note_icon.gif", text: "Case Notes"}}
                , {item: {id: "PersonalRelationships_fastfact", type: "button", img: "fastfacts.png", imgdis: "fastfacts.png", text: "Fast Fact"}}
                , {item: {id: "PersonalRelationships_airstasklist", type: "button", img: "airs_task_list_icon.gif", imgdis: "airs_task_list_icon.gif", text: "Client's Details "}}
                , {item: {id: "PersonalRelationships_delete", type: "button", img: "delete_icons.gif", imgdis: "delete_icons.gif", text: "Delete"}}
                , {item: {id: "PersonalRelationships_help", type: "button", img: "help.png", imgdis: "help.png", text: "Help"}}
                , {item: {id: "PersonalRelationships_close", type: "button", img: "cancel.png", imgdis: "closewindow.png", text: "Close"}}
            ]
        }
    }
    , model_conf_Toolbar_editcontact:
            {
                items: {toolbar: [
                        {item: {id: "edit_new", type: "button", img: "save.gif", imgdis: "save.gif", text: "Save"}}
                        , {item: {id: "edit_help", type: "button", img: "help.png", imgdis: "help.png", text: "Help"}}
                        , {item: {id: "edit_close", type: "button", img: "cancel.png", imgdis: "closewindow.png", text: "Close"}}
                    ]
                }
            }
    , model_Layout: {
        skin: '1C'
    }
    , Form: {
        template: [
            {
                type: "block", width: 650, offsetLeft: 0,
                inputWidth: "auto",
                tab_width: "auto",
                //id: "tab_family_detail",
                label: "Family detail",
                list: [
                    {type: "settings", position: "label-left"},
                    {type: "input", name: "contact_name",required: true, label: "Contact", position: "absolute", inputWidth: "200", labelLeft: "0", labelTop: "10", inputLeft: "140", inputTop: "11"},
                    {type: "label", name: "processingWheel1", label: '<img alt="Processing wheel" id="processingWheel1"  src="../../images/bigrotation.gif" width="20px"; height="20px" />', labelWidth: "16", labelHeight: "16", labelLeft: "315", labelTop: "6", position: "absolute", hidden: false},
                    {type: "label", name: "p1plusicon", label: '<img alt="Add Contact" id="plusicon" src="../../auxiliary/dhtmlxfull3.5/icons/add.png" onclick="MAPRelationshipComponent.opencontact();  "/>', labelWidth: "20", labelHeight: "20", labelLeft: "344", labelTop: "8", position: "absolute", hidden: false},
                    {type: "combo", name: "primaryRelationship", required: true,label: "Primary&nbsp;Relationship", inputWidth: "200", labelLeft: "0", labelTop: "54", inputLeft: "140", inputTop: "51", position: "absolute"},
                    {type: "combo", name: "relationTypeId1", required: true, label: "Relation&nbsp;Type",  labelWidth: "200",inputWidth: "200", labelLeft: "0", labelTop: "104", inputLeft: "140", inputTop: "101", position: "absolute"},{
                            type: "combo",
                            name: "defaultrelation",
                            label: "Default Relationship",
                            labelWidth: "125",
                            labelHeight: "25",
                            inputWidth: "100",
                            height: 75,
                            inputHeight: "21",
                            labelLeft: "360",
                            labelTop: "53",
                            inputLeft: "480",
                            inputTop: "51",
                            position: "absolute",
                            options: [{
                                value: "1",
                                text: "Yes"
                            }, {
                                value: "0",
                                text: "No"
                            }]
                        },
                    {type: "calendar", name: "startdate_1", label: "Start&nbsp;Date&nbsp;(mm-dd-yyyy)", labelWidth: "200", dateFormat: "%m-%d-%Y", enableTime: false, value: "", options: {}, labelLeft: "0", labelTop: "140", inputLeft: "0", inputTop: "161", position: "absolute", inputWidth: "150", readonly: 1},
                    {type: "calendar", name: "enddate_1", label: "End&nbsp;Date&nbsp;(mm-dd-yyyy)", labelWidth: "200", dateFormat: "%m-%d-%Y", options: {
                        }, labelLeft: "200", labelTop: "140", inputLeft: "200", inputTop: "161", position: "absolute", inputWidth: "150", readonly: 1},
                    {type: "input", hidden: true, name: "connectionId", value: ""},
                    {type: "input", hidden: true, name: "relConnId", value: ""},
                    {type: "input", hidden: true, name: "relAction", value: 'inserted'},
                    {type: "input", hidden: true, name: "relConnectionId1", value: ""},
                    {type: "input", hidden: true, name: "hRelationTypeId1", value: ''},
					{type: "input", hidden: true, name: "contacttype", value: '1'},
                    {type: "input", hidden: true, name: "combo1value", value: ''}
                ]
            }
        ]
    }
};