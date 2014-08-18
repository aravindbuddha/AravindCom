var MAPRelationshipSubTypeComponent = {   
	
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
        var self = this;
        self.toolbar[ uid ] = self.windows[uid].attachToolbar(  );
        self.toolbar[uid].setIconsPath(self.model.model_globalImgPath);
        var RelationshipSubTypeToolbarXML = CAIRS.xml.serialize( CAIRS.xml.fromJSON( self.model.model_conf_toolbar_RelationshipSubType.items ) );
        self.toolbar[uid].loadXMLString(RelationshipSubTypeToolbarXML);
        self.toolbar[uid].setSkin(self.model.model_globalSkin);
			
        self.toolbar[ uid ].attachEvent("onClick", function(clickid)
        {
            switch(clickid) {

                case "relsubtype_add":
                        
                    var newId = (new Date()).valueOf();
                    self.grid[uid].addRow(newId,["", "", "", "", "", "", "","",""],0);
                   //self.grid[uid].selectRow(self.grid[uid].getRowIndex(newId), false, false, true);
                   // self.grid[uid].setRowHidden("0",true);
                    break;

                case "relsubtype_save":
                    self.processor.sendData(); 
                    break;
         
                case "relsubtype_close":
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
        var self = this;
        self.grid[uid] = self.layout[uid].cells("a").attachGrid();
        //self.grid[uid].setHeader( self.model.gridConf.header );
        self.grid[uid].setInitWidthsP("99");
        self.grid[uid].enableSmartRendering(true);
        self.grid[uid].enableMultiline(true);
        self.grid[uid].init();
        
        self.grid[uid].loadXML("modules/MAPRelationshipSubTypeComponent/data/masterdata_relsubtype_grid.php");
        
       
       // var self = this;   
        self.processor = [];
        self.processor = new dataProcessor("modules/MAPRelationshipSubTypeComponent/processor/relationsubtype_save.php");
        self.processor.setTransactionMode("POST", true);
        self.processor.setUpdateMode("off");
        self.processor.init(self.grid[uid]);
        self.processor.setVerificator(0);
        self.processor.attachEvent("onFullSync",function(sid,action,tid,xml_node){
            AlertDHTMLXWindow('ALERT','ALERT', "Saved Successfully" ,'OK');
            self.grid[uid].clearAndLoad("modules/MAPRelationshipSubTypeComponent/data/masterdata_relsubtype_grid.php");
            return true;
        });
        
   
          
        self.grid[uid].attachEvent("onXLE", function(id,ind){
            self.layout[uid].progressOff();
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
            AlertDHTMLXWindow('ALERT','','Userid Is Missing','OK');
        }	
    }
    
    ,
    initComponent : function() {
        var self = this; 
        self._window(self.userid,845,430,100,"Relationship Group");
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


MAPRelationshipSubTypeComponent.datainit( MAPRelationshipSubTypeModel );/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


