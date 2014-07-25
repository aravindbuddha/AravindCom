define(function () {
  $image_path = 'asserts/img/';
  return {
    icon_path: 'asserts/icons/',
    image_path: 'asserts/img/',
    conf_grid_pages: {
      "headers": "Page name,Layout,Tab width,Order",
      "ids": "pagename,page_layout,tab_width,index",
      "widths": "300,120,90,90",
      "colaligns": "left,right,right,right",
      "coltypes": "ed,coro,ro,ro",
      "colsorting": "str,str,int,int",
      "bind_library_field": "false,false,false,false"
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
    conf_tabbar_form: {
      //parent: "a_tabbar",
      image_path: "",
      skin: "dhx_skyblue",
      tabs: [{
        id: "selected_fields",
        text: "Fields of the page",
        width: "200px",
        active: true
      }]
    },

    conf_library_fields: {
      tabs: [{
        id: "group_fields",
        text: "group of fields",
        width: "150px"
      }, {
        id: "search_fields",
        text: "search by category",
        width: "150px",
        active: true
      }, {
        id: "search_fields_tags",
        text: "search by field tag",
        width: "150px"
      }, {
        id: "list_fields",
        text: "listing fields",
        width: "150px",
        active: true
      }]
    },
    conf_tabbar_create_fields: {
      tabs: [{
        id: "field_properties",
        text: "Field properties",
        width: "200px"
      }, {
        id: "add_field",
        text: "Create new field",
        width: "200px",
        active: true
      }, {
        id: "library_fields",
        text: "Library fields",
        width: "200px"
      }]
    },
    conf_grid_library_fields: {
      headers: "&nbsp;,Field Type,type_standard,Input name,Display name,Caption,Default text,User Tips,Text size,Required,Is Library Field,Lib field ID,Custom CSS,Mask",
      ids: "sub_row,type,type_standard,name,label,caption,value,tooltip,text_size,required,use_library,library_field_id,className,mask_to_use",
      widths: "30,80,0,50,150,100,80,0,0,0,0,0,0,0",
      colaligns: "right,left,left,left,left,left,left,left,left,left,left,left,left,left",
      coltypes: "sub_row,coro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro",
      colsorting: "na,str,str,str,str,str,str,str,str,str,str,str,str,str",
      dateFormat: "%m-%d-%Y",
      "bind_library_field": "false,false,false,false,false,false,false,false,false,false,false,false,false"
    },
    conf_grid_group_fields: {
      headers: "Group name,Tip,Label,Tags,FieldIDSeqList",
      ids: "GroupName,Tip,Label,FieldTagId,FieldIDSeqList",
      widths: "200,180,180,0,0",
      colaligns: "left,left,left,left,right",
      coltypes: "ed,ed,ed,ro,ro",
      colsorting: "str,str,str,str,int",
      "bind_library_field": "false,false,false,false,false",
      dateFormat: "%m-%d-%Y"
    },

    conf_toolbar_form_pages: {
      "icon_path": "asserts/icons/",
      "items": [{
        "type": "button",
        "id": "add_page",
        "text": "add new page",
        "img": "add_page.png",
        "img_disabled": "add_page.png"
      }, {
        "type": "button",
        "id": "edit_page",
        "text": "edit page",
        "img": "add_page.png",
        "img_disabled": "add_page.png",
        disabled: true
      }, {
        "type": "button",
        "id": "delete_page",
        "text": "delete selected page",
        "img": "excluir.png",
        "img_disabled": "excluir_dis.png",
        disabled: true
      }, {
        id: "new_s1",
        type: "separator"
      }, {
        "type": "button",
        "id": "undock_form_preview",
        "text": "undock form preview",
        "img": "dock.gif",
        "img_disabled": "dock.gif",
        disabled: false
      }, {
        type: "text",
        id: "info",
        text: ""
      }]
    },
    conf_toolbar_field_propertie: {
      "icon_path": "asserts/icons/32px/",
      "items": [{
        "type": "button",
        "id": "save_field",
        "text": "save field",
        "img": "save.png",
        "img_disabled": "save_dis.png"
        //disabled : true
      }]
    },
    conf_form_form_pages: {
      template: [{
        type: "settings",
        position: "label-left",
        labelWidth: 140,
        inputWidth: 140,
        inputLeft: 10
      }, {
        type: "input",
        name: 'pagename',
        label: 'Page name:',
        value: "",
        tooltip: "Provide the page name.",
        info: "Provide the page name.",
        required: true,
        validate: 'NotEmpty'
      }, {
        type: "combo",
        name: 'page_layout',
        label: 'Layout type:',
        options: [{
          text: "select one",
          value: ""
        }, {
          value: "D",
          text: "double"
        }, {
          value: "S",
          text: "single"
        }],
        tooltip: "Select the layout type.",
        info: "Select the layout type.",
        required: true,
        validate: 'NotEmpty'
      }, {
        type: "input",
        name: 'tab_width',
        label: 'Tab width:',
        value: "100",
        tooltip: "Provide the tab width on form.",
        info: "Provide the tab width on form.",
        mask_to_use: "integer",
        required: true,
        validate: 'NotEmpty'
      }]
    },
    conf_toolbar_form_fields: {
      "icon_path": "asserts/icons/",
      "items": [{
        "type": "button",
        "id": "edit_field",
        "text": "edit field",
        "img": "add_page.png",
        "img_disabled": "add_page.png",
        disabled: true
      }, {
        "type": "button",
        "id": "delete_field",
        "text": "delete selected field",
        "img": "excluir.png",
        "img_disabled": "excluir_dis.png",
        disabled: true
      }, {
        id: "new_s1",
        type: "separator"
      }, {
        "type": "button",
        "id": "reorder_fields",
        "text": "reorder fields",
        "img": "sorting.png",
        "img_disabled": "sorting.png",
        disabled: false
      }, {
        id: "new_s1",
        type: "separator"
      }, {
        type: "text",
        id: "info",
        text: ""
      }]
    },

    conf_grid_fields: {
      headers: "Field Type,type_standard,Input name,Display name,Caption,Default text,Tips,Text size,Required,Is Library Field,Lib field ID,Custom CSS,Mask,Order,Validation rules",
      ids: "type,type_standard,name,label,caption,value,tooltip,text_size,required,use_library,library_field_id,className,mask_to_use,index,validate"

      ,
      widths: "80,0,0,150,0,0,0,0,60,60,60,0,60,60,0"
      //  ,widths : "80,60,150,60,60,60,60,60,60,60,60,60,60,60,60"
      ,
      colaligns: "left,left,left,left,left,left,left,left,center,center,right,right,left,right,left",
      coltypes: "coro,ro,ed,ed,ed,ed,ro,ro,coro,coro,ro,ro,coro,ro,ro",
      colsorting: "str,str,str,str,str,str,str,str,str,str,str,str,str,int,str",
      dateFormat: "%m-%d-%Y",
      "bind_library_field": "false,false,false,false,false,false,false,false,false,false,false,false,false,false,false"
    },
    conf_form_create_fields: {
      tabs: [{
        id: "predefined_fields",
        text: "predefined fields",
        width: "150px",
        active: true
      }, {
        id: "custom_field",
        text: "custom field",
        width: "150px",
      }]
    },
    conf_form_field_propertie: {
      "template": [{
          type: "settings",
          position: "label-left",
          labelWidth: 140,
          inputWidth: 140,
          inputLeft: 10
        }, {
          type: "hidden",
          name: 'field_id',
          value: "0"
        }, {
          type: "combo",
          name: 'type',
          label: 'Type:',
          options: [{
              text: "select one",
              value: ""
            }, {
              text: "text (one row)",
              value: "T"
            }, {
              text: "date",
              value: "E"
            }, {
              text: "checkbox",
              value: "B"
            }, {
              text: "checkbox group",
              value: "q"
            }, {
              text: "nested group fields",
              value: "W"
            }, {
              text: "checkbox nested fields",
              value: "Z"
            }, {
              text: "multiple selections",
              value: "M"
            }, {
              text: "select",
              value: "S"
            }, {
              text: "radiobutton",
              value: "R"
            }, {
              text: "radio group",
              value: "r"
            }
            //,{text: "radio matrix", value: "RG"}
            , {
              text: "text area",
              value: "A"
            }, {
              text: "drop-down menu",
              value: "D"
            }, {
              text: "text for display only",
              value: "L"
            }, {
              text: "file upload",
              value: "F"
            }, {
              text: "grey bar-section heading",
              value: "G"
            }, {
              text: "price",
              value: "I"
            }, {
              text: "payment options",
              value: "P"
            }

            , {
              text: "Agency signature field",
              value: "Y"
            }, {
              text: "Caseworker signature field",
              value: "X"
            }, {
              text: "Client 1 signature field",
              value: "U"
            }, {
              text: "Client 2 signature field",
              value: "V"
            }



          ],
          tooltip: "",
          required: true,
          validate: 'NotEmpty',
          trigger: "type_standard"
        }

        , {
          type: "hidden",
          name: 'type_standard',
          label: 'type_standard'
        }

        , {
          type: 'block',
          inputWidth: 'auto',
          inputHeight: 'auto',
          name: "price_aux",
          id: "price_aux",
          list: [{
            type: "hidden",
            name: "priceToCairs",
            value: "",
            label: "Pay to CAIRS"
          }, {
            type: "checkbox",
            name: "priceToCairs_ckeck",
            value: "Y",
            label: "Pay to CAIRS:",
            trigger: "priceToCairs"
          }, {
            type: "input",
            name: 'defaultPrice',
            label: 'Default Price:',
            value: "",
            tooltip: "",
            mask_to_use: "currency"
          }, {
            type: "hidden",
            name: "priceAllowUser",
            value: "",
            label: "Allow user to Enter value"
          }, {
            type: "checkbox",
            name: "priceAllowUser_ckeck",
            value: "Y",
            label: "Allow user to Enter value:",
            trigger: "priceToCairs"
          }, {
            type: "combo",
            name: "category",
            label: 'Category:',
            options: [{
                text: "Adoption Fee",
                value: "198",
                selected: true
              }

            ]
          }, {
            type: "combo",
            name: "subCategory",
            label: 'Sub-Category:',
            options: [{
              text: "select one",
              value: ""
            }, {
              value: "200",
              text: "Application/Online Case Mgmt"
            }, {
              value: "201",
              text: "Home Study"
            }, {
              value: "202",
              text: "Agency Fee"
            }, {
              value: "203",
              text: "Orphanage Donation"
            }, {
              value: "204",
              text: "Extended Travel Fee"
            }, {
              value: "205",
              text: "Visa Fee"
            }, {
              value: "622",
              text: "Online Case Management Fee"
            }, {
              value: "623",
              text: "Waiting Children Process Fee"
            }, {
              value: "625",
              text: "Home Study Review"
            }, {
              value: "626",
              text: "Pre-Adoption Education"
            }, {
              value: "634",
              text: "Dossier Fee"
            }, {
              value: "733",
              text: "Consultation "
            }, {
              value: "874",
              text: "Profile Preparation"
            }, {
              value: "891",
              text: "Escrow Payment"
            }, {
              value: "892",
              text: "Profile Activation"
            }, {
              value: "893",
              text: "Post Adoption Report Services"
            }, {
              value: "894",
              text: "HS Review/Pre-Plm Consulting"
            }, {
              value: "895",
              text: "Home Study/Online Case Mgmt"
            }, {
              value: "896",
              text: "Home Study Update"
            }, {
              value: "897",
              text: "App/Online Case Mgt/Agency Fee"
            }, {
              value: "898",
              text: "Case Mgmt/Risk/Home Study Fee"
            }, {
              value: "899",
              text: "Home Study Addendum"
            }, {
              value: "900",
              text: "Agency/Dossier Service Fees"
            }, {
              value: "901",
              text: "Agency/Int Prog/Dossier Fees"
            }, {
              value: "902",
              text: "Agency/Int Prog/Human Aid Fees"
            }, {
              value: "903",
              text: "Agency/Int Program Fees"
            }, {
              value: "904",
              text: "Agency/Int Prog/Orphanage Fees"
            }, {
              value: "905",
              text: "PAR Services/Registration Fee"
            }, {
              value: "906",
              text: "Online Case Mgmt/Risk Training"
            }, {
              value: "907",
              text: "Placement Services"
            }, {
              value: "908",
              text: "International Program Fee"
            }, {
              value: "909",
              text: "Dossier Translation"
            }, {
              value: "910",
              text: "Application Fee"
            }, {
              value: "911",
              text: "BLAS Update Fee"
            }, {
              value: "912",
              text: "Humanitarian Aid"
            }] //, required: true, validate: 'NotEmpty'
          }]
        }

        , {
          type: "hidden",
          name: 'name',
          label: 'Input Name:',
          value: "",
          tooltip: "This field is automatically filled. Start on next field.",
          readonly: true,
          info: true
        }, {
          type: "input",
          name: 'label',
          label: 'Display Name:',
          value: "",
          tooltip: "Provide the name/label of the field for displaying on screen",
          required: true,
          validate: 'NotEmpty',
          info: true
        }, {
          type: "hidden",
          name: 'caption',
          label: 'Caption (legacy):',
          value: "",
          tooltip: ""
        }, {
          type: "input",
          name: 'value',
          label: 'Default text:',
          value: "",
          tooltip: "Default text for this input. Works only for text input elements.",
          info: true
        }

        , {
          type: "input",
          name: 'tooltip',
          label: 'User Tips:',
          value: "",
          tooltip: "",
          rows: 3,
          tooltip: "This info text will be displayed bellow of this field.",
          info: true
        }, {
          type: "input",
          name: 'className',
          label: 'Custom CSS:',
          value: "",
          tooltip: ""
        }, {
          type: "btn2state",
          name: 'required',
          label: 'Required:',
          tooltip: ""
        }, {
          type: "btn2state",
          readonly: true,
          name: 'use_library',
          label: 'Is Library Field:',
          tooltip: ""
        }, {
          type: "hidden",
          name: 'text_size',
          label: 'Text size (*legacy):',
          value: "200",
          tooltip: "",
          required: true,
          validate: 'NotEmpty,ValidInteger',
          mask_to_use: "integer"
        }


        , {
          type: "combo",
          name: "mask_to_use",
          label: 'Mask:',
          options: [{
            text: "none",
            value: ""
          }, {
            text: "SSN",
            value: "SSN"
          }, {
            text: "time",
            value: "time"
          }, {
            text: "date",
            value: "date"
          }, {
            text: "credit card",
            value: "credit_card"
          }, {
            text: "cvv",
            value: "cvv"
          }, {
            text: "expiration date",
            value: "expiration_date"
          }, {
            text: "us phone",
            value: "us_phone"
          }, {
            text: "can phone",
            value: "can_phone"
          }, {
            text: "integer",
            value: "integer"
          }, {
            text: "currency",
            value: "currency"
          }, {
            text: "can currency",
            value: "can_currency"
          }],
          tooltip: "The mask effect will be applied when user types on the field. This works for text input elements only.",
          info: true
        }






        , {
          type: "newcolumn",
          offset: 20
        }



        , {
          type: "label",
          label: 'Validation rules:',
          list: [

            {
              type: "settings",
              position: "label-right",
              labelWidth: 90,
              inputWidth: 30,
              inputLeft: 10
            }, {
              type: "input",
              name: 'validate',
              value: "",
              label: 'Validation rules:'
            }, {
              type: "checkbox",
              name: 'NotEmpty',
              label: 'Not Empty',
              value: "NotEmpty",
              trigger: "validate"
            }, {
              type: "checkbox",
              name: 'ValidEmail',
              label: 'Valid Email',
              value: "ValidEmail",
              trigger: "validate"
            }, {
              type: "checkbox",
              name: 'ValidInteger',
              label: 'Valid Integer',
              value: "ValidInteger",
              trigger: "validate"
            }, {
              type: "checkbox",
              name: 'ValidFloat',
              label: 'Valid Float',
              value: "ValidFloat",
              trigger: "validate"
            }, {
              type: "checkbox",
              name: 'ValidNumeric',
              label: 'Valid Numeric',
              value: "ValidNumeric",
              trigger: "validate"
            }, {
              type: "checkbox",
              name: 'ValidAplhaNumeric',
              label: 'Valid AplhaNumeric',
              value: "ValidAplhaNumeric",
              trigger: "validate"
            }, {
              type: "newcolumn",
              offset: 5
            }, {
              type: "checkbox",
              name: 'ValidDatetime',
              label: 'Valid Datetime',
              value: "ValidDatetime",
              trigger: "validate"
            }, {
              type: "checkbox",
              name: 'ValidDate',
              label: 'Valid Date',
              value: "ValidDate",
              trigger: "validate"
            }, {
              type: "checkbox",
              name: 'ValidTime',
              label: 'Valid Time',
              value: "ValidTime",
              trigger: "validate"
            }, {
              type: "checkbox",
              name: 'ValidCurrency',
              label: 'Valid Currency',
              value: "ValidCurrency",
              trigger: "validate"
            }, {
              type: "checkbox",
              name: 'ValidSSN',
              label: 'Valid SSN',
              value: "ValidSSN",
              trigger: "validate"
            }, {
              type: "checkbox",
              name: 'ValidExpirationdate',
              label: 'Valid Expiration date',
              value: "ValidExpirationdate",
              trigger: "validate"
            }
          ]
        }


      ]
    },

    conf_dataView_pre_defined_fields: {
      settings: {
        type: {
          template: "#img# #text#",
          padding: 5,
          height: 34,
          width: 130
        },
        drag: true,
        select: true
      },

      data: [
        //type,name,label,caption,value,tooltip,text_size,required,use_library,className,mask_to_use,index
        {
          "id": "B",
          "img": "<img src='" + $image_path + "checkbox.png'>",
          "text": "<div class='span_field_selector'>checkbox</div>",
          "name": "My checkbox",
          "type": "B",
          "label": "My checkbox",
          "caption": "My checkbox",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "",
          "validate": ""
        }, {
          "id": "q",
          "img": "<img src='" + $image_path + "checkbox.png'>",
          "text": "<div class='span_field_selector'>Checkbox group</div>",
          "name": "My checkbox group",
          "type": "q",
          "label": "My checkbox group",
          "caption": "My checkbox group",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "",
          "validate": ""
        }, {
          "id": "Z",
          "img": "<img src='" + $image_path + "checkbox.png'>",
          "text": "<div class='span_field_selector'>checkbox nested fields</div>",
          "name": "My checkbox nested fields",
          "type": "Z",
          "label": "My checkbox nested fields",
          "caption": "My checkbox nested fields",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "",
          "validate": ""
        }, {
          "id": "E",
          "img": "<img src='" + $image_path + "date.png'>",
          "text": "<div class='span_field_selector'>date</div>",
          "name": "My date",
          "type": "E",
          "label": "My date",
          "caption": "My date",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "date",
          "validate": ""
        }, {
          "id": "D",
          "img": "<img src='" + $image_path + "dropdown.png'>",
          "text": "<div class='span_field_selector'>dropdown</div>",
          "name": "My dropdown",
          "type": "D",
          "label": "My dropdown",
          "caption": "My dropdown",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "",
          "validate": ""
        }, {
          "id": "email",
          "img": "<img src='" + $image_path + "email.png'>",
          "text": "<div class='span_field_selector'>email</div>",
          "name": "My email",
          "type": "T",
          "label": "My email",
          "caption": "My email",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "",
          "validate": ""
        }, {
          "id": "file_upload",
          "img": "<img src='" + $image_path + "file_upload.png'>",
          "text": "<div class='span_field_selector'>file upload</div>",
          "name": "My file upload",
          "type": "F",
          "label": "My file upload",
          "caption": "My file upload",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "",
          "validate": ""
        }, {
          "id": "G",
          "img": "<img src='" + $image_path + "section_break.png'>",
          "text": "<div class='span_field_selector'>grey bar-section heading</div>",
          "name": "My grey bar-section heading",
          "type": "G",
          "label": "My grey bar-section heading",
          "caption": "My grey bar-section heading",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "",
          "validate": ""
        }, {
          "id": "imageupload",
          "img": "<img src='" + $image_path + "file_upload.png'>",
          "text": "<div class='span_field_selector'>image upload</div>",
          "name": "My image upload",
          "type": "F",
          "label": "My image upload",
          "caption": "My image upload",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "",
          "validate": ""
        }, {
          "id": "integer",
          "img": "<img src='" + $image_path + "number.png'>",
          "text": "<div class='span_field_selector'>integer</div>",
          "name": "My integer",
          "type": "T",
          "label": "My integer",
          "caption": "My integer",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "integer",
          "validate": ""
        }, {
          "id": "M",
          "img": "<img src='" + $image_path + "multiple_choice.png'>",
          "text": "<div class='span_field_selector'>multiple choice</div>",
          "name": "My multiple choice",
          "type": "M",
          "label": "My multiple choice",
          "caption": "My multiple choice",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "",
          "validate": ""
        }, {
          "id": "S",
          "img": "<img src='" + $image_path + "multiple_choice.png'>",
          "text": "<div class='span_field_selector'>select choice</div>",
          "name": "My multiple choice",
          "type": "S",
          "label": "My select",
          "caption": "My select",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "",
          "validate": ""
        }
        /*,{
        "id": "7",
        "img": "<img src='" + $image_path + "name.png'>",
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
        "img": "<img src='" + $image_path + "paragraph.png'>",
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
      }*/
        , {
          "id": "W",
          "img": "<img src='" + $image_path + "nested.png'>",
          "text": "<div class='span_field_selector'>nested group fields</div>",
          "name": "My checkbox",
          "type": "W",
          "label": "My nested group fields",
          "caption": "My nested group fields",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "",
          "validate": ""
        }, {
          "id": "r",
          "img": "<img src='" + $image_path + "radio.png'>",
          "text": "<div class='span_field_selector'>Radio group</div>",
          "name": "My radio group",
          "type": "r",
          "label": "My radio group",
          "caption": "My radio group",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "",
          "validate": ""
        }, {
          "id": "phone",
          "img": "<img src='" + $image_path + "usphone.png'>",
          "text": "<div class='span_field_selector'>US phone</div>",
          "name": "My US phone",
          "type": "T",
          "label": "My US phone",
          "caption": "My US phone",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "us_phone",
          "validate": ""
        }, {
          "id": "can_phone",
          "img": "<img src='" + $image_path + "canphone.png'>",
          "text": "<div class='span_field_selector'>Canada phone</div>",
          "name": "My Canada phone",
          "type": "T",
          "label": "My Canada phone",
          "caption": "My Canada phone",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "can_phone",
          "validate": ""
        }, {
          "id": "currency",
          "img": "<img src='" + $image_path + "uscurrency.png'>",
          "text": "<div class='span_field_selector'>US currency</div>",
          "name": "My US currency",
          "type": "I",
          "label": "My US currency",
          "caption": "My US currency",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "currency",
          "validate": ""
        }, {
          "id": "can_currency",
          "img": "<img src='" + $image_path + "cancurrency.png'>",
          "text": "<div class='span_field_selector'>Canada currency</div>",
          "name": "My Canada currency",
          "type": "T",
          "label": "My Canada currency",
          "caption": "My Canada currency",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "can_currency",
          "validate": ""
        }, {
          "id": "price",
          "img": "<img src='" + $image_path + "uscurrency.png'>",
          "text": "<div class='span_field_selector'>Price</div>",
          "name": "My price",
          "type": "I",
          "label": "My price",
          "caption": "My price",
          "value": "",
          "tooltip": "",
          "text_size": 200,
          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "currency",
          "validate": ""
        }, {
          "id": "R",
          "img": "<img src='" + $image_path + "radio.png'>",
          "text": "<div class='span_field_selector'>radiobutton</div>",
          "name": "My radiobutton",
          "type": "R",
          "label": "My radiobutton",
          "caption": "My radiobutton",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "",
          "validate": ""
        }
        /*,{
        "id": "RG",
        "img": "<img src='" + $image_path + "checkbox.png'>",
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
      }*/
        , {
          "id": "SSN",
          "img": "<img src='" + $image_path + "number.png'>",
          "text": "<div class='span_field_selector'>SSN</div>",
          "name": "My SSN",
          "type": "T",
          "label": "My SSN",
          "caption": "My SSN",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "SSN",
          "validate": ""
        }, {
          "id": "T",
          "img": "<img src='" + $image_path + "single_line_text.png'>",
          "text": "<div class='span_field_selector'>text (one row)</div>",
          "name": "My text (one row)",
          "type": "T",
          "label": "My text (one row)",
          "caption": "My text (one row)",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "",
          "validate": ""
        }, {
          "id": "A",
          "img": "<img src='" + $image_path + "single_line_text.png'>",
          "text": "<div class='span_field_selector'>text area</div>",
          "name": "My text area",
          "type": "A",
          "label": "My text area",
          "caption": "My text area",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "",
          "validate": ""
        }, {
          "id": "L",
          "img": "<img src='" + $image_path + "page_break.png'>",
          "text": "<div class='span_field_selector'>text for display only</div>",
          "name": "My text for display only",
          "type": "L",
          "label": "My text for display only",
          "caption": "My text for display only",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "",
          "validate": ""
        }, {
          "id": "time",
          "img": "<img src='" + $image_path + "time.png'>",
          "text": "<div class='span_field_selector'>time</div>",
          "name": "My time",
          "type": "T",
          "label": "My time",
          "caption": "My time",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "time",
          "validate": ""
        }



        , {
          "id": "website",
          "img": "<img src='" + $image_path + "website.png'>",
          "text": "<div class='span_field_selector'>website</div>",
          "name": "My website",
          "type": "T",
          "label": "My website",
          "caption": "My website",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "website",
          "validate": ""
        }
        /*
      ,{
        "id": "14",
        "img": "<img src='" + $image_path + "address.png'>",
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
        "img": "<img src='" + $image_path + "matrix.png'>",
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
        "img": "<img src='" + $image_path + "signature.png'>",
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

        , {
          "id": "Y",
          "img": "<img src='" + $image_path + "signature.png'>",
          "text": "<div class='span_field_selector'>Agency signature field</div>",
          "name": "Agency signature field",
          "type": "Y",
          "label": "Agency signature field",
          "caption": "Agency signature field",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "",
          "validate": ""
        }, {
          "id": "X",
          "img": "<img src='" + $image_path + "signature.png'>",
          "text": "<div class='span_field_selector'>Caseworker signature field</div>",
          "name": "Caseworker signature field",
          "type": "X",
          "label": "Caseworker signature field",
          "caption": "Caseworker signature field",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "",
          "validate": ""
        }, {
          "id": "U",
          "img": "<img src='" + $image_path + "signature.png'>",
          "text": "<div class='span_field_selector'>Client 1 signature field</div>",
          "name": "Client 1 signature field",
          "type": "U",
          "label": "Client 1 signature field",
          "caption": "Client 1 signature field",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "",
          "validate": ""
        }, {
          "id": "V",
          "img": "<img src='" + $image_path + "signature.png'>",
          "text": "<div class='span_field_selector'>Client 2 signature field</div>",
          "name": "Client 2 signature field",
          "type": "V",
          "label": "Client 2 signature field",
          "caption": "Client 2 signature field",
          "value": "",
          "tooltip": "",
          "text_size": 200,

          "required": "0",
          "use_library": "0",
          "className": "",
          "index": 0,
          "mask_to_use": "",
          "validate": ""
        }
      ]
    },
    "conf_form_custom_field": {
      "template": [{
          type: "settings",
          position: "label-left",
          labelWidth: 140,
          inputWidth: 140,
          inputLeft: 10
        }



        , {
          type: "hidden",
          name: 'field_id',
          value: "0"
        }, {
          type: "combo",
          name: 'type',
          label: 'Type:',
          options: [{
              text: "select one",
              value: ""
            }, {
              text: "text (one row)",
              value: "T"
            }, {
              text: "date",
              value: "E"
            }, {
              text: "checkbox",
              value: "B"
            }, {
              text: "checkbox group",
              value: "q"
            }, {
              text: "nested group fields",
              value: "W"
            }

            , {
              text: "checkbox nested fields",
              value: "Z"
            }, {
              text: "multiple selections",
              value: "M"
            }, {
              text: "select",
              value: "S"
            }, {
              text: "radiobutton",
              value: "R"
            }, {
              text: "radio group",
              value: "r"
            }
            //,{text: "radio matrix", value: "RG"}
            , {
              text: "text area",
              value: "A"
            }, {
              text: "drop-down menu",
              value: "D"
            }, {
              text: "text for display only",
              value: "L"
            }, {
              text: "file upload",
              value: "F"
            }, {
              text: "grey bar-section heading",
              value: "G"
            }, {
              text: "price",
              value: "I"
            }, {
              text: "payment options",
              value: "P"
            }

            , {
              text: "Agency signature field",
              value: "Y"
            }, {
              text: "Caseworker signature field",
              value: "X"
            }, {
              text: "Client 1 signature field",
              value: "U"
            }, {
              text: "Client 2 signature field",
              value: "V"
            }

          ],
          tooltip: "",
          required: true,
          validate: 'NotEmpty',
          trigger: "type_standard"
        }

        , {
          type: "hidden",
          name: 'type_standard',
          label: 'type_standard'
        }



        , {
          type: 'block',
          inputWidth: 'auto',
          inputHeight: 'auto',
          name: "price_aux",
          id: "price_aux",
          list: [{
            type: "hidden",
            name: "priceToCairs",
            value: "",
            label: "Pay to CAIRS"
          }, {
            type: "checkbox",
            name: "priceToCairs_ckeck",
            value: "Y",
            label: "Pay to CAIRS:",
            trigger: "priceToCairs"
          }, {
            type: "input",
            name: 'defaultPrice',
            label: 'Default Price:',
            value: "",
            tooltip: "",
            mask_to_use: "currency"
          }, {
            type: "hidden",
            name: "priceAllowUser",
            value: "",
            label: "Allow user to Enter value"
          }, {
            type: "checkbox",
            name: "priceAllowUser_ckeck",
            value: "Y",
            label: "Allow user to Enter value:",
            trigger: "priceToCairs"
          }, {
            type: "combo",
            name: "category",
            label: 'Category:',
            options: [{
                text: "Adoption Fee",
                value: "198",
                selected: true
              }

            ]
          }, {
            type: "combo",
            name: "subCategory",
            label: 'Sub-Category:',
            options: [{
              text: "select one",
              value: ""
            }, {
              value: "200",
              text: "Application/Online Case Mgmt"
            }, {
              value: "201",
              text: "Home Study"
            }, {
              value: "202",
              text: "Agency Fee"
            }, {
              value: "203",
              text: "Orphanage Donation"
            }, {
              value: "204",
              text: "Extended Travel Fee"
            }, {
              value: "205",
              text: "Visa Fee"
            }, {
              value: "622",
              text: "Online Case Management Fee"
            }, {
              value: "623",
              text: "Waiting Children Process Fee"
            }, {
              value: "625",
              text: "Home Study Review"
            }, {
              value: "626",
              text: "Pre-Adoption Education"
            }, {
              value: "634",
              text: "Dossier Fee"
            }, {
              value: "733",
              text: "Consultation "
            }, {
              value: "874",
              text: "Profile Preparation"
            }, {
              value: "891",
              text: "Escrow Payment"
            }, {
              value: "892",
              text: "Profile Activation"
            }, {
              value: "893",
              text: "Post Adoption Report Services"
            }, {
              value: "894",
              text: "HS Review/Pre-Plm Consulting"
            }, {
              value: "895",
              text: "Home Study/Online Case Mgmt"
            }, {
              value: "896",
              text: "Home Study Update"
            }, {
              value: "897",
              text: "App/Online Case Mgt/Agency Fee"
            }, {
              value: "898",
              text: "Case Mgmt/Risk/Home Study Fee"
            }, {
              value: "899",
              text: "Home Study Addendum"
            }, {
              value: "900",
              text: "Agency/Dossier Service Fees"
            }, {
              value: "901",
              text: "Agency/Int Prog/Dossier Fees"
            }, {
              value: "902",
              text: "Agency/Int Prog/Human Aid Fees"
            }, {
              value: "903",
              text: "Agency/Int Program Fees"
            }, {
              value: "904",
              text: "Agency/Int Prog/Orphanage Fees"
            }, {
              value: "905",
              text: "PAR Services/Registration Fee"
            }, {
              value: "906",
              text: "Online Case Mgmt/Risk Training"
            }, {
              value: "907",
              text: "Placement Services"
            }, {
              value: "908",
              text: "International Program Fee"
            }, {
              value: "909",
              text: "Dossier Translation"
            }, {
              value: "910",
              text: "Application Fee"
            }, {
              value: "911",
              text: "BLAS Update Fee"
            }, {
              value: "912",
              text: "Humanitarian Aid"
            }] //, required: true, validate: 'NotEmpty'
          }]
        }


        , {
          type: "hidden",
          name: 'name',
          label: 'Input Name:',
          value: "",
          tooltip: "This field is automatically filled. Start on next field.",
          readonly: true,
          info: true
        }, {
          type: "input",
          name: 'label',
          label: 'Display Name:',
          value: "",
          tooltip: "Provide the name/label of the field for displaying on screen",
          required: true,
          validate: 'NotEmpty',
          info: true
        }, {
          type: "hidden",
          name: 'caption',
          label: 'Caption (legacy):',
          value: "",
          tooltip: ""
        }, {
          type: "input",
          name: 'value',
          label: 'Default text:',
          value: "",
          tooltip: "Default text for this input. Works only for text input elements.",
          info: true
        }

        , {
          type: "input",
          name: 'tooltip',
          label: 'User Tips:',
          value: "",
          tooltip: "",
          rows: 3,
          tooltip: "This info text will be displayed bellow of this field.",
          info: true
        }, {
          type: "input",
          name: 'className',
          label: 'Custom CSS:',
          value: "",
          tooltip: ""
        }, {
          type: "btn2state",
          name: 'required',
          label: 'Required:',
          tooltip: ""
        }, {
          type: "btn2state",
          name: 'inlibrary',
          label: 'Make It In Library:',
          tooltip: ""
        }, {
          type: "hidden",
          name: 'text_size',
          label: 'Text size (*legacy):',
          value: "200",
          tooltip: "",
          required: true,
          validate: 'NotEmpty,ValidInteger',
          mask_to_use: "integer"
        }

        , {
          type: "combo",
          name: "mask_to_use",
          label: 'Mask:',
          options: [{
            text: "none",
            value: ""
          }, {
            text: "SSN",
            value: "SSN"
          }, {
            text: "time",
            value: "time"
          }, {
            text: "date",
            value: "date"
          }, {
            text: "credit card",
            value: "credit_card"
          }, {
            text: "cvv",
            value: "cvv"
          }, {
            text: "expiration date",
            value: "expiration_date"
          }, {
            text: "us phone",
            value: "us_phone"
          }, {
            text: "can phone",
            value: "can_phone"
          }, {
            text: "integer",
            value: "integer"
          }, {
            text: "currency",
            value: "currency"
          }, {
            text: "can currency",
            value: "can_currency"
          }],
          tooltip: "The mask effect will be applied when user types on the field. This works for text input elements only.",
          info: true
        }

        , {
          type: "newcolumn",
          offset: 20
        }

        , {
          type: "label",
          label: 'Validation rules:',
          list: [

            {
              type: "settings",
              position: "label-right",
              labelWidth: 90,
              inputWidth: 30,
              inputLeft: 10
            }, {
              type: "input",
              name: 'validate',
              value: "",
              label: 'Validation rules:'
            }, {
              type: "checkbox",
              name: 'NotEmpty',
              label: 'Not Empty',
              value: "NotEmpty",
              trigger: "validate"
            }, {
              type: "checkbox",
              name: 'ValidEmail',
              label: 'Valid Email',
              value: "ValidEmail",
              trigger: "validate"
            }, {
              type: "checkbox",
              name: 'ValidInteger',
              label: 'Valid Integer',
              value: "ValidInteger",
              trigger: "validate"
            }, {
              type: "checkbox",
              name: 'ValidFloat',
              label: 'Valid Float',
              value: "ValidFloat",
              trigger: "validate"
            }, {
              type: "checkbox",
              name: 'ValidNumeric',
              label: 'Valid Numeric',
              value: "ValidNumeric",
              trigger: "validate"
            }, {
              type: "checkbox",
              name: 'ValidAplhaNumeric',
              label: 'Valid AplhaNumeric',
              value: "ValidAplhaNumeric",
              trigger: "validate"
            }, {
              type: "newcolumn",
              offset: 5
            }, {
              type: "checkbox",
              name: 'ValidDatetime',
              label: 'Valid Datetime',
              value: "ValidDatetime",
              trigger: "validate"
            }, {
              type: "checkbox",
              name: 'ValidDate',
              label: 'Valid Date',
              value: "ValidDate",
              trigger: "validate"
            }, {
              type: "checkbox",
              name: 'ValidTime',
              label: 'Valid Time',
              value: "ValidTime",
              trigger: "validate"
            }, {
              type: "checkbox",
              name: 'Valid Currency',
              label: 'Valid Currency',
              value: "ValidCurrency",
              trigger: "validate"
            }, {
              type: "checkbox",
              name: 'ValidSSN',
              label: 'Valid SSN',
              value: "ValidSSN",
              trigger: "validate"
            }, {
              type: "checkbox",
              name: 'ValidExpirationdate',
              label: 'Valid Expiration date',
              value: "ValidExpirationdate",
              trigger: "validate"
            }
          ]
        }

      ]
    },
    conf_toolbar_field_propertie: {
      "icon_path": "asserts/icons/32px/",
      "items": [{
        "type": "button",
        "id": "save_field",
        "text": "save field",
        "img": "save.png",
        "img_disabled": "save_dis.png"
        //disabled : true
      }]
    },

  }
});