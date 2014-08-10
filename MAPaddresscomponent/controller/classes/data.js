Address.Data = Address.Data || (function() {
  var
    data_store = {},
    config = {};
  return {
    "end_point": {
      "address_get": "processors/address.php?act=get",
      "address_del": "processors/address.php?act=del",
      "address_save": "processors/address.php?act=save",
      "get_spouse_contact_id": "processors/get_data.php?act=spouse_contact",
      "address_type": "processors/get_data.php?get=address_type"
    },
    init: function(_config) {
      var self = this;
      config = _config;
      console.log("Init Data Store >>>>>>>>>>>>>>>>>");
      for (var path in self.end_point) {
        self.end_point[path] = config.application_path + self.end_point[path];
      }
      self._address_data_store("address_get", self.end_point.address_get + "&contact_id=" + config.contact_id);
    },
    store: function(name, url, callback) {
      if (data_store[name] == undefined) {
        this.create_data_store(name, url, callback)
      } else {
        callback ? callback(data_store[name]) : "";
        return data_store[name];
      }
    },
    create_data_store: function(_name, _url, _callback) {
      data_store[_name] = new dhtmlXDataStore({
        url: _url,
        datatype: "json",
        ready: function() {
          if (_callback) _callback(this);
        }
      });
    },
    create_schema: function(_name, _cols) {
      data_store[_name].data.scheme({
        $init: function(obj) {
          var i = 0;
          for (var cols in obj) {
            obj[[_cols[i]]] = obj[cols];
            i++;
          }
        }
      });
    },
    _address_data_store: function(_name, _path) {
      var self = this,
        cols = [];
      this.create_data_store(_name, _path);
      data_store[_name].data.scheme({
        $init: function(obj) {
          obj.address_type_id = obj.AddressTypeID;
          obj.address_type = obj.AddressType;
          obj.address_1 = obj.Address1;
          obj.address_2 = obj.Address2;
          obj.city = obj.City;
          obj.state_id = obj.StateId;
          obj.state_name = obj.SateName;
          obj.zip = obj.zip;
          obj.county_id = obj.CountyId;
          obj.county_text = obj.CountyText;
          obj.country_id = obj.CountryId;
          obj.country_text = obj.CountryText;
          obj.province_id = obj.AddressProvinceID;
          obj.province_text = obj.AddressProvenceText;
          obj.start_date = obj.addstartdate;
          obj.leave_date = obj.addleavedate;
          obj.is_mailing_address = obj.MailingAddress ? "Yes" : "No";
        }
      });
    }
  }
}());