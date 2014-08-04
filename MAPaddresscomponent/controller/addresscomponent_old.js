var addresscomponent = {
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
    importaddress: [],
    has_couple: null,
    primaryaddress: null,
    combo_value: [],

    // Window Manager
    _window_manager: function () {

        var self = this;
        self.window_manager = new dhtmlXWindows();
        self.window_manager.setImagePath(self.model.conf_window.image_path);

    },

    // Window
    _window: function (uid) {
        var self = this;
        if (self.configuration[uid].window_managerObj === null) {
            if (self.window_manager === null)
                self._window_manager();
        } else {
            self.window_manager = self.configuration[uid].window_managerObj;
        //            alert(self.window_manager);
        }

        if (self.window_manager.isWindow("Address_" + uid)) {
            //console.log(self.window_manager)
            self.window[uid].show();
            self.window[uid].bringToTop();
            self.window[uid].center();
            return;
        }
        self.window[uid] = self.window_manager.createWindow("Address_" + uid, self.model.conf_window.left + 10, self.model.conf_window.top + 10, self.model.conf_window.width, self.model.conf_window.height);
        self.dhtmlxWidowCustomPostion(self.window[uid], self.model.conf_window.top);
        self.window[uid].setText(self.model.text_labels.main_window_title);
        self.window[uid].setIcon(self.model.conf_window.icon, self.model.conf_window.icon_dis);
        self.window[uid].center();
        self.window[uid].denyPark();

        self.window[uid].attachEvent("onClose", function (win) {


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
        self.layout[uid].progressOn();
    },
    importaddress: function (uid) {
        var self = this;
        //alert(self.configuration[uid].contactcomponent_obj.configuration[uid].p1contactid);
        var contact_import = self.configuration[uid].contactcomponent_obj.configuration[uid].p1contactid;
        if (contact_import != '0') {
            MAPaddres_parms = "isimport=import" + "&contact_import=" + contact_import + "&agencyid=" + self.configuration[uid].agencyid +
            '&contactid=' + self.configuration[uid].contactcomponent_obj.configuration[uid].contactid;
            dhtmlxAjax.post(self.configuration[uid].application_path + "processors/savetoairs.php", MAPaddres_parms, function (loader) {
                json = JSON.parse(loader.xmlDoc.responseText);
                if (json.status == 'has_couple') {

                    self.has_couple = "coupleuser";
                } else if (json.status == 'no_couple')
                    self.has_couple = "singleuser";

                setTimeout(function () {
                    self._edittoolbar(uid, 'New');
                    self.editlayout[uid].progressOff();
                    self.show = 1;
                }, 2000);

            });

        }

    },
    openaddresswindow: function (uid) {
        var self = this;
        self._editwindow(uid, 'New');
        self._editlayout(uid);
        self.importaddress(uid);
        self._form(uid, 'New');


    },
    //toolbar
    _toolbar: function (uid) {
        var self = this;
        var selectedRowsId;
        self.toolbar[uid] = self.layout[uid].cells("a").attachToolbar(self.model.conf_toolbar);
        self.toolbar[uid].setSkin(self.model.globalSkin);
        if (self.configuration[uid].useWindow !== true) {
            self.toolbar[uid].removeItem("help_address");
            self.toolbar[uid].removeItem("close_address");
        }


        self.toolbar[uid].attachEvent("onClick", function (id) {
            if (MAPPermissions.checkAccessPermission(id) != 1) {
                if (id == "add_address") {

                    if (self.configuration[uid].window_managerObj !== null) {
                        if (self.configuration[uid].contactcomponent_obj.configuration[uid].contactid == 0) {
                            if (self.configuration[uid].contactcomponent_obj.validation(uid) === true) {

                                self.configuration[uid].contactcomponent_obj.savecontact(uid, 'temp', function () {
                                    self.openaddresswindow(self.uid);
                                });
                            //removed and added  in function openaddresswindow		

                            }
                        } else {

                            self._editwindow(uid, 'New');
                            self._editlayout(uid);
                            setTimeout(function () {
                                self.importaddress(uid);
                            //self._edittoolbar(uid, 'New');
                            }, 2000);
                            self._form(uid, 'New');
                        }
                    } else {
                        self._editwindow(uid, 'New');
                        self._editlayout(uid);
                        setTimeout(function () {
                            //self._edittoolbar(uid, 'New');
                            self.importaddress(uid);
                            self._form(uid, 'New');
                        }, 4000);
                    }
                }
                if (id == "delete_address") {
                    selectedRowsId = self.grid[uid].getSelectedRowId();
                    if (selectedRowsId !== null) {
                        self.deleteRow(uid, selectedRowsId);
                    }
                }
                if (id == "help_address") {
                    self._showHelp(uid);
                }
                if (id == "edit_address") {
                    self._editwindow(uid, 'Edit');
                    self._editlayout(uid);
                    //self._edittoolbar(uid, 'Edit');
                    self.importaddress(uid);
                    self._form(uid, 'Edit');
                }
                if (id == "close_address") {
                    self.window[uid].close();
                }
            }
        });
    },
    _editwindow: function (uid, task) {
        var self = this;
        if (self.configuration[uid].window_managerObj === null) {
            if (self.window_manager === null)
                self._window_manager();
        } else {
            self.window_manager = self.configuration[uid].window_managerObj;
        //            alert(self.window_manager);
        }
        self.editwindows[uid] = self.window_manager.createWindow('window_address_edit_' + uid, self.model.conf_window.left + 10, self.model.conf_window.left + 10, self.model.conf_window.model_edit_winHeight, self.model.conf_window.model_edit_winWidth);
        self.dhtmlxWidowCustomPostion(self.editwindows[uid], self.model.conf_window.top);
        if (task == 'New')
            self.editwindows[uid].setText('Add Address');
        else
            self.editwindows[uid].setText('Edit Address');
        self.configuration[uid].contactcomponent_obj.window[self.configuration[uid].contactcomponent_obj.uid].setModal(false);
        self.editwindows[uid].setModal(true);
        self.editwindows[uid].button('park').hide();
        self.editwindows[uid].button('minmax1').hide();
        self.editwindows[uid].setIcon(self.model.conf_window.icon, self.model.conf_window.icon);
        self.editstatus_bar[uid] = self.editwindows[uid].attachStatusBar();
        self.editstatus_bar[uid].setText("");
        self.configuration[uid].closewindow = self.editwindows[uid].attachEvent("onClose", function (win) {
            self.confirmCloseWindow(uid);

        //return true;

        });
    },
    confirmCloseWindow: function (uid) {
        var self = this;

        if (self.configuration[uid].edited == 1) {
            dhtmlx.confirm({
                type: "confirm",
                text: "Are you sure you want to close this window without saving the changes ?",
                callback: function (OK) {
                    //alert(OK);
                    if (OK) {
                        self.editwindows[uid].detachEvent(self.configuration[uid].closewindow);
                        self.editwindows[uid].close();
                        self.configuration[uid].contactcomponent_obj.window[self.configuration[uid].contactcomponent_obj.uid].setModal(true);
                    } else {
                        return false;
                    }
                }
            });
        } else {
            self.editwindows[uid].detachEvent(self.configuration[uid].closewindow);
            self.editwindows[uid].close();
            self.configuration[uid].contactcomponent_obj.window[self.configuration[uid].contactcomponent_obj.uid].setModal(true);
        }
        return i;

    },
    _editlayout: function (uid) {
        var self = this;
        self.editlayout[uid] = self.editwindows[uid].attachLayout(self.model.conf_layout.pattern);
        self.editlayout[uid].progressOn();
        self.editlayout[uid].cells("a").hideHeader();
    },
    _edittoolbar: function (uid, task) {
        var self = this;
        self.edittoolbar[uid] = self.editlayout[uid].cells("a").attachToolbar(self.model.edit_toolbar);


        if (self.has_couple == 'coupleuser') {
            self.edittoolbar[uid].enableItem("import_address");
        } else if (self.has_couple == 'singleuser')
            self.edittoolbar[uid].disableItem("import_address");

        self.edittoolbar[uid].setSkin(self.model.globalSkin);
        self.edittoolbar[uid].attachEvent("onClick", function (id) {
            if (id == "save_address") {
                if (self.configuration[uid].edited == 0) {
                    dhtmlx.alert({
                        type: alert,
                        text: "No updates found!",
                        callback: function (result) {}
                    });
                } else {
                    self.addRow(uid, task);
                }
            //self.addRow(uid, task);
            }
            if (id == "help_address") {
                self._showHelp(uid);
            }
            if (id == "close_editaddress") {
                //self.editwindows[uid].close();
                self.confirmCloseWindow(uid);
            }
            if (id == "import_address") {

                self._form(uid, 'import_address');
            }
        });
    //  self.editlayout[uid].progressOff();
    },
    addRow: function (uid, task) {
        var self = this;
        var add_primarytext, MAPaddres_parms, address_start1, address_leave1, json, address_County, address_country, address_province;
        if (self.hasprimaryaddress == 1 && (self.form[uid].getItemValue("MailingAddress") == 0)) {
            self.form[uid].setItemValue("MailingAddress", 1);
        }

        if (self.validate(uid, task) === true) {
            self.editlayout[uid].progressOn();
            if (self.configuration[uid].window_managerObj !== null) {
                if (self.form[uid].getItemValue("contact_ID") == 0) {
                    self.form[uid].setItemValue("contact_ID", self.configuration[uid].contactcomponent_obj.configuration[uid].contactid);
                }
            }

            address_start1 = self.form[uid].getItemValue("address_start");
            if (address_start1 !== "") {
                address_start1 = self.dateFormat(uid, address_start1, '');
            }
            address_leave1 = self.form[uid].getItemValue("address_leave");
            if (address_leave1 !== "") {
                address_leave1 = self.dateFormat(uid, address_leave1, '');
            }
            MAPaddres_parms = "address_ID=" + self.form[uid].getItemValue("address_ID") + "&contact_ID=" + self.form[uid].getItemValue("contact_ID") + "&address_type=" + self.form[uid].getItemValue("address_type") + "&address_address1=" + self.form[uid].getItemValue("address_address1") + "&address_address2=" + self.form[uid].getItemValue("address_address2") + "&address_city=" + self.form[uid].getItemValue("address_city") + "&address_state=" + self.form[uid].getItemValue("address_state") + "&address_zip=" + self.form[uid].getItemValue("address_zip") + "&address_country=" + self.form[uid].getItemValue("address_country") + "&address_County=" + self.form[uid].getItemValue("address_County") + "&address_province=" + self.form[uid].getItemValue("address_province") + "&mailing=" + self.form[uid].getItemValue("MailingAddress") + "&address_leave=" + address_leave1 + "&address_start=" + address_start1 + "&agencyid=" + self.configuration[uid].agencyid;

            dhtmlxAjax.post(self.configuration[uid].application_path + "processors/savetoairs.php", MAPaddres_parms, function (loader) {
                json = JSON.parse(loader.xmlDoc.responseText);
                if (json.status == "success") {
                    dhtmlx.message({
                        text: "Record saved"
                    });
                    self.editlayout[uid].progressOff();
                    if (self.form[uid].getItemValue("MailingAddress") == 0)
                        add_primarytext = 'No';
                    else
                        add_primarytext = 'Yes';
                    if (self.form[uid].getCombo("address_County").getComboText() == '-- Select County --')
                        address_County = '';
                    else
                        address_County = self.form[uid].getCombo("address_County").getSelectedText();

                    if (self.form[uid].getCombo("address_country").getSelectedText() == 'Pick a Country')
                        address_country = '';
                    else
                        address_country = self.form[uid].getCombo("address_country").getSelectedText();
                    if (self.form[uid].getCombo("address_province").getComboText() === '-- Select Province --')
                        address_province = '';
                    else
                        address_province = self.form[uid].getCombo("address_province").getSelectedText();
                    if (self.form[uid].getItemValue("MailingAddress") == 0)
                        add_primarytext = 'No';
                    else
                        add_primarytext = 'Yes';

                    if (self.grid[uid].getRowsNum() > 0 && self.form[uid].getItemValue("MailingAddress") == 1) {
                        self.grid[uid].forEachRow(function (id) {
                            self.grid[uid].cells(id, 9).setValue('No');
                        });
                    }

                    if (self.form[uid].getItemValue("address_ID") === 0 || self.form[uid].getItemValue("address_ID") === '' || self.form[uid].getItemValue("address_ID") === null) {

                        self.grid[uid].addRow(json.addid, [self.form[uid].getCombo("address_type").getSelectedText(), self.form[uid].getItemValue("address_address1"), self.form[uid].getItemValue("address_address2"), self.form[uid].getItemValue("address_city"), self.form[uid].getCombo("address_state").getSelectedText(), self.form[uid].getItemValue("address_zip"), address_County, address_country, address_province, add_primarytext, address_start1, address_leave1], '');

                        self.editwindows[uid].detachEvent(self.configuration[uid].closewindow);
                        self.editwindows[uid].close();
                        self.configuration[uid].contactcomponent_obj.window[self.configuration[uid].contactcomponent_obj.uid].setModal(true);
                    } else {
                        self.grid[uid].cells(json.addid, 0).setValue(self.form[uid].getCombo("address_type").getSelectedText());
                        self.grid[uid].cells(json.addid, 1).setValue(self.form[uid].getItemValue("address_address1"));
                        self.grid[uid].cells(json.addid, 2).setValue(self.form[uid].getItemValue("address_address1"));
                        self.grid[uid].cells(json.addid, 3).setValue(self.form[uid].getItemValue("address_city"));
                        self.grid[uid].cells(json.addid, 4).setValue(self.form[uid].getCombo("address_state").getSelectedText());
                        self.grid[uid].cells(json.addid, 5).setValue(self.form[uid].getItemValue("address_zip"));
                        self.grid[uid].cells(json.addid, 6).setValue(address_County);
                        self.grid[uid].cells(json.addid, 7).setValue(address_country);
                        self.grid[uid].cells(json.addid, 8).setValue(address_province);
                        self.grid[uid].cells(json.addid, 9).setValue(add_primarytext);
                        self.grid[uid].cells(json.addid, 10).setValue(address_start1);
                        self.grid[uid].cells(json.addid, 11).setValue(address_leave1);
                        self.editwindows[uid].detachEvent(self.configuration[uid].closewindow);
                        self.editwindows[uid].close();
                        self.configuration[uid].contactcomponent_obj.window[self.configuration[uid].contactcomponent_obj.uid].setModal(true);

                    }

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
    dateFormat: function (uid, dateFromGrid, task) {
        var self = this;
        var browserType, mySplitResult, month, monthFormat, dateinTwo;
        if (dateFromGrid !== null) {
            if (task == 'import') {

                mySplitResult = dateFromGrid.split(" ");
                dateinTwo = mySplitResult[1];
                if (!dateinTwo) {
                    dateinTwo = mySplitResult[2];
                    yearinformat = mySplitResult[3];
                } else {
                    dateinTwo = mySplitResult[1];
                    yearinformat = mySplitResult[2];
                }
                month = mySplitResult[0];

                switch (dateinTwo) {
                    case "1":
                        dateinTwo = "01";
                        break;
                    case "2":
                        dateinTwo = "02";
                        break;
                    case "3":
                        dateinTwo = "03";
                        break;
                    case "4":
                        dateinTwo = "04";
                        break;
                    case "5":
                        dateinTwo = "05";
                        break;
                    case "6":
                        dateinTwo = "06";
                        break;
                    case "7":
                        dateinTwo = "07";
                        break;
                    case "8":
                        dateinTwo = "08";
                        break
                    case "9":
                        dateinTwo = "09";
                        break
                    default:
                        dateinTwo = dateinTwo;
                        break;

                }
            } else {
                dateFromGrid = dateFromGrid.toString();
                mySplitResult = dateFromGrid.split(" ");
                dateinTwo = mySplitResult[2];
                month = mySplitResult[1];
                browserType = navigator.appName;
                if (browserType == "Microsoft Internet Explorer") {
                    yearinformat = mySplitResult[5];
                } else {
                    yearinformat = mySplitResult[3];
                }
            }



            switch (month) {
                case "Jan":
                    monthFormat = "01";
                    break;

                case "Feb":
                    monthFormat = "02";
                    break;
                case "Mar":
                    monthFormat = "03";
                    break;

                case "Apr":
                    monthFormat = "04";
                    break;

                case "May":
                    monthFormat = "05";
                    break;

                case "Jun":
                    monthFormat = "06";
                    break;

                case "Jul":
                    monthFormat = "07";
                    break;

                case "Aug":
                    monthFormat = "08";
                    break;

                case "Sep":
                    monthFormat = "09";
                    break;

                case "Oct":
                    monthFormat = "10";
                    break;

                case "Nov":
                    monthFormat = "11";
                    break;

                case "Dec":
                    monthFormat = "12";
                    break;
            }


            dateinFormat = monthFormat + '-' + dateinTwo + '-' + yearinformat;

            return dateinFormat;
        }

    },
    validate: function (uid, task) {
        var self = this;
        var contactid = self.form[uid].getItemValue("contact_ID");
        contactid1 = self.form[uid].getItemValue("contact_ID");
        var state = self.form[uid].getItemValue("address_state");
        var address_type = self.form[uid].getItemValue("address_type");
        var zipcode = self.form[uid].getItemValue("address_zip");
        var enddateValidation = String(self.form[uid].getItemValue("address_leave"));
        var stateName = self.form[uid].getCombo("address_state").getSelectedText();
        var countyName = self.form[uid].getCombo("address_County").getSelectedText();
        var filter = /^\d{5}(?:-\d{4})?$/;
        var zipcodeVal = filter.test(zipcode);
        if (contactid === '' || contactid === null) {
            dhtmlx.alert({
                title: "Alert",
                type: "alert-error",
                text: "ContactId Is Missing"
            });
            return false;
        }
        if (address_type === '' || address_type === null || address_type === '0') {
            dhtmlx.alert({
                title: "Alert",
                type: "alert-error",
                text: "Address type is mandatory",
                callback: function () {
                    self.form[uid].setItemFocus('address_type');
                }
            });
            self.editstatus_bar[uid].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
            return false;
        } else if (state === '' || state === null || state === '0') {
            dhtmlx.alert({
                title: "Alert",
                type: "alert-error",
                text: "State is mandatory",
                callback: function () {
                    self.form[uid].setItemFocus('address_state');
                }
            });
            self.editstatus_bar[uid].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
            return false;
        } else if (enddateValidation.trim() != 'null' && self.form[uid].getItemValue("address_leave") < self.form[uid].getItemValue("address_start")) {


            dhtmlx.alert({
                title: "Alert",
                type: "alert-error",
                text: ' End date should be greater or equal to Start date',
                callback: function () {
                    self.form[uid].setItemValue('address_leave', '');
                    self.form[uid].setItemFocus('address_leave');
                }
            });
            self.editstatus_bar[uid].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
            return false;


        } else if (zipcode !== '' && zipcode !== null) {
            if (zipcodeVal !== true) {
                dhtmlx.alert({
                    title: "Alert",
                    type: "alert-error",
                    text: "Please enter a valid zipcode",
                    callback: function () {
                        self.form[uid].setItemValue('address_zip', '');
                        self.form[uid].setItemFocus('address_zip');
                    }
                });
                self.editstatus_bar[uid].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
                return false;
            }else {
                if(self.combo_value['state']){
                    if(stateName !== self.combo_value['state']){
                        dhtmlx.alert({
                            title: "Alert",
                            type: "alert-error",
                            text: "Zip does not belong to "+stateName,
                            callback: function () {
                                //self.form[uid].setItemValue('address_zip', '');
                                self.form[uid].setItemFocus('address_zip');
                            }
                        });
                        self.editstatus_bar[uid].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
                        return false;
                    }
                }
                if(self.combo_value['county']){
                    if(countyName !== self.combo_value['county']){
                        dhtmlx.alert({
                            title: "Alert",
                            type: "alert-error",
                            text: "Zip does not belong to "+countyName,
                            callback: function () {
                                //self.form[uid].setItemValue('address_zip', '');
                                self.form[uid].setItemFocus('address_zip');
                            }
                        });
                        self.editstatus_bar[uid].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
                        return false;
                    }
                    return true;
                }
                else {
                    return true;
                }
            }
            
        }
        else {
            return true;
        }

    },
    deleteRow: function (uid, selectedRowsId) {
        var self = this;
        var MAPaddress_delet_params, json;
        self.progressOn(uid);
        if (self.grid[uid].cells(selectedRowsId, 9).getValue('add_primarytext') == 'Yes') {
            self.progressOff(uid);
            dhtmlx.message({
                type: "error",
                text: "Primary address cannot be deleted..."
            });
            return true;
        }
        dhtmlx.confirm({
            title: "Delete Address",
            type: "confirm-warning",
            text: "Are you sure you want to delete this Address ?",
            callback: function (result) {
                if (result === true) {
                    MAPaddress_delet_params = "contactId=" + self.configuration[uid].contactid + "&contactaddressId=" + selectedRowsId + "&agencyid=" + self.configuration[uid].agencyid;
                    dhtmlxAjax.post(self.configuration[uid].application_path + "processors/deleteaddressInfo.php", MAPaddress_delet_params, function (loader) {
                        try {
                            json = JSON.parse(loader.xmlDoc.responseText);
                            if (json.status == "success") {
                                dhtmlx.message({
                                    text: "record was deleted"
                                });
                                self.grid[uid].deleteRow(self.grid[uid].getSelectedRowId());
                                self.toolbar[uid].disableItem("delete_address");
                                self.toolbar[uid].disableItem("edit_address");
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
        var self = this,
        primary_address,
        isCountryChange = false,
        isStateChange = false,
        eventNew,
        eventImport;

        self.configuration[uid].edited = 0;
        self.form[uid] = self.editlayout[uid].cells("a").attachForm(self.model.conf_form.template);

        if (self.configuration[uid].window_managerObj !== null) {
            if (self.configuration[uid].contactcomponent_obj.configuration[uid].contactid != 0 && self.configuration[uid].contactcomponent_obj.configuration[uid].contactid != 'undefined') {
                self.configuration[uid].contactid = self.configuration[uid].contactcomponent_obj.configuration[uid].contactid;
                self.importaddress(uid);
            }
        }

        self.form[uid].setItemValue("contact_ID", self.configuration[uid].contactid);
        self.form[uid].setItemValue("MailingAddress", 0);
        self.form[uid].getCombo("address_type").readonly(true);
        self.form[uid].getCombo("address_province").readonly(true);
        self.form[uid].getCombo("address_County").readonly(true);

        if (task == 'Edit') { //Edit task
            if (self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 9).getValue() == 'Yes')
                primary_address = 1;
            else
                primary_address = 0;
            self.form[uid].setItemValue("address_ID", self.grid[uid].getSelectedRowId());
            self.form[uid].setItemValue("MailingAddress", primary_address);
            self.hasprimaryaddress = primary_address;
            self.form[uid].setItemValue("address_address1", self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 1).getValue());
            self.form[uid].setItemValue("address_address2", self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 2).getValue());
            self.form[uid].setItemValue("address_city", self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 3).getValue());
            self.form[uid].setItemValue("address_zip", self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 5).getValue());
            self.form[uid].setItemValue("address_start", self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 10).getValue());
            self.form[uid].setItemValue("address_leave", self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 11).getValue());

            self.form[uid].getCombo("address_state").readonly(true);
            self.form[uid].getCombo("address_country").readonly(true);


            self.form[uid].getCombo("address_type").loadXML(self.configuration[uid].application_path + "processors/address_list.php?type=address_type&agencyid=" + self.configuration[uid].agencyid + "&address_type=" + self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 0).getValue());
            //self.form[uid].getCombo("address_state").loadXML(self.configuration[uid].application_path +"processors/address_list.php?type=address_state&agencyid=" + self.configuration[uid].agencyid+"&address_state="+self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 4).getValue());
            //self.form[uid].getCombo("address_County").loadXML(self.configuration[uid].application_path +"processors/address_list.php?type=address_County&agencyid=" + self.configuration[uid].agencyid+"&address_County="+self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 6).getValue());
            self.form[uid].getCombo("address_country").loadXML(self.configuration[uid].application_path + "processors/address_list.php?type=address_country&agencyid=" + self.configuration[uid].agencyid + "&address_country=" + self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 7).getValue());
            //self.form[uid].getCombo("address_province").loadXML(self.configuration[uid].application_path +"processors/address_list.php?type=address_province&agencyid=" + self.configuration[uid].agencyid+"&address_province="+self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 8).getValue());

            //When country is changed state & province needs to be changed. County set to 'Select County'.Edited = 1
            self.form[uid].getCombo("address_country").attachEvent("onChange", function () {
                var selectedCountry = self.form[uid].getCombo("address_country").getActualValue();
                self.form[uid].getCombo("address_state").loadXML(self.configuration[uid].application_path + "processors/address_list.php?type=address_state&agencyid=" + self.configuration[uid].agencyid + "&address_state=" + self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 4).getValue() + "&country_id=" + selectedCountry + "&isCountryChange=" + isCountryChange);
                if (isCountryChange === true) {
                    self.configuration[uid].edited = 1;
                    self.form[uid].setItemValue('address_zip', '');
                }

                self.form[uid].getCombo("address_province").loadXML(self.configuration[uid].application_path + "processors/address_list.php?type=address_province&agencyid=" + self.configuration[uid].agencyid + "&address_province=" + self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 8).getValue() + "&country_id=" + selectedCountry + "&isCountryChange=" + isCountryChange);
                isCountryChange = true;
                self.form[uid].getCombo("address_County").setComboText('-- Select County --');
            });

            //When State is changed county needs to be changed.Edited = 1
            self.form[uid].getCombo("address_state").attachEvent("onChange", function () {

                var selectedState = self.form[uid].getCombo("address_state").getSelectedValue();
                if (isStateChange === true) {
                    self.configuration[uid].edited = 1;
                }
                self.form[uid].getCombo("address_County").loadXML(self.configuration[uid].application_path + "processors/address_list.php?type=address_County&agencyid=" + self.configuration[uid].agencyid + "&address_County=" + self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 6).getValue() + "&state_id=" + selectedState + "&isStateChange=" + isStateChange);
                isStateChange = true;
            });
            //Edited = 1
            self.form[uid].getCombo("address_type").attachEvent("onXLE", function () {
                self.form[uid].getCombo("address_type").attachEvent("onChange", function () {
                    self.configuration[uid].edited = 1;
                });
            });
            //Edited = 1
            self.form[uid].getCombo("address_province").attachEvent("onXLE", function () {
                self.form[uid].getCombo("address_province").attachEvent("onChange", function () {
                    self.configuration[uid].edited = 1;
                });
            });
            //Edited = 1
            self.form[uid].getCombo("address_County").attachEvent("onXLE", function () {
                if(json.countyId){
                    self.form[uid].getCombo("address_County").setComboValue(json.countyId);
                    //self.form[uid].getCombo("address_County").setComboText(json.countyName);
                    json.countyId = '';
                    json.countyName = '';
                }
                self.form[uid].getCombo("address_County").attachEvent("onChange", function () {
                    self.configuration[uid].edited = 1;
                });
            });


        //  alert(self.form[uid].getItemValue("address_country"));

        /*            self.form[uid].setItemValue("address_type", );			
                self.form[uid].setItemValue("address_state", self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 4).getValue());			
                self.form[uid].setItemValue("address_County", self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 6).getValue());
                self.form[uid].setItemValue("address_country", self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 7).getValue());
                self.form[uid].setItemValue("address_province", self.grid[uid].cells(self.grid[uid].getSelectedRowId(), 8).getValue());*/

        } else
        if (task == 'New') {

            self.form[uid].getCombo("address_state").readonly(true);
            self.form[uid].getCombo("address_country").readonly(true);
            self.form[uid].getCombo("address_type").loadXML(self.configuration[uid].application_path + "processors/address_list.php?type=address_type&agencyid=" + self.configuration[uid].agencyid);
            self.form[uid].getCombo("address_state").loadXML(self.configuration[uid].application_path + "processors/address_list.php?type=address_state&agencyid=" + self.configuration[uid].agencyid + "&country_id=USA");
            //self.form[uid].getCombo("address_County").loadXML(self.configuration[uid].application_path +"processors/address_list.php?type=address_County&agencyid=" + self.configuration[uid].agencyid);
            self.form[uid].getCombo("address_country").loadXML(self.configuration[uid].application_path + "processors/address_list.php?type=address_country&agencyid=" + self.configuration[uid].agencyid);
            //self.form[uid].getCombo("address_province").loadXML(self.configuration[uid].application_path +"processors/address_list.php?type=address_province&agencyid=" + self.configuration[uid].agencyid);
            self.form[uid].getCombo("address_County").setComboText('-- Select County --');
            self.form[uid].getCombo("address_province").setComboText('-- Select Province --');
            //Edited = 1
            self.form[uid].getCombo("address_type").attachEvent("onXLE", function () {
                self.form[uid].getCombo("address_type").attachEvent("onChange", function () {
                    self.configuration[uid].edited = 1;
                });
            });
            //When country changed state & province changes.County set to 'select County'.Edited = 1
            self.form[uid].getCombo("address_country").attachEvent("onXLE", function () {
                self.form[uid].getCombo("address_country").attachEvent("onChange", function () {
                    var selectedCountry = self.form[uid].getCombo("address_country").getActualValue();
                    //self.form[uid].getCombo("address_province").setComboText('-- Select Province --');
                    self.form[uid].getCombo("address_state").loadXML(self.configuration[uid].application_path + "processors/address_list.php?type=address_state&agencyid=" + self.configuration[uid].agencyid + "&country_id=" + selectedCountry);

                    self.form[uid].getCombo("address_province").loadXML(self.configuration[uid].application_path + "processors/address_list.php?type=address_province&agencyid=" + self.configuration[uid].agencyid + "&country_id=" + selectedCountry);
                    self.form[uid].getCombo("address_County").setComboText('-- Select County --');
                    self.form[uid].setItemValue('address_zip', '');
                    self.configuration[uid].edited = 1;
                    isCountryChange = true;
                });
            });
            //When State is changed county needs to be changed.Edited = 1
            self.form[uid].getCombo("address_state").attachEvent("onXLE", function () {
                
                eventNew =    self.form[uid].getCombo("address_state").attachEvent("onChange", function () {

                    var selectedState = self.form[uid].getCombo("address_state").getSelectedValue();
                    self.form[uid].getCombo("address_County").loadXML(self.configuration[uid].application_path + "processors/address_list.php?type=address_County&agencyid=" + self.configuration[uid].agencyid + "&state_id=" + selectedState);
                    self.configuration[uid].edited = 1;
                
                });
                if(isCountryChange)
                    self.form[uid].getCombo("address_state").detachEvent(eventNew);
            });
            
            //Edited = 1
            self.form[uid].getCombo("address_province").attachEvent("onXLE", function () {
                self.form[uid].getCombo("address_province").attachEvent("onChange", function () {
                    self.configuration[uid].edited = 1;
                });
            });
            //Edited = 1
            self.form[uid].getCombo("address_County").attachEvent("onXLE", function () {
                if(json.countyId){
                    self.form[uid].getCombo("address_County").setComboValue(json.countyId);
                    //self.form[uid].getCombo("address_County").setComboText(json.countyName);
                    json.countyId = '';
                    json.countyName = '';
                }
                self.form[uid].getCombo("address_County").attachEvent("onChange", function () {
                    self.configuration[uid].edited = 1; 
                });
            });
            

        }

        if (task == 'import_address') {
            self.editlayout[uid].progressOn();
            MAPaddres_parms = "contact_ID=" + self.form[uid].getItemValue("contact_ID") + "&import=import_address" + "&contactIdPerson1=" + self.configuration[uid].contactcomponent_obj.configuration[uid].p1contactid;

            dhtmlxAjax.post(self.configuration[uid].application_path + "processors/savetoairs.php", MAPaddres_parms, function (loader) {
                json = JSON.parse(loader.xmlDoc.responseText);
                if (json.status == "imported" && json.AddressType != null) {
                    dhtmlx.message({
                        text: "Importing address details"
                    });
                    var address_start2 = self.dateFormat(uid, json.addstartdate, 'import');
                    var addleavedate2 = self.dateFormat(uid, json.addleavedate, 'import');
                    if (json.primary_address)
                        self.form[uid].setItemValue("MailingAddress", json.primary_address);
                    if (json.Address1)
                        self.form[uid].setItemValue("address_address1", json.Address1);
                    if (json.Address2)
                        self.form[uid].setItemValue("address_address2", json.Address2);
                    if (json.city)
                        self.form[uid].setItemValue("address_city", json.city);
                    //self.form[uid].setItemValue("address_zip", json.primary_address);
                    if (json.addstartdate)
                        self.form[uid].setItemValue("address_start", address_start2);
                    if (json.addleavedate)
                        self.form[uid].setItemValue("address_leave", addleavedate2);
                    if (json.address_zip != ' ')
                        self.form[uid].setItemValue("address_zip", json.address_zip);
                    self.configuration[uid].edited = 1; //edited = 1 when imported
                    setTimeout(function () {
                        self.setaddrcombovalues(uid);
                        

                    }, 2000);
                    setTimeout(function () {
                        self.editlayout[uid].progressOff();
                    }, 3500);
                } else {
                    dhtmlx.message({
                        text: "Address details not available."
                    });

                }
            });
            
            //When country changed state & province changes.County set to 'select County'
            self.form[uid].getCombo("address_country").attachEvent("onXLE", function () {
                self.form[uid].getCombo("address_country").attachEvent("onChange", function () {
                    var selectedCountry = self.form[uid].getCombo("address_country").getActualValue();
                    self.form[uid].getCombo("address_state").loadXML(self.configuration[uid].application_path + "processors/address_list.php?type=address_state&agencyid=" + self.configuration[uid].agencyid + "&country_id=" + selectedCountry);
                    self.form[uid].getCombo("address_province").loadXML(self.configuration[uid].application_path + "processors/address_list.php?type=address_province&agencyid=" + self.configuration[uid].agencyid + "&country_id=" + selectedCountry);
                    self.form[uid].setItemValue('address_zip', '');
                    isCountryChange = true;
                });
            });
            //When State is changed county needs to be changed
             self.form[uid].getCombo("address_state").attachEvent("onXLE", function () {
                 
                eventImport = self.form[uid].getCombo("address_state").attachEvent("onChange", function () {
                    var selectedState = self.form[uid].getCombo("address_state").getSelectedValue();
                    self.form[uid].getCombo("address_County").loadXML(self.configuration[uid].application_path + "processors/address_list.php?type=address_County&agencyid=" + self.configuration[uid].agencyid + "pp&state_id=" + selectedState);
                });
                if(isCountryChange)
                    self.form[uid].getCombo("address_state").detachEvent(eventImport);
            });
            
            self.form[uid].getCombo("address_County").attachEvent("onXLE", function () {
                if(json.countyId){
                    self.form[uid].getCombo("address_County").setComboValue(json.countyId);
                    //self.form[uid].getCombo("address_County").setComboText(json.countyName);
                    json.countyId = '';
                    json.countyName = '';
                }
            });
            
        }
        
        self.form[uid].getCombo("MailingAddress").enableOptionAutoHeight(1);
        //Edited = 1
        self.form[uid].attachEvent("onInputChange", function (name) {
            self.configuration[uid].edited = 1;
            var len = self.form[uid].getItemValue("address_zip").length;
            if (name === 'address_zip') {
                if(self.form[uid].getCombo("address_country").getSelectedText() === 'USA'){
                    if (len === 5){
                        var zipcode = self.form[uid].getItemValue("address_zip");
                        var filter = /^\d{5}(?:-\d{4})?$/;
                        var zipcodeVal = filter.test(zipcode);
                        if (zipcode !== '' && zipcode !== null) {
                            if (zipcodeVal !== true) {
                                dhtmlx.alert({
                                    title: "Alert",
                                    type: "alert-error",
                                    text: "Please enter a valid zipcode",
                                    callback: function () {
                                        self.form[uid].setItemValue('address_zip', '');
                                        self.form[uid].setItemFocus('address_zip');
                                    }
                                });
                            }
                            else{
                                self.combo_value['state'] = '';
                                self.combo_value['county'] = '';
                                dhtmlxAjax.post(self.configuration[uid].application_path + "processors/address_zip.php", "zip=" + zipcode, function (loader) {
                                    json = JSON.parse(loader.xmlDoc.responseText);
                                    if (json.status === 'success') {
                                
                                        self.form[uid].getCombo("address_state").setComboValue(json.stateId);
                                        self.combo_value['state'] = json.stateName;
                                        self.combo_value['county'] = json.countyName;
                                        json.stateId = '';
                                        json.stateName = '';
                                        
                                    }
                                });
                            }
                        }
                    
                    }
                    else if(len > 5){
                        dhtmlx.alert({
                                    title: "Alert",
                                    type: "alert-error",
                                    text: "Please enter a 5-digit zipcode",
                                    callback: function () {
                                        self.form[uid].setItemValue('address_zip', '');
                                        self.form[uid].setItemFocus('address_zip');
                                    }
                                });
                    }
                }
                
            }
        });
        
        self.form[uid].getCombo("MailingAddress").attachEvent("onSelectionChange", function () {
            self.configuration[uid].edited = 1;
        });
        self.form[uid].getInput("address_leave").style.backgroundImage = self.model.calendarImage.url;
        self.form[uid].getInput("address_leave").style.backgroundPosition = self.model.calendarImage.position;
        self.form[uid].getInput("address_leave").style.backgroundRepeat = self.model.calendarImage.repeat;
        self.form[uid].getInput("address_start").style.backgroundImage = self.model.calendarImage.url;
        self.form[uid].getInput("address_start").style.backgroundPosition = self.model.calendarImage.position;
        self.form[uid].getInput("address_start").style.backgroundRepeat = self.model.calendarImage.repeat;
    },

    setaddrcombovalues: function (uid) {
        var self = this;

        //if(json.CountryText)//alert(json.CountryType);
        //self.form[uid].setItemValue("address_country",json.CountryText);
        self.form[uid].getCombo("address_country").loadXML(self.configuration[uid].application_path + "processors/address_list.php?type=address_country&agencyid=" + self.configuration[uid].agencyid + "&address_country=" + json.CountryText);
        // if(json.StateName)
        //self.form[uid].setItemValue("address_state",json.StateName);
        self.form[uid].getCombo("address_state").loadXML(self.configuration[uid].application_path + "processors/address_list.php?type=address_state&agencyid=" + self.configuration[uid].agencyid + "&country_id=" + json.CountryText + "&state_id=" + json.StateName + "&address_state=true");
        // if(json.province)
        //self.form[uid].setItemValue("address_province",json.province);
        self.form[uid].getCombo("address_province").setComboText('-- Select Province --');
        self.form[uid].getCombo("address_province").loadXML(self.configuration[uid].application_path + "processors/address_list.php?type=address_province&agencyid=" + self.configuration[uid].agencyid + "&country_id=" + json.CountryText + "&address_province=" + json.province);
        //else if(json.province == '0')
        //self.form[uid].setItemValue("address_province",'-- Select Province --');
        //if(json.county)
        //self.form[uid].setItemValue("address_County",json.county);
        self.form[uid].getCombo("address_County").setComboText('-- Select County --');
        self.form[uid].getCombo("address_County").loadXML(self.configuration[uid].application_path + "processors/address_list.php?type=address_County&agencyid=" + self.configuration[uid].agencyid + "&state_id=" + json.StateName + "&address_County=" + json.county);
        // if(json.AddressType)//alert(json.AddressType);
        //self.form[uid].setItemValue("address_type",json.AddressType);
        self.form[uid].getCombo("address_type").loadXML(self.configuration[uid].application_path + "processors/address_list.php?type=address_type&agencyid=" + self.configuration[uid].agencyid + "&address_type=" + json.AddressType);

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
        self.grid[uid].setColumnsVisibility(self.model.conf_grid.visibility);
        self.grid[uid].init();
        self.grid[uid].parse(self.data_store[uid].address, "json");
        self.toolbar[uid].disableItem("delete_address");
        self.toolbar[uid].disableItem("edit_address");
        self.grid[uid].attachEvent("onRowDblClicked", function (rowId, cellInd) {
            self._editwindow(uid, 'Edit');
            self._editlayout(uid);
            //self._edittoolbar(uid, 'Edit');
            self._form(uid, 'Edit');
        });
        self.grid[uid].attachEvent("onEnter", function (rowId, cellInd) {
            self._editwindow(uid, 'Edit');
            self._editlayout(uid);
            // self._edittoolbar(uid, 'Edit');
            self._form(uid, 'Edit');
        });
        self.grid[uid].attachEvent("onRowSelect", function (rowId, cellInd) {
            self.toolbar[uid].enableItem("delete_address");
            self.toolbar[uid].enableItem("edit_address");
        });
    },
    // Show Help Window
    _showHelp: function (uid) {

        var self = this;
        if (self.window_manager.isWindow("help_address_window_" + uid)) {


            self.window_help[uid].show();
            self.window_help[uid].bringToTop();
            return;

        }

        self.window_help[uid] = self.window_manager.createWindow("help_address_window_" + uid, self.model.conf_window.left + 10, self.model.conf_window.top + 10, 700, 400);
        self.dhtmlxWidowCustomPostion(self.window_help[uid], self.model.conf_window.top);
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
        var postStr, json;
        self.progressOn(uid);
        postStr = "contactID=" + self.configuration[uid].contactid + "&agencyid=" + self.configuration[uid].agencyid;
        dhtmlxAjax.post(self.configuration[uid].application_path + "processors/get_data.php", postStr, function (loader) {
            try {
                json = JSON.parse(loader.xmlDoc.responseText);

                if (json.status == "success") {
                    self.data_store[uid] = json;

                    dhtmlx.message({
                        text: "Data store 100% loaded"
                    });

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
    dhtmlxWidowCustomPostion: function (widowObj, yPosition) {

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
addresscomponent.init(addresscomponent_Model);