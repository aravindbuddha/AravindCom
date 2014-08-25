//================= SAVE IT 
//=================     as controller/mapbackground.js 
var mapbackground = {
 
    uid : null
 
    ,window_manager : null
 
    ,window : []
    ,layout : []
    ,toolbar : []
    ,grid : []
    ,form : []
    ,window_help: []
    ,status_bar : []
    ,editstatus_bar: []
    ,editwindows: []
    ,edittoolbar: []
    ,editlayout: []
    ,configuration : []
 	,data_store: []
	,data_storelist: []
	
    ,_window_manager : function()
    {
        var self = this;
        self.window_manager = new dhtmlXWindows();
        self.window_manager.setImagePath( self.model.conf_window.image_path );
    }
 
    ,_window : function( uid )
    {
        var self = this;
 
        if(self.window_manager === null)
            self._window_manager(  );
 
        if(self.window_manager.isWindow( "window_mapbackground_" + uid ))
        {
            self.window[ uid ].show();
            self.window[ uid ].bringToTop();
            return;
        }
        self.window[ uid ] = self.window_manager.createWindow( "window_mapbackground_" + uid, self.model.conf_window.left + 10, 
        self.model.conf_window.top + 10, self.model.conf_window.width, self.model.conf_window.height );
        self.window[ uid ].setText( self.model.text_labels.main_window_title );
        self.window[ uid ].setIcon( self.model.conf_window.icon, self.model.conf_window.icon_dis );
		self.window[uid].denyPark();
		self.window[uid].button('park').hide();
		self.window[uid].button('minmax1').hide();
        self.window[ uid ].attachEvent("onClose", function(win)
        {
			return true;
        });
        self.status_bar[ uid ] = self.window[ uid ].attachStatusBar();
    }
 
    ,_layout : function( uid )
    {
        var self = this;
	if (self.configuration[uid].useWindow === true) {
	    self.layout[ uid ] = self.window[ uid ].attachLayout( self.model.conf_layout.pattern );
	}else{
	    self.layout[uid] = new dhtmlXLayoutObject(self.configuration[uid].parent_object, self.model.conf_layout.pattern);
	}
	
	self.layout[uid].cells("a").hideHeader();
    }
 
    ,_toolbar : function( uid )
    {
        var self = this;
 
        self.toolbar[ uid ] = self.layout[ uid ].cells("a").attachToolbar( self.model.conf_toolbar );
        self.toolbar[uid].setSkin(self.model.globalSkin);
		self.toolbar[uid].setIconsPath(self.model.conf_window.image_path);
		if (self.configuration[uid].useWindow !== true) {
            self.toolbar[uid].removeItem("help");
            self.toolbar[uid].removeItem("close");
        }
		
        self.toolbar[ uid ].attachEvent("onClick", function(id)
        {   
			switch(id){
				case 'help':
				 self._showHelp(uid);
				break;
				case 'close':
				 self.window[uid].close();
				break;
				case 'new':
					self._editwindow(uid, 'New');
					self._editlayout(uid);
					self._edittoolbar(uid, 'New');
					self._form(uid, 'New');
				break;
				case 'edit':
					self._editwindow(uid, 'Edit');
					self._editlayout(uid);
					self._edittoolbar(uid, 'Edit');
					self._form(uid, 'Edit');				
				break;	
				case 'delete':
				
				break;
			}
        });
    }
 
    ,_grid : function( uid )
    {
        var self = this;
        self.grid[ uid ] = self.layout[ uid ].cells("a").attachGrid( self.model.conf_grid );
        self.grid[ uid ].setHeader( self.model.conf_grid.headers );
        self.grid[ uid ].attachHeader( self.model.conf_grid.attachheader );
        self.grid[ uid ].setInitWidths( self.model.conf_grid.widths );		
        self.grid[ uid ].setColAlign( self.model.conf_grid.colaligns );
        self.grid[ uid ].setColTypes( self.model.conf_grid.coltypes );
        self.grid[ uid ].setColSorting( self.model.conf_grid.colsorting );
        self.grid[ uid ].selMultiRows = true;
		self.grid[ uid ].enableMultiline(true);
        self.grid[ uid ].setDateFormat("%m-%d-%Y");
        self.grid[ uid ].init();
		self.grid[uid].parse(self.data_store[uid].backbroundlist, "json");
		self.toolbar[uid].disableItem("delete");
		self.toolbar[uid].disableItem("edit");
		self.grid[uid].setColumnHidden(8,true);
		self.grid[uid].setColumnHidden(9,true);
		self.grid[uid].setColumnHidden(10,true);
		self.grid[uid].setColumnHidden(11,true);
		self.grid[uid].setColumnHidden(12,true);
		self.grid[uid].setColumnHidden(13,true);
		self.grid[uid].setColumnHidden(14,true);
		self.grid[uid].setColumnHidden(15,true);
		self.grid[uid].setColumnHidden(16,true);
		self.grid[uid].setColumnHidden(17,true);
		self.grid[uid].setColumnHidden(18,true);
		self.grid[uid].setColumnHidden(19,true);
		self.grid[uid].setColumnHidden(20,true);
		self.grid[uid].setColumnHidden(21,true);
		self.grid[uid].setColumnHidden(22,true);
		self.grid[uid].setColumnHidden(23,true);
        self.grid[uid].attachEvent("onRowDblClicked", function (rowId, cellInd) {
			self._editwindow(uid, 'Edit');
			self._editlayout(uid);
			self._edittoolbar(uid, 'Edit');
			self._form(uid, 'Edit');
        });
        self.grid[uid].attachEvent("onEnter", function (rowId, cellInd) {
			self._editwindow(uid, 'Edit');
			self._editlayout(uid);
			self._edittoolbar(uid, 'Edit');
			self._form(uid, 'Edit');
        }); 
        self.grid[ uid ].attachEvent("onRowSelect", function( id, ind )
        {
          self.toolbar[uid].enableItem("delete");
		  self.toolbar[uid].enableItem("edit");   
        });
    }
 
	
    ,_showHelp: function (uid) 
	{

        var self = this;
		
		if (self.configuration[uid].windowsobject === null || self.configuration[uid].windowsobject === '') {
			if (self.window_manager === null)
				self._window_manager();
		}
		else {
			self.window_manager = self.configuration[uid].windowsobject;
			//            alert(self.window_manager);
		}
		
		
        if (self.window_manager.isWindow("help_background_window_" + uid)) {

            self.window_help[uid].show();
            self.window_help[uid].bringToTop();
            return;

        }

        self.window_help[uid] = self.window_manager.createWindow("help_background_window_" + uid, self.model.conf_window.left + 10, self.model.conf_window.top + 10, 700, 400);
        self.window_help[uid].setText("End user manual");
        self.window_help[uid].setIcon("help.png", "help.png");
		self.window_help[uid].button('park').hide();
		self.window_help[uid].button('minmax1').hide();
        self.window_help[uid].attachURL(self.configuration[uid].application_path + "docs");

    }
    ,_editwindow: function (uid, task) {
        var self = this;

        // NEW - Eduardo
		if (self.configuration[uid].windowsobject === null || self.configuration[uid].windowsobject === '') {
			if (self.window_manager === null)
				self._window_manager();
		}
		else {
			self.window_manager = self.configuration[uid].windowsobject;
			//            alert(self.window_manager);
		}
		
		self.editwindows[uid] = self.window_manager.createWindow('window_background_edit_' + uid, 0, 0, self.model.conf_window.model_edit_winHeight, self.model.conf_window.model_edit_winWidth);
		
		if (task == 'New')
            self.editwindows[uid].setText('Add Background');
        else
            self.editwindows[uid].setText('Edit Background');
        self.editwindows[uid].setModal(true);
        self.editwindows[uid].button('park').hide();
		self.editwindows[uid].button('minmax1').hide();
		self.editwindows[uid].center();
        self.editwindows[uid].setIcon(self.model.conf_window.icon, self.model.conf_window.icon);
        self.editstatus_bar[uid] = self.editwindows[uid].attachStatusBar();
        self.editstatus_bar[uid].setText("");
        self.editwindows[uid].attachEvent('onclose', function () {
            self.edittoolbar = [];
            self.editlayout = [];
            self.form = [];
            return true;
        });
    }
    ,_editlayout: function (uid) {
        var self = this;
        self.editlayout[uid] = self.editwindows[uid].attachLayout(self.model.conf_layout.pattern);
        self.editlayout[uid].cells("a").hideHeader();
		//self.editlayout[uid].progressOn();
    }
    ,_edittoolbar: function (uid, task) {
        var self = this;
        self.edittoolbar[uid] = self.editlayout[uid].cells("a").attachToolbar(self.model.edit_toolbar);
        self.edittoolbar[uid].setSkin(self.model.globalSkin);
		self.toolbar[uid].setIconsPath(self.model.conf_window.image_path);
        self.edittoolbar[uid].attachEvent("onClick", function (id) {
            if (id == "save") {
				//self.form[uid].send(self.configuration[uid].application_path + "processors/MAPprocess_rel_data.php", "post", function(text, xml, XmlHttpRequest) {
                self.addRow(uid, task);
			 //});
            }
            if (id == "close") {
                self.editwindows[uid].close();
            }
        });
    }	
	,_form: function (uid, task) {
        var self = this;
        self.form[uid] = self.editlayout[uid].cells("a").attachForm(self.model.conf_form.template);
		self.form[uid].setItemValue('contact_ID', self.configuration[uid].contactid);
		var race = self.form[uid].getCombo("combo_1");
		 for (i = 0; i <= (parseInt(self.data_storelist[uid].Racecount) - 1); i++) {
          race.addOption(self.data_storelist[uid].Race[i].RaceID, self.data_storelist[uid].Race[i].RaceText);
         }
		 for (i = 0; i <= (parseInt(self.data_storelist[uid].Nationalitycount) - 1); i++) {
		  self.form[uid].getOptions('multiselect_1').add(new Option(self.data_storelist[uid].Nationality[i].NationalityText, self.data_storelist[uid].Nationality[i].NationalityID));
         }
		var langauge = self.form[uid].getCombo("combo_2");
		 for (i = 0; i <= (parseInt(self.data_storelist[uid].Languagecount) - 1); i++) {
          langauge.addOption(self.data_storelist[uid].Language[i].LanguageId, self.data_storelist[uid].Language[i].LanguageText);
		  self.form[uid].getOptions('multiselect_2').add(new Option(self.data_storelist[uid].Language[i].LanguageText, self.data_storelist[uid].Language[i].LanguageId));
         }  
		var Religion = self.form[uid].getCombo("combo_3");
		 for (i = 0; i <= (parseInt(self.data_storelist[uid].Religioncount) - 1); i++) {
          Religion.addOption(self.data_storelist[uid].Religion[i].ReligionID, self.data_storelist[uid].Religion[i].ReligionText);
         }
		 for (i = 0; i <= (parseInt(self.data_storelist[uid].Ethnicitycount) - 1); i++) {
		  self.form[uid].getOptions('multiselect_3').add(new Option(self.data_storelist[uid].Ethnicity[i].EthnicityTypeText, self.data_storelist[uid].Ethnicity[i].EthnicityId));
         }
		var Ancestry = self.form[uid].getCombo("combo_4");
		 for (i = 0; i <= (parseInt(self.data_storelist[uid].Culturecount) - 1); i++) {
          Ancestry.addOption(self.data_storelist[uid].Culture[i].CultureID, self.data_storelist[uid].Culture[i].CultureText);
		  self.form[uid].getOptions('multiselect_4').add(new Option(self.data_storelist[uid].Culture[i].CultureText, self.data_storelist[uid].Culture[i].CultureID));
         }  
		 
		 if(task == 'Edit'){
			 
			self.form[uid].setItemValue("combo_1", self.grid[uid].cells(self.grid[uid].getSelectedRowId(),8).getValue());	
			self.form[uid].setItemValue("combo_2", self.grid[uid].cells(self.grid[uid].getSelectedRowId(),14).getValue());	
			self.form[uid].setItemValue("combo_3", self.grid[uid].cells(self.grid[uid].getSelectedRowId(),18).getValue());	
			self.form[uid].setItemValue("combo_4", self.grid[uid].cells(self.grid[uid].getSelectedRowId(),20).getValue());	
			
                       var typeIDs = self.grid[uid].cells(self.grid[uid].getSelectedRowId(),10).getValue();

                      var typeCount = typeIDs.split(",").length;
                      var Citizenship = typeIDs.split(",");
                      var list1 = new Array();
                      for (i=0;i<typeCount;i++)
                        {
                        citizenValue = Citizenship[i];
                        list1.push(citizenValue);
                        }
                        self.form[uid].setItemValue("multiselect_1",list1);

                      var secLanguage = self.grid[uid].cells(self.grid[uid].getSelectedRowId(),16).getValue();

                      var typeCount = secLanguage.split(",").length;
                      var seclanguageval = secLanguage.split(",");
                      var list2 = new Array();
                      for (i=0;i<typeCount;i++)
                          {
                          seclanguageval = seclanguageval[i];
                          list2.push(seclanguageval);
                          }
                          self.form[uid].setItemValue("multiselect_2",list2);

	              var typeIDs = self.grid[uid].cells(self.grid[uid].getSelectedRowId(),12).getValue();

                      var typeCount = typeIDs.split(",").length;
                      var ethncityval = typeIDs.split(",");
                      var list3 = new Array();
                      for (i=0;i<typeCount;i++)
                        {
                         ethncityValue = ethncityval[i];
	                 list3.push(ethncityValue);
                         }
                         self.form[uid].setItemValue("multiselect_3",list3);

                       var secancestry = self.grid[uid].cells(self.grid[uid].getSelectedRowId(),22).getValue();

                       var typeCount = secancestry.split(",").length;
                       var secancestryval = secancestry.split(",");
                       var list4 = new Array();
                       for (i=0;i<typeCount;i++)
                         {
                        secancestryvalue = secancestryval[i];
                        list4.push(secancestryvalue);
                        }
                        self.form[uid].setItemValue("multiselect_4",list4);
         
			
			
		 }
    }

    ,addRow: function (uid, task) {
        var self = this;
        var add_primarytext;
        if (self.validate(uid, task) === true) {
           //self.editlayout[uid].progressOn();
			
var bg_race		=  self.form[uid].getItemValue("combo_1");
var bg_lang		=   self.form[uid].getItemValue("combo_2");
var bg_relg		=   self.form[uid].getItemValue("combo_3");
var bg_ancs		=   self.form[uid].getItemValue("combo_4");
var bg_ctzn           =   self.form[uid].getItemValue("multiselect_1");
var bg_lang1          =   self.form[uid].getItemValue("multiselect_2");
var bg_ethn	        =   self.form[uid].getItemValue("multiselect_3");
var bg_ancs1          =  self.form[uid].getItemValue("multiselect_4");
var sectionname       =   self.form[uid].getItemValue("sectionname");

if(task == 'Edit'){
                        var  bg_race_recordID=self.grid[uid].cells(self.grid[uid].getSelectedRowId(),9).getValue();
                        var  bg_ctzn_recordID=self.grid[uid].cells(self.grid[uid].getSelectedRowId(),11).getValue();
                        var  bg_eth_recordID=self.grid[uid].cells(self.grid[uid].getSelectedRowId(),13).getValue();
                        var  bg_lng_recordID=self.grid[uid].cells(self.grid[uid].getSelectedRowId(),15).getValue();
                        var  bg_lng_recordID1=self.grid[uid].cells(self.grid[uid].getSelectedRowId(),17).getValue();
                        var  bg_relg_recordID=self.grid[uid].cells(self.grid[uid].getSelectedRowId(),19).getValue();
                        var  bg_ancs_recordID=self.grid[uid].cells(self.grid[uid].getSelectedRowId(),21).getValue();
                        var  bg_ancs_recordID1=self.grid[uid].cells(self.grid[uid].getSelectedRowId(),23).getValue();
}else{
                       var  bg_race_recordID="";
                        var  bg_ctzn_recordID="";
                        var  bg_eth_recordID="";
                        var  bg_lng_recordID="";
                        var  bg_lng_recordID1="";
                        var  bg_relg_recordID="";
                        var  bg_ancs_recordID="";
                        var  bg_ancs_recordID1="";
}
		  
		  var MAPcomponent_params = "agencyid="+self.configuration[uid].agencyid+"&contact_ID="+self.configuration[uid].contactid+"&section_name="+sectionname+"&bg_race="+bg_race+"&bg_recordID_race="+bg_race_recordID+"&bg_ctzn="+bg_ctzn+"&bg_recordID_ctzn="+bg_ctzn_recordID+"&bg_ethn="+bg_ethn+"&bg_recordID_ethn="+bg_eth_recordID+"&bg_lang="+bg_lang+"&bg_recordID_lang="+bg_lng_recordID+"&bg_relg="+bg_relg+"&bg_recordID_relg="+bg_relg_recordID+"&bg_ancs="+bg_ancs+"&bg_recordID_ancs="+bg_ancs_recordID+"&bg_lang1="+bg_lang1+"&bg_recordID_lang1="+bg_lng_recordID1+"&bg_ancs1="+bg_ancs1+"&bg_recordID_ancs1="+bg_ancs_recordID1;
            dhtmlxAjax.post(self.configuration[uid].application_path + "processors/savetoairs.php", MAPcomponent_params, function (loader) {
				

                    dhtmlx.message({
                        text: "Record saved"
                    });
					self._datastor(uid);
                    self.editwindows[uid].close();
 
            });
        }
    }
	,dhtmlxalert: function (uid,alert_text){
		 var self = this;
	                dhtmlx.alert({
                    title: "Alert",
                    type: "alert-error",
                    text: alert_text
                });	
	}
	,dhtmlxmessage: function (uid,message_text){
		 var self = this;
		dhtmlx.message({
			type: "error",
			text: message_text
		});	
	}	
    ,validate: function (uid, task) {
        var self = this;
		return true;
    }
    ,deleteRow: function (uid, selectedRowsId) {
        var self = this;
        dhtmlx.confirm({
            title: "Delete Email",
            type: "confirm-warning",
            text: "Are you sure you want to delete this Email ?",
            callback: function (result) {
                if (result === true) {
                    var MAPcomponent_delet_params = "";
                    dhtmlxAjax.post(self.configuration[uid].application_path + "processors/deleteInfo.php", MAPcomponent_delet_params, function (loader) {
                        try {
                            var json = JSON.parse(loader.xmlDoc.responseText);
                            if (json.status == "success") {
								self.dhtmlxmessage(uid,"record was deleted");
                                self.grid[uid].deleteRow(self.grid[uid].getSelectedRowId());
                                self.toolbar[uid].disableItem("delete");
                               // self.progressOff(uid);
                            } else {
								self.dhtmlxmessage(uid,json.response);
                                //self.progressOff(uid);
                            }
                        } catch (e) {
							self.dhtmlxmessage(uid,"Fatal error on server side: " + loader.xmlDoc.responseText);
                            //self.progressOff(uid);
                        }
                    });
                } else {
                    //self.progressOff(uid);
                }
            }
        });
    }	
    // Data Store
    ,_datastor: function (uid) {
        var self = this;
        var postStr = "contactid="+self.configuration[uid].contactid+"&agencyid="+self.configuration[uid].agencyid;
        dhtmlxAjax.post(self.configuration[uid].application_path + "processors/get_data.php", postStr, function (loader) {
            try {
                var json = JSON.parse(loader.xmlDoc.responseText);
                if (json.status == "success") {
                    self.data_store[uid] = json;
					self.dhtmlxmessage(uid,"Data store 100% loaded");
                    self._grid(uid);
					
                } else {
					self.dhtmlxmessage(uid,json.response);
                }
            } catch (e) {
					self.dhtmlxmessage(uid,"Fatal error on server side: " + loader.xmlDoc.responseText);				
            }
        });
    }	
	,_ajax : function(uid){
		var self = this;
		var postStr = "agencyid="+self.configuration[uid].agencyid;
        dhtmlxAjax.post(self.configuration[uid].application_path + "processors/datalist.php",postStr, function (loader) {
			try {
                var json = JSON.parse(loader.xmlDoc.responseText);
                if (json.Race) {
                   																									 
					self.data_storelist[uid] = json;
					
                } else {
					self.dhtmlxmessage(uid,json.response);
                }
            } catch (e) {
					self.dhtmlxmessage(uid,"Fatal error on server side: " + loader.xmlDoc.responseText);				
            }
			
		});
	}
	    //Progress On
    ,progressOn: function (uid) {
        var self = this;
        self.layout[uid].progressOn();
        self.window[uid].progressOn();
    }

    // Progress Off
   , progressOff: function (uid) {
        var self = this;
        self.layout[uid].progressOff();
        self.window[uid].progressOff();
    }

    ,init : function( model )
    {
        var self = this;
        self.model = model;
    }
    ,start : function( configuration )
    {
        var self = this;
        self.uid = configuration.uid;
        window.dhx_globalImgPath = configuration.dhtmlx_codebase_path + "imgs/";
        dhtmlx.skin = self.model.globalSkin || "dhx_skyblue";
        configuration["icons_path"] = "icons/";
        self.configuration[ self.uid  ] = configuration;
        self.model.conf_window.image_path  = configuration.application_path + configuration.icons_path;
        self.model.conf_toolbar.icon_path =  configuration.application_path + configuration.icons_path;
        self.model.edit_toolbar.icon_path = configuration.application_path + configuration.icons_path;
		self._ajax( self.uid );
		
		if (self.configuration[self.uid].useWindow === true) {
			self._window( self.uid );
		}
		
       
        self._layout( self.uid );
        self._toolbar( self.uid );
		self._datastor(self.uid);
    }
};
mapbackground.init( mapbackground_Model );