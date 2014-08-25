FormBuilder.metaparser = FormBuilder.metaparser || (function () {
	return {
		
		
		/**
		 * Description
		 * @method _addChildFieldOnMemory
		 * @param {} uid
		 * @param {} page_id
		 * @return ObjectExpression
		 */
		_addChildFieldOnMemory: function ( uid, page_id, field_id, parent_field, optionJSON  ) {
			var that = FormBuilder;
			
			// get parent field on memory as a JSON object
			//var parent_field = that.metaparser._getPageField(uid, page_id, field_id);
			
			// if child element is a simple option and not a valid form element
			if (optionJSON["type"] == ' ') {
				optionJSON["value"] = optionJSON["label"];
			}
			
			// if child element is a container
			if (optionJSON["type"] == "container") {
				if (typeof parent_field.type_standard !== 'undefined')
				{
					// if parent field is a signature control
					if (parent_field.type_standard == "X" || parent_field.type_standard == "Y" || parent_field.type_standard == "U" || parent_field.type_standard == "V")
					{
						// if parent field is a signature control, then bind container providing the wrapperID string
						optionJSON["bind_signature_container"] = field_id + "_" + parent_field["name"] + "_signature_wrapper";
					}
					else if (parent_field.type_standard == "PhB" )
					{
						that.phone_wrapper._putWrapperOnMemoryOnly( uid, field_id, parent_field["name"], page_id );
					}
					else if (parent_field.type_standard == "BG" )
					{
						that.background_wrapper._putWrapperOnMemoryOnly( uid, field_id, parent_field["name"], page_id );
						// console.log('putWrapper');
					}
					else if (parent_field.type_standard == "EC" )
					{
						that.email_wrapper._putWrapperOnMemoryOnly( uid, field_id, parent_field["name"], page_id );
					}
                    else if (parent_field.type_standard == "AddB" )
					{
						that.address_wrapper._putWrapperOnMemoryOnly( uid, field_id, parent_field["name"], page_id );
					}
				}
			}
			
			// if child element is a calendar
			if (optionJSON["type"] == "calendar") {
				if (optionJSON["value"] == "" || optionJSON["value"] == " " || optionJSON["value"] == "  " || optionJSON["value"] == null)
					delete optionJSON["value"]; // avoid bad formated date conversion when value is empty - invalid date string
			}
			
			// if child element is combo
			if (optionJSON["type"] == "combo")
			{
				// if parent field is a signature wrapper component
				if (parent_field.type_standard == "X" || parent_field.type_standard == "Y" || parent_field.type_standard == "U" || parent_field.type_standard == "V")
				{
					that.signature_wrapper._prepareSignatureControls( uid, field_id, parent_field );
				}
				
				// IF CHILD FIELD IS NOT AN SIMPLE OPTION
				if (typeof parent_field.type_standard !== 'undefined')
				{
					// if parent field is a signature wrapper component
					if (parent_field.type_standard == "X") {
						optionJSON["bind_library_field"] = "caseworkers_names"; // 	bind library fields to combo
					}
					// if parent field is a signature wrapper component
					if (parent_field.type_standard == "Y") {
						optionJSON["bind_library_field"] = "caseworkers_names"; // 	bind library fields to combo
					}
				}
				
			}
			//console.log( optionJSON );
			that.metaparser._addChildFieldToProperlySection( uid, page_id, field_id, optionJSON  );
		}
		
		
		
		,/**
		 * Description
		 * @method _addChildFieldToProperlySection
		 * @param {} uid
		 * @param {} page_id
		 * @return ObjectExpression
		 */
		_addChildFieldToProperlySection: function ( uid, page_id, field_id, optionJSON  ) {
			var that = FormBuilder;
			
	
			// if this page is SINGLE layout
			if (that.pages[uid][page_id].page_layout == "S")
			{
				// read first column
				that._getPageColumnList(uid, page_id, "first").forEach(function (field, index, array) {
					// if find the parent field
					if (field.field_id == field_id) {
						// place the child field on option and list
						that._getPageColumnList(uid, page_id, "first")[index].list.push(optionJSON);
						that._getPageColumnList(uid, page_id, "first")[index].options.push(optionJSON);
						//console.log( that._getPageColumnList( uid, page_id, "first" )[index] );
					}
				});
			}
			// if this page is DOUBLE layout
			else if (that.pages[uid][page_id].page_layout == "D")
			{
				// read first column
				that._getPageColumnList(uid, page_id, "first").forEach(function (field, index, array) {
					// if find the parent field
					if (field.field_id == field_id) {
						// place the child field on option and list
						that._getPageColumnList(uid, page_id, "first")[index].list.push(optionJSON);
						that._getPageColumnList(uid, page_id, "first")[index].options.push(optionJSON);
						//console.log( that._getPageColumnList( uid, page_id, "first" )[index] );
					}
				});
				// read second column
				that._getPageColumnList(uid, page_id, "second").forEach(function (field, index, array) {
					// if find the parent field
					if (field.field_id == field_id) {
						// place the child field on option and list
						that._getPageColumnList(uid, page_id, "second")[index].list.push(optionJSON);
						that._getPageColumnList(uid, page_id, "second")[index].options.push(optionJSON);
						//console.log( that._getPageColumnList( uid, page_id, "second" )[index] );
					}
				});
			}
		}
		
		,
		/**
		 * Description
		 * @method _sortFormStructure
		 * @param {} uid
		 * @param {} page_id
		 * @return ObjectExpression
		 */
		_sortFormStructure: function ( uid ) {
			var that = FormBuilder;
	
			that.model.conf_form_preview.template.sort(function (a, b) {
				return a.index - b.index;
			});
		
			for (var x = 0; x < that.model.conf_form_preview.template.length; x++) {
				if (that.model.conf_form_preview.template[x].type == "block")
				{
					if (typeof that.model.conf_form_preview.template[x].page_id !== 'undefined')
					{
						// order column 1 of the page
						that.model.conf_form_preview.template[x].list[0].list.sort(function (a, b) {
							return a.index - b.index;
						});
		
						if (that.model.conf_form_preview.template[x].list[0].list)
							for (var y = 0; y < that.model.conf_form_preview.template[x].list[0].list.length; y++)
							{
								//console.log( that.model.conf_form_preview.template[x].list[0].list[y] );
								if (that.model.conf_form_preview.template[x].list[0].list[y].list)
									that.model.conf_form_preview.template[x].list[0].list[y].list.sort(function (a, b) {
										return a.index - b.index;
									});
								if (that.model.conf_form_preview.template[x].list[0].list[y].options)
									that.model.conf_form_preview.template[x].list[0].list[y].options.sort(function (a, b) {
										return a.index - b.index;
									});
							}
		
							// if is there 2 columns
						if (typeof that.model.conf_form_preview.template[x].list[2] !== 'undefined')
						{
							// order column 2 of the page
							that.model.conf_form_preview.template[x].list[2].list.sort(function (a, b) {
								return a.index - b.index;
							});
		
							for (var y = 0; y < that.model.conf_form_preview.template[x].list[2].list.length; y++)
							{
								//console.log( that.model.conf_form_preview.template[x].list[0].list[y] );
								if (that.model.conf_form_preview.template[x].list[2].list[y].list)
									that.model.conf_form_preview.template[x].list[2].list[y].list.sort(function (a, b) {
										return a.index - b.index;
									});
		
								if (that.model.conf_form_preview.template[x].list[2].list[y].options)
									that.model.conf_form_preview.template[x].list[2].list[y].options.sort(function (a, b) {
										return a.index - b.index;
									});
							}
						}
					}
				}
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
			var that = FormBuilder;
			
			//console.log(page_id);
			//console.log(that.pages[uid]);
			
			
			//console.log("--------------------------------");
			
			if( page_id !== "" && page_id != null && typeof page_id !== 'undefined' )
				if( typeof that.pages[uid][page_id].list[0] !== 'undefined' )
				{
					for (var x = 0; x < that.pages[uid][page_id].list[0].list.length; x++) {
						var field = that.pages[uid][page_id].list[0].list[x];
						if (typeof field.field_id !== 'undefined')
							if (field.field_id.toString() == field_id.toString()) return field;
					}
					if (that.pages[uid][page_id].page_layout == "D") {
						for (var x = 0; x < that.pages[uid][page_id].list[2].list.length; x++) {
							var field = that.pages[uid][page_id].list[2].list[x];
							if (typeof field.field_id !== 'undefined')
								if (field.field_id.toString() == field_id.toString()) return field;
						}
					}
				}
				else
				{
					dhtmlx.message({
						type: "error",
						text: "this form has no pages"
					});
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
			var that = FormBuilder,
				fieldsNumber = 0;
			for (var x = 0; x < that.pages[uid][page_id].list[0].list.length; x++) {
				var field = that.pages[uid][page_id].list[0].list[x];
				if (typeof field.field_id !== 'undefined')
					fieldsNumber = fieldsNumber + 1;
			}
			if (that.pages[uid][page_id].page_layout == "D") {
				for (var x = 0; x < that.pages[uid][page_id].list[2].list.length; x++) {
					var field = that.pages[uid][page_id].list[2].list[x];
					if (typeof field.field_id !== 'undefined')
						fieldsNumber = fieldsNumber + 1;
				}
			}
			return fieldsNumber;
		}
		
		
		
		,
		/**
		 * Description
		 * @method _getAllFields
		 * @param {} uid
		 * @return [fields]
		 */
		_getAllFields: function (uid) {
			var that = FormBuilder,
				fields = [];
	
			for(var page_id in that.pages[uid])
			{
				if (that.pages[uid].hasOwnProperty(page_id)) {
					for (var x = 0; x < that.pages[uid][page_id].list[0].list.length; x++) {
						var field = that.pages[uid][page_id].list[0].list[x];
						if (typeof field.field_id !== 'undefined')
							fields.push(field);
					}
					if (that.pages[uid][page_id].page_layout == "D") {
						for (var x = 0; x < that.pages[uid][page_id].list[2].list.length; x++) {
							var field = that.pages[uid][page_id].list[2].list[x];
							if (typeof field.field_id !== 'undefined')
								fields.push(field);
						}
					}
				}
			}
			return fields;
		}
		
		,
		/**
		 * Description
		 * @method _getAllFields
		 * @param {} uid
		 * @return [fields]
		 */
		_getField: function (uid, field_id) {
			var that = FormBuilder,
				fieldObj = {};
	
			for(var page_id in that.pages[uid])
			{
				if (that.pages[uid].hasOwnProperty(page_id)) {
					for (var x = 0; x < that.pages[uid][page_id].list[0].list.length; x++) {
						var field = that.pages[uid][page_id].list[0].list[x];
						if (typeof field.field_id !== 'undefined')
							if (field.field_id == field_id)
								fieldObj = field;
					}
					if (that.pages[uid][page_id].page_layout == "D") {
						for (var x = 0; x < that.pages[uid][page_id].list[2].list.length; x++) {
							var field = that.pages[uid][page_id].list[2].list[x];
							if (typeof field.field_id !== 'undefined')
								if (field.field_id == field_id)
									fieldObj = field;
						}
					}
				}
			}
			return fieldObj;
		}
		
		
		,
		/**
		 * Description
		 * @method _getAllPages
		 * @param {} uid
		 * @return [] pages
		 */
		_getAllPages: function (uid) {
			var that = FormBuilder,
				pages = [];
			for(var page_id in that.pages[uid])
			{
				if (that.pages[uid].hasOwnProperty(page_id)) {
					pages.push( that.pages[uid][ page_id ] )
				}
			}
			return pages;
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
			var that = FormBuilder,
				optionsNumber = 0;
			//console.log( "_getFieldOption" );
			//console.log( arguments );
	
			for (var x = 0; x < that._getPageColumnList(uid, page_id, "first").length; x++) {
				var field = that._getPageColumnList(uid, page_id, "first")[x];
	
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
			if (that.pages[uid][page_id].page_layout == "D") {
				for (var x = 0; x < that._getPageColumnList(uid, page_id, "second").length; x++) {
					var field = that._getPageColumnList(uid, page_id, "second")[x];
	
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
			
			
	}; // end return
 
})();