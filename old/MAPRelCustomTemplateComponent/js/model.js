var MAPRelCustomTemplateModel = {
    model_globalImgPath : "../../../auxiliary/dhtmlxfull3.5/imgs/dhtmlxtoolbar_imgs/"
    ,
    model_globalSkin : "dhx_skyblue" 
    ,
    model_conf_window :  "text_document.gif"
    ,
    model_conf_toolbar_RelationshipSubType : 
    {
        items : {
            toolbar: [

            {
                item : {
                    id:"relcustemp_add", 
                    type: "button", 
                    img: "add.png", 
                    imgdis: "add.png", 
                    text: "Add"
                }
            }
            ,{
                item : {
                    id:"relcustemp_save", 
                    type: "button", 
                    img: "save.gif", 
                    imgdis: "save.gif", 
                    text: "Save"
                }
            }          
           ,{
                item : {
                    id:"relcustemp_del", 
                    type: "button", 
                    img: "delete_icons.gif", 
                    imgdis: "delete_icons.gif", 
                    text: "Delete"
                }
            }
            ,{
                item : {
                    id:"relcustemp_close", 
                    type: "button", 
                    img: "cancel.png", 
                    imgdis: "closewindow.png", 
                    text: "Close"
                }
            }
            ] 
        } 
    }    
    ,
    model_Layout: {
        skin: '1C'
    }
        
/*     , gridConf : {
        header : "You belong to multiple Groups / Programs.<br />Please select which Group / Program you would like to use now. You can switch to another later."
    }*/
};