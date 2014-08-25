FormBuilder.email_wrapper = FormBuilder.email_wrapper || (function () {
	return {
		
		/**
		 * Description
		 * @method _checkStorageForWrappers
		 * @param {} uid
		 * @return
		 */
		_checkStorageForWrappers: function (uid) {
			var that = FormBuilder, self = this;
			// if not exist, create array on model to store all email wrappers
			if( typeof that.model.conf_form_preview.email_controls === 'undefined' )	that.model.conf_form_preview.email_controls = [];
			//console.log("storage integrity for FormBuilder.email_wrapper was checked");
		}
		
		
		,/**
		 * Description - this method is used to add the component fields inside MEMORY and SERVER
		 * @method _prepareContainerForComponent
		 * @param {} uid
		 * @return
		 */
		_prepareContainerForComponent: function (uid, fieldsetJSON, page_id, callBack) {
			var that = FormBuilder, 
				self = this, 
				alreadyAdded = false,
				wrapperID = fieldsetJSON["field_id"] + "_" + fieldsetJSON["name"] + "_email_wrapper",
				component_container = null;
			
			// check arrays for storing the wrappers
			self._checkStorageForWrappers( uid );
			
			that.model.conf_form_preview.email_controls.forEach( function ( component, index, array )
			{
				if( component.wrapperID == wrapperID ) alreadyAdded = true;
			});
			
			if( alreadyAdded )
			{
				if( callBack ) callBack();
				console.log("container for phonebook is ready - already exist");
				return;
			}
			
			component_container = {
				"field_id": fieldsetJSON["field_id"],
				"option_id": null,
				"type": "c",
				"type_standard": "c",
				"text_size": 0,
				"name": wrapperID,
				"label": "component container",
				"text": "component container",
				"caption": "",
				"tooltip": "",
				"value": "",
				"mask_to_use": "",
				"className": ""
			};
			
			that.progressOnForm(uid);
			that._addOptionToField(uid, component_container, function ()
			{
				that.model.conf_form_preview.email_controls.push( {
					wrapperID: wrapperID,
					page_id : page_id
				} );
				that.progressOffForm(uid);
				if( callBack ) callBack();
			});
			
			//console.log("container for email is ready");
		}
		
		,/**
		 * Description - this method is used to add the component fields inside MEMORY only
		 * @method _prepareContainerForComponent
		 * @param {} uid
		 * @return
		 */
		_putWrapperOnMemoryOnly: function (uid, field_id, name, page_id) {
			var that = FormBuilder, 
				self = this, 
				wrapperID = field_id + "_" + name + "_email_wrapper";
			
			// check arrays for storing the wrappers
			self._checkStorageForWrappers( uid );
			
			that.model.conf_form_preview.email_controls.push( {
					wrapperID: wrapperID,
					page_id : page_id
			} );
		}
		
		,
		/**
		 * Description
		 * @method start
		 * @param {} uid
		 * @return
		 */
		start: function ( uid ) {
			var that = FormBuilder, self = this;
			//console.log("start email");
			try {
				var form_id = that.form_properties[uid].getItemValue("form_id");
				
				// check arrays for storing the wrappers
				self._checkStorageForWrappers( uid );
				
				var componentWrappers = that.model.conf_form_preview.email_controls;
				
				//console.log(componentWrappers);
				
				var componentDependencies = [
					//that.application_path + "js/MAPPermissions/js/controller.js"
					that.application_path + "js/MAPEmailcomponent/model/emailcomponent_Model.js",
					that.application_path + "js/MAPEmailcomponent/controller/emailcomponent.js"

				];
				// add ?uistring=xxxxxxx to force to always load the file again
				//CAIRS.environment = "dev";
				/* load files and call the component */
				CAIRS.onDemand.load(componentDependencies, function ()
				{
					try {
					componentWrappers.forEach(function (wrapperObj, index, array)
					{
						var wrapperID = wrapperObj.wrapperID, registered = false;
						window.setTimeout(function()
						{
							var divId = that.form_preview[uid].getContainer(wrapperID).id;
							var wrapperDiv = document.getElementById( divId );
							
							if (that.pages[uid][wrapperObj.page_id].page_layout == "S")
								wrapperDiv.style.width = (that.form_default_width - 70) + "px";
							else
								wrapperDiv.style.width = ((that.form_default_width - 70) / 2) + "px";
								
							wrapperDiv.style.height = "200px";
							
							console.log("renderizing component " + wrapperID);
							// original component call
							emailcomponent.start( { 
								uid : "21636",
								application_path : that.application_path + "js/MAPEmailcomponent/" ,
								dhtmlx_codebase_path : that.dhtmlx_codebase_path,
								contactid : "21636",
								contactcomponent_obj : '',
								useWindow: false,
								window_managerObj : that.window_manager,
								parentDIVId : divId,
								agencyid: that.configuration[that._getRawUID(uid)].agency_id
							} );

						},700);
					});
					}catch (e) {
						console.log(e.stack);
					}
				});
			}
			catch (e) {
				console.log(e.stack);
			}
		}
		
		
			
	}; // end return
 
})();