var signObjects = new Array('ctlSignature','ctlSignature2');

var Signature_Model = {
	
	//globalImgPath : "../codebase3.5/imgs/", // not mandatory, default "../codebase3.5/imgs/"
	globalSkin : "dhx_skyblue", // not mandatory, default "dhx_skyblue"
	
	text_labels : {
		sign_window_text : "Signature",
		sign_not_valid_again : "Your signature is not valid. Please sign again.",
		sign_not_valid : "Your signature is not valid.",
		sign_valid : "Your signature is valid. You can save it now."
	},
	
	conf_window : {
		image_path: "",
        viewport : "body",
		left: 0,
		top: 0,
		width: 820,
		height: 320,
		enableAutoViewport : true,
		icon : "lock.png",
		icon_dis : "lock_dis.png"
	},

	conf_toolbar : {
		icon_path: "",
		items: [
			{
				type: "button",
				id: "signature_save",
				text: "save signature",
				img: "save.gif",
				img_disabled: "save.gif"
			}
			/*,{
				type: "button",
				id: "signature_validate",
				text: "validate signature",
				img: "validate.png",
				img_disabled: "validate.png"
			}*/,{
				type: "button",
				id: "signature_clear",
				text: "clear signature",
				//disabled: true,
				img: "clear.png",
				img_disabled: "clear.png"
			}/*
			,{
				type: "buttonSelect",
				id: "signature_color",
				text: "signature color",
				img: "color.gif",
				img_disabled: "color.gif",
				options: [
					{
						id: "signature_color_red", // #D24747
						type: "obj",
						text: "Red"
						//img: "text_document.gif"
					}
					,{
						id: "signature_color_blue", // #4754d2
						type: "obj",
						text: "Blue"
						//img: "text_document.gif"
					}
					,{
						id: "signature_color_black", // #000000
						type: "obj",
						text: "Black"
						//img: "text_document.gif"
					}
				]
			}
			
			,{
				type: "buttonSelect",
				id: "signature_pen",
				text: "pen width",
				img: "pen.png",
				img_disabled: "pen.png",
				options: [
					{
						id: "signature_pen_1",
						type: "obj",
						text: "Pen 1"
						//img: "text_document.gif"
					}
					,{
						id: "signature_pen_2",
						type: "obj",
						text: "Pen 2"
						//img: "text_document.gif"
					}
					,{
						id: "signature_pen_3",
						type: "obj",
						text: "Pen 3"
						//img: "text_document.gif"
					}
					,{
						id: "signature_pen_4",
						type: "obj",
						text: "Pen 4"
						//img: "text_document.gif"
					}
					,{
						id: "signature_pen_5",
						type: "obj",
						text: "Pen 5"
						//img: "text_document.gif"
					}
				]
			}*/
			, {
				type: "separator",
				id: "sep1"
			}
			,{
				type: "button",
				id: "signature_select_pre",
				text: "select signature",
				img: "open_file.png",
				img_disabled: "open_file_dis.png"
			}
			, {
				type: "separator",
				id: "sep2"
			}
			,{
				type: "button",
				id: "signature_help",
				text: "help",
				img: "help.png",
				img_disabled: "help.png"
			}
			, {
				type: "separator",
				id: "sep3"
			}
			,{
				type: "button",
				id: "close",
				text: "close window",
				img: "close.png",
				img_disabled: "close_dis.png"
			}
		]
	},
	
	
	conf_toolbar_select : {
		icon_path: "",
		items: [
			{
				type: "button",
				id: "signature_select",
				text: "select signature",
				img: "add.gif",
				img_disabled: "add_dis.gif",
				disabled : true
			}, {
				type: "separator",
				id: "sep3"
			}
			,{
				type: "button",
				id: "close",
				text: "close window",
				img: "close.png",
				img_disabled: "close_dis.png"
			}
		]
	},
	
	signature : { 
		BackImageUrl : "", // not mandatory, default empty
		PenCursor : "signature/pen.cur", // not mandatory, default "signature/pencil.cur"
		
		saving_image_path : '../signatures/',
		
		window : {
			icon : "sign.png",
			icon_dis : "sign.png"	
		}
	}
};


var Signature_Component = {
	
	model : null,
	window_manager : null,
	windows_signature : [],
	windows_signature_pre : [],
	windows_help : [],
	data_view : [],
	status_bar : [],
	status_bar_signature_pre : [],
	layouts_signature : [],
	layouts_signature_pre : [],
	toolbar : [],
	toolbar_select : [],
	uid : null,
	
	signature_controls : [],
	
	signedCallBack : [],
	signed : [],
	
	configuration : [],
	
	
	_getSelector : function (id)
	{
		try
		{
			return document.getElementById(id);
		}
		catch(e)
		{
			return false;
		}
	},
	
	_window_manager : function( uid )
	{
		var self = this;
		
		//console.log( self.model );
		
		/* new - 21/05/14 */
		if( self.configuration[ uid ].window_manager )
		{
			self.window_manager = self.configuration[ uid ].window_manager;
			return;
		}
		
		self.window_manager = new dhtmlXWindows();
		self.window_manager.enableAutoViewport( true );
		//self.window_manager.attachViewportTo( document.body ); // self.model.viewport
		self.window_manager.setImagePath( self.model.conf_window.image_path );
	},
	
	
	_signatureOpen : function( uid )
	{	
		var self = this, ieVer, tpl_signature;
		
		var wid = "signature_expand_" + uid;
		
		
		if(self.window_manager === null)
		{
			self._window_manager( uid );
		}
		
		/*if(self.window_manager.isWindow( wid ))
		{
				
				self.window_manager.forEachWindow(function(win){
					console.log(win);
				});
				
				self.windows_signature[ uid ].show();
				self.windows_signature[ uid ].bringToTop();
				//self.windows_signature[ uid ].center();
				SignaturePen('ctlSignature_'+uid, 3);
				return;
		}
		else
		{*/
			if(self.configuration[ uid ].message_before)
			{
				dhtmlx.alert({
					type:"alert-error",
					text: self.configuration[ uid ].message_before
				});
			}
		/*} */
			
		
		
		//alert(self.model.conf_window.left);
		
		
		self.windows_signature[ uid ] = self.window_manager.createWindow( wid, new Number(self.model.conf_window.left), new Number(self.model.conf_window.top), new Number(self.model.conf_window.width), new Number(self.model.conf_window.height) );
		self.windows_signature[ uid ].setText( self.model.text_labels.sign_window_text );
		self.windows_signature[ uid ].setIcon( self.model.signature.window.icon, self.model.signature.window.icon_dis );
		
		self.windows_signature[ uid ].denyResize();
		self.windows_signature[ uid ].denyPark();
		//self.windows_signature[ uid ].center();
		
		
		var sign_wrap = document.createElement("DIV");
		try
		{
			sign_wrap.id = "sign_wrap_"+ uid +"";
		}
		catch(e)
		{
			sign_wrap.setAttribute("id", "sign_wrap_"+ uid +"");
		}
		
		
		
		
		//self._getSelector( self.form_processor[ uid ].getContainer( "signature_container" ).id ).parentNode.parentNode.style.backgroundColor = "#ccc";
		
		
		ieVer = getInternetExplorerVersion();
        if (isIE) {
                if (ieVer >= 9.0)
                    isIE = false;
        }

        if (isIE) 
        {
			tpl_signature = "	\
				<div id='ctlSignature_"+ uid +"_Container' style='width:800px;height:800px'>	\
					<div ID='ctlSignature_"+ uid +"' width='680' height='200'></div>	\
				</div>\
			";
        }
        else 
        {
            tpl_signature = "	\
				<div id='ctlSignature_"+ uid +"_Container' style='width:800px;height:200px'>	\
					<canvas ID='ctlSignature_"+ uid +"' width='800' height='200'></canvas>	\
				</div>\
			";
        }
		
		if( document.getElementById("sign_wrap_"+ uid +"") )
		{
			
		}
		else
		{
			document.body.appendChild(sign_wrap);
			sign_wrap.innerHTML = tpl_signature;
			
			if(self.signature_controls[ uid ])
			{
				
			}
			else
			{
				var str = 'window.objctlSignature_'+ uid +' = new SuperSignature( { \
					SignObject:"ctlSignature_'+ uid +'", SignWidth: "800", SignHeight: "200",	BorderStyle: "Dashed", BorderWidth: "1px", BorderColor: "#CCCCCC",\
					RequiredPoints: "15", ClearImage : self.configuration[ uid ].application_url + "signature/refresh.png",\
					PenCursor :  self.configuration[ uid ].application_url + self.model.signature.PenCursor || self.configuration[ uid ].application_url + "signature/pencil.cur", BackImageUrl : self.configuration[ uid ].application_url + self.model.signature.BackImageUrl || "",\
					PenColor : "#000000", PenSize : 3, Visible: "true", SuccessMessage: "Cool Signature!"\
				} );	\
				window.objctlSignature_'+ uid +'.Init();';
				
				eval(str);
				
				SignatureStatusBar('ctlSignature_'+ uid, false);
				
				self.signature_controls[ uid ] = true;
			}
		}
		
		
		
		//self._getSelector( self.form_processor[ uid ].getContainer( "signature_container" ).id ).innerHTML = tpl_signature;
		//self._getSelector( self.form_processor[ uid ].getContainer( "signature_container" ).id ).style.overflow = "hidden";
		
		//signObjects = new Array('ctlSignature_'+uid,'ctlSignature2')
		
		
		
		
		

		
		
		self.layouts_signature[ uid ] = self.windows_signature[ uid ].attachLayout( "1C" );
		//self.layouts_signature[ uid ].cells("a").hideHeader();
		
		
		if(self.configuration[ uid ].user_name)
		{
			self.layouts_signature[ uid ].cells("a").setText( self.configuration[ uid ].user_name + " please create your signature");
		}
		else
		{
			self.layouts_signature[ uid ].cells("a").setText("Please create your signature");
		}
		
		
		
		
		self.layouts_signature[ uid ].cells("a").attachObject( "sign_wrap_"+ uid +"" );
		
		self.windows_signature[ uid ].attachEvent("onClose", function(win)
		{			
			//console.log(uid);
			
			if(self.signed[ uid ] == false)
			{
				dhtmlx.message(
				{
					title: "close without saving",
					type:"confirm-error",
					text: "Do you really want to close without saving the signature?",
					callback: function(ok)
					{
						if(ok)
						{				
							win.hide();
						}
						else
						{
							win.show();
							win.bringToTop();
						}
					}
				});
			}
			else{
				win.hide();
			}
			//return false;
		});
		
		self.status_bar[ uid ] = self.windows_signature[ uid ].attachStatusBar();
		self.status_bar[ uid ].setText("Draw your signature and press 'Save signature' when completed");
		
		self._setToolbartSign( uid );
	
	},
	
	_setToolbartSign : function( uid )
	{
		var self = this;
		
		self.toolbar[ uid ] = self.windows_signature[ uid ].attachToolbar( self.model.conf_toolbar );

		self.toolbar[ uid ].attachEvent("onClick", function(id)
		{
			if(id == "signature_save")
			{
				if(ValidateSignature('ctlSignature_' + uid))
				{
					
					self.windows_signature[ uid ].progressOn();
					self.layouts_signature[ uid ].cells("a").progressOn();
					
					
					
					if(self.configuration[ uid ].message_after)
					{
						dhtmlx.alert({
							type:"alert-error",
							text: self.configuration[ uid ].message_after
						});
					}
					
					
					self.layouts_signature[ uid ].cells("a").setText("Saving signature");
					
					var image_base64data = self._getSelector( "ctlSignature_"+uid+"_data" ).value;
					var image_file_name = self.configuration[ uid ].file_name;				
					
					var params = "ctlSignature_data=" + escape(image_base64data) + "";
					params = params + "&saving_image_path=" + self.configuration[ uid ].file_path_abs + "";
					params = params + "&ctlSignature_file=" + encodeURIComponent(image_file_name) + "";
					
					
					//filename_agencyID_customerID_CustomerName
					
					params = params + "&user_name=" + encodeURIComponent( self.configuration[ uid ].user_name ) + "";
					params = params + "&file_name=" + encodeURIComponent( self.configuration[ uid ].file_name ) + "";
					params = params + "&user_id=" + encodeURI( self.configuration[ uid ].user_id ) + "";
					params = params + "&agency_id=" + encodeURI( self.configuration[ uid ].agency_id ) + "";
					
					dhtmlxAjax.post( self.configuration[ uid ].application_url + "signature/super-signature.php", params, function(loader)
					{
							try
							{
								var json = JSON.parse( loader.xmlDoc.responseText );
								if( json.status == "success" )	
								{
									self.signed[ uid ] = true;
									
									if(self.signedCallBack[ uid ])
									{
										self.signedCallBack[ uid ]({
											user_id : self.configuration[ uid ].user_id,
											user_name : self.configuration[ uid ].user_name,
											file_name : json.filename,
											file_path :  self.configuration[ uid ].file_path,
											div_display : self.configuration[ uid ].div_display,
											signature_status : self.signed[ uid ],										
											file_path_abs : self.configuration[ uid ].file_path_abs, // mandatory
											icons_path : self.configuration[ uid ].icons_path, // mandatory
											application_url : self.configuration[ uid ].application_url
										});
									}
									
									dhtmlx.message( {text : "Signature saved" } );
									self.layouts_signature[ uid ].cells("a").setText("Signature saved");
									
									if(self.configuration[ uid ].div_display)
									{
										self._getSelector( self.configuration[ uid ].div_display ).innerHTML = "";
										self._getSelector( self.configuration[ uid ].div_display ).innerHTML = "<img src='"+ self.configuration[ uid ].file_path +""+json.filename+"?id=" + (new Date).getTime() + "' width='"+ self.configuration[ self.uid ].width_display +"'  height='"+ self.configuration[ self.uid ].height_display +"' align='middle'/>";
									}
									
									
									
									var close = window.setTimeout(function(){
										self.layouts_signature[ uid ].cells("a").setText("Closing window in 1 seconds.");
									}, 1000);
									
									close = window.setTimeout(function(){
										
										self.layouts_signature[ uid ].cells("a").setText("Document signed by " + self.configuration[ uid ].user_name);
										
										self.windows_signature[ uid ].hide();
									}, 1000);
									
									
									self.windows_signature[ uid ].progressOff();
									self.layouts_signature[ uid ].cells("a").progressOff();
								}
								else
								{
									dhtmlx.message( {type : "error", text : json.response} );
									self.layouts_signature[ uid ].cells("a").setText(json.response);
									
									self.windows_signature[ uid ].progressOff();
									self.layouts_signature[ uid ].cells("a").progressOff();
								}
							}
							catch(e)
							{
								dhtmlx.message( {type : "error", text : "Fatal error on server side: "+loader.xmlDoc.responseText } );
								self.layouts_signature[ uid ].cells("a").setText("Fatal error on server side");
								
								self.windows_signature[ uid ].progressOff();
								self.layouts_signature[ uid ].cells("a").progressOff();
							}
					});	
				}
				else{
					dhtmlx.alert({
						type:"alert-error",
						text: self.model.text_labels.sign_not_valid_again
					});
				}
			}	
			else if(id == "signature_validate")
			{
				if(ValidateSignature('ctlSignature_' + uid))
				{
					dhtmlx.message( {text : self.model.text_labels.sign_valid } ); // 	
				}
				else{
					dhtmlx.message( {type : "error", text : self.model.text_labels.sign_not_valid } ); // 	
				}
			}
			else if(id == "signature_clear")
			{
				ClearSignature('ctlSignature_' + uid);
			}
			else if(id == "signature_help")
			{
				
				self._showHelp( uid );
			}
			else if(id == "close")
			{				
				self.windows_signature[ uid ].hide();
			}
			else if(id == "signature_select_pre")
			{
				
				self._showPreCreateSignatures( uid );
			}			
		});
	},
	
	
	
	_setToolbartSelectSignature : function( uid )
	{
		var self = this;
		self.toolbar_select[ uid ] = self.windows_signature_pre[ uid ].attachToolbar( self.model.conf_toolbar_select );
		self.toolbar_select[ uid ].attachEvent("onClick", function(id)
		{
			if(id == "signature_select")
			{
				self._selectPreCreatedSignature( uid, self.data_view[ uid ].getSelected());
			}
			else if(id == "close")
			{
				self.windows_signature_pre[ uid ].hide();
			}		
		});
	},
	
	
	
	_showHelp : function( uid )
	{
		var self = this, nrows = 0;
		
		/*if(self.window_manager.isWindow( "help_window_" + uid ))
		{
				self.windows_help[ uid ].show();
				self.windows_help[ uid ].bringToTop();
				return;
		}*/
		
		
		self.windows_help[ uid ] = self.window_manager.createWindow( "help_window_" + uid, self.model.conf_window.left, self.model.conf_window.top, 700, 400 );
		self.windows_help[ uid ].setText( "End user manual" );
		self.windows_help[ uid ].setIcon( "help.png", "help_dis.png" );
		self.windows_help[ uid ].denyPark();
		self.windows_help[ uid ].attachURL( self.configuration[ uid ].application_url + "docs/end_user_manual/" );
	},
	
	
	_selectPreCreatedSignature : function( uid, imagename )
	{
		var self = this;
		if(self.configuration[ uid ].div_display)
		{
			self._getSelector( self.configuration[ uid ].div_display ).innerHTML = "";
			self._getSelector( self.configuration[ uid ].div_display ).innerHTML = "<img src='"+ self.configuration[ uid ].file_path +""+imagename+"?id=" + (new Date).getTime() + "' width='"+ self.configuration[ self.uid ].width_display +"'  height='"+ self.configuration[ self.uid ].height_display +"' align='middle'/>";
		}
		
		self.toolbar_select[ uid ].disableItem("signature_select");
				
		self.signed[ uid ] = true;
				
		if(self.signedCallBack[ uid ])
		{
			self.signedCallBack[ uid ]({
				user_id : self.configuration[ self.uid ].user_id,
				user_name : self.configuration[ self.uid ].user_name,
				file_name : imagename,
				file_path :  self.configuration[ self.uid ].file_path,
				div_display : self.configuration[ self.uid ].div_display,
				signature_status : self.signed[ uid ],				
				file_path_abs : self.configuration[ self.uid ].file_path_abs, // mandatory
				icons_path : self.configuration[ self.uid ].icons_path, // mandatory
				application_url : self.configuration[ self.uid ].application_url
			});
		}
		
		self.windows_signature_pre[ uid ].hide();
		self.layouts_signature[ uid ].cells("a").setText("Closing window in 1 second.");
		
		var close = window.setTimeout(function(){
			self.layouts_signature[ uid ].cells("a").setText("Document signed by " + self.configuration[ uid ].user_name);					
			
			self.windows_signature[ uid ].hide();
		}, 1000);
		
		dhtmlx.message( {text : "Signature saved" } );
		self.layouts_signature[ self.uid ].cells("a").setText("Signature saved");
		//console.log(context.target)
	},
		
	_showPreCreateSignatures : function( uid )
	{
		var self = this, nrows = 0;
		
		/*if(self.window_manager.isWindow( "pre_created_signatures_window_" + uid ))
		{
				self.windows_signature_pre[ uid ].show();
				self.windows_signature_pre[ uid ].bringToTop();
				//self.windows_signature_pre[ uid ].center();
				return;
		}*/
		
		self.windows_signature_pre[ uid ] = self.window_manager.createWindow( "pre_created_signatures_window_" + uid, self.model.conf_window.left + 15, self.model.conf_window.top - 120, 800, 600 );
		self.windows_signature_pre[ uid ].setText( "Pre created signatures." );
		self.windows_signature_pre[ uid ].setIcon( "open_file.png", "open_file_dis.png" );
		
		self.windows_signature_pre[ uid ].denyPark();
		//self.windows_signature_pre[ uid ].center();
		
		self.windows_signature_pre[ uid ].attachEvent("onClose", function(win)
		{	
			win.hide();
		});
		
		self._setToolbartSelectSignature( uid );
		
				
		self.layouts_signature_pre[ uid ] = self.windows_signature_pre[ uid ].attachLayout( "1C" );
		self.layouts_signature_pre[ uid ].cells("a").setText("Please select you signature. Double click on one of the signature images to use as your signature.");
		
		self.status_bar_signature_pre[ uid ] = self.windows_signature_pre[ uid ].attachStatusBar();
		self.status_bar_signature_pre[ uid ].setText("Please select you signature. Double click on one of the signature images to use as your signature.");
		
		self.windows_signature_pre[ uid ].progressOn();
		self.layouts_signature_pre[ uid ].cells("a").progressOn();
		
		//self.layouts_signature_pre[ uid ].cells("a").attachHTMLString('<div id="pre_sign_wrap_'+ uid +'" style="border:1px solid #A4BED4;width:auto;height:278px;"></div>');		
		
		self.data_view[ uid ] = self.layouts_signature_pre[ uid ].cells("a").attachDataView({
			type: {
				template: "<img src='#web_path##name#' height='100' />",
				height: 100
			},
			drag:true
		});
		
		self.data_view[ uid ].attachEvent("onItemClick",function(id, context,e)
		{
			self.toolbar_select[ uid ].enableItem("signature_select");
		});
		
		
		self.data_view[ uid ].attachEvent("onItemDblClick",function(id, context,e)
		{
			self._selectPreCreatedSignature( uid, id);
		});
		
		self.data_view[ uid ].attachEvent("onAfterDrop",function(id, context,e)
		{

			//console.log(context.target);
			return false; //block default processing
		});
		
		var params = "web_path=" + encodeURI( self.configuration[ uid ].file_path ) + "";
		params = params + "&file_path_abs=" + encodeURI( self.configuration[ uid ].file_path_abs ) + "";
		
		// # self.configuration[ uid ].file_name +"_"+ self.configuration[ uid ].agency_id +"_"+ self.configuration[ uid ].user_id +"_" + self.configuration[ uid ].user_name
		
		
		//filename_agencyID_customerID_CustomerName
		
		params = params + "&user_name=" + encodeURIComponent( self.configuration[ uid ].user_name ) + "";
		params = params + "&file_name=" + encodeURIComponent( self.configuration[ uid ].file_name ) + "";
		params = params + "&user_id=" + encodeURI( self.configuration[ uid ].user_id ) + "";
		params = params + "&agency_id=" + encodeURI( self.configuration[ uid ].agency_id ) + "";
		dhtmlxAjax.post( self.configuration[ uid ].application_url + "processors/read_signatures.pl", params, function(loader)
		{
				try
				{
					var json = JSON.parse( loader.xmlDoc.responseText );
					
					
					if( json.status == "err" )	
					{
						dhtmlx.message( {type : "error", text : json.response } );
					}
					else
					{
						self.data_view[ uid ].parse (json, "json");
					
						self.windows_signature_pre[ uid ].progressOff();
						self.layouts_signature_pre[ uid ].cells("a").progressOff();
					}
					
					
				}
				catch(e)
				{
					dhtmlx.message( {type : "error", text : "Fatal error on server side: "+loader.xmlDoc.responseText } );
					self.layouts_signature_pre[ uid ].cells("a").setText("Fatal error on server side");
								
					self.windows_signature_pre[ uid ].progressOff();
					self.layouts_signature_pre[ uid ].cells("a").progressOff();
				}
		});	
	},
	
		
	signIn : function( configuration )
	{
		var self = this;
		
		self.uid  = configuration.user_id;
		
		if(typeof configuration.width_display === 'undefined')
		{
			configuration.width_display = 400;
		}
		if(typeof configuration.height_display === 'undefined')
		{
			configuration.height_display = 100;
		}
		
		self.configuration[ self.uid ] = configuration;
		
		self.model.conf_window.image_path  = configuration.icons_path;
		
		self.model.conf_toolbar.icon_path = configuration.icons_path;
		
		self.model.conf_toolbar_select.icon_path = configuration.icons_path;
		
		self.signedCallBack[ self.uid ] = false;
		self.signed[ self.uid ] = false;
		
		if(configuration.div_display)
		{
			dhtmlx.DragControl.addDrop( configuration.div_display ,{
				onDrop:function(source, target, d, e){
					var context = dhtmlx.DragControl.getContext();
					var item = context.from.get(context.source[0]);
					target.innerHTML = "<img src='"+ self.configuration[ self.uid ].file_path +""+item.name+"?id=" + (new Date).getTime() + "' width='"+ self.configuration[ self.uid ].width_display +"'  height='"+ self.configuration[ self.uid ].height_display +"' align='middle'/>";
					self.signed[ self.uid ] = true;
					if(self.signedCallBack[ self.uid ])
					{
						var response = {
							user_id : self.configuration[ self.uid ].user_id,
							user_name : self.configuration[ self.uid ].user_name,
							file_name : item.name,
							file_path :  self.configuration[ self.uid ].file_path,
							div_display : self.configuration[ self.uid ].div_display,
							signature_status : self.signed[ self.uid ],				
							file_path_abs : self.configuration[ self.uid ].file_path_abs, // mandatory
							application_url : self.configuration[ self.uid ].application_url
						};
						self.signedCallBack[ self.uid ](response);
					}
					
					self.windows_signature_pre[ self.uid ].hide();
					self.layouts_signature[ self.uid ].cells("a").setText("Closing window in 1 second.");
				
					var close = window.setTimeout(function(){
						self.layouts_signature[ self.uid ].cells("a").setText("Document signed by " + self.configuration[ self.uid ].user_name);					
						
						self.windows_signature[ self.uid ].hide();
					}, 1000);
					
					dhtmlx.message( {text : "Signature saved" } );
					self.layouts_signature[ self.uid ].cells("a").setText("Signature saved");
				}
			});
			dhtmlx.compat("dnd");
		}
		
		(configuration.signedCallBack) ? self.signedCallBack[ self.uid ]  = configuration.signedCallBack : "";
		
		var __x = CAIRS.getPagePosition( "x", self.model.conf_window.width, self.model.conf_window.height );
		var __y = CAIRS.getPagePosition( "y", self.model.conf_window.width, self.model.conf_window.height );
		
		if(configuration.bind_position_to)
		{
			__x = CAIRS.getElementPosition( configuration.bind_position_to, "x" );
			__y = CAIRS.getElementPosition( configuration.bind_position_to, "y" );
		}
				
		self.model.conf_window.left = __x;
		self.model.conf_window.top = __y;
		
		
		if(typeof configuration.marginTop !== 'undefined')
		{
			if(configuration.marginTop)
			{
				self.model.conf_window.top = configuration.marginTop;
			}
		}
		
		
		//alert(__x);
		//alert(__y);
			console.log( self.uid );
		self._signatureOpen( self.uid );
		
	},
	
	init : function( model )
	{
		var self = this;
	 
	 
		self.model = model;
		
		
		
	}
};

Signature_Component.init( Signature_Model );
