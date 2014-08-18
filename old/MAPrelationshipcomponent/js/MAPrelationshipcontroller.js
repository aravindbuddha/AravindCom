var MAPRelationshipComponent = {   
	/* properties */
	window_manager : null
	,windows : []
	,editwindows :[]
	,status_bar : []
	,editstatus_bar : []
	,toolbar : []
	,edittoolbar : []	
	,layout: []
	,editlayout: []	
	,tabbar : []
    ,form: []
	,grid : []
	,id: null
	,configuration : []

	/* methods */
	,_window_manager : function()
	{
		var self = this;
		self.window_manager = new dhtmlXWindows();
		self.window_manager.setImagePath( self.model.model_globalImgPath);
	}
	,_window :  function(uid) {
		
		var self = this;
        try{
            if(self.window_manager === null) {
                self._window_manager();
            }
            self.windows[uid] = self.window_manager.createWindow( 'window_relationshipcomponent_'+uid, '0', '0', self.model.model_winHeight, self.model.model_winWidth);
	        self.windows[uid].setText('Relationship');
            self.windows[uid].setModal(true);
			self.windows[uid].button('park').hide()
			self.windows[uid].center();
			self.windows[ uid ].setIcon( self.model.model_conf_window, self.model.model_conf_window );
			self.status_bar[ uid ] = self.windows[ uid ].attachStatusBar();
			self.status_bar[ uid ].setText( "RelationShip List Loaded" );
            if(uid == self.contactid) {
                self.windows[uid].attachEvent('onclose',function(){
                    self.toolbar = [];
					return true;
                });
            }
        }catch(e) {
            (console) ? console.log("		error on create window" + "\n" + e.stack) : "";
        }
		
	}
	//Edit Window
	,_editwindow: function (uid){
		var self = this;
	            if(self.editwindows[uid] == 'undefined')
                self.editwindows[uid] = [];
            self.editwindows[uid] = self.window_manager.createWindow( 'window_relationshipcomponent_edit_'+uid, '0', '0',self.model.model_edit_winHeight, self.model.model_edit_winWidth );
            self.editwindows[uid].setText('Add Relation');
            self.editwindows[uid].setModal(true);
			self.editwindows[uid].button('park').hide()
			self.editwindows[uid].center();
			self.editwindows[ uid ].setIcon( self.model.model_conf_window, self.model.model_conf_window );
			self.editstatus_bar[ uid ] = self.editwindows[ uid ].attachStatusBar();
			self.editstatus_bar[ uid ].setText( "RelationShip Form Loaded" );
	}
    // layout
    ,_layout: function(uid){
        var self = this;
        self.layout[uid] = self.windows[ uid ].attachLayout(self.model.model_Layout.skin);
        self.layout[uid].cells("a").hideHeader();
		self.layout[uid].progressOn();
    }
    // layout
    ,_editlayout: function(uid){
        var self = this;
        self.editlayout[uid] = self.editwindows[ uid ].attachLayout(self.model.model_Layout.skin);
        self.editlayout[uid].cells("a").hideHeader();
		self.editlayout[uid].progressOn();
    }
    ,loadValues : function(c) {
        var self            = this;
		if(typeof c.connectionid !== 'undefined'){
        self.connectionid  	     = c.connectionid;
		self.groupid             = c.groupid; 
		}
		else
		{
			AlertDHTMLXWindow('ALERT','','ContactId Is Missing','OK');
		}
    }
	,_edittoolbar: function (uid,parentwindow ){
		var self            = this;
		self.edittoolbar[ uid ] = self.editwindows[uid].attachToolbar(  );
		self.edittoolbar[uid].setIconsPath(self.model.model_globalImgPath);
		var addcontactToolbarXML = CAIRS.xml.serialize( CAIRS.xml.fromJSON( self.model.model_conf_Toolbar_editcontact.items ) );
		self.edittoolbar[uid].loadXMLString(addcontactToolbarXML);
		self.edittoolbar[uid].setSkin(self.model.model_globalSkin);
		self.edittoolbar[ uid ].attachEvent("onClick", function(id){
				if( id == "edit_new" ){
					if( self.form[uid].getItemValue("relConnId") == '')
                        {
                           dhtmlx.alert({ title:"Alert", type:"alert-error",text :"Please add a Contact"});
                           return false;
                        }
                        if( self.form[uid].getItemValue("primaryRelationship") == '' )
                        {
                            dhtmlx.alert({ title:"Alert", type:"alert-error",text :"Please Enter Primary relationship"});
                            return false;
                        }
                        if( self.form[uid].getItemValue("relationTypeId1") == '' ){
                            dhtmlx.alert({ title:"Alert", type:"alert-error",text :'Please Enter '+ self.form[uid].getItemLabel("relationTypeId1")+' relationshiptype'});
                            return false;
                        }
                                           
                     if(  self.form[uid].getItemValue("startdate_1") == '')
                     {
                        dhtmlx.alert({ title:"Alert", type:"alert-error",text :'Please enter '+ self.form[uid].getItemLabel("relationTypeId1")+' start date'});
                        return false;
                     }
                     if( self.form[uid].getItemValue("relationTypeId2") != ''){
                     if(  self.form[uid].getItemValue("startdate_2") == '')
                     {
                        dhtmlx.alert({ title:"Alert", type:"alert-error",text :'Please enter '+ self.form[uid].getItemLabel("relationTypeId2")+' start date'});
                        return false;
                     }
                     }
                    
                     var enddateValidation =String( self.form[uid].getItemValue("enddate_1"));
                    
                    if(enddateValidation.trim() != 'null'){
                        if(self.form[uid].getItemValue("enddate_1") <  self.form[uid].getItemValue("startdate_1")){
							dhtmlx.alert({ title:"Alert", type:"alert-error",text :self.form[uid].getItemLabel("relationTypeId1")+' End date should be greater or equal to Start date'});
                            return false;
                        }                     
                    }
                    var enddateValidation =String( self.form[uid].getItemValue("enddate_2"));
                    if(enddateValidation.trim() != 'null'){
                        if(self.form[uid].getItemValue("enddate_2") <  self.form[uid].getItemValue("startdate_2")){
							dhtmlx.alert({ title:"Alert", type:"alert-error",text :self.form[uid].getItemLabel("relationTypeId2")+' End date should be greater or equal to Start date'});
                            return false;
                        }                     
                    }

                    self.form[uid].send("processors/MAPprocess_rel_data.php","post", function(text, xml, XmlHttpRequest){;
					 self.editwindows[uid].close();
                     dhtmlx.alert({ title:"Alert", type:"alert-error",text :"Relationship saved"});
					// self.grid[ parentwindow ].loadXML("processors/MAPRelationship_grid.php?ActualGrpId="+self.groupid+"&connectionId="+self.connectionid);
                                         
                                         self.grid[ parentwindow ].loadXML("processors/MAPRelationship_grid.php?ActualGrpId="+self.groupid+"&connectionId="+self.connectionid+"&parent_component=Matching");
                     }); 
				}
				if(id== 'edit_close'){
					self.editwindows[uid].close();
				}
															
		});
	}
	//toolbar
	,_toolbar : function( uid)
	{
		var self = this;
		self.toolbar[ uid ] = self.windows[uid].attachToolbar(  );
		self.toolbar[uid].setIconsPath(self.model.model_globalImgPath);
		var addcontactToolbarXML = CAIRS.xml.serialize( CAIRS.xml.fromJSON( self.model.model_conf_Toolbar_addcontact.items ) );
		self.toolbar[uid].loadXMLString(addcontactToolbarXML);
		self.toolbar[uid].setSkin(self.model.model_globalSkin);
		self.toolbar[ uid ].attachEvent("onClick", function(id){
			if( id == "PersonalRelationships_new" ){
				self._editwindow('new');
				self._editlayout('new');
				self._edittoolbar('new');
				self._form('new','New');
			}
			if(id == "PersonalRelationships_delete"){
				            dhtmlx.confirm({
                            title: "Delete Relationship",
                            type:"confirm-warning",
                            text: "<img src='../../auxiliary/DHTMLXmessage/codebase/img/alert_medium.png'> Are you sure you want to delete this Relationship ?",
                            callback: function(result) {
                                if(result == true) {
                                    var relConnectionId1      = self.grid[ uid ].cells( self.grid[ uid ].getSelectedRowId(),8).getValue();
                                    var  relConnectionId2      = self.grid[ uid ].cells(self.grid[ uid ].getSelectedRowId(),9).getValue();  
									//alert(relConnectionId1);alert(relConnectionId2);
									       
											var MAPrelation_delet_params = "relConnectionId1=" + relConnectionId1+"&relConnectionId2="+relConnectionId2;
											dhtmlxAjax.post("processors/MAPRelationship_delete.php", MAPrelation_delet_params, function(MAPrelation_delet_loader){																					
											self.grid[ uid ].loadXML("processors/MAPRelationship_grid.php?ActualGrpId="+self.groupid+"&connectionId="+self.connectionid+"&parent_component=Matching");
											});    
                                    }
                                }
                            });
			}
			if(id== 'PersonalRelationships_close'){
			self.windows[uid].close();
			}
									
	   });
			
	}
	
	//Grid
	,_grid : function(uid){
		var self = this;
		
		self.grid[ uid ] = self.layout[ uid ].cells("a").attachGrid();
		self.grid[ uid ].selMultiRows = false;
        self.grid[ uid ].setImagePath("../../auxiliary/dhtmlxfull3.5/imgs/");
        self.grid[ uid ].enableAutoWidth(true);
        self.grid[ uid ].enableMultiline(true);		
		self.grid[ uid ].init();
		self.grid[ uid ].loadXML("processors/MAPRelationship_grid.php?ActualGrpId="+self.groupid+"&connectionId="+self.connectionid+"&parent_component=Matching");
		self.grid[ uid ].selectRow(0);
		self.layout[uid].progressOff();
		self.grid[ uid ].attachEvent("onRowDblClicked", function( rowId, cellInd )
		{		
				self._editwindow(rowId);
				self._editlayout(rowId);
				self._edittoolbar(rowId,uid);
				self._form(rowId,uid,'Edit');
			
		});
		self.grid[ uid ].attachEvent("onEnter", function( rowId, cellInd )
		{		
				self._editwindow(rowId);
				self._editlayout(rowId);
				self._edittoolbar(rowId,uid);
				self._form(rowId,uid,'Edit');
		});
		
	}
	    // form
    ,_form: function(uid,gridid,task)
	{
		var self = this;
		
		self.form[uid] = self.editlayout[uid].cells("a").attachForm(self.model.Form.template);
		
        self.form[uid].getCombo("primaryRelationship").loadXML("processors/MAPprimary_relationships.php");
		var MAPrelation_getdetails_params = "connectionId=" + self.connectionid;
		dhtmlxAjax.post("processors/MAPgetContactNames.php", MAPrelation_getdetails_params, function(MAPrelation_getdetails_loader){	
        MAPrelation_getdetails_loader_json =JSON.parse( MAPrelation_getdetails_loader.xmlDoc.responseText ); 

		self.form[uid].setItemLabel("relationTypeId1",MAPrelation_getdetails_loader_json['contact'][1]);
			if(MAPrelation_getdetails_loader_json['contact'][2] != '' && MAPrelation_getdetails_loader_json['contact'][2] != 'Unknown Unknown'){
				self.form[uid].setItemLabel("relationTypeId2",MAPrelation_getdetails_loader_json['contact'][2]);
			}else{
				self.form[uid].hideItem("relationTypeId2");
				self.form[uid].hideItem("startdate_2");
				self.form[uid].hideItem("enddate_2");
			}
		  
		});
		if(task != 'Edit'){
	    self.form[uid].getCombo("relationTypeId1").loadXML("processors/MAPsecondary_relationships.php");
        self.form[uid].getCombo("relationTypeId2").loadXML("processors/MAPsecondary_relationships.php")
		} else{
		self.form[uid].getCombo("relationTypeId1").loadXML("processors/MAPsecondary_relationships.php?primary_rel_id=1");
        self.form[uid].getCombo("relationTypeId2").loadXML("processors/MAPsecondary_relationships.php?primary_rel_id=1")
		
			self.form[uid].setItemValue("connectionId",self.connectionid);
			self.form[uid].setItemValue("relConnId",self.grid[ gridid ].cells( self.grid[ gridid ].getSelectedRowId(),7).getValue());
			self.form[uid].setItemValue("relConnectionId1",self.grid[ gridid ].cells( self.grid[ gridid ].getSelectedRowId(),8).getValue());
			self.form[uid].setItemValue("relConnectionId2",self.grid[ gridid ].cells( self.grid[ gridid ].getSelectedRowId(),9).getValue());
			
		var MAPrelation_editdetails_params = "connectionId="+self.connectionid+"&ActualGrpId="+self.groupid+"&Edit=true&relConnId="+self.grid[ gridid ].cells( self.grid[ gridid ].getSelectedRowId(),7).getValue()+"&relConnectionId1="+self.grid[ gridid ].cells( self.grid[ gridid ].getSelectedRowId(),8).getValue()+"&relConnectionId2="+self.grid[ gridid ].cells( self.grid[ gridid ].getSelectedRowId(),9).getValue();
		dhtmlxAjax.post("processors/MAPedit_relationships_grid.php", MAPrelation_editdetails_params, function(MAPrelation_editdetails_loader){
			MAPrelation_editdetails_loader_json =JSON.parse( MAPrelation_editdetails_loader.xmlDoc.responseText ); 
			self.form[uid].getCombo("primaryRelationship").setComboValue(MAPrelation_editdetails_loader_json['details']['RelationshipSubTypeText']);
			self.form[uid].getCombo("relationTypeId1").setComboValue(MAPrelation_editdetails_loader_json['details']['RelTypeText1']);
			self.form[uid].getCombo("relationTypeId2").setComboValue(MAPrelation_editdetails_loader_json['details']['RelTypeText2']);
			self.form[uid].setItemValue("contact_name",MAPrelation_editdetails_loader_json['details']['RelContactName']);
			self.form[uid].setItemValue("combo1value",MAPrelation_editdetails_loader_json['details']['RelationshipSubTypeId']);
			self.form[uid].setItemValue("hRelationTypeId1",MAPrelation_editdetails_loader_json['details']['RelTypeid1']);
			self.form[uid].setItemValue("hRelationTypeId2",MAPrelation_editdetails_loader_json['details']['RelTypeid2']);
			self.form[uid].setItemValue("relConnId",MAPrelation_editdetails_loader_json['details']['RelConnId']);
			self.form[uid].setItemValue("relAction",'updated');
		    self.form[uid].setItemValue("relCustomTemplateForm","updated");
			if(MAPrelation_editdetails_loader_json['details']['start_date1'] != 'NoDate'){
				self.form[uid].setItemValue("startdate_1",MAPrelation_editdetails_loader_json['details']['start_date1']);
			}
			if(MAPrelation_editdetails_loader_json['details']['end_date1'] != 'NoDate'){
				self.form[uid].setItemValue("enddate_1",MAPrelation_editdetails_loader_json['details']['end_date1']);
			}
			if(MAPrelation_editdetails_loader_json['details']['start_date2'] != 'NoDate'){ 
				self.form[uid].setItemValue("startdate_2",MAPrelation_editdetails_loader_json['details']['start_date2']);
			}
			if(MAPrelation_editdetails_loader_json['details']['end_date2'] != 'NoDate'){ 
				self.form[uid].setItemValue("enddate_2",MAPrelation_editdetails_loader_json['details']['end_date2']);
			}
			
		});
		}
        
		self.editlayout[uid].progressOff();
	}
    ,initComponent : function() {
        var self = this;		
        self._window(self.connectionid);
		self._layout(self.connectionid);
		self._toolbar(self.connectionid);
		self._grid(self.connectionid);
    }	

	,datainit : function( MAPRelationshipComponentModel )
	{		
		var self = this;
		self.model = MAPRelationshipComponentModel;
		
	}
};
MAPRelationshipComponent.datainit( Model_MAPRelationshipComponentModel );