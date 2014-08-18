define(function() {
  return {
    window: {
      id: "MainWindow",
      width: window.innerWidth / 2,
      height: window.innerHeight / 1.2,
      center: true,
      caption: "Address Book",
      modal: true
    },
    layout: {
      pattern: "1C",
      cells: []
    },
    toolbar: {
      "icon_path": "asserts/icons/",
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
        "id": "close_editaddress",
        "text": "Close",
        "img": "cancel.png",
        "img_disabled": "cancel.png"
      }]
    },
    form: {
      "template": [{
        type: "block",
        width: 750,
        offsetLeft: 0,
        inputWidth: "auto",
        tab_width: "100px",
        //id: "tab_family_detail",
        label: "Phone detail",
        list: [{
          type: "hidden",
          name: "address_ID",
          value: 0
        }, {
          type: "hidden",
          name: "contact_ID",
          value: ""
        }, {
          type: "combo",
          name: "address_type",
          label: "Type",
          required: true,
          validate: "NotEmpty",
          width: 175,
          labelWidth: "80",
          labelHeight: "21",
          inputWidth: "95",
          inputHeight: "21",
          labelLeft: "15",
          labelTop: "15",
          inputLeft: "95",
          inputTop: "15",
          position: "absolute",
          options: [{
            text: "Pick Address Type",
            value: ""
          }]
        }, {
          type: "input",
          name: "address_address1",
          label: "Address 1",
          value: "",
          width: 175,
          labelWidth: "80",
          labelHeight: "21",
          inputWidth: "95",
          inputHeight: "21",
          labelLeft: "15",
          labelTop: "65",
          inputLeft: "95",
          inputTop: "65",
          position: "absolute"
        }, {
          type: "input",
          name: "address_address2",
          label: "Address 2",
          value: "",
          width: 175,
          labelWidth: "80",
          labelHeight: "21",
          inputWidth: "95",
          inputHeight: "21",
          labelLeft: "15",
          labelTop: "115",
          inputLeft: "95",
          inputTop: "115",
          position: "absolute"
        }, {
          type: "input",
          name: "address_city",
          label: "City",
          value: "",
          width: 175,
          labelWidth: "80",
          labelHeight: "21",
          inputWidth: "95",
          inputHeight: "21",
          labelLeft: "15",
          labelTop: "165",
          inputLeft: "95",
          inputTop: "165",
          position: "absolute"
        }, {
          type: "combo",
          name: "address_state",
          label: "State/Zip",
          required: true,
          validate: "NotEmpty",
          className: "myTest",
          width: 100,
          labelWidth: "80",
          labelHeight: "21",
          inputWidth: "20",
          inputHeight: "21",
          labelLeft: "15",
          labelTop: "215",
          inputLeft: "95",
          inputTop: "215",
          position: "absolute",
          options: [{
              text: "Pick a State",
              value: ""
            }

          ]
        }, {
          type: "input",
          name: "address_zip",
          value: "",
          validate: "ValidInteger",
          width: 55,
          labelWidth: "80",
          labelHeight: "21",
          inputWidth: "-30",
          inputHeight: "21",
          labelLeft: "185",
          labelTop: "215",
          inputLeft: "215",
          inputTop: "215",
          position: "absolute"
        }, {
          type: "combo",
          name: "address_County",
          label: "County",
          width: 175,
          labelWidth: "80",
          labelHeight: "21",
          inputWidth: "95",
          inputHeight: "21",
          labelLeft: "15",
          labelTop: "265",
          inputLeft: "95",
          inputTop: "265",
          position: "absolute",
          options: [{
              text: "Pick a County",
              value: ""
            }


          ]
        }, {
          type: "combo",
          name: "address_country",
          label: "Country",
          width: 175,
          labelWidth: "80",
          labelHeight: "21",
          inputWidth: "95",
          inputHeight: "21",
          labelLeft: "315",
          labelTop: "15",
          inputLeft: "395",
          inputTop: "15",
          position: "absolute",
          options: [{
              text: "USA",
              value: ""
            }

          ]
        }, {
          type: "combo",
          name: "address_province",
          label: "Province",
          width: 175,
          labelWidth: "80",
          labelHeight: "21",
          inputWidth: "95",
          inputHeight: "21",
          labelLeft: "315",
          labelTop: "65",
          inputLeft: "395",
          inputTop: "65",
          position: "absolute",
          options: [{
            text: "Pick Province",
            value: ""
          }]
        }, {
          type: "combo",
          name: "MailingAddress",
          label: "Mailing<br />Address",
          width: 175,
          labelWidth: "80",
          labelHeight: "33",
          inputWidth: "120",
          inputHeight: "21",
          labelLeft: "315",
          labelTop: "113",
          inputLeft: "395",
          inputTop: "115",
          position: "absolute",
          options: [{
            text: "Yes",
            value: 1
          }, {
            text: "No",
            value: 0,

          }],
          validate: "NotEmpty"
        }, {
          type: "calendar",
          name: "address_start",
          label: "Start Date",
          dateFormat: "%m-%d-%Y",
          enableTime: false,
          readonly: true,
          value: "",
          labelWidth: "80",
          labelHeight: "21",
          inputWidth: "177",
          inputHeight: "21",
          labelLeft: "315",
          labelTop: "165",
          inputLeft: "395",
          inputTop: "165",
          position: "absolute"
        }, {
          type: "calendar",
          name: "address_leave",
          label: "End Date",
          dateFormat: "%m-%d-%Y",
          enableTime: false,
          readonly: true,
          value: "",
          labelWidth: "80",
          labelHeight: "21",
          inputWidth: "177",
          inputHeight: "21",
          labelLeft: "315",
          labelTop: "215",
          inputLeft: "395",
          inputTop: "215",
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
});