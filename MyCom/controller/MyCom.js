var MyCom = (function() {
    var
        _uid = "",
        _name = "MyCom",
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
        build_window: function(w_name, opt) {
            var self = this;
            w_name = w_name || _name;
            w_name = w_name + "_" + _uid;

            if (_conf.window_managerObj) {
                _window_manager = _conf.window_managerObj;
            } else {
                if (_window_manager === null) {
                    _window_manager = new dhtmlXWindows();
                }
            }
            if (_window_manager.isWindow(w_name)) {
                //console.log(_window_manager)
                _window[w_name].show();
                _window[w_name].bringToTop();
                _window[w_name].center();
                return;
            }
            _window[w_name] = _window_manager.createWindow(w_name, self.model.conf_window.left + 10, self.model.conf_window.top + 10, self.model.conf_window.width, self.model.conf_window.height);
            // self.dhtmlxWidowCustomPostion(_window[_uid], self.model.conf_window.top);
            _window[w_name].setText(self.model.text_labels.main_window_title);
            //_window[_uid].setIcon(self.model.conf_window.icon, self.model.conf_window.icon_dis);
            _window[w_name].center();
            _window[w_name].denyPark();

            // Events on Windows
            _window[w_name].attachEvent("onClose", function(win) {
                return true;
            });

            // _status_bar[_uid] = _window[_uid].attachStatusBar();
        },
        build_layout: function(l_name) {
            var self = this;
            l_name = l_name || _name;
            l_name = l_name + "_" + _uid;

            if (_conf.useWindow === true) {
                _layout[l_name] = _window[l_name].attachLayout(self.model.conf_layout.pattern);
            } else {
                _layout[l_name] = new dhtmlXLayoutObject(_conf.parentDIVId, self.model.conf_layout.pattern);
            }
            _layout[l_name].cells("a").hideHeader();
            _layout[l_name].progressOn();
        },
        build_form: function(f_name) {
            var self = this;
            f_name = f_name || _name;
            f_name = f_name + "_" + _uid;
            _form[f_name] = _layout[f_name].cells("a").attachForm(self.model.form.conf_form);
            _layout[f_name].progressOff();

            // data = new DataStore({
            //     url: self.application_path + "processors/get-data.php",
            //     type: "json"
            // });

            var myDataStore = new dhtmlXDataStore();
            myDataStore.load(self.application_path + "processors/get-data.php");
            console.log(myDataStore);
            var com = _form[f_name].getCombo("com");
            // com.setTemplate({
            //     input: "#email#",
            //     option: "#name#"
            // });

            myDataStore.data.scheme({
                $init: function(obj) {
                    obj.value = obj.Code;
                    obj.text = obj.Name;
                }
            });
            com.sync(myDataStore);
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
                _conf.dhtmlx_codebase_path + "dhtmlx.css",
                _conf.application_path + "asserts/css/MyCom.css",
                _conf.dhtmlx_codebase_path + "dhtmlx.js",
                self.application_path + "model/model.js",
                self.application_path + "model/form.js",
                self.application_path + "controller/classes/data.js"
            ];
            CAIRS.onDemand.load(internal_dependencies, function() {
                self.model.init(_conf.application_path + _conf.icon_path, _conf.application_path + _conf.img_path);
                dhtmlx.skin = self.model.globalSkin || "dhx_skyblue";

                if (_conf.useWindow === true) {
                    self.build_window();
                }
                self.build_layout();
                self.build_form();
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