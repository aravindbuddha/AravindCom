Address.Data = Address.Data || (function() {
  var
    _data_store = {};
  return {
    init: function(app_path) {
      console.log(">>>>>>> init Data Store...");
      //  this.create_data_store("address_type", app_path + "processors/get_data.php?get=address_type");
    },
    store: function(name, url) {
      if (_data_store[name] == null) {
        this.create_data_store(name, url)
      }
      return _data_store[name];
    },
    create_data_store: function(name, url) {
      _data_store[name] = new dhtmlXDataStore({
        url: url,
        datatype: "json"
      });
    },
  }
}());