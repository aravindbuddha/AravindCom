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

	,
	window: [],
	window_print: [],
	layout: [],
	toolbar: [],
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
	form_preview: []

	,
	grid_group_fields: []

	,
	dataLoaded_tree_form_library_field_category: [],
	dataLoaded_tags_form: []

	,
	pages: [],
	selected_page: [],
	is_grid_pages: []

	,
	form_default_width: 720

	,
	configuration: []
	
	,
	application_path : "https://cdmap03.myadoptionportal.com/modules/FormBuilder/"
	
	,
	dhtmlx_codebase_path : "https://cdmap03.myadoptionportal.com/modules/codebase3.6/"
	
	,
	icons_path : "https://cdmap03.myadoptionportal.com/modules/FormBuilder/icons/"
	
	
	,
	signature_application_url : "https://cdmap03.myadoptionportal.com/modules/FormBuilder/js/signature_component/"

	,
	signature_controls: []

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
			return true;
		});

		self.status_bar[uid] = self.window[uid].attachStatusBar();
		self.status_bar[uid].setText("<div id='status_info'>Initializing Form Maker</div><div id='expiration_info' class='data_transfer_info'></div><div id='user_info'><img id='user_info_status' src='" + self.icons_path + "offline.png' /> <span>Not authorized yet</span></div><div id='data_transfer_info'> no data transferred</div><div id='socket_info' class='data_transfer_info'>socket: disconnected</div><div id='errors_info'>no errors</div>");
	}

	,
	/**
	 * Description
	 * @method _window_print
	 * @param {} uid
	 * @return
	 */
	_window_print: function (uid) {
		var self = this;
		if (self.window_manager === null)
			self._window_manager();

		if (self.window_manager.isWindow(self.appName + "_print_" + uid)) {
			self.window_print[uid].show();
			self.window_print[uid].bringToTop();
			//self.window_print[ uid ].centerOnScreen();
			return;
		}

		self.window_print[uid] = self.window_manager.createWindow(self.appName + "_print_" + uid, self.model.conf_window.left + 10, self.model.conf_window.top + 10, self.model.conf_window_print.width, self.model.conf_window_print.height);
		self.window_print[uid].setText(self.model.conf_window_print.title);
		self.window_print[uid].setIcon(self.model.conf_window_print.icon, self.model.conf_window_print.icon_dis);
		//self.window_print[ uid ].centerOnScreen();
		self.window_print[uid].denyPark();

		self.window_print[uid].attachEvent("onClose", function (win) {
			win.hide();
			//self.close_window( uid );
		});

		self._toolbar_print(uid);

		self.window_print[uid].attachStatusBar();

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
		self.status_bar_paging[uid].setText("<div id='recinfoArea'></div>");
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
				self._deleteForm(uid);
			}
			else if (id == "print_form_list") {
				//self._getFormsList( uid );
				self.grid[uid].toPDF('processors/dhx_pdf/generate.php');
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

		//self.grid[ uid ].enablePaging(false, 100, 10, "recinfoArea", true);

		//self.grid[ uid ].setPagingSkin("toolbar", "dhx_skyblue");

		self.grid[uid].init();

		self.grid[uid].enableHeaderMenu();

		var agencies_combo = self.grid[uid].getCombo(self.grid[uid].getColIndexById("form_agency_id"));
		self.data_store[uid]["agencies"].forEach(function (agency, index, array_) {
			agencies_combo.put(agency.agency_id, agency.agency_name);
		});

		//self.grid[ uid ].attachHeader("#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan");
		self.grid[uid].attachHeader("#rspan,<input id='input_search_formlabel' type='text' style='width: 99%; border:1px solid gray;' onClick='(arguments[0]||window.event).cancelBubble=true;' onKeyUp='FormBuilder._feedGrid( \"" + uid + "\" )'>,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan");

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
		});

		self.grid[uid].attachEvent("onRowDblClicked", function (id, ind) {
			self._mountFormBuilderScreen(uid, id);
		});

		self.grid[uid].attachEvent("onRowDblClicked", function (id, ind) {
			self._mountFormBuilderScreen(uid, id);
		});

		self.grid[uid].attachEvent("onKeyPress", function (code, cFlag, sFlag) {
			if (code == 46) {
				self._deleteForm(uid);
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
	 * @method _feedGrid
	 * @param {} uid
	 * @param {} objOrder
	 * @return
	 */
	_feedGrid: function (uid, objOrder) {
		var self = this,
			objFilter = {},
			objOrder = objOrder || {};

		self.grid[uid].clearAll();
		self.toolbar[uid].disableItem("new_form");
		self.toolbar[uid].disableItem("delete_form");

		if (document.querySelector("#input_search_formlabel").value != "")
			objFilter["formlabel"] = document.querySelector("#input_search_formlabel").value;

		//if( document.querySelector("#input_search_formname").value != "" )
		//	objFilter[ "formname" ] = document.querySelector("#input_search_formname").value;

		//if( document.querySelector("#input_search_formtext").value != "" )
		//	objFilter[ "formtext" ] = document.querySelector("#input_search_formtext").value;

		var gridURL = CAIRS.MAP.API.getMappedURL({
			resource: "/dhtmlx/grid/feed", // mandatory
			responseType: "json", // not mandatory, default json
			params: "table_name=formmaker_properties&primary_key=form_id&columns=" + self.model.conf_grid.ids + "&filter=" + JSON.stringify(objFilter) + "&order=" + JSON.stringify(objOrder) // mandatory for this API End Point ( /dhtmlx/grid/feed.json )
		});

		self._setStatusDataTransfer("requesting forms data", true);
		self.grid[uid].load(gridURL, function () {
			self._setStatusDataTransfer("forms available");
			self.progressOff(uid);
			self.toolbar[uid].enableItem("new_form");
		}, "json");
	}

	/* window create form*/

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
			"window_FormBuilder_formcreator_" + uid + "_" + form_id, self.model.conf_window_form.left + 10, self.model.conf_window_form.top + 10, self.model.conf_window_form.width, self.model.conf_window_form.height
		);

		if (form_id == -1)
			self.window_form[uid].setText(self.model.conf_window_form.title);
		else
			self.window_form[uid].setText("Edit form");

		self.window_form[uid].setIcon(
			self.model.conf_window_form.icon, self.model.conf_window_form.icon_dis
		);
		self.window_form[uid].attachEvent("onClose", function (win) {
			dhtmlx.skin = "dhx_skyblue";
			self.model.conf_form_preview.template = [self.model.conf_form_preview.defaultRootProperties];
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
			self.tabbar_form[uid].addTab("form_layout", "Form layout", "200px");
			self.tabbar_form[uid].addTab("form_preview", "Preview", "200px");

			self.tabbar_form[uid].setTabActive("form_properties");
			self.tabbar_form[uid].attachEvent("onSelect", function (idd, last_id) {
				dhtmlx.skin = "dhx_skyblue";
				if (idd == "form_properties") {
					return true;
				}
				else {
					form_id = self.form_properties[uid].getItemValue("form_id");
					if (form_id > 0) {
						if (idd == "form_preview") self._startPreview(uid);
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

									self._save_form(uid, function () {
										if (idd == "form_preview") self._startPreview(uid);
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
	 * Description
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
				self._save_form(uid, function ( form_id ) {
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
								swfUrl = self._getPageField(uid, field.page_id, field.field_id)["swfUrl"];
								self._getPageField(uid, field.page_id, field.field_id)["swfUrl"] = '';
								url = self._getPageField(uid, field.page_id, field.field_id)["url"];
								self._getPageField(uid, field.page_id, field.field_id)["url"] = '';
							}
						}// bug stringify
					});
					
					CAIRS.MAP.API.update({
						resource: "/forms/" + form_id + "/metadata" // mandatory
						,
						format: "json" // json, yaml, xml. Default: json. Not mandatory
						,
						payload: "agency_id=" + self.configuration[self._getRawUID(uid)].agency_id + "&template=" + (JSON.stringify( self.model.conf_form_preview.template )) // mandatory for PUT and POST
						,
						/**
						 * Description
						 * @method onSuccess
						 * @param {} request
						 * @return
						 */
						onSuccess: function (request) // not mandatory
						{
							var json = eval('(' + request.response + ')');
							dhtmlx.message({
								type: "error",
								text: json.response
							});
							
							CAIRS.dhtmlx.formFields[uid + "_form_preview"].forEach(function (field, index, array) {
								if (field.type == "upload") {
									if( field.option_id ) // if this field is child field
									{
										self._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["swfUrl"] = swfUrl;//swfUrl
										self._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["url"] = url;//swfUrl
									}
									else
									{
										self._getPageField(uid, field.page_id, field.field_id)["swfUrl"] = swfUrl;
										self._getPageField(uid, field.page_id, field.field_id)["url"] = url;
									}
								}// bug stringify
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
							var json = eval('(' + request.response + ')');
							dhtmlx.message({
								type: "error",
								text: json.response
							});
							self.progressOffForm(uid);
						}
					});
				}, form_id);
			}
			else if (id == "generate_form")
			{
				console.log( JSON.stringify(self.model.conf_form_preview.template) );
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
						var json = eval('(' + request.response + ')');
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
						var json = eval('(' + request.response + ')');
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

			self._feedGrid_form_fields(uid, id);
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
			self._reOrderPages(uid);
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
				var field = self._getPageField(uid, self.selected_page[uid], field_id);
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

				self._deletePageField(uid, self.selected_page[uid], field_id, true);

				var type_MAP_standard = field["type_standard"];
				var type_DHTMLX_standard = field["type"];

				field["type_standard"] = type_DHTMLX_standard;
				field["type"] = type_MAP_standard;
				field["page_id"] = page_id_target;
				field["index"] = self._getPageFieldsNumber(uid, page_id_target);
				field["grouping"] = field["index"];

				self.progressOnForm(uid);

				self._putFieldOnMemory(uid, page_id_target, field, function () {
					var field = self._getPageField(uid, page_id_target, field_id);
					field["page_id"] = page_id_target;
					field["field_id"] = field_id;

					delete field["type"];
					delete field["type_standard"];

					self.progressOnForm(uid);

					self._editFieldOfAPage(uid, field, function () {
						self._getPageField(uid, page_id_target, field_id)["type"] = type_DHTMLX_standard;

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
								var json = eval('(' + request.response + ')');
								if (json.status == "success") {
									self._setStatusDataTransferForm(uid, "options(" + allOptionsID.join() + ") updated");
									self._getPageField(uid, page_id_target, field_id)["list"] = old_list;
									self._getPageField(uid, page_id_target, field_id)["options"] = old_options;
									self._startPreview(uid);
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
								var json = eval('(' + request.response + ')');
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
						//self._reOrderPageFields( uid );
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
				self._deletePage(uid);
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
				self._deletePage(uid);
			}
			else if (id == "undock_form_preview") {
				self._startPreview(uid);
				self.layout_form_preview[uid].cells("a").undock();
			}
		});

		self._pop_up_form_pages(uid, form_id);
	}

	,
	pop_up_form_pages: [],
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
	form_form_pages: [],
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
					self._addPage(hash, function () {
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
					self._editPage(hash, function () {
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
				self.tabbar_form_create_fields[uid].setTabActive("add_field");

				var field_id = self.grid_form_fields[uid].getSelectedRowId();
				self._deletePageField(uid, self.selected_page[uid], field_id);
			}
			if (id == "reorder_fields") {
				var page_id = self.grid_pages[uid].getSelectedRowId();
				self._feedGrid_form_fieldsNormalize(uid, page_id);
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
			self._reOrderPageFields(uid);
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
			if (self.selected_page[uid] == null) {
				dhtmlx.message({
					type: "error",
					text: "You need to select a page before adding fields."
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
						self._addGroupOfFieldsToPage(uid, sId);
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

			self._feedGrid_grid_field_propertie_options(uid, self.grid_pages[uid].getSelectedRowId(), id);
		});

		self.grid_form_fields[uid].attachEvent("onEditCell", function (stage, rId, cInd, nValue, oValue) {

			self._layout_field_propertie(uid);
			self._form_field_propertie(uid, rId);
			self._toolbar_grid_field_propertie_options(uid);
			self._grid_field_propertie_options(uid);
			self.toolbar_form_fields[uid].enableItem("edit_field");
			self.toolbar_form_fields[uid].enableItem("delete_field");

			return true;
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
	status_bar_dataView_type_of_fields: [],
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

		self.status_bar_dataView_type_of_fields[uid] = self.tabbar_form_add_field[uid].cells("predefined_fields").attachStatusBar();
		self.status_bar_dataView_type_of_fields[uid].setText("<div class='red_warning'> <img src ='" + self.model.conf_window.image_path + "warning4.png'> Click on a item and drag to the <b>'Fields of the page'</b> grid .</div>");
	}

	,
	status_bar_form_custom_field: [],
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
	layout_field_propertie: [],
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
		var self = this
		self.form_field_propertie[uid] = self.layout_field_propertie[uid].cells("a").attachForm(self.model.conf_form_field_propertie.template);

		self.form_field_propertie[uid].hideItem("price_aux");

		self.tabbar_form_create_fields[uid].showTab("field_properties");
		self.form_field_propertie[uid].setItemValue("field_id", field_id);

		var hash = {};

		self.model.conf_grid_fields.ids.split(",").forEach(function (id, index, array) {
			var colIndex = self.grid_form_fields[uid].getColIndexById(id);

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

		if (self.grid_form_fields[uid].cells(field_id, self.grid_form_fields[uid].getColIndexById("use_library")).getValue() == 0)
			self.form_field_propertie[uid].uncheckItem("use_library"); // for other items
		else
			self.form_field_propertie[uid].checkItem("use_library"); // for other items

		//console.log( self.grid_form_fields[ uid ].cells(field_id, self.grid_form_fields[ uid ].getColIndexById( "use_library" ) ).getValue() );

		var rules = self.grid_form_fields[uid].cells(field_id, self.grid_form_fields[uid].getColIndexById("validate")).getValue();
		rules = rules.substring(0, rules.length - 3)
		rules.split("-,-").forEach(function (rule, index, array) {
			self.form_field_propertie[uid].checkItem(rule);
		});

		CAIRS.dhtmlx.prepareForm(uid + "_form_field_propertie", self.model.conf_form_field_propertie, self.form_field_propertie[uid]);

		self.form_field_propertie[uid].attachEvent("onChange", function (id, value) {
			//self._checkFormStatus( uid );
			if (id == "type") {
				//console.log( value );
				if (value == "Z" || value == "W" || value == "r" || value == "q" || value == "M" || value == "RG" || value == "D") {
					self.layout_field_propertie[uid].cells("b").expand();
				}
				else {
					self.layout_field_propertie[uid].cells("b").collapse();
				}

				if (value == "I") {
					self.form_field_propertie[uid].showItem("price_aux");
					self.form_field_propertie[uid].setFormData({
						mask_to_use: "currency"
					});
				}
				else {
					self.form_field_propertie[uid].hideItem("price_aux");
					self.form_field_propertie[uid].setFormData({
						mask_to_use: ""
					});
				}

				self.form_field_propertie[uid].setItemValue("type_standard", value);
			}
			else if (id == "label") {

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
			self.form_field_propertie[uid].showItem("price_aux");
			self.form_field_propertie[uid].setFormData({
				mask_to_use: "currency"
			});
		}
		else {
			self.form_field_propertie[uid].hideItem("price_aux");
			self.form_field_propertie[uid].setFormData({
				mask_to_use: ""
			});
		}
		//console.log(self.form_field_propertie[ uid ].getFormData());

		self.tabbar_form_create_fields[uid].setTabActive("field_properties");
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

					//console.log( hash );

					self._editFieldOfAPage(uid, hash, function () {
						self.toolbar_field_propertie[uid].enableItem("save_field");
					});

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

		if (typeof self.toolbar_grid_field_propertie_options[uid] !== 'undefined') {
			//return;
		}

		self.toolbar_grid_field_propertie_options[uid] = self.layout_field_propertie[uid].cells("b").attachToolbar(self.model.conf_toolbar_grid_field_propertie_options);

		self.toolbar_grid_field_propertie_options[uid].attachEvent("onClick", function (id) {
			if (id == "delete") {
				self._deleteFieldOption(uid, self.selected_page[uid], self.grid_form_fields[uid].getSelectedRowId(), self.grid_field_propertie_options[uid].getSelectedRowId());
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

			var field = self._getPageField(uid, self.selected_page[uid], field_id);
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
					self._editOptionOfAField(uid, hash, function () {
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
	grid_field_propertie_options: [],
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

				self._reOrderFieldOptions(uid);
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

		self.grid_field_propertie_options[uid].attachEvent("onDrag", function (sId, tId, sObj, tObj, sInd, tInd) {

			if (sObj == tObj) {
				if (typeof tId === 'undefined') {
					//console.log("onDrag " + ( sObj == tObj ));
					return false;
				}
				return true;
			}
			else {
				return false;
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
							self._startDataTree(uid, function () {
								self._tree_form_library_field_category(uid, form_id);
								self.dataLoaded_tree_form_library_field_category[uid] = true;
								self.progressOffForm(uid);
							});
						}
					}
					else if (idd == "search_fields_tags") {
						if (self.dataLoaded_tags_form[uid] == false) {
							self.progressOnForm(uid);
							self._startDataTags(uid, function () {
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
		
		self.grid_library_fields[uid].attachHeader("#rspan,#rspan,#rspan,#rspan,<div style='padding-right:3px'><input type='text' type='text' style='width: 99%; border:1px solid gray;' onClick='(arguments[0]||window.event).cancelBubble=true;' onKeyUp='FormBuilder._feedGrid( \"" + uid + "\" )' id='search_label'></div>,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan");
		
		// #rspan,#rspan,#rspan,#rspan,<div style='padding-right:3px'><input type='text' id='search_label'></div>,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan,#rspan

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
		}, "json");
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
				self._feedGrid_library_fields(uid, selected_tags, true);
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

	,
	/**
	 * Description
	 * @method _feedGrid_group_fields
	 * @param {} uid
	 * @return
	 */
	_feedGrid_group_fields: function (uid) {
		var self = this;
		self.grid_group_fields[uid].clearAll();
		var gridURL = CAIRS.MAP.API.getMappedURL({
			resource: "/LibraryFields/groups", // mandatory
			responseType: "json", // not mandatory, default json
			params: "columns=" + self.model.conf_grid_group_fields.ids + "" // not mandatory, default none
		});
		self.grid_group_fields[uid].load(gridURL, function () {

		}, "json");
	}

	,
	/**
	 * Description
	 * @method _feedGrid_form_fieldsNormalize
	 * @param {} uid
	 * @param {} page_id
	 * @return
	 */
	_feedGrid_form_fieldsNormalize: function (uid, page_id) {
		var self = this;

		self.grid_form_fields[uid].clearAll();

		self.pages[uid][page_id].list[0].list.sort(function (a, b) {
			return a.index - b.index;
		});

		for (var x = 0; x < self.pages[uid][page_id].list[0].list.length; x++) {
			var field = self.pages[uid][page_id].list[0].list[x];
			self.pages[uid][page_id].list[0].list[x].index = x;
			self.pages[uid][page_id].list[0].list[x].data[13] = x;
			self.grid_form_fields[uid].addRow(field.field_id, self.pages[uid][page_id].list[0].list[x].data, x);
		}

		if (self.pages[uid][page_id].page_layout == "D")
			for (var x = 0; x < self.pages[uid][page_id].list[2].list.length; x++) {
				var field = self.pages[uid][page_id].list[2].list[x];
				self.pages[uid][page_id].list[2].list[x].index = x;
				self.pages[uid][page_id].list[2].list[x].data[13] = x;
				self.grid_form_fields[uid].addRow(field.field_id, field.data, x);
			}

		self._reOrderPageFields(uid);
	}

	,
	/**
	 * Description
	 * @method _feedGrid_form_fields
	 * @param {} uid
	 * @param {} page_id
	 * @return
	 */
	_feedGrid_form_fields: function (uid, page_id) {
		var self = this;

		self.grid_form_fields[uid].clearAll();

		self.pages[uid][page_id].list[0].list.sort(function (a, b) {
			return a.index - b.index;

		});

		for (var x = 0; x < self.pages[uid][page_id].list[0].list.length; x++) {
			var field = self.pages[uid][page_id].list[0].list[x];
			//console.log( field );
			self.pages[uid][page_id].list[0].list[x].data[self.grid_form_fields[uid].getColIndexById("index")] = field.index;
			self.pages[uid][page_id].list[0].list[x].data[self.grid_form_fields[uid].getColIndexById("mask_to_use")] = field.mask_to_use;
			self.pages[uid][page_id].list[0].list[x].data[self.grid_form_fields[uid].getColIndexById("validate")] = field.validate;

			console.log( field );
			//console.log( field.field_id );
			//console.log( self.pages[ uid ][ page_id ].list[0].list[x].data );
			//console.log( field.index );
			//console.log(  );

			self.grid_form_fields[uid].addRow(field.field_id, field.data, field.index);
		}

		//console.log( self.pages[ uid ][ page_id ].page_layout );

		if (self.pages[uid][page_id].page_layout == "D") {
			for (var x = 0; x < self.pages[uid][page_id].list[2].list.length; x++) {
				var field = self.pages[uid][page_id].list[2].list[x];
				//console.log( field );
				self.pages[uid][page_id].list[2].list[x].data[self.grid_form_fields[uid].getColIndexById("index")] = field.index;
				self.pages[uid][page_id].list[2].list[x].data[self.grid_form_fields[uid].getColIndexById("mask_to_use")] = field.mask_to_use;
				self.pages[uid][page_id].list[2].list[x].data[self.grid_form_fields[uid].getColIndexById("validate")] = field.validate;
				self.grid_form_fields[uid].addRow(field.field_id, field.data, field.index);
			}
		}
	}

	,
	/**
	 * Description
	 * @method _feedGrid_grid_field_propertie_options
	 * @param {} uid
	 * @param {} page_id
	 * @param {} field_id
	 * @return
	 */
	_feedGrid_grid_field_propertie_options: function (uid, page_id, field_id) {
		var self = this;

		//console.log( field_id );

		self.grid_field_propertie_options[uid].clearAll();

		self._getPageColumnList(uid, page_id, "first").forEach(function (parentField, index, array) {
			if (self._getPageColumnList(uid, page_id, "first")[index].list)
				self._getPageColumnList(uid, page_id, "first")[index].list.sort(function (a, b) {
					return a.index - b.index;
				});
			if (self._getPageColumnList(uid, page_id, "first")[index].options)
				self._getPageColumnList(uid, page_id, "first")[index].options.sort(function (a, b) {
					return a.index - b.index;
				});
		});

		if (self.pages[uid][page_id].page_layout == "D") {
			self._getPageColumnList(uid, page_id, "second").forEach(function (parentField, index, array) {
				if (self._getPageColumnList(uid, page_id, "second")[index].list)
					self._getPageColumnList(uid, page_id, "second")[index].list.sort(function (a, b) {
						return a.index - b.index;
					});
				if (self._getPageColumnList(uid, page_id, "second")[index].options)
					self._getPageColumnList(uid, page_id, "second")[index].options.sort(function (a, b) {
						return a.index - b.index;
					});
			});
		}

		// iterates over fields of the page on column 1
		self._getPageColumnList(uid, page_id, "first").forEach(function (parentField, parentIndex, array) {
			// return only options of selected field of form
			if (parentField.field_id == field_id) {
				//console.log( "parentField.field_id " + parentField.field_id );
				//console.log( parentField );

				if (parentField.type == "label" || parentField.type == "fieldset" || parentField.type == "radio" || parentField.type == "checkbox") { // lets read the list property of the field
					//console.log("reading list array");
					// field list
					/* for nested group fields and radio matrix */
					self._getPageColumnList(uid, page_id, "first")[parentIndex].list.forEach(function (childField, childIndex, array) {
						var field = childField;
						//console.log( "childField.field_id " + field.field_id );
						//console.log(  self._getPageColumnList( uid, page_id, "first" )[parentIndex] );
						//console.log( self._getPageColumnList( uid, page_id, "first" )[parentIndex].list[childIndex] );

						//console.log( self._getPageColumnList( uid, page_id, "first" )[parentIndex].list[childIndex].data );
						//console.log( field.index );

						//self._getPageColumnList( uid, page_id, "first" )[parentIndex].data[13] = field.index;

						//console.log( "field.data[13] " + self._getPageColumnList( uid, page_id, "first" )[parentIndex].data[13] );
						//console.log( "field.data " + self._getPageColumnList( uid, page_id, "first" )[parentIndex].list[childIndex].data );
						if (self._getPageColumnList(uid, page_id, "first")[parentIndex].list[childIndex].type != "settings")
							self.grid_field_propertie_options[uid].addRow(field.option_id, self._getPageColumnList(uid, page_id, "first")[parentIndex].list[childIndex].data, field.index);
					});
				}
				else if (parentField.type == "multiselect" || parentField.type == "combo" || parentField.type == "select") { // lets read the options property
					//console.log("reading options array");
					// field options
					/* combo and Multiselect */
					self._getPageColumnList(uid, page_id, "first")[parentIndex].options.forEach(function (childField, childIndex, array) {
						var field = childField;
						if (self._getPageColumnList(uid, page_id, "first")[parentIndex].options[childIndex].type != "settings")
							self.grid_field_propertie_options[uid].addRow(field.option_id, self._getPageColumnList(uid, page_id, "first")[parentIndex].options[childIndex].data, field.index);
					});
				}
			}
		});

		// if this page has 2 columns
		if (self.pages[uid][page_id].page_layout == "D") {
			// iterates over fields of the page on column 2
			self._getPageColumnList(uid, page_id, "second").forEach(function (parentField, parentIndex, array) {
				// return only options of selected field of form
				if (parentField.field_id == field_id) {
					//console.log( "parentField.field_id " + parentField.field_id );
					//console.log( parentField );
					if (parentField.type == "label" || parentField.type == "fieldset" || parentField.type == "radio" || parentField.type == "checkbox") { // lets read the list property of the field
						//console.log("reading list array");
						// field list
						/* for nested group fields and radio matrix */
						self._getPageColumnList(uid, page_id, "second")[parentIndex].list.forEach(function (childField, childIndex, array) {
							var field = childField;
							//console.log( self._getPageColumnList( uid, page_id, "second" )[parentIndex].list );
							//console.log( self._getPageColumnList( uid, page_id, "second" )[parentIndex].list[childIndex].type == "settings" );
							//console.log( self._getPageColumnList( uid, page_id, "second" )[parentIndex].list[childIndex].data );
							if (self._getPageColumnList(uid, page_id, "second")[parentIndex].list[childIndex].type != "settings")
								self.grid_field_propertie_options[uid].addRow(field.option_id, self._getPageColumnList(uid, page_id, "second")[parentIndex].list[childIndex].data, field.index);
						});
					}
					else if (parentField.type == "multiselect" || parentField.type == "combo" || parentField.type == "select") { // lets read the options property
						//console.log("reading options array");
						// field options
						/* combo and Multiselect */
						self._getPageColumnList(uid, page_id, "second")[parentIndex].options.forEach(function (childField, childIndex, array) {
							var field = childField;
							if (self._getPageColumnList(uid, page_id, "second")[parentIndex].options[childIndex].type != "settings")
								self.grid_field_propertie_options[uid].addRow(field.option_id, self._getPageColumnList(uid, page_id, "second")[parentIndex].options[childIndex].data, field.index);
						});
					}
				}
			});
		}

	}

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

		form_ids.toString().split(",").forEach(function (form_id, index, array) {
			try {

				form_id = parseInt(form_id);

				uid = uid + "_" + form_id;

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

				self._grid_group_fields(uid, form_id);
				self._toolbar_form_pages(uid, form_id);
				self._feedGrid_library_fields(uid, form_id);
				self._feedGrid_group_fields(uid, form_id);

				self._toolbar_field_propertie(uid, form_id);
				self._toolbar_form(uid, form_id);

				//self.layout_form_preview[ uid ].cells("a").dock();
				self._layout_form_preview(uid);
				self._toolbar_form_preview(uid);

				dhtmlx.compat("dnd");

				self._grid_form_fields(uid, form_id);
				self._toolbar_form_fields(uid, form_id);
				self._tabbar_form_add_field(uid, form_id);
				self._dataView_type_of_fields(uid, form_id);
				self._form_custom_field(uid, form_id);
				self._toolbar_custom_field(uid, form_id);

				if (form_id > 0) {
					self._readFormData(uid, form_id);
				}

			}
			catch (e) {
				//console.log(e.stack);
			}
		});
	}

	////////////////////////////////////////////////////////////////////////////
	,
	/**
	 * Description
	 * @method _startPreview
	 * @param {} uid
	 * @return
	 */
	_startPreviewxxxx: function ( uid ) {
		self = this;
		
			/*  you dont need to set those properties. check for defaults */
			/*
				set FormViewer Path
				NOT MANDATORY, default: https://cdmap03.myadoptionportal.com/modules/FormBuilder/ 
			*/
			FormViewer.application_path = self.application_path;
			/*
				set dhtmlx 3.6 codebase path
				NOT MANDATORY, default https://cdmap03.myadoptionportal.com/modules/codebase3.6/
			*/
			FormViewer.dhtmlx_codebase_path = self.dhtmlx_codebase_path;
			/*
				set Signature Component Path
				NOT MANDATORY, default: https://cdmap03.myadoptionportal.com/modules/FormViewer/js/signature_component/
			*/
			FormViewer.signature_application_url = self.signature_application_url;
			/*
				set Icons path
				NOT MANDATORY, default: https://cdmap03.myadoptionportal.com/modules/FormBuilder/icons/
			*/
			FormViewer.icons_path = self.icons_path;
			/* xxx END set some component's properties xxx */
			
			
			/* xxx BEGIN Component Call xxx */
			FormViewer.start( {
				form_id : self.form_properties[uid].getItemValue("form_id")
				,skin : self.form_properties[uid].getItemValue("skin")
				,container : self.tabbar_form[uid].cells("form_preview")
				,store : self.data_store[self._getRawUID(uid)]
				
				,username : "restoremleahy@adoptionassociates.net" /*MANDATORY*/ /*<?php echo $_SESSION['mapusername'];?>*/
                ,agency_id : 25 /*MANDATORY*/ // <?php echo $_SESSION['session_current_agency_id'];?>
                ,ConnID : -85771 /*MANDATORY*/ // <?php echo $_SESSION['user_Connid'];?>
                ,ConnectionId : 275138 /*MANDATORY*/
                ,database : "MAPTEST" // <?php echo $_SESSION['DBName'];?> /*NOT MANDATORY*/ //  if not provided, will use default (MAPTEST)

							
				/*SIGNATURE COMPONENT*/
                ,signature_file_path : window.location.protocol + '//' + window.location.host + '/modules/signatures/25/' /*MANDATORY*/
				,signature_file_path_abs : '/var/www/html/modules/signatures/25/' /*MANDATORY*/ //<?php echo $_SESSION['session_current_agency_id'];?>
			} );
			/* xxx END Component Call xxx */
	}
	,
	/**
	 * Description
	 * @method _startPreview
	 * @param {} uid
	 * @return
	 */
	_startPreview: function (uid) {
		var self = this;
		//console.log("starting preview");

		try {
			self.tab_pages_preview[uid].clearAll()
		}
		catch (e) {

		}
		try {
			self.form_preview[uid].unload();
			self.form_preview[uid] = null;
		}
		catch (e) {

		}

		self._tab_pages_preview(uid);
		self._form_preview(uid);
	}

	,
	formPreviewWindow: [],
	layout_form_preview: [],
	/**
	 * Description
	 * @method _layout_form_preview
	 * @param {} uid
	 * @return
	 */
	_layout_form_preview: function (uid) {
		var self = this;
		self.layout_form_preview[uid] = self.tabbar_form[uid].cells("form_preview").attachLayout(self.model.conf_layout_form_preview.pattern);
		self.layout_form_preview[uid].dhxWins.enableAutoViewport(false);
		self.layout_form_preview[uid].dhxWins.attachViewportTo(document.body);
		self.layout_form_preview[uid].attachEvent("onUnDock", function (itemId) {
			//console.log(itemId);
			self.layout_form_preview[uid].dhxWins.setImagePath("../codebase3.6/imgs/");

			self.formPreviewWindow[uid] = self.layout_form_preview[uid].dhxWins.window(itemId);
			self.formPreviewWindow[uid].button("dock").attachEvent("onClick", function () {
				self.layout_form_preview[uid].cells("a").dock();
				return true;
			});;
			self.formPreviewWindow[uid].setDimension(760, 500);

			self.formPreviewWindow[uid].setText("Live preview: " + self.form_properties[uid].getItemValue("formlabel"));
			self.formPreviewWindow[uid].setIcon("dock.gif", "dock.gif");
		});
		self.layout_form_preview[uid].attachEvent("onDock", function (itemId) {
			alert("entrei dock");
		});

	}

	,
	toolbar_form_preview: [],
	/**
	 * Description
	 * @method _toolbar_form_preview
	 * @param {} uid
	 * @param {} form_id
	 * @return
	 */
	_toolbar_form_preview: function (uid, form_id) {
		var self = this;
		self.toolbar_form_preview[uid] = self.layout_form_preview[uid].cells("a").attachToolbar(self.model.conf_toolbar_form_preview);
		self.toolbar_form_preview[uid].setIconSize(32);
		self.toolbar_form_preview[uid].setSkin('dhx_skyblue');
		self.toolbar_form_preview[uid].attachEvent("onClick", function (id) {
			if (id == "save_form") {
				if (CAIRS.dhtmlx.validateForm(uid + "_form_preview", self.form_preview[uid])) {
					self._changeFieldsValueOnModel( uid );
				}
			}
			else if (id == "print_form") {
				if (CAIRS.dhtmlx.validateForm(uid + "_form_preview", self.form_preview[uid])) {
					//console.log( JSON.stringify( self.model.conf_form_preview.template ) );

					var gridData = [],
						form = null,
						inputs = [],
						inputHash = null,
						x, iframe = null,
						type = null,
						form_id = self.form_properties[uid].getItemValue("form_id");

					if (document.getElementById("form_print_" + uid + "_" + form_id)) {
						form = document.getElementById("form_print_" + uid + "_" + form_id);
						document.body.removeChild(form);
					}

					form = document.createElement("form");
					form.setAttribute("id", "form_print_" + uid + "_" + form_id);
					form.setAttribute("name", "form_print_" + uid + "_" + form_id);

					//console.log( CAIRS.dhtmlx.formFields[ uid + "_form_preview" ] );
					// get user typed data and set the field value inside application model

					self._changeFieldsValueOnModel( uid );

					form.setAttribute("action", self.application_path + "processors/html2pdf/processor/PV.php?agency_logo=" + self.data_store[self._getRawUID(uid)].agency_data.logo + "");
					form.setAttribute("method", "post");
					form.setAttribute("target", "iframe_print_" + uid + "_" + form_id);

					var inputHash = document.createElement("input");
					inputHash.setAttribute("id", "template");
					inputHash.setAttribute("name", "template");
					inputHash.setAttribute("type", "hidden");
					inputHash.setAttribute("value", JSON.stringify(self.model.conf_form_preview.template));
					form.appendChild(inputHash);

					var an = document.createElement("input");
					an.setAttribute("id", "agency_name");
					an.setAttribute("name", "agency_name");
					an.setAttribute("type", "hidden");
					an.setAttribute("value", self.data_store[self._getRawUID(uid)].agency_data.agency_name);
					form.appendChild(an);

					var fn = document.createElement("input");
					fn.setAttribute("id", "form_name");
					fn.setAttribute("name", "form_name");
					fn.setAttribute("type", "hidden");
					fn.setAttribute("value", self.form_properties[uid].getItemValue("formlabel"));
					form.appendChild(fn);

					document.body.appendChild(form);

					//postStr = postStr + "&userID=" + self.configuration[ uid ].userID;
					//postStr = postStr + "&connID=" + self.configuration[ uid ].connID;
					//postStr = postStr + "&connectionID=" + self.configuration[ uid ].connectionID;

					self._window_print(uid);

					try {
						iframe = document.getElementById("iframe_print_" + uid + "_" + form_id);
						self.window_print[uid].attachObject("iframe_print_" + uid + "_" + form_id);
						form.submit();
					}
					catch (e) {
						iframe = document.createElement("iframe");
						iframe.setAttribute("id", "iframe_print_" + uid + "_" + form_id);
						iframe.setAttribute("name", "iframe_print_" + uid + "_" + form_id);
						iframe.setAttribute("src", "#");
						iframe.setAttribute("style", "height:100%;");
						iframe.setAttribute("frameborder", "0");

						iframe.style.width = "100%";

						if (document.getElementById("hidden_placeholder")) {
							document.getElementById("hidden_placeholder").appendChild(iframe);
						}
						else {
							var hidden_placeholder = document.createElement("DIV");
							hidden_placeholder.setAttribute("id", "hidden_placeholder");
							document.body.appendChild(hidden_placeholder);

							document.getElementById("hidden_placeholder").appendChild(iframe);
						}

						self.window_print[uid].attachObject("iframe_print_" + uid + "_" + form_id);

						form.submit();
					}

				}
			}
		});
	}

	,
	tab_pages_preview: [],
	/**
	 * Description
	 * @method _tab_pages_preview
	 * @param {} uid
	 * @return
	 */
	_tab_pages_preview: function (uid) {
		var self = this;

		if (self.layout_form_preview[uid].dhxWins.isWindow("a"))
			self.tab_pages_preview[uid] = self.formPreviewWindow[uid].attachTabbar();
		else
			self.tab_pages_preview[uid] = self.layout_form_preview[uid].cells("a").attachTabbar();

		self.tab_pages_preview[uid].setSkin('dhx_skyblue');
		self.tab_pages_preview[uid].setImagePath(self.model.conf_tabbar_form.image_path); // self.application_path
		self.tab_pages_preview[uid].enableScroll(true);
		self.tab_pages_preview[uid].enableAutoReSize(true);
		self.tab_pages_preview[uid].addTab("start_tab", "start_tab", "0px");
		self.tab_pages_preview[uid].hideTab("start_tab", true);

		self.tab_pages_preview[uid].attachEvent("onSelect", function (idd, last_id) {
			return true;
		});
	}

	,
	form_preview: [],
	/**
	 * Description
	 * @method _form_preview
	 * @param {} uid
	 * @return
	 */
	_form_preview: function (uid) {
		var self = this,
			skin = self.form_properties[uid].getItemValue("skin"),
			form_id = self.form_properties[uid].getItemValue("form_id");
		dhtmlx.skin = skin || "dhx_skyblue";

		self.model.conf_form_preview.template.sort(function (a, b) {
			return a.index - b.index;
		});

		for (var x = 0; x < self.model.conf_form_preview.template.length; x++) {
			if (self.model.conf_form_preview.template[x].type == "block") {
				if (typeof self.model.conf_form_preview.template[x].page_id !== 'undefined') {
					// order column 1 of the page
					self.model.conf_form_preview.template[x].list[0].list.sort(function (a, b) {
						return a.index - b.index;
					});

					if (self.model.conf_form_preview.template[x].list[0].list)
						for (var y = 0; y < self.model.conf_form_preview.template[x].list[0].list.length; y++) {
							//console.log( self.model.conf_form_preview.template[x].list[0].list[y] );
							if (self.model.conf_form_preview.template[x].list[0].list[y].list)
								self.model.conf_form_preview.template[x].list[0].list[y].list.sort(function (a, b) {
									return a.index - b.index;
								});

							if (self.model.conf_form_preview.template[x].list[0].list[y].options)
								self.model.conf_form_preview.template[x].list[0].list[y].options.sort(function (a, b) {
									return a.index - b.index;
								});
						}

					// if is there 2 columns
					if (typeof self.model.conf_form_preview.template[x].list[2] !== 'undefined') {
						// order column 2 of the page
						self.model.conf_form_preview.template[x].list[2].list.sort(function (a, b) {
							return a.index - b.index;
						});

						for (var y = 0; y < self.model.conf_form_preview.template[x].list[2].list.length; y++) {
							//console.log( self.model.conf_form_preview.template[x].list[0].list[y] );
							if (self.model.conf_form_preview.template[x].list[2].list[y].list)
								self.model.conf_form_preview.template[x].list[2].list[y].list.sort(function (a, b) {
									return a.index - b.index;
								});

							if (self.model.conf_form_preview.template[x].list[2].list[y].options)
								self.model.conf_form_preview.template[x].list[2].list[y].options.sort(function (a, b) {
									return a.index - b.index;
								});
						}
					}
				}
			}
		}

		self.form_preview[uid] = self.tab_pages_preview[uid].cells("start_tab").attachForm(self.model.conf_form_preview.template);
		self.form_preview[uid].setSkin(skin);

		self.model.conf_form_preview.template.forEach(function (element, index, array) {
			if (element.type == "block") {
				if (typeof element.id !== 'undefined') {
					self.tab_pages_preview[uid].addTab(self.model.conf_form_preview.template[index].id, element.label, element.tab_width);

					//console.log(  );

					self.tab_pages_preview[uid].cells(self.model.conf_form_preview.template[index].id).attachObject(self.model.conf_form_preview.template[index].id.toString());
					if (index == 1)
						self.tab_pages_preview[uid].setTabActive(self.model.conf_form_preview.template[index].id);

					//document.getElementById( self.model.conf_form_preview.template[index].id.toString() ).style.overflow = "auto";
				}
			}
		});

		CAIRS.dhtmlx.prepareForm(uid + "_form_preview", self.model.conf_form_preview, self.form_preview[uid]);

		self._bindFormFieldsToLibraryFields(uid + "_form_preview", uid.replace(new RegExp("_" + form_id, "g"), "").replace(new RegExp("_-1", "g"), ""));

		self._renderSignatureControl(uid);

		self.model.conf_form_preview.template.forEach(function (element, index, array) {
			if (element.type == "block") {
				if (typeof element.id !== 'undefined') {
					document.getElementById(self.model.conf_form_preview.template[index].id.toString()).parentNode.style.overflow = "auto";
					document.getElementById(self.model.conf_form_preview.template[index].id.toString()).parentNode.style.paddingBottom = "20px";
				}
			}
		});
	}

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

	,
	/**
	 * Description
	 * @method _reOrderPages
	 * @param {} uid
	 * @return
	 */
	_reOrderPages: function (uid) {
		var self = this,
			form_id = self.form_properties[uid].getItemValue("form_id"),
			hash = null;

		self.progressOnForm(uid);

		var orderingArray = [];
		self.grid_pages[uid].forEachRow(function (rID) {
			//self.grid_pages[ uid ].cells(rID, self.grid_pages[ uid ].getColIndexById( "index" )).setValue( self.grid_pages[ uid ].getRowIndex( rID ) );
			//self._getPageOnModel( uid, rID)[ "index" ] = self.grid_pages[ uid ].getRowIndex( rID );
			var objOrdering = {};
			objOrdering["item_id"] = rID;
			objOrdering["index"] = self.grid_pages[uid].getRowIndex(rID);
			orderingArray.push(objOrdering);
		});

		hash = {
			ordering_column_name: "index",
			data: orderingArray
		};

		if (orderingArray.length >= 0) {
			self._setStatusDataTransferForm(uid, "ordering " + orderingArray.length + " pages", true);
			CAIRS.MAP.API.post({
				resource: "/forms/" + form_id + "/pages/order" // mandatory
				,
				format: "json" // json, yaml, xml. Default: json. Not mandatory
				,
				payload: "hash=" + JSON.stringify(hash) // mandatory for PUT and POST
				,
				/**
				 * Description
				 * @method onSuccess
				 * @param {} request
				 * @return
				 */
				onSuccess: function (request) // not mandatory
				{
					var json = eval('(' + request.response + ')');
					if (json.status == "success") {
						//dhtmlx.message( {type : "error", text : json.response} );
						self._setStatusDataTransferForm(uid, "" + orderingArray.length + " pages ordered");

						self.grid_pages[uid].forEachRow(function (rID) {
							self.grid_pages[uid].cells(rID, self.grid_pages[uid].getColIndexById("index")).setValue(self.grid_pages[uid].getRowIndex(rID));
							self._getPageOnModel(uid, rID)["index"] = self.grid_pages[uid].getRowIndex(rID);
						});

						self.progressOffForm(uid);
					}
					else {

						dhtmlx.message({
							type: "error",
							text: "Pages wasn't ordered. reason: " + json.response
						});
						self._setStatusDataTransferForm(uid, "pages wasn't ordered");
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
					var json = eval('(' + request.response + ')');
					dhtmlx.message({
						type: "error",
						text: "Pages wasn't ordered. reason: " + json.response
					});
					self._setStatusDataTransferForm(uid, "pages wasn't ordered");
					if (json.response == "token not authorized")
						self._setStatusUserForm(uid, "token expired. Please login again", false);
					self.progressOffForm(uid);
				}
			});
		}
	},
	/**
	 * Description
	 * @method _reOrderPageFields
	 * @param {} uid
	 * @return
	 */
	_reOrderPageFields: function (uid) {
		var self = this,
			hash = null;

		var orderingArray = []
		self.grid_form_fields[uid].forEachRow(function (rID) {
			var objOrdering = {};
			objOrdering["item_id"] = rID;
			objOrdering["index"] = self.grid_form_fields[uid].getRowIndex(rID);
			orderingArray.push(objOrdering);
		});

		hash = {
			ordering_column_name: "index",
			data: orderingArray
		};

		if (orderingArray.length >= 0) {
			self._setStatusDataTransferForm(uid, "ordering " + orderingArray.length + " fields", true);
			self.progressOnForm(uid);
			var form_id = self.form_properties[uid].getItemValue("form_id");
			var page_id = self.grid_pages[uid].getSelectedRowId();

			CAIRS.MAP.API.post({
				resource: "/forms/" + form_id + "/pages/" + page_id + "/fields/order" // mandatory
				,
				format: "json" // json, yaml, xml. Default: json. Not mandatory
				,
				payload: "hash=" + JSON.stringify(hash) // mandatory for PUT and POST
				,
				/**
				 * Description
				 * @method onSuccess
				 * @param {} request
				 * @return
				 */
				onSuccess: function (request) // not mandatory
				{
					var json = eval('(' + request.response + ')');
					if (json.status == "success") {
						//dhtmlx.message( {type : "error", text : json.response} );
						self._setStatusDataTransferForm(uid, "" + orderingArray.length + " fields ordered");

						self.grid_form_fields[uid].forEachRow(function (rID) {
							var nnindex = self.grid_form_fields[uid].getRowIndex(rID);
							self.grid_form_fields[uid].cells(rID, self.grid_form_fields[uid].getColIndexById("index")).setValue(nnindex);
							//console.log(self._getPageField( uid, self.selected_page[ uid ], rID ));
							//console.log("current field index: " + self._getPageField( uid, self.selected_page[ uid ], rID ).index);
							self._getPageField(uid, self.selected_page[uid], rID).index = nnindex;
							//console.log("new field index: " + self._getPageField( uid, self.selected_page[ uid ], rID ).index);
							//console.log( self._getPageField( uid, self.selected_page[ uid ], rID ) );
						});

						self.progressOffForm(uid);
					}
					else {
						dhtmlx.message({
							type: "error",
							text: "fields wasn't ordered. reason: " + json.response
						});
						self._setStatusDataTransferForm(uid, "fields wasn't ordered");
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
					var json = eval('(' + request.response + ')');
					dhtmlx.message({
						type: "error",
						text: "fields wasn't ordered. reason: " + json.response
					});
					self._setStatusDataTransferForm(uid, "fields wasn't ordered");
					if (json.response == "token not authorized")
						self._setStatusUserForm(uid, "token expired. Please login again", false);
					self.progressOffForm(uid);
				}
			});
		}
	}

	,
	/**
	 * Description
	 * @method _reOrderFieldOptions
	 * @param {} uid
	 * @return
	 */
	_reOrderFieldOptions: function (uid) {
		var self = this,
			hash = null;

		var orderingArray = []
		self.grid_field_propertie_options[uid].forEachRow(function (rID) {
			var objOrdering = {};
			objOrdering["item_id"] = rID;
			objOrdering["index"] = self.grid_field_propertie_options[uid].getRowIndex(rID);
			orderingArray.push(objOrdering);
		});

		hash = {
			ordering_column_name: "index",
			data: orderingArray
		};

		if (orderingArray.length >= 0) {
			self._setStatusDataTransferForm(uid, "ordering " + orderingArray.length + " options", true);
			self.progressOnForm(uid);
			var form_id = self.form_properties[uid].getItemValue("form_id");
			var page_id = self.grid_pages[uid].getSelectedRowId();
			var field_id = self.grid_form_fields[uid].getSelectedRowId();

			CAIRS.MAP.API.post({
				resource: "/forms/" + form_id + "/pages/" + page_id + "/fields/" + field_id + "/options/order" // mandatory
				,
				format: "json" // json, yaml, xml. Default: json. Not mandatory
				,
				payload: "hash=" + JSON.stringify(hash) // mandatory for PUT and POST
				,
				/**
				 * Description
				 * @method onSuccess
				 * @param {} request
				 * @return
				 */
				onSuccess: function (request) // not mandatory
				{
					var json = eval('(' + request.response + ')');
					if (json.status == "success") {
						//dhtmlx.message( {type : "error", text : json.response} );
						self._setStatusDataTransferForm(uid, "" + orderingArray.length + " options ordered");

						self.grid_field_propertie_options[uid].forEachRow(function (rID) {
							var nnindex = self.grid_field_propertie_options[uid].getRowIndex(rID);
							self.grid_field_propertie_options[uid].cells(rID, self.grid_field_propertie_options[uid].getColIndexById("index")).setValue(nnindex);
							//console.log(  self._getFieldOption( uid, self.selected_page[ uid ], self.grid_form_fields[ uid ].getSelectedRowId(), rID )  );
							self._getFieldOption(uid, self.selected_page[uid], self.grid_form_fields[uid].getSelectedRowId(), rID).data[self.grid_field_propertie_options[uid].getColIndexById("index")] = nnindex;
							self._getFieldOption(uid, self.selected_page[uid], self.grid_form_fields[uid].getSelectedRowId(), rID).index = nnindex;
						});
						self.progressOffForm(uid);
					}
					else {
						dhtmlx.message({
							type: "error",
							text: "fields wasn't ordered. reason: " + json.response
						});
						self._setStatusDataTransferForm(uid, "fields wasn't ordered");
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
					var json = eval('(' + request.response + ')');
					dhtmlx.message({
						type: "error",
						text: "fields wasn't ordered. reason: " + json.response
					});
					self._setStatusDataTransferForm(uid, "fields wasn't ordered");
					if (json.response == "token not authorized")
						self._setStatusUserForm(uid, "token expired. Please login again", false);
					self.progressOffForm(uid);
				}
			});
		}
	}

	,
	/**
	 * Description
	 * @method _getPageField
	 * @param {} uid
	 * @param {} page_id
	 * @param {} field_id
	 * @return Literal
	 */
	_getPageField: function (uid, page_id, field_id) {
		var self = this;
		
		//console.log(page_id);
		//console.log(self.pages[uid]);
		
		
		//console.log("--------------------------------");
		
		if( page_id !== "" && page_id != null && typeof page_id !== 'undefined' )
			for (var x = 0; x < self.pages[uid][page_id].list[0].list.length; x++) {
				var field = self.pages[uid][page_id].list[0].list[x];
				if (typeof field.field_id !== 'undefined')
					if (field.field_id.toString() == field_id.toString()) return field;
			}
			if (self.pages[uid][page_id].page_layout == "D") {
				for (var x = 0; x < self.pages[uid][page_id].list[2].list.length; x++) {
					var field = self.pages[uid][page_id].list[2].list[x];
					if (typeof field.field_id !== 'undefined')
						if (field.field_id.toString() == field_id.toString()) return field;
				}
			}
		else
			dhtmlx.message({
				type: "error",
				text: "page not found. page_id = " + page_id
			});
		return false;
	}

	,
	/**
	 * Description
	 * @method _getPageFieldsNumber
	 * @param {} uid
	 * @param {} page_id
	 * @return fieldsNumber
	 */
	_getPageFieldsNumber: function (uid, page_id) {
		var self = this,
			fieldsNumber = 0;
		for (var x = 0; x < self.pages[uid][page_id].list[0].list.length; x++) {
			var field = self.pages[uid][page_id].list[0].list[x];
			if (typeof field.field_id !== 'undefined')
				fieldsNumber = fieldsNumber + 1;
		}
		if (self.pages[uid][page_id].page_layout == "D") {
			for (var x = 0; x < self.pages[uid][page_id].list[2].list.length; x++) {
				var field = self.pages[uid][page_id].list[2].list[x];
				if (typeof field.field_id !== 'undefined')
					fieldsNumber = fieldsNumber + 1;
			}
		}
		return fieldsNumber;
	}

	,
	/**
	 * Description
	 * @method _getFieldOptionsNumber
	 * @param {} uid
	 * @param {} page_id
	 * @param {} field_id
	 * @return optionsNumber
	 */
	_getFieldOptionsNumber: function (uid, page_id, field_id) {
		var self = this,
			optionsNumber = 0;
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
							if (option.option_id)
								optionsNumber = optionsNumber + 1;
						});
					}
					else if (field.type == "multiselect" || field.type == "combo" || field.type == "select") { // lets read the options property
						var found = false;
						field.options.forEach(function (option, index, array) {
							//console.log(option);
							if (option.option_id)
								optionsNumber = optionsNumber + 1;
						});

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
								if (option.option_id)
									optionsNumber = optionsNumber + 1;
							});
						}
						else if (field.type == "multiselect" || field.type == "combo" || field.type == "select") { // lets read the options property
							var found = false;
							field.options.forEach(function (option, index, array) {
								if (option.option_id)
									optionsNumber = optionsNumber + 1;
							});
						}
					}
				}
			}
		}
		return optionsNumber;
	}

	,
	/**
	 * Description
	 * @method _deletePageField
	 * @param {} uid
	 * @param {} page_id
	 * @param {} field_id
	 * @param {} clientOnly
	 * @return
	 */
	_deletePageField: function (uid, page_id, field_id, clientOnly) {
		// ["FormBuilder_1397095841513_3109", 6955, "157103", true]
		var self = this;
		//console.log("-----------------------------------------------");
		//console.log(arguments);

		for (var x = 0; x < self._getPageColumnList(uid, page_id, "first").length; x++) {
			var field = self._getPageColumnList(uid, page_id, "first")[x];

			if (typeof field.field_id === 'undefined') continue;

			if (field.field_id.toString() == field_id.toString()) {
				self.progressOnForm(uid);
				var form_id = self.form_properties[uid].getItemValue("form_id");
				var found_field_index = x;

				if (clientOnly) {
					//console.log("-----------------------------------------------");
					//console.log("clientOnly");
					self._setStatusDataTransferForm(uid, "trying to move field(" + field_id + ")", true);
					self.grid_form_fields[uid].deleteRow(field_id);
					self._getPageColumnList(uid, page_id, "first").splice(found_field_index, 1);
					self.toolbar_form_fields[uid].disableItem("edit_field");
					self.toolbar_form_fields[uid].disableItem("delete_field");
					self.tabbar_form_create_fields[uid].hideTab("field_properties");
					if (self.form_field_propertie[uid]) {
						self.form_field_propertie[uid].unload();
						self.form_field_propertie[uid] = null;
					}

					self._feedGrid_form_fieldsNormalize(uid, page_id);
				}
				else {
					self._setStatusDataTransferForm(uid, "trying to delete field(" + field_id + ")", true);
					CAIRS.MAP.API.del({
						resource: "/forms/" + form_id + "/pages/" + page_id + "/fields/" + field_id // mandatory
						,
						format: "json" // json, yaml, xml. Default: json. Not mandatory
						,
						payload: "agency_id=" + self.configuration[uid.replace(new RegExp("_" + form_id, "g"), "")].agency_id + ""
						,
						/**
						 * Description
						 * @method onSuccess
						 * @param {} request
						 * @return
						 */
						onSuccess: function (request) // not mandatory
						{
							var json = eval('(' + request.response + ')');
							dhtmlx.message({
								type: "error",
								text: "field(" + field_id + ") deleted"
							});
							self._setStatusDataTransferForm(uid, "field(" + field_id + ") deleted");

							self.grid_form_fields[uid].deleteRow(field_id);
							self._getPageColumnList(uid, page_id, "first").splice(found_field_index, 1);

							self.toolbar_form_fields[uid].disableItem("edit_field");
							self.toolbar_form_fields[uid].disableItem("delete_field");
							self.tabbar_form_create_fields[uid].hideTab("field_properties");
							if (self.form_field_propertie[uid]) {
								self.form_field_propertie[uid].unload();
								self.form_field_propertie[uid] = null;
							}

							window.setTimeout(function () {
								var page_id = self.grid_pages[uid].getSelectedRowId();
								self._feedGrid_form_fieldsNormalize(uid, page_id);
							}, 500);

							self.progressOffForm(uid);

						},
						/**
						 * Description
						 * @method onFail
						 * @param {} request
						 * @return
						 */
						onFail: function (request) { // not mandatory
							var json = eval('(' + request.response + ')');
							dhtmlx.message({
								type: "error",
								text: json.response
							});
							self._setStatusDataTransferForm(uid, "field(" + field_id + ") not deleted");
							self.progressOffForm(uid);
						}
					});
				}

			}
		}

		if (self.pages[uid][page_id].page_layout == "D") {
			for (var x = 0; x < self._getPageColumnList(uid, page_id, "second").length; x++) {
				var field = self._getPageColumnList(uid, page_id, "second")[x];

				if (typeof field.field_id === 'undefined') continue;

				if (field.field_id.toString() == field_id.toString()) {
					self.progressOnForm(uid);
					self._setStatusDataTransferForm(uid, "trying to delete field(" + field_id + ")", true);
					var form_id = self.form_properties[uid].getItemValue("form_id");
					var found_field_index = x;

					if (clientOnly) {
						//console.log("-----------------------------------------------");
						//console.log("clientOnly");
						self._setStatusDataTransferForm(uid, "trying to move field(" + field_id + ")", true);
						self.grid_form_fields[uid].deleteRow(field_id);
						self._getPageColumnList(uid, page_id, "second").splice(found_field_index, 1);
						self.toolbar_form_fields[uid].disableItem("edit_field");
						self.toolbar_form_fields[uid].disableItem("delete_field");
						self.tabbar_form_create_fields[uid].hideTab("field_properties");
						if (self.form_field_propertie[uid]) {
							self.form_field_propertie[uid].unload();
							self.form_field_propertie[uid] = null;
						}

						self._feedGrid_form_fieldsNormalize(uid, page_id);
					}
					else {
						self._setStatusDataTransferForm(uid, "trying to delete field(" + field_id + ")", true);
						CAIRS.MAP.API.del({
							resource: "/forms/" + form_id + "/pages/" + page_id + "/fields/" + field_id // mandatory
							,
							format: "json" // json, yaml, xml. Default: json. Not mandatory
							,
							payload: "agency_id=" + self.configuration[uid.replace(new RegExp("_" + form_id, "g"), "")].agency_id + ""
							,
							/**
							 * Description
							 * @method onSuccess
							 * @param {} request
							 * @return
							 */
							onSuccess: function (request) // not mandatory
							{
								var json = eval('(' + request.response + ')');
								dhtmlx.message({
									type: "error",
									text: "field(" + field_id + ") deleted"
								});
								self._setStatusDataTransferForm(uid, "field(" + field_id + ") deleted");

								self.grid_form_fields[uid].deleteRow(field_id);
								self._getPageColumnList(uid, page_id, "second").splice(found_field_index, 1);

								self.toolbar_form_fields[uid].disableItem("edit_field");
								self.toolbar_form_fields[uid].disableItem("delete_field");
								self.tabbar_form_create_fields[uid].hideTab("field_properties");
								if (self.form_field_propertie[uid]) {
									self.form_field_propertie[uid].unload();
									self.form_field_propertie[uid] = null;
								}

								self._reOrderPageFields(uid);

								self.progressOffForm(uid);

							},
							/**
							 * Description
							 * @method onFail
							 * @param {} request
							 * @return
							 */
							onFail: function (request) { // not mandatory
								var json = eval('(' + request.response + ')');
								dhtmlx.message({
									type: "error",
									text: json.response
								});
								self._setStatusDataTransferForm(uid, "field(" + field_id + ") not deleted");
								self.progressOffForm(uid);
							}
						});
					}

				}
			}
		}

	}

	,
	/**
	 * Description
	 * @method _deleteFieldOption
	 * @param {} uid
	 * @param {} page_id
	 * @param {} field_id
	 * @param {} option_id
	 * @return
	 */
	_deleteFieldOption: function (uid, page_id, field_id, option_id) {
		var self = this;
		var form_id = self.form_properties[uid].getItemValue("form_id");
		self.progressOnForm(uid);
		
		CAIRS.MAP.API.del({
			resource: "/forms/" + form_id + "/pages/" + page_id + "/fields/" + field_id + "/options/" + option_id // mandatory
			,
			format: "json" // json, yaml, xml. Default: json. Not mandatory
			,
			/**
			 * Description
			 * @method onSuccess
			 * @param {} request
			 * @return
			 */
			onSuccess: function (request) // not mandatory
			{
				var json = eval('(' + request.response + ')');
				dhtmlx.message({
					type: "error",
					text: "option(" + field_id + ") deleted"
				});
				self._setStatusDataTransferForm(uid, "option(" + field_id + ") deleted");

				for (var x = 0; x < self._getPageColumnList(uid, page_id, "first").length; x++) {
					if (typeof self._getPageColumnList(uid, page_id, "first")[x].field_id !== 'undefined') {
						if(self._getPageColumnList(uid, page_id, "first")[x].list)
							self._getPageColumnList(uid, page_id, "first")[x].list.forEach(function (option, index, array) {
								if( option.field_id )
									if (option.field_id.toString() == option_id.toString()) {
										self._getPageColumnList(uid, page_id, "first")[x].list.splice(index, 1);
									}
							});
						if( self._getPageColumnList(uid, page_id, "first")[x].options )
							self._getPageColumnList(uid, page_id, "first")[x].options.forEach(function (option, index, array) {
								if( option.field_id )
									if (option.field_id.toString() == option_id.toString()) {
										self._getPageColumnList(uid, page_id, "first")[x].options.splice(index, 1);
									}
							});
					}
				}
		
				// if double column
				if (self.pages[uid][page_id].page_layout == "D") {
					for (var x = 0; x < self._getPageColumnList(uid, page_id, "second").length; x++) {
						if (typeof self._getPageColumnList(uid, page_id, "second")[x].field_id !== 'undefined') {
							if(self._getPageColumnList(uid, page_id, "second")[x].list)
								self._getPageColumnList(uid, page_id, "second")[x].list.forEach(function (option, index, array) {
									if( option.field_id )
										if (option.field_id.toString() == option_id.toString()) {
											self._getPageColumnList(uid, page_id, "second")[x].list.splice(index, 1);
										}
								});
							if( self._getPageColumnList(uid, page_id, "second")[x].options )
								self._getPageColumnList(uid, page_id, "second")[x].options.forEach(function (option, index, array) {
									if( option.field_id )
										if (option.field_id.toString() == option_id.toString()) {
											self._getPageColumnList(uid, page_id, "second")[x].options.splice(index, 1);
										}
								});
						}
					}
				}
		
				self.grid_field_propertie_options[uid].deleteRow(option_id);
		
				self._reOrderFieldOptions(uid);
		
				self.toolbar_grid_field_propertie_options[uid].disableItem("delete");
				self.toolbar_grid_field_propertie_options[uid].disableItem("edit");

				self.progressOffForm(uid);

			},
			/**
			 * Description
			 * @method onFail
			 * @param {} request
			 * @return
			 */
			onFail: function (request) { // not mandatory
				var json = eval('(' + request.response + ')');
				dhtmlx.message({
					type: "error",
					text: json.response
				});
				self._setStatusDataTransferForm(uid, "option(" + field_id + ") not deleted");
				self.progressOffForm(uid);
			}
		});

		
	}

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
	 * @method _startDataTree
	 * @param {} uid
	 * @param {} callBack
	 * @return
	 */
	_startDataTree: function (uid, callBack) {
		var self = this;

		self._setStatusDataTransfer("loading categories");
		CAIRS.MAP.API.get({
			resource: "/LibraryFields/category" // mandatory
			,
			format: "json" // json, yaml, xml. Default: json. Not mandatory
			,
			/**
			 * Description
			 * @method onSuccess
			 * @param {} request
			 * @return
			 */
			onSuccess: function (request) { // not mandatory
				//console.log(json.category);
				try {
					var json = eval('(' + request.response + ')');
					if (json.status == "success") {
						self.data_store[self._getRawUID(uid)]["category"] = json.category;
						for (var x = 0; x < json.category.length; x++) {
							var category = json.category[x];
							if (category.SearchCriteria != "8_Field Group" && category.SearchCriteria != "9_Field Tags") {
								self.model.conf_tree_form_library_field_category.item[0].item.push({
									id: category.CategoryID,
									text: category.Description
								});
							}
						}
						self._setStatusDataTransfer("category 100% loaded");
					}
					else {

						dhtmlx.message({
							type: "error",
							text: json.response
						});
						self.status_bar[uid].setText(json.response);
						self.data_store[uid]["category"] = [];
					}
				}
				catch (e) {
					//console.log("error category");
					//console.log(e);
				}
			},
			/**
			 * Description
			 * @method onFail
			 * @param {} request
			 * @return
			 */
			onFail: function (request) { // not mandatory
				//console.log(request);
				if (request.status == "0") {
					dhtmlx.message({
						type: "error",
						text: "unable to reach resource"
					});
					self._setStatusError("unable to reach resource");
				}
				else {
					dhtmlx.message({
						type: "error",
						text: "fatal error on server side"
					});
					self._setStatusError("error 500");
				}
				self._setStatus("Application could not start");
				self.data_store[uid]["category"] = [];
			}
		});

		CAIRS.MAP.API.get({
			resource: "/LibraryFields/subcategory" // mandatory
			,
			format: "json" // json, yaml, xml. Default: json. Not mandatory
			,
			/**
			 * Description
			 * @method onSuccess
			 * @param {} request
			 * @return
			 */
			onSuccess: function (request) { // not mandatory
				try {
					var json = eval('(' + request.response + ')');

					if (json.status == "success") {
						self.data_store[self._getRawUID(uid)]["subcategory"] = json.subcategory;
						for (var x = 0; x < json.subcategory.length; x++) {
							var subcategory = json.subcategory[x];
							self._putSubCategoryOnTree(uid, subcategory.ParentId, {
								id: subcategory.SearchCriteria,
								text: subcategory.Description
							})
						}
						self._setStatusDataTransfer("subcategory 100% loaded");

						if (callBack) {
							callBack();
						}
					}
					else {
						//console.log(request);
						dhtmlx.message({
							type: "error",
							text: json.response
						});
						self.status_bar[uid].setText(json.response);
						self.data_store[uid]["subcategory"] = [];
					}
				}
				catch (e) {
					//console.log(e.stack);	
				}
			},
			/**
			 * Description
			 * @method onFail
			 * @param {} request
			 * @return
			 */
			onFail: function (request) { // not mandatory
				if (request.status == "0") {
					dhtmlx.message({
						type: "error",
						text: "unable to reach resource"
					});
					self._setStatusError("unable to reach resource");
				}
				else {
					dhtmlx.message({
						type: "error",
						text: "fatal error on server side"
					});
					self._setStatusError("error 500");
				}
				self._setStatus("Application could not start");
				self.data_store[uid]["subcategory"] = [];
			}
		});
	}

	,
	/**
	 * Description
	 * @method _startDataTags
	 * @param {} uid
	 * @param {} callBack
	 * @return
	 */
	_startDataTags: function (uid, callBack) {
		var self = this;

		self._setStatusDataTransfer("loading tags");
		CAIRS.MAP.API.get({
			resource: "/LibraryFields/tags" // mandatory
			,
			format: "json" // json, yaml, xml. Default: json. Not mandatory
			,
			/**
			 * Description
			 * @method onSuccess
			 * @param {} request
			 * @return
			 */
			onSuccess: function (request) { // not mandatory
				try {
					var json = eval('(' + request.response + ')');
					if (json.status == "success") {
						var rest = json.rows.length % 2;
						var rounded = json.rows.length - rest;
						var middle = rounded / 2;

						//console.log( self._getRawUID( uid ) );
						//console.log( self.data_store );

						//uid = parseInt( uid.split("_")[  uid.split("_").length -1 ] );

						self.data_store[self._getRawUID(uid)]["tags"] = json.rows;
						for (var x = 0; x < json.rows.length; x++) {
							var row = json.rows[x];
							self.model.conf_form_tags.template.push({
								type: "checkbox",
								name: row.data[0],
								label: row.data[0],
								value: row.data[0],
								tooltip: ""
							});
							if (x == middle) {
								self.model.conf_form_tags.template.push({
									type: "newcolumn"
								});
							}
						}
						if (callBack) {
							callBack();
						}
						self._setStatusDataTransfer("tags 100% loaded");
					}
					else {
						dhtmlx.message({
							type: "error",
							text: json.response
						});
						self.status_bar[uid].setText(json.response);
						self.data_store[uid.split("_")[uid.split("_").length - 1]]["tags"] = [];
					}
				}
				catch (e) {
					//console.log("error tags");
					//console.log(e.stack);
				}
			},
			/**
			 * Description
			 * @method onFail
			 * @param {} request
			 * @return
			 */
			onFail: function (request) { // not mandatory
				//console.log(request);
				if (request.status == "0") {
					dhtmlx.message({
						type: "error",
						text: "unable to reach resource"
					});
					self._setStatusError("unable to reach resource");
				}
				else {
					dhtmlx.message({
						type: "error",
						text: "fatal error on server side"
					});
					self._setStatusError("error 500");
				}
				self._setStatus("error getting tags");
				self.data_store[self._getRawUID(uid)]["tags"] = [];
			}
		});

	}

	,
	/**
	 * Description
	 * @method _addPage
	 * @param {} pageConfiguration
	 * @param {} callBack
	 * @return
	 */
	_addPage: function (pageConfiguration, callBack) {
		var self = this,
			uid = pageConfiguration.uid,
			pagename = pageConfiguration.pagename || "",
			page_id = pageConfiguration.page_id || null,
			page_layout = pageConfiguration.page_layout || "S",
			tab_width = pageConfiguration.tab_width || "100",
			form_id = pageConfiguration.form_id || null,
			record = [],
			pageJSON = null;

		if (page_layout == "S") {
			pageJSON = {
				type: "block",
				width: self.form_default_width,
				offsetLeft: 0,
				id: page_id,
				label: pagename,
				page_id: page_id,
				pagename: pagename,
				list: [{
					type: 'block',
					inputWidth: 'auto',
					inputHeight: 'auto',
					name: "column_1",
					list: []
				}],
				index: 0,
				page_layout: page_layout,
				tab_width: tab_width + "px"
			};
		}
		else if (page_layout == "D") {
			pageJSON = {
				type: "block",
				width: self.form_default_width,
				offsetLeft: 0,
				id: page_id,
				label: pagename,
				page_id: page_id,
				pagename: pagename,
				list: [{
					type: 'block',
					inputWidth: 'auto',
					inputHeight: 'auto',
					name: "column_1",
					list: []
				}, {
					type: "newcolumn",
					offset: 10
				}, {
					type: 'block',
					inputWidth: 'auto',
					inputHeight: 'auto',
					name: "column_2",
					list: []
				}],
				index: 0,
				page_layout: page_layout,
				tab_width: tab_width + "px"
			};
		}

		//console.log( "--------------------------------------" );
		//console.log( page_id );

		if (page_id == null) {
			//console.log( "db also" );
			pageConfiguration["index"] = self.grid_pages[uid].getRowsNum();
			pageJSON["index"] = pageConfiguration["index"];

			page_id = null;
			record.push(pagename);
			record.push(page_layout);
			record.push(tab_width);
			record.push(pageJSON["index"]);

			self._setStatusDataTransferForm(uid, "requesting pages data", true);
			self.progressOnForm(uid);
			CAIRS.MAP.API.insert({
				resource: "/forms/" + form_id + "/pages" // mandatory
				,
				format: "json" // json, yaml, xml. Default: json. Not mandatory
				,
				payload: "hash=" + JSON.stringify(pageConfiguration) // mandatory for PUT and POST
				,
				/**
				 * Description
				 * @method onSuccess
				 * @param {} request
				 * @return
				 */
				onSuccess: function (request) // not mandatory
				{
					var json = eval('(' + request.response + ')');
					if (json.status == "success") {
						//dhtmlx.message( {type : "error", text : json.response} );
						self._setStatusDataTransferForm(uid, "pages data received");

						page_id = json.page_id;

						pageJSON["page_id"] = page_id;
						pageJSON["id"] = page_id;

						self.grid_pages[uid].addRow(page_id, record);
						self._putEmptyPageOnMemory(uid, pageJSON);
						//self.grid_pages[ uid ].cells(page_id, self.grid_pages[ uid ].getColIndexById( "index" )).setValue( pageConfiguration[ "index" ] );

						if (self.grid_pages[uid].getRowsNum() == 1)
							self.setPageStatusInfo(uid, "page " + pagename + " added");

						if (callBack) callBack();

						self.progressOffForm(uid);

					}
					else {
						dhtmlx.message({
							type: "error",
							text: "Page not addedd. reason: " + json.response
						});
						self._setStatusDataTransferForm(uid, "unable to get pages data");
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
					var json = eval('(' + request.response + ')');
					dhtmlx.message({
						type: "error",
						text: "Page not addedd. reason: " + json.response
					});
					self._setStatusDataTransferForm(uid, "unable to get pages data");
					if (json.response == "token not authorized")
						self._setStatusUserForm(uid, "token expired. Please login again", false);
					self.progressOffForm(uid);
				}
			});
		}
		else {
			//console.log( "only memory" );
			pageJSON["index"] = pageConfiguration["index"];

			record.push(pagename);
			record.push(page_layout);
			record.push(tab_width);
			record.push(pageConfiguration["index"]);

			self.grid_pages[uid].addRow(page_id, record);
			self._putEmptyPageOnMemory(uid, pageJSON);
			//self.grid_pages[ uid ].cells(page_id, self.grid_pages[ uid ].getColIndexById( "index" )).setValue( pageConfiguration[ "index" ] );

			if (self.grid_pages[uid].getRowsNum() == 1)
				self.setPageStatusInfo(uid, "page " + pagename + " added");

			if (callBack) callBack();

			//self.progressOffForm( uid );
		}
	}

	,
	/**
	 * Description
	 * @method _editPage
	 * @param {} pageConfiguration
	 * @param {} callBack
	 * @param {} form_id
	 * @return
	 */
	_editPage: function (pageConfiguration, callBack, form_id) {
		var self = this,
			uid = pageConfiguration.uid,
			pagename = pageConfiguration.pagename || "",
			page_id = pageConfiguration.page_id || null,
			page_layout = pageConfiguration.page_layout || "S",
			tab_width = pageConfiguration.tab_width || "100";
		self._setStatusDataTransferForm(uid, "posting page hash", true);
		if (page_id != null) {
			form_id = self.form_properties[uid].getItemValue("form_id");
			CAIRS.MAP.API.update({
				resource: "/forms/" + form_id + "/pages/" + page_id // mandatory
				,
				format: "json" // json, yaml, xml. Default: json. Not mandatory
				,
				payload: "hash=" + JSON.stringify(pageConfiguration) // mandatory for PUT and POST
				,
				/**
				 * Description
				 * @method onSuccess
				 * @param {} request
				 * @return
				 */
				onSuccess: function (request) // not mandatory
				{
					var json = eval('(' + request.response + ')');
					if (json.status == "success") {
						//dhtmlx.message( {type : "error", text : json.response} );
						self._setStatusDataTransferForm(uid, "page hash saved");
						// --- client
						// update page properties
						for (var property in pageConfiguration) {
							if (pageConfiguration.hasOwnProperty(property)) {
								var colIndex = self.grid_pages[uid].getColIndexById(property);
								if (CAIRS.isNumber(colIndex)) {
									if (colIndex >= 0) {
										if (property == "pagename") {
											self._getPageOnModel(uid, page_id)["label"] = pageConfiguration[property];
											self._getPageOnModel(uid, page_id)[property] = pageConfiguration[property];
										}
										else if (property == "list" || property == "options") {
											console.log("-------------->>>> entered on " + property);
										}
										else {
											self._getPageOnModel(uid, page_id)[property] = pageConfiguration[property];
										}
										self.grid_pages[uid].cells(page_id, colIndex).setValue(pageConfiguration[property]);
									}
								}
							}
						}
						// update page properties

						// get all fields of the page
						var fieldsList = [];
						self._getPageColumnList(uid, page_id, "first").forEach(function (field, index, array) {
							fieldsList.push(field);
						});
						if (typeof self._getPageColumnList(uid, page_id, "second") !== 'undefined') {
							self._getPageColumnList(uid, page_id, "second").forEach(function (field, index, array) {
								fieldsList.push(field);
							});
						}
						// get all fields of the page
						
						console.log("-------------->>>> fieldsList");
						console.log(fieldsList);

						if (page_layout == "S") {
							self._getPageOnModel(uid, page_id).list = [];
							self._getPageOnModel(uid, page_id).list = [{
								type: 'block',
								inputWidth: 'auto',
								inputHeight: 'auto',
								name: "column_1",
								list: fieldsList
							}];
						}
						else {
							self._getPageOnModel(uid, page_id).list = [];
							
							var column_1 = {
								type: 'block',
								inputWidth: 'auto',
								inputHeight: 'auto',
								name: "column_1",
								list: []
							};
							var column_2 = {
								type: 'block',
								inputWidth: 'auto',
								inputHeight: 'auto',
								name: "column_2",
								list: []
							};

							
							for(var x = 0; x < fieldsList.length; x++)
							{
								var field = fieldsList[ x ];
								if ((x % 2) == 0) {
									column_1.list.push( field );
								}
								else {
									column_2.list.push( field );
								}
							}

							
							
							
							
							self._getPageOnModel(uid, page_id).list.push( column_1 );
							self._getPageOnModel(uid, page_id).list.push( {
								type: "newcolumn",
								offset: 10
							} );
							self._getPageOnModel(uid, page_id).list.push( column_2 );
							
							
							//self._getPageOnModel(uid, page_id).list = [];

							// restart count added fields
							/*self.totalAddedFields[page_id] = 0;

							fieldsList.forEach(function (field, index, array) {
								self._putFieldOnMemory(uid, self.selected_page[uid], field, function () {
									self._startPreview(uid);
								}, true);
							});*/
							//console.log( fieldsList );
						}
						//console.log( self._getPageOnModel( uid, page_id) );
						if (callBack) callBack();
						// --- client

						self.progressOffForm(uid);
					}
					else {
						dhtmlx.message({
							type: "error",
							text: "Page don't saved. reason: " + json.response
						});
						self._setStatusDataTransferForm(uid, "unable to save page");
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
					var json = eval('(' + request.response + ')');
					dhtmlx.message({
						type: "error",
						text: "Page don't saved. reason: " + json.response
					});
					self._setStatusDataTransferForm(uid, "unable to save page");
					if (json.response == "token not authorized")
						self._setStatusUserForm(uid, "token expired. Please login again", false);
					self.progressOffForm(uid);
				}
			});
		}

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
		
		console.log(hash);
		
		CAIRS.dhtmlx.formFields[uid + "_form_preview"].forEach(function (field, index, array) {
			console.log(field.name);
			console.log(field.type);
			
			if (field.type == "calendar") {
				if (CAIRS.isValidDate(hash[field.name])) {
					var day = hash[field.name].getDate();
					var month = hash[field.name].getMonth() + 1;
					var year = hash[field.name].getFullYear();
					if( field.option_id ) // if this field is child field
						self._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["value"] =  year + "/" + month + "/" + day;
					else // else
						self._getPageField(uid, field.page_id, field.field_id)["value"] = year + "/" + month + "/" + day;
				}
			}
			else if (field.type == "upload") {
				hash[field.name] = '';
				console.log(typeof self.form_preview[uid].getItemValue( field.name ));
				console.log( self.form_preview[uid].getItemValue( field.name ) );
				if( field.option_id ) // if this field is child field
				{
					self._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["swfUrl"] = '';//swfUrl
					self._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["value"] = '';//swfUrl
					self._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["url"] = '';//swfUrl
				}
				else
				{
					self._getPageField(uid, field.page_id, field.field_id)["swfUrl"] = '';
					self._getPageField(uid, field.page_id, field.field_id)["value"] = '';
					self._getPageField(uid, field.page_id, field.field_id)["url"] = '';
				}
			}// bug stringify
			else {
				if( field.option_id ) // if this field is child field
					self._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["value"] = hash[field.name];
				else
					self._getPageField(uid, field.page_id, field.field_id)["value"] = hash[field.name];
				
				//console.log(self._getPageField(uid, field.page_id, field.field_id).value);
				//console.log("--------");
			}
		});
	}

	,
	/**
	 * Description
	 * @method _deletePage
	 * @param {} uid
	 * @return
	 */
	_deletePage: function (uid) {
		var self = this,
			form_id;

		dhtmlx.message({
			title: "Warning",
			type: "confirm",
			text: "Do you want to delete the selected page?",
			ok: "Delete",
			cancel: "Cancel",
			/**
			 * Description
			 * @method callback
			 * @param {} ok
			 * @return
			 */
			callback: function (ok) {
				if (ok) {
					var page_id = self.grid_pages[uid].getSelectedRowId();

					form_id = self.form_properties[uid].getItemValue("form_id");

					self.progressOnForm(uid);
					self._setStatusDataTransferForm(uid, "trying to delete the page", true);
					CAIRS.MAP.API.del({
						resource: "/forms/" + form_id + "/pages/" + page_id // mandatory
						,
						format: "json" // json, yaml, xml. Default: json. Not mandatory
						,
						/**
						 * Description
						 * @method onSuccess
						 * @param {} request
						 * @return
						 */
						onSuccess: function (request) // not mandatory
						{
							var json = eval('(' + request.response + ')');
							dhtmlx.message({
								type: "error",
								text: json.response
							});
							self._setStatusDataTransferForm(uid, "page deleted");
							self.grid_pages[uid].deleteRow(page_id);

							//console.log( self.grid_pages[ uid ].getRowsNum() )

							if (self.grid_pages[uid].getRowsNum() > 0)
								self.setPageStatusInfo(uid, "");
							else
								self.setPageStatusInfo(uid, "please create a page");

							self.grid_form_fields[uid].clearAll();

							//console.log(self.pages[ uid ]);
							//console.log(self.model.conf_form_preview.template);
							delete self.pages[uid][page_id];

							for (var x = 0; x < self.model.conf_form_preview.template.length; x++) {
								if (self.model.conf_form_preview.template[x].type == "block") {
									if (typeof self.model.conf_form_preview.template[x].page_id !== 'undefined') {
										if (self.model.conf_form_preview.template[x].page_id == page_id) self.model.conf_form_preview.template.splice(x, 1);
									}
								}
							}

							//console.log(self.model.conf_form_preview.template);
							//console.log(self.pages[ uid ]);

							self.toolbar_form_pages[uid].disableItem("delete_page");
							self.toolbar_form_pages[uid].disableItem("edit_page");

							self.tabbar_form_create_fields[uid].setTabActive("add_field");
							self.tabbar_form_create_fields[uid].hideTab("field_properties");

							self.selected_page[uid] = null;
							self.toolbar_form_fields[uid].disableItem("edit_field");
							self.toolbar_form_fields[uid].disableItem("delete_field");

							if (self.form_field_propertie[uid]) {
								self.form_field_propertie[uid].unload();
								self.form_field_propertie[uid] = null;
							}

							self.progressOffForm(uid);

						},
						/**
						 * Description
						 * @method onFail
						 * @param {} request
						 * @return
						 */
						onFail: function (request) { // not mandatory
							var json = eval('(' + request.response + ')');
							dhtmlx.message({
								type: "error",
								text: json.response
							});

							self.progressOffForm(uid);
						}
					});
				}
			}
		});
	}

	,
	totalAddedFields: []

	,
	/**
	 * Description
	 * @method _putFieldOnMemory
	 * @param {} uid
	 * @param {} page_id
	 * @param {} fieldJSON
	 * @param {} callBack
	 * @param {} putOnClientOnly
	 * @return
	 */
	_putFieldOnMemory: function (uid, page_id, fieldJSON, callBack, putOnClientOnly) {
		var self = this,
			form_id = self.form_properties[uid].getItemValue("form_id");

		self.progressOnForm(uid);

		//console.log("fieldJSON -----------------" );
		//console.log(fieldJSON );

		fieldJSON["page_id"] = page_id;
		//fieldJSON[ "type" ] = page_id;
		if (fieldJSON["required"] == true) {
			fieldJSON["required"] = 1;
		}
		else {
			fieldJSON["required"] = 0;
		}

		if (fieldJSON["note"])
			fieldJSON["note"] = "{ text : '" + fieldJSON["tooltip"] + "'}";
		else
			fieldJSON["note"] = "";

		if (fieldJSON["info"] == true)
			fieldJSON["info"] = 1;
		else
			fieldJSON["info"] = 0;

		if (typeof fieldJSON["use_library"] === 'undefined') {
			fieldJSON["use_library"] = 0;
		}
		else if (fieldJSON["use_library"] == "0") {
			fieldJSON["use_library"] = 0;
		}
		else if (fieldJSON["use_library"] == false) {
			fieldJSON["use_library"] = 0;
		}
		else if (fieldJSON["use_library"] == "") {
			fieldJSON["use_library"] = 0;
		}
		else {
			fieldJSON["use_library"] = 1;
		}
		
		

		//console.log( fieldJSON )

		if (fieldJSON["type"] == 'fieldset') {
			if (self.pages[uid][page_id].page_layout == "S") {
				fieldJSON["width"] = ((self.form_default_width - 50) / 2);
			}
			else {
				fieldJSON["width"] = ((self.form_default_width - 50) / 2);
			}

			fieldJSON["list"] = [{
				type: "settings",
				position: "label-left",
				labelWidth: 140,
				inputWidth: 140,
				inputLeft: 10,
				index: -1
			}];
			fieldJSON["options"] = [{
				type: "settings",
				position: "label-left",
				labelWidth: 140,
				inputWidth: 140,
				inputLeft: 10,
				index: -1
			}];
		}
		else if (fieldJSON["type"] == 'container') {
			if (self.pages[uid][page_id].page_layout == "S") {
				fieldJSON["inputWidth"] = 200;
				fieldJSON["inputHeight"] = 100;
			}
			else {
				fieldJSON["inputWidth"] = 200;
				fieldJSON["inputHeight"] = 100;
			}

		}

		else if (fieldJSON["type"] == 'calendar') {
			if (fieldJSON["value"] == "" || fieldJSON["value"] == " " || fieldJSON["value"] == "  " || fieldJSON["value"] == null)
				delete fieldJSON["value"];

		}
		else if( fieldJSON["type"] == "upload" )
		{
			var url = CAIRS.MAP.API.getMappedURL(
			{
				resource: "/dhtmlx/form/upload", // mandatory
				responseType: "json", // not mandatory, default json
				params: "path=a"
			});
			
			fieldJSON["url"] = url;
			
			console.log({ url : CAIRS.MAP.API.getMappedURL(
			{
				resource: "/dhtmlx/form/upload", // mandatory
				responseType: "json", // not mandatory, default json
				params: "path=a"
			})});
			
			console.log(JSON.stringify({ url : CAIRS.MAP.API.getMappedURL(
			{
				resource: "/dhtmlx/form/upload", // mandatory
				responseType: "json", // not mandatory, default json
				params: "path=a"
			})}));
			
			
			 
            fieldJSON["autoStart"] = true;
            fieldJSON["swfPath"] = self.dhtmlx_codebase_path + "codebase/ext/uploader.swf";
            fieldJSON["swfUrl"] = url;
			if (self.pages[uid][page_id].page_layout == "S") {
				fieldJSON["inputWidth"] = ((self.form_default_width - 50) / 2);
			}
			else {
				fieldJSON["inputWidth"] = ((self.form_default_width - 50) / 2);
			}

			
			
			
		}
		else {
			fieldJSON["list"] = [];
			fieldJSON["options"] = [];
		}
		
		

		if (putOnClientOnly) {
			//console.log("putOnClientOnly")
			//console.log( fieldJSON["type_standard"] );
			fieldJSON["type"] = self._convertLibraryFieldTypetoDhtmlxType(fieldJSON["type_standard"]);

			/*if( fieldJSON["type_standard"] == "Y" )
				fieldJSON["bind_library_field"] = false;
			
			if( fieldJSON["type_standard"] == "X" )
				fieldJSON["bind_library_field"] = "caseworkers_names";
			
			if( fieldJSON["type_standard"] == "U" )
				fieldJSON["bind_library_field"] = false;
			
			if( fieldJSON["type_standard"] == "V" )
				fieldJSON["bind_library_field"] = false;*/

			//console.log(fieldJSON);
			
			if (fieldJSON["type_standard"] == "A")
			{
				fieldJSON["rows"] = 4;
				fieldJSON["style"] = "width:190px;";
			}

			if (typeof self.totalAddedFields[page_id] === 'undefined') {
				self.totalAddedFields[page_id] = 1;
			}

			if (self.pages[uid][page_id].page_layout == "S") {
				self._getPageColumnList(uid, page_id, "first").push(fieldJSON);
			}
			else if (self.pages[uid][page_id].page_layout == "D") {

				if ((self.totalAddedFields[page_id] % 2) == 0) {
					self._getPageColumnList(uid, page_id, "second").push(fieldJSON);
				}
				else {
					self._getPageColumnList(uid, page_id, "first").push(fieldJSON);
				}
				self.totalAddedFields[page_id] = self.totalAddedFields[page_id] + 1;
			}

			if (fieldJSON["type_standard"] == "Y" || fieldJSON["type_standard"] == "X" || fieldJSON["type_standard"] == "U" || fieldJSON["type_standard"] == "V") {
				// add a container as option
				// add a dropdown as option
			}

			//console.log( "--------------------------------------------------------------" );
			//console.log( fieldJSON );
			//self._startPreview( uid );

			if (callBack) callBack(fieldJSON["field_id"]);
		}
		else {
			//fieldJSON[ "index" ] = 0;
			//console.log( "--------------------------------------------------------------" );
			//console.log( fieldJSON );
			var type_MAP_standard = fieldJSON["type_standard"];
			var type_DHTMLX_standard = fieldJSON["type"];
			fieldJSON["type_standard"] = type_DHTMLX_standard;
			fieldJSON["type"] = type_MAP_standard;
			
			if ( typeof url !== 'undefined' ) {
				fieldJSON["url"] = encodeURIComponent(url);
				var swfUrl = fieldJSON["swfUrl"];
				fieldJSON["swfUrl"] = encodeURIComponent(swfUrl);
				//console.log( "----------->>>>>> "+fieldJSON["url"] );
			}
			
			
			
			//console.log( fieldJSON );
			//console.log( "--------------------------------------------------------------" );
			self._setStatusDataTransferForm(uid, "sending field hash", true);
			CAIRS.MAP.API.insert({
				resource: "/forms/" + form_id + "/pages/" + page_id + "/fields" // mandatory
				,
				format: "json" // json, yaml, xml. Default: json. Not mandatory
				,
				
				payload: "agency_id=" + self.configuration[self._getRawUID(uid)].agency_id + "&hash=" + JSON.stringify(fieldJSON) // mandatory for PUT and POST
				,
				/**
				 * Description
				 * @method onSuccess
				 * @param {} request
				 * @return
				 */
				onSuccess: function (request) // not mandatory
				{
					var json = eval('(' + request.response + ')');

					if (json.status == "success") {
						try
						{
							//dhtmlx.message( {type : "error", text : 'fields readed'} );
							self._setStatusDataTransferForm(uid, "new field saved: " + json.field_id);
	
							//console.log( "--------------------------------------------------------------" );
							//console.log( fieldJSON );
							fieldJSON["type_standard"] = type_MAP_standard;
							fieldJSON["type"] = type_DHTMLX_standard;
	
							fieldJSON["field_id"] = json.field_id;
							//console.log( fieldJSON );
							//console.log( "--------------------------------------------------------------" );
	
							/*if( fieldJSON["type_standard"] == "Y" )
								fieldJSON["bind_library_field"] = false;
							
							if( fieldJSON["type_standard"] == "X" )
								fieldJSON["bind_library_field"] = "caseworkers_names";
							
							if( fieldJSON["type_standard"] == "U" )
								fieldJSON["bind_library_field"] = false;
							
							if( fieldJSON["type_standard"] == "V" )
								fieldJSON["bind_library_field"] = false;*/
								
							fieldJSON["url"] = url;
							fieldJSON["swfUrl"] = swfUrl;
	
							if (typeof self.totalAddedFields[page_id] === 'undefined') {
								self.totalAddedFields[page_id] = 1;
							}
	
							if (self.pages[uid][page_id].page_layout == "S") {
								self._getPageColumnList(uid, page_id, "first").push(fieldJSON);
							}
							else if (self.pages[uid][page_id].page_layout == "D") {
	
								if ((self.totalAddedFields[page_id] % 2) == 0) {
									self._getPageColumnList(uid, page_id, "second").push(fieldJSON);
								}
								else {
									self._getPageColumnList(uid, page_id, "first").push(fieldJSON);
								}
								self.totalAddedFields[page_id] = self.totalAddedFields[page_id] + 1;
							}
	
							if (fieldJSON["type_standard"] == "Y" || fieldJSON["type_standard"] == "X" || fieldJSON["type_standard"] == "U" || fieldJSON["type_standard"] == "V") {
								// add a container as option
								// add a dropdown as option
								// {"field_id":"","option_id":"","type":"","type_standard":"","text_size":"","name":"","label":"","caption":"","tooltip":"","value":"","mask_to_use":"","className":""} 
	
								var wrapperID = json.field_id + "_" + fieldJSON["name"] + "_signature_wrapper";
								var comboID = json.field_id + "_" + fieldJSON["name"] + "_signature_dropdown";
								var inputID = json.field_id + "_" + fieldJSON["name"] + "_signature_input";
								var hiddenID = json.field_id + "_" + fieldJSON["name"] + "_signature_hidden";
								var dateID = json.field_id + "_" + fieldJSON["name"] + "_signature_date";
	
								var signature_container = {
									"field_id": fieldJSON["field_id"],
									"option_id": null,
									"type": "c",
									"type_standard": "c",
									"text_size": 0,
									"name": wrapperID,
									"label": "signature container",
									"text": "signature container",
									"caption": "",
									"tooltip": "",
									"value": "",
									"mask_to_use": "",
									"className": ""
								};
								//fieldJSON["bind_library_field"] = "caseworkers_names";
								var signature_dropdown = {
									"field_id": fieldJSON["field_id"],
									"option_id": null,
									"type": "D",
									"type_standard": "D",
									"text_size": 200,
									"name": comboID,
									"label": "name",
									"text": "name",
									"caption": "",
									"tooltip": "",
									"value": "",
									"mask_to_use": "",
									"className": "",
									"bind_library_field": "caseworkers_names"
								};
	
								var signature_hidden_field = {
									"field_id": fieldJSON["field_id"],
									"option_id": null,
									"type": "h",
									"type_standard": "h",
									"text_size": 200,
									"name": hiddenID,
									"label": "image name",
									"text": "image name",
									"caption": "",
									"tooltip": "",
									"value": "",
									"mask_to_use": "",
									"className": "",
									"bind_signature_container": wrapperID
								};
	
								var signature_text_field = {
									"field_id": fieldJSON["field_id"],
									"option_id": null,
									"type": "T",
									"type_standard": "T",
									"text_size": 200,
									"name": inputID,
									"label": "Title",
									"text": "Title",
									"caption": "",
									"tooltip": "",
									"value": "",
									"mask_to_use": "",
									"className": ""
								};
	
								var signature_date_field = {
									"field_id": fieldJSON["field_id"],
									"option_id": null,
									"type": "E",
									"type_standard": "E",
									"text_size": 200,
									"name": dateID,
									"label": "Date",
									"text": "Date",
									"caption": "",
									"tooltip": "",
									"value": "",
									"mask_to_use": "",
									"className": ""
								};
	
								self.progressOnForm(uid);
	
								self._addOptionToField(uid, signature_container, function () {
									self.progressOnForm(uid);
									self._addOptionToField(uid, signature_dropdown, function () {
										self.progressOnForm(uid);
										self._addOptionToField(uid, signature_hidden_field, function () {
											self.progressOnForm(uid);
											self._addOptionToField(uid, signature_text_field, function () {
												self.progressOnForm(uid);
												self._addOptionToField(uid, signature_date_field, function () {
													if (typeof self.signature_controls[uid] === 'undefined')
														self.signature_controls[uid] = [];
	
													self.signature_controls[uid].push({
														wrapper: wrapperID,
														combo: comboID,
														input: inputID,
														hidden: hiddenID,
														date: dateID
													});
													self.progressOffForm(uid);
												});
											});
										});
									});
								});
	
							}
	
							//self._startPreview( uid );
	
							if (callBack) callBack(fieldJSON["field_id"]);
						}
						catch(e)
						{
							console.log(e.stack);
						}
					}
					else {
						dhtmlx.message({
							type: "error",
							text: "Field don't saved. reason: " + json.response
						});
						self._setStatusDataTransferForm(uid, "field don't saved");
						if (json.response == "token not authorized")
							self._setStatusUserForm(uid, "token expired. Please login again", false);
					}

					self.progressOffForm(uid);

				},
				/**
				 * Description
				 * @method onFail
				 * @param {} request
				 * @return
				 */
				onFail: function (request) { // not mandatory
					var json = eval('(' + request.response + ')');
					dhtmlx.message({
						type: "error",
						text: json.response
					});
					self._setStatusDataTransferForm(uid, "field don't saved");
					if (json.response == "token not authorized")
						self._setStatusUserForm(uid, "token expired. Please login again", false);
					self.progressOffForm(uid);
				}
			});
		}
	}

	,
	/**
	 * Description
	 * @method _renderSignatureControl
	 * @param {} uid
	 * @return
	 */
	_renderSignatureControl: function (uid) {
		self = this;
		try {
			var form_id = self.form_properties[uid].getItemValue("form_id");
			if (typeof self.signature_controls[uid] === 'undefined') {
				self.signature_controls[uid] = [];
			}
			//console.log(self.signature_controls[ uid ]);
			var signatureWrappers = self.signature_controls[uid];
			signatureWrappers.forEach(function (wrapperObj, index, array) {
				var wrapperID = wrapperObj.wrapper;
				var comboID = wrapperObj.combo;
				var inputID = wrapperObj.input;
				var hiddenID = wrapperObj.hidden;
				var dateID = wrapperObj.date;

				//console.log( self.form_preview[ uid ].getContainer(wrapperID).id )

				var wrapper = document.getElementById(self.form_preview[uid].getContainer(wrapperID).id);

				//console.log( wrapper );

				var signature_area_ID = wrapperID.replace(/_wrapper/gi, "_active_area");

				var signature_control = null;
				if (document.getElementById(signature_area_ID + "_signature_control") != null) {
					signature_control = document.getElementById(signature_area_ID + "_signature_control");
				}
				else {
					signature_control = document.createElement("div");
					signature_control.setAttribute("id", signature_area_ID + "_signature_control");
					signature_control.innerHTML = "<img style='cursor:pointer;' src='" + self.icons_path + "sign_here.png' />";
					/**
					 * Description
					 * @method onclick
					 * @return
					 */
					signature_control.onclick = function () {
						//console.log( self.form_preview[ uid ].getCombo( comboID ) );
						if (self.form_preview[uid].getCombo(comboID).getSelectedValue().length < 1) {
							//console.log(self.form_grid_field_propertie_options[ uid ].getCombo( comboID ).getSelectedText().length);
							dhtmlx.message({
								type: "error",
								text: "Select a caseworker for signing this area first."
							});

							self.form_preview[uid].getCombo(comboID).openSelect();
							return;
						}

						var filesToLoad = [
							FormBuilder.signature_application_url + "SuperSignature/wz_jsgraphics.js" /* Super signature control */ , FormBuilder.signature_application_url + "SuperSignature/ss.js" /* Super signature control */
							//,self.configuration[ uid.replace(new RegExp("_" + form_id,"g"),"") ].signature_application_url + "css/signature_component.css" /* signature css */
							, FormBuilder.signature_application_url + "javascript/json2.js" /* json parser plugin */ , FormBuilder.signature_application_url + "controller/Signature_Component.js" /* signature model and controller */
						];
						/* load files and call signature component */
						CAIRS.onDemand.load(filesToLoad, function () {

							//console.log(self.getCaseWorkerId(uid, self.form_preview[ uid ].getCombo( comboID ).getSelectedText()));

							Signature_Component.signIn({
								user_id: self.form_preview[uid].getCombo(comboID).getSelectedValue(),
								user_name: self.form_preview[uid].getCombo(comboID).getComboText(), // mandatory

								agency_id: self.configuration[uid.replace(new RegExp("_" + form_id, "g"), "")].agency_id, // mandatory

								file_name: self.form_preview[uid].getCombo(comboID).getSelectedText().toString().split(" ")[0] + "_signature", // mandatory

								application_url: FormBuilder.signature_application_url, // mandatory
								file_path: self.configuration[uid.replace(new RegExp("_" + form_id, "g"), "")].signature_file_path, // mandatory - / slash on the end

								/* saving files under a path using the name as parameter */
								file_path_abs: self.configuration[uid.replace(new RegExp("_" + form_id, "g"), "")].signature_file_path_abs, // mandatory - / slash on the end

								div_display: signature_area_ID, // not mandatory

								width_display: 200,
								height_display: 50,

								marginTop: 100,

								icons_path: FormBuilder.signature_application_url + 'icons/', // mandatory
								
								window_manager : FormBuilder.window_manager,

								/**
								 * Description
								 * @method signedCallBack
								 * @param {} response
								 * @return
								 */
								signedCallBack: function (response) {

									self.form_preview[uid].setItemValue(hiddenID, response.file_path + "" + response.file_name);

									var hfield = self._getFormItem(hiddenID, uid + "_form_preview");

									self._getFieldOption(uid, hfield.page_id, hfield.field_id, hfield.option_id)["value"] = response.file_path + "" + encodeURIComponent( response.file_name );

									//console.log( self._getFieldOption( uid, hfield.page_id, hfield.field_id, hfield.option_id ) );

									//_getFieldOption : function( uid, page_id, field_id, option_id )
								} // not mandatory
							});
						});
					};
				}

				var signature_area = null;
				if (document.getElementById(signature_area_ID) != null) {
					signature_area = document.getElementById(signature_area_ID);
				}
				else {
					signature_area = document.createElement("div")
					signature_area.setAttribute("id", signature_area_ID);
					signature_area.style.width = "200px";
					signature_area.style.height = "50px";
					signature_area.style.float = "left";
				}

				try {
					wrapper.appendChild(signature_control);
					wrapper.appendChild(signature_area);
				}
				catch (e) {
					dhtmlx.message({
						type: "error",
						text: "Div wrapper " + signature_area_ID + " for rendering signature conttrol was not found. Check the application View."
					});
					//console.log( e.stack );
				}

				document.getElementById(self.form_preview[uid].getContainer(wrapperID).id).style.width = "200px";
				document.getElementById(self.form_preview[uid].getContainer(wrapperID).id).style.height = "100px";

				//console.log( self.form_preview[ uid ].getContainer(wrapperID) );

			});
		}
		catch (e) {
			//console.log(e.stack);
		}
	}

	,
	/**
	 * Description
	 * @method _putOptionOnMemory
	 * @param {} uid
	 * @param {} page_id
	 * @param {} field_id
	 * @param {} optionJSON
	 * @param {} callBack
	 * @param {} putOnClientOnly
	 * @return
	 */
	_putOptionOnMemory: function (uid, page_id, field_id, optionJSON, callBack, putOnClientOnly) {
		var self = this,
			option_id = optionJSON.option_id,
			form_id = self.form_properties[uid].getItemValue("form_id");

		//console.log(" _putOptionOnMemory  ----------- put on memory");
		//console.log(page_id);
		//console.log(field_id);
		console.log(optionJSON);
		
		if( optionJSON["text"] == "" )
			optionJSON["text"] =  optionJSON["value"];

		if (option_id == null) // add on DB ALSO
		{
			//console.log( "server side" );
			//console.log("----------- before change");
			//console.log( optionJSON );
			var type_MAP_standard = optionJSON["type_standard"];
			var type_DHTMLX_standard = optionJSON["type"];
			optionJSON["type_standard"] = type_DHTMLX_standard;
			optionJSON["type"] = type_MAP_standard;
			//console.log("----------- after change");
			//console.log( optionJSON );

			optionJSON["page_id"] = page_id;

			//console.log( "--------------------------------------------------------------" );
			self._setStatusDataTransferForm(uid, "sending option hash", true);

			CAIRS.MAP.API.insert({
				resource: "/forms/" + form_id + "/pages/" + page_id + "/fields/" + field_id + "/options" // mandatory
				,
				format: "json" // json, yaml, xml. Default: json. Not mandatory
				,
				payload: "agency_id=" + self.configuration[self._getRawUID(uid)].agency_id + "&hash=" + JSON.stringify(optionJSON) // mandatory for PUT and POST
				,
				/**
				 * Description
				 * @method onSuccess
				 * @param {} request
				 * @return
				 */
				onSuccess: function (request) // not mandatory
				{
					var json = eval('(' + request.response + ')');

					if (json.status == "success") {
						//dhtmlx.message( {type : "error", text : 'fields readed'} );
						self._setStatusDataTransferForm(uid, "new option saved: " + json.option_id);

						//console.log( "--------------------------------------------------------------" );
						//console.log( optionJSON );
						optionJSON["type_standard"] = type_MAP_standard;
						optionJSON["type"] = type_DHTMLX_standard;

						optionJSON["option_id"] = json.option_id;
						//console.log( optionJSON );
						//console.log( "--------------------------------------------------------------" );
						
						
						// if is a valid form element and not an option
						if (optionJSON["type"] == ' ') {
							//optionJSON["text"] = optionJSON["label"];
							optionJSON["value"] = optionJSON["label"];
						}
						
						
						console.log( optionJSON );

						if (self.pages[uid][page_id].page_layout == "S") {
							self._getPageColumnList(uid, page_id, "first").forEach(function (field, index, array) {
								if (field.field_id == field_id) {
									self._getPageColumnList(uid, page_id, "first")[index].list.push(optionJSON);
									self._getPageColumnList(uid, page_id, "first")[index].options.push(optionJSON);
								}

							});
						}
						else if (self.pages[uid][page_id].page_layout == "D") {
							self._getPageColumnList(uid, page_id, "first").forEach(function (field, index, array) {
								if (field.field_id == field_id) {
									self._getPageColumnList(uid, page_id, "first")[index].list.push(optionJSON);
									self._getPageColumnList(uid, page_id, "first")[index].options.push(optionJSON);
								}
							});
							self._getPageColumnList(uid, page_id, "second").forEach(function (field, index, array) {
								if (field.field_id == field_id) {
									self._getPageColumnList(uid, page_id, "second")[index].list.push(optionJSON);
									self._getPageColumnList(uid, page_id, "second")[index].options.push(optionJSON);
								}
							});
						}
						self._startPreview(uid);
						if (callBack) callBack(optionJSON["option_id"]);
						self.progressOffForm(uid);
					}
					else {
						dhtmlx.message({
							type: "error",
							text: "Option don't saved. reason: " + json.response
						});
						self._setStatusDataTransferForm(uid, "option don't saved");
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
					var json = eval('(' + request.response + ')');
					dhtmlx.message({
						type: "error",
						text: json.response
					});

					self._setStatusDataTransferForm(uid, "option don't saved");
					if (json.response == "token not authorized")
						self._setStatusUserForm(uid, "token expired. Please login again", false);

					self.progressOffForm(uid);
				}
			});
		}
		else // add on memory only
		{
			//console.log( "memory only" );
			//console.log( optionJSON );

			var parent_field = self._getPageField(uid, page_id, field_id);

			//console.log("my parent type");
			//console.log( parent_field.type_standard );

			var wrapperID = field_id + "_" + parent_field["name"] + "_signature_wrapper";
			var comboID = field_id + "_" + parent_field["name"] + "_signature_dropdown";
			var inputID = field_id + "_" + parent_field["name"] + "_signature_input";
			var hiddenID = field_id + "_" + parent_field["name"] + "_signature_hidden";
			var dateID = field_id + "_" + parent_field["name"] + "_signature_date";
			
			// if is a valid form element and not an option
			if (optionJSON["type"] == ' ') {
				//optionJSON["text"] = optionJSON["label"];
				optionJSON["value"] = optionJSON["label"];
			}
			

			if (optionJSON["type"] == "container") {
				//console.log("XXXXX I'm container, yeahhhh!  XXXXX");
				//console.log("XXXXX now you can drink a coffee! XXXXX");

				if (typeof parent_field.type_standard !== 'undefined')
					if (parent_field.type_standard == "X" || parent_field.type_standard == "Y" || parent_field.type_standard == "U" || parent_field.type_standard == "V")
						optionJSON["bind_signature_container"] = wrapperID;

			}

			if (optionJSON["type"] == "calendar") {
				//console.log("XXXXX I'm calendar, yeahhhh!  XXXXX");
				//console.log("XXXXX now you can drink a coffee! XXXXX");

				//console.log(optionJSON["value"]);

				if (optionJSON["value"] == "" || optionJSON["value"] == " " || optionJSON["value"] == "  " || optionJSON["value"] == null)
					delete optionJSON["value"];

			}

			if (optionJSON["type"] == "combo") {
				//console.log("XXXXX I'm combo, yeahhhh!  XXXXX");
				//console.log("XXXXX now you can drink a coffee! XXXXX");

				if (parent_field.type_standard == "X" || parent_field.type_standard == "Y" || parent_field.type_standard == "U" || parent_field.type_standard == "V") {

					if (typeof self.signature_controls[uid] === 'undefined')
						self.signature_controls[uid] = [];

					self.signature_controls[uid].push({
						wrapper: wrapperID,
						combo: comboID,
						input: inputID,
						hidden: hiddenID,
						date: dateID
					});
				}

				if (typeof parent_field.type_standard !== 'undefined')
					if (parent_field.type_standard == "X") {
						optionJSON["bind_library_field"] = "caseworkers_names";
					}
				if (parent_field.type_standard == "Y") {
					optionJSON["bind_library_field"] = "caseworkers_names";
				}
			}


			console.log( optionJSON );


			if (self.pages[uid][page_id].page_layout == "S") {
				//console.log( self._getPageColumnList( uid, page_id, "first" ) );

				self._getPageColumnList(uid, page_id, "first").forEach(function (field, index, array) {
					if (field.field_id == field_id) {
						self._getPageColumnList(uid, page_id, "first")[index].list.push(optionJSON);
						self._getPageColumnList(uid, page_id, "first")[index].options.push(optionJSON);
						//console.log( self._getPageColumnList( uid, page_id, "first" )[index] );
					}

				});
			}
			else if (self.pages[uid][page_id].page_layout == "D") {
				self._getPageColumnList(uid, page_id, "first").forEach(function (field, index, array) {
					if (field.field_id == field_id) {
						self._getPageColumnList(uid, page_id, "first")[index].list.push(optionJSON);
						self._getPageColumnList(uid, page_id, "first")[index].options.push(optionJSON);
						//console.log( self._getPageColumnList( uid, page_id, "first" )[index] );
					}
				});

				self._getPageColumnList(uid, page_id, "second").forEach(function (field, index, array) {
					if (field.field_id == field_id) {
						self._getPageColumnList(uid, page_id, "second")[index].list.push(optionJSON);
						self._getPageColumnList(uid, page_id, "second")[index].options.push(optionJSON);
						//console.log( self._getPageColumnList( uid, page_id, "second" )[index] );
					}
				});
			}

			if (callBack) callBack(option_id);
		}

	}

	,
	/**
	 * Description
	 * @method _readFormData
	 * @param {} uid
	 * @param {} form_id
	 * @return
	 */
	_readFormData: function (uid, form_id) {
		var self = this,
			form_readed = false,
			commands = [];
		self.progressOnForm(uid);
		self._setStatusDataTransferForm(uid, "requesting form(" + form_id + ") hash", true);
		CAIRS.MAP.API.get({
			resource: "/forms/" + form_id,
			format: "json",
			payload: "agency_id=" + self.configuration[uid.replace(new RegExp("_" + form_id, "g"), "")].agency_id + "",
			/**
			 * Description
			 * @method onSuccess
			 * @param {} request
			 * @return
			 */
			onSuccess: function (request) {
				var json = eval('(' + request.response + ')');
				if (json.status == "success") {
					//dhtmlx.message( {type : "error", text : json.response} );
					self._setStatusDataTransferForm(uid, "form(" + form_id + ") hash received");

					self.form_properties[uid].setFormData(json.hash);

					self._readPagesData(uid, form_id, function (pagesAddedOnMemory) {
						
						console.log( "#$#$#$#$#$#" );
						console.log( pagesAddedOnMemory[0].page_id );
						self._readFieldsData(uid, form_id, pagesAddedOnMemory, function () {
							console.log( "#$#$#$#$#$#" );
							console.log( pagesAddedOnMemory[0].page_id );
							if ( pagesAddedOnMemory[0].page_id ) {
								
								console.log( "fire event" );
								self.selected_page[uid] = pagesAddedOnMemory[0].page_id;
								
								
								
								self.layout_form_layout_left[uid].cells("b").expand();
								self.toolbar_form_pages[uid].enableItem("delete_page");
								self.toolbar_form_pages[uid].enableItem("edit_page");
					
								self.setPageStatusInfo(uid, "selected page: " + pagesAddedOnMemory[0].page_id);
					
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
					
								
								self.grid_pages[uid].selectRow(0);
								
								self._feedGrid_form_fields(uid, pagesAddedOnMemory[0].page_id);
								
								
								
								
								
							}
						});
					});
				}
				else {
					dhtmlx.message({
						type: "error",
						text: json.response
					});
					self._setStatusDataTransferForm(uid, "unable to read form");
					if (json.response == "token not authorized")
						self._setStatusUserForm(uid, "token expired. Please login again", false);
				}
			},
			/**
			 * Description
			 * @method onFail
			 * @param {} request
			 * @return
			 */
			onFail: function (request) {
				var json = eval('(' + request.response + ')');
				dhtmlx.message({
					type: "error",
					text: json.response
				});
				self._setStatusDataTransferForm(uid, "unable to read form");
				if (json.response == "token not authorized")
					self._setStatusUserForm(uid, "token expired. Please login again", false);

				//self.progressOffForm( uid );
			}
		});
	}

	,
	/**
	 * Description
	 * @method _readPagesData
	 * @param {} uid
	 * @param {} form_id
	 * @param {} callBack
	 * @return
	 */
	_readPagesData: function (uid, form_id, callBack) {
		var self = this,
			form_readed = false,
			commands = [];
		self.progressOnForm(uid);
		self._setStatusDataTransferForm(uid, "requesting pages data", true);
		CAIRS.MAP.API.get({
			resource: "/forms/" + form_id + "/pages",
			format: "json",
			payload: "order=" + JSON.stringify({
				direction: 'ASC',
				orderby: 'index'
			}) // index
			,
			/**
			 * Description
			 * @method onSuccess
			 * @param {} request
			 * @return
			 */
			onSuccess: function (request) {
				var json = eval('(' + request.response + ')');
				if (json.status == "success") {
					//dhtmlx.message( {type : "error", text : 'Form data is ready'} );
					self._setStatusDataTransferForm(uid, "pages received");

					json.pages.sort(function (a, b) {
						return a.index - b.index;
					});

					var pagesAddedOnMemory = [];
					/**
					 * Description
					 * @method addPage
					 * @return
					 */
					function addPage() {
						if (json.pages.length > 0) {
							var page = json.pages[0];
							json.pages.splice(0, 1);
							console.log( ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.." );
							console.log( page );
							page["uid"] = uid;
							self._addPage(page, function () {
								pagesAddedOnMemory.push(page);
								self.progressOffForm(uid);
								addPage();
							});
						}
						else {
							self.progressOffForm(uid);
							self._startPreview(uid);
							if (callBack) callBack(pagesAddedOnMemory);
						}
					}

					//self.progressOnForm( uid );
					addPage();

				}
				else {
					dhtmlx.message({
						type: "error",
						text: json.response
					});
					self.progressOffForm(uid);
				}
			},
			/**
			 * Description
			 * @method onFail
			 * @param {} request
			 * @return
			 */
			onFail: function (request) {
				var json = eval('(' + request.response + ')');
				self._setStatusErrorForm(uid, json.response);

				self.progressOffForm(uid);
			}
		});
	}

	,
	/**
	 * Description
	 * @method _readFieldsData
	 * @param {} uid
	 * @param {} form_id
	 * @param {} pagesAddedOnMemory
	 * @param {} callBack
	 * @return
	 */
	_readFieldsData: function (uid, form_id, pagesAddedOnMemory, callBack) {
		var self = this,
			form_readed = false,
			commands = [],
			fieldsList = [],
			pageList = [],
			queryColumns = "" + self.model.conf_grid_fields.ids + ",page_id,field_id";

		for (var x = 0; x < pagesAddedOnMemory.length; x++)
			pageList.push(pagesAddedOnMemory[x].page_id);

		self.progressOnForm(uid);
		
		if(  pageList.join().length < 1 )
		{
			self.progressOffForm(uid);
			return;
		}
		
		self._setStatusDataTransferForm(uid, "requesting page(" + pageList.join() + ") fields", true);
		CAIRS.MAP.API.get({
			resource: "/forms/" + form_id + "/pages/" + pageList.join() + "/fields",
			format: "json"
			//,sync : true // force synchronous mode. It will for to display loading wheel for this form
			,
			payload: "columns=" + queryColumns + "&order=" + JSON.stringify({
				direction: 'ASC',
				orderby: 'index'
			}),
			/**
			 * Description
			 * @method onSuccess
			 * @param {} request
			 * @return
			 */
			onSuccess: function (request) {
				var json = eval('(' + request.response + ')');
				if (json.status == "success") {
					self._setStatusDataTransferForm(uid, "page(" + pageList.join() + ") fields received");
					self._setStatusForm(uid, "FormBuilder is ready. The form(" + form_id + ") is ready for editing");

					json.fields.sort(function (a, b) {
						return a.index - b.index;
					});

					/**
					 * Description
					 * @method addField
					 * @return
					 */
					function addField() {
						if (json.fields.length > 0) {
							// put all field on memory
							var field = json.fields[0];
							json.fields.splice(0, 1);

							var type_MAP_standard = field["type"];
							var type_DHTMLX_standard = field["type_standard"];
							var rowData = [];

							field["type"] = type_DHTMLX_standard;
							field["type_standard"] = type_MAP_standard;

							for (var y = 0; y < queryColumns.split(",").length; y++) {
								var id = queryColumns.split(",")[y];
								if (typeof field[id] !== 'undefined') {
									if (id == "required") {
										if (field[id] == "")
											rowData.push(0);
										else
											rowData.push(field[id]);
									}
									if (id == "use_library") {
										if (field[id] == "")
											rowData.push(0);
										else if (field[id] == "0")
											rowData.push(0);
										else
											rowData.push(field[id]);
									}
									else if (id == "type") {
										rowData.push(type_MAP_standard);
									}
									else if (id == "type_standard") {
										rowData.push(type_DHTMLX_standard);
									}
									else {
										rowData.push(field[id]);
									}
								}
								else {
									//console.log(id);
								}
							}

							field["data"] = rowData;

							//console.log("<>#############################################");
							//console.log( field )

							self._putFieldOnMemory(uid, field["page_id"], field, function (field_id) {
								fieldsList.push(field_id);
								addField();
							}, true);
						}
						else {
							// read all options/child elements for all pages and all fields in just one AJAX request
							//console.log("calling options ------ ");
							self._readOptionsData(uid, form_id, pageList.join(), fieldsList.join(), function () {
								self._startPreview(uid);
								//self.toolbar_form[uid].enableItem("generate_form");
								if (callBack)callBack();
								self.progressOffForm(uid);
							});
						}
					}
					// start adding field	
					addField();
				}
				else {
					dhtmlx.message({
						type: "error",
						text: json.response
					});
					self.progressOffForm(uid);
				}
			},
			/**
			 * Description
			 * @method onFail
			 * @param {} request
			 * @return
			 */
			onFail: function (request) {
				var json = eval('(' + request.response + ')');
				dhtmlx.message({
					type: "error",
					text: json.response
				});
			}
		});
	}

	,
	/**
	 * Description
	 * @method _readOptionsData
	 * @param {} uid
	 * @param {} form_id
	 * @param {} page_id
	 * @param {} field_id
	 * @param {} callBack
	 * @return
	 */
	_readOptionsData: function (uid, form_id, page_id, field_id, callBack) {
		var self = this,
			form_readed = false,
			commands = [];

		if (field_id == null || field_id == "") {
			self.progressOffForm(uid);
			return;
		}

		var queryColumns = "" + self.model.conf_grid_field_propertie_options.ids + ",optionname,page_id,option_id,field_id";

		self.progressOnForm(uid);
		self._setStatusDataTransferForm(uid, "requesting options of the field(" + field_id + ")", true);
		CAIRS.MAP.API.get({
			resource: "/forms/" + form_id + "/pages/" + page_id + "/fields/" + field_id + "/options",
			format: "json"
			//,sync : true // force synchronous mode. It will for to display loading wheel for this form
			,
			payload: "columns=" + queryColumns + "&order=" + JSON.stringify({
				direction: 'ASC',
				orderby: 'index'
			}),
			/**
			 * Description
			 * @method onSuccess
			 * @param {} request
			 * @return
			 */
			onSuccess: function (request) {
				var json = eval('(' + request.response + ')');
				if (json.status == "success") {
					self._setStatusDataTransferForm(uid, "options for field(" + field_id + ") received");

					var added = 0;
					json.options.sort(function (a, b) {
						return a.index - b.index;
					});
					for (var x = 0; x < json.options.length; x++) {
						self.progressOnForm(uid);
						var option = json.options[x];
						var type_MAP_standard = option["type"];
						var type_DHTMLX_standard = option["type_standard"];

						option["type"] = type_DHTMLX_standard;
						option["type_standard"] = type_MAP_standard;
						var rowData = [];
						for (var y = 0; y < queryColumns.split(",").length; y++) {
							var id = queryColumns.split(",")[y];
							//console.log(id);
							if (typeof option[id] !== 'undefined') {
								if (id == "required") {
									if (option[id] == "") {
										rowData.push(0);
									}
									else {
										rowData.push(option[id]);
									}
								}
								else if (id == "type") {
									rowData.push(type_MAP_standard);
								}
								else if (id == "type_standard") {
									rowData.push(type_DHTMLX_standard);
								}
								else {
									rowData.push(option[id]);
								}
							}
							else {

							}
						}

						option["data"] = rowData;

						if (option["text"] == "") {
							option["text"] = option["optionname"];
						}

						//console.log(">>>>>>>>>>>>>>>>>>>>>>>>>> _readOptionsData")
						//console.log( option );

						self._putOptionOnMemory(uid, option["page_id"], option["field_id"], option, function (option_id) {
							self.progressOffForm(uid);
						}, true); // on client only
					}

					if (callBack) callBack();
				}
				else {
					dhtmlx.message({
						type: "error",
						text: json.response
					});
					self.progressOffForm(uid);
				}
			},
			/**
			 * Description
			 * @method onFail
			 * @param {} request
			 * @return
			 */
			onFail: function (request) {
				var json = eval('(' + request.response + ')');
				dhtmlx.message({
					type: "error",
					text: json.response
				});
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
			return "input";
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

		case "h":
			return "hidden";
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
	 * @method _editFieldOfAPage
	 * @param {} uid
	 * @param {} hash
	 * @param {} callBack
	 * @return
	 */
	_editFieldOfAPage: function (uid, hash, callBack) {
		var self = this,
			field_id, form_id = self.form_properties[uid].getItemValue("form_id"),
			page_id = null;

		console.log(hash);

		if (typeof hash["page_id"] === 'undefined')
			page_id = self.grid_pages[uid].getSelectedRowId();

		if (typeof hash["field_id"] === "undefined") {
			dhtmlx.message({
				type: "error",
				text: "field_id is missing"
			});
			//if( callBack ) callBack();
			return;
		}
		if (self.selected_page[uid] == null) {
			dhtmlx.message({
				type: "error",
				text: "You need to select a page before adding fields."
			});
			//if( callBack ) callBack();
			return;
		}

		field_id = hash["field_id"];

		hash["name"] = self.handleInputName(uid, hash["label"]);

		if (hash["type"]) {
			var type_MAP_standard = hash["type_standard"];
			var type_DHTMLX_standard = hash["type"];
			hash["type"] = type_MAP_standard;
			hash["type_standard"] = type_DHTMLX_standard;
		}
		else {
			//console.log("type not defined");
			var type_MAP_standard = hash["type_standard"];
			var type_DHTMLX_standard = hash["type"];
			hash["type"] = self._getPageField(uid, self.selected_page[uid], field_id)["type_standard"];
			hash["type_standard"] = self._getPageField(uid, self.selected_page[uid], field_id)["type"];
		}
		
		if( hash["type_standard"].length == 1)
			hash["type_standard"] = self._convertLibraryFieldTypetoDhtmlxType( hash["type_standard"]);

		self.progressOnForm(uid);
		self._setStatusDataTransferForm(uid, "sending field_id(" + field_id + ") hash", true);

		delete hash["name"];

		CAIRS.MAP.API.update({
			resource: "/forms/" + form_id + "/pages/" + page_id + "/fields/" + field_id // mandatory
			,
			format: "json" // json, yaml, xml. Default: json. Not mandatory
			,
			payload: "agency_id=" + self.configuration[self._getRawUID(uid)].agency_id + "&hash=" + JSON.stringify(hash) // mandatory for PUT and POST
			,
			/**
			 * Description
			 * @method onSuccess
			 * @param {} request
			 * @return
			 */
			onSuccess: function (request) // not mandatory
			{
				var json = eval('(' + request.response + ')');

				if (json.status == "success") {
					self._setStatusDataTransferForm(uid, "field_id(" + field_id + ") saved");
					var rowData = [];
					self.model.conf_grid_fields.ids.split(",").forEach(function (id, index, array) {
						if (typeof hash[id] !== 'undefined') {
							if (id == 'required') {
								if (hash[id] == 1) {

									try {
										self.grid_form_fields[uid].cells(field_id, self.grid_form_fields[uid].getColIndexById(id)).setValue(1);
									}
									catch (e) {

									}
									self._getPageField(uid, self.selected_page[uid], field_id)[id] = 1;
									rowData.push(1);
								}
								else {

									try {
										self.grid_form_fields[uid].cells(field_id, self.grid_form_fields[uid].getColIndexById(id)).setValue(0);
									}
									catch (e) {

									}
									self._getPageField(uid, self.selected_page[uid], field_id)[id] = 0;
									rowData.push(0);
								}
							}
							else if (id == "use_library") {
								try {
									var islib = self.grid_form_fields[uid].cells(field_id, self.grid_form_fields[uid].getColIndexById(id)).getValue();
									self._getPageField(uid, self.selected_page[uid], field_id)[id] = islib;
									rowData.push(islib);
								}
								catch (e) {
									self._getPageField(uid, self.selected_page[uid], field_id)[id] = hash[id];
									rowData.push(hash[id]);
								}

							}
							else if (id == "tooltip") {

								try {
									self.grid_form_fields[uid].cells(field_id, self.grid_form_fields[uid].getColIndexById(id)).setValue(hash[id]);
								}
								catch (e) {

								}
								self._getPageField(uid, self.selected_page[uid], field_id)["tooltip"] = hash[id];
								self._getPageField(uid, self.selected_page[uid], field_id)["note"] = {
									text: hash[id]
								};
								self._getPageField(uid, self.selected_page[uid], field_id)["info"] = true;
								rowData.push(hash[id]);
							}
							else if (id == "name") {

								try {
									self.grid_form_fields[uid].cells(field_id, self.grid_form_fields[uid].getColIndexById(id)).setValue(hash[id]);
								}
								catch (e) {

								}
								self._getPageField(uid, self.selected_page[uid], field_id)[id] = hash[id];
								self._getPageField(uid, self.selected_page[uid], field_id)["name"] = hash[id];
								rowData.push(hash[id]);
							}
							else if (id == "type") {

								try {
									self.grid_form_fields[uid].cells(field_id, self.grid_form_fields[uid].getColIndexById(id)).setValue(hash[id]);
								}
								catch (e) {

								}
								self._getPageField(uid, self.selected_page[uid], field_id)[id] = hash[id];
								self._getPageField(uid, self.selected_page[uid], field_id)["type"] = self._convertLibraryFieldTypetoDhtmlxType(hash[id]);

								if (hash[id] == "A")
								{
									self._getPageField(uid, self.selected_page[uid], field_id)["rows"] = 4;
									self._getPageField(uid, self.selected_page[uid], field_id)["style"] = "width:190px;";
								}

								rowData.push(hash[id]);
							}
							else {
								//console.log( hash[ id ] );
								if (hash[id]) {

									try {
										self.grid_form_fields[uid].cells(field_id, self.grid_form_fields[uid].getColIndexById(id)).setValue(hash[id]);
									}
									catch (e) {

									}
									self._getPageField(uid, self.selected_page[uid], field_id)[id] = hash[id];
									rowData.push(hash[id]);
								}
								else {

									try {
										self.grid_form_fields[uid].cells(field_id, self.grid_form_fields[uid].getColIndexById(id)).setValue("");
									}
									catch (e) {

									}
									self._getPageField(uid, self.selected_page[uid], field_id)[id] = "";
									rowData.push(hash[id]);
								}
							}
						}
						else {
							//console.log( "grid column name not present on form hash -----------------------" );
							//console.log( id );
							//console.log( hash[ id ] );
							//console.log( "grid column name not present on form hash -----------------------" );
							//self.grid_form_fields[ uid ].cells(field_id, self.grid_form_fields[ uid ].getColIndexById( id ) ).setValue( hash[ id ] );
							//rowData.push( hash[ id ] );
						}

						self._getPageField(uid, self.selected_page[uid], field_id)["data"] = rowData;

					});
					self._startPreview(uid);
					self.progressOffForm(uid);
					if (callBack) callBack();
				}
				else {
					dhtmlx.message({
						type: "error",
						text: "Field don't saved. reason: " + json.response
					});
					self._setStatusDataTransferForm(uid, "field don't saved");
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
				var json = eval('(' + request.response + ')');
				dhtmlx.message({
					type: "error",
					text: json.response
				});
				self._setStatusDataTransferForm(uid, "field don't saved");
				if (json.response == "token not authorized")
					self._setStatusUserForm(uid, "token expired. Please login again", false);
				self.progressOffForm(uid);
			}
		});
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
					if (hash["inlibrary"] == 1) {
						rowData.push("1");
						hash["use_library"] = "1";
					}
					else {
						rowData.push("0");
						hash["use_library"] = "0";
					}
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

					if (hash["inlibrary"] == 1) {
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
			className: hash.className
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
		

		self._putFieldOnMemory(uid, self.selected_page[uid], fieldJSON, function (newFieldID) {

			//fieldJSON[ "field_id" ] = newFieldID;
			self.grid_form_fields[uid].addRow(newFieldID, rowData);
			self.grid_form_fields[uid].cells(newFieldID, self.grid_form_fields[uid].getColIndexById("validate")).setValue(fieldJSON["validate"]);
			self.toolbar_custom_field[uid].enableItem("save_field");
			self._startPreview(uid);

		});

		//self._reOrderPageFields( uid );
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
			className: ""
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

		self._putFieldOnMemory(uid, self.selected_page[uid], fieldJSON, function (newFieldID) {
			fieldJSON["field_id"] = newFieldID;
			self.grid_form_fields[uid].addRow(newFieldID, rowData);
			self.grid_form_fields[uid].cells(newFieldID, self.grid_form_fields[uid].getColIndexById("mask_to_use")).setValue(d.mask_to_use);
			self.grid_form_fields[uid].cells(newFieldID, self.grid_form_fields[uid].getColIndexById("use_library")).setValue("0");
			self.grid_form_fields[uid].cells(newFieldID, self.grid_form_fields[uid].getColIndexById("library_field_id")).setValue("0");
			self._startPreview(uid);
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

		var type_value = self.grid_library_fields[uid].cells( libraryFieldID, self.grid_library_fields[uid].getColIndexById("type") ).getValue();
		var name = self.grid_library_fields[uid].cells( libraryFieldID, self.grid_library_fields[uid].getColIndexById("name") ).getValue();
		var label = self.grid_library_fields[uid].cells( libraryFieldID, self.grid_library_fields[uid].getColIndexById("label") ).getValue();

		var rowData = [];
		var grid_cols = self.model.conf_grid_library_fields.ids.split(",").splice(1, self.model.conf_grid_library_fields.ids.split(",").length -1);
		grid_cols.forEach(function (id, index, array) {
			var colIndex = self.grid_library_fields[uid].getColIndexById(id);
			//console.log( id );
			if (id.toLowerCase() == 'fieldname')
				rowData.push(self.grid_library_fields[uid].cells(libraryFieldID, colIndex).getValue().toString().split("_" + libraryFieldID)[0]);
			else if (id.toLowerCase() == 'library_field_id')
				rowData.push(libraryFieldID);
			else if (id.toLowerCase() == 'use_library')
				rowData.push("1");
			else if (id.toLowerCase() == 'required')
				if (self.grid_library_fields[uid].cells(libraryFieldID, colIndex).getValue() == "" || self.grid_library_fields[uid].cells(libraryFieldID, colIndex).getValue() == null)
					rowData.push("0");
				else
					rowData.push(self.grid_library_fields[uid].cells(libraryFieldID, colIndex).getValue());
			else
				rowData.push(self.grid_library_fields[uid].cells(libraryFieldID, colIndex).getValue());
		});

		/**/
		var fieldJSON = {
			type: self._convertLibraryFieldTypetoDhtmlxType(type_value),
			type_standard: type_value,
			name: name,
			label: label,
			value: "",
			tooltip: "",
			required: false,
			validate: "",
			field_id: newid,
			data: rowData,
			index: self.grid_form_fields[uid].getRowsNum(),
			list: [],
			options: [],
			className: ""
		};
		self._putFieldOnMemory(uid, self.selected_page[uid], fieldJSON, function () {
			self._startPreview(uid);
		});
		
		console.log( rowData );
		console.log(  self.model.conf_grid_library_fields.ids.split(",").splice(1, self.model.conf_grid_library_fields.ids.split(",").length -1).join() );
		console.log( fieldJSON );
		

		self.grid_form_fields[uid].addRow(newid, rowData);

		//self._reOrderPageFields( uid );
	}

	,
	/**
	 * Description
	 * @method _addGroupOfFieldsToPage
	 * @param {} uid
	 * @param {} groupID
	 * @return
	 */
	_addGroupOfFieldsToPage: function (uid, groupID) {
		var self = this;
		self.progressOnForm(uid);
		self._setStatusDataTransferForm(uid, "requesting group(" + groupID + ") fields", true);
		CAIRS.MAP.API.get({
			resource: "/LibraryFields/groups/fields/" + groupID // mandatory
			,
			format: "json" // json, yaml, xml. Default: json. Not mandatory
			,
			payload: "columns=" + self.model.conf_grid_library_fields.ids + "",
			/**
			 * Description
			 * @method onSuccess
			 * @param {} request
			 * @return
			 */
			onSuccess: function (request) { // not mandatory
				var json = JSON.parse(request.response);
				if (json.status == "success") {
					var rows = json.rows;
					rows.forEach(function (row, index, array) {
						if (self.grid_form_fields[uid].doesRowExist(row.id)) {

						}
						else {
							var newid = self.grid_form_fields[uid].uid();

							row.data[self.grid_library_fields[uid].getColIndexById("required")] = 0;
							row.data[self.grid_library_fields[uid].getColIndexById("use_library")] = "1";
							row.data[self.grid_form_fields[uid].getColIndexById("library_field_id")] = row.id;

							self.grid_form_fields[uid].addRow(newid, row.data);

							var type_value = row.data[self.grid_library_fields[uid].getColIndexById("type")];
							var name = row.data[self.grid_library_fields[uid].getColIndexById("name")];
							var label = row.data[self.grid_library_fields[uid].getColIndexById("label")];
							/**/
							var fieldJSON = {
								type: self._convertLibraryFieldTypetoDhtmlxType(type_value),
								type_standard: type_value,
								name: name,
								label: label,
								value: "",
								tooltip: "",
								required: false,
								validate: "",
								field_id: newid,
								data: row.data,
								index: self.grid_form_fields[uid].getRowsNum(),
								list: [],
								options: [],
								className: ""
							};
							self._putFieldOnMemory(uid, self.selected_page[uid], fieldJSON, function () {
								self._startPreview(uid);
							});
							//self._reOrderPageFields( uid );
						}

					});
					if (rows.length == 0) {
						dhtmlx.message({
							type: "error",
							text: "The dragged group has no fields."
						});
					}
					self.progressOffForm(uid);

				}
				else {
					dhtmlx.message({
						type: "error",
						text: json.response
					});
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
				//console.log(request);
				self.progressOffForm(uid);
			}
		});
	}

	,
	grid_field_propertie_options_start_sequence: []

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
			
			console.log( hash );

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

		console.log( text );
		
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
				//console.log( self._getFieldOptionsNumber( uid, page_id, field_id ) );

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
							record.push(self._getFieldOptionsNumber(uid, page_id, field_id));
							hash[id] = self._getFieldOptionsNumber(uid, page_id, field_id);

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

				console.log( optionJSON );
				
				if( optionJSON["value"] == "" && text.length > 0 )
					optionJSON["value"] = text;

				self._putOptionOnMemory(uid, self.selected_page[uid], field_id, optionJSON, function (option_id)
				{
				
					if (self.grid_field_propertie_options[uid])
						self.grid_field_propertie_options[uid].addRow(option_id, record);
					self._startPreview(uid);
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
	 * @method _editOptionOfAField
	 * @param {} uid
	 * @param {} hash
	 * @param {} callBack
	 * @return
	 */
	_editOptionOfAField: function (uid, hash, callBack) {
		var self = this,
			record = [],
			text = hash.text,
			asdefault = hash.asdefault,
			form_id = self.form_properties[uid].getItemValue("form_id"),
			page_id = self.grid_pages[uid].getSelectedRowId();

		if (typeof self.grid_field_propertie_options_start_sequence[uid] === 'undefined')
			self.grid_field_propertie_options_start_sequence[uid] = 0;

		var option_id = self.grid_field_propertie_options[uid].getSelectedRowId();
		var field_id = self.grid_form_fields[uid].getSelectedRowId();

		var ftype = self._convertLibraryFieldTypetoDhtmlxType(hash["type"]);
		if (ftype == "combo" || ftype == "multiselect" || ftype == "select")
			hash["optionname"] = hash["text"];
		else
			hash["optionname"] = hash["label"];

		hash["caption"] = hash["label"];

		//var type_MAP_standard = hash[ "type_standard" ];
		//var type_DHTMLX_standard = hash[ "type" ];
		hash["type_standard"] = self._convertLibraryFieldTypetoDhtmlxType(hash["type_standard"]);
		//hash[ "type" ] = type_MAP_standard;

		if (hash["asdefault"] == 1 || hash["asdefault"] == "1" || hash["asdefault"] == "Y")
			hash["asdefault"] = "Y";
		else
			hash["asdefault"] = "N";

		//console.log( "_editOptionOfAField" );
		//console.log( hash );
		
		if( hash["value"] == "" && hash.length > 0 )
			hash["value"] = hash.text;

		self.progressOnForm(uid);
		self._setStatusDataTransferForm(uid, "sending option(" + hash["option_id"] + ") hash", true);
		CAIRS.MAP.API.update({
			resource: "/forms/" + form_id + "/pages/" + page_id + "/fields/" + field_id + "/options/" + hash["option_id"],
			format: "json",
			payload: "agency_id=" + self.configuration[self._getRawUID(uid)].agency_id + "&hash=" + JSON.stringify(hash),
			/**
			 * Description
			 * @method onSuccess
			 * @param {} request
			 * @return
			 */
			onSuccess: function (request) {
				var json = eval('(' + request.response + ')');

				if (json.status == "success") {
					self._setStatusDataTransferForm(uid, "option(" + hash["option_id"] + ") saved");
					for (fieldname in hash)
						if (hash.hasOwnProperty(fieldname))
							if (fieldname == "type") {
								self._getFieldOption(uid, self.selected_page[uid], field_id, hash["option_id"])[fieldname] = self._convertLibraryFieldTypetoDhtmlxType(hash[fieldname]);
								try {
									self.grid_field_propertie_options[uid].cells(option_id, self.grid_field_propertie_options[uid].getColIndexById(fieldname)).setValue(hash[fieldname]);
								}
								catch (e) {
									//console.log("column "+fieldname+" not found");
								}
							}
							else {
								self._getFieldOption(uid, self.selected_page[uid], field_id, hash["option_id"])[fieldname] = hash[fieldname];
								try {
									self.grid_field_propertie_options[uid].cells(option_id, self.grid_field_propertie_options[uid].getColIndexById(fieldname)).setValue(hash[fieldname]);
								}
								catch (e) {
									//console.log("column "+fieldname+" not found");
								}
							}

					if (ftype == "checkbox" || ftype == "radio" || ftype == "combo" || ftype == "multiselect" || ftype == "select")
						self._getFieldOption(uid, self.selected_page[uid], field_id, hash["option_id"])["value"] = hash["text"];
					else
						self._getFieldOption(uid, self.selected_page[uid], field_id, hash["option_id"])["value"] = hash["value"];

					//console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
					//console.log(field_id);
					//console.log(hash[ "option_id" ]);
					//console.log(  self._getFieldOption( uid, self.selected_page[ uid ], field_id, hash[ "option_id" ] )  );// option_id
					self._startPreview(uid);
					self.progressOffForm(uid);
					if (callBack) callBack(hash["option_id"]);
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
				var json = eval('(' + request.response + ')');
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

	}

	,
	/**
	 * Description
	 * @method _save_form
	 * @param {} uid
	 * @param {} callBack
	 * @param {} form_id
	 * @return
	 */
	_save_form: function (uid, callBack, form_id) {
		var self = this,
			hash = self.form_properties[uid].getFormData();
		
		self.progressOnForm(uid);
		
		if (hash["form_id"] == -1) {
			if (CAIRS.dhtmlx.validateForm(uid, self.form_properties[uid])) {
				if (hash["redirecturl"] == "" || hash["redirecturl"] == " ")
					hash["redirecturl"] = " ";

				hash["adminalert"] = hash["adminalert"].toString().replace(/-,-/gi, "");
				hash["autorespond"] = hash["autorespond"].toString().replace(/-,-/gi, "");
				hash["preview"] = hash["preview"].toString().replace(/-,-/gi, "");
				hash["nomultiple"] = hash["nomultiple"].toString().replace(/-,-/gi, "");
				hash["formname"] = self.handleFormName(uid, hash["formlabel"]);

				CAIRS.MAP.API.insert({
					resource: "/forms" // mandatory
					,
					format: "json" // json, yaml, xml. Default: json. Not mandatory
					,
					payload: "agency_id=" + self.configuration[uid.replace(new RegExp("_-1", "g"), "")].agency_id + "&hash=" + JSON.stringify(hash) // mandatory for PUT and POST
					,
					/**
					 * Description
					 * @method onSuccess
					 * @param {} request
					 * @return
					 */
					onSuccess: function (request) // not mandatory
					{
						var json = eval('(' + request.response + ')');
						dhtmlx.message({
							type: "error",
							text: json.response
						});

						//self.uid

						self.configuration[uid.replace(new RegExp("_-1", "g"), "")].page_layout = hash.displaycolumns;
						self.form_properties[uid].setItemValue("form_id", json.form_id);

						//self.configuration[ uid.replace(new RegExp("_" + json.form_id,"g"),"") ] = self.configuration[ uid.replace(new RegExp("_-1","g"),"") ];
						self.progressOnForm(uid);
						self._addPage({
							uid: uid,
							pagename: "Page one",
							page_layout : self.form_properties[uid].getCheckedValue("displaycolumns"),
							page_id: null,
							form_id: json.form_id
						}, function(){
							
							self.grid_pages[uid].selectRow(0);
							
							self._startPreview(uid);

							self._feedGrid(uid.replace(new RegExp("_-1", "g"), ""));
	
							self.progressOffForm(uid);
	
							if (callBack) callBack( json.form_id );	
						});

						
					},
					/**
					 * Description
					 * @method onFail
					 * @param {} request
					 * @return
					 */
					onFail: function (request) { // not mandatory
						var json = eval('(' + request.response + ')');
						dhtmlx.message({
							type: "error",
							text: json.response
						});
						self.progressOffForm(uid);
					}
				});
			}
			else {
				self.tabbar_form[uid].setTabActive("form_properties");
				self.progressOffForm(uid);
			}
		}
		else {
			if (CAIRS.dhtmlx.validateForm(uid, self.form_properties[uid])) {
				hash["formname"] = self.handleFormName(uid, hash["formlabel"]);
				delete hash["formname"];
				CAIRS.MAP.API.update({
					resource: "/forms/" + hash["form_id"] // mandatory
					,
					format: "json" // json, yaml, xml. Default: json. Not mandatory
					,
					payload: "agency_id=" + self.configuration[uid.replace(new RegExp("_" + hash["form_id"], "g"), "")].agency_id + "&hash=" + JSON.stringify(hash) // mandatory for PUT and POST
					,
					/**
					 * Description
					 * @method onSuccess
					 * @param {} request
					 * @return
					 */
					onSuccess: function (request) // not mandatory
					{
						var json = eval('(' + request.response + ')');
						dhtmlx.message({
							type: "error",
							text: json.response
						});
						self.configuration[uid.replace(new RegExp("_" + form_id, "g"), "")].page_layout = hash.displaycolumns;
						self.form_properties[uid].setItemValue("form_id", json.form_id);

						self._startPreview(uid);

						self._feedGrid(uid.replace(new RegExp("_" + form_id, "g"), ""));

						self.progressOffForm(uid);

						if (callBack) callBack( form_id );	
					},
					/**
					 * Description
					 * @method onFail
					 * @param {} request
					 * @return
					 */
					onFail: function (request) { // not mandatory
						var json = eval('(' + request.response + ')');
						dhtmlx.message({
							type: "error",
							text: json.response
						});
						self.progressOffForm(uid);
					}
				});
			}
		}
	}

	,
	/**
	 * Description
	 * @method _deleteForm
	 * @param {} uid
	 * @return
	 */
	_deleteForm: function (uid) {
		var self = this;
		dhtmlx.message({
			title: "Warning",
			type: "confirm",
			text: "Do you want to delete the selected form?",
			ok: "Delete",
			cancel: "Cancel",
			/**
			 * Description
			 * @method callback
			 * @param {} ok
			 * @return
			 */
			callback: function (ok) {
				if (ok) {
					CAIRS.MAP.API.del({
						resource: "/forms/" + self.grid[uid].getSelectedRowId() // mandatory
						,
						format: "json" // json, yaml, xml. Default: json. Not mandatory
						,
						payload: "agency_id=" + self.configuration[uid.replace(new RegExp("_" + self.grid[uid].getSelectedRowId(), "g"), "")].agency_id + "" // mandatory for PUT and POST
						,
						/**
						 * Description
						 * @method onSuccess
						 * @param {} request
						 * @return
						 */
						onSuccess: function (request) // not mandatory
						{
							var json = eval('(' + request.response + ')');
							dhtmlx.message({
								type: "error",
								text: json.response
							});
							self._feedGrid(uid);
						},
						/**
						 * Description
						 * @method onFail
						 * @param {} request
						 * @return
						 */
						onFail: function (request) { // not mandatory
							var json = eval('(' + request.response + ')');
							dhtmlx.message({
								type: "error",
								text: json.response
							});
						}
					});
				}
			}
		});
	}

	,
	/**
	 * Description
	 * @method _getFormsList
	 * @param {} uid
	 * @return
	 */
	_getFormsList: function (uid) {
		var self = this;
		self._setStatusDataTransfer("requesting forms list", true);
		CAIRS.MAP.API.get({
			resource: "/forms",
			format: "json",
			payload: "agency_id=" + self.configuration[uid].agency_id + "",
			/**
			 * Description
			 * @method onSuccess
			 * @param {} request
			 * @return
			 */
			onSuccess: function (request) {
				var json = eval('(' + request.response + ')');
				if (json.status == "success") {
					//dhtmlx.message( {type : "error", text : json.response} );
					self._setStatusDataTransfer("forms list received");

				}
				else {
					dhtmlx.message({
						type: "error",
						text: json.response
					});
					self._setStatusDataTransfer("unable to read forms list");
					if (json.response == "token not authorized")
						self._setStatusUserForm(uid, "token expired. Please login again", false);
				}
			},
			/**
			 * Description
			 * @method onFail
			 * @param {} request
			 * @return
			 */
			onFail: function (request) {

				var json = eval('(' + request.response + ')');
				dhtmlx.message({
					type: "error",
					text: json.response
				});
				self._setStatusDataTransfer("unable to read forms list");
				if (json.response == "token not authorized")
					self._setStatusUserForm(uid, "token expired. Please login again", false);

				//self.progressOffForm( uid );
			}
		});
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
	 * @method _loadDataStore
	 * @param {} uid
	 * @param {} callBack
	 * @return
	 */
	_loadDataStore: function (uid, callBack) {
		var self = this;

		var dataStores = [

			function (callBack) {
				CAIRS.MAP.API.get({
					resource: "/agency/" + self.configuration[uid].agency_id + "" // mandatory
					,
					format: "json" // json, yaml, xml. Default: json. Not mandatory
					,
					payload: "columns=agency_id,user_id,agency_name,address_line_1,address_line_2,city,state,zip,country,website,phone,fax,email_id,logo&order=" + JSON.stringify({
						direction: 'ASC',
						orderby: 'agency_name'
					}),
					/**
					 * Description
					 * @method onSuccess
					 * @param {} request
					 * @return
					 */
					onSuccess: function (request) { // not mandatory
						var json = eval('(' + request.response + ')');
						if (json.status == "success") {
							self.data_store[uid]["agency_data"] = json.hash;

							if (callBack) callBack();
						}
						else {
							dhtmlx.message({
								type: "error",
								text: json.response
							});
						}
					},
					/**
					 * Description
					 * @method onFail
					 * @param {} request
					 * @return
					 */
					onFail: function (request) { // not mandatory
						var json = eval('(' + request.response + ')');
						dhtmlx.message({
							type: "error",
							text: json.response
						});

					}
				});
			},
			function (callBack) {
				CAIRS.MAP.API.get({
					resource: "/agencies" // mandatory
					,
					format: "json" // json, yaml, xml. Default: json. Not mandatory
					,
					payload: "columns=agency_id,agency_name&order=" + JSON.stringify({
						direction: 'ASC',
						orderby: 'agency_name'
					}),
					/**
					 * Description
					 * @method onSuccess
					 * @param {} request
					 * @return
					 */
					onSuccess: function (request) { // not mandatory
						var json = eval('(' + request.response + ')');
						if (json.status == "success") {
							self.data_store[uid]["agencies"] = json.agencies;

							if (callBack) callBack();
						}
						else {
							dhtmlx.message({
								type: "error",
								text: json.response
							});
						}
					},
					/**
					 * Description
					 * @method onFail
					 * @param {} request
					 * @return
					 */
					onFail: function (request) { // not mandatory
						var json = eval('(' + request.response + ')');
						dhtmlx.message({
							type: "error",
							text: json.response
						});

					}
				});
			},
			function (callBack) {
				CAIRS.MAP.API.get({
					resource: "/agency/" + self.configuration[uid].agency_id + "/caseworkers" // mandatory
					,
					format: "json" // json, yaml, xml. Default: json. Not mandatory
					,
					payload: "columns=user_id,first_name,last_name&order=" + JSON.stringify({
						direction: 'ASC',
						orderby: 'first_name'
					}),
					/**
					 * Description
					 * @method onSuccess
					 * @param {} request
					 * @return
					 */
					onSuccess: function (request) { // not mandatory
						var json = eval('(' + request.response + ')');
						if (json.status == "success") {
							self.data_store[uid]["caseworkers_names"] = [];
							json.caseworkers.forEach(function (caseworker, index, array_) {
								self.data_store[uid]["caseworkers_names"].push({
									value: caseworker.user_id,
									text: caseworker.first_name + " " + caseworker.last_name
								});
							});

							//self.data_store[ uid ][ "caseworkers_names" ] = json.caseworkers;

							if (callBack) callBack();
						}
						else {
							dhtmlx.message({
								type: "error",
								text: json.response
							});
						}
					},
					/**
					 * Description
					 * @method onFail
					 * @param {} request
					 * @return
					 */
					onFail: function (request) { // not mandatory
						var json = eval('(' + request.response + ')');
						dhtmlx.message({
							type: "error",
							text: json.response
						});

					}
				});
			}
		];
		var total_stores = dataStores.length;

		/**
		 * Description
		 * @method store
		 * @return
		 */
		function store() {
			if (dataStores.length > 0) {
				var dataStore = dataStores[0];
				dataStores.splice(0, 1);
				dataStore(function () {
					store();
				});
			}
			else {
				if (callBack) {
					callBack();
				}
			}
		}

		store();
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

		/*if ((typeof configuration.application_path === 'undefined') || (configuration.application_path.length === 0)) {
			dhtmlx.message({
				type: "error",
				text: "application_path is missing"
			});
			return;
		}
		else
			self.application_path = configuration.application_path;
			
		if ((typeof configuration.dhtmlx_codebase_path === 'undefined') || (configuration.dhtmlx_codebase_path.length === 0)) {
			dhtmlx.message({
				type: "error",
				text: "dhtmlx_codebase_path is missing"
			});
			return;
		}
		else
			self.dhtmlx_codebase_path = configuration.dhtmlx_codebase_path;*/
			
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
		self.model.conf_toolbar_form_pages.icon_path = self.icons_path;
		self.model.conf_toolbar_form_fields.icon_path = self.icons_path;
		self.model.conf_toolbar_field_propertie.icon_path = self.icons_path + "32px/";
		self.model.conf_toolbar_tags.icon_path = self.icons_path;
		self.model.conf_toolbar_grid_field_propertie_options.icon_path = self.icons_path;
		self.model.conf_window_form.image_path = self.icons_path;
		self.model.conf_toolbar_form.icon_path = self.icons_path + "32px/";
		self.model.conf_toolbar_form_preview.icon_path = self.icons_path + "32px/";
		self.model.conf_tabbar_form.image_path = self.model.globalImgPath;

		self.data_store[self.uid] = [];
		self.configuration[self.uid].page_layout = "S";

		if (typeof self.configuration[self.uid].container === 'undefined') {
			self._window(self.uid);
		}
		self._layout(self.uid);

		self.progressOn(self.uid);

		console.log(configuration.database)

		CAIRS.MAP.API.authorize({
			username: configuration.username,
			database: configuration.database,
			agency_id: configuration.agency_id,
			/**
			 * Description
			 * @method onSuccess
			 * @param {} request
			 * @return
			 */
			onSuccess: function (request) {
				self._setStatus(
					"Form Maker user is authorized."
				);
				self._setStatusDataTransfer(
					"credential received");
				self._setStatusUser(
					"Logged as " + CAIRS.MAP.API.user, true
				);

				//var milliseconds = parseInt( CAIRS.MAP.API.date_expiration );

				CAIRS.MAP.API.showCountDown("expiration_info");

				self._loadDataStore(self.uid, function () {
					self.progressOff(
						self.uid);

					self._setStatusDataTransfer(
						"Datastore 100% loaded"
					);

					self._toolbar(self.uid);
					self._grid(self.uid);
					self._feedGrid(self
						.uid);

					self._setStatus(
						"Form Maker is ready."
					);

					CAIRS.shortcut.add(
						"SHIFT+C",
						function () {
							self._mountFormBuilderScreen(
								self.uid
							);
						});
				});
			},
			/**
			 * Description
			 * @method onFail
			 * @param {} request
			 * @return
			 */
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

	}
}
