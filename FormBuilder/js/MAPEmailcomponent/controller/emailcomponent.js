var emailcomponent = {
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

    // Window Manager
    _window_manager: function () {

        var self = this;
        self.window_manager = new dhtmlXWindows();
        self.window_manager.setImagePath(self.model.conf_window.image_path);

    },

    // Window
    _window: function (uid) {
        var self = this;
        
        if(self.configuration[uid].window_managerObj === null) {
            if (self.window_manager === null)
                self._window_manager();
        }
        else {
            self.window_manager = self.configuration[uid].window_managerObj;
//            alert(self.window_manager);
        }

        if (self.window_manager.isWindow("Background_" + uid)) {
            self.window[uid].show();
            self.window[uid].bringToTop();
            self.window[uid].center();
            return;
        }
        self.window[uid] = self.window_manager.createWindow("Email_" + uid, 0, 0, self.model.conf_window.width, self.model.conf_window.height);
        self.window[uid].setText(self.model.text_labels.main_window_title);
        self.window[uid].setIcon(self.model.conf_window.icon, self.model.conf_window.icon_dis);
        self.window[uid].center();
        self.window[uid].denyPark();
        self.dhtmlxWidowCustomPostion(self.window[uid],self.model.conf_window.top);
        self.window[uid].attachEvent("onClose", function (win) {

//            win.hide();
            return true;
        });

        self.status_bar[uid] = self.window[uid].attachStatusBar();

    },

    //Layout
    _layout: function (uid) {
        var self = this;
        if (self.configuration[uid].useWindow === true) {
            self.layout[uid] = self.window[uid].attachLayout(self.model.conf_layout.pattern);
        } else {
            self.layout[uid] = new dhtmlXLayoutObject(self.configuration[uid].parentDIVId, self.model.conf_layout.pattern);
        }
        self.layout[uid].cells("a").hideHeader();

    },

    //toolbar
    _toolbar: function (uid) {
        var self = this;
        self.toolbar[uid] = self.layout[uid].cells("a").attachToolbar(self.model.conf_toolbar);
        self.toolbar[uid].setSkin(self.model.globalSkin);
		self.toolbar[uid].setIconsPath(self.model.conf_window.image_path);
        if (self.configuration[uid].useWindow !== true) {
            self.toolbar[uid].removeItem("help_email");
            self.toolbar[uid].removeItem("close_email");
        }
/*        if (self.configuration[uid].contactid === 0) {
            self.toolbar[uid].disableItem("add_email");
        }*/
        self.toolbar[uid].attachEvent("onClick", function (id) {
         if(MAPPermissions.checkAccessPermission(id)!=1) {  
		 if( id == "edit_email"){
			 self._editwindow(uid, 'Edit');
            self._editlayout(uid);
            self._edittoolbar(uid, 'Edit');
            self._form(uid, 'Edit');
		 }
             if (id == "add_email") {
                if(self.configuration[uid].window_managerObj != null){
					
                    if(self.configuration[uid].contactcomponent_obj.configuration[uid].contactid == 0){									
                        if (self.configuration[uid].contactcomponent_obj.validation(uid) === true) {
                            self.configuration[uid].contactcomponent_obj.savecontact(uid, 'temp');				
                            self._editwindow(uid, 'New');
                            self._editlayout(uid);
                            self._edittoolbar(uid, 'New');				
                            setTimeout(function(){
                                self._form(uid, 'New')
                            },4000);
              
                        }
                    }else{
                        self._editwindow(uid, 'New');
                        self._editlayout(uid);
                        self._edittoolbar(uid, 'New');
                        self._form(uid, 'New');
                    }
                }else{
                    self._editwindow(uid, 'New');
                    self._editlayout(uid);
                    self._edittoolbar(uid, 'New');
                    self._form(uid, 'New');
                }
            }
            if (id == "delete_email") {
                var selectedRowsId = self.grid[uid].getSelectedRowId();
                if (selectedRowsId !== null) {
                    self.deleteRow(uid, selectedRowsId);
                }
            }
            if (id == "help_email") {
                self._showHelp(uid);
            }
            if (id == "close_email") {
                self.window[uid].close();
            }
         }
        });
    },
	
    _editwindow: function (uid, task) {
        var self = this;
        if(self.configuration[uid].window_managerObj === null) {
            if (self.window_manager === null)
                self._window_manager();
        }
        else {
            self.window_manager = self.configuration[uid].window_managerObj;
//            alert(self.window_manager);
        }
        self.editwindows[uid] = self.window_manager.createWindow('window_email_edit_' + uid, 0, 0, self.model.conf_window.model_edit_winHeight, self.model.conf_window.model_edit_winWidth);
        if (task == 'New')
            self.editwindows[uid].setText('Add Email');
        else
            self.editwindows[uid].setText('Edit Email');
        self.dhtmlxWidowCustomPostion(self.editwindows[uid],self.model.conf_window.top);
        self.editwindows[uid].setModal(true);
        self.editwindows[uid].button('park').hide();
		self.editwindows[uid].button('minmax1').hide();
        self.editwindows[uid].setIcon(self.model.conf_window.icon, self.model.conf_window.icon);
        self.editstatus_bar[uid] = self.editwindows[uid].attachStatusBar();
        self.editstatus_bar[uid].setText("");
        self.editwindows[uid].attachEvent('onclose', function () {
            self.edittoolbar = [];
            self.editlayout = [];
            self.form = [];
            return true;
        });
    },
    _editlayout: function (uid) {
        var self = this;
        self.editlayout[uid] = self.editwindows[uid].attachLayout(self.model.conf_layout.pattern);
        self.editlayout[uid].cells("a").hideHeader();
		self.editlayout[uid].progressOn();
    },
    _edittoolbar: function (uid, task) {
        var self = this;
        self.edittoolbar[uid] = self.editlayout[uid].cells("a").attachToolbar(self.model.edit_toolbar);
        self.edittoolbar[uid].setSkin(self.model.globalSkin);
		self.toolbar[uid].setIconsPath(self.model.conf_window.image_path);
        self.edittoolbar[uid].attachEvent("onClick", function (id) {
            if (id == "save_phone") {
                self.addRow(uid, task);
            }
            if (id == "close_editphone") {
                self.editwindows[uid].close();
            }
        });
    },
	
    addRow: function (uid, task) {
        var self = this;
        var add_primarytext;
        if (self.validate(uid, task) === true) {
            self.editlayout[uid].progressOn();
			
			
            var MAPemail_params = "contact_ID_email=" + self.form[uid].getItemValue("contact_ID_email") + "&Emailmailing=" + self.form[uid].getItemValue("primaryEmail") + "&contactEmailStr=" + self.form[uid].getItemValue("email") + "&emailTypeStr=" + self.form[uid].getItemValue("emailType1") + "&email_ID_hidden=" + self.form[uid].getItemValue("email_ID") + "&agencyid=" + self.configuration[uid].agencyid;
            dhtmlxAjax.post(self.configuration[uid].application_path + "processors/savetoairs.php", MAPemail_params, function (loader) {
                var json = JSON.parse(loader.xmlDoc.responseText);
                if (json.status == "success") {
                    dhtmlx.message({
                        text: "Record saved"
                    });
                    self.editlayout[uid].progressOff();
                    if (self.form[uid].getItemValue("primaryEmail") == 0)
                        add_primarytext = 'No';
                    else
                        add_primarytext = 'Yes';
						
												if(self.grid[uid].getRowsNum() > 0 && self.form[uid].getItemValue("primaryEmail") == 1){
						self.grid[uid].forEachRow(function (id) {
						self.grid[uid].cells(id, 1).setValue('No');
						});
						}
                    if (self.form[uid].getItemValue("email_ID") == 0) {
                        self.grid[uid].addRow(json.addid, [self.form[uid].getItemValue("email"), add_primarytext, self.form[uid].getCombo("emailType1").getSelectedText()], '');
                    } else {
                        self.grid[uid].cells(json.addid, 2).setValue(self.form[uid].getCombo("emailType1").getSelectedText());
                        self.grid[uid].cells(json.addid, 0).setValue(self.form[uid].getItemValue("email"));
                        self.grid[uid].cells(json.addid, 1).setValue(add_primarytext);
                    }
                    self.editwindows[uid].close();
                } else {
                    self.editlayout[uid].progressOff();
                    dhtmlx.message({
                        type: "error",
                        text: json.response
                    });
                }
            });
        }
    },
    validate: function (uid, task) {
        var self = this;
        var contactid = self.form[uid].getItemValue("contact_ID_email");
        var emailtype = self.form[uid].getItemValue("emailType1");
        var email = self.form[uid].getItemValue("email");
        var filter = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var emailVal = filter.test(email);
        if (task == 'New') {
            if (contactid === '' || contactid === null) {
                dhtmlx.alert({
                    title: "Alert",
                    type: "alert-error",
                    text: "ContactId Is Missing"
                });
                return false;
            } else if (emailtype === '' || emailtype === null  ) {
                dhtmlx.alert({
                    title: "Alert",
                    type: "alert-error",
                    text: "Email Type is mandatory"
                });
				self.editstatus_bar[uid].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
                return false;
            } else if (email === '' || email === null) {
                dhtmlx.alert({
                    title: "Alert",
                    type: "alert-error",
                    text: "Email is mandatory"
                });
				self.editstatus_bar[uid].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
                return false;
            } else if (emailVal !== true) {
                dhtmlx.alert({
                    title: "Alert",
                    type: "alert-error",
                    text: "Please enter a valid email"
                });
				self.editstatus_bar[uid].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
                return false;
            } else {
                return true;
            }
        } else {
            if (contactid === '' || contactid === null) {
                dhtmlx.alert({
                    title: "Alert",
                    type: "alert-error",
                    text: "ContactId Is Missing"
                });
                return false;
            } else if (emailtype === '' || emailtype === null) {
                dhtmlx.alert({
                    title: "Alert",
                    type: "alert-error",
                    text: "Email Type is mandatory"
                });
				self.editstatus_bar[uid].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
                return false;
            } else if (email === '' || email === null) {
                dhtmlx.alert({
                    title: "Alert",
                    type: "alert-error",
                    text: "Email is mandatory"
                });
				self.editstatus_bar[uid].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
                return false;
            } else if (emailVal !== true) {
                dhtmlx.alert({
                    title: "Alert",
                    type: "alert-error",
                    text: "Please enter a valid Email"
                });
				self.editstatus_bar[uid].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
                return false;
            } else {
                return true;
            }
        }
    },
    deleteRow: function (uid, selectedRowsId) {
        var self = this;
        self.progressOn(uid);

        dhtmlx.confirm({
            title: "Delete Email",
            type: "confirm-warning",
            text: "Are you sure you want to delete this Email ?",
            callback: function (result) {
                if (result === true) {
                    var MAPemail_delet_params = "contactId=" + self.configuration[uid].contactid + "&contactemailId=" + selectedRowsId + "&agencyid=" + self.configuration[uid].agencyid;
                    dhtmlxAjax.post(self.configuration[uid].application_path + "processors/deleteemailInfo.php", MAPemail_delet_params, function (loader) {
                        try {
                            var json = JSON.parse(loader.xmlDoc.responseText);
                            if (json.status == "success") {
                                dhtmlx.message({
                                    text: "record was deleted"
                                });
                                self.grid[uid].deleteRow(self.grid[uid].getSelectedRowId());
                                self.toolbar[uid].disableItem("delete_email");
								self.toolbar[uid].disableItem("edit_email");
                                self.progressOff(uid);
                            } else {
                                dhtmlx.message({
                                    type: "error",
                                    text: json.response
                                });
                                self.progressOff(uid);
                            }
                        } catch (e) {
                            dhtmlx.message({
                                type: "error",
                                text: "Fatal error on server side: " + loader.xmlDoc.responseText
                            });
                            self.progressOff(uid);
                        }
                    });
                } else {
                    self.progressOff(uid);
                }
            }
        });



    },
    _form: function (uid, task) {
        var self = this;
        var primary_email;
		self.editlayout[uid].progressOff();
        self.progressOn(uid);
        self.form[uid] = self.editlayout[uid].cells("a").attachForm(self.model.conf_form.template);
		 self.form[uid].setItemValue("primaryEmail", '0');
		if(self.configuration[uid].window_managerObj !== null){
		if(self.configuration[uid].contactcomponent_obj.configuration[uid].contactid != 0 && self.configuration[uid].contactcomponent_obj.configuration[uid].contactid != 'undefined'){
			self.configuration[uid].contactid =self.configuration[uid].contactcomponent_obj.configuration[uid].contactid;
		}
		}
        self.form[uid].setItemValue("contact_ID_email", self.configuration[uid].contactid);
        if (task == 'Edit') {
            if (self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 1).getValue() == 'Yes')
                primary_email = 1;
            else
                primary_email = 0;
            self.form[uid].setItemValue("email_ID", self.grid[uid].getSelectedRowId());
            self.form[uid].setItemValue("email", self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 0).getValue());
			self.form[uid].setItemValue("primaryEmail", primary_email);
            self.form[uid].getCombo("emailType1").loadXML(self.configuration[uid].application_path + "processors/emailtypelist.php?agencyid=" + self.configuration[uid].agencyid+"&id="+self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 2).getValue(), self.progressOff(uid));
            
        }else{
		        self.form[uid].getCombo("emailType1").loadXML(self.configuration[uid].application_path + "processors/emailtypelist.php?agencyid=" + self.configuration[uid].agencyid+"&id=0", self.progressOff(uid));
		}
		self.form[uid].getCombo("primaryEmail").enableOptionAutoHeight(1);
    },
    _grid: function (uid) {
        var self = this;
        self.grid[uid] = self.layout[uid].cells("a").attachGrid(self.model.conf_grid);
        self.grid[uid].setHeader(self.model.conf_grid.headers);
        if (self.configuration[uid].useWindow === true) {
            self.grid[uid].setInitWidths(self.model.conf_grid.widths);
        } else {
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
        self.grid[uid].parse(self.data_store[uid].email, "json");
        self.toolbar[uid].disableItem("delete_email");
		self.toolbar[uid].disableItem("edit_email")
        self.grid[uid].attachEvent("onRowDblClicked", function (rowId, cellInd) {
//            if (self.window_manager === null)
//                self._window_manager();
            self._editwindow(uid, 'Edit');
            self._editlayout(uid);
            self._edittoolbar(uid, 'Edit');
            self._form(uid, 'Edit');
        });
        self.grid[uid].attachEvent("onEnter", function (rowId, cellInd) {
//            if (self.window_manager === null)
//                self._window_manager();
            self._editwindow(uid, 'Edit');
            self._editlayout(uid);
            self._edittoolbar(uid, 'Edit');
            self._form(uid, 'Edit');
        });
        self.grid[uid].attachEvent("onRowSelect", function (rowId, cellInd) {
            self.toolbar[uid].enableItem("delete_email");
			self.toolbar[uid].enableItem("edit_email")
        });
    },
    // Show Help Window
    _showHelp: function (uid) {

        var self = this;
        if (self.window_manager.isWindow("help_email_window_" + uid)) {

            self.window_help[uid].show();
            self.window_help[uid].bringToTop();
            return;

        }

        self.window_help[uid] = self.window_manager.createWindow("help_email_window_" + uid, self.model.conf_window.left + 10, self.model.conf_window.top + 10, 700, 400);
        self.window_help[uid].setText("End user manual");
        self.window_help[uid].setIcon("help.png", "help.png");
        self.window_help[uid].attachURL(self.configuration[uid].application_path + "docs/end_user_manual");

    },

    //Progress On
    progressOn: function (uid) {

        var self = this;
        self.layout[uid].progressOn();
        if (self.configuration[uid].useWindow === true) {
            self.window[uid].progressOn();
        }
    },

    // Progress Off
    progressOff: function (uid) {

        var self = this;
        self.layout[uid].progressOff();
        if (self.configuration[uid].useWindow === true) {
            self.window[uid].progressOff();
        }
    },

    // Data Store
    _datastor: function (uid) {

        var self = this;
        self.progressOn(uid);
        var postStr = "contactID=" + self.configuration[uid].contactid + "&agencyid=" + self.configuration[uid].agencyid;
        dhtmlxAjax.post(self.configuration[uid].application_path + "processors/get_data.php", postStr, function (loader) {
            try {
                var json = JSON.parse(loader.xmlDoc.responseText);

                if (json.status == "success") {
                    self.data_store[uid] = json;

                   /* dhtmlx.message({
                        text: "Data store 100% loaded"
                    });*/
                    self._grid(uid);
                    self.progressOff(uid);
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
    
    dhtmlxWidowCustomPostion : function (widowObj,yPosition) {
        
        var position,splitPosition,xPosition;
        
        widowObj.center();
        position            =   widowObj.getPosition();
        splitPosition       =   String(position).split(",");
        xPosition           =   splitPosition[0];
        
        if(xPosition < 0)
            xPosition=50;
        widowObj.setPosition(xPosition,yPosition);
        window.scrollTo(xPosition,0);
    },

    // Initiating the Model
    init: function (model) {

        var self = this;
        self.model = model;

    },

    // Starting the Component
    start: function (configuration) {
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
        if ((typeof configuration.agencyid === 'undefined') || (configuration.agencyid.length === 0)) {
            dhtmlx.message({
                type: "error",
                text: "Agency Id is missing"
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
        self._datastor(self.uid);



    }
};
emailcomponent.init(emailcomponent_Model);