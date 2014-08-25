var FormViewer = {
	appName: "FormViewer"

	,version: 0.1

	,uid: null
	
	,window_manager : null
	
	,window : []
	
	,window_print : []
	 
	,container : []
	 
	,model : null
	 
	,form_id : null
	 
	,skin : null
	 
	,data_store : null
	
	,layout : []
	
	,tab: []
	
	,toolbar: []
	,toolbar_print : []
	
	,form: []
	
	,status_bar: []
	
	,form_default_width: 720

	,configuration: []
	
	,application_path : "https://cdmap03.myadoptionportal.com/modules/FormBuilder/"
	,dhtmlx_codebase_path : "https://cdmap03.myadoptionportal.com/modules/codebase3.6/"
	,icons_path : "https://cdmap03.myadoptionportal.com/modules/FormBuilder/icons/"
	,signature_application_url : "https://cdmap03.myadoptionportal.com/modules/FormBuilder/js/signature_component/"

	,signature_controls: []
	
	,pages : []
	
	
	,hash : {}
	
	,user_data : {}
	
	 
	/**
	 * Description
	 * @method _startPreview
	 * @param {} uid
	 * @return
	 */
	,start : function ( configuration ) {
		var self = this, uid;
		////console.log("starting preview");
		
		if ( typeof configuration.form_id === 'undefined' ) {
			dhtmlx.message({
				type: "error",
				text: "form_id is missing"
			});
			return;
		}
		self.form_id = configuration.form_id;
		uid = configuration.form_id;
		
		
		if ( typeof configuration.skin === 'undefined' || configuration.skin == false )
			self.skin = "dhx_skyblue";
		else
			self.skin = configuration.skin;
			
			self.configuration[ uid ] = configuration;
			
		
		if( configuration.container )
			self.container[ uid ] = configuration.container;
		
		if( configuration.model )
			self.model = configuration.model;
			
		//console.log( self.skin );
		
		window.dhx_globalImgPath = self.dhtmlx_codebase_path + "imgs/";
		dhtmlx.skin = self.model.globalSkin || "dhx_skyblue";	
		self.model.conf_window.image_path = self.icons_path;
		self.model.conf_toolbar.icon_path = self.icons_path + "32px/";
		self.model.conf_tabbar.image_path = self.dhtmlx_codebase_path + "imgs/";
			
		if ( (typeof configuration.container === 'undefined') || configuration.container == false )
			self._window( uid );
		
		self._layout( uid );
		
		self.progressOn( uid )
			
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
					"FormViewer user is authorized."
				);
				self._setStatusDataTransfer(
					"credential received");
				self._setStatusUser(
					"Logged as " + CAIRS.MAP.API.user, true
				);

				CAIRS.MAP.API.showCountDown("expiration_info");
				
				self.pages[uid] = [];
				
				if ( typeof configuration.store === 'undefined' || configuration.store == false )
				{	
					self._readFormData( uid, function ()
					{
						self.data_store = [];
						self._loadDataStore( uid, function ()
						{
							self._renderPreview( configuration );
							
							
							
							self.progressOff(uid);
							self._setStatusDataTransfer(
								"Datastore 100% loaded"
							);
							self._setStatus(
								"FormViewer is ready."
							);
						} );
					});
				}
				else
				{
					self._readFormData( uid, function ()
					{
						self.data_store = configuration.store;
						self._renderPreview( configuration );
						self.progressOff(uid);
						self._setStatusDataTransfer(
							"Datastore 100% loaded"
						);
						self._setStatus(
							"Form Maker is ready."
						);
					});
				}
			},
			/**
			 * Description
			 * @method onFail
			 * @param {} request
			 * @return
			 */
			onFail: function (request) {
				////console.log(request);
				////console.log("not authorized");
				self.progressOff(uid);
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
	
	
	/**
	 * Description
	 * @method _renderPreview
	 * @param {} uid
	 * @return
	 */
	,_renderPreview : function ( configuration ) {
		var self = this, uid;
		////console.log("starting preview");
		
		uid = configuration.form_id;
		
		
		
		
		self._toolbar( uid );
		
		try {
			self.tab[uid].clearAll()
		}
		catch (e) {

		}
		try {
			self.form[ uid ].unload();
			self.form[ uid ] = null;
		}
		catch (e) {

		}

		self._tab(uid);
		self._form(uid);
		if( self.user_data && self.user_data != null )
			self.form[uid].setFormData( self.user_data );
	}
	
	
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

		if (self.window_manager.isWindow("window_FormViewer_" + uid))

		{
			self.window[ uid ].show();
			self.window[ uid ].bringToTop();
			return;
		}
		self.window[ uid ] = self.window_manager.createWindow("window_FormViewer_" + uid, self.model.conf_window.left + 10,
			self.model.conf_window.top + 10, self.model.conf_window.width, self.model.conf_window.height);
		self.window[ uid ].setText(self.model.text_labels.main_window_title);
		self.window[ uid ].setIcon(self.model.conf_window.icon, self.model.conf_window.icon_dis);

		self.window[ uid ].attachEvent("onClose", function (win) {
			dhtmlx.skin = "dhx_skyblue";
			self.model.conf_form.template = [self.model.conf_form.defaultRootProperties];
			return true;
		});

		self.status_bar[uid] = self.window[ uid ].attachStatusBar();
		self.status_bar[uid].setText("<div id='status_info'>Initializing FormViewer</div><div id='expiration_info' class='data_transfer_info'></div><div id='user_info'><img id='user_info_status' src='" + self.icons_path + "offline.png' /> <span>Not authorized yet</span></div><div id='data_transfer_info'> no data transferred</div><div id='socket_info' class='data_transfer_info'>socket: disconnected</div><div id='errors_info'>no errors</div>");
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
		if( self.container[ uid ] )
			self.layout[uid] = self.container[ uid ].attachLayout(self.model.conf_layout.pattern);
		else
			self.layout[uid] = self.window[ uid ].attachLayout(self.model.conf_layout.pattern);
			
		self.layout[uid].cells("a").hideHeader();
			
		/*self.layout[uid].dhxWins.enableAutoViewport(false);
		self.layout[uid].dhxWins.attachViewportTo(document.body);
		self.layout[uid].attachEvent("onUnDock", function (itemId) {
			////console.log(itemId);
			self.layout[uid].dhxWins.setImagePath("../codebase3.6/imgs/");

			self.formPreviewWindow[uid] = self.layout[uid].dhxWins.window(itemId);
			self.formPreviewWindow[uid].button("dock").attachEvent("onClick", function () {
				self.layout[uid].cells("a").dock();
				return true;
			});;
			self.formPreviewWindow[uid].setDimension(760, 500);

			self.formPreviewWindow[uid].setText("Live preview: " + self.hash[ uid ]["formlabel"]);
			self.formPreviewWindow[uid].setIcon("dock.gif", "dock.gif");
		});
		self.layout[uid].attachEvent("onDock", function (itemId) {
			alert("entrei dock");
		});*/

	}

	
	,
	/**
	 * Description
	 * @method _toolbar
	 * @param {} uid
	 * @param {} form_id
	 * @return
	 */
	_toolbar: function (uid, form_id) {
		var self = this;
		self.toolbar[uid] = self.layout[uid].cells("a").attachToolbar(self.model.conf_toolbar);
		self.toolbar[uid].setIconSize(32);
		self.toolbar[uid].setSkin('dhx_skyblue');
		self.toolbar[uid].attachEvent("onClick", function (id) {
			if (id == "save_form") {
				if (CAIRS.dhtmlx.validateForm(uid + "_form_preview_FormViewer", self.form[ uid ])) {
					self._changeFieldsValueOnModel( uid );
					//var hash = self.form[ uid ].getFormData();
					var hash = {};
					
					CAIRS.dhtmlx.formFields[uid + "_form_preview_FormViewer"].forEach(function (field, index, array) {
						console.log(field.type);
						console.log(field.name);
						if (field.type == "calendar") {
							if (CAIRS.isValidDate( self.form[uid].getItemValue( field.name ) )) {
								var day = self.form[uid].getItemValue( field.name ).getDate();
								var month = self.form[uid].getItemValue( field.name ).getMonth() + 1;
								var year = self.form[uid].getItemValue( field.name ).getFullYear();
								hash[field.name] =  year + "/" + month + "/" + day;
							}
						}
						else if (field.type == "checkbox") {
							if ( self.form[uid].isItemChecked( field.name ) ) {
								hash[field.name] =  1;
							}
							else
								hash[field.name] =  0;
						}
						//multiselect
						else if (field.type == "multiselect") {
							console.log( self.form[uid].getItemValue( field.name ) );
							var strValue = "[";
							self.form[uid].getItemValue( field.name ).forEach(function (value, index, array) {
								strValue = strValue + "'" + value + "',";
							});
							strValue = strValue.substring(0, strValue.length - 1) + "]";
							hash[field.name] = strValue;
						}
						else if (field.type == "upload") {
							hash[field.name] =  JSON.stringify( self.form[uid].getItemValue( field.name ) );
						}
						else {
							hash[field.name] = self.form[uid].getItemValue( field.name );
						}
					});
					
					var postStr = "user_id=" + self.configuration[ uid ].user_id;
					postStr = postStr + "&connId=" + self.configuration[ uid ].connId;
					postStr = postStr + "&connectionId=" + self.configuration[ uid ].connectionId;
					postStr = postStr + "&agency_id=" + self.configuration[ uid ].agency_id;
					postStr = postStr + "&form_id=" + self.configuration[ uid ].form_id;
					postStr = postStr + "&hash=" + JSON.stringify(hash);
					self.progressOn(uid);
					self._setStatusDataTransfer("Saving form data", true);
					CAIRS.MAP.API.post({
						resource: "/forms/formviewer/save" // mandatory
						,
						format: "json" // json, yaml, xml. Default: json. Not mandatory
						,
						payload: postStr // mandatory for PUT and POST
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
								self._setStatusDataTransfer("form saved");
		
								
		
								self.progressOff(uid);
							}
							else {
		
								dhtmlx.message({
									type: "error",
									text: "form wasn't saved. reason: " + json.response
								});
								self._setStatusDataTransfer("form wasn't saved");
								if (json.response == "token not authorized")
									self._setStatusUserForm(uid, "token expired. Please login again", false);
								self.progressOff(uid);
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
								text: "form wasn't saved. reason: " + json.response
							});
							self._setStatusDataTransfer("form wasn't saved");
							if (json.response == "token not authorized")
								self._setStatusUserForm(uid, "token expired. Please login again", false);
							self.progressOff(uid);
						}
					});
					
				}
			}
			else if (id == "submit_form") {
				if (CAIRS.dhtmlx.validateForm(uid + "_form_preview_FormViewer", self.form[ uid ])) {
					self._changeFieldsValueOnModel( uid );
					//var hash = self.form[ uid ].getFormData();
					var hash = {};
					
					CAIRS.dhtmlx.formFields[uid + "_form_preview_FormViewer"].forEach(function (field, index, array) {
						console.log(field.type);
						console.log(field.name);
						if (field.type == "calendar") {
							if (CAIRS.isValidDate( self.form[uid].getItemValue( field.name ) )) {
								var day = self.form[uid].getItemValue( field.name ).getDate();
								var month = self.form[uid].getItemValue( field.name ).getMonth() + 1;
								var year = self.form[uid].getItemValue( field.name ).getFullYear();
								hash[field.name] =  year + "/" + month + "/" + day;
							}
						}
						else if (field.type == "checkbox") {
							if ( self.form[uid].isItemChecked( field.name ) ) {
								hash[field.name] =  1;
							}
							else
								hash[field.name] =  0;
						}
						//multiselect
						else if (field.type == "multiselect") {
							console.log( self.form[uid].getItemValue( field.name ) );
							var strValue = "[";
							self.form[uid].getItemValue( field.name ).forEach(function (value, index, array) {
								strValue = strValue + "'" + value + "',";
							});
							strValue = strValue.substring(0, strValue.length - 1);
							strValue = strValue + "]";
							hash[field.name] = strValue;
						}
						else if (field.type == "upload") {
							hash[field.name] =  JSON.stringify( self.form[uid].getItemValue( field.name ) );
						}
						else {
							hash[field.name] = self.form[uid].getItemValue( field.name );
						}
					});
					
					var postStr = "user_id=" + self.configuration[ uid ].user_id;
					postStr = postStr + "&connId=" + self.configuration[ uid ].connId;
					postStr = postStr + "&connectionId=" + self.configuration[ uid ].connectionId;
					postStr = postStr + "&agency_id=" + self.configuration[ uid ].agency_id;
					postStr = postStr + "&form_id=" + self.configuration[ uid ].form_id;
					postStr = postStr + "&hash=" + JSON.stringify(hash);
					self.progressOn(uid);
					self._setStatusDataTransfer("Submiting form data", true);
					CAIRS.MAP.API.post({
						resource: "/forms/formviewer/submit" // mandatory
						,
						format: "json" // json, yaml, xml. Default: json. Not mandatory
						,
						payload: postStr // mandatory for PUT and POST
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
								self._setStatusDataTransfer("form submited");
		
								
		
								self.progressOff(uid);
							}
							else {
		
								dhtmlx.message({
									type: "error",
									text: "form wasn't saved. reason: " + json.response
								});
								self._setStatusDataTransfer("form wasn't submited");
								if (json.response == "token not authorized")
									self._setStatusUserForm(uid, "token expired. Please login again", false);
								self.progressOff(uid);
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
								text: "form wasn't submited. reason: " + json.response
							});
							self._setStatusDataTransfer("form wasn't saved");
							if (json.response == "token not authorized")
								self._setStatusUserForm(uid, "token expired. Please login again", false);
							self.progressOff(uid);
						}
					});
					
				}
			}
			else if (id == "print_form") {
				if (CAIRS.dhtmlx.validateForm(uid + "_form_preview_FormViewer", self.form[ uid ])) {
					////console.log( JSON.stringify( self.model.conf_form.template ) );

					var gridData = [],
						form = null,
						inputs = [],
						inputHash = null,
						x, iframe = null,
						type = null,
						form_id = uid;

					if (document.getElementById("form_print_" + uid + "_" + form_id)) {
						form = document.getElementById("form_print_" + uid + "_" + form_id);
						document.body.removeChild(form);
					}

					form = document.createElement("form");
					form.setAttribute("id", "form_print_" + uid + "_" + form_id);
					form.setAttribute("name", "form_print_" + uid + "_" + form_id);

					////console.log( CAIRS.dhtmlx.formFields[ uid + "_form" ] );
					// get user typed data and set the field value inside application model

					self._changeFieldsValueOnModel( uid );

					form.setAttribute("action", self.application_path + "processors/html2pdf/processor/PV.php?agency_logo=" + self.data_store.agency_data.logo + "");
					form.setAttribute("method", "post");
					form.setAttribute("target", "iframe_print_" + uid + "_" + form_id);

					var inputHash = document.createElement("input");
					inputHash.setAttribute("id", "template");
					inputHash.setAttribute("name", "template");
					inputHash.setAttribute("type", "hidden");
					inputHash.setAttribute("value", JSON.stringify(self.model.conf_form.template));
					form.appendChild(inputHash);

					var an = document.createElement("input");
					an.setAttribute("id", "agency_name");
					an.setAttribute("name", "agency_name");
					an.setAttribute("type", "hidden");
					an.setAttribute("value", self.data_store.agency_data.agency_name);
					form.appendChild(an);

					var fn = document.createElement("input");
					fn.setAttribute("id", "form_name");
					fn.setAttribute("name", "form_name");
					fn.setAttribute("type", "hidden");
					fn.setAttribute("value", self.hash[ uid ]["formlabel"]);
					form.appendChild(fn);

					document.body.appendChild(form);

					//postStr = postStr + "&userID=" + self.configuration[ uid ].userID;
					//postStr = postStr + "&connId=" + self.configuration[ uid ].connId;
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
				
			}
		});
	}

	,
	/**
	 * Description
	 * @method _tab
	 * @param {} uid
	 * @return
	 */
	_tab: function (uid) {
		var self = this;

		//if (self.layout[uid].dhxWins.isWindow("a"))
		//	self.tab[uid] = self.formPreviewWindow[uid].attachTabbar();
		//else
			self.tab[uid] = self.layout[uid].cells("a").attachTabbar();

		self.tab[uid].setSkin('dhx_skyblue');
		self.tab[uid].setImagePath(self.model.conf_tabbar.image_path); // self.application_path
		self.tab[uid].enableScroll(true);
		self.tab[uid].enableAutoReSize(true);
		self.tab[uid].addTab("start_tab", "start_tab", "0px");
		self.tab[uid].hideTab("start_tab", true);

		self.tab[uid].attachEvent("onSelect", function (idd, last_id) {
			return true;
		});
	}

	,
	/**
	 * Description
	 * @method _form
	 * @param {} uid
	 * @return
	 */
	_form: function (uid) {
		var self = this,
			skin = self.skin,
			form_id = self.form_id;
		dhtmlx.skin = skin || "dhx_skyblue";

		self.model.conf_form.template.sort(function (a, b) {
			return a.index - b.index;
		});

		for (var x = 0; x < self.model.conf_form.template.length; x++) {
			if (self.model.conf_form.template[x].type == "block") {
				if (typeof self.model.conf_form.template[x].page_id !== 'undefined') {
					// order column 1 of the page
					self.model.conf_form.template[x].list[0].list.sort(function (a, b) {
						return a.index - b.index;
					});

					if (self.model.conf_form.template[x].list[0].list)
						for (var y = 0; y < self.model.conf_form.template[x].list[0].list.length; y++) {
							////console.log( self.model.conf_form.template[x].list[0].list[y] );
							if (self.model.conf_form.template[x].list[0].list[y].list)
								self.model.conf_form.template[x].list[0].list[y].list.sort(function (a, b) {
									return a.index - b.index;
								});

							if (self.model.conf_form.template[x].list[0].list[y].options)
								self.model.conf_form.template[x].list[0].list[y].options.sort(function (a, b) {
									return a.index - b.index;
								});
						}

					// if is there 2 columns
					if (typeof self.model.conf_form.template[x].list[2] !== 'undefined') {
						// order column 2 of the page
						self.model.conf_form.template[x].list[2].list.sort(function (a, b) {
							return a.index - b.index;
						});

						for (var y = 0; y < self.model.conf_form.template[x].list[2].list.length; y++) {
							////console.log( self.model.conf_form.template[x].list[0].list[y] );
							if (self.model.conf_form.template[x].list[2].list[y].list)
								self.model.conf_form.template[x].list[2].list[y].list.sort(function (a, b) {
									return a.index - b.index;
								});

							if (self.model.conf_form.template[x].list[2].list[y].options)
								self.model.conf_form.template[x].list[2].list[y].options.sort(function (a, b) {
									return a.index - b.index;
								});
						}
					}
				}
			}
		}

		self.form[ uid ] = self.tab[uid].cells("start_tab").attachForm(self.model.conf_form.template);
		self.form[ uid ].setSkin(skin);

		self.model.conf_form.template.forEach(function (element, index, array) {
			if (element.type == "block") {
				if (typeof element.id !== 'undefined') {
					self.tab[uid].addTab(self.model.conf_form.template[index].id, element.label, element.tab_width);

					////console.log(  );

					self.tab[uid].cells(self.model.conf_form.template[index].id).attachObject(self.model.conf_form.template[index].id.toString());
					if (index == 1)
						self.tab[uid].setTabActive(self.model.conf_form.template[index].id);

					//document.getElementById( self.model.conf_form.template[index].id.toString() ).style.overflow = "auto";
				}
			}
		});

		CAIRS.dhtmlx.prepareForm(uid + "_form_preview_FormViewer", self.model.conf_form, self.form[ uid ]);
		
		//console.log( JSON.stringify( self.model.conf_form ) );
		
		CAIRS.dhtmlx.formFields[uid + "_form_preview_FormViewer"].forEach(function (field, index, array)
		{
			console.log( field );	
		});

		self._bindFormFieldsToLibraryFields(uid + "_form_preview_FormViewer", uid);

		self._renderSignatureControl(uid);

		self.model.conf_form.template.forEach(function (element, index, array) {
			if (element.type == "block") {
				if (typeof element.id !== 'undefined') {
					document.getElementById(self.model.conf_form.template[index].id.toString()).parentNode.style.overflow = "auto";
					document.getElementById(self.model.conf_form.template[index].id.toString()).parentNode.style.paddingBottom = "20px";
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

		////console.log( form_uid );
		////console.log( uid );

		////console.log( CAIRS.dhtmlx.formFields[ form_uid ] );

		for (var x = 0; x < CAIRS.dhtmlx.formFields[form_uid].length; x++) {
			var field = CAIRS.dhtmlx.formFields[form_uid][x];
			////console.log( field );
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
					////console.log( "typeof bind_library_field === 'undefined'" );
					continue;
				}

				if (bind_library_field === false) {
					////console.log( "bind_library_field === false" );
					continue;
				}

				//////console.log(field.name);
				if (type === "combo") {
					////console.log( "binding combo" );
					//self.data_store[ uid ][ "caseworkers_names" ]
					var library = eval("self.data_store." + bind_library_field);
					////console.log(library);
					if (library) {
						field.options = library;
						//////console.log("fieldOpt: "+ JSON.stringify( field.options ));
					}
				}
				//////console.log( bind_library_field );
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
		//////console.log(1);
		//////console.log(elementLabel + " - ");
		var divs = document.getElementsByTagName("*");
		for (var x = 0; x < divs.length; x++) {
			div = divs[x];
			//if(div.getAttribute)
			//{
			//////console.log(div);
			if (div.getAttribute("data-htmlbind")) {

				if (div.getAttribute("data-htmlbind") == elementLabel) {
					//////console.log(div.getAttribute("data-htmlbind") + " - " + elementLabel + " - " + value);
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
			var form_id = uid;
			if (typeof self.signature_controls[uid] === 'undefined') {
				self.signature_controls[uid] = [];
			}
			////console.log(self.signature_controls[ uid ]);
			var signatureWrappers = self.signature_controls[uid];
			signatureWrappers.forEach(function (wrapperObj, index, array) {
				var wrapperID = wrapperObj.wrapper;
				var comboID = wrapperObj.combo;
				var inputID = wrapperObj.input;
				var hiddenID = wrapperObj.hidden;
				var dateID = wrapperObj.date;

				////console.log( self.form[ uid ].getContainer(wrapperID).id )

				var wrapper = document.getElementById(self.form[ uid ].getContainer(wrapperID).id);

				////console.log( wrapper );

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
						////console.log( self.form[ uid ].getCombo( comboID ) );
						if (self.form[ uid ].getCombo(comboID).getSelectedValue().length < 1) {
							////console.log(self.form_grid_field_propertie_options[ uid ].getCombo( comboID ).getSelectedText().length);
							dhtmlx.message({
								type: "error",
								text: "Select a caseworker for signing this area first."
							});

							self.form[ uid ].getCombo(comboID).openSelect();
							return;
						}

						var filesToLoad = [
							FormViewer.signature_application_url + "SuperSignature/wz_jsgraphics.js" /* Super signature control */ 
							, FormViewer.signature_application_url + "SuperSignature/ss.js" /* Super signature control */
							//,FormViewer.signature_application_url +  + "css/signature_component.css" /* signature css */
							, FormViewer.signature_application_url + "controller/Signature_Component.js" /* signature model and controller */
						];
						/* load files and call signature component */
						CAIRS.onDemand.load(filesToLoad, function () {

							////console.log(self.getCaseWorkerId(uid, self.form[ uid ].getCombo( comboID ).getSelectedText()));

							Signature_Component.signIn({
								user_id: self.form[ uid ].getCombo(comboID).getSelectedValue(),
								user_name: self.form[ uid ].getCombo(comboID).getComboText(), // mandatory

								agency_id:  self.configuration[ uid ].agency_id, // mandatory

								file_name: self.form[ uid ].getCombo(comboID).getSelectedText().toString().split(" ")[0] + "_signature", // mandatory

								application_url: FormViewer.signature_application_url, // mandatory
								file_path: self.configuration[ uid ].signature_file_path, // mandatory - / slash on the end

								/* saving files under a path using the name as parameter */
								file_path_abs: self.configuration[ uid ].signature_file_path_abs, // mandatory - / slash on the end

								div_display: signature_area_ID, // not mandatory

								width_display: 200,
								height_display: 50,

								marginTop: 100,

								icons_path: FormViewer.signature_application_url + 'icons/', // mandatory
								
								window_manager : FormViewer.window_manager,

								/**
								 * Description
								 * @method signedCallBack
								 * @param {} response
								 * @return
								 */
								signedCallBack: function (response) {

									self.form[ uid ].setItemValue(hiddenID, response.file_path + "" + response.file_name);

									var hfield = self._getFormItem(hiddenID, uid + "_form_preview_FormViewer");

									self._getFieldOption(uid, hfield.page_id, hfield.field_id, hfield.option_id)["value"] = response.file_path + "" + encodeURIComponent( response.file_name );

									////console.log( self._getFieldOption( uid, hfield.page_id, hfield.field_id, hfield.option_id ) );

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
					////console.log( e.stack );
				}

				document.getElementById( self.form[ uid ].getContainer( wrapperID ).id ).style.width = "200px";
				document.getElementById( self.form[ uid ].getContainer( wrapperID ).id ).style.height = "100px";

				////console.log( self.form[ uid ].getContainer(wrapperID) );

			});
		}
		catch (e) {
			////console.log(e.stack);
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
	_readFormData: function (uid, callback) {
		var self = this, form_id = uid;
		//self.progressOn(uid);
		self._setStatusDataTransfer("requesting form(" + form_id + ") metadata", true);
		
		CAIRS.MAP.API.get({
			resource: "/forms/" + uid + "/metadata",
			format: "json",
			payload: "agency_id=" + self.configuration[ uid ].agency_id + "",
			/**
			 * Description
			 * @method onSuccess
			 * @param {} request
			 * @return
			 */
			onSuccess: function (request) {
				var json = JSON.parse( request.response );
				//dhtmlx.message( {type : "error", text : json.response} );
						self._setStatusDataTransfer("form(" + form_id + ") metadata received");
						self.model.conf_form = json.metadata_file;
						if (typeof self.signature_controls[uid] === 'undefined') {
							self.signature_controls[uid] = [];
						}
						self.signature_controls[uid] = json.metadata_file.signature_controls;
						//self.model.conf_form.signature_controls = json.metadata_file.signature_controls;
						if(callback) callback();	
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
							text: "This form was not synced yet on FormBuilder. Contact the agency."
				});
				dhtmlx.alert({
							type: "error",
							text: "This form was not synced yet on FormBuilder. Contact the agency."
				});
				self._setStatus(
					"This form was not synced yet on FormBuilder. Contact the agency."
				);
				self._setStatusDataTransfer("unable to read form");
				if (json.response == "token not authorized")
					self._setStatusUserForm(uid, "token expired. Please login again", false);
					
				//if(callback) callback();

				//self.progressOff( uid );
			}
		});
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
		var form_id = uid;
		var dataStores = [
			function (callBack) {
				
				self._setStatusDataTransfer("requesting form(" + form_id + ") hash", true);
		
		
				var postStr = "user_id=" + self.configuration[ uid ].user_id;
				postStr = postStr + "&connId=" + self.configuration[ uid ].connId;
				postStr = postStr + "&connectionId=" + self.configuration[ uid ].connectionId;
				postStr = postStr + "&agency_id=" + self.configuration[ uid ].agency_id;
				postStr = postStr + "&form_id=" + self.configuration[ uid ].form_id;
		
				CAIRS.MAP.API.get({
					resource: "/forms/formviewer/getdata",
					format: "json",
					payload: postStr,
					/**
					 * Description
					 * @method onSuccess
					 * @param {} request
					 * @return
					 */
					onSuccess: function (request) {
						var json = JSON.parse( request.response );
						if (json.status == "success") {
							
							
							if( json.response == "file not found" )
							{
								dhtmlx.message({
									type: "error",
									text: "This form was not synced yet. Contact the agency."
								});
								self._setStatusDataTransfer("This form was not synced yet. Contact the agency.");
							}
							else
							{
								//dhtmlx.message( {type : "error", text : json.response} );
								self._setStatusDataTransfer("form(" + form_id + ") hash received");
								
								if(json.hash == null)
									self.user_data = {};
								else
								{
									for( var key in json.hash)
									{
										if( json.hash[ key ] == null )
										{
											delete json.hash[ key ];
										}
									}
									
									self.user_data = json.hash;
								}
								if (callBack) callBack();
							}
							
							
						}
						else {
							dhtmlx.message({
								type: "error",
								text: json.response
							});
							self._setStatusDataTransfer("unable to read form");
							if (json.response == "token not authorized")
								self._setStatusUserForm(uid, "token expired. Please login again", false);
								
							if (callBack) callBack();
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
						self._setStatusDataTransfer("unable to read form");
						if (json.response == "token not authorized")
							self._setStatusUserForm(uid, "token expired. Please login again", false);
							
						if (callBack) callBack();
		
						//self.progressOff( uid );
					}
				});
			},
			function (callBack) {
				
				self._setStatusDataTransfer("requesting form(" + form_id + ") hash", true);
		
				CAIRS.MAP.API.get({
					resource: "/forms/" + uid,
					format: "json",
					payload: "agency_id=" + self.configuration[ uid ].agency_id + "",
					/**
					 * Description
					 * @method onSuccess
					 * @param {} request
					 * @return
					 */
					onSuccess: function (request) {
						var json = JSON.parse( request.response );
						if (json.status == "success") {
							//dhtmlx.message( {type : "error", text : json.response} );
							self._setStatusDataTransfer("form(" + form_id + ") hash received");
							self.hash[ uid ] = json.hash;
							if (callBack) callBack();
						}
						else {
							dhtmlx.message({
								type: "error",
								text: json.response
							});
							self._setStatusDataTransfer("unable to read form");
							if (json.response == "token not authorized")
								self._setStatusUserForm(uid, "token expired. Please login again", false);
								
							if (callBack) callBack();
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
						self._setStatusDataTransfer("unable to read form");
						if (json.response == "token not authorized")
							self._setStatusUserForm(uid, "token expired. Please login again", false);
							
						if (callBack) callBack();
		
						//self.progressOff( uid );
					}
				});
			},
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
							self.data_store["agency_data"] = json.hash;

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
							self.data_store["agencies"] = json.agencies;

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
							self.data_store["caseworkers_names"] = [];
							json.caseworkers.forEach(function (caseworker, index, array_) {
								self.data_store["caseworkers_names"].push({
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
		try
		{
			document.getElementById("status_info").innerHTML = m;
		}catch(e){};
		
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
		try
		{
			document.getElementById("formbuilder_status_info_" + uid).innerHTML = m;
		}catch(e){};
		
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
		try
		{
			document.getElementById("errors_info").innerHTML = m;
		}catch(e){};
		
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
		try
		{
			document.getElementById("formbuilder_errors_info_" + uid).innerHTML = m;
		}catch(e){};
		
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
		try
		{
			if (isActive) {
				document.getElementById("data_transfer_info").innerHTML = m;
				document.getElementById("data_transfer_info").style.backgroundImage = "url(" + self.icons_path + "network.gif)";
			}
			else {
				document.getElementById("data_transfer_info").innerHTML = m;
				document.getElementById("data_transfer_info").style.backgroundImage = "url(" + self.icons_path + "network-accept.png)";
			}
		}catch(e){};
		
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
	 * @method _changeFieldsValueOnModel
	 * @param {} uid
	 * @return
	 */
	_changeFieldsValueOnModel: function (uid) {
		self = this,
			hash = self.form[uid].getFormData();
		
		//console.log(hash);
		
		CAIRS.dhtmlx.formFields[uid + "_form_preview_FormViewer"].forEach(function (field, index, array) {
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
						self._getPageField(uid, field.page_id, field.field_id)["value"] = year + "/" + month + "/" + day;
				}
			}
			else if (field.type == "upload") {
				hash[field.name] = self.form[uid].getItemValue( field.name );
				//console.log(typeof self.form[uid].getItemValue( field.name ));
				//console.log( self.form[uid].getItemValue( field.name ) );
				if( field.option_id ) // if this field is child field
					self._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["value"] = JSON.stringify( hash[field.name] );
				else
					self._getPageField(uid, field.page_id, field.field_id)["value"] = JSON.stringify( hash[field.name] );
			}
			else {
				if( field.option_id ) // if this field is child field
					self._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["value"] = hash[field.name];
				else
					self._getPageField(uid, field.page_id, field.field_id)["value"] = hash[field.name];
				
				////console.log(self._getPageField(uid, field.page_id, field.field_id).value);
				////console.log("--------");
			}
		});
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
		
		////console.log(page_id);
		////console.log(self.pages[uid]);
		
		
		////console.log("--------------------------------");
		
		if( page_id !== "" && page_id != null && typeof page_id !== 'undefined' )
			for (var x = 0; x < self._getPageOnModel(uid, page_id).list[0].list.length; x++) {
				var field = self._getPageOnModel(uid, page_id).list[0].list[x];
				if (typeof field.field_id !== 'undefined')
					if (field.field_id.toString() == field_id.toString()) return field;
			}
			if (self._getPageOnModel(uid, page_id).page_layout == "D") {
				for (var x = 0; x < self._getPageOnModel(uid, page_id).list[2].list.length; x++) {
					var field = self._getPageOnModel(uid, page_id).list[2].list[x];
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
	 * @method _getFieldOption
	 * @param {} uid
	 * @param {} page_id
	 * @param {} field_id
	 * @param {} option_id
	 * @return Literal
	 */
	_getFieldOption: function (uid, page_id, field_id, option_id) {
		var self = this;
		////console.log( "_getFieldOption" );
		////console.log( arguments );

		for (var x = 0; x < self._getPageColumnList(uid, page_id, "first").length; x++) {
			var field = self._getPageColumnList(uid, page_id, "first")[x];

			if (typeof field.field_id !== 'undefined') {
				if (field.field_id.toString() == field_id.toString()) {
					////console.log(field);
					////console.log(field.type);
					if (field.type == "label" || field.type == "fieldset" || field.type == "radio" || field.type == "checkbox") { // lets read the list property
						var found = false;
						field.list.forEach(function (option, index, array) {
							////console.log(option);
							if (option.option_id)
								if (option.option_id.toString() == option_id.toString())
									found = option;
						});
						return found;
					}
					else if (field.type == "multiselect" || field.type == "combo" || field.type == "select") { // lets read the options property
						var found = false;
						field.options.forEach(function (option, index, array) {
							////console.log(option);
							if (option.option_id)
								if (option.option_id.toString() == option_id.toString())
									found = option;
						});
						////console.log(found);
						return found;
					}
				}

			}
		}

		// if double column
		if (self._getPageOnModel(uid, page_id).page_layout == "D") {
			for (var x = 0; x < self._getPageColumnList(uid, page_id, "second").length; x++) {
				var field = self._getPageColumnList(uid, page_id, "second")[x];

				if (typeof field.field_id !== 'undefined') {
					if (field.field_id.toString() == field_id.toString()) {
						////console.log(field.type);
						if (field.type == "label" || field.type == "fieldset" || field.type == "radio" || field.type == "checkbox") { // lets read the list property
							var found = false;
							field.list.forEach(function (option, index, array) {
								////console.log(option);
								if (option.option_id)
									if (option.option_id.toString() == option_id.toString())
										found = option;
							});
							////console.log(found);
							return found;
						}
						else if (field.type == "multiselect" || field.type == "combo" || field.type == "select") { // lets read the options property
							var found = false;
							field.options.forEach(function (option, index, array) {
								////console.log(option);
								if (option.option_id)
									if (option.option_id.toString() == option_id.toString())
										found = option;
							});
							////console.log(found);
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

		if (typeof self._getPageOnModel(uid, page_id) === 'undefined') {
			//dhtmlx.message( {type : "error", text : "Page not found"} );
			return
		}
		else if (typeof self._getPageOnModel(uid, page_id).list[index] === 'undefined') {
			//dhtmlx.message( {type : "error", text : "Column not found"} );
			return;
		}
		else if (typeof self._getPageOnModel(uid, page_id).list[index].list === 'undefined') {
			//dhtmlx.message( {type : "error", text : "Item found is not a column"} );
			return;
		}
		else {
			if (typeof self._getPageOnModel(uid, page_id).list[index].list === 'undefined')
				return []; // not found, return empty array
			else
				return self._getPageOnModel(uid, page_id).list[index].list;
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

		for (var x = 0; x < FormViewer.model.conf_form.template.length; x++) {
			if (FormViewer.model.conf_form.template[x].type == "block") {
				if (typeof FormViewer.model.conf_form.template[x].page_id !== 'undefined') {
					if (FormViewer.model.conf_form.template[x].page_id == page_id)
						return FormViewer.model.conf_form.template[x];
				}
			}
		}
		return {};
	}
	
	,
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
		
		try {
			self.layout[uid].progressOn();
		}
		catch (e) {};

		
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
		
		try {
			self.layout[uid].progressOff();
		}
		catch (e) {};

		
	}
	
}