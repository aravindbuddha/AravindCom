var phonecomponent_Model = {
    "text_labels": {
        "main_window_title": "Phone"
    },
    "globalSkin": "dhx_skyblue",
    "conf_window": {
        "image_path": "",
        "viewport": "body",
        "left": 60,
        "top": 40,
        "width": 775,
        "height": 550,
        "model_edit_winHeight": 500,
        "model_edit_winWidth": 250,
        "enableAutoViewport": true,
        "icon": "phone.png",
        "icon_dis": "phone.png"
    },
    "conf_grid": {
        "headers": "Phone Type,Phone Number,Extension,Primary",
        "ids": "type,nummber,Extension,primary",
        "widths": "200,200,155,200",
        "widths_layout": "150,150,150,150",
        "colaligns": "left,left,left,left",
        "coltypes": "ro,ro,ro,ro",
        "colsorting": "int,int,int,int",
        "bind_library_field": "false"
    },
    "conf_toolbar": {
        "icon_path": "",
        "items": [{
            "type": "button",
            "id": "add_phone",
            "text": "Add Phone",
            "img": "mobile-phone-add.png",
            "img_disabled": "mobile-phone-add.png"
        }, {
            "type": "button",
            "id": "edit_phone",
            "text": "Edit Phone",
            "img": "edit.png",
            "img_disabled": "edit.png"
        }, {
            "type": "button",
            "id": "delete_phone",
            "text": "Delete Phone",
            "img": "mobile-phone-delete.png",
            "img_disabled": "mobile-phone-delete.png"
        }, {
            "type": "button",
            "id": "help_phone",
            "text": "Help",
            "img": "Help.png",
            "img_disabled": "Help.png"
        }, {
            "type": "button",
            "id": "close_phone",
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
            width: 480,
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
                name: "phone_ID",
                value: 0

            }, {
                type: "hidden",
                name: "contact_ID",
                value: ""

            }, {
                type: "combo",
                name: "phoneType",
                label: "Phone Type",
                width: 200,
                required: true,
                labelWidth: "89",
                labelHeight: "21",
                inputWidth: "120",
                inputHeight: "21",
                labelLeft: "0",
                labelTop: "15",
                inputLeft: "130",
                inputTop: "15",
                position: "absolute",
                options: [],
                validate: "NotEmpty"
            }, {
                type: "input",
                name: "phoneNum",
                required: true,
                label: "Phone Number",
                value: "",
                validate: "NotEmpty, ValidInteger",
                width: 200,
                labelWidth: "120",
                labelHeight: "21",
                inputWidth: "120",
                inputHeight: "21",
                labelLeft: "0",
                labelTop: "65",
                inputLeft: "130",
                inputTop: "65",
                position: "absolute"
            }, {
                type: "input",
                name: "phoneNumexten",
                label: "Extension",
                value: "",
                validate: "NotEmpty, ValidInteger",
                width: 100,
                labelWidth: "90",
                labelHeight: "21",
                inputWidth: "120",
                inputHeight: "21",
                labelLeft: "341",
                labelTop: "44",
                inputLeft: "340",
                inputTop: "65",
                position: "absolute"
            },  {
                type: "label",
                name: "error_msg_phoneNum",
                className: "errMsg",
                width: 160,
                labelWidth: "200",
                labelHeight: "21",
                inputWidth: "200",
                inputHeight: "21",
                labelLeft: "125",
                labelTop: "90",
                inputLeft: "15",
                inputTop: "165",
                position: "absolute"
            },/* {
                type: "combo",
                name: "PrimaryPhoneNum",
                label: "PrimaryPhoneNum",
                width: 200,
                labelWidth: "80",
                labelHeight: "21",
                inputWidth: "120",
                inputHeight: "21",
                labelLeft: "0",
                labelTop: "119",
                inputLeft: "130",
                inputTop: "115",
                position: "absolute",
                options: [ {
                            text: "Yes",
                            value: 1
                        }, {
                            text: "No",
                            value: 0,
                            
                        }],
                validate: "NotEmpty"
            },*/
            {
                type: "label",
                list: [{
                    type: "label",
                    name: "form_label_1",
                    label: "<span style=' font:inherit;color:black;font-weight:normal;width:200;position:absolute;left: -19px;top:100px;' >Primary Phone</span>",
                    className: "customCss gender_style"
                }, {
                    type: "newcolumn",
                    //offset : 50
                }, {
                    type: "radio",
                    name: "PrimaryPhoneNum",
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
                    name: "PrimaryPhoneNum",
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