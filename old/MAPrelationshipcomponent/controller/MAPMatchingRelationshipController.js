var MAPRelationshipComponent = {
    /* properties */
    window_manager: null
    , 
    windows: []
    ,      
    relinfowindow : []
    ,
    status_bar: []
    ,      
    relinfo_status_bar: []
    , 
    toolbar: []
    ,
    relinfotoolbar: []
    ,
    layout: []
    , 
    relinfolayout: []
    ,   
    parent_connid : null
    ,
    relinfo_form: []
    ,
    ethnicities: []
    ,
    grid: []
    , 
    id: null
    ,
    uid : null
    ,
    configuration: []
    , 
    window_help: []
    ,
    formEdited : 0
    ,
    win_close_event : null
    ,
    selected_rel_contact_id : 0
    ,
    rel_type_id : null
    ,
    rel_sub_type_id : 1
    ,
    contact_status : 'new'
    /* methods */
    , 
    _window_manager: function()
    {
        var self = this;
        self.window_manager = new dhtmlXWindows();
        self.window_manager.setImagePath(self.model.model_globalImgPath);
    }
    , 
    _window: function() {

        var self = this;  
        self.windows[ self.uid ] = self.window_manager.createWindow('window_relationshipcomponent_' + self.uid, '0', '0', self.model.model_winHeight, self.model.model_winWidth);
        self.windows[ self.uid ].setText('Relationship');
        self.dhtmlxWidowCustomPostion(self.windows[ self.uid ],self.model.model_winTop);
        self.windows[ self.uid ].setModal(true);
        self.windows[ self.uid ].button('park').hide()
        self.windows[ self.uid ].setIcon(self.model.model_conf_window, self.model.model_conf_window);
        self.status_bar[ self.uid ] = self.windows[ self.uid ].attachStatusBar();
        self.status_bar[ self.uid ].setText("RelationShip List Loaded");
     
        self.windows[ self.uid ].attachEvent('onclose', function() {
            self.toolbar = [];
            self.layout = [];
            self.grid = [];
            return true;
        });
      
    }
    
    //Rel Info Window 
    , 
    _relinfowindow: function() {
        
        var self = this;
        self.parent_instance_variable.window[self.parent_instance_variable.uid].setModal(false);
        self.relinfowindow[ self.uid ] = self.window_manager.createWindow('window_rel_add_info' + self.uid, '0', '0', self.model.model_rel_win_width, self.model.model_rel_win_height);
        self.relinfowindow[ self.uid ].setText('Additional Information');
        self.relinfowindow[ self.uid ].setModal(true);
        self.dhtmlxWidowCustomPostion(self.relinfowindow[ self.uid ],self.model.model_edit_winTop);
        self.relinfowindow[ self.uid ].setModal(true);
        self.relinfowindow[ self.uid ].button('park').hide();
        self.relinfowindow[ self.uid ].button('minmax1').hide();
        self.relinfowindow[ self.uid ].setIcon(self.model.model_conf_window, self.model.model_conf_window);
        self.relinfo_status_bar[ self.uid ] = self.relinfowindow[ self.uid ].attachStatusBar();
        self.relinfo_status_bar[ self.uid ].setText("");
        self.win_close_event = self.relinfowindow[ self.uid ].attachEvent('onClose', function() {
            //  win.hide(); /* commented to resolve issue :other tab content getting appended to first tabe when closed and open second time */  
            if(self.formEdited == 1)
            {
                dhtmlx.message(
                {
                    title: self.relinfowindow[ self.uid ].getText(),
                    type:"confirm",
                    text: "Are you sure you want to close this window without saving the changes ?",
                    ok: "Yes",
                    cancel: "No",
                    callback: function(ok)
                    {
                        if(ok)
                        {	
                            self.relinfowindow[ self.uid ].detachEvent(self.win_close_event);			
                            self.relinfowindow[ self.uid ].close();
                            self.parent_instance_variable.window[self.parent_instance_variable.uid].setModal(true);
                            self.formEdited = 0;
                        }
                    }
                });
            }
            else
            {
                self.relinfowindow[ self.uid ].detachEvent(self.win_close_event);			
                self.relinfowindow[ self.uid ].close();
                self.parent_instance_variable.window[self.parent_instance_variable.uid].setModal(true);
            } 
        });
    }


    // layout
    , 
    _layout: function() {
        var self = this;
        if (self.useWindow === true) {
            self.layout[ self.uid ] = self.windows[ self.uid ].attachLayout(self.model.model_Layout.skin);
        } else {            
            self.layout[ self.uid ] = self.parentDIVId;
        }

        self.layout[ self.uid ].cells("a").hideHeader();
        self.layout[ self.uid ].progressOn();
    }
  
    , 
    // layout
    _relinfolayout: function() {
        var self = this;
        self.relinfolayout[ self.uid ] = self.relinfowindow[ self.uid ].attachLayout(self.model.model_Layout.skin);
        self.relinfolayout[ self.uid ].cells("a").hideHeader();
    // self.editlayout[ self.uid ].progressOn();
    }
    ,
    loadValues: function(c) {
        var self = this;
        
        if( (typeof c.application_path === 'undefined') ||  (c.application_path.length === 0)){
            dhtmlx.message( {
                type : "error", 
                text : "application_path is missing"
            } );
            return;
        }
        if (typeof c.parent_connid !== 'undefined') {           
           
            self.uid = c.parent_connid; 
            self.parent_connid = c.parent_connid;
            self.parent_instance_variable = c.parent_instance_variable;
            self.useWindow = c.useWindow;
            self.parentDIVId = c.parentDIVId;
            self.application_path = c.application_path;
            self.dhtmlx_codebase_path = c.dhtmlx_codebase_path;
            self.ethnicities = c.ethnicities;
            self.rel_type_id = c.rel_type_id; 
          //  console.log("Component Input parameters : "+c);
          
            self.model.model_globalImgPath  =   c.application_path + "icons/";
           
            if(c.window_managerObj !== null)
                self.window_manager = c.window_managerObj;
        
        }
        else
        {
            dhtmlx.alert({
                title: "Alert", 
                type: "alert-error", 
                text: "Configuration parameters missing.Please contact your Agency Administrator"
            });
        }
    }
   
    , 
    _relinfotoolbar: function() {
        var self = this,rel_data_post_params ='';
        self.relinfotoolbar[ self.uid ] = self.relinfowindow[ self.uid ].attachToolbar(  );
        self.relinfotoolbar[ self.uid ].setIconsPath(self.model.model_globalImgPath);

        var addcontactToolbarXML = CAIRS.xml.serialize(CAIRS.xml.fromJSON(self.model.model_conf_toolbar_relinfo.items));
			
        self.relinfotoolbar[ self.uid ].loadXMLString(addcontactToolbarXML);
        self.relinfotoolbar[ self.uid ].setSkin(self.model.model_globalSkin);
        self.relinfotoolbar[ self.uid ].attachEvent("onClick", function(id) {
        if (id == "relinfo_save") {
                if (self.formEdited == 1) {
                self.layout[ self.uid ].cells("a").progressOn();                
                self.relinfo_form[ self.uid ].send(self.application_path + "processors/MAPRel_process_data.php", "post", function (loader) {
                        try {
                            var json = JSON.parse(loader.xmlDoc.responseText);
                            if (json.status == "success") {
                                self.grid[ self.uid ].loadXML(self.application_path + "processors/MAPRel_grid_read.php?parent_connid="+self.parent_connid);
                                dhtmlx.message({
                                    text: "Additional information saved successfully"
                                });

                                self.formEdited = 0;
                            } else {
                                dhtmlx.message({
                                    type: "error",
                                    text: json.response
                                });

                            }
                            self.layout[ self.uid ].cells("a").progressOff();
                        } catch (e) {
//                            dhtmlx.message({
//                                type: "error",
//                                text: "Fatal error encountered.Please contact the support team"
//                            });
                        }
                    });
                } 
            else {
                dhtmlx.message({
                    type: "error",
                    text: "There are no changes to be saved"
                }); 
                }
            }
            if (id == 'relinfo_close') {
                self.relinfowindow[ self.uid ].close();
            }

        });
    }
    ,
    _showHelp: function() {
        var self = this;
        if (self.window_manager.isWindow("help_phone_window_" + uid)) {
            self.window_help[ self.uid ].show();
            self.window_help[ self.uid ].bringToTop();
            return;
        }
        self.window_help[ self.uid ] = self.window_manager.createWindow("help_phone_window_" + uid, 410, 15, 700, 400);
        self.dhtmlxWidowCustomPostion(self.window_help[ self.uid ],self.model.model_help_winTop);
        self.window_help[ self.uid ].setText("End user manual");
        self.window_help[ self.uid ].setIcon("help.png", "help_dis.png");
        self.window_help[ self.uid ].attachURL(self.application_path + "docs/end_user_manual");
    }
    //toolbar
    , 
    _toolbar: function()
    {
        var self = this,rel_data_post_params='';
        self.toolbar[ self.uid ] = self.layout[ self.uid ].cells("a").attachToolbar(  );
        self.toolbar[ self.uid ].setIconsPath(self.model.model_globalImgPath);  

        var addcontactToolbarXML = CAIRS.xml.serialize(CAIRS.xml.fromJSON(self.model.model_conf_Toolbar_addcontact.items));
			 
        self.toolbar[ self.uid ].loadXMLString(addcontactToolbarXML);
        self.toolbar[ self.uid ].setSkin(self.model.model_globalSkin);

        self.toolbar[ self.uid ].disableItem("PersonalRelationships_update_add_info");
        self.toolbar[ self.uid ].disableItem("PersonalRelationships_delete");
        self.toolbar[ self.uid ].disableItem("PersonalRelationships_edit");
    
        self.toolbar[ self.uid ].attachEvent("onClick", function(id) { 
            if(MAPPermissions.checkAccessPermission(id)!=1){  

                    var selected_row_id = self.grid[ self.uid ].getSelectedRowId();
                  
                    if (id == "PersonalRelationships_delete") {
                  
                     if(selected_row_id && selected_row_id != "NoData"){ 
                        dhtmlx.confirm({
                            title: "Delete Relationship",
                            type: "confirm-warning",
                            text: "<img src='../../auxiliary/DHTMLXmessage/codebase/img/alert_medium.png'> Are you sure you want to delete this relationship ?",
                            callback: function(result) {
                                if (result == true) {
                                    self.layout[ self.uid ].progressOn();
                                    var relConnectionId = self.grid[ self.uid ].cells(self.grid[ self.uid ].getSelectedRowId(), 6).getValue();
                                    var action = 'delete',data_type = 'contact_data'  ;                        
                                    rel_data_post_params = "rel_connectionid="+relConnectionId+"&action="+action+"&data_type="+data_type;

                                    dhtmlxAjax.post(self.application_path +"processors/MAPRel_process_data.php", rel_data_post_params, function(loader){ 
                                         self.layout[ self.uid ].progressOn();
                                         self.grid[ self.uid ].loadXML(self.application_path + "processors/MAPRel_grid_read.php?parent_connid="+self.parent_connid);
                                            dhtmlx.message({
                                                text: "Relationship deleted"
                                            });  
                                        });
                                }
                            }
                            });
                            }
                        else{
                            dhtmlx.message({
                                type: "error",
                                text: "Please select a record"
                                }); 
                            }
                    }
                  if(id == "PersonalRelationships_edit"){
                    if(selected_row_id && selected_row_id != "NoData"){  
                        self.contact_status = 'edit';
                        self._opencontact(); 
                        }
                      else{
                            dhtmlx.message({
                                type: "error",
                                text: "Please select a record"
                                }); 
                          }
                    }
                    
                  if (id == "PersonalRelationships_update_add_info"){
                      if(selected_row_id && selected_row_id != "NoData"){  
                        self._relinfowindow();
                        self._relinfolayout();
                        self._relinfotoolbar();
                        self._rel_additional_info_form();
                         }
                    else{
                        dhtmlx.message({
                            type: "error",
                            text: "Please select a record"
                            }); 
                        }
                    }
                }
                
                
             /*   if (id == "PersonalRelationships_help") {
                    self._showHelp();
                } */
                
               
                if (id == "PersonalRelationships_new") { 
                    self.contact_status = 'new';
                    self._opencontact();  
                }
                if (id == 'PersonalRelationships_close') {
                    self.windows[ self.uid ].close();
                }
            
        });

    }

    //Grid
    , 
    _grid: function() {
        var self = this;

        self.grid[ self.uid ] = self.layout[ self.uid ].cells("a").attachGrid();
        self.grid[ self.uid ].selMultiRows = false;
        self.grid[ self.uid ].setImagePath("../../auxiliary/dhtmlxfull3.5/imgs/");
        
        self.grid[ self.uid ].setColSorting("str,str,str,str,str"); 
        self.grid[ self.uid ].enableColSpan(true);
        self.grid[ self.uid ].enableAutoWidth(true);
        self.grid[ self.uid ].enableMultiline(true);
        self.grid[ self.uid ].init();
        self.layout[ self.uid ].progressOn();
        self.grid[ self.uid ].loadXML(self.application_path + "processors/MAPRel_grid_read.php?parent_connid="+self.parent_connid);
          
        self.grid[ self.uid ].attachEvent("onRowDblClicked", function(rowId, cellInd) {
            if(rowId != "NoData"){
                var selected_row_id = rowId;
                self.selected_rel_contact_id = self.grid[ self.uid ].cells(selected_row_id,5).getValue();
                self.contact_status = 'edit';
                self._opencontact();
            }

        });        
        
        self.grid[ self.uid ].attachEvent("onRowSelect", function(rowId, cellInd) {     
            
            if(rowId != "NoData"){
                var selected_row_id = rowId;
                self.selected_rel_contact_id = self.grid[ self.uid ].cells(selected_row_id,5).getValue();
                self.toolbar[ self.uid ].enableItem("PersonalRelationships_update_add_info");
                self.toolbar[ self.uid ].enableItem("PersonalRelationships_delete");
                self.toolbar[ self.uid ].enableItem("PersonalRelationships_edit");  
            }
            else{
                self.toolbar[ self.uid ].disableItem("PersonalRelationships_update_add_info");
                self.toolbar[ self.uid ].disableItem("PersonalRelationships_delete");
                self.toolbar[ self.uid ].disableItem("PersonalRelationships_edit");  
            }
            
        });
        
        self.grid[ self.uid ].attachEvent("onXLE", function(grid_obj, count) {
           
            var first_row_id = self.grid[ self.uid ].getRowId(0);            
                      
            if(first_row_id == "NoData"){
               // self.grid[ self.uid ].detachHeader();
                self.toolbar[ self.uid ].disableItem("PersonalRelationships_update_add_info");
                self.toolbar[ self.uid ].disableItem("PersonalRelationships_delete");
                self.toolbar[ self.uid ].disableItem("PersonalRelationships_edit");  
            }
            else{
                self.toolbar[ self.uid ].enableItem("PersonalRelationships_update_add_info");
                self.toolbar[ self.uid ].enableItem("PersonalRelationships_delete");
                self.toolbar[ self.uid ].enableItem("PersonalRelationships_edit"); 
            }
            
            self.layout[ self.uid ].progressOff();
        });

    }
    // form to load additional information
    ,     
    _rel_additional_info_form: function(){
        var self = this, ethnicity_ids = '' , type_of_child ='', ethnicity_id_array = [],type_of_child_rec_id = 0; 
        
        self.relinfo_form[ self.uid ] = self.relinfolayout[ self.uid ].cells("a").attachForm(self.model.additional_info_form.template);        
        self.relinfo_form[ self.uid ].setItemValue('rel_contactid',self.selected_rel_contact_id);
        type_of_child_rec_id = self.grid[ self.uid ].cells(self.grid[ self.uid ].getSelectedRowId(), 8).getValue();
        if(type_of_child_rec_id != 0){
            self.relinfo_form[ self.uid ].setItemValue('extra_info_rec_id',type_of_child_rec_id);
        }
      
        /**load Ethnicities multi select options*****/
        
       var rel_ethnicity_multiselect = self.relinfo_form[ self.uid ].getOptions('rel_ethnicities');
    
         
        for(var index in self.ethnicities)
        {
            if (self.ethnicities.hasOwnProperty(index)) 
            {
                try
                {
                    if ( self.ethnicities[index].ethnicity_id )
                    {
                    rel_ethnicity_multiselect.add(new Option(self.ethnicities[index].ethnicity_name,self.ethnicities[index].ethnicity_id));            
                    }
                }
                catch(e)
                {
                //console.log(e.stack)
                }
            }
        }
        
        //set form values in case of edit
        ethnicity_ids = self.grid[ self.uid ].cells(self.grid[ self.uid ].getSelectedRowId(), 7).getValue();
        type_of_child = self.grid[ self.uid ].cells(self.grid[ self.uid ].getSelectedRowId(), 4).getValue();
      
        if(ethnicity_ids){
             ethnicity_id_array = ethnicity_ids.split(",");
             self.relinfo_form[ self.uid ].setItemValue("rel_ethnicities",ethnicity_id_array);
            }
        if(type_of_child){
             self.relinfo_form[ self.uid ].setItemValue("rel_type_of_child",type_of_child);
            }
        
        
        self.relinfo_form[ self.uid ].attachEvent("onChange", function(name_input, value_input){
            self.formEdited = 1;
        }); 
    }
    ,  
    // open the contact component
    _opencontact : function(){
        var self = this;
     
        if(self.contact_status == 'new'){          
            add_contactcomponent_func('0','New_Contact_Inserts','MAPMatchingSystem','Client1',0,'','','',self.window_manager,'',self);
        }
        else { 
            add_contactcomponent_func(self.selected_rel_contact_id,'Edit_New_Contact_Inserts','MAPMatchingSystem','Client1',0,'','','',self.window_manager,'',self);
        }
    }
    ,
    
    relationship_grid_update : function (response){        
    
        var self = response.parent_self_variable,rel_data_post_params='';   

        if(self.contact_status == 'new'){ 
            var today_date = new Date();
            var month = today_date.getMonth() + 1;
            var date_seed = month + '-' + today_date.getDate() + '-' + today_date.getFullYear();
         
            //51 for local,62 in ROLESQA and SDC
            var action = 'insert',data_type = 'contact_data' ,old_rel_connid='',rel_connectionid='';
            console.log("Child In Home Relationship Type Id"+self.rel_type_id);
            if(!self.rel_type_id){
                self.rel_type_id = 62;
            }
            
            rel_data_post_params = "rel_sub_type_id="+self.rel_sub_type_id+"&rel_type_id="+self.rel_type_id+"&start_date ="+date_seed+"&rel_connid="+response.UserReturnID+"&parent_connid="+self.uid+"&old_rel_connid="+old_rel_connid+"&rel_connectionid="+rel_connectionid+"&action="+action+"&data_type="+data_type;

            dhtmlxAjax.post(self.application_path +"processors/MAPRel_process_data.php", rel_data_post_params, function(loader){    
               /*     dhtmlx.message({
                        text: "Saved Successfully"
                    });     */       
                });
        }
        self.layout[ self.uid ].progressOn();
        self.grid[ self.uid ].loadXML(self.application_path + "processors/MAPRel_grid_read.php?parent_connid="+self.parent_connid);	
    }
    , 
  
   
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
    , 
    initComponent: function() {
        var self = this;
        
        if (self.useWindow === true) {
            self._window();
        }
        self._layout();
        self._toolbar();
        self._grid();
    }

    , 
    datainit: function(MAPRelationshipComponentModel)
    {
        var self = this;
        self.model = MAPRelationshipComponentModel;

    }
};
MAPRelationshipComponent.datainit(Model_MAPRelationshipComponentModel);