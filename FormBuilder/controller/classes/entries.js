FormBuilder.entries = FormBuilder.entries || (function () {
	
	var formViewerTemplate = null;
	
	return {
		/**
		 * Description
		 * @method _window_entries
		 * @param {} uid
		 * @param {} form_id
		 * @return
		 */
		_window_entries: function (uid, form_id) {
			var that = FormBuilder, self = this;
			
			if (that.window_manager === null)
				that._window_manager();
			
			that.window_entries[uid] = that.window_manager.createWindow(
			"window_FormManager_entries_" + uid,
			that.model.conf_window_entries.left,
			that.model.conf_window_entries.top,
			that.model.conf_window_entries.width,
			that.model.conf_window_entries.height
			);
			that.window_entries[uid].setIcon(that.model.conf_window_entries.icon, that.model.conf_window_entries.icon_dis);
			that.window_entries[uid].setText(that.model.conf_window_entries.title);
			that.window_entries[uid].center();
			that.window_entries[uid].progressOn();
			FormBuilder.entries._window_entries_saved_toolbar(uid, form_id);
			FormBuilder.entries._window_entries_saved_grid(uid, form_id);
		}
		
		,
		/**
		 * Description
		 * @method _window_entries_saved_toolbar
		 * @param {} uid
		 * @param {} form_id
		 * @return
		 */
		_window_entries_saved_toolbar: function (uid, form_id) {
			var that = FormBuilder, self = this;
			
			that.window_entries_saved_toolbar[uid] = that.window_entries[uid].attachToolbar( that.model.conf_window_entries_toolbar );
			that.window_entries_saved_toolbar[uid].setIconSize(32);
			that.window_entries_saved_toolbar[uid].attachEvent("onClick", function (id) {
			if (id == "edit_entries") {
				self._window_edit_entries_saved(uid, form_id);
			}
			if (id == "delete_entries") {
				dhtmlx.message({
				title: "Warning",
				type: "confirm",
				text: "Do you want to delete the selected entries?",
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
					var postStr = "user_id=" + that.row_saved_id[uid];
					postStr = postStr + "&connId=" + that.row_saved_connid[uid];
					postStr = postStr + "&connectionId=" + that.row_saved_connectionid[uid];
					postStr = postStr + "&agency_id=" + that.configuration[uid].agency_id;
					postStr = postStr + "&form_id=" + that.row_id[uid];
					
					CAIRS.MAP.API.del({
						resource: "forms/entries/"+form_id+"/saved",
						format: "json",
						payload: postStr,
						/**
						 * Description
						 * @method onSuccess
						 * @param {} request
						 * @return
						 */
						onSuccess: function (request) {
							var json = eval('(' + request.response + ')');
							//console.log(json);
							that._setStatusDataTransfer(json.response);
							that._window_entries_saved_grid(uid, form_id);
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
								type: "error"
							});
							//console.log('error');
						}
					});
					}
				}
				});
			}
			});
		}
		
		,
		/**
		 * Description
		 * @method _window_entries_saved_grid
		 * @param {} uid
		 * @param {} form_id
		 * @return
		 */
		_window_entries_saved_grid: function (uid, form_id) {        
			var that = FormBuilder, self = this;
			
			that.window_entries_saved_grid[uid] = that.window_entries[uid].attachGrid(that.model.conf_window_entries_grid);
			that.window_entries_saved_grid[uid].setImagePath(that.dhtmlx_codebase_path+'dhtmlxGrid/codebase/imgs/');
			that.window_entries_saved_grid[uid].setHeader(that.model.conf_window_entries_grid.headers);
			that.window_entries_saved_grid[uid].setColumnIds(that.model.conf_window_entries_grid.ids);
			that.window_entries_saved_grid[uid].setInitWidths(that.model.conf_window_entries_grid.widths);
			that.window_entries_saved_grid[uid].setColAlign(that.model.conf_window_entries_grid.colaligns);
			that.window_entries_saved_grid[uid].setColTypes(that.model.conf_window_entries_grid.coltypes);
			that.window_entries_saved_grid[uid].setColSorting(that.model.conf_window_entries_grid.colsorting);
			that.window_entries_saved_grid[uid].selMultiRows = true;
			that.window_entries_saved_grid[uid].setDateFormat("%m-%d-%Y");
			that.window_entries_saved_grid[uid].init();
			var gridURL = CAIRS.MAP.API.getMappedURL({
			resource: "forms/entries/"+form_id+"/saved", // mandatory
			responseType: "json", // not mandatory, default json
			params: "agency_id="+that.configuration[uid].agency_id
			});
			that.window_entries_saved_grid[uid].clearAll();
			that.window_entries_saved_grid[uid].load(gridURL, function () {
			that.window_entries[uid].progressOff();
			}, "json");
			
			that.window_entries_saved_grid[uid].attachEvent("onRowSelect", function (id, ind) {
			that.window_entries_saved_toolbar[uid].enableItem("edit_entries");
			that.window_entries_saved_toolbar[uid].enableItem("delete_entries");
			that.row_saved_id[uid] = id;
			that.row_saved_connid[uid] = that.window_entries_saved_grid[uid].cells(id,1).getValue();
			that.row_saved_connectionid[uid] = that.window_entries_saved_grid[uid].cells(id,2).getValue();
			});
		}
		
		,
		/**
		 * Description
		 * @method _window_edit_entries_saved
		 * @param {} uid
		 * @param {} form_id
		 * @return
		 */
		_window_edit_entries_saved: function (uid, form_id) {
			var that = FormBuilder, self = this;
			
			
			var window_manager = new dhtmlXWindows();
			window_manager.setImagePath(that.model.conf_window.image_path);
			
			that.window_edit_entries_saved[uid] = window_manager.createWindow(
			"window_FormManager_edit_entries_saved" + uid + "_" + form_id,
			that.model.conf_window_edit_entries.left,
			that.model.conf_window_edit_entries.top,
			that.model.conf_window_edit_entries.width,
			that.model.conf_window_edit_entries.height
			);
			that.window_edit_entries_saved[uid].setText(that.model.conf_window_edit_entries.title_saved);
			that.window_edit_entries_saved[uid].center();
			that.window_edit_entries_saved[uid].progressOn();
			self._window_edit_entries_saved_toolbar(uid, form_id);
			self._window_edit_entries_saved_layout(uid, form_id);
			}
			
		,
		/**
		 * Description
		 * @method _window_edit_entries_saved_toolbar
		 * @param {} uid
		 * @param {} form_id
		 * @return
		 */
		_window_edit_entries_saved_toolbar: function (uid, form_id) {
			var that = FormBuilder, self = this;
			
			that.window_edit_entries_saved_toolbar[uid] = that.window_edit_entries_saved[uid].attachToolbar( that.model.conf_window_edit_entries_toolbar );
			that.window_edit_entries_saved_toolbar[uid].setIconSize(32);
			that.window_edit_entries_saved_toolbar[uid].attachEvent("onClick", function (id) {
			if (id == 'save_form') {
				var data = that.window_edit_entries_saved_form[uid].getFormData();
				
				if (data) {
					var hash = {};
					
					
					var form = that.window_edit_entries_saved_form[uid];
					
					for (var key in data) {
					if (form.getItemType(key) == 'calendar') {
						if ((CAIRS.isValidDate(form.getItemValue(key)))) {
						var day = form.getItemValue(key).getDate();
						var month = form.getItemValue(key).getMonth() + 1;
						var year = form.getItemValue(key).getFullYear();
						hash[key] =  year + "/" + month + "/" + day;
						}
					}else if (form.getItemType(key) == 'checkbox') {
						if (form.isItemChecked(key)) {
						hash[key] = 1;
						}else{
						hash[key] = 0;
						}
					}else if (form.getItemType(key) == 'upload') {
						hash[key] =  JSON.stringify(form.getItemValue(key));
					}else{
						hash[key] = form.getItemValue(key);
					}
					}
					
					var postStr = "user_id=" + that.row_saved_id[uid];
					postStr = postStr + "&connId=" + that.row_saved_connid[uid];
					postStr = postStr + "&connectionId=" + that.row_saved_connectionid[uid];
					postStr = postStr + "&agency_id=" + that.configuration[uid].agency_id;
					postStr = postStr + "&form_id=" + that.row_id[uid];
					postStr = postStr + "&hash=" + JSON.stringify(hash);
					that.progressOn(uid);
					that._setStatusDataTransfer(uid, "Saving form data", true);
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
								that._setStatusDataTransfer(uid, "form saved");
		
								
		
								that.progressOff(uid);
							}
							else {
		
								dhtmlx.message({
									type: "error",
									text: "form wasn't saved. reason: " + json.response
								});
								that._setStatusDataTransfer(uid, "form wasn't saved");
								if (json.response == "token not authorized")
									that._setStatusUserForm(uid, "token expired. Please login again", false);
								that.progressOff(uid);
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
							that._setStatusDataTransfer(uid, "form wasn't saved");
							if (json.response == "token not authorized")
								that._setStatusUserForm(uid, "token expired. Please login again", false);
							that.progressOff(uid);
						}
					});
					
				}
			}
			});
		}
		
		,
		/**
		 * Description
		 * @method _window_edit_entries_saved_layout
		 * @param {} uid
		 * @param {} form_id
		 * @return
		 */
		_window_edit_entries_saved_layout: function (uid, form_id) {
			var that = FormBuilder, self = this;
			
			that.window_edit_entries_saved_layout[uid] = that.window_edit_entries_saved[uid].attachLayout('1C');
			that.window_edit_entries_saved_layout[uid].progressOn();
			that.window_edit_entries_saved_layout[uid].cells('a').hideHeader();
			self._window_edit_entries_saved_tabbar(uid, form_id);
		}
		
		,
		/**
		 * Description
		 * @method _window_edit_entries_saved_tabbar
		 * @param {} uid
		 * @param {} form_id
		 * @return
		 */
		_window_edit_entries_saved_tabbar: function (uid, form_id) {
			var that = FormBuilder, self = this;
			
			that.window_edit_entries_saved_tabbar[uid] = that.window_edit_entries_saved_layout[uid].cells('a').attachTabbar();
			that.window_edit_entries_saved_tabbar[uid].setImagePath(that.dhtmlx_codebase_path+that.model.conf_window_entries_tabbar.image_path);
			that.window_edit_entries_saved_tabbar[uid].setSkin('dhx_skyblue');
			that.window_edit_entries_saved_tabbar[uid].enableScroll(true);
			that.window_edit_entries_saved_tabbar[uid].enableAutoReSize(true);
			that.window_edit_entries_saved_tabbar[uid].addTab("start_tab", "start_tab", "0px");
			that.window_edit_entries_saved_tabbar[uid].hideTab("start_tab", true);
			that.window_edit_entries_saved_tabbar[uid].attachEvent("onSelect", function (idd, last_id) {
			return true;
			});
			self._get_json_entries_saved(uid, form_id);
		}
		
		,
		/**
		 * Description
		 * @method _get_json_entries_saved
		 * @param {} uid
		 * @param {} form_id
		 * @return
		 */
		_get_json_entries_saved: function(uid, form_id) {
			var that = FormBuilder, self = this;
			
			CAIRS.MAP.API.get({
			resource: "forms/" + form_id + "/metadata",
			format: "json",
			payload: "agency_id=" + that.configuration[uid].agency_id + "",
			/**
			 * Description
			 * @method onSuccess
			 * @param {} request
			 * @return
			 */
			onSuccess: function (request) {
				var json = JSON.parse(request.response);
				self.formViewerTemplate = json.metadata_file.template;
				that.signature_controls_saved[uid] = json.metadata_file.signature_controls;
				self._window_edit_entries_saved_form(uid, form_id);
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
				type: "error"
				});
			}
			});
		}
		
		,
		/**
		 * Description
		 * @method _window_edit_entries_saved_form
		 * @param {} uid
		 * @param {} form_id
		 * @return
		 */
		_window_edit_entries_saved_form: function (uid, form_id) {
			var that = FormBuilder, self = this;
			try {
			self.formViewerTemplate.sort(function (a, b) {
				return a.index - b.index;
			});
			
			for (var x = 0; x < self.formViewerTemplate.length; x++) {
				if (self.formViewerTemplate[x].type == "block") {
					if (typeof self.formViewerTemplate[x].page_id !== 'undefined') {
						// order column 1 of the page
						self.formViewerTemplate[x].list[0].list.sort(function (a, b) {
							return a.index - b.index;
						});
		
						if (self.formViewerTemplate[x].list[0].list)
							for (var y = 0; y < self.formViewerTemplate[x].list[0].list.length; y++) {
								////console.log( self.formViewerTemplate[x].list[0].list[y] );
								if (self.formViewerTemplate[x].list[0].list[y].list)
									self.formViewerTemplate[x].list[0].list[y].list.sort(function (a, b) {
										return a.index - b.index;
									});
		
								if (self.formViewerTemplate[x].list[0].list[y].options)
									self.formViewerTemplate[x].list[0].list[y].options.sort(function (a, b) {
										return a.index - b.index;
									});
							}
		
						// if is there 2 columns
						if (typeof self.formViewerTemplate[x].list[2] !== 'undefined') {
							// order column 2 of the page
							self.formViewerTemplate[x].list[2].list.sort(function (a, b) {
								return a.index - b.index;
							});
		
							for (var y = 0; y < self.formViewerTemplate[x].list[2].list.length; y++) {
								////console.log( self.formViewerTemplate[x].list[0].list[y] );
								if (self.formViewerTemplate[x].list[2].list[y].list)
									self.formViewerTemplate[x].list[2].list[y].list.sort(function (a, b) {
										return a.index - b.index;
									});
		
								if (self.formViewerTemplate[x].list[2].list[y].options)
									self.formViewerTemplate[x].list[2].list[y].options.sort(function (a, b) {
										return a.index - b.index;
									});
							}
						}
					}
				}
			}
		
			that.window_edit_entries_saved_form[uid] = that.window_edit_entries_saved_tabbar[uid].cells("start_tab").attachForm(self.formViewerTemplate);
			that.window_edit_entries_saved_form[uid].setSkin('dhx_skyblue');
		
			self.formViewerTemplate.forEach(function (element, index, array) {
				if (element.type == "block") {
					if (typeof element.id !== 'undefined') {
						that.window_edit_entries_saved_tabbar[uid].addTab(self.formViewerTemplate[index].id, element.label, element.tab_width);
		
						////console.log(  );
		
						that.window_edit_entries_saved_tabbar[uid].cells(self.formViewerTemplate[index].id).attachObject(self.formViewerTemplate[index].id.toString());
						if (index == 1)
							that.window_edit_entries_saved_tabbar[uid].setTabActive(self.formViewerTemplate[index].id);
		
						//document.getElementById( self.formViewerTemplate[index].id.toString() ).style.overflow = "auto";
					}
				}
			});
			
			try {
				CAIRS.dhtmlx.prepareForm(uid + "_form_preview_FormManager", that.model.conf_form, that.window_edit_entries_saved_form[ uid ]);
				
				//console.log( JSON.stringify( that.model.conf_form ) );
				
				CAIRS.dhtmlx.formFields[uid + "_form_preview_FormManager"].forEach(function (field, index, array)
				{
					//console.log( field );	
				});
		
				// that._bindFormFieldsToLibraryFields_saved(uid + "_form_preview_FormManager", uid);
		
				that._renderSignatureControl_saved(uid);
			}catch(e){
				//console.log(e.stack);   
			}
		
			self.formViewerTemplate.forEach(function (element, index, array) {
				if (element.type == "block") {
					if (typeof element.id !== 'undefined') {
						document.getElementById(self.formViewerTemplate[index].id.toString()).parentNode.style.overflow = "auto";
						document.getElementById(self.formViewerTemplate[index].id.toString()).parentNode.style.paddingBottom = "20px";
					}
				}
			});
			
			self._window_edit_entries_saved_get(uid, form_id);
			
			}catch(e){
			//console.log(e.stack);   
			}
		}
		
		,
		/**
		 * Description
		 * @method _window_edit_entries_saved_get
		 * @param {} uid
		 * @param {} form_id
		 * @return
		 */
		_window_edit_entries_saved_get: function (uid, form_id) {
			var that = FormBuilder, self = this;
			
			var postStr = "user_id=" + that.row_saved_id[uid];
			postStr = postStr + "&connId=" + that.row_saved_connid[uid];
			postStr = postStr + "&connectionId=" + that.row_saved_connectionid[uid];
			postStr = postStr + "&agency_id=" + that.configuration[uid].agency_id;
			postStr = postStr + "&form_id=" + that.row_id[uid];
			CAIRS.MAP.API.get({
			resource: "forms/formviewer/getdata",
			format: "json",
			payload: postStr,
		
			onSuccess: function (request) {
				var json = JSON.parse( request.response );
				if (json.status == "success") {
					//dhtmlx.message( {type : "error", text : json.response} );
					that._setStatusDataTransfer(uid, "form(" + form_id + ") hash received");
					
					var result = null;
					
					if(json.hash == null)
						result = {};
					else
					{
						for( var key in json.hash)
						{
							if( json.hash[ key ] == null )
							{
								delete json.hash[ key ];
							}
						}
						
						result = json.hash;
					}
					
					that.window_edit_entries_saved_form[uid].setFormData(result);
				}                
				
				//console.log(that.window_edit_entries_saved_form[uid].getFormData());
				that.window_edit_entries_saved_layout[uid].progressOff();
				that.window_edit_entries_saved[uid].progressOff();
				that.window_edit_entries_saved_toolbar[uid].enableItem('save_form');
			},
		
			onFail: function (request) {
				
			}
			});
		}
		
		,
		/**
		 * Description
		 * @method _renderSignatureControl_saved
		 * @param {} uid
		 * @return
		 */
		_renderSignatureControl_saved: function (uid) {
			var that = FormBuilder, self = this;
			try {
				var form_id = uid;
				if (typeof that.signature_controls_saved[uid] === 'undefined') {
					that.signature_controls_saved[uid] = [];
				}
				////console.log(that.signature_controls[ uid ]);
				var signatureWrappers = that.signature_controls_saved[uid];
				//console.log(signatureWrappers);
				signatureWrappers.forEach(function (wrapperObj, index, array) {
					var wrapperID = wrapperObj.wrapper;
					var comboID = wrapperObj.combo;
					var inputID = wrapperObj.input;
					var hiddenID = wrapperObj.hidden;
					var dateID = wrapperObj.date;
		
					////console.log( that.form[ uid ].getContainer(wrapperID).id )
		
					var wrapper = document.getElementById(that.window_edit_entries_saved_form[ uid ].getContainer(wrapperID).id);
		
					////console.log( wrapper );
		
					var signature_area_ID = wrapperID.replace(/_wrapper/gi, "_active_area");
		
					var signature_control = null;
					if (document.getElementById(signature_area_ID + "_signature_control") != null) {
						signature_control = document.getElementById(signature_area_ID + "_signature_control");
					}
					else {
						signature_control = document.createElement("div");
						signature_control.setAttribute("id", signature_area_ID + "_signature_control");
						signature_control.innerHTML = "<img style='cursor:pointer;' src='" + that.icons_path + "sign_here.png' />";
						/**
						 * Description
						 * @method onclick
						 * @return
						 */
						signature_control.onclick = function () {
							////console.log( that.form[ uid ].getCombo( comboID ) );
							if (that.window_edit_entries_saved_form[ uid ].getCombo(comboID).getSelectedValue().length < 1) {
								////console.log(that.form_grid_field_propertie_options[ uid ].getCombo( comboID ).getSelectedText().length);
								dhtmlx.message({
									type: "error",
									text: "Select a caseworker for signing this area first."
								});
		
								that.window_edit_entries_saved_form[ uid ].getCombo(comboID).openSelect();
								that.window_edit_entries_saved_form[ uid ].getCombo(comboID).setImagePath(that.dhtmlx_codebase_path);
								return;
							}
		
							var filesToLoad = [
								FormBuilder.signature_application_url + "SuperSignature/wz_jsgraphics.js" /* Super signature control */ 
								,FormBuilder.signature_application_url + "SuperSignature/ss.js" /* Super signature control */
								//,FormBuilder.signature_application_url +  + "css/signature_component.css" /* signature css */
								,FormBuilder.signature_application_url + "controller/Signature_Component.js" /* signature model and controller */
							];
							/* load files and call signature component */
							CAIRS.onDemand.load(filesToLoad, function () {
		
								////console.log(that.getCaseWorkerId(uid, that.form[ uid ].getCombo( comboID ).getSelectedText()));
		
								Signature_Component.signIn({
									user_id: that.window_edit_entries_saved_form[ uid ].getCombo(comboID).getSelectedValue(),
									user_name: that.window_edit_entries_saved_form[ uid ].getCombo(comboID).getComboText(), // mandatory
		
									agency_id:  that.configuration[ uid ].agency_id, // mandatory
		
									file_name: that.window_edit_entries_saved_form[ uid ].getCombo(comboID).getSelectedText().toString().split(" ")[0] + "_signature", // mandatory
		
									application_url: FormBuilder.signature_application_url, // mandatory
									file_path: that.configuration[ uid ].signature_file_path, // mandatory - / slash on the end
		
									/* saving files under a path using the name as parameter */
									file_path_abs: that.configuration[ uid ].signature_file_path_abs, // mandatory - / slash on the end
		
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
		
										that.window_edit_entries_saved_form[ uid ].setItemValue(hiddenID, response.file_path + "" + response.file_name);
		
										var hfield = that._getFormItem(hiddenID, uid + "_form_preview_FormManager");
		
										that._getFieldOption(uid, hfield.page_id, hfield.field_id, hfield.option_id)["value"] = response.file_path + "" + encodeURIComponent( response.file_name );
		
										////console.log( that._getFieldOption( uid, hfield.page_id, hfield.field_id, hfield.option_id ) );
		
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
		
					document.getElementById( that.window_edit_entries_saved_form[ uid ].getContainer( wrapperID ).id ).style.width = "200px";
					document.getElementById( that.window_edit_entries_saved_form[ uid ].getContainer( wrapperID ).id ).style.height = "100px";
		
					////console.log( that.form[ uid ].getContainer(wrapperID) );
		
				});
			}
			catch (e) {
				////console.log(e.stack);
			}
		}
		
			
	}; // end return
 
})();