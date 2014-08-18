requirejs.config({
  //By default load any module IDs from js/lib\\
  urlArgs: "bust=" + (new Date()).getTime(),
  baseUrl: 'js/',
  paths: {
    Common: "controllers/Common",
    // Config: "model/Config",
    // Data: "data/Data"
  }

});
//require(['Common', 'Data', 'Config']);

require(['js/controllers/AddressBook.js'], function(AddressBook) {
  var
    url = window.location.href,
    arr = url.split("/"),
    site_url = arr[0] + "//" + arr[2];

  var appPath = site_url + "modules/AddressBook/src";
  AddressBook.init({
    uid: (new Date).getTime(),
    app_path: appPath,
    dhx_path: "../../codebase4.0",
    icons_path: appPath + "/asserts/icons/",
    images_path: appPath + "/asserts/img/",
    ConnectionId: 275138,
    api: "",
    database: "MAPTEST",
    container: document.body
  });
});