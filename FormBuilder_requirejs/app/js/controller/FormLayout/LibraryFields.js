define([
    'Common',
    'model/MainWindowFormLayout'
  ],
  function (Common, FormLayout) {
    var
    $layout = {},
      $tabbar = {},
      $toolbar = {},
      $statusBar = {},
      $grid = {},
      $popup = {},
      $form = {},
      $dataview = {},
      $layoutCell = "",
      $uid = "",
      $formId = "";
    return {
      init: function (uid, form_id, layoutCell) {
        $uid = uid;
        $formId = form_id;
        $layoutCell = layoutCell;
        this.tabbarFormCreateFields(uid);
        this.tabbarFormLibraryFields(uid, form_id);
        this.gridLibraryFields(uid);
        this.gridGroupFields(uid);
        // this.feedGridLibraryFields(uid);
        this.feedGridGroupFields(uid);
        this.toolbarFieldPropertie(uid);
        this.tabbarFormAddField(uid);
        this.dataViewTypeOfFields(uid);
        this.toolbarCustomField(uid, form_id);
        this.formCustomField(uid, form_id);
      },
      tabbarFormCreateFields: function (uid) {
        var self = this;
        $tabbar['create_fields'] = $layoutCell.attachTabbar(FormLayout.conf_tabbar_create_fields);
        //$tabbar['create_fields'].tabs('field_properties').hide();
        $tabbar['create_fields'].attachEvent("onSelect", function (idd, last_id) {
          return true;
        });
      },
      tabbarFormLibraryFields: function (uid, form_id) {
        var self = this;
        $tabbar['library_fields'] = $tabbar['create_fields'].cells("library_fields").attachTabbar(FormLayout.conf_library_fields);

        try {

          $tabbar['library_fields'].attachEvent("onSelect", function (idd, last_id) {
            try {
              if (idd == "search_fields") {
                //console.log(self.dataLoaded_tree_form_library_field_category[ uid ]);
                if (self.dataLoaded_tree_form_library_field_category[uid] == false) {
                  self.progressOnForm(uid);
                  self._startDataTree(uid, function () {
                    self._tree_form_library_field_category(uid, form_id);
                    self.dataLoaded_tree_form_library_field_category[uid] = true;
                    self.progressOffForm(uid);
                  });
                }
              } else if (idd == "search_fields_tags") {
                if (self.dataLoaded_tags_form[uid] == false) {
                  self.progressOnForm(uid);
                  self._startDataTags(uid, function () {
                    self._toolbar_tags(uid);
                    self._form_tags(uid);
                    self.dataLoaded_tags_form[uid] = true;
                    self.progressOffForm(uid);
                  });
                }
              }
            } catch (e) {
              //console.log(e.stack); 
            }
            return true;
          });

          // self.status_bar_paging_library_fields[uid] = $tabbar['library_fields'].cells("list_fields").attachStatusBar();
          // self.status_bar_paging_library_fields[uid].setText("<div id='recinfoArea_library_fields'></div>");

        } catch (e) {
          //console.log("tab : " + e.message);
        }
      },
      gridLibraryFields: function (uid) {
        var self = this;
        $grid['library_fields'] = $tabbar['library_fields'].cells("list_fields").attachGrid();
        $grid['library_fields'].setHeader(FormLayout.conf_grid_library_fields.headers);
        $grid['library_fields'].setColumnIds(FormLayout.conf_grid_library_fields.ids);
        $grid['library_fields'].setInitWidths(FormLayout.conf_grid_library_fields.widths);
        $grid['library_fields'].setColAlign(FormLayout.conf_grid_library_fields.colaligns);
        $grid['library_fields'].setColTypes(FormLayout.conf_grid_library_fields.coltypes);
        $grid['library_fields'].setColSorting(FormLayout.conf_grid_library_fields.colsorting);
        // self.grid_library_fields[ uid ].selMultiRows = true;
        $grid['library_fields'].setDateFormat("%m-%d-%Y");
        $grid['library_fields'].enablePaging(true, 100, 10, "recinfoArea_library_fields", true);
        $grid['library_fields'].setPagingSkin("toolbar", "dhx_skyblue");
        $grid['library_fields'].enableDragAndDrop(true);
        $grid['library_fields'].enableMercyDrag(true);
        //$grid['library_fields'].enableEditEvents(false, false, false);

        $grid['library_fields'].attachHeader("#rspan,#rspan,#rspan,#rspan,<div style='padding-right:3px'><input type='text' type='text' style='width: 99%; border:1px solid gray;' onClick='(arguments[0]||window.event).cancelBubble=true;' onKeyUp='FormBuilder._feedGrid_library_fields_search( \"" + uid + "\"  )' id='search_label_" + uid + "'></div>,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan");

        $grid['library_fields'].init();

        var type_combo = $grid['library_fields'].getCombo(1);
        type_combo.put("T", "text (one row)");
        type_combo.put("E", "date");
        type_combo.put("B", "checkbox");
        type_combo.put("W", "nested group fields");
        type_combo.put("Z", "checkbox nested fields");
        type_combo.put("M", "multiple selections");
        type_combo.put("S", "select");
        type_combo.put("R", "radiobutton");
        type_combo.put("A", "text area");
        type_combo.put("D", "drop-down menu");
        type_combo.put("L", "text for display only");
        type_combo.put("G", "grey bar-section heading");
        type_combo.put("I", "price");
        type_combo.put("F", "file upload");
        type_combo.put("P", "payment options");

        type_combo.put("Y", "Agency signature field");
        type_combo.put("X", "Caseworker signature field");
        type_combo.put("U", "Client 1 signature field");
        type_combo.put("V", "Client 2 signature field");

        $grid['library_fields'].attachEvent("onXLS", function () {
          //  Common.progressOn();
        });
        $grid['library_fields'].attachEvent("onXLE", function () {
          Common.progressOff();
        });
        $grid['library_fields'].rowToDragElement = function (id) {
          //any custom logic here
          var text = "dragging: " + $grid['library_fields'].cells(id, 4).getValue(); // prepare a text string
          return text;
        }

        $grid['library_fields'].attachEvent("onDrag", function (sId, tId, sObj, tObj, sInd, tInd) {
          return false;
        });

        $grid['library_fields'].attachEvent("onDragIn", function (sid, tid, sgrid, tgrid) {
          self.is_grid_pages[uid] = "";
          return true;
        });
      },
      gridGroupFields: function (uid) {
        var self = this;
        $grid['group_fields'] = $tabbar['library_fields'].cells("group_fields").attachGrid(FormLayout.conf_grid_group_fields);
        $grid['group_fields'].setHeader(FormLayout.conf_grid_group_fields.headers);
        $grid['group_fields'].setInitWidths(FormLayout.conf_grid_group_fields.widths);
        $grid['group_fields'].setColAlign(FormLayout.conf_grid_group_fields.colaligns);
        $grid['group_fields'].setColTypes(FormLayout.conf_grid_group_fields.coltypes);
        $grid['group_fields'].setColSorting(FormLayout.conf_grid_group_fields.colsorting);
        //self.grid_group_fields[ uid ].selMultiRows = true;
        $grid['group_fields'].setDateFormat("%m-%d-%Y");
        $grid['group_fields'].enableDragAndDrop(true);
        $grid['group_fields'].enableMercyDrag(true);

        $grid['group_fields'].enableEditEvents(false, false, false);

        $grid['group_fields'].init();

        $grid['group_fields'].attachEvent("onXLS", function () {
          Common.progressOn();
        });
        $grid['group_fields'].attachEvent("onXLE", function () {
          Common.progressOff();
        });
        $grid['group_fields'].attachEvent("onRowSelect", function (id, ind) {

        });

        $grid['group_fields'].attachEvent("onDrag", function (sId, tId, sObj, tObj, sInd, tInd) {
          return false;
        });

        /**
         * Description
         * @method rowToDragElement
         * @param {} id
         * @return text
         */
        $grid['group_fields'].rowToDragElement = function (id) {
          //any custom logic here
          var text = "dragging: " + $grid['group_fields'].cells(id, 1).getValue(); // prepare a text string
          return text;
        }

        $grid['group_fields'].attachEvent("onDragIn", function (sid, tid, sgrid, tgrid) {
          self.is_grid_pages[uid] = "";
          return true;
        });
      },
      feedGridLibraryFields: function (uid, stringToSearch, isSearch) {
        var self = this,
          gridURL = "";
        stringToSearch = stringToSearch || "";
        isSearch = isSearch || false;
        //$grid['library_fields'].clearAll();

        if (isSearch) {
          gridURL = CAIRS.MAP.API.getMappedURL({
            resource: "/LibraryFields/search", // mandatory
            responseType: "json", // not mandatory, default json
            params: "columns=" + FormLayout.conf_grid_library_fields.ids.replace(new RegExp("sub_row,", "g"), "") + "&tags=" + stringToSearch + "" // not mandatory, default none
          });
        } else {
          gridURL = CAIRS.MAP.API.getMappedURL({
            resource: "/LibraryFields", // mandatory
            responseType: "json", // not mandatory, default json
            params: "columns=" + FormLayout.conf_grid_library_fields.ids.replace(new RegExp("sub_row,", "g"), "") + "&searchcriteria=" + stringToSearch + "" // not mandatory, default none
          });
        }

        $grid['library_fields'].load(gridURL, function () {
          $tabbar['library_fields'].setTabActive("list_fields");
        }, "json");
      },
      feedGridGroupFields: function (uid) {
        var self = this;
        $grid['group_fields'].clearAll();
        var gridURL = CAIRS.MAP.API.getMappedURL({
          resource: "/LibraryFields/groups", // mandatory
          responseType: "json", // not mandatory, default json
          params: "columns=" + FormLayout.conf_grid_group_fields.ids + "" // not mandatory, default none
        });
        $grid['group_fields'].load(gridURL, function () {}, "json");
      },
      toolbarFieldPropertie: function (uid) {
        var self = this;
        $toolbar['field_properties'] = $tabbar['create_fields'].cells("field_properties").attachToolbar(FormLayout.conf_toolbar_field_propertie);
        $toolbar['field_properties'].setIconSize(32);
        $toolbar['field_properties'].attachEvent("onClick", function (id) {
          if (id == "save_field") {
            if (CAIRS.dhtmlx.validateForm(uid + "_form_field_propertie", $form['form_properties'])) {
              $toolbar['field_properties'].disableItem("save_field");

              var hash = $form['form_properties'].getFormData();

              //console.log( hash );

              // self._editFieldOfAPage(uid, hash, function () {
              //   $toolbar['field_properties'].enableItem("save_field");
              // });

            }

          }
        });
      },
      tabbarFormAddField: function (uid) {
        var self = this;
        $tabbar['form_add_field'] = $tabbar['create_fields'].cells("add_field").attachTabbar(FormLayout.conf_form_create_fields);
        $tabbar['form_add_field'].attachEvent("onSelect", function (idd, last_id) {
          return true;
        });
      },
      dataViewTypeOfFields: function (uid) {
        var self = this;
        $dataview['type_of_fields'] = $tabbar['form_add_field'].cells("predefined_fields").attachDataView(FormLayout.conf_dataView_pre_defined_fields.settings);
        $dataview['type_of_fields'].parse(FormLayout.conf_dataView_pre_defined_fields.data, "json");

        $statusBar['type_of_fields'] = $tabbar['form_add_field'].cells("predefined_fields").attachStatusBar();
        $statusBar['type_of_fields'].setText("<div class='red_warning'> <img src ='" + FormLayout.icon_path + "warning4.png'> Click on a item and drag to the <b>'Fields of the page'</b> grid .</div>");
      },
      toolbarCustomField: function (uid) {
        var self = this;
        $tabbar['custom_field'] = $tabbar['form_add_field'].cells("custom_field").attachToolbar(FormLayout.conf_toolbar_field_propertie);
        $tabbar['custom_field'].setIconSize(32);
        $tabbar['custom_field'].attachEvent("onClick", function (id) {
          if (id == "save_field") {
            if (CAIRS.dhtmlx.validateForm(uid + "_form_custom_field", self.form_custom_field[uid])) {
              $tabbar['custom_field'].disableItem("save_field");

              var hash = self.form_custom_field[uid].getFormData();

              //console.log( hash );

              self._addCustomFieldToPage(uid, hash, function () {
                // add a new ID for inserting a new item
                var field_id = (new Date()).getTime();
                self.form_custom_field[uid].setItemValue("field_id", field_id);
                self.form_custom_field[uid].setItemValue("name", "");
                self.form_custom_field[uid].setItemValue("label", "");
                $tabbar['custom_field'].enableItem("save_field");
              });
            }
          }
        });
      },
      formCustomField: function (uid) {
        var self = this
        $form['custom_field'] = $tabbar['form_add_field'].cells("custom_field").attachForm(FormLayout.conf_form_custom_field.template);
        $form['custom_field'].hideItem("price_aux");
        CAIRS.dhtmlx.prepareForm(uid + "_form_custom_field", FormLayout.conf_form_custom_field, $form['custom_field']);

        var field_id = (new Date()).getTime();
        $form['custom_field'].setItemValue("field_id", field_id);

        /**
         * Description
         * @method onkeyup
         * @param {} event
         * @return
         */
        $form['custom_field'].getInput("label").onkeyup = function (event) {
          $form['custom_field'].getInput("name").value = self.handleInputName(uid, this.value);
          $form['custom_field'].getInput("caption").value = this.value;
        };

        $status['form_custom_field'] = $tabbar['form_add_field'].cells("custom_field").attachStatusBar();
        $status['form_custom_field'].setText("<div class='red_warning'> <img src ='" + FormLayout.icon_path + "warning4.png'> Select a page on 'Pages of the form' grid before saving this form for adding a custom field.</div>");

        $form['custom_field'].attachEvent("onChange", function (id, value) {
          if (id == "type") {
            $form['custom_field'].setItemValue("type_standard", value);
            if (value == "I") {
              $form['custom_field'].showItem("price_aux");
              $form['custom_field'].setFormData({
                mask_to_use: "currency"
              });
            } else {
              $form['custom_field'].hideItem("price_aux");
              $form['custom_field'].setFormData({
                mask_to_use: ""
              });
            }
          }
        });
      },


      _editFieldOfAPage: function (uid, hash, callBack) {
        var self = this,
          field_id, form_id = self.form_properties[uid].getItemValue("form_id"),
          page_id = null;

        console.log(hash);

        if (typeof hash["page_id"] === 'undefined')
          page_id = self.grid_pages[uid].getSelectedRowId();

        if (typeof hash["field_id"] === "undefined") {
          dhtmlx.message({
            type: "error",
            text: "field_id is missing"
          });
          //if( callBack ) callBack();
          return;
        }
        if (self.selected_page[uid] == null) {
          dhtmlx.message({
            type: "error",
            text: "You need to select a page before adding fields."
          });
          //if( callBack ) callBack();
          return;
        }

        field_id = hash["field_id"];

        hash["name"] = self.handleInputName(uid, hash["label"]);

        if (hash["type"]) {
          var type_MAP_standard = hash["type_standard"];
          var type_DHTMLX_standard = hash["type"];
          hash["type"] = type_MAP_standard;
          hash["type_standard"] = type_DHTMLX_standard;
        } else {
          //console.log("type not defined");
          var type_MAP_standard = hash["type_standard"];
          var type_DHTMLX_standard = hash["type"];
          hash["type"] = self._getPageField(uid, self.selected_page[uid], field_id)["type_standard"];
          hash["type_standard"] = self._getPageField(uid, self.selected_page[uid], field_id)["type"];
        }

        if (hash["type_standard"].length == 1)
          hash["type_standard"] = self._convertLibraryFieldTypetoDhtmlxType(hash["type_standard"]);

        self.progressOnForm(uid);
        self._setStatusDataTransferForm(uid, "sending field_id(" + field_id + ") hash", true);

        delete hash["name"];

        CAIRS.MAP.API.update({
          resource: "/forms/" + form_id + "/pages/" + page_id + "/fields/" + field_id // mandatory
          ,
          format: "json" // json, yaml, xml. Default: json. Not mandatory
          ,
          payload: "agency_id=" + self.configuration[self._getRawUID(uid)].agency_id + "&hash=" + JSON.stringify(hash) // mandatory for PUT and POST
          ,
          /**
           * Description
           * @method onSuccess
           * @param {} request
           * @return
           */
          onSuccess: function (request) // not mandatory
          {
            var json = eval('(' + request.response + ')');

            if (json.status == "success") {
              self._setStatusDataTransferForm(uid, "field_id(" + field_id + ") saved");
              var rowData = [];
              FormLayout.conf_grid_fields.ids.split(",").forEach(function (id, index, array) {
                if (typeof hash[id] !== 'undefined') {
                  if (id == 'required') {
                    if (hash[id] == 1) {

                      try {
                        self.grid_form_fields[uid].cells(field_id, self.grid_form_fields[uid].getColIndexById(id)).setValue(1);
                      } catch (e) {

                      }
                      self._getPageField(uid, self.selected_page[uid], field_id)[id] = 1;
                      rowData.push(1);
                    } else {

                      try {
                        self.grid_form_fields[uid].cells(field_id, self.grid_form_fields[uid].getColIndexById(id)).setValue(0);
                      } catch (e) {

                      }
                      self._getPageField(uid, self.selected_page[uid], field_id)[id] = 0;
                      rowData.push(0);
                    }
                  } else if (id == "use_library") {
                    try {
                      var islib = self.grid_form_fields[uid].cells(field_id, self.grid_form_fields[uid].getColIndexById(id)).getValue();
                      self._getPageField(uid, self.selected_page[uid], field_id)[id] = islib;
                      rowData.push(islib);
                    } catch (e) {
                      self._getPageField(uid, self.selected_page[uid], field_id)[id] = hash[id];
                      rowData.push(hash[id]);
                    }

                  } else if (id == "tooltip") {

                    try {
                      self.grid_form_fields[uid].cells(field_id, self.grid_form_fields[uid].getColIndexById(id)).setValue(hash[id]);
                    } catch (e) {

                    }
                    self._getPageField(uid, self.selected_page[uid], field_id)["tooltip"] = hash[id];
                    self._getPageField(uid, self.selected_page[uid], field_id)["note"] = {
                      text: hash[id]
                    };
                    self._getPageField(uid, self.selected_page[uid], field_id)["info"] = true;
                    rowData.push(hash[id]);
                  } else if (id == "name") {

                    try {
                      self.grid_form_fields[uid].cells(field_id, self.grid_form_fields[uid].getColIndexById(id)).setValue(hash[id]);
                    } catch (e) {

                    }
                    self._getPageField(uid, self.selected_page[uid], field_id)[id] = hash[id];
                    self._getPageField(uid, self.selected_page[uid], field_id)["name"] = hash[id];
                    rowData.push(hash[id]);
                  } else if (id == "type") {

                    try {
                      self.grid_form_fields[uid].cells(field_id, self.grid_form_fields[uid].getColIndexById(id)).setValue(hash[id]);
                    } catch (e) {

                    }
                    self._getPageField(uid, self.selected_page[uid], field_id)[id] = hash[id];
                    self._getPageField(uid, self.selected_page[uid], field_id)["type"] = self._convertLibraryFieldTypetoDhtmlxType(hash[id]);

                    if (hash[id] == "A") {
                      self._getPageField(uid, self.selected_page[uid], field_id)["rows"] = 4;
                      self._getPageField(uid, self.selected_page[uid], field_id)["style"] = "width:190px;";
                    }

                    rowData.push(hash[id]);
                  } else {
                    //console.log( hash[ id ] );
                    if (hash[id]) {

                      try {
                        self.grid_form_fields[uid].cells(field_id, self.grid_form_fields[uid].getColIndexById(id)).setValue(hash[id]);
                      } catch (e) {

                      }
                      self._getPageField(uid, self.selected_page[uid], field_id)[id] = hash[id];
                      rowData.push(hash[id]);
                    } else {

                      try {
                        self.grid_form_fields[uid].cells(field_id, self.grid_form_fields[uid].getColIndexById(id)).setValue("");
                      } catch (e) {

                      }
                      self._getPageField(uid, self.selected_page[uid], field_id)[id] = "";
                      rowData.push(hash[id]);
                    }
                  }
                } else {
                  //console.log( "grid column name not present on form hash -----------------------" );
                  //console.log( id );
                  //console.log( hash[ id ] );
                  //console.log( "grid column name not present on form hash -----------------------" );
                  //self.grid_form_fields[ uid ].cells(field_id, self.grid_form_fields[ uid ].getColIndexById( id ) ).setValue( hash[ id ] );
                  //rowData.push( hash[ id ] );
                }

                self._getPageField(uid, self.selected_page[uid], field_id)["data"] = rowData;

              });
              self._startPreview(uid);
              self.progressOffForm(uid);
              if (callBack) callBack();
            } else {
              dhtmlx.message({
                type: "error",
                text: "Field don't saved. reason: " + json.response
              });
              self._setStatusDataTransferForm(uid, "field don't saved");
              if (json.response == "token not authorized")
                self._setStatusUserForm(uid, "token expired. Please login again", false);
              self.progressOffForm(uid);
            }
          },
          /**
           * Description
           * @method onFail
           * @param {} request
           * @return
           */
          onFail: function (request) { // not mandatory
            var json = eval('(' + request.response + ')');
            dhtmlx.message({
              type: "error",
              text: json.response
            });
            self._setStatusDataTransferForm(uid, "field don't saved");
            if (json.response == "token not authorized")
              self._setStatusUserForm(uid, "token expired. Please login again", false);
            self.progressOffForm(uid);
          }
        });
      },
    }
  });