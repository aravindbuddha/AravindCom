var MAPRelCustomTemplateComponent = {   
	
    /* properties */
    window_manager      : null,
    windows             : [],
    processor           : null,
    toolbar             : [],
    layout              : [],
    grid                : [],
    id                  : null,
    configuration       : [],
    userid              : null,
    custom_template_combo : []
        
    /* methods */
	
    ,
    _window_manager : function()
    {
        var self = this;
        self.window_manager = new dhtmlXWindows();
        self.window_manager.setImagePath( self.model.model_globalImgPath);
    }      
	
	
    ,
    _window :  function(uid,winWidth,winHeight,winTop,winTitle) {
		
        var self = this;
        try{
            if(self.window_manager === null) {
                self._window_manager();
            }
               
            if(self.windows[uid] == 'undefined')
                self.windows[uid] = [];
            self.windows[uid] = self.window_manager.createWindow( 'Win'+uid, '0', '0', winWidth, winHeight);
            
            var settittelcontent = winTitle.replace("^","&");
            self.windows[uid].setText(settittelcontent);
            self.windows[uid].setModal(true);
            self.windows[uid].button('park').hide()
            self.windows[uid].button('minmax1').hide()
            self.windows[uid].setIcon( self.model.model_conf_window, self.model.model_conf_window );
            dhtmlxWidowCustomPostion(self.windows[uid],150,true,false);
            
      
            self.windows[uid].attachEvent('onclose',function(){
                // self.toolbar = [];
                return true;
            });
          
        }catch(e) {
            (console) ? console.log("error on create window" + "\n" + e.stack) : "";
        }
		
    }
	
    ,
    _toolbar : function( uid )
    {
        var self = this,grid_row_id;
        self.toolbar[ uid ] = self.windows[uid].attachToolbar(  );
        self.toolbar[uid].setIconsPath(self.model.model_globalImgPath);
        var RelationshipSubTypeToolbarXML = CAIRS.xml.serialize( CAIRS.xml.fromJSON( self.model.model_conf_toolbar_RelationshipSubType.items ) );
        self.toolbar[uid].loadXMLString(RelationshipSubTypeToolbarXML);
        self.toolbar[uid].setSkin(self.model.model_globalSkin);
			
        self.toolbar[ uid ].attachEvent("onClick", function(clickid)
        {
            grid_row_id = self.grid[uid].getSelectedRowId();
            switch(clickid) {

                case "relcustemp_add":
                        
                    var newId = (new Date()).valueOf();
                    self.grid[uid].addRow(newId,["", "", "", "", "", "", "","","",""],0);
                    self.grid[uid].selectRow(self.grid[uid].getRowIndex(newId), false, false, true);
            
                    break;

                case "relcustemp_save":
                    self.processor.sendData(); 
                    break;
                    
                case "relcustemp_del":
                        if(grid_row_id) { 
                        dhtmlx.confirm({
                            title: "Delete Match",
                            type:"confirm-warning",
                            text: "<img src='../../auxiliary/DHTMLXmessage/codebase/img/alert_medium.png'> Are you sure you want to delete this record ?",
                            callback: function(result) {
                                if(result == true) {   
                                    self.grid[uid].deleteRow(grid_row_id);
                                    //send asynchronous POST request
                                    dhtmlxAjax.post("modules/MAPRelCustomTemplateComponent/processor/relcustemp_save.php?do=1&id="+grid_row_id,grid_row_id,function(result) 
                                    {
                                        dhtmlx.alert({
                                            title:"Alert", 
                                            text :"Deleted Successfully",
                                            callback: function() {
                                                self.grid[uid].clearAndLoad("modules/MAPRelCustomTemplateComponent/data/masterdata_relcustemp_grid.php");
                                            }
                                        }); 
                                    });

                                }
                                else{

                                }
                            }
                        });

                    } 
                    else {
                        dhtmlx.alert({
                            title:"Alert", 
                            type:"alert-error",
                            text :"No Record Selected"
                        });                      
                    } 
                     
                     break;

                case "relcustemp_close":
                default:
                    self.windows[uid].close();
                    break;
            }
                    
        });
    }
        
	
    
    // layout
    ,
    _layout: function(id){
        var self = this;
        self.layout[id] = self.windows[ id ].attachLayout("1C");
        self.layout[id].cells("a").hideHeader();
        self.layout[id].progressOn();
    }
    
    , 
    _grid : function(uid) {
        var self = this,event ='';
        self.grid[uid] = self.layout[uid].cells("a").attachGrid();
        //self.grid[uid].setHeader( self.model.gridConf.header );
        self.grid[uid].setInitWidthsP("99");
        //self.grid[uid].enableSmartRendering(true);
        self.grid[uid].enableMultiline(true);
        self.grid[uid].init();
        self.grid[uid].loadXML("modules/MAPRelCustomTemplateComponent/data/masterdata_relcustemp_grid.php");
        
        if(self.processor === null) {
            var self = this;   
            self.processor = [];
            self.processor = new dataProcessor("modules/MAPRelCustomTemplateComponent/processor/relcustemp_save.php");
            self.processor.setTransactionMode("POST", true);
            self.processor.setUpdateMode("off");
            self.processor.init(self.grid[uid]);
            self.processor.setVerificator(0);
            self.processor.setVerificator(3);
            self.processor.attachEvent("onAfterUpdate", function(sid, action, tid, tag){
                 var last_inserted_id = tid.split('_');             
                 if(last_inserted_id[0] == "inserted")
                     self.grid[uid].setRowId(0,last_inserted_id[1]);
                 AlertDHTMLXWindow('ALERT','ALERT', "Saved Successfully" ,'OK');
                });
        }
  
        self.grid[uid].attachEvent("onXLS", function(id,ind){ 
            if(event)
                  self.grid[uid].detachEvent(event);              
            });
            
        self.grid[uid].attachEvent("onXLE", function(id,ind){
            self.layout[uid].progressOff();
            
            event =  self.grid[uid].attachEvent("onCellChanged", function(rId,cInd,nValue){
                 var postStr = "";
                      if(cInd == 0)
                          {
                          self.grid[uid].cells(rId,5).setValue(nValue);
                    
                          postStr="relationsubtypeid="+self.grid[uid].cells(rId,0).getValue();           
                          var loader = dhtmlxAjax.postSync("modules/MAPRelCustomTemplateComponent/data/readRelType.php",postStr);
                          
                  
                            var json = JSON.parse( loader.xmlDoc.responseText );   
                    
                            
                            var comborel =  self.grid[uid].getCustomCombo(rId,1);
                            comborel.clear();
                            self.grid[uid].cells(rId,1).setValue(""); 
                            if(json.count >0){
                            for(var k=1; k <= json.count; k++){
                                    var textOption  = json[k].text;
                                    var valueOption = json[k].value;
                                    comborel.put(valueOption,textOption);
                                    }
                            }
                                
                          }
                          if(cInd == 1)
                          {
                          self.grid[uid].cells(rId,6).setValue(nValue);
                          }

                    });                    
            });  
    } 


    ,
    sleep : function(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }


    ,
    loadValues : function(input) { 
        var self  = this;
        
        if(typeof input != 'undefined' && input != ''){
            self.userid  = input;                
        }
        else
        {
            AlertDHTMLXWindow('ALERT','','Agency Id Missing! Please contact your Administrator','OK');
        }	
    }
    
    ,
    initComponent : function() {
        var self = this; 
        self._window(self.userid,845,430,100,"Relationship Custom Template");
        self._layout(self.userid);
        self._toolbar(self.userid);
        self._grid(self.userid);   
    }
    
    ,
    datainit : function( model ) {		
        var self = this;
        self.model = model;
    }

};


MAPRelCustomTemplateComponent.datainit( MAPRelCustomTemplateModel );/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */





