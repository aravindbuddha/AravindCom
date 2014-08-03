MyCom.model = MyCom.model || (function() {
    var _icon_path = "",
        _img_path = "";

    return {
        init: function(icon_path, img_path) {
            _icon_path = icon_path;
            _img_path = img_path;
            MyCom.model = this;
        },
        "text_labels": {
            "main_window_title": "Address"
        },
        "globalSkin": "dhx_skyblue",
        "conf_window": {
            "image_path": _img_path,
            "viewport": "body",
            "left": 400,
            "top": 190,
            "width": 1000,
            "height": 550,
            "model_edit_winHeight": 730,
            "model_edit_winWidth": 340,
            "enableAutoViewport": true,
            "icon": "address_book-16.png",
            "icon_dis": "address_book-16.png"
        },
        "conf_grid": {
            "headers": "Type,Address 1,Address 2,City,State,Zip,County,Country,Province,Mailing Address,Start Date,Leave Date",
            "ids": "type,add1,add2,city,state,zip,county,country,province,mailing,start_date,end_date",
            "widths": "70,100,100,80,85,65,80,90,90,60,60,60",
            "widths_layout": "70,100,100,80,85,65,80,90,90,*,60,60",
            "colaligns": "left,left,left,left,left,left,left,left,left,left,left,left",
            "coltypes": "ed,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed",
            "colsorting": "str,str,str,str,str,str,str,str,str,str,date,date",
            "bind_library_field": "false,false,false,false,false,false,false,false,false,false,false,false",
            'visibility': 'false,false,true,false,false,false,true,false,true,false,true,true'
        },
        "conf_toolbar": {
            "icon_path": _icon_path,
            "items": [{
                "type": "button",
                "id": "add_address",
                "text": "Add Address",
                "img": "address-book-add.png",
                "img_disabled": "address-book-add.png"
            }, {
                "type": "button",
                "id": "edit_address",
                "text": "Edit Address",
                "img": "edit.png",
                "img_disabled": "edit.png"
            }, {
                "type": "button",
                "id": "delete_address",
                "text": "Delete Address",
                "img": "recycle_full-16.png",
                "img_disabled": "recycle_full-16.png"
            }, {
                "type": "button",
                "id": "help_address",
                "text": "Help",
                "img": "Help.png",
                "img_disabled": "Help.png"
            }, {
                "type": "button",
                "id": "close_address",
                "text": "Close",
                "img": "cancel.png",
                "img_disabled": "cancel.png"
            }]
        },
        "edit_toolbar": {
            "icon_path": _icon_path,
            "items": [{
                "type": "button",
                "id": "save_address",
                "text": "Save",
                "img": "save.gif",
                "img_disabled": "save.gif"
            }, {
                "type": "button",
                "id": "import_address",
                "text": "Import address",
                "img": "import-icon.png",
                "img_disabled": "import-icon.png"
            }, {
                "type": "button",
                "id": "help_address",
                "text": "Help",
                "img": "Help.png",
                "img_disabled": "Help.png"
            }, {
                "type": "button",
                "id": "close_editaddress",
                "text": "Close",
                "img": "cancel.png",
                "img_disabled": "cancel.png"
            }]
        },
        "conf_layout": {
            "pattern": "1C"
        },

    }
}());