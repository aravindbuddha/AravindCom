Address.Model = Address.Model || (function() {
  var
    _icon_path = "",
    _img_path = "";

  return {
    init: function(img_path, icon_path) {
      _icon_path = icon_path;
      _img_path = img_path;
      this.conf_window.image_path = _icon_path;
      this.conf_toolbar.icon_path = _icon_path;
      this.edit_toolbar.icon_path = _icon_path;
      this.import_toolbar.icon_path = _icon_path;
      return this;
    },
    "text_labels": {
      "main_window_title": "Address"
    },
    "defaults": {
      "window": {
        "top": 400,
        "left": 190,
        "width": 1000,
        "height": 550,
        "title": "Address",
        "layout_pattern": "1C",
        "icon": "address_book-16.png",
        "icon_dis": "address_book-16.png",
      },
      "layout": {
        "pattern": "1C"
      }
    },
    "globalSkin": "dhx_skyblue",
    "conf_window": {
      "image_path": _icon_path,
      "viewport": "body",
      "left": 400,
      "top": 190,
      "width": 1000,
      "height": 550,
      "model_edit_winHeight": 730,
      "model_edit_winWidth": 340,
      "enableAutoViewport": true,
      "icon": "address_book-16.png",
      "icon_dis": "address_book-16.png",
    },
    "new_window": {
      "width": 730,
      "height": 340,
      "title": "New Address"
    },
    "edit_window": {
      "width": 730,
      "height": 340,
      "title": "Edit Address"
    },
    "import_window": {
      "width": 730,
      "height": 340,
      "title": "Import Address"
    },
    "conf_grid": {
      "headers": "address_id,AddressTypeID,Type,Address1,Address2,City,StateId,Sate,zip,CountyId,County,CountryId,Country,AddressProvinceID,Provence,MailingAddress,Start Date,End Date",
      "ids": "address_id,address_type_id,address_type,address_1,address_2,city,state_id,sate_text,zip,county_id,county_text,country_id,country_text,province_id,provence_text,is_mailing_address,start_date,leave_date",
      "widths": "0,0,195,290,0,140,0,80,78,0,90,60,0,0,70,90,60,60",
      "widths_layout": "0,0,70,200,150,80,0,80,70,0,90,60,0,0,70,100,60,60",
      "colaligns": "left,left,left,left,left,left,left,left,left,left,left,left,left,left,left,center,left,left",
      "coltypes": "ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro",
      "colsorting": "str,str,str,str,str,str,str,str,str,str,str,str,str,str,str,str,date,date",
      'visibility': 'true,true,false,false,true,false,true,false,false,true,false,true,false,true,true,false,true,true'
    },

     "import_grid": {
      "headers": "#master_checkbox,address_id,AddressTypeID,Type,Address1,Address2,City,StateId,Sate,zip,CountyId,County,CountryId,Country,AddressProvinceID,Provence,MailingAddress,Start Date,End Date",
      "ids": "select,address_id,address_type_id,address_type,address_1,address_2,city,state_id,sate_text,zip,county_id,county_text,country_id,country_text,province_id,provence_text,is_mailing_address,start_date,leave_date",
      "widths": "43,0,0,70,188,150,80,0,80,70,0,90,60,0,0,70,90,60,60",
      "colaligns": "center,left,left,left,left,left,left,left,left,left,center,left,left",
      "coltypes": "ch,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed,ed",
      "colsorting": "str,str,str,str,str,str,str,str,str,str,str,str,str,str,str,str,date,date",
      "bind_library_field": "false,false,false,false,false,false,false,false,false,false,false,false",
      'visibility': 'false,true,true,false,false,true,false,true,false,false,true,false,true,false,true,true,false,true,true'
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
        }
        // , {
        //   "type": "button",
        //   "id": "help_address",
        //   "text": "Help",
        //   "img": "Help.png",
        //   "img_disabled": "Help.png"
        // }, {
        //   "type": "button",
        //   "id": "close_address",
        //   "text": "Close",
        //   "img": "cancel.png",
        //   "img_disabled": "cancel.png"
        // }
      ]
    },
    "edit_toolbar": {
      "icon_path": "",
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
        }
        // , 
        // 
        // {
        //   "type": "button",
        //   "id": "help_address",
        //   "text": "Help",
        //   "img": "Help.png",
        //   "img_disabled": "Help.png"
        // }, {
        //   "type": "button",
        //   "id": "close_editaddress",
        //   "text": "Close",
        //   "img": "cancel.png",
        //   "img_disabled": "cancel.png"
        // }

      ]
    },
    "import_toolbar": {
      "icon_path": "",
      "items": [{
          "type": "button",
          "id": "import_address",
          "text": "Import",
          "img": "save.gif",
          "img_disabled": "save.gif"
        }
        // , {
        //   "type": "button",
        //   "id": "import_address",
        //   "text": "Import address",
        //   "img": "import-icon.png",
        //   "img_disabled": "import-icon.png"
        // }
        // , 
        // 
        // {
        //   "type": "button",
        //   "id": "help_address",
        //   "text": "Help",
        //   "img": "Help.png",
        //   "img_disabled": "Help.png"
        // }, {
        //   "type": "button",
        //   "id": "close_editaddress",
        //   "text": "Close",
        //   "img": "cancel.png",
        //   "img_disabled": "cancel.png"
        // }

      ]
    },
    "conf_layout": {
      "pattern": "1C"
    },
    "calendarImage": {
      "url": "url(../modules/MAPaddresscomponent/icons/calendar.gif)",
      "position": "center right",
      "repeat": "no-repeat"
    },
    "conf_form": {
      "template": [{
        type: "block",
        width: 640,
        offsetLeft: 0,
        inputWidth: "auto",
        tab_width: "100px",
        //id: "tab_family_detail",
        label: "Phone detail",
        list: [{
          type: "hidden",
          name: "address_type_id",
          value: 0

        }, {
          type: "hidden",
          name: "contact_id",
          value: ""

        }, {
          type: "hidden",
          name: "address_id",
          value: ""

        }, {
          type: "combo",
          name: "address_type",
          label: "Type",
          required: true,
          validate: "NotEmpty",
          width: 210,
          labelWidth: "80",
          labelHeight: "21",
          inputWidth: "95",
          inputHeight: "21",
          labelLeft: "15",
          labelTop: "15",
          inputLeft: "95",
          inputTop: "15",
          readonly: true,
          position: "absolute",
          options: [{
              text: "Pick Address Type",
              value: ""
            }


          ]
        }, {
          type: "combo",
          name: "is_mailing_address",
          label: "Mailing Address",
          width: 210,
          labelWidth: "150",
          labelHeight: "21",
          inputWidth: "95",
          inputHeight: "21",
          labelLeft: "335",
          labelTop: "15",
          inputLeft: "440",
          inputTop: "15",
          readonly: true,
          position: "absolute",
          options: [{
            text: "Yes",
            value: 1
          }, {
            text: "No",
            value: 0

          }],
          validate: "NotEmpty"
        }, {
          type: "input",
          name: "address_1",
          label: "Address 1",
          value: "",
          width: 555,
          labelWidth: "80",
          labelHeight: "21",
          inputWidth: "95",
          inputHeight: "21",
          labelLeft: "15",
          labelTop: "45",
          inputLeft: "95",
          inputTop: "45",
          position: "absolute"
        }, {
          type: "input",
          name: "address_2",
          label: "Address 2",
          value: "",
          width: 555,
          labelWidth: "80",
          labelHeight: "21",
          inputWidth: "95",
          inputHeight: "21",
          labelLeft: "15",
          labelTop: "75",
          inputLeft: "95",
          inputTop: "75",
          position: "absolute"
        }, {
          type: "input",
          name: "city",
          label: "City",
          value: "",
          width: 210,
          labelWidth: "80",
          labelHeight: "21",
          inputWidth: "95",
          inputHeight: "21",
          labelLeft: "15",
          labelTop: "105",
          inputLeft: "95",
          inputTop: "105",
          position: "absolute"
        }, {
          type: "combo",
          name: "state_text",
          label: "State/Zip",
          //    required: true,
          validate: "NotEmpty",
          className: "myTest",
          width: 150,
          labelWidth: "80",
          labelHeight: "21",
          inputWidth: "20",
          inputHeight: "21",
          labelLeft: "15",
          labelTop: "135",
          inputLeft: "95",
          inputTop: "135",
          readonly: true,
          position: "absolute",
          options: [{
            text: "Pick a State",
            value: ""
          }]
        }, {
          type: "input",
          name: "zip",
          value: "",
          validate: "ValidInteger",
          width: 50,
          labelWidth: "80",
          labelHeight: "21",
          inputWidth: "-30",
          inputHeight: "21",
          labelLeft: "185",
          labelTop: "135",
          inputLeft: "255",
          inputTop: "135",
          position: "absolute"
        }, {
          type: "combo",
          name: "county_text",
          label: "County",
          width: 210,
          labelWidth: "80",
          labelHeight: "21",
          inputWidth: "95",
          inputHeight: "21",
          labelLeft: "15",
          labelTop: "165",
          inputLeft: "95",
          inputTop: "165",
          readonly: true,
          disabled:true,
          position: "absolute",
          options: [{
            text: "Pick a County",
            value: ""
          }]
        }, {
          type: "combo",
          name: "country_text",
          label: "Country",
          width: 210,
          labelWidth: "80",
          labelHeight: "21",
          inputWidth: "95",
          inputHeight: "21",
          labelLeft: "335",
          labelTop: "105",
          inputLeft: "440",
          inputTop: "105",
          position: "absolute",
          readonly: true,
          options: [{
            text: "Pick a Country",
            value: ""
          }]
        }, {
          type: "combo",
          name: "province_text",
          label: "Province",
          width: 210,
          labelWidth: "80",
          labelHeight: "21",
          inputWidth: "95",
          inputHeight: "21",
          labelLeft: "335",
          labelTop: "135",
          inputLeft: "440",
          inputTop: "135",
           disabled:true,
          position: "absolute",
          readonly: true,
          options: [{
            text: "Pick Province",
            value: ""
          }]
        }, {
          type: "calendar",
          name: "start_date",
          label: "Start Date",
          dateFormat: "%m-%d-%Y",
          enableTime: false,
          //readonly: true,
          value: "",
          width: 210,
          labelWidth: "80",
          labelHeight: "21",
          inputWidth: "177",
          inputHeight: "21",
          labelLeft: "15",
          labelTop: "195",
          inputLeft: "95",
          inputTop: "195",
          position: "absolute"
        }, {
          type: "calendar",
          name: "leave_date",
          label: "End Date",
          dateFormat: "%m-%d-%Y",
          enableTime: false,
          //readonly: true,
          value: "",
          width: 210,
          labelWidth: "80",
          labelHeight: "21",
          inputWidth: "177",
          inputHeight: "21",
          labelLeft: "335",
          labelTop: "195",
          inputLeft: "440",
          inputTop: "195",
          position: "absolute"
        }, {
          type: "hidden",
          name: "address_start1",
          value: ""

        }, {
          type: "hidden",
          name: "address_leave1",
          value: ""

        }, {
          type: "hidden",
          name: "mailing1",
          value: ""

        }]
      }]
    }

  }
}());