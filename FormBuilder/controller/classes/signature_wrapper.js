FormBuilder.signature_wrapper = FormBuilder.signature_wrapper || (function () {
	return {
		
		
		/**
		 * Description
		 * @method _prepareFieldsForComponent
		 * @param {} uid
		 * @return
		 */
		_prepareFieldsForComponent: function (uid, field_id, name, callBack) {
			var that = FormBuilder;
			
			
			var wrapperID = field_id + "_" + name + "_signature_wrapper";
			var comboID = field_id + "_" + name + "_signature_dropdown";
			var inputID = field_id + "_" + name + "_signature_input";
			var hiddenID = field_id + "_" + name + "_signature_hidden";
			var dateID = field_id + "_" + name + "_signature_date";
		
			var signature_container = {
				"field_id": field_id,
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
				"field_id": field_id,
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
				"field_id": field_id,
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
				"field_id": field_id,
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
				"field_id": field_id,
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
		
			that.progressOnForm(uid);
		
			that._addOptionToField(uid, signature_container, function () {
				that.progressOnForm(uid);
				that._addOptionToField(uid, signature_dropdown, function () {
					that.progressOnForm(uid);
					that._addOptionToField(uid, signature_hidden_field, function () {
						that.progressOnForm(uid);
						that._addOptionToField(uid, signature_text_field, function () {
							that.progressOnForm(uid);
							that._addOptionToField(uid, signature_date_field, function () {
								if (typeof that.signature_controls[uid] === 'undefined')
									that.signature_controls[uid] = [];
		
								that.signature_controls[uid].push({
									wrapper: wrapperID,
									combo: comboID,
	
									input: inputID,
									hidden: hiddenID,
									date: dateID
								});
								
								that.model.conf_form_preview.signature_controls.push({
									wrapper: wrapperID,
									combo: comboID,
									input: inputID,
									hidden: hiddenID,
									date: dateID
								});
								
								
								if (callBack) callBack(field_id);
								
								that.progressOffForm(uid);
							});
						});
					});
				});
			});
			
		}
		
		
		,/**
		 * Description
		 * @method _prepareSignatureControls
		 * @param {} uid
		 * @return
		 */
		_prepareSignatureControls: function (uid, field_id, parent_field) {
			var that = FormBuilder;
			
			// storage for signature controls on the form
			if (typeof that.signature_controls[uid] === 'undefined')
				that.signature_controls[uid] = [];
				
			var wrapperID = field_id + "_" + parent_field["name"] + "_signature_wrapper";
			var comboID = field_id + "_" + parent_field["name"] + "_signature_dropdown";
			var inputID = field_id + "_" + parent_field["name"] + "_signature_input";
			var hiddenID = field_id + "_" + parent_field["name"] + "_signature_hidden";
			var dateID = field_id + "_" + parent_field["name"] + "_signature_date";
			
			 // put the signature control into the store
			that.signature_controls[uid].push({
				wrapper: wrapperID,
				combo: comboID,
				input: inputID,
				hidden: hiddenID,
				date: dateID
			});
			
			// put the signature control into the store (on model)
			that.model.conf_form_preview.signature_controls.push({
				wrapper: wrapperID,
				combo: comboID,
				input: inputID,
				hidden: hiddenID,
				date: dateID
			});
			
		}
		
		,/**
		 * Description
		 * @method start
		 * @param {} uid
		 * @return
		 */
		start: function (uid) {
			var that = FormBuilder;
			try {
				var form_id = that.form_properties[uid].getItemValue("form_id");
				if (typeof that.signature_controls[uid] === 'undefined') {
					that.signature_controls[uid] = [];
				}
				//console.log(that.signature_controls[ uid ]);
				var signatureWrappers = that.signature_controls[uid];
				signatureWrappers.forEach(function (wrapperObj, index, array) {
					var wrapperID = wrapperObj.wrapper;
					var comboID = wrapperObj.combo;
					var inputID = wrapperObj.input;
					var hiddenID = wrapperObj.hidden;
					var dateID = wrapperObj.date;
	
					//console.log( that.form_preview[ uid ].getContainer(wrapperID).id )
	
					var wrapper = document.getElementById(that.form_preview[uid].getContainer(wrapperID).id);
	
					//console.log( wrapper );
	
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
							//console.log( that.form_preview[ uid ].getCombo( comboID ) );
							if (that.form_preview[uid].getCombo(comboID).getSelectedValue().length < 1) {
								//console.log(that.form_grid_field_propertie_options[ uid ].getCombo( comboID ).getSelectedText().length);
								dhtmlx.message({
									type: "error",
									text: "Select a caseworker for signing this area first."
								});
	
								that.form_preview[uid].getCombo(comboID).openSelect();
								return;
							}
	
							var filesToLoad = [
								FormBuilder.signature_application_url + "SuperSignature/wz_jsgraphics.js" /* Super signature control */ 
								, FormBuilder.signature_application_url + "SuperSignature/ss.js" /* Super signature control */
								, FormBuilder.signature_application_url + "controller/Signature_Component.js" /* signature model and controller */
							];
							/* load files and call signature component */
							CAIRS.onDemand.load(filesToLoad, function () {
	
								//console.log(that.getCaseWorkerId(uid, that.form_preview[ uid ].getCombo( comboID ).getSelectedText()));
	
								Signature_Component.signIn({
									user_id: that.form_preview[uid].getCombo(comboID).getSelectedValue(),
									user_name: that.form_preview[uid].getCombo(comboID).getComboText(), // mandatory
	
									agency_id: that.configuration[uid.replace(new RegExp("_" + form_id, "g"), "")].agency_id, // mandatory
	
									file_name: that.form_preview[uid].getCombo(comboID).getSelectedText().toString().split(" ")[0] + "_signature", // mandatory
	
									application_url: FormBuilder.signature_application_url, // mandatory
									file_path: that.configuration[uid.replace(new RegExp("_" + form_id, "g"), "")].signature_file_path, // mandatory - / slash on the end
	
									/* saving files under a path using the name as parameter */
									file_path_abs: that.configuration[uid.replace(new RegExp("_" + form_id, "g"), "")].signature_file_path_abs, // mandatory - / slash on the end
	
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
										var hfield = that._getFormItem(hiddenID, uid + "_form_preview");
										that.form_preview[uid].setItemValue(hiddenID, response.file_path + "" + response.file_name);
										that._getFieldOption(uid, hfield.page_id, hfield.field_id, hfield.option_id)["value"] = response.file_path + "" + encodeURIComponent( response.file_name );
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
	
					document.getElementById(that.form_preview[uid].getContainer(wrapperID).id).style.width = "200px";
					document.getElementById(that.form_preview[uid].getContainer(wrapperID).id).style.height = "100px";
				});
			}
			catch (e) {
				console.log(e.stack);
			}
		}
			
	}; // end return
 
})();