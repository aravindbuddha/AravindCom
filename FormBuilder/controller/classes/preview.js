FormBuilder.preview = FormBuilder.preview || (function () {
	return {
		/**
		 * Description
		 * @method _startPreview
		 * @param {} uid
		 * @return
		 */
		_startPreview: function (uid) {
			var that = FormBuilder;
			//console.log("starting preview");
	
			try {
				that.tab_pages_preview[uid].clearAll()
			}
			catch (e) {
	
			}
			try {
				that.form_preview[uid].unload();
				that.form_preview[uid] = null;
			}
			catch (e) {
	
			}
	
			that.preview._tab_pages_preview(uid);
			that.preview._form_preview(uid);
		}
	
		,
		/**
		 * Description
		 * @method _layout_form_preview
		 * @param {} uid
		 * @return
		 */
		_layout_form_preview: function (uid) {
			var that = FormBuilder;
			that.layout_form_preview[uid] = that.tabbar_form[uid].cells("form_preview").attachLayout(that.model.conf_layout_form_preview.pattern);
			that.layout_form_preview[uid].dhxWins.enableAutoViewport(false);
			that.layout_form_preview[uid].dhxWins.attachViewportTo(document.body);
			that.layout_form_preview[uid].attachEvent("onUnDock", function (itemId) {
				//console.log(itemId);
				that.layout_form_preview[uid].dhxWins.setImagePath("../codebase3.6/imgs/");
	
				that.formPreviewWindow[uid] = that.layout_form_preview[uid].dhxWins.window(itemId);
				that.formPreviewWindow[uid].button("dock").attachEvent("onClick", function () {
					that.layout_form_preview[uid].cells("a").dock();
					return true;
				});;
				that.formPreviewWindow[uid].setDimension(760, 500);
	
				that.formPreviewWindow[uid].setText("Live preview: " + that.form_properties[uid].getItemValue("formlabel"));
				that.formPreviewWindow[uid].setIcon("dock.gif", "dock.gif");
			});
			that.layout_form_preview[uid].attachEvent("onDock", function (itemId) {
				alert("entrei dock");
			});
	
		}
	
		,
		/**
		 * Description
		 * @method _toolbar_form_preview
		 * @param {} uid
		 * @param {} form_id
		 * @return
		 */
		_toolbar_form_preview: function (uid, form_id) {
			var that = FormBuilder;
			that.toolbar_form_preview[uid] = that.layout_form_preview[uid].cells("a").attachToolbar(that.model.conf_toolbar_form_preview);
			that.toolbar_form_preview[uid].setIconSize(32);
			that.toolbar_form_preview[uid].setSkin('dhx_skyblue');
			that.toolbar_form_preview[uid].attachEvent("onClick", function (id) {
				if (id == "save_form") {
					if (CAIRS.dhtmlx.validateForm(uid + "_form_preview", that.form_preview[uid])) {
						that._changeFieldsValueOnModel( uid );
					}
				}
				else if (id == "print_form") {
					if (CAIRS.dhtmlx.validateForm(uid + "_form_preview", that.form_preview[uid])) {
						//console.log( JSON.stringify( that.model.conf_form_preview.template ) );
	
						var gridData = [],
							form = null,
							inputs = [],
							inputHash = null,
							x, iframe = null,
							type = null,
							form_id = that.form_properties[uid].getItemValue("form_id");
	
						if (document.getElementById("form_print_" + uid + "_" + form_id)) {
							form = document.getElementById("form_print_" + uid + "_" + form_id);
							document.body.removeChild(form);
						}
	
						form = document.createElement("form");
						form.setAttribute("id", "form_print_" + uid + "_" + form_id);
						form.setAttribute("name", "form_print_" + uid + "_" + form_id);
	
						//console.log( CAIRS.dhtmlx.formFields[ uid + "_form_preview" ] );
						// get user typed data and set the field value inside application model
	
						that._changeFieldsValueOnModel( uid );
	
						form.setAttribute("action", that.application_path + "processors/html2pdf/processor/PV.php?agency_logo=" + that.data_store[that._getRawUID(uid)].agency_data.logo + "");
						form.setAttribute("method", "post");
						form.setAttribute("target", "iframe_print_" + uid + "_" + form_id);
	
						var inputHash = document.createElement("input");
						inputHash.setAttribute("id", "template");
						inputHash.setAttribute("name", "template");
						inputHash.setAttribute("type", "hidden");
						inputHash.setAttribute("value", JSON.stringify(that.model.conf_form_preview.template));
						form.appendChild(inputHash);
	
						var an = document.createElement("input");
						an.setAttribute("id", "agency_name");
						an.setAttribute("name", "agency_name");
						an.setAttribute("type", "hidden");
						an.setAttribute("value", that.data_store[that._getRawUID(uid)].agency_data.agency_name);
						form.appendChild(an);
	
						var fn = document.createElement("input");
						fn.setAttribute("id", "form_name");
						fn.setAttribute("name", "form_name");
						fn.setAttribute("type", "hidden");
						fn.setAttribute("value", that.form_properties[uid].getItemValue("formlabel"));
						form.appendChild(fn);
	
						document.body.appendChild(form);
	
						//postStr = postStr + "&userID=" + that.configuration[ uid ].userID;
						//postStr = postStr + "&connID=" + that.configuration[ uid ].connID;
						//postStr = postStr + "&connectionID=" + that.configuration[ uid ].connectionID;
	
						that._window_print(uid);
	
						try {
							iframe = document.getElementById("iframe_print_" + uid + "_" + form_id);
							that.window_print[uid].attachObject("iframe_print_" + uid + "_" + form_id);
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
	
							that.window_print[uid].attachObject("iframe_print_" + uid + "_" + form_id);
	
							form.submit();
						}
	
					}
				}
			});
		}
	
		,
		/**
		 * Description
		 * @method _tab_pages_preview
		 * @param {} uid
		 * @return
		 */
		_tab_pages_preview: function (uid) {
			var that = FormBuilder;
	
			if (that.layout_form_preview[uid].dhxWins.isWindow("a"))
				that.tab_pages_preview[uid] = that.formPreviewWindow[uid].attachTabbar();
			else
				that.tab_pages_preview[uid] = that.layout_form_preview[uid].cells("a").attachTabbar();
	
			that.tab_pages_preview[uid].setSkin('dhx_skyblue');
			that.tab_pages_preview[uid].setImagePath(that.model.conf_tabbar_form.image_path); // that.application_path
			that.tab_pages_preview[uid].enableScroll(true);
			that.tab_pages_preview[uid].enableAutoReSize(true);
			that.tab_pages_preview[uid].addTab("start_tab", "start_tab", "0px");
			that.tab_pages_preview[uid].hideTab("start_tab", true);
	
			that.tab_pages_preview[uid].attachEvent("onSelect", function (idd, last_id) {
				return true;
			});
		}
	
		,
		/**
		 * Description
		 * @method _form_preview
		 * @param {} uid
		 * @return
		 */
		_form_preview: function (uid) {
			var that = FormBuilder,
				skin = that.form_properties[uid].getItemValue("skin"),
				form_id = that.form_properties[uid].getItemValue("form_id");
			dhtmlx.skin = skin || "dhx_skyblue";
	
			that.metaparser._sortFormStructure( uid );
	
			that.form_preview[uid] = that.tab_pages_preview[uid].cells("start_tab").attachForm(that.model.conf_form_preview.template);
			that.form_preview[uid].setSkin(skin);
			
			// add pages to the form
			that.model.conf_form_preview.template.forEach(function (element, index, array) {
				if (element.type == "block") {
					if (typeof element.id !== 'undefined') {
						that.tab_pages_preview[uid].addTab(that.model.conf_form_preview.template[index].id, element.label, element.tab_width);
						that.tab_pages_preview[uid].cells(that.model.conf_form_preview.template[index].id).attachObject(that.model.conf_form_preview.template[index].id.toString());
						if (index == 1)
							that.tab_pages_preview[uid].setTabActive(that.model.conf_form_preview.template[index].id);
					}
				}
			});
	
			CAIRS.dhtmlx.prepareForm(uid + "_form_preview", that.model.conf_form_preview, that.form_preview[uid]);
	
			that._bindFormFieldsToLibraryFields(uid + "_form_preview", uid.replace(new RegExp("_" + form_id, "g"), "").replace(new RegExp("_-1", "g"), ""));
	
			that.signature_wrapper.start(uid);
			
			/* components */
			// start/render phonebook component
			that.phone_wrapper.start(uid);
			
			// start/render background component
			that.background_wrapper.start(uid);
			
			// start/render email component
			that.email_wrapper.start(uid);
                        
            // start/render address component
			that.address_wrapper.start(uid);
	
			that.model.conf_form_preview.template.forEach(function (element, index, array) {
				if (element.type == "block") {
					if (typeof element.id !== 'undefined') {
						document.getElementById(that.model.conf_form_preview.template[index].id.toString()).parentNode.style.overflow = "auto";
						document.getElementById(that.model.conf_form_preview.template[index].id.toString()).parentNode.style.paddingBottom = "20px";
					}
				}
			});
		}		
			
	}; // end return
 
})();



