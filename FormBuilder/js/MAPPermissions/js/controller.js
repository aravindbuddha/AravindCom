/* MapPermissions Controller
Created on  :   Jan 6 2014
Purpose     :    */

var MAPPermissions = {   
    json_map_permissions    : null
    ,
    blockaccess             : null
    ,
    hideYN                  : null
    ,
    check_permission       : null
    ,
    checkAccessPermission :function(clicked_option)
    {   var self = this;            
        self.blockaccess = 0;
        self.hideYN = 0;       
        
        if(self.check_permission == 1 ){
        clicked_option = clicked_option.toLowerCase(); 
        var trackingListArray = [ "new","add","confirm","complete","create","save","edit","delete","send","reply","forward","upload","transfer","submit","run","move","remove","action","correction","placement","approve","disable","override","change","update","pay"]; 
                
        for(var i=0; i < trackingListArray.length; i++){
            if(clicked_option.search(trackingListArray[i]) > -1)
                { 
                self.hideYN = 1;
                break;
                }
            }

        //if(clicked_option.contains("new") || clicked_option.contains("add") || clicked_option.contains("confirm")|| clicked_option.contains("create") || clicked_option.contains("save")|| clicked_option.contains("edit") || clicked_option.contains("delete") || clicked_option.contains("send") || clicked_option.contains("upload") || clicked_option.contains("transfer") || clicked_option.contains("submit") || clicked_option.contains("run") || clicked_option.contains("move") || clicked_option.contains("remove") || clicked_option.contains("action")|| clicked_option.contains("correction")|| clicked_option.contains("placement")) {
       if(self.hideYN == 0 )
            {    
            for (var key in self.json_map_permissions.menusettings) { 
                if(key == clicked_option)
                    { 
                    self.hideYN =  self.json_map_permissions.menusettings[key] ;    
                    break;
                    }
                }
            }    
       
        if(self.hideYN == 1 && self.json_map_permissions.permissions.edit == -1){
            self.blockaccess = 1;            
            dhtmlx.alert({
                title:"Alert", 
                type:"alert-error",
                text :"Your permissions are restricted to VIEW ONLY. If you think this is a mistake, please contact your Agency Administrator"
            });
           
        }
              
     }          
        return  self.blockaccess;
    }
    
    ,
     loadSettings : function(WWWUrlPath) {
          var self = this;  
          var postStr = "";
          var postPath= "modules/MAPPermissions/data/sysmenusettings.php";
          if(WWWUrlPath)
            postPath =  WWWUrlPath + postPath;
           dhtmlxAjax.post(postPath,postStr, function(loader) {
           self.json_map_permissions = JSON.parse( loader.xmlDoc.responseText );    
           self.check_permission    = self.json_map_permissions.checkpermission;
           }); 
    }
    

}; 

//MAPPermissions.datainit( MAPPermissionsModel );
