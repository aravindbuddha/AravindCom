var FormBuilder = {
 	appName : "FormBuilder"
		
	,version : 0.1
	
    ,uid : null
 
    ,window_manager : null
	
	,data_store : []
	
	,gridQString : [] //we'll save here the last url with query string we used for loading grid (see step 5 for details) we'll use this script block for functions
 
    ,window : []
    ,layout : []
    ,toolbar : []
    ,grid : []
	,status_bar : []
	
	,status_bar_paging : []
	
	,window_form : []
    ,layout_form : []
	,tabbar_form : []
    ,toolbar_form : []
	,status_bar_form : []
	,form_properties : []
	
	,layout_form_layout : []
	,layout_form_layout_left : []
	,layout_form_layout_right : []
	
	,status_bar_paging_library_fields : []
	,status_bar_paging_group_fields : []
	,status_bar_layout_form_layout_left_a : []
	,status_bar_layout_form_layout_left_b : []

	,toolbar_form_pages : []
	,grid_pages : []
	
	,tabbar_form_fields : []
	,toolbar_form_fields : []
	,grid_form_fields : []
	
	,tabbar_form_create_fields : []
	,tabbar_form_add_field : []
	,form_custom_field : []
	,toolbar_custom_field : []
	,tabbar_form_library_fields : []
	,form_tags : []
	,status_bar_tags : []
	,toolbar_tags : []
	,tree_form_library_field_category : []
	,grid_library_fields : []
	,dataView_type_of_fields : []
	,form_field_propertie : []
	,toolbar_field_propertie : []
	,toolbar_grid_field_propertie_options : []
	,pop_up_grid_field_propertie_options : []
	,form_grid_field_propertie_options : []
	
	,form_preview : []
	
	,grid_group_fields : []	
	
	,dataLoaded_tree_form_library_field_category : []
	,dataLoaded_tags_form : []
	
	,pages : []
	,selected_page : []
 	,is_grid_pages : []
	
	,form_default_width : 720
	
    ,configuration : []
 
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
 
 
        if(self.window_manager.isWindow( "window_FormBuilder_" + uid ))
 
        {
            self.window[ uid ].show();
            self.window[ uid ].bringToTop();
            return;
        }
        self.window[ uid ] = self.window_manager.createWindow( "window_FormBuilder_" + uid, self.model.conf_window.left + 10, 
                self.model.conf_window.top + 10, self.model.conf_window.width, self.model.conf_window.height );
        self.window[ uid ].setText( self.model.text_labels.main_window_title );
        self.window[ uid ].setIcon( self.model.conf_window.icon, self.model.conf_window.icon_dis );
         
 
        self.window[ uid ].attachEvent("onClose", function(win)
        {
			dhtmlx.skin = "dhx_skyblue";
			self.model.conf_form_preview.template = [self.model.conf_form_preview.defaultRootProperties];
			return true;
        });

        self.status_bar[ uid ] = self.window[ uid ].attachStatusBar();
		self.status_bar[ uid ].setText("<div id='status_info'>Initializing Form Maker</div><div id='user_info'><img id='user_info_status' src='icons/offline.png' /> <span>Not authorized yet</span></div><div id='data_transfer_info'> no data transferred</div><div id='errors_info'>no errors</div>");
    }
 
    ,_layout : function( uid )
    {
        var self = this;
       
	   	if( self.configuration[ uid ].container )
		{
			self.layout[ uid ] = new dhtmlXLayoutObject(self.configuration[ uid ].container, self.model.conf_layout.pattern);
			self.status_bar[ uid ] = self.layout[ uid ].attachStatusBar();
			self.status_bar[ uid ].setText("<div id='status_info'>Initializing Form Maker</div><div id='user_info'><img id='user_info_status' src='icons/offline.png' /> <span>Not authorized yet</span></div><div id='data_transfer_info'> no data transferred</div><div id='socket_info' class='data_transfer_info'>socket: disconnected</div><div id='errors_info'>no errors</div>");
		}
		else
		{
			self.layout[ uid ] = self.window[ uid ].attachLayout( self.model.conf_layout.pattern );
		}
	   
	    
		self.layout[ uid ].cells("a").hideHeader();
		self.status_bar_paging[ uid ] = self.layout[ uid ].cells("a").attachStatusBar();
		self.status_bar_paging[ uid ].setText("<div id='recinfoArea'></div>");
    }
 
    ,_toolbar : function( uid )
    {
        var self = this;
 
        self.toolbar[ uid ] = self.layout[ uid ].cells("a").attachToolbar( self.model.conf_toolbar );
	 	self.toolbar[ uid ].setIconSize(32);
        self.toolbar[ uid ].attachEvent("onClick", function(id)
        {   
            if(id == "new_form")
            {
				 self._mountFormBuilderScreen( uid );
            }
			else if(id == "delete_form")
            {
				self._deleteForm( uid );
				
				
				 
            }
        });
    }
 
    ,_grid : function( uid )
    {
        var self = this;
        self.grid[ uid ] = self.layout[ uid ].cells("a").attachGrid( self.model.conf_grid );
        self.grid[ uid ].setHeader( self.model.conf_grid.headers );
		self.grid[ uid ].setColumnIds( self.model.conf_grid.ids );
        self.grid[ uid ].setInitWidths( self.model.conf_grid.widths );
        self.grid[ uid ].setColAlign( self.model.conf_grid.colaligns );
        self.grid[ uid ].setColTypes( self.model.conf_grid.coltypes );
        self.grid[ uid ].setColSorting( self.model.conf_grid.colsorting );
        self.grid[ uid ].selMultiRows = true;
        self.grid[ uid ].setDateFormat("%m-%d-%Y");
		
		self.grid[ uid ].enablePaging(true, 100, 10, "recinfoArea", true);
		
		self.grid[ uid ].setPagingSkin("toolbar", "dhx_skyblue");
		
		self.grid[ uid ].init();
		
		var agencies_combo = self.grid[ uid ].getCombo( self.grid[ uid ].getColIndexById( "form_agency_id" ) );
		self.data_store[ uid ][ "agencies" ].forEach( function(agency, index, array_)
		{
			agencies_combo.put(agency.agency_id, agency.agency_name);
		});
		
		self.grid[ uid ].attachHeader("<input id='input_search_formlabel' type='text' style='width: 99%; border:1px solid gray;' onClick='(arguments[0]||window.event).cancelBubble=true;' onKeyUp='FormBuilder._feedGrid( \""+uid+"\" )'>,<input id='input_search_formname' type='text' style='width: 99%; border:1px solid gray;' onClick='(arguments[0]||window.event).cancelBubble=true;' onKeyUp='FormBuilder._feedGrid( \""+uid+"\" )'>,<input id='input_search_formtext' type='text' style='width: 99%; border:1px solid gray;' onClick='(arguments[0]||window.event).cancelBubble=true;' onKeyUp='FormBuilder._feedGrid( \""+uid+"\" )'>,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan");
		
		self.grid[ uid ].attachEvent("onXLS", function() {
        	self.progressOn( uid );
		});
		self.grid[ uid ].attachEvent("onXLE", function() {
			self.progressOff( uid );
		});
         
        self.grid[ uid ].attachEvent("onRowSelect", function( id, ind )
        {
             self.toolbar[ uid ].enableItem("delete_form");
        });
		
		self.grid[ uid ].attachEvent("onRowDblClicked", function( id, ind )
		{
			self._mountFormBuilderScreen( uid, id );
		});
		
		self.grid[ uid ].attachEvent("onRowDblClicked", function( id, ind )
		{
			self._mountFormBuilderScreen( uid, id );
		});
		
		self.grid[ uid ].attachEvent("onKeyPress", function(code,cFlag,sFlag)
		{
			if( code == 46 )
			{
				self._deleteForm( uid );
			}
			return true;
		});
		
		self.grid[ uid ].attachEvent("onEnter", function(id,ind){
			self._mountFormBuilderScreen( uid, id );
			return true;
		});
		
		
		
		self.grid[ uid ].attachEvent("onBeforeSorting", function( ind, type, direction)
		{
			if( direction == "des" ) 
				direction = "DESC";
			else
				direction = "ASC";
			self._feedGrid( uid, { direction : direction, orderby : self.model.conf_grid.ids.split(",")[ ind ]} );
			self.grid[ uid ].setSortImgState(true, ind, direction);
			return false;
        });
    }
	
	
	,_feedGrid : function( uid, objOrder )
	{
		var self = this, objFilter = {}, objOrder = objOrder || {};
		
		self.grid[ uid ].clearAll();
		self.toolbar[ uid ].disableItem("new_form");
		self.toolbar[ uid ].disableItem("delete_form");
		
		if( document.querySelector("#input_search_formlabel").value != "" )
			objFilter[ "formlabel" ] = document.querySelector("#input_search_formlabel").value;
		
		if( document.querySelector("#input_search_formname").value != "" )
			objFilter[ "formname" ] = document.querySelector("#input_search_formname").value;
		
		if( document.querySelector("#input_search_formtext").value != "" )
			objFilter[ "formtext" ] = document.querySelector("#input_search_formtext").value;
				
		
		var gridURL = CAIRS.MAP.API.getMappedURL( {
				resource : "/dhtmlx/grid/feed",  // mandatory
				responseType : "json", // not mandatory, default json
				params : "table_name=formmaker_properties&primary_key=form_id&columns=" + self.model.conf_grid.ids 
				+ "&filter=" + JSON.stringify( objFilter ) 
				+ "&order=" + JSON.stringify( objOrder ) // mandatory for this API End Point ( /dhtmlx/grid/feed.json )
		} );
		
		self._setStatusDataTransfer("requesting forms data", true);
		self.grid[ uid ].load( gridURL, function()
		{
			self._setStatusDataTransfer("forms available");
			self.progressOff( uid );
			self.toolbar[ uid ].enableItem("new_form");
		}, "json");
	}
 	
	
	/* window create form*/
	
	,_window_form : function( uid, form_id )
    {
        var self = this;
 
        if(self.window_manager === null)
            self._window_manager(  );
 
        if( self.window_manager.isWindow( "window_FormBuilder_formcreator_" + uid + "_" + form_id ) )
        {
            self.window_form[ uid ].show();
            self.window_form[ uid ].bringToTop();
            return;
        }
        self.window_form[ uid ] = self.window_manager.createWindow( 
			"window_FormBuilder_formcreator_" + uid + "_" + form_id
			,self.model.conf_window_form.left + 10
			,self.model.conf_window_form.top + 10
			,self.model.conf_window_form.width
			,self.model.conf_window_form.height
		);
        
		if( form_id == -1 )
			 self.window_form[ uid ].setText( self.model.conf_window_form.title );
		else
			self.window_form[ uid ].setText( "Edit form" );
		
		self.window_form[ uid ].setIcon( 
			self.model.conf_window_form.icon
			,self.model.conf_window_form.icon_dis
		);
        self.window_form[ uid ].attachEvent("onClose", function( win )
        {
			dhtmlx.skin = "dhx_skyblue";
			self.model.conf_form_preview.template = [self.model.conf_form_preview.defaultRootProperties];
			return true;
        });
        self.status_bar_form[ uid ] = self.window_form[ uid ].attachStatusBar();
		self.status_bar_form[ uid ].setText("<div class='status_info' id='formbuilder_status_info_"+uid+"'>Initializing FormBuilder interface</div><div class='user_info' id='formbuilder_user_info_"+uid+"'><img class='user_info_status' id='formbuilder_user_info_status_"+uid+"' src='icons/online.png' /> <span>Logged as " + CAIRS.MAP.API.user +"</span></div><div class='data_transfer_info' id='formbuilder_data_transfer_info_"+uid+"'> loading form data</div><div class='errors_info'>no errors</div>");
    }
 
    ,_layout_form : function( uid )
    {
        var self = this;
        self.layout_form[ uid ] = self.window_form[ uid ].attachLayout( self.model.conf_layout_form.pattern );
		self.layout_form[ uid ].cells("a").hideHeader();
    }
	
	,_tabbar_form : function( uid, form_id )
    {
        var self = this;
        
		try
		{
			self.tabbar_form[ uid ] = self.layout_form[ uid ].cells("a").attachTabbar(  );
			self.tabbar_form[ uid ].setSkin('dhx_skyblue');
			self.tabbar_form[ uid ].setImagePath( self.model.conf_tabbar_form.image_path ); // self.configuration[ uid ].application_path
			self.tabbar_form[ uid ].enableScroll( true );
			self.tabbar_form[ uid ].addTab("form_properties", "Form properties", "200px");
			self.tabbar_form[ uid ].addTab("form_layout", "Form layout", "200px");
			self.tabbar_form[ uid ].addTab("form_preview", "Preview", "200px");
			
			self.tabbar_form[ uid ].setTabActive("form_properties");
			self.tabbar_form[ uid ].attachEvent("onSelect", function( idd, last_id )
			{
				dhtmlx.skin = "dhx_skyblue";
				if ( idd == "form_properties") {
					return true;
				}
				else
				{
					form_id = self.form_properties[ uid ].getItemValue( "form_id" );
					if( form_id > 0 )
					{
						if( idd == "form_preview") self._startPreview( uid );
						return true;
					}
					else
					{
						dhtmlx.message(
						{
							title : "Save form",
							type :"confirm",
							text : "You need to save the form before proceed. Do you want to save the form",
							ok : "Save",
							cancel : "Cancel",
							callback: function( ok )
							{
								if(ok)
								{
									
									self._save_form( uid, function(){
										if( idd == "form_preview") self._startPreview( uid );
										self.tabbar_form[ uid ].setTabActive( idd );
									}, form_id )

									
								}
								else
								{
									self.tabbar_form[ uid ].setTabActive( "form_properties" );
								}
							}
						});
					}
				}
				return true;
			});
		}catch(e)
		{
			//console.log("tab : " + e.message);
		}
		
    }
	
	,_form_properties : function( uid, form_id )
    {
        var self = this;
		self.form_properties[ uid ] = self.tabbar_form[ uid ].cells("form_properties").attachForm( self.model.conf_form_properties.template );
		
		CAIRS.dhtmlx.prepareForm( uid, self.model.conf_form_properties, self.form_properties[ uid ] );		
		
		//console.log( uid );
		
		self.form_properties[ uid ].setItemValue( "form_agency_id",  self.configuration[ uid.replace(new RegExp("_" + form_id,"g"),"") ].agency_id );
		
		if( form_id < 1 )
		{
			self.form_properties[ uid ].setItemValue( "form_id",  -1 );
		}
		else
		{
			self.form_properties[ uid ].setItemValue( "form_id",  form_id );
		}
		
		
		self.form_properties[ uid ].getInput("formlabel").onkeyup = function(event)
		{
			self.form_properties[ uid ].getInput("formname").value = self.handleFormName( uid, this.value);
		};
		
		//form_agency_id
    }
 
    ,_toolbar_form : function( uid, form_id )
    {
        var self = this;
 
        self.toolbar_form[ uid ] = self.tabbar_form[ uid ].cells("form_properties").attachToolbar( self.model.conf_toolbar_form );
		self.toolbar_form[ uid ].setIconSize(32);
        self.toolbar_form[ uid ].attachEvent("onClick", function(id)
        {   
            if(id == "save_form")
			{
				self._save_form( uid, function(){
				
				}, form_id );
            }
        });
    }
	
	,_layout_form_layout : function( uid )
    {
        var self = this;
        self.layout_form_layout[ uid ] = self.tabbar_form[ uid ].cells("form_layout").attachLayout( self.model.conf_layout_form_layout.pattern );
		self.layout_form_layout[ uid ].cells("a").setWidth(660);
    }
	
	,_layout_form_layout_left : function( uid )
    {
        var self = this;
        self.layout_form_layout_left[ uid ] = self.layout_form_layout[ uid ].cells("a").attachLayout( self.model.conf_layout_form_layout_left.pattern );
		self.layout_form_layout_left[ uid ].cells("a").setText("Pages of the form");
		self.layout_form_layout_left[ uid ].cells("b").setText("Fields of the page");
		
		//self.layout_form_layout_left[ uid ].cells("b").collapse();
		
		self.layout_form_layout_left[ uid ].cells("b").setHeight(330);
		
		self.status_bar_layout_form_layout_left_a[ uid ] = self.layout_form_layout_left[ uid ].cells("a").attachStatusBar();
		self.status_bar_layout_form_layout_left_a[ uid ].setText("<div class='red_warning'> <img src ='" + self.model.conf_window.image_path + "warning4.png'> 1 - Select a page on the above grid first before adding fields.</div><div class='normal_warning' id='page_info_" + uid + "'></div>");
		
		self.status_bar_layout_form_layout_left_b[ uid ] = self.layout_form_layout_left[ uid ].cells("b").attachStatusBar();
		self.status_bar_layout_form_layout_left_b[ uid ].setText("<div class='red_warning'> <img src ='" + self.model.conf_window.image_path + "warning4.png'> 2 - Drop pre defined fields, library fields, group of fields, or create a custom field on the above grid.</div>");
		
    }
	
	,_layout_form_layout_right : function( uid )
    {
        var self = this;
        self.layout_form_layout_right[ uid ] = self.layout_form_layout[ uid ].cells("b").attachLayout( self.model.conf_layout_form_layout_right.pattern );
		self.layout_form_layout_right[ uid ].cells("a").setText("Library fields");
		//self.layout_form_layout_right[ uid ].cells("b").setText("Group of fields");		
    }
	
	,_grid_pages : function( uid )
    {
        var self = this;
        self.grid_pages[ uid ] = self.layout_form_layout_left[ uid ].cells("a").attachGrid( self.model.conf_grid_pages );
        self.grid_pages[ uid ].setHeader( self.model.conf_grid_pages.headers );
		self.grid_pages[ uid ].setColumnIds( self.model.conf_grid_pages.ids );
        self.grid_pages[ uid ].setInitWidths( self.model.conf_grid_pages.widths );
        self.grid_pages[ uid ].setColAlign( self.model.conf_grid_pages.colaligns );
        self.grid_pages[ uid ].setColTypes( self.model.conf_grid_pages.coltypes );
        self.grid_pages[ uid ].setColSorting( self.model.conf_grid_pages.colsorting );
        //self.grid_pages[ uid ].selMultiRows = true;
        self.grid_pages[ uid ].setDateFormat("%m-%d-%Y");
		self.grid_pages[ uid ].enableDragAndDrop( true );
		self.grid_pages[ uid ].enableEditEvents(false,false,false);
		self.grid_pages[ uid ].init();
		
		var layout_combo = self.grid_pages[ uid ].getCombo( self.grid_pages[ uid ].getColIndexById( "page_layout" ) );
		layout_combo.put("S", "single");
		layout_combo.put("D", "double");
		
		self.grid_pages[ uid ].attachEvent("onXLS", function() {
        	self.progressOn( uid );
		});
		self.grid_pages[ uid ].attachEvent("onXLE", function() {
			self.progressOff( uid );
		});
         
        self.grid_pages[ uid ].attachEvent("onRowSelect", function( id, ind )
        {
			try{self.pop_up_grid_field_propertie_options[ uid ].hide()}catch(e){};
			self.layout_form_layout_left[ uid ].cells("b").expand();
			self.toolbar_form_pages[ uid ].enableItem("delete_page");
			self.toolbar_form_pages[ uid ].enableItem("edit_page");
			
			self.setPageStatusInfo( uid,"selected page: " + self.grid_pages[ uid ].cells(id, "0").getValue() );
			
			self.selected_page[ uid ] = id;
			
			try
			{
				 self.layout_field_propertie[ uid ].cells("b").collapse();
				 /*self.toolbar_grid_field_propertie_options[ uid ].unload();
				 self.toolbar_grid_field_propertie_options[ uid ] = null;
				 
				 delete  self.toolbar_grid_field_propertie_options[ uid ];
				 
				 self.grid_field_propertie_options[ uid ].clearAll();
				 self.grid_field_propertie_options[ uid ].destructor();
				 
				 delete  self.grid_field_propertie_options[ uid ];*/
			 
			}
			catch(e){};
			 
			try
			{
				self.tabbar_form_create_fields[ uid ].setTabActive("add_field");
				self.tabbar_form_create_fields[ uid ].hideTab("field_properties");
				self.tabbar_form_add_field[ uid ].setTabActive("predefined_fields");
			}
			catch(e){};
			 
			self._feedGrid_form_fields( uid, id );
        });
		
		
		
		
		self.grid_pages[ uid ].attachEvent("onDrop", function( sId,tId,dId,sObj,tObj,sCol,tCol )
		{
			self._reOrderPages( uid );
			return true;
		});
		
		
		self.grid_pages[ uid ].attachEvent("onDrag", function( sId, tId, sObj, tObj, sInd, tInd )
		{
			
			if(typeof sObj.entBox === 'undefined')
			{
				return false;
			}
			
			if(tObj.entBox.id == sObj.entBox.id)
				return true;
			else if( tId && sObj === self.grid_form_fields[ uid ] )
			{
				var page_id_target = tId;
				var field_id = sId;
				console.log("move to a new page");
				console.log( field_id );
				
				var field = self._getPageField( uid, self.selected_page[ uid ], field_id );
				field.page_id = page_id_target;
				
				
				
				console.log( self._getPageField( uid, self.selected_page[ uid ], field_id ) );
				
				self._deletePageField( uid, self.selected_page[ uid ], field_id, true );
				console.log( "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" );
				console.log( field );
				console.log( field["type"] );
				console.log( field["type_standard"] ); // T
				
				
				var type_MAP_standard = field["type_standard"];
				var type_DHTMLX_standard = field["type"];
				
				field[ "type_standard" ] = type_DHTMLX_standard;
				field[ "type" ] = type_MAP_standard;
				field[ "page_id" ] = page_id_target;
				
				console.log( field[ "type" ] );
				
				self._putFieldOnMemory( uid, page_id_target, field, function( )
				{
					
					
					
					//console.log( field_id );
					//console.log( self.selected_page[ uid ] );
					//console.log( page_id_target );
					console.log( "............................" );
					console.log( self._getPageField( uid, page_id_target, field_id ) );
					console.log( type_DHTMLX_standard );
					
					//self._getPageField( uid, page_id_target, field_id )["type"] = type_DHTMLX_standard;
					
					var field = self._getPageField( uid, page_id_target, field_id );
					field["page_id"] = page_id_target;
					field["field_id"] = field_id;
					field["type"] = type_DHTMLX_standard;
					field["type_standard"] = type_MAP_standard;
					console.log( "before edit" );
					console.log( field );
					
					self._editFieldOfAPage( uid, field, function()
					{
						self._getPageField( uid, page_id_target, field_id )["type"] = type_DHTMLX_standard;
						//self.grid_form_fields[ uid ].deleteRow(field_id);
						//self._reOrderPageFields( uid );
					} );
					
					self._startPreview( uid );
					
				}, true );
				
				
				
				return false;
			}
			else
				return false;
		});
		
		
		self.grid_pages[ uid ].attachEvent("onDragIn",function(sid,tid,sgrid,tgrid){
            
			
			if(typeof sgrid.entBox === 'undefined')
			{
				return false;
			}
			
			//console.log(sgrid.entBox.id);
			//console.log(tgrid.entBox.id);
			self.is_grid_pages[ uid ] = sgrid.entBox.id;
			//console.log("grid page is: " + sgrid.entBox.id);
			return true;
        });
		
		self.grid_pages[ uid ].attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue)
		{
			if( stage == 2 )
			{
				if( cInd == self.grid_pages[ uid ].getColIndexById( "pagename") )
				{
					self._changePageName( uid, rId, nValue );
				}
			}
			return true;
		});
		
		self.grid_pages[ uid ].attachEvent("onRowDblClicked", function( id, ind )
		{
			self.pop_up_form_pages[ uid ].show("edit_page");
		});
		
		
		
		self.grid_pages[ uid ].attachEvent("onKeyPress", function(code,cFlag,sFlag)
		{
			if( code == 46 )
			{
				self._deletePage( uid );
			}
			return true;
		});
		
		self.grid_pages[ uid ].attachEvent("onEnter", function(id,ind){
			self.pop_up_form_pages[ uid ].show("edit_page");
			return true;
		});
    }
	
	
	,_toolbar_form_pages : function( uid, form_id )
    {
        var self = this;
 
        self.toolbar_form_pages[ uid ] = self.layout_form_layout_left[ uid ].cells("a").attachToolbar( self.model.conf_toolbar_form_pages );
 
        self.toolbar_form_pages[ uid ].attachEvent("onClick", function(id)
        {   
            if(id == "delete_page")
            {
				self._deletePage( uid );
            }
			else if(id == "undock_form_preview")
            {
				self._startPreview( uid );
				self.layout_form_preview[ uid ].cells("a").undock();
            }
        });
		
		self._pop_up_form_pages( uid, form_id );
    }
	
	,pop_up_form_pages : []
	,_pop_up_form_pages : function( uid, form_id )
	{
		var self = this;
		 
		self.pop_up_form_pages[ uid ] = new dhtmlXPopup({
            toolbar : self.toolbar_form_pages[ uid ],
            id: ["add_page", "edit_page"]
		});
		
		self.pop_up_form_pages[ uid ].attachEvent("onShow", function( id )
		{
			//console.log(id);
			self.pop_up_form_pages[ uid ].clear();
			if( id == "add_page" )
			{
				
				try
				{
					self._form_form_pages( uid, false, form_id );
				}catch(e){
					//console.log(e.stack)
				};
			}
			else if( id == "edit_page" )
			{
				try
				{
					self._form_form_pages( uid, true, form_id );
				}catch(e){
				//console.log(e.stack)
				};
			}
			
        });
	}
	
	,form_form_pages : []
	,_form_form_pages : function( uid, isEditing, form_id )
	{
		var self = this;
		
		isEditing = isEditing || false
		
		var page_id = self.grid_pages[ uid ].getSelectedRowId();
		self.form_form_pages[ uid ] = self.pop_up_form_pages[ uid ].attachForm( self.model.conf_form_form_pages.template );
		CAIRS.dhtmlx.prepareForm( uid, self.model.conf_form_form_pages, self.form_form_pages[ uid ] );
		
		if( isEditing )
		{

			var hash = {  };
			
			self.model.conf_grid_pages.ids.split(",").forEach( function(id, index, array_)
			{
				hash[ id ] = self.grid_pages[ uid ].cells(page_id, index).getValue();
			});	
						
			//console.log(hash);
			
			self.form_form_pages[ uid ].setFormData( hash );
			
				
			self.form_form_pages[ uid ].addItem(null, {
				type: "button",
				name: "edit",
				offsetLeft: 149,
				value: "save the page"
			}, 20);
		}
		else
		{
			self.form_form_pages[ uid ].setFormData({
			  page_layout : self.configuration[ uid.replace(new RegExp("_" + form_id,"g"),"") ].page_layout
			});	
			
			self.form_form_pages[ uid ].addItem(null, {
				type: "button",
				name: "add",
				offsetLeft: 149,
				value: "add new page"
			}, 20);
		}
		
		self.form_form_pages[ uid ].setFocusOnFirstActive();
		
		
		self.form_form_pages[ uid ].attachEvent("onButtonClick", function( name )
		{
			if( name == "add" )
			{
				if( CAIRS.dhtmlx.validateForm( uid, self.form_form_pages[ uid ] ) )
				{			
					var hash = self.form_form_pages[ uid ].getFormData();
					hash[ "uid" ] = uid;
					hash[ "form_id" ] = self.form_properties[ uid ].getItemValue( "form_id" );
					hash[ "page_id" ] = null;
					self.form_form_pages[ uid ].lock();
					self._addPage( hash, function()
					{
						self.pop_up_form_pages[ uid ].hide();	
						self.form_form_pages[ uid ].unlock();
					} );
				}
			}
			else if( name == "edit" )
			{
				//console.log(  self._getPageOnModel( uid, page_id) );
				if( CAIRS.dhtmlx.validateForm( uid, self.form_form_pages[ uid ] ) )
				{			
					var hash = self.form_form_pages[ uid ].getFormData();
					hash[ "uid" ] = uid;
					hash[ "page_id" ] = self.grid_pages[ uid ].getSelectedRowId();
					self.form_form_pages[ uid ].lock();
					self._editPage( hash, function()
					{
						self.pop_up_form_pages[ uid ].hide();
						self.form_form_pages[ uid ].unlock();
					}, form_id );
				}
			}
		});
	}
	
	
	,_tabbar_form_fields : function( uid )
    {
        var self = this;
        
		try
		{
			self.tabbar_form_fields[ uid ] =self.layout_form_layout_left[ uid ].cells("b").attachTabbar(  );
			self.tabbar_form_fields[ uid ].setSkin('dhx_skyblue');
			self.tabbar_form_fields[ uid ].setImagePath( self.model.conf_tabbar_form.image_path ); // self.configuration[ uid.replace(new RegExp("_" + form_id,"g"),"") ].application_path
			self.tabbar_form_fields[ uid ].enableScroll( true );
			self.tabbar_form_fields[ uid ].addTab("selected_fields", "Fields of the page", "200px");
			//self.tabbar_form_fields[ uid ].addTab("create_field", "Create field", "200px");
			
			self.tabbar_form_fields[ uid ].setTabActive("selected_fields");
			
			self.tabbar_form_fields[ uid ].attachEvent("onSelect", function(idd,last_id)
			{
				return true;
			});
		}catch(e)
		{
			//console.log("tab : " + e.message);
		}
    }
	
	
	,_toolbar_form_fields : function( uid )
    {
        var self = this;
 
        self.toolbar_form_fields[ uid ] = self.tabbar_form_fields[ uid ].cells("selected_fields").attachToolbar( self.model.conf_toolbar_form_fields );
 
        self.toolbar_form_fields[ uid ].attachEvent("onClick", function(id)
        {   
            if(id == "delete_field")
            {
				self.tabbar_form_create_fields[ uid ].setTabActive("add_field");
				
				var field_id =  self.grid_form_fields[ uid ].getSelectedRowId();
				self._deletePageField( uid, self.selected_page[ uid ], field_id );
            }
			if(id == "reorder_fields")
            {
				var page_id = self.grid_pages[ uid ].getSelectedRowId();
				self._feedGrid_form_fieldsNormalize( uid, page_id );
            }
        });
    }
	
	,_grid_form_fields : function( uid )
    {
        var self = this;
        self.grid_form_fields[ uid ] = self.tabbar_form_fields[ uid ].cells("selected_fields").attachGrid( self.model.conf_grid_fields );
        self.grid_form_fields[ uid ].setHeader( self.model.conf_grid_fields.headers );
		self.grid_form_fields[ uid ].setColumnIds( self.model.conf_grid_fields.ids );
        self.grid_form_fields[ uid ].setInitWidths( self.model.conf_grid_fields.widths );
        self.grid_form_fields[ uid ].setColAlign( self.model.conf_grid_fields.colaligns );
        self.grid_form_fields[ uid ].setColTypes( self.model.conf_grid_fields.coltypes );
        self.grid_form_fields[ uid ].setColSorting( self.model.conf_grid_fields.colsorting );
        self.grid_form_fields[ uid ].setDateFormat("%m-%d-%Y");
		self.grid_form_fields[ uid ].enableDragAndDrop( true );
		
		self.grid_form_fields[ uid ].attachEvent("onDrop", function( sId,tId,dId,sObj,tObj,sCol,tCol )
		{
			self._reOrderPageFields( uid );
			return true;
		});
		
		self.grid_form_fields[ uid ].attachEvent("onDrag", function( sId,tId,sObj,tObj,sInd,tInd )
		{
			//console.log("entrei onDrag");
			if( self.selected_page[ uid ] == null )
			{
				dhtmlx.message( {type : "error", text : "You need to select a page before adding fields."} );
				return false;
			}
			
			if (sObj.object && sObj.object == self.dataView_type_of_fields[ uid ])
			{
				self._addPreDefinedFieldToPage( uid, sId);
				return false;
			}
			
			if (sObj.object && sObj.object == self.grid_field_propertie_options[ uid ])
			{
				return false;
			}
			
			if( self.is_grid_pages[ uid ] == sObj.entBox.id )
			{
				return false;	
			}
			else
			{
				//console.log("entrei not grid pages");
				// if not dragging from same grid
				if( sObj != tObj )
				{
					// if field already exist
					var alreadyExist = false;
					self.grid_form_fields[ uid ].forEachRow( function( rID ){
						if( rID == sId )	alreadyExist = true;
						//console.log( "rID " + rID );
					});
					//console.log("alreadyExist " + alreadyExist);
					// if field already exist - stop
					if(alreadyExist)	return false;

					
					// if is group
					if (sObj && sObj == self.grid_group_fields[ uid ])
					{
						self._addGroupOfFieldsToPage( uid, sId);
						return false;
					}
					else if (sObj && sObj == self.grid_field_propertie_options[ uid ])
					{
						return false;
					}
					else // if is library field
					{
						self._addLibraryFieldToPage( uid, sId);
						return false;
					}
				}
				else
				{
					//console.log( "sId "+ sId);
					//console.log( "tId "+ tId);
					//console.log("entrei I1m same grid");
					if( typeof tId === 'undefined' )
					{
						return false;
					}
					return true;	
				}
			}
		});
		
		self.grid_form_fields[ uid ].enableEditEvents(false,false,false);
		
		self.grid_form_fields[ uid ].init();
		
		var type_combo = self.grid_form_fields[ uid ].getCombo( 0 );		
		var mask_combo = self.grid_form_fields[ uid ].getCombo( 11 );
		
		self.model.conf_form_field_propertie.template.forEach( function(field, index, array)
		{
			if( field.name )
			{
				if( field.name == "mask_to_use" )
				{
					mask_combo.put("", "na");
					field.options.forEach( function(option, index_option, array_option)
					{
						if( option.value != "" )
						{
							mask_combo.put(option.value, option.text);
						}
					});	
				}
				else if( field.name == "type" )
				{
					field.options.forEach( function(option, index_option, array_option)
					{
						if( option.value != "" )
						{
							type_combo.put(option.value, option.text);
						}
					});	
				}
			}
		});
		
		var is_library_combo = self.grid_form_fields[ uid ].getCombo( 9 );
		is_library_combo.put(1, "yes");
		is_library_combo.put(0, "no");
		
		var required_combo = self.grid_form_fields[ uid ].getCombo( 8 );
		required_combo.put(1, "yes");
		required_combo.put(0, "no");
		
		self.grid_form_fields[ uid ].attachEvent("onXLS", function() {
        	self.progressOn( uid );
		});
		self.grid_form_fields[ uid ].attachEvent("onXLE", function() {
			self.progressOff( uid );
		});
         
        self.grid_form_fields[ uid ].attachEvent("onRowSelect", function( id, ind )
        {
             try{self.pop_up_grid_field_propertie_options[ uid ].hide()}catch(e){};
			 self._layout_field_propertie( uid );
			 self._form_field_propertie( uid, id );
			 self._toolbar_grid_field_propertie_options( uid );
			 self._grid_field_propertie_options( uid );
			 self.toolbar_form_fields[ uid ].enableItem("edit_field");
			 self.toolbar_form_fields[ uid ].enableItem("delete_field");
			 
			 self._feedGrid_grid_field_propertie_options( uid, self.grid_pages[ uid ].getSelectedRowId(), id );
        });
		
		self.grid_form_fields[ uid ].attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue){
			
			self._layout_field_propertie( uid );
			self._form_field_propertie( uid, rId );
			self._toolbar_grid_field_propertie_options( uid );
			self._grid_field_propertie_options( uid );
			self.toolbar_form_fields[ uid ].enableItem("edit_field");
			self.toolbar_form_fields[ uid ].enableItem("delete_field");
			
			return true;
		});
    }
	
	,_tabbar_form_create_fields : function( uid )
    {
        var self = this;
        
		try
		{
			self.tabbar_form_create_fields[ uid ] = self.layout_form_layout_right[ uid ].cells("a").attachTabbar(  );
			self.tabbar_form_create_fields[ uid ].setSkin('dhx_skyblue');
			self.tabbar_form_create_fields[ uid ].setImagePath( self.model.conf_tabbar_form.image_path ); // self.configuration[ uid.replace(new RegExp("_" + form_id,"g"),"") ].application_path
			self.tabbar_form_create_fields[ uid ].enableScroll( true );
			self.tabbar_form_create_fields[ uid ].addTab("field_properties", "Field properties", "200px");
			self.tabbar_form_create_fields[ uid ].addTab("add_field", "Create new field", "200px");
			
			self.tabbar_form_create_fields[ uid ].addTab("library_fields", "Library fields", "200px");
			//self.tabbar_form_fields[ uid ].addTab("create_field", "Create field", "200px");
			
			self.tabbar_form_create_fields[ uid ].setTabActive("add_field");
			self.tabbar_form_create_fields[ uid ].hideTab("field_properties");
			
			self.tabbar_form_create_fields[ uid ].attachEvent("onSelect", function(idd,last_id)
			{
				
				return true;
			});
			
			
		}catch(e)
		{
			//console.log("tab : " + e.message);
		}
    }
	
	
	
	,_tabbar_form_add_field : function( uid )
    {
        var self = this;
        
		try
		{
			self.tabbar_form_add_field[ uid ] = self.tabbar_form_create_fields[ uid ].cells("add_field").attachTabbar(  );
			self.tabbar_form_add_field[ uid ].setSkin('dhx_skyblue');
			self.tabbar_form_add_field[ uid ].setImagePath( self.model.conf_tabbar_form.image_path ); // self.configuration[ uid.replace(new RegExp("_" + form_id,"g"),"") ].application_path
			self.tabbar_form_add_field[ uid ].enableScroll( true );
			self.tabbar_form_add_field[ uid ].addTab("predefined_fields", "predefined fields", "150px");
			self.tabbar_form_add_field[ uid ].addTab("custom_field", "custom field", "150px");

			//self.tabbar_form_fields[ uid ].addTab("create_field", "Create field", "200px");
			
			self.tabbar_form_add_field[ uid ].setTabActive("predefined_fields");
			
			self.tabbar_form_add_field[ uid ].attachEvent("onSelect", function(idd,last_id)
			{
				return true;
			});
			
			
		}catch(e)
		{
			//console.log("tab : " + e.message);
		}
    }
	
	,status_bar_dataView_type_of_fields : []
	,_dataView_type_of_fields : function ( uid )
	{
		var self = this;
		self.dataView_type_of_fields[ uid ] = self.tabbar_form_add_field[ uid ].cells("predefined_fields").attachDataView( self.model.conf_dataView_pre_defined_fields.settings );
		self.dataView_type_of_fields[ uid ].parse( self.model.conf_dataView_pre_defined_fields.data, "json");
		
		self.status_bar_dataView_type_of_fields[ uid ] = self.tabbar_form_add_field[ uid ].cells("predefined_fields").attachStatusBar();
		self.status_bar_dataView_type_of_fields[ uid ].setText("<div class='red_warning'> <img src ='" + self.model.conf_window.image_path + "warning4.png'> Click on a item and drag to the <b>'Fields of the page'</b> grid .</div>");
	}
	
	,status_bar_form_custom_field : []
	,_form_custom_field : function( uid )
    {
        var self = this
		self.form_custom_field[ uid ] = self.tabbar_form_add_field[ uid ].cells("custom_field").attachForm( self.model.conf_form_custom_field.template );
		
		CAIRS.dhtmlx.prepareForm( uid + "_form_custom_field", self.model.conf_form_custom_field, self.form_custom_field[ uid ] );
		
		var field_id = (new Date()).getTime();
		self.form_custom_field[ uid ].setItemValue( "field_id",  field_id );
		
		self.form_custom_field[ uid ].getInput("label").onkeyup = function(event)
		{
			self.form_custom_field[ uid ].getInput("name").value = self.handleInputName( uid, this.value );
			self.form_custom_field[ uid ].getInput("caption").value = this.value;
		};
		
		self.status_bar_form_custom_field[ uid ] =  self.tabbar_form_add_field[ uid ].cells("custom_field").attachStatusBar();
		self.status_bar_form_custom_field[ uid ].setText("<div class='red_warning'> <img src ='" + self.model.conf_window.image_path + "warning4.png'> Select a page on 'Pages of the form' grid before saving this form for adding a custom field.</div>");
		
		self.form_custom_field[ uid ].attachEvent("onChange", function (id, value)
		{
			if( id == "type")
			{
				self.form_custom_field[ uid ].setItemValue( "type_standard",  value );
			}
		});	
    }
	
	
	,_toolbar_custom_field : function( uid )
    {
        var self = this;
        self.toolbar_custom_field[ uid ] = self.tabbar_form_add_field[ uid ].cells("custom_field").attachToolbar( self.model.conf_toolbar_field_propertie );
        self.toolbar_custom_field[ uid ].setIconSize(32);
		self.toolbar_custom_field[ uid ].attachEvent("onClick", function(id)
        {   
            if(id == "save_field")
            {
				if( CAIRS.dhtmlx.validateForm( uid + "_form_custom_field", self.form_custom_field[ uid ] ) )
				{			
					self.toolbar_custom_field[ uid ].disableItem("save_field");
					
					var hash = self.form_custom_field[ uid ].getFormData();
					
					//console.log( hash );
					
					self._addCustomFieldToPage( uid, hash, function()
					{
						// add a new ID for inserting a new item
						var field_id = (new Date()).getTime();
						self.form_custom_field[ uid ].setItemValue( "field_id",  field_id );
						self.form_custom_field[ uid ].setItemValue( "name",  "" );
						self.form_custom_field[ uid ].setItemValue( "label",  "" );
						self.toolbar_custom_field[ uid ].enableItem("save_field");	
					} );
				}
            }
        });
    }
	
	,layout_field_propertie : []
	,statusbar_field_propertie : []
	,_layout_field_propertie : function( uid )
    {
        var self = this		
		
		self.layout_field_propertie[ uid ] = self.tabbar_form_create_fields[ uid ].cells("field_properties").attachLayout( "2E" );
		self.layout_field_propertie[ uid ].cells("a").hideHeader();
		self.layout_field_propertie[ uid ].cells("b").setText("options of the field");
		self.layout_field_propertie[ uid ].cells("b").setHeight(180);
		self.layout_field_propertie[ uid ].cells("b").collapse();
		//self.layout_form_layout_right[ uid ].cells("b").setText("Group of fields");
		self.statusbar_field_propertie[ uid ] = self.layout_field_propertie[ uid ].attachStatusBar();
		self.statusbar_field_propertie[ uid ].setText("");
    }
	
	,_form_field_propertie : function( uid, field_id )
    {
        var self = this
		self.form_field_propertie[ uid ] = self.layout_field_propertie[ uid ].cells("a").attachForm( self.model.conf_form_field_propertie.template );
		self.tabbar_form_create_fields[ uid ].showTab("field_properties");
		self.form_field_propertie[ uid ].setItemValue("field_id", field_id);
		
		var hash = {};
		
		self.model.conf_grid_fields.ids.split(",").forEach( function(id, index, array)
		{
			var colIndex = self.grid_form_fields[ uid ].getColIndexById( id );
			
			if( id.toLowerCase() == 'name' )
			{
				hash[id] = self.grid_form_fields[ uid ].cells(field_id, colIndex).getValue().toString().split("_" + field_id)[0];
			}
			else
			{
				hash[id] = self.grid_form_fields[ uid ].cells(field_id, colIndex).getValue();
			}
		});
		
		
		var type_MAP_standard = hash[ "type_standard" ];
		//var type_DHTMLX_standard = hash[ "type" ];
		hash[ "type_standard" ] = hash[ "type" ];
		
		
		//console.log(hash);
		
		self.form_field_propertie[ uid ].setFormData( hash );
		
		if( self.grid_form_fields[ uid ].cells(field_id, self.grid_form_fields[ uid ].getColIndexById( "required" ) ).getValue() == 0 )
				self.form_field_propertie[ uid ].uncheckItem("required");  // for other items
			else
				self.form_field_propertie[ uid ].checkItem("required");  // for other items
				
		if( self.grid_form_fields[ uid ].cells(field_id, self.grid_form_fields[ uid ].getColIndexById( "use_library" ) ).getValue() == 0 )
				self.form_field_propertie[ uid ].uncheckItem("use_library");  // for other items
			else
				self.form_field_propertie[ uid ].checkItem("use_library");  // for other items
				
		//console.log( self.grid_form_fields[ uid ].cells(field_id, self.grid_form_fields[ uid ].getColIndexById( "use_library" ) ).getValue() );
		
		var rules = self.grid_form_fields[ uid ].cells(field_id, self.grid_form_fields[ uid ].getColIndexById( "validate" ) ).getValue();
		rules = rules.substring(0, rules.length - 3)
		rules.split("-,-").forEach( function( rule, index, array )
		{
			self.form_field_propertie[ uid ].checkItem(rule);
		});
		
		CAIRS.dhtmlx.prepareForm( uid + "_form_field_propertie", self.model.conf_form_field_propertie, self.form_field_propertie[ uid ] );
		
		self.form_field_propertie[ uid ].attachEvent("onChange", function (id, value)
		{
			//self._checkFormStatus( uid );
			if( id == "type" )
			{
				console.log( value );
				if( value == "Z" || value == "W" || value == "M" || value == "RG" || value == "D" )
				{
					self.layout_field_propertie[ uid ].cells("b").expand();
				}
				else
				{
					self.layout_field_propertie[ uid ].cells("b").collapse();
				}
				self.form_field_propertie[ uid ].setItemValue( "type_standard",  value );
			}
			else if( id == "label" )
			{
				
			}
		});

		
		self.form_field_propertie[ uid ].getInput("label").onkeyup = function(event){
			self.form_field_propertie[ uid ].getInput("name").value = self.handleInputName( uid, this.value );
			self.form_field_propertie[ uid ].getInput("caption").value = this.value;
		};
		
		var initialtype = self.form_field_propertie[ uid ].getItemValue("type");
		//console.log("---------------------------------");
		console.log( initialtype );
		if( initialtype == "M" || initialtype == "D" || initialtype == "S"  || initialtype == "W"  || initialtype == "Z" )
		{
			self.layout_field_propertie[ uid ].cells("b").expand();
		}
		else
		{
			self.layout_field_propertie[ uid ].cells("b").collapse();
		}
		//console.log(self.form_field_propertie[ uid ].getFormData());
		
		self.tabbar_form_create_fields[ uid ].setTabActive("field_properties");
    }
	
	
	,_toolbar_field_propertie : function( uid )
    {
        var self = this;
 
        self.toolbar_field_propertie[ uid ] = self.tabbar_form_create_fields[ uid ].cells("field_properties").attachToolbar( self.model.conf_toolbar_field_propertie );
		self.toolbar_field_propertie[ uid ].setIconSize(32);
        self.toolbar_field_propertie[ uid ].attachEvent("onClick", function(id)
        {   
            if(id == "save_field")
            {
				if( CAIRS.dhtmlx.validateForm( uid + "_form_field_propertie", self.form_field_propertie[ uid ] ) )
				{			
					self.toolbar_field_propertie[ uid ].disableItem("save_field");
					
					var hash = self.form_field_propertie[ uid ].getFormData();
					
					//console.log( hash );
					
					self._editFieldOfAPage( uid, hash, function()
					{
						self.toolbar_field_propertie[ uid ].enableItem("save_field");	
					} );
					
				}
				
            }
        });
    }
	
	
	,_toolbar_grid_field_propertie_options : function( uid )
    {
        var self = this;
		
		if( typeof self.toolbar_grid_field_propertie_options[ uid ] !== 'undefined' )
		{
			//return;
		}
 
        self.toolbar_grid_field_propertie_options[ uid ] = self.layout_field_propertie[ uid ].cells("b").attachToolbar( self.model.conf_toolbar_grid_field_propertie_options );
 
        self.toolbar_grid_field_propertie_options[ uid ].attachEvent("onClick", function(id)
        {   
            if(id == "delete")
            {
				 self._deleteFieldOption( uid, self.selected_page[ uid ], self.grid_form_fields[ uid ].getSelectedRowId(), self.grid_field_propertie_options[ uid ].getSelectedRowId() );
            }
        });
		
		self._pop_up_grid_field_propertie_options( uid );
		
    }
	
	
	,_form_grid_field_propertie_options : function( uid, isEditing )
	{
		var self = this, isEditing = isEditing || false;
		
		var field_id = self.grid_form_fields[ uid ].getSelectedRowId();
		var fieldType = self.grid_form_fields[ uid ].cells(field_id, self.grid_form_fields[ uid ].getColIndexById( "type" )).getValue();
		var type = "";
		
		console.log( fieldType );
		
		if( fieldType == "M" || fieldType == "D" || fieldType == "S" )
		{
			self.form_grid_field_propertie_options[ uid ] = self.pop_up_grid_field_propertie_options[ uid ].attachForm( self.model.conf_form_grid_field_propertie_options_option.template );
			CAIRS.dhtmlx.prepareForm( uid, self.model.conf_form_grid_field_propertie_options_option, self.form_grid_field_propertie_options[ uid ] );
			type = "";
			
		}
		else
		{
			console.log( self.model.conf_form_grid_field_propertie_options_field.template );
			self.form_grid_field_propertie_options[ uid ] = self.pop_up_grid_field_propertie_options[ uid ].attachForm( self.model.conf_form_grid_field_propertie_options_field.template );
			CAIRS.dhtmlx.prepareForm( uid, self.model.conf_form_grid_field_propertie_options_field, self.form_grid_field_propertie_options[ uid ] );
			type = fieldType;
		}
		
		
		
		if( isEditing )
		{
			var option_id = self.grid_field_propertie_options[ uid ].getSelectedRowId();
			var hash = {};
			
			//console.log( "option_id " + option_id );
			
			var field  = self._getPageField( uid, self.selected_page[ uid ], field_id );
			console.log( field );
			
			if( field.type == "label" || field.type == "fieldset" ||  field.type == "radio" ||  field.type == "checkbox" )
			{ // lets read the list property
				
				field.list.forEach( function( option, index, array )
				{		
					if( option.option_id == option_id )
					{
						for( var property in option )
						{
							if ( option.hasOwnProperty( property ) ) 
							{
								//console.log( property );
								if( property == "type" )
								{
									hash[ "type" ] = self._convertDhtmlxTypeToLibraryFieldType( option[ property ] );
								}
								else
								{
									hash[ property ] = option[ property ];
								}
								//_convertDhtmlxTypeToLibraryFieldType
							}
						}
					}
				});
			}
			else if( field.type == "multiselect" || field.type == "combo" || field.type == "select" )
			{ // lets read the list property
			
				field.options.forEach( function( option, index, array )
				{		
					if( option.option_id == option_id )
					{
						for( var property in option )
						{
							if ( option.hasOwnProperty( property ) ) 
							{
								//console.log( property );
								if( property == "type" )
								{
									hash[ "type" ] = self._convertDhtmlxTypeToLibraryFieldType( option[ property ] );
								}
								else
								{
									hash[ property ] = option[ property ];
								}
								//_convertDhtmlxTypeToLibraryFieldType
							}
						}
					}
				});
			}

			
			hash[ "option_id" ] = option_id;
			
			self.form_grid_field_propertie_options[ uid ].setFormData( hash );
			
			if(  hash[ "asdefault" ] == 0 )
				self.form_grid_field_propertie_options[ uid ].uncheckItem("asdefault");  // for other items
			else
				self.form_grid_field_propertie_options[ uid ].checkItem("asdefault");  // for other items
				
			self.form_grid_field_propertie_options[ uid ].addItem("save_fields", {
				type: "button",
				name: "edit",
				offsetLeft: 150,
				offsetTop: 20,
				value: "save the option"
			}, 5);
		}
		else
		{			
			
			self.form_grid_field_propertie_options[ uid ].addItem("save_fields", {
				type: "button",
				name: "add",
				offsetLeft: 150,
				offsetTop: 20,
				value: "add new option"
			}, 5);
		}
		
		self.form_grid_field_propertie_options[ uid ].setFocusOnFirstActive();
		
		
		self.form_grid_field_propertie_options[ uid ].attachEvent("onButtonClick", function( name )
		{
			if( name == "add" )
			{
				if( CAIRS.dhtmlx.validateForm( uid, self.form_grid_field_propertie_options[ uid ] ) )
				{			
					var hash = self.form_grid_field_propertie_options[ uid ].getFormData();
					self.form_grid_field_propertie_options[ uid ].lock();
					hash[ "option_id" ] = null;
					self._addOptionToField( uid, hash, function(){
						self.pop_up_grid_field_propertie_options[ uid ].hide();
						self.form_grid_field_propertie_options[ uid ].unlock();
					} );
				}
			}
			else if( name == "edit" )
			{
				if( CAIRS.dhtmlx.validateForm( uid, self.form_grid_field_propertie_options[ uid ] ) )
				{			
					var hash = self.form_grid_field_propertie_options[ uid ].getFormData();
					self.form_grid_field_propertie_options[ uid ].lock();
					//console.log(hash);
					self._editOptionOfAField( uid, hash, function(){
						self.pop_up_grid_field_propertie_options[ uid ].hide();
						self.form_grid_field_propertie_options[ uid ].unlock();
					} );
				}
			}
			
		});
		
		self.form_grid_field_propertie_options[ uid ].attachEvent("onChange", function (id, value)
		{
			if( id == "type")
			{
				self.form_grid_field_propertie_options[ uid ].setItemValue( "type_standard",  value );
			}
		});
		
		
		if( fieldType == "M" || fieldType == "D" || fieldType == "S" )
		{
			/*self.form_grid_field_propertie_options[ uid ].getInput("text").onkeyup = function(event)
			{
				self.form_grid_field_propertie_options[ uid ].getInput("name").value = self.handleInputName( uid, this.value, true );
				self.form_grid_field_propertie_options[ uid ].getInput("label").value = this.value;
			};*/
			self.form_grid_field_propertie_options[ uid ].setFormData({
				type : "",
				field_id : field_id
			});
		}
		else
		{
			self.form_grid_field_propertie_options[ uid ].getInput("label").onkeyup = function(event)
			{
				self.form_grid_field_propertie_options[ uid ].getInput("name").value = self.handleInputName( uid, this.value, true );
				self.form_grid_field_propertie_options[ uid ].getInput("caption").value = this.value;
			};
			self.form_grid_field_propertie_options[ uid ].setFormData({
			  type : "T",
			  type_standard :  "T",
			  field_id : field_id
			});	
		}
		
	}
	
	,_pop_up_grid_field_propertie_options : function( uid )
	{
		var self = this;
		 
		self.pop_up_grid_field_propertie_options[ uid ] = new dhtmlXPopup({
            toolbar : self.toolbar_grid_field_propertie_options[ uid ],
            id: ["add", "edit"]
		});
		
		self.pop_up_grid_field_propertie_options[ uid ].attachEvent("onShow", function( id )
		{
			//console.log(id);
			self.pop_up_grid_field_propertie_options[ uid ].clear();
			if( id == "add" )
			{
				self._form_grid_field_propertie_options( uid );
			}
			else if( id == "edit" )
			{
				self._form_grid_field_propertie_options( uid, true );
			}
        });
	}
	
	,grid_field_propertie_options : []
	,_grid_field_propertie_options : function( uid )
    {
		var self = this;
		var field_type = self.grid_form_fields[ uid ].cells(self.grid_form_fields[ uid ].getSelectedRowId(), self.grid_form_fields[ uid ].getColIndexById( "type" ) ).getValue();
		
		if( typeof self.grid_field_propertie_options[ uid ] !== 'undefined' )
		{
			//return;
		}
		
        self.grid_field_propertie_options[ uid ] = self.layout_field_propertie[ uid ].cells("b").attachGrid( self.model.conf_grid_field_propertie_options );
        self.grid_field_propertie_options[ uid ].setHeader( self.model.conf_grid_field_propertie_options.headers );
		self.grid_field_propertie_options[ uid ].setColumnIds( self.model.conf_grid_field_propertie_options.ids );
		if( field_type == "M" || field_type == "D" || field_type == "S")
		{
			self.layout_field_propertie[ uid ].cells("b").setText("options of the field. Field type: " + self._convertLibraryFieldTypetoDhtmlxType(field_type) );
			self.model.conf_grid_field_propertie_options.widths = "0,0,0,0,0,200,80,0,0,0,0,0,50";
		}
		else
		{
			self.layout_field_propertie[ uid ].cells("b").setText("child fields. Field type: " + self._convertLibraryFieldTypetoDhtmlxType(field_type) );
			self.model.conf_grid_field_propertie_options.widths = "80,0,0,150,80,0,80,0,0,0,0,60,50";
		}
		self.grid_field_propertie_options[ uid ].setInitWidths( self.model.conf_grid_field_propertie_options.widths );
        self.grid_field_propertie_options[ uid ].setColAlign( self.model.conf_grid_field_propertie_options.colaligns );
        self.grid_field_propertie_options[ uid ].setColTypes( self.model.conf_grid_field_propertie_options.coltypes );
        self.grid_field_propertie_options[ uid ].setColSorting( self.model.conf_grid_field_propertie_options.colsorting );
       // self.grid[ uid ].selMultiRows = true;
        self.grid_field_propertie_options[ uid ].setDateFormat( self.model.conf_grid_field_propertie_options.dateFormat );
		
		self.grid_field_propertie_options[ uid ].enableDragAndDrop( true );
		
		self.grid_field_propertie_options[ uid ].enableEditEvents(false,false,false);
		
        self.grid_field_propertie_options[ uid ].init();
		
		var default_selected_combo = self.grid_field_propertie_options[ uid ].getCombo( self.grid_field_propertie_options[ uid ].getColIndexById( "asdefault" ) );
		default_selected_combo.put("N", "no");
		default_selected_combo.put("Y", "yes");
		
		var type_combo = self.grid_field_propertie_options[ uid ].getCombo( self.grid_field_propertie_options[ uid ].getColIndexById( "type" ) );
		type_combo.put("", "option");
		type_combo.put("T", "text (one row)");
		type_combo.put("E", "date");
		type_combo.put("B", "checkbox");
		type_combo.put("W", "nested group fields");
		type_combo.put("Z", "checkbox nested fields");
		type_combo.put("M", "multiple selections");
		type_combo.put("S", "select");
		type_combo.put("R", "radiobutton");
		//type_combo.put("RG", "radio matrix");
		type_combo.put("A", "text area");
		type_combo.put("D", "drop-down menu");
		type_combo.put("L", "text for display only");	
		type_combo.put("G", "grey bar-section heading");	
		type_combo.put("I", "price");	
		type_combo.put("F", "file upload");	
		type_combo.put("P", "payment options");
		
		//console.log( type_combo );
		
		self.grid_field_propertie_options[ uid ].attachEvent("onXLS", function() {
        	//self.progressOn( uid );
		});
		self.grid_field_propertie_options[ uid ].attachEvent("onXLE", function() {
			//self.progressOff( uid );
		});
		
		self.grid_field_propertie_options[ uid ].attachEvent("onDrop", function( sId,tId,dId,sObj,tObj,sCol,tCol )
		{
			if( sObj == tObj )
			{
				//console.log("final index of initial selected: " + self.grid_field_propertie_options[ uid ].getRowIndex( sId ));
				//console.log("final index of target row " + self.grid_field_propertie_options[ uid ].getRowIndex( tId ) );
				
				self._reOrderFieldOptions( uid );
				return true;
			}
			else
			{
				return false;
			}
		});
		
		
		self.grid_field_propertie_options[ uid ].attachEvent("onDrag", function( sId, tId, sObj, tObj, sInd, tInd )
		{
			
			if( sObj == tObj )
			{				
				if( typeof tId === 'undefined' )
				{
					//console.log("onDrag " + ( sObj == tObj ));
					return false;
				}
				return true;
			}
			else
			{
				return false;
			}
		});
		
		self.grid_field_propertie_options[ uid ].attachEvent("onDragIn",function(sid,tid,sgrid,tgrid){
			self.is_grid_pages[ uid ] = "";
			return true;
        });
		
		
		self.grid_field_propertie_options[ uid ].attachEvent("onRowSelect", function( id, ind )
		{
			self.toolbar_grid_field_propertie_options[ uid ].enableItem("edit");
			self.toolbar_grid_field_propertie_options[ uid ].enableItem("delete");
			try{self.pop_up_grid_field_propertie_options[ uid ].hide()}catch(e){};
			//self.pop_up_grid_field_propertie_options[ uid ].show("edit");
		});
		
		self.grid_field_propertie_options[ uid ].attachEvent("onRowDblClicked", function( id, ind )
		{
			self.pop_up_grid_field_propertie_options[ uid ].show("edit");
			return true;
		});
		
		self.grid_field_propertie_options[ uid ].attachEvent("onCheck", function( id, ind, state)
		{
			return false;
		});
		
		//self.grid_field_propertie_options[ uid ].attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue)
		//{
		//	return false;	
		//});
		
		
    }
	
	
	,_tabbar_form_library_fields : function( uid, form_id )
    {
        var self = this;
        
		try
		{
			self.tabbar_form_library_fields[ uid ] = self.tabbar_form_create_fields[ uid ].cells("library_fields").attachTabbar(  );
			self.tabbar_form_library_fields[ uid ].setSkin('dhx_skyblue');
			self.tabbar_form_library_fields[ uid ].setImagePath( self.model.conf_tabbar_form.image_path ); // self.configuration[ uid.replace(new RegExp("_" + form_id,"g"),"") ].application_path
			self.tabbar_form_library_fields[ uid ].enableScroll( true );
			
			self.tabbar_form_library_fields[ uid ].addTab("group_fields", "group of fields", "150px");
			self.tabbar_form_library_fields[ uid ].addTab("search_fields", "search by category", "150px");
			self.tabbar_form_library_fields[ uid ].addTab("search_fields_tags", "search by field tag", "150px");
			self.tabbar_form_library_fields[ uid ].addTab("list_fields", "listing fields", "150x");
			
			self.tabbar_form_library_fields[ uid ].setTabActive("list_fields");
			
			self.tabbar_form_library_fields[ uid ].attachEvent("onSelect", function(idd,last_id)
			{
				try
				{
					if( idd == "search_fields" )
					{
						//console.log(self.dataLoaded_tree_form_library_field_category[ uid ]);
						if(  self.dataLoaded_tree_form_library_field_category[ uid ] == false )
						{
							self.progressOnForm( uid );
							self._startDataTree( uid, function(){
								self._tree_form_library_field_category( uid, form_id );
								self.dataLoaded_tree_form_library_field_category[ uid ] = true;
								self.progressOffForm( uid );
							});
						}
					}
					else if( idd == "search_fields_tags" )
					{
						if(  self.dataLoaded_tags_form[ uid ] == false )
						{
							self.progressOnForm( uid );
							self._startDataTags( uid, function(){
								self._toolbar_tags( uid );
								self._form_tags( uid );
								self.dataLoaded_tags_form[ uid ] = true;
								self.progressOffForm( uid );
							});
						}
					}
				}
				catch(e)
				{
					//console.log(e.stack);	
				}
				return true;
			});
			
			self.status_bar_paging_library_fields[ uid ] = self.tabbar_form_library_fields[ uid ].cells("list_fields").attachStatusBar();
			self.status_bar_paging_library_fields[ uid ].setText("<div id='recinfoArea_library_fields'></div>");
			
		}catch(e)
		{
			//console.log("tab : " + e.message);
		}
    }
	
	
	,_grid_library_fields : function( uid )
    {
        var self = this;
        self.grid_library_fields[ uid ] = self.tabbar_form_library_fields[ uid ].cells("list_fields").attachGrid( self.model.conf_grid_library_fields );
        self.grid_library_fields[ uid ].setHeader( self.model.conf_grid_library_fields.headers );
		self.grid_library_fields[ uid ].setColumnIds( self.model.conf_grid_fields.ids );
        self.grid_library_fields[ uid ].setInitWidths( self.model.conf_grid_library_fields.widths );
        self.grid_library_fields[ uid ].setColAlign( self.model.conf_grid_library_fields.colaligns );
        self.grid_library_fields[ uid ].setColTypes( self.model.conf_grid_library_fields.coltypes );
        self.grid_library_fields[ uid ].setColSorting( self.model.conf_grid_library_fields.colsorting );
       // self.grid_library_fields[ uid ].selMultiRows = true;
        self.grid_library_fields[ uid ].setDateFormat("%m-%d-%Y");
		self.grid_library_fields[ uid ].enablePaging(true, 100, 10, "recinfoArea_library_fields", true);
		self.grid_library_fields[ uid ].setPagingSkin("toolbar", "dhx_skyblue");
		self.grid_library_fields[ uid ].enableDragAndDrop( true );
		self.grid_library_fields[ uid ].enableMercyDrag(true);
		self.grid_library_fields[ uid ].enableEditEvents(false,false,false);
		
		self.grid_library_fields[ uid ].init();
		
		var type_combo = self.grid_library_fields[ uid ].getCombo( 0 );
		type_combo.put("T", "text (one row)");
		type_combo.put("E", "date");
		type_combo.put("B", "checkbox");
		type_combo.put("W", "nested group fields");
		type_combo.put("Z", "checkbox nested fields");
		type_combo.put("M", "multiple selections");
		type_combo.put("S", "select");
		type_combo.put("R", "radiobutton");
		type_combo.put("A", "text area");
		type_combo.put("D", "drop-down menu");
		type_combo.put("L", "text for display only");	
		type_combo.put("G", "grey bar-section heading");	
		type_combo.put("I", "price");	
		type_combo.put("F", "file upload");	
		type_combo.put("P", "payment options");		
		
		self.grid_library_fields[ uid ].attachEvent("onXLS", function() {
        	self.progressOnForm( uid );
		});
		self.grid_library_fields[ uid ].attachEvent("onXLE", function() {
			self.progressOffForm( uid );
		});
         
        self.grid_library_fields[ uid ].attachEvent("onRowSelect", function( id, ind )
        {
             
        });
		
		self.grid_library_fields[ uid ].attachEvent("onDrag", function(sId,tId,sObj,tObj,sInd,tInd)
		{
			return false;
		});
		
		self.grid_library_fields[ uid ].attachEvent("onDragIn",function(sid,tid,sgrid,tgrid){
			self.is_grid_pages[ uid ] = "";
			return true;
        });
    }
	
	,_feedGrid_library_fields : function( uid, stringToSearch, isSearch )
	{
		var self = this, gridURL = "";
		stringToSearch = stringToSearch || "";
		isSearch = isSearch || false;
		self.grid_library_fields[ uid ].clearAll();
		
		if( isSearch )
			gridURL = CAIRS.MAP.API.getMappedURL( {
				resource : "/LibraryFields/search",  // mandatory
				responseType : "json", // not mandatory, default json
				params : "columns=" + self.model.conf_grid_library_fields.ids + "&tags="+stringToSearch+"" // not mandatory, default none
			} );
		else
			gridURL = CAIRS.MAP.API.getMappedURL( {
				resource : "/LibraryFields",  // mandatory
				responseType : "json", // not mandatory, default json
				params : "columns=" + self.model.conf_grid_library_fields.ids + "&searchcriteria="+stringToSearch+"" // not mandatory, default none
			} );
		
		self.grid_library_fields[ uid ].load( gridURL, function()
		{
			self.tabbar_form_library_fields[ uid ].setTabActive("list_fields");
		}, "json");
	}
	
	,_form_tags : function( uid )
    {
        var self = this
		self.form_tags[ uid ] = self.tabbar_form_library_fields[ uid ].cells("search_fields_tags").attachForm( self.model.conf_form_tags.template );
		self.status_bar_tags[ uid ] = self.tabbar_form_library_fields[ uid ].cells("search_fields_tags").attachStatusBar();
		self.status_bar_tags[ uid ].setText("Pick one or more tags and click on 'search fields' button.");
    }
	
	,_toolbar_tags : function( uid )
    {
        var self = this;
        self.toolbar_tags[ uid ] = self.tabbar_form_library_fields[ uid ].cells("search_fields_tags").attachToolbar( self.model.conf_toolbar_tags );
        self.toolbar_tags[ uid ].attachEvent("onClick", function(id)
        {   
            if(id == "search")
            {
				var selected_tags = "";
				self.model.conf_form_tags.template.forEach( function(field, index, array)
				{
					if( typeof field.name !== 'undefined' )
						if( self.form_tags[ uid ].isItemChecked( field.name ) )
							selected_tags = selected_tags + self.form_tags[ uid ].getItemValue( field.name );
				});
				self._feedGrid_library_fields( uid, selected_tags, true );
            }
        });
    }
	
	
	,_tree_form_library_field_category : function( uid, form_id ){
		var self = this;
		
		self.tree_form_library_field_category[ uid ] = self.tabbar_form_library_fields[ uid ].cells("search_fields").attachTree();
		self.tree_form_library_field_category[ uid ].setSkin( self.model.globalSkin );
		self.tree_form_library_field_category[ uid ].setImagePath( self.configuration[ uid.replace(new RegExp("_" + form_id,"g"),"") ].dhtmlx_codebase_path + "imgs/csh_bluebooks/" );
		self.tree_form_library_field_category[ uid ].enableTreeImages( false );
		self.tree_form_library_field_category[ uid ].enableTreeLines( true );
		self.tree_form_library_field_category[ uid ].enableTextSigns( true );
		
		self.tree_form_library_field_category[ uid ].enableCheckBoxes(true, false);
		
		self.tree_form_library_field_category[ uid ].loadJSONObject( self.model.conf_tree_form_library_field_category, function()
		{
			//console.log(self.model.conf_tree_form_library_field_category);
		});
		
		self.tree_form_library_field_category[ uid ].disableCheckbox( "manage", true );
		
		self.tree_form_library_field_category[ uid ].attachEvent("onCheck", function( categoryID, state )
		{
			if( categoryID == "manage" )
				return;
			self._checkTreeItems( uid, categoryID );
			
		});
			
		self.tree_form_library_field_category[ uid ].attachEvent("onClick", function(categoryID, oldSelectedcategoryID)
		{
			if( categoryID == "manage" )
				return;
			if( self.tree_form_library_field_category[ uid ].isItemChecked( categoryID ) )
				self.tree_form_library_field_category[ uid ].setCheck( categoryID, 0 );
			else
				self.tree_form_library_field_category[ uid ].setCheck( categoryID, 1 );
			self._checkTreeItems( uid, categoryID );
		});
	}
	
	,formPreviewWindow : []
	,layout_form_preview : []
	,_layout_form_preview : function( uid )
    {
        var self = this;
        self.layout_form_preview[ uid ] = self.tabbar_form[ uid ].cells("form_preview").attachLayout( self.model.conf_layout_form_preview.pattern );
		self.layout_form_preview[ uid ].dhxWins.enableAutoViewport(false);
    	self.layout_form_preview[ uid ].dhxWins.attachViewportTo(document.body);
		self.layout_form_preview[ uid ].attachEvent("onUnDock", function(itemId)
		{
			console.log(itemId);
			self.layout_form_preview[ uid ].dhxWins.setImagePath("../codebase3.6/imgs/");

			self.formPreviewWindow[ uid ] = self.layout_form_preview[ uid ].dhxWins.window(itemId);
			self.formPreviewWindow[ uid ].button("dock").attachEvent("onClick", function(){
				self.layout_form_preview[ uid ].cells("a").dock();
				return true;
			});;
			self.formPreviewWindow[ uid ].setDimension(  760,  500 );
			
			self.formPreviewWindow[ uid ].setText( "Live preview: " + self.form_properties[ uid ].getItemValue( "formlabel" ) );
			self.formPreviewWindow[ uid ].setIcon("dock.gif", "dock.gif");
		});
		self.layout_form_preview[ uid ].attachEvent("onDock", function(itemId)
		{
			alert("entrei dock");
		});

    }
	
	,toolbar_form_preview : []
	,_toolbar_form_preview : function( uid, form_id )
    {
        var self = this;
        self.toolbar_form_preview[ uid ] = self.layout_form_preview[ uid ].cells("a").attachToolbar( self.model.conf_toolbar_form );
		self.toolbar_form_preview[ uid ].setIconSize(32);
		self.toolbar_form_preview[ uid ].setSkin('dhx_skyblue');
        self.toolbar_form_preview[ uid ].attachEvent("onClick", function(id)
        {   
            if(id == "save")
			{
				
            }
        });
    }
	
	,tab_pages_preview : []
	,_tab_pages_preview : function( uid )
    {
        var self = this;
		
		if( self.layout_form_preview[ uid ].dhxWins.isWindow("a") )
			self.tab_pages_preview[ uid ] = self.formPreviewWindow[ uid ].attachTabbar(  );
		else
			self.tab_pages_preview[ uid ] = self.layout_form_preview[ uid ].cells("a").attachTabbar(  );
		
		self.tab_pages_preview[ uid ].setSkin('dhx_skyblue');
		self.tab_pages_preview[ uid ].setImagePath( self.model.conf_tabbar_form.image_path ); // self.configuration[ uid ].application_path
		self.tab_pages_preview[ uid ].enableScroll( true );
		self.tab_pages_preview[ uid ].enableAutoReSize( true );
		self.tab_pages_preview[ uid ].addTab("start_tab", "start_tab", "0px");
		self.tab_pages_preview[ uid ].hideTab("start_tab", true );
			
		self.tab_pages_preview[ uid ].attachEvent("onSelect", function(idd,last_id)
		{
			return true;
		});
    }
	
	,form_preview : []
	,_form_preview : function( uid )
    {
        var self = this, skin = self.form_properties[ uid ].getItemValue( "skin" );
		dhtmlx.skin = skin || "dhx_skyblue";
		
		self.model.conf_form_preview.template.sort( function(a,b)
		{
			return a.index - b.index;
		});
		
		for( var x = 0; x < self.model.conf_form_preview.template.length; x++)
		{
			if( self.model.conf_form_preview.template[x].type == "block" )
			{
				if( typeof self.model.conf_form_preview.template[x].page_id !== 'undefined' )
				{					
					// order column 1 of the page
					self.model.conf_form_preview.template[x].list[0].list.sort( function(a,b)
					{
						return a.index - b.index;
					});
									
					for( var y = 0; y < self.model.conf_form_preview.template[x].list[0].list.length; y++)
					{
						//console.log( self.model.conf_form_preview.template[x].list[0].list[y] );
						self.model.conf_form_preview.template[x].list[0].list[y].list.sort( function(a,b)
						{
							return a.index - b.index;
						});
						
						self.model.conf_form_preview.template[x].list[0].list[y].options.sort( function(a,b)
						{
							return a.index - b.index;
						});
					}
					
					// if is there 2 columns
					if( typeof self.model.conf_form_preview.template[x].list[2] !== 'undefined' )
					{
						// order column 2 of the page
						self.model.conf_form_preview.template[x].list[2].list.sort( function(a,b)
						{
							return a.index - b.index;
						});
						
						for( var y = 0; y < self.model.conf_form_preview.template[x].list[2].list.length; y++)
						{
							self.model.conf_form_preview.template[x].list[2].list[y].list.sort( function(a,b)
							{
								return a.index - b.index;
							});
							
							self.model.conf_form_preview.template[x].list[2].list[y].options.sort( function(a,b)
							{
								return a.index - b.index;
							});
						}
					}
				}
			}
		}
		
		self.form_preview[ uid ] = self.tab_pages_preview[ uid ].cells("start_tab").attachForm( self.model.conf_form_preview.template );
		self.form_preview[ uid ].setSkin(skin);
		
		self.model.conf_form_preview.template.forEach( function(element, index, array)
		{
			if(element.type == "block")
			{
				if( typeof element.id !== 'undefined' )
				{
					self.tab_pages_preview[ uid ].addTab( self.model.conf_form_preview.template[index].id, element.label, element.tab_width);
					self.tab_pages_preview[ uid ].cells( self.model.conf_form_preview.template[index].id ).attachObject( self.model.conf_form_preview.template[index].id.toString() );
					if( index == 1 )
						self.tab_pages_preview[ uid ].setTabActive( self.model.conf_form_preview.template[index].id );
				}
			}
		});
		
		CAIRS.dhtmlx.prepareForm( uid + "_form_preview", self.model.conf_form_preview, self.form_preview[ uid ] );
    }
	
	,_grid_group_fields : function( uid )
    {
        var self = this;
        self.grid_group_fields[ uid ] = self.tabbar_form_library_fields[ uid ].cells("group_fields").attachGrid( self.model.conf_grid_group_fields );
        self.grid_group_fields[ uid ].setHeader( self.model.conf_grid_group_fields.headers );
        self.grid_group_fields[ uid ].setInitWidths( self.model.conf_grid_group_fields.widths );
        self.grid_group_fields[ uid ].setColAlign( self.model.conf_grid_group_fields.colaligns );
        self.grid_group_fields[ uid ].setColTypes( self.model.conf_grid_group_fields.coltypes );
        self.grid_group_fields[ uid ].setColSorting( self.model.conf_grid_group_fields.colsorting );
        //self.grid_group_fields[ uid ].selMultiRows = true;
        self.grid_group_fields[ uid ].setDateFormat("%m-%d-%Y");
		self.grid_group_fields[ uid ].enableDragAndDrop( true );
		self.grid_group_fields[ uid ].enableMercyDrag(true);
		
		self.grid_group_fields[ uid ].enableEditEvents(false,false,false);
		
		self.grid_group_fields[ uid ].init();
		
		self.grid_group_fields[ uid ].attachEvent("onXLS", function() {
        	self.progressOnForm( uid );
		});
		self.grid_group_fields[ uid ].attachEvent("onXLE", function() {
			self.progressOffForm( uid );
		});
        self.grid_group_fields[ uid ].attachEvent("onRowSelect", function( id, ind )
        {
             
        });
		
		self.grid_group_fields[ uid ].attachEvent("onDrag", function(sId,tId,sObj,tObj,sInd,tInd)
		{
			return false;
		});
		
		self.grid_group_fields[ uid ].attachEvent("onDragIn",function(sid,tid,sgrid,tgrid){
			self.is_grid_pages[ uid ] = "";
			return true;
        });
    }

	
	
	/* HELPERS */
	
	,_setStatus : function(m)
	{
		document.getElementById("status_info").innerHTML = m;	
	}
	,_setStatusForm : function(uid, m)
	{
		document.getElementById("formbuilder_status_info_"+uid).innerHTML = m;	
	}
	
	,_setStatusError : function(m)
	{
		document.getElementById("errors_info").innerHTML = m;	
	}
	
	,_setStatusErrorForm : function(uid, m)
	{
		document.getElementById("formbuilder_errors_info_"+uid).innerHTML = m;	
	}
	
	,_setStatusDataTransfer : function(m, isActive)
	{
		dhtmlx.message({ text : m})	;
		if( isActive )
		{
			document.getElementById("data_transfer_info").innerHTML = m;
			document.getElementById("data_transfer_info").style.backgroundImage = "url(icons/network.gif)";
		}
		else
		{
			document.getElementById("data_transfer_info").innerHTML = m;
			document.getElementById("data_transfer_info").style.backgroundImage = "url(icons/network-accept.png)";
		}
	}
	
	,_setStatusSocket : function(m, isOffline)
	{
		dhtmlx.message({ text : m})	;
		document.getElementById("socket_info").innerHTML = "socket: " + m;
		document.getElementById("socket_info").style.backgroundImage = "url(icons/socket.gif)";
		if( isOffline )
			document.getElementById("socket_info").style.backgroundImage = "url(icons/socket_disconnected.png)";
	}
	
	,_setStatusDataTransferForm : function(uid, m, isActive)
	{
		dhtmlx.message({ text : m})	;
		if( isActive )
		{
			document.getElementById("formbuilder_data_transfer_info_"+uid).innerHTML = m;
			document.getElementById("formbuilder_data_transfer_info_"+uid).style.backgroundImage = "url(icons/network.gif)";
		}
		else
		{
			document.getElementById("formbuilder_data_transfer_info_"+uid).innerHTML = m;
			document.getElementById("formbuilder_data_transfer_info_"+uid).style.backgroundImage = "url(icons/network-accept.png)";
		}
	}
	
	,_setStatusUser : function(m, ok)
	{
		if( typeof ok === 'undefined')
		{
			ok = true;
		}
		document.getElementById("user_info").getElementsByTagName("span")[0].innerHTML = m;
		if(ok)
		{
			document.getElementById("user_info_status").src = "icons/online.png";
			dhtmlx.message({ text : m})	;
		}
		else
		{
			document.getElementById("user_info_status").src = "icons/offline.png";
			dhtmlx.message({ type : "error", text : m})	;
		}
	}
	
	,_setStatusUserForm : function(uid, m, ok)
	{
		if( typeof ok === 'undefined')
		{
			ok = true;
		}
		document.getElementById("formbuilder_user_info_"+uid).getElementsByTagName("span")[0].innerHTML = m;
		if(ok)
		{
			document.getElementById("formbuilder_user_info_status_"+uid).src = "icons/online.png";
			dhtmlx.message({ text : m})	;
		}
		else
		{
			document.getElementById("formbuilder_user_info_status_"+uid).src = "icons/offline.png";
			dhtmlx.message({ type : "error", text : m})	;
		}
	}
	
	,_feedGrid_group_fields : function( uid )
	{
		var self = this;
		self.grid_group_fields[ uid ].clearAll();
		var gridURL = CAIRS.MAP.API.getMappedURL( {
				resource : "/LibraryFields/groups",  // mandatory
				responseType : "json", // not mandatory, default json
				params : "columns=" + self.model.conf_grid_group_fields.ids + "" // not mandatory, default none
		} );
		self.grid_group_fields[ uid ].load( gridURL, function()
		{

		}, "json");
	}
	
	,_feedGrid_form_fieldsNormalize : function( uid, page_id )
	{
		var self = this;
		
		self.grid_form_fields[ uid ].clearAll();
		
		self.pages[ uid ][ page_id ].list[0].list.sort( function(a,b)
		{
			return a.index - b.index;
		});
		
		for(var x = 0; x < self.pages[ uid ][ page_id ].list[0].list.length; x++)
		{
			var field = self.pages[ uid ][ page_id ].list[0].list[x];
			self.pages[ uid ][ page_id ].list[0].list[x].index = x;
			self.pages[ uid ][ page_id ].list[0].list[x].data[13] = x;
			self.grid_form_fields[ uid ].addRow( field.field_id, self.pages[ uid ][ page_id ].list[0].list[x].data, x);
		}
		
		if( self.pages[ uid ][ page_id ].page_layout == "D" )
			for(var x = 0; x < self.pages[ uid ][ page_id ].list[2].list.length; x++)
			{
				var field = self.pages[ uid ][ page_id ].list[2].list[x];
				self.pages[ uid ][ page_id ].list[2].list[x].index = x;
				self.pages[ uid ][ page_id ].list[2].list[x].data[13] = x;
				self.grid_form_fields[ uid ].addRow( field.field_id, field.data, x);
			}
		
		self._reOrderPageFields( uid );
	}
	
	,_feedGrid_form_fields : function( uid, page_id )
	{
		var self = this;
		
		self.grid_form_fields[ uid ].clearAll();
		
		self.pages[ uid ][ page_id ].list[0].list.sort( function(a,b)
		{
			return a.index - b.index;
			
		});
		
		for(var x = 0; x < self.pages[ uid ][ page_id ].list[0].list.length; x++)
		{
			var field = self.pages[ uid ][ page_id ].list[0].list[x];
			self.pages[ uid ][ page_id ].list[0].list[x].data[13] = field.index;
			
			//console.log( field );
			//console.log( field.field_id );
			//console.log( self.pages[ uid ][ page_id ].list[0].list[x].data );
			//console.log( field.index );
			//console.log(  );
			
			self.grid_form_fields[ uid ].addRow( field.field_id, self.pages[ uid ][ page_id ].list[0].list[x].data, field.index);
		}
		
		//console.log( self.pages[ uid ][ page_id ].page_layout );
		
		if( self.pages[ uid ][ page_id ].page_layout == "D" )
		{
			for(var x = 0; x < self.pages[ uid ][ page_id ].list[2].list.length; x++)
			{
				var field = self.pages[ uid ][ page_id ].list[2].list[x];
				self.pages[ uid ][ page_id ].list[2].list[x].data[13] = field.index;
				self.grid_form_fields[ uid ].addRow( field.field_id, field.data, field.index);
			}
		}
	}


	,_feedGrid_grid_field_propertie_options : function( uid, page_id, field_id )
	{
		var self = this;
		
		//console.log( field_id );
		
		self.grid_field_propertie_options[ uid ].clearAll();
				
		self._getPageColumnList( uid, page_id, "first" ).forEach( function(parentField, index, array)
		{					
			self._getPageColumnList( uid, page_id, "first" )[index].list.sort( function(a,b)
			{
				return a.index - b.index;
			});
			self._getPageColumnList( uid, page_id, "first" )[index].options.sort( function(a,b)
			{
				return a.index - b.index;
			});	
		});
		
		if( self.pages[ uid ][ page_id ].page_layout == "D" )
		{
			self._getPageColumnList( uid, page_id, "second" ).forEach( function(parentField, index, array)
			{					
				self._getPageColumnList( uid, page_id, "second" )[index].list.sort( function(a,b)
				{
					return a.index - b.index;
				});
				self._getPageColumnList( uid, page_id, "second" )[index].options.sort( function(a,b)
				{
					return a.index - b.index;
				});	
			});
		}
		
		// iterates over fields of the page on column 1
		self._getPageColumnList( uid, page_id, "first" ).forEach( function(parentField, parentIndex, array)
		{					
			// return only options of selected field of form
			if( parentField.field_id == field_id )
			{
				//console.log( "parentField.field_id " + parentField.field_id );
				//console.log( parentField );
				
				
				if( parentField.type == "label" || parentField.type == "fieldset" ||  parentField.type == "radio" ||  parentField.type == "checkbox" )
				{ // lets read the list property of the field
					//console.log("reading list array");
					// field list
					/* for nested group fields and radio matrix */
					self._getPageColumnList( uid, page_id, "first" )[parentIndex].list.forEach( function(childField, childIndex, array)
					{					 
						var field = childField;
						//console.log( "childField.field_id " + field.field_id );
						//console.log(  self._getPageColumnList( uid, page_id, "first" )[parentIndex] );
						//console.log( self._getPageColumnList( uid, page_id, "first" )[parentIndex].list[childIndex] );
						
						//console.log( self._getPageColumnList( uid, page_id, "first" )[parentIndex].list[childIndex].data );
						//console.log( field.index );
						
						//self._getPageColumnList( uid, page_id, "first" )[parentIndex].data[13] = field.index;
						
						//console.log( "field.data[13] " + self._getPageColumnList( uid, page_id, "first" )[parentIndex].data[13] );
						//console.log( "field.data " + self._getPageColumnList( uid, page_id, "first" )[parentIndex].list[childIndex].data );
						if( self._getPageColumnList( uid, page_id, "first" )[parentIndex].list[childIndex].type != "settings")
							self.grid_field_propertie_options[ uid ].addRow( field.option_id, self._getPageColumnList( uid, page_id, "first" )[parentIndex].list[childIndex].data, field.index);
					});
				}
				else if( parentField.type == "multiselect" || parentField.type == "combo" || parentField.type == "select" )
				{ // lets read the options property
					//console.log("reading options array");
					// field options
					/* combo and Multiselect */
					self._getPageColumnList( uid, page_id, "first" )[parentIndex].options.forEach( function(childField, childIndex, array)
					{					
						var field = childField;
						if( self._getPageColumnList( uid, page_id, "first" )[parentIndex].options[childIndex].type != "settings")
							self.grid_field_propertie_options[ uid ].addRow( field.option_id, self._getPageColumnList( uid, page_id, "first" )[parentIndex].options[childIndex].data, field.index);
					});
				}
			}
		});

		// if this page has 2 columns
		if( self.pages[ uid ][ page_id ].page_layout == "D" )
		{
			// iterates over fields of the page on column 2
			self._getPageColumnList( uid, page_id, "second" ).forEach( function(parentField, parentIndex, array)
			{					
				// return only options of selected field of form
				if( parentField.field_id == field_id )
				{
					//console.log( "parentField.field_id " + parentField.field_id );
					//console.log( parentField );
					if( parentField.type == "label" || parentField.type == "fieldset" ||  parentField.type == "radio" ||  parentField.type == "checkbox" )
					{ // lets read the list property of the field
						//console.log("reading list array");
						// field list
						/* for nested group fields and radio matrix */
						self._getPageColumnList( uid, page_id, "second" )[parentIndex].list.forEach( function(childField, childIndex, array)
						{					 
							var field = childField;
							console.log( self._getPageColumnList( uid, page_id, "second" )[parentIndex].list );
							console.log( self._getPageColumnList( uid, page_id, "second" )[parentIndex].list[childIndex].type == "settings" );
							console.log( self._getPageColumnList( uid, page_id, "second" )[parentIndex].list[childIndex].data );
							if( self._getPageColumnList( uid, page_id, "second" )[parentIndex].list[childIndex].type != "settings")
								self.grid_field_propertie_options[ uid ].addRow( field.option_id, self._getPageColumnList( uid, page_id, "second" )[parentIndex].list[childIndex].data, field.index);
						});
					}
					else if( parentField.type == "multiselect" || parentField.type == "combo" || parentField.type == "select" )
					{ // lets read the options property
						//console.log("reading options array");
						// field options
						/* combo and Multiselect */
						self._getPageColumnList( uid, page_id, "second" )[parentIndex].options.forEach( function(childField, childIndex, array)
						{					
							var field = childField;
							if( self._getPageColumnList( uid, page_id, "second" )[parentIndex].options[childIndex].type != "settings")
								self.grid_field_propertie_options[ uid ].addRow( field.option_id, self._getPageColumnList( uid, page_id, "second" )[parentIndex].options[childIndex].data, field.index);
						});
					}
				}
			});
		}
		
	}	
	
	,_mountFormBuilderScreen : function( uid, form_ids )
	{
		var self = this, form_ids = form_ids  || "";
		
		if( form_ids == "" )
		{
			form_ids = "-1";
		}
		
		form_ids.toString().split(",").forEach( function( form_id, index, array )
		{		
			try
			{
				
				
				form_id = parseInt(form_id);
				
				uid = uid + "_" + form_id;
				
				self.pages[ uid ] = [];
				self.selected_page[ uid ] = null;
				self.dataLoaded_tree_form_library_field_category[ uid ] = false;
				self.dataLoaded_tags_form[ uid ] = false;
				
				self._window_form( uid, form_id );
				self._layout_form( uid, form_id );
				self._tabbar_form( uid, form_id );
				self._form_properties( uid, form_id );
				self._layout_form_layout( uid, form_id );
				self._layout_form_layout_left( uid, form_id );
				self._layout_form_layout_right( uid, form_id );
				
				self._grid_pages( uid, form_id );
				
				self._tabbar_form_fields( uid, form_id );
				self._tabbar_form_create_fields( uid, form_id );
				
				self._tabbar_form_library_fields( uid, form_id );
				self._grid_library_fields( uid, form_id );
				
				self._grid_group_fields( uid, form_id );
				self._toolbar_form_pages( uid, form_id );
				self._feedGrid_library_fields( uid, form_id );
				self._feedGrid_group_fields( uid, form_id );
				
				
				self._toolbar_field_propertie( uid, form_id );
				self._toolbar_form( uid, form_id );
				
				//self.layout_form_preview[ uid ].cells("a").dock();
				self._layout_form_preview( uid );
				self._toolbar_form_preview( uid );
				
				dhtmlx.compat("dnd");
				
				self._grid_form_fields( uid, form_id );
				self._toolbar_form_fields( uid, form_id );
				self._tabbar_form_add_field( uid, form_id );
				self._dataView_type_of_fields( uid, form_id );
				self._form_custom_field( uid, form_id );
				self._toolbar_custom_field( uid, form_id );
				
				if( form_id > 0)
				{
					self._readFormData( uid, form_id );
				}
				
			}catch(e)
			{
				//console.log(e.stack);
			}
		});
	}
	
	,_startPreview : function( uid )
	{
		var self = this;
		//console.log("starting preview");
		
		try
		{
			self.tab_pages_preview[ uid ].clearAll()
		}catch(e)
		{
			
		}
		try
		{
			self.form_preview[ uid ].unload();
			self.form_preview[ uid ] = null;
		}catch(e)
		{
			
		}
		
		self._tab_pages_preview( uid );
		self._form_preview( uid );
	}
	
	,_checkTreeItems : function( uid, categoryID )
	{
		
		var self = this;
		var mult_categories = "";
		self.tree_form_library_field_category[ uid ].getAllChecked().toString().split(",").forEach( function( categoryID, index, array )
		{
			if(categoryID != 'manage')
				mult_categories = mult_categories + self._getCategorySearchCriteria( uid, categoryID  ) + ",";
		});
		
		if (mult_categories.charAt(mult_categories.length - 1) == ',') {
				mult_categories = mult_categories.substr( 0, mult_categories.length - 1 );
		}
		
		self._setStatus("Listing : " + mult_categories);
		
		if( mult_categories != "false" && mult_categories != ""  )
		{
			self._feedGrid_library_fields( uid, mult_categories );
		}
		else
		{
			self._setStatus("Listing no fields. Pick a category for listing fields.");
			self.grid_library_fields[ uid ].clearAll();
		}
	}

	
	,_getCategorySearchCriteria : function( uid, categoryID ){
		var self = this;
		//console.log("categoryID : " + categoryID);
		for(var x = 0; x < self.data_store[ uid ].category.length; x++)
		{
			var category = self.data_store[ uid ].category[x];
			if( typeof category.CategoryID !== 'undefined' )
			{
				if( category.CategoryID == categoryID )
				{
					return self.data_store[ uid ].category[x].SearchCriteria;
					//console.log("category.CategoryID : " + category.CategoryID);
				}
			}	
		}
		return false;
	}
	
	,_putSubCategoryOnTree : function( uid, categoryID, subCategoryObj ){
		var self = this;
		for(var x = 0; x < self.model.conf_tree_form_library_field_category.item[0].item.length; x++)
		{
			var category = self.model.conf_tree_form_library_field_category.item[0].item[x];
			if( typeof category.id !== 'undefined' )
				if( category.id == categoryID )
				{
					if( typeof self.model.conf_tree_form_library_field_category.item[0].item[x].item === 'undefined' )
					{
						self.model.conf_tree_form_library_field_category.item[0].item[x].item = [];
					}
					self.model.conf_tree_form_library_field_category.item[0].item[x].item.push( subCategoryObj );
				}
		}
	}
	
	,_reOrderPages : function( uid )
	{
		var self = this, form_id = self.form_properties[ uid ].getItemValue( "form_id" ), hash = null;		
		
		self.progressOnForm( uid );
		
		var orderingArray = [];
		self.grid_pages[ uid ].forEachRow( function(rID)
		{
			//self.grid_pages[ uid ].cells(rID, self.grid_pages[ uid ].getColIndexById( "index" )).setValue( self.grid_pages[ uid ].getRowIndex( rID ) );
			//self._getPageOnModel( uid, rID)[ "index" ] = self.grid_pages[ uid ].getRowIndex( rID );
			var objOrdering = {};
			objOrdering[ "item_id" ] = rID;
			objOrdering[ "index" ] = self.grid_pages[ uid ].getRowIndex( rID );
			orderingArray.push( objOrdering );
		});
		
		hash = { ordering_column_name : "index", data : orderingArray }; 
		
		if( orderingArray.length >= 0 )
		{
			self._setStatusDataTransferForm(uid, "ordering "+orderingArray.length+" pages", true);
			CAIRS.MAP.API.post({
				resource : 	"/forms/" + form_id + "/pages/order"// mandatory
				,format : "json" // json, yaml, xml. Default: json. Not mandatory
				,payload : "hash=" + JSON.stringify( hash ) // mandatory for PUT and POST
				,onSuccess : function( request ) // not mandatory
				{ 
					var json = eval('(' + request.response + ')');
					if( json.status == "success" )	
					{
						//dhtmlx.message( {type : "error", text : json.response} );
						self._setStatusDataTransferForm(uid, ""+orderingArray.length+" pages ordered");
						
						self.grid_pages[ uid ].forEachRow( function(rID)
						{
							self.grid_pages[ uid ].cells(rID, self.grid_pages[ uid ].getColIndexById( "index" )).setValue( self.grid_pages[ uid ].getRowIndex( rID ) );
							self._getPageOnModel( uid, rID)[ "index" ] = self.grid_pages[ uid ].getRowIndex( rID );
						});
						
						self.progressOffForm( uid );
					}
					else
					{
						dhtmlx.message( {type : "error", text : "Pages wasn't ordered. reason: " + json.response} );
						self._setStatusDataTransferForm(uid, "pages wasn't ordered");
						if( json.response == "token not authorized" )
							self._setStatusUserForm(uid, "token expired. Please login again", false);
						self.progressOffForm( uid );
					}
					
					
				}
				,onFail : function( request )
				{ // not mandatory
					var json = eval('(' + request.response + ')');
					dhtmlx.message( {type : "error", text : "Pages wasn't ordered. reason: " + json.response} );
					self._setStatusDataTransferForm(uid, "pages wasn't ordered");
					if( json.response == "token not authorized" )
						self._setStatusUserForm(uid, "token expired. Please login again", false);
					self.progressOffForm( uid );
				}
			});
		}
	}	
	,_reOrderPageFields : function( uid )
	{
		var self = this, hash = null;
		
		
		var orderingArray = []
		self.grid_form_fields[ uid ].forEachRow( function(rID)
		{
			var objOrdering = {};
			objOrdering[ "item_id" ] = rID;
			objOrdering[ "index" ] = self.grid_form_fields[ uid ].getRowIndex( rID );
			orderingArray.push( objOrdering );
		});
		
		hash = { ordering_column_name : "index", data : orderingArray }; 
		
		if( orderingArray.length >= 0 )
		{
			self._setStatusDataTransferForm(uid, "ordering "+orderingArray.length+" fields", true);
			self.progressOnForm( uid );
			var form_id = self.form_properties[ uid ].getItemValue( "form_id" );
			var page_id = self.grid_pages[ uid ].getSelectedRowId();
			
			CAIRS.MAP.API.post({
				resource : 	"/forms/" + form_id + "/pages/" + page_id + "/fields/order"// mandatory
				,format : "json" // json, yaml, xml. Default: json. Not mandatory
				,payload : "hash=" + JSON.stringify( hash ) // mandatory for PUT and POST
				,onSuccess : function( request ) // not mandatory
				{ 
					var json = eval('(' + request.response + ')');
					if( json.status == "success" )	
					{
						//dhtmlx.message( {type : "error", text : json.response} );
						self._setStatusDataTransferForm(uid, ""+orderingArray.length+" fields ordered");
						
						self.grid_form_fields[ uid ].forEachRow( function(rID)
						{
							var nnindex = self.grid_form_fields[ uid ].getRowIndex( rID );
							self.grid_form_fields[ uid ].cells(rID, self.grid_form_fields[ uid ].getColIndexById( "index" )).setValue( nnindex );
							//console.log(self._getPageField( uid, self.selected_page[ uid ], rID ));
							//console.log("current field index: " + self._getPageField( uid, self.selected_page[ uid ], rID ).index);
							self._getPageField( uid, self.selected_page[ uid ], rID ).index = nnindex;
							//console.log("new field index: " + self._getPageField( uid, self.selected_page[ uid ], rID ).index);
							//console.log( self._getPageField( uid, self.selected_page[ uid ], rID ) );
						});
						
						
						self.progressOffForm( uid );
					}
					else
					{
						dhtmlx.message( {type : "error", text : "fields wasn't ordered. reason: " + json.response} );
						self._setStatusDataTransferForm(uid, "fields wasn't ordered");
						if( json.response == "token not authorized" )
							self._setStatusUserForm(uid, "token expired. Please login again", false);
						self.progressOffForm( uid );
					}
				}
				,onFail : function( request )
				{ // not mandatory
					var json = eval('(' + request.response + ')');
					dhtmlx.message( {type : "error", text : "fields wasn't ordered. reason: " + json.response} );
					self._setStatusDataTransferForm(uid, "fields wasn't ordered");
					if( json.response == "token not authorized" )
						self._setStatusUserForm(uid, "token expired. Please login again", false);
					self.progressOffForm( uid );
				}
			});
		}
	}
	
	
	,_reOrderFieldOptions : function( uid )
	{
		var self = this, hash = null;
		
		
		var orderingArray = []
		self.grid_field_propertie_options[ uid ].forEachRow( function(rID)
		{
			var objOrdering = {};
			objOrdering[ "item_id" ] = rID;
			objOrdering[ "index" ] = self.grid_field_propertie_options[ uid ].getRowIndex( rID );
			orderingArray.push( objOrdering );
		});
		
		hash = { ordering_column_name : "index", data : orderingArray }; 	
		
		
		if( orderingArray.length >= 0 )
		{
			self._setStatusDataTransferForm(uid, "ordering "+orderingArray.length+" options", true);
			self.progressOnForm( uid );
			var form_id = self.form_properties[ uid ].getItemValue( "form_id" );
			var page_id = self.grid_pages[ uid ].getSelectedRowId();
			var field_id = self.grid_form_fields[ uid ].getSelectedRowId();	
			
			CAIRS.MAP.API.post({
				resource : 	"/forms/" + form_id + "/pages/" + page_id + "/fields/"+field_id+"/options/order"// mandatory
				,format : "json" // json, yaml, xml. Default: json. Not mandatory
				,payload : "hash=" + JSON.stringify( hash ) // mandatory for PUT and POST
				,onSuccess : function( request ) // not mandatory
				{ 
					var json = eval('(' + request.response + ')');
					if( json.status == "success" )	
					{
						//dhtmlx.message( {type : "error", text : json.response} );
						self._setStatusDataTransferForm(uid, ""+orderingArray.length+" options ordered");
						
						self.grid_field_propertie_options[ uid ].forEachRow( function(rID)
						{
							var nnindex = self.grid_field_propertie_options[ uid ].getRowIndex( rID );
							self.grid_field_propertie_options[ uid ].cells(rID, self.grid_field_propertie_options[ uid ].getColIndexById( "index" )).setValue( nnindex );
							//console.log(  self._getFieldOption( uid, self.selected_page[ uid ], self.grid_form_fields[ uid ].getSelectedRowId(), rID )  );
							self._getFieldOption( uid, self.selected_page[ uid ], self.grid_form_fields[ uid ].getSelectedRowId(), rID ).data[ self.grid_field_propertie_options[ uid ].getColIndexById( "index" ) ] = nnindex;
							self._getFieldOption( uid, self.selected_page[ uid ], self.grid_form_fields[ uid ].getSelectedRowId(), rID ).index = nnindex;
						});
						self.progressOffForm( uid );
					}
					else
					{
						dhtmlx.message( {type : "error", text : "fields wasn't ordered. reason: " + json.response} );
						self._setStatusDataTransferForm(uid, "fields wasn't ordered");
						if( json.response == "token not authorized" )
							self._setStatusUserForm(uid, "token expired. Please login again", false);
						self.progressOffForm( uid );
					}
				}
				,onFail : function( request )
				{ // not mandatory
					var json = eval('(' + request.response + ')');
					dhtmlx.message( {type : "error", text : "fields wasn't ordered. reason: " + json.response} );
					self._setStatusDataTransferForm(uid, "fields wasn't ordered");
					if( json.response == "token not authorized" )
						self._setStatusUserForm(uid, "token expired. Please login again", false);
					self.progressOffForm( uid );
				}
			});
		}
	}
	
	,_getPageField : function( uid, page_id, field_id )
	{
		var self = this;
		for(var x = 0; x < self.pages[ uid ][ page_id ].list[0].list.length; x++)
		{
			var field = self.pages[ uid ][ page_id ].list[0].list[x];
			if( typeof field.field_id !== 'undefined' )
				if( field.field_id.toString() == field_id.toString() ) return field;
		}
		if( self.pages[ uid ][ page_id ].page_layout == "D" )
		{
			for(var x = 0; x < self.pages[ uid ][ page_id ].list[2].list.length; x++)
			{
				var field = self.pages[ uid ][ page_id ].list[2].list[x];
				if( typeof field.field_id !== 'undefined' )
					if( field.field_id.toString() == field_id.toString() ) return field;
			}
		}
		return false;
	}
	
	,_deletePageField : function( uid, page_id, field_id, clientOnly )
	{
		var self = this;
		
		
		for(var x = 0; x < self._getPageColumnList( uid, page_id, "first" ).length; x++)
		{
			var field = self._getPageColumnList( uid, page_id, "first" )[x];
		
			if( typeof field.field_id === 'undefined' ) continue;
			
			if( field.field_id.toString() == field_id.toString() )
			{
				self.progressOnForm( uid );
				var form_id = self.form_properties[ uid ].getItemValue( "form_id" );
				var found_field_index = x;
				
				if( clientOnly )
				{
					self._setStatusDataTransferForm(uid, "trying to move field("+field_id+")", true);
					self.grid_form_fields[ uid ].deleteRow(field_id);
					self._getPageColumnList( uid, page_id, "first" ).splice(found_field_index, 1);
					self.toolbar_form_fields[ uid ].disableItem("edit_field");
					self.toolbar_form_fields[ uid ].disableItem("delete_field");
					self.tabbar_form_create_fields[ uid ].hideTab("field_properties");
					if( self.form_field_propertie[ uid ] )
					{
						self.form_field_propertie[ uid ].unload();
						self.form_field_propertie[ uid ] = null;
					}
					self._reOrderPageFields( uid );
				}
				else
				{
					self._setStatusDataTransferForm(uid, "trying to delete field("+field_id+")", true);
					CAIRS.MAP.API.del(
					{
						resource : 	"/forms/" + form_id + "/pages/" + page_id + "/fields/"+ field_id // mandatory
						,format : "json" // json, yaml, xml. Default: json. Not mandatory
						,onSuccess : function( request ) // not mandatory
						{ 
							var json = eval('(' + request.response + ')');
							dhtmlx.message( {type : "error", text : "field("+field_id+") deleted"} );
							self._setStatusDataTransferForm(uid, "field("+field_id+") deleted");
							
							self.grid_form_fields[ uid ].deleteRow(field_id);
							self._getPageColumnList( uid, page_id, "first" ).splice(found_field_index, 1);
							
							
							self.toolbar_form_fields[ uid ].disableItem("edit_field");
							self.toolbar_form_fields[ uid ].disableItem("delete_field");
							self.tabbar_form_create_fields[ uid ].hideTab("field_properties");
							if( self.form_field_propertie[ uid ] )
							{
								self.form_field_propertie[ uid ].unload();
								self.form_field_propertie[ uid ] = null;
							}
							
							
							self._reOrderPageFields( uid );
	
							
							self.progressOffForm( uid );
										
						}
						,onFail : function( request )
						{ // not mandatory
							var json = eval('(' + request.response + ')');
							dhtmlx.message( {type : "error", text : json.response} );
							self._setStatusDataTransferForm(uid, "field("+field_id+") not deleted");
							self.progressOffForm( uid );
						}
					});
				}
				
			}
		}
		
		if( self.pages[ uid ][ page_id ].page_layout == "D" )
		{
			for(var x = 0; x < self._getPageColumnList( uid, page_id, "second" ).length; x++)
			{
				var field = self._getPageColumnList( uid, page_id, "second" )[x];
			
				if( typeof field.field_id === 'undefined' ) continue;
				
				if( field.field_id.toString() == field_id.toString() )
				{
					self.progressOnForm( uid );
					self._setStatusDataTransferForm(uid, "trying to delete field("+field_id+")", true);
					var form_id = self.form_properties[ uid ].getItemValue( "form_id" );
					var found_field_index = x;
					CAIRS.MAP.API.del(
					{
						resource : 	"/forms/" + form_id + "/pages/" + page_id + "/fields/"+ field_id // mandatory
						,format : "json" // json, yaml, xml. Default: json. Not mandatory
						,onSuccess : function( request ) // not mandatory
						{ 
							var json = eval('(' + request.response + ')');
							dhtmlx.message( {type : "error", text : "field("+field_id+") deleted"} );
							self._setStatusDataTransferForm(uid, "field("+field_id+") deleted");
							
							self.grid_form_fields[ uid ].deleteRow(field_id);
							self._getPageColumnList( uid, page_id, "second" ).splice(found_field_index, 1);
							
							self.toolbar_form_fields[ uid ].disableItem("edit_field");
							self.toolbar_form_fields[ uid ].disableItem("delete_field");
							self.tabbar_form_create_fields[ uid ].hideTab("field_properties");
							if( self.form_field_propertie[ uid ] )
							{
								self.form_field_propertie[ uid ].unload();
								self.form_field_propertie[ uid ] = null;
							}
							
							
							
							self._reOrderPageFields( uid );
	
							
							self.progressOffForm( uid );
										
						}
						,onFail : function( request )
						{ // not mandatory
							var json = eval('(' + request.response + ')');
							dhtmlx.message( {type : "error", text : json.response} );
							self._setStatusDataTransferForm(uid, "field("+field_id+") not deleted");
							self.progressOffForm( uid );
						}
					});
					
					
				}
			}
		}
		
		
	}
	
	,_deleteFieldOption : function( uid, page_id, field_id, option_id )
	{
		var self = this;
		
		//console.log("_deleteFieldOption");
		
		for(var x = 0; x < self._getPageColumnList( uid, page_id, "first" ).length; x++)
		{
			if( typeof self._getPageColumnList( uid, page_id, "first" )[x].field_id !== 'undefined' )
			{
				self._getPageColumnList( uid, page_id, "first" )[x].list.forEach( function( option, index, array )
				{		
					if( option.field_id.toString() == option_id.toString() )
					{
						self._getPageColumnList( uid, page_id, "first" )[x].list.splice(index, 1);
					}
				});
				
				self._getPageColumnList( uid, page_id, "first" )[x].options.forEach( function( option, index, array )
				{		
					if( option.field_id.toString() == option_id.toString() )
					{
						self._getPageColumnList( uid, page_id, "first" )[x].options.splice(index, 1);
					}
				});

			}
		}
		
		// if double column
		if( self.pages[ uid ][ page_id ].page_layout == "D" )
		{
			for(var x = 0; x < self._getPageColumnList( uid, page_id, "second" ).length; x++)
			{
				if( typeof self._getPageColumnList( uid, page_id, "second" )[x].field_id !== 'undefined' )
				{
					
					self._getPageColumnList( uid, page_id, "second" )[x].list.forEach( function( option, index, array )
					{		
						if( option.field_id.toString() == option_id.toString() )
						{
							self._getPageColumnList( uid, page_id, "second" )[x].list.splice(index, 1);
						}
					});
					self._getPageColumnList( uid, page_id, "second" )[x].options.forEach( function( option, index, array )
					{		
						if( option.field_id.toString() == option_id.toString() )
						{
							self._getPageColumnList( uid, page_id, "second" )[x].options.splice(index, 1);
						}
					});
				}
			}
		}
		
		self.grid_field_propertie_options[ uid ].deleteRow( option_id );
		
		self._reOrderFieldOptions( uid );
		
		self.toolbar_grid_field_propertie_options[ uid ].disableItem("delete");
		self.toolbar_grid_field_propertie_options[ uid ].disableItem("edit");
	}
	
	,_getFieldOption : function( uid, page_id, field_id, option_id )
	{
		var self = this;
		//console.log( "_getFieldOption" );
		//console.log( arguments );
		
		for(var x = 0; x < self._getPageColumnList( uid, page_id, "first" ).length; x++)
		{
			var field = self._getPageColumnList( uid, page_id, "first" )[x];
			
			if( typeof field.field_id !== 'undefined' )
			{
				if(field.field_id.toString() == field_id.toString())
				{
					//console.log(field);
					//console.log(field.type);
					if( field.type == "label" || field.type == "fieldset" ||  field.type == "radio" ||  field.type == "checkbox" )
					{ // lets read the list property
						var found = false;
						field.list.forEach( function( option, index, array )
						{		
							//console.log(option);
							if( option.option_id.toString() == option_id.toString() )
								found = option;
						});
						return found;
					}
					else if( field.type == "multiselect" || field.type == "combo" || field.type == "select" )
					{ // lets read the options property
						var found = false;
						field.options.forEach( function( option, index, array )
						{		
							//console.log(option);
							if( option.option_id.toString() == option_id.toString() )
								found = option;
						});
						//console.log(found);
						return found;
					}
				}
				
				
			}
		}
		
		// if double column
		if( self.pages[ uid ][ page_id ].page_layout == "D" )
		{
			for(var x = 0; x < self._getPageColumnList( uid, page_id, "second" ).length; x++)
			{
				var field = self._getPageColumnList( uid, page_id, "second" )[x];
				
				if( typeof field.field_id !== 'undefined' )
				{
					//console.log(field.type);
					if( field.type == "label" || field.type == "fieldset" ||  field.type == "radio" ||  field.type == "checkbox" )
					{ // lets read the list property
						var found = false;
						field.list.forEach( function( option, index, array )
						{		
							//console.log(option);
							if( option.option_id.toString() == option_id.toString() )
								found = option;
						});
						//console.log(found);
						return found;
					}
					else if( field.type == "multiselect" || field.type == "combo" || field.type == "select" )
					{ // lets read the options property
						var found = false;
						field.options.forEach( function( option, index, array )
						{		
							console.log(option);
							if( option.option_id.toString() == option_id.toString() )
								found = option;
						});
						//console.log(found);
						return found;
					}
				}
			}
		}
		return false;
	}
	
	
	
	,_startDataTree : function( uid, callBack )
	{
		var self = this;

		self._setStatusDataTransfer("loading categories");
		CAIRS.MAP.API.get({
			resource : 	"/LibraryFields/category" // mandatory
			,format : "json" // json, yaml, xml. Default: json. Not mandatory
			,onSuccess : function(request){ // not mandatory
				//console.log(json.category);
				try
				{
					var json = eval('(' + request.response + ')');
					if( json.status == "success" )	
					{
						self.data_store[ uid ]["category"] = json.category;
						for( var x = 0; x < json.category.length; x++)
						{
							var category = json.category[x];
							if(  category.SearchCriteria != "8_Field Group" && category.SearchCriteria != "9_Field Tags")
							{
								self.model.conf_tree_form_library_field_category.item[0].item.push({ id : category.CategoryID,  text : category.Description });
							}
						}
						self._setStatusDataTransfer("category 100% loaded");
					}
					else
					{
				
						dhtmlx.message( {type : "error", text : json.response} );
						self.status_bar[ uid ].setText(json.response);
						self.data_store[ uid ]["category"] = [];
					}
				}
				catch(e)
				{
					//console.log("error category");
					//console.log(e)
				}
			}
			,onFail : function(request)
			{ // not mandatory
				//console.log(request);
				if(request.status == "0")
				{
					dhtmlx.message( {type : "error", text : "unable to reach resource"} );
					self._setStatusError("unable to reach resource");
				}
				else
				{
					dhtmlx.message( {type : "error", text : "fatal error on server side"} );
					self._setStatusError("error 500");
				}
				self._setStatus("Application could not start");
				self.data_store[ uid ]["category"] = [];
			}
		});

		CAIRS.MAP.API.get({
			resource : 	"/LibraryFields/subcategory" // mandatory
			,format : "json" // json, yaml, xml. Default: json. Not mandatory
			,onSuccess : function(request){ // not mandatory
				try
				{
					var json = eval('(' + request.response + ')');
				
					if( json.status == "success" )	
					{
						self.data_store[ uid ]["subcategory"] = json.subcategory;
						for( var x = 0; x < json.subcategory.length; x++)
						{
							var subcategory = json.subcategory[x];
							self._putSubCategoryOnTree( uid, subcategory.ParentId, { id : subcategory.SearchCriteria, text : subcategory.Description } )
						}
						self._setStatusDataTransfer("subcategory 100% loaded");
						
						if( callBack )
						{
							callBack();
						}
					}
					else
					{
						//console.log(request);
						dhtmlx.message( {type : "error", text : json.response} );
						self.status_bar[ uid ].setText(json.response);
						self.data_store[ uid ]["subcategory"] = [];
					}
				}
				catch(e)
				{
					//console.log(e.stack);	
				}
			}
			,onFail : function(request){ // not mandatory
				if(request.status == "0")
				{
					dhtmlx.message( {type : "error", text : "unable to reach resource"} );
					self._setStatusError("unable to reach resource");
				}
				else
				{
					dhtmlx.message( {type : "error", text : "fatal error on server side"} );
					self._setStatusError("error 500");
				}
				self._setStatus("Application could not start");
				self.data_store[ uid ]["subcategory"] = [];
			}
		});
	}
	
	,_startDataTags : function( uid, callBack )
	{
		var self = this;

		self._setStatusDataTransfer("loading tags");
		CAIRS.MAP.API.get({
			resource : 	"/LibraryFields/tags" // mandatory
			,format : "json" // json, yaml, xml. Default: json. Not mandatory
			,onSuccess : function(request){ // not mandatory
				try
				{
					var json = eval('(' + request.response + ')');
					if( json.status == "success" )	
					{
						var rest = json.rows.length % 2;
						var rounded = json.rows.length - rest;
						var middle = rounded / 2;
						
						//console.log( self._getRawUID( uid ) );
						//console.log( self.data_store );
						
						//uid = parseInt( uid.split("_")[  uid.split("_").length -1 ] );
						
						self.data_store[  self._getRawUID( uid ) ]["tags"] = json.rows;
						for( var x = 0; x < json.rows.length; x++)
						{
							var row = json.rows[x];
							self.model.conf_form_tags.template.push({type: "checkbox", name: row.data[0], label: row.data[0], value : row.data[0], tooltip : ""});
							if( x == middle)
							{
								self.model.conf_form_tags.template.push({type:"newcolumn"});
							}
						}
						if( callBack )
						{
							callBack();	
						}
						self._setStatusDataTransfer("tags 100% loaded");
					}
					else
					{
						dhtmlx.message( {type : "error", text : json.response} );
						self.status_bar[ uid ].setText(json.response);
						self.data_store[ uid.split("_")[  uid.split("_").length -1 ] ]["tags"] = [];
					}
				}
				catch(e)
				{
					//console.log("error tags");
					//console.log(e.stack);
				}
			}
			,onFail : function(request)
			{ // not mandatory
				//console.log(request);
				if(request.status == "0")
				{
					dhtmlx.message( {type : "error", text : "unable to reach resource"} );
					self._setStatusError("unable to reach resource");
				}
				else
				{
					dhtmlx.message( {type : "error", text : "fatal error on server side"} );
					self._setStatusError("error 500");
				}
				self._setStatus("error getting tags");
				self.data_store[  self._getRawUID( uid ) ]["tags"] = [];
			}
		});

	}
	
	,_addPage : function( pageConfiguration, callBack )
	{
		var self = this, uid = pageConfiguration.uid, pagename = pageConfiguration.pagename || "", page_id = pageConfiguration.page_id || null, page_layout = pageConfiguration.page_layout || "S", tab_width = pageConfiguration.tab_width || "100", form_id = pageConfiguration.form_id || null, record = [], pageJSON = null;
		
		if( page_layout == "S" )
		{
			pageJSON = { type: "block", width : self.form_default_width, offsetLeft: 0, id : page_id, label : pagename, page_id : page_id, pagename: pagename, list : [
				{
						type: 'block',
					inputWidth: 'auto',
					inputHeight :'auto',
					name : "column_1",
					list: []
				}
			], index : 0, page_layout : page_layout, tab_width : tab_width + "px" };
		}
		else if( page_layout == "D" )
		{
			pageJSON = { type: "block", width : self.form_default_width, offsetLeft: 0, id : page_id, label : pagename, page_id : page_id, pagename: pagename, list : [
				{
					type: 'block',
					inputWidth: 'auto',
					inputHeight :'auto',
					name : "column_1",
					list: []
				}
				,{type:"newcolumn", offset:10}
				,{
					type: 'block',
					inputWidth: 'auto',
					inputHeight :'auto',
					name : "column_2",
					list: []
				}
			], index : 0, page_layout : page_layout, tab_width : tab_width + "px" };
		}
		
		//console.log( "--------------------------------------" );
		//console.log( page_id );
		
		if( page_id == null )
		{
			//console.log( "db also" );
			pageConfiguration[ "index" ] = self.grid_pages[ uid ].getRowsNum();
			pageJSON[ "index" ] = pageConfiguration[ "index" ];
			
			page_id = null;
			record.push( pagename );
			record.push( page_layout );
			record.push( tab_width );
			record.push( pageJSON[ "index" ] );
			
			self._setStatusDataTransferForm(uid, "requesting pages data", true);
			self.progressOnForm( uid );
			CAIRS.MAP.API.insert(
			{
				resource : 	"/forms/" + form_id + "/pages" // mandatory
				,format : "json" // json, yaml, xml. Default: json. Not mandatory
				,payload : "hash=" + JSON.stringify( pageConfiguration ) // mandatory for PUT and POST
				,onSuccess : function( request ) // not mandatory
				{ 
					var json = eval('(' + request.response + ')');
					if( json.status == "success" )	
					{
						//dhtmlx.message( {type : "error", text : json.response} );
						self._setStatusDataTransferForm(uid, "pages data received");
					
						page_id = json.page_id;
						
						pageJSON[ "page_id" ] = page_id;
						pageJSON[ "id" ] = page_id;
						
						self.grid_pages[ uid ].addRow( page_id, record );
						self._putEmptyPageOnMemory( uid, pageJSON);
						//self.grid_pages[ uid ].cells(page_id, self.grid_pages[ uid ].getColIndexById( "index" )).setValue( pageConfiguration[ "index" ] );
						
						if(  self.grid_pages[ uid ].getRowsNum() == 1 )
							self.setPageStatusInfo( uid, "page " + pagename + " added" );			
						
						
						if( callBack ) callBack();
						
						
						self.progressOffForm( uid );
						
						
					}
					else
					{
						dhtmlx.message( {type : "error", text : "Page not addedd. reason: " + json.response} );
						self._setStatusDataTransferForm(uid, "unable to get pages data");
						if( json.response == "token not authorized" )
							self._setStatusUserForm(uid, "token expired. Please login again", false);
						self.progressOffForm( uid );
					}
				}
				,onFail : function( request )
				{ // not mandatory
					var json = eval('(' + request.response + ')');
					dhtmlx.message( {type : "error", text : "Page not addedd. reason: " + json.response} );
					self._setStatusDataTransferForm(uid, "unable to get pages data");
					if( json.response == "token not authorized" )
						self._setStatusUserForm(uid, "token expired. Please login again", false);
					self.progressOffForm( uid );
				}
			});
		}
		else
		{
			//console.log( "only memory" );
			pageJSON[ "index" ] = pageConfiguration[ "index" ];

			record.push( pagename );
			record.push( page_layout );
			record.push( tab_width );
			record.push( pageConfiguration[ "index" ] );
			
			self.grid_pages[ uid ].addRow( page_id, record );
			self._putEmptyPageOnMemory( uid, pageJSON);
			//self.grid_pages[ uid ].cells(page_id, self.grid_pages[ uid ].getColIndexById( "index" )).setValue( pageConfiguration[ "index" ] );
			
			if(  self.grid_pages[ uid ].getRowsNum() == 1 )
				self.setPageStatusInfo( uid, "page " + pagename + " added" );			
			
			if( callBack ) callBack();
			
			//self.progressOffForm( uid );
		}
	}
	
	
	,_editPage : function( pageConfiguration, callBack, form_id )
	{
		var self = this, uid = pageConfiguration.uid, pagename = pageConfiguration.pagename || "", page_id = pageConfiguration.page_id || null, page_layout = pageConfiguration.page_layout || "S", tab_width = pageConfiguration.tab_width || "100";
		self._setStatusDataTransferForm(uid, "posting page hash", true);
		if(page_id != null )
		{
			form_id = self.form_properties[ uid ].getItemValue( "form_id" );
			CAIRS.MAP.API.update({
				resource : 	"/forms/" + form_id + "/pages/" + page_id // mandatory
				,format : "json" // json, yaml, xml. Default: json. Not mandatory
				,payload : "hash=" + JSON.stringify( pageConfiguration ) // mandatory for PUT and POST
				,onSuccess : function( request ) // not mandatory
				{ 
					var json = eval('(' + request.response + ')');
					if( json.status == "success" )	
					{
						//dhtmlx.message( {type : "error", text : json.response} );
						self._setStatusDataTransferForm(uid, "page hash saved");
						// --- client
						// update page properties
						for( var property in pageConfiguration )
						{
							if ( pageConfiguration.hasOwnProperty( property ) ) 
							{
								var colIndex = self.grid_pages[ uid ].getColIndexById( property );
								if( CAIRS.isNumber( colIndex ) )
								{
									if ( colIndex >= 0 )
									{
										if( property == "pagename")
										{
											self._getPageOnModel( uid, page_id)[ "label" ] = pageConfiguration[ property ];
											self._getPageOnModel( uid, page_id)[ property ] = pageConfiguration[ property ];
										}
										else
										{
											self._getPageOnModel( uid, page_id)[ property ] = pageConfiguration[ property ];
										}
										self.grid_pages[ uid ].cells(page_id, colIndex).setValue( pageConfiguration[ property ] );
									}
								}
							}
						}
						// update page properties
						
						// get all fields of the page
						var fieldsList = [];
						self._getPageColumnList( uid, page_id, "first" ).forEach( function(field, index, array)
						{					
							fieldsList.push( field );
						});
						if( typeof self._getPageColumnList( uid, page_id, "second" ) !== 'undefined' )
						{
							self._getPageColumnList( uid, page_id, "second" ).forEach( function(field, index, array)
							{					
								fieldsList.push( field );
							});
						}
						// get all fields of the page
						
						if( page_layout == "S" )
						{
							self._getPageOnModel( uid, page_id).list = [];
							self._getPageOnModel( uid, page_id).list = [
								{
									type: 'block',
									inputWidth: 'auto',
									inputHeight :'auto',
									name : "column_1",
									list: fieldsList
								}
							];
						}
						else
						{
							self._getPageOnModel( uid, page_id).list = [];
							self._getPageOnModel( uid, page_id).list = [
								{
									type: 'block',
									inputWidth: 'auto',
									inputHeight :'auto',
									name : "column_1",
									list: []
								}
								,{type:"newcolumn", offset:10}
								,{
									type: 'block',
									inputWidth: 'auto',
									inputHeight :'auto',
									name : "column_2",
									list: []
								}
							];
							
							// restart count added fields
							self.totalAddedFields[ page_id ] = 1;
							
							fieldsList.forEach( function(field, index, array)
							{					
								self._putFieldOnMemory( uid, self.selected_page[ uid ], field, function(){
									self._startPreview( uid );
								}, true );
							});
							//console.log( fieldsList );
						}
						//console.log( self._getPageOnModel( uid, page_id) );
						if( callBack ) callBack();
						// --- client
						
						
						self.progressOffForm( uid );
					}
					else
					{
						dhtmlx.message( {type : "error", text : "Page not saved. reason: " + json.response} );
						self._setStatusDataTransferForm(uid, "unable to save page");
						if( json.response == "token not authorized" )
							self._setStatusUserForm(uid, "token expired. Please login again", false);
						self.progressOffForm( uid );
					}
					
					
				}
				,onFail : function( request )
				{ // not mandatory
					var json = eval('(' + request.response + ')');
					dhtmlx.message( {type : "error", text : "Page not saved. reason: " + json.response} );
					self._setStatusDataTransferForm(uid, "unable to save page");
					if( json.response == "token not authorized" )
						self._setStatusUserForm(uid, "token expired. Please login again", false);
					self.progressOffForm( uid );
				}
			});
		}
		
		
	}
	
	,_getPageColumnList : function( uid, page_id, columnIndex )
	{
		var self = this, index = 0;
		
		if( typeof columnIndex === 'undefined' )
		{
			index = 0;
		}
		else if( columnIndex == "first" )
		{
			index = 0;
		}
		else if( columnIndex == "second" )
		{
			index = 2;
		}
		
		if( typeof self.pages[ uid ][ page_id ] === 'undefined' )
		{
			//dhtmlx.message( {type : "error", text : "Page not found"} );
			return
		}
		else if( typeof self.pages[ uid ][ page_id ].list[ index ] === 'undefined' )
		{
			//dhtmlx.message( {type : "error", text : "Column not found"} );
			return;
		}
		else if( typeof self.pages[ uid ][ page_id ].list[ index ].list === 'undefined' )
		{
			//dhtmlx.message( {type : "error", text : "Item found is not a column"} );
			return;
		}
		else
		{
			if( typeof self.pages[ uid ][ page_id ].list[ index ].list === 'undefined' )
				return []; // not found, return empty array
			else
				return self.pages[ uid ][ page_id ].list[ index ].list;
		}
	}
	
	,_getPageOnModel : function( uid, page_id )
	{
		var self = this;
		
		for( var x = 0; x < self.model.conf_form_preview.template.length; x++)
		{
			if( self.model.conf_form_preview.template[x].type == "block" )
			{
				if( typeof self.model.conf_form_preview.template[x].page_id !== 'undefined' )
				{
					if( self.model.conf_form_preview.template[x].page_id == page_id)
						return self.model.conf_form_preview.template[x];
				}
			}
		}
		return {};
	}
	
	,_putEmptyPageOnMemory : function( uid, pageJSON )
	{
		var self = this;
		self.pages[ uid ][ pageJSON.page_id ] = pageJSON;
		self.model.conf_form_preview.template.push( pageJSON );
		//console.log( pageJSON );
	}
	
	,_changePageName : function( uid, page_id, pagename )
	{
		var self = this;
		//{ type: "block", width : self.form_default_width, offsetLeft: 0, id : page_id, label : pagename, page_id : page_id, pagename: pagename,
		self.pages[ uid ][ page_id ].label = pagename;
		self.pages[ uid ][ page_id ].pagename = pagename;
	}
	
	,_deletePage : function( uid )
	{
		var self = this, form_id;
		
		dhtmlx.message(
		{
			title : "Warning",
			type :"confirm",
			text : "Do you want to delete the selected page?",
			ok : "Delete",
			cancel : "Cancel",
			callback: function( ok )
			{
				if(ok)
				{
					var page_id = self.grid_pages[ uid ].getSelectedRowId();
		
					form_id = self.form_properties[ uid ].getItemValue( "form_id" );
					
					self.progressOnForm( uid );
					self._setStatusDataTransferForm(uid, "trying to delete the page", true);
					CAIRS.MAP.API.del({
						resource : 	"/forms/" + form_id + "/pages/" + page_id // mandatory
						,format : "json" // json, yaml, xml. Default: json. Not mandatory
						,onSuccess : function( request ) // not mandatory
						{ 
							var json = eval('(' + request.response + ')');
							dhtmlx.message( {type : "error", text : json.response} );
							self._setStatusDataTransferForm(uid, "page deleted");
							self.grid_pages[ uid ].deleteRow(page_id);
					
							//console.log( self.grid_pages[ uid ].getRowsNum() )
									
							if(  self.grid_pages[ uid ].getRowsNum() > 0 )
								self.setPageStatusInfo( uid, "" );
							else
								self.setPageStatusInfo( uid, "please create a page" );
							
							self.grid_form_fields[ uid ].clearAll();
							
							//console.log(self.pages[ uid ]);
							//console.log(self.model.conf_form_preview.template);
							delete self.pages[ uid ][ page_id ];
							
							for( var x = 0; x < self.model.conf_form_preview.template.length; x++)
							{
								if( self.model.conf_form_preview.template[x].type == "block" )
								{
									if( typeof self.model.conf_form_preview.template[x].page_id !== 'undefined' )
									{
										if( self.model.conf_form_preview.template[x].page_id == page_id ) self.model.conf_form_preview.template.splice(x, 1);
									}
								}
							}
							
							//console.log(self.model.conf_form_preview.template);
							//console.log(self.pages[ uid ]);
							
					
							self.toolbar_form_pages[ uid ].disableItem("delete_page");
							self.toolbar_form_pages[ uid ].disableItem("edit_page");
							
							self.tabbar_form_create_fields[ uid ].setTabActive("add_field");
							self.tabbar_form_create_fields[ uid ].hideTab("field_properties");
							
							self.selected_page[ uid ] = null;
							self.toolbar_form_fields[ uid ].disableItem("edit_field");
							self.toolbar_form_fields[ uid ].disableItem("delete_field");
							
							if(self.form_field_propertie[ uid ])
							{
								self.form_field_propertie[ uid ].unload();
								self.form_field_propertie[ uid ] = null;
							}
							
							self.progressOffForm( uid );
										
						}
						,onFail : function( request )
						{ // not mandatory
							var json = eval('(' + request.response + ')');
							dhtmlx.message( {type : "error", text : json.response} );
							
							self.progressOffForm( uid );
						}
					});
				}
			}
		});	
	}
	
	,totalAddedFields : []
	
	,_putFieldOnMemory : function( uid, page_id, fieldJSON, callBack, putOnClientOnly )
	{
		var self = this, form_id = self.form_properties[ uid ].getItemValue( "form_id" );
		
		self.progressOnForm( uid );
		
		//console.log("fieldJSON -----------------" );
		//console.log(fieldJSON );
		
		fieldJSON[ "page_id" ] = page_id;
		//fieldJSON[ "type" ] = page_id;
		if( fieldJSON[ "required" ] == true )
		{
			fieldJSON[ "required" ] = 1;
		}
		else
		{
			fieldJSON[ "required" ] = 0;
		}
		
		if( fieldJSON[ "note" ] )
			fieldJSON[ "note" ] = "{ text : '"+fieldJSON[ "tooltip" ]+"'}";
		else
			fieldJSON[ "note" ] = "";
			
		if( fieldJSON[ "info" ] == true )
			fieldJSON[ "info" ] = 1;
		else
			fieldJSON[ "info" ] = 0;
			
		if(  typeof fieldJSON[ "use_library" ] === 'undefined' )
		{
			fieldJSON[ "use_library" ] = "0";
		}
		else if( fieldJSON[ "use_library" ] === "0" )
		{
			fieldJSON[ "use_library" ] = "0";
		}
		else if( fieldJSON[ "use_library" ] === 0 )
		{
			fieldJSON[ "use_library" ] = "0";
		}
		else if( fieldJSON[ "use_library" ] == false )
		{
			fieldJSON[ "use_library" ] = "0";
		}
		else if( fieldJSON[ "use_library" ] == "" )
		{
			fieldJSON[ "use_library" ] = "0";
		}
		else
		{
			fieldJSON[ "use_library" ] = 1;
		}
		
		if( fieldJSON[ "type" ] == 'fieldset' )
		{
			if( self.pages[ uid ][ page_id ].page_layout == "S" )
			{
				fieldJSON[ "width" ] = self.form_default_width - 20;
			}
			else
			{
				fieldJSON[ "width" ] = ( ( self.form_default_width - 50 ) / 2 );
			}
			
			fieldJSON[ "list" ] = [{
				type: "settings",
				position: "label-left",
				labelWidth: 140,
				inputWidth: 140,
				inputLeft : 10,
				index : -1
			}];
			fieldJSON[ "options" ] = [{
				type: "settings",
				position: "label-left",
				labelWidth: 140,
				inputWidth: 140,
				inputLeft : 10,
				index : -1
			}];
		}
		else
		{
			fieldJSON[ "list" ] = [];
			fieldJSON[ "options" ] = [];
		}

		if ( putOnClientOnly )
		{
			//console.log("_putFieldOnMemory ---------------------------")
			//console.log( fieldJSON );
			fieldJSON[ "type" ] = self._convertLibraryFieldTypetoDhtmlxType( fieldJSON[ "type_standard" ] );
			
			if( typeof self.totalAddedFields[ page_id ] === 'undefined' )
			{
				self.totalAddedFields[ page_id ] = 1;
			}
			
			if( self.pages[ uid ][ page_id ].page_layout == "S" )
			{
				self._getPageColumnList( uid, page_id, "first" ).push( fieldJSON );
			}
			else if( self.pages[ uid ][ page_id ].page_layout == "D" )
			{
				
				if( ( self.totalAddedFields[ page_id ] % 2 ) == 0)
				{
					self._getPageColumnList( uid, page_id, "second" ).push( fieldJSON );
				}
				else
				{
					self._getPageColumnList( uid, page_id, "first" ).push( fieldJSON );
				}
				self.totalAddedFields[ page_id ] = self.totalAddedFields[ page_id ] + 1;
			}
			//console.log( "--------------------------------------------------------------" );
			//console.log( fieldJSON );
			//self._startPreview( uid );
			
			if( callBack ) callBack( fieldJSON[ "field_id" ] );
		}
		else
		{
			//fieldJSON[ "index" ] = 0;
			//console.log( "--------------------------------------------------------------" );
			//console.log( fieldJSON );
			var type_MAP_standard = fieldJSON[ "type_standard" ];
			var type_DHTMLX_standard = fieldJSON[ "type" ];
			fieldJSON[ "type_standard" ] = type_DHTMLX_standard;
			fieldJSON[ "type" ] = type_MAP_standard;
			//console.log( fieldJSON );
			//console.log( "--------------------------------------------------------------" );
			self._setStatusDataTransferForm(uid, "sending field hash", true);
			CAIRS.MAP.API.insert({
				resource : 	"/forms/" + form_id + "/pages/" + page_id + "/fields"// mandatory
				,format : "json" // json, yaml, xml. Default: json. Not mandatory
				,payload : "hash=" + JSON.stringify( fieldJSON ) // mandatory for PUT and POST
				,onSuccess : function( request ) // not mandatory
				{ 
					var json = eval('(' + request.response + ')');
					
					if( json.status == "success" )	
					{
						//dhtmlx.message( {type : "error", text : 'fields readed'} );
						self._setStatusDataTransferForm(uid, "new field saved: "+ json.field_id);
						
						//console.log( "--------------------------------------------------------------" );
						//console.log( fieldJSON );
						fieldJSON[ "type_standard" ] = type_MAP_standard;
						fieldJSON[ "type" ] = type_DHTMLX_standard;
						
						fieldJSON[ "field_id" ] = json.field_id;
						//console.log( fieldJSON );
						//console.log( "--------------------------------------------------------------" );
					
						if( typeof self.totalAddedFields[ page_id ] === 'undefined' )
						{
							self.totalAddedFields[ page_id ] = 1;
						}
						
						if( self.pages[ uid ][ page_id ].page_layout == "S" )
						{
							self._getPageColumnList( uid, page_id, "first" ).push( fieldJSON );
						}
						else if( self.pages[ uid ][ page_id ].page_layout == "D" )
						{
							
							if( ( self.totalAddedFields[ page_id ] % 2 ) == 0)
							{
								self._getPageColumnList( uid, page_id, "second" ).push( fieldJSON );
							}
							else
							{
								self._getPageColumnList( uid, page_id, "first" ).push( fieldJSON );
							}
							self.totalAddedFields[ page_id ] = self.totalAddedFields[ page_id ] + 1;
						}
						
						//self._startPreview( uid );
						
						if( callBack ) callBack( fieldJSON[ "field_id" ] );
					}
					else
					{
						dhtmlx.message( {type : "error", text : "Field not saved. reason: " + json.response} );
						self._setStatusDataTransferForm(uid, "field not saved");
						if( json.response == "token not authorized" )
							self._setStatusUserForm(uid, "token expired. Please login again", false);
					}
					
					self.progressOffForm( uid );
	
				}
				,onFail : function( request )
				{ // not mandatory
					var json = eval('(' + request.response + ')');
					dhtmlx.message( {type : "error", text : json.response} );
					self._setStatusDataTransferForm(uid, "field not saved");
					if( json.response == "token not authorized" )
						self._setStatusUserForm(uid, "token expired. Please login again", false);
					self.progressOffForm( uid );
				}
			});
		}
	}
	
	,_putOptionOnMemory : function( uid, page_id, field_id, optionJSON, callBack, putOnClientOnly )
	{
		var self = this, option_id = optionJSON.option_id, form_id = self.form_properties[ uid ].getItemValue( "form_id" );
		
		console.log("----------- put on memory");
		console.log(page_id);
		console.log(field_id);
		console.log(optionJSON);
		
		if( option_id == null ) // add on DB ALSO
		{
			console.log( "server side" );
			console.log("----------- before change");
			console.log( optionJSON );
			var type_MAP_standard = optionJSON[ "type_standard" ];
			var type_DHTMLX_standard = optionJSON[ "type" ];
			optionJSON[ "type_standard" ] = type_DHTMLX_standard;
			optionJSON[ "type" ] = type_MAP_standard;
			console.log("----------- after change");
			console.log( optionJSON );
			
			optionJSON[ "page_id" ] = page_id;
			
			//console.log( "--------------------------------------------------------------" );
			self._setStatusDataTransferForm(uid, "sending option hash", true);
			
			CAIRS.MAP.API.insert({
				resource : 	"/forms/" + form_id + "/pages/" + page_id + "/fields/" + field_id + "/options"// mandatory
				,format : "json" // json, yaml, xml. Default: json. Not mandatory
				,payload : "hash=" + JSON.stringify( optionJSON ) // mandatory for PUT and POST
				,onSuccess : function( request ) // not mandatory
				{ 
					var json = eval('(' + request.response + ')');
					
					if( json.status == "success" )	
					{
						//dhtmlx.message( {type : "error", text : 'fields readed'} );
						self._setStatusDataTransferForm(uid, "new field saved: "+ json.field_id);
						
						console.log( "--------------------------------------------------------------" );
						console.log( optionJSON );
						optionJSON[ "type_standard" ] = type_MAP_standard;
						optionJSON[ "type" ] = type_DHTMLX_standard;
						
						optionJSON[ "option_id" ] = json.option_id;
						console.log( optionJSON );
						console.log( "--------------------------------------------------------------" );
						
						if( self.pages[ uid ][ page_id ].page_layout == "S" )
						{
							self._getPageColumnList( uid, page_id, "first" ).forEach( function(field, index, array)
							{					
								if( field.field_id == field_id )
								{
									self._getPageColumnList( uid, page_id, "first" )[index].list.push( optionJSON );
									self._getPageColumnList( uid, page_id, "first" )[index].options.push( optionJSON );
								}
								
							});
						}
						else if( self.pages[ uid ][ page_id ].page_layout == "D" )
						{
							self._getPageColumnList( uid, page_id, "first" ).forEach( function(field, index, array)
							{					
								if( field.field_id == field_id )
								{
									self._getPageColumnList( uid, page_id, "first" )[index].list.push( optionJSON );
									self._getPageColumnList( uid, page_id, "first" )[index].options.push( optionJSON );
								}
							});
							self._getPageColumnList( uid, page_id, "second" ).forEach( function(field, index, array)
							{					
								if( field.field_id == field_id )
								{
									self._getPageColumnList( uid, page_id, "second" )[index].list.push( optionJSON );
									self._getPageColumnList( uid, page_id, "second" )[index].options.push( optionJSON );
								}
							});
						}
						self._startPreview( uid );
						if( callBack ) callBack( optionJSON[ "option_id" ] );
						self.progressOffForm( uid );
					}
					else
					{
						dhtmlx.message( {type : "error", text : "Option not saved. reason: " + json.response} );
						self._setStatusDataTransferForm(uid, "option not saved");
						if( json.response == "token not authorized" )
							self._setStatusUserForm(uid, "token expired. Please login again", false);
						self.progressOffForm( uid );
					}
				}
				,onFail : function( request )
				{ // not mandatory
					var json = eval('(' + request.response + ')');
					dhtmlx.message( {type : "error", text : json.response} );

					self._setStatusDataTransferForm(uid, "option not saved");
					if( json.response == "token not authorized" )
						self._setStatusUserForm(uid, "token expired. Please login again", false);
					
					self.progressOffForm( uid );
				}
			});
		}
		else // add on memory only
		{
			console.log( "memory only" );
			console.log( page_id );
			if( self.pages[ uid ][ page_id ].page_layout == "S" )
			{
				//console.log( self._getPageColumnList( uid, page_id, "first" ) );
				
				self._getPageColumnList( uid, page_id, "first" ).forEach( function(field, index, array)
				{					
					if( field.field_id == field_id )
					{
						self._getPageColumnList( uid, page_id, "first" )[index].list.push( optionJSON );
						self._getPageColumnList( uid, page_id, "first" )[index].options.push( optionJSON );
						//console.log( self._getPageColumnList( uid, page_id, "first" )[index] );
					}
					
				});
			}
			else if( self.pages[ uid ][ page_id ].page_layout == "D" )
			{
				self._getPageColumnList( uid, page_id, "first" ).forEach( function(field, index, array)
				{					
					if( field.field_id == field_id )
					{
						self._getPageColumnList( uid, page_id, "first" )[index].list.push( optionJSON );
						self._getPageColumnList( uid, page_id, "first" )[index].options.push( optionJSON );
						//console.log( self._getPageColumnList( uid, page_id, "first" )[index] );
					}
				});
				
				self._getPageColumnList( uid, page_id, "second" ).forEach( function(field, index, array)
				{					
					if( field.field_id == field_id )
					{
						self._getPageColumnList( uid, page_id, "second" )[index].list.push( optionJSON );
						self._getPageColumnList( uid, page_id, "second" )[index].options.push( optionJSON );
						//console.log( self._getPageColumnList( uid, page_id, "second" )[index] );
					}
				});
			}
			
			if( callBack ) callBack( option_id );
		}
		
		
	}
	
	,_readFormData : function( uid, form_id )
	{
		var self = this, form_readed = false, commands = [];
		self.progressOnForm( uid );
		self._setStatusDataTransferForm(uid, "requesting form("+form_id+") hash", true);
		CAIRS.MAP.API.get({
			resource : 	"/forms/" + form_id 
			,format : "json" 
			,onSuccess : function( request )
			{ 
				var json = eval('(' + request.response + ')');
				if( json.status == "success" )	
				{
					//dhtmlx.message( {type : "error", text : json.response} );
					self._setStatusDataTransferForm(uid, "form("+form_id+") hash received");
					self.form_properties[ uid ].setFormData( json.hash );
					self._readPagesData( uid, form_id, function( pagesAddedOnMemory ){
						self._readFieldsData( uid, form_id, pagesAddedOnMemory, function(){
						//	addPage();
						} );	
					} );
				}
				else
				{
					dhtmlx.message( {type : "error", text : json.response} );
					self._setStatusDataTransferForm(uid, "unable to read form");
					if( json.response == "token not authorized" )
						self._setStatusUserForm(uid, "token expired. Please login again", false);
				}
			}
			,onFail : function( request )
			{ 
				var json = eval('(' + request.response + ')');
				dhtmlx.message( {type : "error", text : json.response} );
				self._setStatusDataTransferForm(uid, "unable to read form");
				if( json.response == "token not authorized" )
					self._setStatusUserForm(uid, "token expired. Please login again", false);
				
				
				//self.progressOffForm( uid );
			}
		});	
	}
	
	,_readPagesData : function( uid, form_id, callBack )
	{
		var self = this, form_readed = false, commands = [];
		self.progressOnForm( uid );
		self._setStatusDataTransferForm(uid, "requesting pages data", true);
		CAIRS.MAP.API.get({
			resource : 	"/forms/" + form_id + "/pages"
			,format : "json"
			,payload : "order=" + JSON.stringify({direction:'ASC',orderby:'index'}) // index
			,onSuccess : function( request )
			{ 
				var json = eval('(' + request.response + ')');
				if( json.status == "success" )	
				{
					//dhtmlx.message( {type : "error", text : 'Form data is ready'} );
					self._setStatusDataTransferForm(uid, "pages received");
					
					json.pages.sort( function(a,b)
					{
						return a.index - b.index;
					});
					
					var pagesAddedOnMemory = [];
					function addPage()
					{
						if( json.pages.length > 0 )
						{
							var page = json.pages[0];
							json.pages.splice(0, 1);
							//console.log( ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.." );
							//console.log( page );
							page[ "uid" ] = uid;
							self._addPage( page, function()
							{
								pagesAddedOnMemory.push( page );
								self.progressOffForm( uid );
								addPage();
							} );
						}
						else
						{
							self.progressOffForm( uid );
							self._startPreview( uid );
							if( callBack ) callBack( pagesAddedOnMemory );
						}
					}
					
					//self.progressOnForm( uid );
					addPage();
					
					
				}
				else
				{
					dhtmlx.message( {type : "error", text : json.response} );
					self.progressOffForm( uid );
				}
			}
			,onFail : function( request )
			{ 
				var json = eval('(' + request.response + ')');
				dhtmlx.message( {type : "error", text : json.response} );
				self.progressOffForm( uid );
			}
		});	
	}
	
	,_readFieldsData : function( uid, form_id, pagesAddedOnMemory, callBack )
	{
		var self = this, form_readed = false, commands = [], fieldsList = [], 
			pageList = [], queryColumns = ""  + self.model.conf_grid_fields.ids + ",page_id,field_id";

		for( var x = 0; x < pagesAddedOnMemory.length; x++ )
			pageList.push( pagesAddedOnMemory[ x ].page_id );
		
		self.progressOnForm( uid );
		self._setStatusDataTransferForm(uid, "requesting page("+pageList.join()+") fields", true);
		CAIRS.MAP.API.get({
			resource : 	"/forms/" + form_id + "/pages/" + pageList.join() + "/fields"
			,format : "json" 
			//,sync : true // force synchronous mode. It will for to display loading wheel for this form
			,payload : "columns="  + queryColumns + "&order=" + JSON.stringify({direction:'ASC',orderby:'index'})
			,onSuccess : function( request )
			{ 
				var json = eval('(' + request.response + ')');
				if( json.status == "success" )	
				{
					self._setStatusDataTransferForm(uid, "page("+pageList.join()+") fields received");
					self._setStatusForm(uid, "FormBuilder is ready. The form("+form_id+") is ready for editing");
					
					json.fields.sort( function(a,b)
					{
						return a.index - b.index;
					});
					
					function addField()
					{
						if( json.fields.length > 0 )
						{
							// put all field on memory
							var field = json.fields[0];
							json.fields.splice(0, 1);
							
							var type_MAP_standard = field[ "type" ];
							var type_DHTMLX_standard = field[ "type_standard" ];
							var rowData = [];
							
							field[ "type" ] = type_DHTMLX_standard;
							field[ "type_standard" ] = type_MAP_standard;
			
							for(var y = 0; y < queryColumns.split(",").length; y++)
							{
								var id = queryColumns.split(",")[ y ];
								if( typeof field[ id ] !== 'undefined' ) 
									if( id == "required")
										if(field[ id ] == "")
											rowData.push( 0 );
										else
											rowData.push( field[ id ] );
									else if( id == "type")
										rowData.push( type_MAP_standard );
									else if( id == "type_standard")
										rowData.push( type_DHTMLX_standard );
									else
										rowData.push( field[ id ] );
								//else
							}
					
							field[ "data" ] = rowData;
							
							self._putFieldOnMemory( uid, field[ "page_id" ], field, function( field_id )
							{
								fieldsList.push( field_id );
								addField();
							}, true );
						}
						else
						{
							// read all options/child elements for all pages and all fields in just one AJAX request
							//console.log("calling options ------ ");
							self._readOptionsData( uid, form_id, pageList.join(), fieldsList.join(), function(){
								self._startPreview( uid );
								self.progressOffForm( uid );
							} );
						}
					}
					// start adding field	
					addField();
				}
				else
				{
					dhtmlx.message( {type : "error", text : json.response} );
					self.progressOffForm( uid );
				}
			}
			,onFail : function( request )
			{ 
				var json = eval('(' + request.response + ')');
				dhtmlx.message( {type : "error", text : json.response} );
			}
		});	
	}
	
	,_readOptionsData : function( uid, form_id, page_id, field_id, callBack )
	{
		var self = this, form_readed = false, commands = [];
		
		var queryColumns = ""  + self.model.conf_grid_field_propertie_options.ids + ",optionname,page_id,option_id,field_id";
		
		self.progressOnForm( uid );
		self._setStatusDataTransferForm(uid, "requesting options of the field("+field_id+")", true);
		CAIRS.MAP.API.get({
			resource : 	"/forms/" + form_id + "/pages/" + page_id + "/fields/" + field_id + "/options"
			,format : "json" 
			//,sync : true // force synchronous mode. It will for to display loading wheel for this form
			,payload : "columns="  + queryColumns + "&order=" + JSON.stringify({direction:'ASC',orderby:'index'})
			,onSuccess : function( request )
			{ 
				var json = eval('(' + request.response + ')');
				if( json.status == "success" )	
				{
					self._setStatusDataTransferForm(uid, "options for field("+field_id+") received");
					
					var added = 0;
					json.options.sort( function(a,b)
					{
						return a.index - b.index;
					});
					for(var x = 0; x < json.options.length; x++)
					{
						self.progressOnForm( uid );
						var option = json.options[ x ];
						var type_MAP_standard = option[ "type" ];
						var type_DHTMLX_standard = option[ "type_standard" ];
						
						option[ "type" ] = type_DHTMLX_standard;
						option[ "type_standard" ] = type_MAP_standard;
						var rowData = [];
						for(var y = 0; y < queryColumns.split(",").length; y++)
						{
							var id = queryColumns.split(",")[ y ];
							//console.log(id);
							if( typeof option[ id ] !== 'undefined' ) 
							{
								if( id == "required")
								{
									if(option[ id ] == "")
									{
										rowData.push( 0 );
									}
									else
									{
										rowData.push( option[ id ] );
									}
								}
								else if( id == "type")
								{
									rowData.push( type_MAP_standard );
								}
								else if( id == "type_standard")
								{
									rowData.push( type_DHTMLX_standard );
								}
								else
								{
									rowData.push( option[ id ] );
								}
							}
							else
							{
								
							}
						}
						
						option[ "data" ] = rowData;
						
						if( option[ "text" ] =="" )
						{
							option[ "text" ] = option[ "optionname" ];
						}
						
						console.log(">>>>>>>>>>>>>>>>>>>>>>>>>> _readOptionsData")
						console.log( option );
						
						self._putOptionOnMemory( uid, option[ "page_id" ], option[ "field_id" ], option, function( option_id )
						{
							self.progressOffForm( uid );
						}, true ); // on client only
					}
					
					if( callBack ) callBack();
				}
				else
				{
					dhtmlx.message( {type : "error", text : json.response} );
					self.progressOffForm( uid );
				}
			}
			,onFail : function( request )
			{ 
				var json = eval('(' + request.response + ')');
				dhtmlx.message( {type : "error", text : json.response} );
			}
		});	
		
		
	}
	
	,_convertLibraryFieldTypetoDhtmlxType : function( type )
	{
		switch ( type )
		{
			case "T":
				return "input";
				break;
			case "E":
				return "calendar";
				break;
			case "D":
				return "combo";
				break;
			case "M":
				return "multiselect";
				break;
			case "R":
				return "radio";
				break;
			/*case "RG":
				return "label";
				break;*/
			case "A":
				return "input";
				break;
			case "L":
				return "label";
				break;
			case "F":
				return "file";
				break;
			case "G":
				return "label";
				break;
			case "I":
				return "input";
				break;
			case "P":
				return "input";
				break;
			case "B":
				return "checkbox";
				break;
			case "W":
				return "fieldset";
				break;
			case "Z":
				return "checkbox";
				break;
			case "S":
				return "select";
				break;
			default:
			   return "";
		}
	}
	
	,_convertDhtmlxTypeToLibraryFieldType : function( type )
	{
		switch ( type )
		{
			case "input":
				return "T";
				break;
			case "calendar":
				return "E";
				break;
			case "combo":
				return "D";
				break;
			case "multiselect":
				return "M";
				break;
			case "select":
				return "S";
				break;
			case "radio":
				return "R";
				break;
			case "label":
				return "RG";
				break;
			case "label":
				return "L";
				break;
			case "file":
				return "F";
				break;
			case "label":
				return "G";
				break;
			case "input":
				return "I";
				break;
			case "checkbox":
				return "B";
				break;
			case "fieldset":
				return "W";
				break;
			default:
			   return "";
		}
	}
	
	,_editFieldOfAPage : function( uid, hash, callBack )
	{
		var self = this, field_id, form_id = self.form_properties[ uid ].getItemValue( "form_id" ), page_id = null;
		
		console.log(hash);
		
		if( typeof hash["page_id"] === 'undefined' )
			page_id = self.grid_pages[ uid ].getSelectedRowId()
		
		
		if( typeof hash[ "field_id" ] === "undefined" )
		{
			dhtmlx.message( {type : "error", text : "field_id is missing"} );
			//if( callBack ) callBack();
			return;
		}
		if( self.selected_page[ uid ] == null )
		{
			dhtmlx.message( {type : "error", text : "You need to select a page before adding fields."} );
			//if( callBack ) callBack();
			return;
		}
		
		field_id = hash[ "field_id" ];
		
		hash[ "name" ] = self.handleInputName( uid, hash[ "label" ] );
		
		var type_MAP_standard = hash[ "type_standard" ];
		var type_DHTMLX_standard = hash[ "type" ];
		
		hash[ "type" ] = type_MAP_standard;
		hash[ "type_standard" ] = type_DHTMLX_standard;
		
		//console.log( hash );
		
		self.progressOnForm( uid );
		self._setStatusDataTransferForm(uid, "sending field_id("+field_id+") hash", true);
		CAIRS.MAP.API.update({
			resource : 	"/forms/" + form_id + "/pages/" + page_id + "/fields/" + field_id// mandatory
			,format : "json" // json, yaml, xml. Default: json. Not mandatory
			,payload : "hash=" + JSON.stringify( hash ) // mandatory for PUT and POST
			,onSuccess : function( request ) // not mandatory
			{ 
				var json = eval('(' + request.response + ')');
					
				if( json.status == "success" )	
				{
					self._setStatusDataTransferForm(uid, "field_id("+field_id+") saved");
					var rowData = [];
					self.model.conf_grid_fields.ids.split(",").forEach( function(id, index, array)
					{					
						if( typeof hash[ id ] !== 'undefined' )
						{
							if( id == 'required' )
							{
								//console.log( id );
								//console.log( hash[ id ] );
								if( hash[ id ] == 1 )
								{
									
									try
									{
										self.grid_form_fields[ uid ].cells(field_id, self.grid_form_fields[ uid ].getColIndexById( id ) ).setValue( 1 );
									}
									catch(e)
									{
										
									}
									self._getPageField( uid, self.selected_page[ uid ], field_id )[ id ] = 1;
									rowData.push( 1 );
								}
								else
								{
									
									try
									{
										self.grid_form_fields[ uid ].cells(field_id, self.grid_form_fields[ uid ].getColIndexById( id ) ).setValue( 0 );
									}
									catch(e)
									{
										
									}
									self._getPageField( uid, self.selected_page[ uid ], field_id )[ id ] = 0;
									rowData.push( 0 );
								}
							}
							else if(id == "use_library")
							{
								try
								{
									var islib = self.grid_form_fields[ uid ].cells(field_id, self.grid_form_fields[ uid ].getColIndexById( id ) ).getValue();
									self._getPageField( uid, self.selected_page[ uid ], field_id )[ id ] = islib;
									rowData.push( islib );
								}
								catch(e)
								{
									self._getPageField( uid, self.selected_page[ uid ], field_id )[ id ] = hash[ id ];
									rowData.push( hash[ id ] );
								}
								
							}
							else if(id == "tooltip")
							{
								
								try
								{
									self.grid_form_fields[ uid ].cells(field_id, self.grid_form_fields[ uid ].getColIndexById( id ) ).setValue( hash[ id ] );
								}
								catch(e)
								{
									
								}
								self._getPageField( uid, self.selected_page[ uid ], field_id )[ "tooltip" ] = hash[ id ];
								self._getPageField( uid, self.selected_page[ uid ], field_id )[ "note" ] = { text: hash[ id ]};
								self._getPageField( uid, self.selected_page[ uid ], field_id )[ "info" ] = true;
								rowData.push( hash[ id ] );
							}
							else if(id == "name")
							{
								
								try
								{
									self.grid_form_fields[ uid ].cells(field_id, self.grid_form_fields[ uid ].getColIndexById( id ) ).setValue( hash[ id ] );
								}
								catch(e)
								{
									
								}
								self._getPageField( uid, self.selected_page[ uid ], field_id )[ id ] = hash[ id ];
								self._getPageField( uid, self.selected_page[ uid ], field_id )[ "name" ] = hash[ id ];
								rowData.push( hash[ id ] );
							}
							else if(id == "type")
							{
								
								try
								{
									self.grid_form_fields[ uid ].cells(field_id, self.grid_form_fields[ uid ].getColIndexById( id ) ).setValue( hash[ id ] );
								}
								catch(e)
								{
									
								}
								self._getPageField( uid, self.selected_page[ uid ], field_id )[ id ] = hash[ id ];
								self._getPageField( uid, self.selected_page[ uid ], field_id )[ "type" ] = self._convertLibraryFieldTypetoDhtmlxType( hash[ id ] );
							
								if( hash[ id ] == "A" )
									self._getPageField( uid, self.selected_page[ uid ], field_id )[ "rows" ] = 4;
									
								rowData.push( hash[ id ] );
							}
							else
							{
								//console.log( hash[ id ] );
								if( hash[ id ] )
								{
									
									try
									{
										self.grid_form_fields[ uid ].cells(field_id, self.grid_form_fields[ uid ].getColIndexById( id ) ).setValue( hash[ id ] );
									}
									catch(e)
									{
										
									}
									self._getPageField( uid, self.selected_page[ uid ], field_id )[ id ] = hash[ id ];
									rowData.push( hash[ id ] );
								}
								else
								{
									
									try
									{
										self.grid_form_fields[ uid ].cells(field_id, self.grid_form_fields[ uid ].getColIndexById( id ) ).setValue( "" );
									}
									catch(e)
									{
										
									}
									self._getPageField( uid, self.selected_page[ uid ], field_id )[ id ] = "";
									rowData.push( hash[ id ] );
								}
							}
						}
						else
						{
							//console.log( "grid column name not present on form hash -----------------------" );
							//console.log( id );
							//console.log( hash[ id ] );
							//console.log( "grid column name not present on form hash -----------------------" );
							//self.grid_form_fields[ uid ].cells(field_id, self.grid_form_fields[ uid ].getColIndexById( id ) ).setValue( hash[ id ] );
							//rowData.push( hash[ id ] );
						}
						
						self._getPageField( uid, self.selected_page[ uid ], field_id )[ "data" ] = rowData;
						
					});
					self._startPreview( uid );
					self.progressOffForm( uid );
					if( callBack ) callBack();
				}
				else
				{
					dhtmlx.message( {type : "error", text : "Field not saved. reason: " + json.response} );
					self._setStatusDataTransferForm(uid, "field not saved");
					if( json.response == "token not authorized" )
						self._setStatusUserForm(uid, "token expired. Please login again", false);
					self.progressOffForm( uid );
				}
			}
			,onFail : function( request )
			{ // not mandatory
				var json = eval('(' + request.response + ')');
				dhtmlx.message( {type : "error", text : json.response} );
				self._setStatusDataTransferForm(uid, "field not saved");
				if( json.response == "token not authorized" )
					self._setStatusUserForm(uid, "token expired. Please login again", false);
				self.progressOffForm( uid );
			}
		});
	}
	
	
	,_addCustomFieldToPage : function( uid, hash, callBack )
	{
		var self = this, newid = 0;
		
		if( typeof hash[ "field_id" ] === "undefined" )
		{
			dhtmlx.message( {type : "error", text : "field_id is missing"} );
			if( callBack ) callBack();
			return;
		}
		if( self.selected_page[ uid ] == null )
		{
			dhtmlx.message( {type : "error", text : "You need to select a page before adding fields."} );
			if( callBack ) callBack();
			return;
		}
		
		newid = hash[ "field_id" ];
		
		hash[ "name" ] = self.handleInputName( uid, hash[ "label" ] );
		
		//console.log( hash );
		
		var rowData = [];
		self.model.conf_grid_fields.ids.split(",").forEach( function(id, index, array)
		{					
			
			if( typeof hash[ id ] !== 'undefined' )
			{
				if( id == 'use_library' )
				{
					if( hash[ "inlibrary" ] == 1)
					{
						rowData.push( "1" );
						hash[ "use_library" ] = "1";
					}
					else
					{
						rowData.push( 0 );
						hash[ "use_library" ] = 0;
					}
				}
				else
				{
					//console.log( hash[ id ] );
					rowData.push( hash[ id ] );
				}
			}
			else
			{
				if( id == 'index' )
				{
					//console.log(id);
					//console.log(hash[ "index" ]);
					//console.log(self.grid_form_fields[ uid ].getRowsNum());
					rowData.push( self.grid_form_fields[ uid ].getRowsNum() );
					hash[ "index" ] = self.grid_form_fields[ uid ].getRowsNum();
				}
				else if( id == 'use_library' )
				{

					rowData.push( 0 );
					hash[ "use_library" ] = 0;
				}
				else if( id == 'library_field_id' )
				{

					rowData.push( "" );
					hash[ "library_field_id" ] = "";
				}
				else
				{
					//console.log( "grid column name not present on form hash -----------------------" );
					//console.log( id );
					//console.log( hash[ id ] );
					//console.log( "grid column name not present on form hash -----------------------" );
				}
				
			}
		});
		//console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
		//console.log(rowData)
		
		
		if( hash[ "inlibrary" ] == 1)
		{
			hash[ "use_library" ] = "1";
		}
		else
		{
			hash[ "use_library" ] = 0;
		}
		
		
		
		var fieldJSON = { type: self._convertLibraryFieldTypetoDhtmlxType( hash.type ), type_standard : hash.type, name: hash.name, label: hash.label, value : "",  required: false, validate: "", mask_to_use: hash.mask_to_use, field_id : newid, data : rowData, index : self.grid_form_fields[ uid ].getRowsNum(), list : [], options : [], className : hash.className};
		
		if( hash.type == "A" )
			fieldJSON[ "rows" ] = 4;
		
		if( hash.tooltip )	
		{
			fieldJSON[ "tooltip" ] = hash.tooltip;
			fieldJSON[ "note" ] = { text: hash.tooltip};
			fieldJSON[ "info" ] = true;		
		}
		
		if( hash.value )	
		{
			fieldJSON[ "value" ] = hash.value;
		}
		
		if( hash.required )	
		{
			fieldJSON[ "required" ] = 1;
			if( fieldJSON[ "validate" ] == "" )
			{
				fieldJSON[ "validate" ] = "NotEmpty";
			}
		}
		else
		{
			fieldJSON[ "required" ] = 0;
		}

		
		self._putFieldOnMemory( uid, self.selected_page[ uid ], fieldJSON, function(){
			
			self.grid_form_fields[ uid ].addRow( newid, rowData);
			self.grid_form_fields[ uid ].cells(newid, self.grid_form_fields[ uid ].getColIndexById( "mask_to_use" ) ).setValue( hash.mask_to_use );
			self.grid_form_fields[ uid ].cells(newid, self.grid_form_fields[ uid ].getColIndexById( "use_library" ) ).setValue( hash.use_library );	
			self.grid_form_fields[ uid ].cells(newid, self.grid_form_fields[ uid ].getColIndexById( "validate" ) ).setValue( fieldJSON[ "validate" ] );
			self._startPreview( uid );
				
		} );
		
		self._reOrderPageFields( uid );
	}
	
	,_addPreDefinedFieldToPage : function( uid, preDefinedItemID )
	{
		var self = this, d = self.dataView_type_of_fields[ uid ].get( preDefinedItemID ), rowData = [], fieldJSON;

		self.model.conf_grid_fields.ids.split(",").forEach( function(id, index, array)
		{					
			if( id.toLowerCase() == 'library_field_id' )
				rowData.push( "" );
			else if( id == 'name' )
				rowData.push( self.handleInputName( uid, d.name ) );
			else if( id == 'index' )
				rowData.push( self.grid_form_fields[ uid ].getRowsNum() );
			else
				rowData.push( d[id] );
		});
		
		fieldJSON = { type: self._convertLibraryFieldTypetoDhtmlxType( d.type ), type_standard: d.type, name: self.handleInputName( uid, d.name ), label: d.label, value : "", tooltip : "", required: false, validate: "", mask_to_use: d.mask_to_use, field_id : "-1", data : rowData, index : self.grid_form_fields[ uid ].getRowsNum(), list : [], options : [], className : ""};
		
		if( d.type == "A" )
			fieldJSON[ "rows" ] = 4;
		
		self._putFieldOnMemory( uid, self.selected_page[ uid ], fieldJSON, function( newFieldID )
		{
			fieldJSON[ "field_id" ] = newFieldID;
			self.grid_form_fields[ uid ].addRow( newFieldID, rowData);
			self.grid_form_fields[ uid ].cells(newFieldID, self.grid_form_fields[ uid ].getColIndexById( "mask_to_use" ) ).setValue( d.mask_to_use );
			self.grid_form_fields[ uid ].cells(newFieldID, self.grid_form_fields[ uid ].getColIndexById( "use_library" ) ).setValue( "0" );
			self.grid_form_fields[ uid ].cells(newFieldID, self.grid_form_fields[ uid ].getColIndexById( "library_field_id" ) ).setValue( "0" );
			self._startPreview( uid );
		} );
	}
	
	,_addLibraryFieldToPage : function( uid, libraryFieldID )
	{
		var self = this;
		var newid = self.grid_form_fields[ uid ].uid();
		
		var type_value = self.grid_library_fields[ uid ].cells(libraryFieldID, self.grid_library_fields[ uid ].getColIndexById( "type" )).getValue();
		var name = self.grid_library_fields[ uid ].cells(libraryFieldID, self.grid_library_fields[ uid ].getColIndexById( "name" )).getValue();
		var label = self.grid_library_fields[ uid ].cells(libraryFieldID, self.grid_library_fields[ uid ].getColIndexById( "label" )).getValue();
		
		var rowData = [];
		self.model.conf_grid_library_fields.ids.split(",").forEach( function(id, index, array)
		{
			var colIndex = self.grid_library_fields[ uid ].getColIndexById( id );
			//console.log( id );
			if( id.toLowerCase() == 'fieldname' )
				rowData.push(self.grid_library_fields[ uid ].cells(libraryFieldID, colIndex).getValue().toString().split("_" + libraryFieldID)[0]);
			else if( id.toLowerCase() == 'library_field_id' )
				rowData.push( libraryFieldID );
			else if( id.toLowerCase() == 'use_library' )
				rowData.push( "1" );
			else if( id.toLowerCase() == 'required' )
				if( self.grid_library_fields[ uid ].cells(libraryFieldID, colIndex).getValue() == "" || self.grid_library_fields[ uid ].cells(libraryFieldID, colIndex).getValue() == null )
					rowData.push( "N" );
				else
					rowData.push( self.grid_library_fields[ uid ].cells(libraryFieldID, colIndex).getValue() );
			else
				rowData.push(self.grid_library_fields[ uid ].cells(libraryFieldID, colIndex).getValue());
		});
		
				
		/**/
		var fieldJSON = { type: self._convertLibraryFieldTypetoDhtmlxType( type_value ), type_standard: type_value, name: name, label: label, value : "", tooltip : "", required: false, validate: "", field_id : newid, data : rowData, index : self.grid_form_fields[ uid ].getRowsNum(), list : [], options : [], className : ""};
		self._putFieldOnMemory( uid, self.selected_page[ uid ], fieldJSON, function(){self._startPreview( uid );} );
		
		self.grid_form_fields[ uid ].addRow( newid, rowData);
		
		self._reOrderPageFields( uid );
	}
	
	
	,_addGroupOfFieldsToPage : function( uid, groupID )
	{
		var self = this;
		self.progressOnForm( uid );
		self._setStatusDataTransferForm(uid, "requesting group("+groupID+") fields", true);
		CAIRS.MAP.API.get({
			resource : 	"/LibraryFields/groups/fields/" + groupID // mandatory
			,format : "json" // json, yaml, xml. Default: json. Not mandatory
			,payload : "columns=" + self.model.conf_grid_library_fields.ids + ""
			,onSuccess : function(request){ // not mandatory
				var json = JSON.parse( request.response );
				if( json.status == "success" )	
				{
					var rows = json.rows;
					rows.forEach( function(row, index, array)
					{
						if( self.grid_form_fields[ uid ].doesRowExist(row.id) )
						{
							
						}
						else
						{
							var newid = self.grid_form_fields[ uid ].uid();
							
							row.data[ self.grid_library_fields[ uid ].getColIndexById( "required" ) ] = 0;
							row.data[ self.grid_library_fields[ uid ].getColIndexById( "use_library" ) ] = "1";
							row.data[ self.grid_form_fields[ uid ].getColIndexById( "library_field_id" ) ] = row.id;
							
							self.grid_form_fields[ uid ].addRow( newid, row.data);
							
							var type_value = row.data[ self.grid_library_fields[ uid ].getColIndexById( "type" ) ];
							var name = row.data[ self.grid_library_fields[ uid ].getColIndexById( "name" ) ];
							var label = row.data[ self.grid_library_fields[ uid ].getColIndexById( "label" ) ];
							/**/
							var fieldJSON = { type: self._convertLibraryFieldTypetoDhtmlxType( type_value ), type_standard: type_value, name: name, label: label, value : "", tooltip : "", required: false, validate: "", field_id : newid, data : row.data, index : self.grid_form_fields[ uid ].getRowsNum(), list : [], options : [], className: ""};
							self._putFieldOnMemory( uid, self.selected_page[ uid ], fieldJSON, function(){self._startPreview( uid );} );
							self._reOrderPageFields( uid );
						}
						
					});
					if( rows.length == 0)
					{
						dhtmlx.message( {type : "error", text : "The dragged group has no fields."} );
					}
					self.progressOffForm( uid );
					
				}
				else
				{
					dhtmlx.message( {type : "error", text : json.response} );
					self.progressOffForm( uid );
				}
			}
			,onFail : function(request){ // not mandatory
				//console.log(request);
				self.progressOffForm( uid );
			}
		});
	}
	
	
	,grid_field_propertie_options_start_sequence : []
	
	,_addOptionToField : function( uid, hash, callBack ){
		var self = this, record = [], text = hash.text, asdefault = hash.asdefault;
		
		if( typeof self.grid_field_propertie_options_start_sequence[ uid ] === 'undefined' )
			self.grid_field_propertie_options_start_sequence[ uid ] = 0;
		
		// if is a valid form element and not an option
		if( typeof hash["text"] === 'undefined' || hash["text"] == "" )
		{
			 hash["text"] = hash[ "label" ];
			 text = hash[ "label" ];
		}
		
		if( typeof hash["name"] === 'undefined' || hash["name"] == "" )
		{
			if( typeof hash[ "label" ] !== 'undefined' )
			 	hash["name"] = self.handleInputName( uid, hash[ "label" ], true );// set a name for a valid form element
			else
				hash["name"] = ""; // set as empty for simple option elements
		}
		
		// MAP database expect N or Y asdefault value
		if( hash["asdefault"] == 0 ||  hash["asdefault"] == "0" ||  hash["asdefault"] == false )
		{
			hash["asdefault"] = "N";	
		}
		else if( hash["asdefault"] == 1 ||  hash["asdefault"] == "1" ||  hash["asdefault"] == true )
		{
			hash["asdefault"] = "Y";	
		}
		
		//console.log( hash );
		
		if( typeof text !== 'undefined' )
		{
			if( text !== null && text != "" )
			{
				var page_id = self.grid_pages[ uid ].getSelectedRowId();
				var field_id = self.grid_form_fields[ uid ].getSelectedRowId();			
				
				self.model.conf_grid_field_propertie_options.ids.split(",").forEach( function(id, index, array)
				{
					if( typeof hash[ id ] !== 'undefined' )
					{
						if( id == "caption" )
						{
							record.push( hash[ "label" ] );
							hash[ "caption" ] = hash[ "label" ];
						}//asdefault
						else
							record.push( hash[ id ] );
					}
					else
					{
						if( id == "index" )
						{
							record.push(  self.grid_field_propertie_options[ uid ].getRowsNum() );
							hash[ id ] = self.grid_field_propertie_options[ uid ].getRowsNum();
						}//asdefault
						else if( id == "asdefault" )
						{
							record.push( "N" );
							hash[ id ] = "N";
						}//asdefault
						else
						{
							record.push( "" );
							hash[ id ] = "";
						}
						//console.log( id + " -------------  " + hash[ id ])
					}
				});	
				
				var optionJSON = { 
					type: self._convertLibraryFieldTypetoDhtmlxType( hash.type ),   /* for checkbox and radio */
					type_standard : hash.type,   /* for checkbox and radio */
					name: hash["name"],  /* for checkbox and radio */
					label: text, /* for checkbox and radio */
					/**/
					value : hash["value"],
					caption : hash["caption"],
					className : hash["className"],
					text : text, /* for checkbox, radio, combo and Multiselect */
					/**/
					//selected : asdefault,  /* combo and Multiselect */
					//checked : asdefault,  /* for checkbox and radio */
					tooltip : "",  /* for checkbox and radio */
					required: "0", 
					validate: "",
					mask_to_use: hash[ "mask_to_use" ],
					asdefault : hash[ "asdefault" ],
					field_id : field_id,
					option_id : hash["option_id"], 
					index : self.grid_field_propertie_options[ uid ].getRowsNum(),  /* for checkbox, radio, combo and Multiselect */
					data : record /* for options grid */
				};
				
				var ftype = self._convertLibraryFieldTypetoDhtmlxType( hash.type );
				if( ftype == "checkbox" || ftype == "radio" || ftype == "combo" || ftype == "multiselect" || ftype == "select" )
					optionJSON[ "value" ] = text;
				else
					optionJSON[ "value" ] = hash[ "value" ];
				
				if( optionJSON.type == "" )	//if simple option, set the 'selected' property
					if( hash[ "asdefault"] ) optionJSON[ "selected" ] = hash[ "asdefault"];
				else	//if valid form element, set the 'checked' property ( valid for checkbox and radio )
					if( hash[ "asdefault"] ) optionJSON[ "checked" ] = hash[ "asdefault"];
					
				if( typeof hash[ "asdefault"] === 'undefined' )
					optionJSON[ "asdefault" ] = "N";
				
				if( hash.type == "A" ) // if textarea, set the 'rows' property
					optionJSON[ "rows" ] = 4;
				
				if( hash.tooltip )	
					if( hash.tooltip.length > 0 )
					{
						optionJSON[ "tooltip" ] = hash.tooltip;
						optionJSON[ "note" ] = "{ text: '"+hash.tooltip+"'}";
						optionJSON[ "info" ] = 'true';
					}
					else
					{
						optionJSON[ "note" ] = "";
						optionJSON[ "info" ] = 'false';
					}
					
				// for backward compatibility	
				optionJSON[ "optionname" ] = text;
				optionJSON[ "FieldOptionSeq" ] = optionJSON[ "index" ];
					
				console.log( optionJSON );
				
				self._putOptionOnMemory( uid, self.selected_page[ uid ], field_id, optionJSON, function( option_id ){
					
					self.grid_field_propertie_options[ uid ].addRow( option_id, record );
					self._startPreview( uid );
				} );
				if( callBack ) callBack();
			}
			else
			{
				//console.log("null or empty");
				return;
			}
		}
		else
		{
			//console.log("undefined");
			return;
		}
	}
	
	
	,_editOptionOfAField : function( uid, hash, callBack ){
		var self = this, record = [], text = hash.text, asdefault = hash.asdefault, 
			form_id = self.form_properties[ uid ].getItemValue( "form_id" ), page_id = self.grid_pages[ uid ].getSelectedRowId();
		
		if( typeof self.grid_field_propertie_options_start_sequence[ uid ] === 'undefined' )
			self.grid_field_propertie_options_start_sequence[ uid ] = 0;
			
		var option_id = self.grid_field_propertie_options[ uid ].getSelectedRowId();
		var field_id = self.grid_form_fields[ uid ].getSelectedRowId();
		
		var ftype = self._convertLibraryFieldTypetoDhtmlxType( hash[ "type" ] );
		if( ftype == "combo" || ftype == "multiselect" || ftype == "select" )
			hash["optionname"] = hash["text"];
		else
			hash["optionname"] = hash["label"];
		
		hash["caption"] = hash["label"];
		
		//var type_MAP_standard = hash[ "type_standard" ];
		//var type_DHTMLX_standard = hash[ "type" ];
		hash[ "type_standard" ] = self._convertLibraryFieldTypetoDhtmlxType( hash[ "type_standard" ] );
		//hash[ "type" ] = type_MAP_standard;
		
		//console.log( "_editOptionOfAField" );
		//console.log( hash );
		
		self.progressOnForm( uid );
		self._setStatusDataTransferForm(uid, "sending option("+hash[ "option_id" ]+") hash", true);
		CAIRS.MAP.API.update({
			resource : 	"/forms/" + form_id + "/pages/" + page_id + "/fields/" + field_id + "/options/" + hash[ "option_id" ] 
			,format : "json"
			,payload : "hash=" + JSON.stringify( hash )
			,onSuccess : function( request )
			{ 
				var json = eval('(' + request.response + ')');
					
				if( json.status == "success" )	
				{
					self._setStatusDataTransferForm(uid, "option("+hash[ "option_id" ]+") saved");
					for( fieldname in hash )
						if ( hash.hasOwnProperty( fieldname ) ) 
							if( fieldname == "type")
							{
								self._getFieldOption( uid, self.selected_page[ uid ], field_id, hash[ "option_id" ] )[ fieldname ] = self._convertLibraryFieldTypetoDhtmlxType( hash[ fieldname ] );
								try
								{
									self.grid_field_propertie_options[ uid ].cells(option_id, self.grid_field_propertie_options[ uid ].getColIndexById( fieldname ) ).setValue( hash[ fieldname ] );
								}
								catch(e)
								{
									console.log("column "+fieldname+" not found");
								}
							}
							else
							{
								self._getFieldOption( uid, self.selected_page[ uid ], field_id, hash[ "option_id" ] )[ fieldname ] = hash[ fieldname ];
								try
								{
									self.grid_field_propertie_options[ uid ].cells(option_id, self.grid_field_propertie_options[ uid ].getColIndexById( fieldname ) ).setValue( hash[ fieldname ] );
								}
								catch(e)
								{
									console.log("column "+fieldname+" not found");
								}
							}
					
					if( ftype == "checkbox" || ftype == "radio" || ftype == "combo" || ftype == "multiselect" || ftype == "select" )
						self._getFieldOption( uid, self.selected_page[ uid ], field_id, hash[ "option_id" ] )[ "value" ] = hash[ "text" ];
					else
						self._getFieldOption( uid, self.selected_page[ uid ], field_id, hash[ "option_id" ] )[ "value" ] = hash[ "value" ];
					
					//console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
					//console.log(field_id);
					//console.log(hash[ "option_id" ]);
					//console.log(  self._getFieldOption( uid, self.selected_page[ uid ], field_id, hash[ "option_id" ] )  );// option_id
					self._startPreview( uid );
					self.progressOffForm( uid );
					if( callBack ) callBack( hash[ "option_id" ] );
				}
				else
				{
					dhtmlx.message( {type : "error", text : "option not updated. reason: " + json.response} );
					self._setStatusDataTransferForm(uid, "option not updated");
					if( json.response == "token not authorized" )
						self._setStatusUserForm(uid, "token expired. Please login again", false);
					self.progressOffForm( uid );
				}
			}
			,onFail : function( request )
			{ // not mandatory
				var json = eval('(' + request.response + ')');
				dhtmlx.message( {type : "error", text : json.response} );
				self._setStatusDataTransferForm(uid, "option not updated");
				if( json.response == "token not authorized" )
					self._setStatusUserForm(uid, "token expired. Please login again", false);
				self.progressOffForm( uid );
			}
		});
		
	}

	,_save_form : function( uid, callBack, form_id )
	{
		var self = this, hash = self.form_properties[ uid ].getFormData();
		self.progressOnForm( uid );
		if( hash[ "form_id" ] == -1 )
		{
			if( CAIRS.dhtmlx.validateForm( uid, self.form_properties[ uid ] ) )
			{			
				if( hash[ "redirecturl" ] == "" || hash[ "redirecturl" ] == " " )
					hash[ "redirecturl" ] = " ";
			
				hash[ "adminalert" ] = hash[ "adminalert" ].toString().replace(/-,-/gi, "");
				hash[ "autorespond" ] = hash[ "autorespond" ].toString().replace(/-,-/gi, "");
				hash[ "preview" ] = hash[ "preview" ].toString().replace(/-,-/gi, "");
				hash[ "nomultiple" ] = hash[ "nomultiple" ].toString().replace(/-,-/gi, "");
				hash[ "formname" ] = self.handleFormName( uid, hash[ "formlabel" ]);
				
				CAIRS.MAP.API.insert({
					resource : 	"/forms" // mandatory
					,format : "json" // json, yaml, xml. Default: json. Not mandatory
					,payload : "hash=" + JSON.stringify( hash ) // mandatory for PUT and POST
					,onSuccess : function( request ) // not mandatory
					{ 
						var json = eval('(' + request.response + ')');
						dhtmlx.message( {type : "error", text : json.response} );
						self.configuration[ uid.replace(new RegExp("_-1","g"),"") ].page_layout = hash.displaycolumns;
						self.form_properties[ uid ].setItemValue( "form_id",  json.form_id );
						
						self._addPage( { 
							uid : uid,
							pagename : "Page one",
							page_id : null,
							form_id : json.form_id
						} );
						
						self._startPreview( uid );
						
						self._feedGrid( uid.replace(new RegExp("_-1","g"),"") );
						
						self.progressOffForm( uid );
						
						if( callBack ) callBack();
					}
					,onFail : function( request )
					{ // not mandatory
						var json = eval('(' + request.response + ')');
						dhtmlx.message( {type : "error", text : json.response} );
						self.progressOffForm( uid );
					}
				});
			}
			else
			{
				self.tabbar_form[ uid ].setTabActive( "form_properties" );
				self.progressOffForm( uid );
			}
		}
		else
		{
			if( CAIRS.dhtmlx.validateForm( uid, self.form_properties[ uid ] ) )
			{			
				hash[ "formname" ] = self.handleFormName( uid, hash[ "formlabel" ]);
				CAIRS.MAP.API.update({
					resource : 	"/forms/" + hash[ "form_id" ]// mandatory
					,format : "json" // json, yaml, xml. Default: json. Not mandatory
					,payload : "hash=" + JSON.stringify( hash ) // mandatory for PUT and POST
					,onSuccess : function( request ) // not mandatory
					{ 
						var json = eval('(' + request.response + ')');
						dhtmlx.message( {type : "error", text : json.response} );
						self.configuration[ uid.replace(new RegExp("_" + form_id,"g"),"") ].page_layout = hash.displaycolumns;
						self.form_properties[ uid ].setItemValue( "form_id",  json.form_id );
						
						self._startPreview( uid );
						
						self._feedGrid( uid.replace(new RegExp("_" + form_id,"g"),"") );
						
						self.progressOffForm( uid );
						
						if( callBack ) callBack();
					}
					,onFail : function( request )
					{ // not mandatory
						var json = eval('(' + request.response + ')');
						dhtmlx.message( {type : "error", text : json.response} );
						self.progressOffForm( uid );
					}
				});
			}
		}
	}
	
	
	,_deleteForm : function( uid )
	{
		var self = this;
		dhtmlx.message(
		{
			title : "Warning",
			type :"confirm",
			text : "Do you want to delete the selected form?",
			ok : "Delete",
			cancel : "Cancel",
			callback: function( ok )
			{
				if(ok)
				{
					CAIRS.MAP.API.del({
						resource : 	"/forms/" + self.grid[ uid ].getSelectedRowId() // mandatory
						,format : "json" // json, yaml, xml. Default: json. Not mandatory
						,onSuccess : function( request ) // not mandatory
						{ 
							var json = eval('(' + request.response + ')');
							dhtmlx.message( {type : "error", text : json.response} );
							self._feedGrid( uid );
						}
						,onFail : function( request )
						{ // not mandatory
							var json = eval('(' + request.response + ')');
							dhtmlx.message( {type : "error", text : json.response} );
						}
					});	
				}
			}
		});	
	}
	
	,handleInputName : function( uid, name, isChild )
	{
		var self = this;
		try
		{
			var strFinal = "";
			name = name.replace(/ /gi, "_");
			name = name.toLowerCase();
			var existing = ((new Date()).getTime());
			if( isChild )
				return "input_child_" + name + "_" + existing;
			else
				return "input_" + name + "_" + existing;
		}catch(e){
				console.log(e.stack)
		};
	}
	
	
	,handleFormName : function( uid, name, form_id )
	{
		var self = this, form_id = form_id || "";
		try
		{
			name = name.replace(/ /gi, "_");
			name = name.toLowerCase();
		}catch(e){
				//console.log(e.stack)
				};
		return "form_" + name;
	}
	
	,setPageStatusInfo : function( uid, msg )
	{
		var self = this;
		document.getElementById("page_info_" + uid + "").innerHTML = msg;
		self.toolbar_form_fields[ uid ].setItemText("info", msg);
	}
	
	,_loadDataStore : function( uid, callBack )
	{
		var self = this;
		CAIRS.MAP.API.get({
			resource : 	"/agencies" // mandatory
			,format : "json" // json, yaml, xml. Default: json. Not mandatory
			,payload : "columns=agency_id,agency_name&order=" + JSON.stringify( {direction:'ASC', orderby:'agency_name'} )
			,onSuccess : function(request){ // not mandatory
				var json = eval('(' + request.response + ')');
				if( json.status == "success" )	
				{
					self.data_store[ uid ][ "agencies" ] = json.agencies;
					if( callBack ) callBack();
				}
				else
				{
					dhtmlx.message( {type : "error", text : json.response} );
				}
			}
			,onFail : function(request){ // not mandatory
				var json = eval('(' + request.response + ')');
				dhtmlx.message( {type : "error", text : json.response} );
				
			}
		});
	}
	
	
	,_getRawUID : function( uid ){
		if( uid.toString().indexOf("_") != -1 )
			return uid.split("_")[ 0 ] + "_" + uid.split("_")[ 1 ];
		else
			return uid;
	}
	,progressOn : function( uid )
	{
		var self = this;
		try
		{
			self.window[ uid ].progressOn();
		}catch(e){};
		
		self.layout[ uid ].progressOn();
	}
	
	,progressOff : function( uid )
	{
		var self = this;
		try
		{
			self.window[ uid ].progressOff();
		}catch(e){};
		
		self.layout[ uid ].progressOff();
	}
	
	
	,progressOnForm : function( uid )
	{
		var self = this;
		self.window_form[ uid ].progressOn();
		self.layout_form[ uid ].progressOn();
	}
	
	,progressOffForm : function( uid )
	{
		var self = this;
		self.window_form[ uid ].progressOff();
		self.layout_form[ uid ].progressOff();
	}
 
    ,init : function( model )
    {
        var self = this;
        self.model = model;
    }
 	
	,socket : null
	
    ,start : function( configuration )
    {
        var self = this;
		
		CAIRS.init();
		
        self.uid = "FormBuilder_" + ((new Date()).getTime());
		if( CAIRS.isNumber( configuration.form_id ) )
			self.uid = configuration.form_id;
 
        if( (typeof configuration.application_path === 'undefined') ||  (configuration.application_path.length === 0))
        {
            dhtmlx.message( {type : "error", text : "application_path is missing"} );
            return;
        }
        if( (typeof configuration.dhtmlx_codebase_path === 'undefined') ||  (configuration.dhtmlx_codebase_path.length === 0))
        {
            dhtmlx.message( {type : "error", text : "dhtmlx_codebase_path is missing"} );
            return;
        }
		if( (typeof configuration.username === 'undefined') ||  (configuration.username.length === 0))
        {
            dhtmlx.message( {type : "error", text : "username is missing"} );
            return;
        }
		
		configuration[ "form_id" ] = null;
 
        window.dhx_globalImgPath = configuration.dhtmlx_codebase_path + "imgs/";
        dhtmlx.skin = self.model.globalSkin || "dhx_skyblue";
 
        configuration["icons_path"] = "icons/";
 
        self.configuration[ self.uid  ] = configuration;
 
 		self.model.globalImgPath  = configuration.dhtmlx_codebase_path + "imgs/";
        self.model.conf_window.image_path  = configuration.application_path + configuration.icons_path;
        self.model.conf_toolbar.icon_path =  configuration.application_path + configuration.icons_path + "32px/";
		self.model.conf_toolbar_form_pages.icon_path =  configuration.application_path + configuration.icons_path;
		self.model.conf_toolbar_form_fields.icon_path =  configuration.application_path + configuration.icons_path;
		self.model.conf_toolbar_field_propertie.icon_path =  configuration.application_path + configuration.icons_path + "32px/";
		self.model.conf_toolbar_tags.icon_path =  configuration.application_path + configuration.icons_path;
		self.model.conf_toolbar_grid_field_propertie_options.icon_path =  configuration.application_path + configuration.icons_path;
		self.model.conf_window_form.image_path  = configuration.application_path + configuration.icons_path;
        self.model.conf_toolbar_form.icon_path =  configuration.application_path + configuration.icons_path + "32px/";
		self.model.conf_tabbar_form.image_path  = self.model.globalImgPath;
		
		self.data_store[ self.uid ] = [];
		self.configuration[ self.uid ].page_layout = "S";
		
		if( typeof self.configuration[ self.uid ].container === 'undefined' )
		{
			self._window( self.uid );
		}
		self._layout( self.uid );
        
		self.progressOn( self.uid );
		
		
		
		function notify( text )
		{
			  
			  var havePermission = window.webkitNotifications.checkPermission();
			  console.log("--------------------------------------------------");
			  console.log(havePermission);
			  if (havePermission == 0) {
				// 0 is PERMISSION_ALLOWED
				window["notification"] = window.webkitNotifications.createNotification(
				  'http://perltest.myadoptionportal.com/images/cairs.png',
				  'FormBuilder notification',
				  text
				);
				
				window.setTimeout(function(){
					//window.notification.close();
				}, 1000);
			
				window.notification.onclick = function () {
				  //window.open("http://stackoverflow.com/a/13328397/1269037");
				  //window.notification.close();
				}
				window.notification.show();
			  } else {
				  window.webkitNotifications.requestPermission();
			  }	
		}
		
		
		self.socket = CAIRS.socket.connect(
		{
			resource : 	"ws://192.168.1.33:5000/_hippie/ws"
			//,pipe : "welcome"
			,onOpen : function( messageEvent ){
				self._setStatusSocket("connected");
				
				CAIRS.MAP.API.authorize(
				{
					username : configuration.username,
					onSuccess: function(request)
					{
						self._setStatus("Form Maker user is authorized.");
						self._setStatusDataTransfer("credential received");
						self._setStatusUser("Logged as " + CAIRS.MAP.API.user, true);
						
						// send message to welcome routing_key
						self.socket.Send( 'connected from ' + self.appName + ' as: ' + CAIRS.MAP.API.user + '. Browser: ' + CAIRS.Browser.name + ' ' + CAIRS.Browser.version + '. OS:' + CAIRS.Browser.OS + '. client id: ' + self.socket.getClientID() );
						
						// subscribe to : FormBuilder online users
						self.socket.Send( {
							type : 'subscribe'// message, subscribe    -> mandatory
							,routing_key : self.appName + ' online users'
							,message : 'subscribed to ' + self.appName + ' online users routing_key - from ' + self.appName + ' application client'
						} );
						
						self._loadDataStore( self.uid, function()
						{
							self.progressOff( self.uid );
							
							self._setStatusDataTransfer("Datastore 100% loaded");
		
							self._toolbar( self.uid );
							self._grid( self.uid );
							self._feedGrid( self.uid );
							
							self._setStatus("Form Maker is ready.");
							
							
							
							
							CAIRS.shortcut.add("SHIFT+C", function(){
								self._mountFormBuilderScreen( self.uid );
							});
						});
					},
					onFail: function(request){
						//console.log(request);
						//console.log("not authorized");
						self.progressOff( self.uid );
						self._setStatusDataTransfer("credential sent");
						self._setStatusUser("not authorized", false);
						self._setStatusError("access denied");
						self._setStatus("The user was not authorized to use MAP API. Form Maker will not start.");
					}
				});
				
			}
			,onClose : function( messageEvent ){
				
			}
			,onBeforeClose : function( client_id ){
				self.socket.Send("client id: " + client_id  + " disconnecting from FormBuilder");
			}
			,onBeforeSend : function( ){
				
			}
			,onMessage : function( data, messageEvent )
			{
				console.log("new message from server");
				console.log(messageEvent);
				console.log(messageEvent.data);
				console.log(data);
				var data = JSON.parse(messageEvent.data);				
				if (data.msg) {
					console.log(data.msg);
					self._setStatusSocket(data.msg);
					
					//notify(data.msg);
					
					
					
				}
			}
			,onError : function( error ){
				console.log( error );
				self._setStatusSocket("server offline", true);
			}
		});
		
		
    }
}
FormBuilder.init( FormBuilder_Model );