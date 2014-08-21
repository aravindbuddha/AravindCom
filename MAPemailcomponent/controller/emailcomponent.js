var emailcomponent = (function() {
  var
    uid = "",
    com_name = "Email",
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
    is_edit_mode = false,
    is_edited = null;

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
      grid[_name].setDateFormat("%m-%d-%Y");
      grid[_name].init();
      self._datastor(_name);
      self.set_status(_name, "Ready to use");
    },
    /**
     * [Load data in dhtmlx grid]
     * @param  {string} _name [name of the gird]
     */
    _datastor: function(_name) {
      var self = this,
        grid_state;
      var postStr = "contact_id=" + config.contact_id + "&agency_id=" + config.agency_id;
      dhtmlxAjax.post(config.application_path + "processors/get_data.php", postStr, function(loader) {
        try {
          var json = JSON.parse(loader.xmlDoc.responseText);

          if (json.status == "success") {
            grid[_name].parse(json.email, "json");
            if (config.useWindow === true) {
              self.set_status(_name, "Ready to use");
            }
            layout[_name].progressOff();
          } else
          if (json.status == "norecords") {
            layout[_name].progressOff();
            grid_state = grid[_name].getStateOfView();
            if (grid_state[2] == 0) {
              grid[_name].addRow(-1, ["<div style='margin: 0 auto; color: #00A9E1; width:550px; font-size : 20px; text-align: center;'>No records found.Please click the 'Add Email' option in the toolbar to add an email</div>"]);
              grid[_name].setRowTextStyle(-1, "height:120px;");
              grid[_name].enableColSpan(true);
              grid[_name].setColspan(-1, 0, 3);
            }
          } else {
            dhtmlx.message({
              type: "error",
              text: json.response
            });
          }
        } catch (e) {
          dhtmlx.message({
            type: "error",
            text: "Fatal error on server side: " + loader.xmlDoc.responseText
          });
        }
      });
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
      if (config.use_window !== true) {
        toolbar[_name].removeItem("help_email");
        toolbar[_name].removeItem("close_email");
      }
      toolbar[_name].disableItem("delete_email");
      toolbar[_name].disableItem("edit_email");
      this._toolbar_events();
    },
    /**
     * [Events on main toolbar]
     * @param  {[string]} _name [description]
     * @return {[type]}       [description]
     */
    _toolbar_events: function(_name) {
      var self = this,
        _name = _name || com_name;
      toolbar[_name].attachEvent("onClick", function(id) {
        if (id == "add_email") {
          self.build_window("Add_Edit", self.Model.new_window);
          self._window_add_edit_extend("Add_Edit");
          self._toolbar_add_edit("Add_Edit");
          self._form_add_edit("Add_Edit", false);
        }
        if (id == "edit_email") {
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
          is_edited = false;
          self._toolbar_add_edit("Add_Edit");
          self._form_add_edit("Add_Edit", true);
        }
        if (id == "delete_email") {
          var
            count = 0,
            is_primary = false,
            selected_row_ids = grid[_name].getSelectedRowId();
          selected_row_ids = selected_row_ids.split(',');
          count = selected_row_ids.length;
          dhtmlx.confirm({
            title: "Delete Email",
            type: "confirm-warning",
            text: "Are you sure you want to delete the Email(s) ?",
            callback: function(result) {
              if (result === true) {
                layout[_name].progressOn();
                self.set_status(_name, "Deleting Records..");
                selected_row_ids.forEach(function(row_id) {
                  if (grid[com_name].cells(row_id, 1).getValue('add_primarytext') == 'Yes') {
                    count--;
                    dhtmlx.alert({
                      type: "alert-error",
                      text: "Primary email-id cannot be deleted!"
                    });
                    is_primary = true;
                    if (!count) {
                      layout[_name].progressOff();
                      self.set_status(_name, "Ready to use.");
                    }
                    return true;
                  }

                  var data = {
                    contact_id: config.contact_id,
                    contact_email_id: row_id,
                    agency_id: config.agency_id
                  };

                  //var MAPemail_delet_params = "contactId=" + self.configuration[uid].contactid + "&contactemailId=" + selectedRowsId + "&agencyid=" + self.configuration[uid].agencyid;
                  dhtmlxAjax.post(config.application_path + "processors/deleteemailInfo.php", "data=" + JSON.stringify(data), function(loader) {
                    try {
                      var json = JSON.parse(loader.xmlDoc.responseText);
                      if (json.status == "success") {
                        grid[com_name].deleteRow(row_id);
                        count--;
                        if (!count) {
                          if (!is_primary)
                            dhtmlx.alert({
                              text: "Successfully deleted."
                            });

                          layout[_name].progressOff();
                          self.set_status(_name, "Ready to use.");
                        }
                        toolbar[_name].disableItem("delete_email");
                        toolbar[_name].disableItem("edit_email");

                      } else {
                        dhtmlx.message({
                          type: "error",
                          text: json.response
                        });
                        win[com_name].progressOff();
                      }
                    } catch (e) {
                      dhtmlx.message({
                        type: "error",
                        text: "Fatal error on server side: " + loader.xmlDoc.responseText
                      });
                      win[com_name].progressOff();
                    }

                  });
                });
              } else {
                win[com_name].progressOff();
              }
            }

          });
        }
      });
    },
    _window_add_edit_extend: function(_name) {
      win[_name].setModal(true);
      config.close_event = win[_name].attachEvent("onClose", function(win) {
        form[_name].detachEvent(config.email_change);
        if (is_edited == true) {
          dhtmlx.confirm({
            //title: "Alert",
            type: "confirm",
            text: "Are you sure you want to close this window without saving the changes ?",
            ok: "Yes",
            cancel: "No",
            callback: function(val) {
              if (val) {
                win.detachEvent(config.close_event);

                win.close();
                is_edited = null;
                return true;
              }
              config.email_change = form[_name].attachEvent("onBlur", function(name, value) {

                if (name == "email") {
                  var email = form[_name].getItemValue("email");
                  var filter = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                  var emailVal = filter.test(email);
                  if (emailVal != true) {
                    dhtmlx.alert({
                      type: "alert-error",
                      title: "Alert",
                      text: "Please enter a valid Email",
                      callback: function() {
                        form[_name].setItemValue('email', '');
                        form[_name].setItemFocus('email');
                      }
                    });
                  }
                }
              });
              return false;
            }
          });
        } else {
          win.detachEvent(config.close_event);
          win.close();
          is_edited = null;
        }

      });
    },
    /**
     * [_grid_main ]
     * @param  {[type]} _name [description]
     * @return {[type]}       [description]
     */
    _grid_main: function(_name) {
      var self = this;
      _name = _name || com_name;
      self.build_grid(_name, self.Model.conf_grid);
      self._grid_main_events(_name);
    },
    /**
     * [_grid_main_events description]
     * @param  {[type]} _name [description]
     * @return {[type]}       [description]
     */
    _grid_main_events: function(_name) {
      var self = this;
      grid[_name].attachEvent("onRowDblClicked", function(rowId, cellInd) {
        self.build_window("Add_Edit", self.Model.edit_window);
        self._window_add_edit_extend("Add_Edit");
        is_edited = false;
        self._toolbar_add_edit("Add_Edit");
        self._form_add_edit("Add_Edit", true);
      });
      grid[_name].attachEvent("onEnter", function(rowId, cellInd) {
        self.build_window("Add_Edit", self.Model.edit_window);
        self._window_add_edit_extend("Add_Edit");
        is_edited = false;
        self._toolbar_add_edit("Add_Edit");
        self._form_add_edit("Add_Edit", true);
      });
      grid[_name].attachEvent("onRowSelect", function(rowId, cellInd) {
        toolbar[_name].enableItem("delete_email");
        toolbar[_name].enableItem("edit_email");
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
      this._toolbar_add_edit_events(_name);
    },
    /**
     * [_toolbar_add_edit_events description]
     * @param  {[type]} _name [description]
     * @return {[type]}       [description]
     */
    _toolbar_add_edit_events: function(_name) {
      var
        self = this,
        add_primarytext,
        data = {};

      toolbar[_name].attachEvent("onClick", function(id) {
        if (id == "save_email") {
          if (is_edited == false) {
            dhtmlx.alert({
              type: alert,
              text: "No updates found!",
              callback: function(result) {}
            });
          } else {

            data = {
              contact_id: config.contact_id,
              contact_id_email: form[_name].getItemValue("contact_id_email"),
              email_type: form[_name].getCombo("email_type").getSelectedValue(),
              type: form[_name].getCombo("email_type").getSelectedText(),
              contact_email: form[_name].getItemValue("email"),
              email_mailing: form[_name].getItemValue("primary_email"),
              agency_id: config.agency_id,
              email_id_hidden: form[_name].getItemValue("email_id")
            };



            if (self._form_add_edit_validate(_name, data)) {
              layout[_name].progressOn();
              self.set_status(_name, "Saving Record...");

              //var MAPemail_params = "contact_ID_email=" + self.form[uid].getItemValue("contact_ID_email") + "&Emailmailing=" + self.form[uid].getItemValue("primaryEmail") + "&contactEmailStr=" + self.form[uid].getItemValue("email") + "&emailTypeStr=" + self.form[uid].getItemValue("emailType1") + "&email_ID_hidden=" + self.form[uid].getItemValue("email_ID") + "&agencyid=" + self.configuration[uid].agencyid;
              dhtmlxAjax.post(config.application_path + "processors/savetoairs.php", "data=" + JSON.stringify(data), function(loader) {
                var json = JSON.parse(loader.xmlDoc.responseText);
                if (json.status == "success") {
                  dhtmlx.message({
                    text: "Record saved"
                  });
                  layout[_name].progressOff();
                  if (form[_name].getItemValue("primary_email") == 0)
                    add_primarytext = 'No';
                  else
                    add_primarytext = 'Yes';

                  if (grid[com_name].getRowsNum() > 0 && form[_name].getItemValue("primary_email") == 1) {
                    grid[com_name].forEachRow(function(id) {
                      grid[com_name].cells(id, 1).setValue('No');
                    });
                  }
                  if (form[_name].getItemValue("email_id") == 0) {
                    grid[com_name].deleteRow(-1);
                    grid[com_name].addRow(json.addid, [form[_name].getItemValue("email"), add_primarytext, form[_name].getCombo("email_type").getSelectedText()], '');
                  } else {
                    grid[com_name].cells(json.addid, 2).setValue(form[_name].getCombo("email_type").getSelectedText());
                    grid[com_name].cells(json.addid, 0).setValue(form[_name].getItemValue("email"));
                    grid[com_name].cells(json.addid, 1).setValue(add_primarytext);
                  }
                  win[_name].detachEvent(config.close_event);
                  win[_name].close();
                  is_edited = null;
                } else {
                  layout[_name].progressOff();
                  dhtmlx.message({
                    type: "error",
                    text: json.response
                  });
                }
              });
            }
          }
        }
        if (id == 'close_add_edit_email') {
          win[_name].close();
        }
      });
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
        filter = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        emailVal = filter.test(data.contact_email);
      form[_name].detachEvent(config.email_change);
      //if (!is_edit_mode) {
      if (data.contact_id === '' || data.contact_id === null) {
        dhtmlx.alert({
          title: "Alert",
          type: "alert-error",
          text: "ContactId Is Missing"
        });
        return false;
      } else if (data.email_type === '' || data.email_type === null || data.email_type === '0') {
        dhtmlx.alert({
          title: "Alert",
          type: "alert-error",
          text: "Email Type is mandatory",
          callback: function(res) {
            config.email_change = form[_name].attachEvent("onBlur", function(name, value) {

              if (name == "email") {
                var email = form[_name].getItemValue("email");
                var filter = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                var emailVal = filter.test(email);
                if (emailVal != true) {
                  dhtmlx.alert({
                    type: "alert-error",
                    title: "Alert",
                    text: "Please enter a valid Email",
                    callback: function() {
                      form[_name].setItemValue('email', '');
                      form[_name].setItemFocus('email');
                    }
                  });
                }
              }
            });
          }
        });
        self.set_status(_name, "* Fields are mandatory", "err");
        return false;
      } else if (data.contact_email === '' || data.contact_email === null) {
        dhtmlx.alert({
          title: "Alert",
          type: "alert-error",
          text: "Email is mandatory",
          callback: function(res) {
            config.email_change = form[_name].attachEvent("onBlur", function(name, value) {

              if (name == "email") {
                var email = form[_name].getItemValue("email");
                var filter = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                var emailVal = filter.test(email);
                if (emailVal != true) {
                  dhtmlx.alert({
                    type: "alert-error",
                    title: "Alert",
                    text: "Please enter a valid Email",
                    callback: function() {
                      form[_name].setItemValue('email', '');
                      form[_name].setItemFocus('email');
                    }
                  });
                }
              }
            });
          }
        });
        self.set_status(_name, "* Fields are mandatory", "err");
        return false;
      } else if (emailVal !== true) {
        dhtmlx.alert({
          title: "Alert",
          type: "alert-error",
          text: "Please enter a valid email",
          callback: function() {
            form[_name].setItemValue('email', '');
            form[_name].setItemFocus('email');
            config.email_change = form[_name].attachEvent("onBlur", function(name, value) {

              if (name == "email") {
                var email = form[_name].getItemValue("email");
                var filter = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                var emailVal = filter.test(email);
                if (emailVal != true) {
                  dhtmlx.alert({
                    type: "alert-error",
                    title: "Alert",
                    text: "Please enter a valid Email",
                    callback: function() {
                      form[_name].setItemValue('email', '');
                      form[_name].setItemFocus('email');
                    }
                  });
                }
              }
            });
          }

        });
        self.set_status(_name, "* Fields are mandatory", "err");
        return false;
      } else {
        return true;
      }

    },
    /**
     * [_form_add_edit description]
     * @param  {[type]}  _name  [description]
     * @param  {Boolean} isEdit [description]
     * @return {[type]}         [description]
     */
    _form_add_edit: function(_name, isEdit) {
      var self = this,
        primary_email;
      _name = _name || com_name;



      form[_name] = layout[_name].cells("a").attachForm(self.Model.conf_form.template);
      layout[_name].progressOn();
      self.set_status(_name, "Loading....");

      form[_name].getCombo("email_type").enableOptionAutoHeight(1);
      form[_name].getCombo("email_type").readonly(true);
      // self._form_data_storage_fill(_name);
      form[_name].enableLiveValidation(true);
      form[_name].setItemValue("contact_id_email", config.contact_id);
      if (isEdit) {
        if (grid[com_name].cells(grid[com_name].getSelectedRowId(), 1).getValue() == 'Yes')
          primary_email = 1;
        else
          primary_email = 0;
        form[_name].setItemValue("email_id", grid[com_name].getSelectedRowId());
        form[_name].setItemValue("email", grid[com_name].cells(grid[com_name].getSelectedRowId(), 0).getValue());
        form[_name].setItemValue("email_type", grid[com_name].cells(grid[com_name].getSelectedRowId(), 2).getValue());
        form[_name].setItemValue("primary_email", primary_email);
        form[_name].getCombo("email_type").loadXML(config.application_path + "processors/emailtypelist.php?agencyid=" + config.agency_id + "&id=" + grid[com_name].cells(grid[com_name].getSelectedRowId(), 2).getValue());

      } else {
        //self.form[uid].getCombo("emailType1").setComboText("-- Select Email Type --");
        form[_name].getCombo("email_type").loadXML(config.application_path + "processors/emailtypelist.php?agencyid=" + config.agency_id + "&id=0");
      }
      //self.form[uid].getCombo("primaryEmail").enableOptionAutoHeight(1);




      self._form_add_edit_events(_name);
    },
    /**
     * [_form_add_edit_events description]
     * @param  {[type]} _name [description]
     * @return {[type]}       [description]
     */
    _form_add_edit_events: function(_name) { // Events for inputs
      var self = this;
      form[_name].getCombo("email_type").attachEvent("onXLE", function() {
        layout[_name].progressOff();
        self.set_status(_name, "Ready to use.");
        form[_name].getCombo("email_type").attachEvent("onChange", function() {
          is_edited = true;
        });
      });

      form[_name].attachEvent("onInputChange", function() {
        is_edited = true;
      });
      form[_name].attachEvent("onChange", function(name, value) {
        if (name == "primary_email")
          is_edited = true;
      });
      config.email_change = form[_name].attachEvent("onBlur", function(name, value) {
        if (name == "email") {
          var email = form[_name].getItemValue("email");
          var filter = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          var emailVal = filter.test(email);
          if (emailVal != true) {
            dhtmlx.alert({
              type: "alert-error",
              title: "Alert",
              text: "Please enter a valid Email",
              callback: function() {
                form[_name].setItemValue('email', '');
                form[_name].setItemFocus('email');
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
        config.dhtmlx_codebase_path + "dhtmlx.css",
        config.dhtmlx_codebase_path + "dhtmlx.js",
        config.application_path + "js/json2.js",
        self.application_path + "model/emailcomponent_Model.js",
        //self.application_path + "controller/classes/data.js"
      ];

      if (com_dhx_version === "4.0") {
        internal_dependencies.push(config.dhtmlx_codebase_path + "dhtmlx_deprecated.js");
      }
      CAIRS.onDemand.load(internal_dependencies, function() {
        self.Model.init(config.application_path + config.img_path, config.application_path + config.icons_path);
        //self.Data.init(config);

        dhtmlx.skin = self.Model.globalSkin || "dhx_skyblue";
        if (config.use_window === true) {
          self.build_window();
          self.set_status(com_name, "Loading.....");
        } else {
          self._layout();
        }
        self._toolbar();
        self._grid_main();
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
      color = (_type == "err") ? "#FF0000" : color;
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
      if ((typeof config.contact_id === 'undefined') || (config.contact_id.length === 0)) {
        dhtmlx.message({
          type: "error",
          text: "Contact Id is missing"
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