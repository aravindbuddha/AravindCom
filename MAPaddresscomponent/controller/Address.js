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
      var selectedRowsId;
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

      if (_conf.useWindow === true) {
        _grid[c_name].setInitWidths(self.Model.conf_grid.widths);
      } else {
        _grid[c_name].setInitWidths(self.Model.conf_grid.widths_layout);
      }
      _grid[c_name].setColAlign(self.Model.conf_grid.colaligns);
      _grid[c_name].setColTypes(self.Model.conf_grid.coltypes);
      _grid[c_name].setColSorting(self.Model.conf_grid.colsorting);
      _grid[c_name].selMultiRows = false;
      _grid[c_name].enableAutoWidth(true);
      _grid[c_name].enableMultiline(true);
      _grid[c_name].setDateFormat("%m-%d-%Y");
      _grid[c_name].setColumnsVisibility(self.Model.conf_grid.visibility);
      _grid[c_name].init();
      _layout[c_name].progressOff();
      //_grid[c_name].parse(self.data_store[uid].address, "json");
      // _toolbar[c_name].disableItem("delete_address");
      // _toolbar[c_name].disableItem("edit_address");
      // _grid[c_name].attachEvent("onRowDblClicked", function(rowId, cellInd) {
      //   self._editwindow(uid, 'Edit');
      //   self._editlayout(uid);
      //   //self._edittoolbar(uid, 'Edit');
      //   self._form(uid, 'Edit');
      // });
      // _grid[c_name].attachEvent("onEnter", function(rowId, cellInd) {
      //   self._editwindow(uid, 'Edit');
      //   self._editlayout(uid);
      //   // self._edittoolbar(uid, 'Edit');
      //   self._form(uid, 'Edit');
      // });
      // _grid[c_name].attachEvent("onRowSelect", function(rowId, cellInd) {
      //   _toolbar[c_name].enableItem("delete_address");
      //   _toolbar[c_name].enableItem("edit_address");
      // });
    },
    build_add_edit_form: function(c_name, isEdit) {
      var self = this;
      c_name = c_name || _name;
      c_name = c_name + "_" + _uid;
      if (isEdit) {
        //edit

      } else {
        _form[c_name] = _layout[c_name].cells("a").attachForm(self.Model.conf_form.template);
        _layout[c_name].progressOff();
      }
      // data = new DataStore({
      //     url: self.application_path + "processors/get-data.php",
      //     type: "json"
      // });

      // var myDataStore = new dhtmlXDataStore();
      // myDataStore.load(self.application_path + "processors/get-data.php");
      // console.log(myDataStore);
      var address_type = _form[c_name].getCombo("address_type");
      var address_province = _form[c_name].getCombo("address_province");
      var address_country = _form[c_name].getCombo("address_country");
      var address_County = _form[c_name].getCombo("address_County");
      var address_state = _form[c_name].getCombo("address_state");
      console.log(self.Data.store("address_state"));

      self.Data.store("address_type").data.scheme({
        $init: function(obj) {
          obj.value = obj.text = obj.AddressType;
        }
      });

      address_type.sync(self.Data.store("address_type"));

      // myDataStore.data.scheme({
      //   $init: function(obj) {
      //     obj.value = obj.Code;
      //     obj.text = obj.Name;
      //   }
      // });
      // com.sync(myDataStore);
      // myDataStore.bind(com, function(data, filter) {
      //     com.addOption([
      //         [data.label, data.name]
      //     ]);
      // });
      //com.bind(myDataStore);
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