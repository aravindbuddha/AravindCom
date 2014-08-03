addresscomponent.data = addresscomponent.data || (function() {
  var that = addresscomponent;
  return {
    _data_store: {},
    init: function(contactid, agencyid) {
      this.create_data_store("list", that.application_path + "processors/get_data.php?contactID=" + contactid + "&agencyid=" + agencyid);
      this.create_data_store("address_type", that.application_path + "processors/get_data.php?type=address_type");
    },
    create_data_store: function(name, url) {
      this._data_store[name] = new dhtmlXDataStore({
        url: url,
        datatype: "json"
      });
    },
    get_data: function() {
      var self = this,
        postStr,
        json;

      postStr = "contactID=" + _configuration.contactid + "&agencyid=" + _configuration.agencyid;
      dhtmlxAjax.post(_configuration.application_path + "processors/get_data.php", postStr, function(loader) {
        try {
          json = JSON.parse(loader.xmlDoc.responseText);

          if (json.status == "success") {
            self.data_store[uid] = json;

            dhtmlx.message({
              text: "Data store 100% loaded"
            });

            self._grid(uid);
            self.progressOff(uid);
          } else {
            dhtmlx.message({
              type: "error",
              text: json.response
            });
          }
        } catch (e) {
          dhtmlx.message({
            type: "error",
            text: "Fatal error on server side: " + loader.xmlDoc.responseText
          });
        }
      });
    }
  }
}());