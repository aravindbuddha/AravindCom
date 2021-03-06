var Relation = (function() {
  var
    uid = "",
    com_name = "Relation",
    config = {},
    window_manager = null,
    //dhtmlx widgets
    win = {},
    status_bar = {},
    layout = {},
    grid = {},
    form = {},
    toolbar = {};
  //internal usage
  var
    coup_names = "",
    is_add_edit_form_edited = false,
    is_edit_mode = false,
    is_edited = false,
    spouse_contact_id = null;

  // Public functions
  return {
    /**
     * [build a dhtmlx window along with a 1C layout and a status bar]
     * @param  {string} _name  [Name fo the window,layout,statusbar ]
     * @param  {json} opt   [pass window model]
     */
    build_window: function(_name, opt) {
      var self = this;
      _name = _name || com_name;
      //set default values form model if not opt exists
      var opt = opt || {};
      opt.left = opt.left || self.Model.defaults.window.left;
      opt.top = opt.top || self.Model.defaults.window.top;
      opt.width = opt.width || self.Model.defaults.window.width;
      opt.height = opt.height || self.Model.defaults.window.height;
      opt.title = opt.title || self.Model.defaults.window.title;
      opt.pattern = opt.pattern || self.Model.defaults.window.layout_pattern;
      opt.icon = opt.icon || self.Model.defaults.window.icon;
      opt.icon_dis = opt.icon_dis || self.Model.defaults.window.icon_dis;

      //check if the window manager object on config
      if (config.window_manager_obj) {
        window_manager = config.window_manager_obj;
      } else {
        if (window_manager === null) {
          window_manager = new dhtmlXWindows();
        }
      }

      window_manager.setImagePath(self.Model.conf_window.image_path);

      if (window_manager.isWindow(_name)) {
        win[_name].show();
        win[_name].bringToTop();
        win[_name].center();
        return;
      }
      win[_name] = window_manager.createWindow(_name, opt.left + 10, opt.top + 10, opt.width, opt.height);
      win[_name].setText(opt.title);
      win[_name].setIcon(opt.icon, opt.icon_dis);
      win[_name].center();
      win[_name].denyPark();
      win[_name].denyResize();

      win[_name].button('park').hide();
      win[_name].button('minmax1').hide();
      // Events on Windows
      win[_name].attachEvent("onClose", function(win) {
        return true;
      });
      status_bar[_name] = win[_name].attachStatusBar();
      layout[_name] = win[_name].attachLayout(opt.pattern);
      layout[_name].cells("a").hideHeader();
      layout[_name].progressOn();
    },
    /**
     * [Build dhtmlx grid]
     * @param  {string} _name [name of the gird]
     * @param  {[type]} opt   [grid json]
     */
    build_grid: function(_name, opt) {
      var self = this;
      _name = _name || com_name;
      grid[_name] = layout[_name].cells("a").attachGrid(opt);
      grid[_name].setHeader(opt.headers);
      grid[_name].setColumnIds(opt.ids);
      grid[_name].setInitWidths(opt.widths);
      grid[_name].setColAlign(opt.colaligns);
      grid[_name].setColTypes(opt.coltypes);
      grid[_name].setColSorting(opt.colsorting);
      grid[_name].selMultiRows = false;
      grid[_name].enableAutoWidth(true);
      grid[_name].enableMultiselect(true);
      grid[_name].enableMultiline(true);
      grid[_name].enableAlterCss("even", "uneven");
      grid[_name].setDateFormat("%m-%d-%Y");
      grid[_name].setColumnsVisibility(opt.visibility);
      grid[_name].init();
    },
    /**
     * [_layout]
     * @param  {[string]} _name [name of the layout]
     */
    _layout: function(_name) {
      var self = this;
      _name = _name || com_name;
      layout[_name] = new dhtmlXLayoutObject(config.parent_div_id, opt.pattern);
      layout[_name].cells("a").hideHeader();
      layout[_name].progressOn();
    },
    _window_extend: function(_name) {
      win[_name].setText("Relationship for " + coup_names);
    },
    /**
     * [build main toolbar]
     * @param  {[type]} _name [name of the toolbar]
     * @return {[type]}       [description]
     */
    _toolbar: function(_name) {
      var self = this;
      _name = _name || com_name;
      toolbar[_name] = layout[_name].cells("a").attachToolbar(self.Model.conf_toolbar);
      toolbar[_name].setSkin(self.Model.globalSkin);
      toolbar[_name].disableItem("delete_relation");
      toolbar[_name].disableItem("edit_relation");
      this._toolbar_events();
    },
    /**
     * [Events on main toolbar]
     * @param  {[string]} _name [description]
     * @return {[type]}       [description]
     */
    _toolbar_events: function(_name) {
      var self = this,
        relation_get_ds = self.Data.store("relation_get");
      _name = _name || com_name;
      toolbar[_name].attachEvent("onClick", function(id) {
        if (id == "add_relation") {
          self.build_window("Add_Edit", self.Model.new_window);
          self._window_add_edit_extend("Add_Edit");
          self._toolbar_add_edit("Add_Edit");
          self._form_add_edit("Add_Edit", false);
        }
        if (id == "edit_relation") {
          var
            grid_id = grid[com_name].getSelectedRowId();
          grid_id = grid_id.split(',');
          if (grid_id.length > 1) {
            dhtmlx.alert({
              text: "Please select one row only"
            });
            return;
          }
          self.build_window("Add_Edit", self.Model.edit_window);
          self._window_add_edit_extend("Add_Edit");
          self._toolbar_add_edit("Add_Edit");
          self._form_add_edit("Add_Edit", true);
        }
        if (id == "delete_relation") {
          var
            count = 0,
            selected_row_ids = grid[_name].getSelectedRowId();
          selected_row_ids = selected_row_ids.split(',');
          count = selected_row_ids.length;
          selected_row_ids.forEach(function(row_id) {
            var data = {
              contact_id: config.contact_id,
              relation_id: row_id
            };
            relation_get_ds.remove(row_id);
            win[com_name].progressOn();
            dhtmlxAjax.post(self.Data.end_point.relation_del, "data=" + JSON.stringify(data), function() {
              count--;
              if (!count) {
                win[com_name].progressOff();
              }
            });
          });
        }
      });
    },
    _window_add_edit_extend: function(_name) {
      win[_name].setText(coup_names + " new Relationship")
      win[_name].button("close").attachEvent("onClick", function(win) {

        if (is_edited == true) {
          dhtmlx.confirm({
            //title: "Alert",
            type: "confirm",
            text: "Are you sure? you have unsaved changes",
            ok: "Yes",
            cancel: "No",
            callback: function(val) {
              if (val) {
                win.close();
                return true;
              }
              return false;
            }
          });
        } else {
          win.close();
        }

      });
    },
    /**
     * [_grid ]
     * @param  {[type]} _name [description]
     * @return {[type]}       [description]
     */
    _grid: function(_name) {
      var self = this;
      _name = _name || com_name;
      self.build_grid(_name, self.Model.conf_grid);
      var grid_relation_ds = self.Data.store("relation_get");

      grid[_name].sync(grid_relation_ds, {
        select: true
      });
      //Check if data is loaded for displaying
      if (!grid_relation_ds.isVisible()) {
        grid_relation_ds.attachEvent("onXLE", function() {
          layout[_name].progressOff();
          self.set_status(_name, "Ready to use");
        });
      } else {
        layout[_name].progressOff();
        self.set_status(_name, "Ready to use");

      }
      self._grid_events(_name);
    },
    /**
     * [_grid_events description]
     * @param  {[type]} _name [description]
     * @return {[type]}       [description]
     */
    _grid_events: function(_name) {
      var self = this;
      grid[_name].attachEvent("onRowDblClicked", function(rowId, cellInd) {
        self.build_window("Add_Edit", self.Model.edit_window);
        self._toolbar_add_edit("Add_Edit");
        self._form_add_edit("Add_Edit", true);
      });
      grid[_name].attachEvent("onEnter", function(rowId, cellInd) {
        self.build_window("Add_Edit", self.Model.edit_window);
        self._toolbar_add_edit("Add_Edit");
        self._form_add_edit("Add_Edit", true);
      });
      grid[_name].attachEvent("onRowSelect", function(rowId, cellInd) {
        toolbar[_name].enableItem("delete_relation");
        toolbar[_name].enableItem("edit_relation");
      });
    },
    /**
     * [_toolbar_add_edit description]
     * @param  {[type]} _name [description]
     * @return {[type]}       [description]
     */
    _toolbar_add_edit: function(_name) {
      var self = this;
      _name = _name || com_name;
      toolbar[_name] = layout[_name].cells("a").attachToolbar(self.Model.edit_toolbar);
      toolbar[_name].setSkin(self.Model.globalSkin);
      //toolbar[_name].disableItem("import_relation");
      self._toolbar_add_edit_couple_check(_name);
      this._toolbar_add_edit_events(_name);
    },
    /**
     * [_toolbar_add_edit_couple_check description]
     * @param  {[type]} _name [description]
     * @return {[type]}       [description]
     */
    _toolbar_add_edit_couple_check: function(_name) {
      var self = this;
      var data = {
        contact_id: config.contact_id
      };
      if (spouse_contact_id != null) {
        toolbar[_name].enableItem("import_relation");
      } else {
        dhtmlxAjax.post(self.Data.end_point.spouse_contact_id, "data=" + JSON.stringify(data), function(loader) {
          var json = JSON.parse(loader.xmlDoc.responseText);
          if (json.spouse_contact_id) {
            spouse_contact_id = json.spouse_contact_id;
            self.Data._spouse_relation_data_store(spouse_contact_id);
            toolbar[_name].enableItem("import_relation");
          }
        });
      }
    },
    /**
     * [_toolbar_add_edit_events description]
     * @param  {[type]} _name [description]
     * @return {[type]}       [description]
     */
    _toolbar_add_edit_events: function(_name) {
      var
        self = this,
        data = {};

      toolbar[_name].attachEvent("onClick", function(id) {
        if (id == "save_relation") {
          data = {
            contact_id: config.contact_id,
            relation_type_id: form[_name].getCombo("relation_type").getSelectedValue(),
            type: form[_name].getCombo("relation_type").getSelectedText(),
            is_mailing: form[_name].getCombo("is_mailing_relation").getSelectedValue(),
            is_mailing_text: form[_name].getCombo("is_mailing_relation").getSelectedText(),
            relation_1: form[_name].getItemValue("relation_1"),
            relation_2: form[_name].getItemValue("relation_2"),
            city: form[_name].getItemValue("city"),
            zip: form[_name].getItemValue("zip"),
            country_id: form[_name].getCombo("county_text").getSelectedValue(),
            country_text: form[_name].getCombo("county_text").getSelectedText(),
            province_id: form[_name].getCombo("province_text").getSelectedValue(),
            province_text: form[_name].getCombo("province_text").getSelectedText(),
            state_id: form[_name].getCombo("state_text").getSelectedValue(),
            state_text: form[_name].getCombo("state_text").getSelectedText(),
            county_id: form[_name].getCombo("county_text").getSelectedValue(),
            county_text: form[_name].getCombo("county_text").getSelectedText(),
            start_date: form[_name].getCalendar("start_date").getDate(),
            leave_date: form[_name].getCalendar("leave_date").getDate()
          };
          is_edit_mode ? data.relation_id = form[_name].getItemValue("relation_id") : "";

          var relation_get_ds = self.Data.store("relation_get");
          if (self._form_add_edit_validate(_name, data)) {
            layout[_name].progressOn();
            dhtmlxAjax.post(self.Data.end_point.relation_save, "data=" + JSON.stringify(data), function() {
              layout[_name].progressOff();
              relation_get_ds.loadNext();
              if (is_edit_mode) {
                var
                  data_1 = dhtmlx.extend(relation_get_ds.data.item(data.relation_id), data);
                relation_get_ds.update(data_1.id, data_1);
              }
              dhtmlx.alert({
                //type:"alert",
                text: "Saved Successfully!",
                //ok:"Yes",
                callback: function() {
                  win[_name].close();
                }
              });
            });

          }
        }
        if (id == "import_relation") {
          win["Add_Edit"].close();
          self.build_window("Import", self.Model.import_window);
          self._toolbar_import("Import");
          self.set_status("Import", "Loading.....");
          self._grid_import("Import");
        }
      });
    },
    /**
     * [_toolbar_import description]
     * @param  {[type]} _name [description]
     * @return {[type]}       [description]
     */
    _toolbar_import: function(_name) {
      var self = this;
      _name = _name || com_name;
      toolbar[_name] = layout[_name].cells("a").attachToolbar(self.Model.import_toolbar);
      toolbar[_name].setSkin(self.Model.globalSkin);
      this._toolbar_import_events(_name);
    },
    /**
     * [_toolbar_import_events description]
     * @param  {[type]} _name [description]
     * @return {[type]}       [description]
     */
    _toolbar_import_events: function(_name) {
      var
        self = this,
        data,
        row_ids,
        count = 0,
        spouse_relation_ds = self.Data.store('spouse_contacts'),
        relation_get_ds = self.Data.store("relation_get");


      toolbar[_name].attachEvent('onClick', function(id) {
        if (id == "import_relation") {
          row_ids = grid[_name].getCheckedRows(0);
          row_ids = row_ids.split(',');
          count = row_ids.length;
          if (count < 2) {
            dhtmlx.message({
              type: "alert-error",
              text: "Please select atleast one relation?"
            });
            return;
          }
          layout[_name].progressOn();
          //loop through all row ids
          row_ids.forEach(function(id) {
            data = spouse_relation_ds.data.item(id);
            data.contact_id = config.contact_id;
            data.is_mailing = data.MailingRelation;
            delete data.relation_id;


            dhtmlxAjax.post(self.Data.end_point.relation_save, "data=" + JSON.stringify(data), function() {
              count--;
              if (!count) {
                layout[_name].progressOff();
                //migration with dhx3.6 ds.ob only in dhx 3.6 ds.loadNext new in dhx 4.0
                relation_get_ds.loadNext();
                dhtmlx.alert({
                  text: "Imported Successfully!",
                  callback: function() {
                    win[_name].close();
                  }
                });
              }
            });

          });
        }
      });
    },
    /**
     * [_grid_import description]
     * @param  {[type]} _name [description]
     * @return {[type]}       [description]
     */
    _grid_import: function(_name) {
      var self = this;
      _name = _name || com_name;

      self.build_grid(_name, self.Model.import_grid);
      var spouse_relation_ds = self.Data.store('spouse_contacts');
      grid[_name].sync(spouse_relation_ds);
      if (spouse_relation_ds.data.dataCount() == 0 || spouse_relation_ds.isVisible()) {
        layout[_name].progressOff();
        self.set_status(_name, "Ready to use");
      } else {
        spouse_relation_ds.attachEvent("onXLE", function() {
          layout[_name].progressOff();
          self.set_status(_name, "Ready to use");
        });
      }

    },
    /**
     * [_form_add_edit_validate description]
     * @param  {[type]} _name [description]
     * @param  {[type]} data  [description]
     * @return {[type]}       [description]
     */
    _form_add_edit_validate: function(_name, data) {

      var
        self = this,
        zip_filter = /^\d{5}(?:-\d{4})?$/,
        zipcodeVal = zip_filter.test(data.zip);
      if (data.relation_type_id === '' || data.relation_type_id === null || data.relation_type_id === '0') {
        dhtmlx.alert({
          title: "Alert",
          type: "alert-error",
          text: "Relation type is mandatory",
          callback: function() {
            form[_name].setItemFocus('relation_type');
          }
        });
        self.set_status(_name, " Fields required");
        return false;
      } else if (data.leave_date != null && data.start_date != null) {
        if (data.leave_date < data.start_date) {
          dhtmlx.alert({
            title: "Alert",
            type: "alert-error",
            text: ' End date should be greater or equal to Start date',
            callback: function() {
              form[_name].setItemValue('relation_leave', '');
              form[_name].setItemFocus('relation_leave');
            }
          });
          self.set_status(_name, "End date should be greater or equal to Start date");
          return false;
        }
      } else if (data.zip !== '' && data.zip !== null) {
        if (zipcodeVal !== true) {
          dhtmlx.alert({
            title: "Alert",
            type: "alert-error",
            text: "Please enter a valid zipcode",
            callback: function() {
              form[_name].setItemValue('zip', '');
              form[_name].setItemFocus('zip');
            }
          });
          self.set_status(_name, "Please enter a valid zipcode");
          return false;
        }
      }

      return true;
    },
    /**
     * [_form_add_edit description]
     * @param  {[type]}  _name  [description]
     * @param  {Boolean} isEdit [description]
     * @return {[type]}         [description]
     */
    _form_add_edit: function(_name, isEdit) {
      var self = this;
      _name = _name || com_name;
      form[_name] = layout[_name].cells("a").attachForm(self.Model.conf_form.template);
      layout[_name].progressOff();
      self.set_status(_name, "Loading....");

      var
        relation_contact = form[_name].getCombo('contact_name'),
        relation_primary = form[_name].getCombo('relation_primary'),
        relation_sub = form[_name].getCombo('relation_sub'),
        relation_people = form[_name].getCombo('relation_people');

      var
        relation_contact_ds = self.Data.store('relation_contact'),
        relation_primary_ds = self.Data.store('relation_primary'),
        relation_sub_ds = self.Data.store('relation_sub'),
        relation_people_ds = self.Data.store('relation_people');

      // relation_type.sync(relation_type_ds);
      // 
      // 
      // var
      //   relation_type = form[_name].getCombo("relation_type"),
      //   relation_province = form[_name].getCombo("province_text"),
      //   relation_country = form[_name].getCombo("country_text"),
      //   relation_county = form[_name].getCombo("county_text"),
      //   relation_state = form[_name].getCombo("state_text"),
      //   is_mailing_relation = form[_name].getCombo("is_mailing_relation"),
      //   relation_start_date = form[_name].getCalendar("start_date"),
      //   relation_leave_date = form[_name].getCalendar("leave_date");

      // var
      //   relation_type_ds = self.Data.store('relation_type'),
      //   relation_province_ds = self.Data.store('relation_province'),
      //   relation_state_ds = self.Data.store('relation_state'),
      //   relation_country_ds = self.Data.store('relation_country'),
      //   relation_county_ds = self.Data.store('relation_county');

      // //data stoe to dhtmlx objects
      // relation_type.sync(relation_type_ds);
      // relation_country.sync(relation_country_ds);
      // relation_province.sync(relation_province_ds);
      // relation_state.sync(relation_state_ds);
      // relation_county.sync(relation_county_ds);

      // //Check if all datastorage lkp tables loaded or not
      // var lkp_ds = [
      //   relation_type_ds,
      //   relation_province_ds,
      //   relation_state_ds,
      //   relation_country_ds,
      //   relation_county_ds
      // ];
      // var check_lkp_ds = setInterval(function() {
      //   if (lkp_ds.length > 0) {
      //     var _ds = lkp_ds.shift();
      //     if (!_ds.isVisible()) {
      //       lkp_ds.push(_ds);
      //     }
      //   } else {
      //     clearInterval(check_lkp_ds);
      //     layout[_name].progressOff();
      //     on_lkp_load();
      //   }
      // }, 100);

      // // Execute this code when storage data load is done
      // var on_lkp_load = function() {
      //   self.set_status(_name, "Ready to use");

      //   //initial county should be USA
      //   var
      //     usa_opt = relation_country.getOptionByLabel("USA");
      //   relation_country.setComboText(usa_opt.text);
      //   relation_country.setComboValue(usa_opt.value);

      //   //set default states to USA states
      //   var
      //     country_id = relation_country.getSelectedValue();
      //   relation_state_ds.data.filter("CountryID", country_id);

      //   is_edited = false;
      // };

      // // When Editing mode on
      // if (isEdit) {
      //   is_edit_mode = true;
      //   var relation_get_ds = self.Data.store('relation_get');
      //   relation_get_ds.setCursor(grid_id);
      //   form[_name].bind(relation_get_ds);
      //   //edit
      //   var
      //     grid_id = grid[com_name].getSelectedRowId(),
      //     data = relation_get_ds.item(grid_id);


      //   relation_type.setComboValue(data.relation_type_id);
      //   relation_province.setComboValue(data.province_id);
      //   relation_country.setComboValue(data.country_id);
      //   relation_county.setComboValue(data.county_id);
      //   relation_state.setComboValue(data.state_id);
      //   console.log(data);
      //   relation_start_date.setDate(data.start_date ? data.start_date : new Date());
      //   relation_leave_date.setDate(data.leave_date ? data.leave_date : new Date());
      //   (data.province_text == "") ? relation_province.setComboText("Pick Province") : form[_name].enableItem("province_text");
      //   (data.country_text == "") ? relation_country.setComboText("Pick Country") : "";
      //   (data.county_text == "") ? relation_county.setComboText("Pick County") : form[_name].enableItem("county_text");
      //   (data.country_state == "") ? relation_state.setComboText("Pick State") : form[_name].enableItem("country_text");
      // } else {
      //   is_edit_mode = false;
      // }

      // is_mailing_relation.attachEvent("onChange", function() {
      //   is_edited = true;
      // });
      // relation_type.attachEvent("onChange", function() {
      //   is_edited = true;
      // });
      // // --- On country change
      // relation_country.attachEvent("onChange", function() {
      //   is_edited = true;
      //   //current selected Country Id
      //   var country_id = relation_country.getSelectedValue();
      //   relation_province_ds.data.filter("CountryID", country_id);
      //   if (relation_province_ds.data.dataCount() < 1) {
      //     relation_province.addOption([
      //       ["0", "Pick a Province"]
      //     ]);
      //     form[_name].disableItem("province_text");
      //   } else {
      //     form[_name].enableItem("province_text");
      //     relation_province.addOption([
      //       ["0", "Pick a Province"]
      //     ]);
      //   }

      //   relation_state_ds.data.filter("CountryID", country_id);
      //   if (relation_state_ds.data.dataCount() < 1) {
      //     relation_state.addOption([
      //       ["0", "Pick a State"]
      //     ]);
      //     form[_name].disableItem("state_text");
      //   } else {
      //     form[_name].enableItem("state_text");
      //     relation_state.addOption([
      //       ["0", "Pick a State"]
      //     ]);
      //   }
      // });

      // relation_state.attachEvent("onChange", function() {
      //   is_edited = true;
      //   var stateid = relation_state.getSelectedValue();
      //   relation_county_ds.data.filter("StateId", stateid);
      //   if (relation_county_ds.data.dataCount() < 1) {
      //     relation_county.addOption([
      //       ["0", "Select State"]
      //     ]);
      //     form[_name].disableItem("county_text");
      //   } else {
      //     form[_name].enableItem("county_text");
      //     relation_county.addOption([
      //       ["0", "Select State"]
      //     ]);
      //   }
      //   self._form_add_edit_events(_name);
      // });
    },
    /**
     * [_form_add_edit_events description]
     * @param  {[type]} _name [description]
     * @return {[type]}       [description]
     */
    _form_add_edit_events: function(_name) { // Events for inputs
      form[_name].attachEvent("onInputChange", function(name) {
        is_edited = true;
        var len = form[_name].getItemValue('zip').length;
        if (name === 'zip') {
          if (len === 5) {
            var zipcode = form[_name].getItemValue('zip');
            var filter = /^\d{5}(?:-\d{4})?$/;
            var zipcodeVal = filter.test(zipcode);
            if (zipcode !== '' && zipcode !== null) {
              if (zipcodeVal !== true) {
                dhtmlx.alert({
                  title: "Alert",
                  type: "alert-error",
                  text: "Please enter a valid zipcode",
                  callback: function() {
                    form[_name].setItemValue('zip', '');
                    form[_name].setItemFocus('zip');
                  }
                });
              } else {
                dhtmlxAjax.get(self.Data.end_point.relation_by_zip + "&zip=" + zipcode, function(loader) {
                  json = JSON.parse(loader.xmlDoc.responseText);
                  if (json.length > 0) {
                    json = json[0];
                    form[_name].getCombo("state_text").setComboValue(json.StateID);
                    form[_name].getCombo("state_text").setComboText(json.StateName);
                    form[_name].getCombo("country_text").setComboValue(json.CountryID);
                    form[_name].getCombo("country_text").setComboText(json.CountryName);
                  }

                });
              }
            }
          } else if (len > 5) {
            dhtmlx.alert({
              title: "Alert",
              type: "alert-error",
              text: "Please enter a 5-digit zipcode",
              callback: function() {
                form[_name].setItemValue('zip', '');
                form[_name].setItemFocus('zip');
              }
            });
          }

        }
      });
    },
    /**
     * [start description]
     * @param  {[type]} _conf [description]
     * @return {[type]}       [description]
     */
    start: function(_conf) {
      var self = this;
      self.validate_start(_conf);

      uid = _conf.uid;
      config = _conf;
      self.application_path = config.application_path;
      dhx_globalImgPath = config.dhtmlx_codebase_path + "imgs/";

      config["icons_path"] = "asserts/icons/";
      config["img_path"] = "asserts/imgs/"


      var internal_dependencies = [
        config.application_path + "asserts/css/style.css",
        config.dhtmlx_codebase_path + "dhtmlx.css",
        config.dhtmlx_codebase_path + "dhtmlx.js",
        config.application_path + "js/json2.js",
        // config.dhtmlx_codebase_path + "dhtmlx_deprecated.js",
        self.application_path + "model/model.js",
        self.application_path + "controller/classes/data.js"
      ];

      if (com_dhx_version === "4.0") {
        internal_dependencies.push(config.dhtmlx_codebase_path + "dhtmlx_deprecated.js");
      }
      CAIRS.onDemand.load(internal_dependencies, function() {
        self.Model.init(config.application_path + config.img_path, config.application_path + config.icons_path);
        self.Data.init(config);
        console.log(self.Data);
        dhtmlx.skin = self.Model.globalSkin || "dhx_skyblue";
        // getting couple names
        dhtmlxAjax.get(self.Data.end_point.get_coup_name + "&conn_id=" + config.conn_id, function(loader) {
          var json = JSON.parse(loader.xmlDoc.responseText);
          coup_names = json.coup_names.split(',').join(' & ');
          if (config.use_window === true) {
            self.build_window();
            self._window_extend(com_name);
            self.set_status(com_name, "Loading.....");
          } else {
            self._layout();
          }
          self._toolbar();
          self._grid();
        });
      });


    },
    /**
     * [set_status description]
     * @param {[type]} _name [description]
     * @param {[type]} msg   [description]
     * @param {[enum]} type  [should be any of {info,err,success}]
     */
    set_status: function(_name, _msg, _type) {
      //alert(_name);
      var color = "#000000";
      color = (_type == "info") ? "#000000" : color;
      color = (_type == "err") ? "#FF000A0" : color;
      color = (_type == "success") ? "#03B202" : color;
      status_bar[_name].setText('<span style="color:' + color + ';"><strong>* ' + _msg + '</strong></span>');
    },
    /**
     * [Validate values when call the component]
     * @param  {[type]} config [description]
     * @return {[type]}        [description]
     */
    validate_start: function(config) {
      if ((typeof config.uid === 'undefined') || (config.uid.length === 0)) {
        dhtmlx.message({
          type: "error",
          text: "uid is missing"
        });
        return;
      }
      if ((typeof config.application_path === 'undefined') || (config.application_path.length === 0)) {
        dhtmlx.message({
          type: "error",
          text: "application_path is missing"
        });
        return;
      }
      if ((typeof config.dhtmlx_codebase_path === 'undefined') || (config.dhtmlx_codebase_path.length === 0)) {
        dhtmlx.message({
          type: "error",
          text: "dhtmlx_codebase_path is missing"
        });
        return;
      }
      if ((typeof config.agency_id === 'undefined') || (config.agency_id.length === 0)) {
        dhtmlx.message({
          type: "error",
          text: "Agency Id is missing"
        });
        return;
      }
      if ((typeof config.conn_id === 'undefined') || (config.conn_id.length === 0)) {
        dhtmlx.message({
          type: "error",
          text: "Conn Id is missing"
        });
        return;
      }
    }
  }
}());