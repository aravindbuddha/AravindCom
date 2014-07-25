requirejs.config({
  //By default load any module IDs from js/lib\\
  urlArgs: "bust=" + (new Date()).getTime(),
  baseUrl: 'js/',
  paths: {
    Common: "controller/Common",
    Config: "model/Config",
    Data: "data/Data"
  }

});
//require(['Common', 'Data', 'Config']);

require(['js/controller/FormBuilder.js'], function (FormBuilder) {
  var appPath = "../../FormBuilder2/app";
  FormBuilder.init({
    uid: (new Date).getTime(),
    app_path: appPath,
    dhx_path: "../../codebase4.0",
    icons_path: appPath + "/asserts/icons/",
    images_path: appPath + "/asserts/img/",
    username: "restoremleahy@adoptionassociates.net" /*MANDATORY*/ /*<?php echo $_SESSION['mapusername'];?>*/ ,
    agency_id: 25,
    ConnID: -85771,
    ConnectionId: 275138,
    database: "MAPTEST",
    container: document.body // comment for appending the component on a new DHTMLX window, or provide a DIV id or document.body
  });
});