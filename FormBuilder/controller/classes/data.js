FormBuilder.data =  FormBuilder.data || (function () {
	return {
		/**
		 * Description
		 * @method _addGroupOfFieldsToPage
		 * @param {} uid
		 * @param {} groupID
		 * @return
		 */
		_addGroupOfFieldsToPage: function (uid, groupID) {
			var that  = FormBuilder;
			that.progressOnForm(uid);
			that._setStatusDataTransferForm(uid, "requesting group(" + groupID + ") fields", true);
			CAIRS.MAP.API.get({
				resource: "/LibraryFields/groups/fields/" + groupID // mandatory
				,
				format: "json" // json, yaml, xml. Default: json. Not mandatory
				,
				payload: "columns=" + that.model.conf_grid_library_fields.ids.replace(new RegExp("sub_row,", "g"), "") + "",
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
							if (that.grid_form_fields[uid].doesRowExist(row.id)) {
	
							}
							else {
								var newid = that.grid_form_fields[uid].uid();
	
								//row.data[that.grid_library_fields[uid].getColIndexById("required")] = 0;
								row.data[that.grid_library_fields[uid].getColIndexById("use_library")] = "1";
								row.data[that.grid_form_fields[uid].getColIndexById("library_field_id")] = row.id;
								row.data[that.grid_form_fields[uid].getColIndexById("index")] = that.grid_form_fields[uid].getRowsNum();
	
								that.grid_form_fields[uid].addRow(newid, row.data);
	
								var type_value = row.data[0];
								var name = row.data[2];
								var label = row.data[that.grid_library_fields[uid].getColIndexById("label")];
								/**/
								var fieldJSON = {
									type: that._convertLibraryFieldTypetoDhtmlxType(type_value),
									type_standard: type_value,
									name: that.handleInputName(uid, name),
									label: label,
									value: "",
									tooltip: "",
									required: false,
									validate: "",
									field_id: newid,
									data: row.data,
									library_field_id : row.id,
									use_library : "1",
									index: that.grid_form_fields[uid].getRowsNum(),
									list: [],
									options: [],
									className: ""
								};
								
								//console.log( fieldJSON );
								
								that.data._putFieldOnMemory(uid, that.selected_page[uid], fieldJSON, function () {
									that.preview._startPreview(uid);
								});
								//that.data._reOrderPageFields( uid );
							}
	
						});
						if (rows.length == 0) {
							dhtmlx.message({
								type: "error",
								text: "The dragged group has no fields."
							});
						}
						that.progressOffForm(uid);
	
					}
					else {
						dhtmlx.message({
							type: "error",
							text: json.response
						});
						that.progressOffForm(uid);
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
					that.progressOffForm(uid);
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
			var that  = FormBuilder,
				uid = pageConfiguration.uid,
				pagename = pageConfiguration.pagename || "",
				page_id = pageConfiguration.page_id || null,
				page_layout = pageConfiguration.page_layout || "S",
				tab_width = pageConfiguration.tab_width || "100",
				form_id = pageConfiguration.form_id || null,
				record = [],
				pageJSON = null,
				rule_action = pageConfiguration.rule_action || "show",
				rule_match = pageConfiguration.rule_match || "all",
				rule_enable = pageConfiguration.rule_enable || "0";
	
			if (page_layout == "S") {
				pageJSON = {
					type: "block",
					width: that.form_default_width,
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
					tab_width: tab_width + "px",
					rule_action: rule_action,
					rule_match: rule_match,
					rule_enable: rule_enable
					
				};
			}
			else if (page_layout == "D") {
				pageJSON = {
					type: "block",
					width: that.form_default_width,
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
					tab_width: tab_width + "px",
					rule_action: rule_action,
					rule_match: rule_match,
					rule_enable: rule_enable
					
				};
			}
	
			//console.log( "--------------------------------------" );
			//console.log( page_id );
	
			if (page_id == null) {
				//console.log( "db also" );
				pageConfiguration["index"] = that.grid_pages[uid].getRowsNum();
				pageJSON["index"] = pageConfiguration["index"];
	
				page_id = null;
				record.push(pagename);
				record.push(page_layout);
				record.push(tab_width);
				record.push(pageJSON["index"]);
	
				that._setStatusDataTransferForm(uid, "requesting pages data", true);
				that.progressOnForm(uid);
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
						var json = JSON.parse( request.response );
						if (json.status == "success") {
							//dhtmlx.message( {type : "error", text : json.response} );
							try
							{
								that._setStatusDataTransferForm(uid, "pages data received");
	
								page_id = json.page_id;
		
								pageJSON["page_id"] = page_id;
								pageJSON["id"] = page_id;
		
								that.grid_pages[uid].addRow(page_id, record);
								that._putEmptyPageOnMemory(uid, pageJSON);
								//that.grid_pages[ uid ].cells(page_id, that.grid_pages[ uid ].getColIndexById( "index" )).setValue( pageConfiguration[ "index" ] );
		
								if (that.grid_pages[uid].getRowsNum() == 1)
									that.setPageStatusInfo(uid, "page " + pagename + " added");
		
								if (callBack) callBack( page_id );
		
								that.progressOffForm(uid);
							}catch(e)
							{
								//console.log(e.stack);
							}
	
						}
						else {
							dhtmlx.message({
								type: "error",
								text: "Page not addedd. reason: " + json.response
							});
							that._setStatusDataTransferForm(uid, "unable to get pages data");
							if (json.response == "token not authorized")
								that._setStatusUserForm(uid, "token expired. Please login again", false);
							that.progressOffForm(uid);
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
							text: "Page not addedd. reason: " + json.response
						});
						that._setStatusDataTransferForm(uid, "unable to get pages data");
						if (json.response == "token not authorized")
							that._setStatusUserForm(uid, "token expired. Please login again", false);
						that.progressOffForm(uid);
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
	
				that.grid_pages[uid].addRow(page_id, record);
				that._putEmptyPageOnMemory(uid, pageJSON);
				//that.grid_pages[ uid ].cells(page_id, that.grid_pages[ uid ].getColIndexById( "index" )).setValue( pageConfiguration[ "index" ] );
	
				if (that.grid_pages[uid].getRowsNum() == 1)
					that.setPageStatusInfo(uid, "page " + pagename + " added");
	
				if (callBack) callBack();
	
				//that.progressOffForm( uid );
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
			var that  = FormBuilder;
			var form_id = that.form_properties[uid].getItemValue("form_id");
			that.progressOnForm(uid);
			
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
					var json = JSON.parse( request.response );
					dhtmlx.message({
						type: "error",
						text: "option(" + field_id + ") deleted"
					});
					that._setStatusDataTransferForm(uid, "option(" + field_id + ") deleted");
	
					for (var x = 0; x < that._getPageColumnList(uid, page_id, "first").length; x++) {
						if (typeof that._getPageColumnList(uid, page_id, "first")[x].field_id !== 'undefined') {
							if(that._getPageColumnList(uid, page_id, "first")[x].list)
								that._getPageColumnList(uid, page_id, "first")[x].list.forEach(function (option, index, array) {
									if( option.field_id )
										if (option.field_id.toString() == option_id.toString()) {
											that._getPageColumnList(uid, page_id, "first")[x].list.splice(index, 1);
										}
								});
							if( that._getPageColumnList(uid, page_id, "first")[x].options )
								that._getPageColumnList(uid, page_id, "first")[x].options.forEach(function (option, index, array) {
									if( option.field_id )
										if (option.field_id.toString() == option_id.toString()) {
											that._getPageColumnList(uid, page_id, "first")[x].options.splice(index, 1);
										}
								});
						}
					}
			
					// if double column
					if (that.pages[uid][page_id].page_layout == "D") {
						for (var x = 0; x < that._getPageColumnList(uid, page_id, "second").length; x++) {
							if (typeof that._getPageColumnList(uid, page_id, "second")[x].field_id !== 'undefined') {
								if(that._getPageColumnList(uid, page_id, "second")[x].list)
									that._getPageColumnList(uid, page_id, "second")[x].list.forEach(function (option, index, array) {
										if( option.field_id )
											if (option.field_id.toString() == option_id.toString()) {
												that._getPageColumnList(uid, page_id, "second")[x].list.splice(index, 1);
											}
									});
								if( that._getPageColumnList(uid, page_id, "second")[x].options )
									that._getPageColumnList(uid, page_id, "second")[x].options.forEach(function (option, index, array) {
										if( option.field_id )
											if (option.field_id.toString() == option_id.toString()) {
												that._getPageColumnList(uid, page_id, "second")[x].options.splice(index, 1);
											}
									});
							}
						}
					}
			
					that.grid_field_propertie_options[uid].deleteRow(option_id);
			
					that.data._reOrderFieldOptions(uid);
			
					that.toolbar_grid_field_propertie_options[uid].disableItem("delete");
					that.toolbar_grid_field_propertie_options[uid].disableItem("edit");
	
					that.progressOffForm(uid);
	
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
					that._setStatusDataTransferForm(uid, "option(" + field_id + ") not deleted");
					that.progressOffForm(uid);
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
			var that  = FormBuilder,
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
						var page_id = that.grid_pages[uid].getSelectedRowId();
	
						form_id = that.form_properties[uid].getItemValue("form_id");
	
						that.progressOnForm(uid);
						that._setStatusDataTransferForm(uid, "trying to delete the page", true);
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
								var json = JSON.parse( request.response );
								dhtmlx.message({
									type: "error",
									text: json.response
								});
								that._setStatusDataTransferForm(uid, "page deleted");
								that.grid_pages[uid].deleteRow(page_id);
	
								//console.log( that.grid_pages[ uid ].getRowsNum() )
	
								if (that.grid_pages[uid].getRowsNum() > 0)
									that.setPageStatusInfo(uid, "");
								else
									that.setPageStatusInfo(uid, "please create a page");
	
								that.grid_form_fields[uid].clearAll();
	
								//console.log(that.pages[ uid ]);
								//console.log(that.model.conf_form_preview.template);
								delete that.pages[uid][page_id];
	
								for (var x = 0; x < that.model.conf_form_preview.template.length; x++) {
									if (that.model.conf_form_preview.template[x].type == "block") {
										if (typeof that.model.conf_form_preview.template[x].page_id !== 'undefined') {
											if (that.model.conf_form_preview.template[x].page_id == page_id) that.model.conf_form_preview.template.splice(x, 1);
										}
									}
								}
	
								//console.log(that.model.conf_form_preview.template);
								//console.log(that.pages[ uid ]);
	
								that.toolbar_form_pages[uid].disableItem("delete_page");
								that.toolbar_form_pages[uid].disableItem("edit_page");
								that.toolbar_form_pages[uid].disableItem("rules_manager");
	
								that.tabbar_form_create_fields[uid].setTabActive("add_field");
								that.tabbar_form_create_fields[uid].hideTab("field_properties");
	
								that.selected_page[uid] = null;
								that.toolbar_form_fields[uid].disableItem("edit_field");
								that.toolbar_form_fields[uid].disableItem("delete_field");
								that.toolbar_form_fields[uid].disableItem("rules_manager");
	
								if (that.form_field_propertie[uid]) {
									that.form_field_propertie[uid].unload();
									that.form_field_propertie[uid] = null;
								}
	
								that.progressOffForm(uid);
	
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
	
								that.progressOffForm(uid);
							}
						});
					}
				}
			});
		}
		
		
		,
		/**
		 * Description
		 * @method _deleteForm
		 * @param {} uid
		 * @return
		 */
		_deleteForm: function (uid) {
			var that  = FormBuilder;
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
						
						that._setStatusDataTransfer("trying to delete form", true);
						
						CAIRS.MAP.API.del({
							resource: "/forms/" + that.grid[uid].getSelectedRowId() // mandatory
							,
							format: "json" // json, yaml, xml. Default: json. Not mandatory
							,
							payload: "agency_id=" + that.configuration[uid.replace(new RegExp("_" + that.grid[uid].getSelectedRowId(), "g"), "")].agency_id + "" // mandatory for PUT and POST
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
								that.grid[uid].deleteSelectedRows();
								that._setStatusDataTransfer("form deleted");
								//that.data._feedGrid(uid);
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
								that._setStatusDataTransfer("form " + that.grid[uid].getSelectedRowId() + " not deleted");
								that._setStatusError("error when deleting " + that.grid[uid].getSelectedRowId());
							}
						});
					}
				}
			});
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
			var that  = FormBuilder;
			//console.log("-----------------------------------------------");
			//console.log(arguments);
	
			for (var x = 0; x < that._getPageColumnList(uid, page_id, "first").length; x++) {
				var field = that._getPageColumnList(uid, page_id, "first")[x];
	
				if (typeof field.field_id === 'undefined') continue;
	
				if (field.field_id.toString() == field_id.toString()) {
					that.progressOnForm(uid);
					var form_id = that.form_properties[uid].getItemValue("form_id");
					var found_field_index = x;
	
					if (clientOnly) {
						//console.log("-----------------------------------------------");
						//console.log("clientOnly");
						that._setStatusDataTransferForm(uid, "trying to move field(" + field_id + ")", true);
						that.grid_form_fields[uid].deleteRow(field_id);
						that._getPageColumnList(uid, page_id, "first").splice(found_field_index, 1);
						that.toolbar_form_fields[uid].disableItem("edit_field");
						that.toolbar_form_fields[uid].disableItem("delete_field");
						that.toolbar_form_fields[uid].disableItem("rules_manager");
						that.tabbar_form_create_fields[uid].hideTab("field_properties");
						if (that.form_field_propertie[uid]) {
							that.form_field_propertie[uid].unload();
							that.form_field_propertie[uid] = null;
						}
	
						//that.data._feedGrid_form_fieldsNormalize(uid, page_id);
						that.data._reOrderPageFields(uid);
					}
					else {
						that._setStatusDataTransferForm(uid, "trying to delete field(" + field_id + ")", true);
						CAIRS.MAP.API.del({
							resource: "/forms/" + form_id + "/pages/" + page_id + "/fields/" + field_id // mandatory
							,
							format: "json" // json, yaml, xml. Default: json. Not mandatory
							,
							payload: "agency_id=" + that.configuration[uid.replace(new RegExp("_" + form_id, "g"), "")].agency_id + ""
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
									text: "field(" + field_id + ") deleted"
								});
								that._setStatusDataTransferForm(uid, "field(" + field_id + ") deleted");
	
								that.grid_form_fields[uid].deleteRow(field_id);
								that._getPageColumnList(uid, page_id, "first").splice(found_field_index, 1);
	
								that.toolbar_form_fields[uid].disableItem("edit_field");
								that.toolbar_form_fields[uid].disableItem("delete_field");
								that.toolbar_form_fields[uid].disableItem("rules_manager");
								that.tabbar_form_create_fields[uid].hideTab("field_properties");
								if (that.form_field_propertie[uid]) {
									that.form_field_propertie[uid].unload();
									that.form_field_propertie[uid] = null;
								}
	
								window.setTimeout(function () {
									var page_id = that.grid_pages[uid].getSelectedRowId();
									//that.data._feedGrid_form_fieldsNormalize(uid, page_id);
									that.data._reOrderPageFields(uid);
								}, 500);
	
								that.progressOffForm(uid);
	
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
								that._setStatusDataTransferForm(uid, "field(" + field_id + ") not deleted");
								that.progressOffForm(uid);
							}
						});
					}
	
				}
			}
	
			if (that.pages[uid][page_id].page_layout == "D") {
				for (var x = 0; x < that._getPageColumnList(uid, page_id, "second").length; x++) {
					var field = that._getPageColumnList(uid, page_id, "second")[x];
	
					if (typeof field.field_id === 'undefined') continue;
	
					if (field.field_id.toString() == field_id.toString()) {
						that.progressOnForm(uid);
						that._setStatusDataTransferForm(uid, "trying to delete field(" + field_id + ")", true);
						var form_id = that.form_properties[uid].getItemValue("form_id");
						var found_field_index = x;
	
						if (clientOnly) {
							//console.log("-----------------------------------------------");
							//console.log("clientOnly");
							that._setStatusDataTransferForm(uid, "trying to move field(" + field_id + ")", true);
							that.grid_form_fields[uid].deleteRow(field_id);
							that._getPageColumnList(uid, page_id, "second").splice(found_field_index, 1);
							that.toolbar_form_fields[uid].disableItem("edit_field");
							that.toolbar_form_fields[uid].disableItem("delete_field");
							that.toolbar_form_fields[uid].disableItem("rules_manager");
							that.tabbar_form_create_fields[uid].hideTab("field_properties");
							if (that.form_field_propertie[uid]) {
								that.form_field_propertie[uid].unload();
								that.form_field_propertie[uid] = null;
							}
							that.data._reOrderPageFields(uid);
							//that.data._feedGrid_form_fieldsNormalize(uid, page_id);
						}
						else {
							that._setStatusDataTransferForm(uid, "trying to delete field(" + field_id + ")", true);
							CAIRS.MAP.API.del({
								resource: "/forms/" + form_id + "/pages/" + page_id + "/fields/" + field_id // mandatory
								,
								format: "json" // json, yaml, xml. Default: json. Not mandatory
								,
								payload: "agency_id=" + that.configuration[uid.replace(new RegExp("_" + form_id, "g"), "")].agency_id + ""
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
										text: "field(" + field_id + ") deleted"
									});
									that._setStatusDataTransferForm(uid, "field(" + field_id + ") deleted");
	
									that.grid_form_fields[uid].deleteRow(field_id);
									that._getPageColumnList(uid, page_id, "second").splice(found_field_index, 1);
	
									that.toolbar_form_fields[uid].disableItem("edit_field");
									that.toolbar_form_fields[uid].disableItem("delete_field");
									that.toolbar_form_fields[uid].disableItem("rules_manager");
									that.tabbar_form_create_fields[uid].hideTab("field_properties");
									if (that.form_field_propertie[uid]) {
										that.form_field_propertie[uid].unload();
										that.form_field_propertie[uid] = null;
									}
	
									that.data._reOrderPageFields(uid);
	
									that.progressOffForm(uid);
	
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
									that._setStatusDataTransferForm(uid, "field(" + field_id + ") not deleted");
									that.progressOffForm(uid);
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
		 * @method _editFieldOfAPage
		 * @param {} uid
		 * @param {} hash
		 * @param {} callBack
		 * @return
		 */
		_editFieldOfAPage: function (uid, hash, callBack) {
			var that  = FormBuilder,
				field_id, form_id = that.form_properties[uid].getItemValue("form_id"),
				page_id = null;
				
				//console.log(hash);
	
			//console.log(hash);
	
			if (typeof hash["page_id"] === 'undefined')
				page_id = that.grid_pages[uid].getSelectedRowId();
	
			if (typeof hash["field_id"] === "undefined") {
				dhtmlx.message({
					type: "error",
					text: "field_id is missing"
				});
				//if( callBack ) callBack();
				return;
			}
			if (that.selected_page[uid] == null) {
				dhtmlx.message({
					type: "error",
					text: "You need to select a page before adding fields."
				});
				//if( callBack ) callBack();
				return;
			}
	
			field_id = hash["field_id"];
	
			hash["name"] = that.handleInputName(uid, hash["label"]);
	
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
				hash["type"] = that.metaparser._getPageField(uid, that.selected_page[uid], field_id)["type_standard"];
				hash["type_standard"] = that.metaparser._getPageField(uid, that.selected_page[uid], field_id)["type"];
			}
			
			if( hash["type_standard"].length == 1)
				hash["type_standard"] = that._convertLibraryFieldTypetoDhtmlxType( hash["type_standard"]);
	
			that.progressOnForm(uid);
			that._setStatusDataTransferForm(uid, "sending field_id(" + field_id + ") hash", true);
	
			delete hash["name"];
	
			CAIRS.MAP.API.update({
				resource: "/forms/" + form_id + "/pages/" + page_id + "/fields/" + field_id // mandatory
				,
				format: "json" // json, yaml, xml. Default: json. Not mandatory
				,
				payload: "agency_id=" + that.configuration[that._getRawUID(uid)].agency_id + "&hash=" + JSON.stringify(hash) // mandatory for PUT and POST
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
	
					if (json.status == "success") {
						that._setStatusDataTransferForm(uid, "field_id(" + field_id + ") saved");
						var rowData = [];
						that.model.conf_grid_fields.ids.split(",").forEach(function (id, index, array) {
							if (typeof hash[id] !== 'undefined') {
								if (id == 'required') {
									if (hash[id] == 1) {
	
										try {
											that.grid_form_fields[uid].cells(field_id, that.grid_form_fields[uid].getColIndexById(id)).setValue(1);
										}
										catch (e) {
	
										}
										that.metaparser._getPageField(uid, that.selected_page[uid], field_id)[id] = 1;
										rowData.push(1);
									}
									else {
	
										try {
											that.grid_form_fields[uid].cells(field_id, that.grid_form_fields[uid].getColIndexById(id)).setValue(0);
										}
										catch (e) {
	
										}
										that.metaparser._getPageField(uid, that.selected_page[uid], field_id)[id] = 0;
										rowData.push(0);
									}
								}
								else if (id == "use_library") {
									try {
										var islib = that.grid_form_fields[uid].cells(field_id, that.grid_form_fields[uid].getColIndexById(id)).getValue();
										that.metaparser._getPageField(uid, that.selected_page[uid], field_id)[id] = islib;
										rowData.push(islib);
									}
									catch (e) {
										that.metaparser._getPageField(uid, that.selected_page[uid], field_id)[id] = hash[id];
										rowData.push(hash[id]);
									}
	
								}
								else if (id == "tooltip") {
	
									try {
										that.grid_form_fields[uid].cells(field_id, that.grid_form_fields[uid].getColIndexById(id)).setValue(hash[id]);
									}
									catch (e) {
	
									}
									that.metaparser._getPageField(uid, that.selected_page[uid], field_id)["tooltip"] = hash[id];
									that.metaparser._getPageField(uid, that.selected_page[uid], field_id)["note"] = {
										text: hash[id]
									};
									that.metaparser._getPageField(uid, that.selected_page[uid], field_id)["info"] = true;
									rowData.push(hash[id]);
								}
								else if (id == "name") {
	
									try {
										that.grid_form_fields[uid].cells(field_id, that.grid_form_fields[uid].getColIndexById(id)).setValue(hash[id]);
									}
									catch (e) {
	
									}
									that.metaparser._getPageField(uid, that.selected_page[uid], field_id)[id] = hash[id];
									that.metaparser._getPageField(uid, that.selected_page[uid], field_id)["name"] = hash[id];
									rowData.push(hash[id]);
								}
								else if (id == "type") {
	
									try {
										that.grid_form_fields[uid].cells(field_id, that.grid_form_fields[uid].getColIndexById(id)).setValue(hash[id]);
									}
									catch (e) {
	
									}
									that.metaparser._getPageField(uid, that.selected_page[uid], field_id)[id] = hash[id];
									that.metaparser._getPageField(uid, that.selected_page[uid], field_id)["type"] = that._convertLibraryFieldTypetoDhtmlxType(hash[id]);
	
									if (hash[id] == "A")
									{
										that.metaparser._getPageField(uid, that.selected_page[uid], field_id)["rows"] = 4;
										that.metaparser._getPageField(uid, that.selected_page[uid], field_id)["style"] = "width:190px;";
									}
	
									rowData.push(hash[id]);
								}
								else {
									//console.log( hash[ id ] );
									if (hash[id]) {
	
										try {
											that.grid_form_fields[uid].cells(field_id, that.grid_form_fields[uid].getColIndexById(id)).setValue(hash[id]);
										}
										catch (e) {
	
										}
										that.metaparser._getPageField(uid, that.selected_page[uid], field_id)[id] = hash[id];
										rowData.push(hash[id]);
									}
									else {
	
										try {
											that.grid_form_fields[uid].cells(field_id, that.grid_form_fields[uid].getColIndexById(id)).setValue("");
										}
										catch (e) {
	
										}
										that.metaparser._getPageField(uid, that.selected_page[uid], field_id)[id] = "";
										rowData.push(hash[id]);
									}
								}
							}
							else {
								//console.log( "grid column name not present on form hash -----------------------" );
								//console.log( id );
								//console.log( hash[ id ] );
								//console.log( "grid column name not present on form hash -----------------------" );
								//that.grid_form_fields[ uid ].cells(field_id, that.grid_form_fields[ uid ].getColIndexById( id ) ).setValue( hash[ id ] );
								//rowData.push( hash[ id ] );
							}
	
							that.metaparser._getPageField(uid, that.selected_page[uid], field_id)["data"] = rowData;
	
						});
						that.preview._startPreview(uid);
						that.progressOffForm(uid);
						if (callBack) callBack();
					}
					else {
						dhtmlx.message({
							type: "error",
							text: "Field don't saved. reason: " + json.response
						});
						that._setStatusDataTransferForm(uid, "field don't saved");
						if (json.response == "token not authorized")
							that._setStatusUserForm(uid, "token expired. Please login again", false);
						that.progressOffForm(uid);
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
					that._setStatusDataTransferForm(uid, "field don't saved");
					if (json.response == "token not authorized")
						that._setStatusUserForm(uid, "token expired. Please login again", false);
					that.progressOffForm(uid);
				}
			});
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
			var that  = FormBuilder,
				record = [],
				text = hash.text,
				asdefault = hash.asdefault,
				form_id = that.form_properties[uid].getItemValue("form_id"),
				page_id = that.grid_pages[uid].getSelectedRowId();
	
			if (typeof that.grid_field_propertie_options_start_sequence[uid] === 'undefined')
				that.grid_field_propertie_options_start_sequence[uid] = 0;
	
			var option_id = that.grid_field_propertie_options[uid].getSelectedRowId();
			var field_id = that.grid_form_fields[uid].getSelectedRowId();
	
			var ftype = that._convertLibraryFieldTypetoDhtmlxType(hash["type"]);
			if (ftype == "combo" || ftype == "multiselect" || ftype == "select")
				hash["optionname"] = hash["text"];
			else
				hash["optionname"] = hash["label"];
	
			hash["caption"] = hash["label"];
	
			//var type_MAP_standard = hash[ "type_standard" ];
			//var type_DHTMLX_standard = hash[ "type" ];
			hash["type_standard"] = that._convertLibraryFieldTypetoDhtmlxType(hash["type_standard"]);
			//hash[ "type" ] = type_MAP_standard;
	
			if (hash["asdefault"] == 1 || hash["asdefault"] == "1" || hash["asdefault"] == "Y")
				hash["asdefault"] = "Y";
			else
				hash["asdefault"] = "N";
	
			//console.log( "_editOptionOfAField" );
			//console.log( hash );
			
			if( hash["value"] == "" && hash.length > 0 )
				hash["value"] = hash.text;
	
			that.progressOnForm(uid);
			that._setStatusDataTransferForm(uid, "sending option(" + hash["option_id"] + ") hash", true);
			CAIRS.MAP.API.update({
				resource: "/forms/" + form_id + "/pages/" + page_id + "/fields/" + field_id + "/options/" + hash["option_id"],
				format: "json",
				payload: "agency_id=" + that.configuration[that._getRawUID(uid)].agency_id + "&hash=" + JSON.stringify(hash),
				/**
				 * Description
				 * @method onSuccess
				 * @param {} request
				 * @return
				 */
				onSuccess: function (request) {
					var json = JSON.parse( request.response );
	
					if (json.status == "success") {
						that._setStatusDataTransferForm(uid, "option(" + hash["option_id"] + ") saved");
						for (fieldname in hash)
							if (hash.hasOwnProperty(fieldname))
								if (fieldname == "type") {
									that._getFieldOption(uid, that.selected_page[uid], field_id, hash["option_id"])[fieldname] = that._convertLibraryFieldTypetoDhtmlxType(hash[fieldname]);
									try {
										that.grid_field_propertie_options[uid].cells(option_id, that.grid_field_propertie_options[uid].getColIndexById(fieldname)).setValue(hash[fieldname]);
									}
									catch (e) {
										//console.log("column "+fieldname+" not found");
									}
								}
								else {
									that._getFieldOption(uid, that.selected_page[uid], field_id, hash["option_id"])[fieldname] = hash[fieldname];
									try {
										that.grid_field_propertie_options[uid].cells(option_id, that.grid_field_propertie_options[uid].getColIndexById(fieldname)).setValue(hash[fieldname]);
									}
									catch (e) {
										//console.log("column "+fieldname+" not found");
									}
								}
	
						if (ftype == "checkbox" || ftype == "radio" || ftype == "combo" || ftype == "multiselect" || ftype == "select")
							that._getFieldOption(uid, that.selected_page[uid], field_id, hash["option_id"])["value"] = hash["text"];
						else
							that._getFieldOption(uid, that.selected_page[uid], field_id, hash["option_id"])["value"] = hash["value"];
	
						//console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
						//console.log(field_id);
						//console.log(hash[ "option_id" ]);
						//console.log(  that._getFieldOption( uid, that.selected_page[ uid ], field_id, hash[ "option_id" ] )  );// option_id
						that.preview._startPreview(uid);
						that.progressOffForm(uid);
						if (callBack) callBack(hash["option_id"]);
					}
					else {
						dhtmlx.message({
							type: "error",
							text: "option don't updated. reason: " + json.response
						});
						that._setStatusDataTransferForm(uid, "option don't updated");
						if (json.response == "token not authorized")
							that._setStatusUserForm(uid, "token expired. Please login again", false);
						that.progressOffForm(uid);
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
					that._setStatusDataTransferForm(uid, "option don't updated");
					if (json.response == "token not authorized")
						that._setStatusUserForm(uid, "token expired. Please login again", false);
					that.progressOffForm(uid);
				}
			});
	
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
			var that  = FormBuilder,
				uid = pageConfiguration.uid,
				pagename = pageConfiguration.pagename || "",
				page_id = pageConfiguration.page_id || null,
				page_layout = pageConfiguration.page_layout || "S",
				tab_width = pageConfiguration.tab_width || "100";
			that._setStatusDataTransferForm(uid, "posting page hash", true);
			if (page_id != null) {
				form_id = that.form_properties[uid].getItemValue("form_id");
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
						var json = JSON.parse( request.response );
						if (json.status == "success") {
							//dhtmlx.message( {type : "error", text : json.response} );
							that._setStatusDataTransferForm(uid, "page hash saved");
							// --- client
							// update page properties
							for (var property in pageConfiguration) {
								if (pageConfiguration.hasOwnProperty(property)) {
									var colIndex = that.grid_pages[uid].getColIndexById(property);
									if (CAIRS.isNumber(colIndex)) {
										if (colIndex >= 0) {
											if (property == "pagename") {
												that._getPageOnModel(uid, page_id)["label"] = pageConfiguration[property];
												that._getPageOnModel(uid, page_id)[property] = pageConfiguration[property];
											}
											else if (property == "list" || property == "options") {
												//console.log("-------------->>>> entered on " + property);
											}
											else {
												that._getPageOnModel(uid, page_id)[property] = pageConfiguration[property];
											}
											that.grid_pages[uid].cells(page_id, colIndex).setValue(pageConfiguration[property]);
										}
									}
								}
							}
							// update page properties
	
							// get all fields of the page
							var fieldsList = [];
							that._getPageColumnList(uid, page_id, "first").forEach(function (field, index, array) {
								fieldsList.push(field);
							});
							if (typeof that._getPageColumnList(uid, page_id, "second") !== 'undefined') {
								that._getPageColumnList(uid, page_id, "second").forEach(function (field, index, array) {
									fieldsList.push(field);
								});
							}
							// get all fields of the page
							
							//console.log("-------------->>>> fieldsList");
							//console.log(fieldsList);
	
							if (page_layout == "S") {
								that._getPageOnModel(uid, page_id).list = [];
								that._getPageOnModel(uid, page_id).list = [{
									type: 'block',
									inputWidth: 'auto',
									inputHeight: 'auto',
									name: "column_1",
									list: fieldsList
								}];
							}
							else {
								that._getPageOnModel(uid, page_id).list = [];
								
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
	
								
								
								
								
								that._getPageOnModel(uid, page_id).list.push( column_1 );
								that._getPageOnModel(uid, page_id).list.push( {
									type: "newcolumn",
									offset: 10
								} );
								that._getPageOnModel(uid, page_id).list.push( column_2 );
								
								
								//that._getPageOnModel(uid, page_id).list = [];
	
								// restart count added fields
								/*that.totalAddedFields[page_id] = 0;
	
								fieldsList.forEach(function (field, index, array) {
									that._putFieldOnMemory(uid, that.selected_page[uid], field, function () {
										that.preview._startPreview(uid);
									}, true);
								});*/
								//console.log( fieldsList );
							}
							//console.log( that._getPageOnModel( uid, page_id) );
							if (callBack) callBack();
							// --- client
	
							that.progressOffForm(uid);
						}
						else {
							dhtmlx.message({
								type: "error",
								text: "Page don't saved. reason: " + json.response
							});
							that._setStatusDataTransferForm(uid, "unable to save page");
							if (json.response == "token not authorized")
								that._setStatusUserForm(uid, "token expired. Please login again", false);
							that.progressOffForm(uid);
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
							text: "Page don't saved. reason: " + json.response
						});
						that._setStatusDataTransferForm(uid, "unable to save page");
						if (json.response == "token not authorized")
							that._setStatusUserForm(uid, "token expired. Please login again", false);
						that.progressOffForm(uid);
					}
				});
			}
	
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
			var that  = FormBuilder,
				objFilter = {},
				objOrder = objOrder || {};
	
			that.grid[uid].clearAll();
			that.toolbar[uid].disableItem("new_form");
			that.toolbar[uid].disableItem("delete_form");
			that.toolbar[uid].disableItem("form_builder");
			that.toolbar[uid].disableItem("view_entries");
	
			if (document.querySelector("#input_search_formlabel").value != "")
				objFilter["formlabel"] = document.querySelector("#input_search_formlabel").value;
	
			//if( document.querySelector("#input_search_formname").value != "" )
			//	objFilter[ "formname" ] = document.querySelector("#input_search_formname").value;
	
			//if( document.querySelector("#input_search_formtext").value != "" )
			//	objFilter[ "formtext" ] = document.querySelector("#input_search_formtext").value;
	
			var gridURL = CAIRS.MAP.API.getMappedURL({
				resource: "/dhtmlx/grid/feed", // mandatory
				responseType: "json", // not mandatory, default json
				params: "table_name=formmaker_properties&primary_key=form_id&columns=" + that.model.conf_grid.ids + "&filter=" + JSON.stringify(objFilter) + "&order=" + JSON.stringify(objOrder) // mandatory for this API End Point ( /dhtmlx/grid/feed.json )
			});
	
			that._setStatusDataTransfer("requesting collection of forms", true);
			that.grid[uid].load(gridURL, function () {
				that._setStatusDataTransfer("collection of forms is available");
				that.progressOff(uid);
				that.toolbar[uid].enableItem("new_form");
			}, "json");
		}
		
		,/**
		 * Description
		 * @method _feedGrid_group_fields
		 * @param {} uid
		 * @return
		 */
		_feedGrid_group_fields: function (uid) {
			var that  = FormBuilder;
			
			//console.log("that.data._feedGrid_group_fields:");
			
			that.grid_group_fields[uid].clearAll();
			var gridURL = CAIRS.MAP.API.getMappedURL({
				resource: "/LibraryFields/groups", // mandatory
				responseType: "json", // not mandatory, default json
				params: "columns=" + that.model.conf_grid_group_fields.ids + "" // not mandatory, default none
			});
			that.grid_group_fields[uid].load(gridURL, function () {
	
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
			
			//console.log("that.data._feedGrid_form_fieldsNormalize:");
			
			var that  = FormBuilder;
	
			that.grid_form_fields[uid].clearAll();
	
			that.pages[uid][page_id].list[0].list.sort(function (a, b) {
				return a.index - b.index;
			});
	
			for (var x = 0; x < that.pages[uid][page_id].list[0].list.length; x++) {
				var field = that.pages[uid][page_id].list[0].list[x];
				that.pages[uid][page_id].list[0].list[x].index = x;
				that.pages[uid][page_id].list[0].list[x].data[13] = x;
				that.grid_form_fields[uid].addRow(field.field_id, that.pages[uid][page_id].list[0].list[x].data, x);
			}
	
			if (that.pages[uid][page_id].page_layout == "D")
			{
				//console.log( that.pages[uid][page_id].list[2].list );
				
				that.pages[uid][page_id].list[2].list.sort(function (a, b) {
					return a.index - b.index;
				});
				
				for (var x = 0; x < that.pages[uid][page_id].list[2].list.length; x++) {
					var field = that.pages[uid][page_id].list[2].list[x];
					that.pages[uid][page_id].list[2].list[x].index = x;
					that.pages[uid][page_id].list[2].list[x].data[13] = x;
					that.grid_form_fields[uid].addRow(field.field_id, field.data, x);
				}
				
				
				//console.log( that.pages[uid][page_id].list[2].list );
			}
	
			that.data._reOrderPageFields(uid);
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
			var that  = FormBuilder, fieldsList = [];
	
			that.grid_form_fields[uid].clearAll();
			
			that.pages[uid][page_id].list[0].list.sort(function (a, b) {
				return a.index - b.index;
	
			});
	
			for (var x = 0; x < that.pages[uid][page_id].list[0].list.length; x++) {
				var field = that.pages[uid][page_id].list[0].list[x];
				that.pages[uid][page_id].list[0].list[x].data[that.grid_form_fields[uid].getColIndexById("index")] = field.index;
				that.pages[uid][page_id].list[0].list[x].data[that.grid_form_fields[uid].getColIndexById("mask_to_use")] = field.mask_to_use;
				that.pages[uid][page_id].list[0].list[x].data[that.grid_form_fields[uid].getColIndexById("validate")] = field.validate;
				that.pages[uid][page_id].list[0].list[x].data[that.grid_form_fields[uid].getColIndexById("library_field_id")] = field.library_field_id;
				that.pages[uid][page_id].list[0].list[x].data[that.grid_form_fields[uid].getColIndexById("use_library")] = "" + field.use_library + "";
	
				fieldsList.push(field);
			}
	
			if (that.pages[uid][page_id].page_layout == "D") {
				that.pages[uid][page_id].list[2].list.sort(function (a, b) {
					return a.index - b.index;
				});
				for (var x = 0; x < that.pages[uid][page_id].list[2].list.length; x++) {
					var field = that.pages[uid][page_id].list[2].list[x];
					that.pages[uid][page_id].list[2].list[x].data[that.grid_form_fields[uid].getColIndexById("index")] = field.index;
					that.pages[uid][page_id].list[2].list[x].data[that.grid_form_fields[uid].getColIndexById("mask_to_use")] = field.mask_to_use;
					that.pages[uid][page_id].list[2].list[x].data[that.grid_form_fields[uid].getColIndexById("validate")] = field.validate;
					that.pages[uid][page_id].list[2].list[x].data[that.grid_form_fields[uid].getColIndexById("library_field_id")] = field.library_field_id;
					that.pages[uid][page_id].list[2].list[x].data[that.grid_form_fields[uid].getColIndexById("use_library")] = "" + field.use_library + "";
					fieldsList.push(field);
				}
			}
			
			fieldsList.sort(function (a, b) {
				return a.index - b.index;
	
			});
			
			for(var x = 0; x < fieldsList.length; x++)
			{
				var field = fieldsList[ x ];
				that.grid_form_fields[uid].addRow(field.field_id, field.data, field.index);
				//console.log("row "+field.field_id+" added index: " + field.index + " on array: " +field.data[13]);
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
			var that  = FormBuilder;
	
			//console.log( field_id );
	
			that.grid_field_propertie_options[uid].clearAll();
	
			that._getPageColumnList(uid, page_id, "first").forEach(function (parentField, index, array) {
				if (that._getPageColumnList(uid, page_id, "first")[index].list)
					that._getPageColumnList(uid, page_id, "first")[index].list.sort(function (a, b) {
						return a.index - b.index;
					});
				if (that._getPageColumnList(uid, page_id, "first")[index].options)
					that._getPageColumnList(uid, page_id, "first")[index].options.sort(function (a, b) {
						return a.index - b.index;
					});
			});
	
			if (that.pages[uid][page_id].page_layout == "D") {
				that._getPageColumnList(uid, page_id, "second").forEach(function (parentField, index, array) {
					if (that._getPageColumnList(uid, page_id, "second")[index].list)
						that._getPageColumnList(uid, page_id, "second")[index].list.sort(function (a, b) {
							return a.index - b.index;
						});
					if (that._getPageColumnList(uid, page_id, "second")[index].options)
						that._getPageColumnList(uid, page_id, "second")[index].options.sort(function (a, b) {
							return a.index - b.index;
						});
				});
			}
	
			// iterates over fields of the page on column 1
			that._getPageColumnList(uid, page_id, "first").forEach(function (parentField, parentIndex, array) {
				// return only options of selected field of form
				if (parentField.field_id == field_id) {
					//console.log( "parentField.field_id " + parentField.field_id );
					//console.log( parentField );
	
					if (parentField.type == "label" || parentField.type == "fieldset" || parentField.type == "radio" || parentField.type == "checkbox") { // lets read the list property of the field
						//console.log("reading list array");
						// field list
						/* for nested group fields and radio matrix */
						that._getPageColumnList(uid, page_id, "first")[parentIndex].list.forEach(function (childField, childIndex, array) {
							var field = childField;
							//console.log( "childField.field_id " + field.field_id );
							//console.log(  that._getPageColumnList( uid, page_id, "first" )[parentIndex] );
							//console.log( that._getPageColumnList( uid, page_id, "first" )[parentIndex].list[childIndex] );
	
							//console.log( that._getPageColumnList( uid, page_id, "first" )[parentIndex].list[childIndex].data );
							//console.log( field.index );
	
							//that._getPageColumnList( uid, page_id, "first" )[parentIndex].data[13] = field.index;
	
							//console.log( "field.data[13] " + that._getPageColumnList( uid, page_id, "first" )[parentIndex].data[13] );
							//console.log( "field.data " + that._getPageColumnList( uid, page_id, "first" )[parentIndex].list[childIndex].data );
							if (that._getPageColumnList(uid, page_id, "first")[parentIndex].list[childIndex].type != "settings")
								that.grid_field_propertie_options[uid].addRow(field.option_id, that._getPageColumnList(uid, page_id, "first")[parentIndex].list[childIndex].data, field.index);
						});
					}
					else if (parentField.type == "multiselect" || parentField.type == "combo" || parentField.type == "select") { // lets read the options property
						//console.log("reading options array");
						// field options
						/* combo and Multiselect */
						that._getPageColumnList(uid, page_id, "first")[parentIndex].options.forEach(function (childField, childIndex, array) {
							var field = childField;
							if (that._getPageColumnList(uid, page_id, "first")[parentIndex].options[childIndex].type != "settings")
								that.grid_field_propertie_options[uid].addRow(field.option_id, that._getPageColumnList(uid, page_id, "first")[parentIndex].options[childIndex].data, field.index);
						});
					}
				}
			});
	
			// if this page has 2 columns
			if (that.pages[uid][page_id].page_layout == "D") {
				// iterates over fields of the page on column 2
				that._getPageColumnList(uid, page_id, "second").forEach(function (parentField, parentIndex, array) {
					// return only options of selected field of form
					if (parentField.field_id == field_id) {
						//console.log( "parentField.field_id " + parentField.field_id );
						//console.log( parentField );
						if (parentField.type == "label" || parentField.type == "fieldset" || parentField.type == "radio" || parentField.type == "checkbox") { // lets read the list property of the field
							//console.log("reading list array");
							// field list
							/* for nested group fields and radio matrix */
							that._getPageColumnList(uid, page_id, "second")[parentIndex].list.forEach(function (childField, childIndex, array) {
								var field = childField;
								//console.log( that._getPageColumnList( uid, page_id, "second" )[parentIndex].list );
								//console.log( that._getPageColumnList( uid, page_id, "second" )[parentIndex].list[childIndex].type == "settings" );
								//console.log( that._getPageColumnList( uid, page_id, "second" )[parentIndex].list[childIndex].data );
								if (that._getPageColumnList(uid, page_id, "second")[parentIndex].list[childIndex].type != "settings")
									that.grid_field_propertie_options[uid].addRow(field.option_id, that._getPageColumnList(uid, page_id, "second")[parentIndex].list[childIndex].data, field.index);
							});
						}
						else if (parentField.type == "multiselect" || parentField.type == "combo" || parentField.type == "select") { // lets read the options property
							//console.log("reading options array");
							// field options
							/* combo and Multiselect */
							that._getPageColumnList(uid, page_id, "second")[parentIndex].options.forEach(function (childField, childIndex, array) {
								var field = childField;
								if (that._getPageColumnList(uid, page_id, "second")[parentIndex].options[childIndex].type != "settings")
									that.grid_field_propertie_options[uid].addRow(field.option_id, that._getPageColumnList(uid, page_id, "second")[parentIndex].options[childIndex].data, field.index);
							});
						}
					}
				});
			}
	
		}
		
		
		,
		/**
		 * Description
		 * @method _generateMetaData
		 * @param {} uid
		 * @param {} objOrder
		 * @return
		 */
		_generateMetaData: function (uid, form_id, payload) {
			var that  = FormBuilder;
			
			CAIRS.MAP.API.update({
				resource: "/forms/" + form_id + "/metadata" // mandatory
				,
				format: "json" // json, yaml, xml. Default: json. Not mandatory
				,
				payload: payload //  // mandatory for PUT and POST
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
					
					CAIRS.dhtmlx.formFields[uid + "_form_preview"].forEach(function (field, index, array) {
						if (field.type == "upload") {
							if( field.option_id ) // if this field is child field
							{
								that._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["swfUrl"] = swfUrl;//swfUrl
								that._getFieldOption(uid, field.page_id, field.field_id, field.option_id)["url"] = url;//swfUrl
							}
							else
							{
								that.metaparser._getPageField(uid, field.page_id, field.field_id)["swfUrl"] = swfUrl;
								that.metaparser._getPageField(uid, field.page_id, field.field_id)["url"] = url;
							}
						}// bug stringify
					});
					
		
					that.progressOffForm(uid);
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
					that.progressOffForm(uid);
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
			var that  = FormBuilder;
			that._setStatusDataTransfer("requesting forms list", true);
			CAIRS.MAP.API.get({
				resource: "/forms",
				format: "json",
				payload: "agency_id=" + that.configuration[uid].agency_id + "",
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
						that._setStatusDataTransfer("forms list received");
	
					}
					else {
						dhtmlx.message({
							type: "error",
							text: json.response
						});
						that._setStatusDataTransfer("unable to read forms list");
						if (json.response == "token not authorized")
							that._setStatusUserForm(uid, "token expired. Please login again", false);
					}
				},
				/**
				 * Description
				 * @method onFail
				 * @param {} request
				 * @return
				 */
				onFail: function (request) {
	
					var json = JSON.parse( request.response );
					dhtmlx.message({
						type: "error",
						text: json.response
					});
					that._setStatusDataTransfer("unable to read forms list");
					if (json.response == "token not authorized")
						that._setStatusUserForm(uid, "token expired. Please login again", false);
	
					//that.progressOffForm( uid );
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
			var that  = FormBuilder;
	
			var dataStores = [
	
				function (callBack) {
					CAIRS.MAP.API.get({
						resource: "/agency/" + that.configuration[uid].agency_id + "" // mandatory
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
							var json = JSON.parse( request.response );
							if (json.status == "success") {
								that.data_store[uid]["agency_data"] = json.hash;
	
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
							var json = JSON.parse( request.response );
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
							var json = JSON.parse( request.response );
							if (json.status == "success") {
								that.data_store[uid]["agencies"] = json.agencies;
	
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
							var json = JSON.parse( request.response );
							dhtmlx.message({
								type: "error",
								text: json.response
							});
	
						}
					});
				},
				function (callBack) {
					CAIRS.MAP.API.get({
						resource: "/agency/" + that.configuration[uid].agency_id + "/caseworkers" // mandatory
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
							var json = JSON.parse( request.response );
							if (json.status == "success") {
								that.data_store[uid]["caseworkers_names"] = [];
								json.caseworkers.forEach(function (caseworker, index, array_) {
									that.data_store[uid]["caseworkers_names"].push({
										value: caseworker.user_id,
										text: caseworker.first_name + " " + caseworker.last_name
									});
								});
	
								//that.data_store[ uid ][ "caseworkers_names" ] = json.caseworkers;
	
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
							var json = JSON.parse( request.response );
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
		 * @method _reOrderPages
		 * @param {} uid
		 * @return
		 */
		_reOrderPages: function (uid) {
			var that  = FormBuilder,
				form_id = that.form_properties[uid].getItemValue("form_id"),
				hash = null;
	
			that.progressOnForm(uid);
	
			var orderingArray = [];
			that.grid_pages[uid].forEachRow(function (rID) {
				//that.grid_pages[ uid ].cells(rID, that.grid_pages[ uid ].getColIndexById( "index" )).setValue( that.grid_pages[ uid ].getRowIndex( rID ) );
				//that._getPageOnModel( uid, rID)[ "index" ] = that.grid_pages[ uid ].getRowIndex( rID );
				var objOrdering = {};
				objOrdering["item_id"] = rID;
				objOrdering["index"] = that.grid_pages[uid].getRowIndex(rID);
				orderingArray.push(objOrdering);
			});
	
			hash = {
				ordering_column_name: "index",
				data: orderingArray
			};
	
			if (orderingArray.length >= 0) {
				that._setStatusDataTransferForm(uid, "ordering " + orderingArray.length + " pages", true);
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
						var json = JSON.parse( request.response );
						if (json.status == "success") {
							//dhtmlx.message( {type : "error", text : json.response} );
							that._setStatusDataTransferForm(uid, "" + orderingArray.length + " pages ordered");
	
							that.grid_pages[uid].forEachRow(function (rID) {
								that.grid_pages[uid].cells(rID, that.grid_pages[uid].getColIndexById("index")).setValue(that.grid_pages[uid].getRowIndex(rID));
								that._getPageOnModel(uid, rID)["index"] = that.grid_pages[uid].getRowIndex(rID);
							});
	
							that.progressOffForm(uid);
						}
						else {
	
							dhtmlx.message({
								type: "error",
								text: "Pages wasn't ordered. reason: " + json.response
							});
							that._setStatusDataTransferForm(uid, "pages wasn't ordered");
							if (json.response == "token not authorized")
								that._setStatusUserForm(uid, "token expired. Please login again", false);
							that.progressOffForm(uid);
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
							text: "Pages wasn't ordered. reason: " + json.response
						});
						that._setStatusDataTransferForm(uid, "pages wasn't ordered");
						if (json.response == "token not authorized")
							that._setStatusUserForm(uid, "token expired. Please login again", false);
						that.progressOffForm(uid);
					}
				});
			}
		}
		


		,
		/**
		 * Description
		 * @method _reOrderPageFields
		 * @param {} uid
		 * @return
		 */
		_reOrderPageFields: function (uid) {
			
			//console.log("that.data._reOrderPageFields:");
			
			var that  = FormBuilder,
				hash = null,
				form_id = that.form_properties[uid].getItemValue("form_id"),
				page_id = that.grid_pages[uid].getSelectedRowId(),
				page_layout = that.grid_pages[uid].cells(page_id, that.grid_pages[uid].getColIndexById("page_layout")).getValue();
	
			var orderingArray = []
			that.grid_form_fields[uid].forEachRow(function (rID) {
				var objOrdering = {};
				objOrdering["item_id"] = rID;
				objOrdering["index"] = that.grid_form_fields[uid].getRowIndex(rID);
				orderingArray.push(objOrdering);
				
				//console.log("reordering row "+rID+" index on grid: " + that.grid_form_fields[uid].getRowIndex(rID));
			});
	
			hash = {
				ordering_column_name: "index",
				data: orderingArray
			};
			
			
	
			if (orderingArray.length >= 0) {
				that._setStatusDataTransferForm(uid, "ordering " + orderingArray.length + " fields", true);
				that.progressOnForm(uid);
	
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
						var json = JSON.parse( request.response );
						if (json.status == "success") {
							//dhtmlx.message( {type : "error", text : json.response} );
							that._setStatusDataTransferForm(uid, "" + orderingArray.length + " fields ordered");
	
							that.grid_form_fields[uid].forEachRow(function (rID) {
								var nnindex = that.grid_form_fields[uid].getRowIndex(rID);
								//console.log( nnindex );
								//console.log( that.metaparser._getPageField( uid, that.selected_page[ uid ], rID ).data[13] );
								that.grid_form_fields[uid].cells(rID, that.grid_form_fields[uid].getColIndexById("index")).setValue(nnindex);
								//console.log(that.metaparser._getPageField( uid, that.selected_page[ uid ], rID ));
								//console.log("current field index: " + that.metaparser._getPageField( uid, that.selected_page[ uid ], rID ).index);
								that.metaparser._getPageField(uid, that.selected_page[uid], rID).index = nnindex;
								that.metaparser._getPageField(uid, that.selected_page[uid], rID).data[13] = nnindex;
								//console.log("new field index: " + that.metaparser._getPageField( uid, that.selected_page[ uid ], rID ).index);
								//console.log( that.metaparser._getPageField( uid, that.selected_page[ uid ], rID ) );
							});
							
							// get all fields of the page
							var fieldsList = [];
							that._getPageColumnList(uid, page_id, "first").forEach(function (field, index, array) {
								fieldsList.push(field);
								//console.log( field );
							});
							if (typeof that._getPageColumnList(uid, page_id, "second") !== 'undefined') {
								that._getPageColumnList(uid, page_id, "second").forEach(function (field, index, array) {
									fieldsList.push(field);
									//console.log( field );
								});
							}
							// get all fields of the page
							
							//console.log("-------------->>>> fieldsList");
							//console.log(fieldsList);
	
							if (page_layout == "S") {
								that._getPageOnModel(uid, page_id).list = [];
								that._getPageOnModel(uid, page_id).list = [{
									type: 'block',
									inputWidth: 'auto',
									inputHeight: 'auto',
									name: "column_1",
									list: fieldsList
								}];
							}
							else {
								that._getPageOnModel(uid, page_id).list = [];
								
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
	
								
								
								
								
								that._getPageOnModel(uid, page_id).list.push( column_1 );
								that._getPageOnModel(uid, page_id).list.push( {
									type: "newcolumn",
									offset: 10
								} );
								that._getPageOnModel(uid, page_id).list.push( column_2 );
								
								
								that.data._feedGrid_form_fields(uid, page_id);
								
								
								//that._getPageOnModel(uid, page_id).list = [];
	
								// restart count added fields
								/*that.totalAddedFields[page_id] = 0;
	
								fieldsList.forEach(function (field, index, array) {
									that._putFieldOnMemory(uid, that.selected_page[uid], field, function () {
										that.preview._startPreview(uid);
									}, true);
								});*/
								//console.log( fieldsList );
							}
	
							that.progressOffForm(uid);
						}
						else {
							dhtmlx.message({
								type: "error",
								text: "fields wasn't ordered. reason: " + json.response
							});
							that._setStatusDataTransferForm(uid, "fields wasn't ordered");
							if (json.response == "token not authorized")
								that._setStatusUserForm(uid, "token expired. Please login again", false);
							that.progressOffForm(uid);
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
							text: "fields wasn't ordered. reason: " + json.response
						});
						that._setStatusDataTransferForm(uid, "fields wasn't ordered");
						if (json.response == "token not authorized")
							that._setStatusUserForm(uid, "token expired. Please login again", false);
						that.progressOffForm(uid);
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
			var that  = FormBuilder,
				hash = null;
	
			var orderingArray = []
			that.grid_field_propertie_options[uid].forEachRow(function (rID) {
				var objOrdering = {};
				objOrdering["item_id"] = rID;
				objOrdering["index"] = that.grid_field_propertie_options[uid].getRowIndex(rID);
				orderingArray.push(objOrdering);
			});
	
			hash = {
				ordering_column_name: "index",
				data: orderingArray
			};
	
			if (orderingArray.length >= 0) {
				that._setStatusDataTransferForm(uid, "ordering " + orderingArray.length + " options", true);
				that.progressOnForm(uid);
				var form_id = that.form_properties[uid].getItemValue("form_id");
				var page_id = that.grid_pages[uid].getSelectedRowId();
				var field_id = that.grid_form_fields[uid].getSelectedRowId();
	
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
						var json = JSON.parse( request.response );
						if (json.status == "success") {
							//dhtmlx.message( {type : "error", text : json.response} );
							that._setStatusDataTransferForm(uid, "" + orderingArray.length + " options ordered");
	
							that.grid_field_propertie_options[uid].forEachRow(function (rID) {
								var nnindex = that.grid_field_propertie_options[uid].getRowIndex(rID);
								that.grid_field_propertie_options[uid].cells(rID, that.grid_field_propertie_options[uid].getColIndexById("index")).setValue(nnindex);
								//console.log(  that._getFieldOption( uid, that.selected_page[ uid ], that.grid_form_fields[ uid ].getSelectedRowId(), rID )  );
								that._getFieldOption(uid, that.selected_page[uid], that.grid_form_fields[uid].getSelectedRowId(), rID).data[that.grid_field_propertie_options[uid].getColIndexById("index")] = nnindex;
								that._getFieldOption(uid, that.selected_page[uid], that.grid_form_fields[uid].getSelectedRowId(), rID).index = nnindex;
							});
							that.progressOffForm(uid);
						}
						else {
							dhtmlx.message({
								type: "error",
								text: "fields wasn't ordered. reason: " + json.response
							});
							that._setStatusDataTransferForm(uid, "fields wasn't ordered");
							if (json.response == "token not authorized")
								that._setStatusUserForm(uid, "token expired. Please login again", false);
							that.progressOffForm(uid);
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
							text: "fields wasn't ordered. reason: " + json.response
						});
						that._setStatusDataTransferForm(uid, "fields wasn't ordered");
						if (json.response == "token not authorized")
							that._setStatusUserForm(uid, "token expired. Please login again", false);
						that.progressOffForm(uid);
					}
				});
			}
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
			var that  = FormBuilder;
	
			that._setStatusDataTransfer("loading categories");
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
						var json = JSON.parse( request.response );
						if (json.status == "success") {
							that.data_store[that._getRawUID(uid)]["category"] = json.category;
							for (var x = 0; x < json.category.length; x++) {
								var category = json.category[x];
								if (category.SearchCriteria != "8_Field Group" && category.SearchCriteria != "9_Field Tags") {
									that.model.conf_tree_form_library_field_category.item[0].item.push({
										id: category.CategoryID,
										text: category.Description
									});
								}
							}
							that._setStatusDataTransfer("category 100% loaded");
						}
						else {
	
							dhtmlx.message({
								type: "error",
								text: json.response
							});
							that.status_bar[uid].setText(json.response);
							that.data_store[uid]["category"] = [];
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
						that._setStatusError("unable to reach resource");
					}
					else {
						dhtmlx.message({
							type: "error",
							text: "fatal error on server side"
						});
						that._setStatusError("error 500");
					}
					that._setStatus("Application could not start");
					that.data_store[uid]["category"] = [];
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
						var json = JSON.parse( request.response );
	
						if (json.status == "success") {
							that.data_store[that._getRawUID(uid)]["subcategory"] = json.subcategory;
							for (var x = 0; x < json.subcategory.length; x++) {
								var subcategory = json.subcategory[x];
								that._putSubCategoryOnTree(uid, subcategory.ParentId, {
									id: subcategory.SearchCriteria,
									text: subcategory.Description
								})
							}
							that._setStatusDataTransfer("subcategory 100% loaded");
	
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
							that.status_bar[uid].setText(json.response);
							that.data_store[uid]["subcategory"] = [];
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
						that._setStatusError("unable to reach resource");
					}
					else {
						dhtmlx.message({
							type: "error",
							text: "fatal error on server side"
						});
						that._setStatusError("error 500");
					}
					that._setStatus("Application could not start");
					that.data_store[uid]["subcategory"] = [];
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
			var that  = FormBuilder;
	
			that._setStatusDataTransfer("loading tags");
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
						var json = JSON.parse( request.response );
						if (json.status == "success") {
							var rest = json.rows.length % 2;
							var rounded = json.rows.length - rest;
							var middle = rounded / 2;
	
							//console.log( that._getRawUID( uid ) );
							//console.log( that.data_store );
	
							//uid = parseInt( uid.split("_")[  uid.split("_").length -1 ] );
	
							that.data_store[that._getRawUID(uid)]["tags"] = json.rows;
							for (var x = 0; x < json.rows.length; x++) {
								var row = json.rows[x];
								that.model.conf_form_tags.template.push({
									type: "checkbox",
									name: row.data[0],
									label: row.data[0],
									value: row.data[0],
									tooltip: ""
								});
								if (x == middle) {
									that.model.conf_form_tags.template.push({
										type: "newcolumn"
									});
								}
							}
							if (callBack) {
								callBack();
							}
							that._setStatusDataTransfer("tags 100% loaded");
						}
						else {
							dhtmlx.message({
								type: "error",
								text: json.response
							});
							that.status_bar[uid].setText(json.response);
							that.data_store[uid.split("_")[uid.split("_").length - 1]]["tags"] = [];
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
						that._setStatusError("unable to reach resource");
					}
					else {
						dhtmlx.message({
							type: "error",
							text: "fatal error on server side"
						});
						that._setStatusError("error 500");
					}
					that._setStatus("error getting tags");
					that.data_store[that._getRawUID(uid)]["tags"] = [];
				}
			});
	
		}
		
		
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
			var that  = FormBuilder,
				form_id = that.form_properties[uid].getItemValue("form_id");
	
			that.progressOnForm(uid);
	
			//console.log("fieldJSON -----------------" );
			//console.log( fieldJSON );
	
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
			
			
			if (typeof fieldJSON["rule_action"] === 'undefined') {
				fieldJSON["rule_action"] = "show";
			}
			
			if (typeof fieldJSON["rule_match"] === 'undefined') {
				fieldJSON["rule_match"] = "all";
			}
			
			if (typeof fieldJSON["rule_enable"] === 'undefined') {
				fieldJSON["rule_enable"] = "0";
			}
			/*
			rule_action: "show",
			rule_match: "all",
			rule_enable: "0"
			
			*/
	
			if (fieldJSON["type"] == 'fieldset') {
				if (that.pages[uid][page_id].page_layout == "S") {
					fieldJSON["width"] = ((that.form_default_width - 50) );
				}
				else {
					fieldJSON["width"] = ((that.form_default_width - 50) / 2);
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
			
			else if (fieldJSON["type"] == 'container')
			{
				if (that.pages[uid][page_id].page_layout == "S") {
					fieldJSON["inputWidth"] = 200;
					fieldJSON["inputHeight"] = 100;
				}
				else {
					fieldJSON["inputWidth"] = 200;
					fieldJSON["inputHeight"] = 100;
				}
			}
	
			else if (fieldJSON["type"] == 'calendar') {
				if( CAIRS.isValidDate( fieldJSON["value"] ) !== true )
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
							 
				fieldJSON["autoStart"] = true;
				fieldJSON["swfPath"] = that.dhtmlx_codebase_path + "codebase/ext/uploader.swf";
				fieldJSON["swfUrl"] = url;
				if (that.pages[uid][page_id].page_layout == "S") {
					fieldJSON["inputWidth"] = ((that.form_default_width - 50) );
				}
				else {
					fieldJSON["inputWidth"] = ((that.form_default_width - 50) / 2);
				}
			}
			else {
				fieldJSON["list"] = [];
				fieldJSON["options"] = [];
			}
			
			if (fieldJSON["type_standard"] == 'e') {
				delete fieldJSON["label"];
				fieldJSON["inputWidth"] = 200;
				fieldJSON["inputHeight"] = 20;
			}
			
			
			// put on memory only
			if (putOnClientOnly)
			{
				//console.log("putOnClientOnly")
				//console.log( fieldJSON["type_standard"] );
				fieldJSON["type"] = that._convertLibraryFieldTypetoDhtmlxType(fieldJSON["type_standard"]);

	
				//console.log(fieldJSON);
				
				// if textarea, set textarea style
				if (fieldJSON["type_standard"] == "A")
				{
					fieldJSON["rows"] = 4;
					fieldJSON["style"] = "width:190px;";
				}
	
				if (typeof that.totalAddedFields[page_id] === 'undefined') {
					that.totalAddedFields[page_id] = 1;
				}
	
				if (that.pages[uid][page_id].page_layout == "S") {
					that._getPageColumnList(uid, page_id, "first").push(fieldJSON);
				}
				else if (that.pages[uid][page_id].page_layout == "D") {
	
					if ((that.totalAddedFields[page_id] % 2) == 0) {
						that._getPageColumnList(uid, page_id, "second").push(fieldJSON);
					}
					else {
						that._getPageColumnList(uid, page_id, "first").push(fieldJSON);
					}
					that.totalAddedFields[page_id] = that.totalAddedFields[page_id] + 1;
				}
				
				/* components */
				/*if (fieldJSON["type_standard"] == "PhB") {
					that.phone_wrapper._prepareContainerForComponent( uid, fieldJSON, page_id, function()
					{

					} );
				}*/
	
				//console.log( "--------------------------------------------------------------" );
				//console.log( fieldJSON );
				//that.preview._startPreview( uid );
	
				if (callBack) callBack(fieldJSON["field_id"]);
			}
			// put on memory AND database
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
				that._setStatusDataTransferForm(uid, "sending field hash", true);
				CAIRS.MAP.API.insert({
					resource: "/forms/" + form_id + "/pages/" + page_id + "/fields" // mandatory
					,
					format: "json" // json, yaml, xml. Default: json. Not mandatory
					,
					
					payload: "agency_id=" + that.configuration[that._getRawUID(uid)].agency_id + "&hash=" + JSON.stringify(fieldJSON) // mandatory for PUT and POST
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
	
						if (json.status == "success") {
							try
							{
								//dhtmlx.message( {type : "error", text : 'fields readed'} );
								that._setStatusDataTransferForm(uid, "new field saved: " + json.field_id);
		
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
		
								if (typeof that.totalAddedFields[page_id] === 'undefined') {
									that.totalAddedFields[page_id] = 1;
								}
		
								if (that.pages[uid][page_id].page_layout == "S") {
									that._getPageColumnList(uid, page_id, "first").push(fieldJSON);
								}
								else if (that.pages[uid][page_id].page_layout == "D") {
		
									if ((that.totalAddedFields[page_id] % 2) == 0) {
										that._getPageColumnList(uid, page_id, "second").push(fieldJSON);
									}
									else {
										that._getPageColumnList(uid, page_id, "first").push(fieldJSON);
									}
									that.totalAddedFields[page_id] = that.totalAddedFields[page_id] + 1;
								}
		
								if (fieldJSON["type_standard"] == "Y" || fieldJSON["type_standard"] == "X" || fieldJSON["type_standard"] == "U" || fieldJSON["type_standard"] == "V") {
									// add the necessary child fields for rendering the signature component
									// {"field_id":"","option_id":"","type":"","type_standard":"","text_size":"","name":"","label":"","caption":"","tooltip":"","value":"","mask_to_use":"","className":""} 
									that.signature_wrapper._prepareFieldsForComponent( uid, json.field_id, fieldJSON["name"], callBack );
								}
								else if (fieldJSON["type_standard"] == "P")
								{
									var radio_group_name = fieldJSON["field_id"] + "_" + fieldJSON["name"] + "_payment_option_radio";
									var payment_option_radio1 = {
										"field_id": fieldJSON["field_id"],
										"option_id": null,
										"type": "R",
										"type_standard": "R",
										"text_size": 200,
										"name": radio_group_name,
										"label": "Cash/check",
										"text": "Cash/check",
										"caption": "",
										"tooltip": "",
										"value": "Cash/check",
										"mask_to_use": "",
										"className": ""
									};
									
									var payment_option_radio2 = {
										"field_id": fieldJSON["field_id"],
										"option_id": null,
										"type": "R",
										"type_standard": "R",
										"text_size": 200,
										"name": radio_group_name,
										"label": "Credit Card or Paypal",
										"text": "Credit Card or Paypal",
										"caption": "",
										"tooltip": "",
										"value": "Credit Card or Paypal",
										"mask_to_use": "",
										"className": ""
									};
									
									var payment_option_radio3 = {
										"field_id": fieldJSON["field_id"],
										"option_id": null,
										"type": "R",
										"type_standard": "R",
										"text_size": 200,
										"name": radio_group_name,
										"label": "ECheck",
										"text": "ECheck",
										"caption": "",
										"tooltip": "",
										"value": "ECheck",
										"mask_to_use": "",
										"className": ""
									};
									
									that.progressOnForm(uid);
									that._addOptionToField(uid, payment_option_radio1, function ()
									{
										that.progressOnForm(uid);
										that._addOptionToField(uid, payment_option_radio2, function ()
										{
											that.progressOnForm(uid);
											that._addOptionToField(uid, payment_option_radio3, function ()
											{
												that.progressOnForm(uid);
												if (callBack) callBack(fieldJSON["field_id"]);
												that.progressOffForm(uid);
											});
										});
									});
		
									//that.progressOffForm(uid);
		
								}
								/* components */
								else if (fieldJSON["type_standard"] == "PhB") {
									that.phone_wrapper._prepareContainerForComponent( uid, fieldJSON, page_id, function(){
										if (callBack) callBack(fieldJSON["field_id"]);
										that.progressOffForm(uid);
									} );
									
								}
								else if (fieldJSON["type_standard"] == "BG") {
									that.background_wrapper._prepareContainerForComponent( uid, fieldJSON, page_id, function(){
										if (callBack) callBack(fieldJSON["field_id"]);
										that.progressOffForm(uid);
									} );
									
								}
								else if (fieldJSON["type_standard"] == "EC") {
									that.email_wrapper._prepareContainerForComponent( uid, fieldJSON, page_id, function(){
										if (callBack) callBack(fieldJSON["field_id"]);
										that.progressOffForm(uid);
									} );
									
								}
                                else if (fieldJSON["type_standard"] == "AddB") {
									that.address_wrapper._prepareContainerForComponent( uid, fieldJSON, page_id, function(){
										if (callBack) callBack(fieldJSON["field_id"]);
										that.progressOffForm(uid);
									} );
									
								}
								else
								{
									if (callBack) callBack(fieldJSON["field_id"]);
									that.progressOffForm(uid);
								}
		
								//that.preview._startPreview( uid );
							}
							catch(e)
							{
								//console.log(e.stack);
							}
						}
						else {
							dhtmlx.message({
								type: "error",
								text: "Field don't saved. reason: " + json.response
							});
							that._setStatusDataTransferForm(uid, "field don't saved");
							if (json.response == "token not authorized")
								that._setStatusUserForm(uid, "token expired. Please login again", false);
							that.progressOffForm(uid);
						}
	
						//that.progressOffForm(uid);
	
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
						that._setStatusDataTransferForm(uid, "field don't saved");
						if (json.response == "token not authorized")
							that._setStatusUserForm(uid, "token expired. Please login again", false);
						that.progressOffForm(uid);
					}
				});
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
			var that  = FormBuilder,
				option_id = optionJSON.option_id,
				form_id = that.form_properties[uid].getItemValue("form_id");
			
			if( page_id == 0 || page_id == '0' )
				return;
			
			if( optionJSON["text"] == "" )
				optionJSON["text"] =  optionJSON["value"];
	
			if (option_id == null) // ADD child field on SERVER AND MEMORY if is a new child field (option_id == null)
			{
				// translate type before save
				var type_MAP_standard = optionJSON["type_standard"];
				var type_DHTMLX_standard = optionJSON["type"];
				optionJSON["type_standard"] = type_DHTMLX_standard;
				optionJSON["type"] = type_MAP_standard;
				// translate type before save
				
				optionJSON["page_id"] = page_id;
				
				that._setStatusDataTransferForm(uid, "sending option hash", true);
				// ADD via API
				CAIRS.MAP.API.insert({
					resource: "/forms/" + form_id + "/pages/" + page_id + "/fields/" + field_id + "/options" // mandatory
					,format: "json" // json, yaml, xml. Default: json. Not mandatory
					,payload: "agency_id=" + that.configuration[that._getRawUID(uid)].agency_id + "&hash=" + JSON.stringify(optionJSON) // mandatory for PUT and POST
					,onSuccess: function (request) // not mandatory
					{
						var json = JSON.parse( request.response );
						if (json.status == "success") {
							that._setStatusDataTransferForm(uid, "new option saved: " + json.option_id);
							// translate type after save for rendering a dhtmlx form field
							optionJSON["type_standard"] = type_MAP_standard;
							optionJSON["type"] = type_DHTMLX_standard;
							// translate type after save for rendering a dhtmlx form field
							
							optionJSON["option_id"] = json.option_id;
							
							// if is a valid form element and not an option
							if (optionJSON["type"] == ' ') {
								//optionJSON["text"] = optionJSON["label"];
								optionJSON["value"] = optionJSON["label"];
							}
							
							// add child field on memory
							that.metaparser._addChildFieldToProperlySection( uid, page_id, field_id, optionJSON  );
							
							// start preview
							that.preview._startPreview(uid);
							
							if (callBack) callBack(optionJSON["option_id"]);
							that.progressOffForm(uid);
						}
						else {
							dhtmlx.message({
								type: "error",
								text: "Option don't saved. reason: " + json.response
							});
							that._setStatusDataTransferForm(uid, "option don't saved");
							if (json.response == "token not authorized")
								that._setStatusUserForm(uid, "token expired. Please login again", false);
							that.progressOffForm(uid);
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
	
						that._setStatusDataTransferForm(uid, "option don't saved");
						if (json.response == "token not authorized")
							that._setStatusUserForm(uid, "token expired. Please login again", false);
	
						that.progressOffForm(uid);
					}
				});
			}
			// if option_id is not null
			else 
			{
				// ADD child field on MEMORY ONLY
				// get parent field
				var parent_field = that.metaparser._getPageField(uid, page_id, field_id);
				// add child field on memoru
				that.metaparser._addChildFieldOnMemory( uid, page_id, field_id, parent_field, optionJSON  );
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
			//console.log("_readFormData");
			var that  = FormBuilder,
				form_readed = false,
				commands = [];
			that.progressOnForm(uid);
			that._setStatusDataTransferForm(uid, "requesting form(" + form_id + ") hash", true);
			CAIRS.MAP.API.get({
				resource: "/forms/" + form_id,
				format: "json",
				payload: "agency_id=" + that.configuration[uid.replace(new RegExp("_" + form_id, "g"), "")].agency_id + "",
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
						that._setStatusDataTransferForm(uid, "form(" + form_id + ") hash received");
	
						that.form_properties[uid].setFormData(json.hash);
	
						that.data._readPagesData(uid, form_id, function (pagesAddedOnMemory) {
							
							try
							{
								that.data._readFieldsData(uid, form_id, pagesAddedOnMemory, function ()
								{
									if ( pagesAddedOnMemory[0].page_id ) {
										
										//console.log( "fire event" );
										that.selected_page[uid] = pagesAddedOnMemory[0].page_id;
										
										
										
										that.layout_form_layout_left[uid].cells("b").expand();
										that.toolbar_form_pages[uid].enableItem("delete_page");
										that.toolbar_form_pages[uid].enableItem("edit_page");
										that.toolbar_form_pages[uid].enableItem("rules_manager");
							
										that.setPageStatusInfo(uid, "selected page: " + pagesAddedOnMemory[0].page_id);
							
										try {
											that.layout_field_propertie[uid].cells("b").collapse();
											/*that.toolbar_grid_field_propertie_options[ uid ].unload();
											 that.toolbar_grid_field_propertie_options[ uid ] = null;
											 
											 delete  that.toolbar_grid_field_propertie_options[ uid ];
											 
											 that.grid_field_propertie_options[ uid ].clearAll();
											 that.grid_field_propertie_options[ uid ].destructor();
											 
											 delete  that.grid_field_propertie_options[ uid ];*/
							
										}
										catch (e) {};
							
										try {
											that.tabbar_form_create_fields[uid].setTabActive("add_field");
											that.tabbar_form_create_fields[uid].hideTab("field_properties");
											that.tabbar_form_add_field[uid].setTabActive("predefined_fields");
										}
										catch (e) {};
							
										
										that.grid_pages[uid].selectRow(0);
										
										that.data._feedGrid_form_fields(uid, pagesAddedOnMemory[0].page_id);
									}
								});
							}
							catch(e)
							{
								//console.log(e.stack);
							}
						});
					}
					else {
						dhtmlx.message({
							type: "error",
							text: json.response
						});
						that._setStatusDataTransferForm(uid, "unable to read form");
						if (json.response == "token not authorized")
							that._setStatusUserForm(uid, "token expired. Please login again", false);
					}
				},
				/**
				 * Description
				 * @method onFail
				 * @param {} request
				 * @return
				 */
				onFail: function (request) {
					var json = JSON.parse( request.response );
					dhtmlx.message({
						type: "error",
						text: json.response
					});
					that._setStatusDataTransferForm(uid, "unable to read form");
					if (json.response == "token not authorized")
						that._setStatusUserForm(uid, "token expired. Please login again", false);
	
					//that.progressOffForm( uid );
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
			//console.log("_readPagesData");
			var that  = FormBuilder,
				form_readed = false,
				commands = [];
			that.progressOnForm(uid);
			that._setStatusDataTransferForm(uid, "requesting pages data", true);
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
					var json = JSON.parse( request.response );
					if (json.status == "success") {
						//dhtmlx.message( {type : "error", text : 'Form data is ready'} );
						
						
						try
							{
								that._setStatusDataTransferForm(uid, "pages received");
								
								//console.log(json);
								//console.log(json.pages);
	
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
										//console.log( ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.." );
										//console.log( page );
										page["uid"] = uid;
										//console.log(page);
										that.data._addPage(page, function () {
											pagesAddedOnMemory.push(page);
											that.progressOffForm(uid);
											//console.log(addPage);
											//console.log(this);
											addPage();
										});
									}
									else {
										that.progressOffForm(uid);
										that.preview._startPreview(uid);
										//console.log(callBack);
										if (callBack) callBack(pagesAddedOnMemory);
									}
								}
			
								//that.progressOnForm( uid );
								addPage();
							}catch(e)
							{
								//console.log(e.stack);
							}
						
						
						
	
					}
					else {
						dhtmlx.message({
							type: "error",
							text: json.response
						});
						that.progressOffForm(uid);
					}
				},
				/**
				 * Description
				 * @method onFail
				 * @param {} request
				 * @return
				 */
				onFail: function (request) {
					var json = JSON.parse( request.response );
					that._setStatusErrorForm(uid, json.response);
	
					that.progressOffForm(uid);
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
			//console.log("_readFieldsData");
			var that  = FormBuilder,
				form_readed = false,
				commands = [],
				fieldsList = [],
				pageList = [],
				queryColumns = "" + that.model.conf_grid_fields.ids + ",page_id,field_id";
	
			for (var x = 0; x < pagesAddedOnMemory.length; x++)
				pageList.push(pagesAddedOnMemory[x].page_id);
	
			that.progressOnForm(uid);
			
			if(  pageList.join().length < 1 )
			{
				that.progressOffForm(uid);
				return;
			}
			
			that._setStatusDataTransferForm(uid, "requesting page(" + pageList.join() + ") fields", true);
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
					var json = JSON.parse( request.response );
					if (json.status == "success") {
						that._setStatusDataTransferForm(uid, "page(" + pageList.join() + ") fields received");
						that._setStatusForm(uid, "FormBuilder is ready. The form(" + form_id + ") is ready for editing");
	
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
										else if (id == "use_library") {
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
	
								that.data._putFieldOnMemory(uid, field["page_id"], field, function (field_id) {
									fieldsList.push(field_id);
									addField();
								}, true);
							}
							else {
								// read all options/child elements for all pages and all fields in just one AJAX request
								//console.log("calling options ------ ");
								
								
								that.data._readOptionsData(uid, form_id, pageList.join(), fieldsList.join(), function () {
									that.preview._startPreview(uid);
									//that.toolbar_form[uid].enableItem("generate_form");
									if (callBack)callBack();
									that.progressOffForm(uid);
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
						that.progressOffForm(uid);
					}
				},
				/**
				 * Description
				 * @method onFail
				 * @param {} request
				 * @return
				 */
				onFail: function (request) {
					var json = JSON.parse( request.response );
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
			var that  = FormBuilder,
				form_readed = false,
				commands = [];
	
			if (field_id == null || field_id == "") {
				that.progressOffForm(uid);
				return;
			}
	
			var queryColumns = "" + that.model.conf_grid_field_propertie_options.ids + ",optionname,page_id,option_id,field_id";
	
			that.progressOnForm(uid);
			that._setStatusDataTransferForm(uid, "requesting options of the field(" + field_id + ")", true);
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
					var json = JSON.parse( request.response );
					if (json.status == "success") {
						that._setStatusDataTransferForm(uid, "options for field(" + field_id + ") received");
	
						var added = 0;
						json.options.sort(function (a, b) {
							return a.index - b.index;
						});
						for (var x = 0; x < json.options.length; x++) {
							that.progressOnForm(uid);
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
	
							that.data._putOptionOnMemory(uid, option["page_id"], option["field_id"], option, function (option_id) {
								that.progressOffForm(uid);
							}, true); // on client only
						}
	
						if (callBack) callBack();
					}
					else {
						dhtmlx.message({
							type: "error",
							text: json.response
						});
						that.progressOffForm(uid);
					}
				},
				/**
				 * Description
				 * @method onFail
				 * @param {} request
				 * @return
				 */
				onFail: function (request) {
					var json = JSON.parse( request.response );
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
		 * @method _save_form
		 * @param {} uid
		 * @param {} callBack
		 * @param {} form_id
		 * @return
		 */
		_save_form: function (uid, callBack, form_id) {
			var that  = FormBuilder,
				hash = that.form_properties[uid].getFormData();
			
			that.progressOnForm(uid);
			
			if (hash["form_id"] == -1) {
				if (CAIRS.dhtmlx.validateForm(uid, that.form_properties[uid])) {
					if (hash["redirecturl"] == "" || hash["redirecturl"] == " ")
						hash["redirecturl"] = " ";
	
					hash["adminalert"] = hash["adminalert"].toString().replace(/-,-/gi, "");
					hash["autorespond"] = hash["autorespond"].toString().replace(/-,-/gi, "");
					hash["preview"] = hash["preview"].toString().replace(/-,-/gi, "");
					hash["nomultiple"] = hash["nomultiple"].toString().replace(/-,-/gi, "");
					hash["formname"] = that.handleFormName(uid, hash["formlabel"]);
	
					CAIRS.MAP.API.insert({
						resource: "/forms" // mandatory
						,
						format: "json" // json, yaml, xml. Default: json. Not mandatory
						,
						payload: "agency_id=" + that.configuration[uid.replace(new RegExp("_-1", "g"), "")].agency_id + "&hash=" + JSON.stringify(hash) // mandatory for PUT and POST
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
	
							//that.uid
	
							that.configuration[uid.replace(new RegExp("_-1", "g"), "")].page_layout = hash.displaycolumns;
							that.form_properties[uid].setItemValue("form_id", json.form_id);
	
							//that.configuration[ uid.replace(new RegExp("_" + json.form_id,"g"),"") ] = that.configuration[ uid.replace(new RegExp("_-1","g"),"") ];
							that.progressOnForm(uid);
							that.data._addPage({
								uid: uid,
								pagename: "Page one",
								page_layout : that.form_properties[uid].getCheckedValue("displaycolumns"),
								page_id: null,
								form_id: json.form_id
							}, function( page_id ){
								
								
								that.selected_page[uid] = page_id
								
								that.grid_pages[uid].selectRow(0);
								
								that.preview._startPreview(uid);
	
								that.data._feedGrid(uid.replace(new RegExp("_-1", "g"), ""));
		
								that.progressOffForm(uid);
		
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
							var json = JSON.parse( request.response );
							dhtmlx.message({
								type: "error",
								text: json.response
							});
							that.progressOffForm(uid);
						}
					});
				}
				else {
					that.tabbar_form[uid].setTabActive("form_properties");
					that.progressOffForm(uid);
				}
			}
			else {
				if (CAIRS.dhtmlx.validateForm(uid, that.form_properties[uid])) {
					hash["formname"] = that.handleFormName(uid, hash["formlabel"]);
					delete hash["formname"];
					CAIRS.MAP.API.update({
						resource: "/forms/" + hash["form_id"] // mandatory
						,
						format: "json" // json, yaml, xml. Default: json. Not mandatory
						,
						payload: "agency_id=" + that.configuration[uid.replace(new RegExp("_" + hash["form_id"], "g"), "")].agency_id + "&hash=" + JSON.stringify(hash) // mandatory for PUT and POST
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
							that.configuration[uid.replace(new RegExp("_" + form_id, "g"), "")].page_layout = hash.displaycolumns;
							that.form_properties[uid].setItemValue("form_id", json.form_id);
	
							that.preview._startPreview(uid);
	
							that.data._feedGrid(uid.replace(new RegExp("_" + form_id, "g"), ""));
	
							that.progressOffForm(uid);
	
							if (callBack) callBack( form_id );	
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
							that.progressOffForm(uid);
						}
					});
				}
			}
		}
		
			
	}; // end return
 
})();