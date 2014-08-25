/**
 * @constructor
 * Formbuilder application controller
 */
var FormBuilder = {
	
	appName: "FormBuilder"

	,
	version: 0.1

	,
	uid: null

	,
	window_manager: null

	,
	data_store: []

	,
	gridQString: [] //we'll save here the last url with query string we used for loading grid (see step 5 for details) we'll use this script block for functions
	
	,builderOpened : false

	,
	window: [],
	window_print: [],
	layout: [],
	toolbar: [],
	toolbar_taskbar: [],
	grid: [],
	status_bar: []

	,
	toolbar_print: []

	,
	status_bar_paging: []

	,
	window_form: [],
	layout_form: [],
	tabbar_form: [],
	toolbar_form: [],
	status_bar_form: [],
	form_properties: []

	,
	layout_form_layout: [],
	layout_form_layout_left: [],
	layout_form_layout_right: []

	,
	status_bar_paging_library_fields: [],
	status_bar_paging_group_fields: [],
	status_bar_layout_form_layout_left_a: [],
	status_bar_layout_form_layout_left_b: []

	,
	toolbar_form_pages: [],
	grid_pages: []

	,
	tabbar_form_fields: [],
	toolbar_form_fields: [],
	grid_form_fields: []

	,
	tabbar_form_create_fields: [],
	tabbar_form_add_field: [],
	form_custom_field: [],
	toolbar_custom_field: [],
	tabbar_form_library_fields: [],
	form_tags: [],
	status_bar_tags: [],
	toolbar_tags: [],
	tree_form_library_field_category: [],
	grid_library_fields: [],
	dataView_type_of_fields: [],
	form_field_propertie: [],
	toolbar_field_propertie: [],
	toolbar_grid_field_propertie_options: [],
	pop_up_grid_field_propertie_options: [],
	form_grid_field_propertie_options: []

	

	,
	grid_group_fields: []
	
	,
	pop_up_form_pages: []
	,
	form_form_pages: []
	,
	status_bar_form_custom_field: []
	,
	layout_field_propertie: []
	
	
	,
	formPreviewWindow: []
	,
	form_preview: []
	,
	layout_form_preview: []
	,
	toolbar_form_preview: []
	,
	tab_pages_preview: []
	
	
	,
	status_bar_dataView_type_of_fields: []

	,
	dataLoaded_tree_form_library_field_category: [],
	dataLoaded_tags_form: []

	,
	pages: [],
	selected_page: [],
	is_grid_pages: []
	
	,
	grid_field_propertie_options_start_sequence: []
	
	,grid_field_propertie_options: []
	,form_context_menu : []
	
	,
	totalAddedFields: []
	
	
	,window_rules: []

	,
	form_default_width: 720

	,
	configuration: []
	
	,
	application_path : "https://cdmap03.myadoptionportal.com/modules/AravindCom/FormBuilder/"
	
	,
	dhtmlx_codebase_path : "https://cdmap03.myadoptionportal.com/modules/codebase3.6/"
	
	,
	icons_path : "https://cdmap03.myadoptionportal.com/modules/AravindCom/FormBuilder/icons/"
	
	
	,
	signature_application_url : "https://cdmap03.myadoptionportal.com/modules/AravindCom/FormBuilder/js/signature_component/"
	
	
	,
	LibraryFieldMaker_application_url : "https://cdmap03.myadoptionportal.com/modules/LibraryFieldMaker/"

	,
	signature_controls: []
	
	
	,window_entries: []
	,window_entries_saved_toolbar: []
	,window_entries_saved_grid: []
	,window_edit_entries_saved: []
	,window_edit_entries_saved_layout: []
	,window_edit_entries_saved_toolbar: []
	,window_edit_entries_saved_tabbar: []
	,window_edit_entries_saved_form: []
	,row_id: []
	,row_saved_id: []
	,row_saved_connid: []
	,row_saved_connectionid: []
	,signature_controls_saved: []
	,json_saved: null

	,
	/**
	 * Description
	 * @method _window_manager
	 * @return
	 */
	_window_manager: function () {
		var self = this;
		self.window_manager = new dhtmlXWindows();
		self.window_manager.setImagePath(self.model.conf_window.image_path);
	}

	,
	/**
	 * Description
	 * @method _window
	 * @param {} uid
	 * @return
	 */
	_window: function (uid) {
		var self = this;

		if (self.window_manager === null)
			self._window_manager();

		if (self.window_manager.isWindow("window_FormBuilder_" + uid))

		{
			self.window[uid].show();
			self.window[uid].bringToTop();
			return;
		}
		self.window[uid] = self.window_manager.createWindow("window_FormBuilder_" + uid, self.model.conf_window.left + 10,
			self.model.conf_window.top + 10, self.model.conf_window.width, self.model.conf_window.height);
		self.window[uid].setText(self.model.text_labels.main_window_title);
		self.window[uid].setIcon(self.model.conf_window.icon, self.model.conf_window.icon_dis);

		self.window[uid].attachEvent("onClose", function (win) {
			dhtmlx.skin = "dhx_skyblue";
			self.model.conf_form_preview.template = [self.model.conf_form_preview.defaultRootProperties];
			
			try{
				self.rules.window[ uid ].close();
			}catch(e){
				console.log(e.stack);
			}
			
			try{
				self.rules.window_crud[ uid ].close();
			}catch(e){
				console.log(e.stack);
			}
			
			return true;
		});

		self.status_bar[uid] = self.window[uid].attachStatusBar();
		self.status_bar[uid].setText("<div id='status_info'>Initializing Form Maker</div><div id='expiration_info' class='data_transfer_info'></div><div id='user_info'><img id='user_info_status' src='" + self.icons_path + "offline.png' /> <span>Not authorized yet</span></div><div id='data_transfer_info'> no data transferred</div><div id='socket_info' class='data_transfer_info'>socket: disconnected</div><div id='errors_info'>no errors</div>");
	}

	
	

	,
	/**
	 * Description
	 * @method _layout
	 * @param {} uid
	 * @return
	 */
	_layout: function (uid) {
		var self = this;

		if (self.configuration[uid].container) {
			self.layout[uid] = new dhtmlXLayoutObject(self.configuration[uid].container, self.model.conf_layout.pattern);
			self.status_bar[uid] = self.layout[uid].attachStatusBar();
			self.status_bar[uid].setText("<div id='status_info'>Initializing Form Maker</div><div id='expiration_info' title='time remaining for token expiration' class='expiration_info'></div><div id='user_info'><img id='user_info_status' src='" + self.icons_path + "offline.png' /> <span>Not authorized yet</span></div><div id='data_transfer_info'> no data transferred</div><div id='socket_info' class='data_transfer_info'>socket: disconnected</div><div id='errors_info'>no errors</div>");
		}
		else {
			self.layout[uid] = self.window[uid].attachLayout(self.model.conf_layout.pattern);
		}

		self.layout[uid].cells("a").hideHeader();
		self.status_bar_paging[uid] = self.layout[uid].cells("a").attachStatusBar();
		self.status_bar_paging[uid].setText("<div id='toolbar_taskbar_FormBuilder'></div>");
	}
	
	
	,_form_context_menu: function( uid ){
		self = this;
		self.form_context_menu[ uid ] = new dhtmlXMenuObject();
		self.form_context_menu[ uid ].setIconsPath(  self.icons_path );
		self.form_context_menu[ uid ].renderAsContextMenu();
		//console.log( CAIRS.xml.serialize( CAIRS.xml.fromJSON( self.model.conf_form_context_menu ) ) );
		self.form_context_menu[ uid ].loadXMLString(CAIRS.xml.serialize( CAIRS.xml.fromJSON( self.model.conf_form_context_menu ) ) , function(){
			self.grid[uid].enableContextMenu( self.form_context_menu[ uid ] );
		});
		
		self.form_context_menu[ uid ].attachEvent("onShow", function (zoneId)
		{
			if ( self.grid[uid].getSelectedRowId() != null )
			{
				self.form_context_menu[ uid ].setItemEnabled("form_builder");
				self.form_context_menu[ uid ].setItemEnabled("delete_form");
				self.form_context_menu[ uid ].setItemEnabled("view_entries");
			}
			else
			{
				self.form_context_menu[ uid ].setItemDisabled("form_builder");
				self.form_context_menu[ uid ].setItemDisabled("delete_form");
				self.form_context_menu[ uid ].setItemDisabled("view_entries");
			}
			
		});
		
		self.form_context_menu[ uid ].attachEvent("onClick", function( id ){
			if (id == "new_form") {
				self._mountFormBuilderScreen(uid);
			}
			else if (id == "delete_form") {
				self.data._deleteForm(uid);
			}
			else if (id == "reload") {
				self._feedGrid(uid);
			}
			else if (id == "form_builder") {
				self._mountFormBuilderScreen(uid, self.grid[uid].getSelectedRowId());
			}
			else if (id == "print_form_list") {
				//self.data._getFormsList( uid );
				self.grid[uid].toPDF('processors/dhx_pdf/generate.php');
			}
			else if (id == "library_field_maker") {
				self.library_fieldmaker_wrapper.start(	uid, 
					self.configuration[ uid ].username, 
					self.configuration[ uid ].agency_id, 
					self.configuration[ uid ].ConnID, 
					self.configuration[ uid ].ConnectionId, 
					self.configuration[ uid ].database	
				);
				
			}
			else if (id == "view_entries") {
				if (self.grid[uid].cells(self.grid[uid].getSelectedRowId(),21).getValue() == 'Yes') {
					self.entries._window_entries(uid, self.row_id[uid]);
				}else{
					dhtmlx.alert({
                            title:"Sync before!",
                            type:"alert-error",
                            text:"Before viewing the entries for this form, you need to sync it before on form builder."
                    });
				}
				
			}
		});
		//self.form_context_menu[ uid ].loadXML("../common/_context.xml");	
	}

	,
	/**
	 * Description
	 * @method _toolbar
	 * @param {} uid
	 * @return
	 */
	_toolbar: function (uid) {
		var self = this;

		self.toolbar[uid] = self.layout[uid].cells("a").attachToolbar(self.model.conf_toolbar);
		self.toolbar[uid].setIconSize(32);
		self.toolbar[uid].attachEvent("onClick", function (id) {
			if (id == "new_form") {
				self._mountFormBuilderScreen(uid);
			}
			else if (id == "delete_form") {
				self.data._deleteForm(uid);
			}
			else if (id == "form_builder") {
				self._mountFormBuilderScreen(uid, self.grid[uid].getSelectedRowId());
			}
			else if (id == "print_form_list") {
				//self.data._getFormsList( uid );
				self.grid[uid].toPDF('processors/dhx_pdf/generate.php');
			}
			else if (id == "library_field_maker") {
				self.library_fieldmaker_wrapper.start(	uid, 
					self.configuration[ uid ].username, 
					self.configuration[ uid ].agency_id, 
					self.configuration[ uid ].ConnID, 
					self.configuration[ uid ].ConnectionId, 
					self.configuration[ uid ].database	
				);
				
			}
			else if (id == "view_entries") {
				if (self.grid[uid].cells(self.grid[uid].getSelectedRowId(),21).getValue() == 'Yes') {
					self.entries._window_entries(uid, self.row_id[uid]);
				}else{
					dhtmlx.alert({
                            title:"Sync before!",
                            type:"alert-error",
                            text:"Before viewing the entries for this form, you need to sync it before on form builder."
                    });
				}
				
			}
		});
	}
	
	
	,
	/**
	 * Description
	 * @method _toolbar_taskbar
	 * @param {} uid
	 * @return
	 */
	_toolbar_taskbar: function (uid) {
		var self = this;

		self.toolbar_taskbar[uid] = new dhtmlXToolbarObject(self.model.conf_toolbar_taskbar);//self.layout[uid].attachToolbar(self.model.conf_toolbar);
		self.toolbar_taskbar[uid].attachEvent("onClick", function (id) {
			if (id.indexOf("window_FormBuilder_formcreator_") > -1) {
				var form_id = id.split("_")[5];
				//uid = uid + "_" + form_id;
				/*console.log( uid );
				console.log( id );
				console.log( form_id );
				console.log( self.window_form );*/
				//uid = uid + "_" + form_id;
				self.window_form[uid + "_" + form_id].show();
				self.window_form[uid + "_" + form_id].bringToTop();
				self.window_form[uid + "_" + form_id].park();
			}
			
		});
	}

	,
	/**
	 * Description
	 * @method _toolbar_print
	 * @param {} uid
	 * @return
	 */
	_toolbar_print: function (uid) {
		var self = this;

		if (typeof self.toolbar_print[uid] === 'undefined') {
			self.toolbar_print[uid] = [];
		}

		self.toolbar_print[uid] = self.window_print[uid].attachToolbar(self.model.conf_toolbar_print);

		self.toolbar_print[uid].attachEvent("onClick", function (id) {
			if (id == "save") {
				var firstname = document.querySelector('[name="first_name1"]').value;

				if (typeof self.configuration[uid].form_id !== 'undefined') {
					if (CAIRS.isNumber(self.configuration[uid].form_id)) {
						var pathpdf = "pdf/" + self.configuration[uid].form_id + "/Safe_Form_" + firstname + ".pdf";
					}
					else {
						var pathpdf = "pdf/tmp/Safe_Form.pdf";
					}
				}
				else {
					var pathpdf = "pdf/tmp/Safe_Form.pdf";
				}

				myTempWindow = window.open(self.application_path + "processors/dl.php?filename=" + pathpdf, 'Save PDF.', 'width=200,height=100');
				setTimeout('myTempWindow.close();', 5000);
			}
		});
	}

	,
	/**
	 * Description
	 * @method _grid
	 * @param {} uid
	 * @return
	 */
	_grid: function (uid) {
		var self = this;
		self.grid[uid] = self.layout[uid].cells("a").attachGrid(self.model.conf_grid);
		self.grid[uid].setHeader(self.model.conf_grid.headers);
		self.grid[uid].setColumnIds(self.model.conf_grid.ids);
		self.grid[uid].setInitWidths(self.model.conf_grid.widths);
		self.grid[uid].setColAlign(self.model.conf_grid.colaligns);
		self.grid[uid].setColTypes(self.model.conf_grid.coltypes);
		self.grid[uid].setColSorting(self.model.conf_grid.colsorting);
		self.grid[uid].selMultiRows = true;
		self.grid[uid].setDateFormat("%m-%d-%Y");

		//self.grid[ uid ].enablePaging(false, 100, 10, "toolbar_taskbar_FormBuilder", true);

		//self.grid[ uid ].setPagingSkin("toolbar", "dhx_skyblue");
		
		self._form_context_menu(uid);

		self.grid[uid].init();

		self.grid[uid].enableHeaderMenu();

		var agencies_combo = self.grid[uid].getCombo(self.grid[uid].getColIndexById("form_agency_id"));
		self.data_store[uid]["agencies"].forEach(function (agency, index, array_) {
			agencies_combo.put(agency.agency_id, agency.agency_name);
		});

		//self.grid[ uid ].attachHeader("#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan");
		self.grid[uid].attachHeader("#rspan,<input id='input_search_formlabel' type='text' style='width: 99%; border:1px solid gray;' onClick='(arguments[0]||window.event).cancelBubble=true;' onKeyUp='FormBuilder._feedGrid( \"" + uid + "\" )'>,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan");

		self.grid[uid].attachEvent("onXLS", function () {
			self.toolbar[uid].disableItem("print_form_list");
			self.progressOn(uid);
		});
		self.grid[uid].attachEvent("onXLE", function () {
			self.toolbar[uid].enableItem("print_form_list");
			self.progressOff(uid);
		});

		self.grid[uid].attachEvent("onRowSelect", function (id, ind) {
			self.toolbar[uid].enableItem("delete_form");
			self.toolbar[uid].enableItem("form_builder");
			self.toolbar[uid].enableItem("view_entries");
			
			self.row_id[uid] = id;
		});

		self.grid[uid].attachEvent("onRowDblClicked", function (id, ind) {
			self._mountFormBuilderScreen(uid, id);
		});

		self.grid[uid].attachEvent("onKeyPress", function (code, cFlag, sFlag) {
			if (code == 46) {
				self.data._deleteForm(uid);
			}
			return true;
		});

		self.grid[uid].attachEvent("onEnter", function (id, ind) {
			self._mountFormBuilderScreen(uid, id);
			return true;
		});

		/*self.grid[ uid ].attachEvent("onBeforeSorting", function( ind, type, direction)
		{
			if( direction == "des" ) 
				direction = "DESC";
			else
				direction = "ASC";
			self._feedGrid( uid, { direction : direction, orderby : self.model.conf_grid.ids.split(",")[ ind ]} );
			self.grid[ uid ].setSortImgState(true, ind, direction);
			return false;
        });*/
	}

	,
	/**
	 * Description
	 * @method _window_form
	 * @param {} uid
	 * @param {} form_id
	 * @return
	 */
	_window_form: function (uid, form_id) {
		var self = this;

		if (self.window_manager === null)
			self._window_manager();

		if (self.window_manager.isWindow("window_FormBuilder_formcreator_" + uid + "_" + form_id)) {
			self.window_form[uid].show();
			self.window_form[uid].bringToTop();
			return;
		}
		self.window_form[uid] = self.window_manager.createWindow(
			"window_FormBuilder_formcreator_" + uid + "_" + form_id, self.model.conf_window_form.left, self.model.conf_window_form.top, self.model.conf_window_form.width, self.model.conf_window_form.height
		);
		
		//self.window_form[uid].button("minmax2").show();

		if (form_id == -1)
			self.window_form[uid].setText(self.model.conf_window_form.title);
		else
			self.window_form[uid].setText("Edit form");

		self.window_form[uid].setIcon(
			self.model.conf_window_form.icon, self.model.conf_window_form.icon_dis
		);
		self.window_form[uid].attachEvent("onParkUp", function(win){
			win.hide();
			return false;
		});
		
		self.window_form[uid].attachEvent("onClose", function (win) {
			try
			{
				self.rules.window[uid].close();
			}catch(e){}
			try
			{
				self.rules.window_crud[uid].close();
			}catch(e){}
			
			
			self.toolbar_taskbar[self._getRawUID(uid)].removeItem("window_FormBuilder_formcreator_" + uid + "_" + form_id);
			dhtmlx.skin = "dhx_skyblue";
			self.model.conf_form_preview.template = [self.model.conf_form_preview.defaultRootProperties];
			self.builderOpened = false;
			return true;
		});
		self.status_bar_form[uid] = self.window_form[uid].attachStatusBar();
		self.status_bar_form[uid].setText("<div class='status_info' id='formbuilder_status_info_" + uid + "'>Initializing FormBuilder interface</div><div class='user_info' id='formbuilder_user_info_" + uid + "'><img class='user_info_status' id='formbuilder_user_info_status_" + uid + "' src='" + self.icons_path + "/online.png' /> <span>Logged as " + CAIRS.MAP.API.user + "</span></div><div class='data_transfer_info' id='formbuilder_data_transfer_info_" + uid + "'> loading form data</div><div id='formbuilder_errors_info_"+ uid+ "' class='errors_info'>no errors</div>");
	}

	,
	/**
	 * Description
	 * @method _layout_form
	 * @param {} uid
	 * @return
	 */
	_layout_form: function (uid) {
		var self = this;
		self.layout_form[uid] = self.window_form[uid].attachLayout(self.model.conf_layout_form.pattern);
		self.layout_form[uid].cells("a").hideHeader();
	}

	,
	/**
	 * Description
	 * @method _tabbar_form
	 * @param {} uid
	 * @param {} form_id
	 * @return
	 */
	_tabbar_form: function (uid, form_id) {
		var self = this;

		try {
			self.tabbar_form[uid] = self.layout_form[uid].cells("a").attachTabbar();
			self.tabbar_form[uid].setSkin('dhx_skyblue');
			self.tabbar_form[uid].setImagePath(self.model.conf_tabbar_form.image_path); // self.application_path
			self.tabbar_form[uid].enableScroll(true);
			self.tabbar_form[uid].addTab("form_properties", "Form properties", "200px");
			self.tabbar_form[uid].addTab("form_layout", "Build form", "200px");
			self.tabbar_form[uid].addTab("form_preview", "Preview form", "200px");

			self.tabbar_form[uid].setTabActive("form_properties");
			self.tabbar_form[uid].attachEvent("onSelect", function (idd, last_id) {
				dhtmlx.skin = "dhx_skyblue";
				if (idd == "form_properties") {
					return true;
				}
				else {
					form_id = self.form_properties[uid].getItemValue("form_id");
					if (form_id > 0) {
						if (idd == "form_preview") self.preview._startPreview(uid);
						return true;
					}
					else {
						dhtmlx.message({
							title: "Save form",
							type: "confirm",
							text: "You need to save the form before proceed. Do you want to save the form",
							ok: "Save",
							cancel: "Cancel",
							/**
							 * Description
							 * @method callback
							 * @param {} ok
							 * @return
							 */
							callback: function (ok) {
								if (ok) {

									self.data._save_form(uid, function () {
										if (idd == "form_preview") self.preview._startPreview(uid);
										self.tabbar_form[uid].setTabActive(idd);
									}, form_id)

								}
								else {
									self.tabbar_form[uid].setTabActive("form_properties");
								}
							}
						});
					}
				}
				return true;
			});
		}
		catch (e) {
			//console.log("tab : " + e.message);
		}

	}

	
	,
	/**
	 * Description - edit the form 
	 * @method _form_properties
	 * @param {} uid
	 * @param {} form_id
	 * @return
	 */
	_form_properties: function (uid, form_id) {
		var self = this;
		self.form_properties[uid] = self.tabbar_form[uid].cells("form_properties").attachForm(self.model.conf_form_properties.template);

		CAIRS.dhtmlx.prepareForm(uid, self.model.conf_form_properties, self.form_properties[uid]);

		//console.log( uid );

		self.form_properties[uid].setItemValue("form_agency_id", self.configuration[uid.replace(new RegExp("_" + form_id, "g"), "")].agency_id);

		if (form_id < 1) {
			self.form_properties[uid].setItemValue("form_id", -1);
		}
		else {
			self.form_properties[uid].setItemValue("form_id", form_id);
		}

		/**
		 * Description
		 * @method onkeyup
		 * @param {} event
		 * @return
		 */
		self.form_properties[uid].getInput("formlabel").onkeyup = function (event) {
			self.form_properties[uid].getInput("formname").value = self.handleFormName(uid, this.value);
		};

		//form_agency_id
	}

	,
	/**
	 * Description
	 * @method _toolbar_form
	 * @param {} uid
	 * @param {} form_id
	 * @return
	 */
	_toolbar_form: function (uid, form_id) {
		var self = this;

		self.toolbar_form[uid] = self.tabbar_form[uid].cells("form_properties").attachToolbar(self.model.conf_toolbar_form);
		self.toolbar_form[uid].setIconSize(32);
		self.toolbar_form[uid].attachEvent("onClick", function (id) {
			if (id == "save_form") {
				self.progressOnForm(uid);
				self.data._save_form(uid, function ( form_id ) {
					self.progressOnForm(uid);
					var url = '';
					var swfUrl = '';
					CAIRS.dhtmlx.formFields[uid + "_form_preview"].forEach(function (field, index, array) {
						if (field.type == "upload") {
							if( field.option_id ) // if this field is child field
							{
								swfUrl = self._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["swfUrl"];
								self._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["swfUrl"] = '';//swfUrl
								url = self._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["url"];
								self._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["url"] = '';//swfUrl
							}
							else
							{
								swfUrl = self.metaparser._getPageField(uid, field.page_id, field.field_id)["swfUrl"];
								self.metaparser._getPageField(uid, field.page_id, field.field_id)["swfUrl"] = '';
								url = self.metaparser._getPageField(uid, field.page_id, field.field_id)["url"];
								self.metaparser._getPageField(uid, field.page_id, field.field_id)["url"] = '';
							}
						}// bug stringify
					});
					
					var payload = "agency_id=" + self.configuration[self._getRawUID(uid)].agency_id + "&template=" + ( JSON.stringify( self.model.conf_form_preview ));
					self.data._generateMetaData( uid, form_id, payload );
				}, form_id);
			}
			else if (id == "generate_form")
			{
				//console.log( JSON.stringify(self.model.conf_form_preview.template) );
				self.progressOnForm(uid);
				CAIRS.MAP.API.update({
					resource: "/forms/" + form_id + "/metadata" // mandatory
					,
					format: "json" // json, yaml, xml. Default: json. Not mandatory
					,
					payload: "agency_id=" + self.configuration[self._getRawUID(uid)].agency_id + "&template=" + JSON.stringify( self.model.conf_form_preview.template ) // mandatory for PUT and POST
					,
					/**
					 * Description
					 * @method onSuccess
					 * @param {} request
					 * @return
					 */
					onSuccess: function (request) // not mandatory
					{
						var json = JSON.parse( request.response );
						dhtmlx.message({
							type: "error",
							text: json.response
						});
						

						self.progressOffForm(uid);
					},
					/**
					 * Description
					 * @method onFail
					 * @param {} request
					 * @return
					 */
					onFail: function (request) { // not mandatory
						var json = JSON.parse( request.response );
						dhtmlx.message({
							type: "error",
							text: json.response
						});
						self.progressOffForm(uid);
					}
				});
				
			}
		});
	}

	,
	/**
	 * Description
	 * @method _layout_form_layout
	 * @param {} uid
	 * @return
	 */
	_layout_form_layout: function (uid) {
		var self = this;
		self.layout_form_layout[uid] = self.tabbar_form[uid].cells("form_layout").attachLayout(self.model.conf_layout_form_layout.pattern);
		self.layout_form_layout[uid].cells("a").setWidth(660);
	}

	,
	/**
	 * Description
	 * @method _layout_form_layout_left
	 * @param {} uid
	 * @return
	 */
	_layout_form_layout_left: function (uid) {
		var self = this;
		self.layout_form_layout_left[uid] = self.layout_form_layout[uid].cells("a").attachLayout(self.model.conf_layout_form_layout_left.pattern);
		self.layout_form_layout_left[uid].cells("a").setText("Pages of the form");
		self.layout_form_layout_left[uid].cells("b").setText("Fields of the page");

		//self.layout_form_layout_left[ uid ].cells("b").collapse();

		self.layout_form_layout_left[uid].cells("b").setHeight(330);

		self.status_bar_layout_form_layout_left_a[uid] = self.layout_form_layout_left[uid].cells("a").attachStatusBar();
		self.status_bar_layout_form_layout_left_a[uid].setText("<div class='red_warning'> <img src ='" + self.model.conf_window.image_path + "warning4.png'> 1 - Select a page on the above grid first before adding fields.</div><div class='normal_warning' id='page_info_" + uid + "'></div>");

		self.status_bar_layout_form_layout_left_b[uid] = self.layout_form_layout_left[uid].cells("b").attachStatusBar();
		self.status_bar_layout_form_layout_left_b[uid].setText("<div class='red_warning'> <img src ='" + self.model.conf_window.image_path + "warning4.png'> 2 - Drop pre defined fields, library fields, group of fields, or create a custom field on the above grid.</div>");

	}

	,
	/**
	 * Description
	 * @method _layout_form_layout_right
	 * @param {} uid
	 * @return
	 */
	_layout_form_layout_right: function (uid) {
		var self = this;
		self.layout_form_layout_right[uid] = self.layout_form_layout[uid].cells("b").attachLayout(self.model.conf_layout_form_layout_right.pattern);
		self.layout_form_layout_right[uid].cells("a").setText("Library fields");
		//self.layout_form_layout_right[ uid ].cells("b").setText("Group of fields");		
	}

	,
	/**
	 * Description
	 * @method _grid_pages
	 * @param {} uid
	 * @return
	 */
	_grid_pages: function (uid) {
		var self = this;
		self.grid_pages[uid] = self.layout_form_layout_left[uid].cells("a").attachGrid(self.model.conf_grid_pages);
		self.grid_pages[uid].setHeader(self.model.conf_grid_pages.headers);
		self.grid_pages[uid].setColumnIds(self.model.conf_grid_pages.ids);
		self.grid_pages[uid].setInitWidths(self.model.conf_grid_pages.widths);
		self.grid_pages[uid].setColAlign(self.model.conf_grid_pages.colaligns);
		self.grid_pages[uid].setColTypes(self.model.conf_grid_pages.coltypes);
		self.grid_pages[uid].setColSorting(self.model.conf_grid_pages.colsorting);
		//self.grid_pages[ uid ].selMultiRows = true;
		self.grid_pages[uid].setDateFormat("%m-%d-%Y");
		self.grid_pages[uid].enableDragAndDrop(true);
		self.grid_pages[uid].enableEditEvents(false, false, false);
		self.grid_pages[uid].init();

		var layout_combo = self.grid_pages[uid].getCombo(self.grid_pages[uid].getColIndexById("page_layout"));
		layout_combo.put("S", "single");
		layout_combo.put("D", "double");

		self.grid_pages[uid].attachEvent("onXLS", function () {
			self.progressOn(uid);
		});
		self.grid_pages[uid].attachEvent("onXLE", function () {
			self.progressOff(uid);
		});

		self.grid_pages[uid].attachEvent("onRowSelect", function (id, ind) {
			try {
				self.pop_up_grid_field_propertie_options[uid].hide()
			}
			catch (e) {};
			self.layout_form_layout_left[uid].cells("b").expand();
			self.toolbar_form_pages[uid].enableItem("delete_page");
			self.toolbar_form_pages[uid].enableItem("edit_page");
			self.toolbar_form_pages[uid].enableItem("rules_manager");

			self.setPageStatusInfo(uid, "selected page: " + self.grid_pages[uid].cells(id, "0").getValue());

			self.selected_page[uid] = id;

			try {
				self.layout_field_propertie[uid].cells("b").collapse();
				/*self.toolbar_grid_field_propertie_options[ uid ].unload();
				 self.toolbar_grid_field_propertie_options[ uid ] = null;
				 
				 delete  self.toolbar_grid_field_propertie_options[ uid ];
				 
				 self.grid_field_propertie_options[ uid ].clearAll();
				 self.grid_field_propertie_options[ uid ].destructor();
				 
				 delete  self.grid_field_propertie_options[ uid ];*/

			}
			catch (e) {};

			try {
				self.tabbar_form_create_fields[uid].setTabActive("add_field");
				self.tabbar_form_create_fields[uid].hideTab("field_properties");
				self.tabbar_form_add_field[uid].setTabActive("predefined_fields");
			}
			catch (e) {};

			self.data._feedGrid_form_fields(uid, id);
		});

		/**
		 * Description
		 * @method rowToDragElement
		 * @param {} id
		 * @return text
		 */
		self.grid_pages[uid].rowToDragElement = function (id) {
			//any custom logic here
			var text = "dragging: " + self.grid_pages[uid].cells(id, 0).getValue(); // prepare a text string
			return text;
		}

		self.grid_pages[uid].attachEvent("onDrop", function (sId, tId, dId, sObj, tObj, sCol, tCol) {
			self.data._reOrderPages(uid);
			return true;
		});

		self.grid_pages[uid].attachEvent("onDrag", function (sId, tId, sObj, tObj, sInd, tInd) {

			if (typeof sObj.entBox === 'undefined')
				return false;

			if (tObj.entBox.id == sObj.entBox.id)
				return true;
			else if (tId && sObj === self.grid_form_fields[uid]) {
				if (tId == self.selected_page[uid])
					return false;

				var form_id = self.form_properties[uid].getItemValue("form_id");
				var page_id_target = tId;
				var field_id = sId;
				var field = self.metaparser._getPageField(uid, self.selected_page[uid], field_id);
				var old_list = field.list;
				var old_options = field.options;
				var allOptionsID = [];
				var thereIsList = false;

				self.layout_field_propertie[uid].cells("b").collapse();

				field.page_id = page_id_target;

				for (var position in old_list) {
					if (old_list.hasOwnProperty(position)) {
						old_list[position]["page_id"] = page_id_target;
						allOptionsID.push(old_list[position]["option_id"]);
						thereIsList = true;
					}
				}

				for (var position in old_options) {
					if (old_options.hasOwnProperty(position)) {
						old_options[position]["page_id"] = page_id_target;
						if (!thereIsList) {
							allOptionsID.push(old_options[position]["option_id"]);
						}
					}
				}

				self.data._deletePageField(uid, self.selected_page[uid], field_id, true);

				var type_MAP_standard = field["type_standard"];
				var type_DHTMLX_standard = field["type"];

				field["type_standard"] = type_DHTMLX_standard;
				field["type"] = type_MAP_standard;
				field["page_id"] = page_id_target;
				field["index"] = self.metaparser._getPageFieldsNumber(uid, page_id_target);
				field["grouping"] = field["index"];

				self.progressOnForm(uid);

				self.data._putFieldOnMemory(uid, page_id_target, field, function () {
					var field = self.metaparser._getPageField(uid, page_id_target, field_id);
					field["page_id"] = page_id_target;
					field["field_id"] = field_id;

					delete field["type"];
					delete field["type_standard"];

					self.progressOnForm(uid);

					self.data._readPagesData(uid, field, function () {
						self.metaparser._getPageField(uid, page_id_target, field_id)["type"] = type_DHTMLX_standard;

						if (!allOptionsID.length > 0) return;

						self.progressOnForm(uid);
						CAIRS.MAP.API.update({
							resource: "/forms/" + form_id + "/pages/" + page_id_target + "/fields/" + field_id + "/options/" + allOptionsID.join(),
							format: "json",
							payload: "hash=" + JSON.stringify({
								page_id: page_id_target
							}),
							/**
							 * Description
							 * @method onSuccess
							 * @param {} request
							 * @return
							 */
							onSuccess: function (request) {
								var json = JSON.parse( request.response );
								if (json.status == "success") {
									self._setStatusDataTransferForm(uid, "options(" + allOptionsID.join() + ") updated");
									self.metaparser._getPageField(uid, page_id_target, field_id)["list"] = old_list;
									self.metaparser._getPageField(uid, page_id_target, field_id)["options"] = old_options;
									self.preview._startPreview(uid);
									self.progressOffForm(uid);
								}
								else {
									dhtmlx.message({
										type: "error",
										text: "option don't updated. reason: " + json.response
									});
									self._setStatusDataTransferForm(uid, "option don't updated");
									if (json.response == "token not authorized")
										self._setStatusUserForm(uid, "token expired. Please login again", false);
									self.progressOffForm(uid);
								}
							},
							/**
							 * Description
							 * @method onFail
							 * @param {} request
							 * @return
							 */
							onFail: function (request) { // not mandatory
								var json = JSON.parse( request.response );
								dhtmlx.message({
									type: "error",
									text: json.response
								});
								self._setStatusDataTransferForm(uid, "option don't updated");
								if (json.response == "token not authorized")
									self._setStatusUserForm(uid, "token expired. Please login again", false);
								self.progressOffForm(uid);
							}
						});

						//self.grid_form_fields[ uid ].deleteRow(field_id);
						//self.data._reOrderPageFields( uid );
					});

				}, true);

				return false;
			}
			else
				return false;
		});

		self.grid_pages[uid].attachEvent("onDragIn", function (sid, tid, sgrid, tgrid) {

			if (typeof sgrid.entBox === 'undefined') {
				return false;
			}

			//console.log(sgrid.entBox.id);
			//console.log(tgrid.entBox.id);
			self.is_grid_pages[uid] = sgrid.entBox.id;
			//console.log("grid page is: " + sgrid.entBox.id);
			return true;
		});

		self.grid_pages[uid].attachEvent("onEditCell", function (stage, rId, cInd, nValue, oValue) {
			if (stage == 2) {
				if (cInd == self.grid_pages[uid].getColIndexById("pagename")) {
					self._changePageName(uid, rId, nValue);
				}
			}
			return true;
		});

		self.grid_pages[uid].attachEvent("onRowDblClicked", function (id, ind) {
			self.pop_up_form_pages[uid].show("edit_page");
		});

		self.grid_pages[uid].attachEvent("onKeyPress", function (code, cFlag, sFlag) {
			if (code == 46) {
				self.data._deletePage(uid);
			}
			return true;
		});

		self.grid_pages[uid].attachEvent("onEnter", function (id, ind) {
			self.pop_up_form_pages[uid].show("edit_page");
			return true;
		});
	}

	,
	/**
	 * Description
	 * @method _toolbar_form_pages
	 * @param {} uid
	 * @param {} form_id
	 * @return
	 */
	_toolbar_form_pages: function (uid, form_id) {
		var self = this;

		self.toolbar_form_pages[uid] = self.layout_form_layout_left[uid].cells("a").attachToolbar(self.model.conf_toolbar_form_pages);

		self.toolbar_form_pages[uid].attachEvent("onClick", function (id) {
			if (id == "delete_page") {
				self.data._deletePage(uid);
				
			}
			else if (id == "rules_manager") {
				self.rules.start( { uid : uid } );
			}
			else if (id == "undock_form_preview") {
				self.preview._startPreview(uid);
				self.layout_form_preview[uid].cells("a").undock();
			}
		});

		self._pop_up_form_pages(uid, form_id);
	}

	,
	/**
	 * Description
	 * @method _pop_up_form_pages
	 * @param {} uid
	 * @param {} form_id
	 * @return
	 */
	_pop_up_form_pages: function (uid, form_id) {
		var self = this;

		self.pop_up_form_pages[uid] = new dhtmlXPopup({
			toolbar: self.toolbar_form_pages[uid],
			id: ["add_page", "edit_page"]
		});

		self.pop_up_form_pages[uid].attachEvent("onShow", function (id) {
			//console.log(id);
			self.pop_up_form_pages[uid].clear();
			if (id == "add_page") {

				try {
					self._form_form_pages(uid, false, form_id);
				}
				catch (e) {
					//console.log(e.stack)
				};
			}
			else if (id == "edit_page") {
				try {
					self._form_form_pages(uid, true, form_id);
				}
				catch (e) {
					//console.log(e.stack)
				};
			}

		});
	}

	,
	/**
	 * Description
	 * @method _form_form_pages
	 * @param {} uid
	 * @param {} isEditing
	 * @param {} form_id
	 * @return
	 */
	_form_form_pages: function (uid, isEditing, form_id) {
		var self = this;

		isEditing = isEditing || false

		var page_id = self.grid_pages[uid].getSelectedRowId();
		self.form_form_pages[uid] = self.pop_up_form_pages[uid].attachForm(self.model.conf_form_form_pages.template);
		CAIRS.dhtmlx.prepareForm(uid, self.model.conf_form_form_pages, self.form_form_pages[uid]);

		if (isEditing) {

			var hash = {};

			self.model.conf_grid_pages.ids.split(",").forEach(function (id, index, array_) {
				hash[id] = self.grid_pages[uid].cells(page_id, index).getValue();
			});

			//console.log(hash);

			self.form_form_pages[uid].setFormData(hash);

			self.form_form_pages[uid].addItem(null, {
				type: "button",
				name: "edit",
				offsetLeft: 149,
				value: "save the page"
			}, 20);
		}
		else {
			self.form_form_pages[uid].setFormData({
				page_layout: self.configuration[uid.replace(new RegExp("_" + form_id, "g"), "")].page_layout
			});

			self.form_form_pages[uid].addItem(null, {
				type: "button",
				name: "add",
				offsetLeft: 149,
				value: "add new page"
			}, 20);
		}

		self.form_form_pages[uid].setFocusOnFirstActive();

		self.form_form_pages[uid].attachEvent("onButtonClick", function (name) {
			if (name == "add") {
				if (CAIRS.dhtmlx.validateForm(uid, self.form_form_pages[uid])) {
					var hash = self.form_form_pages[uid].getFormData();
					hash["uid"] = uid;
					hash["form_id"] = self.form_properties[uid].getItemValue("form_id");
					hash["page_id"] = null;
					self.form_form_pages[uid].lock();
					self.data._addPage(hash, function () {
						self.pop_up_form_pages[uid].hide();
						self.form_form_pages[uid].unlock();
					});
				}
			}
			else if (name == "edit") {
				//console.log(  self._getPageOnModel( uid, page_id) );
				if (CAIRS.dhtmlx.validateForm(uid, self.form_form_pages[uid])) {
					var hash = self.form_form_pages[uid].getFormData();
					hash["uid"] = uid;
					hash["page_id"] = self.grid_pages[uid].getSelectedRowId();
					self.form_form_pages[uid].lock();
					self.data._editPage(hash, function () {
						self.pop_up_form_pages[uid].hide();
						self.form_form_pages[uid].unlock();
					}, form_id);
				}
			}
		});
	}

	,
	/**
	 * Description
	 * @method _tabbar_form_fields
	 * @param {} uid
	 * @return
	 */
	_tabbar_form_fields: function (uid) {
		var self = this;

		try {
			self.tabbar_form_fields[uid] = self.layout_form_layout_left[uid].cells("b").attachTabbar();
			self.tabbar_form_fields[uid].setSkin('dhx_skyblue');
			self.tabbar_form_fields[uid].setImagePath(self.model.conf_tabbar_form.image_path); // self.application_path
			self.tabbar_form_fields[uid].enableScroll(true);
			self.tabbar_form_fields[uid].addTab("selected_fields", "Fields of the page", "200px");
			//self.tabbar_form_fields[ uid ].addTab("create_field", "Create field", "200px");

			self.tabbar_form_fields[uid].setTabActive("selected_fields");

			self.tabbar_form_fields[uid].attachEvent("onSelect", function (idd, last_id) {
				return true;
			});
		}
		catch (e) {
			//console.log("tab : " + e.message);
		}
	}

	,
	/**
	 * Description
	 * @method _toolbar_form_fields
	 * @param {} uid
	 * @return
	 */
	_toolbar_form_fields: function (uid) {
		var self = this;

		self.toolbar_form_fields[uid] = self.tabbar_form_fields[uid].cells("selected_fields").attachToolbar(self.model.conf_toolbar_form_fields);

		self.toolbar_form_fields[uid].attachEvent("onClick", function (id) {
			if (id == "delete_field") {
				dhtmlx.message({
					title: "delete data",
					type: "confirm",
					text: "Do you really want to delete the selected field?",
					ok: "delete",
					cancel: "cancel",
					/**
					 * Description
					 * @method callback
					 * @param {} ok
					 * @return
					 */
					callback: function (ok) {
						if (ok) {
							self.tabbar_form_create_fields[uid].setTabActive("add_field");
							var field_id = self.grid_form_fields[uid].getSelectedRowId();
							self.data._deletePageField(uid, self.selected_page[uid], field_id);
						}
					}
				});
			}
			else if (id == "reorder_fields") {
				var page_id = self.grid_pages[uid].getSelectedRowId();
				//self.data._feedGrid_form_fieldsNormalize(uid, page_id);
				self.data._reOrderPageFields(uid);
			}
			else if (id == "rules_manager") {
				self.rules.start( { uid : uid } );
			}
			else if (id == "restart_reorder_fields") {
				dhtmlx.message({
					title: "restart fields order",
					type: "confirm",
					text: "Do you really want to reorder all fields? It will discard the actual order!",
					ok: "restart",
					cancel: "cancel",
					/**
					 * Description
					 * @method callback
					 * @param {} ok
					 * @return
					 */
					callback: function (ok) {
						if (ok) {
							self.data._feedGrid_form_fieldsNormalize(uid, self.grid_pages[uid].getSelectedRowId());
						}
					}
				});
			}
		});
	}

	,
	/**
	 * Description
	 * @method _grid_form_fields
	 * @param {} uid
	 * @return
	 */
	_grid_form_fields: function (uid) {
		var self = this;
		self.grid_form_fields[uid] = self.tabbar_form_fields[uid].cells("selected_fields").attachGrid(self.model.conf_grid_fields);
		self.grid_form_fields[uid].setHeader(self.model.conf_grid_fields.headers);
		self.grid_form_fields[uid].setColumnIds(self.model.conf_grid_fields.ids);
		self.grid_form_fields[uid].setInitWidths(self.model.conf_grid_fields.widths);
		self.grid_form_fields[uid].setColAlign(self.model.conf_grid_fields.colaligns);
		self.grid_form_fields[uid].setColTypes(self.model.conf_grid_fields.coltypes);
		self.grid_form_fields[uid].setColSorting(self.model.conf_grid_fields.colsorting);
		self.grid_form_fields[uid].setDateFormat("%m-%d-%Y");
		self.grid_form_fields[uid].enableDragAndDrop(true);

		self.grid_form_fields[uid].attachEvent("onDrop", function (sId, tId, dId, sObj, tObj, sCol, tCol) {
			//console.log(arguments);
			//
			
			//console.log("onDrop source " + sId + " index: " + self.grid_form_fields[uid].getRowIndex(sId));
			//console.log("onDrop taget " + tId + " index: " + self.grid_form_fields[uid].getRowIndex(tId));
			
			self.data._reOrderPageFields(uid);

			
			return true;
		});
		
		
		self.grid_form_fields[uid].attachEvent("onBeforeDrag", function(id){
			//console.log( id );
			//console.log( self.grid_form_fields[uid].getSelectedRowId() );
			
			if ( self.grid_form_fields[uid].getSelectedRowId() == null) {
				dhtmlx.message({
					type: "error",
					text: "You need to select the field before dragging."
				});
				return false;
			}
			
			if ( self.grid_form_fields[uid].getSelectedRowId() != id) {
				dhtmlx.message({
					type: "error",
					text: "You need to select the field before dragging."
				});
				return false;
			}
			
			return true;
		});

		/**
		 * Description
		 * @method rowToDragElement
		 * @param {} id
		 * @return text
		 */
		self.grid_form_fields[uid].rowToDragElement = function (id) {
			//any custom logic here
			var text = "dragging: " + self.grid_form_fields[uid].cells(id, 3).getValue(); // prepare a text string
			return text;
		}

		self.grid_form_fields[uid].attachEvent("onDrag", function (sId, tId, sObj, tObj, sInd, tInd) {
			//console.log("entrei onDrag");
			//console.log(arguments);
			if (self.selected_page[uid] == null) {
				dhtmlx.message({
					type: "error",
					text: "You need to select a page before adding fields."
				});
				return false;
			}
			
			/*if ( sInd != tInd ) {
				dhtmlx.message({
					type: "error",
					text: "try again."
				});
				return false;
			}*/
			
			//console.log( self.grid_form_fields[uid].getSelectedRowId() );

			if (sObj.object && sObj.object == self.dataView_type_of_fields[uid]) {
				self._addPreDefinedFieldToPage(uid, sId);
				return false;
			}

			if (sObj.object && sObj.object == self.grid_field_propertie_options[uid]) {
				return false;
			}

			if (self.is_grid_pages[uid] == sObj.entBox.id) {
				return false;
			}
			else {
				//console.log("entrei not grid pages");
				// if not dragging from same grid
				if (sObj != tObj) {
					// if field already exist
					var alreadyExist = false;
					self.grid_form_fields[uid].forEachRow(function (rID) {
						if (rID == sId) alreadyExist = true;
						//console.log( "rID " + rID );
					});
					//console.log("alreadyExist " + alreadyExist);
					// if field already exist - stop
					if (alreadyExist) return false;

					// if is group
					if (sObj && sObj == self.grid_group_fields[uid]) {
						self.data._addGroupOfFieldsToPage(uid, sId);
						return false;
					}
					else if (sObj && sObj == self.grid_field_propertie_options[uid]) {
						return false;
					}
					else // if is library field
					{
						self._addLibraryFieldToPage(uid, sId);
						return false;
					}
				}

				else {
					//console.log( "sId "+ sId);
					//console.log( "tId "+ tId);
					//console.log("entrei I1m same grid");
					if (typeof tId === 'undefined') {
						return false;
					}
					//console.log("onDrag source " + sId + " index: " + self.grid_form_fields[uid].getRowIndex(sId));
					//console.log("onDrag taget " + tId + " index: " + self.grid_form_fields[uid].getRowIndex(tId));
					return true;
				}
			}
		});
		
		self.grid_form_fields[uid].attachEvent("onRowSelect", function (id, ind) {
			try {
				self.pop_up_grid_field_propertie_options[uid].hide()
			}
			catch (e) {};
			self._layout_field_propertie(uid);
			self._form_field_propertie(uid, id);
			self._toolbar_grid_field_propertie_options(uid);
			self._grid_field_propertie_options(uid);
			self.toolbar_form_fields[uid].enableItem("edit_field");
			self.toolbar_form_fields[uid].enableItem("delete_field");
			////self.toolbar_form_fields[uid].enableItem("rules_manager");

			self.data._feedGrid_grid_field_propertie_options(uid, self.grid_pages[uid].getSelectedRowId(), id);
			//console.log("selected " + id + " index: " + self.grid_form_fields[uid].getRowIndex(id));
		});

		self.grid_form_fields[uid].attachEvent("onEditCell", function (stage, rId, cInd, nValue, oValue) {

			self._layout_field_propertie(uid);
			self._form_field_propertie(uid, rId);
			self._toolbar_grid_field_propertie_options(uid);
			self._grid_field_propertie_options(uid);
			self.toolbar_form_fields[uid].enableItem("edit_field");
			self.toolbar_form_fields[uid].enableItem("delete_field");
			//self.toolbar_form_fields[uid].enableItem("rules_manager");

			return true;
		});

		self.grid_form_fields[uid].enableEditEvents(false, false, false);

		self.grid_form_fields[uid].init();

		var type_combo = self.grid_form_fields[uid].getCombo(self.grid_form_fields[uid].getColIndexById("type"));
		var mask_combo = self.grid_form_fields[uid].getCombo(self.grid_form_fields[uid].getColIndexById("mask_to_use"));

		self.model.conf_form_field_propertie.template.forEach(function (field, index, array) {
			if (field.name) {
				if (field.name == "mask_to_use") {
					mask_combo.put("", "na");
					field.options.forEach(function (option, index_option, array_option) {
						if (option.value != "") {
							//console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
							//console.log(option.value);
							//console.log(option.text);
							mask_combo.put(option.value, option.text);
						}
					});
				}
				else if (field.name == "type") {
					field.options.forEach(function (option, index_option, array_option) {
						if (option.value != "") {
							type_combo.put(option.value, option.text);
						}
					});
				}
			}
		});

		//console.log( mask_combo );

		var is_library_combo = self.grid_form_fields[uid].getCombo(self.grid_form_fields[uid].getColIndexById("use_library"));
		is_library_combo.put("1", "yes");
		is_library_combo.put("0", "no");

		var required_combo = self.grid_form_fields[uid].getCombo(self.grid_form_fields[uid].getColIndexById("required"));
		required_combo.put("1", "yes");
		required_combo.put("0", "no");

		self.grid_form_fields[uid].attachEvent("onXLS", function () {
			self.progressOn(uid);
		});
		self.grid_form_fields[uid].attachEvent("onXLE", function () {
			self.progressOff(uid);
		});
	}

	,
	/**
	 * Description
	 * @method _tabbar_form_create_fields
	 * @param {} uid
	 * @return
	 */
	_tabbar_form_create_fields: function (uid) {
		var self = this;

		try {
			self.tabbar_form_create_fields[uid] = self.layout_form_layout_right[uid].cells("a").attachTabbar();
			self.tabbar_form_create_fields[uid].setSkin('dhx_skyblue');
			self.tabbar_form_create_fields[uid].setImagePath(self.model.conf_tabbar_form.image_path); // self.application_path
			self.tabbar_form_create_fields[uid].enableScroll(true);
			self.tabbar_form_create_fields[uid].addTab("field_properties", "Field properties", "200px");
			self.tabbar_form_create_fields[uid].addTab("add_field", "Create new field", "200px");

			self.tabbar_form_create_fields[uid].addTab("library_fields", "Library fields", "200px");
			//self.tabbar_form_fields[ uid ].addTab("create_field", "Create field", "200px");

			self.tabbar_form_create_fields[uid].setTabActive("add_field");
			self.tabbar_form_create_fields[uid].hideTab("field_properties");

			self.tabbar_form_create_fields[uid].attachEvent("onSelect", function (idd, last_id) {

				return true;
			});

		}
		catch (e) {
			//console.log("tab : " + e.message);
		}
	}

	,
	/**
	 * Description
	 * @method _tabbar_form_add_field
	 * @param {} uid
	 * @return
	 */
	_tabbar_form_add_field: function (uid) {
		var self = this;

		try {
			self.tabbar_form_add_field[uid] = self.tabbar_form_create_fields[uid].cells("add_field").attachTabbar();
			self.tabbar_form_add_field[uid].setSkin('dhx_skyblue');
			self.tabbar_form_add_field[uid].setImagePath(self.model.conf_tabbar_form.image_path); // self.application_path
			self.tabbar_form_add_field[uid].enableScroll(true);
			self.tabbar_form_add_field[uid].addTab("predefined_fields", "predefined fields", "150px");
			self.tabbar_form_add_field[uid].addTab("custom_field", "custom field", "150px");

			//self.tabbar_form_fields[ uid ].addTab("create_field", "Create field", "200px");

			self.tabbar_form_add_field[uid].setTabActive("predefined_fields");

			self.tabbar_form_add_field[uid].attachEvent("onSelect", function (idd, last_id) {
				return true;
			});

		}
		catch (e) {
			//console.log("tab : " + e.message);
		}
	}

	,
	/**
	 * Description
	 * @method _dataView_type_of_fields
	 * @param {} uid
	 * @return
	 */
	_dataView_type_of_fields: function (uid) {
		var self = this;
		self.dataView_type_of_fields[uid] = self.tabbar_form_add_field[uid].cells("predefined_fields").attachDataView(self.model.conf_dataView_pre_defined_fields.settings);
		self.dataView_type_of_fields[uid].parse(self.model.conf_dataView_pre_defined_fields.data, "json");
		
		self.dataView_type_of_fields[uid].attachEvent("onItemDblClick", function (id, ev, html){
		  	self._addPreDefinedFieldToPage(uid, id);
		   	return true;
	  	});

		self.status_bar_dataView_type_of_fields[uid] = self.tabbar_form_add_field[uid].cells("predefined_fields").attachStatusBar();
		self.status_bar_dataView_type_of_fields[uid].setText("<div class='red_warning'> <img src ='" + self.model.conf_window.image_path + "warning4.png'> Click on a item and drag to the <b>'Fields of the page'</b> grid .</div>");
	}

	,
	/**
	 * Description
	 * @method _form_custom_field
	 * @param {} uid
	 * @return
	 */
	_form_custom_field: function (uid) {
		var self = this
		self.form_custom_field[uid] = self.tabbar_form_add_field[uid].cells("custom_field").attachForm(self.model.conf_form_custom_field.template);

		self.form_custom_field[uid].hideItem("price_aux");

		CAIRS.dhtmlx.prepareForm(uid + "_form_custom_field", self.model.conf_form_custom_field, self.form_custom_field[uid]);

		var field_id = (new Date()).getTime();
		self.form_custom_field[uid].setItemValue("field_id", field_id);

		/**
		 * Description
		 * @method onkeyup
		 * @param {} event
		 * @return
		 */
		self.form_custom_field[uid].getInput("label").onkeyup = function (event) {
			self.form_custom_field[uid].getInput("name").value = self.handleInputName(uid, this.value);
			self.form_custom_field[uid].getInput("caption").value = this.value;
		};

		self.status_bar_form_custom_field[uid] = self.tabbar_form_add_field[uid].cells("custom_field").attachStatusBar();
		self.status_bar_form_custom_field[uid].setText("<div class='red_warning'> <img src ='" + self.model.conf_window.image_path + "warning4.png'> Select a page on 'Pages of the form' grid before saving this form for adding a custom field.</div>");

		self.form_custom_field[uid].attachEvent("onChange", function (id, value) {
			if (id == "type") {
				self.form_custom_field[uid].setItemValue("type_standard", value);
				if (value == "I") {
					self.form_custom_field[uid].showItem("price_aux");
					self.form_custom_field[uid].setFormData({
						mask_to_use: "currency"
					});
				}
				else {
					self.form_custom_field[uid].hideItem("price_aux");
					self.form_custom_field[uid].setFormData({
						mask_to_use: ""
					});
				}
			}
		});
	}

	,
	/**
	 * Description
	 * @method _toolbar_custom_field
	 * @param {} uid
	 * @return
	 */
	_toolbar_custom_field: function (uid) {
		var self = this;
		self.toolbar_custom_field[uid] = self.tabbar_form_add_field[uid].cells("custom_field").attachToolbar(self.model.conf_toolbar_field_propertie);
		self.toolbar_custom_field[uid].setIconSize(32);
		self.toolbar_custom_field[uid].attachEvent("onClick", function (id) {
			if (id == "save_field") {
				if (CAIRS.dhtmlx.validateForm(uid + "_form_custom_field", self.form_custom_field[uid])) {
					self.toolbar_custom_field[uid].disableItem("save_field");

					var hash = self.form_custom_field[uid].getFormData();

					//console.log( hash );

					self._addCustomFieldToPage(uid, hash, function () {
						// add a new ID for inserting a new item
						var field_id = (new Date()).getTime();
						self.form_custom_field[uid].setItemValue("field_id", field_id);
						self.form_custom_field[uid].setItemValue("name", "");
						self.form_custom_field[uid].setItemValue("label", "");
						self.toolbar_custom_field[uid].enableItem("save_field");
					});
				}
			}
		});
	}

	,
	statusbar_field_propertie: [],
	/**
	 * Description
	 * @method _layout_field_propertie
	 * @param {} uid
	 * @return
	 */
	_layout_field_propertie: function (uid) {
		var self = this

		self.layout_field_propertie[uid] = self.tabbar_form_create_fields[uid].cells("field_properties").attachLayout("2E");
		self.layout_field_propertie[uid].cells("a").hideHeader();
		self.layout_field_propertie[uid].cells("b").setText("options of the field");
		self.layout_field_propertie[uid].cells("b").setHeight(180);
		self.layout_field_propertie[uid].cells("b").collapse();
		//self.layout_form_layout_right[ uid ].cells("b").setText("Group of fields");
		self.statusbar_field_propertie[uid] = self.layout_field_propertie[uid].attachStatusBar();
		self.statusbar_field_propertie[uid].setText("");
	}

	,
	/**
	 * Description
	 * @method _form_field_propertie
	 * @param {} uid
	 * @param {} field_id
	 * @return
	 */
	_form_field_propertie: function (uid, field_id) {
		var self = this;
		
		self.progressOnForm(uid);
		
		self.form_field_propertie[uid] = self.layout_field_propertie[uid].cells("a").attachForm(self.model.conf_form_field_propertie.template);

		self.form_field_propertie[uid].hideItem("price_aux");

		self.tabbar_form_create_fields[uid].showTab("field_properties");
		self.form_field_propertie[uid].setItemValue("field_id", field_id);

		var hash = {};

		self.model.conf_grid_fields.ids.split(",").forEach(function (id, index, array) {
			var colIndex = self.grid_form_fields[uid].getColIndexById(id);
			
			//console.log( id );
			//console.log( colIndex );
			//console.log( self.grid_form_fields[uid].cells(field_id, colIndex).getValue() );
			//console.log( "----------------------" );

			if (id.toLowerCase() == 'name') {
				hash[id] = self.grid_form_fields[uid].cells(field_id, colIndex).getValue().toString().split("_" + field_id)[0];
			}
			else {
				hash[id] = self.grid_form_fields[uid].cells(field_id, colIndex).getValue();
			}
		});

		var type_MAP_standard = hash["type_standard"];
		//var type_DHTMLX_standard = hash[ "type" ];
		hash["type_standard"] = hash["type"];

		//console.log(hash);

		self.form_field_propertie[uid].setFormData(hash);

		if (self.grid_form_fields[uid].cells(field_id, self.grid_form_fields[uid].getColIndexById("required")).getValue() == 0)
			self.form_field_propertie[uid].uncheckItem("required"); // for other items
		else
			self.form_field_propertie[uid].checkItem("required"); // for other items

		
		/*if (self.grid_form_fields[uid].cells(field_id, self.grid_form_fields[uid].getColIndexById("use_library")).getValue() == 0)
			self.form_field_propertie[uid].uncheckItem("use_library"); // for other items
		else
			self.form_field_propertie[uid].checkItem("use_library"); // for other items
		*/
		
		if (self.grid_form_fields[uid].cells(field_id, self.grid_form_fields[uid].getColIndexById("use_library")).getValue() == 0)
			self.form_field_propertie[uid].setItemValue("use_library", "0"); // for other items
		else
			self.form_field_propertie[uid].setItemValue("use_library", "1"); // for other items

		//console.log( self.grid_form_fields[ uid ].cells(field_id, self.grid_form_fields[ uid ].getColIndexById( "use_library" ) ).getValue() );

		var rules = self.grid_form_fields[uid].cells(field_id, self.grid_form_fields[uid].getColIndexById("validate")).getValue();
		rules = rules.substring(0, rules.length - 3)
		rules.split("-,-").forEach(function (rule, index, array) {
			self.form_field_propertie[uid].checkItem(rule);
		});

		CAIRS.dhtmlx.prepareForm(uid + "_form_field_propertie", self.model.conf_form_field_propertie, self.form_field_propertie[uid]);
		
		if (self.grid_form_fields[uid].cells(field_id, self.grid_form_fields[uid].getColIndexById("use_library")).getValue() == 0)
		{
			self.toolbar_field_propertie[uid].enableItem("save_field");
			self.form_field_propertie[uid].unlock(); // for other items
		}
		else
		{
			self.toolbar_field_propertie[uid].disableItem("save_field");
			self.form_field_propertie[uid].lock(); // for other items
		}
		
		var label_html_editor = self.form_field_propertie[uid].getContainer("label_html_editor");
		
		self.form_field_propertie[uid].attachEvent("onChange", function (id, value)
		{
			console.log( id );
			if (id == "type")
			{
				if (value == "Z" || value == "W" || value == "r" || value == "q" || value == "M" || value == "RG" || value == "D") {
					self.layout_field_propertie[uid].cells("b").expand();
				}
				else {
					self.layout_field_propertie[uid].cells("b").collapse();
				}

				if (value == "I") {
					label_html_editor.style.display = "none";
					CAIRS.editor.destroy('form_field_propertie_' + uid);
					self.form_field_propertie[uid].showItem("price_aux");
					self.form_field_propertie[uid].setFormData({
						mask_to_use: "currency"
					});
					
				}
				else if (value == "L") {
					console.log("editorrrrrrr");
					label_html_editor.style.display = "block";
					CAIRS.editor.render({
						uid : 'form_field_propertie_' + uid
						,dhtmlxContainer : label_html_editor
						,width : 600
						,height : 370
						,onSave : function(  ){
							 self.form_field_propertie[uid].setItemValue("label", CAIRS.editor.get('form_field_propertie_' + uid));
						}
						,onChange : function(ed, l) {
							 self.form_field_propertie[uid].setItemValue("label", ed.getContent());
						}
					});
					CAIRS.editor.set({
						uid : 'form_field_propertie_' + uid
						,content : self.form_field_propertie[uid].getItemValue("label")
					});
					
					self.form_field_propertie[uid].hideItem("price_aux");
					self.form_field_propertie[uid].setFormData({
						mask_to_use: ""
					});
				}
				else {
					label_html_editor.style.display = "none";
					self.form_field_propertie[uid].hideItem("price_aux");
					self.form_field_propertie[uid].setFormData({
						mask_to_use: ""
					});
					CAIRS.editor.destroy('form_field_propertie_' + uid);
				}
				self.form_field_propertie[uid].setItemValue("type_standard", value);
			}
			else if (id == "label") {
				CAIRS.editor.set({
					uid : 'form_field_propertie_' + uid
					,content : value
				});
			}
		});

		/**
		 * Description
		 * @method onkeyup
		 * @param {} event
		 * @return
		 */
		self.form_field_propertie[uid].getInput("label").onkeyup = function (event) {
			self.form_field_propertie[uid].getInput("name").value = self.handleInputName(uid, this.value);
			self.form_field_propertie[uid].getInput("caption").value = this.value;
		};

		var initialtype = self.form_field_propertie[uid].getItemValue("type");
		//console.log("---------------------------------");
		//console.log( initialtype );
		if (initialtype == "M" || initialtype == "D" || initialtype == "S" || initialtype == "W" || initialtype == "r" || initialtype == "q" || initialtype == "Z") {
			self.layout_field_propertie[uid].cells("b").expand();
		}
		else {
			self.layout_field_propertie[uid].cells("b").collapse();
		}

		if (initialtype == "I") {
			label_html_editor.style.display = "none";
					CAIRS.editor.destroy('form_field_propertie_' + uid);
			self.form_field_propertie[uid].showItem("price_aux");
			self.form_field_propertie[uid].setFormData({
				mask_to_use: "currency"
			});
		}
		else if (initialtype == "L") {
					label_html_editor.style.display = "block";
					CAIRS.editor.render({
						uid : 'form_field_propertie_' + uid
						,dhtmlxContainer : label_html_editor
						,width : 600
						,height : 370
						,onSave : function(  ){
							 //console.log( "save function" );
							 //console.log( CAIRS.editor.get('form_field_propertie_' + uid) );
							 self.form_field_propertie[uid].setItemValue("label", CAIRS.editor.get('form_field_propertie_' + uid));
						}
						,onChange : function(ed, l) {
							 //console.log( "onchange" );
							 //console.log( ed.getContent() );
							 self.form_field_propertie[uid].setItemValue("label", ed.getContent());
						}
					});
					CAIRS.editor.set({
						uid : 'form_field_propertie_' + uid
						,content : self.form_field_propertie[uid].getItemValue("label")
					});
					
					self.form_field_propertie[uid].hideItem("price_aux");
					/*self.form_field_propertie[uid].setFormData({
						mask_to_use: ""
					});*/
		}
		else {
			label_html_editor.style.display = "none";
			CAIRS.editor.destroy('form_field_propertie_' + uid);
			self.form_field_propertie[uid].hideItem("price_aux");
			/*self.form_field_propertie[uid].setFormData({
				mask_to_use: ""
			});*/
		}
		//console.log(self.form_field_propertie[ uid ].getFormData());

		self.tabbar_form_create_fields[uid].setTabActive("field_properties");
		
		self.progressOffForm(uid);
	}

	,
	/**
	 * Description
	 * @method _toolbar_field_propertie
	 * @param {} uid
	 * @return
	 */
	_toolbar_field_propertie: function (uid) {
		var self = this;

		self.toolbar_field_propertie[uid] = self.tabbar_form_create_fields[uid].cells("field_properties").attachToolbar(self.model.conf_toolbar_field_propertie);
		self.toolbar_field_propertie[uid].setIconSize(32);
		self.toolbar_field_propertie[uid].attachEvent("onClick", function (id) {
			if (id == "save_field") {
				if (CAIRS.dhtmlx.validateForm(uid + "_form_field_propertie", self.form_field_propertie[uid])) {
					self.toolbar_field_propertie[uid].disableItem("save_field");

					var hash = self.form_field_propertie[uid].getFormData();
					
					console.log( hash );

					//console.log( hash );
					
					self.data._editFieldOfAPage(uid, hash, function () {
						self.toolbar_field_propertie[uid].enableItem("save_field");
					});

					/*self.data._readPagesData(uid, hash, function () {
						self.toolbar_field_propertie[uid].enableItem("save_field");
					});*/

				}

			}
		});
	}

	,
	/**
	 * Description
	 * @method _toolbar_grid_field_propertie_options
	 * @param {} uid
	 * @return
	 */
	_toolbar_grid_field_propertie_options: function (uid) {
		var self = this;

		self.toolbar_grid_field_propertie_options[uid] = self.layout_field_propertie[uid].cells("b").attachToolbar(self.model.conf_toolbar_grid_field_propertie_options);

		self.toolbar_grid_field_propertie_options[uid].attachEvent("onClick", function (id) {
			if (id == "delete") {
				dhtmlx.message({
					title: "delete data",
					type: "confirm",
					text: "Do you really want to delete the selected option/child field?",
					ok: "delete",
					cancel: "cancel",
					/**
					 * Description
					 * @method callback
					 * @param {} ok
					 * @return
					 */
					callback: function (ok) {
						if (ok) {
							self.data._deleteFieldOption(uid, self.selected_page[uid], self.grid_form_fields[uid].getSelectedRowId(), self.grid_field_propertie_options[uid].getSelectedRowId());
						}
					}
				});
				
			}
		});

		self._pop_up_grid_field_propertie_options(uid);

	}

	,
	/**
	 * Description
	 * @method _form_grid_field_propertie_options
	 * @param {} uid
	 * @param {} isEditing
	 * @return
	 */
	_form_grid_field_propertie_options: function (uid, isEditing) {
		var self = this,
			isEditing = isEditing || false;

		var field_id = self.grid_form_fields[uid].getSelectedRowId();
		var fieldType = self.grid_form_fields[uid].cells(field_id, self.grid_form_fields[uid].getColIndexById("type")).getValue();
		var type = "";

		//console.log( fieldType );

		if (fieldType == "M" || fieldType == "D" || fieldType == "S") {
			self.form_grid_field_propertie_options[uid] = self.pop_up_grid_field_propertie_options[uid].attachForm(self.model.conf_form_grid_field_propertie_options_option.template);
			CAIRS.dhtmlx.prepareForm(uid, self.model.conf_form_grid_field_propertie_options_option, self.form_grid_field_propertie_options[uid]);
			type = "";

		}
		else if (fieldType == "r") {
			//console.log( self.model.conf_form_grid_field_propertie_options_field.template );
			self.form_grid_field_propertie_options[uid] = self.pop_up_grid_field_propertie_options[uid].attachForm(self.model.conf_form_grid_field_propertie_options_radio_group.template);
			CAIRS.dhtmlx.prepareForm(uid, self.model.conf_form_grid_field_propertie_options_radio_group, self.form_grid_field_propertie_options[uid]);
			type = fieldType;

		}
		else if (fieldType == "q") {
			//console.log( self.model.conf_form_grid_field_propertie_options_field.template );
			self.form_grid_field_propertie_options[uid] = self.pop_up_grid_field_propertie_options[uid].attachForm(self.model.conf_form_grid_field_propertie_options_checkbox_group.template);
			CAIRS.dhtmlx.prepareForm(uid, self.model.conf_form_grid_field_propertie_options_checkbox_group, self.form_grid_field_propertie_options[uid]);
			type = fieldType;

		}
		else {
			//console.log( self.model.conf_form_grid_field_propertie_options_field.template );
			self.form_grid_field_propertie_options[uid] = self.pop_up_grid_field_propertie_options[uid].attachForm(self.model.conf_form_grid_field_propertie_options_field.template);
			CAIRS.dhtmlx.prepareForm(uid, self.model.conf_form_grid_field_propertie_options_field, self.form_grid_field_propertie_options[uid]);
			type = fieldType;
		}

		if (isEditing) {
			var option_id = self.grid_field_propertie_options[uid].getSelectedRowId();
			var hash = {};

			//console.log( "option_id " + option_id );

			var field = self.metaparser._getPageField(uid, self.selected_page[uid], field_id);
			//console.log( field );

			if (field.type == "label" || field.type == "fieldset" || field.type == "radio" || field.type == "checkbox") { // lets read the list property

				field.list.forEach(function (option, index, array) {
					if (option.option_id == option_id) {
						for (var property in option) {
							if (option.hasOwnProperty(property)) {
								//console.log( property );
								if (property == "type") {
									hash["type"] = self._convertDhtmlxTypeToLibraryFieldType(option[property]);
								}
								else {
									hash[property] = option[property];
								}
								//_convertDhtmlxTypeToLibraryFieldType
							}
						}
					}
				});
			}
			else if (field.type == "multiselect" || field.type == "combo" || field.type == "select") { // lets read the list property

				field.options.forEach(function (option, index, array) {
					if (option.option_id == option_id) {
						for (var property in option) {
							if (option.hasOwnProperty(property)) {
								//console.log( property );
								if (property == "type") {
									hash["type"] = self._convertDhtmlxTypeToLibraryFieldType(option[property]);
								}
								else {
									hash[property] = option[property];
								}
								//_convertDhtmlxTypeToLibraryFieldType
							}
						}
					}
				});
			}

			hash["option_id"] = option_id;

			self.form_grid_field_propertie_options[uid].setFormData(hash);

			if (hash["asdefault"] == 0 || hash["asdefault"] == "0" || hash["asdefault"] == "N" || hash["asdefault"] == false)
				self.form_grid_field_propertie_options[uid].uncheckItem("asdefault"); // for other items
			else
				self.form_grid_field_propertie_options[uid].checkItem("asdefault"); // for other items

			self.form_grid_field_propertie_options[uid].addItem("save_fields", {
				type: "button",
				name: "edit",
				offsetLeft: 150,
				offsetTop: 20,
				value: "save the option"
			}, 5);
		}
		else {

			self.form_grid_field_propertie_options[uid].addItem("save_fields", {
				type: "button",
				name: "add",
				offsetLeft: 150,
				offsetTop: 20,
				value: "add new option"
			}, 5);
		}

		self.form_grid_field_propertie_options[uid].setFocusOnFirstActive();

		self.form_grid_field_propertie_options[uid].attachEvent("onButtonClick", function (name) {
			if (name == "add") {
				if (CAIRS.dhtmlx.validateForm(uid, self.form_grid_field_propertie_options[uid])) {
					var hash = self.form_grid_field_propertie_options[uid].getFormData();
					self.form_grid_field_propertie_options[uid].lock();
					hash["option_id"] = null;
					self._addOptionToField(uid, hash, function () {
						self.pop_up_grid_field_propertie_options[uid].hide();
						self.form_grid_field_propertie_options[uid].unlock();
					});
				}
			}
			else if (name == "edit") {
				if (CAIRS.dhtmlx.validateForm(uid, self.form_grid_field_propertie_options[uid])) {
					var hash = self.form_grid_field_propertie_options[uid].getFormData();
					self.form_grid_field_propertie_options[uid].lock();
					//console.log(hash);
					self.data._editOptionOfAField(uid, hash, function () {
						self.pop_up_grid_field_propertie_options[uid].hide();
						self.form_grid_field_propertie_options[uid].unlock();
					});
				}
			}

		});

		self.form_grid_field_propertie_options[uid].attachEvent("onChange", function (id, value) {
			if (id == "type") {
				self.form_grid_field_propertie_options[uid].setItemValue("type_standard", value);
			}
		});

		if (fieldType == "M" || fieldType == "D" || fieldType == "S") {
			/*self.form_grid_field_propertie_options[ uid ].getInput("text").onkeyup = function(event)
			{
				self.form_grid_field_propertie_options[ uid ].getInput("name").value = self.handleInputName( uid, this.value, true );
				self.form_grid_field_propertie_options[ uid ].getInput("label").value = this.value;
			};*/
			self.form_grid_field_propertie_options[uid].setFormData({
				type: "",
				field_id: field_id
			});
		}
		else {
			/**
			 * Description
			 * @method onkeyup
			 * @param {} event
			 * @return
			 */
			self.form_grid_field_propertie_options[uid].getInput("label").onkeyup = function (event) {
				self.form_grid_field_propertie_options[uid].getInput("name").value = self.handleInputName(uid, this.value, true);
				self.form_grid_field_propertie_options[uid].getInput("caption").value = this.value;
			};
			self.form_grid_field_propertie_options[uid].setFormData({
				type: "T",
				type_standard: "T",
				field_id: field_id
			});
		}

	}

	,
	/**
	 * Description
	 * @method _pop_up_grid_field_propertie_options
	 * @param {} uid
	 * @return
	 */
	_pop_up_grid_field_propertie_options: function (uid) {
		var self = this;

		self.pop_up_grid_field_propertie_options[uid] = new dhtmlXPopup({
			toolbar: self.toolbar_grid_field_propertie_options[uid],
			id: ["add", "edit"]
		});

		self.pop_up_grid_field_propertie_options[uid].attachEvent("onShow", function (id) {
			//console.log(id);
			self.pop_up_grid_field_propertie_options[uid].clear();
			if (id == "add") {
				self._form_grid_field_propertie_options(uid);
			}
			else if (id == "edit") {
				self._form_grid_field_propertie_options(uid, true);
			}
		});
	}

	,
	/**
	 * Description
	 * @method _grid_field_propertie_options
	 * @param {} uid
	 * @return
	 */
	_grid_field_propertie_options: function (uid) {
		var self = this;
		var field_type = self.grid_form_fields[uid].cells(self.grid_form_fields[uid].getSelectedRowId(), self.grid_form_fields[uid].getColIndexById("type")).getValue();

		if (typeof self.grid_field_propertie_options[uid] !== 'undefined') {
			//return;
		}

		self.grid_field_propertie_options[uid] = self.layout_field_propertie[uid].cells("b").attachGrid(self.model.conf_grid_field_propertie_options);
		self.grid_field_propertie_options[uid].setHeader(self.model.conf_grid_field_propertie_options.headers);
		self.grid_field_propertie_options[uid].setColumnIds(self.model.conf_grid_field_propertie_options.ids);
		if (field_type == "M" || field_type == "D" || field_type == "S") {
			self.layout_field_propertie[uid].cells("b").setText("options of the field. Field type: " + self._convertLibraryFieldTypetoDhtmlxType(field_type));
			self.model.conf_grid_field_propertie_options.widths = "0,0,0,0,0,200,80,0,0,0,0,0,50";
		}
		else {
			self.layout_field_propertie[uid].cells("b").setText("child fields. Field type: " + self._convertLibraryFieldTypetoDhtmlxType(field_type));
			self.model.conf_grid_field_propertie_options.widths = "80,0,0,150,80,0,80,0,0,0,0,60,50";
		}
		self.grid_field_propertie_options[uid].setInitWidths(self.model.conf_grid_field_propertie_options.widths);
		self.grid_field_propertie_options[uid].setColAlign(self.model.conf_grid_field_propertie_options.colaligns);
		self.grid_field_propertie_options[uid].setColTypes(self.model.conf_grid_field_propertie_options.coltypes);
		self.grid_field_propertie_options[uid].setColSorting(self.model.conf_grid_field_propertie_options.colsorting);
		// self.grid[ uid ].selMultiRows = true;
		self.grid_field_propertie_options[uid].setDateFormat(self.model.conf_grid_field_propertie_options.dateFormat);

		self.grid_field_propertie_options[uid].enableDragAndDrop(true);

		self.grid_field_propertie_options[uid].enableEditEvents(false, false, false);

		self.grid_field_propertie_options[uid].init();

		var default_selected_combo = self.grid_field_propertie_options[uid].getCombo(self.grid_field_propertie_options[uid].getColIndexById("asdefault"));
		default_selected_combo.put("N", "no");
		default_selected_combo.put("Y", "yes");

		var type_combo = self.grid_field_propertie_options[uid].getCombo(self.grid_field_propertie_options[uid].getColIndexById("type"));
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

		type_combo.put("Y", "Agency signature field");
		type_combo.put("X", "Caseworker signature field");
		type_combo.put("U", "Client 1 signature field");
		type_combo.put("V", "Client 2 signature field");
		
		type_combo.put("PhB", "Phone book");
		type_combo.put("BG", "Background");
		type_combo.put("EC", "Email");
		type_combo.put("AddB", "Address book");

		//console.log( type_combo );

		self.grid_field_propertie_options[uid].attachEvent("onXLS", function () {
			//self.progressOn( uid );
		});
		self.grid_field_propertie_options[uid].attachEvent("onXLE", function () {
			//self.progressOff( uid );
		});

		self.grid_field_propertie_options[uid].attachEvent("onDrop", function (sId, tId, dId, sObj, tObj, sCol, tCol) {
			if (sObj == tObj) {
				//console.log("final index of initial selected: " + self.grid_field_propertie_options[ uid ].getRowIndex( sId ));
				//console.log("final index of target row " + self.grid_field_propertie_options[ uid ].getRowIndex( tId ) );

				self.data._reOrderFieldOptions(uid);
				return true;
			}
			else {
				return false;
			}
		});

		/**
		 * Description
		 * @method rowToDragElement
		 * @param {} id
		 * @return text
		 */
		self.grid_field_propertie_options[uid].rowToDragElement = function (id) {
			//any custom logic here
			var text = "dragging: " + self.grid_field_propertie_options[uid].cells(id, 3).getValue(); // prepare a text string
			return text;
		}
		
		
		/*self.grid_field_propertie_options[uid].attachEvent("onDrag", function (sId, tId, sObj, tObj, sInd, tInd) {
			//console.log("entrei onDrag");
			if (self.selected_page[uid] == null) {
				dhtmlx.message({
					type: "error",
					text: "You need to select a page before adding options."
				});
				return false;
			}

			if (sObj.object && sObj.object == self.dataView_type_of_fields[uid]) {
				self._addPreDefinedFieldToPage(uid, sId);
				return false;
			}

			if (sObj.object && sObj.object == self.grid_field_propertie_options[uid]) {
				return false;
			}

			if (self.is_grid_pages[uid] == sObj.entBox.id) {
				return false;
			}
			else {
				//console.log("entrei not grid pages");
				// if not dragging from same grid
				if (sObj != tObj) {
					// if field already exist
					var alreadyExist = false;
					self.grid_form_fields[uid].forEachRow(function (rID) {
						if (rID == sId) alreadyExist = true;
						//console.log( "rID " + rID );
					});
					//console.log("alreadyExist " + alreadyExist);
					// if field already exist - stop
					if (alreadyExist) return false;

					// if is group
					if (sObj && sObj == self.grid_group_fields[uid]) {
						self.data._addGroupOfFieldsToPage(uid, sId);
						return false;
					}
					else if (sObj && sObj == self.grid_field_propertie_options[uid]) {
						return false;
					}
					else // if is library field
					{
						self._addLibraryFieldToPage(uid, sId);
						return false;
					}
				}

				else {
					//console.log( "sId "+ sId);
					//console.log( "tId "+ tId);
					//console.log("entrei I1m same grid");
					if (typeof tId === 'undefined') {
						return false;
					}
					return true;
				}
			}
		});*/

		self.grid_field_propertie_options[uid].attachEvent("onDrag", function (sId, tId, sObj, tObj, sInd, tInd)
		{
			// if draggin on same grid
			if (sObj == tObj) {
				//console.log("came from in");
				if (typeof tId === 'undefined') {
					//console.log("onDrag " + ( sObj == tObj ));
					return false;
				}
				return true;
			}// if NOT draggin on same grid
			else {
				//console.log("came from out");
				if (sObj.object && sObj.object == self.dataView_type_of_fields[uid]) {
					return false;
				}
	
				if (sObj.object && sObj.object == self.grid_form_fields[uid]) {
					return false;
				}
				
				if (self.is_grid_pages[uid] == sObj.entBox.id) {
					return false;
				}
				
				
				if (sObj != tObj) 
				{
					//console.log("source not equal target");
					// if field already exist
					var alreadyExist = false;
					self.grid_field_propertie_options[uid].forEachRow(function (rID) {
						if (rID == sId) alreadyExist = true;
						//console.log( "rID " + rID );
					});
					//console.log("alreadyExist " + alreadyExist);
					// if field already exist - stop
					if (alreadyExist) return false;
						// if is group
					if (sObj && sObj == self.grid_group_fields[uid]) {
						//self.data._addGroupOfFieldsToPage(uid, sId);
						return false;
					}
					else if (sObj && sObj == self.grid_form_fields[uid]) {
						return false;
					}
					else // if is library field
					{
						//self._addLibraryFieldToPage(uid, sId);
						return false;
					}
				}
				else
				{
					//console.log( "sId "+ sId);
					//console.log( "tId "+ tId);
					//console.log("entrei I1m same grid");
					if (typeof tId === 'undefined') {
						return false;
					}
					return true;
				}
			}
		});

		self.grid_field_propertie_options[uid].attachEvent("onDragIn", function (sid, tid, sgrid, tgrid) {
			self.is_grid_pages[uid] = "";
			return true;
		});

		self.grid_field_propertie_options[uid].attachEvent("onRowSelect", function (id, ind) {
			self.toolbar_grid_field_propertie_options[uid].enableItem("edit");
			self.toolbar_grid_field_propertie_options[uid].enableItem("delete");
			try {
				self.pop_up_grid_field_propertie_options[uid].hide()
			}
			catch (e) {};
			//self.pop_up_grid_field_propertie_options[ uid ].show("edit");
		});

		self.grid_field_propertie_options[uid].attachEvent("onRowDblClicked", function (id, ind) {
			//self.pop_up_grid_field_propertie_options[ uid ].show("edit");
			return true;
		});

		self.grid_field_propertie_options[uid].attachEvent("onCheck", function (id, ind, state) {
			return false;
		});

		//self.grid_field_propertie_options[ uid ].attachEvent("onEditCell", function(stage,rId,cInd,nValue,oValue)
		//{
		//	return false;	
		//});

	}

	,
	/**
	 * Description
	 * @method _tabbar_form_library_fields
	 * @param {} uid
	 * @param {} form_id
	 * @return
	 */
	_tabbar_form_library_fields: function (uid, form_id) {
		var self = this;

		try {
			self.tabbar_form_library_fields[uid] = self.tabbar_form_create_fields[uid].cells("library_fields").attachTabbar();
			self.tabbar_form_library_fields[uid].setSkin('dhx_skyblue');
			self.tabbar_form_library_fields[uid].setImagePath(self.model.conf_tabbar_form.image_path); // self.application_path
			self.tabbar_form_library_fields[uid].enableScroll(true);

			self.tabbar_form_library_fields[uid].addTab("group_fields", "group of fields", "150px");
			self.tabbar_form_library_fields[uid].addTab("search_fields", "search by category", "150px");
			self.tabbar_form_library_fields[uid].addTab("search_fields_tags", "search by field tag", "150px");
			self.tabbar_form_library_fields[uid].addTab("list_fields", "listing fields", "150x");

			self.tabbar_form_library_fields[uid].setTabActive("list_fields");

			self.tabbar_form_library_fields[uid].attachEvent("onSelect", function (idd, last_id) {
				try {
					if (idd == "search_fields") {
						//console.log(self.dataLoaded_tree_form_library_field_category[ uid ]);
						if (self.dataLoaded_tree_form_library_field_category[uid] == false) {
							self.progressOnForm(uid);
							self.data._startDataTree(uid, function () {
								self._tree_form_library_field_category(uid, form_id);
								self.dataLoaded_tree_form_library_field_category[uid] = true;
								self.progressOffForm(uid);
							});
						}
					}
					else if (idd == "search_fields_tags") {
						if (self.dataLoaded_tags_form[uid] == false) {
							self.progressOnForm(uid);
							self.data._startDataTags(uid, function () {
								self._toolbar_tags(uid);
								self._form_tags(uid);
								self.dataLoaded_tags_form[uid] = true;
								self.progressOffForm(uid);
							});
						}
					}
				}
				catch (e) {
					//console.log(e.stack);	
				}
				return true;
			});

			self.status_bar_paging_library_fields[uid] = self.tabbar_form_library_fields[uid].cells("list_fields").attachStatusBar();
			self.status_bar_paging_library_fields[uid].setText("<div id='recinfoArea_library_fields'></div>");

		}
		catch (e) {
			//console.log("tab : " + e.message);
		}
	}
	
	,toolbar_grid_library_fields:[]
	,_toolbar_grid_library_fields: function (uid) {
		var self = this;

		self.toolbar_grid_library_fields[uid] = self.tabbar_form_library_fields[uid].cells("list_fields").attachToolbar(self.model.conf_toolbar_grid_library_fields);

		self.toolbar_grid_library_fields[uid].attachEvent("onClick", function (id) {
			if (id == "add_as_field") {
				if( self.grid_library_fields[uid].getSelectedRowId() )
					self._addLibraryFieldToPage(uid, self.grid_library_fields[uid].getSelectedRowId());
			}
			else if (id == "add_as_option") {
				if( self.grid_form_fields[ uid ].getSelectedRowId() )
				{
					var field_id = self.grid_form_fields[ uid ].getSelectedRowId();
					var field_type = self.grid_form_fields[ uid ].cells(field_id, self.grid_form_fields[ uid ].getColIndexById("type")).getValue();
					var library_field_id = self.grid_library_fields[uid].getSelectedRowId();
					
					if( field_type == "q" || field_type == "W" || field_type == "Z" || field_type == "r" )
					{
						var hash = {};
						
						self.model.conf_grid_fields.ids.split(",").forEach(function (id, index, array) {
							try
							{
								//console.log( id + "  -->  " + self.grid_library_fields[uid].cells(library_field_id, self.grid_library_fields[uid].getColIndexById( id )).getValue() );
								hash[ id ] = self.grid_library_fields[uid].cells(library_field_id, self.grid_library_fields[uid].getColIndexById( id )).getValue();
							}catch(e)
							{
								//console.log("----------begin error------------");
								//console.log( id );
								//console.log("----------end error------------");
							}
							
						});
						
						
						hash["option_id"] = null;
						hash["field_id"] = field_id;
						hash["use_library"] = 1;
						hash["library_field_id"] = field_id;
						
						//console.log( hash );
						
						self._addOptionToField(uid, hash, function () {
							
						});
					}
					else
						dhtmlx.alert({
								title:"wrong field type!",
								type:"alert-error",
								text:"You can add library fields as a child field only for the following field types: checkbox group, nested group fields, checkbox nested fields and radio group"
						});
				}
				else
					dhtmlx.alert({
                            title:"No field selected!",
                            type:"alert-error",
                            text:"Before adding a library field as a child field, you need to select a field before."
                    });
				
			}
		});


	}

	,
	/**
	 * Description
	 * @method _grid_library_fields
	 * @param {} uid
	 * @return
	 */
	_grid_library_fields: function (uid) {
		var self = this;
		self.grid_library_fields[uid] = self.tabbar_form_library_fields[uid].cells("list_fields").attachGrid();
		self.grid_library_fields[uid].setHeader(self.model.conf_grid_library_fields.headers);
		self.grid_library_fields[uid].setColumnIds(self.model.conf_grid_library_fields.ids);
		self.grid_library_fields[uid].setInitWidths(self.model.conf_grid_library_fields.widths);
		self.grid_library_fields[uid].setColAlign(self.model.conf_grid_library_fields.colaligns);
		self.grid_library_fields[uid].setColTypes(self.model.conf_grid_library_fields.coltypes);
		self.grid_library_fields[uid].setColSorting(self.model.conf_grid_library_fields.colsorting);
		// self.grid_library_fields[ uid ].selMultiRows = true;
		self.grid_library_fields[uid].setDateFormat("%m-%d-%Y");
		self.grid_library_fields[uid].enablePaging(true, 100, 10, "recinfoArea_library_fields", true);
		self.grid_library_fields[uid].setPagingSkin("toolbar", "dhx_skyblue");
		self.grid_library_fields[uid].enableDragAndDrop(true);
		self.grid_library_fields[uid].enableMercyDrag(true);
		//self.grid_library_fields[uid].enableEditEvents(false, false, false);
		
		self.grid_library_fields[uid].attachHeader("#rspan,#rspan,#rspan,#rspan,<div style='padding-right:3px'><input type='text' type='text' style='width: 99%; border:1px solid gray;' onClick='(arguments[0]||window.event).cancelBubble=true;' onKeyUp='FormBuilder._feedGrid_library_fields_search( \"" + uid + "\"  )' id='search_label_" + uid + "'></div>,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan");
		
		self.grid_library_fields[uid].init();

		var type_combo = self.grid_library_fields[uid].getCombo(1);
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

		type_combo.put("Y", "Agency signature field");
		type_combo.put("X", "Caseworker signature field");
		type_combo.put("U", "Client 1 signature field");
		type_combo.put("V", "Client 2 signature field");
		
		type_combo.put("PhB", "Phone book");
		type_combo.put("BG", "Background");
		type_combo.put("EC", "Email");
		type_combo.put("AddB", "Address book");

		self.grid_library_fields[uid].attachEvent("onXLS", function () {
			self.progressOnForm(uid);
		});
		self.grid_library_fields[uid].attachEvent("onXLE", function () {
			self.progressOffForm(uid);
		});

		/**
		 * self.grid_library_fields[ uid ].attachEvent("onRowSelect", function( id, ind )
		 * {
		 * });
		 * @method rowToDragElement
		 * @param {} id
		 * @return text
		 */
		self.grid_library_fields[uid].rowToDragElement = function (id) {
			//any custom logic here
			var text = "dragging: " + self.grid_library_fields[uid].cells(id, 4).getValue(); // prepare a text string
			return text;
		}

		self.grid_library_fields[uid].attachEvent("onDrag", function (sId, tId, sObj, tObj, sInd, tInd) {
			return false;
		});

		self.grid_library_fields[uid].attachEvent("onDragIn", function (sid, tid, sgrid, tgrid) {
			self.is_grid_pages[uid] = "";
			return true;
		});
		
		self.grid_library_fields[uid].attachEvent("onRowSelect", function (id, ind) {
			self.toolbar_grid_library_fields[uid].enableItem("add_as_field");
			self.toolbar_grid_library_fields[uid].enableItem("add_as_option");
		});
	}

	,
	/**
	 * Description
	 * @method _feedGrid_library_fields
	 * @param {} uid
	 * @param {} stringToSearch
	 * @param {} isSearch
	 * @return
	 */
	_feedGrid_library_fields: function (uid, stringToSearch, isSearch) {
		var self = this,
			gridURL = "";
		stringToSearch = stringToSearch || "";
		isSearch = isSearch || false;
		self.grid_library_fields[uid].clearAll();

		if (isSearch)
			gridURL = CAIRS.MAP.API.getMappedURL({
				resource: "/LibraryFields/search", // mandatory
				responseType: "json", // not mandatory, default json
				params: "columns=" + self.model.conf_grid_library_fields.ids.replace(new RegExp("sub_row,", "g"), "") + "&tags=" + stringToSearch + "" // not mandatory, default none
			});
		else
			gridURL = CAIRS.MAP.API.getMappedURL({
				resource: "/LibraryFields", // mandatory
				responseType: "json", // not mandatory, default json
				params: "columns=" + self.model.conf_grid_library_fields.ids.replace(new RegExp("sub_row,", "g"), "") + "&searchcriteria=" + stringToSearch + "" // not mandatory, default none
			});

		self.grid_library_fields[uid].load(gridURL, function () {
			self.tabbar_form_library_fields[uid].setTabActive("list_fields");
			self.toolbar_grid_library_fields[uid].disableItem("add_as_field");
			self.toolbar_grid_library_fields[uid].disableItem("add_as_option");
		}, "json");
	}
	
	,
	/**
	 * Description
	 * @method _feedGrid_library_fields
	 * @param {} uid
	 * @param {} stringToSearch
	 * @param {} isSearch
	 * @return
	 */
	_feedGrid_library_fields_search: function (uid) {
		var self = this,
			gridURL = "";
		stringToSearch = document.getElementById("search_label_" + uid).value;
		
		if( event.keyCode == 13 )
		{
			self.grid_library_fields[uid].clearAll();

			gridURL = CAIRS.MAP.API.getMappedURL({
					resource: "/LibraryFields/search", // mandatory
					responseType: "json", // not mandatory, default json
					params: "columns=" + self.model.conf_grid_library_fields.ids.replace(new RegExp("sub_row,", "g"), "") + "&label=" + stringToSearch + "" // not mandatory, default none
				});
	
			self.grid_library_fields[uid].load(gridURL, function () {
				self.tabbar_form_library_fields[uid].setTabActive("list_fields");
			}, "json");
		}

		
	}

	,
	/**
	 * Description
	 * @method _form_tags
	 * @param {} uid
	 * @return
	 */
	_form_tags: function (uid) {
		var self = this
		self.form_tags[uid] = self.tabbar_form_library_fields[uid].cells("search_fields_tags").attachForm(self.model.conf_form_tags.template);
		self.status_bar_tags[uid] = self.tabbar_form_library_fields[uid].cells("search_fields_tags").attachStatusBar();
		self.status_bar_tags[uid].setText("Pick one or more tags and click on 'search fields' button.");
	}

	,
	/**
	 * Description
	 * @method _toolbar_tags
	 * @param {} uid
	 * @return
	 */
	_toolbar_tags: function (uid) {
		var self = this;
		self.toolbar_tags[uid] = self.tabbar_form_library_fields[uid].cells("search_fields_tags").attachToolbar(self.model.conf_toolbar_tags);
		self.toolbar_tags[uid].attachEvent("onClick", function (id) {
			if (id == "search") {
				var selected_tags = "";
				self.model.conf_form_tags.template.forEach(function (field, index, array) {
					if (typeof field.name !== 'undefined')
						if (self.form_tags[uid].isItemChecked(field.name))
							selected_tags = selected_tags + self.form_tags[uid].getItemValue(field.name);
				});
				self._feedGrid_library_fields(uid, selected_tags, "tag");
			}
		});
	}

	,
	/**
	 * Description
	 * @method _tree_form_library_field_category
	 * @param {} uid
	 * @param {} form_id
	 * @return
	 */
	_tree_form_library_field_category: function (uid, form_id) {
		var self = this;

		self.tree_form_library_field_category[uid] = self.tabbar_form_library_fields[uid].cells("search_fields").attachTree();
		self.tree_form_library_field_category[uid].setSkin(self.model.globalSkin);
		self.tree_form_library_field_category[uid].setImagePath(self.dhtmlx_codebase_path + "imgs/csh_bluebooks/");
		self.tree_form_library_field_category[uid].enableTreeImages(false);
		self.tree_form_library_field_category[uid].enableTreeLines(true);
		self.tree_form_library_field_category[uid].enableTextSigns(true);

		self.tree_form_library_field_category[uid].enableCheckBoxes(true, false);

		self.tree_form_library_field_category[uid].loadJSONObject(self.model.conf_tree_form_library_field_category, function () {
			//console.log(self.model.conf_tree_form_library_field_category);
		});

		self.tree_form_library_field_category[uid].disableCheckbox("manage", true);

		self.tree_form_library_field_category[uid].attachEvent("onCheck", function (categoryID, state) {
			if (categoryID == "manage")
				return;
			self._checkTreeItems(uid, categoryID);

		});

		self.tree_form_library_field_category[uid].attachEvent("onClick", function (categoryID, oldSelectedcategoryID) {
			if (categoryID == "manage")
				return;
			if (self.tree_form_library_field_category[uid].isItemChecked(categoryID))
				self.tree_form_library_field_category[uid].setCheck(categoryID, 0);
			else
				self.tree_form_library_field_category[uid].setCheck(categoryID, 1);
			self._checkTreeItems(uid, categoryID);
		});
	}

	,
	/**
	 * Description
	 * @method _grid_group_fields
	 * @param {} uid
	 * @return
	 */
	_grid_group_fields: function (uid) {
		var self = this;
		self.grid_group_fields[uid] = self.tabbar_form_library_fields[uid].cells("group_fields").attachGrid(self.model.conf_grid_group_fields);
		self.grid_group_fields[uid].setHeader(self.model.conf_grid_group_fields.headers);
		self.grid_group_fields[uid].setInitWidths(self.model.conf_grid_group_fields.widths);
		self.grid_group_fields[uid].setColAlign(self.model.conf_grid_group_fields.colaligns);
		self.grid_group_fields[uid].setColTypes(self.model.conf_grid_group_fields.coltypes);
		self.grid_group_fields[uid].setColSorting(self.model.conf_grid_group_fields.colsorting);
		//self.grid_group_fields[ uid ].selMultiRows = true;
		self.grid_group_fields[uid].setDateFormat("%m-%d-%Y");
		self.grid_group_fields[uid].enableDragAndDrop(true);
		self.grid_group_fields[uid].enableMercyDrag(true);

		self.grid_group_fields[uid].enableEditEvents(false, false, false);

		self.grid_group_fields[uid].init();

		self.grid_group_fields[uid].attachEvent("onXLS", function () {
			self.progressOnForm(uid);
		});
		self.grid_group_fields[uid].attachEvent("onXLE", function () {
			self.progressOffForm(uid);
		});
		self.grid_group_fields[uid].attachEvent("onRowSelect", function (id, ind) {

		});

		self.grid_group_fields[uid].attachEvent("onDrag", function (sId, tId, sObj, tObj, sInd, tInd) {
			return false;
		});

		/**
		 * Description
		 * @method rowToDragElement
		 * @param {} id
		 * @return text
		 */
		self.grid_group_fields[uid].rowToDragElement = function (id) {
			//any custom logic here
			var text = "dragging: " + self.grid_group_fields[uid].cells(id, 1).getValue(); // prepare a text string
			return text;
		}

		self.grid_group_fields[uid].attachEvent("onDragIn", function (sid, tid, sgrid, tgrid) {
			self.is_grid_pages[uid] = "";
			return true;
		});
	}

	/* HELPERS */

	,
	/**
	 * Description
	 * @method _setStatus
	 * @param {} m
	 * @return
	 */
	_setStatus: function (m) {
		self = this;
		document.getElementById("status_info").innerHTML = m;
	},
	/**
	 * Description
	 * @method _setStatusForm
	 * @param {} uid
	 * @param {} m
	 * @return
	 */
	_setStatusForm: function (uid, m) {
		self = this;
		document.getElementById("formbuilder_status_info_" + uid).innerHTML = m;
	}

	,
	/**
	 * Description
	 * @method _setStatusError
	 * @param {} m
	 * @return
	 */
	_setStatusError: function (m) {
		self = this;
		document.getElementById("errors_info").innerHTML = m;
	}

	,
	/**
	 * Description
	 * @method _setStatusErrorForm
	 * @param {} uid
	 * @param {} m
	 * @return
	 */
	_setStatusErrorForm: function (uid, m) {
		self = this;
		document.getElementById("formbuilder_errors_info_" + uid).innerHTML = m;
	}

	,
	/**
	 * Description
	 * @method _setStatusDataTransfer
	 * @param {} m
	 * @param {} isActive
	 * @return
	 */
	_setStatusDataTransfer: function (m, isActive) {
		self = this;
		dhtmlx.message({
			text: m
		});
		if (isActive) {
			document.getElementById("data_transfer_info").innerHTML = m;
			document.getElementById("data_transfer_info").style.backgroundImage = "url(" + self.icons_path + "network.gif)";
		}
		else {
			document.getElementById("data_transfer_info").innerHTML = m;
			document.getElementById("data_transfer_info").style.backgroundImage = "url(" + self.icons_path + "network-accept.png)";
		}
	}

	,
	/**
	 * Description
	 * @method _setStatusSocket
	 * @param {} m
	 * @param {} isOffline
	 * @return
	 */
	_setStatusSocket: function (m, isOffline) {
		self = this;
		dhtmlx.message({
			text: m
		});
		document.getElementById("socket_info").innerHTML = "socket: " + m;
		document.getElementById("socket_info").style.backgroundImage = "url(" + self.icons_path + "socket.gif)";
		if (isOffline)
			document.getElementById("socket_info").style.backgroundImage = "url(" + self.icons_path + "socket_disconnected.png)";
	}

	,
	/**
	 * Description
	 * @method _setStatusDataTransferForm
	 * @param {} uid
	 * @param {} m
	 * @param {} isActive
	 * @return
	 */
	_setStatusDataTransferForm: function (uid, m, isActive) {
		self = this;
		dhtmlx.message({
			text: m
		});
		if (isActive) {
			document.getElementById("formbuilder_data_transfer_info_" + uid).innerHTML = m;
			document.getElementById("formbuilder_data_transfer_info_" + uid).style.backgroundImage = "url(" + self.icons_path + "network.gif)";
		}
		else {
			document.getElementById("formbuilder_data_transfer_info_" + uid).innerHTML = m;
			document.getElementById("formbuilder_data_transfer_info_" + uid).style.backgroundImage = "url(" + self.icons_path + "network-accept.png)";
		}
	}

	,
	/**
	 * Description
	 * @method _setStatusUser
	 * @param {} m
	 * @param {} ok
	 * @return
	 */
	_setStatusUser: function (m, ok) {
		self = this;
		if (typeof ok === 'undefined') {
			ok = true;
		}
		document.getElementById("user_info").getElementsByTagName("span")[0].innerHTML = m;
		if (ok) {
			document.getElementById("user_info_status").src = "" + self.icons_path + "online.png";
			dhtmlx.message({
				text: m
			});
		}
		else {
			document.getElementById("user_info_status").src = "" + self.icons_path + "offline.png";
			dhtmlx.message({
				type: "error",
				text: m
			});
		}
	}

	,
	/**
	 * Description
	 * @method _setStatusUserForm
	 * @param {} uid
	 * @param {} m
	 * @param {} ok
	 * @return
	 */
	_setStatusUserForm: function (uid, m, ok) {
		self = this;
		if (typeof ok === 'undefined') {
			ok = true;
		}
		document.getElementById("formbuilder_user_info_" + uid).getElementsByTagName("span")[0].innerHTML = m;
		if (ok) {
			document.getElementById("formbuilder_user_info_status_" + uid).src = "" + self.icons_path + "online.png";
			dhtmlx.message({
				text: m
			});
		}
		else {
			document.getElementById("formbuilder_user_info_status_" + uid).src = "" + self.icons_path + "offline.png";
			dhtmlx.message({
				type: "error",
				text: m
			});
		}
	}

	// helpers
	,
	/**
	 * Description
	 * @method _mountFormBuilderScreen
	 * @param {} uid
	 * @param {} form_ids
	 * @return
	 */
	_mountFormBuilderScreen: function (uid, form_ids) {
		var self = this,
			form_ids = form_ids || "";

		if (form_ids == "") {
			form_ids = "-1";
		}
		
		if( self.builderOpened )
		{
			dhtmlx.message( {type : "error", text : "You can't edit more than one form at same time"} );
			return;	
		}

		form_ids.toString().split(",").forEach(function (form_id, index, array) {
			try {

				form_id = parseInt(form_id);

				uid = uid + "_" + form_id;
				
				// remove it //
				//self.rules.start( { uid : uid } );
				// remove it //

				self.pages[uid] = [];
				self.selected_page[uid] = null;
				self.dataLoaded_tree_form_library_field_category[uid] = false;
				self.dataLoaded_tags_form[uid] = false;

				self._window_form(uid, form_id);
				self._layout_form(uid, form_id);
				self._tabbar_form(uid, form_id);
				self._form_properties(uid, form_id);
				self._layout_form_layout(uid, form_id);
				self._layout_form_layout_left(uid, form_id);
				self._layout_form_layout_right(uid, form_id);

				self._grid_pages(uid, form_id);

				self._tabbar_form_fields(uid, form_id);
				self._tabbar_form_create_fields(uid, form_id);

				self._tabbar_form_library_fields(uid, form_id);
				self._grid_library_fields(uid, form_id);
				self._toolbar_grid_library_fields(uid, form_id);

				self._grid_group_fields(uid, form_id);
				self._toolbar_form_pages(uid, form_id);
				self._feedGrid_library_fields(uid, form_id);
				
				self.data._feedGrid_group_fields(uid, form_id);

				self._toolbar_field_propertie(uid, form_id);
				self._toolbar_form(uid, form_id);

				//self.layout_form_preview[ uid ].cells("a").dock();
				self.preview._layout_form_preview(uid);
				self.preview._toolbar_form_preview(uid);

				dhtmlx.compat("dnd");

				self._grid_form_fields(uid, form_id);
				self._toolbar_form_fields(uid, form_id);
				self._tabbar_form_add_field(uid, form_id);
				self._dataView_type_of_fields(uid, form_id);
				self._form_custom_field(uid, form_id);
				self._toolbar_custom_field(uid, form_id);

				if (form_id > 0) {
					self.data._readFormData(uid, form_id);
				}
				
				self.toolbar_taskbar[self._getRawUID(uid)].addButton("window_FormBuilder_formcreator_" + uid + "_" + form_id, 2, "FormBuilder: " + form_id, "form.png", "form.png");
					
				self.builderOpened = true;
			}
			catch (e) {
				console.log(e.stack);
			}
		});
	}

	////////////////////////////////////////////////////////////////////////////

	,
	/**
	 * Description
	 * @method _bindFormFieldsToLibraryFields
	 * @param {} form_uid
	 * @param {} uid
	 * @return
	 */
	_bindFormFieldsToLibraryFields: function (form_uid, uid) {
		var self = this;

		//console.log( form_uid );
		//console.log( uid );

		//console.log( CAIRS.dhtmlx.formFields[ form_uid ] );

		for (var x = 0; x < CAIRS.dhtmlx.formFields[form_uid].length; x++) {
			var field = CAIRS.dhtmlx.formFields[form_uid][x];
			//console.log( field );
			// check if the item has a name. Lets assume that all the fields which should be validate has a name
			if (field.name) {
				var bind_library_field, name, type;
				bind_library_field = field.bind_library_field;
				if (typeof field.type === 'undefined') {
					field.type = "";
				}
				type = field.type || "";
				name = field.name || "";
				if (typeof bind_library_field === 'undefined') {
					//console.log( "typeof bind_library_field === 'undefined'" );
					continue;
				}

				if (bind_library_field === false) {
					//console.log( "bind_library_field === false" );
					continue;
				}

				////console.log(field.name);
				if (type === "combo") {
					//console.log( "binding combo" );
					//self.data_store[ uid ][ "caseworkers_names" ]
					var library = eval("self.data_store[ uid ]." + bind_library_field);
					//console.log(library);
					if (library) {
						field.options = library;
						////console.log("fieldOpt: "+ JSON.stringify( field.options ));
					}
				}
				////console.log( bind_library_field );
				//self.form[ uid ].getInput(name).setAttribute("onblur", "SafeHomeStudy.changeBindedElement( '"+ bind_library_field +"', this.value );")
			} // END - check if the item has a name. 
		} // END FOR
	}

	,
	/**
	 * Description
	 * @method changeBindedElement
	 * @param {} elementLabel
	 * @param {} value
	 * @return
	 */
	changeBindedElement: function (elementLabel, value) {
		//var self = this;
		////console.log(1);
		////console.log(elementLabel + " - ");
		var divs = document.getElementsByTagName("*");
		for (var x = 0; x < divs.length; x++) {
			div = divs[x];
			//if(div.getAttribute)
			//{
			////console.log(div);
			if (div.getAttribute("data-htmlbind")) {

				if (div.getAttribute("data-htmlbind") == elementLabel) {
					////console.log(div.getAttribute("data-htmlbind") + " - " + elementLabel + " - " + value);
					div.innerHTML = value;
				}
			}
			//}
		}
	}

	,
	/**
	 * Description
	 * @method _getFormItem
	 * @param {} name
	 * @param {} uid
	 * @return Literal
	 */
	_getFormItem: function (name, uid) {
		var self = this;

		if (CAIRS.dhtmlx.formFields[uid] === undefined) {
			return false;
		}

		for (var x = 0; x < CAIRS.dhtmlx.formFields[uid].length; x++) {
			var field = CAIRS.dhtmlx.formFields[uid][x];
			if (field.name == name) {
				return field;
			}
		}
		return false;
	}

	////////////////////////////////////////////////////////////////////////////
	,
	/**
	 * Description
	 * @method _checkTreeItems
	 * @param {} uid
	 * @param {} categoryID
	 * @return
	 */
	_checkTreeItems: function (uid, categoryID) {

		var self = this;
		var mult_categories = "";
		self.tree_form_library_field_category[uid].getAllChecked().toString().split(",").forEach(function (categoryID, index, array) {
			if (categoryID != 'manage')
				mult_categories = mult_categories + self._getCategorySearchCriteria(self._getRawUID(uid), categoryID) + ",";
		});

		if (mult_categories.charAt(mult_categories.length - 1) == ',') {
			mult_categories = mult_categories.substr(0, mult_categories.length - 1);
		}

		self._setStatus("Listing : " + mult_categories);

		if (mult_categories != "false" && mult_categories != "") {
			self._feedGrid_library_fields(uid, mult_categories);
		}
		else {
			self._setStatus("Listing no fields. Pick a category for listing fields.");
			self.grid_library_fields[uid].clearAll();
		}
	}

	,
	/**
	 * Description
	 * @method _getCategorySearchCriteria
	 * @param {} uid
	 * @param {} categoryID
	 * @return Literal
	 */
	_getCategorySearchCriteria: function (uid, categoryID) {
		var self = this;
		//console.log("categoryID : " + categoryID);
		for (var x = 0; x < self.data_store[self._getRawUID(uid)].category.length; x++) {
			var category = self.data_store[self._getRawUID(uid)].category[x];
			if (typeof category.CategoryID !== 'undefined') {
				if (category.CategoryID == categoryID) {
					return self.data_store[self._getRawUID(uid)].category[x].SearchCriteria;
					//console.log("category.CategoryID : " + category.CategoryID);
				}
			}
		}
		return false;
	}

	,
	/**
	 * Description
	 * @method _putSubCategoryOnTree
	 * @param {} uid
	 * @param {} categoryID
	 * @param {} subCategoryObj
	 * @return
	 */
	_putSubCategoryOnTree: function (uid, categoryID, subCategoryObj) {
		var self = this;
		for (var x = 0; x < self.model.conf_tree_form_library_field_category.item[0].item.length; x++) {
			var category = self.model.conf_tree_form_library_field_category.item[0].item[x];
			if (typeof category.id !== 'undefined')
				if (category.id == categoryID) {
					if (typeof self.model.conf_tree_form_library_field_category.item[0].item[x].item === 'undefined') {
						self.model.conf_tree_form_library_field_category.item[0].item[x].item = [];
					}
					self.model.conf_tree_form_library_field_category.item[0].item[x].item.push(subCategoryObj);
				}
		}
	}
	
	
	// meta parser
	
	
	
	

	,
	/**
	 * Description
	 * @method _getFieldOption
	 * @param {} uid
	 * @param {} page_id
	 * @param {} field_id
	 * @param {} option_id
	 * @return Literal
	 */
	_getFieldOption: function (uid, page_id, field_id, option_id) {
		var self = this;
		//console.log( "_getFieldOption" );
		//console.log( arguments );

		for (var x = 0; x < self._getPageColumnList(uid, page_id, "first").length; x++) {
			var field = self._getPageColumnList(uid, page_id, "first")[x];

			if (typeof field.field_id !== 'undefined') {
				if (field.field_id.toString() == field_id.toString()) {
					//console.log(field);
					//console.log(field.type);
					if (field.type == "label" || field.type == "fieldset" || field.type == "radio" || field.type == "checkbox") { // lets read the list property
						var found = false;
						field.list.forEach(function (option, index, array) {
							//console.log(option);
							if (option.option_id)
								if (option.option_id.toString() == option_id.toString())
									found = option;
						});
						return found;
					}
					else if (field.type == "multiselect" || field.type == "combo" || field.type == "select") { // lets read the options property
						var found = false;
						field.options.forEach(function (option, index, array) {
							//console.log(option);
							if (option.option_id)
								if (option.option_id.toString() == option_id.toString())
									found = option;
						});
						//console.log(found);
						return found;
					}
				}

			}
		}

		// if double column
		if (self.pages[uid][page_id].page_layout == "D") {
			for (var x = 0; x < self._getPageColumnList(uid, page_id, "second").length; x++) {
				var field = self._getPageColumnList(uid, page_id, "second")[x];

				if (typeof field.field_id !== 'undefined') {
					if (field.field_id.toString() == field_id.toString()) {
						//console.log(field.type);
						if (field.type == "label" || field.type == "fieldset" || field.type == "radio" || field.type == "checkbox") { // lets read the list property
							var found = false;
							field.list.forEach(function (option, index, array) {
								//console.log(option);
								if (option.option_id)
									if (option.option_id.toString() == option_id.toString())
										found = option;
							});
							//console.log(found);
							return found;
						}
						else if (field.type == "multiselect" || field.type == "combo" || field.type == "select") { // lets read the options property
							var found = false;
							field.options.forEach(function (option, index, array) {
								//console.log(option);
								if (option.option_id)
									if (option.option_id.toString() == option_id.toString())
										found = option;
							});
							//console.log(found);
							return found;
						}
					}
				}
			}
		}
		return false;
	}
	

	,
	/**
	 * Description
	 * @method _getPageColumnList
	 * @param {} uid
	 * @param {} page_id
	 * @param {} columnIndex
	 * @return
	 */
	_getPageColumnList: function (uid, page_id, columnIndex) {
		var self = this,
			index = 0;

		if (typeof columnIndex === 'undefined') {
			index = 0;
		}
		else if (columnIndex == "first") {
			index = 0;
		}
		else if (columnIndex == "second") {
			index = 2;
		}

		if (typeof self.pages[uid][page_id] === 'undefined') {
			//dhtmlx.message( {type : "error", text : "Page not found"} );
			return
		}
		else if (typeof self.pages[uid][page_id].list[index] === 'undefined') {
			//dhtmlx.message( {type : "error", text : "Column not found"} );
			return;
		}
		else if (typeof self.pages[uid][page_id].list[index].list === 'undefined') {
			//dhtmlx.message( {type : "error", text : "Item found is not a column"} );
			return;
		}
		else {
			if (typeof self.pages[uid][page_id].list[index].list === 'undefined')
				return []; // not found, return empty array
			else
				return self.pages[uid][page_id].list[index].list;
		}
	}

	,
	/**
	 * Description
	 * @method _getPageOnModel
	 * @param {} uid
	 * @param {} page_id
	 * @return ObjectExpression
	 */
	_getPageOnModel: function (uid, page_id) {
		var self = this;

		for (var x = 0; x < self.model.conf_form_preview.template.length; x++) {
			if (self.model.conf_form_preview.template[x].type == "block") {
				if (typeof self.model.conf_form_preview.template[x].page_id !== 'undefined') {
					if (self.model.conf_form_preview.template[x].page_id == page_id)
						return self.model.conf_form_preview.template[x];
				}
			}
		}
		return {};
	}
	
	
	

	,
	/**
	 * Description
	 * @method _putEmptyPageOnMemory
	 * @param {} uid
	 * @param {} pageJSON
	 * @return
	 */
	_putEmptyPageOnMemory: function (uid, pageJSON) {
		var self = this;
		self.pages[uid][pageJSON.page_id] = pageJSON;
		self.model.conf_form_preview.template.push(pageJSON);
		//console.log( pageJSON );
	}

	,
	/**
	 * Description
	 * @method _changePageName
	 * @param {} uid
	 * @param {} page_id
	 * @param {} pagename
	 * @return
	 */
	_changePageName: function (uid, page_id, pagename) {
		var self = this;
		//{ type: "block", width : self.form_default_width, offsetLeft: 0, id : page_id, label : pagename, page_id : page_id, pagename: pagename,
		self.pages[uid][page_id].label = pagename;
		self.pages[uid][page_id].pagename = pagename;
	}

	/**
	 * Get user typed data and set the field value inside application model
	 * @method {Function}
	 * @param {String|Integer} [uid]
	 */
	,
	/**
	 * Description
	 * @method _changeFieldsValueOnModel
	 * @param {} uid
	 * @return
	 */
	_changeFieldsValueOnModel: function (uid) {
		self = this,
			hash = self.form_preview[uid].getFormData();
		
		//console.log(hash);
		
		CAIRS.dhtmlx.formFields[uid + "_form_preview"].forEach(function (field, index, array) {
			//console.log(field.name);
			//console.log(field.type);
			
			if (field.type == "calendar") {
				if (CAIRS.isValidDate(hash[field.name])) {
					var day = hash[field.name].getDate();
					var month = hash[field.name].getMonth() + 1;
					var year = hash[field.name].getFullYear();
					if( field.option_id ) // if this field is child field
						self._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["value"] =  year + "/" + month + "/" + day;
					else // else
						self.metaparser._getPageField(uid, field.page_id, field.field_id)["value"] = year + "/" + month + "/" + day;
				}
			}
			else if (field.type == "upload") {
				hash[field.name] = '';
				//console.log(typeof self.form_preview[uid].getItemValue( field.name ));
				//console.log( self.form_preview[uid].getItemValue( field.name ) );
				if( field.option_id ) // if this field is child field
				{
					self._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["swfUrl"] = '';//swfUrl
					self._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["value"] = '';//swfUrl
					self._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["url"] = '';//swfUrl
				}
				else
				{
					self.metaparser._getPageField(uid, field.page_id, field.field_id)["swfUrl"] = '';
					self.metaparser._getPageField(uid, field.page_id, field.field_id)["value"] = '';
					self.metaparser._getPageField(uid, field.page_id, field.field_id)["url"] = '';
				}
			}// bug stringify
			else {
				if( field.option_id ) // if this field is child field
					self._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["value"] = hash[field.name];
				else
					self.metaparser._getPageField(uid, field.page_id, field.field_id)["value"] = hash[field.name];
				
				//console.log(self.metaparser._getPageField(uid, field.page_id, field.field_id).value);
				//console.log("--------");
			}
		});
	}
	
	
	
	


	,
	/**
	 * Description
	 * @method _convertLibraryFieldTypetoDhtmlxType
	 * @param {} type
	 * @return
	 */
	_convertLibraryFieldTypetoDhtmlxType: function (type) {
		switch (type) {
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
			return "upload";
			break;
		case "G":
			return "label";
			break;
		case "I":
			return "input";
			break;
		
		case "P":
			return "fieldset";
			break;
		case "B":
			return "checkbox";
			break;
		case "W":
			return "fieldset";
			break;
		case "r":
			return "fieldset";
			break;
		case "q":
			return "fieldset";
			break;
		case "Z":
			return "checkbox";
			break;
		case "S":
			return "select";
			break;

		case "Y":
			return "fieldset";
			break;
		case "X":
			return "fieldset";
			break;
		case "U":
			return "fieldset";
			break;
		case "V":
			return "fieldset";
			break;

		case "c":
			return "container";
			break;
			
		case "e":
			return "container";
			break;

		case "h":
			return "hidden";
			break;
			
		/* components */
		
		case "PhB": // phone book
			return "fieldset";
			break;
		
		case "BG": // background
			return "fieldset";
			break;
		
		case "EC": // Email
			return "fieldset";
			break;

		case "AddB": // address book
        return "fieldset";
        break;

		default:
			return "";
		}
	}

	,
	/**
	 * Description
	 * @method _convertDhtmlxTypeToLibraryFieldType
	 * @param {} type
	 * @return
	 */
	_convertDhtmlxTypeToLibraryFieldType: function (type) {
		switch (type) {
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
			return "G";
			break;
			//case "label":
			//	return "L";
			//	break;
		case "upload":
			return "F";
			break;

			//case "input":
			//	return "I";
			//	break;
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
	
	


	

	,
	/**
	 * Description
	 * @method _addCustomFieldToPage
	 * @param {} uid
	 * @param {} hash
	 * @param {} callBack
	 * @return
	 */
	_addCustomFieldToPage: function (uid, hash, callBack) {
		var self = this,
			newid = 0;

		if (typeof hash["field_id"] === "undefined") {
			dhtmlx.message({
				type: "error",
				text: "field_id is missing"
			});
			if (callBack) callBack();
			return;

		}
		if (self.selected_page[uid] == null) {
			dhtmlx.message({
				type: "error",
				text: "You need to select a page before adding fields."
			});
			if (callBack) callBack();
			return;
		}

		newid = hash["field_id"];

		hash["name"] = self.handleInputName(uid, hash["label"]);

		//console.log( hash );

		var rowData = [];
		self.model.conf_grid_fields.ids.split(",").forEach(function (id, index, array) {

			if (typeof hash[id] !== 'undefined') {
				if (id == 'use_library') {
					if (hash["use_library"] == 1) {
						rowData.push("1");
						hash["use_library"] = "1";
					}
					else {
						rowData.push("0");
						hash["use_library"] = "0";
					}
				}
				else if (id == 'required') {
					if (hash["required"] == 1 || hash["required"] == "1" || hash["required"] == true) {
						rowData.push("1");
						hash["required"] = "1";
					}
					else {
						rowData.push("0");
						hash["required"] = "0";
					}
				}
				else {
					//console.log( hash[ id ] );
					rowData.push(hash[id]);
				}
			}
			else {
				if (id == 'index') {
					//console.log(id);
					//console.log(hash[ "index" ]);
					//console.log(self.grid_form_fields[ uid ].getRowsNum());
					rowData.push(self.grid_form_fields[uid].getRowsNum());
					hash["index"] = self.grid_form_fields[uid].getRowsNum();
				}
				else if (id == 'use_library') {

					if (hash["use_library"] == 1) {
						rowData.push("1");
						hash["use_library"] = "1";
					}
					else {
						rowData.push("0");
						hash["use_library"] = "0";
					}
				}
				else if (id == 'library_field_id') {

					rowData.push("");
					hash["library_field_id"] = "";
				}
				if (id == 'required') {
					if (hash["required"] == 1 || hash["required"] == "1" || hash["required"] == true) {
						rowData.push("1");
						hash["required"] = "1";
					}
					else {
						rowData.push("0");
						hash["required"] = "0";
					}
				}
				else {
					//console.log( "grid column name not present on form hash -----------------------" );
					//console.log( id );
					//console.log( hash[ id ] );
					//console.log( "grid column name not present on form hash -----------------------" );
				}

			}
		});
		//console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
		//console.log(rowData)

		var fieldJSON = {
			type: self._convertLibraryFieldTypetoDhtmlxType(hash.type),
			type_standard: hash.type,
			name: hash.name,
			label: hash.label,
			value: "",
			required: false,
			validate: "",
			mask_to_use: hash.mask_to_use,
			field_id: newid,
			data: rowData,
			index: self.grid_form_fields[uid].getRowsNum(),
			list: [],
			options: [],
			className: hash.className,
			rule_action: "show",
			rule_match: "all",
			rule_enable: "0"
		};

		if (hash.type == "A")
		{
			fieldJSON["rows"] = 4;
			fieldJSON["style"] = "width:190px;"
		}

		if (hash.tooltip && hash.tooltip != "") {
			fieldJSON["tooltip"] = hash.tooltip;
			fieldJSON["note"] = "{ text: '" + hash.tooltip + "'}";
			fieldJSON["info"] = 'true';
		}
		else {
			fieldJSON["tooltip"] = "";
			fieldJSON["note"] = "";
			fieldJSON["info"] = 'false';
		}

		if (hash.value) {
			fieldJSON["value"] = hash.value;
		}

		if (hash.required) {
			fieldJSON["required"] = 1;
			if (fieldJSON["validate"] == "") {
				fieldJSON["validate"] = "NotEmpty";
			}
		}
		else {
			fieldJSON["required"] = "0";
		}

		fieldJSON["caption"] = fieldJSON["label"];
		fieldJSON["text_size"] = 200;
		fieldJSON["tips"] = fieldJSON["tooltip"];
		fieldJSON["grouping"] = fieldJSON["index"];
		fieldJSON["textdefault"] = fieldJSON["value"];

		if (fieldJSON["required"] == true) {
			fieldJSON["required"] = 1;
		}
		else {
			fieldJSON["required"] = "0";
		}
		
		
		if( fieldJSON["type"] == "upload" )
		{
			 fieldJSON["url"] = self.application_path + "processors/dhtmlxform_item_upload.php";
             fieldJSON["autoStart"] = true;
             fieldJSON["swfPath"] = self.dhtmlx_codebase_path + "codebase/ext/uploader.swf";
             fieldJSON["swfUrl"] = self.application_path + "processors/dhtmlxform_item_upload.php";
		}
		

		self.data._putFieldOnMemory(uid, self.selected_page[uid], fieldJSON, function (newFieldID) {

			//fieldJSON[ "field_id" ] = newFieldID;
			self.grid_form_fields[uid].addRow(newFieldID, rowData);
			self.grid_form_fields[uid].cells(newFieldID, self.grid_form_fields[uid].getColIndexById("validate")).setValue(fieldJSON["validate"]);
			self.toolbar_custom_field[uid].enableItem("save_field");
			self.preview._startPreview(uid);

		});

		//self.data._reOrderPageFields( uid );
	}

	,
	/**
	 * Description
	 * @method _addPreDefinedFieldToPage
	 * @param {} uid
	 * @param {} preDefinedItemID
	 * @return
	 */
	_addPreDefinedFieldToPage: function (uid, preDefinedItemID) {
		var self = this,
			d = self.dataView_type_of_fields[uid].get(preDefinedItemID),
			rowData = [],
			fieldJSON;

		self.model.conf_grid_fields.ids.split(",").forEach(function (id, index, array) {
			if (id.toLowerCase() == 'library_field_id')
				rowData.push("");
			else if (id == 'name')
				rowData.push(self.handleInputName(uid, d.name));
			else if (id == 'index')
				rowData.push(self.grid_form_fields[uid].getRowsNum());
			else
				rowData.push(d[id]);
		});

		fieldJSON = {
			type: self._convertLibraryFieldTypetoDhtmlxType(d.type),
			type_standard: d.type,
			name: self.handleInputName(uid, d.name),
			label: d.label,
			value: "",
			tooltip: "",
			required: false,
			validate: "",
			mask_to_use: d.mask_to_use,
			field_id: "-1",
			data: rowData,
			index: self.grid_form_fields[uid].getRowsNum(),
			list: [],
			options: [],
			className: "",
			rule_action: "show",
			rule_match: "all",
			rule_enable: "0"
		};

		if (d.type == "A")
		{
			fieldJSON["rows"] = 4;
			//fieldJSON["style"] = "width:190px;"
		}

		if (d.tooltip && d.tooltip != "") {
			fieldJSON["tooltip"] = d.tooltip;
			fieldJSON["note"] = "{ text: '" + d.tooltip + "'}";
			fieldJSON["info"] = 'true';
		}
		else {
			fieldJSON["tooltip"] = "";
			fieldJSON["note"] = "";
			fieldJSON["info"] = 'false';
		}

		//console.log( fieldJSON[ "index" ] );

		fieldJSON["caption"] = fieldJSON["label"];
		fieldJSON["text_size"] = 200;
		fieldJSON["tips"] = fieldJSON["tooltip"];
		fieldJSON["grouping"] = fieldJSON["index"];
		fieldJSON["textdefault"] = fieldJSON["value"];

		if (fieldJSON["required"] == true) {
			fieldJSON["required"] = 1;
		}
		else {
			fieldJSON["required"] = "0";
		}

		self.data._putFieldOnMemory(uid, self.selected_page[uid], fieldJSON, function (newFieldID) {
			fieldJSON["field_id"] = newFieldID;
			self.grid_form_fields[uid].addRow(newFieldID, rowData);
			self.grid_form_fields[uid].cells(newFieldID, self.grid_form_fields[uid].getColIndexById("mask_to_use")).setValue(d.mask_to_use);
			self.grid_form_fields[uid].cells(newFieldID, self.grid_form_fields[uid].getColIndexById("use_library")).setValue("0");
			self.grid_form_fields[uid].cells(newFieldID, self.grid_form_fields[uid].getColIndexById("library_field_id")).setValue("0");
			self.preview._startPreview(uid);
		});
	}

	,
	/**
	 * Description
	 * @method _addLibraryFieldToPage
	 * @param {} uid
	 * @param {} libraryFieldID
	 * @return
	 */
	_addLibraryFieldToPage: function (uid, libraryFieldID) {
		var self = this;
		var newid = self.grid_form_fields[uid].uid();

		var type_value = self.grid_library_fields[uid].cells(libraryFieldID, self.grid_library_fields[uid].getColIndexById("type")).getValue();
		var name = self.grid_library_fields[uid].cells(libraryFieldID, self.grid_library_fields[uid].getColIndexById("name")).getValue();
		var label = self.grid_library_fields[uid].cells(libraryFieldID, self.grid_library_fields[uid].getColIndexById("label")).getValue();
		
		var fieldHASH = {};
		
		var rowData = [];
		var grid_cols = self.model.conf_grid_library_fields.ids.split(",").splice(1, self.model.conf_grid_library_fields.ids.split(",").length -1);
		grid_cols.forEach(function (id, index, array) {
			var colIndex = self.grid_library_fields[uid].getColIndexById(id);
			//console.log( id );
			if (id.toLowerCase() == 'fieldname')
			{
				rowData.push(self.grid_library_fields[uid].cells(libraryFieldID, colIndex).getValue().toString().split("_" + libraryFieldID)[0]);
				fieldHASH[ id ] = self.grid_library_fields[uid].cells(libraryFieldID, colIndex).getValue().toString().split("_" + libraryFieldID)[0];
			}
			else if (id.toLowerCase() == 'library_field_id')
			{
				rowData.push(libraryFieldID);
				//fieldHASH[ id ] = libraryFieldID;
			}
			else if (id.toLowerCase() == 'use_library')
			{
				rowData.push("1");
				fieldHASH[ id ] = "1";
			}
			else if (id.toLowerCase() == 'required')
			{
				if (self.grid_library_fields[uid].cells(libraryFieldID, colIndex).getValue() == "" || self.grid_library_fields[uid].cells(libraryFieldID, colIndex).getValue() == null)
				{
					rowData.push("0");
					fieldHASH[ id ] = "0";
				}
				else
				{
					rowData.push(self.grid_library_fields[uid].cells(libraryFieldID, colIndex).getValue());
					fieldHASH[ id ] = self.grid_library_fields[uid].cells(libraryFieldID, colIndex).getValue();
				}
			}
			else
				rowData.push(self.grid_library_fields[uid].cells(libraryFieldID, colIndex).getValue());
				fieldHASH[ id ] = self.grid_library_fields[uid].cells(libraryFieldID, colIndex).getValue();
		});

		rowData.push(self.grid_form_fields[uid].getRowsNum());
		
			fieldHASH["type"] = self._convertLibraryFieldTypetoDhtmlxType(type_value);
			fieldHASH["type_standard"] = type_value;
			fieldHASH["name"] = name;
			fieldHASH["label"] = label;
			//fieldHASH["value"] = "";
			fieldHASH["tooltip"] = "";
			//fieldHASH["required"] = false;
			fieldHASH["library_field_id"] = libraryFieldID;
			fieldHASH["use_library"] = "1";
			
			fieldHASH["validate"] = "";
			fieldHASH["field_id"] = newid;
			fieldHASH["data"] = rowData;
			fieldHASH["index"] = self.grid_form_fields[uid].getRowsNum();
			fieldHASH["list"] = [];
			fieldHASH["options"] = [];
			fieldHASH["className"] = "";
			
			fieldHASH["rule_action"] = "show";
			fieldHASH["rule_match"] = "all";
			fieldHASH["rule_enable"] = "0";
			
			//console.log( fieldHASH );
		
		self.data._putFieldOnMemory(uid, self.selected_page[uid], fieldHASH, function () {
			self.preview._startPreview(uid);
		});

		self.grid_form_fields[uid].addRow(newid, rowData);

		//self.data._reOrderPageFields( uid );
	}
	
	
	


	

	

	,
	/**
	 * Description
	 * @method _addOptionToField
	 * @param {} uid
	 * @param {} hash
	 * @param {} callBack
	 * @return
	 */
	_addOptionToField: function (uid, hash, callBack) {
		var self = this,
			record = [],
			text = hash.text,
			asdefault = hash.asdefault;
			
			//console.log( hash );

		if (typeof self.grid_field_propertie_options_start_sequence[uid] === 'undefined')
			self.grid_field_propertie_options_start_sequence[uid] = 0;

		// if is a valid form element and not an option
		if (hash["type"] == ' ') {
				hash["text"] = hash["label"];
				hash["value"] = hash["label"];
				text = hash["label"];
		}

		if (typeof hash["name"] === 'undefined' || hash["name"] == "") {
			if (typeof hash["label"] !== 'undefined')
				hash["name"] = self.handleInputName(uid, hash["label"], true); // set a name for a valid form element
			else
				hash["name"] = ""; // set as empty for simple option elements
		}

		// MAP database expect N or Y asdefault value
		if (hash["asdefault"] == 0 || hash["asdefault"] == "0" || hash["asdefault"] == false) {
			hash["asdefault"] = "N";
		}
		else if (hash["asdefault"] == 1 || hash["asdefault"] == "1" || hash["asdefault"] == true) {
			hash["asdefault"] = "Y";
		}

		//console.log( text );
		
		if (typeof text === 'undefined') {
			text = "";
		}

		if (typeof text !== 'undefined') {
			
			if (text !== null) {
				var page_id = self.grid_pages[uid].getSelectedRowId();
				var field_id = -1;
				if (typeof hash["field_id"] !== 'undefined') {
					try {
						field_id = parseInt(hash["field_id"]);
					}
					catch (e) {
						if (self.grid_form_fields[uid].getSelectedRowId())
							field_id = self.grid_form_fields[uid].getSelectedRowId();
					}
				}

				//console.log("----------------------------------------------------------------------------");
				//console.log( self.metaparser._getFieldOptionsNumber( uid, page_id, field_id ) );

				self.model.conf_grid_field_propertie_options.ids.split(",").forEach(function (id, index, array) {
					if (typeof hash[id] !== 'undefined') {
						if (id == "caption") {
							record.push(hash["label"]);
							hash["caption"] = hash["label"];
						} //asdefault
						else
							record.push(hash[id]);
					}
					else {
						if (id == "index") {
							record.push( self.metaparser._getFieldOptionsNumber(uid, page_id, field_id) );
							hash[id] = self.metaparser._getFieldOptionsNumber(uid, page_id, field_id);

						} //asdefault
						else if (id == "asdefault") {
							record.push("N");
							hash[id] = "N";
						} //asdefault
						else {
							record.push("");
							hash[id] = "";
						}
						//console.log( id + " -------------  " + hash[ id ])
					}
				});
				
				hash["use_library"] =  hash["use_library"] || 0;
				hash["library_field_id"] =  hash["library_field_id"] || 0;

				var optionJSON = {
					type: self._convertLibraryFieldTypetoDhtmlxType(hash.type),
					/* for checkbox and radio */
					type_standard: hash.type,
					/* for checkbox and radio */
					name: hash["name"],
					/* for checkbox and radio */
					label: hash["label"],
					/* for checkbox and radio */
					/**/
					value: hash["value"],
					caption: hash["caption"],
					className: hash["className"],
					text: text,
					/* for checkbox, radio, combo and Multiselect */
					/**/
					//selected : asdefault,  /* combo and Multiselect */
					//checked : asdefault,  /* for checkbox and radio */
					tooltip: "",
					/* for checkbox and radio */
					required: "0",
					validate: "",
					mask_to_use: hash["mask_to_use"],
					asdefault: hash["asdefault"],
					field_id: field_id,
					option_id: hash["option_id"],
					index: hash["index"],
					use_library: hash["use_library"],
					library_field_id: hash["library_field_id"],
					/* for checkbox, radio, combo and Multiselect */
					data: record /* for options grid */
				};

				//console.log(">>>>>>>>>>>>>>>>")
				//console.log(hash[ "bind_library_field" ]);
				if (typeof hash["bind_library_field"] !== 'undefined') {
					optionJSON["bind_library_field"] = hash["bind_library_field"];
				}

				var ftype = self._convertLibraryFieldTypetoDhtmlxType(hash.type);
				if (ftype == "checkbox" || ftype == "radio" || ftype == "combo" || ftype == "multiselect" || ftype == "select")
					optionJSON["value"] = text;
				else
					optionJSON["value"] = hash["value"];

				if (optionJSON.type == "") //if simple option, set the 'selected' property
					if (hash["asdefault"]) optionJSON["selected"] = hash["asdefault"];
					else //if valid form element, set the 'checked' property ( valid for checkbox and radio )
				if (hash["asdefault"]) optionJSON["checked"] = hash["asdefault"];

				if (typeof hash["asdefault"] === 'undefined')
					optionJSON["asdefault"] = "N";

				if (hash.type == "A") // if textarea, set the 'rows' property
				{
					optionJSON["rows"] = 4;
					optionJSON["style"] = "width:190px;"
				}

				if (hash.tooltip)
					if (hash.tooltip.length > 0) {
						optionJSON["tooltip"] = hash.tooltip;
						optionJSON["note"] = "{ text: '" + hash.tooltip + "'}";
						optionJSON["info"] = 'true';
					}
					else {
						optionJSON["note"] = "";
						optionJSON["info"] = 'false';
					}

					// for backward compatibility	
				optionJSON["optionname"] = text;
				optionJSON["FieldOptionSeq"] = optionJSON["index"];

				//if (optionJSON.type == "container")
				//	delete optionJSON["label"];

				//console.log( optionJSON );
				
				if( optionJSON["value"] == "" && text.length > 0 )
					optionJSON["value"] = text;
					
				if( optionJSON["type"] == "calendar" )
					if( CAIRS.isValidDate( optionJSON["value"]) )
						optionJSON["value"] = optionJSON["value"];
					else
						optionJSON["value"] = "";

				self.data._putOptionOnMemory(uid, self.selected_page[uid], field_id, optionJSON, function (option_id)
				{
				
					if (self.grid_field_propertie_options[uid])
						self.grid_field_propertie_options[uid].addRow(option_id, record);
					self.preview._startPreview(uid);
					if (callBack) callBack();
				});

			}
			else {
				//console.log("null or empty");
				return;
			}
		}
		else {
			//console.log("undefined");
			return;
		}
	}



	,
	/**
	 * Description
	 * @method handleInputName
	 * @param {} uid
	 * @param {} name
	 * @param {} isChild
	 * @return
	 */
	handleInputName: function (uid, name, isChild) {
		var self = this;
		try {
			var strFinal = "";
			name = name.replace(/ /gi, "_");
			name = name.replace(/[^a-z0-9\_]/gi, '');
			name = name.toLowerCase();
			var existing = ((new Date()).getTime());
			if (isChild)
				return "input_child_" + name + "_" + existing;
			else
				return "input_" + name + "_" + existing;
		}
		catch (e) {
			//console.log(e.stack)
		};
	}

	,
	/**
	 * Description
	 * @method handleFormName
	 * @param {} uid
	 * @param {} name
	 * @param {} form_id
	 * @return BinaryExpression
	 */
	handleFormName: function (uid, name, form_id) {

		var self = this,
			form_id = form_id || "";
		try {
			name = name.replace(/ /gi, "_");
			name = name.replace(/[^a-z0-9\_]/gi, '');
			name = name.toLowerCase();

		}
		catch (e) {
			//console.log(e.stack)
		};
		return "form_" + name;
	}

	,
	/**
	 * Description
	 * @method setPageStatusInfo
	 * @param {} uid
	 * @param {} msg
	 * @return
	 */
	setPageStatusInfo: function (uid, msg) {
		var self = this;
		document.getElementById("page_info_" + uid + "").innerHTML = msg;
		self.toolbar_form_fields[uid].setItemText("info", msg);
	}

	,
	/**
	 * Description
	 * @method _getRawUID
	 * @param {} uid
	 * @return
	 */
	_getRawUID: function (uid) {
		if (uid.toString().indexOf("_") != -1)
			return uid.split("_")[0] + "_" + uid.split("_")[1];
		else
			return uid;
	},
	/**
	 * Description
	 * @method progressOn
	 * @param {} uid
	 * @return
	 */
	progressOn: function (uid) {
		var self = this;
		try {
			self.window[uid].progressOn();
		}
		catch (e) {};

		self.layout[uid].progressOn();
	}

	,
	/**
	 * Description
	 * @method progressOff
	 * @param {} uid
	 * @return
	 */
	progressOff: function (uid) {
		var self = this;
		try {
			self.window[uid].progressOff();
		}
		catch (e) {};

		self.layout[uid].progressOff();
	}

	,
	/**
	 * Description
	 * @method progressOnForm
	 * @param {} uid
	 * @return
	 */
	progressOnForm: function (uid) {
		var self = this;
		self.window_form[uid].progressOn();
		self.layout_form[uid].progressOn();
	}

	,
	/**
	 * Description
	 * @method progressOffForm
	 * @param {} uid
	 * @return
	 */
	progressOffForm: function (uid) {
		var self = this;
		self.window_form[uid].progressOff();
		self.layout_form[uid].progressOff();
	}
	
	
	,
	/**
	 * Description
	 * @method progressOffForm
	 * @param {} uid
	 * @return
	 */
	_alternateWindows: function (uid) {
		var self = this;
		//var topmostWindow = self.window_manager.getTopmostWindow(true);
		var bottommostWindow = self.window_manager.getBottommostWindow();
		bottommostWindow.show();
		bottommostWindow.bringToTop();
		/*self.window_manager.forEachWindow( function (w)
		{
			//console.log( w );
			//console.log( arguments[0]. );
			console.log( w.getId() );
			//w.show();
			//w.bringToTop();
		});*/
	}
	
	
	

	/**
	 * Description
	 * @method init
	 * @param {} model
	 * @return
	 */
	,
	init: function (model) {
		var self = this;
		self.model = model;
	}

	,
	socket: null

	/**
	 * Description
	 * @method start
	 * @param {} configuration
	 * @return
	 */
	,
	start: function (configuration) {
		var self = this;

		CAIRS.init();

		self.uid = "FormBuilder_" + ((new Date()).getTime());
		if (CAIRS.isNumber(configuration.form_id))
			self.uid = configuration.form_id;

			
		if ((typeof configuration.username === 'undefined') || (configuration.username.length === 0)) {
			dhtmlx.message({
				type: "error",
				text: "username is missing"
			});
			return;
		}

		configuration["form_id"] = null;

		window.dhx_globalImgPath = self.dhtmlx_codebase_path + "imgs/";
		dhtmlx.skin = self.model.globalSkin || "dhx_skyblue";

		configuration["icons_path"] = "icons/";

		self.configuration[self.uid] = configuration;

		self.model.globalImgPath = self.dhtmlx_codebase_path + "imgs/";
		self.model.conf_window.image_path = self.icons_path;
		self.model.conf_toolbar.icon_path = self.icons_path + "32px/";
		self.model.conf_toolbar_taskbar.icon_path = self.icons_path;
		
		self.model.conf_toolbar_form_pages.icon_path = self.icons_path;
		self.model.conf_toolbar_form_fields.icon_path = self.icons_path;
		self.model.conf_toolbar_field_propertie.icon_path = self.icons_path + "32px/";
		self.model.conf_toolbar_tags.icon_path = self.icons_path;
		self.model.conf_toolbar_grid_field_propertie_options.icon_path = self.icons_path;
		self.model.conf_window_form.image_path = self.icons_path;
		self.model.conf_toolbar_form.icon_path = self.icons_path + "32px/";
		self.model.conf_toolbar_form_preview.icon_path = self.icons_path + "32px/";
		self.model.conf_tabbar_form.image_path = self.model.globalImgPath;
		
		
		
		self.model.conf_toolbar_grid_library_fields.icon_path = self.icons_path;
		
		self.model.conf_window_entries_toolbar.icon_path = self.icons_path + "32px/";
		self.model.conf_window_entries_tabbar.image_path = self.icons_path;
		self.model.conf_window_entries.image_path = self.icons_path;
		
		//self.model.conf_form_context_menu.icon_path = self.icons_path;
					
		self.model.conf_window.left = CAIRS.getPagePosition( "x", self.model.conf_window.width, self.model.conf_window.height );
		self.model.conf_window.top = 50;
		
		
		self.model.conf_window_form.left = CAIRS.getPagePosition( "x", self.model.conf_window_form.width, self.model.conf_window_form.height );
		self.model.conf_window_form.top = 50;
		

		self.data_store[self.uid] = [];
		self.configuration[self.uid].page_layout = "S";

		if (typeof self.configuration[self.uid].container === 'undefined') {
			self._window(self.uid);
		}
		self._layout(self.uid);

		self.progressOn(self.uid);
		
		var internalDependencies = [
			self.application_path + "controller/classes/data.js"
			,self.application_path + "controller/classes/preview.js"
			,self.application_path + "controller/classes/metaparser.js"
			,self.application_path + "controller/classes/rules.js"
			
			// standalone components wrapper
			,self.application_path + "controller/classes/entries.js"
			,self.application_path + "controller/classes/signature_wrapper.js"
			,self.application_path + "controller/classes/library_fieldmaker_wrapper.js"
			
			,self.application_path + "controller/classes/phone_wrapper.js"
			,self.application_path + "controller/classes/background_wrapper.js"
			,self.application_path + "controller/classes/email_wrapper.js"
			,self.application_path + "controller/classes/address_wrapper.js"
		];
		// add ?uistring=xxxxxxx to force to always load the file again
		CAIRS.environment = "dev";
		/* load files dependencies */	
		CAIRS.onDemand.load(internalDependencies, function ()
		{
			CAIRS.MAP.API.authorize({
				username: configuration.username,
				database: configuration.database,
				agency_id: configuration.agency_id,
				onSuccess: function (request)
				{
					self._setStatus("Form Maker user is authorized.");
					self._setStatusDataTransfer("credential received");
					self._setStatusUser("Logged as " + CAIRS.MAP.API.user, true);
	
					CAIRS.MAP.API.showCountDown("expiration_info");
	
					self.data._loadDataStore(self.uid, function ()
					{
						self.progressOff(self.uid);
	
						self._setStatusDataTransfer("Datastore 100% loaded");
	
						self._toolbar(self.uid);
						
						self._grid(self.uid);
						
						self.data._feedGrid(self.uid);
						
						self._toolbar_taskbar(self.uid);
	
						self._setStatus("Form Maker is ready.");
	
						CAIRS.shortcut.add("Shift+C",function () {
							self._mountFormBuilderScreen(self.uid);
						});
						
						CAIRS.shortcut.add("Ctrl+Shift+X",function () {
							self._alternateWindows();
						});
					});
				},
				onFail: function (request) {
					//console.log(request);
					//console.log("not authorized");
					self.progressOff(self.uid);
					self._setStatusDataTransfer(
						"credential sent");
					self._setStatusUser(
						"not authorized", false
					);
					self._setStatusError(
						"access denied");
					self._setStatus(
						"The user was not authorized to use MAP API. Form Maker will not start."
					);
				}
			});
		});
	}
}