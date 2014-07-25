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
      $layoutCell = "",
      $uid = "",
      $formId = "";

    return {
      init: function (uid, form_id, layoutCell) {
        $uid = uid;
        $formId = form_id;
        $layoutCell = layoutCell;
        this.tabbarFormFields(uid);
        this.toolbarFormFields(uid);
        this.gridFormFields(uid)
      },
      tabbarFormFields: function (uid) {
        var self = this;
        try {
          $tabbar['form_fields'] = $layoutCell.attachTabbar(FormLayout.conf_tabbar_form);
          $tabbar['form_fields'].attachEvent("onSelect", function (idd, last_id) {
            return true;
          });
        } catch (e) {
          //console.log("tab : " + e.message);
        }
      },
      toolbarFormFields: function (uid) {
        var self = this;

        $toolbar['form_fields'] = $tabbar['form_fields'].cells("selected_fields").attachToolbar(FormLayout.conf_toolbar_form_fields);

        $toolbar['form_fields'].attachEvent("onClick", function (id) {
          if (id == "delete_field") {
            $toolbar['form_fields'].tabs('add_field').active();
            var field_id = $grid['form_fields'].getSelectedRowId();
            self._deletePageField(uid, self.selected_page[uid], field_id);
          }
          if (id == "reorder_fields") {
            var page_id = self.grid_pages[uid].getSelectedRowId();
            self._feedGrid_form_fieldsNormalize(uid, page_id);
          }
        });
      },
      gridFormFields: function (uid) {
        var self = this;
        $grid['form_fields'] = $tabbar['form_fields'].cells("selected_fields").attachGrid(FormLayout.conf_grid_fields);
        $grid['form_fields'].setHeader(FormLayout.conf_grid_fields.headers);
        $grid['form_fields'].setColumnIds(FormLayout.conf_grid_fields.ids);
        $grid['form_fields'].setInitWidths(FormLayout.conf_grid_fields.widths);
        $grid['form_fields'].setColAlign(FormLayout.conf_grid_fields.colaligns);
        $grid['form_fields'].setColTypes(FormLayout.conf_grid_fields.coltypes);
        $grid['form_fields'].setColSorting(FormLayout.conf_grid_fields.colsorting);
        $grid['form_fields'].setDateFormat("%m-%d-%Y");
        $grid['form_fields'].enableDragAndDrop(true);

        $grid['form_fields'].attachEvent("onDrop", function (sId, tId, dId, sObj, tObj, sCol, tCol) {
          self._reOrderPageFields(uid);
          return true;
        });

        /**
         * Description
         * @method rowToDragElement
         * @param {} id
         * @return text
         */
        $grid['form_fields'].rowToDragElement = function (id) {
          //any custom logic here
          var text = "dragging: " + $grid['form_fields'].cells(id, 3).getValue(); // prepare a text string
          return text;
        }

        $grid['form_fields'].attachEvent("onDrag", function (sId, tId, sObj, tObj, sInd, tInd) {
          //console.log("entrei onDrag");
          if (self.selected_page[uid] == null) {
            dhtmlx.message({
              type: "error",
              text: "You need to select a page before adding fields."
            });
            return false;
          }

          if (sObj.object && sObj.object == self.dataView_type_of_fields[uid]) {
            self._addPreDefinedFieldToPage(uid, sId);
            return false;
          }

          if (sObj.object && sObj.object == self.grid_field_propertie_options[uid]) {
            return false;
          }

          if (self.is_grid_pages[uid] == sObj.entBox.id) {
            return false;
          } else {
            //console.log("entrei not grid pages");
            // if not dragging from same grid
            if (sObj != tObj) {
              // if field already exist
              var alreadyExist = false;
              $grid['form_fields'].forEachRow(function (rID) {
                if (rID == sId) alreadyExist = true;
                //console.log( "rID " + rID );
              });
              //console.log("alreadyExist " + alreadyExist);
              // if field already exist - stop
              if (alreadyExist) return false;

              // if is group
              if (sObj && sObj == self.grid_group_fields[uid]) {
                self._addGroupOfFieldsToPage(uid, sId);
                return false;
              } else if (sObj && sObj == self.grid_field_propertie_options[uid]) {
                return false;
              } else // if is library field
              {
                self._addLibraryFieldToPage(uid, sId);
                return false;
              }
            } else {
              //console.log( "sId "+ sId);
              //console.log( "tId "+ tId);
              //console.log("entrei I1m same grid");
              if (typeof tId === 'undefined') {
                return false;
              }
              return true;
            }
          }
        });

        $grid['form_fields'].enableEditEvents(false, false, false);

        $grid['form_fields'].init();

        var type_combo = $grid['form_fields'].getCombo($grid['form_fields'].getColIndexById("type"));
        var mask_combo = $grid['form_fields'].getCombo($grid['form_fields'].getColIndexById("mask_to_use"));

        FormLayout.conf_form_field_propertie.template.forEach(function (field, index, array) {
          if (field.name) {
            if (field.name == "mask_to_use") {
              mask_combo.put("", "na");
              field.options.forEach(function (option, index_option, array_option) {
                if (option.value != "") {
                  //console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
                  //console.log(option.value);
                  //console.log(option.text);
                  mask_combo.put(option.value, option.text);
                }
              });
            } else if (field.name == "type") {
              field.options.forEach(function (option, index_option, array_option) {
                if (option.value != "") {
                  type_combo.put(option.value, option.text);
                }
              });
            }
          }
        });

        //console.log( mask_combo );

        var is_library_combo = $grid['form_fields'].getCombo($grid['form_fields'].getColIndexById("use_library"));
        is_library_combo.put("1", "yes");
        is_library_combo.put("0", "no");

        var required_combo = $grid['form_fields'].getCombo($grid['form_fields'].getColIndexById("required"));
        required_combo.put("1", "yes");
        required_combo.put("0", "no");

        $grid['form_fields'].attachEvent("onXLS", function () {
          //self.progressOn(uid);
        });
        $grid['form_fields'].attachEvent("onXLE", function () {
          //self.progressOff(uid);
        });

        $grid['form_fields'].attachEvent("onRowSelect", function (id, ind) {
          try {
            self.pop_up_grid_field_propertie_options[uid].hide()
          } catch (e) {};
          self._layout_field_propertie(uid);
          self._form_field_propertie(uid, id);
          self._toolbar_grid_field_propertie_options(uid);
          self._grid_field_propertie_options(uid);
          self.toolbar_form_fields[uid].enableItem("edit_field");
          self.toolbar_form_fields[uid].enableItem("delete_field");

          self._feedGrid_grid_field_propertie_options(uid, self.grid_pages[uid].getSelectedRowId(), id);
        });

        $grid['form_fields'].attachEvent("onEditCell", function (stage, rId, cInd, nValue, oValue) {

          self._layout_field_propertie(uid);
          self._form_field_propertie(uid, rId);
          self._toolbar_grid_field_propertie_options(uid);
          self._grid_field_propertie_options(uid);
          self.toolbar_form_fields[uid].enableItem("edit_field");
          self.toolbar_form_fields[uid].enableItem("delete_field");

          return true;
        });
      },
      _deletePageField: function (uid, page_id, field_id, clientOnly) {
        // ["FormBuilder_1397095841513_3109", 6955, "157103", true]
        var self = this;
        //console.log("-----------------------------------------------");
        //console.log(arguments);

        for (var x = 0; x < self._getPageColumnList(uid, page_id, "first").length; x++) {
          var field = self._getPageColumnList(uid, page_id, "first")[x];

          if (typeof field.field_id === 'undefined') continue;

          if (field.field_id.toString() == field_id.toString()) {
            self.progressOnForm(uid);
            var form_id = self.form_properties[uid].getItemValue("form_id");
            var found_field_index = x;

            if (clientOnly) {
              //console.log("-----------------------------------------------");
              //console.log("clientOnly");
              self._setStatusDataTransferForm(uid, "trying to move field(" + field_id + ")", true);
              $grid['form_fields'].deleteRow(field_id);
              self._getPageColumnList(uid, page_id, "first").splice(found_field_index, 1);
              self.toolbar_form_fields[uid].disableItem("edit_field");
              self.toolbar_form_fields[uid].disableItem("delete_field");
              self.tabbar_form_create_fields[uid].hideTab("field_properties");
              if (self.form_field_propertie[uid]) {
                self.form_field_propertie[uid].unload();
                self.form_field_propertie[uid] = null;
              }

              self._feedGrid_form_fieldsNormalize(uid, page_id);
            } else {
              self._setStatusDataTransferForm(uid, "trying to delete field(" + field_id + ")", true);
              CAIRS.MAP.API.del({
                resource: "/forms/" + form_id + "/pages/" + page_id + "/fields/" + field_id // mandatory
                ,
                format: "json" // json, yaml, xml. Default: json. Not mandatory
                ,
                payload: "agency_id=" + self.configuration[uid.replace(new RegExp("_" + form_id, "g"), "")].agency_id + "",
                /**
                 * Description
                 * @method onSuccess
                 * @param {} request
                 * @return
                 */
                onSuccess: function (request) // not mandatory
                {
                  var json = eval('(' + request.response + ')');
                  dhtmlx.message({
                    type: "error",
                    text: "field(" + field_id + ") deleted"
                  });
                  self._setStatusDataTransferForm(uid, "field(" + field_id + ") deleted");

                  $grid['form_fields'].deleteRow(field_id);
                  self._getPageColumnList(uid, page_id, "first").splice(found_field_index, 1);

                  self.toolbar_form_fields[uid].disableItem("edit_field");
                  self.toolbar_form_fields[uid].disableItem("delete_field");
                  self.tabbar_form_create_fields[uid].hideTab("field_properties");
                  if (self.form_field_propertie[uid]) {
                    self.form_field_propertie[uid].unload();
                    self.form_field_propertie[uid] = null;
                  }

                  window.setTimeout(function () {
                    var page_id = self.grid_pages[uid].getSelectedRowId();
                    self._feedGrid_form_fieldsNormalize(uid, page_id);
                  }, 500);

                  self.progressOffForm(uid);

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
                  self._setStatusDataTransferForm(uid, "field(" + field_id + ") not deleted");
                  self.progressOffForm(uid);
                }
              });
            }

          }
        }

        if (self.pages[uid][page_id].page_layout == "D") {
          for (var x = 0; x < self._getPageColumnList(uid, page_id, "second").length; x++) {
            var field = self._getPageColumnList(uid, page_id, "second")[x];

            if (typeof field.field_id === 'undefined') continue;

            if (field.field_id.toString() == field_id.toString()) {
              self.progressOnForm(uid);
              self._setStatusDataTransferForm(uid, "trying to delete field(" + field_id + ")", true);
              var form_id = self.form_properties[uid].getItemValue("form_id");
              var found_field_index = x;

              if (clientOnly) {
                //console.log("-----------------------------------------------");
                //console.log("clientOnly");
                self._setStatusDataTransferForm(uid, "trying to move field(" + field_id + ")", true);
                $grid['form_fields'].deleteRow(field_id);
                self._getPageColumnList(uid, page_id, "second").splice(found_field_index, 1);
                self.toolbar_form_fields[uid].disableItem("edit_field");
                self.toolbar_form_fields[uid].disableItem("delete_field");
                self.tabbar_form_create_fields[uid].hideTab("field_properties");
                if (self.form_field_propertie[uid]) {
                  self.form_field_propertie[uid].unload();
                  self.form_field_propertie[uid] = null;
                }

                self._feedGrid_form_fieldsNormalize(uid, page_id);
              } else {
                self._setStatusDataTransferForm(uid, "trying to delete field(" + field_id + ")", true);
                CAIRS.MAP.API.del({
                  resource: "/forms/" + form_id + "/pages/" + page_id + "/fields/" + field_id // mandatory
                  ,
                  format: "json" // json, yaml, xml. Default: json. Not mandatory
                  ,
                  payload: "agency_id=" + self.configuration[uid.replace(new RegExp("_" + form_id, "g"), "")].agency_id + "",
                  /**
                   * Description
                   * @method onSuccess
                   * @param {} request
                   * @return
                   */
                  onSuccess: function (request) // not mandatory
                  {
                    var json = eval('(' + request.response + ')');
                    dhtmlx.message({
                      type: "error",
                      text: "field(" + field_id + ") deleted"
                    });
                    self._setStatusDataTransferForm(uid, "field(" + field_id + ") deleted");

                    $grid['form_fields'].deleteRow(field_id);
                    self._getPageColumnList(uid, page_id, "second").splice(found_field_index, 1);

                    self.toolbar_form_fields[uid].disableItem("edit_field");
                    self.toolbar_form_fields[uid].disableItem("delete_field");
                    self.tabbar_form_create_fields[uid].hideTab("field_properties");
                    if (self.form_field_propertie[uid]) {
                      self.form_field_propertie[uid].unload();
                      self.form_field_propertie[uid] = null;
                    }

                    self._reOrderPageFields(uid);

                    self.progressOffForm(uid);

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
                    self._setStatusDataTransferForm(uid, "field(" + field_id + ") not deleted");
                    self.progressOffForm(uid);
                  }
                });
              }

            }
          }
        }
      }
    }
  });