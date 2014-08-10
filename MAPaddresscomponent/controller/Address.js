var Address = (function() {
  var
    uid = "",
    com_name = "Address",
    config = {},
    window = {},
    window_manager = null,
    status_bar = {},
    layout = {},
    grid = {},
    form = {},
    toolbar = {};

  // Public functions
  return {
    // Window
    _build_window: function(_name, opt) {
      var self = this;
      _name = _name || com_name;
      var opt = opt || {};
      opt.left = opt.left || self.Model.defaults.window.left;
      opt.top = opt.top || self.Model.defaults.window.top;
      opt.width = opt.width || self.Model.defaults.window.width;
      opt.height = opt.height || self.Model.defaults.window.height;
      opt.title = opt.title || self.Model.defaults.window.title;
      opt.pattern = opt.pattern || self.Model.defaults.window.layout_pattern;
      opt.icon = opt.icon || self.Model.defaults.window.icon;
      opt.icon_dis = opt.icon_dis || self.Model.defaults.window.icon_dis;

      if (config.window_manager_obj) {
        window_manager = config.window_manager_obj;
      } else {
        if (window_manager === null) {
          window_manager = new dhtmlXWindows();
        }
      }
      window_manager.setImagePath(self.Model.conf_window.image_path);
      if (window_manager.isWindow(_name)) {
        window[_name].show();
        window[_name].bringToTop();
        window[_name].center();
        return;
      }
      window[_name] = window_manager.createWindow(_name, opt.left + 10, opt.top + 10, opt.width, opt.height);
      window[_name].setText(opt.title);
      window[_name].setIcon(opt.icon, opt.icon_dis);
      window[_name].center();
      window[_name].denyPark();
      window[_name].denyResize();

      // Events on Windows
      window[_name].attachEvent("onClose", function(win) {
        return true;
      });
      status_bar[_name] = window[_name].attachStatusBar();
      layout[_name] = window[_name].attachLayout(opt.pattern);
      layout[_name].cells("a").hideHeader();
      layout[_name].progressOn();
    },
    _build_grid: function(_name, opt) {
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
      grid[_name].enableMultiline(true);
      grid[_name].setDateFormat("%m-%d-%Y");
      grid[_name].setColumnsVisibility(opt.visibility);
      grid[_name].init();
    },
    _layout: function(_name) {
      var self = this;
      _name = _name || com_name;
      layout[_name] = new dhtmlXLayoutObject(config.parent_div_id, opt.pattern);
      layout[_name].cells("a").hideHeader();
      layout[_name].progressOn();
    },
    _toolbar: function(_name) {
      var self = this;
      _name = _name || com_name;
      toolbar[_name] = layout[_name].cells("a").attachToolbar(self.Model.conf_toolbar);
      toolbar[_name].setSkin(self.Model.globalSkin);
      if (config.use_window !== true) {
        toolbar[_name].removeItem("help_address");
        toolbar[_name].removeItem("close_address");
      }
      toolbar[_name].disableItem("delete_address");
      toolbar[_name].disableItem("edit_address");
      this._toolbar_events();
    },
    _toolbar_events: function(_name) {
      var self = this;
      _name = _name || com_name;
      toolbar[_name].attachEvent("onClick", function(id) {
        if (id == "add_address") {
          self._build_window("Add_Edit", self.Model.edit_window);
          self._toolbar_add_edit("Add_Edit");
          self._form_add_edit("Add_Edit", false);

        }
        if (id == "edit_address") {
          self._build_window("Edit", self.Model.edit_window);
          // self._build_layout("Edit");
          self._form_add_edit("Edit", true);
          // self._toolbar_add_edit("Edit");
        }
        if (id == "delete_address") {
          selectedRowsId = grid[_name].getSelectedRowId();
          console.log(selectedRowsId);
          if (selectedRowsId !== null) {
            // self.deleteRow(uid, selectedRowsId);
            self.Data.store("address_get").remove(selectedRowsId);
            // var data = {
            //   contact_id: config.contact_id,
            //   address_id: selectedRowsId
            // }
            // dhtmlxAjax.post(config.application_path + "processors/address.php?act=del", "data=" + JSON.stringify(data), function() {

            // });
          }
        }
        // if (id == "help_address") {
        //   self._showHelp(uid);
        // }
        // if (id == "edit_address") {
        //   self._editwindow(uid, 'Edit');
        //   self._editlayout(uid);
        //   //self._edittoolbar(uid, 'Edit');
        //   self.importaddress(uid);
        //   self._form(uid, 'Edit');
        // }
        // if (id == "close_address") {
        //   self.window[uid].close();
        // }

      });
    },
    _grid_main: function(_name) {
      var self = this;
      _name = _name || com_name;
      self._build_grid(_name, self.Model.conf_grid);
      // Addrss country
      // self.Data.store("address_get", config.application_path + self.Data.end_point.address_get + "&contact_id=" + config.contact_id, function() {
      //   layout[_name].progressOff();
      // });
      layout[_name].progressOff();
      // self.Data._address_data_store();
      var grid_address_ds = self.Data.store("address_get");
      console.log(grid_address_ds);
      // grid_address_ds.data.scheme({
      //   $init: function(obj) {
      //     obj.MailingAddress = obj.MailingAddress ? "Yes" : "No";
      //   }
      // });
      grid[_name].sync(grid_address_ds);
      self._grid_main_events(_name);
    },
    _grid_main_events: function(_name) {
      grid[_name].attachEvent("onRowDblClicked", function(rowId, cellInd) {
        // self._editwindow(uid, 'Edit');
        // self._editlayout(uid);
        // //self._edittoolbar(uid, 'Edit');
        // self._form(uid, 'Edit');
        self.buildwindow("Edit", self.Model.edit_window);
        self.buildlayout("Edit");
        self.build_form_add_edit("Edit", false, rowId);

      });
      // grid[_name].attachEvent("onEnter", function(rowId, cellInd) {
      //   self._editwindow(uid, 'Edit');
      //   self._editlayout(uid);
      //   // self._edittoolbar(uid, 'Edit');
      //   self._form(uid, 'Edit');
      // });
      grid[_name].attachEvent("onRowSelect", function(rowId, cellInd) {
        toolbar[_name].enableItem("delete_address");
        toolbar[_name].enableItem("edit_address");
      });
    },
    _toolbar_add_edit: function(_name) {
      var self = this;
      _name = _name || com_name;
      toolbar[_name] = layout[_name].cells("a").attachToolbar(self.Model.edit_toolbar);
      toolbar[_name].setSkin(self.Model.globalSkin);
      // toolbar[_name].disableItem("import_address");

      self._toolbar_add_edit_couple_check(_name);
      this._toolbar_add_edit_events(_name);
    },
    _toolbar_add_edit_couple_check: function(_name) {
      var self = this;
      var data = {
        contact_id: config.contact_id
      };

      dhtmlxAjax.post(config.application_path + self.Data.end_point.get_spouse_contact_id, JSON.stringify(data), function(loader) {
        var json = JSON.parse(loader.xmlDoc.responseText);
        if (json.spouse_contact_id) {
          self.spouse_contact_id = json.spouse_contact_id;
          toolbar[_name].enableItem("import_address");
        }
      });
    },
    _toolbar_add_edit_events: function(_name) {
      var self = this;
      var data = {};

      toolbar[_name].attachEvent("onClick", function(id) {
        if (id == "save_address") {
          data = {
            contact_id: config.contact_id,
            type_id: form[_name].getCombo("address_type").getSelectedValue(),
            is_mailing: form[_name].getItemValue("mailing_address"),
            address_1: form[_name].getItemValue("address_address1"),
            address_2: form[_name].getItemValue("address_address2"),
            city: form[_name].getItemValue("address_city"),
            zip: form[_name].getItemValue("address_zip"),
            country_id: form[_name].getCombo("address_country").getSelectedValue(),
            province_id: form[_name].getCombo("address_province").getSelectedValue(),
            state_id: form[_name].getCombo("address_state").getSelectedValue(),
            county_id: form[_name].getCombo("address_county").getSelectedValue(),
            start_date: form[_name].getCalendar("address_start").getDate(true),
            leave_date: form[_name].getCalendar("address_leave").getDate(true)
          };
          console.log(data);
          console.log("Data to save >>>>" + JSON.stringify(data));
          layout[_name].progressOn();
          console.log(self.Data);
          if (self._form_add_edit_validate(_name, data)) {
            dhtmlxAjax.post(config.application_path + self.Data.end_point.address_save, "data=" + JSON.stringify(data), function() {
              var address_get_ds = self.Data.store("address_get", config.application_path + self.Data.end_point.address_get + "&contact_id=" + config.contact_id, function() {
                layout[_name].progressOff();
              });
              address_get_ds.dataFeed(config.application_path + self.Data.end_point.address_get + "&contact_id=" + config.contact_id);
              //layout[_name].progressOff();
            });
          }
        }
        if (id == "import_address") {
          window["Add_Edit"].close();
          self._build_window("Import", self.Model.import_window);
          //s self.buildlayout("Import");
          self._toolbar_import("Import");
          self._grid_import("Import");
        }
      });
    },
    _toolbar_import: function(_name) {
      var self = this;
      _name = _name || com_name;
      toolbar[_name] = layout[_name].cells("a").attachToolbar(self.Model.import_toolbar);
      toolbar[_name].setSkin(self.Model.globalSkin);
      //this._toolbar_events();
    },
    _grid_import: function(_name) {
      var self = this;
      _name = _name || com_name;
      self._build_grid(_name, self.Model.conf_grid);
      // Addrss country
      self.Data.store("spouse_address", config.application_path + self.Data.end_point.address_get + "&contact_id=" + self.spouse_contact_id, function() {
        layout[_name].progressOff();
      });
      var grid_address_ds = self.Data.store("grid_address");
      grid_address_ds.data.scheme({
        $init: function(obj) {
          obj.MailingAddress = obj.MailingAddress ? "Yes" : "No";
        }
      });
      grid[_name].sync(grid_address_ds);
      // self._grid_main_events(_name);
    },
    _form_add_edit_validate: function(_name, data) {
      var zip_filter = /^\d{5}(?:-\d{4})?$/;
      var zipcodeVal = zip_filter.test(data.zip);
      if (data.type_id === '' || data.type_id === null || data.type_id === '0') {
        dhtmlx.alert({
          title: "Alert",
          type: "alert-error",
          text: "Address type is mandatory",
          callback: function() {
            form[_name].setItemFocus('address_type');
          }
        });
        return false;
      }
      // else if (data.start_date === '' || data.start_date === null || data.start_date === '0') {
      //   dhtmlx.alert({
      //     title: "Alert",
      //     type: "alert-error",
      //     text: 'Start Date must not be blank',
      //     callback: function() {
      //       form[_name].setItemValue('address_start', '');
      //       form[_name].setItemFocus('address_start');
      //     }
      //   });
      //   return false;
      // }
      // else if (data.leave_date === '' || data.leave_date === null || data.leave_date === '0') {
      //   dhtmlx.alert({
      //     title: "Alert",
      //     type: "alert-error",
      //     text: 'End Date must not be blank',
      //     callback: function() {
      //       form[_name].setItemValue('address_leave', '');
      //       form[_name].setItemFocus('address_leave');
      //     }
      //   });
      //   return false;
      // } 
      // 
      else if (data.leave_date < data.start_date) {
        dhtmlx.alert({
          title: "Alert",
          type: "alert-error",
          text: ' End date should be greater or equal to Start date',
          callback: function() {
            form[_name].setItemValue('address_leave', '');
            form[_name].setItemFocus('address_leave');
          }
        });
        return false;
      } else if (data.zip !== '' && data.zip !== null) {
        if (zipcodeVal !== true) {
          dhtmlx.alert({
            title: "Alert",
            type: "alert-error",
            text: "Please enter a valid zipcode",
            callback: function() {
              form[_name].setItemValue('address_zip', '');
              form[_name].setItemFocus('address_zip');
            }
          });
          return false;
        }
      }

      return true;
    },
    _form_add_edit: function(_name, isEdit) {
      var self = this;
      _name = _name || com_name;
      form[_name] = layout[_name].cells("a").attachForm(self.Model.conf_form.template);
      layout[_name].progressOff();
      if (isEdit) {
        var grid_id = grid[com_name].getSelectedRowId();
        self.Data.store('address_get').setCursor(grid_id);

        grid[com_name].bind(form[_name]);
        //edit
        // var data = self.Data.store('grid_address').item(id);
        // console.log(data);
        // id = 22;
        // form[_name].setFormData({
        //   address_type: data.AddressType,
        //   mailing_address: data.MailingAddress,
        //   address_address1: data.Address1,
        //   address_address2: data.Address2,
        //   address_city: data.City,
        //   address_state: data.SateName,
        //   address_zip: data.zip,
        //   address_county: data.CountyText,
        //   address_country: data.CountryText,
        //   address_province: data.AddressProvenceText,
        //   address_start: data.addstartdate,
        //   address_leave: data.addleavedate
        // });
        // console.log(data.addstartdate);
        // address_start_date.setDate("08-17-2014");
        // address_leave_date.setDate(data.addleavedate);
      } else {
        // form[_name] = layout[_name].cells("a").attachForm(self.Model.conf_form.template);
        // layout[_name].progressOff();
      }
      // self._form_data_storage_fill(_name);


      // // Events on cobo boxes
      // // --When contries loaded
      // --- On country change
      // address_country.attachEvent("onChange", function() {
      //     var countryid = address_country.getSelectedValue();
      //     address_province_ds.data.filter("CountryID", countryid);
      //     if (address_province_ds.data.dataCount() < 1) {
      //         address_province.addOption([
      //             ["0", "Pick a Province"]
      //         ]);
      //         address_province.disable(true);
      //     } else {
      //         address_province_ds.setCursor(address_province_ds.first());
      //         address_province.enable(true);
      //         address_province.addOption([
      //             ["0", "Pick a Province"]
      //         ]);
      //     }

      //     address_state_ds.data.filter("CountryID", countryid);
      //     if (address_state_ds.data.dataCount() < 1) {
      //         address_state.addOption([
      //             ["0", "Pick a State"]
      //         ]);
      //         address_state.disable(true);
      //         address_county.disable(true);
      //     } else {
      //         address_state.enable(true);
      //         address_county.enable(true);
      //         address_state.addOption([
      //             ["0", "Pick a State"]
      //         ]);
      //     }
      // });

      // address_state.attachEvent("onChange", function() {
      //     var stateid = address_state.getSelectedValue();
      //     console.log(stateid);
      //     address_county_ds.data.filter("StateId", stateid);
      //     if (address_county_ds.data.dataCount() < 1) {
      //         address_county.addOption([
      //             ["0", "Select State"]
      //         ]);
      //         address_county.disable(true);
      //     } else {
      //         address_county.enable(true);
      //         address_county.addOption([
      //             ["0", "Select State"]
      //         ]);
      //     }
      // });


    },
    _form_data_storage_fill: function(_name) {
      var self = this;
      // Storing all combo boxs
      var
        address_type = form[_name].getCombo("address_type"),
        address_province = form[_name].getCombo("address_province"),
        address_country = form[_name].getCombo("address_country"),
        address_county = form[_name].getCombo("address_county"),
        address_state = form[_name].getCombo("address_state"),
        address_start_date = form[_name].getCalendar("address_start"),
        address_leave_date = form[_name].getCalendar("address_leave");
      // Address Type
      self.Data.store("address_type", config.application_path + "processors/get_data.php?get=address_type");
      var address_type_ds = self.Data.store("address_type");
      address_type_ds.data.scheme({
        $init: function(obj) {
          obj.value = obj.AddressSequence;
          obj.text = obj.AddressType;
        }
      });
      address_type.sync(address_type_ds);
      // Addrss country
      self.Data.store(
        "address_country",
        config.application_path + "processors/get_data.php?get=address_country",
        function(data) {
          var usa_opt = address_country.getOptionByLabel("USA");
          address_country.setComboText(usa_opt.text);
          address_country.setComboValue(usa_opt.value);
          data.setCursor(usa_opt.value);
        });
      var address_country_ds = self.Data.store("address_country");
      address_country_ds.data.scheme({
        $init: function(obj) {
          obj.value = obj.id;
          obj.text = obj.CountryText;
        }
      });
      address_country.sync(address_country_ds);

      // Address Province
      self.Data.store("address_province", config.application_path + "processors/get_data.php?get=address_province");
      var address_province_ds = self.Data.store("address_province");
      address_province_ds.data.scheme({
        $init: function(obj) {
          obj.value = obj.id;
          obj.text = obj.AddressProvinceText;
        }
      });
      address_province.sync(address_province_ds);
      // Address state
      self.Data.store("address_state", config.application_path + "processors/get_data.php?get=address_state");
      var address_state_ds = self.Data.store("address_state");
      address_state_ds.data.scheme({
        $init: function(obj) {
          obj.value = obj.id;
          obj.text = obj.StateName;
        }
      });
      address_state.sync(address_state_ds);

      // Address county
      self.Data.store("address_county", config.application_path + "processors/get_data.php?get=address_county");
      var address_county_ds = self.Data.store("address_county");
      address_county_ds.data.scheme({
        $init: function(obj) {
          obj.value = obj.id;
          obj.text = obj.CountyText;
        }
      });
      address_county.sync(address_county_ds);
      address_province.disable(true);
    },
    _form_add_edit_events: function(_name) { // Events for inputs
      form[_name].attachEvent("onInputChange", function(name) {
        var len = form[_name].getItemValue("address_zip").length;
        if (name === 'address_zip') {
          if (len === 5) {
            var zipcode = form[_name].getItemValue("address_zip");
            var filter = /^\d{5}(?:-\d{4})?$/;
            var zipcodeVal = filter.test(zipcode);
            if (zipcode !== '' && zipcode !== null) {
              if (zipcodeVal !== true) {
                dhtmlx.alert({
                  title: "Alert",
                  type: "alert-error",
                  text: "Please enter a valid zipcode",
                  callback: function() {
                    form[_name].setItemValue('address_zip', '');
                    form[_name].setItemFocus('address_zip');
                  }
                });
              } else {
                dhtmlxAjax.get(config.application_path + "processors/get_data.php?get=address_by_zip&zip=" + zipcode, function(loader) {
                  json = JSON.parse(loader.xmlDoc.responseText);
                  if (json.length > 0) {
                    json = json[0];
                    form[_name].getCombo("address_state").setComboValue(json.StateID);
                    form[_name].getCombo("address_state").setComboText(json.StateName);
                    form[_name].getCombo("address_country").setComboValue(json.CountryID);
                    form[_name].getCombo("address_country").setComboText(json.CountryName);
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
                form[_name].setItemValue('address_zip', '');
                form[_name].setItemFocus('address_zip');
              }
            });
          }

        }
      });
    },
    start: function(_conf) {
      var self = this;
      self.validate_start(_conf);

      uid = _conf.uid;
      config = _conf;
      self.application_path = config.application_path;
      window.dhx_globalImgPath = config.dhtmlx_codebase_path + "imgs/";

      config["icons_path"] = "asserts/icons/";
      config["img_path"] = "asserts/imgs/"


      var internal_dependencies = [
        config.application_path + "asserts/css/style.css",
        config.dhtmlx_codebase_path + "dhtmlx.css",
        config.dhtmlx_codebase_path + "dhtmlx.js",
        config.dhtmlx_codebase_path + "dhtmlx_deprecated.js",
        self.application_path + "model/model.js",
        self.application_path + "controller/classes/data.js"
      ];
      CAIRS.onDemand.load(internal_dependencies, function() {
        self.Model.init(config.application_path + config.img_path, config.application_path + config.icons_path);
        self.Data.init(config);
        dhtmlx.skin = self.Model.globalSkin || "dhx_skyblue";
        if (config.use_window === true) {
          self._build_window();
        } else {
          self._layout();
        }
        self._toolbar();
        self._grid_main();
      });
    },
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
    }
  }
}());