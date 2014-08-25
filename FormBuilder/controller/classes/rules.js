FormBuilder.rules = FormBuilder.rules || (function ()
{
	/*jslint white: true, nomen: true, eqeq: true, maxlen: 1000  */
	
	return {
		
		window : []
		,
		tabbar: []
		,
		layout : []
				
		,
		layout_fields : []
		,
		layout_pages : []
		,
		layout_notifications : []
		
		,
		toolbar_fields : []
		,
		toolbar_pages : []
		,
		toolbar_notifications : []
		,
		toolbar_notification: []
		
		,
		tree_fields: []
		,
		tree_pages: []
		,
		tree_notifications: []
		
		,
		form_fields: []
		,
		form_pages: []
		,
		form_notifications: []
		
		,
		grid_fields : []
		,
		grid_pages : []
		,
		grid_notifications : []
		
		,
		window_crud : []
		,
		toolbar_crud : []
		,
		form_crud : []
		,
		window_crud_notification : []
		,
		toolbar_crud_notification : []
		,
		form_crud_notification : []
		
		,
		configuration : []
		
		
		
		,
		start : function (c) {
			var that = FormBuilder,
			self = this,
			uid = c.uid,
			form_id = that.form_properties[uid].getItemValue("form_id");
			
			self._prepare_model( c );
			
			self.configuration[ uid ] = c;
			
			self.configuration[ uid ][ "form_id" ] = form_id;
			
			that.progressOnForm(uid);
			self._startMainComponents( uid, c);
			self.progressOn( uid );
			
			CAIRS.MAP.API.get( {
				resource: "/forms/" + form_id + "/rules",
				format: "json",
				payload: "columns="+that.model.conf_grid_rules_fields.ids+",rule_id&agency_id=" + that.configuration[that._getRawUID(uid)].agency_id + "",
				onSuccess: function (request) {
					var json = JSON.parse( request.response );
					if (json.status == "success") {
						//dhtmlx.message( {type : "error", text : json.response} );
						//that._setStatusDataTransferForm(uid, "form(" + form_id + ") hash received");
						
						CAIRS.jDBd.create({
							data_set_name : "formmaker_fields_rules"
							,data : json.formmaker_fields_rules // default []
							,primary_key : "rule_id"
						});
						
						CAIRS.jDBd.create({
							data_set_name : "formmaker_pages_rules"
							,data : json.formmaker_pages_rules // default []
							,primary_key : "rule_id"
						});
						
						
						CAIRS.jDBd.create({
							data_set_name : "formmaker_notification_rules"
							,data : json.formmaker_notification_rules // default []
							,primary_key : "rule_id"
						});
						
						
						CAIRS.jDBd.create({
							data_set_name : "formmaker_notification_rule"
							,data : json.formmaker_notification_rule // default []
							,primary_key : "notification_id"
							,onSuccess: function( ){
								
								//console.log( CAIRS.jDBd.get( { data_set_name : "formmaker_notification_rule" }) );
			
								// fill tree of notifications
								CAIRS.jDBd.get( { data_set_name : "formmaker_notification_rule" })
									.forEach( function (notification, index, array)
									{
										that.model.conf_tree_notifications.item[0].item.push( {
											id: notification.notification_id,
											text: CAIRS.strip_tags( notification.notification_name )
										} );
									});
									
								self.tree_notifications[uid].loadJSONObject(that.model.conf_tree_notifications, function () {
									//console.log(that.model.conf_tree_notifications);
								});
									
								//self.tree_notifications[uid].smartRefreshBranch("manage");
								//self.tree_notifications[uid].refreshItem(0);
								
							}
							,onFail: function( response ){
							}
						});
						
						
						
						
						self.progressOff( uid );
						
					}
					else {
						dhtmlx.message({
							type: "error",
							text: json.response
						});
						that._setStatusDataTransferForm(uid, "unable to read form rules");
						if (json.response == "token not authorized")
							that._setStatusUserForm(uid, "token expired. Please login again", false);
					}
				},
				onFail: function (request) {
					var json = JSON.parse( request.response );
					dhtmlx.message({
						type: "error",
						text: json.response
					});
					that._setStatusDataTransferForm(uid, "unable to read form rules");
					if (json.response == "token not authorized")
						that._setStatusUserForm(uid, "token expired. Please login again", false);
	
					//that.progressOffForm( uid );
				}
			} );

		}
		
		,
		/**
		 * Description
		 * @method _startMainComponents
		 * @param {} uid
		 * @param {} c
		 * @return
		 */
		_startMainComponents: function (uid, c)
		{
			var that = FormBuilder, self = this;
			self._window( uid, c );
			self._layout( uid, c );
			self._tabbar( uid, c );
			self._layout_fields( uid, c );
			self._layout_pages( uid, c );
			self._layout_notifications( uid, c );
			self._toolbar_fields( uid, c );
			self._toolbar_pages( uid, c );
			self._toolbar_notification( uid, c );
			self._toolbar_notifications( uid, c );
			self._tree_fields( uid, c );
			self._tree_pages( uid, c );
			self._tree_notifications( uid, c );
		}
		
		,
		/**
		 * Description
		 * @method _prepare_model
		 * @param {} c
		 * @return
		 */
		_prepare_model: function (c)
		{
			var that = FormBuilder,
				self = this,
				uid = c.uid;
			
			that.model.conf_tree_fields =
			{
				id: '0'
				,
				item:
				[{
					id: 'manage'
					,
					text: "Pick one field"
					,
					open: 1
					,
					select: 1
					,
					item: []
				}]
			};
			
			that.model.conf_tree_pages =
			{
				id: '0', item: 
				[{
					id: 'manage'
					,text: "Pick one page"
					,open: 1
					,select: 1
					,item: []
				}]
			};
			
			
			that.model.conf_tree_notifications =
			{
				id:'0', item:
				[{
					id: 'manage'
					,text: "Pick one notification rule"
					,open: 1
					,select: 1
					,item: []
				}]
			};
			
			that.model.conf_grid_rules_pages = {
				"headers": "target field,source field,condition,value",
				"ids": "target_id,source_id,condition,source_value",
				"widths": "0,220,120,120",
				"colaligns": "right,left,left,left",
				"coltypes": "ro,coro,coro,ro",
				"colsorting": "str,str,str,str",
				"bind_library_field": "false,false,false,false"
			};
			
			that.model.conf_grid_rules_fields = {
				"headers": "target field,source field,condition,value",
				"ids": "target_id,source_id,condition,source_value",
				"widths": "0,220,120,120",
				"colaligns": "right,left,left,left",
				"coltypes": "ro,coro,coro,ro",
				"colsorting": "str,str,str,str",
				"bind_library_field": "false,false,false,false"
			};
			
			that.model.conf_grid_rules_notifications = {
				"headers": "target field,source field,condition,value",
				"ids": "target_id,source_id,condition,source_value",
				"widths": "0,220,120,120",
				"colaligns": "right,left,left,left",
				"coltypes": "ro,coro,coro,ro",
				"colsorting": "str,str,str,str",
				"bind_library_field": "false,false,false,false"
			};
			
			
			that.model.conf_toolbar_rules =
			{
				"icon_path": "",
				"items":
				[{
					"type": "button",
					"id": "new_rule",
					"text": "create new rule",
					"img": "add_form.png",
					"img_disabled": "add_form_dis.png"
					,disabled : true
				},{
					id: "new_s1",
					type: "separator"
				},
				{
					"type": "button",
					"id": "delete_rule",
					"text": "delete selected rule",
					"img": "delete.png",
					"img_disabled": "delete_dis.png"
					,disabled : true
				}]
			};
			
			
			that.model.conf_toolbar_notification =
			{
				"icon_path": "",
				"items":
				[{
					"type": "button",
					"id": "new_notification",
					"text": "new notification",
					"img": "add.gif",
					"img_disabled": "add_dis.gif"
					,disabled : false
				},{
					id: "new_s1",
					type: "separator"
				},
				{
					"type": "button",
					"id": "delete_notification",
					"text": "delete notification",
					"img": "delete.png",
					"img_disabled": "delete_dis.png"
					,disabled : true
				}]
			};

			
			that.model.conf_toolbar_crud =
			{
				"icon_path": "",
				"items":
				[{
					"type": "button",
					"id": "save_rule",
					"text": "save rule",
					"img": "save.gif",
					"img_disabled": "save_dis.gif"
					,disabled : false
				}]
			};
			
			that.model.conf_toolbar_crud_notification =
			{
				"icon_path": "",
				"items":
				[{
					"type": "button",
					"id": "save_notification",
					"text": "save notification",
					"img": "save.gif",
					"img_disabled": "save_dis.gif"
					,disabled : false
				}]
			};
			
			
			that.model.conf_form_rules_crud =
			{
				"template":
				[{
					type: "settings",
					position: "label-left",
					labelWidth: 120,
					inputWidth: 160
				}
				,{
					type: "select",
					label: "Source field",
					name:"source_id",
					options: [], 
					tooltip : "select the source field to match rules for the target field",
					required : true
				},{
					type: "select",
					label: "condition",
					name:"condition",
					options: [
						{ value: "is", text: "Is"}
						,{ value: "is_not", text: "Is not"}
						,{ value: "begins_with", text: "Begins with"} // indexof > 0 and < value.length / 2
						,{ value: "ends_with", text: "Ends with"} // indexof > 0 and > value.length / 2
						,{ value: "contains", text: "Contains"}
						,{ value: "does_not_contain", text: "Does not contain"}
					], 
					tooltip : "select the condition to match the value",
					required : true
				},{
					type: "input", 
					name: 'source_value', 
					label: 'value', 
					value : "", 
					tooltip : "type the value to be matched by the condition",
					required : true
				}]
			};
			
			that.model.conf_form_rules_activate =
			{
				"template":
				[{
					type: "settings",
					position: "label-left",
					labelWidth: 80,
					inputWidth: 40
				}
				,{
					type: "label",
					label: "Do what?"
				}, {
					type: "radio",
					name: "rule_action",
					label: "show",
					value: "show"
				}, {
					type: "radio",
					name: "rule_action",
					label: "hide",
					value: "hide"
				}
				,{
					type: "btn2state"
					,label: "enable rules"
					,name : "rule_enable"
				}
				,{
					type: "newcolumn"
					,offset:10
				},{
					type: "label",
					label: "if it matches"
				}, {
					type: "radio",
					name: "rule_match",
					label: "all the rules",
					value: "all"
				}, {
					type: "radio",
					name: "rule_match",
					label: "any rule",
					value: "any"
				},{
					type: "button"
					,value: "save"
					,name: "save"
				}]
			};
			
			that.model.conf_window_rules_crud = {
				image_path: ""
				,viewport : "body"
				,left: 0
				,top: 0
				,width: 400
				,height: 180
				,title : "Rule properties"
				,enableAutoViewport : true
				,icon : "rules.png"
				,icon_dis : "rules_dis.png"
			};
			
			
			that.model.conf_window_rules_crud_notification = {
				image_path: ""
				,viewport : "body"
				,left: 0
				,top: 0
				,width: 340
				,height: 270
				,title : "Notifications"
				,enableAutoViewport : true
				,icon : "rules.png"
				,icon_dis : "rules_dis.png"
			};
			
			/*
			
			*/
			
			
			
			that.model.conf_form_rules_crud_notification =
			{
				"template":
				[
					{
						type: "settings",
						position: "label-left",
						labelWidth: 120,
						inputWidth: 160
					}
					,{
						type: "input", 
						name: 'notification_name', 
						label: 'notification name', 
						value : "", 
						tooltip : "type the a name to identify this rule",
						required: true, 
						validate: 'NotEmpty'
					}
					
					,{type: "label", label: "send notification if", width: 300, list:[
						{type: "settings", position: "label-top"},
						{
							type: "radio",
							name: "rule_match",
							label: "all the rules match",
							value: "all",
							checked : true
						}
						, {type: "newcolumn"}
						,{
							type: "radio",
							name: "rule_match",
							label: "any rule matches",
							value: "any"
						}
					]}
					,{
						type: "btn2state"
						,label: "enable rules"
						,name : "rule_enable",
						checked : true
					},{
						type: "input", 
						name: 'emailto', 
						label: 'email to:', 
						value : "", 
						tooltip : "type the e-mails separated by ;",
						required : true, 
						validate: 'NotEmpty'
						
					},{
						type: "select",
						label: "message template",
						name:"email_template_id",
						options: [
							{ value: "1", text: "template 1"}
						], 
						tooltip : "select the template",
						required : true
					}
				]
			};
			
			that.model.conf_form_rules_activate_notification =
			{
				"template":
				[
					{
						type: "settings",
						position: "label-left",
						labelWidth: 120,
						inputWidth: 160
					}
					,{
						type: "input", 
						name: 'notification_name', 
						label: 'notification name', 
						value : "", 
						tooltip : "type the a name to identify this rule",
						required: true, 
						validate: 'NotEmpty'
					}
					
					,{type: "label", label: "send notification if", width: 300, list:[
						{type: "settings", position: "label-top"},
						{
							type: "radio",
							name: "rule_match",
							label: "all the rules match",
							value: "all"
						}
						, {type: "newcolumn"}
						,{
							type: "radio",
							name: "rule_match",
							label: "any rule matches",
							value: "any"
						}
					]}
					,{
						type: "input", 
						name: 'emailto', 
						label: 'email to:', 
						value : "", 
						tooltip : "type the e-mails separated by ;",
						required : true, 
						validate: 'NotEmpty'
					},{
						type: "select",
						label: "message template",
						name:"email_template_id",
						options: [
							{ value: "1", text: "template 1"}
						], 
						tooltip : "select the template",
						required : true
					},{
						type: "btn2state"
						,label: "enable rules"
						,name : "rule_enable"
					},{
						type: "button"
						,value: "save"
						,name: "save"
					}
				]
			};
			
			that.model.conf_window_rules.image_path = that.icons_path;
			that.model.conf_window_rules.left = CAIRS.getPagePosition( 
				"x"
				,that.model.conf_window_rules.width
				,that.model.conf_window_rules.height
			);
			that.model.conf_window_rules.top = CAIRS.getPagePosition(
				"y"
				,that.model.conf_window_rules.width
				,that.model.conf_window_rules.height
			);
			
			that.model.conf_window_rules_crud.image_path = that.icons_path;
			that.model.conf_window_rules_crud.left = CAIRS.getPagePosition(
				"x"
				,that.model.conf_window_rules_crud.width
				,that.model.conf_window_rules_crud.height
			);
			that.model.conf_window_rules_crud.top = CAIRS.getPagePosition( 
				"y"
				,that.model.conf_window_rules_crud.width
				,that.model.conf_window_rules_crud.height 
			);
			
			
			
			
			
			
			that.model.conf_window_rules_crud_notification.image_path = that.icons_path;
			that.model.conf_window_rules_crud_notification.left = CAIRS.getPagePosition(
				"x"
				,that.model.conf_window_rules_crud_notification.width
				,that.model.conf_window_rules_crud_notification.height
			);
			that.model.conf_window_rules_crud_notification.top = CAIRS.getPagePosition( 
				"y"
				,that.model.conf_window_rules_crud_notification.width
				,that.model.conf_window_rules_crud_notification.height 
			);
			
			
			
			that.model.conf_tabbar_rules.image_path = that.model.globalImgPath;
			that.model.conf_toolbar_rules.icon_path = that.icons_path + "32px/";
			that.model.conf_toolbar_notification.icon_path = that.icons_path;
			that.model.conf_toolbar_crud.icon_path = that.icons_path;
			that.model.conf_toolbar_crud_notification.icon_path = that.icons_path;
			
			// fill tree of fiels
			that.metaparser._getAllFields( uid )
				.forEach( function (field, index, array)
				{
					that.model.conf_tree_fields.item[0].item.push( {
						id: field.field_id,
						text: CAIRS.strip_tags( field.label )
					} );
				});
			
			// fill tree of pages
			that.metaparser._getAllPages( uid )
				.forEach( function (page, index, array)
				{
					that.model.conf_tree_pages.item[0].item.push( {
						id: page.page_id,
						text: CAIRS.strip_tags( page.label )
					} );
				});
			
			
			
				
		}
		
		,
		/**
		 * Description
		 * @method _window
		 * @param {} uid
		 * @return
		 */
		_window: function (uid) {
			var that = FormBuilder, self = this;
			if (that.window_manager === null)
				that._window_manager();
				
			if ( that.window_manager.isWindow( that.appName + "_rules_" + uid ) )
			{
				self.window[uid].show();
				self.window[uid].bringToTop();
				//self.window[ uid ].centerOnScreen();
				return;
			}
	
			self.window[uid] = that.window_manager.createWindow(that.appName + "_rules_" + uid, that.model.conf_window.left + 10, that.model.conf_window.top + 10, that.model.conf_window_rules.width, that.model.conf_window_rules.height);
			self.window[uid].setText(that.model.conf_window_rules.title);
			self.window[uid].setIcon(that.model.conf_window_rules.icon, that.model.conf_window_rules.icon_dis);
			//self.window[ uid ].centerOnScreen();
			self.window[uid].denyPark();
			self.window[uid].attachEvent("onClose", function (win) {
				
				try
				{
					self.window_crud[uid].close();
				}catch(e)
				{
					
				}
				
				that.progressOffForm(uid);
				return true;
				
				//win.hide();
				//that.close_window( uid );
			});
			self.window[uid].attachStatusBar();
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
			self.layout[uid] = self.window[ uid ].attachLayout("1C");
			self.layout[uid].cells("a").hideHeader();
			//self.layout[uid].cells("b").hideHeader();	
		}
		
		,
		/**
		 * Description
		 * @method _tabbar
		 * @param {} uid
		 * @return
		 */
		_tabbar: function (uid, c) {
			var that = FormBuilder, self = this;
			self.tabbar[uid] = self.layout[uid].cells("a").attachTabbar();
			self.tabbar[uid].setSkin('dhx_skyblue');
			self.tabbar[uid].setImagePath(that.model.conf_tabbar_rules.image_path); // self.application_path
			self.tabbar[uid].enableScroll(true);
			self.tabbar[uid].addTab("fields", "Enable Rules to Show/Hide Fields", "250px");
			self.tabbar[uid].addTab("pages", "Enable Rules to Skip Pages", "200px");
			self.tabbar[uid].addTab("notifications", "Enable Rules to Send Notification Emails ", "300px");
			self.tabbar[uid].setTabActive("fields");
			self.tabbar[uid].attachEvent("onSelect", function (idd, last_id) {
				self.window[uid].setText(that.model.conf_window_rules.title + " - " + self.tabbar[uid].getLabel(idd));
				return true;
			});
		}
		
		,
		/**
		 * Description
		 * @method _toolbar_fields
		 * @param {} uid
		 * @return
		 */
		_toolbar_fields: function (uid) {
			var that = FormBuilder, self = this;
			self.toolbar_fields[uid] = self.layout_fields[uid].cells("b").attachToolbar(that.model.conf_toolbar_rules);
			self.toolbar_fields[uid].setIconSize(32);
			self.toolbar_fields[uid].attachEvent("onClick", function (id) {
				if (id == "new_rule") {
					
					self._mount_rule_input_form( uid, self.tree_fields[uid].getSelectedItemId(), "field" );
				}
				else if (id == "delete_rule") {
					
					var field_id = self.tree_fields[uid].getSelectedItemId()
						,rule_id =  self.grid_fields[uid].getSelectedRowId()
						,form_id = that.form_properties[uid].getItemValue("form_id")
						,page_id = that.metaparser._getField( uid, field_id ).page_id;
					
					self.progressOn(uid);
					
					CAIRS.jDBd.del( { 
						data_set_name :"formmaker_fields_rules"
						,record_id : rule_id
						,api_resource: "/forms/" + form_id + "/pages/" + page_id + "/fields/" + field_id + "/rules/" + rule_id
						,api_payload: "agency_id=" + that.configuration[that._getRawUID(uid)].agency_id
						,onSuccess: function( record_id ){
							that._setStatusDataTransferForm(uid, "rule(" + record_id + ") deleted");
							self.grid_fields[uid].deleteRow(record_id);
							self.toolbar_fields[uid].disableItem("delete_rule");
							self.progressOff(uid);
						}
						,onFail: function( response ){
							that._setStatusDataTransferForm(uid, response);
							self.progressOff(uid);
						}
					} );
				}
			});
		}
		
		,
		/**
		 * Description
		 * @method _toolbar_pages
		 * @param {} uid
		 * @return
		 */
		_toolbar_pages: function (uid) {
			var that = FormBuilder, self = this;
			self.toolbar_pages[uid] = self.layout_pages[uid].cells("b").attachToolbar(that.model.conf_toolbar_rules);
			self.toolbar_pages[uid].setIconSize(32);
			self.toolbar_pages[uid].attachEvent("onClick", function (id) {
				if (id == "new_rule") {
					
					self._mount_rule_input_form( uid, self.tree_pages[uid].getSelectedItemId(), "page" );
				}
				else if (id == "delete_rule") {
					
					//self._delete_field_rule(uid, self.tree_fields[uid].getSelectedItemId(), self.grid_fields[uid].getSelectedRowId());
					
					var page_id = self.tree_pages[uid].getSelectedItemId()
						,rule_id =  self.grid_pages[uid].getSelectedRowId()
						,form_id = that.form_properties[uid].getItemValue("form_id");
					
					self.progressOn(uid);
					
					CAIRS.jDBd.del( { 
						data_set_name :"formmaker_pages_rules"
						,record_id : rule_id
						,api_resource: "/forms/" + form_id + "/pages/" + page_id + "/rules/" + rule_id
						,api_payload: "agency_id=" + that.configuration[that._getRawUID(uid)].agency_id
						,onSuccess: function( record_id ){
							that._setStatusDataTransferForm(uid, "rule(" + record_id + ") deleted");
							self.grid_pages[uid].deleteRow(record_id);
							self.toolbar_pages[uid].disableItem("delete_rule");
							self.progressOff(uid);
						}
						,onFail: function( response ){
							self.progressOff(uid);
						}
					} );
				}
			});
		}
		
		,
		/**
		 * Description
		 * @method _toolbar_notification
		 * @param {} uid
		 * @return
		 */
		_toolbar_notification: function (uid) {
			var that = FormBuilder, self = this;
			self.toolbar_notification[uid] = self.layout_notifications[uid].cells("a").attachToolbar(that.model.conf_toolbar_notification);
			self.toolbar_notification[uid].attachEvent("onClick", function (id) {
				if (id == "new_notification")
				{
					self._mount_notification_input_form( uid );
				}
				else if (id == "delete_notification") {
					
					var notification_id = self.tree_notifications[uid].getSelectedItemId()
						,form_id = that.form_properties[uid].getItemValue("form_id");
					
					self.progressOn(uid);
					self.toolbar_notification[uid].disableItem("delete_notification");
					
					CAIRS.jDBd.del( { 
						data_set_name :"formmaker_notification_rule"
						,record_id : notification_id
						,api_resource: "/forms/" + form_id + "/notifications/" + notification_id
						,api_payload: "agency_id=" + that.configuration[that._getRawUID(uid)].agency_id
						,onSuccess: function( record_id ){
							try
							{
								that._setStatusDataTransferForm(uid, "notification(" + record_id + ") deleted");
								self.tree_notifications[uid].deleteItem(record_id,true);								
								self.progressOff(uid);
							}catch(e)
							{
								//console.log(e.stack);	
							}
						}
						,onFail: function( response ){
							self.progressOff(uid);
							self.toolbar_notification[uid].enableItem("delete_notification");
						}
					} );
				}
			});
		}
		
		
		,
		/**
		 * Description
		 * @method _toolbar_notifications
		 * @param {} uid
		 * @return
		 */
		_toolbar_notifications: function (uid) {
			var that = FormBuilder, self = this;
			self.toolbar_notifications[uid] = self.layout_notifications[uid].cells("b").attachToolbar(that.model.conf_toolbar_rules);
			self.toolbar_notifications[uid].setIconSize(32);
			self.toolbar_notifications[uid].attachEvent("onClick", function (id) {
				if (id == "new_rule") {
					
					self._mount_rule_input_form( uid, self.tree_notifications[uid].getSelectedItemId(), "notification" );
				}
				else if (id == "delete_rule") {
					
					var notification_id = self.tree_notifications[uid].getSelectedItemId()
						,rule_id =  self.grid_notifications[uid].getSelectedRowId()
						,form_id = that.form_properties[uid].getItemValue("form_id");
					
					self.progressOn(uid);
					
					CAIRS.jDBd.del( { 
						data_set_name :"formmaker_notification_rules"
						,record_id : rule_id
						,api_resource: "/forms/" + form_id + "/notifications/" + notification_id + "/rules/" + rule_id
						,api_payload: "agency_id=" + that.configuration[that._getRawUID(uid)].agency_id
						,onSuccess: function( record_id ){
							that._setStatusDataTransferForm(uid, "rule(" + record_id + ") deleted");
							self.grid_notifications[uid].deleteRow(record_id);
							self.toolbar_notifications[uid].disableItem("delete_rule");
							self.progressOff(uid);
						}
						,onFail: function( response ){
							that._setStatusDataTransferForm(uid, response);
							self.progressOff(uid);
						}
					} );
				}
			});
		}
		
		,
		/**
		 * Description
		 * @method _layout_fields
		 * @param {} uid
		 * @return
		 */
		_layout_fields: function (uid) {
			var self = this;
			self.layout_fields[uid] = self.tabbar[uid].cells("fields").attachLayout("3J");
			self.layout_fields[uid].cells("a").hideHeader();
			self.layout_fields[uid].cells("a").setWidth(240);
			self.layout_fields[uid].cells("b").hideHeader();
			self.layout_fields[uid].cells("c").setText("Set the action for the selected field");
			self.layout_fields[uid].cells("c").setHeight(140);
			self.layout_fields[uid].cells("c").collapse();
		}
		
		
		,
		/**
		 * Description
		 * @method _layout_pages
		 * @param {} uid
		 * @return
		 */
		_layout_pages: function (uid) {
			var self = this;
			self.layout_pages[uid] = self.tabbar[uid].cells("pages").attachLayout("3J");
			self.layout_pages[uid].cells("a").hideHeader();
			self.layout_pages[uid].cells("a").setWidth(240);
			self.layout_pages[uid].cells("b").hideHeader();
			self.layout_pages[uid].cells("c").setText("Set the action for the selected page");
			self.layout_fields[uid].cells("c").setHeight(140);
			self.layout_pages[uid].cells("c").collapse();
		}
		
		,
		/**
		 * Description
		 * @method _layout_notifications
		 * @param {} uid
		 * @return
		 */
		_layout_notifications: function (uid) {
			var self = this;
			self.layout_notifications[uid] = self.tabbar[uid].cells("notifications").attachLayout("3J");
			self.layout_notifications[uid].cells("a").hideHeader();
			self.layout_notifications[uid].cells("a").setWidth(300);
			self.layout_notifications[uid].cells("b").hideHeader();
			self.layout_notifications[uid].cells("c").setText("Set the action and hit save");
			self.layout_notifications[uid].cells("c").setHeight(230);
			self.layout_notifications[uid].cells("c").collapse();
		}
		
		,
		/**
		 * Description
		 * @method _tree_fields
		 * @param {} uid
		 * @return
		 */
		_tree_fields: function (uid, c) {
			var that = FormBuilder, self = this;
			self.tree_fields[uid] = self.layout_fields[uid].cells("a").attachTree();
			self.tree_fields[uid].setSkin(that.model.globalSkin);
			self.tree_fields[uid].setImagePath(that.dhtmlx_codebase_path + "imgs/csh_bluebooks/");
			self.tree_fields[uid].enableTreeImages(true);
			self.tree_fields[uid].enableTreeLines(true);
			self.tree_fields[uid].enableTextSigns(true);
			//self.tree_fields[uid].enableCheckBoxes(true, false);
			self.tree_fields[uid].loadJSONObject(
				that.model.conf_tree_fields, function () {
				//console.log(that.model.conf_tree_fields);
			});
			self.tree_fields[uid].attachEvent("onClick", function (item_id, oldSelecteditem_id) {
				self._mount_fields_interface( uid, item_id, c );
			});
			
			/*self.tree_fields[uid].attachEvent("onCheck", function (item_id, state) {
				if (item_id == "manage")
					return;
				//console.log("not returned");
			});*/
		}
		
		,
		/**
		 * Description
		 * @method _tree_pages
		 * @param {} uid
		 * @param {} c
		 * @return
		 */
		_tree_pages: function (uid, c) {
			var that = FormBuilder, self = this;
			self.tree_pages[uid] = self.layout_pages[uid].cells("a").attachTree();
			self.tree_pages[uid].setSkin(that.model.globalSkin);
			self.tree_pages[uid].setImagePath(that.dhtmlx_codebase_path + "imgs/csh_bluebooks/");
			self.tree_pages[uid].enableTreeImages(true);
			self.tree_pages[uid].enableTreeLines(true);
			self.tree_pages[uid].enableTextSigns(true);
			//self.tree_pages[uid].enableCheckBoxes(true, false);
			self.tree_pages[uid].loadJSONObject(that.model.conf_tree_pages, function () {
				//console.log(that.model.conf_tree_pages);
			});
	
			self.tree_pages[uid].attachEvent("onClick", function (item_id, oldSelecteditem_id) {
				self._mount_pages_interface( uid, item_id, c );
			});
			
			/*self.tree_pages[uid].attachEvent("onCheck", function (item_id, state) {
				if (item_id == "manage")
					return;
				//console.log("not returned");
			});*/
		}
		
		
		,
		/**
		 * Description
		 * @method _tree_notifications
		 * @param {} uid
		 * @param {} c
		 * @return
		 */
		_tree_notifications: function (uid, c) {
			var that = FormBuilder, self = this;
			self.tree_notifications[uid] = self.layout_notifications[uid].cells("a").attachTree();
			self.tree_notifications[uid].setSkin(that.model.globalSkin);
			self.tree_notifications[uid].setImagePath(that.dhtmlx_codebase_path + "imgs/csh_bluebooks/");
			self.tree_notifications[uid].enableTreeImages(true);
			self.tree_notifications[uid].enableTreeLines(true);
			self.tree_notifications[uid].enableTextSigns(true);
			//self.tree_notifications[uid].enableCheckBoxes(true, false);	
			//self.tree_notifications[uid].loadJSONObject(that.model.conf_tree_notifications, function () {
				//console.log(that.model.conf_tree_notifications);
			//});
	
			self.tree_notifications[uid].attachEvent("onClick", function (item_id, oldSelecteditem_id) {
				self._mount_notifications_interface( uid, item_id, c );
			});
			
			/*self.tree_notifications[uid].attachEvent("onCheck", function (item_id, state) {
				if (item_id == "manage")
					return;
				//console.log("not returned");
			});*/
		}
		
		
		,
		/**
		 * Description - edit the form 
		 * @method _form_fields
		 * @param {} uid
		 * @param {} item_id
		 * @return
		 */
		_form_fields: function (uid, item_id) {
			var that = FormBuilder, self = this;
			self.form_fields[uid] = self.layout_fields[uid].cells("c").attachForm(that.model.conf_form_rules_activate.template);
			self.form_fields[uid].attachEvent("onButtonClick", function(id){
				if( id == "save" )
				{
					var hash = this.getFormData();
					hash["rule_enable"] == true ? hash["rule_enable"] = 1 : hash["rule_enable"] = 0;
					//hash["field_id"] = item_id;
					
					var page_id = that.metaparser._getField( uid, item_id ).page_id;
					
					var field_hash = that.metaparser._getPageField(uid, page_id, item_id);
					
					//console.log("hash to send before  --------------");
					//console.log( field_hash );
					//console.log("memory before  --------------");
					//console.log(  that.metaparser._getPageField(uid, field_hash.page_id, item_id) );
					
					for(i in hash)
						if (hash.hasOwnProperty(i))
							field_hash[ i ] = hash [ i ];
					
					var type_MAP_standard = field_hash["type_standard"]; // letter
					var type_DHTMLX_standard = field_hash["type"]; // valid field type
					
					//field_hash["type"] = type_MAP_standard;
					//field_hash["type_standard"] = type_DHTMLX_standard;
					
					//console.log("hash to send after  --------------");
					//console.log( field_hash );
					
					self.progressOn( uid );
					that.data._editFieldOfAPage(uid, field_hash, function () {
						//console.log(field_hash.page_id);
						//that.metaparser._getPageField(uid, field_hash.page_id, item_id)["type"] = type_DHTMLX_standard;
						that.metaparser._getPageField(uid, field_hash.page_id, item_id)["type_standard"] = type_MAP_standard;
						
						//console.log("memory after  --------------");
						//console.log(  that.metaparser._getPageField(uid, field_hash.page_id, item_id) );
						
						self.progressOff( uid );
					});
						
					
				}
			});
		}
		
		
		,
		/**
		 * Description - edit the form 
		 * @method _form_pages
		 * @param {} uid
		 * @return
		 */
		_form_pages: function (uid, item_id) {
			var that = FormBuilder, self = this;
			self.form_pages[uid] = self.layout_pages[uid].cells("c").attachForm(that.model.conf_form_rules_activate.template);
			self.form_pages[uid].attachEvent("onButtonClick", function(id){
				if( id == "save" )
				{
					var hash = this.getFormData()
						,page_id = item_id
						,page_hash = that.pages[uid][item_id]
						,form_id = self.configuration[ uid ][ "form_id" ];
						
					hash["rule_enable"] == true ? hash["rule_enable"] = 1 : hash["rule_enable"] = 0;
					
					for(i in hash)
						if (hash.hasOwnProperty(i))
							page_hash[ i ] = hash [ i ];
							
					page_hash["uid"] = uid;
					page_hash["tab_width"] = page_hash["tab_width"].replace(/px/gi,"");

					
					self.progressOn( uid );
					that.data._editPage(page_hash, function () {
						self.progressOff( uid );
					}, form_id);

				}
			});
		}
		
		
		,
		/**
		 * Description - edit the form 
		 * @method _form_notifications
		 * @param {} uid

		 * @return
		 */
		_form_notifications: function (uid, c) {
			var that = FormBuilder, self = this;
			self.form_notifications[uid] = self.layout_notifications[uid].cells("c").attachForm(that.model.conf_form_rules_activate_notification.template);
			CAIRS.dhtmlx.prepareForm(uid + "rules_form_notifications", that.model.conf_form_rules_activate_notification, self.form_notifications[uid]);
			self.form_notifications[uid].attachEvent("onButtonClick", function(id){	
				if( id == "save" )
				{
					var hash = this.getFormData()
						,notification_id = self.tree_notifications[uid].getSelectedItemId()
						,form_id = self.configuration[ uid ][ "form_id" ];
						
					hash["rule_enable"] == true ? hash["rule_enable"] = 1 : hash["rule_enable"] = 0;
					
					hash["notification_id"] = notification_id;
					hash["form_id"] = form_id;
					
					if (CAIRS.dhtmlx.validateForm(uid + "rules_form_notifications", self.form_notifications[uid])) {
						self.progressOn( uid );
						CAIRS.jDBd.update({ 
							data_set_name: "formmaker_notification_rule"
							, record_id: notification_id
							, record: hash
							, api_resource: "/forms/" + form_id + "/notifications/" + notification_id
							, api_payload: "agency_id=" + that.configuration[that._getRawUID(uid)].agency_id + "&hash=" + JSON.stringify(hash)
							, onSuccess: function( record_id ){
								that._setStatusDataTransferForm(uid, "notification "+record_id+" updated");
								try
								{
									self.tree_notifications[uid].setItemText(notification_id, hash["notification_name"], hash["notification_name"]);
									self.progressOff( uid );
									
								}catch(e)
								{
									//console.log( e.stack );
								}
							}
							,onFail: function( response ){
								that._setStatusDataTransferForm(uid, response);
								self.progressOff( uid );
							}
						 });
					}
				}
			});
		}
		
		,
		/**
		 * Description
		 * @method _grid_fields
		 * @param {} uid
		 * @return
		 */
		_grid_fields: function (uid, item_id) {
			var that = FormBuilder, self = this;
			self.grid_fields[uid] = self.layout_fields[uid].cells("b").attachGrid(that.model.conf_grid_rules_fields);
			self.grid_fields[uid].setHeader(that.model.conf_grid_rules_fields.headers);
			self.grid_fields[uid].setColumnIds(that.model.conf_grid_rules_fields.ids);
			self.grid_fields[uid].setInitWidths(that.model.conf_grid_rules_fields.widths);
			self.grid_fields[uid].setColAlign(that.model.conf_grid_rules_fields.colaligns);
			self.grid_fields[uid].setColTypes(that.model.conf_grid_rules_fields.coltypes);
			self.grid_fields[uid].setColSorting(that.model.conf_grid_rules_fields.colsorting);
			self.grid_fields[uid].selMultiRows = true;
			self.grid_fields[uid].setDateFormat("%m-%d-%Y");
			self.grid_fields[uid].init();
			
			var field_combo = self.grid_fields[uid].getCombo( self.grid_fields[uid].getColIndexById("source_id") );
			that.metaparser._getAllFields( uid )
				.forEach( function (field, index, array)
				{
					field_combo.put( field.field_id, CAIRS.strip_tags( field.label ) );
				});
			
			var condition_combo = self.grid_fields[uid].getCombo( self.grid_fields[uid].getColIndexById("condition") );	
			that.model.conf_form_rules_crud.template[2].options
				.forEach( function (condition, index, array)
				{
					condition_combo.put( condition.value, condition.text );
				});
			
	
			self.grid_fields[uid].attachEvent("onRowSelect", function (id, ind)
			{
				self.toolbar_fields[uid].enableItem("delete_rule");
			});
	
			self.grid_fields[uid].attachEvent("onRowDblClicked", function (id, ind) {
				
			});
	
			self.grid_fields[uid].attachEvent("onKeyPress", function (code, cFlag, sFlag) {
				if (code == 46) {
					//self.data._deleteForm(uid);
				}
				return true;
			});
	
			self.grid_fields[uid].attachEvent("onEnter", function (id, ind) {
				
				return true;
			});
			
			//console.log("fields data");
			//console.log(CAIRS.jDBd.getDataForGrid({ data_set_name :"formmaker_fields_rules", filter : { "target_id": item_id}}));
			
			self.grid_fields[uid].parse( CAIRS.jDBd.getDataForGrid({ data_set_name :"formmaker_fields_rules", filter : { "target_id": item_id}}), "json" );
		}
		
		,
		/**
		 * Description
		 * @method _grid_pages
		 * @param {} uid
		 * @return
		 */
		_grid_pages: function (uid, item_id) {
			var that = FormBuilder, self = this;
			self.grid_pages[uid] = self.layout_pages[uid].cells("b").attachGrid(that.model.conf_grid_rules_pages);
			self.grid_pages[uid].setHeader(that.model.conf_grid_rules_pages.headers);
			self.grid_pages[uid].setColumnIds(that.model.conf_grid_rules_pages.ids);
			self.grid_pages[uid].setInitWidths(that.model.conf_grid_rules_pages.widths);
			self.grid_pages[uid].setColAlign(that.model.conf_grid_rules_pages.colaligns);
			self.grid_pages[uid].setColTypes(that.model.conf_grid_rules_pages.coltypes);
			self.grid_pages[uid].setColSorting(that.model.conf_grid_rules_pages.colsorting);
			self.grid_pages[uid].selMultiRows = true;
			self.grid_pages[uid].setDateFormat("%m-%d-%Y");
			self.grid_pages[uid].init();
			
			var field_combo = self.grid_pages[uid].getCombo( self.grid_pages[uid].getColIndexById("source_id") );
			that.metaparser._getAllFields( uid )
				.forEach( function (field, index, array)
				{
					field_combo.put( field.field_id, CAIRS.strip_tags( field.label ) );
				});
			
			var condition_combo = self.grid_pages[uid].getCombo( self.grid_pages[uid].getColIndexById("condition") );	
			that.model.conf_form_rules_crud.template[2].options
				.forEach( function (condition, index, array)
				{
					condition_combo.put( condition.value, condition.text );
				});
	
			self.grid_pages[uid].attachEvent("onRowSelect", function (id, ind) {
				self.toolbar_pages[uid].enableItem("delete_rule");
			});
	
			self.grid_pages[uid].attachEvent("onRowDblClicked", function (id, ind) {
				
			});
	
			self.grid_pages[uid].attachEvent("onKeyPress", function (code, cFlag, sFlag) {
				if (code == 46) {
					//self.data._deleteForm(uid);
				}
				return true;
			});
	
			self.grid_pages[uid].attachEvent("onEnter", function (id, ind) {
				
				return true;
			});
			
			self.grid_pages[uid].parse( CAIRS.jDBd.getDataForGrid({ data_set_name :"formmaker_pages_rules", filter : { "target_id": item_id}}), "json" );
		}
		
		,
		/**
		 * Description
		 * @method _grid_notifications
		 * @param {} uid
		 * @return
		 */
		_grid_notifications: function (uid, item_id) {
			var that = FormBuilder, self = this;
			self.grid_notifications[uid] = self.layout_notifications[uid].cells("b").attachGrid(that.model.conf_grid_rules_notifications);
			self.grid_notifications[uid].setHeader(that.model.conf_grid_rules_notifications.headers);
			self.grid_notifications[uid].setColumnIds(that.model.conf_grid_rules_notifications.ids);
			self.grid_notifications[uid].setInitWidths(that.model.conf_grid_rules_notifications.widths);
			self.grid_notifications[uid].setColAlign(that.model.conf_grid_rules_notifications.colaligns);
			self.grid_notifications[uid].setColTypes(that.model.conf_grid_rules_notifications.coltypes);
			self.grid_notifications[uid].setColSorting(that.model.conf_grid_rules_notifications.colsorting);
			self.grid_notifications[uid].selMultiRows = true;
			self.grid_notifications[uid].setDateFormat("%m-%d-%Y");
			self.grid_notifications[uid].init();
			
			var field_combo = self.grid_notifications[uid].getCombo( self.grid_notifications[uid].getColIndexById("source_id") );
			that.metaparser._getAllFields( uid )
				.forEach( function (field, index, array)
				{
					
					field_combo.put( field.field_id, CAIRS.strip_tags( field.label ) );
				});
			
			var condition_combo = self.grid_notifications[uid].getCombo( self.grid_notifications[uid].getColIndexById("condition") );	
			that.model.conf_form_rules_crud.template[2].options
				.forEach( function (condition, index, array)
				{
					
					condition_combo.put( condition.value, condition.text );
				});
	
			self.grid_notifications[uid].attachEvent("onRowSelect", function (id, ind) {
				self.toolbar_notifications[uid].enableItem("delete_rule");
			});
	
			self.grid_notifications[uid].attachEvent("onRowDblClicked", function (id, ind) {
				
			});
	
			self.grid_notifications[uid].attachEvent("onKeyPress", function (code, cFlag, sFlag) {
				if (code == 46) {
					//self.data._deleteForm(uid);
				}
				return true;
			});
	
			self.grid_notifications[uid].attachEvent("onEnter", function (id, ind) {
				
				return true;
			});
			
			self.grid_notifications[uid].parse( CAIRS.jDBd.getDataForGrid({ data_set_name :"formmaker_notification_rules", filter : { "target_id": item_id}}), "json" );
		}
		
		
		/* helpers */
		
		,
		/**
		 * Description
		 * @method _window
		 * @param {} uid
		 * @return
		 */
		_window_crud : function (uid, item_id, rule_type, isEditing) {
			var that = FormBuilder, self = this;
			if (that.window_manager === null)
				that._window_manager();
					
			self.window_crud[uid] = that.window_manager.createWindow(
				that.appName + "_rules_crud_" + uid
				,
				that.model.conf_window_rules_crud.left
				,
				that.model.conf_window_rules_crud.top
				,
				that.model.conf_window_rules_crud.width
				,
				that.model.conf_window_rules_crud.height
			);
			self.window_crud[uid].setText(that.model.conf_window_rules_crud.title + " - " + ( (isEditing) ? "edit" : "create"  ) + " rule for the " + rule_type + " " + item_id);
			self.window_crud[uid].setIcon(that.model.conf_window_rules_crud.icon, that.model.conf_window_rules_crud.icon_dis);
			self.window_crud[uid].denyPark();
	
			self.window_crud[uid].attachEvent("onClose", function (win) {
				self.progressOff( uid );
				return true;
				//win.hide();
				//that.close_window( uid );
			});
			self.window_crud[uid].attachStatusBar();
		}
		
		
		,
		/**
		 * Description
		 * @method _form_crud
		 * @param {} uid
		 * @return
		 */
		_form_crud: function (uid, item_id, rule_type, isEditing) {
			var that = FormBuilder, self = this;
			//console.log(rule_type)
			self.form_crud[uid] = self.window_crud[uid].attachForm(that.model.conf_form_rules_crud.template);
			CAIRS.dhtmlx.prepareForm(uid + "rules_form_crud", that.model.conf_form_rules_crud, self.form_crud[uid]);
			
			
		}
		
		,
		/**
		 * Description
		 * @method _toolbar_crud
		 * @param {} uid
		 * @return
		 */
		_toolbar_crud: function ( uid, item_id, rule_type, isEditing) { // item_id, rule_type, isEditing
			var that = FormBuilder, self = this;
			self.toolbar_crud[uid] = self.window_crud[uid].attachToolbar(that.model.conf_toolbar_crud);
			self.toolbar_crud[uid].attachEvent("onClick", function (id) {
				if (id == "save_rule")
				{
					self._save_rule( uid, item_id, rule_type, isEditing );
				}
			});
		}
		
		
		
		,_save_rule: function( uid, item_id, rule_type, isEditing ){
			var that = FormBuilder
				,self = this
				,hash = self.form_crud[uid].getFormData()
				,form_id = self.configuration[ uid ][ "form_id" ]
				,data = [];
			
			hash["form_id"] = form_id;
			hash["target_id"] = item_id; // target_id is  field_id or page_id
			
			//console.log( hash );

			data.push(hash["target_id"]);
			data.push(hash["source_id"]);
			data.push(hash["condition"]);
			data.push(hash["source_value"]);
			hash["data"] = data;
			
			self.form_crud[uid].lock();
			self.progressOn( uid );
			that._setStatusDataTransferForm(uid, "sending rule hash", true);
			
			if( rule_type == 'field' )
			{
				var page_id = that.metaparser._getField( uid, item_id ).page_id;
				CAIRS.jDBd.insert({ 
					data_set_name :"formmaker_fields_rules"
					, record : hash
					, api_resource: "/forms/" + form_id + "/pages/" + page_id + "/fields/" + item_id + "/rules"
					, api_payload: "agency_id=" + that.configuration[that._getRawUID(uid)].agency_id + "&hash=" + JSON.stringify(hash)
					, onSuccess: function( record_id ){
						that._setStatusDataTransferForm(uid, "new field rule saved: " + record_id);
						try
						{
							self.grid_fields[uid].addRow( record_id, data);
						}catch(e)
						{
							//console.log( e.stack );
						}
						self.window_crud[uid].close();
						self.form_crud[uid].unlock();
						self.progressOff( uid );
					}
					,onFail: function( response ){
						that._setStatusDataTransferForm(uid, response);
						self.progressOff( uid );
					}
				 });
			}
			else if( rule_type == 'page' )
			{
				var page_id = item_id;
				CAIRS.jDBd.insert({ 
					data_set_name :"formmaker_pages_rules"
					, record : hash
					, api_resource: "/forms/" + form_id + "/pages/" + page_id + "/rules"
					, api_payload: "agency_id=" + that.configuration[that._getRawUID(uid)].agency_id + "&hash=" + JSON.stringify(hash)
					, onSuccess: function( record_id ){
						that._setStatusDataTransferForm(uid, "new page rule saved: " + record_id);
						try
						{
							self.grid_pages[uid].addRow( record_id, data);
						}catch(e)
						{
							//console.log( e.stack );
						}
						self.window_crud[uid].close();
						self.form_crud[uid].unlock();
						self.progressOff( uid );
					}
					,onFail: function( response ){
						that._setStatusDataTransferForm(uid, response);
						self.progressOff( uid );
					}
				 });
			}
			else if( rule_type == 'notification' )
			{
				data.push(hash["emailto"]);
				data.push(hash["email_template_id"]);
				hash["data"] = data;

				CAIRS.jDBd.insert({ 
					data_set_name :"formmaker_notification_rules"
					, record : hash
					, api_resource: "/forms/" + form_id + "/notifications/" + item_id + "/rules"
					, api_payload: "agency_id=" + that.configuration[that._getRawUID(uid)].agency_id + "&hash=" + JSON.stringify(hash)
					, onSuccess: function( record_id ){
						try
						{
							that._setStatusDataTransferForm(uid, "new notification rule saved: " + record_id);
							self.grid_notifications[uid].addRow( record_id, data);
							self.window_crud[uid].close();
							self.form_crud[uid].unlock();
							self.progressOff( uid );
						}catch(e)
						{
							//console.log( e.stack );
						}
					}
					,onFail: function( response ){
						that._setStatusDataTransferForm(uid, response);
						self.progressOff( uid );
					}
				 });
			}
		}
		
		
		,
		/**
		 * Description
		 * @method _mount_rule_input_form
		 * @param {} uid
		 * @return
		 */
		_mount_rule_input_form: function (uid, item_id, rule_type, isEditing) {
			var that = FormBuilder, self = this, isEditing = isEditing || false, rule_type = rule_type || "field";
			self.progressOn( uid );
			self._window_crud( uid, item_id, rule_type, isEditing );
			self._toolbar_crud( uid, item_id, rule_type, isEditing )
			
			
			that.model.conf_form_rules_crud.template[1].options = [];
			
			
			that.metaparser._getAllFields( uid )
				.forEach( function (field, index, array)
				{
					if( parseInt(field.field_id) != parseInt(item_id) )
					{
						/*//console.log("----------");
						//console.log(field.field_id);
						var place = true;
						self.grid_fields[uid].forEachRow(function(row_id)
						{
							var source_id = self.grid_fields[uid].cells(row_id, self.grid_fields[uid].getColIndexById("source_id")).getValue();
							//console.log("----");
							//console.log(field.field_id);
							//console.log(source_id);
							//console.log("----------");
							if( parseInt(field.field_id) == parseInt(source_id) )
								place = false;	
						});	
						if( place )*/
							that.model.conf_form_rules_crud.template[1].options.push( {
								value: field.field_id,
								text: CAIRS.strip_tags( field.label )
							} );
							
					}
				});
			
			self._form_crud( uid, item_id, rule_type, isEditing );
			
		}
		
		,
		/**
		 * Description
		 * @method _window_crud_notification
		 * @param {} uid
		 * @return
		 */
		_window_crud_notification : function (uid, isEditing) {
			var that = FormBuilder, self = this;
			if (that.window_manager === null)
				that._window_manager();
					
			self.window_crud_notification[uid] = that.window_manager.createWindow(
				that.appName + "_rules_crud_notification_" + uid
				,
				that.model.conf_window_rules_crud_notification.left
				,
				that.model.conf_window_rules_crud_notification.top
				,
				that.model.conf_window_rules_crud_notification.width
				,
				that.model.conf_window_rules_crud_notification.height
			);
			self.window_crud_notification[uid].setText(that.model.conf_window_rules_crud_notification.title + " - " + ( (isEditing) ? "edit" : "create"  ) + " notification ");
			self.window_crud_notification[uid].setIcon(that.model.conf_window_rules_crud_notification.icon, that.model.conf_window_rules_crud_notification.icon_dis);
			self.window_crud_notification[uid].denyPark();
	
			self.window_crud_notification[uid].attachEvent("onClose", function (win) {
				self.progressOff( uid );
				return true;
				//win.hide();
				//that.close_window( uid );
			});
			self.window_crud_notification[uid].attachStatusBar();
		}
		
		
		,
		/**
		 * Description
		 * @method _toolbar_crud_notification 
		 * @param {} uid
		 * @return
		 */
		_toolbar_crud_notification : function ( uid, isEditing) { // item_id, rule_type, isEditing
			var that = FormBuilder, self = this;
			self.toolbar_crud_notification[uid] = self.window_crud_notification[uid].attachToolbar(that.model.conf_toolbar_crud_notification );
			self.toolbar_crud_notification[uid].attachEvent("onClick", function (id) {
				//console.log(id);
				if (id == "save_notification")
				{
					if (CAIRS.dhtmlx.validateForm(uid + "rules_form_crud_notification", self.form_crud_notification[uid])) {
						self._save_notification( uid, isEditing );
					}
					
				}
			});
		}
		
		
		,
		/**
		 * Description
		 * @method _form_crud_notification
		 * @param {} uid
		 * @return
		 */
		_form_crud_notification: function (uid, item_id, rule_type, isEditing) {
			var that = FormBuilder, self = this;
			self.form_crud_notification[uid] = self.window_crud_notification[uid].attachForm(that.model.conf_form_rules_crud_notification.template);
			CAIRS.dhtmlx.prepareForm(uid + "rules_form_crud_notification", that.model.conf_form_rules_crud_notification, self.form_crud_notification[uid]);
			
		}
		
		,
		/**
		 * Description
		 * @method _save_notification
		 * @param {} uid
		 * @return
		 */
		_save_notification: function( uid, isEditing ) {
			var that = FormBuilder
			,self = this
			,hash = self.form_crud_notification[uid].getFormData()
			,form_id = that.form_properties[uid].getItemValue("form_id");
			
			hash["form_id"] = form_id;
			
			//console.log(hash);
			
			self.progressOn( uid );
			self.form_crud_notification[uid].lock();
			self.toolbar_crud_notification[uid].disableItem("save_notification");

			
			CAIRS.jDBd.insert({ 
				data_set_name :"formmaker_notification_rule"
				, record : hash
				, api_resource: "/forms/" + form_id + "/notifications"
				, api_payload: "agency_id=" + that.configuration[that._getRawUID(uid)].agency_id + "&hash=" + JSON.stringify(hash)
				, onSuccess: function( record_id ){
					that._setStatusDataTransferForm(uid, "new notification saved: " + record_id);
					try
					{
						// fill tree of fiels
						that.model.conf_tree_notifications.item[0].item.push( {
								id: record_id,
								text: CAIRS.strip_tags( hash["notification_name"] )
						} );
						
						self.tree_notifications[uid].insertNewItem(
							"manage"
							,record_id
							,CAIRS.strip_tags( hash["notification_name"] )
						);
						
						self.tree_notifications[uid].selectItem(record_id, true, false);
						
						self.toolbar_crud_notification[uid].enableItem("save_notification");
						self.window_crud_notification[uid].close();
						self.form_crud_notification[uid].unlock();
						self.progressOff( uid );
						
					}catch(e)
					{
						//console.log( e.stack );
					}
					
					
					
				}
				,onFail: function( response ){
					that._setStatusDataTransferForm(uid, response);
					self.progressOff( uid );
				}
			 });
		}
		
		,
		/**
		 * Description
		 * @method _mount_notification_input_form
		 * @param {} uid
		 * @return
		 */
		_mount_notification_input_form: function (uid, isEditing) {
			var that = FormBuilder, self = this, isEditing = isEditing || false;
			self.progressOn( uid );
			self._window_crud_notification( uid, isEditing );
			self._toolbar_crud_notification( uid, isEditing )
			
			self._form_crud_notification( uid, isEditing );
		}
		
		
		,
		/**
		 * Description
		 * @method _mount_fields_interface
		 * @param {} uid
		 * @return
		 */
		_mount_fields_interface: function ( uid, item_id, c ) {
			var that = FormBuilder, self = this;
			if (item_id == "manage")
			{	
				try{
					//self.grid_fields[uid].destructor(); // bug dhtmlx
					self.grid_fields[uid].clearAll(true);
				}catch(e){};
				try{
					//self.form_fields[uid].unload(); // bug dhtmlx
				}catch(e){};
				self.toolbar_fields[uid].disableItem("new_rule");
				self.toolbar_fields[uid].disableItem("delete_rule");
				self.layout_fields[uid].cells("c").collapse();
				//return;
			}
			else
			{
				var item_name = self.tree_fields[uid].getItemText(item_id);
				self.window[uid].setText(
					that.model.conf_window_rules.title +
					" - " + "set rules for the the field (" + item_id + ") " +
					item_name
				);
				self._grid_fields( uid, item_id );
				self.toolbar_fields[uid].enableItem("new_rule");
				self.layout_fields[uid].cells("c").expand();
				self._form_fields( uid, item_id );
				self.form_fields[uid].checkItem("rule_action", that.metaparser._getField( uid, item_id ).rule_action);
				if( that.metaparser._getField( uid, item_id ).rule_enable == 1 )
					self.form_fields[uid].checkItem("rule_enable");
				else
					self.form_fields[uid].uncheckItem("rule_enable");
				self.form_fields[uid].checkItem("rule_match", that.metaparser._getField( uid, item_id ).rule_match);
			}
		}
		
		
		,
		/**
		 * Description
		 * @method _mount_pages_interface
		 * @param {} uid
		 * @return
		 */
		_mount_pages_interface: function ( uid, item_id, c ) {
			var that = FormBuilder, self = this;
			if (item_id == "manage")
			{	
				try{
					//self.grid_pages[uid].destructor(); // bug dhtmlx
					self.grid_pages[uid].clearAll(true);
				}catch(e){};
				try{
					//self.form_pages[uid].unload(); // bug dhtmlx
				}catch(e){};
				self.toolbar_pages[uid].disableItem("new_rule");
				self.toolbar_pages[uid].disableItem("delete_rule");
				self.layout_pages[uid].cells("c").collapse();
				//return;
			}
			else
			{
				var item_name = self.tree_pages[uid].getItemText(item_id);
				self.window[uid].setText(
					that.model.conf_window_rules.title +
					" - " + "set rules for the the page (" + item_id + ") " +
					item_name
				);
				self._grid_pages( uid, item_id );
				self.toolbar_pages[uid].enableItem("new_rule");
					
				self.layout_pages[uid].cells("c").expand();
				self._form_pages( uid, item_id );	
					
				self.form_pages[uid].checkItem("rule_action", that.pages[uid][item_id].rule_action);
				if( that.pages[uid][item_id].rule_enable == 1 )
					self.form_pages[uid].checkItem("rule_enable");
				else
					self.form_pages[uid].uncheckItem("rule_enable");
				self.form_pages[uid].checkItem("rule_match", that.pages[uid][item_id].rule_match);
			}
		}
		
		
		,
		/**
		 * Description
		 * @method _mount_notifications_interface
		 * @param {} uid
		 * @return
		 */
		_mount_notifications_interface: function ( uid, item_id, c ) {
			var that = FormBuilder, self = this;
			if (item_id == "manage")
			{	
				try{
					//self.grid_notifications[uid].destructor(); // bug dhtmlx
					self.grid_notifications[uid].clearAll(true);
				}catch(e){};
				try{
					//self.form_notifications[uid].unload(); // bug dhtmlx
				}catch(e){};
				self.toolbar_notifications[uid].disableItem("new_rule");
				self.toolbar_notifications[uid].disableItem("delete_rule");
				self.toolbar_notification[uid].disableItem("delete_notification");
				self.layout_notifications[uid].cells("c").collapse();
				//return;
			}
			else
			{
				var item_name = self.tree_notifications[uid].getItemText(item_id);
				self.window[uid].setText(
					that.model.conf_window_rules.title +
					" - " + "set rules for the the notification (" + item_id + ") " +
					item_name
				);
				self._grid_notifications( uid, item_id );
				self.toolbar_notifications[uid].enableItem("new_rule");
				self.toolbar_notification[uid].enableItem("delete_notification");
				self.layout_notifications[uid].cells("c").expand();
				self._form_notifications( uid, item_id );	

				
				var record = CAIRS.jDBd.getRecord( {
						data_set_name : "formmaker_notification_rule",
						record_id : item_id,
				} );
				
				self.form_notifications[uid].setFormData( record );
					
				if( record.rule_enable == 1 )
					self.form_notifications[uid].checkItem("rule_enable");
				else if( record.rule_enable == "1" )
					self.form_notifications[uid].checkItem("rule_enable");
				else
					self.form_notifications[uid].uncheckItem("rule_enable");
				
				//self.form_pages[uid].checkItem("rule_match", record.rule_match);
			}
		}
		
		
		
		,
		/**
		 * Description
		 * @method progressOn
		 * @param {} uid
		 * @return
		 */
		progressOn: function (uid) {
			var that = FormBuilder, self = this;
			try {
				self.window[uid].progressOn();
			}
			catch (e) {};
	
			self.layout[uid].progressOn();
		}
		
		,
		/**
		 * Description
		 * @method progressOn
		 * @param {} uid
		 * @return
		 */
		progressOff: function (uid) {
			var that = FormBuilder, self = this;
			try {
				self.window[uid].progressOff();
			}
			catch (e) {};
	
			self.layout[uid].progressOff();
		}
			
			
	}; // end return
})();