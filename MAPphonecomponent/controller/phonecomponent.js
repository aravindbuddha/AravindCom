var phonecomponent = {
	uid: null,
	window_manager: null,
	window: [],
	layout: [],
	toolbar: [],
	grid: [],
	form: [],
	status_bar: [],
	configuration: [],
	editstatus_bar: [],
	editwindows: [],
	edittoolbar: [],
	editlayout: [],
	window_help: [],
	data_store: [],

	_window_manager: function() {
		var self = this;
		self.window_manager = new dhtmlXWindows();
		self.window_manager.setImagePath(self.model.conf_window.image_path);
	},
	_window: function(uid) {
		var self = this;
		if (self.configuration[uid].window_managerObj === null) {
			if (self.window_manager === null)
				self._window_manager();
		}
		else {
			self.window_manager = self.configuration[uid].window_managerObj;
			//            alert(self.window_manager);
		}
		if (self.window_manager.isWindow("window_phonecomponent_" + uid)) {
			self.window[uid].show();
			self.window[uid].bringToTop();
			return;
		}
		self.window[uid] = self.window_manager.createWindow("window_phonecomponent_" + uid, self.model.conf_window.left, self.model.conf_window.top, self.model.conf_window.width, self.model.conf_window.height);
		self.window[uid].setText(self.model.text_labels.main_window_title);
		self.window[uid].setIcon(self.model.conf_window.icon, self.model.conf_window.icon_dis);
		self.window[uid].button('park').hide();
		self.window[uid].button('minmax1').hide();
		self.window[uid].attachEvent("onClose", function(win) {
			self.toolbar = [];
			self.layout = [];
			self.edittoolbar = [];
			self.editlayout = [];
			self.form = [];
			self.grid = [];
			return true;
		});
		self.status_bar[uid] = self.window[uid].attachStatusBar();
		self.status_bar[uid].setText("Loading");
	},

	_editwindow: function(uid, task) {
		var self = this;
		if (self.configuration[uid].window_managerObj === null || self.configuration[uid].window_managerObj === '') {
			if (self.window_manager === null)
				self._window_manager();
		}
		else {
			self.window_manager = self.configuration[uid].window_managerObj;
			//            alert(self.window_manager);
		}
		self.editwindows[uid] = self.window_manager.createWindow('window_phone_edit_' + uid, 0, 0, self.model.conf_window.model_edit_winHeight, self.model.conf_window.model_edit_winWidth);
		if (task == 'New')
			self.editwindows[uid].setText('Add Phone');
		else
			self.editwindows[uid].setText('Edit Phone');
		self.dhtmlxWidowCustomPostion(self.editwindows[uid], self.model.conf_window.top);
		self.editwindows[uid].setModal(true);
		self.editwindows[uid].button('park').hide();
		self.editwindows[uid].button('minmax1').hide();
		self.editwindows[uid].setIcon(self.model.conf_window.icon, self.model.conf_window.icon);
		self.editstatus_bar[uid] = self.editwindows[uid].attachStatusBar();
		self.editstatus_bar[uid].setText("");
		self.editwindows[uid].attachEvent('onclose', function() {
			self.edittoolbar = [];
			self.editlayout = [];
			self.form = [];
			return true;
		});
	},
	_layout: function(uid) {
		var self = this;

		if (self.configuration[uid].useWindow === true) {
			self.layout[uid] = self.window[uid].attachLayout(self.model.conf_layout.pattern);
		}
		else {
			self.layout[uid] = new dhtmlXLayoutObject(self.configuration[uid].parentDIVId, self.model.conf_layout.pattern);
		}

		self.layout[uid].cells("a").hideHeader();
	},
	_editlayout: function(uid) {
		var self = this;
		self.editlayout[uid] = self.editwindows[uid].attachLayout(self.model.conf_layout.pattern);
		self.editlayout[uid].cells("a").hideHeader();
	},
	_edittoolbar: function(uid, task) {
		var self = this;
		self.edittoolbar[uid] = self.editlayout[uid].cells("a").attachToolbar(self.model.edit_toolbar);
		self.edittoolbar[uid].setSkin(self.model.globalSkin);
		self.edittoolbar[uid].attachEvent("onClick", function(id) {
			if (id == "save_phone") {
				self.addRow(uid, task);
			}
			if (id == "close_editphone") {
				self.editwindows[uid].close();
			}

		});
	},
	addRow: function(uid, task) {
		var self = this;
		var add_primarytext, json, MAPphone_params;
		if (self.validate(uid, task) === true) {
			self.editlayout[uid].progressOn();
			MAPphone_params = "contact_ID=" + self.form[uid].getItemValue("contact_ID") + "&phoneNumexten=" + self.form[uid].getItemValue("phoneNumexten") + "&PrimaryPhoneNum=" + self.form[uid].getItemValue("PrimaryPhoneNum") + "&phoneNum=" + self.form[uid].getItemValue("phoneNum") + "&phoneType=" + self.form[uid].getItemValue("phoneType") + "&phone_ID=" + self.form[uid].getItemValue("phone_ID") + "&agencyid=" + self.configuration[uid].agencyid;
			dhtmlxAjax.post(self.configuration[uid].application_path + "processors/savetoairs.php", MAPphone_params, function(MAPphone_loader) {

				json = JSON.parse(MAPphone_loader.xmlDoc.responseText);
				if (json.status == "success") {
					self.editlayout[uid].progressOff();
					if (self.form[uid].getItemValue("PrimaryPhoneNum") == 0)
						add_primarytext = 'No';
					else
						add_primarytext = 'Yes';

					if (self.grid[uid].getRowsNum() > 0 && self.form[uid].getItemValue("PrimaryPhoneNum") == 1) {
						self.grid[uid].forEachRow(function(id) {
							self.grid[uid].cells(id, 3).setValue('No');
						});
					}

					if (self.form[uid].getItemValue("phone_ID") == 0) {
						self.grid[uid].addRow(json.addid, [self.form[uid].getCombo("phoneType").getSelectedText(), self.form[uid].getItemValue("phoneNum"), self.form[uid].getItemValue("phoneNumexten"), add_primarytext], '');
					}
					else {
						self.grid[uid].cells(json.addid, 0).setValue(self.form[uid].getCombo("phoneType").getSelectedText());
						self.grid[uid].cells(json.addid, 1).setValue(self.form[uid].getItemValue("phoneNum"));
						self.grid[uid].cells(json.addid, 3).setValue(add_primarytext);
						self.grid[uid].cells(json.addid, 2).setValue(self.form[uid].getItemValue("phoneNumexten"));
					}
					self.editwindows[uid].close();
				}
				else {
					self.editlayout[uid].progressOff();
					dhtmlx.message({
						type: "error",
						text: json.response
					});
				}
			});
		}
	},
	lengthRestriction: function(uInput, min, max) {
		if (uInput.length >= min && uInput.length <= max) {
			return true;
		}
		else {
			return false;
		}
	},
	validate: function(uid, task) {
		var self = this;
		var contactid = self.form[uid].getItemValue("contact_ID");
		var phone_id = self.form[uid].getItemValue("phone_ID");
		var phonetype = self.form[uid].getItemValue("phoneType");
		var phonenum = self.form[uid].getItemValue("phoneNum");
		var phoneNumexten = self.form[uid].getItemValue("phoneNumexten");
		var filter = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		var intRegex = /^\d+$/;
		var phonenumVal = filter.test(phonenum);
		var phoneNumextenval = intRegex.test(phoneNumexten);
		if (task == 'New') {
			if (contactid === '' || contactid === null) {
				dhtmlx.alert({
					title: "Alert",
					type: "alert-error",
					text: "ContactId Is Missing"
				});
				return false;
			}
			else if (phonetype === '' || phonetype === null) {
				dhtmlx.alert({
					title: "Alert",
					type: "alert-error",
					text: "Phone Type is mandatory"
				});
				self.editstatus_bar[uid].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
				return false;
			}
			else if (phonenum === '' || phonenum === null) {
				dhtmlx.alert({
					title: "Alert",
					type: "alert-error",
					text: "Phone Number is mandatory"
				});
				self.editstatus_bar[uid].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
				return false;
			}
			else if (phonenumVal !== true) {
				dhtmlx.alert({
					title: "Alert",
					type: "alert-error",
					text: "Please enter a valid phone number"
				});
				self.editstatus_bar[uid].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
				return false;
			}
			else if (phoneNumextenval !== true && phoneNumexten != null && phoneNumexten != '') {
				//if(phoneNumexten.length>=2 && phoneNumexten.length<=5){
				dhtmlx.alert({
					title: "Alert",
					type: "alert-error",
					text: "Please enter a valid extension number"
				});
				return false;
			}
			else if (self.lengthRestriction(phoneNumexten, 2, 5) == false && phoneNumexten != null && phoneNumexten != '') {
				dhtmlx.alert({
					title: "Alert",
					type: "alert-error",
					text: "Please enter extension number between 2 and 5 characters"
				});
				return false;
			}
			else {
				return true;
			}
		}
		else {
			if (contactid === '' || contactid === null) {
				dhtmlx.alert({
					title: "Alert",
					type: "alert-error",
					text: "ContactId Is Missing"
				});
				return false;
			}
			else if (phonetype === '' || phonetype === null) {
				dhtmlx.alert({
					title: "Alert",
					type: "alert-error",
					text: "Phone Type is mandatory"
				});
				self.editstatus_bar[uid].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
				return false;
			}
			else if (phonenum === '' || phonenum === null) {
				dhtmlx.alert({
					title: "Alert",
					type: "alert-error",
					text: "Phone Number is mandatory"
				});
				self.editstatus_bar[uid].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
				return false;
			}
			else if (phonenumVal !== true) {
				dhtmlx.alert({
					title: "Alert",
					type: "alert-error",
					text: "Please enter a valid phone number"
				});
				self.editstatus_bar[uid].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
				return false;
			}
			else if (phoneNumextenval !== true && phoneNumexten != null && phoneNumexten != '') {
				//if(phoneNumexten.length>=2 && phoneNumexten.length<=5){
				dhtmlx.alert({
					title: "Alert",
					type: "alert-error",
					text: "Please enter a valid extension number"
				});
				return false;
			}
			else if (self.lengthRestriction(phoneNumexten, 2, 5) == false && phoneNumexten != null && phoneNumexten != '') {
				dhtmlx.alert({
					title: "Alert",
					type: "alert-error",
					text: "Please enter extension number between 2 and 5 characters"
				});
				return false;
			}
			else {
				return true;
			}
		}
	},
	_toolbar: function(uid) {
		var self = this;
		var selectedRowsId;
		self.toolbar[uid] = self.layout[uid].cells("a").attachToolbar(self.model.conf_toolbar);
		self.toolbar[uid].setSkin(self.model.globalSkin);

		if (self.configuration[uid].useWindow !== true) {
			self.toolbar[uid].removeItem("help_phone");
			self.toolbar[uid].removeItem("close_phone");
		}
		if (self.configuration[uid].contactid === 0) {
			self.toolbar[uid].disableItem("edit_phone");
			self.toolbar[uid].disableItem("delete_phone");
		}
		self.toolbar[uid].disableItem("delete_phone");
		self.toolbar[uid].disableItem("edit_phone");
		self.toolbar[uid].attachEvent("onClick", function(id) {
			if (MAPPermissions.checkAccessPermission(id) != 1) {
				if (id == "edit_phone") {
					self._editwindow(uid, 'Edit');
					self._editlayout(uid);
					self._edittoolbar(uid, 'Edit');
					self._form(uid, 'Edit');
				}
				if (id == "add_phone") {
					if (self.configuration[uid].window_managerObj !== null) {
						if (self.configuration[uid].contactid == 0) {
							if (self.configuration[uid].contactcomponent_obj.validation(uid) === true) {
								self.configuration[uid].contactcomponent_obj.savecontact(uid, 'temp');
								self._editwindow(uid, 'New');
								self._editlayout(uid);
								self._edittoolbar(uid, 'New');
								setTimeout(function() {
									self._form(uid, 'New')
								}, 4000);

							}
						}
						else {
							self._editwindow(uid, 'New');
							self._editlayout(uid);
							self._edittoolbar(uid, 'New');
							self._form(uid, 'New');
						}
					}
					else {
						self._editwindow(uid, 'New');
						self._editlayout(uid);
						self._edittoolbar(uid, 'New');
						self._form(uid, 'New');
					}
				}
				if (id == "delete_phone") {
					selectedRowsId = self.grid[uid].getSelectedRowId();
					if (selectedRowsId !== null) {
						self.deleteRow(uid, selectedRowsId);
					}

				}
				if (id == "help_phone") {
					self._showHelp(uid);
				}
				if (id == "close_phone") {
					self.window[uid].close();
				}
			}
		});
	},
	deleteRow: function(uid, selectedRowsId) {
		var self = this;
		var MAPphone_delet_params, json;
		self.progressOn(uid);

		dhtmlx.confirm({
			title: "Delete Phone",
			type: "confirm-warning",
			text: "Are you sure you want to delete this Phone?",
			callback: function(result) {
				if (result === true) {
					MAPphone_delet_params = "contactId=" + self.configuration[uid].contactid + "&contactPhoneId=" + selectedRowsId + "&agencyid=" + self.configuration[uid].agencyid;
					dhtmlxAjax.post(self.configuration[uid].application_path + "processors/deletePhoneInfo.php", MAPphone_delet_params, function(MAPphone_delet_loader) {
						try {
							json = JSON.parse(MAPphone_delet_loader.xmlDoc.responseText);
							if (json.status == "success") {
								dhtmlx.message({
									text: "record was deleted"
								});
								self.grid[uid].deleteRow(self.grid[uid].getSelectedRowId());
								self.toolbar[uid].disableItem("delete_phone");
								self.toolbar[uid].disableItem("edit_phone");
								self.progressOff(uid);
							}
							else {
								dhtmlx.message({
									type: "error",
									text: json.response
								});
								self.progressOff(uid);
							}
						}
						catch (e) {
							dhtmlx.message({
								type: "error",
								text: "Fatal error on server side: " + loader.xmlDoc.responseText
							});
							self.progressOff(uid);
						}
					});
				}
				else {
					self.progressOff(uid);
				}
			}
		});

	},
	_grid: function(uid) {
		var self = this;
		self.grid[uid] = self.layout[uid].cells("a").attachGrid(self.model.conf_grid);
		self.grid[uid].setHeader(self.model.conf_grid.headers);

		if (self.configuration[uid].useWindow === true) {
			self.grid[uid].setInitWidths(self.model.conf_grid.widths);
		}
		else {
			self.grid[uid].setInitWidths(self.model.conf_grid.widths_layout);
		}
		self.grid[uid].setColAlign(self.model.conf_grid.colaligns);
		self.grid[uid].setColTypes(self.model.conf_grid.coltypes);
		self.grid[uid].setColSorting(self.model.conf_grid.colsorting);
		self.grid[uid].selMultiRows = false;
		self.grid[uid].enableAutoWidth(true);
		self.grid[uid].enableMultiline(true);
		self.grid[uid].setDateFormat("%m-%d-%Y");
		self.grid[uid].init();
		self.dataStore_getData(uid);
		//self.toolbar[uid].disableItem("delete_phone");
		self.grid[uid].attachEvent("onRowDblClicked", function(rowId, cellInd) {
			//            if (self.window_manager === null)
			//                self._window_manager();
			self._editwindow(uid, 'Edit');
			self._editlayout(uid);
			self._edittoolbar(uid, 'Edit');
			self._form(uid, 'Edit');
		});
		self.grid[uid].attachEvent("onEnter", function(rowId, cellInd) {
			//            if (self.window_manager === null)
			//                self._window_manager();
			self._editwindow(uid, 'Edit');
			self._editlayout(uid);
			self._edittoolbar(uid, 'Edit');
			self._form(uid, 'Edit');
		});

		self.grid[uid].attachEvent("onRowSelect", function(rowId, cellInd) {
			self.toolbar[uid].enableItem("delete_phone");
			self.toolbar[uid].enableItem("edit_phone");
		});
	},

	_form: function(uid, task) {
		var self = this;
		var primary_phone;
		self.progressOn(uid);
		self.form[uid] = self.editlayout[uid].cells("a").attachForm(self.model.conf_form.template);
		/*if (self.configuration[uid].window_managerObj !== null) {
			if (self.configuration[uid].contactcomponent_obj.configuration[uid].contactid != 0 && self.configuration[uid].contactcomponent_obj.configuration[uid].contactid != 'undefined') {
				self.configuration[uid].contactid = self.configuration[uid].contactcomponent_obj.configuration[uid].contactid;
			}
		}*/
		self.form[uid].setItemValue("contact_ID", self.configuration[uid].contactid);
		if (task == 'Edit') {
			if (self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 3).getValue() == 'Yes')
				primary_phone = 1;
			else
				primary_phone = 0;
			self.form[uid].setItemValue("phone_ID", self.grid[uid].getSelectedRowId());
			self.form[uid].setItemValue("phoneNum", self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 1).getValue());
			self.form[uid].setItemValue("phoneType", self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 0).getValue());
			self.form[uid].setItemValue("phoneNumexten", self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 2).getValue());
			self.form[uid].setItemValue("PrimaryPhoneNum", primary_phone);
			self.form[uid].getCombo("phoneType").loadXML(self.configuration[uid].application_path + "processors/phonetypelist.php?agencyId=" + self.configuration[uid].agencyid + "&id=" + self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 0).getValue(), self.progressOff(uid));
		}
		else {
			self.form[uid].getCombo("phoneType").loadXML(self.configuration[uid].application_path + "processors/phonetypelist.php?agencyId=" + self.configuration[uid].agencyid + "&id=0", self.progressOff(uid));
		}
		self.form[uid].getCombo("PrimaryPhoneNum").enableOptionAutoHeight(1);
	},
	dataStore_getData: function(uid) {
		var self = this;
		var postStr, json;
		self.progressOn(uid);
		postStr = "contactID=" + self.configuration[uid].contactid + "&agencyid=" + self.configuration[uid].agencyid;
		dhtmlxAjax.post(self.configuration[uid].application_path + "processors/get_data.php", postStr, function(loader) {
			try {
				json = JSON.parse(loader.xmlDoc.responseText);
				if (json.status == "success") {

					self.grid[uid].parse(json.phone, "json");
					/*dhtmlx.message({
					    text: "Data store 100% loaded"
					});*/
					if (self.configuration[uid].useWindow === true) {
						self.status_bar[uid].setText("Loaded");
					}
					self.progressOff(uid);
				}
				else {
					dhtmlx.message({
						type: "error",
						text: json.response
					});
				}
			}
			catch (e) {
				dhtmlx.message({
					type: "error",
					text: "Fatal error on server side: " + loader.xmlDoc.responseText
				});

			}
		});
	},
	_showHelp: function(uid) {
		var self = this;
		if (self.window_manager.isWindow("help_phone_window_" + uid)) {
			self.window_help[uid].show();
			self.window_help[uid].bringToTop();
			return;
		}
		self.window_help[uid] = self.window_manager.createWindow("help_phone_window_" + uid, self.model.conf_window.left + 10, self.model.conf_window.top + 10, 700, 400);
		self.window_help[uid].setText("End user manual");
		self.window_help[uid].setIcon("Help.png", "Help.png");
		self.window_help[uid].button('park').hide();
		self.window_help[uid].button('minmax1').hide();
		self.window_help[uid].attachURL(self.configuration[uid].application_path + "docs/end_user_manual");
	},
	progressOn: function(uid) {
		var self = this;
		self.layout[uid].progressOn();
		if (self.configuration[uid].useWindow === true) {
			self.window[uid].progressOn();
		}
	},
	progressOff: function(uid) {
		var self = this;
		self.layout[uid].progressOff();
		if (self.configuration[uid].useWindow === true) {
			self.window[uid].progressOff();
		}
	},

	// Data Store
	_datastor: function(uid) {

		var self = this;
		self.progressOn(uid);
		var postStr = "contactID=" + self.configuration[uid].contactid + "&agencyid=" + self.configuration[uid].agencyid;
		dhtmlxAjax.post(self.configuration[uid].application_path + "processors/get_data.php", postStr, function(loader) {
			try {
				var json = JSON.parse(loader.xmlDoc.responseText);

				if (json.status == "success") {
					self.data_store[uid] = json;

					dhtmlx.message({
						text: "Data store 100% loaded"
					});
					self._grid(uid);
					self.progressOff(uid);
				}
				else {
					dhtmlx.message({
						type: "error",
						text: json.response
					});
				}
			}
			catch (e) {
				dhtmlx.message({
					type: "error",
					text: "Fatal error on server side: " + loader.xmlDoc.responseText
				});
			}
		});
	},

	dhtmlxWidowCustomPostion: function(widowObj, yPosition) {

		var position, splitPosition, xPosition;

		widowObj.center();
		position = widowObj.getPosition();
		splitPosition = String(position).split(",");
		xPosition = splitPosition[0];

		if (xPosition < 0)
			xPosition = 50;
		widowObj.setPosition(xPosition, yPosition);
		window.scrollTo(xPosition, 0);
	},
	init: function(model) {
		var self = this;
		self.model = model;
	},
	start: function(configuration) {
		var self = this;
		self.uid = configuration.uid;
		if ((typeof configuration.uid === 'undefined') || (configuration.uid.length === 0)) {
			dhtmlx.message({
				type: "error",
				text: "uid is missing"
			});
			return;
		}
		if ((typeof configuration.application_path === 'undefined') || (configuration.application_path.length === 0)) {
			dhtmlx.message({
				type: "error",
				text: "application_path is missing"
			});
			return;
		}
		if ((typeof configuration.dhtmlx_codebase_path === 'undefined') || (configuration.dhtmlx_codebase_path.length === 0)) {
			dhtmlx.message({
				type: "error",
				text: "dhtmlx_codebase_path is missing"
			});
			return;
		}
		if ((typeof configuration.contactid === 'undefined') || (configuration.contactid.length === 0)) {
			dhtmlx.message({
				type: "error",
				text: "Contact Id is missing"
			});
			return;
		}
		window.dhx_globalImgPath = configuration.dhtmlx_codebase_path + "imgs/";
		dhtmlx.skin = self.model.globalSkin || "dhx_skyblue";
		configuration["icons_path"] = "icons/";
		self.configuration[self.uid] = configuration;
		self.model.conf_window.image_path = configuration.application_path + configuration.icons_path;
		self.model.conf_toolbar.icon_path = configuration.application_path + configuration.icons_path;
		self.model.edit_toolbar.icon_path = configuration.application_path + configuration.icons_path;
		if (configuration.useWindow === true) {
			self._window(self.uid);
		}
		self._layout(self.uid);
		self._toolbar(self.uid);
		self._grid(self.uid);
	}
};
phonecomponent.init(phonecomponent_Model);