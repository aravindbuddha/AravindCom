// var addresscomponent = {
//   uid: null,
//   window_manager: null,
//   window: [],
//   layout: [],
//   toolbar: [],
//   grid: [],
//   form: [],
//   status_bar: [],
//   _configuration: [],
//   editstatus_bar: [],
//   editwindows: [],
//   edittoolbar: [],
//   editlayout: [],
//   window_help: [],
//   data_store: [],
//   importaddress: [],
//   has_couple: null,
//   primaryaddress: null,
//   combo_value: [],

//   // Window Manager
//   _window_manager: function() {
//     var self = this;
//     _window_manager = new dhtmlXWindows();
//     _window_manager.setImagePath(self.model.conf_window.image_path);
//   },

//   // Window
//   _window: function(uid) {
//     var self = this;
//     if (_configuration.window_managerObj === null) {
//       if (_window_manager === null)
//         self._window_manager();
//     } else {
//       _window_manager = _configuration.window_managerObj;

//     }

//     if (_window_manager.isWindow("Address_" + uid)) {
//       //console.log(_window_manager)
//       _window[uid].show();
//       _window[uid].bringToTop();
//       _window[uid].center();
//       return;
//     }
//     _window[uid] = _window_manager.createWindow("Address_" + uid, self.model.conf_window.left + 10, self.model.conf_window.top + 10, self.model.conf_window.width, self.model.conf_window.height);
//     self.dhtmlxWidowCustomPostion(_window[uid], self.model.conf_window.top);
//     _window[uid].setText(self.model.text_labels.main_window_title);
//     _window[uid].setIcon(self.model.conf_window.icon, self.model.conf_window.icon_dis);
//     _window[uid].center();
//     _window[uid].denyPark();

//     _window[uid].attachEvent("onClose", function(win) {


//       return true;

//     });

//     self.status_bar[uid] = _window[uid].attachStatusBar();

//   },

//   //Layout
//   _layout: function(uid) {
//     var self = this;

//     if (_configuration.useWindow === true) {
//       _layout[uid] = _window[uid].attachLayout(self.model.conf_layout.pattern);
//     } else {
//       _layout[uid] = new dhtmlXLayoutObject(_configuration.parentDIVId, self.model.conf_layout.pattern);
//     }
//     _layout[uid].cells("a").hideHeader();
//     _layout[uid].progressOn();
//   },
//   importaddress: function(uid) {
//     var self = this;
//     //alert(_configuration.contactcomponent_obj._configuration.p1contactid);
//     var contact_import = _configuration.contactcomponent_obj._configuration.p1contactid;
//     if (contact_import != '0') {
//       MAPaddres_parms = "isimport=import" + "&contact_import=" + contact_import + "&agencyid=" + _configuration.agencyid +
//         '&contactid=' + _configuration.contactcomponent_obj._configuration.contactid;
//       dhtmlxAjax.post(_configuration.application_path + "processors/savetoairs.php", MAPaddres_parms, function(loader) {
//         json = JSON.parse(loader.xmlDoc.responseText);
//         if (json.status == 'has_couple') {

//           self.has_couple = "coupleuser";
//         } else if (json.status == 'no_couple')
//           self.has_couple = "singleuser";

//         setTimeout(function() {
//           self._edittoolbar(uid, 'New');
//           self.editlayout[uid].progressOff();
//           self.show = 1;
//         }, 2000);

//       });

//     }

//   },
//   openaddresswindow: function(uid) {
//     var self = this;
//     self._editwindow(uid, 'New');
//     self._editlayout(uid);
//     //     self.importaddress(uid);
//     self._form(uid, 'New');
//   },
//   //toolbar
//   _toolbar: function(uid) {
//     var self = this;
//     var selectedRowsId;
//     _toolbar[uid] = _layout[uid].cells("a").attachToolbar(self.model.conf_toolbar);
//     _toolbar[uid].setSkin(self.model.globalSkin);
//     if (_configuration.useWindow !== true) {
//       _toolbar[uid].removeItem("help_address");
//       _toolbar[uid].removeItem("close_address");
//     }


//     _toolbar[uid].attachEvent("onClick", function(id) {
//       if (MAPPermissions.checkAccessPermission(id) != 1) {
//         if (id == "add_address") {

//           if (_configuration.window_managerObj !== null) {
//             if (_configuration.contactcomponent_obj._configuration.contactid == 0) {
//               if (_configuration.contactcomponent_obj.validation(uid) === true) {

//                 _configuration.contactcomponent_obj.savecontact(uid, 'temp', function() {
//                   self.openaddresswindow(self.uid);
//                 });
//                 //removed and added  in function openaddresswindow      

//               }
//             } else {

//               self._editwindow(uid, 'New');
//               self._editlayout(uid);
//               setTimeout(function() {
//                 //        self.importaddress(uid);
//                 //self._edittoolbar(uid, 'New');
//               }, 2000);
//               self._form(uid, 'New');
//             }
//           } else {
//             self._editwindow(uid, 'New');
//             self._editlayout(uid);
//             setTimeout(function() {
//               //self._edittoolbar(uid, 'New');
//               //     self.importaddress(uid);
//               self._form(uid, 'New');
//             }, 4000);
//           }
//         }
//         if (id == "delete_address") {
//           selectedRowsId = _grid[uid].getSelectedRowId();
//           if (selectedRowsId !== null) {
//             self.deleteRow(uid, selectedRowsId);
//           }
//         }
//         if (id == "help_address") {
//           self._showHelp(uid);
//         }
//         if (id == "edit_address") {
//           self._editwindow(uid, 'Edit');
//           self._editlayout(uid);
//           //self._edittoolbar(uid, 'Edit');
//           //  self.importaddress(uid);
//           self._form(uid, 'Edit');
//         }
//         if (id == "close_address") {
//           _window[uid].close();
//         }
//       }
//     });
//   },
//   _editwindow: function(uid, task) {
//     var self = this;
//     if (_configuration.window_managerObj === null) {
//       if (_window_manager === null)
//         self._window_manager();
//     } else {
//       _window_manager = _configuration.window_managerObj;
//       //            alert(_window_manager);
//     }
//    _window[task] = _window_manager.createWindow('window_address_edit_' + uid, self.model.conf_window.left + 10, self.model.conf_window.left + 10, self.model.conf_window.self.model_edit_winHeight, self.model.conf_window.self.model_edit_winWidth);
//     self.dhtmlxWidowCustomPostion(self.editwindows[uid], self.model.conf_window.top);
//     if (task == 'New')
//      _window[task].setText('Add Address');
//     else
//      _window[task].setText('Edit Address');

//    _window[task].setModal(true);
//    _window[task].button('park').hide();
//    _window[task].button('minmax1').hide();
//    _window[task].setIcon(self.model.conf_window.icon, self.model.conf_window.icon);
//     self.editstatus_bar[uid] =_window[task].attachStatusBar();
//     self.editstatus_bar[uid].setText("");
//     _configuration.closewindow =_window[task].attachEvent("onClose", function(win) {
//       self.confirmCloseWindow(uid);

//       //return true;

//     });
//   },
//   confirmCloseWindow: function(uid) {
//     var self = this;

//     if (_configuration.edited == 1) {
//       dhtmlx.confirm({
//         type: "confirm",
//         text: "Are you sure you want to close this window without saving the changes ?",
//         callback: function(OK) {
//           //alert(OK);
//           if (OK) {
//            _window[task].detachEvent(_configuration.closewindow);
//            _window[task].close();
//           } else {
//             return false;
//           }
//         }
//       });
//     } else {
//      _window[task].detachEvent(_configuration.closewindow);
//      _window[task].close();
//     }
//     return i;
//   },
//   _editlayout: function(uid) {
//     var self = this;
//     self.editlayout[uid] =_window[task].attachLayout(self.model.conf_layout.pattern);
//     self.editlayout[uid].progressOn();
//     self.editlayout[uid].cells("a").hideHeader();
//   },
//   _edittoolbar: function(uid, task) {
//     var self = this;
//     self.edittoolbar[uid] = self.editlayout[uid].cells("a").attachToolbar(self.model.edit_toolbar);


//     if (self.has_couple == 'coupleuser') {
//       self.edittoolbar[uid].enableItem("import_address");
//     } else if (self.has_couple == 'singleuser')
//       self.edittoolbar[uid].disableItem("import_address");

//     self.edittoolbar[uid].setSkin(self.model.globalSkin);
//     self.edittoolbar[uid].attachEvent("onClick", function(id) {
//       if (id == "save_address") {
//         if (_configuration.edited == 0) {
//           dhtmlx.alert({
//             type: alert,
//             text: "No updates found!",
//             callback: function(result) {}
//           });
//         } else {
//           self.addRow(uid, task);
//         }
//         //self.addRow(uid, task);
//       }
//       if (id == "help_address") {
//         self._showHelp(uid);
//       }
//       if (id == "close_editaddress") {
//         //self.editwindows[uid].close();
//         self.confirmCloseWindow(uid);
//       }
//       if (id == "import_address") {

//         self._form(uid, 'import_address');
//       }
//     });
//     //  self.editlayout[uid].progressOff();
//   },
//   addRow: function(uid, task) {
//     var self = this;
//     var add_primarytext, MAPaddres_parms, address_start1, address_leave1, json, address_County, address_country, address_province;
//     if (self.hasprimaryaddress == 1 && (_form[_name].getItemValue("MailingAddress") == 0)) {
//       _form[_name].setItemValue("MailingAddress", 1);
//     }

//     if (self.validate(uid, task) === true) {
//       self.editlayout[uid].progressOn();
//       if (_configuration.window_managerObj !== null) {
//         if (_form[_name].getItemValue("contact_ID") == 0) {
//           _form[_name].setItemValue("contact_ID", _configuration.contactcomponent_obj._configuration.contactid);
//         }
//       }

//       address_start1 = _form[_name].getItemValue("address_start");
//       if (address_start1 !== "") {
//         address_start1 = self.dateFormat(uid, address_start1, '');
//       }
//       address_leave1 = _form[_name].getItemValue("address_leave");
//       if (address_leave1 !== "") {
//         address_leave1 = self.dateFormat(uid, address_leave1, '');
//       }
//       MAPaddres_parms = "address_ID=" + _form[_name].getItemValue("address_ID") + "&contact_ID=" + _form[_name].getItemValue("contact_ID") + "&address_type=" + _form[_name].getItemValue("address_type") + "&address_address1=" + _form[_name].getItemValue("address_address1") + "&address_address2=" + _form[_name].getItemValue("address_address2") + "&address_city=" + _form[_name].getItemValue("address_city") + "&address_state=" + _form[_name].getItemValue("address_state") + "&address_zip=" + _form[_name].getItemValue("address_zip") + "&address_country=" + _form[_name].getItemValue("address_country") + "&address_County=" + _form[_name].getItemValue("address_County") + "&address_province=" + _form[_name].getItemValue("address_province") + "&mailing=" + _form[_name].getItemValue("MailingAddress") + "&address_leave=" + address_leave1 + "&address_start=" + address_start1 + "&agencyid=" + _configuration.agencyid;

//       dhtmlxAjax.post(_configuration.application_path + "processors/savetoairs.php", MAPaddres_parms, function(loader) {
//         json = JSON.parse(loader.xmlDoc.responseText);
//         if (json.status == "success") {
//           dhtmlx.message({
//             text: "Record saved"
//           });
//           self.editlayout[uid].progressOff();
//           if (_form[_name].getItemValue("MailingAddress") == 0)
//             add_primarytext = 'No';
//           else
//             add_primarytext = 'Yes';
//           if (_form[_name].getCombo("address_County").getComboText() == '-- Select County --')
//             address_County = '';
//           else
//             address_County = _form[_name].getCombo("address_County").getSelectedText();

//           if (_form[_name].getCombo("address_country").getSelectedText() == 'Pick a Country')
//             address_country = '';
//           else
//             address_country = _form[_name].getCombo("address_country").getSelectedText();
//           if (_form[_name].getCombo("address_province").getComboText() === '-- Select Province --')
//             address_province = '';
//           else
//             address_province = _form[_name].getCombo("address_province").getSelectedText();
//           if (_form[_name].getItemValue("MailingAddress") == 0)
//             add_primarytext = 'No';
//           else
//             add_primarytext = 'Yes';

//           if (_grid[uid].getRowsNum() > 0 && _form[_name].getItemValue("MailingAddress") == 1) {
//             _grid[uid].forEachRow(function(id) {
//               _grid[uid].cells(id, 9).setValue('No');
//             });
//           }

//           if (_form[_name].getItemValue("address_ID") === 0 || _form[_name].getItemValue("address_ID") === '' || _form[_name].getItemValue("address_ID") === null) {

//             _grid[uid].addRow(json.addid, [_form[_name].getCombo("address_type").getSelectedText(), _form[_name].getItemValue("address_address1"), _form[_name].getItemValue("address_address2"), _form[_name].getItemValue("address_city"), _form[_name].getCombo("address_state").getSelectedText(), _form[_name].getItemValue("address_zip"), address_County, address_country, address_province, add_primarytext, address_start1, address_leave1], '');

//            _window[task].detachEvent(_configuration.closewindow);
//            _window[task].close();
//           } else {
//             _grid[uid].cells(json.addid, 0).setValue(_form[_name].getCombo("address_type").getSelectedText());
//             _grid[uid].cells(json.addid, 1).setValue(_form[_name].getItemValue("address_address1"));
//             _grid[uid].cells(json.addid, 2).setValue(_form[_name].getItemValue("address_address1"));
//             _grid[uid].cells(json.addid, 3).setValue(_form[_name].getItemValue("address_city"));
//             _grid[uid].cells(json.addid, 4).setValue(_form[_name].getCombo("address_state").getSelectedText());
//             _grid[uid].cells(json.addid, 5).setValue(_form[_name].getItemValue("address_zip"));
//             _grid[uid].cells(json.addid, 6).setValue(address_County);
//             _grid[uid].cells(json.addid, 7).setValue(address_country);
//             _grid[uid].cells(json.addid, 8).setValue(address_province);
//             _grid[uid].cells(json.addid, 9).setValue(add_primarytext);
//             _grid[uid].cells(json.addid, 10).setValue(address_start1);
//             _grid[uid].cells(json.addid, 11).setValue(address_leave1);
//            _window[task].detachEvent(_configuration.closewindow);
//            _window[task].close();

//           }

//         } else {
//           self.editlayout[uid].progressOff();
//           dhtmlx.message({
//             type: "error",
//             text: json.response
//           });
//         }
//       });
//     }
//   },
//   dateFormat: function(uid, dateFromGrid, task) {
//     var self = this;
//     var browserType, mySplitResult, month, monthFormat, dateinTwo;
//     if (dateFromGrid !== null) {
//       if (task == 'import') {

//         mySplitResult = dateFromGrid.split(" ");
//         dateinTwo = mySplitResult[1];
//         if (!dateinTwo) {
//           dateinTwo = mySplitResult[2];
//           yearinformat = mySplitResult[3];
//         } else {
//           dateinTwo = mySplitResult[1];
//           yearinformat = mySplitResult[2];
//         }
//         month = mySplitResult[0];

//         switch (dateinTwo) {
//           case "1":
//             dateinTwo = "01";
//             break;
//           case "2":
//             dateinTwo = "02";
//             break;
//           case "3":
//             dateinTwo = "03";
//             break;
//           case "4":
//             dateinTwo = "04";
//             break;
//           case "5":
//             dateinTwo = "05";
//             break;
//           case "6":
//             dateinTwo = "06";
//             break;
//           case "7":
//             dateinTwo = "07";
//             break;
//           case "8":
//             dateinTwo = "08";
//             break
//           case "9":
//             dateinTwo = "09";
//             break
//           default:
//             dateinTwo = dateinTwo;
//             break;

//         }
//       } else {
//         dateFromGrid = dateFromGrid.toString();
//         mySplitResult = dateFromGrid.split(" ");
//         dateinTwo = mySplitResult[2];
//         month = mySplitResult[1];
//         browserType = navigator.appName;
//         if (browserType == "Microsoft Internet Explorer") {
//           yearinformat = mySplitResult[5];
//         } else {
//           yearinformat = mySplitResult[3];
//         }
//       }



//       switch (month) {
//         case "Jan":
//           monthFormat = "01";
//           break;

//         case "Feb":
//           monthFormat = "02";
//           break;
//         case "Mar":
//           monthFormat = "03";
//           break;

//         case "Apr":
//           monthFormat = "04";
//           break;

//         case "May":
//           monthFormat = "05";
//           break;

//         case "Jun":
//           monthFormat = "06";
//           break;

//         case "Jul":
//           monthFormat = "07";
//           break;

//         case "Aug":
//           monthFormat = "08";
//           break;

//         case "Sep":
//           monthFormat = "09";
//           break;

//         case "Oct":
//           monthFormat = "10";
//           break;

//         case "Nov":
//           monthFormat = "11";
//           break;

//         case "Dec":
//           monthFormat = "12";
//           break;
//       }


//       dateinFormat = monthFormat + '-' + dateinTwo + '-' + yearinformat;

//       return dateinFormat;
//     }
//   },
//   validate: function(uid, task) {
//     var self = this;
//     var contactid = _form[_name].getItemValue("contact_ID");
//     contactid1 = _form[_name].getItemValue("contact_ID");
//     var state = _form[_name].getItemValue("address_state");
//     var address_type = _form[_name].getItemValue("address_type");
//     var zipcode = _form[_name].getItemValue("address_zip");
//     var enddateValidation = String(_form[_name].getItemValue("address_leave"));
//     var stateName = _form[_name].getCombo("address_state").getSelectedText();
//     var countyName = _form[_name].getCombo("address_County").getSelectedText();
//     var filter = /^\d{5}(?:-\d{4})?$/;
//     var zipcodeVal = filter.test(zipcode);
//     if (contactid === '' || contactid === null) {
//       dhtmlx.alert({
//         title: "Alert",
//         type: "alert-error",
//         text: "ContactId Is Missing"
//       });
//       return false;
//     }
//     if (address_type === '' || address_type === null || address_type === '0') {
//       dhtmlx.alert({
//         title: "Alert",
//         type: "alert-error",
//         text: "Address type is mandatory",
//         callback: function() {
//           _form[_name].setItemFocus('address_type');
//         }
//       });
//       self.editstatus_bar[uid].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
//       return false;
//     } else if (state === '' || state === null || state === '0') {
//       dhtmlx.alert({
//         title: "Alert",
//         type: "alert-error",
//         text: "State is mandatory",
//         callback: function() {
//           _form[_name].setItemFocus('address_state');
//         }
//       });
//       self.editstatus_bar[uid].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
//       return false;
//     } else if (enddateValidation.trim() != 'null' && _form[_name].getItemValue("address_leave") < _form[_name].getItemValue("address_start")) {


//       dhtmlx.alert({
//         title: "Alert",
//         type: "alert-error",
//         text: ' End date should be greater or equal to Start date',
//         callback: function() {
//           _form[_name].setItemValue('address_leave', '');
//           _form[_name].setItemFocus('address_leave');
//         }
//       });
//       self.editstatus_bar[uid].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
//       return false;


//     } else if (zipcode !== '' && zipcode !== null) {
//       if (zipcodeVal !== true) {
//         dhtmlx.alert({
//           title: "Alert",
//           type: "alert-error",
//           text: "Please enter a valid zipcode",
//           callback: function() {
//             _form[_name].setItemValue('address_zip', '');
//             _form[_name].setItemFocus('address_zip');
//           }
//         });
//         self.editstatus_bar[uid].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
//         return false;
//       } else {
//         if (self.combo_value['state']) {
//           if (stateName !== self.combo_value['state']) {
//             dhtmlx.alert({
//               title: "Alert",
//               type: "alert-error",
//               text: "Zip does not belong to " + stateName,
//               callback: function() {
//                 //_form[_name].setItemValue('address_zip', '');
//                 _form[_name].setItemFocus('address_zip');
//               }
//             });
//             self.editstatus_bar[uid].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
//             return false;
//           }
//         }
//         if (self.combo_value['county']) {
//           if (countyName !== self.combo_value['county']) {
//             dhtmlx.alert({
//               title: "Alert",
//               type: "alert-error",
//               text: "Zip does not belong to " + countyName,
//               callback: function() {
//                 //_form[_name].setItemValue('address_zip', '');
//                 _form[_name].setItemFocus('address_zip');
//               }
//             });
//             self.editstatus_bar[uid].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
//             return false;
//           }
//           return true;
//         } else {
//           return true;
//         }
//       }

//     } else {
//       return true;
//     }
//   },
//   deleteRow: function(uid, selectedRowsId) {
//     var self = this;
//     var MAPaddress_delet_params, json;
//     self.progressOn(uid);
//     if (_grid[uid].cells(selectedRowsId, 9).getValue('add_primarytext') == 'Yes') {
//       self.progressOff(uid);
//       dhtmlx.message({
//         type: "error",
//         text: "Primary address cannot be deleted..."
//       });
//       return true;
//     }
//     dhtmlx.confirm({
//       title: "Delete Address",
//       type: "confirm-warning",
//       text: "Are you sure you want to delete this Address ?",
//       callback: function(result) {
//         if (result === true) {
//           MAPaddress_delet_params = "contactId=" + _configuration.contactid + "&contactaddressId=" + selectedRowsId + "&agencyid=" + _configuration.agencyid;
//           dhtmlxAjax.post(_configuration.application_path + "processors/deleteaddressInfo.php", MAPaddress_delet_params, function(loader) {
//             try {
//               json = JSON.parse(loader.xmlDoc.responseText);
//               if (json.status == "success") {
//                 dhtmlx.message({
//                   text: "record was deleted"
//                 });
//                 _grid[uid].deleteRow(_grid[uid].getSelectedRowId());
//                 _toolbar[uid].disableItem("delete_address");
//                 _toolbar[uid].disableItem("edit_address");
//                 self.progressOff(uid);
//               } else {
//                 dhtmlx.message({
//                   type: "error",
//                   text: json.response
//                 });
//                 self.progressOff(uid);
//               }
//             } catch (e) {
//               dhtmlx.message({
//                 type: "error",
//                 text: "Fatal error on server side: " + loader.xmlDoc.responseText
//               });
//               self.progressOff(uid);
//             }
//           });
//         } else {
//           self.progressOff(uid);
//         }
//       }
//     });
//   },
//   _form: function(uid, task) {
//     var self = this,
//       primary_address,
//       isCountryChange = false,
//       isStateChange = false,
//       eventNew,
//       eventImport;

//     _configuration.edited = 0;
//     _form[_name] = self.editlayout[uid].cells("a").attachForm(self.model.conf_form.template);

//     if (_configuration.window_managerObj !== null) {
//       if (_configuration.contactcomponent_obj._configuration.contactid != 0 && _configuration.contactcomponent_obj._configuration.contactid != 'undefined') {
//         _configuration.contactid = _configuration.contactcomponent_obj._configuration.contactid;
//         self.importaddress(uid);
//       }
//     }

//     _form[_name].setItemValue("contact_ID", _configuration.contactid);
//     _form[_name].setItemValue("MailingAddress", 0);
//     _form[_name].getCombo("address_type").readonly(true);
//     _form[_name].getCombo("address_province").readonly(true);
//     _form[_name].getCombo("address_County").readonly(true);

//     if (task == 'Edit') { //Edit task
//       if (_grid[uid].cells(_grid[uid].getSelectedRowId(), 9).getValue() == 'Yes')
//         primary_address = 1;
//       else
//         primary_address = 0;
//       _form[_name].setItemValue("address_ID", _grid[uid].getSelectedRowId());
//       _form[_name].setItemValue("MailingAddress", primary_address);
//       self.hasprimaryaddress = primary_address;
//       _form[_name].setItemValue("address_address1", _grid[uid].cells(_grid[uid].getSelectedRowId(), 1).getValue());
//       _form[_name].setItemValue("address_address2", _grid[uid].cells(_grid[uid].getSelectedRowId(), 2).getValue());
//       _form[_name].setItemValue("address_city", _grid[uid].cells(_grid[uid].getSelectedRowId(), 3).getValue());
//       _form[_name].setItemValue("address_zip", _grid[uid].cells(_grid[uid].getSelectedRowId(), 5).getValue());
//       _form[_name].setItemValue("address_start", _grid[uid].cells(_grid[uid].getSelectedRowId(), 10).getValue());
//       _form[_name].setItemValue("address_leave", _grid[uid].cells(_grid[uid].getSelectedRowId(), 11).getValue());

//       _form[_name].getCombo("address_state").readonly(true);
//       _form[_name].getCombo("address_country").readonly(true);


//       _form[_name].getCombo("address_type").loadXML(_configuration.application_path + "processors/address_list.php?type=address_type&agencyid=" + _configuration.agencyid + "&address_type=" + _grid[uid].cells(_grid[uid].getSelectedRowId(), 0).getValue());
//       //_form[_name].getCombo("address_state").loadXML(_configuration.application_path +"processors/address_list.php?type=address_state&agencyid=" + _configuration.agencyid+"&address_state="+_grid[uid].cells(_grid[uid].getSelectedRowId(), 4).getValue());
//       //_form[_name].getCombo("address_County").loadXML(_configuration.application_path +"processors/address_list.php?type=address_County&agencyid=" + _configuration.agencyid+"&address_County="+_grid[uid].cells(_grid[uid].getSelectedRowId(), 6).getValue());
//       _form[_name].getCombo("address_country").loadXML(_configuration.application_path + "processors/address_list.php?type=address_country&agencyid=" + _configuration.agencyid + "&address_country=" + _grid[uid].cells(_grid[uid].getSelectedRowId(), 7).getValue());
//       //_form[_name].getCombo("address_province").loadXML(_configuration.application_path +"processors/address_list.php?type=address_province&agencyid=" + _configuration.agencyid+"&address_province="+_grid[uid].cells(_grid[uid].getSelectedRowId(), 8).getValue());

//       //When country is changed state & province needs to be changed. County set to 'Select County'.Edited = 1
//       _form[_name].getCombo("address_country").attachEvent("onChange", function() {
//         var selectedCountry = _form[_name].getCombo("address_country").getActualValue();
//         _form[_name].getCombo("address_state").loadXML(_configuration.application_path + "processors/address_list.php?type=address_state&agencyid=" + _configuration.agencyid + "&address_state=" + _grid[uid].cells(_grid[uid].getSelectedRowId(), 4).getValue() + "&country_id=" + selectedCountry + "&isCountryChange=" + isCountryChange);
//         if (isCountryChange === true) {
//           _configuration.edited = 1;
//           _form[_name].setItemValue('address_zip', '');
//         }

//         _form[_name].getCombo("address_province").loadXML(_configuration.application_path + "processors/address_list.php?type=address_province&agencyid=" + _configuration.agencyid + "&address_province=" + _grid[uid].cells(_grid[uid].getSelectedRowId(), 8).getValue() + "&country_id=" + selectedCountry + "&isCountryChange=" + isCountryChange);
//         isCountryChange = true;
//         _form[_name].getCombo("address_County").setComboText('-- Select County --');
//       });

//       //When State is changed county needs to be changed.Edited = 1
//       _form[_name].getCombo("address_state").attachEvent("onChange", function() {

//         var selectedState = _form[_name].getCombo("address_state").getSelectedValue();
//         if (isStateChange === true) {
//           _configuration.edited = 1;
//         }
//         _form[_name].getCombo("address_County").loadXML(_configuration.application_path + "processors/address_list.php?type=address_County&agencyid=" + _configuration.agencyid + "&address_County=" + _grid[uid].cells(_grid[uid].getSelectedRowId(), 6).getValue() + "&state_id=" + selectedState + "&isStateChange=" + isStateChange);
//         isStateChange = true;
//       });
//       //Edited = 1
//       _form[_name].getCombo("address_type").attachEvent("onXLE", function() {
//         _form[_name].getCombo("address_type").attachEvent("onChange", function() {
//           _configuration.edited = 1;
//         });
//       });
//       //Edited = 1
//       _form[_name].getCombo("address_province").attachEvent("onXLE", function() {
//         _form[_name].getCombo("address_province").attachEvent("onChange", function() {
//           _configuration.edited = 1;
//         });
//       });
//       //Edited = 1
//       _form[_name].getCombo("address_County").attachEvent("onXLE", function() {
//         if (json.countyId) {
//           _form[_name].getCombo("address_County").setComboValue(json.countyId);
//           //_form[_name].getCombo("address_County").setComboText(json.countyName);
//           json.countyId = '';
//           json.countyName = '';
//         }
//         _form[_name].getCombo("address_County").attachEvent("onChange", function() {
//           _configuration.edited = 1;
//         });
//       });


//       //  alert(_form[_name].getItemValue("address_country"));

//       /*            _form[_name].setItemValue("address_type", );            
//                 _form[_name].setItemValue("address_state", _grid[uid].cells(_grid[uid].getSelectedRowId(), 4).getValue());            
//                 _form[_name].setItemValue("address_County", _grid[uid].cells(_grid[uid].getSelectedRowId(), 6).getValue());
//                 _form[_name].setItemValue("address_country", _grid[uid].cells(_grid[uid].getSelectedRowId(), 7).getValue());
//                 _form[_name].setItemValue("address_province", _grid[uid].cells(_grid[uid].getSelectedRowId(), 8).getValue());*/

//     } else
//     if (task == 'New') {

//       _form[_name].getCombo("address_state").readonly(true);
//       _form[_name].getCombo("address_country").readonly(true);
//       _form[_name].getCombo("address_type").loadXML(_configuration.application_path + "processors/address_list.php?type=address_type&agencyid=" + _configuration.agencyid);
//       _form[_name].getCombo("address_state").loadXML(_configuration.application_path + "processors/address_list.php?type=address_state&agencyid=" + _configuration.agencyid + "&country_id=USA");
//       //_form[_name].getCombo("address_County").loadXML(_configuration.application_path +"processors/address_list.php?type=address_County&agencyid=" + _configuration.agencyid);
//       _form[_name].getCombo("address_country").loadXML(_configuration.application_path + "processors/address_list.php?type=address_country&agencyid=" + _configuration.agencyid);
//       //_form[_name].getCombo("address_province").loadXML(_configuration.application_path +"processors/address_list.php?type=address_province&agencyid=" + _configuration.agencyid);
//       _form[_name].getCombo("address_County").setComboText('-- Select County --');
//       _form[_name].getCombo("address_province").setComboText('-- Select Province --');
//       //Edited = 1
//       _form[_name].getCombo("address_type").attachEvent("onXLE", function() {
//         _form[_name].getCombo("address_type").attachEvent("onChange", function() {
//           _configuration.edited = 1;
//         });
//       });
//       //When country changed state & province changes.County set to 'select County'.Edited = 1
//       _form[_name].getCombo("address_country").attachEvent("onXLE", function() {
//         _form[_name].getCombo("address_country").attachEvent("onChange", function() {
//           var selectedCountry = _form[_name].getCombo("address_country").getActualValue();
//           //_form[_name].getCombo("address_province").setComboText('-- Select Province --');
//           _form[_name].getCombo("address_state").loadXML(_configuration.application_path + "processors/address_list.php?type=address_state&agencyid=" + _configuration.agencyid + "&country_id=" + selectedCountry);

//           _form[_name].getCombo("address_province").loadXML(_configuration.application_path + "processors/address_list.php?type=address_province&agencyid=" + _configuration.agencyid + "&country_id=" + selectedCountry);
//           _form[_name].getCombo("address_County").setComboText('-- Select County --');
//           _form[_name].setItemValue('address_zip', '');
//           _configuration.edited = 1;
//           isCountryChange = true;
//         });
//       });
//       //When State is changed county needs to be changed.Edited = 1
//       _form[_name].getCombo("address_state").attachEvent("onXLE", function() {

//         eventNew = _form[_name].getCombo("address_state").attachEvent("onChange", function() {

//           var selectedState = _form[_name].getCombo("address_state").getSelectedValue();
//           _form[_name].getCombo("address_County").loadXML(_configuration.application_path + "processors/address_list.php?type=address_County&agencyid=" + _configuration.agencyid + "&state_id=" + selectedState);
//           _configuration.edited = 1;

//         });
//         if (isCountryChange)
//           _form[_name].getCombo("address_state").detachEvent(eventNew);
//       });

//       //Edited = 1
//       _form[_name].getCombo("address_province").attachEvent("onXLE", function() {
//         _form[_name].getCombo("address_province").attachEvent("onChange", function() {
//           _configuration.edited = 1;
//         });
//       });
//       //Edited = 1
//       _form[_name].getCombo("address_County").attachEvent("onXLE", function() {
//         if (json.countyId) {
//           _form[_name].getCombo("address_County").setComboValue(json.countyId);
//           //_form[_name].getCombo("address_County").setComboText(json.countyName);
//           json.countyId = '';
//           json.countyName = '';
//         }
//         _form[_name].getCombo("address_County").attachEvent("onChange", function() {
//           _configuration.edited = 1;
//         });
//       });


//     }

//     if (task == 'import_address') {
//       self.editlayout[uid].progressOn();
//       MAPaddres_parms = "contact_ID=" + _form[_name].getItemValue("contact_ID") + "&import=import_address" + "&contactIdPerson1=" + _configuration.contactcomponent_obj._configuration.p1contactid;

//       dhtmlxAjax.post(_configuration.application_path + "processors/savetoairs.php", MAPaddres_parms, function(loader) {
//         json = JSON.parse(loader.xmlDoc.responseText);
//         if (json.status == "imported" && json.AddressType != null) {
//           dhtmlx.message({
//             text: "Importing address details"
//           });
//           var address_start2 = self.dateFormat(uid, json.addstartdate, 'import');
//           var addleavedate2 = self.dateFormat(uid, json.addleavedate, 'import');
//           if (json.primary_address)
//             _form[_name].setItemValue("MailingAddress", json.primary_address);
//           if (json.Address1)
//             _form[_name].setItemValue("address_address1", json.Address1);
//           if (json.Address2)
//             _form[_name].setItemValue("address_address2", json.Address2);
//           if (json.city)
//             _form[_name].setItemValue("address_city", json.city);
//           //_form[_name].setItemValue("address_zip", json.primary_address);
//           if (json.addstartdate)
//             _form[_name].setItemValue("address_start", address_start2);
//           if (json.addleavedate)
//             _form[_name].setItemValue("address_leave", addleavedate2);
//           if (json.address_zip != ' ')
//             _form[_name].setItemValue("address_zip", json.address_zip);
//           _configuration.edited = 1; //edited = 1 when imported
//           setTimeout(function() {
//             self.setaddrcombovalues(uid);


//           }, 2000);
//           setTimeout(function() {
//             self.editlayout[uid].progressOff();
//           }, 3500);
//         } else {
//           dhtmlx.message({
//             text: "Address details not available."
//           });

//         }
//       });

//       //When country changed state & province changes.County set to 'select County'
//       _form[_name].getCombo("address_country").attachEvent("onXLE", function() {
//         _form[_name].getCombo("address_country").attachEvent("onChange", function() {
//           var selectedCountry = _form[_name].getCombo("address_country").getActualValue();
//           _form[_name].getCombo("address_state").loadXML(_configuration.application_path + "processors/address_list.php?type=address_state&agencyid=" + _configuration.agencyid + "&country_id=" + selectedCountry);
//           _form[_name].getCombo("address_province").loadXML(_configuration.application_path + "processors/address_list.php?type=address_province&agencyid=" + _configuration.agencyid + "&country_id=" + selectedCountry);
//           _form[_name].setItemValue('address_zip', '');
//           isCountryChange = true;
//         });
//       });
//       //When State is changed county needs to be changed
//       _form[_name].getCombo("address_state").attachEvent("onXLE", function() {

//         eventImport = _form[_name].getCombo("address_state").attachEvent("onChange", function() {
//           var selectedState = _form[_name].getCombo("address_state").getSelectedValue();
//           _form[_name].getCombo("address_County").loadXML(_configuration.application_path + "processors/address_list.php?type=address_County&agencyid=" + _configuration.agencyid + "pp&state_id=" + selectedState);
//         });
//         if (isCountryChange)
//           _form[_name].getCombo("address_state").detachEvent(eventImport);
//       });

//       _form[_name].getCombo("address_County").attachEvent("onXLE", function() {
//         if (json.countyId) {
//           _form[_name].getCombo("address_County").setComboValue(json.countyId);
//           //_form[_name].getCombo("address_County").setComboText(json.countyName);
//           json.countyId = '';
//           json.countyName = '';
//         }
//       });

//     }

//     _form[_name].getCombo("MailingAddress").enableOptionAutoHeight(1);
//     //Edited = 1
//     _form[_name].attachEvent("onInputChange", function(name) {
//       _configuration.edited = 1;
//       var len = _form[_name].getItemValue("address_zip").length;
//       if (name === 'address_zip') {
//         if (_form[_name].getCombo("address_country").getSelectedText() === 'USA') {
//           if (len === 5) {
//             var zipcode = _form[_name].getItemValue("address_zip");
//             var filter = /^\d{5}(?:-\d{4})?$/;
//             var zipcodeVal = filter.test(zipcode);
//             if (zipcode !== '' && zipcode !== null) {
//               if (zipcodeVal !== true) {
//                 dhtmlx.alert({
//                   title: "Alert",
//                   type: "alert-error",
//                   text: "Please enter a valid zipcode",
//                   callback: function() {
//                     _form[_name].setItemValue('address_zip', '');
//                     _form[_name].setItemFocus('address_zip');
//                   }
//                 });
//               } else {
//                 self.combo_value['state'] = '';
//                 self.combo_value['county'] = '';
//                 dhtmlxAjax.post(_configuration.application_path + "processors/address_zip.php", "zip=" + zipcode, function(loader) {
//                   json = JSON.parse(loader.xmlDoc.responseText);
//                   if (json.status === 'success') {

//                     _form[_name].getCombo("address_state").setComboValue(json.stateId);
//                     self.combo_value['state'] = json.stateName;
//                     self.combo_value['county'] = json.countyName;
//                     json.stateId = '';
//                     json.stateName = '';
//                     //_form[_name].getCombo("address_state").detachEvent(eventNew);
//                     //_form[_name].getCombo("address_state").detachEvent(eventEdit);
//                     //_form[_name].getCombo("address_state").detachEvent(eventImport);
//                   }
//                 });
//               }
//             }

//           }
//         }

//       }
//     });

//     _form[_name].getCombo("MailingAddress").attachEvent("onSelectionChange", function() {
//       _configuration.edited = 1;
//     });
//     _form[_name].getInput("address_leave").style.backgroundImage = self.model.calendarImage.url;
//     _form[_name].getInput("address_leave").style.backgroundPosition = self.model.calendarImage.position;
//     _form[_name].getInput("address_leave").style.backgroundRepeat = self.model.calendarImage.repeat;
//     _form[_name].getInput("address_start").style.backgroundImage = self.model.calendarImage.url;
//     _form[_name].getInput("address_start").style.backgroundPosition = self.model.calendarImage.position;
//     _form[_name].getInput("address_start").style.backgroundRepeat = self.model.calendarImage.repeat;
//     self.editlayout[uid].progressOff();
//   },
//   setaddrcombovalues: function(uid) {
//     var self = this;

//     //if(json.CountryText)//alert(json.CountryType);
//     //_form[_name].setItemValue("address_country",json.CountryText);
//     _form[_name].getCombo("address_country").loadXML(_configuration.application_path + "processors/address_list.php?type=address_country&agencyid=" + _configuration.agencyid + "&address_country=" + json.CountryText);
//     // if(json.StateName)
//     //_form[_name].setItemValue("address_state",json.StateName);
//     _form[_name].getCombo("address_state").loadXML(_configuration.application_path + "processors/address_list.php?type=address_state&agencyid=" + _configuration.agencyid + "&country_id=" + json.CountryText + "&state_id=" + json.StateName + "&address_state=true");
//     // if(json.province)
//     //_form[_name].setItemValue("address_province",json.province);
//     _form[_name].getCombo("address_province").setComboText('-- Select Province --');
//     _form[_name].getCombo("address_province").loadXML(_configuration.application_path + "processors/address_list.php?type=address_province&agencyid=" + _configuration.agencyid + "&country_id=" + json.CountryText + "&address_province=" + json.province);
//     //else if(json.province == '0')
//     //_form[_name].setItemValue("address_province",'-- Select Province --');
//     //if(json.county)
//     //_form[_name].setItemValue("address_County",json.county);
//     _form[_name].getCombo("address_County").setComboText('-- Select County --');
//     _form[_name].getCombo("address_County").loadXML(_configuration.application_path + "processors/address_list.php?type=address_County&agencyid=" + _configuration.agencyid + "&state_id=" + json.StateName + "&address_County=" + json.county);
//     // if(json.AddressType)//alert(json.AddressType);
//     //_form[_name].setItemValue("address_type",json.AddressType);
//     _form[_name].getCombo("address_type").loadXML(_configuration.application_path + "processors/address_list.php?type=address_type&agencyid=" + _configuration.agencyid + "&address_type=" + json.AddressType);
//   },
//   _grid: function(uid) {
//     var self = this;
//     _grid[uid] = _layout[uid].cells("a").attachGrid(self.model.conf_grid);
//     _grid[uid].setHeader(self.model.conf_grid.headers);

//     if (_configuration.useWindow === true) {
//       _grid[uid].setInitWidths(self.model.conf_grid.widths);
//     } else {
//       _grid[uid].setInitWidths(self.model.conf_grid.widths_layout);
//     }
//     _grid[uid].setColAlign(self.model.conf_grid.colaligns);
//     _grid[uid].setColTypes(self.model.conf_grid.coltypes);
//     _grid[uid].setColSorting(self.model.conf_grid.colsorting);
//     _grid[uid].selMultiRows = false;
//     _grid[uid].enableAutoWidth(true);
//     _grid[uid].enableMultiline(true);
//     _grid[uid].setDateFormat("%m-%d-%Y");
//     _grid[uid].setColumnsVisibility(self.model.conf_grid.visibility);
//     _grid[uid].init();
//     _grid[uid].parse(self.data_store[uid].address, "json");
//     _toolbar[uid].disableItem("delete_address");
//     _toolbar[uid].disableItem("edit_address");
//     _grid[uid].attachEvent("onRowDblClicked", function(rowId, cellInd) {
//       self._editwindow(uid, 'Edit');
//       self._editlayout(uid);
//       //self._edittoolbar(uid, 'Edit');
//       self._form(uid, 'Edit');
//     });
//     _grid[uid].attachEvent("onEnter", function(rowId, cellInd) {
//       self._editwindow(uid, 'Edit');
//       self._editlayout(uid);
//       // self._edittoolbar(uid, 'Edit');
//       self._form(uid, 'Edit');
//     });
//     _grid[uid].attachEvent("onRowSelect", function(rowId, cellInd) {
//       _toolbar[uid].enableItem("delete_address");
//       _toolbar[uid].enableItem("edit_address");
//     });
//   },
//   // Show Help Window
//   _showHelp: function(uid) {

//     var self = this;
//     if (_window_manager.isWindow("help_address_window_" + uid)) {


//       _window_help[uid].show();
//       _window_help[uid].bringToTop();
//       return;

//     }

//     _window_help[uid] = _window_manager.createWindow("help_address_window_" + uid, self.model.conf_window.left + 10, self.model.conf_window.top + 10, 700, 400);
//     self.dhtmlxWidowCustomPostion(_window_help[uid], self.model.conf_window.top);
//     _window_help[uid].setText("End user manual");
//     _window_help[uid].setIcon("help.png", "help.png");
//     _window_help[uid].attachURL(_configuration.application_path + "docs/end_user_manual");
//   },
//   //Progress On
//   progressOn: function(uid) {

//     var self = this;
//     _layout[uid].progressOn();
//     if (_configuration.useWindow === true) {
//       _window[uid].progressOn();
//     }
//   },
//   // Progress Off
//   progressOff: function(uid) {

//     var self = this;
//     _layout[uid].progressOff();
//     if (_configuration.useWindow === true) {
//       _window[uid].progressOff();
//     }
//   },
//   // Data Store
//   _datastor: function(uid) {

//     var self = this;
//     var postStr, json;
//     self.progressOn(uid);
//     postStr = "contactID=" + _configuration.contactid + "&agencyid=" + _configuration.agencyid;
//     dhtmlxAjax.post(_configuration.application_path + "processors/get_data.php", postStr, function(loader) {
//       try {
//         json = JSON.parse(loader.xmlDoc.responseText);

//         if (json.status == "success") {
//           self.data_store[uid] = json;

//           dhtmlx.message({
//             text: "Data store 100% loaded"
//           });

//           self._grid(uid);
//           self.progressOff(uid);
//         } else {
//           dhtmlx.message({
//             type: "error",
//             text: json.response
//           });
//         }
//       } catch (e) {
//         dhtmlx.message({
//           type: "error",
//           text: "Fatal error on server side: " + loader.xmlDoc.responseText
//         });
//       }
//     });
//   },
//   dhtmlxWidowCustomPostion: function(widowObj, yPosition) {

//     var position, splitPosition, xPosition;

//     widowObj.center();
//     position = widowObj.getPosition();
//     splitPosition = String(position).split(",");
//     xPosition = splitPosition[0];

//     if (xPosition < 0)
//       xPosition = 50;
//     widowObj.setPosition(xPosition, yPosition);
//     window.scrollTo(xPosition, 0);
//   },
//   // Initiating the self.model
//   init: function(self.model) {

//     var self = this;
//     self.model = self.model;
//   },
//   // Starting the Component
//   start: function(_configuration) {
//     var self = this;
//     self.uid = _configuration.uid;
//     if ((typeof _configuration.uid === 'undefined') || (_configuration.uid.length === 0)) {
//       dhtmlx.message({
//         type: "error",
//         text: "uid is missing"
//       });
//       return;
//     }
//     if ((typeof _configuration.application_path === 'undefined') || (_configuration.application_path.length === 0)) {
//       dhtmlx.message({
//         type: "error",
//         text: "application_path is missing"
//       });
//       return;
//     }
//     if ((typeof _configuration.dhtmlx_codebase_path === 'undefined') || (_configuration.dhtmlx_codebase_path.length === 0)) {
//       dhtmlx.message({
//         type: "error",
//         text: "dhtmlx_codebase_path is missing"
//       });
//       return;
//     }
//     if ((typeof _configuration.contactid === 'undefined') || (_configuration.contactid.length === 0)) {
//       dhtmlx.message({
//         type: "error",
//         text: "Contact Id is missing"
//       });
//       return;
//     }
//     if ((typeof _configuration.agencyid === 'undefined') || (_configuration.agencyid.length === 0)) {
//       dhtmlx.message({
//         type: "error",
//         text: "Agency Id is missing"
//       });
//       return;
//     }
//     window.dhx_globalImgPath = _configuration.dhtmlx_codebase_path + "imgs/";
//     dhtmlx.skin = self.model.globalSkin || "dhx_skyblue";
//     _configuration["icons_path"] = "icons/";
//     _configuration[self.uid] = _configuration;
//     self.model.conf_window.image_path = _configuration.application_path + _configuration.icons_path;
//     self.model.conf_toolbar.icon_path = _configuration.application_path + _configuration.icons_path;
//     self.model.edit_toolbar.icon_path = _configuration.application_path + _configuration.icons_path;


//     if (_configuration.useWindow === true) {
//       self._window(self.uid);
//     }
//     self._layout(self.uid);
//     self._toolbar(self.uid);
//     self._datastor(self.uid);
//   }
// };
// var addresscomponent = {};

var addresscomponent = (function() {
  var
    _uid,
    _configuration = {},
    _window = {},
    _window_manager = null,
    _status_bar = {},
    _layout = {},
    _grid = {},
    _form = {},
    _toolbar = {};

  // Public functions
  return {
    // Window Manager
    create_window_manager: function() {
      var self = this;
      _window_manager = new dhtmlXWindows();
      _window_manager.setImagePath(self.model.conf_window.image_path);
    },
    // Window
    build_window: function(uid) {
      var self = this;

      if (_configuration.window_managerObj) {
        _window_manager = _configuration.window_managerObj;
      } else {
        if (_window_manager === null) {
          self.create_window_manager();
        }
      }


      if (_window_manager.isWindow("Address_" + uid)) {
        //console.log(_window_manager)
        _window[uid].show();
        _window[uid].bringToTop();
        _window[uid].center();
        return;
      }
      _window[uid] = _window_manager.createWindow("Address_" + uid, self.model.conf_window.left + 10, self.model.conf_window.top + 10, self.model.conf_window.width, self.model.conf_window.height);
      // self.dhtmlxWidowCustomPostion(_window[uid], self.model.conf_window.top);
      _window[uid].setText(self.model.text_labels.main_window_title);
      _window[uid].setIcon(self.model.conf_window.icon, self.model.conf_window.icon_dis);
      _window[uid].center();
      _window[uid].denyPark();

      // Events on Windows
      _window[uid].attachEvent("onClose", function(win) {
        return true;
      });

      _status_bar[uid] = _window[uid].attachStatusBar();
    },
    build_layout: function(uid) {
      var self = this;
      if (_configuration.useWindow === true) {
        _layout[uid] = _window[uid].attachLayout(self.model.conf_layout.pattern);
      } else {
        _layout[uid] = new dhtmlXLayoutObject(_configuration.parentDIVId, self.model.conf_layout.pattern);
      }
      _layout[uid].cells("a").hideHeader();
      //_layout[uid].progressOn();
    },
    build_toolbar: function(uid) {
      var self = this,
        selectedRowsId;

      _toolbar[uid] = _layout[uid].cells("a").attachToolbar(self.model.conf_toolbar);
      _toolbar[uid].setSkin(self.model.globalSkin);
      if (_configuration.useWindow !== true) {
        _toolbar[uid].removeItem("help_address");
        _toolbar[uid].removeItem("close_address");
      }
      _toolbar[uid].attachEvent("onClick", function(id) {
        if (MAPPermissions.checkAccessPermission(id) != 1) {
          if (id == "add_address") {
            self.toolbar_add_action(uid);
          }
          if (id == "delete_address") {
            self.toolbar_delete_action(uid);
          }
          if (id == "help_address") {
            self.toolbar_help_action(uid);
          }
          if (id == "edit_address") {
            self.toolbar_edit_action(uid);
          }
          if (id == "close_address") {
            _window[uid].close();
          }
        }
      });
    },
    toolbar_add_action: function(uid) {
      this.add_edit_window(uid, 'Add');
      this.add_edit_form(uid, 'Add');
    },
    toolbar_edit_action: function(uid) {
      self._editwindow(uid, 'Edit');
      self._editlayout(uid);
      //self._edittoolbar(uid, 'Edit');
      //  self.importaddress(uid);
      self._form(uid, 'Edit');
    },
    toolbar_delete_action: function(uid) {
      selectedRowsId = _grid[uid].getSelectedRowId();
      if (selectedRowsId !== null) {
        self.deleteRow(uid, selectedRowsId);
      }
    },
    toolbar_help_action: function(uid) {
      self._showHelp(uid);
    },
    build_grid: function(uid) {
      var self = this;
      _grid[uid] = _layout[uid].cells("a").attachGrid(self.model.conf_grid);
      _grid[uid].setHeader(self.model.conf_grid.headers);

      if (_configuration.useWindow === true) {
        //_grid[uid].setInitWidths(self.model.conf_grid.widths);
      } else {
        //_grid[uid].setInitWidths(self.model.conf_grid.widths_layout);
      }
      _grid[uid].setColAlign(self.model.conf_grid.colaligns);
      _grid[uid].setColTypes(self.model.conf_grid.coltypes);
      _grid[uid].setColSorting(self.model.conf_grid.colsorting);
      _grid[uid].selMultiRows = false;
      _grid[uid].enableAutoWidth(true);
      _grid[uid].enableMultiline(true);
      _grid[uid].setDateFormat("%m-%d-%Y");
      _grid[uid].setColumnsVisibility(self.model.conf_grid.visibility);
      _grid[uid].init();
      // _grid[uid].parse(self.data_store[uid].address, "json");
      _toolbar[uid].disableItem("delete_address");
      _toolbar[uid].disableItem("edit_address");
    },
    grid_events: function(uid) {
      _grid[uid].attachEvent("onRowDblClicked", function(rowId, cellInd) {
        self._editwindow(uid, 'Edit');
        self._editlayout(uid);
        //self._edittoolbar(uid, 'Edit');
        self._form(uid, 'Edit');
      });
      _grid[uid].attachEvent("onEnter", function(rowId, cellInd) {
        self._editwindow(uid, 'Edit');
        self._editlayout(uid);
        // self._edittoolbar(uid, 'Edit');
        self._form(uid, 'Edit');
      });
      _grid[uid].attachEvent("onRowSelect", function(rowId, cellInd) {
        _toolbar[uid].enableItem("delete_address");
        _toolbar[uid].enableItem("edit_address");
      });
    },
    add_edit_window: function(uid, task) {
      var self = this;
      if (_configuration.window_managerObj) {
        _window_manager = _configuration.window_managerObj;
      } else {
        if (_window_manager === null) {
          self.create_window_manager();
        }
      }


      var _name = uid + '_' + task;

      _window[_name] = _window_manager.createWindow('window_address_' + task + '_' + uid, self.model.conf_window.left + 10, self.model.conf_window.top + 10, self.model.conf_window.model_edit_winHeight, self.model.conf_window.model_edit_winWidth);
      //_window_manager.createWindow('window_address_' + task + '_' + uid, 10, 10, 300, 499);


      if (task == 'Add') {
        _window[_name].setText('Add Address');
      } else {
        _window[_name].setText('Edit Address');
      }
      _window[_name].setModal(true);
      _window[_name].button('park').hide();
      _window[_name].button('minmax1').hide();
      _window[_name].setIcon(self.model.conf_window.icon, self.model.conf_window.icon);
      _layout[_name] = _window[_name].attachLayout("1C");
      _layout[_name].cells('a').hideHeader();
      _layout[_name].cells('a').progressOn();
      _status_bar[_name] = _window[_name].attachStatusBar();
      _status_bar[_name].setText("");
      _window[_name].attachEvent("onClose", function(win) {
        //self.confirmCloseWindow(uid);
        return true;
      });
    },
    add_edit_form: function(uid, task) {
      var self = this,
        primary_address,
        isCountryChange = false,
        isStateChange = false,
        eventNew,
        eventImport;
      var _name = uid + '_' + task;
      //_configuration.edited = 0;
      _form[_name] = _layout[_name].cells("a").attachForm(self.model.conf_form.template);
      _layout[_name].cells("a").progressOff();
      _form[_name].setItemValue("contact_ID", _configuration.contactid);
      _form[_name].setItemValue("MailingAddress", 0);
      _form[_name].getCombo("address_type").readonly(true);
      _form[_name].getCombo("address_province").readonly(true);
      _form[_name].getCombo("address_County").readonly(true);

      if (task == 'Edit') { //Edit task
        if (_grid[uid].cells(_grid[uid].getSelectedRowId(), 9).getValue() == 'Yes')
          primary_address = 1;
        else
          primary_address = 0;
        _form[_name].setItemValue("address_ID", _grid[uid].getSelectedRowId());
        _form[_name].setItemValue("MailingAddress", primary_address);
        self.hasprimaryaddress = primary_address;
        _form[_name].setItemValue("address_address1", _grid[uid].cells(_grid[uid].getSelectedRowId(), 1).getValue());
        _form[_name].setItemValue("address_address2", _grid[uid].cells(_grid[uid].getSelectedRowId(), 2).getValue());
        _form[_name].setItemValue("address_city", _grid[uid].cells(_grid[uid].getSelectedRowId(), 3).getValue());
        _form[_name].setItemValue("address_zip", _grid[uid].cells(_grid[uid].getSelectedRowId(), 5).getValue());
        _form[_name].setItemValue("address_start", _grid[uid].cells(_grid[uid].getSelectedRowId(), 10).getValue());
        _form[_name].setItemValue("address_leave", _grid[uid].cells(_grid[uid].getSelectedRowId(), 11).getValue());

        _form[_name].getCombo("address_state").readonly(true);
        _form[_name].getCombo("address_country").readonly(true);


        _form[_name].getCombo("address_type").loadXML(_configuration.application_path + "processors/address_list.php?type=address_type&agencyid=" + _configuration.agencyid + "&address_type=" + _grid[uid].cells(_grid[uid].getSelectedRowId(), 0).getValue());
        //_form[_name].getCombo("address_state").loadXML(_configuration.application_path +"processors/address_list.php?type=address_state&agencyid=" + _configuration.agencyid+"&address_state="+_grid[uid].cells(_grid[uid].getSelectedRowId(), 4).getValue());
        //_form[_name].getCombo("address_County").loadXML(_configuration.application_path +"processors/address_list.php?type=address_County&agencyid=" + _configuration.agencyid+"&address_County="+_grid[uid].cells(_grid[uid].getSelectedRowId(), 6).getValue());
        _form[_name].getCombo("address_country").loadXML(_configuration.application_path + "processors/address_list.php?type=address_country&agencyid=" + _configuration.agencyid + "&address_country=" + _grid[uid].cells(_grid[uid].getSelectedRowId(), 7).getValue());
        //_form[_name].getCombo("address_province").loadXML(_configuration.application_path +"processors/address_list.php?type=address_province&agencyid=" + _configuration.agencyid+"&address_province="+_grid[uid].cells(_grid[uid].getSelectedRowId(), 8).getValue());

        //When country is changed state & province needs to be changed. County set to 'Select County'.Edited = 1
        _form[_name].getCombo("address_country").attachEvent("onChange", function() {
          var selectedCountry = _form[_name].getCombo("address_country").getActualValue();
          _form[_name].getCombo("address_state").loadXML(_configuration.application_path + "processors/address_list.php?type=address_state&agencyid=" + _configuration.agencyid + "&address_state=" + _grid[uid].cells(_grid[uid].getSelectedRowId(), 4).getValue() + "&country_id=" + selectedCountry + "&isCountryChange=" + isCountryChange);
          if (isCountryChange === true) {
            _configuration.edited = 1;
            _form[_name].setItemValue('address_zip', '');
          }

          _form[_name].getCombo("address_province").loadXML(_configuration.application_path + "processors/address_list.php?type=address_province&agencyid=" + _configuration.agencyid + "&address_province=" + _grid[uid].cells(_grid[uid].getSelectedRowId(), 8).getValue() + "&country_id=" + selectedCountry + "&isCountryChange=" + isCountryChange);
          isCountryChange = true;
          _form[_name].getCombo("address_County").setComboText('-- Select County --');
        });

        //When State is changed county needs to be changed.Edited = 1
        _form[_name].getCombo("address_state").attachEvent("onChange", function() {

          var selectedState = _form[_name].getCombo("address_state").getSelectedValue();
          if (isStateChange === true) {
            _configuration.edited = 1;
          }
          _form[_name].getCombo("address_County").loadXML(_configuration.application_path + "processors/address_list.php?type=address_County&agencyid=" + _configuration.agencyid + "&address_County=" + _grid[uid].cells(_grid[uid].getSelectedRowId(), 6).getValue() + "&state_id=" + selectedState + "&isStateChange=" + isStateChange);
          isStateChange = true;
        });
        //Edited = 1
        _form[_name].getCombo("address_type").attachEvent("onXLE", function() {
          _form[_name].getCombo("address_type").attachEvent("onChange", function() {
            _configuration.edited = 1;
          });
        });
        //Edited = 1
        _form[_name].getCombo("address_province").attachEvent("onXLE", function() {
          _form[_name].getCombo("address_province").attachEvent("onChange", function() {
            _configuration.edited = 1;
          });
        });
        //Edited = 1
        _form[_name].getCombo("address_County").attachEvent("onXLE", function() {
          if (json.countyId) {
            _form[_name].getCombo("address_County").setComboValue(json.countyId);
            //_form[_name].getCombo("address_County").setComboText(json.countyName);
            json.countyId = '';
            json.countyName = '';
          }
          _form[_name].getCombo("address_County").attachEvent("onChange", function() {
            _configuration.edited = 1;
          });
        });


        //  alert(_form[_name].getItemValue("address_country"));

        /*            _form[_name].setItemValue("address_type", );            
                _form[_name].setItemValue("address_state", _grid[uid].cells(_grid[uid].getSelectedRowId(), 4).getValue());            
                _form[_name].setItemValue("address_County", _grid[uid].cells(_grid[uid].getSelectedRowId(), 6).getValue());
                _form[_name].setItemValue("address_country", _grid[uid].cells(_grid[uid].getSelectedRowId(), 7).getValue());
                _form[_name].setItemValue("address_province", _grid[uid].cells(_grid[uid].getSelectedRowId(), 8).getValue());*/
      } else
      if (task == 'Add') {
        _form[_name].getCombo("address_state").readonly(true);
        _form[_name].getCombo("address_country").readonly(true);
        console.log(self.data._data_store['address_type']);
        var add = _form[_name].getCombo("address_type");

        _form[_name].getCombo("address_type").bind(self.data._data_store['address_type']);
        //_form[_name].getCombo("address_type").loadXML(_configuration.application_path + "processors/address_list.php?type=address_type&agencyid=" + _configuration.agencyid);
        _form[_name].getCombo("address_state").loadXML(_configuration.application_path + "processors/address_list.php?type=address_state&agencyid=" + _configuration.agencyid + "&country_id=USA");
        //_form[_name].getCombo("address_County").loadXML(_configuration.application_path +"processors/address_list.php?type=address_County&agencyid=" + _configuration.agencyid);
        _form[_name].getCombo("address_country").loadXML(_configuration.application_path + "processors/address_list.php?type=address_country&agencyid=" + _configuration.agencyid);
        //_form[_name].getCombo("address_province").loadXML(_configuration.application_path +"processors/address_list.php?type=address_province&agencyid=" + _configuration.agencyid);
        _form[_name].getCombo("address_County").setComboText('-- Select County --');
        _form[_name].getCombo("address_province").setComboText('-- Select Province --');
        //Edited = 1
        _form[_name].getCombo("address_type").attachEvent("onXLE", function() {
          _form[_name].getCombo("address_type").attachEvent("onChange", function() {
            _configuration.edited = 1;
          });
        });
        //When country changed state & province changes.County set to 'select County'.Edited = 1
        _form[_name].getCombo("address_country").attachEvent("onXLE", function() {
          _form[_name].getCombo("address_country").attachEvent("onChange", function() {
            var selectedCountry = _form[_name].getCombo("address_country").getActualValue();
            //_form[_name].getCombo("address_province").setComboText('-- Select Province --');
            _form[_name].getCombo("address_state").loadXML(_configuration.application_path + "processors/address_list.php?type=address_state&agencyid=" + _configuration.agencyid + "&country_id=" + selectedCountry);

            _form[_name].getCombo("address_province").loadXML(_configuration.application_path + "processors/address_list.php?type=address_province&agencyid=" + _configuration.agencyid + "&country_id=" + selectedCountry);
            _form[_name].getCombo("address_County").setComboText('-- Select County --');
            _form[_name].setItemValue('address_zip', '');
            _configuration.edited = 1;
            isCountryChange = true;
          });
        });
        //When State is changed county needs to be changed.Edited = 1
        _form[_name].getCombo("address_state").attachEvent("onXLE", function() {

          eventNew = _form[_name].getCombo("address_state").attachEvent("onChange", function() {

            var selectedState = _form[_name].getCombo("address_state").getSelectedValue();
            _form[_name].getCombo("address_County").loadXML(_configuration.application_path + "processors/address_list.php?type=address_County&agencyid=" + _configuration.agencyid + "&state_id=" + selectedState);
            _configuration.edited = 1;

          });
          if (isCountryChange)
            _form[_name].getCombo("address_state").detachEvent(eventNew);
        });

        //Edited = 1
        _form[_name].getCombo("address_province").attachEvent("onXLE", function() {
          _form[_name].getCombo("address_province").attachEvent("onChange", function() {
            _configuration.edited = 1;
          });
        });
        //Edited = 1
        _form[_name].getCombo("address_County").attachEvent("onXLE", function() {
          if (json.countyId) {
            _form[_name].getCombo("address_County").setComboValue(json.countyId);
            //_form[_name].getCombo("address_County").setComboText(json.countyName);
            json.countyId = '';
            json.countyName = '';
          }
          _form[_name].getCombo("address_County").attachEvent("onChange", function() {
            _configuration.edited = 1;
          });
        });
      }

      if (task == 'import_address') {
        self.editlayout[uid].progressOn();
        MAPaddres_parms = "contact_ID=" + _form[_name].getItemValue("contact_ID") + "&import=import_address" + "&contactIdPerson1=" + _configuration.contactcomponent_obj._configuration.p1contactid;

        dhtmlxAjax.post(_configuration.application_path + "processors/savetoairs.php", MAPaddres_parms, function(loader) {
          json = JSON.parse(loader.xmlDoc.responseText);
          if (json.status == "imported" && json.AddressType != null) {
            dhtmlx.message({
              text: "Importing address details"
            });
            var address_start2 = self.dateFormat(uid, json.addstartdate, 'import');
            var addleavedate2 = self.dateFormat(uid, json.addleavedate, 'import');
            if (json.primary_address)
              _form[_name].setItemValue("MailingAddress", json.primary_address);
            if (json.Address1)
              _form[_name].setItemValue("address_address1", json.Address1);
            if (json.Address2)
              _form[_name].setItemValue("address_address2", json.Address2);
            if (json.city)
              _form[_name].setItemValue("address_city", json.city);
            //_form[_name].setItemValue("address_zip", json.primary_address);
            if (json.addstartdate)
              _form[_name].setItemValue("address_start", address_start2);
            if (json.addleavedate)
              _form[_name].setItemValue("address_leave", addleavedate2);
            if (json.address_zip != ' ')
              _form[_name].setItemValue("address_zip", json.address_zip);
            _configuration.edited = 1; //edited = 1 when imported
            setTimeout(function() {
              self.setaddrcombovalues(uid);


            }, 2000);
            setTimeout(function() {
              self.editlayout[uid].progressOff();
            }, 3500);
          } else {
            dhtmlx.message({
              text: "Address details not available."
            });

          }
        });

        //When country changed state & province changes.County set to 'select County'
        _form[_name].getCombo("address_country").attachEvent("onXLE", function() {
          _form[_name].getCombo("address_country").attachEvent("onChange", function() {
            var selectedCountry = _form[_name].getCombo("address_country").getActualValue();
            _form[_name].getCombo("address_state").loadXML(_configuration.application_path + "processors/address_list.php?type=address_state&agencyid=" + _configuration.agencyid + "&country_id=" + selectedCountry);
            _form[_name].getCombo("address_province").loadXML(_configuration.application_path + "processors/address_list.php?type=address_province&agencyid=" + _configuration.agencyid + "&country_id=" + selectedCountry);
            _form[_name].setItemValue('address_zip', '');
            isCountryChange = true;
          });
        });
        //When State is changed county needs to be changed
        _form[_name].getCombo("address_state").attachEvent("onXLE", function() {

          eventImport = _form[_name].getCombo("address_state").attachEvent("onChange", function() {
            var selectedState = _form[_name].getCombo("address_state").getSelectedValue();
            _form[_name].getCombo("address_County").loadXML(_configuration.application_path + "processors/address_list.php?type=address_County&agencyid=" + _configuration.agencyid + "pp&state_id=" + selectedState);
          });
          if (isCountryChange)
            _form[_name].getCombo("address_state").detachEvent(eventImport);
        });

        _form[_name].getCombo("address_County").attachEvent("onXLE", function() {
          if (json.countyId) {
            _form[_name].getCombo("address_County").setComboValue(json.countyId);
            //_form[_name].getCombo("address_County").setComboText(json.countyName);
            json.countyId = '';
            json.countyName = '';
          }
        });

      }

      _form[_name].getCombo("MailingAddress").enableOptionAutoHeight(1);
      //Edited = 1
      _form[_name].attachEvent("onInputChange", function(name) {
        _configuration.edited = 1;
        var len = _form[_name].getItemValue("address_zip").length;
        if (name === 'address_zip') {
          if (_form[_name].getCombo("address_country").getSelectedText() === 'USA') {
            if (len === 5) {
              var zipcode = _form[_name].getItemValue("address_zip");
              var filter = /^\d{5}(?:-\d{4})?$/;
              var zipcodeVal = filter.test(zipcode);
              if (zipcode !== '' && zipcode !== null) {
                if (zipcodeVal !== true) {
                  dhtmlx.alert({
                    title: "Alert",
                    type: "alert-error",
                    text: "Please enter a valid zipcode",
                    callback: function() {
                      _form[_name].setItemValue('address_zip', '');
                      _form[_name].setItemFocus('address_zip');
                    }
                  });
                } else {
                  self.combo_value['state'] = '';
                  self.combo_value['county'] = '';
                  dhtmlxAjax.post(_configuration.application_path + "processors/address_zip.php", "zip=" + zipcode, function(loader) {
                    json = JSON.parse(loader.xmlDoc.responseText);
                    if (json.status === 'success') {

                      _form[_name].getCombo("address_state").setComboValue(json.stateId);
                      self.combo_value['state'] = json.stateName;
                      self.combo_value['county'] = json.countyName;
                      json.stateId = '';
                      json.stateName = '';
                      //_form[_name].getCombo("address_state").detachEvent(eventNew);
                      //_form[_name].getCombo("address_state").detachEvent(eventEdit);
                      //_form[_name].getCombo("address_state").detachEvent(eventImport);
                    }
                  });
                }
              }

            }
          }

        }
      });

      _form[_name].getCombo("MailingAddress").attachEvent("onSelectionChange", function() {
        _configuration.edited = 1;
      });
      _form[_name].getInput("address_leave").style.backgroundImage = self.model.calendarImage.url;
      _form[_name].getInput("address_leave").style.backgroundPosition = self.model.calendarImage.position;
      _form[_name].getInput("address_leave").style.backgroundRepeat = self.model.calendarImage.repeat;
      _form[_name].getInput("address_start").style.backgroundImage = self.model.calendarImage.url;
      _form[_name].getInput("address_start").style.backgroundPosition = self.model.calendarImage.position;
      _form[_name].getInput("address_start").style.backgroundRepeat = self.model.calendarImage.repeat;
      // self.editlayout[uid].progressOff();
    },
    // Starting the Component
    start: function(config) {
      var self = this;
      self.validate_start(config);

      _uid = config.uid;
      _configuration = config;
      self.application_path = config.application_path;
      window.dhx_globalImgPath = config.dhtmlx_codebase_path + "imgs/";

      _configuration["icons_path"] = "icons/";


      var internal_dependencies = [
        self.application_path + "model/main_model.js",
        self.application_path + "controller/classes/data.js"
      ];

      //loading all internal dependencies...
      CAIRS.onDemand.load(internal_dependencies, function() {
        self.data.init();
        dhtmlx.skin = self.model.globalSkin || "dhx_skyblue";
        self.model.conf_window.image_path = _configuration.application_path + _configuration.icons_path;
        self.model.conf_toolbar.icon_path = _configuration.application_path + _configuration.icons_path;
        self.model.edit_toolbar.icon_path = _configuration.application_path + _configuration.icons_path;

        if (_configuration.useWindow === true) {
          self.build_window(_uid);
        }
        self.build_layout(_uid);
        self.build_toolbar(_uid);
        self.build_grid(_uid);
        // self.datastor(_uid);
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
      if ((typeof config.contactid === 'undefined') || (config.contactid.length === 0)) {
        dhtmlx.message({
          type: "error",
          text: "Contact Id is missing"
        });
        return;
      }
      if ((typeof config.agencyid === 'undefined') || (config.agencyid.length === 0)) {
        dhtmlx.message({
          type: "error",
          text: "Agency Id is missing"
        });
        return;
      }
    }
  }
}());