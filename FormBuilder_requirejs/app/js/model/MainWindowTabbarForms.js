define(function () {
  return {
    "form_properties": {
      "template": [{
          type: "settings",
          position: "label-left",
          labelWidth: 160,
          inputWidth: 230
        }, {
          type: "block",
          width: 900,
          list: [{
              name: "form_id",
              type: 'hidden',
              label: 'form_id:',
              value: -1,
              tooltip: ""
            }, {
              type: "hidden",
              name: 'formname',
              label: 'Form name:',
              value: "",
              tooltip: "This field is automatically filled. Start on next field.",
              readonly: true,
              info: 1,
              required: 1
            }, {
              type: "input",
              name: 'formlabel',
              label: 'Form Label:',
              value: "",
              tooltip: "Provide the name/label of the form for displaying on screen",
              required: true,
              validate: 'NotEmpty',
              info: 1,
              required: 1
            }, {
              type: "input",
              name: 'formtext',
              label: 'Form text:',
              value: "",
              tooltip: "",
              rows: 5
            }, {
              name: "captcha",
              type: 'hidden',
              label: 'captcha:',
              value: "",
              tooltip: ""
            }, {
              name: "key_id",
              type: 'hidden',
              label: 'key_id:',
              value: "",
              tooltip: ""
            }, {
              name: "form_agency_id",
              type: 'hidden',
              label: 'form_agency_id:',
              value: "",
              tooltip: ""
            }, {
              name: "numofrecords",
              type: 'hidden',
              label: 'numofrecords:',
              value: "",
              tooltip: ""
            }, {
              type: "input",
              name: 'submissionmsg',
              label: 'Submission Message:',
              value: "",
              tooltip: ""
            }, {
              type: "combo",
              name: 'formtype',
              label: 'Form Type:',
              options: [{
                text: "Normal form",
                value: "1"
              }, {
                text: "Payment Form",
                value: "2"
              }, {
                text: "Parent Reporting Form",
                value: "3"
              }],
              tooltip: ""
            }, {
              type: "combo",
              name: 'formdisplaytype',
              label: 'Form Display Type(deprecated*):',
              options: [{
                text: "Version 1",
                value: "1"
              }, {
                text: "Version 2",
                value: "2"
              }],
              tooltip: ""
            }, {
              type: "label",
              label: "Type of Email Messages:",
              labelWidth: 400,
              list: [{
                type: "settings",
                position: "label-right",
                labelWidth: 290,
                inputWidth: 20
              }, {
                type: "hidden",
                name: "adminalert",
                value: "",
                label: "Notify Admin"
              }, {
                type: "checkbox",
                name: "adminalert_checkbox",
                value: "Y",
                label: "Notify Admin",
                trigger: "adminalert"
              }, {
                type: "hidden",
                name: "autorespond",
                value: "",
                label: "Send Autoresponder"
              }, {
                type: "checkbox",
                name: "autorespond_checkbox",
                value: "Y",
                label: "Send Autoresponder",
                trigger: "autorespond"
              }, ]
            }, {
              type: "label",
              label: "Location of Tips (deprecated*):",
              labelWidth: 400,
              list: [{
                  type: "settings",
                  position: "label-right",
                  labelWidth: 290,
                  inputWidth: 20
                }, {
                  type: "radio",
                  name: "tiplocation",
                  value: "A",
                  label: "Above field",
                  checked: true
                }, {
                  type: "radio",
                  name: "tiplocation",
                  value: "B",
                  label: "Below field"
                }

              ]
            }, {
              type: "newcolumn",
              offset: 60
            }, {
              type: "label",
              label: "Form Columns:",
              labelWidth: 400,
              list: [{
                  type: "settings",
                  position: "label-right",
                  labelWidth: 290,
                  inputWidth: 20
                }, {
                  type: "radio",
                  name: "displaycolumns",
                  value: "S",
                  label: "Single",
                  checked: true
                }, {
                  type: "radio",
                  name: "displaycolumns",
                  value: "D",
                  label: "Double"
                }

              ]
            }, {
              type: "label",
              label: "Form Display:",
              labelWidth: 400,
              list: [{
                  type: "settings",
                  position: "label-right",
                  labelWidth: 290,
                  inputWidth: 20
                }, {
                  type: "radio",
                  name: "display",
                  value: "S",
                  label: "Show",
                  checked: true
                }, {
                  type: "radio",
                  name: "display",
                  value: "H",
                  label: "Hide"
                }

              ]
            }, {
              type: "hidden",
              name: "preview",
              value: "",
              label: "Show Preview Button:"
            }, {
              type: "checkbox",
              name: "preview_checkbox",
              value: "Y",
              label: "Show Preview Button:",
              trigger: "preview"
            }, {
              type: "hidden",
              name: "nomultiple",
              value: "",
              label: "Submission Restriction:"
            }, {
              type: "checkbox",
              name: "nomultiple_checkbox",
              value: "Y",
              label: "Submission Restriction:",
              trigger: "nomultiple"
            }, {
              type: "label",
              label: "Upon Submission:",
              labelWidth: 400,
              list: [{
                type: "settings",
                position: "label-right",
                labelWidth: 290,
                inputWidth: 20
              }, {
                type: "radio",
                name: "formindex",
                value: "D",
                label: "Direct user to Web Reply page (see Autoresponders)",
                checked: true
              }, {
                type: "radio",
                name: "formindex",
                value: "R",
                label: "Redirect user to",
                list: [{
                  type: "settings",
                  position: "label-right",
                  labelWidth: 0,
                  inputWidth: 280
                }, {
                  type: "input",
                  name: 'redirecturl',
                  label: "Redirect user to URL",
                  value: "",
                  tooltip: ""
                }]
              }, ]
            }, {
              type: "combo",
              name: 'skin',
              label: 'Form skin:',
              options: [{
                text: "skyblue",
                value: "dhx_skyblue"
              }, {
                text: "web",
                value: "dhx_web"
              }, {
                text: "terrace",
                value: "dhx_terrace"
              }],
              tooltip: ""
            }

          ]
        }



      ]
    },
  }
});