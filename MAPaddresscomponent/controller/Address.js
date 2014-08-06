var Address = (function() {
  var
    _uid = "",
    _name = "Address",
    _conf = {},
    _window = {},
    _window_manager = null,
    _status_bar = {},
    _layout = {},
    _grid = {},
    _form = {},
    _toolbar = {};

  // Public functions
  return {
    // Window
    build_window: function(c_name, opt) {
      var self = this;
      c_name = c_name || _name;
      c_name = c_name + "_" + _uid;
      if (!opt) {
        opt = {};
      }
      opt.left = opt.left || self.Model.defaults.window.left;
      opt.top = opt.top || self.Model.defaults.window.top;
      opt.width = opt.width || self.Model.defaults.window.width;
      opt.height = opt.height || self.Model.defaults.window.height;
      opt.title = opt.title || self.Model.defaults.window.title;



      if (_conf.window_managerObj) {
        _window_manager = _conf.window_managerObj;
      } else {
        if (_window_manager === null) {
          _window_manager = new dhtmlXWindows();
        }
      }
      // _window_manager.setImagePath(self.Model.conf_window.image_path);
      if (_window_manager.isWindow(c_name)) {
        //console.log(_window_manager)
        _window[c_name].show();
        _window[c_name].bringToTop();
        _window[c_name].center();
        return;
      }
      _window[c_name] = _window_manager.createWindow(c_name, opt.left + 10, opt.top + 10, opt.width, opt.height);
      // self.dhtmlxWidowCustomPostion(_window[_uid], self.Model.conf_window.top);
      _window[c_name].setText(opt.title);
      //_window[_uid].setIcon(self.Model.conf_window.icon, self.Model.conf_window.icon_dis);
      _window[c_name].center();
      _window[c_name].denyPark();
      _window[c_name].denyResize();

      // Events on Windows
      _window[c_name].attachEvent("onClose", function(win) {
        return true;
      });

      // _status_bar[_uid] = _window[_uid].attachStatusBar();
    },
    build_layout: function(c_name, opt) {
      var self = this;
      if (!opt) {
        opt = {};
        opt.pattern = self.Model.defaults.layout.pattern;
      }
      if (!c_name) {
        c_name = c_name || _name;
        c_name = c_name + "_" + _uid;
        if (_conf.useWindow === true) {
          _layout[c_name] = _window[c_name].attachLayout(self.Model.conf_layout.pattern);
        } else {
          _layout[c_name] = new dhtmlXLayoutObject(_conf.parentDIVId, opt.pattern);
        }
      } else {
        c_name = c_name || _name;
        c_name = c_name + "_" + _uid;
        _layout[c_name] = _window[c_name].attachLayout(opt.pattern);
      }
      _layout[c_name].cells("a").hideHeader();
      _layout[c_name].progressOn();
    },
    build_toolbar: function(c_name) {
      var self = this;
      c_name = c_name || _name;
      c_name = c_name + "_" + _uid;
      _toolbar[c_name] = _layout[c_name].cells("a").attachToolbar(self.Model.conf_toolbar);
      _toolbar[c_name].setSkin(self.Model.globalSkin);
      if (_conf.useWindow !== true) {
        _toolbar[c_name].removeItem("help_address");
        _toolbar[c_name].removeItem("close_address");
      }
      this.toolbar_events();
    },
    toolbar_events: function(c_name) {
      var self = this;
      c_name = c_name || _name;
      c_name = c_name + "_" + _uid;
      _toolbar[c_name].attachEvent("onClick", function(id) {
        if (id == "add_address") {
          self.build_window("New", self.Model.edit_window);
          self.build_layout("New");
          self.build_add_edit_form("New", false);
          self.build_add_edit_toolbar("New");

        }
        // if (id == "delete_address") {
        //   selectedRowsId = _grid[c_name].getSelectedRowId();
        //   if (selectedRowsId !== null) {
        //     self.deleteRow(uid, selectedRowsId);
        //   }
        // }
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
    build_grid: function(c_name) {
      var self = this;
      c_name = c_name || _name;
      c_name = c_name + "_" + _uid;
      _grid[c_name] = _layout[c_name].cells("a").attachGrid(self.Model.conf_grid);
      _grid[c_name].setHeader(self.Model.conf_grid.headers);
      _grid[c_name].setColumnIds(self.Model.conf_grid.ids);
      if (_conf.useWindow === true) {
        _grid[c_name].setInitWidths(self.Model.conf_grid.widths);
      } else {
        _grid[c_name].setInitWidths(self.Model.conf_grid.widths_layout);
      }
      // _grid[c_name].setColAlign(self.Model.conf_grid.colaligns);
      _grid[c_name].setColTypes(self.Model.conf_grid.coltypes);
      _grid[c_name].setColSorting(self.Model.conf_grid.colsorting);
      _grid[c_name].selMultiRows = false;
      _grid[c_name].enableAutoWidth(true);
      _grid[c_name].enableMultiline(true);
      _grid[c_name].setDateFormat("%m-%d-%Y");
      _grid[c_name].setColumnsVisibility(self.Model.conf_grid.visibility);
      _grid[c_name].init();
      _layout[c_name].progressOff();

      // Addrss country
      self.Data.create_data_store("grid_address", _conf.application_path + "processors/address.php?get=grid_address&contactID=" + _conf.contactid);
      var grid_address_ds = self.Data.store("grid_address");
      grid_address_ds.data.scheme({
        $init: function(obj) {
          obj.MailingAddress = obj.MailingAddress ? "Yes" : "No";
        }
      });
      _grid[c_name].sync(grid_address_ds);
      _toolbar[c_name].disableItem("delete_address");
      _toolbar[c_name].disableItem("edit_address");
      _grid[c_name].attachEvent("onRowDblClicked", function(rowId, cellInd) {
        // self._editwindow(uid, 'Edit');
        // self._editlayout(uid);
        // //self._edittoolbar(uid, 'Edit');
        // self._form(uid, 'Edit');
        self.build_window("Edit", self.Model.edit_window);
        self.build_layout("Edit");
        self.build_add_edit_form("Edit", false, _grid[c_name]);

      });
      // _grid[c_name].attachEvent("onEnter", function(rowId, cellInd) {
      //   self._editwindow(uid, 'Edit');
      //   self._editlayout(uid);
      //   // self._edittoolbar(uid, 'Edit');
      //   self._form(uid, 'Edit');
      // });
      _grid[c_name].attachEvent("onRowSelect", function(rowId, cellInd) {
        _toolbar[c_name].enableItem("delete_address");
        _toolbar[c_name].enableItem("edit_address");
      });
    },
    build_add_edit_toolbar: function(c_name) {
      var self = this;
      c_name = c_name || _name;
      c_name = c_name + "_" + _uid;
      _toolbar[c_name] = _layout[c_name].cells("a").attachToolbar(self.Model.edit_toolbar);
      _toolbar[c_name].setSkin(self.Model.globalSkin);
      this.toolbar_add_edit_events(c_name);
    },
    toolbar_add_edit_events: function(c_name) {
      var self = this;
      var data = {};

      _toolbar[c_name].attachEvent("onClick", function(id) {
        if (id == "save_address") {
          data = {
            contact_id: _conf.contactid,
            type_id: _form[c_name].getCombo("address_type").getSelectedValue(),
            is_mailing: _form[c_name].getItemValue("mailing_address"),
            address_1: _form[c_name].getItemValue("address_address1"),
            address_2: _form[c_name].getItemValue("address_address2"),
            city: _form[c_name].getItemValue("address_city"),
            zip: _form[c_name].getItemValue("address_zip"),
            country_id: _form[c_name].getCombo("address_country").getSelectedValue(),
            province_id: _form[c_name].getCombo("address_province").getSelectedValue(),
            state_id: _form[c_name].getCombo("address_state").getSelectedValue(),
            county_id: _form[c_name].getCombo("address_county").getSelectedValue(),
            start_date: _form[c_name].getCalendar("address_start").getDate(true),
            leave_date: _form[c_name].getCalendar("address_leave").getDate(true)
          };
          console.log(data);
          console.log("Data to save >>>>" + JSON.stringify(data));
          if (self.form_add_edit_validate(c_name, data)) {
            dhtmlxAjax.post(_conf.application_path + "processors/address.php?act=save", "data=" + JSON.stringify(data), function() {

            });
          }
        }
      });
    },
    form_add_edit_validate: function(c_name, data) {
      var zip_filter = /^\d{5}(?:-\d{4})?$/;
      var zipcodeVal = zip_filter.test(data.zip);
      if (data.type_id === '' || data.type_id === null || data.type_id === '0') {
        dhtmlx.alert({
          title: "Alert",
          type: "alert-error",
          text: "Address type is mandatory",
          callback: function() {
            _form[c_name].setItemFocus('address_type');
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
      //       _form[c_name].setItemValue('address_start', '');
      //       _form[c_name].setItemFocus('address_start');
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
      //       _form[c_name].setItemValue('address_leave', '');
      //       _form[c_name].setItemFocus('address_leave');
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
            _form[c_name].setItemValue('address_leave', '');
            _form[c_name].setItemFocus('address_leave');
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
              _form[c_name].setItemValue('address_zip', '');
              _form[c_name].setItemFocus('address_zip');
            }
          });
          return false;
        }
      }

      return true;
    },
    build_add_edit_form: function(c_name, isEdit, data) {
      var self = this;
      c_name = c_name || _name;
      c_name = c_name + "_" + _uid;
      if (isEdit) {
        //edit

      } else {
        _form[c_name] = _layout[c_name].cells("a").attachForm(self.Model.conf_form.template);
        _layout[c_name].progressOff();
      }

      // Storing all combo boxs
      var address_type = _form[c_name].getCombo("address_type");
      var address_province = _form[c_name].getCombo("address_province");
      var address_country = _form[c_name].getCombo("address_country");
      var address_county = _form[c_name].getCombo("address_county");
      var address_state = _form[c_name].getCombo("address_state");

      // Address Type
      self.Data.create_data_store("address_type", _conf.application_path + "processors/get_data.php?get=address_type");
      var address_type_ds = self.Data.store("address_type");
      address_type_ds.data.scheme({
        $init: function(obj) {
          obj.value = obj.AddressSequence;
          obj.text = obj.AddressType;
        }
      });
      address_type.sync(address_type_ds);

      // Addrss country
      self.Data.create_data_store(
        "address_country",
        _conf.application_path + "processors/get_data.php?get=address_country",
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
      self.Data.create_data_store("address_province", _conf.application_path + "processors/get_data.php?get=address_province");
      var address_province_ds = self.Data.store("address_province");
      address_province_ds.data.scheme({
        $init: function(obj) {
          obj.value = obj.AddressProvinceId;
          obj.text = obj.AddressProvinceText;
        }
      });
      address_province.sync(address_province_ds);

      // Address state
      self.Data.create_data_store("address_state", _conf.application_path + "processors/get_data.php?get=address_state");
      var address_state_ds = self.Data.store("address_state");
      address_state_ds.data.scheme({
        $init: function(obj) {
          obj.value = obj.StateID;
          obj.text = obj.StateName;
        }
      });
      address_state.sync(address_state_ds);

      // Address county
      self.Data.create_data_store("address_county", _conf.application_path + "processors/get_data.php?get=address_county");
      var address_county_ds = self.Data.store("address_county");
      address_county_ds.data.scheme({
        $init: function(obj) {
          obj.value = obj.CountyID;
          obj.text = obj.CountyText;
        }
      });
      address_county.sync(address_county_ds);
      address_province.disable(true);

      // // Events on cobo boxes
      // // --When contries loaded
      // --- On country change
      address_country.attachEvent("onChange", function() {
        var countryid = address_country.getSelectedValue();
        console.log(countryid);
        address_province_ds.data.filter("CountryID", countryid);
        if (address_province_ds.data.dataCount() < 1) {
          address_province.addOption([
            ["0", "Pick a Province"]
          ]);
          address_province.disable(true);
        } else {
          address_province_ds.setCursor(address_province_ds.first());
          address_province.enable(true);
          address_province.addOption([
            ["0", "Pick a Province"]
          ]);
        }

        address_state_ds.data.filter("CountryID", countryid);
        if (address_state_ds.data.dataCount() < 1) {
          address_state.addOption([
            ["0", "Pick a State"]
          ]);
          address_state.disable(true);
          address_county.disable(true);
        } else {
          address_state.enable(true);
          address_county.enable(true);
          address_state.addOption([
            ["0", "Pick a State"]
          ]);
        }
      });

      address_state.attachEvent("onChange", function() {
        var stateid = address_state.getSelectedValue();
        console.log(stateid);
        address_county_ds.data.filter("StateId", stateid);
        if (address_county_ds.data.dataCount() < 1) {
          address_county.addOption([
            ["0", "Select State"]
          ]);
          address_county.disable(true);
        } else {
          address_county.enable(true);
          address_county.addOption([
            ["0", "Select State"]
          ]);
        }
      });

      // Events for inputs
      _form[c_name].attachEvent("onInputChange", function(name) {
        var len = _form[c_name].getItemValue("address_zip").length;
        if (name === 'address_zip') {
          if (len === 5) {
            var zipcode = _form[c_name].getItemValue("address_zip");
            var filter = /^\d{5}(?:-\d{4})?$/;
            var zipcodeVal = filter.test(zipcode);
            if (zipcode !== '' && zipcode !== null) {
              if (zipcodeVal !== true) {
                dhtmlx.alert({
                  title: "Alert",
                  type: "alert-error",
                  text: "Please enter a valid zipcode",
                  callback: function() {
                    _form[c_name].setItemValue('address_zip', '');
                    _form[c_name].setItemFocus('address_zip');
                  }
                });
              } else {
                dhtmlxAjax.get(_conf.application_path + "processors/get_data.php?get=address_by_zip&zip=" + zipcode, function(loader) {
                  json = JSON.parse(loader.xmlDoc.responseText);
                  if (json.length > 0) {
                    json = json[0];
                    _form[c_name].getCombo("address_state").setComboValue(json.StateID);
                    _form[c_name].getCombo("address_state").setComboText(json.StateName);
                    _form[c_name].getCombo("address_country").setComboValue(json.CountryID);
                    _form[c_name].getCombo("address_country").setComboText(json.CountryName);
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
                _form[c_name].setItemValue('address_zip', '');
                _form[c_name].setItemFocus('address_zip');
              }
            });
          }

        }
      });
    },
    start: function(conf) {
      var self = this;
      self.validate_start(conf);

      _uid = conf.uid;
      _conf = conf;
      self.application_path = _conf.application_path;
      window.dhx_globalImgPath = _conf.dhtmlx_codebase_path + "imgs/";

      _conf["icons_path"] = "asserts/icons/";
      _conf["img_path"] = "asserts/imgs/"


      var internal_dependencies = [
        _conf.application_path + "asserts/css/style.css",
        _conf.dhtmlx_codebase_path + "dhtmlx.css",
        _conf.dhtmlx_codebase_path + "dhtmlx.js",
        self.application_path + "model/model.js",
        self.application_path + "controller/classes/data.js"
      ];
      CAIRS.onDemand.load(internal_dependencies, function() {
        self.Model.init(_conf.application_path + _conf.img_path, _conf.application_path + _conf.icons_path);
        self.Data.init(_conf.application_path);
        dhtmlx.skin = self.Model.globalSkin || "dhx_skyblue";
        if (_conf.useWindow === true) {
          self.build_window();
        }
        self.build_layout();
        self.build_toolbar();
        self.build_grid();

        // self.build_toolbar(_uid);
        // self.build_grid(_uid);
        // self.datastor(_uid);
      });
    },
    validate_start: function(_conf) {
      if ((typeof _conf.uid === 'undefined') || (_conf.uid.length === 0)) {
        dhtmlx.message({
          type: "error",
          text: "uid is missing"
        });
        return;
      }
      if ((typeof _conf.application_path === 'undefined') || (_conf.application_path.length === 0)) {
        dhtmlx.message({
          type: "error",
          text: "application_path is missing"
        });
        return;
      }
      if ((typeof _conf.dhtmlx_codebase_path === 'undefined') || (_conf.dhtmlx_codebase_path.length === 0)) {
        dhtmlx.message({
          type: "error",
          text: "dhtmlx_codebase_path is missing"
        });
        return;
      }
      if ((typeof _conf.agencyid === 'undefined') || (_conf.agencyid.length === 0)) {
        dhtmlx.message({
          type: "error",
          text: "Agency Id is missing"
        });
        return;
      }
    }
  }
}());