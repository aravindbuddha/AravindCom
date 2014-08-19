var emailcomponent_Model = {
    "text_labels": {
        "main_window_title": "Email"
    },
    "globalSkin": "dhx_skyblue",
    "conf_window": {
        "image_path": "",
        "viewport": "body",
        "left": 60,
        "top": 40,
        "width": 775,
        "height": 550,
        "model_edit_winHeight": 410,
        "model_edit_winWidth": 250,
        "enableAutoViewport": true,
        "icon": "Mail.png",
        "icon_dis": "Mail.png"
    },
    "conf_grid": {
        "headers": "Contact Email,Primary,Email Type",
        "ids": "email,primary,type",
        "widths": "255,250,250",
        "widths_layout": "200,200,200",
        "colaligns": "left,left,left",
        "coltypes": "ro,ro,ro",
        "colsorting": "int,int,int",
        "bind_library_field": "false,false"
    },
    "conf_toolbar": {
        "icon_path": "",
        "items": [{
            "type": "button",
            "id": "add_email",
            "text": "Add Email",
            "img": "Email-add.png",
            "img_disabled": "Email-add.png"
        }, {
            "type": "button",
            "id": "edit_email",
            "text": "Edit Email",
            "img": "edit.png",
            "img_disabled": "edit.png"
        },  {
            "type": "button",
            "id": "delete_email",
            "text": "Delete Email",
            "img": "recycle_full-16.png",
            "img_disabled": "recycle_full-16.png"
        }, {
            "type": "button",
            "id": "help_email",
            "text": "Help",
            "img": "Help.png",
            "img_disabled": "Help.png"
        }, {
            "type": "button",
            "id": "close_email",
            "text": "Close",
            "img": "cancel.png",
            "img_disabled": "cancel.png"
        }]
    },
    "edit_toolbar": {
        "icon_path": "",
        "items": [{
            "type": "button",
            "id": "save_phone",
            "text": "Save",
            "img": "save.gif",
            "img_disabled": "save.gif"
        }, {
            "type": "button",
            "id": "close_editphone",
            "text": "Close",
            "img": "cancel.png",
            "img_disabled": "cancel.png"
        }]
    },
    "conf_layout": {
        "pattern": "1C"
    },
    "conf_form": {
        "template": [{
            type: "block",
            width: 260,
            offsetLeft: 0,
            inputWidth: "auto",
            tab_width: "100px",
            //id: "tab_family_detail",
            label: "Phone detail",
            list: [{
                type: "hidden",
                name: "section_name",
                value: "phone"

            }, {
                type: "hidden",
                name: "email_ID",
                value: 0

            }, {
                type: "hidden",
                name: "contact_ID_email",
                value: ""

            }, {
                type: "combo",
                name: "emailType1",
                label: "Email Type",
                width: 200,
				required: true,
                labelWidth: "80",
                labelHeight: "21",
                inputWidth: "120",
                inputHeight: "21",
                labelLeft: "10",
                labelTop: "15",
                inputLeft: "130",
                inputTop: "15",
                position: "absolute",
                options: [],
                validate: "NotEmpty"
            }, {
                type: "input",
                name: "email",
                label: "Email",
                value: "",
                validate: "NotEmpty,ValidEmail",
                width: 200,
                labelWidth: "85",
                labelHeight: "21",
                inputWidth: "120",
                inputHeight: "21",
                labelLeft: "10",
                labelTop: "65",
                inputLeft: "130",
                inputTop: "65",
				required: true,
                position: "absolute"
            },/* {
                type: "combo",
                name: "primaryEmail",
                label: "PrimaryEmail",
                width: 200,
                labelWidth: "80",
                labelHeight: "21",
                inputWidth: "120",
                inputHeight: "21",
                labelLeft: "15",
                labelTop: "121",
                inputLeft: "130",
                inputTop: "115",
				position: "absolute",
                options: [ {
                            text: "Yes",
                            value: 1
                        }, {
                            text: "No",
                            value: 0
							
                        }],
                validate: "NotEmpty"
            }*/
            {
                type: "label",
                list: [{
                    type: "label",
                    name: "form_label_1",
                    label: "<span style=' font:inherit;color:black;font-weight:normal;width:200;position:absolute;left: -10px;top:100px;' >Primary Email</span>",
                    className: "customCss gender_style"
                }, {
                    type: "newcolumn",
                    //offset : 50
                }, {
                    type: "radio",
                    name: "primaryEmail",
                    label: "Yes",
                    width: 100,
                    value: 1,
                    checked: "",
                    labelWidth: 50,
                    className: "radio_img",
                    position: "absolute",
                    inputLeft: "100",
                    inputTop: "97",
                    labelLeft: "120",
                    labelTop: "99",
                    checked: true
                }, {
                    type: "newcolumn",
                    offset : 30
                }, {
                    type: "radio",
                    name: "primaryEmail",
                    label: "No",
                    width: 100,
                    value: 0,
                    checked: "",
                    className: "radio_img",
                     position: "absolute",
                   inputLeft: "130",
                    inputTop: "97",
                    labelLeft: "150",
                    labelTop: "99"
                }]
            }]
        }]
    }
};