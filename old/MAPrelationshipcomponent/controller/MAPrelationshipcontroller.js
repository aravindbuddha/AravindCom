var MAPRelationshipComponent = {
    /* properties */
    window_manager: null
            , windows: []
            , editwindows: []
            , status_bar: []
            , editstatus_bar: []
            , toolbar: []
            , edittoolbar: []
            , layout: []
            , editlayout: []
            , form: []
            , grid: []
            , id: null
            , configuration: []
            , window_help: []

            /* methods */
            , _window_manager: function()
    {
        var self = this;
        self.window_manager = new dhtmlXWindows();
        self.window_manager.setImagePath(self.model.model_globalImgPath);
    }
    , _window: function(uid) {

        var self = this;
    
            if (self.window_manager === null) {
                    self._window_manager();
            }
            self.windows[uid] = self.window_manager.createWindow('window_relationshipcomponent_' + uid, '0', '0', self.model.model_winHeight, self.model.model_winWidth);
            self.windows[uid].setText('Relationship');
            self.dhtmlxWidowCustomPostion(self.windows[uid],self.model.model_winTop);
            self.windows[uid].setModal(true);
            self.windows[uid].button('park').hide()
            self.windows[ uid ].setIcon(self.model.model_conf_window, self.model.model_conf_window);
            self.status_bar[ uid ] = self.windows[ uid ].attachStatusBar();
            self.status_bar[ uid ].setText("RelationShip List Loaded");
            if (uid == self.contactid) {
                self.windows[uid].attachEvent('onclose', function() {
                    self.toolbar = [];
                    self.layout = [];
                    self.grid = [];
                    return true;
                });
            }
    },
    dateFormat: function(uid, dateFromGrid) {
        var self = this;
        var browserType, mySplitResult, monthFormat, dateinTwo, yearinformat;
        if (dateFromGrid !== null) {
            dateFromGrid = dateFromGrid.toString();
            mySplitResult = dateFromGrid.split(" ");

            dateinTwo = mySplitResult[2];
            browserType = navigator.appName;
            if (browserType == "Microsoft Internet Explorer") {
                yearinformat = mySplitResult[5];
            } else {
                yearinformat = mySplitResult[3];
            }

            switch (mySplitResult[1]) {
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

    }
    //Edit Window
    , _editwindow: function(uid, task) {
        var self = this;
        self.editwindows[uid] = self.window_manager.createWindow('window_relationshipcomponent_edit_' + uid, '0', '0', self.model.model_edit_winHeight, self.model.model_edit_winWidth);
        if (task == 'New') {
            self.editwindows[uid].setText('Add Relation');
        } else {
            self.editwindows[uid].setText('Edit Relation');
        }
        self.dhtmlxWidowCustomPostion(self.editwindows[uid],self.model.model_edit_winTop);
        self.editwindows[uid].setModal(true);
        self.editwindows[uid].button('park').hide();
		self.editwindows[uid].button('minmax1').hide();
        self.editwindows[ uid ].setIcon(self.model.model_conf_window, self.model.model_conf_window);
        self.editstatus_bar[ uid ] = self.editwindows[ uid ].attachStatusBar();
        self.editstatus_bar[ uid ].setText("");
        self.editwindows[uid].attachEvent('onclose', function() {
            self.edittoolbar = [];
            self.editlayout = [];
            self.form = [];
            return true;
        });
    }
    // layout
    , _layout: function(uid) {
        var self = this;

        if (self.useWindow === true) {

            self.layout[uid] = self.windows[ uid ].attachLayout(self.model.model_Layout.skin);
        } else {

            self.layout[uid] = new dhtmlXLayoutObject(self.parentDIVId, self.model.model_Layout.skin);
        }

        self.layout[uid].cells("a").hideHeader();
        self.layout[uid].progressOn();
    }
    // layout
    , _editlayout: function(uid) {
        var self = this;
        self.editlayout[uid] = self.editwindows[ uid ].attachLayout(self.model.model_Layout.skin);
        self.editlayout[uid].cells("a").hideHeader();
        self.editlayout[uid].progressOn();
    }
    , loadValues: function(c) {
        var self = this;
        if (typeof c.contactid !== 'undefined') {
            self.contactid = c.contactid;
            self.connectionid = c.connectionid;
            self.groupid = c.groupid;
            self.useWindow = c.useWindow;
            self.parentDIVId = c.parentDIVId;
            self.application_path = c.application_path;
            self.dhtmlx_codebase_path = c.dhtmlx_codebase_path;
			self.contactcomponent_obj = c.contactcomponent_obj;
//            alert(c.window_managerObj);
            if(c.window_managerObj !== null)
                self.window_manager = c.window_managerObj;
//            alert(self.window_manager);
        }
        else
        {
            dhtmlx.alert({title: "Alert", type: "alert-error", text: "ContactId Is Missing"});
        }
    }
    , _edittoolbar: function(uid) {
        var self = this;
        self.edittoolbar[ uid ] = self.editwindows[uid].attachToolbar(  );
        self.edittoolbar[uid].setIconsPath(self.model.model_globalImgPath);

			 var addcontactToolbarXML = CAIRS.xml.serialize(CAIRS.xml.fromJSON(self.model.model_conf_Toolbar_editcontact.items));
			
        self.edittoolbar[uid].loadXMLString(addcontactToolbarXML);
        self.edittoolbar[uid].setSkin(self.model.model_globalSkin);
        self.edittoolbar[ uid ].attachEvent("onClick", function(id) {
            if (id == "edit_new") {
                self.validation(uid);
            }
            if (id == 'edit_close') {
                self.editwindows[uid].close();
            }

        });
    }
    , validation: function(uid) {
        var self = this;
        if (self.form[uid].getItemValue("relConnId") == '')
        {
            dhtmlx.alert({title: "Alert", type: "alert-error", text: "Please add a Contact"});
			self.editstatus_bar[ uid ].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
            return false;
        }
        if (self.form[uid].getItemValue("primaryRelationship") == '')
        {
            dhtmlx.alert({title: "Alert", type: "alert-error", text: "Please Enter Primary relationship"});
			self.editstatus_bar[ uid ].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
            return false;
        }
        if (self.form[uid].getItemValue("relationTypeId1") == '') {
            dhtmlx.alert({title: "Alert", type: "alert-error", text: 'Please Enter relationshiptype'});
			self.editstatus_bar[ uid ].setText("<span style=\"color:#FF0000;\"><strong>* Fields are mandatory</strong></span>");
            return false;
        }
        if (self.form[uid].getItemValue("startdate_1") == '')
        {
            dhtmlx.alert({title: "Alert", type: "alert-error", text: 'Please enter ' + self.form[uid].getItemLabel("relationTypeId1") + ' start date'});
            return false;
        }
        var enddateValidation = String(self.form[uid].getItemValue("enddate_1"));

        if (enddateValidation.trim() != 'null') {
            if (self.form[uid].getItemValue("enddate_1") < self.form[uid].getItemValue("startdate_1")) {
                dhtmlx.alert({title: "Alert", type: "alert-error", text: ' End date should be greater then Start date'});
                return false;
            }
        }
        self.editlayout[uid].progressOn();
        self.layout[uid].progressOn();
        self.form[uid].send(self.application_path + "processors/MAPprocess_rel_data.php", "post", function(text, xml, XmlHttpRequest) {
            self.editlayout[uid].progressOff();
            self.editwindows[uid].close();
            dhtmlx.alert({title: "Alert", type: "alert-error", text: "Relationship saved"});
			
		if(self.window_managerObj != null){	
			if(MAPaddcontactcomponent.configuration[uid].contactid != 0 && MAPaddcontactcomponent.configuration[uid].contactid != 'undefined'){
			self.grid[ self.contactid ].loadXML(self.application_path + "processors/MAPRelationship_grid.php?ActualGrpId=" + self.groupid + "&contactid=" + self.contactid + "&connectionid=" + self.connectionid);
		}}	else{	
				 var temp_uid =0;
		if(MAPaddcontactcomponent.configuration[MAPaddcontactcomponent.uid].contactid != 0){
			temp_uid = MAPaddcontactcomponent.configuration[MAPaddcontactcomponent.uid].contactid;
		}
		if(self.grid[ temp_uid ] == undefined){
			temp_uid = MAPaddcontactcomponent.configuration[MAPaddcontactcomponent.uid].contactid;
		}
            self.grid[ temp_uid ].loadXML(self.application_path + "processors/MAPRelationship_grid.php?ActualGrpId=" + self.groupid + "&contactid=" + self.contactid + "&connectionid=" + self.connectionid);
		}
			
            self.layout[uid].progressOff();
        });
    }
    , _showHelp: function(uid) {
        var self = this;
        if (self.window_manager.isWindow("help_phone_window_" + uid)) {
            self.window_help[ uid ].show();
            self.window_help[ uid ].bringToTop();
            return;
        }
        self.window_help[ uid ] = self.window_manager.createWindow("help_phone_window_" + uid, 410, 15, 700, 400);
        self.dhtmlxWidowCustomPostion(self.window_help[uid],self.model.model_help_winTop);
        self.window_help[ uid ].setText("End user manual");
        self.window_help[ uid ].setIcon("help.png", "help_dis.png");
        self.window_help[ uid ].attachURL(self.application_path + "docs/end_user_manual");
    }
    //toolbar
    , _toolbar: function(uid)
    {
        var self = this;
        self.toolbar[ uid ] = self.layout[ uid ].cells("a").attachToolbar(  );
        self.toolbar[uid].setIconsPath(self.model.model_globalImgPath);
        
		

			 var addcontactToolbarXML = CAIRS.xml.serialize(CAIRS.xml.fromJSON(self.model.model_conf_Toolbar_addcontact.items));
			 
        self.toolbar[uid].loadXMLString(addcontactToolbarXML);
        self.toolbar[uid].setSkin(self.model.model_globalSkin);

        if (self.useWindow !== true) {
            self.toolbar[uid].removeItem("PersonalRelationships_help");
            self.toolbar[uid].removeItem("PersonalRelationships_close");
			self.toolbar[ uid ].removeItem("PersonalRelationships_casenotes");
            self.toolbar[ uid ].removeItem("PersonalRelationships_fastfact");
            self.toolbar[ uid ].removeItem("PersonalRelationships_airstasklist");
        }
        if (self.contactid == 0) {
            self.toolbar[ uid ].disableItem("PersonalRelationships_delete");
			self.toolbar[ uid ].disableItem("PersonalRelationships_edit");
        }
        self.toolbar[ uid ].attachEvent("onClick", function(id) { 
          if(MAPPermissions.checkAccessPermission(id)!=1){
			  if(id == "PersonalRelationships_edit"){
			
			self._editwindow(uid, 'Edit');
            self._editlayout(uid);
            self._edittoolbar(uid);
            self._form(uid, 'Edit');
			
			  }
			  if (id == "PersonalRelationships_help") {
                self._showHelp(uid);
                }
            if (id == "PersonalRelationships_new") {	

                if(self.window_manager != null){
					var temp_uid = 0;
					var temp_contid = 0;
								if(self.contactcomponent_obj.configuration[MAPaddcontactcomponent.uid].contactid >0 && MAPaddcontactcomponent.uid == 0){
									temp_uid = 0;
									temp_contid = self.contactcomponent_obj.configuration[MAPaddcontactcomponent.uid].contactid;
									
			}else{
			temp_uid = MAPaddcontactcomponent.uid;
			temp_contid = self.contactcomponent_obj.configuration[MAPaddcontactcomponent.uid].contactid;
			}
                    if(self.contactcomponent_obj.configuration[temp_uid].contactid == 0){									
                        if (self.contactcomponent_obj.validation(temp_uid) === true) {
								
								self.contactcomponent_obj.savecontact(temp_uid, 'temp');	
								
								self.contactid =self.contactcomponent_obj.configuration[temp_uid].contactid;
								self.connectionid =(self.contactcomponent_obj.configuration[temp_uid].contactid *-1);
								self._editwindow(temp_contid, 'New');
								self._editlayout(temp_contid);
								self._edittoolbar(temp_contid);
								setTimeout(function(){ self._form(temp_contid, 'New');},4000);

				
						}
					}else{
							if(self.contactcomponent_obj.configuration[MAPaddcontactcomponent.uid].contactid >0 && MAPaddcontactcomponent.uid == 0){
								temp_uid = 0;
								temp_contid = self.contactcomponent_obj.configuration[MAPaddcontactcomponent.uid].contactid;
							}else{
								temp_uid = MAPaddcontactcomponent.uid;
								temp_contid = self.contactcomponent_obj.configuration[MAPaddcontactcomponent.uid].contactid;
							}
						self._editwindow(temp_uid, 'New');
						self._editlayout(temp_uid);
						self._edittoolbar(temp_uid, 'New');
						self._form(temp_uid, 'New');
					}
				}else{
                self._editwindow(uid, 'New');
                self._editlayout(uid);
                self._edittoolbar(uid);
                self._form(uid, 'New');
				}
				
            }
            if (id == "PersonalRelationships_delete") {
                dhtmlx.confirm({
                    title: "Delete Relationship",
                    type: "confirm-warning",
                    text: "<img src='../../auxiliary/DHTMLXmessage/codebase/img/alert_medium.png'> Are you sure you want to delete this Relationship ?",
                    callback: function(result) {
                        if (result == true) {
                            self.layout[uid].progressOn();
                            var relConnectionId1 = self.grid[ uid ].cells(self.grid[ uid ].getSelectedRowId(), 6).getValue();
                            //alert(relConnectionId1);alert(relConnectionId2);

                            var MAPrelation_delet_params = "relConnectionId=" + relConnectionId1;
                            dhtmlxAjax.post(self.application_path + "processors/MAPRelationship_delete.php", MAPrelation_delet_params, function(MAPrelation_delet_loader) {
                                self.grid[ uid ].loadXML(self.application_path + "processors/MAPRelationship_grid.php?ActualGrpId=" + self.groupid + "&contactid=" + self.contactid + "&connectionid=" + self.connectionid);
								self.toolbar[ uid ].disableItem("PersonalRelationships_delete");
								self.toolbar[ uid ].disableItem("PersonalRelationships_edit");
                                self.layout[uid].progressOff();
                            });
                        }
                    }
                });
            }
            if (id == 'PersonalRelationships_close') {
                self.windows[uid].close();
            }
          }
        });

    }

    //Grid
    , _grid: function(uid) {
        var self = this;

        self.grid[ uid ] = self.layout[ uid ].cells("a").attachGrid();
        self.grid[ uid ].selMultiRows = false;
        self.grid[ uid ].setImagePath("../../auxiliary/dhtmlxfull3.5/imgs/");

        self.grid[ uid ].enableAutoWidth(true);
        self.grid[ uid ].enableMultiline(true);
        self.grid[ uid ].init();
        if (self.contactid !== 0) {
            self.grid[ uid ].loadXML(self.application_path + "processors/MAPRelationship_grid.php?ActualGrpId=" + self.groupid + "&contactid=" + self.contactid + "&connectionid=" + self.connectionid);
            self.layout[uid].progressOff();
        } else {

            self.layout[uid].progressOff();
        }

        self.grid[ uid ].attachEvent("onRowDblClicked", function(rowId, cellInd)
        {
//            self._window_manager();
            self._editwindow(uid, 'Edit');
            self._editlayout(uid);
            self._edittoolbar(uid);
            self._form(uid, 'Edit');

        });
        self.grid[ uid ].attachEvent("onEnter", function(rowId, cellInd)
        {
//            self._window_manager();
            self._editwindow(uid, 'Edit');
            self._editlayout(uid);
            self._edittoolbar(uid);
            self._form(uid, 'Edit');
        });
        self.grid[uid].attachEvent("onRowSelect", function(rowId, cellInd) {
            self.toolbar[ uid ].enableItem("PersonalRelationships_casenotes");
            self.toolbar[ uid ].enableItem("PersonalRelationships_fastfact");
            self.toolbar[ uid ].enableItem("PersonalRelationships_airstasklist");
            self.toolbar[ uid ].enableItem("PersonalRelationships_delete");
			self.toolbar[ uid ].enableItem("PersonalRelationships_edit");
        })

        self.toolbar[ uid ].disableItem("PersonalRelationships_casenotes");
        self.toolbar[ uid ].disableItem("PersonalRelationships_fastfact");
        self.toolbar[ uid ].disableItem("PersonalRelationships_airstasklist");
        self.toolbar[ uid ].disableItem("PersonalRelationships_delete");
		self.toolbar[ uid ].disableItem("PersonalRelationships_edit");
        self.grid[ uid ].attachEvent("onXLE", function(grid_obj, count) {

            //self.grid[ uid ].selectRow(0);
            self.layout[uid].progressOff();
        });



    }
    // form
    , _form: function(uid, task)
    {
        var self = this;

        self.form[uid] = self.editlayout[uid].cells("a").attachForm(self.model.Form.template);
		if(self.window_managerObj != null){
		if(self.contactcomponent_obj.configuration[uid].contactid != 0 && self.contactcomponent_obj.configuration[uid].contactid != 'undefined'){
			self.contactid = self.contactcomponent_obj.configuration[uid].contactid;
		}
		}
			console.log(self.contactcomponent_obj.configuration[MAPaddcontactcomponent.uid].contact);
			if(self.contactcomponent_obj.configuration[MAPaddcontactcomponent.uid].contact == 0){
			self.form[uid].hideItem("defaultrelation");
			self.form[uid].setItemValue("contacttype",0);
			}
        var today_date = new Date();
        var month = today_date.getMonth() + 1;
        var date_seed = month + '-' + today_date.getDate() + '-' + today_date.getFullYear();
        self.form[uid].setItemValue("startdate_1", date_seed);
        self.form[uid].getCombo("primaryRelationship").loadXML(self.application_path + "processors/MAPprimary_relationships.php");
        var MAPrelation_getdetails_params = "contactid=" + self.contactid
        dhtmlxAjax.post(self.application_path + "processors/MAPgetContactNames.php", MAPrelation_getdetails_params, function(MAPrelation_getdetails_loader) {
            MAPrelation_getdetails_loader_json = JSON.parse(MAPrelation_getdetails_loader.xmlDoc.responseText);
			self.editwindows[uid].setText(MAPrelation_getdetails_loader_json['contact'][1]+" Relation");
           // self.form[uid].setItemLabel("relationTypeId1", MAPrelation_getdetails_loader_json['contact'][1]);
        });
        self.form[uid].setItemValue("connectionId", self.connectionid);
        if (task != 'Edit') {
            self.form[uid].getCombo("relationTypeId1").loadXML(self.application_path + "processors/MAPsecondary_relationships.php");
            self.editlayout[uid].progressOff();
        } else {
            self.form[uid].getCombo("relationTypeId1").loadXML(self.application_path + "processors/MAPsecondary_relationships.php?primary_rel_id=" + self.grid[ uid ].cells(self.grid[ uid ].getSelectedRowId(), 3).getValue());
            self.editlayout[uid].progressOff();


            self.form[uid].setItemValue("relConnId", self.grid[ uid ].cells(self.grid[ uid ].getSelectedRowId(), 5).getValue());
            self.form[uid].setItemValue("relConnectionId1", self.grid[ uid ].cells(self.grid[ uid ].getSelectedRowId(), 6).getValue());

            var MAPrelation_editdetails_params = "contactid=" + self.contactid + "&ActualGrpId=" + self.groupid + "&Edit=true&relConnId=" + self.grid[ uid ].cells(self.grid[ uid ].getSelectedRowId(), 5).getValue() + "&relConnectionId1=" + self.grid[ uid ].cells(self.grid[ uid ].getSelectedRowId(), 6).getValue()+
                "&IndConnId=" + self.grid[ uid ].cells(self.grid[ uid ].getSelectedRowId(), 7).getValue();
            dhtmlxAjax.post(self.application_path + "processors/MAPedit_relationships_grid.php", MAPrelation_editdetails_params, function(MAPrelation_editdetails_loader) {
                MAPrelation_editdetails_loader_json = JSON.parse(MAPrelation_editdetails_loader.xmlDoc.responseText);
                self.form[uid].getCombo("primaryRelationship").setComboValue(MAPrelation_editdetails_loader_json['details']['RelationshipSubTypeText']);
                self.form[uid].getCombo("relationTypeId1").setComboValue(MAPrelation_editdetails_loader_json['details']['RelTypeText1']);
                self.form[uid].setItemValue("contact_name", MAPrelation_editdetails_loader_json['details']['RelContactName']);
                self.form[uid].setItemValue("combo1value", MAPrelation_editdetails_loader_json['details']['RelationshipSubTypeId']);
                self.form[uid].setItemValue("hRelationTypeId1", MAPrelation_editdetails_loader_json['details']['RelTypeid1']);
                self.form[uid].setItemValue("relConnId", MAPrelation_editdetails_loader_json['details']['RelConnId']);
                self.form[uid].setItemValue("relAction", 'updated');
                self.form[uid].setItemValue("relCustomTemplateForm", "updated");
                if (MAPrelation_editdetails_loader_json['details']['start_date1'] != 'NoDate') {
                    self.form[uid].setItemValue("startdate_1",MAPrelation_editdetails_loader_json['details']['start_date1']);
                }
                if (MAPrelation_editdetails_loader_json['details']['end_date1'] != 'NoDate') {
                    self.form[uid].setItemValue("enddate_1", MAPrelation_editdetails_loader_json['details']['end_date1']);
                }

            });
        }

        self.form[uid].getCombo("primaryRelationship").attachEvent("onChange", function() {
            self.editlayout[uid].progressOn();
            self.form[uid].getCombo("relationTypeId1").loadXML(self.application_path + "processors/MAPsecondary_relationships.php?primary_rel_id=" + self.form[uid].getCombo("primaryRelationship").getSelectedValue());
            self.editlayout[uid].progressOff();
        })

        jQuery('input[name$="contact_name"]').keyup(function(event) {
		self.form[uid].showItem("processingWheel1");
		self.form[uid].hideItem("p1plusicon");
        });

	
			jQuery(document).ready(function(){							
		self.form[uid].hideItem("processingWheel1");
		self.form[uid].hideItem("p1plusicon");					
        jQuery('input[name$="contact_name"]').autocomplete(self.application_path + 'processors/MAPcontactName.php', {
        multiple: false,
        matchContains: false,
        mustMatch: true,
        autoFill: false,
        delay: 10,
        max: 50,
        minChars:2,
            formatItem: self.formatItem,
            formatResult: self.formatResult
			});
		
        jQuery('input[name$="contact_name"]').result(function(event, data, formatted) {
			  console.log(data);
            if (data) {
				
				if(data[1]){ 
					self.form[uid].hideItem("processingWheel1");
					self.form[uid].hideItem("p1plusicon");	
                	var Person1ConnId = data[1] * -1;
                	self.form[uid].setItemValue("relConnId", Person1ConnId);
				
				}
            } else {
			
					self.form[uid].hideItem("processingWheel1");
					self.form[uid].showItem("p1plusicon");
            }
        });
											
});
    }
	,opencontact : function(){
		 var self = MAPRelationshipComponent;
		 var temp_uid =0;
		if(MAPaddcontactcomponent.uid != 0 ){
			temp_uid = MAPaddcontactcomponent.uid;
		}
		if(self.form[temp_uid] == undefined){
			temp_uid = self.contactcomponent_obj.configuration[MAPaddcontactcomponent.uid].contactid;
		}
	add_contactrelationcomponent_func(0,'New_Contact_Inserts','6panel','Client1',0,'','',self.form[temp_uid].getItemValue("contact_name"),self.window_manager);
	//add_contactcomponent_func(0,'New_Contact_Inserts','MasterData','Client1','0');
	}
    , formatItem: function(row) {
		 var self = MAPRelationshipComponent;
		 var temp_uid =0;
		if(MAPaddcontactcomponent.uid != 0 ){
			temp_uid = MAPaddcontactcomponent.uid;
		}
		if(self.form[temp_uid] == undefined){
			temp_uid = self.contactcomponent_obj.configuration[MAPaddcontactcomponent.uid].contactid;
		}
		
		
				if(row[0] == 'No Data'){
					
					self.form[temp_uid].hideItem("processingWheel1");
					self.form[temp_uid].showItem("p1plusicon");
					
					 return false;
				}else{
					 self.form[temp_uid].hideItem("processingWheel1");
					 return row[0];
				}
    }
    , formatResult: function(row) {
        return row[0];
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
    }
    , initComponent: function() {
        var self = this;
        if (self.useWindow === true) {
            self._window(self.contactid);
        }
        self._layout(self.contactid);
        self._toolbar(self.contactid);
        self._grid(self.contactid);
    }

    , datainit: function(MAPRelationshipComponentModel)
    {
        var self = this;
        self.model = MAPRelationshipComponentModel;

    }
};
MAPRelationshipComponent.datainit(Model_MAPRelationshipComponentModel);