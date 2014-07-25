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
      $formId = "",
      $selectedPageId = "";
    return {
      init: function (uid, form_id, layoutCell) {
        $uid = uid;
        $formId = form_id;
        $layoutCell = layoutCell;
        this.gridPages();
        this.toolbarForPages(uid);
        this.popUpFormPages(uid, form_id);
      },
      gridPages: function () {
        var self = this;
        $grid['grid_pages'] = $layoutCell.attachGrid(FormLayout.conf_grid_pages);
        $grid['grid_pages'].setHeader(FormLayout.conf_grid_pages.headers);
        $grid['grid_pages'].setColumnIds(FormLayout.conf_grid_pages.ids);
        $grid['grid_pages'].setInitWidths(FormLayout.conf_grid_pages.widths);
        $grid['grid_pages'].setColAlign(FormLayout.conf_grid_pages.colaligns);
        $grid['grid_pages'].setColTypes(FormLayout.conf_grid_pages.coltypes);
        $grid['grid_pages'].setColSorting(FormLayout.conf_grid_pages.colsorting);
        $grid['grid_pages'].selMultiRows = true;
        $grid['grid_pages'].setDateFormat("%m-%d-%Y");
        $grid['grid_pages'].enableDragAndDrop(true);
        $grid['grid_pages'].enableEditEvents(false, false, false);
        $grid['grid_pages'].init();

        var layout_combo = $grid['grid_pages'].getCombo($grid['grid_pages'].getColIndexById("page_layout"));
        layout_combo.put("S", "single");
        layout_combo.put("D", "double");
        this.gridPageEvents();
      },
      gridPageEvents: function () {
        $grid['grid_pages'].attachEvent("onXLS", function () {
          $grid['grid_pages'].progressOn();
        });
        $grid['grid_pages'].attachEvent("onXLE", function () {
          $grid['grid_pages'].progressOff();
        });
        $grid['grid_pages'].attachEvent("onRowSelect", function (id, ind) {
          $selectedPageId = id;
        });
        // $grid['grid_pages'].attachEvent("onRowSelect", function (id, ind) {
        //   try {
        //     self.pop_up_grid_field_propertie_options[uid].hide()
        //   } catch (e) {};
        //   $layout['layout_form_layout_left'].cells("b").expand();
        //   $toolbar['form_pages'].enableItem("delete_page");
        //   $toolbar['form_pages'].enableItem("edit_page");

        //   self.setPageStatusInfo(uid, "selected page: " + $grid['grid_pages'].cells(id, "0").getValue());

        //   self.selected_page[uid] = id;

        //   try {
        //     self.layout_field_propertie[uid].cells("b").collapse();
        //   } catch (e) {};

        //   try {
        //     $tabbar['create_fields'].setTabActive("add_field");
        //     $tabbar['create_fields'].hideTab("field_properties");
        //     self.tabbar_form_add_field[uid].setTabActive("predefined_fields");
        //   } catch (e) {};

        //   self._feedGrid_form_fields(uid, id);
        // });
        $grid['grid_pages'].rowToDragElement = function (id) {
          //any custom logic here
          var text = "dragging: " + $grid['grid_pages'].cells(id, 0).getValue(); // prepare a text string
          return text;
        }

        $grid['grid_pages'].attachEvent("onDrop", function (sId, tId, dId, sObj, tObj, sCol, tCol) {
          self._reOrderPages(uid);
          return true;
        });

        $grid['grid_pages'].attachEvent("onDrag", function (sId, tId, sObj, tObj, sInd, tInd) {

          if (typeof sObj.entBox === 'undefined')
            return false;

          if (tObj.entBox.id == sObj.entBox.id)
            return true;
          else if (tId && sObj === self.grid_form_fields[uid]) {
            if (tId == self.selected_page[uid])
              return false;

            var form_id = self.form_properties[uid].getItemValue("form_id");
            var page_id_target = tId;
            var field_id = sId;
            var field = self._getPageField(uid, self.selected_page[uid], field_id);
            var old_list = field.list;
            var old_options = field.options;
            var allOptionsID = [];
            var thereIsList = false;

            self.layout_field_propertie[uid].cells("b").collapse();

            field.page_id = page_id_target;

            for (var position in old_list) {
              if (old_list.hasOwnProperty(position)) {
                old_list[position]["page_id"] = page_id_target;
                allOptionsID.push(old_list[position]["option_id"]);
                thereIsList = true;
              }
            }

            for (var position in old_options) {
              if (old_options.hasOwnProperty(position)) {
                old_options[position]["page_id"] = page_id_target;
                if (!thereIsList) {
                  allOptionsID.push(old_options[position]["option_id"]);
                }
              }
            }

            self._deletePageField(uid, self.selected_page[uid], field_id, true);

            var type_MAP_standard = field["type_standard"];
            var type_DHTMLX_standard = field["type"];

            field["type_standard"] = type_DHTMLX_standard;
            field["type"] = type_MAP_standard;
            field["page_id"] = page_id_target;
            field["index"] = self._getPageFieldsNumber(uid, page_id_target);
            field["grouping"] = field["index"];

            Common.progressOn();

            self._putFieldOnMemory(uid, page_id_target, field, function () {
              var field = self._getPageField(uid, page_id_target, field_id);
              field["page_id"] = page_id_target;
              field["field_id"] = field_id;

              delete field["type"];
              delete field["type_standard"];

              self.progressOnForm(uid);

              self._editFieldOfAPage(uid, field, function () {
                self._getPageField(uid, page_id_target, field_id)["type"] = type_DHTMLX_standard;

                if (!allOptionsID.length > 0) return;

                self.progressOnForm(uid);
                CAIRS.MAP.API.update({
                  resource: "/forms/" + form_id + "/pages/" + page_id_target + "/fields/" + field_id + "/options/" + allOptionsID.join(),
                  format: "json",
                  payload: "hash=" + JSON.stringify({
                    page_id: page_id_target
                  }),
                  /**
                   * Description
                   * @method onSuccess
                   * @param {} request
                   * @return
                   */
                  onSuccess: function (request) {
                    var json = eval('(' + request.response + ')');
                    if (json.status == "success") {
                      self._setStatusDataTransferForm(uid, "options(" + allOptionsID.join() + ") updated");
                      self._getPageField(uid, page_id_target, field_id)["list"] = old_list;
                      self._getPageField(uid, page_id_target, field_id)["options"] = old_options;
                      self._startPreview(uid);
                      self.progressOffForm(uid);
                    } else {
                      dhtmlx.message({
                        type: "error",
                        text: "option don't updated. reason: " + json.response
                      });
                      self._setStatusDataTransferForm(uid, "option don't updated");
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
                    self._setStatusDataTransferForm(uid, "option don't updated");
                    if (json.response == "token not authorized")
                      self._setStatusUserForm(uid, "token expired. Please login again", false);
                    self.progressOffForm(uid);
                  }
                });

                //self.grid_form_fields[ uid ].deleteRow(field_id);
                //self._reOrderPageFields( uid );
              });

            }, true);

            return false;
          } else
            return false;
        });

        $grid['grid_pages'].attachEvent("onDragIn", function (sid, tid, sgrid, tgrid) {

          if (typeof sgrid.entBox === 'undefined') {
            return false;
          }

          //console.log(sgrid.entBox.id);
          //console.log(tgrid.entBox.id);
          self.is_grid_pages[uid] = sgrid.entBox.id;
          //console.log("grid page is: " + sgrid.entBox.id);
          return true;
        });

        $grid['grid_pages'].attachEvent("onEditCell", function (stage, rId, cInd, nValue, oValue) {
          if (stage == 2) {
            if (cInd == $grid['grid_pages'].getColIndexById("pagename")) {
              self._changePageName(uid, rId, nValue);
            }
          }
          return true;
        });

        $grid['grid_pages'].attachEvent("onRowDblClicked", function (id, ind) {
          $popup['add_edit_page'].show("edit_page");
        });

        $grid['grid_pages'].attachEvent("onKeyPress", function (code, cFlag, sFlag) {
          if (code == 46) {
            self._deletePage(uid);
          }
          return true;
        });

        $grid['grid_pages'].attachEvent("onEnter", function (id, ind) {
          $popup['add_edit_page'].show("edit_page");
          return true;
        });
      },
      toolbarForPages: function (uid, form_id) {
        var self = this;

        $toolbar['form_pages'] = $layoutCell.attachToolbar(FormLayout.conf_toolbar_form_pages);

        $toolbar['form_pages'].attachEvent("onClick", function (id) {
          if (id == "delete_page") {
            self._deletePage(uid);
          } else if (id == "undock_form_preview") {
            self._startPreview(uid);
            self.layout_form_preview[uid].cells("a").undock();
          }
        });
      },
      popUpFormPages: function (uid, form_id) {
        var self = this;
        $popup['add_edit_page'] = new dhtmlXPopup({
          toolbar: $toolbar['form_pages'],
          id: ["add_page", "edit_page"]
        });


        $popup['add_edit_page'].attachEvent("onShow", function (id) {
          //console.log(id);
          $popup['add_edit_page'].clear();
          $form['form_pages'] = $popup['add_edit_page'].attachForm(FormLayout.conf_form_form_pages.template);
          //CAIRS.dhtmlx.prepareForm(uid, FormLayout.conf_form_form_pages, $form['form_pages']);

          if (id == "add_page") {
            try {
              self._formFormPages(uid, false, form_id);
            } catch (e) {
              //console.log(e.stack)
            };
          } else if (id == "edit_page") {
            try {
              self._formFormPages(uid, true, form_id);
            } catch (e) {
              //console.log(e.stack)
            };
          }

        });
      },
      _formFormPages: function (uid, isEditing, form_id) {
        var self = this;
        isEditing = isEditing || false
        var page_id = $grid['grid_pages'].getSelectedRowId();

        // $form['form_pages'] = $popup['add_edit_page'].attachForm(FormLayout.conf_form_form_pages.template);
        // CAIRS.dhtmlx.prepareForm(uid, FormLayout.conf_form_form_pages, $form['form_pages']);

        if (isEditing) {

          var hash = {};

          FormLayout.conf_grid_pages.ids.split(",").forEach(function (id, index, array_) {
            hash[id] = $grid['grid_pages'].cells(page_id, index).getValue();
          });

          //console.log(hash);

          $form['form_pages'].setFormData(hash);

          $form['form_pages'].addItem(null, {
            type: "button",
            name: "edit",
            offsetLeft: 149,
            value: "save the page"
          }, 20);
        } else {
          $form['form_pages'].setFormData({
            page_layout: "S"
          });

          $form['form_pages'].addItem(null, {
            type: "button",
            name: "add",
            offsetLeft: 149,
            value: "add new page"
          }, 20);
        }

        $form['form_pages'].setFocusOnFirstActive();
        this._formFormPageEvents(uid, form_id);
      },
      _formFormPageEvents: function (uid, form_id) {
        $form['form_pages'].attachEvent("onButtonClick", function (name) {
          if (name == "add") {

            if (CAIRS.dhtmlx.validateForm(uid, $form['form_pages'])) {
              var hash = $form['form_pages'].getFormData();
              hash["uid"] = uid;
              //  hash["form_id"] = self.form_properties[uid].getItemValue("form_id");
              hash["form_id"] = form_id;
              hash["page_id"] = null;
              $form['form_pages'].lock();
              self._addPage(hash, function () {
                $popup['add_edit_page'].hide();
                $form['form_pages'].unlock();
              });
            }
          } else if (name == "edit") {
            //console.log(  self._getPageOnModel( uid, page_id) );
            if (CAIRS.dhtmlx.validateForm(uid, $form['form_pages'])) {
              var hash = $form['form_pages'].getFormData();
              hash["uid"] = uid;
              hash["page_id"] = $grid['grid_pages'].getSelectedRowId();
              $form['form_pages'].lock();
              self._editPage(hash, function () {
                $popup['add_edit_page'].hide();
                $form['form_pages'].unlock();
              }, form_id);
            }
          }
        });
      },
      _addPage: function (pageConfiguration, callBack) {
        var self = this,
          uid = pageConfiguration.uid,
          pagename = pageConfiguration.pagename || "",
          page_id = pageConfiguration.page_id || null,
          page_layout = pageConfiguration.page_layout || "S",
          tab_width = pageConfiguration.tab_width || "100",
          form_id = pageConfiguration.form_id || null,
          record = [],
          pageJSON = null;

        if (page_layout == "S") {
          pageJSON = {
            type: "block",
            width: self.form_default_width,
            offsetLeft: 0,
            id: page_id,
            label: pagename,
            page_id: page_id,
            pagename: pagename,
            list: [{
              type: 'block',
              inputWidth: 'auto',
              inputHeight: 'auto',
              name: "column_1",
              list: []
            }],
            index: 0,
            page_layout: page_layout,
            tab_width: tab_width + "px"
          };
        } else if (page_layout == "D") {
          pageJSON = {
            type: "block",
            width: self.form_default_width,
            offsetLeft: 0,
            id: page_id,
            label: pagename,
            page_id: page_id,
            pagename: pagename,
            list: [{
              type: 'block',
              inputWidth: 'auto',
              inputHeight: 'auto',
              name: "column_1",
              list: []
            }, {
              type: "newcolumn",
              offset: 10
            }, {
              type: 'block',
              inputWidth: 'auto',
              inputHeight: 'auto',
              name: "column_2",
              list: []
            }],
            index: 0,
            page_layout: page_layout,
            tab_width: tab_width + "px"
          };
        }

        //console.log( "--------------------------------------" );
        //console.log( page_id );

        if (page_id == null) {
          //console.log( "db also" );
          pageConfiguration["index"] = self.grid_pages[uid].getRowsNum();
          pageJSON["index"] = pageConfiguration["index"];

          page_id = null;
          record.push(pagename);
          record.push(page_layout);
          record.push(tab_width);
          record.push(pageJSON["index"]);

          self._setStatusDataTransferForm(uid, "requesting pages data", true);
          self.progressOnForm(uid);
          CAIRS.MAP.API.insert({
            resource: "/forms/" + form_id + "/pages" // mandatory
            ,
            format: "json" // json, yaml, xml. Default: json. Not mandatory
            ,
            payload: "hash=" + JSON.stringify(pageConfiguration) // mandatory for PUT and POST
            ,
            /**
             * Description
             * @method onSuccess
             * @param {} request
             * @return
             */
            onSuccess: function (request) {
              var json = eval('(' + request.response + ')');
              if (json.status == "success") {
                //dhtmlx.message( {type : "error", text : json.response} );
                self._setStatusDataTransferForm(uid, "pages data received");

                page_id = json.page_id;

                pageJSON["page_id"] = page_id;
                pageJSON["id"] = page_id;

                self.grid_pages[uid].addRow(page_id, record);
                self._putEmptyPageOnMemory(uid, pageJSON);
                //self.grid_pages[ uid ].cells(page_id, self.grid_pages[ uid ].getColIndexById( "index" )).setValue( pageConfiguration[ "index" ] );

                if (self.grid_pages[uid].getRowsNum() == 1)
                  self.setPageStatusInfo(uid, "page " + pagename + " added");

                if (callBack) callBack();

                self.progressOffForm(uid);

              } else {
                dhtmlx.message({
                  type: "error",
                  text: "Page not addedd. reason: " + json.response
                });
                self._setStatusDataTransferForm(uid, "unable to get pages data");
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
                text: "Page not addedd. reason: " + json.response
              });
              self._setStatusDataTransferForm(uid, "unable to get pages data");
              if (json.response == "token not authorized")
                self._setStatusUserForm(uid, "token expired. Please login again", false);
              self.progressOffForm(uid);
            }
          });
        } else {
          //console.log( "only memory" );
          pageJSON["index"] = pageConfiguration["index"];

          record.push(pagename);
          record.push(page_layout);
          record.push(tab_width);
          record.push(pageConfiguration["index"]);

          self.grid_pages[uid].addRow(page_id, record);
          self._putEmptyPageOnMemory(uid, pageJSON);
          //self.grid_pages[ uid ].cells(page_id, self.grid_pages[ uid ].getColIndexById( "index" )).setValue( pageConfiguration[ "index" ] );

          if (self.grid_pages[uid].getRowsNum() == 1)
            self.setPageStatusInfo(uid, "page " + pagename + " added");

          if (callBack) callBack();

          //self.progressOffForm( uid );
        }
      },
      editPage: function (pageConfiguration, callBack, form_id) {
        var self = this,
          uid = pageConfiguration.uid,
          pagename = pageConfiguration.pagename || "",
          page_id = pageConfiguration.page_id || null,
          page_layout = pageConfiguration.page_layout || "S",
          tab_width = pageConfiguration.tab_width || "100";
        self._setStatusDataTransferForm(uid, "posting page hash", true);
        if (page_id != null) {
          form_id = self.form_properties[uid].getItemValue("form_id");
          CAIRS.MAP.API.update({
            resource: "/forms/" + form_id + "/pages/" + page_id // mandatory
            ,
            format: "json" // json, yaml, xml. Default: json. Not mandatory
            ,
            payload: "hash=" + JSON.stringify(pageConfiguration) // mandatory for PUT and POST
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
                //dhtmlx.message( {type : "error", text : json.response} );
                self._setStatusDataTransferForm(uid, "page hash saved");
                // --- client
                // update page properties
                for (var property in pageConfiguration) {
                  if (pageConfiguration.hasOwnProperty(property)) {
                    var colIndex = self.grid_pages[uid].getColIndexById(property);
                    if (CAIRS.isNumber(colIndex)) {
                      if (colIndex >= 0) {
                        if (property == "pagename") {
                          self._getPageOnModel(uid, page_id)["label"] = pageConfiguration[property];
                          self._getPageOnModel(uid, page_id)[property] = pageConfiguration[property];
                        } else if (property == "list" || property == "options") {
                          console.log("-------------->>>> entered on " + property);
                        } else {
                          self._getPageOnModel(uid, page_id)[property] = pageConfiguration[property];
                        }
                        self.grid_pages[uid].cells(page_id, colIndex).setValue(pageConfiguration[property]);
                      }
                    }
                  }
                }
                // update page properties

                // get all fields of the page
                var fieldsList = [];
                self._getPageColumnList(uid, page_id, "first").forEach(function (field, index, array) {
                  fieldsList.push(field);
                });
                if (typeof self._getPageColumnList(uid, page_id, "second") !== 'undefined') {
                  self._getPageColumnList(uid, page_id, "second").forEach(function (field, index, array) {
                    fieldsList.push(field);
                  });
                }
                // get all fields of the page

                console.log("-------------->>>> fieldsList");
                console.log(fieldsList);

                if (page_layout == "S") {
                  self._getPageOnModel(uid, page_id).list = [];
                  self._getPageOnModel(uid, page_id).list = [{
                    type: 'block',
                    inputWidth: 'auto',
                    inputHeight: 'auto',
                    name: "column_1",
                    list: fieldsList
                  }];
                } else {
                  self._getPageOnModel(uid, page_id).list = [];

                  var column_1 = {
                    type: 'block',
                    inputWidth: 'auto',
                    inputHeight: 'auto',
                    name: "column_1",
                    list: []
                  };
                  var column_2 = {
                    type: 'block',
                    inputWidth: 'auto',
                    inputHeight: 'auto',
                    name: "column_2",
                    list: []
                  };


                  for (var x = 0; x < fieldsList.length; x++) {
                    var field = fieldsList[x];
                    if ((x % 2) == 0) {
                      column_1.list.push(field);
                    } else {
                      column_2.list.push(field);
                    }
                  }





                  self._getPageOnModel(uid, page_id).list.push(column_1);
                  self._getPageOnModel(uid, page_id).list.push({
                    type: "newcolumn",
                    offset: 10
                  });
                  self._getPageOnModel(uid, page_id).list.push(column_2);


                  //self._getPageOnModel(uid, page_id).list = [];

                  // restart count added fields
                  /*self.totalAddedFields[page_id] = 0;

              fieldsList.forEach(function (field, index, array) {
                self._putFieldOnMemory(uid, self.selected_page[uid], field, function () {
                  self._startPreview(uid);
                }, true);
              });*/
                  //console.log( fieldsList );
                }
                //console.log( self._getPageOnModel( uid, page_id) );
                if (callBack) callBack();
                // --- client

                self.progressOffForm(uid);
              } else {
                dhtmlx.message({
                  type: "error",
                  text: "Page don't saved. reason: " + json.response
                });
                self._setStatusDataTransferForm(uid, "unable to save page");
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
                text: "Page don't saved. reason: " + json.response
              });
              self._setStatusDataTransferForm(uid, "unable to save page");
              if (json.response == "token not authorized")
                self._setStatusUserForm(uid, "token expired. Please login again", false);
              self.progressOffForm(uid);
            }
          });
        }
      },
      _reOrderPages: function (uid) {
        var self = this,
          form_id = self.form_properties[uid].getItemValue("form_id"),
          hash = null;

        self.progressOnForm(uid);

        var orderingArray = [];
        self.grid_pages[uid].forEachRow(function (rID) {
          //self.grid_pages[ uid ].cells(rID, self.grid_pages[ uid ].getColIndexById( "index" )).setValue( self.grid_pages[ uid ].getRowIndex( rID ) );
          //self._getPageOnModel( uid, rID)[ "index" ] = self.grid_pages[ uid ].getRowIndex( rID );
          var objOrdering = {};
          objOrdering["item_id"] = rID;
          objOrdering["index"] = self.grid_pages[uid].getRowIndex(rID);
          orderingArray.push(objOrdering);
        });

        hash = {
          ordering_column_name: "index",
          data: orderingArray
        };

        if (orderingArray.length >= 0) {
          self._setStatusDataTransferForm(uid, "ordering " + orderingArray.length + " pages", true);
          CAIRS.MAP.API.post({
            resource: "/forms/" + form_id + "/pages/order" // mandatory
            ,
            format: "json" // json, yaml, xml. Default: json. Not mandatory
            ,
            payload: "hash=" + JSON.stringify(hash) // mandatory for PUT and POST
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
                //dhtmlx.message( {type : "error", text : json.response} );
                self._setStatusDataTransferForm(uid, "" + orderingArray.length + " pages ordered");

                self.grid_pages[uid].forEachRow(function (rID) {
                  self.grid_pages[uid].cells(rID, self.grid_pages[uid].getColIndexById("index")).setValue(self.grid_pages[uid].getRowIndex(rID));
                  self._getPageOnModel(uid, rID)["index"] = self.grid_pages[uid].getRowIndex(rID);
                });

                self.progressOffForm(uid);
              } else {

                dhtmlx.message({
                  type: "error",
                  text: "Pages wasn't ordered. reason: " + json.response
                });
                self._setStatusDataTransferForm(uid, "pages wasn't ordered");
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
                text: "Pages wasn't ordered. reason: " + json.response
              });
              self._setStatusDataTransferForm(uid, "pages wasn't ordered");
              if (json.response == "token not authorized")
                self._setStatusUserForm(uid, "token expired. Please login again", false);
              self.progressOffForm(uid);
            }
          });
        }
      },
    }
  });