define([
  'Config',
  'Common',
  'controller/FormLayout/Main',
  'model/MainWindow',
  'model/MainWindowTabbar',
  'model/MainWindowTabbarForms'
], function (Config, Common, FormLayout, MainWindow, MainWindowtabbar, MainWindowtabbarForms) {
  var
  $windowManager = new dhtmlXWindows(),
    $window = {},
    $layout = {},
    $statusBar = {},
    $toolbar = {},
    $tabbar = {},
    $form = {},
    $pages = {},
    $config = {};

  //console.log(Config);
  // Config.icons_path = "dimpu"
  return {
    init: function (conf, form_id) {
      console.log(Config);
      $config = conf;
      form_id = form_id || -1;
      uid = "mainWindow" + "_" + form_id;
      $pages[uid] = [];
      this.windowForm(uid, form_id);
      this.layoutForm(uid);
      this.tabbarForm(uid, form_id);
      this.setTabFormProperties(uid, form_id);
      this.toolbarForm(uid, form_id);
      this.layoutFormPreview(uid);
      this.toolbarFormPreview(uid, form_id);
      FormLayout.init(uid, $tabbar[uid], form_id);

    },
    windowForm: function (uid, form_id) {
      var self = this;
      if ($windowManager.isWindow("window_FormBuilder_formcreator_" + uid + "_" + form_id)) {
        $window[uid].show();
        $window[uid].bringToTop();
        return;
      }
      $window[uid] = $windowManager.createWindow(
        "window_FormBuilder_formcreator_" + uid + "_" + form_id, MainWindow.conf_window_form.left + 10, MainWindow.conf_window_form.top + 10, MainWindow.conf_window_form.width, MainWindow.conf_window_form.height
      );
      Common.setMainWindow($window[uid]);
      if (form_id == -1)
        $window[uid].setText(MainWindow.conf_window_form.title);
      else
        $window[uid].setText("Edit form");

      // $window[uid].setIcon(MainWindow.conf_window_form.icon, MainWindow.conf_window_form.icon_dis);
      $window[uid].attachEvent("onClose", function (win) {
        dhtmlx.skin = "dhx_skyblue";
        // self.model.conf_form_preview.template = [self.model.conf_form_preview.defaultRootProperties];
        return true;
      });
      $statusBar[uid] = $window[uid].attachStatusBar();
      $statusBar[uid].setText("<div class='status_info' id='formbuilder_status_info_" + uid + "'>Initializing FormBuilder interface</div><div class='user_info' id='formbuilder_user_info_" + uid + "'><img class='user_info_status' id='formbuilder_user_info_status_" + uid + "' src='" + $config.icons_path + "/online.png' /> <span>Logged as " + CAIRS.MAP.API.user + "</span></div><div class='data_transfer_info' id='formbuilder_data_transfer_info_" + uid + "'> loading form data</div><div id='formbuilder_errors_info_" + uid + "' class='errors_info'>no errors</div>");
    },
    layoutForm: function (uid) {
      var self = this;
      $layout[uid] = $window[uid].attachLayout('1C');
      $layout[uid].cells("a").hideHeader();
    },
    tabbarForm: function (uid, form_id) {
      var self = this;
      try {
        $tabbar[uid] = $layout[uid].cells("a").attachTabbar(MainWindowtabbar.conf_tabs);
        //$tabbar[uid].setSkin('dhx_web');
        $tabbar[uid].enableScroll(true);

        $tabbar[uid].attachEvent("onSelect", function (idd, last_id) {
          dhtmlx.skin = "dhx_skyblue";
          if (idd == "form_properties") {
            return true;
          } else {
            form_id = $form['form_properties'].getItemValue("form_id");
            if (form_id > 0) {
              if (idd == "form_preview")
                self._startPreview(uid);
              return true;
            } else {
              dhtmlx.message({
                title: "Save form",
                type: "confirm",
                text: "You need to save the form before proceed. Do you want to save the form",
                ok: "Save",
                cancel: "Cancel",
                /**
                 * Description
                 * @method callback
                 * @param {} ok
                 * @return
                 */
                callback: function (ok) {
                  if (ok) {

                    self._save_form(uid, function () {
                      if (idd == "form_preview") self._startPreview(uid);
                      $tabbar[uid].setTabActive(idd);
                    }, form_id)

                  } else {
                    $tabbar[uid].setTabActive("form_properties");
                  }
                }
              });
            }
          }
          return true;
        });
      } catch (e) {
        //console.log("tab : " + e.message);
      }
    },
    setTabFormProperties: function (uid, form_id) {
      var self = this;
      $form['form_properties'] = $tabbar[uid].cells("form_properties").attachForm(MainWindowtabbarForms.form_properties.template);
      CAIRS.dhtmlx.prepareForm(uid, MainWindowtabbarForms.form_properties, $form['form_properties']);

      $form['form_properties'].setItemValue("form_agency_id", $config.agency_id);

      if (form_id < 1) {
        $form['form_properties'].setItemValue("form_id", -1);
      } else {
        $form['form_properties'].setItemValue("form_id", form_id);
      }

      $form['form_properties'].getInput("formlabel").onkeyup = function (event) {
        $form['form_properties'].getInput("formname").value = Common.handleFormName(uid, this.value);
      };
    },
    toolbarForm: function (uid, form_id) {
      var self = this;

      $toolbar['form'] = $tabbar[uid].cells("form_properties").attachToolbar(MainWindow.conf_toolbar_form);
      $toolbar['form'].setIconSize(32);
      // $toolbar['form'].attachEvent("onClick", function (id) {
      //   if (id == "save_form") {
      //     self.progressOnForm(uid);
      //     self._save_form(uid, function (form_id) {
      //       self.progressOnForm(uid);
      //       var url = '';
      //       var swfUrl = '';
      //       CAIRS.dhtmlx.formFields[uid + "_form_preview"].forEach(function (field, index, array) {
      //         if (field.type == "upload") {
      //           if (field.option_id) // if this field is child field
      //           {
      //             swfUrl = self._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["swfUrl"];
      //             self._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["swfUrl"] = ''; //swfUrl
      //             url = self._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["url"];
      //             self._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["url"] = ''; //swfUrl
      //           } else {
      //             swfUrl = self._getPageField(uid, field.page_id, field.field_id)["swfUrl"];
      //             self._getPageField(uid, field.page_id, field.field_id)["swfUrl"] = '';
      //             url = self._getPageField(uid, field.page_id, field.field_id)["url"];
      //             self._getPageField(uid, field.page_id, field.field_id)["url"] = '';
      //           }
      //         } // bug stringify
      //       });

      //       CAIRS.MAP.API.update({
      //         resource: "/forms/" + form_id + "/metadata" // mandatory
      //         ,
      //         format: "json" // json, yaml, xml. Default: json. Not mandatory
      //         ,
      //         payload: "agency_id=" + self.configuration[self._getRawUID(uid)].agency_id + "&template=" + (JSON.stringify(self.model.conf_form_preview.template)) // mandatory for PUT and POST
      //         ,
      //         /**
      //          * Description
      //          * @method onSuccess
      //          * @param {} request
      //          * @return
      //          */
      //         onSuccess: function (request) // not mandatory
      //         {
      //           var json = eval('(' + request.response + ')');
      //           dhtmlx.message({
      //             type: "error",
      //             text: json.response
      //           });

      //           CAIRS.dhtmlx.formFields[uid + "_form_preview"].forEach(function (field, index, array) {
      //             if (field.type == "upload") {
      //               if (field.option_id) // if this field is child field
      //               {
      //                 self._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["swfUrl"] = swfUrl; //swfUrl
      //                 self._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["url"] = url; //swfUrl
      //               } else {
      //                 self._getPageField(uid, field.page_id, field.field_id)["swfUrl"] = swfUrl;
      //                 self._getPageField(uid, field.page_id, field.field_id)["url"] = url;
      //               }
      //             } // bug stringify
      //           });


      //           self.progressOffForm(uid);
      //         },
      //         /**
      //          * Description
      //          * @method onFail
      //          * @param {} request
      //          * @return
      //          */
      //         onFail: function (request) { // not mandatory
      //           var json = eval('(' + request.response + ')');
      //           dhtmlx.message({
      //             type: "error",
      //             text: json.response
      //           });
      //           self.progressOffForm(uid);
      //         }
      //       });
      //     }, form_id);
      //   } else if (id == "generate_form") {
      //     console.log(JSON.stringify(self.model.conf_form_preview.template));
      //     self.progressOnForm(uid);
      //     CAIRS.MAP.API.update({
      //       resource: "/forms/" + form_id + "/metadata" // mandatory
      //       ,
      //       format: "json" // json, yaml, xml. Default: json. Not mandatory
      //       ,
      //       payload: "agency_id=" + self.configuration[self._getRawUID(uid)].agency_id + "&template=" + JSON.stringify(self.model.conf_form_preview.template) // mandatory for PUT and POST
      //       ,
      //       /**
      //        * Description
      //        * @method onSuccess
      //        * @param {} request
      //        * @return
      //        */
      //       onSuccess: function (request) // not mandatory
      //       {
      //         var json = eval('(' + request.response + ')');
      //         dhtmlx.message({
      //           type: "error",
      //           text: json.response
      //         });


      //         self.progressOffForm(uid);
      //       },
      //       /**
      //        * Description
      //        * @method onFail
      //        * @param {} request
      //        * @return
      //        */
      //       onFail: function (request) { // not mandatory
      //         var json = eval('(' + request.response + ')');
      //         dhtmlx.message({
      //           type: "error",
      //           text: json.response
      //         });
      //         self.progressOffForm(uid);
      //       }
      //     });

      //   }
      // });
    },
    layoutFormPreview: function (uid) {
      var self = this;
      $layout['form_preview'] = $tabbar[uid].cells("form_preview").attachLayout('1C');
      // $layout['form_preview'].dhxWins.enableAutoViewport(false);
      //$layout['form_preview'].dhxWins.attachViewportTo(document.body);
      $layout['form_preview'].attachEvent("onUnDock", function (itemId) {
        //console.log(itemId);
        $layout['form_preview'].dhxWins.setImagePath("../codebase4.0/imgs/");

        $window[form_preview] = $layout['form_preview'].dhxWins.window(itemId);
        $window[form_preview].button("dock").attachEvent("onClick", function () {
          $layout['form_preview'].cells("a").dock();
          return true;
        });;
        $window[form_preview].setDimension(760, 500);

        $window[form_preview].setText("Live preview: " + $form['form_properties'].getItemValue("formlabel"));
        $window[form_preview].setIcon("dock.gif", "dock.gif");
      });
      $layout['form_preview'].attachEvent("onDock", function (itemId) {
        alert("entrei dock");
      });
    },
    toolbarFormPreview: function (uid, form_id) {
      var self = this;
      $toolbar['form_preview'] = $layout['form_preview'].cells("a").attachToolbar(MainWindow.conf_toolbar_form_preview);
      $toolbar['form_preview'].setIconSize(32);
      $toolbar['form_preview'].setSkin('dhx_skyblue');
      $toolbar['form_preview'].attachEvent("onClick", function (id) {
        if (id == "save_form") {
          if (CAIRS.dhtmlx.validateForm(uid + "_form_preview", self.form_preview[uid])) {
            self._changeFieldsValueOnModel(uid);
          }
        } else if (id == "print_form") {
          if (CAIRS.dhtmlx.validateForm(uid + "_form_preview", self.form_preview[uid])) {
            //console.log( JSON.stringify( self.model.conf_form_preview.template ) );

            var gridData = [],
              form = null,
              inputs = [],
              inputHash = null,
              x, iframe = null,
              type = null,
              form_id = self.form_properties[uid].getItemValue("form_id");

            if (document.getElementById("form_print_" + uid + "_" + form_id)) {
              form = document.getElementById("form_print_" + uid + "_" + form_id);
              document.body.removeChild(form);
            }

            form = document.createElement("form");
            form.setAttribute("id", "form_print_" + uid + "_" + form_id);
            form.setAttribute("name", "form_print_" + uid + "_" + form_id);

            //console.log( CAIRS.dhtmlx.formFields[ uid + "_form_preview" ] );
            // get user typed data and set the field value inside application model

            self._changeFieldsValueOnModel(uid);

            form.setAttribute("action", self.application_path + "processors/html2pdf/processor/PV.php?agency_logo=" + self.data_store[self._getRawUID(uid)].agency_data.logo + "");
            form.setAttribute("method", "post");
            form.setAttribute("target", "iframe_print_" + uid + "_" + form_id);

            var inputHash = document.createElement("input");
            inputHash.setAttribute("id", "template");
            inputHash.setAttribute("name", "template");
            inputHash.setAttribute("type", "hidden");
            inputHash.setAttribute("value", JSON.stringify(self.model.conf_form_preview.template));
            form.appendChild(inputHash);

            var an = document.createElement("input");
            an.setAttribute("id", "agency_name");
            an.setAttribute("name", "agency_name");
            an.setAttribute("type", "hidden");
            an.setAttribute("value", self.data_store[self._getRawUID(uid)].agency_data.agency_name);
            form.appendChild(an);

            var fn = document.createElement("input");
            fn.setAttribute("id", "form_name");
            fn.setAttribute("name", "form_name");
            fn.setAttribute("type", "hidden");
            fn.setAttribute("value", self.form_properties[uid].getItemValue("formlabel"));
            form.appendChild(fn);

            document.body.appendChild(form);

            //postStr = postStr + "&userID=" + self.configuration[ uid ].userID;
            //postStr = postStr + "&connID=" + self.configuration[ uid ].connID;
            //postStr = postStr + "&connectionID=" + self.configuration[ uid ].connectionID;

            self._window_print(uid);

            try {
              iframe = document.getElementById("iframe_print_" + uid + "_" + form_id);
              self.window_print[uid].attachObject("iframe_print_" + uid + "_" + form_id);
              form.submit();
            } catch (e) {
              iframe = document.createElement("iframe");
              iframe.setAttribute("id", "iframe_print_" + uid + "_" + form_id);
              iframe.setAttribute("name", "iframe_print_" + uid + "_" + form_id);
              iframe.setAttribute("src", "#");
              iframe.setAttribute("style", "height:100%;");
              iframe.setAttribute("frameborder", "0");

              iframe.style.width = "100%";

              if (document.getElementById("hidden_placeholder")) {
                document.getElementById("hidden_placeholder").appendChild(iframe);
              } else {
                var hidden_placeholder = document.createElement("DIV");
                hidden_placeholder.setAttribute("id", "hidden_placeholder");
                document.body.appendChild(hidden_placeholder);

                document.getElementById("hidden_placeholder").appendChild(iframe);
              }

              self.window_print[uid].attachObject("iframe_print_" + uid + "_" + form_id);

              form.submit();
            }

          }
        }
      });
    },

  }
});