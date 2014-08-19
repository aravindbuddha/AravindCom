Relation.Model = Relation.Model || (function() {
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
      "main_window_title": "Relation"
    },
    "defaults": {
      "window": {
        "top": 400,
        "left": 190,
        "width": 1000,
        "height": 550,
        "title": "Relation",
        "layout_pattern": "1C",
        "icon": "family.png",
        "icon_dis": "family.png",
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
      "icon": "family.png",
      "icon_dis": "family.png",
    },
    "new_window": {
      "width": 730,
      "height": 340,
      "title": "New Relation"
    },
    "edit_window": {
      "width": 730,
      "height": 340,
      "title": "Edit Relation"
    },
    "import_window": {
      "width": 730,
      "height": 340,
      "title": "Import Relation"
    },
    "conf_grid": {
      "headers": "relation_id,Contact,Primary Relationship,Relationship,Contact,Links",
      "ids": "relation_id,Contact,Primary Relationship,Relationship,Contact,links",
      "widths": "0,200,200,200,200,200,*",
      "colaligns": "left,left,left,left,left,left,left",
      "coltypes": "ro,ro,ro,ro,ro,ro,ro",
      "colsorting": "str,str,str,str,str,str,str",
      'visibility': 'true,false,false,false,false,false,false'
    },
    "conf_toolbar": {
      "icon_path": _icon_path,
      "items": [{
        "type": "button",
        "id": "add_relation",
        "text": "Add Relation",
        "img": "relation-book-add.png",
        "img_disabled": "relation-book-add.png"
      }, {
        "type": "button",
        "id": "edit_relation",
        "text": "Edit Relation",
        "img": "edit.png",
        "img_disabled": "edit.png"
      }, {
        "type": "button",
        "id": "delete_relation",
        "text": "Delete Relation",
        "img": "recycle_full-16.png",
        "img_disabled": "recycle_full-16.png"
      }]
    },
    "edit_toolbar": {
      "icon_path": _icon_path,
      "items": [{
          "type": "button",
          "id": "save_relation",
          "text": "Save",
          "img": "save.gif",
          "img_disabled": "save.gif"
        }, {
          "type": "button",
          "id": "import_relation",
          "text": "Import relation",
          "img": "import-icon.png",
          "img_disabled": "import-icon.png"
        }
        // , 
        // 
        // {
        //   "type": "button",
        //   "id": "help_relation",
        //   "text": "Help",
        //   "img": "Help.png",
        //   "img_disabled": "Help.png"
        // }, {
        //   "type": "button",
        //   "id": "close_editrelation",
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
          "id": "import_relation",
          "text": "Import",
          "img": "save.gif",
          "img_disabled": "save.gif"
        }
        // , {
        //   "type": "button",
        //   "id": "import_relation",
        //   "text": "Import relation",
        //   "img": "import-icon.png",
        //   "img_disabled": "import-icon.png"
        // }
        // , 
        // 
        // {
        //   "type": "button",
        //   "id": "help_relation",
        //   "text": "Help",
        //   "img": "Help.png",
        //   "img_disabled": "Help.png"
        // }, {
        //   "type": "button",
        //   "id": "close_editrelation",
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
      "url": "url(../modules/MAPrelationcomponent/icons/calendar.gif)",
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
        label: "Family detail",
        list: [{
          type: "settings",
          position: "absolute"
        }, {
          type: "input",
          name: "contact_name",
          required: true,
          label: "Contact",
          position: "absolute",
          inputWidth: "200",
          labelLeft: "0",
          labelTop: "10",
          inputLeft: "140",
          inputTop: "11"
        }, {
          type: "label",
          name: "processingWheel1",
          label: '<img alt="Processing wheel" id="processingWheel1"  src="../../images/bigrotation.gif" width="20px"; height="20px" />',
          labelWidth: "16",
          labelHeight: "16",
          labelLeft: "315",
          labelTop: "6",
          position: "absolute",
          hidden: false
        }, {
          type: "label",
          name: "p1plusicon",
          label: '<img alt="Add Contact" id="plusicon" src="../../auxiliary/dhtmlxfull3.5/icons/add.png" onclick="MAPRelationshipComponent.opencontact();  "/>',
          labelWidth: "20",
          labelHeight: "20",
          labelLeft: "344",
          labelTop: "8",
          position: "absolute",
          hidden: false
        }, {
          type: "combo",
          name: "primaryRelationship",
          required: true,
          label: "Primary&nbsp;Relationship",
          inputWidth: "200",
          labelLeft: "0",
          labelTop: "54",
          inputLeft: "140",
          inputTop: "51",
          position: "absolute"
        }, {
          type: "combo",
          name: "relationTypeId1",
          required: true,
          label: "Relation&nbsp;Type",
          labelWidth: "200",
          inputWidth: "200",
          labelLeft: "0",
          labelTop: "104",
          inputLeft: "140",
          inputTop: "101",
          position: "absolute"
        }, {
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
        }, {
          type: "calendar",
          name: "startdate_1",
          label: "Start&nbsp;Date&nbsp;(mm-dd-yyyy)",
          labelWidth: "200",
          dateFormat: "%m-%d-%Y",
          enableTime: false,
          value: "",
          options: {},
          labelLeft: "0",
          labelTop: "140",
          inputLeft: "0",
          inputTop: "161",
          position: "absolute",
          inputWidth: "150",
          readonly: 1
        }, {
          type: "calendar",
          name: "enddate_1",
          label: "End&nbsp;Date&nbsp;(mm-dd-yyyy)",
          labelWidth: "200",
          dateFormat: "%m-%d-%Y",
          options: {},
          labelLeft: "200",
          labelTop: "140",
          inputLeft: "200",
          inputTop: "161",
          position: "absolute",
          inputWidth: "150",
          readonly: 1
        }, {
          type: "input",
          hidden: true,
          name: "connectionId",
          value: ""
        }, {
          type: "input",
          hidden: true,
          name: "relConnId",
          value: ""
        }, {
          type: "input",
          hidden: true,
          name: "relAction",
          value: 'inserted'
        }, {
          type: "input",
          hidden: true,
          name: "relConnectionId1",
          value: ""
        }, {
          type: "input",
          hidden: true,
          name: "hRelationTypeId1",
          value: ''
        }, {
          type: "input",
          hidden: true,
          name: "contacttype",
          value: '1'
        }, {
          type: "input",
          hidden: true,
          name: "combo1value",
          value: ''
        }]
      }]
    }

  }
}());